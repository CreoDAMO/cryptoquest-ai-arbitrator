import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    // Specify JavaScript language options
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module", // Treat files as ECMAScript modules
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
      globals: {
        ...globals.browser, // Include browser-specific globals like `window` and `console`
        ...globals.jest,    // Include Jest testing globals like `describe` and `test`
      },
    },

    // Include Prettier integration
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting
      "no-console": "warn",        // Warn on `console.log`
      "no-unused-vars": "warn",    // Warn on unused variables
      "react/jsx-uses-react": "off", // For React 17+ (automatic JSX runtime)
      "react/react-in-jsx-scope": "off", // For React 17+ (no need to import React)
    },
  },

  // Add Prettier compatibility for other rules
  ...prettier,
];
