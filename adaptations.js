function copyObjJsToTs(conf) {
  if (typeof conf !== 'object' || (!conf.js && !conf.jsx)) {
    return conf;
  }
  return { ts: conf.js, tsx: conf.jsx, ...conf };
}

function copyListJsToTs(list) {
  const converted = list
    .map((v) => v.startsWith('js') ? 'ts' + v.substr(2) : v.startsWith('.js') ? '.ts' + v.substr(3) : '')
    .filter((v) => v);
  return [...list, ...converted];
}

function copyGlobListJsToTs(list) {
  return list.map((v) => v
    .replace(/(?<=[{,])(\.?)js([^,}]*)(?=[,}])/g, '$1js$2,$1ts$2')
    .replace(/(?<=[^{,])\.js([^{},]*)$/, '.{js$1,ts$1}')
  );
}

const BASE_RULES = {
  'react/jsx-filename-extension': ([mode, opts = {}]) => ([mode, {
    ...opts,
    extensions: copyListJsToTs(opts.extensions || []),
  }]),
  'import/no-extraneous-dependencies': ([mode, opts = {}]) => ([mode, {
    ...opts,
    devDependencies: copyGlobListJsToTs(opts.devDependencies || []),
  }]),
  'import/extensions': (config) => config.map(copyObjJsToTs),
};

const TYPESCRIPT_RULES = {
  'getter-return': ['off'],
  'no-dupe-args': ['off'],
  'no-dupe-keys': ['off'],
  'no-unreachable': ['off'],
  'valid-typeof': ['off'],
  'babel/valid-typeof': ['off'],
  'no-const-assign': ['off'],
  'no-new-symbol': ['off'],
  'no-this-before-super': ['off'],
  'no-undef': ['off'],
  'no-dupe-class-members': ['off'],
  'no-redeclare': ['off'],

  'brace-style': '@typescript-eslint/brace-style',
  'comma-spacing': '@typescript-eslint/comma-spacing',
  'default-param-last': '@typescript-eslint/default-param-last',
  'func-call-spacing': '@typescript-eslint/func-call-spacing',
  'indent': ['off'], // require explicit opt-in due to https://github.com/typescript-eslint/typescript-eslint/issues/1824
  'no-array-constructor': '@typescript-eslint/no-array-constructor',
  'no-dupe-class-members': '@typescript-eslint/no-dupe-class-members',
  'no-empty-function': '@typescript-eslint/no-empty-function',
  'no-extra-parens': '@typescript-eslint/no-extra-parens',
  'no-extra-semi': '@typescript-eslint/no-extra-semi',
  'no-magic-numbers': '@typescript-eslint/no-magic-numbers', // note: ts version has additional config options
  'no-unused-expressions': '@typescript-eslint/no-unused-expressions',
  'babel/no-unused-expressions': '@typescript-eslint/no-unused-expressions',
  'no-unused-vars': '@typescript-eslint/no-unused-vars', // https://github.com/typescript-eslint/typescript-eslint/issues/1856
  'no-use-before-define': '@typescript-eslint/no-use-before-define', // note: ts version has additional config options, also see https://github.com/typescript-eslint/typescript-eslint/issues/1856
  'no-useless-constructor': '@typescript-eslint/no-useless-constructor',
  'quotes': '@typescript-eslint/quotes',
  'babel/quotes': '@typescript-eslint/quotes',
  'require-await': '@typescript-eslint/require-await',
  'no-return-await': '@typescript-eslint/return-await', // note: ts default 'in-try-catch' matches no-return-await
  'semi': '@typescript-eslint/semi',
  'babel/semi': '@typescript-eslint/semi',
  'space-before-function-paren': '@typescript-eslint/space-before-function-paren',
};

module.exports = {
  BASE_RULES,
  TYPESCRIPT_RULES,
};
