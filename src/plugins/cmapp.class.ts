/*
 -----------------------------------------------------------------
 // Copyright (C) 2016 https://aiplat.com 版权所有。
 // cmapp.ts
 // 创 建 人：aiplat.com
 // 修改日期：2019.01.23
//  描述:小程序专用
 -----------------------------------------------------------------
 */

class CmappClass {
  public authCallBack:any; // 对应 以下参数 func，当类型function时授权之后返回到上一页执行一次func
  public authType:number; // 对应authTypeObj
  public authTypeObj:Array<any>; // 微信授权
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
  setLS(k:string, v:any) {
    uni.setStorageSync(k, v);
  }
  getLS(k:string) {
    return uni.getStorageSync(k) || '';
  }
  clearLS(k: string) {
    if (k) {
      uni.removeStorageSync(k);
    } else {
      uni.clearStorageSync();
    }
  }
  updateLS(k:string, timeKey:string, s:number, func:any) { // k值的timeKey超过s分钟为过期，过期(id=0)则清除k值
    const cmapp:any = this;
    const nd:any = new Date().valueOf();
    const kid:any = cmapp.getLS(k);
    const time:any = cmapp.getLS(timeKey);
    let id:number = 1;
    if (kid && time && nd - time >= 1000 * 60 * s) {
      cmapp.clearLS(k);
      id = 0;
    }
    if (typeof func === 'function') {
      func(id);
    }
  }
  checkSession(func:any) {// 检测session id是否失效
    uni.checkSession({
      success() {
        if (typeof func === 'function') {
          func(1);
        }
      },
      fail() {
        if (typeof func === 'function') {
          func(0);
        }
      },
    });
  }
  getQuery(type:string, func:any) {// 获取div信息
    const query:any = uni.createSelectorQuery();
    query.select(type).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res:any) => {
      if (typeof func === 'function') {
        func(res);
      }
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
  getDivDeg(id:string, func:any) { // 获取旋转对象div的matrix
    const cmapp:any = this;
    uni.createSelectorQuery().select(id).fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['animation', 'transform'],
      context: true,
    }, async function (res:any) {
      if (res.transform) {
        const a:any = res.transform;
        const matrix:any = a.split(',');
        if (matrix && matrix.length > 0) {
          matrix[0] = matrix[0].split('(').pop();
          const deg:any = await cmapp.getDivMatrix(matrix);
          func(deg);
        } else {
          func(0);
        }
      }
    }).exec();
  }
  update() {// 升级
    const cmapp:any = this;
    const u:any = uni.getUpdateManager();

    u.onCheckForUpdate((res:any) => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    u.onUpdateReady(function () {
      cmapp.clearLS('');
      const a:object = {
        title: '新版本更新中..',
        icon: 'none',
      };
      uni.showToast(a);
      u.applyUpdate();
    });

    u.onUpdateFailed(() => {
      // 新版本下载失败
    });
  }
  /**
   * 打开小程序
   * @param t
   * @param appId  打开的小程序id
   * @param path  打开的小程序的路径
   * @param userInfo 传过去的数据
   * @param func 打开成败的回调
   */
  openMiniProgram(t:any, appId:string, path = '', userInfo:any, func:any) {
    const cmapp:any = this;
    cmapp.isToAuth('auth', '', 'navigateBack', () => {
      if (cmapp.getLS('isOpenMp')) {
        return;
      }
      cmapp.setLS('isOpenMp', 'yes');
      uni.navigateToMiniProgram({
        appId: appId,
        path: path,
        extraData: {
          userInfo: userInfo,
        },
        envVersion: 'trial',
        success() {
          cmapp.clearLS('isOpenMp');
          if (typeof func === 'function') {
            func();
          }
        },
        fail() {
          cmapp.clearLS('isOpenMp');
          if (typeof func === 'function') {
            func();
          }
        },
      });
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
    const wxinfo = cmapp.getLS('userInfo');
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
    const isCallBack:any = cmapp.getLS('isCallBack');
    if (typeof cmapp.authCallBack === 'function' && isCallBack && isCallBack === 'yes') {
      cmapp.authCallBack();
      cmapp.authCallBack = '';
      cmapp.clearLS('isCallBack');
    } else if (isCallBack === 'yes') {
      cmapp.authCallBack = '';
      cmapp.clearLS('isCallBack');
    }
  }
  /**
   小程序登录获取code
   */
  getCode(t:any, func:any) {
    let c:any = null;
    uni.login({
      success: async (res:any) => {
        if (res.code) {
          c = res.code;
        }
        if (typeof func === 'function') {
          func(c);
        }
      },
      fail: async () => {
        if (typeof func === 'function') {
          func(c);
        }
      },
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
    const k = cmapp.getLS(key);
    if (k) {
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
  getOpenid(t:any, code:any, func:any) {
    const cmapp:any = this;
    t.$uniAjax.http(t.$api.sign.getUserId, {
      apptype: t.$conf.project.type,
      plat: t.$conf.plat,
      code: code,
    }, {
      method: 'POST',
    }, (isSuc:number, res:any) => {
      let d = null;
      if (isSuc && res.data && res.data.list && res.data.list.openid) {
        d = res.data.list.openid;
        cmapp.setLS('openid', d);
      } else {
        cmapp.clearLS('openid');
      }
      if (typeof func === 'function') {
        func(d);
      }
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
    info.plat = t.$conf.plat;
    info.apptype = t.$conf.project.type;
    info.openid = info.openid ? info.openid : t.$cmapp.getLS('openid');
    t.$uniAjax.http(t.$api.sign.saveUserInfo, info, {
      method: 'POST',
    }, (isSuc:number, res:any) => {
      t.$store.dispatch('setUserInfo', info);
      cmapp.setLS('userInfo', info);
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
    let url = `/pages/${t.$conf.project.type}/index`;
    const shareUrl = cmapp.getLS('shareUrl');
    if (shareUrl) {
      url = decodeURIComponent(shareUrl);
    }
    if (t.navigateType === 'navigateBack') {
      cmapp.setLS('isCallBack', 'yes');
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
      cmapp.setLS(k, decodeURIComponent(query[k]));
    } else {
      cmapp.clearLS(k);
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
      let shareUrl:any = cmapp.getLS('shareUrl');
      const userInfo:any = cmapp.getLS('userInfo');
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
      await cmapp.getCode(t, async (code:any) => {
        cmapp.getOpenid(t, code, () => {
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
   * @param shareIndex 未授权时打开的页面，默认/pages/${t.$conf.project.dir}/index
   * @param shareTitle 分享标题
   * @param shareUrl 打开sharePage或shareIndex之后再打开的shareUrl，默认不打开
   * @returns {{path: (*|string), title: (string|*)}}
   */
  setShareMessage(t:any, d:any) {
    const cmapp:any = this;
    let path = d.sharePage;
    const userInfo = cmapp.getLS('userInfo');
    if (!userInfo) {
      path = d.shareIndex ? `${d.shareIndex}` : `/pages/${t.$conf.project.dir}/index`;
    }
    if (path.indexOf('?') > -1) {
      path += '&';
    } else {
      path += '?';
    }
    path += `shareId=${cmapp.getLS('openid') ? cmapp.getLS('openid') : ''}`;
    path += `&scene=${cmapp.getLS('scene') ? cmapp.getLS('scene') : ''}`;
    if (d.shareUrl) {
      path += `&shareUrl=${encodeURIComponent(d.shareUrl)}`;
    }
    const title = d.shareTitle ? `${d.shareTitle}` : t.$conf.project.name;
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
  toWin(url:any, type:any) {
    const w:any = window;
    // #ifdef H5
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
  }
  tsCity(c:string) { // 删除市、区、县 三字
    const lastStr:any = c.substr(c.length - 1);
    const arr:Array<string> = ['市', '区', '县'];
    if (arr.includes(lastStr) && c.length > 2) {
      c = c.slice(0, -1);
    }
    return c;
  }
  lt10(m:any) { // 0~9前加0
    const a:any = m < 10 ? `0${m}` : m;
    return m < 10 ? `0${m}` : m;
  }
  /*
 * 1，当前日期时间戮  cmapp.nowTime(0,0);
 * 2，日期转时间戮  cmapp.nowTime(0,'2017-01-01');
 * 3，时间戮转日期  cmapp.nowTime(1,'1500002222',f);//f为格式
 * */
  nowTime(tp:any, nd:any, f:any) {
    const cmapp:any = this;
    let n:any = null;
    let t:any = null;
    if (nd) {
      n = new Date(nd);
    } else {
      n = new Date();
    }
    if (tp === 0) { // 日期转时间戮
      const v:any = n.valueOf() / 1000;
      t = parseInt(v, 10);
    } else { // 时间戮转日期
      const y:any = n.getFullYear();
      const m:any = cmapp.lt10(n.getMonth() + 1);
      const d:any = cmapp.lt10(n.getDate());
      const h:any = cmapp.lt10(n.getHours());
      const m2:any = cmapp.lt10(n.getMinutes());
      const s:any = cmapp.lt10(n.getSeconds());
      switch (f) {
        case 1:
          t = `${y}-${m}-${d} ${h}:${m2}:${s}`;
          break;
        case 2:
          t = `${y}/${m}/${d} ${h}:${m2}:${s}`;
          break;
        case 3:
          t = `${y}/${m}/${d}`;
          break;
        case 4:
          t = `${y}/${m}`;
          break;
        case 5:
          t = `${m}/${d}`;
          break;
        case 6:
          t = `${y}-${m}-${d}`;
          break;
        case 7:
          t = `${y}-${m}`;
          break;
        case 8:
          t = `${m}-${d}`;
          break;
        case 9:
          t = `${h}:${m2}:${s}`;
          break;
        case 10:
          t = `${y}年${m}月${d}日`;
          break;
        default:
          t = `${y}-${m}-${d}`;
          break;
      }
    }
    return t;
  }
  /**
   * 倒计时(进度条显示的时间)
   * @param time 结束时间戮
   * @param type 返回类型
   */
  jdtTime(time:any, type:any, isFan:any) {
    let nd:any = new Date().valueOf();
    let jdt:any = 0;
    const arr:Array<any> = [3600, 24, 60, 10];
    let time2:any = time;
    if (isFan) {
      const a:any = nd;
      nd = time2;
      time2 = a;
    }
    if (time2 && time2 > nd) {
      const v1:any = (time2 - nd) / (arr[3] * arr[3] * arr[3]);
      const n:number = parseInt(v1, arr[3]);
      const v2:any = n / (arr[0] * arr[1]);
      const d:number = parseInt(v2, arr[3]);
      const v3:any = ((n - d * arr[0] * arr[1]) / arr[0]);
      const h:number = parseInt(v3, arr[3]);
      const v4:any = ((n - d * arr[0] * arr[1] - h * arr[0]) / arr[2]);
      const m:number = parseInt(v4, arr[3]);
      const s:any = n - d * arr[0] * arr[1] - h * arr[0] - m * arr[2];
      jdt = `${d}天${h}时${m}分${s}秒`;
      if (d <= 0) {
        if (type === 1) {
          jdt = `${h}时${m}分${s}秒`;
        }
        if (h <= 0 && type === 2) {
          jdt = `${m}分${s}秒`;
        }
      }
      if (type === 3) {
        jdt = {
          d: d, h: h, m: m, s: s,
        };
      }
    }
    return jdt;
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
  checkWord(v:any, type:any) {
    let reg:string = '^[A-Za-z\u4e00-\u9fa5]+$';
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
        break;
      default:
        break;
    }
    const re:any = new RegExp(reg);
    return re.test(v);
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
      success(res) {
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
            success(res) {
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
      success(res) {
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
    const keyId:any = Math.round(Math.random() * (t.$conf.map.keys.length - 1));
    const d:object = {
      location: `${localGeo.latitude},${localGeo.longitude}`,
      ak: t.$conf.map.keys[keyId],
      output: 'json',
      coordtype: 'gcj02ll',
      latest_admin: 1,
    };
    uni.request({
      url: t.$conf.map.host + t.$conf.map.apis.geocoder,
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
          cmapp.setLS('localGeo', lg);
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
      success(res2) {
        const localGeo:any = {
          longitude: res2.longitude,
          latitude: res2.latitude,
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
        const localGeo:any = cmapp.getLS('localGeo');
        if (!localGeo || (localGeo && !localGeo.lng)) {
          cmapp.getLocation(authData);
        } else {
          cmapp.showLoad(t, 0);
          func3();
        }
      }
    }, cmapp.getLocation);
  }
  // 获取微信运动数据
  getWeiRun(func:any ) {
    const cmapp:any = this;
    // @ts-ignore
    uni.getWeRunData({
      success(res:any) {
        cmapp.setLS('isWerRun', 'yes');
        func(2, res);
      },
      fail(res:any) {
        cmapp.setLS('isWerRun', 'no');
        func(1, res);
      },
    });
  }
  /**
   * 重置动画
   * @param t
   */
  animationReset(t:any) {
    const animation:any = uni.createAnimation({
      duration: 100,
    });
    animation.rotate(0).step();
    t.animationData = animation.export();
  }
  /**
   * 指定div或图左右摇摆的动画
   * @param t
   * @param animationAngle 摇摆角度
   * @param maxRun 摇摆次数
   * @param duration 每次摇摆的时间
   * div中必有 :animation="animationData"
   * data中必有 animationData = {}字段
   */
  animationShake(t:any, animationAngle = -10, maxRun = 6, duration = 500, func:any) {
    const cmapp:any = this;
    const animationRun:any = uni.createAnimation({
      duration: duration,
      timingFunction: 'ease',
    });
    animationRun.rotate(animationAngle).step();
    t.animationData = animationRun.export();
    let num:number = 0;
    const thisShake = setInterval(() => {
      num += 1;
      if (num > maxRun || t.animationEnd) {
        t.animationEnd = false;
        cmapp.animationReset(t);
        clearInterval(thisShake);
        if (typeof func === 'function') {
          func();
        }
        return;
      }
      animationAngle = -animationAngle;
      animationRun.rotate(animationAngle).step();
      t.animationData = animationRun.export();
    }, duration + 5);
  }
  /**
   * 内部 audio 音乐播放
   */
  innerAudio(url:string, autoplay = true) {
    const i:any = uni.createInnerAudioContext();
    i.autoplay = autoplay;
    i.src = url;
    i.onPlay(() => {
      console.log('innerAudio play');
    });
    i.onError((res:any) => {
      console.log(res.errMsg, '-->', res.errCode);
    });
  }
  /**
   * 保存图片到手机
   * @param t
   * @param isCanvas yes为从canvas保存过去，no为普通保存
   * @param id isCanvas=yes时必填
   * @param filePath isCanvas=no时必填
   * @param func
   */
  saveImageToPhotosAlbum(t:any, isCanvas = 'no', id:any, filePath:any, func:any) {
    uni.showLoading({ title: '保存中..' });
    let ts:object = {
      title: '保存失败',
      icon: 'none',
    };
    const save:any = (path:string) => {
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success() {
          uni.hideLoading();
          ts = {
            title: '保存成功',
            icon: 'success',
          };
          uni.showToast(ts);
          setTimeout(() => {
            if (typeof func === 'function') {
              func();
            }
          }, 2000);
        },
        fail() {
          uni.hideLoading();
          uni.showToast(ts);
        },
      });
    };
    if (isCanvas === 'no') {
      save(filePath);
      return;
    }
    uni.canvasToTempFilePath({
      canvasId: id,
      success(res:any) {
        save(res.tempFilePath);
      },
      fail() {
        uni.hideLoading();
        uni.showToast(ts);
      },
    });
  }
  /**
   * canvas内文本自动换行
   * @param ctx getContext("2d") 对象
   * @param lineheight 行高
   * @param bytelength 每行字数
   * @param text 文本
   * @param startleft 开始x坐标
   * @param starttop 开始y坐标
   */
  canvasTextAutoLine(ctx:any, lineheight:any, bytelength:any, text:any, startleft:any, starttop:any) {
    const getTrueLength:any = (str:any) => {
      const len:any = str.length;
      let truelen:any = 0;
      for (let x:any = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          truelen += 2;
        } else {
          truelen += 1;
        }
      }
      return truelen;
    };
    const cutString:any = (str:any, leng:any) => {
      const len:any = str.length;
      let tlen:any = len;
      let nlen:any = 0;
      for (let x:any = 0; x < len; x++) {
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
    for (let i:any = 1; getTrueLength(text) > 0; i++) {
      const tl:any = cutString(text, bytelength);
      ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ''), startleft, (i - 1) * lineheight + starttop);
      text = text.substr(tl);
    }
  }
  /**
   * 检测是否切换过环境
   * @param t
   */
  checkEnv(t:any) {
    const cmapp:any = this;
    const env:any = cmapp.getLS('env');
    if (env && env !== t.$conf.project.env) {
      cmapp.clearLS('');
    }
    cmapp.setLS('env', t.$conf.project.env);
  }
  /**
   * 返回到已打开的某个页面
   * @param url 为要返回到的那个页面的路由地址，如pages/chugui/index
   * 如果是要返回到某个页面时并要打开在这个页面才有的入口页面，
   * 则用@param url2, 为返回到url时要再进入的页面
   */
  backTo(url:string, url2:string) {
    const p:any = getCurrentPages();
    const b:any = p.filter((x: { route: string; }) => x.route === url);
    if (b && b.length > 0) {
      const c:any = p.length - p.indexOf(b[0]) - 1;
      uni.navigateBack({
        delta: c,
      });
      if (url2) {
        setTimeout(() => {
          uni.navigateTo({
            url: url2,
          });
        }, 100);
      }
    }
  }
}

export default CmappClass;
