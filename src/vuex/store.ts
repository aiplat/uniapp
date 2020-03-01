import Vue from 'vue';
import Vuex from 'vuex';

import commonModule from './commonModule/index';
import donateModule from './donateModule/index';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    commonModule,
    donateModule,
  },
});
