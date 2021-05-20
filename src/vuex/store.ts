import Vue from 'vue';
import Vuex from 'vuex';

const modules:any = {};
const fileList = require.context(
  '@/vuex',
  true,
  /index.ts$/,
);

fileList.keys()
  .map((key:any) => {
    const namespace = key.replace(/(\.\/)|(\.ts)/g, '')
    const module = fileList(key).default
    modules[namespace] = {
      namespaced: true,
      ...module
    }
  })
Vue.use(Vuex);
export default new Vuex.Store({
  modules
});
