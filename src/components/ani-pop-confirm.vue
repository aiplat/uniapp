<template>
  <div class="cm_pf cm_tr0 cm_z99999 cm_wh100" v-if="confirmIsShow === 'yes'">
    <div class="cm_pa cm_tr0 cm_z99 cm_wh100 cm_b0 cm_o03"></div>
    <div class="cm_pa cm_tr0 cm_z999 cm_wh100">
      <div class="cm_pc_12 cm_prl3 cm_mt7 cm_minh3">
        <ul class="cm_pc_12 cm_bf cm_br05">
          <li class="cm_pc_12 cm_hl2 cm_tc cm_be cm_brtr05 cm_brtl05">
            {{ confirmData.title }}
          </li>
          <li class="cm_pc_12 cm_mtb05 cm_tc">
            <span class="cm_fs08 cm_c1c">{{ confirmData.content }}</span>
          </li>
          <li class="cm_pc_12 cm_mtb05 cm_tc cm_z99">
            <div class="cm_pc_6">
              <div class="cm_pc_12 cm_fc4">
                <div
                  class="cm_dib cm_hl105 cm_prl05 cm_br02 cm_c1b cm_cf"
                  @click="confirmEmit('left')"
                >
                  {{ confirmData.leftBtn }}
                </div>
              </div>
            </div>
            <div class="cm_pc_6">
              <div class="cm_pc_12 cm_fc4">
                <div
                  class="cm_dib cm_hl105 cm_prl05 cm_br02 cm_b0 cm_cf"
                  @click="confirmEmit('right')"
                >
                  {{ confirmData.rightBtn }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
export default class aniPopConfirm extends Vue {
  @Prop({ type: String, default: "no" }) confirmIsShow: any;
  @Prop({
    type: Object,
    default() {
      return {
        title: "温馨提示",
        content: "",
        leftBtn: "确定",
        rightBtn: "取消",
      };
    },
  })
  confirmData: any;
  confirmEmit(type: any) {
    this.$emit("confirmEmit", type);
  }
}
</script>
