<template>
<Row>
    <Col span="4">
    <div id="memberLeft">
        <div class="memberphoto">
            <img :src="informationlist.headImg" alt="">
            <p>{{informationlist.phoneNumber}}</p>
            <!-- <span class="member_type green1">账户正常</span> -->
            <Button v-if="informationlist.accountStatus==0" type="info" shape="circle" @click="thaw(1)">解冻账户</Button>
            <Button v-if="informationlist.accountStatus==1" type="error" shape="circle" @click="thaw(0)">账户冻结</Button>
        </div>
        <ul class="member_left_ul">
            <li>
                <span class="w50 tr displayib">昵称:</span>
                <span>{{informationlist.memberName}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">实名:</span>
                <span v-if="informationlist.realStatus==1">{{informationlist.realName}}</span>
                <span v-if="informationlist.realStatus==1">{{informationlist.idCard}}</span>
                <span v-if="informationlist.realStatus==0" class="member_type red1">未实名</span>
            </li>
            <li>
                <span class="w50 tr displayib">微信:</span>
                <span class="member_type red1">{{informationlist.wechatNickName}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">渠道:</span>
                <span class="">{{informationlist.loanUserChannel}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">邀请人:</span>
                <span class="">{{informationlist.loanInviterPhone}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">已邀请:</span>
                <span class="">{{informationlist.loanInviterCount}}</span>
            </li>
        </ul>
    </div>
    </Col>
    <Col span="20">
    <div id="memberRight">
        <Tabs :animated="false" @on-click="marketquery">
            <TabPane label="个人信息">
                <div class="informationlist">
                    <h3>
                        <span>{{informationlist.realName}}</span>
                        <span>{{informationlist.age}}</span>
                        <span>{{informationlist.loanCityNameFirst}}</span>
                        <span>{{informationlist.idCard}}</span>
                    </h3>
                    <p>
                        <span>贷款意向</span>
                        <span>{{informationlist.loanAmount}}</span>
                        <span>贷款期限</span>
                        <span>{{informationlist.loanTimeLimit}}</span>
                    </p>
                    <h3>基本信息</h3>
                    <ul class="essinformation">
                        <li v-for="item in informationlist.baseInfo.data">
                            <span>{{item.titleName}}</span>
                            <span>{{item.optionName}}</span>
                            <span>正确({{item.selectTrueCount}})</span>
                            <span>错误({{item.selectFalseCount}})</span>
                        </li>
                    </ul>
                    <h3>资产信息</h3>
                    <ul class="essinformation">
                        <li v-for="item in informationlist.assetInfo.data">
                            <span>{{item.titleName}}</span>
                            <span>{{item.optionName}}</span>
                            <span>正确({{item.selectTrueCount}})</span>
                            <span>错误({{item.selectFalseCount}})</span>
                        </li>
                    </ul>
                </div>
            </TabPane>
            <TabPane label="现金流水">
                <Table border highlight-row :columns="columns1" :data="data1"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="咨询订单">
                <Table border highlight-row :columns="columns2" :data="data2"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="抢单订单">
                <Table border highlight-row :columns="columns3" :data="data3"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="登录日志">
                <Table border highlight-row :columns="columns4" :data="data4"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
        </Tabs>
    </div>
    </Col>
</Row>
</template>
<script>
export default {
  data () {
    return {
      total: 0,
      startRow: 1,
      endRow: 10,
      pagenum: '',
      informationlist: {
          assetInfo:{
              data:[]
          },
          baseInfo:{
              data:[]
          }
      },
      columns1: [
        {
          title: '类型',
          align: 'center',
          key: 'bizDesc'
        },
        {
          title: '金额 (元)',
          align: 'center',
          render: (h, params) => {
            let amountAsFormat
            if (params.row.type  == 0) {
              amountAsFormat = '+'+params.row.amountAsFormat
            } else if(params.row.type  ==  1){
              amountAsFormat = '-'+params.row.amountAsFormat
            } else if (params.row.type  ==  2) {
                amountAsFormat = params.row.amountAsFormat
            }
            return h('div', [
              h('span', {}, amountAsFormat)
            ])
		  }
        },
        {
          title: '支付账户',
          align: 'center',
          key: 'payTypeDesc'
        },
        {
          title: '流水编号',
          align: 'center',
          key: 'orderNo'
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'time'
        }

      ],
      data1: [],
      columns2: [
        {
          title: '订单时间',
          align: 'center',
          minWidth: 160,
          key: 'orderCreateTime'
        },
        {
          title: '订单编号',
          align: 'center',
          minWidth: 150,
          key: 'orderNum'
        },
        {
          title: '信贷员',
          align: 'center',
          minWidth: 100,
          key: 'officerName'
        },
        {
          title: '申请金额',
          align: 'center',
          minWidth: 100,
          key: 'customerLoanAmount'
        },
        {
          title: '实际放款金额',
          align: 'center',
          minWidth: 110,
          key: 'customerActualLoanAmount'
        },
        {
          title: '服务费',
          align: 'center',
          minWidth: 100,
          key: 'serviceCost'
        },
        {
          title: '订单状态',
          align: 'center',
          minWidth: 100,
          key: 'orderStatusName'
        },
        // {
        //   title: '操作',
        //   align: 'center',
        //   minWidth: 100,
        //   key: 'orderStatusName',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'info',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px'
        //           },
        //           on: {
        //             click: () => {
        //               this.$router.push({ path: './insuranceReport?id='+params.row.batchCode+'&&pushname='+this.pushname1 }) 
        //             }
        //           }
        //         },
        //         '查看'
        //       )
        //     ])
		//   }
        // }

      ],
      data2: [],
      columns3: [
        {
          title: '抢单时间',
          align: 'center',
          minWidth: 160,
          key: 'orderCreateTime'
        },
        {
          title: '抢单编号',
          align: 'center',
          minWidth: 150,
          key: 'orderNum'
        },
        {
          title: '订单状态',
          align: 'center',
          minWidth: 100,
          key: 'orderStatusName'
        },
        {
          title: '信贷员',
          align: 'center',
          minWidth: 100,
          key: 'officerName'
        },
        {
          title: '手机',
          align: 'center',
          minWidth: 110,
          key: 'officerPhone'
        },
        {
          title: '抢单费用',
          align: 'center',
          minWidth: 100,
          key: 'robbingAmount'
        }
      ],
      data3: [],
      columns4: [
        {
          title: '登录时间',
          align: 'center',
          minWidth: 160,
          key: 'loginTime'
        },
        {
          title: '登录端口',
          align: 'center',
          minWidth: 150,
          key: 'loginPort'
        },
        {
          title: '登录设备',
          align: 'center',
          minWidth: 100,
          key: 'loginDevice'
        },
        {
          title: '登录状态',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let loginStatus
            if (params.row.loginStatus == 0) {
              loginStatus = '账户冻结'
            } else if(params.row.loginStatus ==  1){
              loginStatus = '登录成功'
            }
            return h('div', [
              h('span', {}, loginStatus)
            ])
		  }
        }
      ],
      data4: []
    }   
  },
  methods: {
    //   基本信息
    personalinformation () {
        this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberInfo?loanUserCode='+this.$route.query.loanUserCode)
        .then((resp) => {
        if (resp.code == 'success') {
            this.informationlist = resp.data
        } else {
        }
        })
        .catch(() => {
        })
    },
    // 解冻账户
    thaw (num) {
      if (num == 0) {
        this.$Modal.confirm({
          title: '冻结账户',
          content: '<p>确认要冻结账户吗?</p>',
          onOk: () => {
            this.acctype (0)
            const title = '冻结'
              const content = '<p>冻结成功</p>'
              this.$Modal.success({
              title: title,
              content: content
            })
          },
          onCancel: () => {             
          }
        })
      } else {
        this.$Modal.confirm({
          title: '解冻账户',
          content: '<p>确认要解冻账户吗?</p>',
          onOk: () => {
            this.acctype (1)
            const title = '解冻'
              const content = '<p>解冻成功</p>'
              this.$Modal.success({
              title: title,
              content: content
            }) 
          },
          onCancel: () => {            
          }
        })
      }     
    },
    // 冻结账户
    acctype (num) {
      let list = {
        loanUserCode: this.informationlist.loanUserCode,
        accountStatus: num,
        memberCode:this.informationlist.memberCode
      }
      this.http.post(BASE_URL + '/loan/userInfo/modifyUserAccountStatus', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.personalinformation ()
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })

    },
    // 现金流水
    cashflow () {
        let list = {
            userCode: this.$route.query.loanUserCode,
            pageNum: this.startRow,
            pageSize: this.endRow
        }
        this.http.post(BASE_URL + '/loan/tradeFlow/huaZan/list', list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.data1 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        })

    },
    //   咨询订单
    consultinglist () {
        let list = {
            loanUserCode: this.$route.query.loanUserCode,
            pageNum: this.startRow,
            pageSize: this.endRow
        }
        this.http.post(BASE_URL + '/loan/baseOrder/queryUserBaseOrderConsultList', list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.data2 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        })
    },
    // 抢单订单
    orderlist () {
        let list = {
            loanUserCode: this.$route.query.loanUserCode,
            pageNum: this.startRow,
            pageSize: this.endRow
        }
        this.http.post(BASE_URL + '/loan/baseOrder/queryUserBaseOrderRobList', list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.data3 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        })
    },
    // 登录日志
    logonlist () {
        let list = {
            userCode: this.$route.query.loanUserCode,
            pageNum: this.startRow,
            pageSize: this.endRow
        }
        this.http.post(BASE_URL + '/loan/userInfo/queryUserLoginLog', list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.data4 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        })
    },
    marketquery (name) {
        this.total = 0
        this.startRow = 1
        this.endRow = 10
        this.pagenum = name
        if (name == 0) {
            this.personalinformation ()              
        } else if (name == 1) {
            this.cashflow ()
        } else if (name == 2) {
            this.consultinglist ()
        } else if (name == 3) {
            this.orderlist ()
        } else if (name == 4) {
            this.logonlist ()
        }
    },
    // 分页
    pageChange (page) {
      this.startRow = page
      if (this.pagenum == 0) {
          this.personalinformation ()
      } else if (this.pagenum == 1) {
          this.cashflow ()
      } else if (this.pagenum == 2) {
          this.consultinglist ()
      } else if (this.pagenum == 3) {
          this.orderlist ()
      } else if (this.pagenum == 4) {
          this.logonlist ()
      }
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      if (this.pagenum == 0) {
          this.personalinformation ()
      } else if (this.pagenum == 1) {
          this.cashflow ()
      } else if (this.pagenum == 2) {
          this.consultinglist ()
      } else if (this.pagenum == 3) {
          this.orderlist ()
      } else if (this.pagenum == 4) {
          this.logonlist ()
      }
    },

  },
  mounted () {
      this.personalinformation ()

  }

}
</script>
<style lang="less" scoped>
#memberLeft{
    border: 1px solid #E7ECF1;
    .memberphoto{
        text-align: center;
        margin-bottom: 20px;
        img{
        width: 150px;
        margin-top: 20px;
        height: 150px;
        border-radius: 50%
        }
        p{
            line-height: 25px;
            margin: 15px 0
        }
    }
    .member_left_ul li{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        padding-left: 20px;
        span{
            margin-left: 10px
        }
    }
    .member_left_ul li:last-child{
        border-bottom: 0
    }
    .member_left_ul li:first-child{
        border-top: 1px solid #E7ECF1
    }
}
#memberRight{
    padding: 0 20px
}
.member_type{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    color: #fff;
    border-radius: 30px;
    text-align: center
}
.informationlist{
    padding: 20px 50px;
    h3{
        font-weight: 700;
        margin-bottom: 5px;
        span{
            margin-right: 10px
        }
    }
    p{
        margin: 10px 0;
        span{
            margin-right: 10px
        }
    }
}
.essinformation{
    margin: 10px 0;
    span{
        margin-right: 20px;
        display: inline-block;
        width: 100px;
        text-align: right
    }

}
</style>
