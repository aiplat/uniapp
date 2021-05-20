<template>
  <image :class="imgClass" :src="imgUrl" v-if="isImage"/>
  <img :class="imgClass" :src="imgUrl" v-else/>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class aniImage extends Vue {
  @Prop({ type: String, default: '' }) imgUrl:any
  @Prop({ type: String, default: '' }) imgClass:any
  // computed
  get isImage() {
    const $vue:any = this;
    return !window || $vue.$cmapp.environmentInfo.isApp || $vue.$cmapp.environmentInfo.isElectron;
  }
};
</script>
