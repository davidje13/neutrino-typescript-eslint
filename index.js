const { CLIEngine } = require('eslint');
const merge = require('deepmerge');
const applyNeutrinoPatches = require('neutrino-patch');
const applyAdaptations = require('./applyAdaptations');
const { BASE_RULES, TYPESCRIPT_RULES } = require('./adaptations');

module.exports = () => (neutrino) => {
  applyNeutrinoPatches(neutrino);

  neutrino.tapAtEnd('lint', 'eslint', (options) => {
    if (options.useEslintrc) {
      return options;
    }

    const cliEngine = new CLIEngine(options);
    const jsRules = cliEngine.getConfigForFile('foo.js').rules;
    const tsRules = cliEngine.getConfigForFile('foo.ts').rules;
    const tsxRules = cliEngine.getConfigForFile('foo.tsx').rules;

    return merge(options, {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      baseConfig: {
        extends: ['plugin:@typescript-eslint/recommended'],
        settings: {
          'import/resolver': {
            node: {
              extensions: neutrino.options.extensions.map((ext) => `.${ext}`),
            },
          },
        },
        rules: applyAdaptations(jsRules, BASE_RULES),
        overrides: [
          {
            files: ['*.ts'],
            rules: applyAdaptations(tsRules, TYPESCRIPT_RULES),
          },
          {
            files: ['*.tsx'],
            rules: applyAdaptations(tsxRules, TYPESCRIPT_RULES),
          },
        ],
      },
    })
  });
};
