<template>
  <image :class="imgClass" :src="imgUrl" v-if="isApp||isElectron"/>
  <img :class="imgClass" :src="imgUrl" v-else/>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    imgClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    isApp() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return userAgent.includes('html5plus') ? 1 : 0;
    },
    isElectron() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return userAgent.includes('electron') ? 1 : 0;
    }
  }
});
</script>
