<template>
  <ul
    class="cm_pc_12 cm_bf cm_tc cm_b1ce table"
    v-if="
      tableData &&
      tableData.columnList &&
      tableData.rowList &&
      tableData.columnList.length > 0 &&
      tableData.rowList.length > 0
    "
  >
    <li class="cm_pc_12 cm_lh2 cm_bb1ce columnList">
      <div
        class="bl"
        :class="'cm_pc_' + tableData.columnList.length + 'f'"
        v-for="(item1, index1) in tableData.columnList"
        :key="index1"
      >
        <span class="cm_fs08">{{ item1 }}</span>
      </div>
    </li>
    <li
      class="cm_pc_12 cm_lh2 columnList"
      :class="{ cm_bb1ce: index2 < tableData.rowList.length - 1 }"
      v-for="(item2, index2) in tableData.rowList"
      :key="index2"
    >
      <div
        class="bl"
        :class="'cm_pc_' + tableData.columnList.length + 'f'"
        v-for="(item3, index3) in item2"
        :key="index3"
      >
        <span class="cm_fs08">{{ item3 }}</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    tableData: {
      type: Object,
      default() {
        return {
          columnList: [],
          rowList: [],
        };
      },
    },
  },
  data() {
    return {};
  },
});
</script>
<style lang="less" scoped>
.columnList {
  .bl:not(:first-of-type) {
    border-left: 1px solid #eee;
  }
}
</style>
