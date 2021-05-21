<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform === 'h5'"></ani-header1>
      <div
        class="cm_pc_12"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
      >
        <ul class="cm_pc_12 cm_pd05">
          <li class="cm_pc_12 cm_pd05 cm_be">
            <div class="cm_pc_12">
              <div
                class="cm_pc_12 cm_lh3 cm_pl05 cm_pr3 cm_br02 cm_bf cm_bb1ce"
                v-for="(item1, index1) in findList"
                :key="index1"
                @click="$cmapp.jumpTo(item1.url)"
              >
                <div class="cmtou" v-if="item1.market">
                  {{ item1.market + "-" + item1.name }}
                </div>
                <div class="cmtou" v-else>
                  {{ index1 + 1 }}、{{ item1.name }}
                </div>
                <ani-image
                  imgClass="cm_pa cm_tr0 cm_wh1 cm_bs100 cm_m1"
                  :imgUrl="rightImg"
                  background-size="cover"
                ></ani-image>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class findPage extends Vue {
  title = "发现";
  logo = require("@/static/logo.png");
  platform = this.$config.platform;
  findList = [
    {
      name: "应用展示",
      url: "/pages/aiplat/apps",
      market: "",
    },
  ];
  rightImg = require("@/static/aiplat/cm_right.png");
  getDemo() {
    const nowTime: any = new Date().valueOf() / 1000;
    const dayTime: any = this.$cmapp.nowTime(0, "2022-05-20");
    if (nowTime > dayTime) {
      this.findList.push({
        name: "演示1",
        url: "/pages/good/cmDemo1",
        market: "",
      });
    }
  }
  onShareAppMessage() {
    const url: string = `/pages/${this.$config.project.type}/index`;
    return this.$cmapp.setShareMessage(this, {
      sharePage: url,
      shareIndex: url,
      shareTitle: `${this.$config.site}欢迎您`,
      shareUrl: "",
    });
  }
  onLoad(query: any) {
    this.$cmapp.noAuthIndex(this, "yes", query, () => {
      // #ifdef MP-WEIXIN
      this.getDemo();
      // #endif
    });
  }
  onShow() {
    this.$cmapp.setNavigationBarColor();
    this.$cmapp.getAuthCallBack();
  }
}
</script>
