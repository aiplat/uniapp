<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform === 'h5'"></ani-header1>
      <div
        class="cm_pc_12"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
      >
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mt05" @tap="$cmapp.jumpTo('/pages/common/userAgent')">
            <ani-image imgClass="cm_wh7 cm_br305 cm_fc" :imgUrl="indexData.logo"></ani-image>
          </li>
          <li class="cm_pc_12 cm_be">
            <div class="cm_pc_12 cm_pd05 cm_bf cm_lh105 cm_ti2 cm_mb05">
              {{ indexData.description }}
            </div>
          </li>
          <li class="cm_pc_12 cm_prl05">
            <div class="cm_pc_12">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">
                {{ indexData.gitName }}
              </div>
              <div
                class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c"
                @click="$cmapp.goToWindow('https://'+indexData.gitUrl)"
              >
                {{ indexData.gitUrl }}
              </div>
            </div>
            <ul class="cm_pc_12 cm_pd05 cm_be">
              <li
                class="cm_pc_12 cm_pd05 cm_lh2 cm_bf cm_bb1ce"
                v-for="(item1, index1) in indexData.gitList"
                :key="index1"
              >
                <div class="cmtou" @click="goToWindow(item1.url)">
                  <span class="cm_c1c cm_fwb">{{ item1.name }}</span
                  >:<span class="cm_fs08">{{ item1.description }}</span>
                </div>
              </li>
            </ul>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_tc">
            <div class="cm_pc_12 cm_bb1ce">
              <div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">
                {{ indexData.cooperation }}
              </div>
              <div
                class="cm_pa cm_tr0 cm_hl3 cm_mr05 cm_c1c"
                @click="$cmapp.goToWindow(indexData.email, 'email')"
              >
                {{ indexData.email }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {},
  data() {
    return {
      title: "AI智能空间",
      indexData: {
        logo: "../../static/aiplat/icon.png",
        description: this.$config.project.description,
        gitName: "我的github",
        gitUrl: "github.com/aiplat",
        gitList: [
          {
            name: "cmui",
            description: "自己写的跨平台css3框架",
            url: "https://github.com/aiplat/cmui",
          },
          {
            name: "vueapp",
            description: "改写vue-cli的跨平台框架",
            url: "https://github.com/aiplat/vueapp",
          },
          {
            name: "uniapp",
            description: "改写uni-app的跨平台框架",
            url: "https://github.com/aiplat/uniapp",
          },
          {
            name: "react-app-ie8",
            description: "改写react兼容IE8的跨平台框架",
            url: "https://github.com/aiplat/react-app-ie8",
          },
          {
            name: "angular-app",
            description: "改写angular-cli的跨平台框架",
            url: "https://github.com/aiplat/angular-app",
          },
          {
            name: "wepy-app",
            description: "改写wepy的小程序框架",
            url: "https://github.com/aiplat/wepy-app",
          },
          {
            name: "express-multipage",
            description: "改写express的多页面框架",
            url: "https://github.com/aiplat/express-multipage",
          },
          {
            name: "nervjs-ie8",
            description: "改写nervjs兼容IE8的多页面框架",
            url: "https://github.com/aiplat/nervjs-ie8",
          },
          {
            name: "reactNative",
            description: "改写reactNative的APP框架",
            url: "https://github.com/aiplat/reactNative",
          },
        ],
        cooperation: "联系我",
        email: "womendi@qq.com",
      },
      platform: this.$config.platform,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {
    goToWindow(url: any, type = "") {
      this.$cmapp.goToWindow(url, type);
    },
  },
  onShareAppMessage() {
    const url: string = `/pages/${this.$config.project.type}/index`;
    return this.$cmapp.setShareMessage(this, {
      sharePage: url,
      shareIndex: url,
      shareTitle: `${this.$config.site}欢迎您`,
      shareUrl: "",
    });
  },
  onShow() {
    this.$cmapp.setNavigationBarColor();
  },
});
</script>
<style lang="less" scoped>
</style>
