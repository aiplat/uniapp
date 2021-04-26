<template>
  <div class="cm_main2">
    <div class="cm_pc_12">
      <Header1 :title="title" v-if="platform==='h5'"></Header1>
      <div class="cm_pc_12 ulMain" :class="{'cm_ptb4':platform==='h5','cm_pb1':platform!=='h5'}">
        <ul class="cm_pc_12 cm_prl1">
          <li class="cm_pc_12 cm_mtb1">
            <img :src="logo" class="cm_wh7 cm_br305 cm_fc"/>
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
          <li class="cm_pc_12 cm_tc" v-if="platform==='mp-toutiao'">
            <button class="cm_pc_12 cm_hl205 cm_c8b cm_cf cm_fs09" @tap="onTtGetUserInfo" ><span>授权</span></button>
          </li>
          <li class="cm_pc_12 cm_tc" v-if="platform==='mp-weixin'">
            <button class="cm_pc_12 cm_hl205 cm_c8b cm_cf cm_fs09" open-type="getUserInfo" lang="zh_CN"
                    @getuserinfo="onWXGetUserInfo" ><span>授权</span></button>
          </li>
          <li class="cm_pc_12 cm_tc" v-if="platform==='mp-alipay'">
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

  export default Vue.extend({
    components: {},
    data() {
      return {
        project: this.$config.project.name,
        title: this.$config.project.name,
        logo: '../static/logo.png',
        description: this.$config.project.description,
        copyright: `${this.$config.project.copyright} ${this.$config.project.email}`,
        navigateType: 'redirectTo',
        copyrightData: this.$config.project,
        platform: this.$config.platform,
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
        const $vue:any = this;
        const getInfo:any = () => {
          uni.getUserInfo({
            success(res:any) {
              if (res.errMsg === 'getUserInfo:ok') {
                $vue.saveMpUserInfo(res.userInfo);
                return;
              }
              $vue.unauthorized();
            },
            fail() {
              $vue.unauthorized();
            },
          });
        };
        const isAuth:any = $vue.$cmapp.getStorage('isAuth');
        if (isAuth && isAuth === 'yes') {
          getInfo();
        } else {
          $vue.$cmapp.authType = 3;
          $vue.$cmapp.checkWxUserAuth((authId:any) => {
            if (authId === 0) {
              console.log('已授权');
              $vue.$cmapp.setStorage('isAuth', 'yes');
              getInfo();
            }
          }, () => {
            console.log('未授权');
            $vue.$cmapp.clearLS('isAuth');
          });
        }
      },
      // 获取支付宝用户信息
      onALIGetAuthorize() {
        const $vue:any = this;
        // @ts-ignore
        my.getOpenUserInfo({
          success: (res:any) => {
            const aliInfo:any = JSON.parse(res.response).response;
            const userInfo:object = {
              openid: `alipay${new Date().valueOf()}`,
              nickName: aliInfo.nickName,
              avatarUrl: aliInfo.avatar,
              gender: aliInfo.gender === 'm' ? 1 : 2,
              city: aliInfo.city,
              province: aliInfo.province,
              country: aliInfo.countryCode,
              language: aliInfo.countryCode,
            };
            $vue.saveMpUserInfo(userInfo);
          },
          fail: () => {
            $vue.unauthorized();
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
      async saveMpUserInfo(userInfo:any) {
        await this.$cmapp.saveUserInfo(this, userInfo, () => {
          uni.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000,
          });
          this.$cmapp.authToPage(this, 'yes');
        });
      },
      async onWXGetUserInfo(event:any) {
        if (event.detail.errMsg === 'getUserInfo:ok') {
          this.saveMpUserInfo(event.detail.userInfo);
          return;
        }
        this.unauthorized();
      },
    },
    onShareAppMessage() {
      const url:string = `/pages/${this.$config.project.type}/index`;
      return this.$cmapp.setShareMessage(this, {
        sharePage: url,
        shareIndex: url,
        shareTitle: `${this.$config.site}欢迎您`,
        shareUrl: '',
      });
    },
    async onLoad(query:any) {
      this.$cmapp.setNavigationBarColor();
      this.$cmapp.noAuthIndex(this, 'yes', query);
    },
  });
</script>
