module.exports = function (api) {
  api.cache(true);
  return {
    // babel-preset-expo ajoute automatiquement le plugin react-native-worklets
    // (Reanimated 4), il ne faut plus le déclarer ici.
    presets: ["babel-preset-expo"],
  };
};
