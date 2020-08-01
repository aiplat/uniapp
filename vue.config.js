const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  css: {
    requireModuleExtension: true,
  },
  productionSourceMap: false,
  devServer: {
    compress: true,
    port: 2016,
    hot: true,
    open: true
  },
  configureWebpack: cfg => {
    if (process.env.VUE_APP_PLATFORM === 'h5') {
      cfg.performance = {
        hints: 'warning',
        maxEntrypointSize: 20480000,
        maxAssetSize: 20480000,
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      };
      cfg.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['ts', 'js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
    cfg.resolve.extensions = ['.ts', '.js', '.vue', '.json'];
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'builds': resolve('src/builds'),
      'components': resolve('src/components'),
      'mixins': resolve('src/mixins'),
      'pages': resolve('src/pages'),
      'plugins': resolve('src/plugins'),
      'projects': resolve('src/projects'),
      'service': resolve('src/service'),
      'static': resolve('src/static'),
      'utils': resolve('src/utils'),
    };
  }
};
