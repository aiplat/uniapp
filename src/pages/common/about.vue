<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform==='h5'"></ani-header1>
      <div class="cm_pc_12 ulMain" :class="{'cm_ptb4':platform==='h5','cm_pb1':platform!=='h5'}" v-if="isLoadEnd===1">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_mtb05">
            <ani-image imgClass="cm_wh7 cm_br305 cm_fc" :imgUrl="logo"></ani-image>
          </li>
          <li class="cm_pc_12">
            <div class="cm_pc_12 cm_pd05 cm_bf cm_lh105 cm_ti2 cm_mb05">{{description}}</div>
          </li>
        </ul>
        <ani-copyright :copyrightData="copyrightData"></ani-copyright>
      </div>
      <ani-no-data v-else></ani-no-data>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class aboutPage extends Vue {
  title = `关于${this.$config.project.name}`
  logo = require('@/static/aiplat/icon.png')
  description = this.$config.project.description
  copyright = `${this.$config.project.copyright} ${this.$config.project.email}`
  platform = this.$config.platform
  isLoadEnd = 0
  copyrightData = this.$config.project
  onShareAppMessage() {
      const url:string = `/pages/${this.$config.project.type}/index`;
      return this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$config.site}欢迎您`,
        shareUrl: '',
      });
    }
    onShow() {
      this.$cmapp.setNavigationBarColor();
      this.isLoadEnd = 1;
      uni.setNavigationBarTitle({
        title: `关于${this.$config.project.name}`,
      });
    }
}
</script>
<style lang="less">
</style>
