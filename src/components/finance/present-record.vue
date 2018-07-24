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
                                <Input v-model="value" placeholder="请输入关键字"  style="width: 180px;margin-left:-5px"></Input>
                                <span class="lh32 ml50">申请时间:</span>
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                </div>
                                <div class="right">
                                    <Button type="primary" @click="auditedQuery">查询</Button>
                                <Button type="primary" class="ml10" @click="auditedExport">导出</Button>
                                </div>
                            </div>
                            <p class="mt15">
                              共<strong class="red">2</strong>条记录，提现金额<strong class="red">1020.00</strong>元
                            </p>
                            <div class="mt15">
                                <Table border :columns="columns7" :data="data6"></Table>
                            </div>
                            <Modal
                                title="审核驳回"
                                v-model="modal8"
                                class-name="vertical-center-modal"
                                width="400"
                                :mask-closable="false">
                                <div>
                                    <span><em class="red">*</em>驳回原因:</span>
                                    <Input v-model="value8" style="width:300px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入驳回原因"></Input>
                                </div>
                            </Modal>
                            <div class="tr mt15">
                                <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
                            </div>
                        </TabPane>
                        <TabPane label="异常待审核" name="1">
                            <div class="mt50 clearfix">
                                <div class="left">
                                    <Select v-model="model1" style="width:120px">
                                    <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="value1" placeholder="请输入关键字"  style="width: 180px;margin-left:-5px"></Input>
                                <span class="lh32 ml50">申请时间:</span>
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                </div>
                                <div class="right">
                                    <Button type="primary">查询</Button>
                                <Button type="primary" class="ml10">导出</Button>
                                </div>
                            </div>
                            <p class="mt15">
                              共<strong class="red">2</strong>条记录，提现金额<strong class="red">1020.00</strong>元
                            </p>
                            <div class="mt15">
                                <Table border :columns="columns8" :data="data7"></Table>
                            </div>
                            <div class="tr mt15">
                                <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
                            </div>
                        </TabPane>
                        <TabPane label="已审核" name="2">
                            <div class="mt50 clearfix">
                                <div class="left">
                                    <Select v-model="model1" style="width:120px">
                                    <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="value2" placeholder="请输入关键字"  style="width: 180px;margin-left:-5px"></Input>
                                <span class="lh32 ml50">申请时间:</span>
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <DatePicker type="date" confirm placeholder="" style="width: 200px"></DatePicker>
                                </div>
                                <div class="right">
                                    <Button type="primary">查询</Button>
                                <Button type="primary" class="ml10">导出</Button>
                                </div>
                            </div>
                            <p class="mt15">
                              共<strong class="red">2</strong>条记录，提现金额<strong class="red">1020.00</strong>元
                            </p>
                            <div class="mt15">
                                <Table border :columns="columns9" :data="data8"></Table>
                            </div>
                            <div class="tr mt15">
                                <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
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
      modal8: false,
      value8: '',
      value: '',
      value1: '',
      value2: '',
      value3: 0,
      tabs: [
        '抢单侠',
        '华赞金服',
        '百姓钱袋'
      ],
      cityList: [],
      model1: '',
      columns7: [
        {
          title: '提现编号',
          key: 'identifier',
          align: 'center'
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
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          width: 150,
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
                    this.show(params.index)
                  }
                }
              }, '已打款'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal8 = true
                  }
                }
              }, '驳回')
            ])
          }
        }
      ],
      data6: [
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
    remove (index) {
      this.data6.splice(index, 1)
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    // 待审核查询
    auditedQuery () {
      let audited = {
        recordType: 0,
        phone: "",
        name: "",
        beginTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      }
      this.http.post(BASE_URL + '/loan/withdraw/query/list',  audited)
      .then((resp) => {
        console.log(resp)
        if (resp.code == 'success') {

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

        } else {

        }
      })
      .catch(() => {
      })
    },
    recordType (name) {
      this.value3 = name
    }

  },
  mounted () {
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
