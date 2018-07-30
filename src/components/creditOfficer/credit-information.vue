<template>
<Row>
    <Col span="5">
    <div id="memberLeft">
        <div class="memberphoto">
            <img :src="inform.loanPersonImg" alt="">
            <p>{{inform.phoneMember}}</p>
            <p class="stre_evaluate">
                <img v-for='(item, index) in img' v-bind:src='item' :key="index" alt=''>
            </p>
            <!-- <span class="member_type green1">账户正常</span> -->
            <Button v-if="inform.accountStatus == 0" type="info" shape="circle" @click="thaw(1)">解冻账户</Button>
            <Button type="error" shape="circle" v-if="inform.accountStatus == 1" @click="thaw(0)">冻结账户</Button>
        </div>
        <ul class="member_left_ul">
            <li>
                <Row>
                    <Col span="12" class="vertical_bar">
                    <span>虚拟余额:</span>
                    <span></span>
                    <strong>{{inform.virtualBalance}}</strong>
                    </Col>
                    <Col span="12">
                    <span style="margin-left:0">现金余额:</span>
                    <strong>{{inform.cashBalance}}</strong>
                    </Col>
                </Row>
            </li>
            <li>
                <span class="w50 tr displayib">姓名:</span>
                <span>{{inform.realName}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">性别:</span>
                <span v-if="inform.gender=='0'">男</span>
                <span v-else-if="inform.gender=='1'">女</span>
                <span v-else-if="inform.gender=='2'">请选择</span>
                <span v-else></span>
            </li>
            <li>
                <span class="w50 tr displayib">邀请人:</span>
                <span class="">{{inform.loanInviterCode}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">已邀请:</span>
                <span class="">{{inform.loanInviterCount}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">注册:</span>
                <span>{{inform.registerTime}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">银行卡:</span>
                <span class="">{{inform.bank}}</span>
                <!-- <span>6544 ****2210</span> -->
            </li>
        </ul>
    </div>
    </Col>
    <Col span="19">
    <div id="memberRight">
        <Tabs :animated="false">
            <TabPane label="基本信息">
                <div class="basic">
                    <p>
                        <span>所属区域:</span>
                        <span>{{inform.loanLocationName}}</span>
                    </p>
                    <p>
                        <span>贷款额度:</span>
                        <span>{{inform.serviceAmount}}</span>
                    </p>
                    <p>
                        <span>贷款利率:</span>
                        <span>{{inform.serviceRate}}</span>
                    </p>
                    <p>
                        <span>贷款类型:</span>
                        <span v-for="item in inform.loanHaveType">{{item}} </span>
                    </p>
                    <p>
                        <span>服务时间:</span>
                        <span>{{inform.serviceTime}}</span>
                    </p>
                    <p>
                        <span>扣费设置:</span>
                        <span>{{inform.loanDeductionSet}}</span>
                    </p>
                    <p class="credit_prove">
                        <strong>身份证</strong>
                        <img :src='inform.loanIdcardFrontImg'  alt=''>
                        <img :src='inform.loanIdcardBackImg'  alt=''>
                    </p>
                    <p class="credit_prove mt20 ">
                        <strong >工作证明</strong>
                        <img v-bind:src="inform.loanJobImg" alt="">
                    </p>
                    
                    <div class="mt20 service_introduction" v-if="inform.serviceIntroductionStatus==2">
                        <h3><strong>服务介绍</strong></h3>
                        <p>
                            <span>1.</span>
                            贷款要求
                        </p>
                        <p>
                            {{inform.serviceLoanRequire}}
                        </p>
                        <p>
                            <span>2.</span>
                            申请条件
                        </p>
                        <p>
                            {{inform.serviceApplyRequire}}
                        </p>
                        <p>
                            <span>3.</span>
                            其它说明
                        </p>
                        <p>
                            {{inform.serviceOtherRequire}}
                        </p>
                    </div>
                    <p>
                        <span>认证状态:</span>
                        <span v-if="inform.loanStatus==0">注册无资料</span>
                        <span v-else-if="inform.loanStatus==1">信贷员待审核</span>
                        <span v-else-if="inform.loanStatus==2">审核通过</span>
                        <span v-else-if="inform.loanStatus==3">审核失败</span>
                    </p>
                    <p>
                        <span>拒绝原因:</span>
                        <span>{{inform.loanStatusMsg}}</span>
                    </p>
                    <!-- v-if="inform.loanStatus==1" -->
                    <div class="mt50 tc" v-if="inform.loanStatus==1">
                        <Button type="primary" @click="handleRender">认证审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" @click="refuse">认证审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="ghost" @click="journal">查看操作日志</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="ghost">返回</Button>
                    </div>
                    <Modal
                    title="认证审核拒绝"
                    v-model="modal9"
                    @on-ok="deterRefuse('formValidate')"
                    ok-text="确认拒绝"
                    cancel-text="关闭"
                    class-name="vertical-center-modal"
                    width="550"
                    :loading="loading"
                    :mask-closable="false">
                    <div  class="newtype_file mt15 mb15">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleInline" :label-width="80">
                            <FormItem label="拒绝原因:" prop="name">
                               <Input  v-model="formValidate.name" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审核拒绝原因"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    </Modal>
                </div>
            </TabPane>
            <TabPane label="咨询订单记录">
                <Table border :columns="columns1" :data="data1"></Table>
                <div class="tr mt15">
                    <Page :total="100"  show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="抢单记录">
                <Table border :columns="columns2" :data="data2"></Table>
                <div class="tr mt15">
                    <Page :total="100"  show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="通话记录">
                <Table stripe :columns="columns3" :data="data3"></Table>
                <div class="tr mt15">
                    <Page :total="100" show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="现金流水">
                <Table stripe :columns="columns4" :data="data4"></Table>
                <div class="tr mt15">
                    <Page :total="100" show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="评价记录">
                <Table stripe :columns="columns5" :data="data5"></Table>
                <div class="tr mt15">
                    <Page :total="100" show-elevator show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="登录日志">
              <Table stripe :columns="columns6" :data="data6"></Table>
                <div class="tr mt15">
                    <Page :total="100" show-elevator show-sizer show-total></Page>
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
      img: [],
      formValidate: {
        name: ''
      },
      modal9: false,
      loading: true,
      introduce: true,
      name: '',
      inform: {},
      ruleInline: {
        name: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      },
      identity: [
        require('../../image/identity_id.jpg'),
        require('../../image/identity_id.jpg')
      ],
      columns1: [
        {
          title: '订单时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '订单编号',
          align: 'center',
          key: 'number'
        },
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机',
          align: 'center',
          key: 'phone'
        },
        {
          title: '订单状态',
          align: 'center',
          key: 'type'
        },
        {
          title: '服务费用',
          align: 'center',
          key: 'money'
        }
      ],
      data1: [
        {
          time: '2016-10-03',
          number: 'XD2018091099',
          name: '李*明',
          phone: '130****3333',
          type: '已咨询',
          money: '200元'
        },
        {
          time: '2016-10-03',
          number: 'XD2018091099',
          name: '李*明',
          phone: '130****3333',
          type: '已咨询',
          money: '200元'
        }
      ],
      columns2: [
        {
          title: '抢单时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '抢单编号',
          align: 'center',
          key: 'number'
        },
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机',
          align: 'center',
          key: 'phone'
        },
        {
          title: '抢单费用',
          align: 'center',
          key: 'money'
        }
      ],
      data2: [
        {
          time: '2018-03-29 15:12:34',
          number: 'XD2018091099',
          name: '李*明',
          phone: '130****1111',
          money: 22
        },
        {
          time: '2018-03-29 15:12:34',
          number: 'XD2018091099',
          name: '李*明',
          phone: '130****1111',
          money: 22
        }
      ],
      columns3: [
        {
          title: '通话时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '手机',
          align: 'center',
          key: 'phone'
        },
        {
          title: '流水编号',
          align: 'center',
          key: 'number'
        },
        {
          title: '通话时长',
          align: 'center',
          key: 'lengthTime'
        },
        {
          title: '通话扣费',
          align: 'center',
          key: 'deductions'
        }
      ],
      data3: [
        {
          time: '2018-03-29 15:12:34',
          phone: '130****2222',
          number: 'XD2018091099',
          lengthTime: '3分30秒',
          deductions: 22
        },
        {
          time: '2018-03-29 15:12:34',
          phone: '130****2222',
          number: 'XD2018091099',
          lengthTime: '3分30秒',
          deductions: 22
        }
      ],
      columns4: [
        {
          title: '账户类型',
          align: 'center',
          key: 'type'
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation'
        },
        {
          title: '金额 (元)',
          align: 'center',
          key: 'money'
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'operTime'
        }
      ],
      data4: [
        {
          type: '虚拟货币',
          operation: '充值成功',
          money: '+100',
          operTime: '2018-03-29 15:12:34'
        },
        {
          type: '虚拟货币',
          operation: '充值成功',
          money: '+100',
          operTime: '2018-03-29 15:12:34'
        }
      ],
      columns5: [
        {
          title: '评价时间',
          align: 'center',
          key: 'evaltime'
        },
        {
          title: '订单编号',
          align: 'center',
          key: 'number'
        },
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机',
          align: 'center',
          key: 'phone'
        },
        {
          title: '评分',
          align: 'center',
          key: 'score',
          render: (h, params) => {
            let listimg = []
            for (let i = 0; i < params.row.score.length; i++) {
              listimg.push(
                h('img', {
                  attrs: {
                    src: params.row.score[i]
                  },
                  style: {
                    width: '20px',
                    height: '20px',
                    marginRight: '5px'
                  }
                })
              )
            }
            return h('div', listimg)
          }
        },
        {
          title: '内容',
          align: 'center',
          key: 'content'
        },
        {
          title: '评价状态',
          align: 'center',
          key: 'evaltype'
        }
      ],
      data5: [
        {
          evaltime: '2018-03-29 15:12:34',
          number: 'XD2018091099',
          name: '唐哈哈',
          phone: '135****7766',
          score: [
            require('../../image/pointed-star.png'),
            require('../../image/pointed-star.png')
          ],
          content: '非常棒！感谢！',
          evaltype: '未通过审核'
        },
        {
          evaltime: '2018-03-29 15:12:34',
          number: 'XD2018091099',
          name: '唐哈哈',
          phone: '135****7766',
          score: [
            require('../../image/pointed-star.png')
          ],
          content: '非常棒！感谢！',
          evaltype: '未通过审核'
        }
      ],
      columns6: [
        {
          title: '登录时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '登录端口',
          align: 'center',
          key: 'port'
        },
        {
          title: '登录设备',
          align: 'center',
          key: 'equipment'
        }
      ],
      data6: [
        {
          time: '2018-03-29 15:12:34',
          port: '安卓',
          equipment: 'MI 5S'
        },
        {
          time: '2018-03-29 15:12:34',
          port: '安卓',
          equipment: 'MI 5S'
        }
      ]
    }
  },
  methods: {
    // 解冻账户
    thaw (num) {
      if (num == 0) {
        this.$Modal.confirm({
          title: '冻结账户',
          content: '<p>确认要冻结吗?</p>',
          onOk: () => {
            this.acctype (0)
          },
          onCancel: () => {             
          }
        })
      } else {
        this.$Modal.confirm({
          title: '冻结账户',
          content: '<p>确认要冻结吗?</p>',
          onOk: () => {
            this.acctype (1)
          },
          onCancel: () => {            
          }
        })
      }     
    },
    // 冻结账户
    acctype (num) {
      let list = {
        loanOfficerCode: this.inform.loanOfficerCode,
        accountStatus: num
      }
      this.http.post(BASE_URL + '/loan/officerInfo/updateOfficerInfoAccountStatusByCode', list)
        .then((resp) => {
          if (resp.code == 'success') {
            const title = '冻结'
            content = '<p>冻结成功</p>'
            this.$Modal.success({
              title: title,
              content: content
            })
            this.information()

          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })

    },
    // 审核
    reviewthrough (num) {
      let loanStatusMsg
      let loanStatus
      if (num ==1) {
        loanStatusMsg = ''
        loanStatus = 2
      } else {
        loanStatusMsg = this.formValidate.name
        loanStatus = 3
      }

      let list = {
        loanOfficerCode: this.inform.loanOfficerCode,
        loanStatus: loanStatus,
        loanStatusMsg: loanStatusMsg
      }
      this.http.post(BASE_URL + '/loan/officer/updateOfficerInfoLoanStatus', list)
        .then((resp) => {
          if (resp.code == 'success') {
            const title = '审核'
            let content
            if (num == 1) {
              content = '<p>审核成功</p>'              
            } else {
              content = '<p>审核拒绝成功</p>'
            }          
            this.$Modal.success({
              title: title,
              content: content
            })
          } else {
            this.$Message.info(resp.message)
            // const title = '审核'
            // let content = '<p>+resp.message+</p>'
            // this.$Modal.success({
            //   title: title,
            //   content: content
            // })
          }
        })
        .catch(() => {
        })
    },
    // 认证审核通过
    handleRender () {
      this.$Modal.confirm({
          title: '认证审核',
          content: '<p>确认认证审核通过吗?</p>',
          onOk: () => {
            this.reviewthrough (1)
          },
          onCancel: () => {
              
          }
        })
    },
    // 认证审核拒绝
    refuse () {
      this.modal9 = true
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    deterRefuse (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        }
        setTimeout(() => {
          this.changeLoading()
          this.modal9 = false
          this.formValidate.name = ''
          this.$Message.success('done')
        }, 1000)
      })
    },
    // 查看操作日志
    journal () {
      this.$router.push({ path: './operationLog?loanOfficerCode='+ this.inform.loanOfficerCode })
    },
    // 基本信息
    information () {
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode
      }
      this.http.post(BASE_URL + '/loan/officer/getOfficerDetailInfo', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.inform= resp.data
            for (let i = 0; i < resp.data.loanOfficerGrade; i++) {
              this.img.push(require('../../image/pointed-star.png'))
            }
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    }
  },
  mounted () {
    this.information()
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
        width: 200px;
        margin-top: 20px;
        border-radius: 50%
        }
        p{
            line-height: 25px;
            margin: 15px 0
        }
        .stre_evaluate{
            img{
                width: 20px;
                margin-top: 0
            }
        }
    }
    .member_left_ul li{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        // padding-left: 20px;
        span{
            margin-left: 20px
        }
        .ivu-row{
            text-align: center
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
    padding: 0 20px;
    .basic{
        p{
            padding-left: 50px;
            span:first-child{
                line-height: 40px
            }
        }
        .credit_prove{
            strong{
                display: block;
                margin-bottom: 10px
            }
            img{
                width: 200px;
                vertical-align: top;
                margin-right: 20px
            }
        }
    }
    .service_introduction{
        h3{
            padding-left: 50px
        }
    }
}
.vertical_bar{
    border-right: 1px solid #E7ECF1;
    span{
        margin-left: 0px!important
    }
}
</style>
