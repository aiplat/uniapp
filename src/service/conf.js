import mpConf from '../mpConf.js';

const project = mpConf;
const platform = {
  web: 'https://pro.aiplat.com',
  api: 'https://proapi.aiplat.com',
  img: 'https://proimg.aiplat.com',
  ...project,
};

export default platform;
