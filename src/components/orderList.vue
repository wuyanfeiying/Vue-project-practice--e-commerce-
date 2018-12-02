<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr v-for="(item) in orderList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left" class="accept_name">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>在线支付
              </td>
              <td align="left">{{item.add_time | handleTimePlus}}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left">                
                <router-link :to="'/vipCenter/orderDetail/'+item.id">查看订单</router-link>               
                <router-link v-show="item.status === 1"  :to="'/pay/'+item.id">
                去付款
                </router-link>            
                <!-- <a href="javascript:void(0)">取消</a>             -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
            <!-- 分页 -->
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageIndexChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                background
                >
            </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data: function() {
    return {
      pageIndex: 1, //页码
      pageSize: 10, //页容量
      orderList: [], //订单列表
      totalCount: 0 //总条数
    };
  },
  methods:{
      //页容量改变时触发的事件
      pageSizeChange(pageSize){
        //   console.log(pageSize);
          this.pageSize = pageSize;//保存数据
          this.pageIndex = 1;//当用户切换页容量的时候,页面变为第一页
          this.getOrderList();
      },
      //页码改变时触发的事件
      pageIndexChange(pageIndex){
        //   console.log(pageIndex);
          this.pageIndex = pageIndex;//保存数据
          this.getOrderList();
      },
      //获取订单数据的方法
      getOrderList(){
           this.$axios
      .get(
        `site/validate/order/userorderlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`
      )
      .then(result => {
        // console.log(result);
        this.orderList = result.data.message;
        this.totalCount = result.data.totalcount;
      });
      }
  },
  //声明周期函数
  created() {
      this.getOrderList();
  }
};
</script>
<style>
.accept_name {
  height: 81px;
}
td a {
    display: block;
}
td a:hover {
    color: rgb(38, 197, 78);
}
</style>

