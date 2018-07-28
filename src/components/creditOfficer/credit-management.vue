<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false" @on-click="labell1">
        <TabPane :label="label" >
            <div class="clearfix" >
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modell" @on-change="cityh" placeholder="请选择市" style="width:200px;margin-left:50px">
                <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane :label="label2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="注册无资料" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷员列表" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
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
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷机构" >
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
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
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
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      label2: h => {
        return h('div', [
          h('span', '资料修改待审核'),
          h('Badge', {
            props: {
              count: 3
            }
          })
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
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      name: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
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
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center'
        },
        {
          title: '所属区域',
          key: 'region',
          align: 'center'
        },
        {
          title: '贷款额度',
          key: 'quota',
          align: 'center'
        },
        {
          title: '贷款类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '证件',
          key: 'certificates',
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
                      this.$router.push({ path: './creditInformation' })
                    }
                  }
                },
                '查看审核'
              )
            ])
          }
        }
      ],
      data6: [
        {
          id: '110101',
          phone: '139****5599',
          name: '李明明',
          gender: '男',
          region: '上海',
          quota: '3万-30万',
          type: '车抵贷 房抵贷 保单贷',
          certificates: '已上传',
          time: '2018-03-29 15:12:34'
        }
      ],
      columns8: [
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
          title: '姓名',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '提交修改时间',
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
                      this.$router.push({ path: './revisionReview' })
                    }
                  }
                },
                '查看审核'
              )
            ])
          }
        }
      ],
      data7: [
        {
          id: 'A1111',
          phone: '135****7766',
          plantime: '唐哈哈',
          time: '2018-03-29 15:12:34'
        }
      ],
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
      data8: [
        {
          id: 'A11111',
          phone: '135****7766',
          type: '未填基本信息',
          time: '2018-03-29 15:12:34'
        }
      ],
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
      modell : ''
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
      this.startRow = page
      this.labell1(3)
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.endRow = limit
      console.log(limit)
      this.params.limit = limit
    },
    addManage () {
      this.$router.push({ path: './addMechanism' })
    },
    post(httpUrl,params,num) {
      this.http.post(httpUrl,params).then(data=>{
        console.log(num)
        console.log(data)
        if(data.code == 'success'){
          if(num == 3){
            this.data9 = data.data.dataList
            this.total = parseInt(data.data.total) 
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //tab 栏
    labell1(name) {
      let parameter = {
          pageSize : this.endRow,
          pageNum : this.startRow,
      }
      let data
      //入驻待审核
      if(name == 0){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerAdmissionList',data,0)
      }
      //资料改带审核
      if(name == 1){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerDataWaitCheckList',data,1)
      }
      //注册无资料
      if(name == 2){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/officer/queryOfficerNoneDataList',data,2)
      }
      //信贷员列表
      if(name == 3){
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
      if(name == 4){
        data = Object.assign({

        },parameter)
        this.post(BASE_URL + '/loan/creditInstitutions/queryCreditInstitutionsList',data,4)
      }
      
    },
    //省 
    citys(v){
      console.log(v)
      let data = {
        "data": {
          "data": v
        }
      }
      this.httpshi(data)
    },
    //市
    cityh(v){
      console.log(v)
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
        console.log(data)
      })
    }
  },
  created() {
    this.http.get('../../../static/city.json').then(data=>{
      this.cityType = data
      this.cityType1 = data
      this.cityType2 = data
    })
  }
}
</script>
<style lang="less" scoped>
</style>
