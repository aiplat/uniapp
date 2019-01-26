<template>
	<div class="cm_main2">
		<div class="cm_main cm_pr">
			<header1 :title="title" v-if="isPlat==='H5'"></header1>
			<div class="cm_pc_12" :class="{'cm_mtb4':isPlat==='H5','cm_mb1':isPlat!=='H5'}">
				<ul class="cm_pc_12">
					<li class="cm_pc_12 cm_prl05 cm_lh105 cm_ti2 cm_mtb05">
						<span class="">{{indexData.desc}}</span>
					</li>
					<li class="cm_pc_12 cm_prl05 cm_tc cm_mb05">
						<div class="cm_pc_6 cm_hl2" :class="{'cm_c1b cm_cf':dnid==k,'cm_be':dnid!=k}" @click="tsDnid(k)" v-for="(v,k) in indexData.dnarr"
						 :key="k">{{v.name}}</div>
					</li>
					<li class="cm_pc_12 cm_mb05" v-for="(v2,k2) in indexData.dnarr" :key="k2">
						<image class="cm_h17 cm_fc" :src="v2.img" v-if="dnid==k2" />
					</li>
					<li class="cm_pc_12 cm_prl05 cm_lh1 cm_ti2 cm_mb05">
						<span class="cm_fs08 cm_c1c">{{indexData.about}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import header1 from 'components/header1';
	export default {
		data() {
			return {
				title: '捐赠我们',
				indexData: {
					desc: '非常感谢各位对ai智能空间的无偿捐赠,ai智能空间将会持续开发更多更好的应用。',
					about: '特别说明:以下收款二维码仅在全球唯一网站aiplat.com有效,对于全球其他地方或网站出现的均是假冒的。',
					dnid: 0,
					dnarr: [{
							name: '微信收款',
							img: '../../static/aiplat/donate_WX.png'
						},
						{
							name: '支付宝收款',
							img: '../../static/aiplat/donate_ZFB.png'
						}
					]
				},
				isPlat: ''
			};
		},
		components: {
			header1
		},
		methods: {
			tsDnid: function(id) {
				this.$store.dispatch('tsone', id);
			}
		},
		computed: {
			dnid() {
				return this.$store.getters.getDnid
			}
		},
		mounted() {},
		onShow() {
			const t = this;
			console.log('this.$store.getters.getDnid === ' + this.$store.getters.getDnid);
			// #ifdef H5
			t.isPlat = 'H5'
			// #endif
			// #ifndef H5
			t.isPlat = 'noH5'
			// #endif
		}
	};
</script>
<style>

</style>