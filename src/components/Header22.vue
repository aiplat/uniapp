<template>
  <div class="cm_pf cm_tl0 cm_w100 cm_z99">
      <div class="cm_pc_12 cm_pr cm_m0 cm_b0">
          <div class="cm_pa cm_tl0 cm_z2 cm_wh2 cm_m05" @click="routerBack">
              <image class="cm_fc cm_wh100" :src="back2"/>
          </div>
          <div class="cm_pc_12 cm_hl3 cm_tc cm_cf cm_fwb">{{title}}</div>
      </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        back2: '../../static/aiplat/cm_back.png',
      };
    },
    methods: {
      routerBack() {
        const t:any = this;
        t.$router.push({ path: '/' });
      },
    },
  });
</script>
