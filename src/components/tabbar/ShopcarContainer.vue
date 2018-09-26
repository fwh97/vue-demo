<template>
	<div class="shopcar-container">
		<!-- 商品列表 -->
		<div class="goods-list" v-for="(item ,i ) in goodslist" :key="item.id"> 
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
					@change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
					<img :src="item.img_url" >
					<div class="info">
						<h1>{{ item.title }}</h1>
						<numbox :initcount="$store.getters.getGoodsCount[item.id]" :max="item.stock_quantity" :goodsid="item.id"></numbox>
						<p>
							<span class="price">{{ item.sell_price }}</span>
							<a  @click.prevent="remove(item.id, i)" style="float: right;">删除</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		</div>

		<!-- 结算区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div >
						<p>总计（不含运费）</p>
						<p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件， 总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import numbox from '../subcomponents/goodsList_numbox.vue'
	export default{
			data(){
				return {
					goodslist: [] // 购物车中所有商品的数据
				}
			},
			created(){
				this.getGoodsList()
			},
			methods:{
				getGoodsList(){
					var idArr=[]
					this.$store.state.car.forEach( item => idArr.push(item.id) )
					// 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
			      	if (idArr.length <= 0) {
				        return;
			      	}
					this.$http.get('api/abs/'+idArr.join(',')).then( result => {
						if (result.body.status === 0) {
							this.goodslist= result.body.message;
						}
					}, reject => {
						idArr.forEach( (item, i) => {
							this.goodslist.push({
								img_url:'http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg',
								title:'小米（Mi）小米Note 16G双网通版',
								sell_price:'￥888',
								market_price:'￥999',
								stock_quantity:'10',
								id:idArr[i]
							})
						})
					})
				},

				remove(id, index) {
			      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
			      this.goodslist.splice(index, 1);
			      this.$store.commit("removeFormCar", id);
			    },

			    selectedChanged(id, selected){
			    	this.$store.commit('updateGoodsSelected', {id, selected:selected})
			    }
			},

			components:{
				'numbox':numbox
			}
		}
</script>

<style lang="scss" scoped>
	.shopcar-container{
		background-color: #eee;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner {
		      display: flex;
		      align-items: center;
		      padding: 10px;
		    }
			img{
				width: 60px;
			}
			h1{
				font-size:13px;
				padding: 0 8px;
			}
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items:center;
			padding-left: 30px;
			p{
				margin-top: 5px;
			}
			.price{
				color:red;
				font-weight:bold;
				float:left;
				padding-right: 50px;
			}
		}
		.jiesuan {
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    .red {
		      color: red;
		      font-weight: bold;
		      font-size: 16px;
		    }
	  	}
	}
</style>