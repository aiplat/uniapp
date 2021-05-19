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

class utilsClass{
  public fs = require('fs');
  public shell = require('shelljs');
  public currentDir =  '.';
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
      type:'aiplat',
    };
    this.getEnv();
  }
  writeFile(fileData:fileData) {
    return new Promise((resolve) => {
      this.fs.writeFile(fileData.file, fileData.content, (err:any) => {
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
      this.fs.readFile(fileData.file, 'utf8', (err:any, data:string) => {
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
    this.shell.cp('-R', data.oldFile, data.newFile);
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
      type = type ? this.isIn(type, 'type=', 'aiplat') :'aiplat';
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
  getParams() {
    return {
      fs: this.fs,
      shell: this.shell,
      currentDir: this.currentDir,
      envTxt: this.envTxt,
      ...this.buildInfo
    }
  }
}

module.exports = utilsClass