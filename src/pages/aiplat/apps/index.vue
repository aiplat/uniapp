<template>
	<div class="cm_main2">
		<div class="cm_main cm_pr">
			<header1 :title="title" v-if="isPlat==='H5'"></header1>
			<div class="cm_pc_12" :class="{'cm_mtb4':isPlat==='H5','cm_mb1':isPlat!=='H5'}">
				<ul class="cm_pc_12">
					<li class="cm_pc_12 cm_mt05">
						<image class="cm_wh7 cm_fc" :src="logo" />
					</li>
					<li class="cm_pc_12">
						<ul class="cm_pc_12 cm_prl05" v-for="(item,k2) in indexData" :key="k2">
							<li class="cm_pc_12">
								<div class="cm_fl cm_prl05 cm_be cm_hl2 cm_mtb05 cm_br02">{{k2+1}}、{{item.name}}</div>
							</li>
							<li class="cm_pc_12 cm_pd05 cm_tc cm_be">
								<div class="cm_pc_12 cm_lh3 cm_br02 cm_bf cm_bb1ce" v-for="(v,k) in item.arr" :key="k" @click="$cm.toWin('',v.url)">
									<div class="cmtou" v-if="v.market">{{v.market+'-'+v.name}}</div>
									<div class="cmtou" v-else>{{v.name}}</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
  import header1 from '../../../components/header1';

  export default {
    data() {
      return {
        title: '应用展示',
        logo: '../../../static/aiplat/metro_icon.png',
        indexData: [{
                      name: '亲信地铁',
                      arr: [{
                              name: '跨平台网址-webApp',
                              url: 'http://m.aiplat.com/metro',
                              market: '',
                            },
                            {
                              name: '安卓App下载',
                              url: 'http://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.H5093BCE5',
                              market: '腾讯应用宝',
                            },
                            {
                              name: '苹果App下载',
                              url: 'https://itunes.apple.com/cn/app/id1254451008',
                              market: 'appstore',
                            },
                      ],
                    },
                    {
                      name: '娱乐计分器',
                      arr: [{
                        name: '微信小程序-搜索‘娱乐计分器’',
                        url: 'weixin://',
                        market: '',
                      }],
                    },
                    {
                      name: 'AI智能空间',
                      arr: [{
                              name: '单页面vue版',
                              url: 'http://aiplat.com',
                              market: '',
                            },
                            {
                              name: '单页面react版',
                              url: 'http://react.aiplat.com',
                              market: '',
                            },
                            {
                              name: '单页面angular版',
                              url: 'http://ajs.aiplat.com',
                              market: '',
                            },
                            {
                              name: '多页面nervjs版',
                              url: 'http://nerv.aiplat.com',
                              market: '',
                            },
                      ],
                    },
        ],
        isPlat: '',
      };
    },
    components: {
      header1,
    },
    methods: {

    },
    mounted() {

    },
    onShow() {
      const t = this;
      // #ifdef H5
      t.isPlat = 'H5';
      // #endif
      // #ifndef H5
      t.isPlat = 'noH5';
      // #endif
    },
  };
</script>
<style>

</style>
