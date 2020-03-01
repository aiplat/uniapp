<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':plat==='h5','cm_mb1':plat!=='h5'}">
        <ul class="cm_pc_12 cm_pd05">
          <li class="cm_pc_12 cm_pd05 cm_be">
            <div class="cm_pc_12">
              <div class="cm_pc_12 cm_lh3 cm_pl05 cm_pr3 cm_br02 cm_bf cm_bb1ce" v-for="(v,k) in findList" :key="k" @click="$cmapp.jumpTo(v.url)">
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

  import Header1 from '@/components/Header1.vue';

  export default Vue.extend({
    components: {
      Header1,
    },
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
        const t:any = this;
        const nd:any = new Date().valueOf() / 1000;
        const d:any = t.$cmapp.nowTime(0, '2020-05-20');
        if (nd > d) {
          t.findList.push({
            name: '演示1',
            url: '/pages/good/cmDemo1',
            market: '',
          });
        }
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
    onLoad(query:any) {
      const t:any = this;
      t.$cmapp.noAuthIndex(t, 'yes', query, () => {
        // #ifdef MP-WEIXIN
        t.getDemo();
        // #endif
      });
    },
    onShow() {
      const t:any = this;
      t.$cmapp.setNavigationBarColor();
      t.$cmapp.getAuthCallBack();
    },
  });
</script>
