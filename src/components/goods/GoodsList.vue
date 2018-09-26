<template>
	<div class="goods-list">

		<div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getDetali(item.id)">
			<img :src="item.img_url" >
			<h2 class="title">
				{{item.title}}
			</h2>
			<div class="info">
				<p class="price">
					<span class="now">{{item.sell_price}}</span>
					<span class="old">{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	export default{
			data(){
				return {
					goodsList:[],
					pageindex:1
				}
			},
			created(){
				this.getGoodsList()
			},
			methods:{
				getGoodsList(){
					this.$http.get('api/avs').then( result => {
						if (result.body.status === 0) {
							this.goodslist = this.goodslist.concat(result.body.message);
						}
					}, reject => {
						this.goodsList.push(
						{
							img_url:'http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg',
							title:'小米（Mi）小米Note 16G双网通版',
							sell_price:'￥899',
							market_price:'￥999',
							stock_quantity:'10',
							id:'0'
						},
						{
							img_url:'http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg',
							title:'小米（Mi）小米Note 16G双网通版',
							sell_price:'￥899',
							market_price:'￥999',
							stock_quantity:'10',
							id:'1'
						},{
							img_url:'http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg',
							title:'小米（Mi）小米Note 16G双网通版',
							sell_price:'￥899',
							market_price:'￥999',
							stock_quantity:'10',
							id:'2'
						})
					} )
				},

				getMore(){
					this.pageindex++,
					this.getGoodsList();
				},

				getDetali(id){
					 // 使用JS的形式进行路由导航
			      // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
			      // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
			      // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址
					this.$router.push({name:'goodsinfo', params:{ id } });
				}
			}
		}
</script>

<style lang="scss" scoped>
	.goods-list{

		display: flex;
		//性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行
		flex-wrap:wrap;
		padding: 7px;
		//弹性项目平均分布在该行上
		justify-content: space-between;

		.goods-item{
			width: 49%;
			border: 1px solid #ccc;
			box-shadow:0 0 8px #ccc;
			display:flex;
			flex-direction:column;
			margin: 4px 0;
			padding: 2px;
			justify-content:space-between;
			min-height: 270px;
			img{
				width:100%;
			}
			.title{
				font-size:14px;
				margin: 0;
			}

			.info{
				background-color: #eee;
				p{
					margin: 0;
				}
				.price{
					.now{
						color:red;
						font-weight:bold;
						font-size:16px;
					}
					.old{
						text-decoration:line-through;
						font-size:12px;
						margin-left:10px;
					}
				}
				.sell{
					display:flex;
					justify-content:space-between;
					font-size:12px;
				}
			}
		}
	}
</style>