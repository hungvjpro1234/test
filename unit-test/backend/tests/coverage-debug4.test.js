const path = require('path');
const Module = require('module');

// Kiểm tra xem source file có bị intercept bởi Jest không
const srcPath = path.resolve(__dirname, '../../../backend/src/utils/dateHelper.js');

test('check if jest intercepts require', () => {
  // Cách để check: xem require function nào đang được dùng
  console.log('require === module.require:', require === module.require);
  console.log('require constructor:', require.constructor.name);

  // Thử load qua Jest require
  const mod = require(srcPath);
  console.log('module keys:', Object.keys(mod).slice(0, 3));

  // Check xem module đã được register trong Jest không
  // Jest track file transforms trong _fileTransforms
  const jestObject = global.jest;
  console.log('jest.fn available:', typeof (jestObject && jestObject.fn));

  // Check nếu coverage đã được setup cho file này
  const cov = global.__coverage__ || {};
  const covKey = Object.keys(cov).find(k => k.includes('dateHelper'));
  console.log('dateHelper in __coverage__:', covKey || 'NOT FOUND');
  console.log('All __coverage__ keys:', Object.keys(cov).length);
});
