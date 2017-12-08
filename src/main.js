import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
//1.把配置的路由导入
import router from './router'
import "./common/index.css"
//解决移动端300毫秒延迟
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//document下面的body上的300毫秒的延迟都不会出现了
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  loading: require('common/image/default.png')  //需要使用require引入
})


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,//2。传入到实例中  3.渲染道这个实例的router-view里面
  render: h => h(App)
})
