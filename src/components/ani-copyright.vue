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
import Vue from "vue";
export default Vue.extend({
  props: {
    bottomLeft: {
      type: String,
      default: "cm_bl0",
    },
    color1: {
      type: String,
      default: "cm_c3c",
    },
    copyrightData: {
      type: Object,
      default() {
        return {
          copyright: "",
          name: "",
          site: "",
          placeClass: "",
        };
      },
    },
  },
});
</script>
