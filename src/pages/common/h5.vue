<template>
  <view class="cm_main2">
    <web-view
      :src="webSite"
      @load="webLoad"
      @error="webError"
      v-if="isLoadEnd === 1"
    />
    <view class="cm_pc_12 cm_mtb3" v-else> 正在拼命加载中.. </view>
  </view>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
export default class h5Page extends Vue {
  isLoadEnd = 0;
  webSite = "";
  webLoad() {
    console.log("h5 load...ok");
  }
  webError() {
    console.log("h5 load...error");
  }
  async setWebSite() {
    this.webSite = this.$cmapp.getStorage("h5url");
    this.isLoadEnd = 1;
    this.$forceUpdate();
  }
  initStart() {
    this.isLoadEnd = 0;
    this.setWebSite();
  }
  onLoad(query: any) {
    this.initStart();
    uni.setNavigationBarTitle({
      title: (query && query.title) || "h5站点",
    });
  }
  onShow() {
    this.$cmapp.setNavigationBarColor();
  }
  onPullDownRefresh() {
    setTimeout(() => {
      this.initStart();
      uni.stopPullDownRefresh();
    }, 1000);
  }
}
</script>
