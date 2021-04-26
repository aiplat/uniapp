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
    if (!options) {
      options = {};
    }
    options.baseURL = options.baseURL || this.baseURL;
    options.url = options.baseURL + url;
    if ((options.method === 'POST' || options.method === 'post') && (options.header === undefined || !options.header)) {
      options.header = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    options.header = options.header || this.config.header;
    options.method = options.method || this.config.method;
    options.data = data || {};
    options.dataType = options.dataType || this.config.dataType;
    // options.responseType = options.responseType || t.config.responseType;
    // #ifndef MP-WEIXIN
    // delete options.responseType; // （h5+和支付宝）不支持并且会报错
    // #endif
    const loadingTitle:any = isLoading && isLoading !== 'no' ? isLoading : '数据加载中..';
    if (isLoading !== 'no') {
      uni.showLoading({ title: loadingTitle });
    }
    return new Promise((resolve:any) => {
      let requestConfig:any = null;
      options.complete = (responseData:any) => {
        if (isLoading !== 'no') {
          uni.hideLoading();
        }
        const isSuccess = responseData.statusCode === 200 && responseData.data && responseData.data.res === 0;
        if (responseData.statusCode !== 200 || !isSuccess) {
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
        resolve({
          isSuccess,
          ...responseData,
        });
      };
      requestConfig = Object.assign({}, this.config, options);
      uni.request(requestConfig);
    });
  },
};
