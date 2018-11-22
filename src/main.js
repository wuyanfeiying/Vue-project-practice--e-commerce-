import Vue from 'vue'
import App from './App.vue'
// 全局样式
import './assets/site/css/style.css'
// 导入每一页的组件
import index from './components/index.vue'

// 导入路由
import VueRouter from 'vue-router'
// 在模块化的开发环境下
Vue.use(VueRouter) 

Vue.config.productionTip = false

// 写路由规则
let routes  = [
  // 重定向到首页 /index
  {path:'/',redirect:'/index'},
  {path:'/index',component:index}
]


// 实例化路由对象
let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  // 传入路由对象
  router
}).$mount('#app')
