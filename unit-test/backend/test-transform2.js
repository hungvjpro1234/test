// Kiểm tra trực tiếp ScriptTransformer behavior
const path = require('path');
const fs = require('fs');

// Simulate exactly what Jest does
const { createScriptTransformer } = require('./node_modules/@jest/transform');

const rootDir = path.resolve(__dirname, '../..');
const filename = path.resolve(rootDir, 'backend/src/utils/dateHelper.js');
const source = fs.readFileSync(filename, 'utf-8');

console.log('rootDir:', rootDir);
console.log('filename:', filename);

// Create a minimal config similar to what Jest uses
const config = {
  rootDir,
  automock: false,
  cacheDirectory: '/tmp/jest-cache-test',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  extensionsToTreatAsEsm: [],
  forceCoverageMatch: [],
  globals: {},
  moduleNameMapper: [],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/unit-test/backend/tests/**/*.test.js'],
  testPathIgnorePatterns: [],
  testRegex: [],
  transform: [['\\.[jt]sx?$', path.resolve(__dirname, 'node_modules/babel-jest/build/index.js'), {}]],
  transformIgnorePatterns: ['\\\\node_modules\\\\'],
  watchPathIgnorePatterns: [],
};

const options = {
  collectCoverage: true,
  collectCoverageFrom: ['backend/src/utils/**/*.js'],
  coverageProvider: 'babel',
  isInternalModule: false,
  supportsDynamicImport: false,
  supportsExportNamespaceFrom: false,
  supportsStaticESM: false,
  supportsTopLevelAwait: false,
};

async function run() {
  try {
    const transformer = await createScriptTransformer(config);
    console.log('Transformer created');

    const result = transformer.transform(filename, options, source);
    const code = typeof result === 'string' ? result : result.code;
    const hasCoverage = code && (code.includes('__coverage__') || code.includes('cov_'));
    console.log('Transform result has code:', !!code);
    console.log('Has coverage counters:', hasCoverage);
    if (code) {
      console.log('Code snippet:', code.substring(0, 200));
    }
  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  }
}

run();
