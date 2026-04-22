const vm = require('vm');

// Simulate Jest's node environment setup
const context = vm.createContext();
const vmGlobal = vm.runInContext('this', context);
vmGlobal.global = vmGlobal; // Jest sets this

// Test: does new Function('return this')() inside vm context return vmGlobal or nodeGlobal?
const result = vm.runInContext(`
  var fn = new Function('return this');
  var g = fn();
  g === global; // Does it equal the vm's global?
`, context);

console.log('new Function("return this")() === vmGlobal:', result);
console.log('Are they the same object?', vmGlobal === global); // vmGlobal should NOT equal node global

// Also test what happens with coverage injection pattern
vm.runInContext(`
  var global = (new Function('return this'))();
  var gcv = '__coverage__';
  if (!global[gcv]) global[gcv] = {};
  global[gcv]['testkey'] = 'testvalue';
`, context);

console.log('vmGlobal.__coverage__:', vmGlobal.__coverage__);
console.log('nodeGlobal.__coverage__:', globalThis.__coverage__);
