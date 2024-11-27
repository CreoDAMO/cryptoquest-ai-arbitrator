const prettier = require("eslint-config-prettier");
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  // Include the Next.js Core Web Vitals configuration
  ...nextCoreWebVitals,

  // Add Prettier integration
  prettierPlugin.configs.recommended,
  {
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },

  // Add Prettier compatibility for all rules
  ...prettier,
];
