const fs = require('fs');
const shell = require('shelljs');
const currentDir =  '.';

interface fileData{
  file:string,
  content:string,
}

interface buildFileData{
  oldFile:string,
  newFile:string,
}

interface envData{
  runId:number,
  envType:string,
  type:string,
  buildType:string,
}

class buildClass{
  public buildInfo:envData;
  public envTxt:any = {
    sit:'SIT',
    uat:'UAT',
    ver:'VER',
    pro:'生产',
  };
  constructor() {
    this.buildInfo = {
      runId:0,
      buildType:'dev',
      envType:'uat',
      type:'binding',
    };
  }
  writeFile(fileData:fileData) {
    return new Promise((resolve) => {
      fs.writeFile(fileData.file, fileData.content, (err:any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`------Build ./${fileData.file}------`);
        }
        resolve(true);
      });
    });
  }
  readFile(fileData:fileData) {
    return new Promise((resolve) => {
      fs.readFile(fileData.file, 'utf8', (err:any, data:string) => {
        if (err) {
          console.error(err);
        }
        resolve(data);
      });
    });
  }
  isIn(value:string, key:string, defaultValue:string) {
    value = value.includes(key) ? `${value.split(key)[1]}` :defaultValue;
    return value;
  }
  buildFile(data:buildFileData) {
    shell.cp('-R', data.oldFile, data.newFile);
    console.log(`------Build ${data.newFile}------`);
  }
  getEnv() {
    return new Promise((resolve) => {
      let argv = process.env.npm_config_argv;
      if (!argv) {
        resolve(false);
        return false;
      }
      argv = JSON.parse(argv);

      let runId = argv.original.indexOf('run');
      const buildType = argv.original[runId + 1];
      let envType = argv.original[runId + 2];
      envType = envType ? this.isIn(envType, 'env=', 'uat') :'uat';
      let type = argv.original[runId + 3];
      type = type ? this.isIn(type, 'type=', 'binding') :'binding';
      this.buildInfo = {
        runId,
        buildType,
        envType,
        type,
      }
      resolve(true);
    });
  }
  getAppTypeName(type = 'h5') {
    const appType:any = {
      'app-plus':'APP',
      'h5':'H5',
      'custom':'custom',
      'mp-360':'360小程序',
      'mp-alipay':'支付宝小程序',
      'mp-baidu':'百度小程序',
      'mp-qq':'QQ小程序',
      'mp-toutiao':'今日头条小程序',
      'mp-weixin':'微信小程序',
    };
    return appType[type];
  }
  async initStart() {
    await this.getEnv();

    const runDir = this.buildInfo.buildType === 'build' ? 'build' :'dev';
    shell.rm('-rf', `${currentDir}/dist/${runDir}`);

    const buildsDir = `${currentDir}/src/builds`;
    shell.rm('-rf', buildsDir);
    shell.mkdir('-p', buildsDir);

    let appTypeName:any = this.buildInfo.buildType.split(':');
    if (appTypeName && appTypeName.length > 1) {
      appTypeName = appTypeName[1];
    } else {
      appTypeName = 'mp-weixin';
    }
    appTypeName = this.getAppTypeName(appTypeName);

    console.log('');
    const isDevTxt = this.buildInfo.buildType.includes('build') ? '构建' :'开发';
    console.log(`------${appTypeName}平台-${this.envTxt[this.buildInfo.envType]}环境-${isDevTxt}-${this.buildInfo.type}------`);
    console.log('');

    await this.writeFile({
      file:`${currentDir}/src/builds/envType.ts`,
      content:`const envType:string = '${this.buildInfo.envType}';export default envType;`,
    });

    this.buildFile({
      oldFile:`${currentDir}/src/projects/${this.buildInfo.type}/selftPages.json`,
      newFile:`${currentDir}/src/builds/pages.json`,
    });
    this.buildFile({
      oldFile:`${currentDir}/src/projects/${this.buildInfo.type}/manifest/${this.buildInfo.envType}.json`,
      newFile:`${currentDir}/src/manifest.json`,
    });
    this.buildFile({
      oldFile:`${currentDir}/src/projects/${this.buildInfo.type}/selfConfig.ts`,
      newFile:`${currentDir}/src/builds/selfConfig.ts`,
    });
    console.log('');
    console.log('------Building now------');
    console.log('');
  }
}

const buildClassData = new buildClass();
buildClassData.initStart();
