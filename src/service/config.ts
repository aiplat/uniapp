import envType from '@/builds/envType';
import selfConfig from '@/builds/selfConfig';

import setFileObject from '@/plugins/lib/setFileObject';
const fileList = require.context(
  '@/service/config',
  true,
  /.ts$/,
);
const otherConf = setFileObject(fileList, {});

export default {
  name: 'AI智能空间',
  description: 'AI智能空间,拥抱人工智能,明天会更好。个人项目：跨平台app~《亲信地铁》、已上线微信头条支付宝三大小程序~《娱乐计分器》。技术研究潜心使用各种框架开发h5app：同时兼容wap、web、微信浏览器、微信百度支付宝头条小程序、android和ios,各个平台界面统一,功能一致。详见应用展示。',
  site: 'aiplat.com',
  github: 'github.com/aiplat',
  version: new Date().valueOf(),
  project: selfConfig,
  platform: process.env.VUE_APP_PLATFORM,
  envType: envType,
  screenWidth: 750,
  ...otherConf,
};
