<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12 ulMain" :class="{'cm_ptb4':plat==='h5','cm_pb1':plat!=='h5'}" v-if="isLoadEnd===1">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mtb05">
            <image :src="logo" class="cm_wh7 cm_br305 cm_fc"/>
          </li>
          <li class="cm_pc_12">
            <div class="cm_pc_12 cm_pd05 cm_bf cm_lh105 cm_ti2 cm_mb05">{{description}}</div>
          </li>
        </ul>
        <Copyright :copyrightData="copyrightData"></Copyright>
      </div>
      <NoData v-else></NoData>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  import Header1 from '@/components/Header1.vue';
  import NoData from '@/components/NoData.vue';
  import Copyright from '@/components/Copyright.vue';

  export default Vue.extend({
    components: {
      Header1,
      NoData,
      Copyright,
    },
    data() {
      return {
        title: `关于${this.$conf.project.name}`,
        logo: '../../static/aiplat/icon.png',
        description: this.$conf.project.description,
        copyright: `${this.$conf.project.copyright} ${this.$conf.project.email}`,
        plat: this.$conf.plat,
        isLoadEnd: 0,
        copyrightData: this.$conf.project,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    onShareAppMessage() {
      const t:any = this;
      const url:string = `/pages/${t.$conf.project.type}/index`;
      const a:any = t.$cmapp.setShareMessage(t, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${t.$conf.platform.site}欢迎您`,
        shareUrl: '',
      });
      return a;
    },
    onShow() {
      const t:any = this;
      t.$cmapp.setNavigationBarColor();
      t.isLoadEnd = 1;
      uni.setNavigationBarTitle({
        title: `关于${t.$conf.project.name}`,
      });
    },
  });
</script>
<style lang="less">
</style>
