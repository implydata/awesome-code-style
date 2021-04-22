# awesome-code-style

Style guidelines for your favorite projects that use TypeScript and SCSS

## Installation

```sh
$ npm i -D @awesome-code-style/eslint-config @awesome-code-style/prettier-config @awesome-code-style/stylelint-config
```

If you are using npm v6 and below, you will also need the following:

```sh
$ npm i -D eslint stylelint prettier @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-unicorn
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
    "autofix": "npm run eslint-fix && npm run sasslint-fix && npm run prettify",
    "eslint": "eslint 'src/**/*.ts?(x)'",
    "eslint-fix": "npm run eslint -- --fix",
    "eslint-changed-only": "git diff --diff-filter=ACMR --cached --name-only | grep -E \\.tsx\\?$ | xargs ./node_modules/.bin/eslint",
    "eslint-fix-changed-only": "npm run eslint-changed-only -- --fix",
    "sasslint": "./node_modules/.bin/stylelint --config sasslint.json 'src/**/*.scss'",
    "sasslint-fix": "npm run sasslint -- --fix",
    "sasslint-changed-only": "git diff --diff-filter=ACMR --name-only | grep -E \\.scss$ | xargs ./node_modules/.bin/stylelint --config sasslint.json",
    "sasslint-fix-changed-only": "npm run sasslint-changed-only -- --fix",
    "prettify": "prettier --write 'src/**/*.{ts,tsx,scss}' './*.js'",
    "prettify-check": "prettier --check 'src/**/*.{ts,tsx,scss}' './*.js'"
  }
}
```

## Configuring your IDE

If you use a TypeScript friendly IDE (such as [WebStorm](https://www.jetbrains.com/webstorm/), or [VS Code](https://code.visualstudio.com/)), you can configure them to fix and format as you type.

### Configuring WebStorm

- **Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint**

  - Select "Automatic ESLint Configuration"
  - Check "Run eslint --fix on save"

- **Preferences | Languages & Frameworks | JavaScript | Prettier**
  - Set "Run for files" to `{**/*,*}.{js,ts,jsx,tsx,css,scss}`
  - Check "On code reformat"
  - Check "On save"

### Configuring VS Code

- Install `dbaeumer.vscode-eslint` extension
- Install `esbenp.prettier-vscode` extension
- Open User Settings (JSON) and set the following:
  ```json
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  ```

### Auto-fixing manually

It is also possible to auto-fix and format code without making IDE changes by running the following script:

- `npm run autofix` &mdash; run code linters and formatter

You could also run fixers individually:

- `npm run eslint-fix` &mdash; run code linter and fix issues
- `npm run sasslint-fix` &mdash; run style linter and fix issues
- `npm run prettify` &mdash; reformat code and styles
