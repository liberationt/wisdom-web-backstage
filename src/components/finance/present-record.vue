<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;财务&nbsp;>&nbsp;提现管理</span>
      </p>
    </div>
    <div >
        <Tabs type="card" :animated="false" @on-click="handleReset('formValidate')">
            <TabPane v-for="(tab, index) in tabs" :key="index" :label="tab" >
                <div class="application_state">
                    <Tabs value="0" :animated="false" @on-click="recordType">
                        <TabPane label="待审核" name="0">
                            <div class="mt50 clearfix">
                                <div class="left">
                                    <Select v-model="model1" style="width:120px">
                                    <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="value" placeholder="请输入关键字"  style="width: 180px;margin-left:-3px"></Input>
                                <span class="lh32 ml50">申请时间:</span>
                                <DatePicker type="date" :value="timeval1" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
                                  <span>  -  </span>
                                <DatePicker type="date" :value="timeval2" @on-change="time2" placeholder="结束时间" style="width: 200px"></DatePicker>
                                </div>
                                <div class="right">
                                  <Button type="info" class="left mr20 w100" :loading="loading3" @click="auditedQuery">
                                    <span v-if="!loading3">查询</span>
                                    <span v-else>查询</span>
                                  </Button>
                                <Button type="primary" class="ml10 w100" @click="auditedExport">导出</Button>
                                </div>
                            </div>
                            <p class="mt15">
                              共<strong class="red">{{total}}</strong>条记录，提现金额<strong class="red">{{totalAmount}}</strong>元
                            </p>
                            <div class="mt15">
                                <Table border :columns="columns7" :data="data6"></Table>
                            </div>
                            <Modal
                                title="审核驳回"
                                v-model="modal8"
                                @on-ok="deterRefuse('formValidate')"
                                @on-cancel="cancelqdx"
                                class-name="vertical-center-modal"
                                width="550"
                                :loading="loading"
                                :mask-closable="false">
                                <div class="newtype_file mt15 mb15">
                                    <Form ref="formValidate" :model="formValidate" :rules="ruleInline" :label-width="80">
                                        <FormItem label="驳回原因:" prop="name">
                                          <Input  v-model="formValidate.name" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写驳回原因"></Input>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Modal>
                            <div class="tr mt15">
                                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                            </div>
                        </TabPane>

                        <TabPane label="已审核" name="1">
                            <div class="mt50 clearfix">
                                <div class="left">
                                    <Select v-model="model2" style="width:120px">
                                    <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="value2" placeholder="请输入关键字"  style="width: 180px;margin-left:-5px"></Input>
                                <span class="lh32 ml50">申请时间:</span>
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                </div>
                                <div class="right">
                                  <Button type="info" class="w100">查询</Button>
                                  <Button type="primary" class="ml10 w100">导出</Button>
                                </div>
                            </div>
                            <p class="mt15">
                              共<strong class="red">2</strong>条记录，提现金额<strong class="red">1020.00</strong>元
                            </p>
                            <div class="mt15">
                                <Table border :columns="columns9" :data="data8"></Table>
                            </div>
                            <div class="tr mt15">
                                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </TabPane>
        </Tabs>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      model2: '',
      modal8: false,
      loading3: false,
      value8: '',
      value: '',
      value1: '',
      value2: '',
      value3: 0,
      timeval1: '',
      timeval2: '',
      startRow: 1,
      endRow: 10,
      total: 0,
      totalAmount: 0,
      loading: true,
      rejectcode: '',
      rejectorder: '',
      tabs: [
        '抢单侠',
        // '华赞金服',
        // '百姓钱袋'
      ],
      formValidate: {
        name: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { max: 50, message: '输入内容超限，请重新输入', trigger: 'blur' }
        ]
      },
      cityList: [],      
      columns7: [
        {
          title: '提现编号',
          key: 'customerOrderNo',
          minWidth:150,
          align: 'center'
        },
        {
          title: '申请用户',
          align: 'center',
          minWidth:120,
          key: 'username'
        },
        {
          title: '账户状态',
          align: 'center',
          minWidth:120,
          key: 'accountStatus',
          render: (h, params) => {
            let accountStatus
            if (params.row.accountStatus == 1) {
              accountStatus = '正常'
            } else if (params.row.accountStatus == 0) {
              accountStatus = '冻结'
            } else  {
              accountStatus = ''
            }
            return h('div', [
              h('span', {
              }, accountStatus )
            ])
          }

        },
        {
          title: '提现金额',
          align: 'center',
          minWidth:100,
          key: 'amount'
        },
        {
          title: '到账金额',
          align: 'center',
          minWidth:100,
          key: 'realAmount'
        },
        {
          title: '当月提现总金额',
          align: 'center',
          minWidth:150,
          key: 'monthTotalAmount'
        },
        {
          title: '提现账户',
          align: 'center',
          minWidth:180,
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, params.row.bankName ),
              h('br', {
              } ),
              h('span', {
              }, params.row.bankcardNo )
            ])
          }
        },
        {
          title: '申请时间',
          align: 'center',
          minWidth:160,
          key: 'applyTime'
        },
        {
          title: '状态',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let withdrawStatus
            if (params.row.withdrawStatus == 1) {
              withdrawStatus = '待提现'
            } else if (params.row.withdrawStatus == 2) {
              withdrawStatus = '提现中'
            } else if (params.row.withdrawStatus == 5) {
              withdrawStatus = '待审核'
            }
            return h('div', [
              h('span', {
              }, withdrawStatus )
            ])
          }

        },
        {
          title: '备注说明',
          align: 'center',
          minWidth:200,
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
							title: params.row.description
							}
						}, params.row.description)
						])
						}
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.confirmthrough(params.row.accountCode, params.row.customerOrderNo)
                  }
                }
              }, '确认通过'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal8 = true
                    this.rejectcode = params.row.accountCode
                    this.rejectorder = params.row.customerOrderNo
                  }
                }
              }, '驳回')
            ])
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: '提现编号',
          align: 'center',
          key: 'identifier'
        },
        {
          title: '申请用户',
          align: 'center',
          key: 'user'
        },
        {
          title: '提现金额',
          align: 'center',
          key: 'putmonery'
        },
        {
          title: '到账金额',
          align: 'center',
          key: 'transferMonery'
        },
        {
          title: '当月提现总金额',
          align: 'center',
          key: 'totalMonery'
        },
        {
          title: '提现账户',
          align: 'center',
          key: 'account'
        },
        {
          title: '申请时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '状态',
          align: 'center',
          key: 'type'
        },
        {
          title: '异常说明',
          align: 'center',
          key: 'explain'
        }
      ],
      data7: [
        {
          identifier: 'TXQD201804010001',
          user: '139****5599 周*明',
          putmonery: '400:00',
          transferMonery: '300:00',
          totalMonery: '600:00',
          account: '招商银行 6626****7899',
          time: '2018-03-29 15:12:34',
          type: '待审核',
          explain: '当月累计提现总额超过500元'
        },
        {
          identifier: 'TXQD201804010001',
          user: '139****5599 周*明',
          putmonery: '400:00',
          transferMonery: '300:00',
          totalMonery: '600:00',
          account: '招商银行 6626****7899',
          time: '2018-03-29 15:12:34',
          type: '待审核',
          explain: '当月累计提现总额超过500元'
        }
      ],
      columns9: [
        {
          title: '提现编号',
          align: 'center',
          key: 'identifier'
        },
        {
          title: '申请用户',
          align: 'center',
          key: 'user'
        },
        {
          title: '提现金额',
          align: 'center',
          key: 'putmonery'
        },
        {
          title: '到账金额',
          align: 'center',
          key: 'transferMonery'
        },
        {
          title: '当月提现总金额',
          align: 'center',
          key: 'totalMonery'
        },
        {
          title: '提现账户',
          align: 'center',
          key: 'account'
        },
        {
          title: '备注',
          align: 'center',
          key: 'remarks'
        },
        {
          title: '申请时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '跑批时间',
          align: 'center',
          key: 'batchTime'
        },
        {
          title: '状态',
          align: 'center',
          key: 'type'
        },
        {
          title: '失败',
          align: 'center',
          key: 'explain'
        }
      ],
      data8: [
        {
          identifier: 'TXQD201804010001',
          user: '139****5599 周*明',
          putmonery: '400:00',
          transferMonery: '300:00',
          totalMonery: '600:00',
          account: '招商银行 6626****7899',
          remarks: '',
          time: '2018-03-29 15:12:34',
          batchTime: '2018-03-29 15:12:34',
          type: '待审核',
          explain: '银行账户信息不对'
        },
        {
          identifier: 'TXQD201804010001',
          user: '139****5599 周*明',
          putmonery: '400:00',
          transferMonery: '300:00',
          totalMonery: '600:00',
          account: '招商银行 6626****7899',
          remarks: '',
          time: '2018-03-29 15:12:34',
          batchTime: '2018-03-29 15:12:34',
          type: '待审核',
          explain: '银行账户信息不对'
        }
      ]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].forEach((item, index) => {
        this.$refs[name][index].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      })
    },
    handleReset (name) {
      this.$refs[name].forEach((item, index) => {
        this.$refs[name][index].resetFields()
      })
    },
    show (index) {
      this.$Modal.confirm({
        title: '',
        content: '<p>确定要打款吗？</p>',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.$Message.info('Clicked ok')
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    pageChange (page) {
      this.startRow = page
      this.auditedQuery()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.auditedQuery()
    },
    // 待审核查询
    auditedQuery () {
      this.loading3 = true
      let date1 = Date.parse(new Date(this.timeval1))/1000
      let date2 = Date.parse(new Date(this.timeval2))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '申请时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let phone
      let name
      if (this.model1 == 'mobile') {
        phone = this.value
        name = ''
      } else if (this.model1 == 'name') {
        name = this.value
        phone = ''
      }
      let audited = {
        recordType: 0,
        phone: phone,
        name: name,
        beginTime: this.timeval1,
        endTime: this.timeval2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/withdraw/query/list',  audited)
      .then((resp) => {
        console.log(resp)
        if (resp.code == 'success') {
          this.data6 = resp.data.dataList
          this.totalAmount = resp.data.totalAmount
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          this.loading3 = false
        } else {
          this.loading3 = false 
        }
      })
      .catch(() => {
      })
    },
    // 确认通过
    confirmthrough (code, orderno) {
      this.$Modal.confirm({
          title: '确认通过',
          content: '<p>确认要通过吗?</p>',
          onOk: () => {
            let list = {
              accountCode :code,
              customerOrderNo :orderno
            }
            this.http.post(BASE_URL + '/loan/withdraw/pass',  list)
            .then((resp) => {
              console.log(resp)
              if (resp.code == 'success') {
                const title = '确认通过'
                let content = '<p>已通过</p>'
                this.$Modal.success({
                  title: title,
                  content: content
                })
              } else {
                
              }
            })
            .catch(() => {
            })
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
    cancelqdx () {
      this.formValidate.name = ''
    },
    // 驳回
    deterRefuse (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        }
        this.changeLoading()
        this.modal8 = false
        this.stayreject ()
        this.formValidate.name = ''       
      })
    },
    stayreject () {
      let list = {
        accountCode: this.rejectcode,
        customerOrderNo: this.rejectorder,
        reason: this.formValidate.name
      }
      this.http.post(BASE_URL + '/loan/withdraw/reject',  list)
      .then((resp) => {
        console.log(resp)
        if (resp.code == 'success') {
          const title = '审核驳回'
          let content = '<p>驳回成功</p>'
          this.$Modal.success({
            title: title,
            content: content
          })

        } else {

        }
      })
      .catch(() => {
      })

    },
    // 待审核导出
    auditedExport () {
      let audited = {
        recordType: this.value3,
        phone: "",
        name: "",
        beginTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      }
      // let link = "recordType=0&phone=''&name=''&beginTime=''&endTime=''&pageNum=1&pageSize=10"
      this.http.get(BASE_URL + '/loan/withdraw/exportToExcel',  JSON.stringify(audited))
      .then((resp) => {
        console.log(resp)
        if (resp.code == 'success') {
          this.data6 = resp.data.dataList
          this.loading3 = false
        } else {
          this.loading3 = false

        }
      })
      .catch(() => {
      })
    },
    recordType (name) {
      if (name == 0) {
        this.auditedQuery ()
      } else {

      }
      this.value3 = name
    },
    // 时间判断
    time1 (value, data) {
      this.timeval1 = value
    },
    time2 (value, data) {
      this.timeval2 = value
    },

  },
  mounted () {
    this.auditedQuery()
    this.http.post(BASE_URL + '/loan/withdraw/getQueryOption',  {})
      .then((resp) => {
        console.log(resp)
        if (resp.code == 'success') {
          this.cityList = resp.data.searchOptionList

        } else {

        }
      })
      .catch(() => {
      })
  }
}
</script>
<style lang="less" scoped>
.application_state{
    padding: 0 50px
}
.ivu-modal{
    top: 300px!important;
}
</style>
