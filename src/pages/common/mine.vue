<template>
  <div class="cm_main2 cm_bf">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <ul class="cm_pc_12 cm_bf" :class="{'cm_mtb4':plat==='h5','cm_mb1':plat!=='h5'}" v-if="isLoadEnd===1">
        <li class="cm_pc_12" v-if="userInfo">
          <div class="cm_pc_12 cm_bb1ce">
            <image class="cm_pa cm_tl0 cm_wh4 cm_bs100 cm_br02 cm_m05" :src="userInfo.avatarUrl"></image>
            <div class="cm_pc_12 cm_pl5 cm_minh5">
              <div class="cm_pc_12 nickName">{{userInfo.nickName}}</div>
              <div class="cm_pc_12 cm_c4c">{{userInfo.city||userInfo.province||userInfo.country}}</div>
            </div>
          </div>
          <List01 class="cm_z99" :listData="findList" @listTo2="listTo2"></List01>
        </li>
        <li class="cm_pc_12 cm_prl05 cm_mtb1" v-else>
          <div class="cm_pc_12 cm_mb1">
            <image :src="logo" class="cm_wh7 cm_br305 cm_fc"/>
          </div>
          <div class="cm_pc_12 cm_tc cm_mb1">
            {{appName}}
          </div>
          <div class="cm_pc_12 cm_tc cm_mb1 cm_c4c">
            {{message}}
          </div>
          <div class="cm_pc_12 cm_hl205 cm_tc cm_br02 cm_cf cm_fs09" :class="{'cm_c9b':plat==='mp-alipay','cm_c1b':plat!=='mp-alipay'}" @tap="$cmapp.isToAuth('', 'navigateBack')">
            去授权
          </div>
        </li>
      </ul>
      <NoData v-else></NoData>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    components: {},
    data() {
      return {
        isLoadEnd: 0,
        logo: '../../static/logo.png',
        title: '我的',
        appName: this.$conf.project.name,
        message: '请先去授权再计分',
        findList: [
          {
            title: `关于${this.$conf.project.name}`,
            url: '/pages/common/about',
            market: '',
            rightImg: '../static/aiplat/cm_right.png',
          },
          {
            title: '关于我们',
            url: '/pages/aiplat/index',
            market: '',
            rightImg: '../static/aiplat/cm_right.png',
          },
        ],
        plat: this.$conf.plat,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    methods: {
      listTo2(v:any) {
        this.$cmapp.jumpTo(v.url);
      },
    },
    onShareAppMessage() {
      const url:string = `/pages/${this.$conf.project.type}/index`;
      const a:any = this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$conf.platform.site}欢迎您`,
        shareUrl: '',
      });
      return a;
    },
    onLoad(query:any) {
      this.$cmapp.noAuthIndex(this, 'yes', query);
    },
    onShow() {
      this.$cmapp.setNavigationBarColor();
      this.$cmapp.getAuthCallBack();
    },
  });
</script>
<style lang="less" scoped>
 .nickName{
   margin: 0.75em 0em;
 }
</style>
