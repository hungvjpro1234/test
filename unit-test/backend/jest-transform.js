/**
 * Custom transform wrapper cho babel-jest.
 *
 * Vấn đề: babel-jest dùng `config.cwd` (= thư mục chạy `npx jest`) làm `cwd`
 * cho babel-plugin-istanbul. Vì các source files nằm ngoài `cwd`, chúng
 * không được instrument → coverage = 0.
 *
 * Fix: Patch `config.cwd` thành `rootDir` (Todo_list_app/) trước khi gọi
 * babel-jest, để istanbul instrument đúng các source files.
 */
const babelJest = require('babel-jest');
const path = require('path');

const transformer = babelJest.default ?? babelJest;

module.exports = {
  ...transformer,
  canInstrument: true,
  process(sourceText, sourcePath, transformOptions) {
    if (sourcePath && sourcePath.includes('dateHelper')) {
      process.stderr.write('[TRANSFORM] process called for ' + sourcePath + '\n');
      process.stderr.write('[TRANSFORM] instrument=' + transformOptions.instrument + ' cwd=' + transformOptions.config.cwd + ' rootDir=' + transformOptions.config.rootDir + '\n');
    }
    // Patch config.cwd = rootDir để babel-plugin-istanbul nhận đúng cwd
    const patchedOptions = {
      ...transformOptions,
      config: {
        ...transformOptions.config,
        cwd: transformOptions.config.rootDir,
      },
    };
    const result = transformer.process(sourceText, sourcePath, patchedOptions);
    if (sourcePath && sourcePath.includes('dateHelper')) {
      const code = typeof result === 'string' ? result : result.code;
      process.stderr.write('[TRANSFORM] result has __coverage__: ' + (code && code.includes('__coverage__')) + '\n');
    }
    return result;
  },
  processAsync(sourceText, sourcePath, transformOptions) {
    const patchedOptions = {
      ...transformOptions,
      config: {
        ...transformOptions.config,
        cwd: transformOptions.config.rootDir,
      },
    };
    return transformer.processAsync
      ? transformer.processAsync(sourceText, sourcePath, patchedOptions)
      : Promise.resolve(transformer.process(sourceText, sourcePath, patchedOptions));
  },
};
