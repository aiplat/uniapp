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
                 @click="tsDnid(index)" v-for="(v,index) in indexData.dnarr" :key="index">
              <span>{{v.name}}</span>
              <div class="cm_dn" v-for="(v2,index2) in indexData.dnarr" :key="index2">{{v2.name}}</div>
            </div>
          </li>
          <li class="cm_pc_12 cm_mb05" v-for="(v2,k2) in indexData.dnarr" :key="k2">
            <image class="cm_h17 cm_fc" :src="v2.img" v-if="dnid==k2"/>
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

  import Header1 from '@/components/Header1.vue';

  export default Vue.extend({
    components: {
      Header1,
    },
    data() {
      return {
        title: '捐赠我们',
        indexData:
          {
            desc: '非常感谢各位对ai智能空间的无偿捐赠,ai智能空间将会持续开发更多更好的应用。',
            about: '特别说明:以下收款二维码仅在全球唯一网站aiplat.com有效,对于全球其他地方或网站出现的均是假冒的。',
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
        const t:any = this;
        t.$store.dispatch('setDnid', id);
      },
    },
    onShareAppMessage() {
      const t:any = this;
      const url:string = `/pages/${t.$conf.project.type}/index`;
      const a:any = t.$cmapp.setShareMessage(t, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${t.$conf.platform.site}欢迎您`,
        shareUrl: '',
      });
      return a;
    },
    onShow() {
      const t:any = this;
      t.$cmapp.setNavigationBarColor();
    },
  });
</script>
<style lang="less" scoped>
</style>
