<template>
	<div class="cm_pf cm_pc_12 cm_hl3 cm_tc" :class="{'cm_b3e':isb0!=1,'cm_bl0':isb0==1}"  @click="$cm.toWin('',app.url)">
		&copy;2016 {{app.name}} {{app.site}}
	</div>
</template>

<script>
	export default {
		props: ['isb0'],
		data() {
			return {
				app: {
					name: '',
					site: ''
				}
			}
		},
		components: {},
		methods: {

		},
		mounted() {
			const t = this;
			t.app = t.$conf;
		},
		onShow() {
			const t = this;
			t.app = t.$conf;
		}
	}
</script>
