<template>
	<div class="cm_main2">
		<web-view :src="webSite" v-if="webSite"></web-view>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        webSite: '',
        isPlat: '',
      };
    },
    components: {},
    mounted() {
    },
    onShow() {
      const t = this;
      t.webSite = t.$cm.getLS('webSite');
      console.log(`uni.getStorageSync("webSite")===${t.$cm.getLS('webSite')}`);
      // #ifdef H5
      t.isPlat = 'H5';
      // #endif
      // #ifndef H5
      t.isPlat = 'noH5';
      // #endif
    },
  };
</script>
