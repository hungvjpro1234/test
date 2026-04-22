const path = require('path');
const { globsToMatcher, replacePathSepForGlob } = require('./node_modules/jest-util');

const rootDir = __dirname; // D:\...\unit-test\backend
const filename = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js');

const relPath = path.relative(rootDir, filename);
const relPathForGlob = replacePathSepForGlob(relPath);

console.log('rootDir    :', rootDir);
console.log('filename   :', filename);
console.log('relative   :', relPath);
console.log('relForGlob :', relPathForGlob);

// Test các pattern khác nhau
const patterns = [
  '../../backend/src/utils/**/*.js',
  '../backend/src/utils/**/*.js',
  '**/backend/src/utils/**/*.js',
  '**/*.js',
];

for (const pat of patterns) {
  const matcher = globsToMatcher([pat]);
  const result = matcher(relPathForGlob);
  console.log(`pattern "${pat}" → match: ${result}`);
}
