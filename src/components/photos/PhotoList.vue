<template>
	<div>

		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id===0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
			</div>

			<ul class="photo-list">
				<router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo/'+ item.id">
					<img v-lazy="item.img_url">
					<div class="info">
						<h3 class="info-title">{{item.title}}</h3>
						<div class="info-body">{{item.zhaiyao}}</div>
					</div>
				</router-link>	
			</ul>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.min.js";

	export default{
			data(){
				return {
					cates:[],
					list:[]
				}
			},
			created(){
				this.getAllCategory()
				this.getPhotoListByCateId(0);
			},
			mounted(){
				console.log("a");
				mui(".mui-scroll-wrapper").scroll({
		      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		    });
			},
			methods:{
				getAllCategory(){
					this.$http.get('api/getimagefefs').then( result => {
							if (result.body.status === 0) {
								result.body.message.unshift({title:'全部', id:0})
								this.cates= result.body.message
							}
					}, reject =>{
								this.cates.push(
									{
										id:0,
										title:'全部'
									},{
										id:1,
										title:'随便'
									},{
										id:2,
										title:'咖喱'
									},{
										id:3,
										title:'白饭'
									},{
										id:4,
										title:'吃货'
									},{
										id:5,
										title:'技术'
									})
					});
				},

				getPhotoListByCateId(cateId){
					this.$http.get('api/getimages/'+cateId).then(result =>{
						if (result.body.status === 0) {
							this.list=result.body.message
						}
					}, reject => {
						this.list=[
								{
									id:0,
									title:'随便',
									zhaiyao:'这是一个神奇的。。。就这样吧',
									img_url:'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'
								},{
									id:1,
									title:'随便',
									zhaiyao:'这是一个神奇的。。。就这样吧',
									img_url:'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg'
								},{
									id:2,
									title:'随便',
									zhaiyao:'这是一个神奇的。。。就这样吧',
									img_url:'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg'
								},
								{
									id:2,
									title:'随便',
									zhaiyao:'这是一个神奇的。。。就这样吧',
									img_url:'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg'
								},
								{
									id:2,
									title:'随便',
									zhaiyao:'这是一个神奇的。。。就这样吧',
									img_url:'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg'
								}]
					})
				}
			}
		}
</script>

<style lang="scss" scoped>
	* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      width:100%;		
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>