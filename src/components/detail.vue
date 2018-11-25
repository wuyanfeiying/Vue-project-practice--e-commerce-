<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer
                                    v-if = "images.normal_size.length != 0"
                                    :base-images="images"
                                    :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num1" :min="1" :max="goodsinfo.stock_quantity" label="购物车计数器"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="$store.commit('increment')" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">                           
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <!-- 渲染为html结构 -->
                            <div class="tab-content entry" v-show="tabIndex==0" v-html="goodsinfo.content"></div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 总评论数为0,说明没有人评论 -->
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <!-- 评论内容 -->
                                        <li v-for="(item) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | handleTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用 iView 的Page 分页 -->
                                        <!-- on-page-size-change:切换每页条数时的回调，返回切换后的每页条数  -->
                                        <Page show-elevator @on-page-size-change="sizeChange" @on-change="pageChange" :total="totalcount" :current="pageIndex" show-sizer placement="top" :page-size-opts="[5,10,15,20]" :page-size="pageSize"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotgoodslist" :key="item.id" >
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>                                                
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | handleTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- 返回顶部按钮 -->
        <BackTop></BackTop>
    </div>
</template>
<script>
// 导入路由 axios
// import axios from 'axios';
// import moment from 'moment';

    export default {
        name:"detail",
        data:function(){
            return {
                artID:"",//点击商品时候的ID
                goodsinfo:{},//商品详情
                hotgoodslist:[],//热卖商品
                imglist:[],//图片列表
                num1: 1,//购买数量
                tabIndex:0,//记录切换tab栏的索引值
                pageIndex:1,//页码
                pageSize:10,//页容量
                comments:[],//评论内容
                totalcount:0,//总评论数
                comment:"",//评论内容
                images: { //放大镜数据(图片)                                                            
                    normal_size: []                                               
                }, 
                zoomerOptions: { //放大镜设置(放大效果)
                    'zoomFactor': 4,
                    'pane': 'container-round',
                    'hoverDelay': 300,
                    'namespace': 'inline-zoomer',
                    'move_by_click':true,
                    'scroll_items': 5,
                    'choosed_thumb_border_color': "#bbdefb"
                }
   
            }
        },
        methods: {
            //初始化数据
            initDate(){            
                this.num1 = 1;//初始化购买个数
                this.artID = this.$route.params.artID;//保存用户点击的那个ID
                //根据ID调用接口
                this.$axios
                    .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`)
                    .then((result)=>{
                        // console.log(result);
                        this.goodsinfo = result.data.message.goodsinfo;//商品详情
                        this.hotgoodslist = result.data.message.hotgoodslist;//热卖商品
                        this.imglist = result.data.message.imglist;//图片列表

                        //商品放大镜效果
                        this.images.normal_size = []; //先变成一个空数组
                        //循环图片列表(数组),向放大镜插件里面的normal_size添加图片数据
                        this.imglist.forEach(v => {
                            this.images.normal_size.push({
                                id: v.id,
                                url: v.original_path
                            })
                        })

                    });
                //调用获取评论信息
                this.getComments();
            },
            //获取评论信息
            getComments(){                
                this.$axios
                    .get(`site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then((result)=>{
                        // console.log(result);
                        //评论内容
                        this.comments = result.data.message;
                        //总评论数
                        this.totalcount = result.data.totalcount;
                    });
            },
            //页码改变的回调函数
            pageChange(pageIndex){
                // console.log(pageIndex);//接受返回的用户点击的页码数
                this.pageIndex = pageIndex;
                this.getComments();//重新获取这一页的数据
            },
            //页容量改变
            sizeChange(pageSize){
                //用户点击选择页容量的时候,把返回的改变的值,重新复制,并调用 获取评论函数
                this.pageSize = pageSize;
                this.getComments();
            },
            //提交评论事件
            submitComment(){
                // 评论内容为空,提示用户
                if(this.comment === ""){
                    this.$Message.warning('请输入评论内容再发布!');
                }else{
                    //有内容,发送请求
                    this.$axios.post(`site/validate/comment/post/goods/${this.artID}`,{
                        "commenttxt": this.comment
                    }).then(result => {
                        //根据返回的结果,判断是否发表成功
                        if(result.data.status ==0){
                            //提示用户
                            this.$Message.success('发表成功');
                            //清空评论
                            this.comment = "";
                            //发表评论后,初始化页面评论为1
                            this.pageIndex =1;
                            //重新获取评论
                            this.getComments();
                        }else{
                            //提示用户发表评论失败
                            this.$Message.error('发表失败');
                        }
                    })
                }
            }
        },
        // 生命周期函数
        created() {
            this.initDate();
            //创建实例的时候,让页面到顶部
            window.scrollTo(0,0);
            
        }, 
        //侦听器 
        watch:{
            $route(){
                // 点击新的页面的时候,图片不会变,通过监听 图片数组,让图片重新加载
                this.images.normal_size = [];
                this.initDate();
                this.pageIndex = 1;             
            }            
        }       
        // 过滤器
        // filters: {
        //     handleTime: function(value) {
        //     var time = moment(value).format('YYYY年MM月DD日'); // 使用第三方插件,截取日期
        //     return time;
        //     }
        // }
    }
</script>
<style>
    .inline-zoomer-zoomer-box img{
        width: 320px;
        height: 320px;
    }
    .thumb-list img{
        width: 100px;
        height: 100px;
    }
</style>