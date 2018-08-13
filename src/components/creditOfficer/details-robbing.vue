<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看订单详情</h3>
        <div class="clearfix">
            <div class="left details_left">
            <p>
                <span>抢单时间</span>
                <span>{{order.orderCreateTime}}</span>
            </p>
            <p>
                <span>支付时间</span>
                <span>{{order.orderPayTime}}</span>
            </p>
            <p>
                <span>确认时间</span>
                <span>{{order.orderConfirmTime}}</span>
            </p>
        </div>
        <div class="left details_right">
            <p>
            <span>抢单时间:</span>
            <span>{{order.orderCreateTime}}</span>
        </p>
        <p>
            <span>抢单编号:</span>
            <span>{{order.orderNum}}</span>
        </p>
        <p>
            <span>抢单费用:</span>
            <span>{{order.robbingAmount}}</span>
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
            <span>申请贷款金额:</span>
            <span>{{order.customerLoanAmount}}</span>
        </p>
        <p>
            <span>服务费:</span>
            <span>{{order.serviceCostAsFormat}}</span>
        </p>
        <p>
            <span>实际放款金额:</span>
            <span>{{order.customerActualLoanAmount}}</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>{{order.officerName}} {{order.officerPhone}}</span>
        </p>
        </div>
        </div>
        <div>
            <Button type="ghost" class="w100" @click="backingout">返回</Button>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
        order: {},
    }
  },
  methods: {
    handleRender () {
      this.$router.push({ path: './orderlog?orderCode='+ this.order.orderCode })
    },
    // 返回
    backingout () {
      window.history.go(-1)
    },
  },
  mounted () {
    let list = {
        orderCode :  this.$route.query.orderCode
    }
    this.http.post(BASE_URL + '/loan/baseRobOrder/getBaseRobOrderByCode', list).then(data=>{
        if (data.code == 'success') {
            this.order = data.data
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
.evaluation_grade{
    display: inline-block;
    border: 1px solid #FF6600;
    line-height: 30px;
    padding: 0px 20px;
    color: #FF6600
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
            width: 100px;
            display: inline-block;
            text-align: right
        }
    }
}
</style>
