<template>
  <div class="cm_main2">
    <div class="cm_main cm_pr">
      <div class="cm_pc_12">
        <header2 :title="title" v-if="isPlat==='H5'"></header2>
        <ul class="cm_pc_12" :class="{'cm_mtb4':isPlat==='H5','cm_mb1':isPlat!=='H5'}">
          <li class="cm_pc_12 cm_mtb1">
            <image :src="logo" class="cm_wh7 cm_br305 cm_fc"/>
          </li>
          <li class="cm_pc_12 cm_mb1 cm_tc" @click="$cm.toWin('',app.url)">
            {{app.name}}
          </li>
          <div class="cm_pc_12 cm_prl05 cm_tc cm_hl3">{{message}}</div>
        </ul>
      </div>
      <copyright2 isCrB="1"></copyright2>
    </div>
  </div>
</template>

<script>
  import header2 from 'components/header2';
  import copyright2 from 'components/copyright';

  export default {
    data() {
      return {
        title: '内页',
        logo: '../../static/aiplat/icon.png',
        message: '这里是测试页面',
        isPlat: '',
        app: {
          name: '',
          url: '',
        },
      };
    },
    components: {
      header2,
      copyright2,
    },
    onLoad() {
      const t = this;
      t.app = t.$conf;
    },
    onShow() {
      const t = this;
      // #ifdef H5
      t.isPlat = 'H5';
      // #endif
      // #ifndef H5
      t.isPlat = 'noH5';
      // #endif
      t.app = t.$conf;
    },
  };
</script>
