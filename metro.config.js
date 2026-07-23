const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Step 1: Apply NativeWind. withNativeWind sets its own babelTransformerPath
// internally — anything set before this call would be overwritten.
const nativeWindConfig = withNativeWind(config, { input: './global.css' });

// Step 2: Apply SVG transformer ON TOP of NativeWind's config.
// react-native-svg-transformer chains to the upstream transformer (NativeWind's)
// for all non-SVG files, so both pipelines remain active.
const { transformer, resolver } = nativeWindConfig;
nativeWindConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
nativeWindConfig.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = nativeWindConfig;
