<template>
<div class="pay">
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="javascript:;">支付中心</a>
        </div>
    </div>
    <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area+ ',' + orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                    <qrcode :value="`http://111.230.232.110:8899/site/validate/pay/alipay/${orderId}`" :options="{ size: 200 }"></qrcode>
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
    import VueQrcode from '@xkeshi/vue-qrcode';
    export default {
        name:"pay",
        data:function(){
            return {
                orderId: 0,//购物车页面跳转到支付页面带过来的ID
                orderInfo:{},//订单信息
                interId:0,//定时器
            }
        },
        //生命周期函数(被创建)
        created(){
            // console.log(this.$route);
            this.orderId = this.$route.params.orderId;
            //发送请求,根据订单ID获取订单信息
            this.$axios.get(`site/validate/order/getorder/${this.orderId}`).then(result=>{
            // console.log(result);
            this.orderInfo = result.data.message[0];
            });

            //开启定时器,每隔两秒间隔询问服务器订单的状态
            this.interId=setInterval(()=>{
                //发送请求,根据订单ID获取订单信息
                this.$axios.get(`site/validate/order/getorder/${this.orderId}`).then(result=>{
                    if (result.data.message[0].status === 2) {
                        //已经支付成功
                        //提示用户
                        this.$Message.success("恭喜你,支付成功!");        
                        //跳转到支付页面
                        this.$router.push('/paySuccess');
                    }
                });
            },2000)
        },
        //声明周期函数(被销毁)
        destroyed(){
            clearInterval(this.interId);
        },
        //二维码插件的局部注册
        components:{
            //ES6动态生成属性名
            [VueQrcode.name]: VueQrcode,
        }
    }
</script>
<style>

</style>
