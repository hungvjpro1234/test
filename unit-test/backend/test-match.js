const micromatch = require('./node_modules/micromatch');
const path = require('path');
const backendSrc = path.resolve(__dirname, '../../backend/src').replace(/\\/g, '/');
const pattern = backendSrc + '/utils/**/*.js';
const filePathUnix = backendSrc + '/utils/dateHelper.js';
const filePathWin = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js'); // backslash

console.log('pattern      :', pattern);
console.log('file (unix)  :', filePathUnix);
console.log('file (win)   :', filePathWin);
console.log('match unix   :', micromatch.isMatch(filePathUnix, pattern));
console.log('match win    :', micromatch.isMatch(filePathWin, pattern));
console.log('match win+norm:', micromatch.isMatch(filePathWin.replace(/\\/g, '/'), pattern));
