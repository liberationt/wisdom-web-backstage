<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
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
            <span>{{order.orderCityNameFirst}}  {{order.orderCityNameSecond}}</span>
        </p>
        <p>
            <span>客户姓名:</span>
            <span>{{order.loanUserName}}</span>
        </p>
        <p>
            <span>手机号:</span>
            <span>{{order.loanUserPhone}}</span>
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
            <span>{{order.customerActualLoanAmountAsFormat}}万元</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>{{order.officerName}} {{order.officerPhone}}</span>
        </p>
        <p v-if="order.complainMessage && order.complainTime">
            <span>申诉人:</span>
            <span v-if="order.orderStatus == 3 && order.orderStatusDetail == 4">
                客户
            </span>
            <span v-else-if="order.orderStatus == 3 && order.orderStatusDetail == 5">
                信贷员
            </span>
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
            <span>申请关闭时间:</span>
            <span>{{order.orderCloseTime}}</span>
        </p>
        <p v-if="order.orderCloseMessage && order.orderCloseTime">
            <span>申请关闭原因:</span>
            <span>{{order.orderCloseMessage}}</span>
        </p>
        <p v-if="order.commentDetailsReq!=null">
            <span>评价状态:</span>
            <span>{{order.commentDetailsReq.isPass}}</span>
        </p>
        <p v-if="order.commentDetailsReq != null">
            <span>评价内容:</span> 
            <Icon  v-for="item in img" type="ios-star" class="yellow1 " :key="item.length"></Icon>
            <p v-if="order.commentDetailsReq!=null" class="ml100" >
                <span v-for="item in order.commentDetailsReq.tagsCodeList" class="evaluation_grade " :key="item.length">{{item}}</span>
            </p>
            <p v-if="order.commentDetailsReq != null" class="ml100">{{order.commentDetailsReq.content}}
        </p>
        <p v-if="order.leaveMessageResList" 
            v-for="item in order.leaveMessageResList" :key="item.leaveMessageCode">
            <span>留言:</span>
            <span >【{{item.leaveMessageTime}}】</span>
            <span >{{item.leaveMessage}}</span>
        </p>
        <div>
            <Button type="primary" @click="modal9=true">确认贷款成功</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" @click="bidorder">关闭订单</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" @click=" backingout">返回</Button>
        </div>
        <Modal
          title="确认贷款成功"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:15px">
              <FormItem label="实际贷款金额:" prop="productid" >
                <Input v-model="formCustom.productid" placeholder="请输入实际贷款金额" style="width: 300px">
                <span slot="append">万元</span>
                </Input>
              </FormItem>            
          </Form>
          </div>
          </Modal>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
        modal9:false,
        loading: true,
        order: {},
        formCustom: {
        productid: ''
      },
      ruleCustom: {
        productid: [
            {required: true,message: '请输入实际贷款金额',trigger: 'blur'},
            {required: true, message: '请输入正确的实际贷款金额', pattern: /^(0|[1-9]\d{0,3})(\.\d{1,2})?$/, trigger: 'blur'},
        ]
      }
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
            this.orderclosure ()
          },
          onCancel: () => {
              
          }
        })

    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                orderCode : this.order.orderCode,
                orderStatus : 4,
                orderStatusDetail :2,
                customerActualLoanAmount:this.formCustom.productid
            }
            this.http.post(BASE_URL + '/loan/baseRobOrder/updateOrderStatusForWeb', data)
            .then(data=>{
                if (data.code == 'success') {
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
                this.$Message.info(data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
          this.changeLoading()
          this.modal9 = false
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    orderclosure () {
        let data = {
            orderCode : this.order.orderCode,
            orderStatus : 4,
            orderStatusDetail : 5
        }
        this.http.post(BASE_URL + '/loan/baseRobOrder/updateOrderStatusForWeb', data)
        .then(data=>{
            if (data.code == 'success') {
                const title = '未处理申述订单'
                    const content = '<p>关闭成功</p>'
                    this.$Modal.success({
                    title: title,
                    content: content,
                    onOk: () => {
                        this.$router.push({ path: './orderList?num=2' })
                    }  
                })
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
    color: #FF6600;
    text-align: center
}
</style>
