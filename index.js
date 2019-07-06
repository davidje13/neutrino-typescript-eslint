const merge = require('deepmerge');
const applyNeutrinoPatches = require('neutrino-patch');

module.exports = () => (neutrino) => {
  applyNeutrinoPatches(neutrino);

  neutrino.tapAtEnd('lint', 'eslint', (options) => {
    if (options.useEslintrc) {
      return options;
    }
    return merge(options, {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      baseConfig: {
        extends: [
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
        ],
        settings: {
          'import/resolver': {
            node: {
              extensions: neutrino.options.extensions.map((ext) => `.${ext}`),
            },
          },
        },
      },
    })
  });
};
