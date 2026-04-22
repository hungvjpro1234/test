import type { Config } from 'jest';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TS_JEST = require.resolve('ts-jest', { paths: [__dirname] });

const config: Config = {
  displayName: 'frontend',
  testEnvironment: 'node',
  rootDir: PROJECT_ROOT,
  testMatch: ['<rootDir>/unit-test/frontend/tests/**/*.test.ts'],
  modulePaths: [path.resolve(__dirname, 'node_modules')],
  moduleNameMapper: {
    '^@frontend/(.*)$': path.resolve(__dirname, '../../frontend/app/$1'),
    '^@app/(.*)$': path.resolve(__dirname, '../../frontend/app/$1')
  },
  transform: {
    '^.+\\.tsx?$': [
      TS_JEST,
      {
        tsconfig: {
          target: 'ES2020',
          module: 'commonjs',
          strict: false,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          moduleResolution: 'node',
          baseUrl: '.',
          types: ['jest', 'node'],
          paths: {
            '@frontend/*': ['frontend/app/*'],
            '@app/*': ['frontend/app/*']
          }
        }
      }
    ]
  },
  setupFilesAfterEnv: [path.resolve(__dirname, 'setup.ts')],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'frontend/app/utils/**/*.ts',
    'frontend/app/utils/**/*.tsx'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/unit-test/'
  ],
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  coverageReporters: ['text', 'lcov', 'clover'],
  verbose: true
};

export default config;
