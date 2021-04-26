<template>
  <div class="cm_pf cm_tl0 cm_w100 cm_z99">
    <div class="cm_pc_12 cm_hl3 cm_m0 cm_b0 cm_cf cm_tc">{{ title }}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
});
</script>
