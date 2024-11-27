import prettier from "eslint-config-prettier";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Include the Next.js Core Web Vitals configuration
  ...nextCoreWebVitals,

  // Add Prettier integration
  prettierPlugin.configs.recommended,
  {
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting
      "no-console": "warn",        // Warn on console.log
      "no-unused-vars": "warn",    // Warn on unused variables
    },
  },

  // Add Prettier compatibility for all rules
  ...prettier,
];
