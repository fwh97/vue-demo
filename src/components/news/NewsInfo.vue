<template>
	<div class="newsinfo-container">
		<!-- 自组件title -->
		<title-box :title="this.newsinfo.title" :add_time="this.newsinfo.add_time" :click="this.newsinfo.click" ></title-box>
		<div class="content" v-html="newsinfo.contents"></div>
		
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment.vue'
	import topTitle from '../topTitle/title.vue'
	export default{

			data(){
				return {
					id:this.$route.params.id,
					newsinfo:{}
				}
			},
			created(){
				this.getNewsInfo()
			},
			methods:{
				getNewsInfo(){
					this.newsinfo=
						{
							title:'随便',
							add_time:'2018-08-08',
							click:'2',
							contents:'fejifhwwfehiefhiwehfiwehfiwehfiwehfiohkdsfhefefefgegwgwegewgwgewgewhafqerehewgegEggEgEGGGGGGeqgeqgqejgiehgiwehiowheoghweohguwh个你个黑而非价格IEhi韩国跟换个号国际收购金额合计 '
						}
				}
			},
			components:{
				'comment-box':comment,
				'title-box':topTitle

			}
		}
</script>

<style lang="scss">
  .content {
    img {
      width: 100%;
    }
  }
</style>