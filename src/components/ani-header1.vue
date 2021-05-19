<template>
  <div class="cm_pf cm_tl0 cm_w100 cm_z99">
    <div class="cm_pc_12">
      <view v-if="isBack" @click="goToBack">
        <ani-image imgClass="cm_pa cm_tl0 cm_wh3 cm_z99" imgUrl="./static/aiplat/cm_back.png"></ani-image>
      </view>
      <div class="cm_pc_12 cm_hl3 cm_m0 cm_b0 cm_cf cm_tc" :class="{'cm_pl3': isBack}">{{ title }}</div>
    </div>
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
    isBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    goToBack() {
      this.$cmapp.jumpTo('', 'navigateBack');
    }
  }
});
</script>
