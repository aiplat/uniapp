<template>
  <div
    class="cm_pf cm_w100 cm_hl3 cm_tc"
    :class="bottomLeft"
    v-if="copyrightData && copyrightData.copyright"
  >
    <span :class="color1"
      >{{ copyrightData.copyright }} {{ copyrightData.name }}
      {{ copyrightData.site }}</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class aniCopyright extends Vue {
  @Prop({ type: String, default: "cm_bl0" }) bottomLeft: any;
  @Prop({ type: String, default: "cm_c3c" }) color1: any;
  @Prop({
    type: Object,
    default() {
      return {
        copyright: "",
        name: "",
        site: "",
        placeClass: "",
      };
    },
  })
  copyrightData: any;
  goToBack() {
    this.$cmapp.jumpTo("", "navigateBack");
  }
}
</script>
