class electronClass{
  public utils = require('./utils');
  constructor() {
  }
  async initStart() {
    const utilsClass = new this.utils();
    const utilsParams = utilsClass.getParams();

    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/electron/main.js`,
      newFile:`${utilsParams.currentDir}/dist/build/h5/main.js`,
    });
    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/electron/package.json`,
      newFile:`${utilsParams.currentDir}/dist/build/h5/package.json`,
    });
    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/electron/preload.js`,
      newFile:`${utilsParams.currentDir}/dist/build/h5/preload.js`,
    });
    utilsClass.buildFile({
      oldFile:`${utilsParams.currentDir}/src/electron/utils.js`,
      newFile:`${utilsParams.currentDir}/dist/build/h5/utils.js`,
    });
    console.log('');
    console.log('------electron build ok------');
    console.log(''); 
  }
}

const electronClassTarget = new electronClass();
electronClassTarget.initStart();
