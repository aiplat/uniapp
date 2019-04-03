/*
 -----------------------------------------------------------------
 // Copyright (C) 2016 aiplat.com 版权所有。
 // cmapp.js
 // 创 建 人：womendi
 // 修改日期：2019.01.23
//  描述:小程序专用
 -----------------------------------------------------------------
 */
const cm = {};
cm.setLS = (k, v) => {
  uni.setStorageSync(k, v);
};
cm.getLS = k => uni.getStorageSync(k);
cm.clearLS = (k) => {
  if (k) {
    uni.removeStorageSync(k);
  } else {
    uni.clearStorageSync();
  }
};
cm.nowTime = () => {
  const n = new Date();
  const m = n.valueOf();
  return parseInt(m / 1000, 10);
};
cm.toWin = (path, url, type) => {
  if (url) {
    cm.setLS('webSite', url);
  }
  if (url === 'weixin://') {
    uni.showToast({
      title: '请在微信小程序-搜索‘娱乐计分器’',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  // #ifdef H5
  if (path) {
    uni.navigateTo({
      url: path,
    });
    return;
  }
  if (type === 'mail') {
    window.location = `mailto:${url}`;
    return;
  }
  window.location = url;
  // #endif
  // #ifndef H5
  uni.navigateTo({
    url: path || '/pages/common/h5',
  });
  // #endif
};
/**
 * 删除市、区、县 三字
 * @param c
 * @returns {*}
 */
cm.tsCity = (c) => {
  const lastStr = c.substr(c.length - 1);
  if ((lastStr === '市' || lastStr === '区' || lastStr === '县') && c.length > 2) {
    c = c.slice(0, -1);
  }
  return c;
};

// 获取div信息
cm.getQuery = (type, func) => {
  const query = uni.createSelectorQuery();
  query.select(type).boundingClientRect();
  query.selectViewport().scrollOffset();
  query.exec((res) => {
    if (typeof func === 'function') {
      func(res);
    }
  });
};

// 小程序升级
cm.update = () => {
  const updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate);
  });

  updateManager.onUpdateReady(() => {
    cm.clearLS();
    uni.showToast({
      title: '新版本更新中..',
      icon: 'none',
      duration: 10000,
    });
    updateManager.applyUpdate();
  });

  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
  });
};
export default cm;
