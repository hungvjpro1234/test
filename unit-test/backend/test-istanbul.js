// Test trực tiếp babel-plugin-istanbul
const path = require('path');
const fs = require('fs');
const { transformSync } = require('./node_modules/@babel/core');
const babelPluginIstanbul = require('./node_modules/babel-plugin-istanbul');

const filename = path.resolve(__dirname, '../../backend/src/utils/dateHelper.js');
const source = fs.readFileSync(filename, 'utf-8');

const rootDir = path.resolve(__dirname, '../..'); // Todo_list_app/

console.log('rootDir (cwd for istanbul):', rootDir);
console.log('filename:', filename);
console.log('Is file inside rootDir?', filename.startsWith(rootDir));

try {
  const result = transformSync(source, {
    auxiliaryCommentBefore: ' istanbul ignore next ',
    babelrc: false,
    configFile: false,
    filename,
    plugins: [
      [
        babelPluginIstanbul.default || babelPluginIstanbul,
        {
          compact: false,
          cwd: rootDir,
          exclude: [],
          extension: false,
          useInlineSourceMaps: false,
        }
      ]
    ],
    sourceMaps: false,
  });

  const code = result?.code || '';
  const hasCoverage = code.includes('__cov_') || code.includes('cov_') || code.includes('s[') || code.includes('"s":');
  console.log('\nTransform succeeded:', !!result?.code);
  console.log('Has coverage counters:', hasCoverage);
  if (hasCoverage) {
    // Find coverage init
    const match = code.match(/var cov_\w+/);
    console.log('Coverage var:', match ? match[0] : 'not found');
  } else {
    console.log('First 200 chars:', code.substring(0, 200));
  }
} catch (e) {
  console.error('Transform error:', e.message);
}
