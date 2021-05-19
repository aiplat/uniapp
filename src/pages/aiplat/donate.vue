<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <ani-header1 :title="title" v-if="platform === 'h5'"></ani-header1>
      <div
        class="cm_pc_12"
        :class="{ cm_mtb4: platform === 'h5', cm_mb1: platform !== 'h5' }"
      >
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_prl05 cm_lh105 cm_ti2 cm_mtb05">
            <span class="">{{ indexData.desc }}</span>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_tc cm_mb05">
            <div
              class="cm_pc_6 cm_hl2"
              :class="{
                'cm_c1b cm_cf': donateId == index,
                cm_be: donateId != index,
              }"
              @click="changeDonateId(index)"
              v-for="(item1, index) in indexData.qrcodeList"
              :key="index"
            >
              <span>{{ item1.name }}</span>
              <div
                class="cm_dn"
                v-for="(item2, index2) in indexData.qrcodeList"
                :key="index2"
              >
                {{ item2.name }}
              </div>
            </div>
          </li>
          <li
            class="cm_pc_12 cm_mb05"
            v-for="(item3, index3) in indexData.qrcodeList"
            :key="index3"
          >
            <ani-image imgClass="cm_h17 cm_fc" :imgUrl="item3.img" v-if="donateId == index3"></ani-image>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_lh1 cm_ti2 cm_mb05">
            <span class="cm_fs08 cm_c1c">{{ indexData.about }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {},
  data() {
    return {
      title: "捐赠我们",
      indexData: {
        desc:
          "非常感谢各位对ai智能空间的无偿捐赠,ai智能空间将会持续开发更多更好的应用。",
        about:
          "特别说明:以上收款二维码仅在全球唯一网站aiplat.com有效,对于全球其他地方或网站出现的均是假冒的。",
        donateId: 0,
        qrcodeList: [
          {
            name: "微信收款",
            img: "../../static/aiplat/donate_WX.png",
          },
          {
            name: "支付宝收款",
            img: "../../static/aiplat/donate_ZFB.png",
          },
        ],
      },
      platform: this.$config.platform,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    donateId() {
      return this.$store.getters.getDonateId;
    },
  },
  methods: {
    changeDonateId: function (id: any) {
      this.$store.dispatch("setDonateId", id);
    },
  },
  onShareAppMessage() {
    const url: string = `/pages/${this.$config.project.type}/index`;
    return this.$cmapp.setShareMessage(this, {
      sharePage: url,
      shareIndex: url,
      shareTitle: `${this.$config.site}欢迎您`,
      shareUrl: "",
    });
  },
  onShow() {
    this.$cmapp.setNavigationBarColor();
  },
});
</script>
<style lang="less" scoped>
</style>
