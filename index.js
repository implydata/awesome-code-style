module.exports = {
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended",
    "tslint-react",
    "tslint-config-prettier",
    "tslint-plugin-prettier"
  ],
  "jsRules": {},
  "rules": {
    "file-name-casing": [true, "kebab-case"],
    "interface-name": [false],
    "curly": [true, "ignore-same-line"],
    "max-line-length": [false],
    "no-consecutive-blank-lines": [true, 2],
    "object-literal-sort-keys": false,
    "no-empty": [false],
    "no-arg": true,
    "arrow-parens": false,
    "member-access": false,
    "member-ordering": [false],
    "completed-docs": false,
    "jsdoc-format": false,
    "prefer-for-of": false,
    "only-arrow-functions": false,
    "no-console": false,
    "array-type": false,
    "no-empty-interface": false,
    "forin": false,
    "indent": [true, "spaces", 2],
    "ban-types": [true,
      ["Object", "Use {} instead."],
      ["String", "Do you mean 'string'?"],
      ["Number", "Do you mean 'number'?"]
    ],
    "prefer-const": [true, {"destructuring": "all"}],
    "ordered-imports": [
      true,
      {
        "import-sources-order": "case-insensitive",
        "grouped-imports": true,
        "groups": [
          { "name": "parent directories", "match": "^\\.\\.", "order": 20 },
          { "name": "styles", "match": ".(css|scss)$", "order": 40 },
          { "name": "current directory", "match": "^\\.", "order": 30 },
          { "name": "libraries", "match": ".*", "order": 10 }
        ]
      }
    ],
    "object-literal-key-quotes": false,
    "one-line": [true,
      "check-catch",
      "check-else",
      "check-finally",
      "check-open-brace",
      "check-whitespace"
    ],
    "whitespace": [true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-module",
      "check-separator",
      "check-rest-spread",
      "check-type",
      "check-typecast",
      "check-type-operator"
    ],
    "jsx-boolean-value": [true, "never"],
    "jsx-curly-spacing": [true, "never"],
    "jsx-no-lambda": false,
    "jsx-no-multiline-js": false,
    "jsx-no-string-ref": true,
    "jsx-self-close": true,
    "jsx-wrap-multiline": false,
    "prettier": {
      "options": {
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": true,
        "printWidth": 100,
        "arrowParens": "avoid"
      }
    }
  }
}
