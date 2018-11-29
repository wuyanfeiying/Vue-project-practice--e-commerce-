<template>
    <div class="shopCart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 有数据的提示内容 -->
                                <tr v-for="(item) in goodsList" :key="item.id">
                                    <td>
                                        <el-switch
                                        v-model="item.isSelected"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount" :min="0"></el-input-number>
                                    </td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td>           
                                        <!-- 删除按钮 -->
                                        <el-button @click="deleteOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <!-- 没有数据的提示内容 -->
                                <tr v-show="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <router-link :to="'/order/'+selectIds">
                            <button class="submit">立即结算</button>
                            </router-link>                            
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "shopCart",
        data: function(){
            return {
                goodsList: [],//购物车商品数据
            }
        },
        methods:{
            //点击按钮,删除商品事件
            deleteOne(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.goodsList.forEach((v,index)=>{
                        if (v.id === id) {
                            this.goodsList.splice(index,1)
                        }
                    })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            }
        },
        // 计算属性
        computed: {
            //选中商品的总数量
            selectedCount(){
                let num = 0;
                this.goodsList.forEach(v => {
                    // true,代表开关打开,也就是选中了
                    if (v.isSelected === true) {
                        // 购买数量累加
                        num += v.buycount;
                    }
                })
                return num;
            },
            //选中商品的总金额
            selectedPrice(){
                let price = 0;
                this.goodsList.forEach(v => {
                    // true,代表开关打开,也就是选中了
                    if (v.isSelected === true) {
                        // 价格计算(购买个数*商品单价)
                        price += (v.buycount*v.sell_price);
                    }
                })
                return price;
            },
            //选中商品的ID
            selectIds(){
                let ids = '';
                this.goodsList.forEach(v=>{
                    //判断用户选中的商品,并拼接起来
                    if (v.isSelected===true) {
                        ids+=v.id;
                        ids+=",";
                    }                     
                })
                //去掉最后一个的逗号
                ids = ids.slice(0,ids.length-1);
                //返回ids
                return ids;
            }
        },
        //声明周期函数
        created(){
            //根据接口文档,需要发送请求的时候,多个id
            let ids = '';
            //可以通过Vuex获取商品数据
            for (const key in this.$store.state.cartData) {
                ids += key;
                ids += ",";
            }
            //去掉最后一个逗号
            ids = ids.slice(0,ids.length-1);
            //调用接口
            this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(result=>{
                //服务器返回的数据,没有商品购买个数(文档里说明了 默认是0 buycount:0),所以要自己拼接
                // console.log(result);
                result.data.message.forEach(element => {
                    //根据商品ID,来找到商品的数量,赋值给buycount
                    element.buycount = this.$store.state.cartData[element.id];
                    //增加一个是否被选择的字段,好让switch开关判断,默认为 true
                    element.isSelected = true;
                });
                // console.log(result);
                //把返回的数据赋值给商品列表数组
                this.goodsList = result.data.message;
            })
        },
        //开始事件监听,观察数据的改变
        watch: {
            goodsList:{
                handler: function (val) { 
                    // console.log(val);
                    let obj = {};
                    val.forEach(v=>{
                        //动态的添加属性
                        obj[v.id] = v.buycount;
                    })
                    // console.log(obj);
                    // 同步修改Vuex中的数据
                    this.$store.commit('updateCartData',obj)
                 },
                deep: true
            }
        }
    };
</script>

<style>
    td img{
        width: 100px;
    }
    td:nth-child(2){
        display: flex;
        align-items: center;
    }
    td>span {
        margin-left: 10px;
    }
</style>
