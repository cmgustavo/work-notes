#!/usr/bin/env node
const fs = require('fs');

(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Please set NODE_ENV to production');
    return;
  }

  const gradleProperties = `${__dirname}/../android/gradle.properties`;
  let content = fs.readFileSync(gradleProperties, 'utf8');
  content = content.replace(
    'PLAY_STORE_PASSWORD',
    process.env.WORKNOTES_PLAY_STORE_PASSWORD,
  );
  content = content.replace(
    'KEY_STORE_PASSWORD',
    process.env.WORKNOTES_KEY_STORE_PASSWORD,
  );
  fs.writeFileSync(gradleProperties, content);

  console.log(
    `${process.env.NODE_ENV.toUpperCase()} Google Play Store overrides complete.`,
  );
})();
