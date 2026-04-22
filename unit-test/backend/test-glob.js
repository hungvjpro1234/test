const path = require('path');
const backendSrc = path.resolve(__dirname, '../../backend/src').replace(/\\/g, '/');
console.log('backendSrc:', backendSrc);
console.log('pattern:', backendSrc + '/utils/**/*.js');

// Kiểm tra glob version
const g = require('./node_modules/glob');
console.log('glob keys:', Object.keys(g));

// Thử cách khác
const { globSync } = g;
if (globSync) {
  const files = globSync(backendSrc + '/utils/**/*.js');
  console.log('files found (sync):', files.length);
  files.forEach(f => console.log(' -', f));
} else {
  // Older glob API
  g(backendSrc + '/utils/**/*.js', {}, (err, files) => {
    if (err) console.error('glob error:', err.message);
    else { console.log('files found:', files.length); files.forEach(f => console.log(' -', f)); }
  });
}
