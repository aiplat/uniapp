<template>
	<div class="cm_pf cm_pc_12 cm_hl3 cm_tc" :class="{'cm_b3e':isCrB!='1','cm_bl0':isCrB=='1'}"  @click="$cm.toWin('',app.url)">
		&copy;2016 {{app.name}} {{app.site}}
	</div>
</template>

<script>
  export default {
    props: {
      isCrB: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        app: {
          name: '',
          site: '',
        },
      };
    },
    methods: {

    },
    mounted() {
      const t = this;
      t.app = t.$conf;
    },
    onShow() {
      const t = this;
      t.app = t.$conf;
    },
  };
</script>
