// Test xem babel transform có thực sự instrument code không
test('check instrumentation', () => {
  // Nếu file này được instrument, global.__coverage__ sẽ có entry cho file này
  const keys = Object.keys(global.__coverage__ || {});
  console.log('__coverage__ keys:', keys.length);

  // Check xem file này có được instrument không
  const thisFile = keys.find(k => k.includes('coverage-debug2'));
  console.log('This file instrumented:', thisFile ? 'YES (' + thisFile + ')' : 'NO');

  expect(1 + 1).toBe(2);
});
