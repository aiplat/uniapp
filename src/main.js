import Vue from 'vue';
import App from './App';

import store from './vuex/store';
import api from './service/api';
import conf from './service/conf';
import cm from './plugins/cmapp';

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$conf = conf;
Vue.prototype.$cm = cm;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});
app.$mount();
