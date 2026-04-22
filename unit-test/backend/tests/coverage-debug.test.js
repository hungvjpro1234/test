const path = require('path');
const { isValidDate } = require(path.resolve(__dirname, '../../../backend/src/utils/dateHelper'));

test('check coverage data exists', () => {
  expect(isValidDate('2024-01-01')).toBe(true);
  // Kiểm tra xem Istanbul có inject __coverage__ không
  const covKeys = Object.keys(global.__coverage__ || {});
  console.log('Coverage keys count:', covKeys.length);
  console.log('Coverage keys:', covKeys.slice(0, 3));
  // Nếu coverage hoạt động, phải có entry cho dateHelper
  const dateHelperKey = covKeys.find(k => k.includes('dateHelper'));
  console.log('dateHelper coverage key:', dateHelperKey || 'NOT FOUND');
});
