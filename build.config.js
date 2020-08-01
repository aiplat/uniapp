/*
 * @FilePath: \build.config.js
 * @Description:  
 * @Author: liangchaoming(womendi@qq.com)
 * @Date: 2020-07-17 09:17:59
 * @LastEditTime: 2020-08-01 10:44:40
 */ 
const fs = require('fs');
const shell = require('shelljs');

function addEnvType(envType) {
  let txt = `const a:string = '${envType}';`;
  txt += `export default a;`;
  const b = 'src/builds/envType.ts';
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
  v = v.includes(k) ? `${v.split(k)[1]}` : v2;
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
    'mp-360': '360小程序',
    'mp-alipay': '支付宝小程序',
    'mp-baidu': '百度小程序',
    'mp-qq': 'QQ小程序',
    'mp-toutiao': '今日头条小程序',
    'mp-weixin': '微信小程序',
  };

  let runId = argv.original.indexOf('run');
  const buildType = argv.original[runId + 1];
  let envType = argv.original[runId + 2];
  envType = envType ? isIn(envType, 'env=', 'uat') : 'uat';
  let type = argv.original[runId + 3];
  type = type ? isIn(type, 'type=', 'aiplat') : 'aiplat';

  const envTxt = {
    uat: 'UAT',
    ver: 'VER',
    pro: '生产',
  };
  const buildDir = buildType.includes('build') ? 'build' : 'dev';
  const isDevTxt = buildType.includes('build') ? '构建' : '开发';
  console.log('');
  let platName = buildType.split(':');
  if (platName && platName.length > 1) {
    platName = platName[1];
  } else {
    platName = 'mp-weixin';
  }
  console.log(`------${plat[platName]}平台-->${envTxt[envType]}环境-->${isDevTxt}${type}-------`);
  console.log('');
  await addEnvType(envType);

  shell.rm('-rf', `./dist/${buildDir}/.sourcemap`);
  const a = `./src/projects/${type}/mpConf.ts`;
  const b = `./src/projects/${type}/pages.json`;
  const c = `./src/projects/${type}/${envType}/manifest.json`;
  shell.cp('-R', a, './src/builds/mpConf.ts');
  shell.cp('-R', b, './src/pages.json');
  shell.cp('-R', c, './src/manifest.json');
  console.log('');
  console.log(`------Build ${a}------`);
  console.log(`------Build ${b}------`);
  console.log(`------Build ${c}------`);
}

configArgv();
