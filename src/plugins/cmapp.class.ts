/*
 -----------------------------------------------------------------
 // Copyright (C) 2016 https://aiplat.com 版权所有。
 // cmapp.ts
 // 创 建 人：aiplat.com
 // 修改日期：2019.01.23
//  描述:小程序专用
 -----------------------------------------------------------------
 */

class cmappClass {
  public authCallBack:any; // 对应 以下参数 func，当类型function时授权之后返回到上一页执行一次func
  public authType:number; // 对应authTypeObj
  public authTypeObj:Array<any>; // 微信授权
  public environmentInfo: any = {
    userAgent: null,
    isMiniprogram: !window, // 是否为小程序环境
    isElectron: 0, // 是否为electron环境
    isWeixin: 0, // 微信环境
    isWechat: 0, // 公众号环境
    isWxwork: 0, // 企业微信环境
    isDevtools: 0, // 微信开发者工具环境
    isApp: 0, // app环境
    isHvoi: 0, // 特定手机或系统
    isWebview: 0, // 是否为内嵌的webview
    appType: 0
  }; // 环境详情参数
  public innerAudioContext: any;
  constructor() {
    this.authType = 0;
    this.authTypeObj = [
      {
        type: 'scope.userLocation',
        title: '温馨提示',
        content: '需要获取您的位置信息',
        ts: '未授权微信获取位置',
      },
      {
        type: 'scope.werun',
        title: '温馨提示',
        content: '需要获取您的运动信息',
        ts: '未授权微信获取步数',
      },
      {
        type: 'scope.camera',
        title: '温馨提示',
        content: '需要获取您的系统相机',
        ts: '未授权微信获取相机',
      },
    ];
  }
  getUniApi(uniApi: any, config = {}) {
    let isSuccess = 0;
    return new Promise((resolve: any, reject: any) => {
      const callback = {
        ...config,
        success(res: any) {
          isSuccess = 1;
          resolve({
            isSuccess,
            res,
          });
        },
        fail(res: any) {
          reject({
            isSuccess,
            res,
          });
        },
      }
      uniApi(callback);
    });
  }
  isApp() {
    return window && window.plus || false;
  }
  setStorage(key: string, value: any, type = 'uni') {
    if (type === 'plus') {
      this.isApp() && window.plus.storage.setItem(key, value) || window.localStorage.setItem(key, value);
      return;
    }
    uni.setStorageSync(key, value);
  }
  getStorage(key: string, type = 'uni') {
    if (type === 'plus') {
      return this.isApp() && window.plus.storage.getItem(key) || window.localStorage.getItem(key) || '';
    }
    return uni.getStorageSync(key) || '';
  }
  removeStorage(key: string, type = 'uni') {
    if (key) {
      if (type === 'plus') {
        this.isApp() && window.plus.storage.removeItem(key) || window.localStorage.removeItem(key);
        return;
      }
      uni.removeStorageSync(key);
    } else {
      window && window.localStorage.clear();
      uni.clearStorageSync();
    }
  }
  updateLS(k:string, timeKey:string, s:number, func:any) { // k值的timeKey超过s分钟为过期，过期(id=0)则清除k值
    const cmapp:any = this;
    const nd:any = new Date().valueOf();
    const kid:any = cmapp.getStorage(k);
    const time:any = cmapp.getStorage(timeKey);
    let id:number = 1;
    if (kid && time && nd - time >= 1000 * 60 * s) {
      cmapp.removeStorage(k);
      id = 0;
    }
    if (typeof func === 'function') {
      func(id);
    }
  }
  getSearchValue(name: string, path = '') {
    let reg: any = new RegExp(name + '=([^&]*)(&|$)', 'i');
    const params = path || (!this.environmentInfo.isMiniprogram && window.location.href || '');

    reg = params.substr(1).match(reg);
    const value = reg != null ? reg[1] : null;
    return value;
  }
  getQuery($vue: any, key: string) {
    const route = '_route';
    let query = $vue.$mp && $vue.$mp.query || null;
    const query2 = $vue[route] && $vue[route].query || null;
    const query3 = $vue.__page__ && $vue.__page__.options || null;
    query = query || query2 || query3;
    if (key === 'query') {
      return query || '';
    }
    const value2 = !this.environmentInfo.isMiniprogram && window.location.href.includes(`${key}=`) && this.getSearchValue(key) || '';
    return query && query[key] || value2 || '';
  }
  getSelectorInfo(selector: string) {
    return new Promise((resolve: any) => {
      const query: any = uni.createSelectorQuery();
      query.select(selector).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res: any) => {
        resolve(res);
      });
    });
  }
  getDivMatrix(m:any) { // 获取旋转对象div的matrix转换为角度
    const d1:number = 180;
    const d2:number = 360;
    const aa:any = Math.round(d1 * Math.asin(m[0]) / Math.PI);
    const bb:any = Math.round(d1 * Math.acos(m[1]) / Math.PI);
    const cc:any = Math.round(d1 * Math.asin(m[2]) / Math.PI);
    const dd:any = Math.round(d1 * Math.acos(m[3]) / Math.PI);
    let deg:any = 0;
    if (aa === bb || -aa === bb) {
      deg = dd;
    } else if (-aa + bb === d1) {
      deg = d1 + cc;
    } else if (aa + bb === d1) {
      deg = d2 - cc || d2 - dd;
    }
    return deg >= d2 ? 0 : deg;
  }
  /**
   * 获取旋转对象div的matrix
   * @param selector
   */
   getDivDeg(selector: string) {
    const $cmapp: any = this;
    return new Promise((resolve: any, reject: any) => {
      uni.createSelectorQuery().select(selector).fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['animation', 'transform'],
        context: true,
      }, async function (res: any) {
        if (res.transform) {
          const transform: any = res.transform;
          const matrix: any = transform.split(',');
          if (matrix && matrix.length > 0) {
            matrix[0] = matrix[0].split('(').pop();
            const deg: any = await $cmapp.getDivMatrix(matrix);
            resolve(deg);
          } else {
            reject(0);
          }
        } else {
          reject(0);
        }
      }).exec();
    });
  }
  update() {// 升级
    const cmapp:any = this;
    const updateManager:any = uni.getUpdateManager();

    updateManager.onCheckForUpdate((res:any) => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      cmapp.removeStorage('');
      const a:object = {
        title: '新版本更新中..',
        icon: 'none',
      };
      uni.showToast(a);
      updateManager.applyUpdate();
    });

    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
    });
  }
  /**
   * 打开页面 只用于 cmapp.isToAuth 中转（所有点击都必须经过cmapp.isToAuth）
   * @param url 路由
   * @param navigateType 类型 switchTab、reLaunch、navigateTo、redirectTo、navigateBack
   */
  jumpTo(url:string, navigateType:string, isAuth = 'no') {
    if (!url && navigateType !== 'navigateBack') {
      console.log(isAuth);
      return;
    }
    switch (navigateType) {
      case 'switchTab': uni.switchTab({ url: url }); break;
      case 'reLaunch': uni.reLaunch({ url: url }); break;
      case 'navigateBack': uni.navigateBack(); break;
      case 'navigateTo': uni.navigateTo({ url: url }); break;
      case 'redirectTo': uni.redirectTo({ url: url }); break;
      case 'yes': uni.redirectTo({ url: url }); break;// 同redirectTo
      default: uni.navigateTo({ url: url }); break;
    }
  }
  /**
   * 统一点击方法 cmapp.isToAuth
   // 对应 以下参数 func，当类型function时授权之后返回到上一页执行一次func
   */
  isToAuth(page:any, navigateType:any, func:any) {
    const cmapp:any = this;
    const wxinfo = cmapp.getStorage('userInfo');
    const nb = 'navigateBack';
    let nt = navigateType;
    if (wxinfo && wxinfo.openid) {
      if (nt === nb && typeof func === 'function') {
        func();
        return;
      }
      cmapp.jumpTo(page, navigateType);
    } else {
      if (nt === nb && typeof func === 'function') {
        cmapp.authCallBack = func;
      }
      if (!nt) {
        nt = 'redirectTo';
      }
      const shareUrl = encodeURIComponent(page);
      const authUrl = `/pages/index?shareUrl=${shareUrl}&navigateType=${nt}`;
      cmapp.jumpTo(authUrl, 'navigateTo');
    }
  }
  /**
   * 执行cmapp.isToAuth中参数func的方法
   * 需要在执行了cmapp.isToAuth方法时的页面onShow中加 this.$cmapp.getAuthCallBack();
   */
  getAuthCallBack() {
    const cmapp:any = this;
    const isCallBack:any = cmapp.getStorage('isCallBack');
    if (typeof cmapp.authCallBack === 'function' && isCallBack && isCallBack === 'yes') {
      cmapp.authCallBack();
      cmapp.authCallBack = '';
      cmapp.removeStorage('isCallBack');
    } else if (isCallBack === 'yes') {
      cmapp.authCallBack = '';
      cmapp.removeStorage('isCallBack');
    }
  }
  /**
   小程序登录获取code
   */
  getCode() {
    let code:any = null;
    return new Promise((resolve, reject) => {
      uni.login({
        success: async (res:any) => {
          if (res.code) {
            code = res.code;
          }
          resolve(code);
        },
        fail: async () => {
          reject(code);
        },
      });
    });
  }
  /**
   * 检测是否授权
   * @param key 是否存在的Stroage的key
   * @param func1
   * @param func2
   * @returns {Promise<void>}
   */
  async checkLogin(key:any, func1:any, func2:any) {
    const cmapp:any = this;
    const storageValue = cmapp.getStorage(key);
    if (storageValue) {
      await func1();
    } else {
      await func2();
    }
  }
  /**
   * 获取openid
   * @param t
   * @param code
   * @param func
   * @returns {Promise<void>}
   */
  async getOpenid($vue:any, code:any) {
    const cmapp:any = this;
    return new Promise(async (resolve) => {
      const responseData = await $vue.$uniAjax.http($vue.$api.sign.getUserId, {
        apptype: $vue.$config.project.type,
        plat: $vue.$config.platform,
        code: code,
      }, {
        method: 'POST',
      });
      const openid = responseData.isSuccess && responseData.data && responseData.data.list && responseData.data.list.openid || null;
      openid && cmapp.setStorage('openid', openid);
      !openid && cmapp.removeStorage('openid');
      resolve(openid);
    });
  }
  /**
   * 保存用户信息
   * @param t
   * @param info
   * @param func
   * @returns {Promise<void>}
   */
  saveUserInfo(t:any, info:any, func:any) {
    const cmapp:any = this;
    info.platform = t.$config.platform;
    info.apptype = t.$config.project.type;
    info.openid = info.openid ? info.openid : t.$cmapp.getStorage('openid');
    t.$uniAjax.http(t.$api.sign.saveUserInfo, info, {
      method: 'POST',
    }, (isSuc:number, res:any) => {
      t.$store.dispatch('setUserInfo', info);
      cmapp.setStorage('userInfo', info);
      let d:any = null;
      if (isSuc) {
        d = res.data;
      }
      if (typeof func === 'function') {
        func(d);
      }
    }, 'no');
  }
  /**
   * 已授权 直接到对应的shareUrl页面
   * @param t
   * @param isTs
   */
  authToPage(t:any, isTs = 'no', time:any) {
    const cmapp:any = this;
    let url = `/pages/${t.$config.project.type}/index`;
    const shareUrl = cmapp.getStorage('shareUrl');
    if (shareUrl) {
      url = decodeURIComponent(shareUrl);
    }
    if (t.navigateType === 'navigateBack') {
      cmapp.setStorage('isCallBack', 'yes');
    }
    if (isTs === 'no') {
      cmapp.jumpTo(url, t.navigateType);
      return;
    }
    let timeOut = 2000;
    if (time) {
      timeOut = time;
    }
    setTimeout(() => {
      cmapp.jumpTo(url, t.navigateType);
    }, timeOut);
  }
  /**
   * 获取分享路由所带的参数
   * @param query
   * @param k
   * @returns {Promise<void>}
   */
  getUrlParams(t:any, query:any, k:any) {
    const cmapp:any = this;
    if (query && query[k]) {
      cmapp.setStorage(k, decodeURIComponent(query[k]));
    } else {
      cmapp.removeStorage(k);
    }
  }
  /**
   * 入口页面
   * @param t
   * @param isAuth 有tabs并且当前页面是tabs中一页时必为yes
   * @param query
   * @param func
   * @returns {Promise<void>}
   */
  async noAuthIndex(t:any, isAuth = 'no', query:any, func:any) {
    const cmapp:any = this;
    uni.showLoading({ title: '数据加载中..' });
    await cmapp.getUrlParams(t, query, 'scene');
    await cmapp.getUrlParams(t, query, 'shareId');
    await cmapp.getUrlParams(t, query, 'shareUrl');
    await cmapp.getUrlParams(t, query, 'returnUrl');
    if (query && query.navigateType) {
      t.navigateType = query.navigateType;
    }
    const d = async () => {
      uni.hideLoading();
      t.isLoadEnd = 1;
      let shareUrl:any = cmapp.getStorage('shareUrl');
      const userInfo:any = cmapp.getStorage('userInfo');
      if (userInfo) {
        t.$store.dispatch('setUserInfo', userInfo);
        await t.$cmapp.saveUserInfo(t, userInfo);
      }
      if (isAuth === 'yes') {
        if (userInfo && shareUrl) {
          cmapp.authToPage(t, 'no');
          return;
        }
        if (typeof func === 'function') {
          func();
        }
        return;
      }
      if (shareUrl) {
        shareUrl = decodeURIComponent(shareUrl);
        cmapp.jumpTo(shareUrl, query.navigateType || '');
      }
      if (typeof func === 'function') {
        func();
      }
    };
    cmapp.checkLogin('openid', () => {
      d();
    }, async () => {
      cmapp.getCode().then((code:any) => {
        cmapp.getOpenid(t, code).then(() => {
          d();
        });
      });
    });
  }
  /**
   * PopWin.vue关闭窗口
   */
  closePop(t:any, time = 1, func:any) {
    setTimeout(() => {
      t.popIsShow = 'no';
      if (typeof func === 'function') {
        func();
      }
    }, time * 1000);
  }
  /**
   * 设置分享信息
   * @param t
   * @param d d参数如下4个：
   * @param sharePage 已授权后打开的路由
   * @param shareIndex 未授权时打开的页面，默认/pages/${t.$config.project.dir}/index
   * @param shareTitle 分享标题
   * @param shareUrl 打开sharePage或shareIndex之后再打开的shareUrl，默认不打开
   * @returns {{path: (*|string), title: (string|*)}}
   */
  setShareMessage(t:any, d:any) {
    const cmapp:any = this;
    let path = d.sharePage;
    const userInfo = cmapp.getStorage('userInfo');
    if (!userInfo) {
      path = d.shareIndex ? `${d.shareIndex}` : `/pages/${t.$config.project.dir}/index`;
    }
    path +=  path.includes('?') ? '&' : '?';
    path += `shareId=${cmapp.getStorage('openid') ? cmapp.getStorage('openid') : ''}`;
    path += `&scene=${cmapp.getStorage('scene') ? cmapp.getStorage('scene') : ''}`;
    if (d.shareUrl) {
      path += `&shareUrl=${encodeURIComponent(d.shareUrl)}`;
    }
    const title = d.shareTitle ? `${d.shareTitle}` : t.$config.project.name;
    return {
      title: title,
      path: path,
    };
  }
  /**
   * 支付宝 设置主题颜色
   */
  setNavigationBarColor() {
    // #ifdef MP-ALIPAY
    const bgColor = '#1890FF';
    const txtColor = '#FFFFFF';
    uni.setNavigationBarColor({
      frontColor: txtColor,
      backgroundColor: bgColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn',
      },
    });
    // #endif
  }
  notFound() { // 页面不存在时自动到首页
    // @ts-ignore
    uni.onPageNotFound((res:any) => {
      uni.showToast({
        title: '页面出错，自动到首页',
        icon: 'none',
      });
      let q:any = '';
      if (res.query && res.query.scene) {
        const scene = decodeURIComponent(res.query.scene);
        q = `?scene=${scene}`;
      }
      setTimeout(() => {
        uni.redirectTo({ url: `/pages/index${q}` });
      }, 2000);
    });
  }
  /**
   * 结合h5跳转路由
   * @param path
   * @param url
   * @param type
   */
  goToWindow(url:any, type:any) {
    // #ifdef APP-PLUS
    this.setStorage('h5url', url);
    this.jumpTo('/pages/common/h5', '', '');
    // #endif
    // #ifndef APP-PLUS
    // #ifdef H5
    const w:any = window;
    if (type === 'email') {
      w.location = `mailto:${url}`;
      return;
    }
    w.location = url;
    // #endif
    // #ifndef H5
    uni.showToast({
      title: '请打开aiplat.com查看',
      icon: 'none',
    });
    // #endif
    // #endif
  }
  tsCity(cityName:string) { // 删除市、区、县 三字
    const lastStr:any = cityName.substr(cityName.length - 1);
    const filterWords:Array<string> = ['市', '区', '县'];
    if (filterWords.includes(lastStr) && cityName.length > 2) {
      cityName = cityName.slice(0, -1);
    }
    return cityName;
  }
  lessThan10(num: any) { // 0~9前加0
    return num < 10 ? `0${num}` : num;
  }
  /*
 * 1，当前日期时间戮  cmapp.nowTime(0,0);
 * 2，日期转时间戮  cmapp.nowTime(0,'2017-01-01');
 * 3，时间戮转日期  cmapp.nowTime(1,'1500002222',f);//f为格式
 * */
  nowTime(type: any, dateTime: any, format: any, isMillisecond: any) {
    let nowTime: any = null;
    let value: any = null;
    if (dateTime) {
      nowTime = new Date(dateTime);
    } else {
      nowTime = new Date();
    }
    if (type === 0) { // 日期转时间戮
      const v: any = nowTime.valueOf() / 1000;
      if (isMillisecond) {
        return nowTime.valueOf();
      }
      value = parseInt(v, 10);
    } else { // 时间戮转日期
      const y: any = nowTime.getFullYear();
      const m: any = this.lessThan10(nowTime.getMonth() + 1);
      const d: any = this.lessThan10(nowTime.getDate());
      const h: any = this.lessThan10(nowTime.getHours());
      const m2: any = this.lessThan10(nowTime.getMinutes());
      const s: any = this.lessThan10(nowTime.getSeconds());
      switch (format) {
        case 1:
          value = `${y}-${m}-${d} ${h}:${m2}:${s}`;
          break;
        case 2:
          value = `${y}/${m}/${d} ${h}:${m2}:${s}`;
          break;
        case 3:
          value = `${y}/${m}/${d}`;
          break;
        case 4:
          value = `${y}/${m}`;
          break;
        case 5:
          value = `${m}/${d}`;
          break;
        case 6:
          value = `${y}-${m}-${d}`;
          break;
        case 7:
          value = `${y}-${m}`;
          break;
        case 8:
          value = `${m}-${d}`;
          break;
        case 9:
          value = `${h}:${m2}:${s}`;
          break;
        case 10:
          value = `${y}年${m}月${d}日`;
          break;
        case 11:
          value = `${y}-${m}-${d} ${h}:${m2}`;
          break;
        case 12:
          value = `${y}/${m}/${d} ${h}:${m2}`;
          break;
        case 13:
          value = `${y}年${m}月${d}日 ${h}:${m2}`;
          break;
        default:
          value = `${y}-${m}-${d}`;
          break;
      }
    }
    return value;
  }
  /**
   * 倒计时(进度条显示的时间)
   */
   countDownTime(time: any, type: any, isFan: any) {
    let nowTime: any = new Date().valueOf();
    let jdt: any = 0;
    const arr: Array<any> = [3600, 24, 60, 10];
    let time2: any = time;
    if (isFan) {
      const a: any = nowTime;
      nowTime = time2;
      time2 = a;
    }
    if (time2 && time2 > nowTime) {
      const v1: any = (time2 - nowTime) / (arr[3] * arr[3] * arr[3]);
      const n: number = parseInt(v1, arr[3]);
      const v2: any = n / (arr[0] * arr[1]);
      const day: number = parseInt(v2, arr[3]);
      const v3: any = ((n - day * arr[0] * arr[1]) / arr[0]);
      const hour: number = parseInt(v3, arr[3]);
      const v4: any = ((n - day * arr[0] * arr[1] - hour * arr[0]) / arr[2]);
      const minutes: number = parseInt(v4, arr[3]);
      const seconds: any = n - day * arr[0] * arr[1] - hour * arr[0] - minutes * arr[2];
      jdt = `${day}天${hour}时${minutes}分${seconds}秒`;
      if (day <= 0) {
        if (type === 1) {
          jdt = `${hour}时${minutes}分${seconds}秒`;
        }
        if (hour <= 0 && type === 2) {
          jdt = `${minutes}分${seconds}秒`;
        }
      }
      if (type === 3) {
        jdt = {
          day: day, hour: hour, minutes: minutes, seconds: seconds,
        };
      }
    }
    return jdt;
  }
  checkMobile(value: any) {
    let reg: string = '^[1][3,4,5,6,7,8,9][0-9]{9}$';
    const regExp: any = new RegExp(reg);
    return regExp.test(value);
  }
  isIllegalMobile(value: any, txt = '手机号码') {
    let message = [`${txt}正确`, `请输入11位${txt}`, `${txt}必须为11位数字`, `${txt}格式为1(3~9)开头`];
    let illegalId = 0;
    if (!value || value.length !== 11) {
      illegalId = 1;
    } else if (!this.checkWord(value, 1)) {
      illegalId = 2;
    } else if (!this.checkMobile(value)) {
      illegalId = 3;
    }
    return {
      illegalId,
      message: message[illegalId],
    };
  }
  /**
   * 默认type=0:只限中文、英文
   * type=1:只限数字
   * type=2:只限数字和小数点
   * type=3:只限中文
   * type=4:只限英文
   * type=5:只限大写英文
   * type=6:只限小写英文
   * type=7:只限中文、英文、数字和小数点
   * @param v
   * @param type
   * @returns {*}
   */
   checkWord(value: any, type: any) {
    let reg: string = '^[A-Za-z\u4e00-\u9fa5]+$';

    switch (type) {
      case 1:
        reg = '^[0-9]+$';
        break;
      case 2:
        reg = '^[0-9.]+$';
        break;
      case 3:
        reg = '^[\u4e00-\u9fa5]+$';
        break;
      case 4:
        reg = '^[A-Za-z]+$';
        break;
      case 5:
        reg = '^[A-Z]+$';
        break;
      case 6:
        reg = '^[a-z]+$';
        break;
      case 7:
        reg = '^[A-Za-z0-9.\u4e00-\u9fa5]+$';
      case 8:
        reg = '^[0-9-]+$';
        break;
      default:
        break;
    }
    const regExp: any = new RegExp(reg);
    return regExp.test(value);
  }
  openWxSetting(func:any, func2:any) {// 打开设置
    const cmapp:any = this;
    const a:any = {
      success() {
        cmapp.openWxAuth(0, func, func2);
      },
      fail() {
        func2(func);
      },
    };
    uni.openSetting(a);
  }
  openWxAuth(type:any, func:any, func2:any) {// 提示授权的操作
    const cmapp:any = this;
    uni.authorize({
      scope: cmapp.authTypeObj[cmapp.authType].type,
      success(res:any) {
        // data: {scope.userInfo: "ok"} // res.data[cmapp.authTypeObj[cmapp.authType].type] === 'ok'
        // #ifdef MP-TOUTIAO
        if (res.data[cmapp.authTypeObj[cmapp.authType].type] === 'ok') {
          func(0, func);
        } else {
          func2(func);
        }
        // #endif
        // #ifndef MP-TOUTIAO
        func2(func);
        // #endif
      },
      fail() {
        if (type === 1) {
          uni.hideLoading();
          uni.showModal({
            title: cmapp.authTypeObj[cmapp.authType].title,
            content: cmapp.authTypeObj[cmapp.authType].content,
            success(res:any) {
              if (res.confirm) {
                cmapp.openWxSetting(func, func2);
              } else if (res.cancel) {
                if (typeof func === 'function') {
                  func(1);
                }
              }
            },
          });
        } else {
          func2(func);
        }
      },
    });
  }
  /**
   *是否授权过
   * @param func 如(id, authData) => {}  , id=0已授权,id=1取消授权
   * @param func2
   */
  checkWxUserAuth(func:any, func2:any) {
    const cmapp:any = this;
    uni.getSetting({
      success(res:any) {
        const a = res.authSetting[cmapp.authTypeObj[cmapp.authType].type] !== undefined && res.authSetting[cmapp.authTypeObj[cmapp.authType].type] !== true;
        const b = res.authSetting[cmapp.authTypeObj[cmapp.authType].type] === undefined;
        const c = JSON.stringify(res.authSetting) === '{}';
        let aa = a;
        // #ifdef MP-TOUTIAO
        aa = aa || c;
        // #endif
        if (aa) {
          cmapp.openWxAuth(1, func, func2);
        } else if (b) {
          func2(func);
        } else {
          func(0, func);
        }
      },
    });
  }
  getWebGeo(t:any, localGeo:any, func:any) {// 经纬度转为地址信息
    const cmapp:any = this;
    const keyId:any = Math.round(Math.random() * (t.$config.map.keys.length - 1));
    const d:object = {
      location: `${localGeo.latitude},${localGeo.longitude}`,
      ak: t.$config.map.keys[keyId],
      output: 'json',
      coordtype: 'gcj02ll',
      latest_admin: 1,
    };
    uni.request({
      url: t.$config.map.host + t.$config.map.apis.geocoder,
      data: d,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: async function (res:any) {
        if (res.data && res.data.status === 0) {
          const result:any = { ...res.data.result };
          const lg:any = result.addressComponent;
          lg.cityName = cmapp.tsCity(lg.city);
          lg.lng = localGeo.longitude;
          lg.lat = localGeo.latitude;
          cmapp.setStorage('localGeo', lg);
        }
        if (typeof func === 'function') {
          func();
        }
      },
      fail: async () => {
        if (typeof func === 'function') {
          func();
        }
      },
    });
  }
  // 获取微信经纬度
  getLocation(func:any) {
    uni.getLocation({
      type: 'wgs84',
      success(res:any) {
        const localGeo:any = {
          longitude: res.longitude,
          latitude: res.latitude,
        };
        if (typeof func === 'function') {
          func(2, localGeo);
        }
      },
      fail() {
        if (typeof func === 'function') {
          func(1);
        }
      },
    });
  }
  // 判断是否要显示loading showLoad 为 yes 或者 no
  showLoad(t:any, type:any) {
    if (!t.showLoad || t.showLoad !== 'no') {
      if (type === 1) {
        uni.showLoading({
          title: '数据加载中..',
        });
        return;
      }
      if (type === 0) {
        uni.hideLoading();
      }
    }
  }
  // 需要授权地理位置的页面
// const t = this;
// cmapp.authType = 0;
// cmapp.checkLocalGeo(t, () => {
//   授权或取消后页面执行的方法
// });
  checkLocalGeo(t:any, func3:any) {
    const cmapp:any = this;
    cmapp.showLoad(t, 1);
    cmapp.authType = 0;
    cmapp.checkWxUserAuth(function (id:any, authData:any) {
      if (id === 1) {
        cmapp.showLoad(t, 0);
        func3();
      } else if (id === 2) {
        cmapp.getWebGeo(t, authData, () => {
          cmapp.showLoad(t, 0);
          func3();
        });
      } else {
        const localGeo:any = cmapp.getStorage('localGeo');
        if (!localGeo || (localGeo && !localGeo.lng)) {
          cmapp.getLocation(authData);
        } else {
          cmapp.showLoad(t, 0);
          func3();
        }
      }
    }, cmapp.getLocation);
  }
  /**
   * 重置动画
   * @param $vue
   */
   animationReset($vue: any) {
    const animation: any = uni.createAnimation({
      duration: 100,
    });
    animation.rotate(0).step();
    $vue.animationData = animation.export();
  }
  /**
   * 指定div或图左右摇摆的动画
   * @param $vue
   * @param animationAngle 摇摆角度
   * @param maxRun 摇摆次数
   * @param duration 每次摇摆的时间
   * @param callback
   * div中必有 :animation='animationData'
   * data中必有 animationData = {}字段
   */
  animationShake($vue: any, animationAngle = -10, maxRun = 6, duration = 500, callback: any) {
    const $cmapp: any = this;
    const animationRun: any = uni.createAnimation({
      duration: duration,
      timingFunction: 'ease',
    });
    animationRun.rotate(animationAngle).step();
    $vue.animationData = animationRun.export();
    let num: number = 0;
    const thisShake = setInterval(() => {
      num += 1;
      if (num > maxRun || $vue.animationEnd) {
        $vue.animationEnd = false;
        $cmapp.animationReset($vue);
        clearInterval(thisShake);
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }
      animationAngle = -animationAngle;
      animationRun.rotate(animationAngle).step();
      $vue.animationData = animationRun.export();
    }, duration + 5);
  }
  /**
   * showToast方法封装
   * @param title 内容
   * @param icon 图标
   * @param duration 持续时间
   */
   showToast(title = '网络出错了', icon = 'none', duration = 2000, position = 'center') {
    return new Promise((resolve: any) => {
      const params: any = {
        title,
        icon,
        duration,
        position,
        mask: true,
        complete: (res:any) => {
          setTimeout(() => {
            resolve(res);
          }, duration);
        }
      }
      uni.showToast(params);
    });
  }
  /**
   * 内部 audio 音乐播放
   * @param audioUrl
   * @param autoplay
   */
   toPlayAudio(audioUrl: string, autoplay = true) {
    const $cmapp: any = this;
    return new Promise((resolve, reject) => {
      if (this.innerAudioContext) {
        this.innerAudioContext.destroy();
      }
      this.innerAudioContext = uni.createInnerAudioContext();
      this.innerAudioContext.autoplay = autoplay;
      this.innerAudioContext.src = audioUrl;
      this.innerAudioContext.play();
      this.innerAudioContext.onPlay(() => {
        this.showToast('播放成功');
        resolve({
          isSuccess: 1,
          message: '播放成功',
          errCode: 0,
          innerAudioContext: $cmapp.innerAudioContext
        });
      });
      this.innerAudioContext.onError((responseData: any) => {
        this.showToast('播放失败');
        reject({
          isSuccess: 0,
          message: responseData,
          errCode: 0,
          innerAudioContext: this.innerAudioContext
        });
      });
      this.innerAudioContext.onEnded(() => {
        this.innerAudioContext.destroy();
        this.showToast('播放已结束');
      });
      this.innerAudioContext.onStop((responseData: any) => {
        this.showToast('播放已停止');
      });
    });
  }
  /**
   * 保存图片到手机
   * @param isCanvas yes为从canvas保存过去，no为普通保存
   * @param id isCanvas=yes时必填
   * @param filePath isCanvas=no时必填
   * @param callback
   */
   saveImageToPhotosAlbum(isCanvas = 'no', id: any, filePath: any, callback: any) {
    const $cmapp: any = this;
    uni.showLoading({ title: '保存中..' });
    let toast: string = '保存失败';
    const save: any = (path: string) => {
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success() {
          uni.hideLoading();
          toast = '保存成功';
          $cmapp.showToast(toast);
          setTimeout(() => {
            if (typeof callback === 'function') {
              callback();
            }
          }, 2000);
        },
        fail() {
          uni.hideLoading();
          $cmapp.showToast(toast);
        },
      });
    };
    if (isCanvas === 'no') {
      save(filePath);
      return;
    }
    uni.canvasToTempFilePath({
      canvasId: id,
      success(responseData: any) {
        save(responseData.tempFilePath);
      },
      fail() {
        uni.hideLoading();
        $cmapp.showToast(toast);
      },
    });
  }
  /**
   * canvas内文本自动换行
   * @param ctx getContext('2d') 对象
   * @param lineheight 行高
   * @param bytelength 每行字数
   * @param text 文本
   * @param startleft 开始x坐标
   * @param starttop 开始y坐标
   */
   canvasTextAutoLine(ctx: any, lineheight: any, bytelength: any, text: any, startleft: any, starttop: any) {
    const getTrueLength: any = (str: any) => {
      const length: any = str.length;
      let truelen: any = 0;
      for (let x: any = 0; x < length; x++) {
        if (str.charCodeAt(x) > 128) {
          truelen += 2;
        } else {
          truelen += 1;
        }
      }
      return truelen;
    };
    const cutString: any = (str: any, leng: any) => {
      const len: any = str.length;
      let tlen: any = len;
      let nlen: any = 0;
      for (let x: any = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          if (nlen + 2 < leng) {
            nlen += 2;
          } else {
            tlen = x;
            break;
          }
        } else {
          console.log();
          if (nlen + 1 < leng) {
            nlen += 1;
          } else {
            tlen = x;
            break;
          }
        }
      }
      return tlen;
    };
    for (let i: any = 1; getTrueLength(text) > 0; i++) {
      const tl: any = cutString(text, bytelength);
      ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ''), startleft, (i - 1) * lineheight + starttop);
      text = text.substr(tl);
    }
  }
  /**
   * 返回到已打开的某个页面
   * @param url 为要返回到的那个页面的路由地址，如pages/aiplat/index
   * @param url2 如果是要返回到某个页面时并要打开在这个页面才有的入口页面，返回到url时要再进入url2
   * @param callback
   */
   backTo(url: string, url2: string) {
    const currentPages: any = getCurrentPages();
    const isCurrentPage: any = currentPages.filter((x: { route: string; }) => x.route === url);
    return new Promise((resolve: any) => {
      if (isCurrentPage && isCurrentPage.length > 0) {
        const page: any = currentPages.length - currentPages.indexOf(isCurrentPage[0]) - 1;
        uni.navigateBack({
          delta: page,
        });
        if (url2) {
          setTimeout(() => {
            uni.navigateTo({
              url: url2,
            });
          }, 100);
        }
      }
      resolve();
    });
  }
  openLocation(latitude: any, longitude: any, name: string, address: string) {
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    this.getUniApi(uni.openLocation, {
      latitude,
      longitude,
      scale: 18,
      name,
      address,
    }).then((responseData:any) => {
      console.log(responseData);
    }).catch((responseData:any) => {
      console.log(responseData);
    });
  }
  onAccelerometerChange($vue: any, url:string) {
    this.getUniApi(uni.getSystemInfo).then(() => {
      uni.onAccelerometerChange((e: any) => {
        const pages: any = getCurrentPages();
        const currentPage: any = pages[pages.length - 1];
        if (currentPage.route === url) {
          currentPage.$vm.onAccelerometerChange(e);
        }
      });
    }).catch((responseData:any) => {
      console.log(responseData);
    });
  }
  scrollTo(scrollTop: number, duration: number, selector: string) {
    return new Promise<void>((resolve) => {
      const params: object = {
        scrollTop: scrollTop || 0,
        duration: duration || 999,
        selector: selector || '',
        complete: () => {
          resolve();
        }
      };
      uni.pageScrollTo(params);
    });
  }
  eventListener(type: string, eventName: any, func: any) {
    if (!eventName) {
      return;
    }
    if (type === 'dispatchEvent') {
      const event: any = new Event(eventName);
      event && window.dispatchEvent(event);
      return;
    }
    window.addEventListener(eventName, func);
  }
  showInfo(title:any,content:any, showCancel:any, cancelText:any, confirmText:any, confirmColor:any, completeFunction:any) {
    if (!content) {
      return;
    }
    uni.showModal({
      title: title || '温馨提示',
      content: content,
      showCancel: showCancel || false,
      cancelText: cancelText || '取消',
      confirmText: confirmText || '确定',
      confirmColor: confirmColor || '#ff8b15',
      complete: (res:any)=>{
        completeFunction && completeFunction(res);
      }
    });
  }
  getAppType() {
    if (!window) {
      return 'miniprogram';
    }
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent && /(android)/i.test(userAgent)) {
      return 'android';
    } else if (userAgent && /(iphone|ipad|ipod|ios)/i.test(userAgent)) {
      return 'ios';
    } else if (userAgent && /(mobile|micromessenger)/i.test(userAgent)) {
      return 'mobile';
    }
    return 'pc'; // pc
  }
  async setEnvironmentInfo($vue: any) {
    this.environmentInfo.isMiniprogram = !window;
    this.environmentInfo.isWebview = this.getQuery($vue, 'isWebview') ? 1 : 0;
    this.environmentInfo.appType = this.getAppType();
    // #ifdef APP-PLUS
    this.environmentInfo.isApp = 1;
    // #endif
    const weixinType = this.getQuery($vue, 'weixinType') || this.getStorage('weixinType');
    if (weixinType) {
      this.setStorage('weixinType', weixinType);
    }
    // #ifdef H5
    this.environmentInfo.userAgent = window.navigator.userAgent.toLowerCase();
    this.environmentInfo.isElectron = this.environmentInfo.userAgent.includes('electron') ? 1 : 0;
    this.environmentInfo.isWeixin = this.environmentInfo.userAgent.includes('micromessenger') ? 1 : 0;
    this.environmentInfo.isWxwork = this.environmentInfo.userAgent.includes('wxwork') ? 1 : 0;
    this.environmentInfo.isWechat = (this.environmentInfo.isWeixin && !this.environmentInfo.isWxwork) || this.environmentInfo.userAgent.includes('wechat') ? 1 : 0;
    this.environmentInfo.isDevtools = this.environmentInfo.userAgent.includes('wechatdevtools') ? 1 : 0;
    this.environmentInfo.isApp = this.environmentInfo.userAgent.includes('html5plus') ? 1 : 0;
    const hvoi = this.environmentInfo.userAgent.includes('huawei') || this.environmentInfo.userAgent.includes('vivo') || this.environmentInfo.userAgent.includes('oppo') || this.environmentInfo.userAgent.includes('iphone');
    this.environmentInfo.isHvoi = hvoi ? 1 : 0;
    // #endif
    if (weixinType === 'wechat') {
      this.environmentInfo.isWechat = 1;
      this.environmentInfo.isWxwork = 0;
    }
    if (weixinType === 'wxwork') {
      this.environmentInfo.isWechat = 0;
      this.environmentInfo.isWxwork = 1;
    }
    $vue.$forceUpdate();
  }
}

export default cmappClass;
