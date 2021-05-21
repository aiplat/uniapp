<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1
        :isBack="true"
        :title="title"
        v-if="platform === 'h5'"
      ></ani-header1>
      <div
        class="cm_pc_12"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
      >
        <textarea
          class="cm_h10"
          :value="(userAgent && JSON.stringify(userAgent)) || (!isLoadEnd && '加载中..' || '小程序无window信息')"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class userAgentPage extends Vue {
  title = "userAgent";
  platform = this.$config.platform;
  userAgent = "";
  isLoadEnd = 0;
  onShareAppMessage() {
    const url: string = `/pages/${this.$config.project.type}/index`;
    return this.$cmapp.setShareMessage(this, {
      sharePage: url,
      shareIndex: url,
      shareTitle: `${this.$config.site}欢迎您`,
      shareUrl: "",
    });
  }
  initStart() {
    this.userAgent = window && window.navigator.userAgent.toLowerCase() || '';
    this.isLoadEnd = 1;
  }
  onShow() {
    this.$cmapp.setNavigationBarColor();
    this.initStart();
  }
}
</script>
<style lang="less" scoped>
</style>
