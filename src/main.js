import Vue from "vue"
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car=JSON.parse(localStorage.getItem('car')||'[]')

var store=new Vuex.Store({
	state:{
		car:car
	},

	mutations:{
		addToCar(state, goodsinfo){
			var flag=false

			state.car.some( item => {
				if (item.id === goodsinfo.id ) {
					item.count+= goodsinfo.count
					flag=true
					return true
				}
			})
			if (!flag) {
				state.car.push(goodsinfo)
			}
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			state.car.some( item => {
				if (item.id === goodsinfo.id) {
					item.count=parseInt(goodsinfo.count)
					return true
				}
			})
			// 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      		localStorage.setItem('car', JSON.stringify(state.car))
		},
		removeFormCar(state,id){
			state.car.some( (item, i) => {
				if (item.id === id) {
					state.car.splice(i ,1)
					return true
				}
			})
			// 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      		localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state,goodsinfo ){
			state.car.some(item => {
				if (item.id === goodsinfo.id) {
					item.selected=goodsinfo.selected
				}
			})// 把最新的 所有购物车商品的状态保存到 store 中去
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},

	getters:{
		getAllCount(state){
			var c=0;
			state.car.forEach(item =>{
				c+= item.count
			});
			return c
		},
		getGoodsCount(state){
			var o={}
			state.car.forEach( item => {
				o[item.id]= item.count;
			})
			return o
		},
		getGoodsSelected(state){
			var o={}
			state.car.forEach( item =>{
				o[item.id]=item.selected
			})
			return o;
		},
		getGoodsCountAndAmount(state){
			var o={
				count: 0, // 勾选的数量
        		amount: 0 // 勾选的总价
			}
			state.car.forEach( item =>{
				if (item.selected) {
					o.amount+=item.price*item.count
					o.count+=item.count
				}
			})
			return o;
		}
	}
})

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
Vue.http.options.root='http://vue.studyit.io'
Vue.http.options.emulateJSON=true

//格式化时间插件
import moment from 'moment'
Vue.filter('dateFormat',function (date, pattern= 'YYYY-MM-DD HH:mm:ss') {
	return moment(date).format(pattern);
});

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 按需导入 Mint-UI 中的组件   
import { Header, Swipe, SwipeItem, Button, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
// 图片懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

// 路由模块
import router from './router.js'
// vuex
//import store from './vuex.js'
// 根组件
import app from './App.vue'

var vm = new Vue({
	el: "#app",
	render: c => c(app),
	router,
	store
})