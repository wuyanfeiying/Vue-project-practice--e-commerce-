<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong>
                                                还有<span class="second">{{second}}<i class="secondUnit">S</i></span>跳转至首页
                                                <p>您可以点击这里进入
                                                    <!-- <a href="/user/center/index.html">会员中心</a> -->
                                                    <router-link to="/vipCenter">会员中心</router-link>
                                                    查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
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
    export default{
        name:"paySuccess",
        data: function(){
            return {
               second:5, //倒计时秒数
               interId:0,//定时器id
            }
        },
        created() {
            // 开启定时器
            this.interId = setInterval(()=>{
                this.second --;
                if (this.second ===0) {
                    //倒计时结束,发生跳转
                    this.$router.push('/index')
                }
            },1000)
        },
        destroyed(){
            clearInterval(this.interId);//清除定时器
        }
    }
</script>
<style>
.second,.secondUnit{
    font-size: 18px;
    font-weight: 700;
    color: rgb(233, 12, 12);
}
</style>
