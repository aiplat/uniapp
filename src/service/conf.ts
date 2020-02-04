import envType from '../envType';
import mpConf from '../mpConf';
import map from './map';

const project:any = mpConf;

const c:any = {
  platform: {
    name: 'AI智能空间',
    description: 'AI智能空间,拥抱人工智能,明天会更好。个人项目：跨平台app~《亲信地铁》、已上线微信头条支付宝三大小程序~《娱乐计分器》。技术研究潜心使用各种框架开发h5app：同时兼容wap、web、微信浏览器、微信百度支付宝头条小程序、android和ios,各个平台界面统一,功能一致。详见应用展示。',
    site: 'aiplat.com',
    github: 'github.com/aiplat',
  },
  version: new Date().valueOf(),
  map: map,
  project: project,
  plat: process.env.VUE_APP_PLATFORM,
  envType: envType,
};

export default c;
