# uniapp vue-cli4 typescript版本

 - vue-cli4+vuex+cmui+html5+css3+typescript
 - 一次开发，同时打包成Android版app、iOS版app、H5版、微信小程序版、支付宝小程序版、百度小程序版、头条小程序7个平台，界面统一，功能一致。
 - 新引入electron用于支持打包PC安装包
 - cmui仓库为https://github.com/aiplat/cmui.git
 - 代码示例为 https://aiplat.com 的版本 http://uniapp.aiplat.com

 - 基于 https://uniapp.dcloud.io/ 的uni-app
 - 基于本仓库所开发的‘娱乐计分器’已经成功上线微信、头条、支付宝三大程序，近期开源，敬请期待。

---

# 代码目录结构
  - dist              ------打包目录
  - public
    index.html        ------入口公共html
  - src
    - assets          ------静态css文件目录
    - components      ------公共组件目录
    - electron        ------electron目录, 用于支持打包PC安装包
    - pages           ------视图目录
      - aiplat        ------aiplat项目视图目录
      - common        ------公共页面目录
      - ***           ------若有多个项目，请在这新增不同目录区分
    - plugins         ------公共函数或插件目录
      - cmapp.class.ts------公共$cmapp配置
      - uniAjax.ts    ------公共$uniAjax配置
    - projects        ------多个小程序各配置目录
      - aiplat        ------aiplat配置信息目录
      - ***           ------若有多个项目，请在这新增不同目录区分
    - service         ------配置目录
      - apis          ------可能存在的apis目录
      - api.ts        ------公共$api配置
      - conf.ts       ------公共$conf配置
      - map.ts        ------地图api配置（百度）
    - static          ------静态资源目录
    - vuex            ------vuex目录
    - app.vue         ------vue应用承载文件
    - main.ts         ------vue应用入口文件
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
 - 若有多个项目同一个仓库，$ npm run dev --env=uat --type=** 区分

# 打包项目
 - $ npm run build (默认构建微信小程序)
 - 单个项目（默认aiplat）代码打包到了dist/build/mp-weixin
 - 若有多个项目同一个仓库，$ npm run build --env=uat --type=** 区分

---

# 注意
 - 开发工具为任意，不一定要HbuilderX.如果也要同时打包成app，再导入项目到HbuilderX打包。
 - 开发或构建成其他平台命令：
 - dev为开发模式，build为构建模式
 - 这七个平台标识：mp-alipay、mp-baidu、mp-qq、mp-toutiao、app-plus（包含安卓和ios）、h5、mp-weixin(默认)
 - 参数--env=uat为环境参数，默认uat。
 - 参数--type=aiplat为项目名，默认aiplat。
 - 例如：
 - npm run dev:baidu --env=uat --type=** 为百度小程序平台->uat环境(测试环境)->开发模式
 - npm run dev:baidu --env=ver --type=** 为百度小程序平台->ver环境(预生产环境)->开发模式
 - npm run dev:baidu --env=pro --type=** 为百度小程序平台->pro环境(生产环境)->开发模式
 - npm run build:baidu --env=uat --type=** 为百度小程序平台->uat环境(测试环境)->构建模式
 - npm run build:baidu --env=ver --type=** 为百度小程序平台->ver环境(预生产环境)->构建模式
 - npm run build:baidu --env=pro --type=** 为百度小程序平台->pro环境(生产环境)->构建模式

---

# projects -- 多个小程序各配置目录
 ## 默认aiplat,文件结构
 - uat/ver/pro(三个环境目录)   manifest.json  -- uni-app应用的配置文件，用于指定应用的名称、图标、权限等。运行微信和头条小程序时请先将其中的appid改为自己可用的。
 - mpConf.js      -- aiplat配置信息
 - pages.json     -- 用于对 uni-app 进行全局配置，决定页面文件的路径、窗口表现、设置多 tab 等
 - 构建APP前先执行一次dev或build命令，使src目录有以上三个文件。

 ## 当有其他项目时如jifenqi(娱乐计分器,后续开源):
 - 开发命令为npm run dev --env=uat --type=jifenqi
 - 构建命令为npm run build --env=uat --type=jifenqi

---

# 关于electron运行、构建、打包

#### h5运行默认http://localhost:2016/#/
## 运行：首先运行h5版本，再运行electron
#### 运行h5,单独git bash窗口1
 - $ npm run dev:h5 --env=uat --type=aiplat
#### 运行h5之后，单独git bash窗口2
 - $ npm run dev:electron --env=uat --type=aiplat
 - 此时h5运行时项目运行到electron环境

## 构建：首先构建h5版本，再构建electron，再打包（待添加完善）
#### 构建h5
 - $ npm run build:h5 --env=uat --type=aiplat
#### 构建h5之后继续执行
 - $ npm run build:electron --env=uat --type=aiplat
 - 此时h5构建时项目运行到electron环境

#### 打包PC安装包（待添加完善）
