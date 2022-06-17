const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const base = require('./base');
const helpers = require('./helpers');

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'prepend',
  }),
})(base, {
  mode: 'production',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: './js/[name].[chunkhash].js',
    assetModuleFilename: './images/[hash][ext][query]',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv({
      path: 'prod.env',
    }),
  ],
});
