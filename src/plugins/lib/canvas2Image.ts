/*
 * @FilePath: \src\plugins\lib\canvas2Image.ts
 * @Description:  canvas生成image
 * @Author: aiplat.com
 * @Date: 2020-06-28 09:42:24
 * @LastEditTime: 2020-07-30 20:40:50
 */
import html2canvas from 'html2canvas';

const Canvas2Image = () => {
  const win:any = window;
  const downloadMime = 'image/octet-stream';

  function scaleCanvas(canvas:any, width:any, height:any) {
    const w = canvas.width;
    const h = canvas.height;
    if (width === undefined) {
      width = w;
    }
    if (height === undefined) {
      height = h;
    }

    const retCanvas = win.document.createElement('canvas');
    const retCtx:any = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
  }

  function getDataURL(canvas:any, type:any, width:any, height:any) {
    canvas = scaleCanvas(canvas, width, height);
    return canvas.toDataURL(type);
  }

  function saveFile(strData:any, filename:any) {
    // const a = win.document.createElement('a');
    // a.href = strData;
    // a.download = filename;
    // const event = new MouseEvent('click', { bubbles: false, cancelable: false });
    // a.dispatchEvent(event);
    const saveLink:any = win.document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    saveLink.href = strData;
    saveLink.download = filename;

    const event = win.document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(event);
  }

  function genImage(strData:any) {
    return strData;
  }

  function fixType(type:any) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    const r = type.match(/png|jpeg|bmp|gif/)[0];
    return `image/${r}`;
  }

  function encodeData(data:any) {
    if (!window.btoa) {
      return 'btoa undefined';
    }
    let str = '';
    if (typeof data === 'string') {
      str = data;
    } else {
      for (let i2 = 0; i2 < data.length; i2 += 1) {
        str += String.fromCharCode(data[i2]);
      }
    }

    return btoa(str);
  }

  function getImageData(canvas:any) {
    const w = canvas.width;
    const h = canvas.height;
    return canvas.getContext('2d').getImageData(0, 0, w, h);
  }

  function makeURI(strData:any, type:any) {
    return `data: ${type};base64,${strData}`;
  }


  /**
   * create bitmap image
   * 按照规则生成图片响应头和响应体
   */
  const genBitmapImage = (oData:any) => {
    //
    // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
    // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
    //

    const biWidth = oData.width;
    const biHeight = oData.height;
    const biSizeImage = biWidth * biHeight * 3;
    const bfSize = biSizeImage + 54; // total header size = 54 bytes
    const BITMAPFILEHEADER = [
      // WORD bfType -- The file type signature; must be "BM"
      0x42, 0x4D,
      // DWORD bfSize -- The size, in bytes, of the bitmap file
      bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
      // WORD bfReserved1 -- Reserved; must be zero
      0, 0,
      // WORD bfReserved2 -- Reserved; must be zero
      0, 0,
      // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      54, 0, 0, 0,
    ];
    const BITMAPINFOHEADER = [
      // DWORD biSize -- The number of bytes required by the structure
      40, 0, 0, 0,
      // LONG biWidth -- The width of the bitmap, in pixels
      biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
      // LONG biHeight -- The height of the bitmap, in pixels
      biHeight & 0xff, biHeight >> 8 & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
      // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
      1, 0,
      // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
      // has a maximum of 2^24 colors (16777216, Truecolor)
      24, 0,
      // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
      0, 0, 0, 0,
      // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
      biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
      // LONG biXPelsPerMeter, unused
      0, 0, 0, 0,
      // LONG biYPelsPerMeter, unused
      0, 0, 0, 0,
      // DWORD biClrUsed, the number of color indexes of palette, unused
      0, 0, 0, 0,
      // DWORD biClrImportant, unused
      0, 0, 0, 0,
    ];

    const iPadding = (4 - ((biWidth * 3) % 4)) % 4;

    const aImgData = oData.data;

    let strPixelData = '';
    const biWidth4 = biWidth << 2;
    let y = biHeight;
    y -= 1;
    do {
      const iOffsetY = biWidth4 * (y - 1);
      let strPixelRow = '';
      for (let x = 0; x < biWidth; x += 1) {
        const iOffsetX = x << 2;
        strPixelRow += String.fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) +
          String.fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) +
          String.fromCharCode(aImgData[iOffsetY + iOffsetX]);
      }
      for (let c = 0; c < iPadding; c += 1) {
        strPixelRow += String.fromCharCode(0);
      }
      strPixelData += strPixelRow;
      y -= 1;
    } while (y);

    const strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

    return strEncoded;
  };


  /**
   * [saveAsImage]
   * @param  {[obj]} canvas   [canvasElement]
   * @param  {[Number]} width    [optional] png width
   * @param  {[Number]} height   [optional] png height
   * @param  {[String]} type     [image type]
   * @param  {[String]} filename [image filename]
   * @return {[type]}          [description]
   */
  const saveAsImage = (canvas:any, width:any, height:any, type:any, filename:any) => {
    if (typeof canvas === 'string') {
      canvas = win.document.getElementById(canvas);
    }
    if (type === undefined) {
      type = 'png';
    }
    filename = filename === undefined || filename.length === 0 ? `${Date.now()}.${type}` : `${filename}.${type}`;
    type = fixType(type);

    if (/bmp/.test(type)) {
      const data = getImageData(scaleCanvas(canvas, width, height));
      const strData = genBitmapImage(data);
      saveFile(makeURI(strData, downloadMime), filename);
    } else {
      const strData = getDataURL(canvas, type, width, height);
      saveFile(strData.replace(type, downloadMime), filename);
    }
  };

  const convertToImage = (canvas:any, width:any, height:any, type:any) => {
    if (typeof canvas === 'string') {
      canvas = win.document.getElementById(canvas);
    }
    if (type === undefined) {
      type = 'png';
    }
    type = fixType(type);

    if (/bmp/.test(type)) {
      const data = getImageData(scaleCanvas(canvas, width, height));
      const strData = genBitmapImage(data);
      return genImage(makeURI(strData, 'image/bmp'));
    }
    const strData = getDataURL(canvas, type, width, height);
    return genImage(strData);
  };

  const getPixelRatio = (context:any) => {
    const backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  const getHighPixels = (data:any, width:any, height:any) => {
    width = parseInt(width, 10);
    height = parseInt(height, 10);
    const canvas:any = win.document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = getPixelRatio(ctx);
    width *= ratio;
    height *= ratio;
    return {
      data: data,
      width: width,
      height: height,
      ratio: ratio,
    };
  };
  const getCanvasImg = (selector1:any, selector2:any, imgType:string) => {
    /* #ifdef H5 */
    const canvasHtml1:any = win.document.querySelector(selector1);
    const canvasHtml2:any = win.document.querySelector(selector2);
    return new Promise((resolve:any) => {
      win.document.body.style.overflow = 'auto';
      html2canvas(canvasHtml1, {
        scale: 2,
        allowTaint: true,
        logging: false,
        useCORS: true,
        removeContainer: true,
      }).then((canvas:any) => {
        canvasHtml2.appendChild(canvas);
        const width = canvas.style.width.substr(0, canvas.style.width.length - 2);
        const height = canvas.style.height.substr(0, canvas.style.height.length - 2);
        const canvasData:any = getHighPixels(canvas, width, height);
        const base64Data = convertToImage(canvasData.data, canvasData.width, canvasData.height, imgType);
        win.document.body.style.overflow = 'hidden';
        resolve(base64Data);
      });
    });
    /* #endif */
  };
  return {
    getHighPixels: getHighPixels,
    saveAsImage: saveAsImage,
    convertToImage: convertToImage,
    getCanvasImg: getCanvasImg,
  };
};

export default Canvas2Image;
