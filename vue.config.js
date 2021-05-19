const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const compressionWebpackPlugin = require('compression-webpack-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  filenameHashing:true,
  lintOnSave:false,
  css:{
    requireModuleExtension:true,
  },
  productionSourceMap:false,
  devServer:{
    compress:true,
    port:2016,
    disableHostCheck:true,
    hot:true,
    open:true,
  },
  parallel:require('os').cpus().length > 1,
  configureWebpack:cfg => {
    if (process.env.VUE_APP_PLATFORM === 'h5' && !devMode) {
      cfg.performance = {
        hints:'warning',
        maxEntrypointSize:20480000,
        maxAssetSize:20480000,
        assetFilter:function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      };
      cfg.plugins.push(new compressionWebpackPlugin({
        algorithm:'gzip',
        test:new RegExp('\\.(' + ['ts', 'js', 'css'].join('|') + ')$'),
        threshold:10240,
        minRatio:0.8
      }));
      cfg.optimization = {
        minimize:true,
        minimizer:[
          new cssMinimizerPlugin(),
        ],
      };
    }
    cfg.resolve.extensions = ['.ts', '.js', '.vue', '.json'];
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      '@':resolve('src'),
      'assets':resolve('src/assets'),
      'builds':resolve('src/builds'),
      'components':resolve('src/components'),
      'mixins':resolve('src/mixins'),
      'pages':resolve('src/pages'),
      'plugins':resolve('src/plugins'),
      'projects':resolve('src/projects'),
      'service':resolve('src/service'),
      'static':resolve('src/static'),
      'utils':resolve('src/utils'),
    };
  },
};
