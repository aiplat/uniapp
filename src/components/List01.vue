<template>
  <ul class="cm_pc_12">
    <li
      class="cm_pc_12 cm_hl3 cm_bb1ce"
      v-for="(item1, index1) in listData"
      :key="index1"
      @click="listEmit(item1)"
    >
      <img
        class="cm_pa cm_tl0 cm_wh2 cm_bs100 cm_br1 cm_m05"
        :src="item1.img"
        v-if="item1.img"
      />
      <div class="cm_pc_12 cm_prl3" :class="{'cm_pl05':!item1.img}">
        {{ index1 + 1 }}、{{ item1.title }}
      </div>
      <img
        class="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1"
        :src="item1.rightImg"
        background-size="cover"
        v-if="item1.rightImg"
      />
      <img
        class="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1"
        :src="rightImg"
        background-size="cover"
        v-else
      />
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      rightImg: "../../static/aiplat/cm_right.png",
    };
  },
  methods: {
    listEmit(item: any) {
      this.$emit("listEmit", item);
    },
  },
});
</script>
