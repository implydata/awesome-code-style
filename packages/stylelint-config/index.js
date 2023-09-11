module.exports = {
  extends: 'stylelint-config-recommended-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/operator-no-newline-after': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  },
};
