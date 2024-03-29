module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'unused-imports'],
  rules: {
    // eslint (adds)
    'eqeqeq': ['error', 'smart'],
    'max-classes-per-file': ['error', 1],
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'one-var': ['error', 'never'],
    'prefer-object-spread': 'warn',
    'radix': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],

    // eslint (overrides)
    'no-empty': 'off',
    'no-fallthrough': 'off',
    'prefer-const': ['error', { destructuring: 'all' }],

    // @typescript-eslint (adds)
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    '@typescript-eslint/lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    '@typescript-eslint/member-ordering': 'off', // TODO: use?
    '@typescript-eslint/naming-convention': 'off', // TODO: use?
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    '@typescript-eslint/no-shadow': ['off', { ignoreTypeValueShadow: true }], // TODO: use?
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': 'error',

    // @typescript-eslint (overrides)
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off', // TODO: use?
    '@typescript-eslint/no-unsafe-assignment': 'off', // TODO: use?
    '@typescript-eslint/no-unsafe-call': 'off', // TODO: use?
    '@typescript-eslint/no-unsafe-member-access': 'off', // TODO: use?
    '@typescript-eslint/no-unsafe-return': 'off', // TODO: use?
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',

    // eslint-plugin-simple-import-sort, eslint-plugin-import
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports (except (s)css files)
          ['^\\u0000(?!.+.s?css)'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative parent imports.
          // Anything that starts with two dots.
          ['^\\.\\.'],
          // Relative local imports.
          // Anything that starts with one dot.
          ['^\\.'],
          // (s)css imports
          ['^\\u0000.+.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',

    // eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
};
