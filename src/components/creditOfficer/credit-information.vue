<template>
<div class="contentcss">
<Row>
    <Col span="5">
    <div id="memberLeft">
        <div class="memberphoto">
            <img v-if="inform.loanStatus!=0" :src="inform.loanPersonImg" alt="" @click="bigimg(inform.loanPersonImg)">
            <img v-if="inform.loanStatus==0" :src="require('../../image/moren.png')" alt="" >
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
                <span class="w60 tr displayib">姓名:</span>
                <span>{{inform.realName}}</span>
            </li>
            <li>
                <span class="w60 tr displayib">性别:</span>
                <span >{{inform.gender}}</span>
            </li>
            <li>
                <span class="w60 tr displayib">注册渠道:</span>
                <span >{{inform.channelCode}}</span>
            </li>
            <li>
                <span class="w60 tr displayib">邀请人:</span>
                <span class="">{{inform.loanInviterCode}}</span>
            </li>
            <li>
                <span class="w60 tr displayib">已邀请:</span>
                <span class="">{{inform.loanInviterCount}}</span>
            </li>
            <li>
                <span class="w50 tr displayib">注册:</span>
                <span>{{inform.registerTime}}</span>
            </li>
            <li>
                <span class="w60 tr displayib">银行卡:</span>
                <span class="">{{inform.bank}}</span>
                <!-- <span>6544 ****2210</span> -->
            </li>
        </ul>
    </div>
    </Col>
    <Col span="19">
    <div id="memberRight">
        <Tabs :animated="false" @on-click="tabswitch">
            <TabPane label="基本信息">
                <div class="basic">
                    <p >
                        <span>信贷员code:</span>
                        <span>{{inform.loanOfficerCode}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>所属区域:</span>
                        <span>{{inform.loanLocationName}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>所属公司:</span>
                        <span>{{inform.loanCompany}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>贷款额度:</span>
                        <span>{{inform.serviceAmount}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>贷款利率:</span>
                        <span>{{inform.serviceRate}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>擅长业务:</span>
                        <span v-for="item in inform.loanHaveType">{{item}} </span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>服务时间:</span>
                        <span>{{inform.serviceTime}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
                        <span>扣费设置:</span>
                        <span>{{inform.loanDeductionSet}}</span>
                    </p>
                    <p v-if="inform.loanStatus!=0" class="credit_prove">
                        <strong>身份证</strong>
                        <img :src='inform.loanIdcardFrontImg'  alt='' @click="bigimg(inform.loanIdcardFrontImg)">
                        <img :src='inform.loanIdcardBackImg'  alt='' @click="bigimg(inform.loanIdcardBackImg)"> 
                    </p>
                    <p v-if="inform.loanStatus!=0" class="credit_prove mt20 ">
                        <strong >工作证明</strong>
                        <img v-bind:src="inform.loanJobImg" alt=""  @click="bigimg(inform.loanJobImg)">
                    </p>

                    <p>
                        <span>认证状态:</span>
                        <span v-if="inform.loanStatus==0&&inform.loanBaseStatus==0">未填基本信息</span>
                        <span v-if="inform.loanStatus==0&&inform.loanBaseStatus==1">未填实名信息</span>
                        <span v-else-if="inform.loanStatus==1">待审核</span>
                        <span v-else-if="inform.loanStatus==2">已入驻</span>
                        <span v-else-if="inform.loanStatus==3">审核失败</span>
                    </p>
                    <p v-if="inform.loanStatus!=0 && inform.loanStatusMsg!=''">
                        <span>拒绝原因:</span>
                        <span>{{inform.loanStatusMsg}}</span>
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

                    <!-- v-if="inform.loanStatus==1" -->
                    <div class="mt50 tc left" >
                        <Button v-if="inform.loanStatus==1" type="primary" @click="handleRender">认证审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button v-if="inform.loanStatus==1" type="primary" @click="refuse">认证审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" class="mr20" @click="journal">查看操作日志</Button>
                      <Button type="ghost" @click="ationreturn">返回</Button>
                        <!-- <Button type="ghost" @click="ationreturn">返回</Button> -->
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

                    <!-- 查看大图弹框 -->
                    <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000" >
                        <img :src=this.imglink alt="" style="width:970px;height:890px;">
                    </Modal>
                </div>
            </TabPane>
            <TabPane label="咨询订单记录">
                <Table border highlight-row :columns="columns1" :data="data1"></Table>
                <div class="tr mt15">
                  <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="抢单记录">
                <Table border highlight-row :columns="columns2" :data="data2"></Table>
                <div class="tr mt15">
                  <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="通话记录">
                <Table border highlight-row :columns="columns3" :data="data3"></Table>
                <div class="tr mt15">
                  <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="现金流水">
                <Table border highlight-row :columns="columns4" :data="data4"></Table>
                <div class="tr mt15">
                  <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="评价记录">
                <Table border highlight-row :columns="columns5" :data="data5"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
            <TabPane label="登录日志">
              <Table border highlight-row :columns="columns6" :data="data6"></Table>
                <div class="tr mt15">
                    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
            </TabPane>
        </Tabs>
    </div>
    </Col>
</Row>
</div>
</template>
<script>
export default {
  data () {
    return {
      imglink: '',
      modal11: false,
      img: [],
      formValidate: {
        name: ''
      },
      modal9: false,
      loading: true,
      introduce: true,
      tabnum: 0,
      total: 0,
      startRow: 1,
      endRow: 10,
      name: '',
      inform: {},
      ruleInline: {
        name: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { max: 50, message: '输入内容超限，请重新输入', trigger: 'blur' }
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
          minWidth:160,
          key: 'orderCreateTime'
        },
        {
          title: '订单编号',
          align: 'center',
          minWidth:160,
          key: 'orderNum'
        },
        {
          title: '客户姓名',
          align: 'center',
          minWidth:120,
          key: 'loanUserName'
        },
        {
          title: '手机',
          align: 'center',
          minWidth:110,
          key: 'loanUserPhone'
        },
        {
          title: '订单状态',
          align: 'center',
          minWidth:120,
          key: 'orderStatusName'
        },
        {
          title: '服务费用',
          align: 'center',
          minWidth:120,
          key: 'serviceCost'
        }
      ],
      data1: [],
      columns2: [
        {
          title: '抢单时间',
          align: 'center',
          minWidth:160,
          key: 'orderCreateTime'
        },
        {
          title: '抢单编号',
          align: 'center',
          minWidth:120,
          key: 'orderNum'
        },
        {
          title: '客户姓名',
          align: 'center',
          minWidth:120,
          key: 'loanUserName'
        },
        {
          title: '手机',
          align: 'center',
          minWidth:110,
          key: 'loanUserPhone'
        },
        {
          title: '抢单费用',
          align: 'center',
          minWidth:100,
          key: 'robbingAmount'
        },
        {
          title: '订单状态',
          align: 'center',
          minWidth:100,
          key: 'orderStatusName'
        }
      ],
      data2: [],
      columns3: [
        {
          title: '通话时间',
          align: 'center',
          minWidth:160,
          key: 'callEndTime'
        },
        {
          title: '手机',
          align: 'center',
          minWidth:110,
          key: 'calledMobileNo'
        },
        {
          title: '流水编号',
          align: 'center',
          minWidth:120,
          key: 'callNum'
        },
        {
          title: '通话时长',
          align: 'center',
          minWidth:160,
          key: 'duration'
        },
        {
          title: '通话扣费',
          align: 'center',
          minWidth:120,
          key: 'zanbiConsumer'
        }
      ],
      data3: [],
      columns4: [
        {
          title: '账户类型',
          align: 'center',
          minWidth:100,
          key: 'accountBizCode'
        },
        {
          title: '操作',
          align: 'center',
          minWidth:120,
          key: 'bizDesc'
        },
        {
          title: '金额 (元)',
          align: 'center',
          minWidth:120,
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
          title: '操作时间',
          align: 'center',
          minWidth:160,
          key: 'time'
        }
      ],
      data4: [],
      columns5: [
        {
          title: '评价时间',
          align: 'center',
          minWidth:160,
          key: 'commentCreateTime'
        },
        {
          title: '订单编号',
          align: 'center',
          minWidth:120,
          key: 'orderNum'
        },
        {
          title: '客户姓名',
          align: 'center',
          minWidth:100,
          key: 'loanUserName'
        },
        {
          title: '手机',
          align: 'center',
          minWidth:110,
          key: 'loanUserPhone'
        },
        {
          title: '评分',
          align: 'center',
          key: 'score',
          minWidth:150,
          render: (h, params) => {
            let listimg = []
            for (let i = 0; i < params.row.stars; i++) {
              listimg.push(
                h('img', {
                  attrs: {
                    src: require('../../image/pointed-star.png')
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
          minWidth:150,
          render: (h, params) => {
						return h('div', [
						h('span', {
							style: {
							display: 'inline-block',
							width: '100%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
							},
							domProps: {
							title: params.row.content
							}
						}, params.row.content)
						])
						}
        },
        {
          title: '评价状态',
          align: 'center',
          minWidth:120,
          render: (h, params) => {
            let isPass
            if (params.row.isPass  == 0) {
              isPass = '待审核'
            } else if(params.row.isPass  ==  1){
              isPass = '通过审核'
            } else if (params.row.isPass  ==  2) {
                isPass = '审核失败'
            }
            return h('div', [
              h('span', {}, isPass)
            ])
		      }
        }
      ],
      data5: [],
      columns6: [
        {
          title: '登录时间',
          align: 'center',
          key: 'loginTime'
        },
        {
          title: '登录端口',
          align: 'center',
          key: 'loginPort'
        },
        {
          title: '登录设备',
          align: 'center',
          key: 'loginDevice'
        }
      ],
      data6: []
    }
  },
  methods: {
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
        loanOfficerCode: this.inform.loanOfficerCode,
        accountStatus: num
      }
      this.http.post(BASE_URL + '/loan/officerInfo/updateOfficerInfoAccountStatusByCode', list)
        .then((resp) => {
          if (resp.code == 'success') {
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
            if (num != 1) {
              content = '<p>审核拒绝成功</p>'
              this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.$router.push({ path: './creditManagement' })
                },
              })
            }

          } else {
            this.$Message.info(resp.message)
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
            this.$router.push('./creditManagement')
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
    // 返回
    ationreturn () {
      window.history.go(-1)
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
        this.changeLoading()
        this.modal9 = false
        this.reviewthrough (0)
        this.formValidate.name = ''
      })
    },
    // 查看操作日志
    journal () {
      this.$router.push({ path: './operationLog?operationType=loanOfficerLog&loanOfficerCode='+ this.inform.loanOfficerCode })
    },
    // 基本信息
    information () {
      this.img = []
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
    },
    // 点击tab
    tabswitch (name) {
      this.tabnum = name
      console.log(name)
      if (name == 1) {
        this.consultation ()
      } else if (name == 2) {
        this.robbing ()
      } else if (name == 3) {
        this.conversation ()
      } else if (name == 4) {
        this.cashflow ()
      } else if (name == 5) {
        this.evaluationrecord ()
      } else if (name == 6) {
        this.logonlog ()
      }

    },
    pageChange (page) {
      this.startRow = page
      if (this.tabnum == 1) {
        this.consultation ()
      } else if (this.tabnum == 2) {
        this.robbing ()
      } else if (this.tabnum == 3) {
        this.conversation ()
      } else if (this.tabnum == 4) {
        this.cashflow ()
      } else if (this.tabnum == 5) {
        this.evaluationrecord ()
      } else if (this.tabnum == 6) {
        this.logonlog ()
      }
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      if (this.tabnum == 1) {
        this.consultation ()
      } else if (this.tabnum == 2) {
        this.robbing ()
      } else if (this.tabnum == 3) {
        this.conversation ()
      } else if (this.tabnum == 4) {
        this.cashflow ()
      } else if (this.tabnum == 5) {
        this.evaluationrecord ()
      } else if (this.tabnum == 6) {
        this.logonlog ()
      }
    },
    // 咨询订单
    consultation () {
      let list = {
        loanOfficerCode:this.$route.query.loanOfficerCode,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/baseOrder/queryOfficerBaseOrderConsultList', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data1 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 抢单
    robbing () {
      let llist = {
        loanOfficerCode:this.$route.query.loanOfficerCode,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/baseOrder/queryOfficerBaseOrderRobList', llist)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data2 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 通话记录
    conversation () {
      let llist = {
        loanOfficerCode:this.$route.query.loanOfficerCode,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/calllog/queryCallLogList', llist)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data3 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 现金流水
    cashflow () {
      let llist = {
        userCode:this.$route.query.loanOfficerCode,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/tradeFlow/qiangDanXia/list', llist)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data4 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 评价记录
    evaluationrecord () {
      let llist = {
        loanOfficerCode :this.$route.query.loanOfficerCode,
        // loanOfficerCode :'20180814134841070101576933983',
        pageNum: this.startRow,
        pageSize: this.endRow,
        searchValue :'',
        searchOptions : ''

      }
      this.http.post(BASE_URL + '/loan/comment/getCommentDetailsList', llist)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data5 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 登录日志
    logonlog () {
      let llist = {
        userCode:this.$route.query.loanOfficerCode,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/officerInfo/queryOfficerLoginLog', llist)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data6 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    bigimg(link){
      this.imglink = link
      this.modal11 = true
      // window.location.href = link
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
        width: 150px;
        height: 150px;
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
                height: 20px;
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
