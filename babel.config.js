module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@components': './src/components',
            '@theme':      './src/theme',
            '@models':     './models',
            '@services':   './services',
            '@store':      './store',
            '@hooks':      './hooks',
            '@utils':      './utils',
            '@constants':  './constants',
            '@config':     './config',
            '@providers':  './providers',
            '@mock':       './mock',
            '@features':   './features',
            '@navigation': './navigation',
            '@assets':     './assets',
          },
        },
      ],
      'react-native-reanimated/plugin', // must be last
    ],
  };
};
