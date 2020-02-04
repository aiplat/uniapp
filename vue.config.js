const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  css: {
    requireModuleExtension: true,
  },
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
        'plugins': resolve('src/plugins'),
        'projects': resolve('src/projects'),
        'service': resolve('src/service'),
        'static': resolve('src/static'),
      }
    },
  },
};
