<template>

    <div class="login">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model.trim="user_name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input v-model.trim="password" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="login" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:"login",
        data:function(){
            return {
                user_name:"",//用户名
                password:"",//密码
            }
        },
        methods:{
            //登录事件
            login(){
                if (this.user_name == '' || this.password =='') {
                    this.$Message.warning("内容不能为空")
                } else {
                    //调用接口
                    this.$axios.post('site/account/login',{
                        user_name: this.user_name,
                        password: this.password
                    }).then(result=>{
                        // console.log(result)
                        if (result.data.status ===0) {
                            //登录成功
                            this.$Message.success("登录成功")
                            //向仓库,提交载荷
                            this.$store.commit('changeLogin',true);
                            //跳转(路由)
                             this.$router.go(-1);
                        } else {
                            //登录失败
                            this.$Message.error("内容不能为空")
                        }
                    })

                }
            }
        }
    }
</script>
<style>
    
</style>
