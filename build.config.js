const fs = require('fs');
const shell = require('shelljs');

function addEnvType(envType) {
  let txt = `const a:string = '${envType}';`;
  txt += `export default a;`;
  const b = 'src/envType.ts';
  fs.writeFile(b, txt.toString(), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`------Build ./${b}------`);
      console.log('');
      console.log('------Building now------');
      console.log('');
    }
  });
}

function isIn(v, k, v2) {
  if (v.indexOf(k) > -1) {
    v = `${v.split(k)[1]}`;
  } else {
    v = v2;
  }
  return v;
}

async function configArgv() {
  let argv = process.env.npm_config_argv;
  if (!argv) {
    return false;
  }
  argv = JSON.parse(argv);

  const plat = {
    'app-plus': 'APP',
    'h5': 'H5',
    'custom': 'custom',
    'mp-alipay': '支付宝小程序',
    'mp-baidu': '百度小程序',
    'mp-qq': 'QQ小程序',
    'mp-toutiao': '今日头条小程序',
    'mp-weixin': '微信小程序',
  };

  let runId = argv.original.indexOf('run');
  const buildType = argv.original[runId + 1];
  let envType = argv.original[runId + 2];
  envType = isIn(envType, 'env=', 'uat');
  let appType = argv.original[runId + 3];
  appType = isIn(appType, 'apptype=', 'aiplat');

  const envTxt = {
    uat: 'UAT',
    ver: 'VER',
    pro: '生产',
  };
  const buildDir = buildType.indexOf('build') > -1 ? 'build' : 'dev';
  const isDevTxt = buildType.indexOf('build') > -1 ? '构建' : '开发';
  console.log('');
  let platName = buildType.split(':');
  if (platName && platName.length > 1) {
    platName = platName[1];
  } else {
    platName = 'mp-weixin';
  }
  console.log(`------${plat[platName]}平台-->${envTxt[envType]}环境-->${isDevTxt}${appType}-------`);
  console.log('');
  await addEnvType(envType);

  shell.rm('-rf', `./dist/${buildDir}/.sourcemap`);
  const a = `./src/projects/${appType}/mpConf.ts`;
  const b = `./src/projects/${appType}/pages.json`;
  const c = `./src/projects/${appType}/${envType}/manifest.json`;
  shell.cp('-R', a, './src/mpConf.ts');
  shell.cp('-R', b, './src/pages.json');
  shell.cp('-R', c, './src/manifest.json');
  console.log('');
  console.log(`------Build ${a}------`);
  console.log(`------Build ${b}------`);
  console.log(`------Build ${c}------`);
}

configArgv();
