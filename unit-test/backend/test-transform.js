// Kiểm tra trực tiếp xem babel-jest có instrument file không
const path = require('path');
const fs = require('fs');
const babelJest = require('./node_modules/babel-jest').default || require('./node_modules/babel-jest');

const filename = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js');
const source = fs.readFileSync(filename, 'utf-8');

// Thử transform với instrument = true
const result = babelJest.process(source, filename, {
  instrument: true,
  supportsDynamicImport: false,
  supportsExportNamespaceFrom: false,
  supportsStaticESM: false,
  supportsTopLevelAwait: false,
  rootDir: __dirname,
  extensionsToTreatAsEsm: [],
});

const code = typeof result === 'string' ? result : result.code;
const hasIstanbul = code && code.includes('__cov_') || (code && code.includes('cov_'));
const hasCovStatement = code && (code.includes('s[') || code.includes('b[') || code.includes('f['));
console.log('Has istanbul coverage:', hasIstanbul);
console.log('Has coverage statements:', hasCovStatement);
if (code) {
  console.log('\nFirst 300 chars of transformed code:');
  console.log(code.substring(0, 300));
}
