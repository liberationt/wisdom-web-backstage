<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
      </p>
    </div>
    <div id="feedback_details" class="contentcss">
        <h3>查看抢单订单详情</h3>
        <div class="clearfix">
            <div class="left details_left">
            <p v-if="order.orderCreateTime!=null">
                <span>抢单时间</span>
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
            <span>抢单编号:</span>
            <span>{{order.orderNum}}</span>
        </p>
        <p>
            <span>订单类型: </span>
            <span>{{ order.goodStatusName}}</span>
        </p>
        <p>
            <span>支付方式: </span>
            <span >{{ order.payTypeName}}</span>
            
        </p>
        <p>
            <span>支付明细: </span>
            <span v-if="order.payType==1">{{ order.ticketNumber}}张{{order.ticketType}}</span>
            <span v-if="order.payType==0">
                <em v-if="order.payTypeDetail==0">{{order.activityAmount}}赞豆</em>
                <em v-if="order.payTypeDetail==1">充值赞豆{{order.rechargeAmount}}</em>
                <em v-if="order.payTypeDetail==2">赠送赞豆{{order.giveAmount}}</em>
                <em v-if="order.payTypeDetail==3">充值赞豆{{order.rechargeAmount}}&赠送赞豆{{order.giveAmount}}</em>
            </span>
        </p>
        <p>
            <span>抢单费用:</span>
            <span v-if="order.robbingAmount==order.activityAmount" >
                {{order.robbingAmount}}赞豆
                <em v-if="order.payType != 0">/{{order.ticketNumber}}张券</em>
                </span>
            <span v-if="order.robbingAmount!=order.activityAmount">
                <em class="gray">{{order.robbingAmount}}赞豆</em><em>/{{order.activityAmount}}赞豆</em>
                <em v-if="order.payType != 0">/{{order.ticketNumber}}张券</em>
                </span>
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
            <span>{{order.orderCityNameFirst}} {{order.orderCityNameSecond}}</span>
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
            <span>{{order.customerLoanAmount}}万元</span>
        </p>
        <p v-if="order.orderStatus != 1">
            <span>服务费:</span>
            <span>{{order.serviceCostAsFormat}}元</span>
        </p>
        <p v-if="order.orderStatus != 1">
            <span>实际放款金额:</span>
            <span>{{order.customerActualLoanAmount}}万元</span>
        </p>
        <p v-if="order.orderType == 2">
            <span>支付方式:</span>
            <span>{{order.payTypeName}}</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>{{order.officerName}} {{order.officerPhone}}</span>
        </p>
        <p>
            <span>信贷员身份 ：</span>
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

        <!-- 退单详情 -->
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
                <span>退单申请金额：</span>
                <span v-if="order.chargebackOrderRes.chargebackType==1">
                    {{order.chargebackOrderRes.chargebackTicketType }}抢单劵{{ order.chargebackOrderRes.chargebackMoney}}张
                    </span>
                <span v-if="order.chargebackOrderRes.chargebackType==0">
                    <em v-if="order.chargebackOrderRes.chargebackTypeDetail ==0">{{order.chargebackOrderRes.chargebackMoney}}赞豆</em>
                    <em v-if="order.chargebackOrderRes.chargebackTypeDetail ==1">充值赞豆{{order.chargebackOrderRes.rechargeAmount}}</em>
                    <em v-if="order.chargebackOrderRes.chargebackTypeDetail ==2">赠送赞豆{{order.chargebackOrderRes.giveAmount}}({{order.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                    <em v-if="order.chargebackOrderRes.chargebackTypeDetail ==3">充值赞豆{{order.chargebackOrderRes.rechargeAmount}}&赠送赞豆{{order.chargebackOrderRes.giveAmount}}({{order.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                </span>
                <!-- <input type="text" disabled style="background-color: #fff;" v-model="order.chargebackOrderRes.chargebackType == 0 ? '赞豆' : '张券' "> -->
            </p>
            <p>
                <span>退单方式: </span>
                <span>{{ order.chargebackOrderRes.chargebackTypeName}}</span>
            </p>
            <p>
                <span>图片: </span>
                <img v-for="item in chargebackApplyPicimg" class="mr10" :src="item" @click="bigimg(item)" alt="">
            </p>
            <p style="font-weight: bold;">审核意见</p>
              <p>
                <span>退单状态：</span>
                <span>{{order.chargebackOrderRes.auditStatusName}}</span>
            </p>
            <p v-if="order.chargebackOrderRes.auditNum != 0" style="display:inline-block;width:800px;">
                <span v-if="order.chargebackOrderRes.auditNum != 0">审核备注：</span>
                <span>{{order.chargebackOrderRes.chargebackRemark}}</span>
            </p>
            <p v-if="order.chargebackOrderRes.auditStatus == 1">
                <span>实际退单金额：</span>
                <span v-if="order.chargebackOrderRes.realChargebackType==1">{{order.chargebackOrderRes.realChargebackTicketType  }}抢单劵{{ order.chargebackOrderRes.realChargebackMoney }}张</span>
                <span v-if="order.chargebackOrderRes.realChargebackType==0">
                    <em v-if="order.chargebackOrderRes.realChargebackTypeDetail ==0">{{order.chargebackOrderRes.realChargebackMoney}}赞豆</em>
                    <em v-if="order.chargebackOrderRes.realChargebackTypeDetail ==1">充值赞豆{{order.chargebackOrderRes.realRechargeAmount }}</em>
                    <em v-if="order.chargebackOrderRes.realChargebackTypeDetail ==2">赠送赞豆{{order.chargebackOrderRes.realGiveAmount }}({{order.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                    <em v-if="order.chargebackOrderRes.realChargebackTypeDetail ==3">充值赞豆{{order.chargebackOrderRes.realRechargeAmount }}&赠送赞豆{{order.chargebackOrderRes.realGiveAmount }}({{order.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                </span>
            </p>
            <!-- <p>
                <span>实际退单金额: </span>
                <span>{{ order.goodStatusName}}</span>
            </p> -->
            <p>
                <span>退回方式: </span>
                <span>{{ order.chargebackOrderRes.realChargebackTypeName}}</span>
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
            <Button type="primary" @click="handleRender">查看操作日志</Button>&nbsp;&nbsp;
            <Button type="ghost" class="w100" @click="backingout">返回</Button>
        </div>
    </div>
    <!-- 查看大图弹框 -->
    <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
        <img :src=this.imglink alt="" style="width:970px;height:890px;">
    </Modal>
</div>
</template>
<script>
export default {
  data () {
    return {
        order: {},
        img: [],
        chargebackApplyPicimg:[],
        modal11:false,
        imglink:''
    }
  },
  methods: {
    handleRender () {
        this.$router.push({ path: './operationLog?operationType=orderLog&orderCode=' + this.order.orderCode })
    },
    // 返回
    backingout () {
      window.history.go(-1)
    },
    bigimg(link) {
      this.imglink = link;
      this.modal11 = true;
      // window.location.href = link
    },
  },
  mounted () {
    let list = {
        orderCode :  this.$route.query.orderCode
    }
    this.http.post(BASE_URL + '/loan/baseRobOrder/getBaseRobOrderByCode', list).then(data=>{
        if (data.code == 'success') {
            this.order = data.data
            this.chargebackApplyPicimg = data.data.chargebackOrderRes.chargebackApplyPic.split(';')
            if (data.data.commentDetailsReq != null) {
                for (let i = 0; i < data.data.commentDetailsReq.stars; i++) {
                this.img.push(require("../../image/pointed-star.png"));
                }
            }
        }    
    })
    .catch((error) => {
        console.log(error)
    })
  }
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
    p{
        line-height: 40px;
        padding-left: 50px;
        span:first-child{
            width: 100px;
            display: inline-block;
            text-align: right
        }

    }
    div{
        text-align: center;
        margin-top: 20px
    }
}

.details_left{
    padding-top: 10px;
    p{
        color: #999;
        font-size: 12px;
        line-height: 20px!important
    }
}
.details_right{
    p{
        text-align: left;
        span:first-child{
            width: 130px !important;
            display: inline-block;
            text-align: right
        }
    }
}
.evaluation_grade{
    display: inline-block;
    border: 1px solid #FF6600;
    line-height: 30px;
    padding: 0px 20px;
    color: #FF6600;
    text-align: center!important
}
</style>