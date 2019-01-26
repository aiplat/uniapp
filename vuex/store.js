import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import commonModule from './commonModule/';
import donateModule from './donateModule/';

module.exports = new Vuex.Store({
    modules: {
        commonModule,
        donateModule
    }
});