<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
      </p>
    </div>
    <div id="feedback_details" class="contentcss">
        <h3>查看咨询订单详情</h3>
        <div class="clearfix">
        <div class="left details_left">
            <p v-if="order.orderCreateTime != null">
                <span>咨询时间</span>
                <span>{{order.orderCreateTime}}</span>
            </p>
            <p v-if="order.orderPayTime!=null">
                <span>支付时间</span>
                <span>{{order.orderPayTime}}</span>
            </p>
            <p v-if="order.orderConfirmTime!=null">
                <span>确认时间</span>
                <span>{{order.orderConfirmTime}}</span>
            </p>
            <p v-if="order.commentDetailsReq!=null">
                <span>评价时间</span>
                <span>{{order.commentDetailsReq.commentCreateTime}}</span>
            </p>
        </div>
        <div class="left details_right">
        <p>
            <span>订单编号:</span>
            <span>{{order.orderNum}}</span>
        </p>
        <p>
            <span>订单状态:</span>
            <span v-if="order.orderStatus==0"></span>
            <span v-if="order.orderStatus==1">已咨询</span>
            <span v-if="order.orderStatus==2">待付款</span>
            <span v-if="order.orderStatus==3">待确认</span>
            <span v-if="order.orderStatus==4">交易完成</span>
            <span v-if="order.orderStatus==5">交易失败</span>
        </p>
        <p>
            <span>所在区域:</span>
            <span>{{order.orderCityNameFirst}}  {{order.orderCityNameSecond}}</span>
        </p>
        <p>
            <span>客户:</span>
            <span>{{order.loanUserName}} {{order.loanUserPhone}}</span>
        </p>
        <p>
            <span>贷款客户来源渠道:</span>
            <span>{{order.userSourceChannelName}}</span>
        </p>
        <p>
            <span>信贷员注册渠道:</span>
            <span>{{order.officerRegisterChannelName}}</span>
        </p>
        <p v-if="order.orderStatus != 1">
            <span>申请贷款金额:</span>
            <span>{{order.customerLoanAmountAsFormat}}万元</span>
        </p>
        <p v-if="order.orderStatus != 1">
            <span>服务费:</span>
            <span>{{order.serviceCostAsFormat}}元</span>
        </p>
        <p v-if="order.orderStatus != 1">
            <span>实际放款金额:</span>
            <span>{{order.customerActualLoanAmount}}万元</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>{{order.officerName}} {{order.officerPhone}}</span>
        </p>
        <p>
            <span>信贷员身份:</span>
            <span>{{order.vipStatusName}}</span>
        </p>
        <p v-if="order.leaveMessageResList" 
            v-for="item in order.leaveMessageResList" :key="item.leaveMessageCode">
            <span>留言:</span>
            <span >【{{item.leaveMessageTime}}】</span>
            <span >{{item.leaveMessage}}</span>
        </p>
        <p v-if="order.complainMessage && order.complainTime">
            <span>申诉人:</span>
            <span>{{order.complainMan}}</span>
        </p>
        <p v-if="order.complainMessage && order.complainTime">
            <span>申诉时间:</span>
            <span>{{order.complainTime}}</span>
        </p>
        <p v-if="order.complainMessage && order.complainTime">
            <span>申诉内容:</span>
            <span>{{order.complainMessage}}</span>
        </p>
        <p v-if="order.orderCloseMessage && order.orderCloseTime">
            <span>申请关闭人:</span>
            <span>{{order.orderCloseMan}}</span>
        </p>
        <p v-if="order.orderCloseMessage && order.orderCloseTime">
            <span>申请关闭时间:</span>
            <span>{{order.orderCloseTime}}</span>
        </p>
        <p v-if="order.orderCloseMessage && order.orderCloseTime">
            <span>申请关闭原因:</span>
            <span>{{order.orderCloseMessage}}</span>
        </p>
        <p v-if="order.commentDetailsReq!=null">
            <span>评价状态:</span>
            <span v-if="order.commentDetailsReq.isPass == 0">待审核</span>
            <span v-else-if="order.commentDetailsReq.isPass == 1">审核通过</span>
            <span v-else-if="order.commentDetailsReq.isPass == 2">审核未通过</span>
        </p>
        <p v-if="order.commentDetailsReq != null">
            <span>评价内容:</span> 
            <Icon  v-for="item in img" type="ios-star" class="yellow1 " :key="item.length"></Icon>
            <p v-if="order.commentDetailsReq!=null" class="ml100" >
                <span v-for="item in order.commentDetailsReq.tagsCodeList" class="evaluation_grade " :key="item.length">{{item}}</span>
            </p>
            <p v-if="order.commentDetailsReq != null" class="ml100">{{order.commentDetailsReq.content}}
        </p>
        <!-- 退单内容 -->
        <div v-if="order.chargebackOrderRes != null">
            <p style="font-weight: bold;">退单申请</p>
            <p>
                <span>退单申请人：</span>
                <span>{{order.chargebackOrderRes.applyForPerson}}</span>
            </p>
            <p>
                <span>退单申请时间：</span>
                <span>{{order.chargebackOrderRes.chargebackTime }}</span>
            </p>
            <p>
                <span>退单备注：</span>
                <span>{{order.chargebackOrderRes.auditRemark}}</span>
            </p>
            <p>
                <span>退单金额：</span>
                <span>{{order.chargebackOrderRes.chargebackMoney}}</span>
                <input type="text" disabled style="background-color: #fff;" v-model="order.chargebackOrderRes.chargebackType == 0 ? '赞豆' : '张券' ">
            </p>
            <p style="font-weight: bold;">审核意见</p>
            <p>
                <span>退单状态：</span>
                <span>{{order.chargebackOrderRes.auditStatusName}}</span>
            </p>
            <p style="display:inline-block;width:800px;">
                <span v-if="order.chargebackOrderRes.auditNum != 0">审核备注：</span>
                <span>{{order.chargebackOrderRes.chargebackRemark}}</span>
            </p>
            <p v-if="order.chargebackOrderRes.auditStatus != 0">
                <span>退单审核人：</span>
                <span>{{order.chargebackOrderRes.chargebackAuditPerson}}</span>
            </p>
            <p v-if="order.chargebackOrderRes.auditStatus != 0">
                <span>退单完成时间：</span>
                <span>{{order.chargebackOrderRes.chargebackCompleteTime}}</span>
            </p>
        </div>
        </div>
        </div>
        <div>
            <Button type="primary" @click="handleRender">查看操作日志</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" @click="backingout">返回</Button>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      order: {},
      img: []
    };
  },
  methods: {
    handleRender() {
      this.$router.push({
        path:
          "./operationLog?operationType=salesorder&saleOrderCode=" +
          this.$route.query.saleOrderCode
      });
    },
    // 返回
    backingout() {
        if (this.$route.query.num == 1) {
            this.$router.push({
                path:
                "./consultingSales?num=1"
            });
        } else {
            this.$router.push({
                path:
                "./consultingSalesperson?num=1"
            });
        }
        
    //   window.history.go(-1);
    }
  },
  mounted() {
    let list = {
      saleOrderCode: this.$route.query.saleOrderCode
    };
    this.http.post(BASE_URL + "/sale/saleOrder/getByCode", list)
      .then(data => {
        if (data.code == "success") {
          this.order = data.data;
          if (data.data.commentDetailsReq != null) {
            for (let i = 0; i < data.data.commentDetailsReq.stars; i++) {
              this.img.push(require("../../image/pointed-star.png"));
            }
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
#feedback_details {
  border: 1px solid #e7ecf1;
  padding: 30px 50px;
  h3 {
    line-height: 50px;
    border-bottom: 1px solid #e7ecf1;
    margin-bottom: 20px;
  }
  p {
    line-height: 40px;
    padding-left: 50px;
  }
  div {
    text-align: center;
    margin-top: 20px;
  }
}
.details_left {
  padding-top: 10px;
  p {
    color: #999;
    font-size: 12px;
    line-height: 20px !important;
  }
}
.details_right {
  p {
    text-align: left;
    span:first-child {
      width: 120px;
      display: inline-block;
      text-align: right;
    }
  }
}
.evaluation_grade {
  display: inline-block;
  border: 1px solid #ff6600;
  line-height: 30px;
  padding: 0px 20px;
  color: #ff6600;
  text-align: center !important;
}
</style>
