export default [
  {
    ignores: ['node_modules', 'build', '.next'],
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
  },
];

