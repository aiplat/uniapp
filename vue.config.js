const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const compressionWebpackPlugin = require('compression-webpack-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

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
    if (process.env.VUE_APP_PLATFORM === 'h5') {
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
        moduleIds: 'size',
        minimize: true,
        minimizer: [
          new cssMinimizerPlugin(),
        ],
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: Infinity,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 9,
              minChunks: 1,
              reuseExistingChunk: true,
              enforce: true,
              // chunks: 'all',
            },
            commons: {
              name: 'commons',
              priority: 8,
              minChunks: 2,
              reuseExistingChunk: true,
              enforce: true,
              chunks: 'all',
            },
            default: {
              minChunks: 2,
              priority: 7,
            }
          }
        }
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
  chainWebpack: cfg => {
    cfg.plugins.delete('prefetch');
    if (process.env.VUE_APP_PLATFORM === 'h5' && !devMode) {
      cfg.module.loaders = [
        {
          test: /.s?css$/,
          use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }
      ];
    }
    if (process.env.npm_config_report && !devMode) {
      cfg.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end();
    }
  }
};
