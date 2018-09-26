<template>
	<div>
		<ul class="mui-table-view">
	      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
	        <router-link :to="'/home/newsinfo/' + item.id">
	          <img class="mui-media-object mui-pull-left" :src="item.img_url">
	          <div class="mui-media-body">
	            <h1>{{ item.title }}</h1>
	            <p class='mui-ellipsis'>
	              <span>发表时间：{{ item.add_time | dateFormat }}</span>
	              <span>点击：{{item.click}}次</span>
	            </p>
	          </div>
	        </router-link>
	      </li>
    	</ul>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		data(){
			return {
				newslist:[]
			}
		},
		created(){
			this.getNewsList()
		},
		methods:{
			getNewsList(){
				this.newslist.push(
					{id:1, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/shuijiao.jpg', title:'随便', add_time:'2018-08-08', click:'2'},
					{id:2, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/shuijiao.jpg', title:'随便2',add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
					{id:3, img_url: 'http://img.cdn.qiniu.dcloud.net.cn/muwu.jpg', title:'随便3', add_time:'2018-08-08', click:'2'},
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view{
		li{
			h1{
				font-size: 14px;
			}
			.mui-ellipsis{
				font-size: 12px;
		      	color: #226aff;
	      		display: flex;
		      	justify-content: space-between;
			}
			img{width:50px}
		}
	}
</style>