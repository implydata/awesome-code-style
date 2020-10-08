# awesome-code-style

Style guidelines for your favorite projects that use TypeScript and SCSS

## Installation

`$ npm i -D tslint stylelint awesome-code-style`

## Usage

### tslint.json

```
{
  "extends": "awesome-code-style/tslint.json",
  "rules": {
  },
  "linterOptions": {
    "format": "useful"
  }
}

```

### sasslint.json

```
 {
  "extends": "awesome-code-style/sasslint.json",
  "rules": {
  }
}

```

## package.json

```
      "prettier": {
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": true,
        "printWidth": 100,
        "arrowParens": "avoid"
      }
```

## Usual npm script commands

Here are some commands you might wanna add to your package.json file:

```
{
  "scripts": {
    "tslint": "./node_modules/.bin/tslint -c tslint.json --project tsconfig.json --formatters-dir ./node_modules/awesome-code-style/formatter 'src/**/*.ts?(x)'",
    "tslint-fix": "npm run tslint -- --fix",
    "tslint-changed-only": "git diff --diff-filter=ACMR --name-only | grep -E \\.tsx\\?$ | xargs ./node_modules/.bin/tslint -c tslint.json --project tsconfig.json --formatters-dir ./node_modules/awesome-code-style/formatter",
    "tslint-fix-changed-only": "npm run tslint-changed-only -- --fix",
    "sasslint": "./node_modules/.bin/stylelint --config sasslint.json 'src/**/*.scss'",
    "sasslint-fix": "npm run sasslint -- --fix",
    "sasslint-changed-only": "git diff --diff-filter=ACMR --name-only | grep -E \\.scss$ | xargs ./node_modules/.bin/stylelint --config sasslint.json",
    "sasslint-fix-changed-only": "npm run sasslint-changed-only -- --fix"
  }
}
```
