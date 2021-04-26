/*
  作者：aiplat.com(womendi@qq.com)
  创建时间：2020.05.27
*/
export default (fileList:any, fileObject:any) => {
  const isArray = fileObject instanceof Array;
  fileList.keys().forEach(async (fileName: any) => {
    const fileConfig = fileList(fileName);
    const name = fileName.split('/')[1].split('.')[0];
    if (isArray) {
      fileObject.push(fileConfig.default);
    } else {
      fileObject[name] = fileConfig.default;
    }
  });
  return fileObject;
};
