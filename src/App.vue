<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    mpType: 'app',
    async onLaunch() {
      console.log('App Launch');
      // #ifdef MP-WEIXIN
      await this.$cmapp.update();
      // await this.$cmapp.notFound(this);
      // #endif
      this.$cmapp.setEnvironmentInfo(this);
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
