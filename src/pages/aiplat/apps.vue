<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform==='h5'"></ani-header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':platform==='h5','cm_mb1':platform!=='h5'}">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mt05">
            <ani-image imgClass="cm_wh7 cm_fc" :imgUrl="logo"></ani-image>
          </li>
          <li class="cm_pc_12">
            <ul class="cm_pc_12 cm_prl05" v-for="(item1,index1) in indexData" :key="index1">
              <li class="cm_pc_12">
                <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{index1+1}}、{{item1.name}}</div>
              </li>
              <li class="cm_pc_12 cm_pd05 cm_tc cm_be">
                <div class="cm_pc_12 cm_lh3 cm_br02 cm_bf cm_bb1ce" v-for="(item2,index2) in item1.arr" :key="index2"
                     @click="goToWindow(item2.url)">
                  <div class="cmtou" v-if="item2.market">{{item2.market+'-'+item2.name}}</div>
                  <div class="cmtou" v-else>{{item2.name}}</div>
                </div>
              </li>
            </ul>
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
        title: '应用展示',
        logo: '../../static/aiplat/metro_icon.png',
        indexData: [
          {
            name: '亲信地铁',
            arr: [
              {
                name: '跨平台网址-webApp',
                url: 'http://m.aiplat.com/metro',
                market: '',
              },
              {
                name: '安卓App下载',
                url: 'http://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.H5093BCE5',
                market: '腾讯应用宝',
              },
              {
                name: '苹果App下载',
                url: 'https://itunes.apple.com/cn/app/id1254451008',
                market: 'appstore',
              },
            ],
          },
          {
            name: '娱乐计分器',
            arr: [{
              name: '微信小程序-搜索‘娱乐计分器’',
              url: 'weixin://',
              market: '',
            }, {
              name: '支付宝小程序-搜索‘娱乐计分器’',
              url: '',
              market: '',
            }, {
              name: '头条小程序-搜索‘娱乐计分器’',
              url: '',
              market: '',
            }],
          },
          {
            name: 'AI智能空间',
            arr: [
              {
                name: '单页面vue版',
                url: 'http://aiplat.com',
                market: '',
              },
              {
                name: '单页面react版',
                url: 'http://react.aiplat.com',
                market: '',
              },
              {
                name: '单页面angular版',
                url: 'http://ajs.aiplat.com',
                market: '',
              },
              {
                name: '多页面nervjs版',
                url: 'http://nerv.aiplat.com',
                market: '',
              },
              {
                name: 'uniapp版',
                url: 'http://uniapp.aiplat.com',
                market: '',
              },
            ],
          },
        ],
        platform: this.$config.platform,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    methods: {
      goToWindow(url:any, type = '') {
        this.$cmapp.goToWindow(url, type);
      },
    },
    onShareAppMessage() {
      const url:string = `/pages/${this.$config.project.type}/index`;
      return this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$config.site}欢迎您`,
        shareUrl: '',
      });
    },
    onShow() {
      this.$cmapp.setNavigationBarColor();
    },
  });
</script>
<style lang="less" scoped>
</style>
