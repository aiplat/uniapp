# uniapp vue-cli3版本

 - vue-cli3+vuex+cmui+html5+css3+less+sass+eslint
 - 一次开发，同时打包成Android版app、iOS版app、H5版、微信小程序版、支付宝小程序版、百度小程序版、头条小程序7个平台，界面统一，功能一致。
 - cmui仓库为https://github.com/aiplat/cmui.git
 - 代码示例为 https://aiplat.com 的版本

 - uniapp vue-cli2版本为 https://github.com/aiplat/uniapp/tree/vuecli2
 - uniapp vue-cli3 非typescript版本为 https://github.com/aiplat/uniapp/tree/vuecli3

 - 基于 https://uniapp.dcloud.io/ 的uni-app
 - 基于本仓库所开发的‘娱乐计分器’已经上线微信、头条、支付宝三大程序，近期开源。

---

# 代码目录结构
  - dist              ------打包目录
  - public
    index.html        ------入口公共html
  - src
    - assets          ------静态css文件目录
    - components      ------公共组件目录
    - pages           ------视图目录
      - aiplat        ------aiplat项目视图目录
      - common        ------公共页面目录
      - ***           ------若有多个项目，请在这新增不同目录区分
    - plugins         ------公共函数或插件目录
    - projects        ------多个小程序各配置目录
      - aiplat        ------aiplat配置信息目录
      - ***           ------若有多个项目，请在这新增不同目录区分
    - service         ------配置目录
    - static          ------静态资源目录
    - vuex            ------vuex目录
    - app.vue         ------vue应用承载文件
    - main.js         ------vue应用入口文件
    - manifest.json   ------应用配置文件
    - pages.json      ------页面配置文件

---

# clone
 - $ git clone https://github.com/aiplat/uniapp.git

# 安装依赖
 - $ cd uniapp
 - $ npm install

# 开发模式
 - npm run dev   (默认微信小程序开发)
 - 打开微信开发者工具->小程序->导入项目->选择dist/dev/mp-weixin
 - 若有多个项目同一个仓库，$ npm run dev --apptype=** 区分

# 打包项目
 - $ npm run build (默认构建微信小程序)
 - 单个项目（默认aiplat）代码打包到了dist/build/mp-weixin
 - 若有多个项目同一个仓库，$ npm run build --apptype=** 区分

---

# 注意
 - 开发工具为任意，不一定要HbuilderX.如果也要同时打包成app，再导入项目到HbuilderX打包。
 - 开发或构建成其他平台命令：
 - 这六个平台标识：alipay、baidu、toutiao、app（包含安卓和ios）、h5
 - dev为开发模式，build为构建模式
 - 参数--apptype=aiplat为项目名，默认aiplat。
 - 例如：
 - npm run dev-baidu为百度小程序开发模式
 - npm run build-baidu为百度小程序构建模式

---

# eslint
 - $ npm run lint      (查看)
 - $ npm run lint-fix  (fix)

---

# projects -- 多个小程序各配置目录
 ## 默认aiplat,其中必须包含三个文件：manifest.json、mpConf.js、pages.json
 - manifest.json  -- uni-app应用的配置文件，用于指定应用的名称、图标、权限等。
 - mpConf.js      -- aiplat配置信息
 - pages.json     -- 用于对 uni-app 进行全局配置，决定页面文件的路径、窗口表现、设置多 tab 等
 -
 - 构建APP前先将src/projects/aiplat/manifest.json中appid替换为自己帐号的appid，可以在hbuilderX中新建一个uniapp项目获取到
 - 构建APP前先执行一次非APP构建模式，使src目录有以上三个文件。

 ## 当有其他项目时如miniQQ:
 - 开发命令为npm run dev --apptype=miniQQ
 - 构建命令为npm run build --apptype=miniQQ

---
