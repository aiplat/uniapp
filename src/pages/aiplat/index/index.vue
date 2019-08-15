<template>
  <div class="cm_main2">
    <div class="cm_main cm_pr">
      <header1 :title="title" v-if="isPlat==='H5'"></header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':isPlat==='H5','cm_mb1':isPlat!=='H5'}">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mt05">
            <image :src="indexData.logo" class="cm_wh7 cm_br305 cm_fc" @click="$cm.toWin('/pages/common/test')"/>
          </li>
          <li class="cm_pc_12 cm_be">
            <div class="cm_pc_12 cm_pd05 cm_bf cm_lh105 cm_ti2 cm_mb05">{{indexData.description}}</div>
          </li>
          <li class="cm_pc_12 cm_prl05">
            <div class="cm_pc_12">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{indexData.gitName}}</div>
              <div class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c" @click="$cm.toWin('',indexData.gitUrl2)">
                {{indexData.gitUrl}}
              </div>
            </div>
            <ul class="cm_pc_12 cm_pd05 cm_be">
              <li class="cm_pc_12 cm_pd05 cm_lh2 cm_bf cm_bb1ce" v-for="(v,k) in indexData.gitList" :key="k">
                <div class="cmtou" @click="$cm.toWin('',v.url)"><span class="cm_c1c cm_fwb">{{v.name}}</span>:<span
                  class="cm_fs08">{{v.desc}}</span></div>
              </li>
            </ul>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_tc">
            <div class="cm_pc_12 cm_bb1ce">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{indexData.cooperation}}</div>
              <div class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c">{{indexData.email}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import header1 from '@/components/header1';

  export default {
    data() {
      return {
        title: 'AI智能空间',
        indexData:
          {
            logo: '../../../static/aiplat/icon.png',
            description: 'AI智能空间,拥抱人工智能,明天会更好。个人项目:跨平台app~《亲信地铁》、小程序~《娱乐计分器》。技术研究潜心使用各种框架开发h5app:同时兼容wap、web、微信浏览器、微信小程序、android和ios,六个平台界面统一,功能一致。详见应用展示。',
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
        isPlat: '',
      };
    },
    components: {
      header1,
    },
    methods: {
      getApi() {
        uni.request({
          url: 'https://apis.map.qq.com', // 仅为示例，并非真实接口地址。
          data: {
            text: 'uni.request',
          },
          header: {
            'custom-header': 'hello', // 自定义请求头信息
          },
          success: (res) => {
            console.log(res.data);
            this.text = 'request success';
          },
        });
      },
    },
    computed: {
      dnid() {
        return this.$store.getters.getDnid;
      },
    },
    onLoad() {
      console.log(this.$api);
      console.log(this.$conf);
      switch (uni.getSystemInfoSync().platform) {
      case 'android':
        console.log('运行Android上');
        break;
      case 'ios':
        console.log('运行iOS上');
        break;
      default:
        console.log('运行在开发者工具上');
        break;
      }
    },
    onShow() {
      const t = this;
      t.$cm.setLS('nowTime', t.$cm.nowTime());
      // #ifdef H5
      t.isPlat = 'H5';
      // #endif
      // #ifndef H5
      t.isPlat = 'noH5';
      // #endif
    },
  };
</script>
<style lang="less">
  .br (@radius: 5px) {
    border-radius: @radius;
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
  }

  #head {
    .br;
  }

  #foot {
    .br(20px);
  }
</style>
