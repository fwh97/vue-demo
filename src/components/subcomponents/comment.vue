<template>
	<div class="cmt-container">

		<h3>发表评论</h3>
		<hr>

		<textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="cContent"></textarea>

		<mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

		<div class="cmt-list">
			<div class="cmt-time" v-for="(item ,i) in comments" :key="item.add_time">
				<div class="cmt-title" >
					第{{ i+1 }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}
				</div>
				<div class="cmt-body">
					 {{ item.content ==='undefined' ? '此用户很懒，嘛都没说' : item.content  }}
				</div>
			</div>
		</div>

		<mt-button type="danger" size="large">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		props:['id'],
			data(){
				return {
					comments:[],
					cContent:''
				}
			},
			created(){
				this.getComments();
			},
			methods:{
				getComments(){
					this.comments.push(
					{
						add_time:'2008-08-08',
						user_name:'fwh',
						content:'hello world'
					},{
						add_time:'2008-08-08',
						user_name:'fwh',
						content:'hello world'
					},{
						add_time:'2008-08-08',
						user_name:'fwh',
						content:'hello world'
					});
				},

				addComment(){
					if(this.cContent.trim().length === 0){
						return Toast('评论内容不能为空！');
					}

					this.$http.post('app/comments'+this.$route.params.id, {
						content: this.cContent.trim()
					}).
					then(function (result) {
						if (result.body.status === 0) {
							var cmt={
								user_name:'匿名用户',
								add_time:Date.now(),
								content:this.cContent.trim()
							}

							this.comments.unshift(cmt)
							this.cContent=''
						}
					})
				}
			}
		}
</script>

<style lang="scss" scoped>
	.cmt-container{
		h3{
			font-size: 18px;
			margin-top: 10px;
		}
		textarea{
			font-size: 14px;
			height: 120px;
			margin: 0;
		}
		.cmt-list{
			margin: 5px 0;
			.cmt-time{
				font-size: 13px;
				.cmt-title{
					line-height: 30px;
					background-color: #ccc;
				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>