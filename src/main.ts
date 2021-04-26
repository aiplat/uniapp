import Vue from 'vue';
import App from '@/App.vue';
import store from '@/vuex/store';

import api from '@/service/api';
import config from '@/service/config';
import cmappClass from '@/plugins/cmapp.class';
import uniAjax from '@/plugins/uniAjax';

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$config = config;
Vue.prototype.$cmapp = new cmappClass();
Vue.prototype.$uniAjax = uniAjax;

new App().$mount();
