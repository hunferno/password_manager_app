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
    },
  },
  {
    ignores: ["node_modules/*", ".expo/*", "dist/*", "patches/*"],
  },
]);
