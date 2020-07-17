import Vue from 'vue';
import api from '@/service/api';
import conf from '@/service/conf';
import cmappClass from '@/plugins/cmapp.class';
import uniAjax from '@/plugins/uniAjax';

declare module 'vue/types/vue' {
    interface Vue {
      $api: api,
      $conf: conf,
      $cmapp: new cmappClass(),
      $uniAjax: uniAjax,
    }
}
