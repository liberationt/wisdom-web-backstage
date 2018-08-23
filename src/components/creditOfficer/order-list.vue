<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false" @on-click="tabswitch">
        <TabPane label="咨询订单" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name1" placeholder="请输入关键字" style="width: 150px"></Input>           
            <Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model3" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="consultingorders">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>

        <TabPane label="抢单订单">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model4" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name2" placeholder="请输入关键字" style="width: 150px"></Input>           
            <Select v-model="model5" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model6" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="Orderrobbing">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>

        <TabPane label="未处理申诉订单" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model7" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name3" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model8" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model9" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="bidorder">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            <!-- <Button class="right mr100 w100" type="info" icon="ios-search">查询</Button> -->
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
export default {
  data () {   
    return {
      total: 0,
      startRow: 1,
      endRow: 10,
      nameval: 0,
      loading3: false,
      cityList: [],
      cityList1: [],
      cityList2: [],
      cityType1: [],
      cityType2: [],
      cityType3: [],
      status1: [],
      status2: [],
      status3: [],
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      model5: '',
      model6: '',
      model7: '',
      model8: '',
      model9: '',
      name1: '',
      name2: '',
      name3: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '订单时间',
          key: 'orderCreateTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderNum',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '区域',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            let pushStatus = params.row.orderCityNameFirst+' '+params.row.orderCityNameSecond            
            return h('div', [
              h('span', {}, pushStatus)
            ])
          }
        },
        {
          title: '客户姓名',
          key: 'loanUserName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '手机',
          key: 'loanUserPhone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'orderStatusName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'serviceCost',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
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
                      this.$router.push({ path: './detailsConsultation?orderCode='+params.row.orderCode })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: '抢单时间',
          key: 'orderCreateTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '抢单编号',
          key: 'orderNum',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '区域',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let pushStatus = params.row.orderCityNameFirst+' '+params.row.orderCityNameSecond            
            return h('div', [
              h('span', {}, pushStatus)
            ])
          }
        },
        {
          title: '客户姓名',
          key: 'loanUserName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '手机',
          key: 'loanUserPhone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '信贷员姓名',
          key: 'officerName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '信贷员手机号',
          key: 'officerPhone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '抢单费用',
          key: 'robbingAmount',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'orderStatusName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
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
                      this.$router.push({ path: './detailsRobbing?orderCode='+params.row.orderCode })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data7: [],
      columns9: [
        {
          title: '申述时间',
          key: 'orderComplainTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderNum',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '区域',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let pushStatus = params.row.orderCityNameFirst+' '+params.row.orderCityNameSecond            
            return h('div', [
              h('span', {}, pushStatus)
            ])
          }
        },
        {
          title: '信贷员',
          key: 'officerName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '信贷员手机',
          key: 'officerPhone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'loanUserName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '手机',
          key: 'loanUserPhone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'orderStatusDetailName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'serviceCost',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
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
                      this.$router.push({ path: './detailsComplaint?baseOrderCode='+params.row.orderCode })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data8: []
    }
  },
  methods: {
    pageChange (page) {
      this.startRow = page
      if (this.nameval == 0) {
        this.consultingorders ()
      } else if (this.nameval == 1) {
        
      } else if (this.nameval == 2) {
        this.bidorder ()
      }
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      if (this.nameval == 0) {
        this.consultingorders ()
      } else if (this.nameval == 1) {
        
      } else if (this.nameval == 2) {
        this.bidorder ()
      }
    },
    // 省
    created () {
    this.http.get('../../../static/city.json').then(data=>{
      this.cityType1 = data
      this.cityType2 = data
      this.cityType3 = data
    })
  },
  //省 
    citys(v){
      let data = {
        "data": v
      }
      this.httpshi(data)
      // this.model2 = v
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
        if (this.nameval == 0) {
          this.status1 = data.data
        } else if (this.nameval == 1) {
          this.status2 = data.data
        } else if (this.nameval == 2) {
          this.status3 = data.data
        }
        
      })
    },
    // 咨询订单
    consultingorders () {
      let list = {
        searchOptions :this.model1,
        searchValue :this.name1,
        orderAdCodeFirst :this.model2,
        orderAdCodeSecond : this.model3,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderConsultList', list)
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
    // 抢单列表
    Orderrobbing () {
      let list = {
        searchOptions :this.model4,
        searchValue :this.name2,
        orderAdCodeFirst :this.model5,
        orderAdCodeSecond : this.model6,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderRobList', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data7 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })

    },
    // 点击tab切换
    tabswitch (name) {
      this.total = 0
      this.startRow = 1
      this.endRow = 10
      this.nameval = name
      if (name == 2) {
        this.bidorder ()    
      } else if (name == 0) {
        this.consultingorders ()
      } else if (name == 1) {
        this.Orderrobbing ()
      }

    },
    // 申述订单
    bidorder () {
      this.loading3 = true
      let list = {
        searchOptions :this.model7,
        searchValue :this.name3,
        orderAdCodeFirst :this.model8,
        orderAdCodeSecond : this.model9,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderComplainList', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.data8 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow = Math.ceil(resp.data.startRow/this.endRow)
            this.loading3 = false
          } else {
            this.$Message.info(resp.message)
            this.loading3 = false
          }
        })
        .catch(() => {
        })

    }
  },
  mounted () {
    this.created ()
    this.consultingorders ()
    this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderComplainListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data.searchOptions
      } else {
        this.$Message.info(resp.message)
      }
    })    
    .catch(() => {
    })
    // 咨询订单查询条件
    this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderConsultListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList1 = resp.data.searchOptions
      } else {
        this.$Message.info(resp.message)
      }
    })
    .catch(() => {
    })
    // 抢单订单查询条件
    this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderRobListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList2 = resp.data.searchOptions
      } else {
        this.$Message.info(resp.message)
      }
    })
    .catch(() => {
    })

  }
}
</script>
<style lang="less" scoped>
</style>
