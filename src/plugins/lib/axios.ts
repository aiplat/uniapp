/*
 * @FilePath: \src\plugins\lib\axios.ts
 * @Description:  用于请求第三方接口:比如地图api,公司接口都使用src/plugins/uniAjax.class.ts
 * @Author: aiplat.com
 * @Date: 2020-08-26 20:37:04
 * @LastEditTime: 2020-08-26 20:41:33
 */
import axios from 'axios';

axios.defaults.adapter = function (config: any) {
  return new Promise((resolve, reject) => {
      const settle: any = require('axios/lib/core/settle');
      const buildURL: any = require('axios/lib/helpers/buildURL');
      uni.request({
          method: config.method.toUpperCase(),
          url: buildURL(config.url, config.params, config.paramsSerializer),
          header: config.headers,
          data: config.data,
          dataType: config.dataType,
          responseType: config.responseType,
          sslVerify: config.sslVerify,
          complete: function complete(response: any) {
              response = {
                  data: response.data,
                  status: response.statusCode,
                  errMsg: response.errMsg,
                  header: response.header,
                  config: config
              };
              settle(resolve, reject, response);
          }
      });
  });
};
export default axios;