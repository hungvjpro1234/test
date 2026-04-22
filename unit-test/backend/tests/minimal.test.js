const path = require('path');
const { isValidDate } = require(path.resolve(__dirname, '../../../backend/src/utils/dateHelper'));
test('isValidDate', () => { expect(isValidDate('2024-01-01')).toBe(true); });
