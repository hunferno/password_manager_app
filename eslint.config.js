// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    rules: {
      // En React Native, le texte est rendu dans <Text> : pas d'entités HTML à échapper.
      "react/no-unescaped-entities": "off",
      // Règle introduite avec eslint-config-expo 58 (React Compiler). Le code
      // existant sera corrigé lors de la refonte des écrans : warning en attendant.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: ["node_modules/*", ".expo/*", "dist/*", "patches/*"],
  },
]);
