<template>
  <ul class="cm_pc_12 cm_bf cm_tc cm_b1ce table" v-if="tableData&&tableData.columnList&&tableData.rowList&&tableData.columnList.length>0&&tableData.rowList.length>0">
    <li class="cm_pc_12 cm_lh2 cm_bb1ce columnList">
      <div class="bl" :class="'cm_pc_'+tableData.columnList.length+'f'" v-for="(v1,k1) in tableData.columnList" :key="k1">
        <span class="cm_fs08">{{v1}}</span>
      </div>
    </li>
    <li class="cm_pc_12 cm_lh2 columnList" :class="{'cm_bb1ce':k2<tableData.rowList.length-1}" v-for="(v2,k2) in tableData.rowList" :key="k2">
      <div class="bl" :class="'cm_pc_'+tableData.columnList.length+'f'" v-for="(v3,k3) in v2" :key="k3">
        <span class="cm_fs08">{{v3}}</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
  import Vue from 'vue';
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
      return {
        f: '',
      };
    },
  });
</script>
<style lang="less" scoped>
  .columnList{
    .bl:not(:first-of-type){
      border-left: 1px solid #eee;
    }
  }
</style>
