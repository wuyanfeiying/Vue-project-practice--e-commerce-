import Vue from 'vue'
import App from './App.vue'
// 全局样式
import './assets/site/css/style.css'

// 导入每一页的组件
import index from './components/index.vue'
import detail from './components/detail.vue'
import shopCart from './components/shopCart.vue'
import order from './components/order.vue'
import login from './components/login.vue'
import pay from './components/pay.vue'
import paySuccess from './components/paySuccess.vue'
import vipCenter from './components/vipCenter.vue'
import orderList from './components/orderList.vue'
import orderDetail from './components/orderDetail.vue'
import orderIndex from './components/orderIndex.vue'

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
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {90:0},
    //是否登录的字段
    isLogin: false,  
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
      
    },
    //增加一个修改数据的方法
    updateCartData(state,obj){
      // console.log(obj);
      state.cartData = obj;
    },
    //删除某一条数据的方法
    delGoodsById(state,id){
      Vue.delete(state.cartData,id)
    },
    //登录状态改变的方法
    changeLogin(state,isLogin){
      state.isLogin = isLogin;
    }
  }
})

//设置到原型上的属性Vue中,建议使用$作为前缀,用来区分普通的属性
Vue.prototype.$axios = axios;

axios.defaults.withCredentials = true;//让ajax携带cookie

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
  //购物车页面
  {path:'/shopCart',component:shopCart},
  //订单页面
  {
    path:'/order/:ids',
    component:order,
    //路由元信息
    meta:{
      checkLogin:true
    }
  },
  //登录页面
  {path:'/login',component:login},
  //支付订单详情页面
  {
    path:'/pay/:orderId',
    component:pay,
    //路由元信息
    meta:{
      checkLogin:true
    }
  },
  //支付成功页面
  {
    path:'/paySuccess',
    component:paySuccess,
    //路由元信息
    meta:{
      checkLogin:true
    }
  },
  //会员中心页面
  {
    path:'/vipCenter',
    component:vipCenter,
    //路由元信息
    meta:{
      checkLogin:true
    },
    //嵌套路由
    children:[
      {
        path:'',
        redirect: "orderIndex"
      },
      {
        path:'orderIndex',
        component:orderIndex,
      },
      {
        path:'orderList',
        component:orderList,
      },
      {
        path:'orderDetail',
        component:orderDetail,
      }
    ]
  },
]


// 实例化路由对象
let router = new VueRouter({
  routes
});
//增加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(from);
  // console.log(to);
  // 判断要去的路径是不是 order(订单页)
  // if (to.path.indexOf("/order") != -1) {
  
  //使用路由元信息,对需要登录判断的路由组件进行修饰,如果有这个字段,就需要登录,没有,直接放行
  if (to.meta.checkLogin === true) {
    //发送请求
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      //用户没有登录
      if (result.data.code === "nologin") {
        //提示消息
        Vue.prototype.$Message.warning("请先去登录");
        //跳转(路由)
        router.push('./login');
        //让页面回到顶部
        window.scrollTo(0,0);
      }else{
        // 用户登录成功
        next();        
      }
    })
  } else {
    //登录了,就往下执行
    next();
  }
  // console.log("守卫开始了");
  // next();//如果不next(),则不会执行,不会路由跳转
  
})

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
  store,
  created() {
        //发送请求
        axios.get("site/account/islogin").then(result => {
          // console.log(result);
          //用户没有登录
          if (result.data.code === "nologin") {
            //提示消息
            Vue.prototype.$Message.warning("请先去登录");
            //跳转(路由)
            router.push('./login');
            //让页面回到顶部
            window.scrollTo(0,0);
          }else{
            // 用户登录成功
            store.state.isLogin = true;
            // next();        
          }
        })
  },
}).$mount('#app')
