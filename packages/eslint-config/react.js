import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxExpressionsPlugin from '@jgoz/eslint-plugin-jsx-expressions';

import { configs as baseConfigs } from './index.js';

export const reactConfigs = {
  default: [
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    {
      plugins: {
        'react-hooks': reactHooksPlugin,
      },
      rules: reactHooksPlugin.configs.recommended.rules,
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      rules: {
        // eslint-plugin-react (adds)
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': ['warn', 'never'],
        'react/jsx-curly-spacing': ['error', { when: 'never' }],
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
        'react/self-closing-comp': 'error',

        // eslint-plugin-react (overrides)
        'react/prop-types': 'off',
        'react/jsx-no-target-blank': 'off',
      },
    },
  ],
  reactTypeChecked: [
    {
      files: ['**/*.tsx'],
      plugins: {
        'jsx-expressions': jsxExpressionsPlugin,
      },
      rules: {
        'jsx-expressions/strict-logical-expressions': ['error', { allowString: true }],
      },
    },
  ],
  disableReactTypeChecked: {
    ...baseConfigs.disableTypeChecked,
    rules: {
      ...baseConfigs.disableTypeChecked.rules,
      'jsx-expressions/strict-logical-expressions': 'off',
    },
  },
};

export default reactConfigs.default;
