<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看订单详情</h3>
        <p>
            <span>订单时间:</span>
            <span>{{order.orderCreateTime}}</span>
        </p>
        <p>
            <span>订单编号:</span>
            <span>{{order.orderNum}}</span>
        </p>
        <p>
            <span>订单状态:</span>
            <span v-if="order.orderStatus==0">无状态</span>
            <span v-else-if="order.orderStatus==1">已咨询</span>
            <span v-else-if="order.orderStatus==2">待付款</span>
            <span v-else-if="order.orderStatus==3">待确认</span>
            <span v-else-if="order.orderStatus==4">交易成功</span>
            <span v-else-if="order.orderStatus==5">交易失败</span>
        </p>
        <p>
            <span>所在区域:</span>
            <span>{{order.orderCityNameSecond}}</span>
        </p>
        <p>
            <span>客户姓名:</span>
            <span>{{order.loanUserName}}</span>
        </p>
        <p>
            <span>手机号:</span>
            <span>{{order.loanUserPhone}}</span>
        </p>
        <p>
            <span>申请贷款金额:</span>
            <span>{{order.customerLoanAmount}}</span>
        </p>
        <p>
            <span>服务费:</span>
            <span>{{order.serviceCost}}</span>
        </p>
        <p>
            <span>实际放款金额:</span>
            <span>{{order.customerActualLoanAmount}}</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>{{order.officerName}} {{order.officerPhone}}</span>
        </p>
        <p>
            <span>申诉人:</span>
            <span v-if="order.orderStatus==3&&order.orderStatusDetail==4">客户</span>
            <span v-else-if="order.orderStatus==3&&order.orderStatusDetail==5">信贷员</span>
        </p>
        <p>
            <span>申诉时间:</span>
            <span>{{order.complainTime}}</span>
        </p>
        <p>
            <span>申诉内容:</span>
            <span>{{order.complainMessage}}</span>
        </p>
        <div>
            <Button type="primary" @click="orderclosure(0)">确认贷款成功</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" @click="bidorder">关闭订单</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" @click=" backingout">返回</Button>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
        order: {},
        ordercode: ''
    }
  },
  mounted (){
      let list = {
         orderCode :  this.$route.query.baseOrderCode
      }
    this.http.post(BASE_URL + '/loan/baseRobOrder/getBaseRobOrderByCode', list).then(data=>{
        if (data.code == 'success') {
            this.order = data.data
        }    
    })
    .catch((error) => {
        console.log(error)
    })
  },
  methods:{
    bidorder () {
        this.$Modal.confirm({
          title: '未处理申述订单',
          content: '<p>确认要关闭该订单吗?</p>',
          onOk: () => {
            this.orderclosure (1)
          },
          onCancel: () => {
              
          }
        })

    },
    orderclosure (num) {
        let orderstatusdetail
        if (num == 0) {
            orderstatusdetail = 2
        } else {
            orderstatusdetail = 5
        }
        let data = {
            orderCode : this.order.orderCode,
            orderStatus : 4,
            orderStatusDetail :orderstatusdetail
        }
        this.http.post(BASE_URL + '/loan/baseRobOrder/updateOrderStatusForWeb', data)
        .then(data=>{
            if (data.code == 'success') {
                if (num == 0) {
                    const title = '未处理申述订单'
                    const content = '<p>贷款成功</p>'
                    this.$Modal.success({
                    title: title,
                    content: content,
                    onOk: () => {
                        this.$router.push({ path: './orderList?num=2' })
                    }
                })
                } else {
                const title = '未处理申述订单'
                    const content = '<p>关闭成功</p>'
                    this.$Modal.success({
                    title: title,
                    content: content,
                    onOk: () => {
                        this.$router.push({ path: './orderList?num=2' })
                    }  
                })
            
            }
            } else {
            this.$Message.info(data.message)
            }
        // this.order
        })
        .catch((error) => {
            console.log(error)
        })
    },
    backingout () {
        this.$router.push({ path: './orderList?num=2' })
    }
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
</style>
