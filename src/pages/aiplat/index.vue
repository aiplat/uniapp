<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':plat==='h5','cm_mb1':plat!=='h5'}">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mt05">
            <image :src="indexData.logo" class="cm_wh7 cm_br305 cm_fc"/>
          </li>
          <li class="cm_pc_12 cm_be">
            <div class="cm_pc_12 cm_pd05 cm_bf cm_lh105 cm_ti2 cm_mb05">{{indexData.description}}</div>
          </li>
          <li class="cm_pc_12 cm_prl05">
            <div class="cm_pc_12">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{indexData.gitName}}</div>
              <div class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c" @click="$cmapp.toWin(indexData.gitUrl2)">
                {{indexData.gitUrl}}
              </div>
            </div>
            <ul class="cm_pc_12 cm_pd05 cm_be">
              <li class="cm_pc_12 cm_pd05 cm_lh2 cm_bf cm_bb1ce" v-for="(v,k) in indexData.gitList" :key="k">
                <div class="cmtou" @click="toWin(v)"><span class="cm_c1c cm_fwb">{{v.name}}</span>:<span
                  class="cm_fs08">{{v.desc}}</span></div>
              </li>
            </ul>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_tc">
            <div class="cm_pc_12 cm_bb1ce">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{indexData.cooperation}}</div>
              <div class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c" @click="$cmapp.toWin(indexData.email, 'email')">{{indexData.email}}</div>
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
        title: 'AI智能空间',
        indexData:
          {
            logo: '../../static/aiplat/icon.png',
            description: this.$conf.project.description,
            gitName: '我的github',
            gitUrl: 'github.com/aiplat',
            gitUrl2: 'https://github.com/aiplat',
            gitList: [
              {
                name: 'cmui',
                desc: '自己写的跨平台css3框架',
                url: 'https://github.com/aiplat/cmui',
              },
              {
                name: 'vueapp',
                desc: '改写vue-cli的跨平台框架',
                url: 'https://github.com/aiplat/vueapp',
              },
              {
                name: 'uniapp',
                desc: '改写uni-app的跨平台框架',
                url: 'https://github.com/aiplat/uniapp',
              },
              {
                name: 'react-app-ie8',
                desc: '改写react兼容IE8的跨平台框架',
                url: 'https://github.com/aiplat/react-app-ie8',
              },
              {
                name: 'angular-app',
                desc: '改写angular-cli的跨平台框架',
                url: 'https://github.com/aiplat/angular-app',
              },
              {
                name: 'wepy-app',
                desc: '改写wepy的小程序框架',
                url: 'https://github.com/aiplat/wepy-app',
              },
              {
                name: 'express-multipage',
                desc: '改写express的多页面框架',
                url: 'https://github.com/aiplat/express-multipage',
              },
              {
                name: 'nervjs-ie8',
                desc: '改写nervjs兼容IE8的多页面框架',
                url: 'https://github.com/aiplat/nervjs-ie8',
              },
              {
                name: 'reactNative',
                desc: '改写reactNative的APP框架',
                url: 'https://github.com/aiplat/reactNative',
              },
            ],
            cooperation: '联系我',
            email: 'womendi@qq.com',
          },
        plat: this.$conf.plat,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    methods: {
      toWin(item:any, type = '') {
        this.$cmapp.toWin(item.url, type);
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
    onShow() {
      this.$cmapp.setNavigationBarColor();
    },
    mounted() {
      window &&
      window.uni &&
      window.uni.$on("uploadEvent", (responseData: any) => {
        console.log(responseData);
        // 在其他app页面调用public/index.html的dispatchEvent方法，html5plus方法查看public/index.html
        // dispatchEvent('uploadEvent', '数据')
      });
    }
  });
</script>
<style lang="less" scoped>
</style>
