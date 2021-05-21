<template>
  <div class="cm_main2 cm_bf">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform === 'h5'"></ani-header1>
      <ul
        class="cm_pc_12 cm_bf"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
        v-if="isLoadEnd === 1"
      >
        <li class="cm_pc_12" v-if="userInfo">
          <div class="cm_pc_12 cm_bb1ce">
            <ani-image
              imgClass="cm_pa cm_tl0 cm_wh4 cm_bs100 cm_br02 cm_m05"
              :imgUrl="userInfo.avatarUrl"
            ></ani-image>
            <div class="cm_pc_12 cm_pl5 cm_minh5">
              <div class="cm_pc_12 nickName">{{ userInfo.nickName }}</div>
              <div class="cm_pc_12 cm_c4c">
                {{ userInfo.city || userInfo.province || userInfo.country }}
              </div>
            </div>
          </div>
          <ani-list01
            class="cm_z99"
            :listData="findList"
            @listEmit="listEmit"
          ></ani-list01>
        </li>
        <li class="cm_pc_12 cm_prl05 cm_mtb1" v-else>
          <div class="cm_pc_12 cm_mb1">
            <ani-image
              imgClass="cm_wh7 cm_br305 cm_fc"
              :imgUrl="logo"
            ></ani-image>
          </div>
          <div class="cm_pc_12 cm_tc cm_mb1">
            {{ appName }}
          </div>
          <div class="cm_pc_12 cm_tc cm_mb1 cm_c4c">
            {{ message }}
          </div>
          <div
            class="cm_pc_12 cm_hl205 cm_tc cm_br02 cm_cf cm_fs09"
            :class="{
              cm_c9b: platform === 'mp-alipay',
              cm_c1b: platform !== 'mp-alipay',
            }"
            @tap="$cmapp.isToAuth('', 'navigateBack')"
          >
            去授权
          </div>
        </li>
      </ul>
      <ani-no-data v-else></ani-no-data>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const commonModule = namespace("commonModule/index");
@Component({})
export default class minePage extends Vue {
    data() {
      return {
        isLoadEnd: 0,
        logo: require('@/static/logo.png'),
        title: '我的',
        appName: this.$config.project.name,
        message: '请先去授权再计分',
        findList: [
          {
            title: `关于${this.$config.project.name}`,
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
        platform: this.$config.platform,
      };
    }
    @commonModule.State((state: any) => state.userInfo) userInfo: any;
    listEmit(item:any) {
        this.$cmapp.jumpTo(item.url);
      }
    onShareAppMessage() {
      const url:string = `/pages/${this.$config.project.type}/index`;
      return this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$config.site}欢迎您`,
        shareUrl: '',
      });
    }
    onLoad(query:any) {
      this.$cmapp.noAuthIndex(this, 'yes', query);
    }
    onShow() {
      this.$cmapp.setNavigationBarColor();
      this.$cmapp.getAuthCallBack();
    }
  };
</script>
<style lang="less" scoped>
.nickName {
  margin: 0.75em 0em;
}
</style>
