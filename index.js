const { CLIEngine } = require('eslint');
const merge = require('deepmerge');
const applyNeutrinoPatches = require('neutrino-patch');
const applyAdaptations = require('./applyAdaptations');
const { BASE_RULES, TYPESCRIPT_RULES } = require('./adaptations');

function makeOverride(cliEngine, glob, adaptations) {
  const globList = Arrays.isArray(glob) ? glob : [glob];
  const sampleFileName = globList[0].replace(/\*+/g, 'x');

  const config = cliEngine.getConfigForFile(sampleFileName);
  const rules = applyAdaptations(config.rules, adaptations);

  return { files: globList, rules };
}

module.exports = ({
  typescriptFiles = ['*.ts', '*.tsx'],
} = {}) => (neutrino) => {
  applyNeutrinoPatches(neutrino);

  neutrino.tapAtEnd('lint', 'eslint', (options) => {
    if (options.useEslintrc) {
      return options;
    }

    // CLIEngine is not recommended but still available in 7+
    // We support 5.x and 6.x, so cannot update to ESLint yet
    const cliEngine = new CLIEngine(options);

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
        rules: applyAdaptations(cliEngine.getRules(), BASE_RULES),
        overrides: [
          ...typescriptFiles.map((glob) => makeOverride(cliEngine, glob, TYPESCRIPT_RULES)),

          // ESLint 7+ will automatically include files matched by overrides,
          // So this code means --ext foo,bar,baz isn't needed in the eslint command anymore
          ...neutrino.options.extensions.map((ext) => ({ files: [`**/*.${ext}`] })),
        ],
      },
    })
  });
};
