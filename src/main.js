import Vue from 'vue'
import App from './App.vue'
// 全局样式
import './assets/site/css/style.css'

// 导入每一页的组件
import index from './components/index.vue'
import detail from './components/detail.vue'

// 导入moment插件
import moment from 'moment'
// 导入路由
import VueRouter from 'vue-router'
//导入 axios
import axios from 'axios'
//导入iview UI框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 导入element-ui,轮播图插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//设置到原型上的属性Vue中,建议使用$作为前缀,用来区分普通的属性
Vue.prototype.$axios = axios;

//抽取基础地址
axios.defaults.baseURL = `http://111.230.232.110:8899/`;

// 在模块化的开发环境下
Vue.use(VueRouter) ;

Vue.config.productionTip = false

// 写路由规则
let routes  = [
  // 重定向到首页 /index
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},
  // 使用动态路由匹配 传递参数
  {path:'/detail/:artID',component:detail},
]


// 实例化路由对象
let router = new VueRouter({
  routes
});

// 注册全局过滤器
Vue.filter('handleTime',(value)=> {
  var time = moment(value).format('YYYY年MM月DD日'); // 使用第三方插件,截取日期
    return time;
  }
);
Vue.filter('handleTimePlus',(value)=> {
  var time = moment(value).format('YYYY年MM月DD日 HH:mm:ss'); // 使用第三方插件,截取日期
    return time;
  }
);

new Vue({
  render: h => h(App),
  // 传入路由对象
  router
}).$mount('#app')
