<template>
  <ul class="cm_pc_12">
    <li class="cm_pc_12 cm_hl3 cm_bb1ce" v-for="(v,k) in listData" :key="k" @click="listTo(v)">
      <image class="cm_pa cm_tl0 cm_wh2 cm_bs100 cm_br1 cm_m05" :src="v.img" v-if="v.img"></image>
      <div class="cm_pc_12 cm_prl3" v-if="v.img">{{k+1}}、{{v.title}}</div>
      <div class="cm_pc_12 cm_pr3 cm_pl05" v-else>{{k+1}}、{{v.title}}</div>
      <image class="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1" :src="v.rightImg" background-size="cover" v-if="v.rightImg"></image>
      <image class="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1" :src="rightImg" background-size="cover" v-else></image>
    </li>
  </ul>
</template>
<script lang="ts">
  import Vue from 'vue';
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
        rightImg: '../../static/aiplat/cm_right.png',
      };
    },
    methods: {
      listTo(item:any) {
        this.$emit('listTo2', item);
      },
    },
  });
</script>
