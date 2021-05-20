<template>
  <ul class="cm_pc_12">
    <li
      class="cm_pc_12 cm_hl3 cm_bb1ce"
      v-for="(item1, index1) in listData"
      :key="index1"
      @click="listEmit(item1)"
    >
      <ani-image imgClass="cm_pa cm_tl0 cm_wh2 cm_bs100 cm_br1 cm_m05" :imgUrl="item1.img" v-if="item1.img"></ani-image>
      <div class="cm_pc_12 cm_prl3" :class="{'cm_pl05':!item1.img}">
        {{ index1 + 1 }}、{{ item1.title }}
      </div>
      <ani-image imgClass="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1" :imgUrl="item1.rightImg||rightImg"></ani-image>
    </li>
  </ul>
</template>
<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
export default class aniList01 extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  listData: any;
  rightImg = require("@/static/aiplat/cm_right.png")
  listEmit(item: any) {
    this.$emit("listEmit", item);
  }
}
</script>
