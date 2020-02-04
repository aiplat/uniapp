<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    async onLaunch() {
      console.log('App Launch');
      const t = this;
      // #ifdef MP-WEIXIN
      await t.$cmapp.update();
      await t.$cmapp.notFound(t);
      // #endif
    },
    async onShow() {
      console.log('App Show');
    },
    async onHide() {
      console.log('App Hide');
    },
  });
</script>

<style>
	@import 'assets/css/cmreset.css';
	@import 'assets/css/cmstyle.css';
	@import 'assets/css/aiplat.css';
</style>
