import envType from '../envType';
import mpConf from '../mpConf';
import sign from './apis/sign';

// 接口域名
let server:string = 'https://aiplat.com';
if (mpConf && mpConf.server && mpConf.server[envType]) {
  server = mpConf.server[envType];
}
const api:any = {
  server: server,
  ...sign,
};

export default api;
