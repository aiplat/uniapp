const shell = require('shelljs');

function getNpmType() {
    const npmType = process.env.npm_config_registry;
    const confArgv = JSON.parse(process.env.npm_config_argv);
    let id = 2;
    if (npmType.indexOf('registry.npm.taobao.org') > -1) {
        id = 5;
    } else if (npmType.indexOf('registry.npmjs.org') > -1) {
        id = 2;
    } else if (npmType.indexOf('registry.yarnpkg.com') > -1) {
        id = 2;
    }
    if (id > confArgv.original.length - 1) {
        id = confArgv.original.length - 1;
    }
    return id;
}

if (process.env.npm_config_argv) {
  const confArgv = JSON.parse(process.env.npm_config_argv);
  const typeId = getNpmType();
  let appType = confArgv.original[typeId];
  if (appType.indexOf('apptype') > -1) {
    appType = `${appType.split('apptype=')[1]}`;
  } else {
    appType = 'aiplat';
  }
  const isDev = process.env.NODE_ENV === 'production' ? '构建' : '开发';

  const plat = {
    'mp-weixin': '微信小程序',
    'app-plus': 'app',
    'mp-alipay': '支付宝小程序',
    'mp-baidu': '百度小程序',
    'mp-toutiao': '今日头条小程序',
    'h5': 'H5'
  };

  console.log(`------${plat[process.env.UNI_PLATFORM]}平台-->${appType}-${isDev}环境------`);

  shell.cp('-R', `./src/projects/${appType}/mpConf.js`, './src/mpConf.js');
  shell.cp('-R', `./src/projects/${appType}/pages.json`, './src/pages.json');
  shell.cp('-R', `./src/projects/${appType}/manifest.json`, './src/manifest.json');
}

console.log('------build now------');

module.exports = {
    lintOnSave: true,
    css: {
        modules: true,
    },
};
