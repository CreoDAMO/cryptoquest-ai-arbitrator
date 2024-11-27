module.exports = [
  {
    extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error", // Ensure Prettier rules are enforced
      "no-console": "warn", // Warn on console statements
      "no-unused-vars": "warn", // Warn on unused variables
    },
  },
];