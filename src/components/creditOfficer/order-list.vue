<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;订单管理</span>
      </p>
    </div>
    <div class="contentcss">
    <Tabs type="card" :animated="false" :value="value1" @on-click="tabswitch">
        <TabPane label="咨询订单" name="3">
            <div class="clearfix">
            <div class="left clearfix">
              <ul class="querysty">
                <li>
                  <Input class="mr20" v-for="item in cityList1" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
                  </Input>
                </li>
                <li>
                  <Select v-model="orderStatus" placeholder="订单状态" class="mr10" style="width:150px">
                    <Option v-for="item in orderStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li>
                  <Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:150px;">
                    <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="model3" placeholder="请选择市" style="width:150px;margin-left:10px">
                    <Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <span>订单时间：</span>
                  <DatePicker type="date" :options="options3" v-model="ConsultationTime" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" v-model="ConsultationEndTime" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <li>
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="consultingorders(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>
            </div>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>

        <TabPane label="抢单订单" name="4">
            <div class="clearfix">
            <div class="left clearfix">
              <ul class="querysty"> 
                <li>
                  <Input class="mr20" v-for="item in cityList2" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
                  </Input>
                </li>
                <li>
                  <Select v-model="orderType" placeholder="订单类型" class="mr10" style="width:150px">
                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li>
                  <Select v-model="orderStatusZ" placeholder="订单状态" class="mr10" style="width:150px">
                    <Option v-for="item in orderStatusListZ" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li>
                  <Select v-model="model5" @on-change="citys" placeholder="请选择省" style="width:150px;">
                    <Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="model6" placeholder="请选择市" style="width:150px;margin-left:10px">
                    <Option v-for="item in status2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <span>订单时间：</span>
                  <DatePicker type="date" :options="options3" v-model="sheetTime" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" v-model="sheetEndTime" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <li>
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="Orderrobbing(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>
            </div>
            
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>

        <TabPane label="未处理申诉订单" name="5">
            <div class="clearfix">
            <div class="left clearfix">
              <div class="left">
                <Input v-for="item in cityList" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px;margin-right:20px;margin-bottom:15px">
                </Input>
              </div>
            <!-- <Select v-model="model7" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name3" placeholder="请输入关键字" style="width: 150px"></Input> -->
            <Select v-model="model8" @on-change="citys" placeholder="请选择省" style="width:150px;">
                <Option v-for="item in cityType3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model9" class="mr20" placeholder="请选择市" style="width:150px;margin-left:10px">
                <Option v-for="item in status3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            
            </div>
            <Button type="info" class=" ml10 w90" :loading="loading3" @click="bidorder(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            
            <!-- <Button class="right mr100 w100" type="info" icon="ios-search">查询</Button> -->
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
    </div>
</div>
</template>
<script>
import utils from '../../utils/utils';
export default {
  data () {   
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      ConsultationTime: "",
      ConsultationEndTime:"",
      sheetTime:"",
      sheetEndTime: "",
      orderType: "",
      orderTypeList:[],
      orderStatusZ: "",
      orderStatusListZ:[],
      total: 0,
      startRow: 1,
      endRow: 10,
      nameval: '3',
      value1:'3',
      loading3: false,
      orderStatus: "",
      orderStatusList:[],
      cityList: [],
      cityList1: [],
      cityList2: [],
      cityType1: [],
      cityType2: [],
      cityType3: [],
      status1: [],
      status2: [],
      status3: [],
      model1: 'mobile',
      model2: '',
      model3: '',
      model4: 'mobile',
      model5: '',
      model6: '',
      model7: 'mobile',
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
          fixed: 'right',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            let arr = []
            arr.push(
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
            )
            if(params.row.orderStatusName=='已咨询'){
              arr.push(h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.orderStatusName != "已咨询" ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.$router.push('/cancellation?orderCode='+params.row.orderCode+'&num=3')
                    }
                  }
                },
                '退单'
              ))
            }
            return h('div', arr)
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
          title: '订单类型',
          key: 'goodStatusName',
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
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            let pushStatus = []
            let payType = params.row.payType
            let row = params.row
            if (row.activityAmount == row.robbingAmount) {
              pushStatus.push (
                h('span', {}, payType == 0 ?  row.robbingAmount :  row.robbingAmount+'/'+ row.ticketNumber+'张券')
              )
            } else {
              pushStatus.push (
                h('span', {style: {color: '#BEBEBE'}}, row.robbingAmount),
                h('span', {}, '/'),
                h('span', {}, payType == 0? row.activityAmount : row.activityAmount+'/'+ row.ticketNumber+'张券'),
              )
            }         
            return h('div', pushStatus)
          }
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
          fixed: 'right',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            let arr = []
            arr.push(
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
              ),
            )
            if(params.row.orderStatusName=='已咨询'){
              arr.push(
                h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.orderStatusName != "已咨询" ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.$router.push('/cancellation?orderCode='+params.row.orderCode+'&num=4')
                    }
                  }
                },
                '退单'
              )
              )
            }
            return h('div',arr)
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
        // {
        //   title: '订单状态',
        //   key: 'orderStatusDetailName',
        //   minWidth: 100,
        //   align: 'center'
        // },
        {
          title: '服务费用',
          key: 'serviceCost',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 160,
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
      if (this.nameval == '3') {
        this.consultingorders (this.startRow)
      } else if (this.nameval == '4') {
        this.Orderrobbing (this.startRow)
      } else if (this.nameval == '5') {
        this.bidorder (this.startRow)
      }
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      if (this.nameval == '3') {
        this.consultingorders (1)
        return false
      } else if (this.nameval == '4') {
        this.Orderrobbing (1)
        return false
      } else if (this.nameval == '5') {
        this.bidorder (1)
        return false
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
        if (this.nameval == '3') {
          this.status1 = data.data
        } else if (this.nameval == '4') {
          this.status2 = data.data
        } else if (this.nameval == '5') {
          this.status3 = data.data
        }
        
      })
    },
    // 咨询订单
    consultingorders (startRow) { 
      let array = []
      this.cityList1.forEach(element => {
          let obj = new Object ()
          obj.label = element.value
          if (element.code == null) {
              obj.value = ''
          } else {
              obj.value = element.code
          }
          array.push(obj)
      });
      let date1 = Date.parse(new Date(this.ConsultationTime == "" ? "" : utils.formatDate(this.ConsultationTime,'yyyy-MM-dd hh:mm:ss')));
      let date2 = Date.parse(new Date(this.ConsultationEndTime == "" ? "" : utils.formatDate(this.ConsultationEndTime,'yyyy-MM-dd 23:59:59')));
      if (date1 > date2) {
        this.isDatetime()
        return false
      }
      let list = {
        searchOptions :array,
        // searchValue :this.name1,
        orderAdCodeFirst :this.model2,
        orderAdCodeSecond : this.model3,
        status : this.orderStatus == "''" ? "" : this.orderStatus,
        pageNum: startRow,
        pageSize: this.endRow,
        beginTime :date1,
        endTime : date2
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
    Orderrobbing (startRow) {
      let array = []
      this.cityList2.forEach(element => {
          let obj = new Object ()
          obj.label = element.value
          if (element.code == null) {
              obj.value = ''
          } else {
              obj.value = element.code
          }
          array.push(obj)
      });
      let date1 = Date.parse(new Date(this.sheetTime == "" ? "" : utils.formatDate(this.sheetTime,'yyyy-MM-dd hh:mm:ss')));
      let date2 = Date.parse(new Date(this.sheetEndTime == "" ? "" : utils.formatDate(this.sheetEndTime,'yyyy-MM-dd 23:59:59')));
      if (date1 > date2) {
        this.isDatetime()
        return false
      }
      let list = {
        searchOptions :array,
        // searchValue :this.name2,
        orderAdCodeFirst :this.model5,
        orderAdCodeSecond : this.model6,
        goodStatus: this.orderType == "''" ? "" : this.orderType, //订单类型
        status: this.orderStatusZ == "''" ? "" : this.orderStatusZ, // 订单状态
        pageNum: startRow,
        pageSize: this.endRow,
        beginTime :date1,
        endTime : date2
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
      // 时间还原
      this.ConsultationTime= ""
      this.sheetTime =""
      this.ConsultationEndTime= ""
      this.sheetEndTime = ""
      this.total = 0
      this.startRow = 1
      this.endRow = 10
      this.nameval = name
      if (name == '5') {
        this.bidorder (1)    
      } else if (name == '3') {
        this.consultingorders (1)
      } else if (name == '4') {
        this.Orderrobbing (1)
      }

    },
    // 申述订单
    bidorder (startRow) {
      let array = []
      this.cityList.forEach(element => {
          let obj = new Object ()
          obj.label = element.value
          if (element.code == null) {
              obj.value = ''
          } else {
              obj.value = element.code
          }
          array.push(obj)
      });
      this.loading3 = true
      let list = {
        searchOptions :array,
        // searchValue :this.name3,
        orderAdCodeFirst :this.model8,
        orderAdCodeSecond : this.model9,
        pageNum: startRow,
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

    },
    // 时间校验提示框
    isDatetime(){
      this.$Modal.warning({
        title: "提示",
        content: "<p>开始时间不得大于结束时间</p>"
      });
    }
  },
  mounted () {
    // if (this.$route.query.num) {
    //   this.value1 = this.$route.query.num
    // }  
    
    this.created ()
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
        const {searchOptions,statusOptions } = resp.data
        this.cityList1 = searchOptions
        this.orderStatusList = statusOptions
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
        const {goodSatusBeans,statusOptions,searchOptions } = resp.data
        this.orderTypeList = goodSatusBeans
        this.orderStatusListZ = statusOptions
        this.cityList2 = searchOptions
      } else {
        this.$Message.info(resp.message)
      }
    })
    .catch(() => {
    })
    this.consultingorders (1)  
    // if (this.value1 == '5') {
    //   this.bidorder(1)
    // }
    // if (this.value1 == '4') {
    //   this.Orderrobbing(1)
    // }

  }
}
</script>
<style lang="less" scoped>
</style>
