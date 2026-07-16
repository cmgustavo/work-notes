#!/usr/bin/env node
/**
 * Bumps the app version and the Android/iOS build number, commits and tags the
 * release. Both platforms share one build number.
 *
 * Usage:
 *   node ./scripts/release.js [patch|minor|major] [--dry-run] [--push]
 */

const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const BUILD_GRADLE = path.join(ROOT, 'android', 'app', 'build.gradle');
const PBXPROJ = path.join(
  ROOT,
  'ios',
  'WorkNotes.xcodeproj',
  'project.pbxproj',
);

// The app target carries MARKETING_VERSION/CURRENT_PROJECT_VERSION in its Debug
// and Release configs; the test target has neither. Both must be rewritten.
const PBX_CONFIG_COUNT = 2;

const RELEASE_TYPES = ['patch', 'minor', 'major'];

function fail(message) {
  console.error(`\nrelease: ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const options = {type: 'patch', dryRun: false, push: false};
  for (const arg of argv) {
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--push') {
      options.push = true;
    } else if (RELEASE_TYPES.includes(arg)) {
      options.type = arg;
    } else {
      fail(
        `unknown argument "${arg}". Expected ${RELEASE_TYPES.join(
          '|',
        )}, --dry-run or --push.`,
      );
    }
  }
  return options;
}

function git(...args) {
  return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8'}).trim();
}

function bumpVersion(version, type) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    fail(`version "${version}" in package.json is not a plain x.y.z version.`);
  }
  const [major, minor, patch] = match.slice(1).map(Number);
  if (type === 'major') {
    return `${major + 1}.0.0`;
  }
  if (type === 'minor') {
    return `${major}.${minor + 1}.0`;
  }
  return `${major}.${minor}.${patch + 1}`;
}

function assertCleanTree() {
  if (git('status', '--porcelain')) {
    fail('working tree has uncommitted changes. Commit or stash them first.');
  }
}

function assertTagIsFree(tag) {
  const existing = git('tag', '--list', tag);
  if (existing) {
    fail(`tag ${tag} already exists.`);
  }
}

function readGradleValue(gradle, key) {
  const match = new RegExp(`^(\\s*)${key}\\s+(.+)$`, 'm').exec(gradle);
  if (!match) {
    fail(`could not find ${key} in android/app/build.gradle.`);
  }
  return match[2].trim();
}

function readPbxValues(pbx, key) {
  const matches = [...pbx.matchAll(new RegExp(`${key} = ([^;]+);`, 'g'))].map(
    match => match[1].trim(),
  );
  if (matches.length !== PBX_CONFIG_COUNT) {
    fail(
      `expected ${PBX_CONFIG_COUNT} ${key} entries in the Xcode project, found ${matches.length}. ` +
        'The project layout changed; update scripts/release.js.',
    );
  }
  return matches;
}

function setPbxValue(pbx, key, value) {
  return pbx.replace(new RegExp(`(${key} = )[^;]+;`, 'g'), `$1${value};`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  assertCleanTree();

  const pkgRaw = fs.readFileSync(PACKAGE_JSON, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  const currentVersion = pkg.version;
  const nextVersion = bumpVersion(currentVersion, options.type);
  const tag = `v${nextVersion}`;

  assertTagIsFree(tag);

  const gradleRaw = fs.readFileSync(BUILD_GRADLE, 'utf8');
  const currentCode = Number(readGradleValue(gradleRaw, 'versionCode'));
  if (!Number.isInteger(currentCode)) {
    fail('versionCode in android/app/build.gradle is not a plain integer.');
  }
  const nextCode = currentCode + 1;

  const gradleName = readGradleValue(gradleRaw, 'versionName').replace(
    /"/g,
    '',
  );
  if (gradleName !== currentVersion) {
    console.warn(
      `release: warning — versionName (${gradleName}) and package.json (${currentVersion}) disagree; both will be set to ${nextVersion}.`,
    );
  }

  const pbxRaw = fs.readFileSync(PBXPROJ, 'utf8');
  const currentMarketing = readPbxValues(pbxRaw, 'MARKETING_VERSION');
  const currentProjectVersion = readPbxValues(
    pbxRaw,
    'CURRENT_PROJECT_VERSION',
  );

  const nextPkgRaw = pkgRaw.replace(
    /("version":\s*)"[^"]+"/,
    `$1"${nextVersion}"`,
  );
  const nextGradleRaw = gradleRaw
    .replace(/^(\s*versionCode\s+).+$/m, `$1${nextCode}`)
    .replace(/^(\s*versionName\s+).+$/m, `$1"${nextVersion}"`);
  const nextPbxRaw = setPbxValue(
    setPbxValue(pbxRaw, 'MARKETING_VERSION', nextVersion),
    'CURRENT_PROJECT_VERSION',
    nextCode,
  );

  const message = `Bump ${nextVersion} (${nextCode})`;

  console.log(`\n  version              ${currentVersion} -> ${nextVersion}`);
  console.log(`  versionCode          ${currentCode} -> ${nextCode}`);
  console.log(
    `  MARKETING_VERSION    ${currentMarketing.join('/')} -> ${nextVersion}`,
  );
  console.log(
    `  CURRENT_PROJECT_VER  ${currentProjectVersion.join('/')} -> ${nextCode}`,
  );
  console.log(`  commit               ${message}`);
  console.log(`  tag                  ${tag}`);
  console.log(`  push                 ${options.push ? 'yes' : 'no'}\n`);

  if (options.dryRun) {
    console.log('Dry run, nothing written.\n');
    return;
  }

  fs.writeFileSync(PACKAGE_JSON, nextPkgRaw);
  fs.writeFileSync(BUILD_GRADLE, nextGradleRaw);
  fs.writeFileSync(PBXPROJ, nextPbxRaw);

  git(
    'add',
    'package.json',
    'android/app/build.gradle',
    'ios/WorkNotes.xcodeproj/project.pbxproj',
  );
  git('commit', '-m', message);
  git('tag', '-a', tag, '-m', message);

  if (options.push) {
    const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
    git('push', 'origin', branch);
    git('push', 'origin', tag);
    console.log(`Pushed ${branch} and ${tag} to origin.\n`);
  } else {
    console.log(
      `Done. Push with: git push origin HEAD && git push origin ${tag}\n`,
    );
  }
}

main();
