const typescriptEslintConverter = require('typescript-eslint-converter');
const applyNeutrinoPatches = require('neutrino-patch');

module.exports = ({
  typescriptFiles = ['*.ts', '*.tsx'],
} = {}) => (neutrino) => {
  applyNeutrinoPatches(neutrino);

  neutrino.tapAtEnd('lint', 'eslint', (options) => {
    if (options.useEslintrc) {
      return options;
    }

    return typescriptEslintConverter(options, {
      typescriptFiles,
      resolveExtensions: neutrino.options.extensions,
      autoParseResolvableExtensions: true,
    });
  });
};
