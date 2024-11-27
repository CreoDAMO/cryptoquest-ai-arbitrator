module.exports = [
  {
    extends: "next/core-web-vitals",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      // Custom ESLint rules can be added here
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];
