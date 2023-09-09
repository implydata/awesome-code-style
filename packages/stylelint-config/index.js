module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: ['stylelint-scss'],
  rules: {
    'indentation': 2,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': 'never',
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  },
};
