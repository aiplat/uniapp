<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="plat==='h5'"></Header1>
      <div class="cm_pc_12 ulMain" :class="{'cm_ptb4':plat==='h5','cm_pb1':plat!=='h5'}">
        <ul class="cm_pc_12 cm_prl1">
          <li class="cm_pc_12 cm_mtb1">
            <image :src="logo" class="cm_wh7 cm_br305 cm_fc"/>
          </li>
          <li class="cm_pc_12 cm_tc cm_bb1ce cm_pb1 cm_mb1">
            {{title}}
          </li>
          <li class="cm_pc_12 cm_tc cm_mb1">
            <span class="cm_c4c">请确认以下授权信息</span>
          </li>
          <li class="cm_pc_12 cm_tc cm_mb1">
            <span class="cm_c4c">• {{project}}旗下应用将获得您的公开信息（昵称、头像、签名等）</span>
          </li>
          <li class="cm_pc_12 cm_tc" v-if="plat==='mp-toutiao'">
            <button class="cm_pc_12 cm_hl205 cm_c8b cm_cf cm_fs09" @tap="onTtGetUserInfo" ><span>授权</span></button>
          </li>
          <li class="cm_pc_12 cm_tc" v-if="plat==='mp-weixin'">
            <button class="cm_pc_12 cm_hl205 cm_c8b cm_cf cm_fs09" open-type="getUserInfo" lang="zh_CN"
                    @getuserinfo="onWXGetUserInfo" ><span>授权</span></button>
          </li>
          <li class="cm_pc_12 cm_tc" v-if="plat==='mp-alipay'">
            <button class="cm_pc_12 cm_hl205 cm_c9b cm_cf cm_fs09" lang="zh_CN" open-type="getAuthorize" @getAuthorize="onALIGetAuthorize" scope="userInfo"><span>授权</span></button>
          </li>
        </ul>
        <Copyright :copyrightData="copyrightData"></Copyright>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  import Header1 from '@/components/Header1.vue';
  import Copyright from '@/components/Copyright.vue';

  export default Vue.extend({
    components: {
      Header1,
      Copyright,
    },
    data() {
      return {
        project: this.$conf.project.name,
        title: this.$conf.project.name,
        logo: '../static/logo.png',
        description: this.$conf.project.description,
        copyright: `${this.$conf.project.copyright} ${this.$conf.project.email}`,
        navigateType: 'redirectTo',
        copyrightData: this.$conf.project,
        plat: this.$conf.plat,
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.getUserInfo;
      },
    },
    methods: {
      onTtGetUserInfo() {
        // 获取头条用户信息
        const t:any = this;
        const getInfo:any = () => {
          uni.getUserInfo({
            success(res:any) {
              if (res.errMsg === 'getUserInfo:ok') {
                t.saveMpUserInfo(res.userInfo);
                return;
              }
              t.unauthorized();
            },
            fail() {
              t.unauthorized();
            },
          });
        };
        const isAuth:any = t.$cmapp.getLS('isAuth');
        if (isAuth && isAuth === 'yes') {
          getInfo();
        } else {
          t.$cmapp.authType = 3;
          t.$cmapp.checkWxUserAuth((authId:any) => {
            if (authId === 0) {
              console.log('已授权');
              t.$cmapp.setLS('isAuth', 'yes');
              getInfo();
            }
          }, () => {
            console.log('未授权');
            t.$cmapp.clearLS('isAuth');
          });
        }
      },
      // 获取支付宝用户信息
      onALIGetAuthorize() {
        const t:any = this;
        // @ts-ignore
        my.getOpenUserInfo({
          success: (res:any) => {
            const aliInfo:any = JSON.parse(res.response).response;
            const u:object = {
              openid: `alipay${new Date().valueOf()}`,
              nickName: aliInfo.nickName,
              avatarUrl: aliInfo.avatar,
              gender: aliInfo.gender === 'm' ? 1 : 2,
              city: aliInfo.city,
              province: aliInfo.province,
              country: aliInfo.countryCode,
              language: aliInfo.countryCode,
            };
            t.saveMpUserInfo(u);
          },
          fail: () => {
            t.unauthorized();
          },
        });
      },
      unauthorized() {
        uni.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000,
        });
      },
      async saveMpUserInfo(u:any) {
        const t:any = this;
        await t.$cmapp.saveUserInfo(t, u, () => {
          uni.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000,
          });
          t.$cmapp.authToPage(t, 'yes');
        });
      },
      async onWXGetUserInfo(e:any) {
        const t:any = this;
        if (e.detail.errMsg === 'getUserInfo:ok') {
          t.saveMpUserInfo(e.detail.userInfo);
          return;
        }
        t.unauthorized();
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
    async onLoad(query:any) {
      const t:any = this;
      t.$cmapp.setNavigationBarColor();
      t.$cmapp.noAuthIndex(t, 'yes', query);
    },
  });
</script>
