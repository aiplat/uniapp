/*
 * @FilePath: \src\plugins\lib\loadFiles.ts
 * @Description:  加载指定url, 待支持h5端
 * @Author: aiplat.com
 * @Date: 2020-06-28 09:42:24
 * @LastEditTime: 2020-12-14 15:50:38
 */ 
export default function remoteLoad(url:any, isCallback:any) {
  const win:any = window;
  const file:any = { createScript: null, removeScript: null };
  file.createScript = (url2:any) => {
    const scriptElement = win.document.createElement('script');
    win.document.body.appendChild(scriptElement);
    const promise = new Promise((resolve, reject) => {
      scriptElement.addEventListener('load', (e:any) => {
        file.removeScript(scriptElement);
        if (!isCallback) {
          resolve(e);
        }
      }, false);
      scriptElement.addEventListener('error', (e:any) => {
        file.removeScript(scriptElement);
        reject(e);
      }, false);
      if (isCallback) {
        win.callback = (result:any) => {
          resolve(result);
          win.callback = null;
        };
      }
    });
    if (isCallback) {
      url2 += !url2.includes('?') ? '?' : '&';
      url2 += 'callback=callback';
    }
    scriptElement.src = url2;
    return promise;
  };
  file.removeScript = (scriptElement:any) => {
    win.document.body.removeChild(scriptElement);
  };
  return file.createScript(url);
}
