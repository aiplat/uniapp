import Vue from 'vue';
import App from './App.vue';

import store from './vuex/store';
import api from './service/api';
import conf from './service/conf';
import Cmapp from './plugins/cmapp.class';
import uniAjax from './plugins/uniAjax';

Vue.config.productionTip = false;

// @ts-ignore
const cmapp = new Cmapp();

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$conf = conf;
Vue.prototype.$cmapp = cmapp;
Vue.prototype.$uniAjax = uniAjax;

new App().$mount();
