module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'import'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    sourceType:  'module',
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any':          'warn',
    '@typescript-eslint/no-unused-vars':           ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion':    'warn',
    '@typescript-eslint/consistent-type-imports':  ['warn', { prefer: 'type-imports' }],

    // React
    'react/react-in-jsx-scope':   'off',  // not needed in React 18
    'react/prop-types':           'off',  // TypeScript handles this
    'react/display-name':         'off',

    // React Hooks
    'react-hooks/rules-of-hooks':  'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native
    'react-native/no-unused-styles':       'warn',
    'react-native/sort-styles':            'off',
    'react-native/no-inline-styles':       'warn',
    'react-native/no-color-literals':      'off', // theme tokens handle this

    // Imports
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'import/no-duplicates': 'error',

    // General
    'no-console':    ['warn', { allow: ['warn', 'error', 'info'] }],
    'prefer-const':  'error',
    'no-var':        'error',
    'eqeqeq':       ['error', 'always'],
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'build/',
    '*.config.js',
    'babel.config.js',
    'metro.config.js',
  ],
};
