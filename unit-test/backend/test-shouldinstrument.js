const path = require('path');
const shouldInstrument = require('./node_modules/@jest/transform/build/shouldInstrument').default;
const { globsToMatcher, replacePathSepForGlob } = require('./node_modules/jest-util');

const rootDir = __dirname;
const filename = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js');

const options = {
  collectCoverage: true,
  collectCoverageFrom: [
    '../../backend/src/utils/**/*.js',
    '../../backend/src/services/**/*.js',
    '!../../backend/src/**/*.config.js'
  ],
  coverageProvider: 'babel',
};

const config = {
  rootDir,
  forceCoverageMatch: [],
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: [],
  testMatch: ['**/tests/**/*.test.js'],
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  globalSetup: null,
  globalTeardown: null,
  setupFiles: [path.resolve(rootDir, 'setup.js')],
  setupFilesAfterEnv: [],
};

const result = shouldInstrument(filename, options, config);
console.log('filename:', filename);
console.log('relative:', replacePathSepForGlob(path.relative(rootDir, filename)));
console.log('collectCoverageFrom:', options.collectCoverageFrom);
console.log('shouldInstrument result:', result);

// Also check match directly
const matcher = globsToMatcher(options.collectCoverageFrom);
const rel = replacePathSepForGlob(path.relative(rootDir, filename));
console.log('direct match:', matcher(rel));
