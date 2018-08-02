<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false" @on-click="labell1" :value="tabs">
        <!-- 入驻待审核 -->
        <TabPane :label="label" name="tab1">
            <div class="clearfix" >
            <div class="left">
            <Select v-model="model1" style="width:100px" @on-change="label_option">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px">
            </Input>
            <Select v-model="model3" @on-change="label_state" placeholder="所属状态" style="width:200px;margin-left:20px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="models" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:20px">
                <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modelshi" @on-change="cityh" placeholder="请选择市" style="width:200px;">
                <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search" @click="label_query('warning')">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <!-- 资料待审核 -->
        <TabPane :label="label2" name="tab2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model2" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name1" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search" @click="label2_query('warning')">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="注册无资料" name="tab3">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model3" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷员列表" name="tab4">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model4" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model3" placeholder="上架状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model4" placeholder="服务介绍状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange4" @on-page-size-change="PageSizeChange4" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷机构" name="tab5">
            <div class="clearfix">
            <div class="left">
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="上架状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model4" placeholder="是否首页推荐" style="width:200px;margin-left:50px">
                <Option v-for="item in recommend" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <Button type="primary" class="mt15" shape="circle" icon="plus-round" @click="addManage">添加信贷机构</Button>
            <div id="application_table" class="mt15">
            <Table border :columns="columns11" :data="data10"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
export default {
  data () {
    return {
      label: h => {
        return h('div', [
          h('span', '入驻待审核'),
        ])
      },
      label2: h => {
        return h('div', [
          h('span', '资料待审核'),
        ])
      },
      cityList: [
        {
          value: '姓名',
          label: '姓名'
        },
        {
          value: '手机号',
          label: '手机号'
        }
      ],
      tabs: 'tab1',
      cityType: [],
      cityTypel: [],
      cityType1: [],
      cityType2:[],
      status: [
        {
          value: '已咨询',
          label: '已咨询'
        },
        {
          value: '待付款',
          label: '待付款'
        },
        {
          value: '待确认',
          label: '待确认'
        }
      ],
      sort: [
        {
          value: '注册时间排序',
          label: '注册时间排序'
        },
        {
          value: '登录时间排序',
          label: '登录时间排序'
        },
        {
          value: '余额排序',
          label: '余额排序'
        },
        {
          value: '咨询量排序',
          label: '咨询量排序'
        }
      ],
      recommend: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }
      ],
      model: '',
      model1: '手机号',
      model2: '手机号',
      model3: '手机号',
      model4: '手机号',
      model3: '',
      model4: '',
      name: '',
      name1: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: 'ID',
          key: 'dataId',
          minwidth: 60,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneMember',
          minwidth: 140,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'realName',
          minwidth: 80,
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          minwidth: 70,
          align: 'center'
        },
        {
          title: '所属区域',
          key: 'loanLocationName',
          minwidth: 150,
          align: 'center'
        },
        {
          title: '贷款额度',
          key: 'serviceAmount',
          minwidth: 150,
          align: 'center'
        },
        {
          title: '贷款类型',
          minwidth: 150,
          align: 'center',
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
              title: params.row.message
              }
            }, params.row.loanHaveType)
            ])
            }
        },
        {
          title: '证件',
          key: 'status',
          minwidth: 70,
          align: 'center'
        },
        {
          title: '审核状态',
          minwidth: 100,
          align: 'center',
          render: (h, params) => {
            let loanStatus = params.row.loanStatus;
            let status;
            if(loanStatus == 1){
              status = '待审核'
            } else if(loanStatus == 3){
              status = '审核失败'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  },
                },
                status
              )
            ])
          }
        },
        {
          title: '注册时间',
          key: 'registerTime',
          width: 155,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            // console.log(params)
            let status = params.row.loanStatus
            let statusn
            if(status ==  1){
              statusn = '审核'
            } else if(status == 3) {
              statusn = '详情'
            }
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                        if(status ==  1){
                          this.$router.push({ path: './creditInformation?loanOfficerCode='+params.row.loanOfficerCode })
                        } else if(status == 3) {
                          statusn = '详情'
                        }
                        
                    }
                  }
                },
                statusn
              )
            ])
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: 'ID',
          key: 'dataId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneMember',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'realName',
          align: 'center'
        },
        {
          title: '修改类型',
          key: 'auditType',
          align: 'center'
        },
        {
          title: '审核状态',
          // key: 'auditStatus',
          align: 'center',
          render: (h, params) => {
            let audstatus = params.row.auditStatus;
            let auditStatus;
            if(audstatus == 0){
              auditStatus = '待审核'
            } else if(audstatus == 2){
              auditStatus = '审核失败'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  },
                },
                auditStatus
              )
            ])
          }
        },
        {
          title: '提交修改时间',
          key: 'auditUpdateTime',
          align: 'center'
        },
        {
          title: '操作',
          // key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            let audstatus = params.row.auditStatus;
            let auditStatus;
            if(audstatus == 0){
              auditStatus = '审核'
            } else if(audstatus == 2){
              auditStatus = '查看'
            }
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      if(audstatus == 0){
                        auditStatus = '0'
                      } else if(audstatus == 2){
                        auditStatus = '2'
                      }
                      this.$router.push({ path: './revisionReview?auditCode='+params.row.auditCode+'&&auditStatus='+auditStatus }) //审核
                    }
                  }
                },
                auditStatus
              )
            ])
          }
        }
      ],
      data7: [],
      columns9: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '状态',
          key: 'type',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: './detailsComplaint' })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      data8: [],
      columns10: [
        {
          title: 'ID',
          key: 'dataId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneMember',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'realName',
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center'
        },
        {
          title: '所属区域',
          key: 'loanLocationName',
          align: 'center'
        },
        {
          title: '状态',
          key: 'servicePutawayStatus',
          align: 'center'
        },
        {
          title: '服务介绍初始状态',
          key: 'serviceIntroductionStatus',
          align: 'center'
        },
        {
          title: '已邀请人数',
          key: 'loanInviterCodeCount',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registerTime',
          align: 'center'
        },
        {
          title: '最后一次登录时间',
          key: 'lastLoginTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: 'creditInformation?loanOfficerCode='+ params.row.loanOfficerCode })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      data9: [],
      columns11: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'mechanism',
          align: 'center'
        },
        {
          title: '状态',
          key: 'type',
          align: 'center'
        },
        {
          title: '首页推荐',
          key: 'recommend',
          align: 'center'
        },
        {
          title: '产品数量',
          key: 'number',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除'),
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
                    this.$router.push({ path: './addMechanism' })
                  }
                }
              }, '编辑'),
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
                    this.$router.push({ path: './toExamine' })
                  }
                }
              }, '管理产品')
            ])
          }
        }
      ],
      data10: [
        {
          id: 'A11111',
          mechanism: '络慧科技',
          type: '上架',
          recommend: '是',
          number: '11',
          time: '2018-03-29 15:12:34'
        }
      ],
      startRow: 1,
      endRow: 10,
      total: 0,
      modell : '',
      labelstate: '',
      labelcitys:'',
      modelshi: '', // 市
      models: '', //省
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    pageChange (page) {
      console.log(page)
      this.startRow = page
      this.labell1(3)
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.endRow = limit
      // console.log(limit)
      this.params.limit = limit
    },
    // 信贷员列表分页
    pageChange4 (page) {
      console.log(page)
      this.startRow = page
      this.labell1('tab4')
      this.params.page = page
    },
    PageSizeChange4 (limit) {
      this.startRow = 1
      this.endRow = limit
      this.params.limit = limit
      this.labell1('tab4')
    },
    addManage () {
      this.$router.push({ path: './addMechanism' })
    },
    post(httpUrl,params,num) {
      this.http.post(httpUrl,params).then(data=>{
        // console.log(num)
        // console.log(data)
        if(data.code == 'success'){
          if(num == 0){
            this.data6 = data.data.dataList
            this.total = parseInt(data.data.total) 
            return false
          }
          if(num == 1){
            this.data7 = data.data.dataList
            this.total = parseInt(data.data.total) 
            return false
          }
          if(num == 2){
            this.data6 = data.data.dataList
            this.total = parseInt(data.data.total) 
            return false
          }
          if(num == 3){
            this.data9 = data.data.dataList
            this.total = parseInt(data.data.total) 
            return false 
          }
          
        } else {
          this.total = 0
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //tab 栏
    labell1(name) {
      // console.log(name)
      let parameter = {
        pageSize : this.endRow,
        pageNum : this.startRow,
      }
      let data
      //入驻待审核
      if(name == 'tab1'){
        data = Object.assign({
          searchOptions : this.name, //手机号or 姓名
          loanStatus : this.labelstate, //选择状态
          loanAdCodeFirst : this.labelcitys,//区域 省
          loanAdCodeSecond :'', //市
        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerAdmissionList',data,0)
      }
      //资料改带审核
      if(name == 'tab2'){
        // alert(33)
        data = Object.assign({
          searchOptions : '' //姓名or手机号
        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerDataWaitCheckList',data,1)
      }
      //注册无资料
      if(name == 'tab3'){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerNoneDataList',data,2)
      }
      //信贷员列表
      if(name == 'tab4'){
        data = Object.assign({
          queryStr : '',
          searchOptions : '',
          servicePutawayStatus : null,
          loanAdCodeFirst : '', //省编码
          loanAdCodeSecond : '', //市编码
          serviceIntroductionStatus : null //服务介绍状态
        },parameter)
        console.log(data)
        this.post(BASE_URL + '/loan/officer/queryOfficerManagerList',data,3)
        return false
      }
      //信贷机构
      if(name == 'tab5'){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/creditInstitutions/queryCreditInstitutionsList',data,4)
      }
      
    },
    //省 
    citys(v){
      // console.log(v)
      let data = {
        "data": v
      }
      this.httpshi(data)
      this.labelcitys = v
    },
    //市
    cityh(v){
      console.log(v)
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
        this.cityTypel = data.data
      })
    },
    // 入住待审核查询
    label_query(type) {
      if(this.model1 == '手机号'){
        if(this.name == "" || this.name.length < 3){
          this.phoneti(type)
        }
      }
    },
    // 入住 下拉框
    label_option(v){
      this.model1 = v
    },
    label_state(v){
      this.labelstate = v
    },
    //资料待审核
    label2_query(type) {
      if(this.model2 == '手机号'){
        if(this.name1 == "" || this.name1.length < 3){
          this.phoneti(type)
        }
      }
    },
    // 手机号提示
    phoneti(type){
      const title = '温馨提示';
      const content = '<p>手机号不能小于3位数</p>';
      switch (type) {
        case 'warning':
          this.$Modal.warning({
              title: title,
              content: content
          });
        break;
      }
    }
  },
  created() {
    if (this.$route.query.num == 1) {
      this.tabs = 'tab2'
      this.labell1('tab2')
    }
    this.http.get('../../../static/city.json').then(data=>{
      this.cityType = data
      this.cityType1 = data
      this.cityType2 = data
    })
    // 入住待审核
    this.labell1('tab1')
  }
}
</script>
<style lang="less" scoped>
.ivu-select-selection {
  margin-top: 10px;
}
</style>
