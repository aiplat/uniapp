import Vue from 'vue';
import App from '@/App.vue';
import plugins from '@/plugins/index';

Vue.config.productionTip = false;
Vue.use(plugins);

new App().$mount();
