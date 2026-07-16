#!/usr/bin/env node
/**
 * Verifies the working tree and dependencies, then bumps the app version and
 * the Android/iOS build number, commits and tags the release. Both platforms
 * share one build number. Signing/building stays in Android Studio.
 *
 * The "build" type is the exception: it bumps only the Android versionCode,
 * leaving the version, the versionName and iOS alone, and creates no tag. It is
 * for re-uploading the same release to the Play Console after a rejected AAB
 * burned a versionCode. It does drift the Android versionCode ahead of iOS's
 * CURRENT_PROJECT_VERSION; the next real release realigns them.
 *
 * Every check runs before anything is written, so a failed release leaves the
 * repo untouched.
 *
 * Usage:
 *   node ./scripts/release.js [patch|minor|major|build] [--dry-run] [--push]
 */

const fs = require('fs');
const path = require('path');
const {execFileSync, execSync} = require('child_process');

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
// Bumps the Android versionCode only. Not a semver bump, so it is kept out of
// RELEASE_TYPES and handled as a separate branch throughout.
const BUILD_TYPE = 'build';
const BUMP_TYPES = [...RELEASE_TYPES, BUILD_TYPE];

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
    } else if (BUMP_TYPES.includes(arg)) {
      options.type = arg;
    } else {
      fail(
        `unknown argument "${arg}". Expected ${BUMP_TYPES.join(
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

function preflight() {
  console.log('\nrelease: verifying dependencies against yarn.lock...\n');
  try {
    // Goes through a shell because yarn is a .cmd shim on Windows, which Node
    // refuses to spawn directly (EINVAL). The command is a fixed string, so
    // there is no argument escaping to get wrong.
    execSync('yarn install --frozen-lockfile', {cwd: ROOT, stdio: 'inherit'});
  } catch (error) {
    fail(
      `yarn install --frozen-lockfile exited with ${error.status}. Usually ` +
        'that means yarn.lock is out of sync with package.json. Nothing was ' +
        'bumped.',
    );
  }
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
  const buildOnly = options.type === BUILD_TYPE;

  assertCleanTree();

  const pkgRaw = fs.readFileSync(PACKAGE_JSON, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  const currentVersion = pkg.version;
  const nextVersion = buildOnly
    ? currentVersion
    : bumpVersion(currentVersion, options.type);

  // A build bump ships under the existing version, so it reuses its tag.
  const tag = buildOnly ? null : `v${nextVersion}`;
  if (tag) {
    assertTagIsFree(tag);
  }

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
      buildOnly
        ? `release: warning — versionName (${gradleName}) and package.json (${currentVersion}) disagree; a build bump leaves both as they are.`
        : `release: warning — versionName (${gradleName}) and package.json (${currentVersion}) disagree; both will be set to ${nextVersion}.`,
    );
  }

  // iOS is not touched by a build bump, so its project is not even read.
  const pbxRaw = buildOnly ? null : fs.readFileSync(PBXPROJ, 'utf8');
  const currentMarketing = buildOnly
    ? null
    : readPbxValues(pbxRaw, 'MARKETING_VERSION');
  const currentProjectVersion = buildOnly
    ? null
    : readPbxValues(pbxRaw, 'CURRENT_PROJECT_VERSION');

  // Runs once every cheap guard above has passed, so a stale tag or a broken
  // gradle file fails instantly instead of after a full install.
  preflight();

  const nextGradleRaw = buildOnly
    ? gradleRaw.replace(/^(\s*versionCode\s+).+$/m, `$1${nextCode}`)
    : gradleRaw
        .replace(/^(\s*versionCode\s+).+$/m, `$1${nextCode}`)
        .replace(/^(\s*versionName\s+).+$/m, `$1"${nextVersion}"`);

  const message = buildOnly
    ? `Bump Android build ${nextCode} (${currentVersion})`
    : `Bump ${nextVersion} (${nextCode})`;

  console.log(
    `\n  version              ${currentVersion}${
      buildOnly ? ' (unchanged)' : ` -> ${nextVersion}`
    }`,
  );
  console.log(`  versionCode          ${currentCode} -> ${nextCode}`);
  if (!buildOnly) {
    console.log(
      `  MARKETING_VERSION    ${currentMarketing.join('/')} -> ${nextVersion}`,
    );
    console.log(
      `  CURRENT_PROJECT_VER  ${currentProjectVersion.join(
        '/',
      )} -> ${nextCode}`,
    );
  } else {
    console.log('  iOS                  untouched');
  }
  console.log(`  commit               ${message}`);
  console.log(`  tag                  ${tag ?? 'none'}`);
  console.log(`  push                 ${options.push ? 'yes' : 'no'}\n`);

  if (options.dryRun) {
    console.log('Dry run, nothing written.\n');
    return;
  }

  fs.writeFileSync(BUILD_GRADLE, nextGradleRaw);
  if (!buildOnly) {
    fs.writeFileSync(
      PACKAGE_JSON,
      pkgRaw.replace(/("version":\s*)"[^"]+"/, `$1"${nextVersion}"`),
    );
    fs.writeFileSync(
      PBXPROJ,
      setPbxValue(
        setPbxValue(pbxRaw, 'MARKETING_VERSION', nextVersion),
        'CURRENT_PROJECT_VERSION',
        nextCode,
      ),
    );
  }

  git(
    'add',
    ...(buildOnly
      ? ['android/app/build.gradle']
      : [
          'package.json',
          'android/app/build.gradle',
          'ios/WorkNotes.xcodeproj/project.pbxproj',
        ]),
  );
  git('commit', '-m', message);
  if (tag) {
    git('tag', '-a', tag, '-m', message);
  }

  if (options.push) {
    const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
    git('push', 'origin', branch);
    if (tag) {
      git('push', 'origin', tag);
    }
    console.log(`Pushed ${branch}${tag ? ` and ${tag}` : ''} to origin.\n`);
  } else {
    console.log(
      `Done. Push with: git push origin HEAD${
        tag ? ` && git push origin ${tag}` : ''
      }\n`,
    );
  }
}

main();
