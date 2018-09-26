<template>
	<mt-swipe :auto="4000">
	      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
	      <mt-swipe-item v-for="item in lunbotuList" :key="item.img_url">
	        <img :src="item.img_url" :class="{'full': isfull }">
	      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
	export default{
		props:['lunbotuList','isfull']
	}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
  	text-align:center;
    img {
      //width: 100%;
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>