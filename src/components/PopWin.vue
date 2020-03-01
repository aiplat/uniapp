<template>
  <div class="cm_pf cm_tr0 cm_z99999 cm_wh100" v-if="popIsShow==='yes'">
    <div class="cm_pc_12 cm_h100 cm_b0 cm_o03"></div>
    <div class="cm_pa cm_tr0 cm_z2 cm_wh100">
      <div class="cm_pc_12 cm_prl2 cm_mt7">
        <ul class="cm_pc_12 cm_bf cm_br05">
          <li class="cm_pc_12 cm_hl2 cm_tc cm_be cm_brtr05 cm_brtl05">{{popData.title}}</li>
          <li class="cm_pc_12 cm_mtb05 cm_tc cm_c1c"><span class="cm_fs08">{{popData.content}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      popIsShow: {
        type: String,
        default: 'no',
      },
      popData: {
        type: Object,
        default() {
          return {
            title: '温馨提示',
            content: '',
          };
        },
      },
    },
  });
</script>
