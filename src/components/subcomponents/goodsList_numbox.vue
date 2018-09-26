<template>
	<div class="mui-numbox" data-numbox-min='1'>
	    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
	    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" />
	    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.min.js";
	export default{
		props:['max', 'initcount','goodsid'],
		data(){
			return {

			}
		},
		mounted(){
		// 初始化数字选择框组件
    		mui(".mui-numbox").numbox();
    		console.log(this.goodsid)
		},
		methods:{
			countChanged(){
				// 点击加入购物车获取到的数量
				this.$emit('getcount', parseInt(this.$refs.numbox.value))
				// 同步store 里的state.car的数量值
				this.$store.commit('updateGoodsInfo', {
					id:this.goodsid,
					count:this.$refs.numbox.value
				})
			},
		},
		watch:{
			max:function (newVal, oldVal) {
				mui(".mui-numbox").numbox().setOption('max', newVal);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>