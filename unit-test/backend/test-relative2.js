const path = require('path');
const { globsToMatcher, replacePathSepForGlob } = require('./node_modules/jest-util');

const rootDir = __dirname;
const filename = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js');

const relPath = path.relative(rootDir, filename);
const relPathForGlob = replacePathSepForGlob(relPath);

console.log('relForGlob     :', relPathForGlob);

// Simulating ORIGINAL relative patterns
const relPatterns = [
  '../../backend/src/utils/**/*.js',
  '../../backend/src/services/**/*.js',
  '!../../backend/src/**/*.config.js'
];

// Simulating ABSOLUTE patterns (current state after my fix)
const absPatterns = [
  'D:/ToDoList-2/Todo_list_app/backend/src/utils/**/*.js',
  'D:/ToDoList-2/Todo_list_app/backend/src/services/**/*.js',
  '!D:/ToDoList-2/Todo_list_app/backend/src/**/*.config.js'
];

console.log('\n--- Test relative patterns ---');
const matcherRel = globsToMatcher(relPatterns);
console.log('relPatterns match dateHelper:', matcherRel(relPathForGlob));

console.log('\n--- Test absolute patterns ---');
const matcherAbs = globsToMatcher(absPatterns);
console.log('absPatterns match dateHelper:', matcherAbs(relPathForGlob));

// Also test with absolute filename
const absForGlob = replacePathSepForGlob(filename);
console.log('\n--- Test absolute patterns vs absolute path ---');
console.log('absPatterns match abs path:', matcherAbs(absForGlob));
