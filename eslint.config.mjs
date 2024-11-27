import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", {
        singleQuote: false,
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        printWidth: 100,
        bracketSpacing: true,
        endOfLine: "auto"
      }],
      "no-console": "warn",
      "no-unused-vars": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  prettier,
];
