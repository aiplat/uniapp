<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':plat==='h5','cm_mb1':plat!=='h5'}">
        <ul class="cm_pc_12 cm_pd05">
          <li class="cm_pc_12 cm_pd05 cm_be">
            <div class="cm_pc_12">
              <div class="cm_pc_12 cm_lh3 cm_pl05 cm_pr3 cm_br02 cm_bf cm_bb1ce" v-for="(v,k) in findList" :key="'k1'+k" @click="$cmapp.jumpTo(v.url)">
                <div class="cmtou" v-if="v.market">{{v.market+'-'+v.name}}</div>
                <div class="cmtou" v-else>{{k+1}}、{{v.name}}</div>
                <image class="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1" :src="rightImg" background-size="cover"></image>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    components: {},
    data() {
      return {
        title: '发现',
        logo: '../../static/logo.png',
        plat: this.$conf.plat,
        findList: [
          {
            name: '应用展示',
            url: '/pages/aiplat/apps',
            market: '',
          },
        ],
        rightImg: '../../static/aiplat/cm_right.png',
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    methods: {
      getDemo() {
        const nowTime:any = new Date().valueOf() / 1000;
        const dayTime:any = this.$cmapp.nowTime(0, '2020-05-20');
        if (nowTime > dayTime) {
          this.findList.push({
            name: '演示1',
            url: '/pages/good/cmDemo1',
            market: '',
          });
        }
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
      this.$cmapp.noAuthIndex(this, 'yes', query, () => {
        // #ifdef MP-WEIXIN
        this.getDemo();
        // #endif
      });
    },
    onShow() {
      this.$cmapp.setNavigationBarColor();
      this.$cmapp.getAuthCallBack();
    },
  });
</script>
