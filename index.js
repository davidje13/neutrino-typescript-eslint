const typescriptEslintConverter = require('typescript-eslint-converter');
const applyNeutrinoPatches = require('neutrino-patch');

module.exports = (converterOptions) => (neutrino) => {
  applyNeutrinoPatches(neutrino);

  neutrino.tapAtEnd('lint', 'eslint', (options) => {
    if (options.useEslintrc) {
      return options;
    }

    return typescriptEslintConverter(options, {
      ...converterOptions,
      resolveExtensions: neutrino.options.extensions,
      autoParseResolvableExtensions: true,
    });
  });
};
