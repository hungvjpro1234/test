/**
 * Jest Global Setup
 * Chạy trước mỗi test file
 */

// Tắt console.log, console.warn trong test để output gọn hơn
// Comment out nếu cần debug
// global.console.log = jest.fn();
// global.console.warn = jest.fn();
// global.console.error = jest.fn();

// Tăng timeout cho async tests nếu cần
jest.setTimeout(10000);
