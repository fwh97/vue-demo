<template>
	<div class="goodsinfo-container">

		<transition @before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter" >
			<div class="ball" v-show='ballFlag' ref='ball'>
			</div>
		</transition>


		<!-- 轮播图区域 -->
	    <div class="mui-card">
	      <div class="mui-card-content">
	        <div class="mui-card-content-inner">
	          <swiper-box :lunbotuList="lunbotuList" :isfull="false"></swiper-box>
	        </div>
	      </div>
	    </div>

	    <div class="mui-card">
			<div class="mui-card-header">手机</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
					市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
					</p>

					<p>购买数量：<num-box :initcount="1" @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></num-box></p>

					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
		          	<p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
		          	<p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        		<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>



	</div>
</template>

<script>
	import swiper from '../subcomponents/swiper.vue'
	import numbox from '../subcomponents/goodsList_numbox.vue'

	export default{
		data(){
			return {
				lunbotuList:[],
				goodsinfo:{},
				id:this.$route.params.id,
				ballFlag:false,
				selectedCount:1
			}
		},
		created(){
			this.getLunbotuList()
			this.getGoodsinfo();
		},
		methods:{
			getLunbotuList(){
				this.$http.get('api/goods/getinfo/').then( result => {
					if (result.body.status === 0) {
						this.lunbotuList=result.body.message
					}
				}, reject=>{
					this.lunbotuList.push(
						{img_url:'http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg'},
						{img_url:'http://element-cn.eleme.io/static/hamburger.50e4091.png'}, 
						);
				});
			},

			getGoodsinfo(){
				this.$http.get('api/goods/getinfo/' +this.id).then( result=>{
					if (result.body.status === 0) {
						this.goodsinfo=result.body.message[0]
					}
				}, reject=>{
					this.goodsinfo=
						{
							title:'fwh',
							market_price:'999',
							sell_price:'888',
							stock_quantity:10,
							goods_no:'xiaomi Max3',
							add_time:'8012-08-09'
						};
				})
			},

			goDesc(id){
				this.$router.push({name:'goodsdesc', params:{ id }})
			},
			goComment(id){
				this.$router.push({name:'goodscomment', params:{ id }})
			},
			addToShopCar(){
				this.ballFlag=!this.ballFlag

				var goodsinfo={
					id:this.id,
					count:this.selectedCount,
					price:this.goodsinfo.sell_price,
					selected:true
				}

				this.$store.commit('addToCar', goodsinfo)
			},
			beforeEnter(el){
				el.style.transform = "translate(0, 0)";
				console.log("a");
			},
			enter(el, done){
				el.offsteWidth
				const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
		      	const badgePosition = document
		        .getElementById("badge")
		        .getBoundingClientRect();

		      	const xDist = badgePosition.left - ballPosition.left;
		      	const yDist = badgePosition.top - ballPosition.top;

			      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
			      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
			      done();
			},
			afterEnter(el){
				this.ballFlag=!this.ballFlag
			},
			getSelectedCount(count){
				this.selectedCount=count
			}
			
		},

		components:{
			'swiper-box':swiper,
			'num-box':numbox
		}
	}
</script>

<style lang="scss" scoped>
	.goodsinfo-container {
		background-color: #ccc;
		overflow: hidden;

		.now_price{
			color: red;
			font-size:16px;
			font-weight:bold;
		}
		.mui-card-footer{
			display: block;
			button{
				margin: 15px 0;
			}
		}

		.ball {
		    width: 15px;
		    height: 15px;
		    border-radius: 50%;
		    background-color: red;
		    position: absolute;
		    z-index: 99;
		    top: 390px;
		    left: 146px;
		  }
	}
</style>