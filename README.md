# Neutrino Typescript ESLint

Provides typescript integration with ESLint for neutrino projects.

ESLint [replaces TSLint](https://eslint.org/blog/2019/01/future-typescript-eslint) for linting TypeScript.

## Installation

This package is intended for use with [neutrino-typescript](https://github.com/davidje13/neutrino-typescript#readme),
and any `eslint` module (e.g. `@neutrino/eslint` / `@neutrino/airbnb` / etc.),
so you should already have those installed and configured.

1. Install dependencies:

   ```bash
   npm install --save-dev git+https://github.com/davidje13/neutrino-typescript-eslint#semver:^1.0.1
   ```

2. Include in `.neutrinorc.js`:

   ```javascript
   const typescriptLint = require('neutrino-typescript-eslint');
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
   },
   ```
