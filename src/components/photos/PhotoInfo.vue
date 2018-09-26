<template>
	<div>
		<title-box :title="this.photoinfo.title" :add_time="this.photoinfo.add_time" :click="this.photoinfo.click" ></title-box>
			
		<!-- 缩略图区域 -->
	    <div class="thumbs">
	      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="80" @click="$preview.open(index, list)" :key="item.src">
	    </div>

		<!-- 图片内容描述区域 -->
		<div class="content" v-html="photoinfo.content"></div>
		<!-- 评论组件 -->
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
					photoinfo:{},
					list:[]
				}
			},
			created(){
				this.getPhotoInfo()
				this.getThumbs()
			},
			methods:{
				getPhotoInfo(){
					this.$http.get("api/getimageInfo/" + this.id).then(result => {
						if (result.body.status === 0) {
				          this.photoinfo = result.body.message[0];
				        }
					},reject => {
						this.photoinfo={
							title:'随便',
							add_time:'2018-08-08',
							click:'2',
							content:'哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或 '
						}
					} )
				},

				getThumbs(){
					this.$http.get("api/getthumimages/" + this.id).then( result =>{
						if (result.body.status === 0) {
							// 循环每个图片数据，补全图片的宽和高
		          result.body.message.forEach(item => {
		            item.w = 600;
		            item.h = 400;
		          });
		          // 把完整的数据保存到 list 中
		          this.list = result.body.message;
						}

					}, reject =>{
						this.list=[
							{src:'https://img.alicdn.com/bao/uploaded/i2/TB16u3uFeuSBuNjSszi3Azq8pXa_101135.jpg_80x80.jpg',w:600, h:400},
							{src:'https://img.alicdn.com/bao/uploaded/i2/TB16u3uFeuSBuNjSszi3Azq8pXa_101135.jpg_80x80.jpg',w:600, h:400},
							{src:'https://img.alicdn.com/bao/uploaded/i2/TB16u3uFeuSBuNjSszi3Azq8pXa_101135.jpg_80x80.jpg',w:600, h:400},
							{src:'https://img.alicdn.com/bao/uploaded/i2/TB16u3uFeuSBuNjSszi3Azq8pXa_101135.jpg_80x80.jpg',w:600, h:400},
						]
					})
				}
			},
			components:{
				'comment-box':comment,
				'title-box':topTitle
			}
		}
</script>

<style lang="scss" scoped>
.content {
    font-size: 13px;
    line-height: 20px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
</style>