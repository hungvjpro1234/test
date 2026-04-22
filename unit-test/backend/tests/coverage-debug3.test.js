// Test ghi một custom coverage marker để xác định instrumentation có hoạt động không
const path = require('path');

// Manually import và check xem source file có được instrumented chưa
const srcFile = path.resolve(__dirname, '../../../backend/src/utils/dateHelper');

// Lấy cached module trước khi import (để check nếu đã có trong registry)
test('verify coverage mechanism', () => {
  // Import source file
  const { isValidDate, addDays } = require(srcFile);

  expect(isValidDate('2024-01-01')).toBe(true);
  expect(addDays(new Date('2024-01-01'), 5)).toBeDefined();

  // Kiểm tra coverage object
  const cov = global.__coverage__;
  console.log('typeof global.__coverage__:', typeof cov);
  console.log('__coverage__ keys:', Object.keys(cov || {}).length);

  if (cov && Object.keys(cov).length > 0) {
    const first = Object.keys(cov)[0];
    console.log('First covered file:', first);
    console.log('Statements covered:', Object.keys(cov[first].s || {}).length);
  }

  // Kiểm tra Jest coverage options
  console.log('process.env.JEST_WORKER_ID:', process.env.JEST_WORKER_ID);
});
