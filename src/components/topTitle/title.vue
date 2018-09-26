<template>
	<div class="newsinfo-container">
		<h3 class="title">{{ this.title}}</h3>
			<p class="subtitle">
				<span>发表时间：{{ this.add_time | dateFormat }}</span>
	      		<span>点击：{{ this.click }}次</span>
			</p>
		<hr>
	</div>
</template>

<script>
	export default{
		props:['title', 'add_time', 'click'],
		data(){
			return {

			}
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.newsinfo-container {
  	padding: 3px;
	  .title {
	    font-size: 15px;
	    text-align: center;
	    margin: 15px 0;
	    color: #26a2ff;
  	}
  	.subtitle {
	    font-size: 12px;
	    color: #226aff;
	    display: flex;
	    justify-content: space-between;
	  }
	}
</style>