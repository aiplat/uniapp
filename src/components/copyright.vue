<template>
  <div class="cm_pf cm_w100 cm_hl3 cm_tc" :class="placeC1" v-if="copyrightData&&copyrightData.copyright">
    <span :class="c1">{{copyrightData.copyright}} {{copyrightData.name}} {{copyrightData.site}}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      placeC1: {
        type: String,
        default: 'cm_bl0',
      },
      c1: {
        type: String,
        default: 'cm_c3c',
      },
      copyrightData: {
        type: Object,
        default() {
          return {
            copyright: '',
            name: '',
            site: '',
            placeClass: '',
          };
        },
      },
    },
  });
</script>
