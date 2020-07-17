import setFileObject from '@/service/setFileObject';
import envType from '@/builds/envType';
import mpConf from '@/builds/mpConf';

const fileList = require.context(
  '@/service/apis',
  true,
  /.ts$/,
);

// 接口域名
let server:string = 'https://aiplat.com';
if (mpConf && mpConf.server && mpConf.server[envType]) {
  server = mpConf.server[envType];
}
const api:any = {
  server: server,
  ...setFileObject(fileList, {}),
};

export default api;
