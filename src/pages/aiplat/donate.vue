<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12" :class="{'cm_mtb4':plat==='h5','cm_mb1':plat!=='h5'}">
        <ul class="cm_pc_12">
          <li class="cm_pc_12 cm_prl05 cm_lh105 cm_ti2 cm_mtb05">
            <span class="">{{indexData.desc}}</span>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_tc cm_mb05">
            <div class="cm_pc_6 cm_hl2" :class="{'cm_c1b cm_cf':dnid==index,'cm_be':dnid!=index}"
                 @click="tsDnid(index)" v-for="(v,index) in indexData.dnarr" :key="'k1'+index">
              <span>{{v.name}}</span>
              <div class="cm_dn" v-for="(v2,index2) in indexData.dnarr" :key="'k2'+index2">{{v2.name}}</div>
            </div>
          </li>
          <li class="cm_pc_12 cm_mb05" v-for="(v2,index3) in indexData.dnarr" :key="'k3'+index3">
            <image class="cm_h17 cm_fc" :src="v2.img" v-if="dnid==index3"/>
          </li>
          <li class="cm_pc_12 cm_prl05 cm_lh1 cm_ti2 cm_mb05">
            <span class="cm_fs08 cm_c1c">{{indexData.about}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    components: {},
    data() {
      return {
        title: '捐赠我们',
        indexData:
          {
            desc: '非常感谢各位对ai智能空间的无偿捐赠,ai智能空间将会持续开发更多更好的应用。',
            about: '特别说明:以上收款二维码仅在全球唯一网站aiplat.com有效,对于全球其他地方或网站出现的均是假冒的。',
            dnid: 0,
            dnarr: [
              {
                name: '微信收款',
                img: '../../static/aiplat/donate_WX.png',
              },
              {
                name: '支付宝收款',
                img: '../../static/aiplat/donate_ZFB.png',
              },
            ],
          },
        plat: this.$conf.plat,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
      dnid() {
        return this.$store.getters.getDnid;
      },
    },
    methods: {
      tsDnid: function (id:any) {
        this.$store.dispatch('setDnid', id);
      },
    },
    onShareAppMessage() {
      const url:string = `/pages/${this.$conf.project.type}/index`;
      const a:any = this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$conf.platform.site}欢迎您`,
        shareUrl: '',
      });
      return a;
    },
    onShow() {
      this.$cmapp.setNavigationBarColor();
    },
  });
</script>
<style lang="less" scoped>
</style>
