# Neutrino Typescript ESLint

Provides typescript integration with ESLint for neutrino projects.

ESLint [replaces TSLint](https://eslint.org/blog/2019/01/future-typescript-eslint) for linting TypeScript.

Existing JavaScript rules will be converted to support TypeScript, so you can combine this with base configurations
such as airbnb easily. See below for full details.

## Installation

This package is intended for use with [neutrinojs-typescript](https://github.com/davidje13/neutrino-typescript#readme),
and any `eslint` module (e.g. `@neutrino/eslint` / `@neutrino/airbnb` / etc.),
so you should already have those installed and configured.

1. Install dependencies:

   ```bash
   npm install --save-dev neutrinojs-typescript-eslint
   ```

2. Include in `.neutrinorc.js`:

   ```javascript
   const typescriptLint = require('neutrinojs-typescript-eslint');
   // ...

   module.exports = {
     use: [
       typescript(), // must be first in use section
       typescriptLint(), // order does not matter; can be later
       eslint(), // or airbnb or any other eslint-based module
       node(), // or whichever target you are using
     ],
   };
   ```

3. Include type checking in `package.json` scripts:

   ```json
   {
     "scripts": {
       "lint": "eslint --format codeframe --ext mjs,jsx,js,tsx,ts src test && tsc"
     }
   }
   ```

   Note: if you are using eslint 7 or above, you can simplify the lint script:

   ```json
   {
     "scripts": {
       "lint": "eslint --format codeframe src test && tsc"
     }
   }
   ```

## Options

```javascript
// default values shown
typescriptLint({
  // file patterns where TypeScript rules are applied
  typescriptFiles: ['*.ts', '*.tsx'],

  // add "plugin:@typescript-eslint/recommended"
  recommended: true,

  // convert "indent" to "@typescript-eslint/indent"
  indent: false,
})
```

Note that `indent` is `false` by default due to
[known issues with @typescript-eslint/indent](https://github.com/typescript-eslint/typescript-eslint/issues/1824).

Any unrecognised options are passed through to `typescript-eslint-converter`.

## Automatic rule conversion

This uses [typescript-eslint-converter](https://github.com/davidje13/typescript-eslint-converter#readme) to
automatically convert Javascript rules to be TypeScript compatible.

All conversions only apply if an equivalent explicit configuration is not found.
