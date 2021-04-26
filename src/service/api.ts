import setFileObject from '@/plugins/lib/setFileObject';
import envType from '@/builds/envType';
import selfConfig from '@/builds/selfConfig';

const fileList = require.context(
  '@/service/apis',
  true,
  /.ts$/,
);

const config:any = selfConfig;

// 接口域名
let server:string = 'https://aiplat.com';
if (config && config.server && config.server[envType]) {
  server = config.server[envType];
}
const api:any = {
  server: server,
  ...setFileObject(fileList, {}),
};

export default api;
