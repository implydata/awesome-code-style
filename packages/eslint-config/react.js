import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxExpressionsPlugin from '@jgoz/eslint-plugin-jsx-expressions';
import { defineConfig } from 'eslint/config';

import { configs as baseConfigs } from './index.js';

export const reactConfigs = {
  default: defineConfig([
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
      extends: ['react-hooks/recommended'],
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
    {
      files: ['**/*.spec.jsx', '**/*.spec.tsx'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ]),
  reactTypeChecked: defineConfig([
    {
      files: ['**/*.tsx'],
      plugins: {
        'jsx-expressions': jsxExpressionsPlugin,
      },
      rules: {
        'jsx-expressions/strict-logical-expressions': ['error', { allowString: true }],
      },
    },
  ]),
  disableReactTypeChecked: defineConfig(baseConfigs.disableTypeChecked, {
    rules: {
      ...baseConfigs.disableTypeChecked.rules,
      'jsx-expressions/strict-logical-expressions': 'off',
    },
  }),
};

export default reactConfigs.default;
