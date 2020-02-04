import Vue from 'vue';
import api from './service/api';
import conf from './service/conf';
import Cmapp from './plugins/cmapp.class';
import uniAjax from './plugins/uniAjax';

// @ts-ignore
const cmapp = new Cmapp();

declare module 'vue/types/vue' {
    interface Vue {
      // @ts-ignore
      $api: api,
      // @ts-ignore
      $conf: conf,
      // @ts-ignore
      $cmapp: cmapp,
      // @ts-ignore
      $uniAjax: uniAjax,
    }
}
