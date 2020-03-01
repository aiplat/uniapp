/**
 -----------------------------------------------------------------
 // Copyright (C) 2016 https://aiplat.com 版权所有。
 // uniAjax.ts
 // 创 建 人：aiplat.com
 // 修改日期：2019.05.23
 //  描述: * 基于Promise对象与uni.request 统一请求ajax
 -----------------------------------------------------------------
 */
import api from '@/service/api';

export default {
  baseURL: api.server,
  config: {
    url: '',
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
    data: {},
    dataType: 'json',
    // responseType: 'text',
    success: () => {},
    fail: () => {},
    complete: () => {},
  },
  isLoading: true,
  http(url:string, data:any, options:any, func:any, isLoading:any, isError:any) {
    const t:any = this;
    if (!options) {
      options = {};
    }
    options.baseURL = options.baseURL || t.baseURL;
    options.url = options.baseURL + url;
    if ((options.method === 'POST' || options.method === 'post') && (options.header === undefined || !options.header)) {
      options.header = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    options.header = options.header || t.config.header;
    options.method = options.method || t.config.method;
    options.data = data || {};
    options.dataType = options.dataType || t.config.dataType;
    // options.responseType = options.responseType || t.config.responseType;
    // #ifndef MP-WEIXIN
    // delete options.responseType; // （h5+和支付宝）不支持并且会报错
    // #endif
    const ts:any = isLoading && isLoading !== 'no' ? isLoading : '数据加载中..';
    if (isLoading !== 'no') {
      uni.showLoading({ title: ts });
    }
    const a:any = new Promise((resolve:any) => {
      let conf2:any = null;
      options.complete = (res:any) => {
        if (isLoading !== 'no') {
          uni.hideLoading();
        }
        const s = res.data && res.data.res === 0;
        if (res.statusCode !== 200 || !s) {
          if (isError) {
            const errorTxt:any = {
              title: '网络出错了',
              icon: 'none',
              duration: 3000,
            };
            if (isError !== 'yes') {
              errorTxt.title = isError;
            }
            uni.showToast(errorTxt);
          }
        }
        let isSuc:number = 0;
        if (res.statusCode === 200 && s) {
          isSuc = 1;
        }
        if (typeof func === 'function') {
          func(isSuc, res);
        }
        resolve(res);
      };
      conf2 = Object.assign({}, t.config, options);
      uni.request(conf2);
    });
    return a;
  },
  httpAll(arr:any, func:any) {
    let isSuc:number = 0;
    return Promise.all(arr).then((res:any) => {
      isSuc = 1;
      if (typeof func === 'function') {
        func(isSuc, res);
      }
    }).catch((error:any) => {
      if (typeof func === 'function') {
        func(isSuc, error);
      }
    });
  },
};
