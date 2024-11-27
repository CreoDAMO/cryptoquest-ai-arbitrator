import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Manually add the core-web-vitals rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/jsx-no-target-blank": "error",
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },

  // Add Prettier compatibility
  prettierPlugin.configs.recommended,
  ...prettier,
];
