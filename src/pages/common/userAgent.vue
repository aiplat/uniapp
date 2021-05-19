<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :isBack="true" :title="title" v-if="platform === 'h5'"></ani-header1>
      <div
        class="cm_pc_12"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
      >
        <input type="text" :value="userAgent&&JSON.stringify(userAgent)||'加载中..'"/>
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
      title: "userAgent",
      platform: this.$config.platform,
      userAgent: '',
    };
  },
  computed: {},
  methods: {},
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
    this.userAgent = window.navigator.userAgent.toLowerCase();
  },
});
</script>
<style lang="less" scoped>
</style>
