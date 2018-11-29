<template>
    <div class="order">
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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <!-- 收货地址 -->
                            <div class="form-box address-info">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名" prop="accpet_name">
                                        <el-input v-model="ruleForm.accpet_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区"  prop="area" >
                                        <VDistpicker
                                        @selected="selectedArea"
                                        :province="ruleForm.area.province.value"
                                        :city="ruleForm.area.city.value"
                                        :area="ruleForm.area.area.value"
                                        ></VDistpicker> 
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="ruleForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱地址" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="ruleForm.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 支付方式 -->
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <!-- <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1"> -->
                                        <!-- <input name="payment_price" type="hidden" value="0.00">在线支付 -->
                                        <el-radio v-model="ruleForm.payment_id" :label="6">在线支付</el-radio>
                                        &nbsp;&nbsp;                                        
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <!-- <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em> -->
                                        <el-radio @change="ruleForm.expressMoment=20" v-model="ruleForm.express_id" label="1">顺丰快递</el-radio>
                                        &nbsp;&nbsp; 
                                        <em>费用：20.00元</em>
                                        &nbsp;&nbsp; 
                                        <el-radio @change="ruleForm.expressMoment=15" v-model="ruleForm.express_id" label="2">圆通快递</el-radio>
                                        &nbsp;&nbsp; 
                                        <em>费用：15.00元</em>
                                        &nbsp;&nbsp; 
                                        <el-radio @change="ruleForm.expressMoment=10" v-model="ruleForm.express_id" label="3">韵达快递</el-radio>
                                        &nbsp;&nbsp; 
                                        <em>费用：10.00元</em>
                                        <span class="Validform_checktip"></span>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <!-- 商品数据 -->
                                    <tr v-for="(item) in goodsList" :key="item.id">
                                        <td width="68">
                                            <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                            <router-link :to="'/detail/'+item.id">
                                                 <img :src="item.img_url" class="img">
                                            </router-link>                                                
                                            <!-- </a> -->
                                        </td>
                                        <td>
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>  
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                        <router-link class="btn button"  to="/shopCart">返回购物车</router-link>
                                        <a @click="submit('ruleForm')" id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 导入省市联动局部组件
    import VDistpicker from 'v-distpicker'

    export default {
        name: "order",
        data:function(){
            //自定义校验规则函数,会被 elements-ui框架 调用
            // 手机
            var validatePass = (rule, value, callback) => {
                // console.log(value);
                //空值判断
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } 
                else {
                    //非空格式验证
                    // 手机号的正则表达式
                    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                    //利用正则表达式判断规则
                    if (reg.test(value)===true) {
                        //手机号格式正确
                        callback();
                    } else {
                        //手机号格式不对
                        callback(new Error('手机号格式不对'));
                    }                    
                }
            };
            // 电子邮箱
            var validateEmail = (rule, value, callback) => {
                // console.log(value);
                //空值判断
                if (value === '') {
                    callback(new Error('请输入邮箱地址'));
                } 
                else {
                    //非空格式验证
                    // 邮箱的正则表达式
                    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    //利用正则表达式判断规则
                    if (reg.test(value)===true) {
                        //邮箱格式正确
                        callback();
                    } else {
                        //邮箱格式不对
                        callback(new Error('邮箱地址格式不对'));
                    }                    
                }
            };
            // 邮政编码
            var validatePostCode = (rule, value, callback) => {
                // console.log(value);
                //空值判断
                if (value === '') {
                    callback(new Error('请输入邮政编码'));
                } 
                else {
                    //非空格式验证
                    // 邮政编码的正则表达式
                    let reg = /^[1-9]\d{5}(?!\d)$/;
                    //利用正则表达式判断规则
                    if (reg.test(value)===true) {
                        //邮政编码格式正确
                        callback();
                    } else {
                        //邮政编码格式不对
                        callback(new Error('邮政编码格式不对'));
                    }                    
                }
            };
            return {
                ids:"",//商品ID
                goodsList:[],//商品列表
                totalCount:0,//购买个数
                totalPrice:0,//商品总金额(不包含运费)
                //表单属性名
                ruleForm:{                    
                    accpet_name:"小红豆",// 收货人姓名
                    address:"广东省深圳市宝安区红豆村",// 详细地址
                    mobile:"18282828282",// 手机号码
                    email:"xiaohongdou@qq.com",// 邮箱地址
                    post_code:"272100",// 邮政编码
                    //所属地区
                    area:{
                        // 一打开页面默认显示的
                        province:{code:370004,value:"山东省"},
                        city:{code:370800,value:"济宁市"},
                        area:{code:370811,value:"任城区",}
                    },
                    payment_id: 6,//在线支付
                    express_id: "1",//配送方式
                    expressMoment: 20,//运费
                    message:"发货快点哦~",//备注消息
                },
                //验证规则
                rules:{
                    accpet_name:[
                        //required 必填 message 信息 trigger 触发时机
                        { required: true, message: '请输入收货人姓名', trigger: 'change' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
                    ],
                    address:[
                        //required 必填 message 信息 trigger 触发时机
                        { required: true, message: '请输入收货地址', trigger: 'change' },
                        { min: 3, message: '写的太短啦~', trigger: 'change' }
                    ],
                    mobile:[
                        //手机号码的验证规则
                        { validator: validatePass, trigger: 'change' }
                    ],
                    email:[
                        //邮箱的验证规则
                        { validator: validateEmail, trigger: 'change' }
                    ],
                    post_code:[
                        //邮政编码的验证规则
                        { validator: validatePostCode, trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            selectedArea(newArea){
                // console.log(newArea);
                this.ruleForm.area = newArea;
            },
            //确认提交订单按钮
            submit(formName){
                //提交数据之前,会对数据进行一次验证
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        //准备数据(少的那三个现在写出来)
                        this.ruleForm.goodsAmount = this.totalCount;//购买商品总数
                        this.ruleForm.goodsids = this.ids;//购买商品的id们
                        let obj = {};//{id:个数}
                        this.goodsList.forEach(v=>{
                            obj[v.id] = v.buycount;
                        });
                        this.ruleForm.cargoodsobj = obj;//购买商品对象
                        //发送请求
                        this.$axios.post("site/validate/order/setorder",this.ruleForm).then(result=>{
                            // console.log(result);
                            this.$Message.success("提交订单成功!");
                            //跳转路由
                            this.$router.push('/pay');
                        });
                    } else {
                        // console.log('error submit!!');
                        this.$Message.warning("数据填写错误,请检查!");
                        return false;
                    }
                });

            }
        },
        //获取传递过来id,调用接口
        created(){
            //$route和$router的区别
            // console.log(this.$route);//路由跳转,携带的信息
            // console.log(this.$router);//路由对象,可以用来跳转页面
            this.ids = this.$route.params.ids;
            //调用接口
            this.$axios.get(`site/validate/order/getgoodslist/${this.ids}`).then(result=>{
                // console.log(result);
                this.goodsList = result.data.message;
                //动态修改 buycount 值
                result.data.message.forEach(element => {
                    //通过Vuex获取购买数量
                    element.buycount = this.$store.state.cartData[element.id];
                    //购买个数累加
                    this.totalCount += element.buycount;
                    //商品总金额(不包含运费)的计算
                    this.totalPrice += (element.buycount*element.sell_price);
                });
                // console.log(this.goodsList);                
                // console.log(result);
            })
        },
        //注册省市联动局部组件
        components: { VDistpicker }
    }
</script>
<style>
    
</style>