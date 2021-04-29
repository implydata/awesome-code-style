module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  rules: {
    // eslint-plugin-react (adds)
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['warn', 'never'],
    'react/jsx-curly-spacing': ['error', { when: 'never' }],
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/self-closing-comp': 'error',

    // eslint-plugin-react (overrides)
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
  },
};
