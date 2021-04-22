# awesome-code-style

Style guidelines for your favorite projects that use TypeScript and SCSS

## Installation

```sh
$ npm i -D @awesome-code-style/eslint-config @awesome-code-style/prettier-config @awesome-code-style/stylelint-config
```

If you are using npm v6 and below, you will also need the following:

```sh
$ npm i -D eslint stylelint prettier @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-header eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-unicorn
```

## Usage

### .eslintrc

```jsonc
{
  "extends": "@awesome-code-style",
  "parserOptions": {
    "project": "tsconfig.json" // path to your tsconfig.json file
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {}
}
```

### sasslint.json

```json
{
  "extends": "@awesome-code-style/stylelint-config",
  "rules": {}
}
```

### package.json

```json
{
  "prettier": "@awesome-code-style/prettier-config"
}
```

## Usual npm script commands

Here are some commands you might wanna add to your package.json file:

```json
{
  "scripts": {
    "eslint": "eslint 'src/**/*.ts?(x)'",
    "eslint-fix": "npm run eslint -- --fix",
    "eslint-changed-only": "git diff --diff-filter=ACMR --cached --name-only | grep -E \\.tsx\\?$ | xargs ./node_modules/.bin/eslint",
    "eslint-fix-changed-only": "npm run eslint-changed-only -- --fix",
    "sasslint": "./node_modules/.bin/stylelint --config sasslint.json 'src/**/*.scss'",
    "sasslint-fix": "npm run sasslint -- --fix",
    "sasslint-changed-only": "git diff --diff-filter=ACMR --name-only | grep -E \\.scss$ | xargs ./node_modules/.bin/stylelint --config sasslint.json",
    "sasslint-fix-changed-only": "npm run sasslint-changed-only -- --fix"
  }
}
```
