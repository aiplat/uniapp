class configClass{
  public utils = require('./utils');
  constructor() {
  }
  async initStart() {
    const utilsClass = new this.utils();
    const utilsParams = utilsClass.getParams();

    let appTypeName:any = utilsParams.buildType.split(':');
    appTypeName = appTypeName && appTypeName.length > 1 ? appTypeName[1] : 'h5';

    const runDir = utilsParams.buildType.includes('build') ? 'build' :'dev';
    utilsParams.shell.rm('-rf', `${utilsParams.currentDir}/dist/${runDir}/${appTypeName}`);
    utilsParams.shell.rm('-rf', `${utilsParams.currentDir}/dist/${runDir}/.automator/${appTypeName}`);
    utilsParams.shell.rm('-rf', `${utilsParams.currentDir}/dist/${runDir}/.sourcemap/${appTypeName}`);

    const buildsDir = `${utilsParams.currentDir}/src/builds`;
    utilsParams.shell.rm('-rf', buildsDir);
    utilsParams.shell.mkdir('-p', buildsDir);

    appTypeName = utilsClass.getAppTypeName(appTypeName);

    console.log('');
    const isDevTxt = utilsParams.buildType.includes('build') ? '构建' :'开发';
    console.log(`------${appTypeName}平台-${utilsParams.envTxt[utilsParams.envType]}环境-${isDevTxt}-${utilsParams.type}------`);
    console.log('');

    await utilsClass.writeFile({
      file:`${utilsParams.currentDir}/src/builds/envType.ts`,
      content:`const envType:string = '${utilsParams.envType}';export default envType;`,
    });

    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/projects/${utilsParams.type}/selftPages.json`,
      newFile:`${utilsParams.currentDir}/src/pages.json`,
    });
    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/projects/${utilsParams.type}/manifest/${utilsParams.envType}/manifest.json`,
      newFile:`${utilsParams.currentDir}/src/manifest.json`,
    });
    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/projects/${utilsParams.type}/selfConfig.ts`,
      newFile:`${utilsParams.currentDir}/src/builds/selfConfig.ts`,
    });
    console.log('');
    console.log('------Building now------');
    console.log('');
  }
}

const configClassTarget = new configClass();
configClassTarget.initStart();
