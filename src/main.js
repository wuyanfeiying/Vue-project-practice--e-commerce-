import Vue from 'vue'
import App from './App.vue'
// 全局样式
import './assets/site/css/style.css'

// 导入每一页的组件
import index from './components/index.vue'
import detail from './components/detail.vue'
import shopCart from './components/shopCart.vue'

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
// 导入商品放大镜🔍
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

//Vuex的使用
import Vuex from 'vuex';
Vue.use(Vuex);

// 实例化仓库对象
const store = new Vuex.Store({
  //状态
  state: {
    // count: 0
    //购物车数据对象(主要的作用就是根据ID来让后面的代码获取购物车的点击数量)
    //Vuex数据常驻,短路运算
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {90:0}
  
  },
  //Vuex的计算属性
  getters: {
    totalCount(state){
      //通过state获取内部的数据,并返回
      // return 998;

      let num =0;
      for (const key in state.cartData) {    
        //循环累加
        num += state.cartData[key];      
      }
      return num;
    }
  },
  //数据改变的方法
  mutations: {

    //向购物车添加数据的方法
    addTocart(state,obj){

      //商品已经存在
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum;
      } else {
        //商品不存在
        //使用 Vue.set才可以跟中数据改变
        Vue.set(state.cartData,obj.goodId,obj.goodNum);
      }
      
    }
  }
})

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
  {path:'/shopCart',component:shopCart},
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

//浏览器关闭,保存数据
window.onbeforeunload = function(){
  window.localStorage.setItem("hm24",JSON.stringify(store.state.cartData));
}

new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  //需要把store传递给Vue实例,这样在 子组件中才可以使用 $store
  store
}).$mount('#app')
