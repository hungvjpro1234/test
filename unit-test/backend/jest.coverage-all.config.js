/** @type {import('jest').Config} */
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

module.exports = {
  displayName: 'backend-all-coverage',
  testEnvironment: 'node',
  rootDir: PROJECT_ROOT,
  testMatch: [
    '<rootDir>/unit-test/backend/tests/**/*.test.js',
    '<rootDir>/unit-test/backend/tests-integration/**/*.int.test.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/unit-test/backend/tests/coverage-debug.test.js',
    '<rootDir>/unit-test/backend/tests/coverage-debug2.test.js',
    '<rootDir>/unit-test/backend/tests/coverage-debug3.test.js',
    '<rootDir>/unit-test/backend/tests/coverage-debug4.test.js',
    '<rootDir>/unit-test/backend/tests/minimal.test.js'
  ],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@backend/(.*)$': path.resolve(__dirname, '../../backend/src/$1'),
    '^@src/(.*)$': path.resolve(__dirname, '../../backend/src/$1')
  },
  setupFiles: [path.resolve(__dirname, 'setup.integration.js')],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'backend/src/utils/**/*.js',
    'backend/src/services/**/*.js',
    '!backend/src/**/*.config.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/unit-test/',
    '<rootDir>/backend/tests/'
  ],
  coverageDirectory: path.resolve(__dirname, 'coverage-all'),
  coverageReporters: ['text', 'lcov', 'json'],
  testTimeout: 30000,
  verbose: true
};
