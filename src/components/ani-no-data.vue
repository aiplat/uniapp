<template>
  <view class="cm_pc_12 cm_wh100">
    <div class="cm_pc_12 cm_tc cm_c4c cm_mt7">
      {{ message.title }}
    </div>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class aniNoData extends Vue {
  @Prop({
    type: Object,
    default() {
      return {
          title: "正在拼命加载中..",
        };
    },
  })
  message: any;
}
</script>
