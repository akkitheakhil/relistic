const expo = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  // Expo base (TS, JSX, platform globals, RN file extensions)
  expo,

  // Your tweaks
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-native': require('eslint-plugin-react-native'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // React / hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],

      // RN: useful defaults
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',

      // TypeScript niceties
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Let Prettier handle formatting conflicts
      // (when using flat config, we don't "extend" eslint-config-prettier, so keep rules minimal)
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]);
