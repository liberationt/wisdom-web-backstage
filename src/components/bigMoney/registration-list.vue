<template>
    <div>
        <div class="navigation">
            <p>
                <span>注册列表</span>
            </p>
        </div>
        <div class="titregist">
            <div class="registrations" v-for="(item, index) in numregistrations" :key="index" :class="item.color">
                <div>
                    <p>{{item.totalnum}}</p>
                </div>
                <div>
                    <span>第一步注册人数:<strong>{{item.onenum}}</strong>人</span><br>
                    <span>第二步注册人数:<strong>{{item.twonum}}</strong>人</span>
                </div>
            </div>
        </div>
        <div class="mt50">
            <span class="w100 displayib tr">渠道:</span>
            <Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.channelCode" :key="item.channelCode">{{ item.channelName }}</Option>
            </Select>
            <span>供应商:</span>
            <Select v-model="model2" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.supplierCode" :key="item.supplierCode">{{ item.supplierName }}</Option>
            </Select>
            <span>步骤:</span>
            <Select v-model="model3" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <br>

            <span class="w100 displayib mt15 tr">注册时间:</span>
            <DatePicker type="date" @on-change="time1" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" @on-change="time2" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            <div class="clearfix mr20 mt20">
                <Button class="right w100" type="primary" @click="exports">导出</Button>
                <Button class="right mr20 w100" type="info" @click="registered">查询</Button>
            </div>
        </div>

        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-elevator show-sizer show-total></Page>
            </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      model2: '',
      model3: '',
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      numregistrations: [
        {
          onenum: 10,
          twonum: 10,
          color: 'blue1',
          totalnum: '当日注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'yellow1',
          totalnum: '本周注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'purple1',
          totalnum: '本月注册总人数'
        }
      ],
      cityList: [],
      cityList2: [],
      cityList3: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        }
      ],
      columns1: [
        // {
        //   title: 'NO',
        //   align: 'center',
        //   width: 100,
        //   key: 'no'
        // },
        // {
        //   title: 'UID',
        //   align: 'center',
        //   width: 100,
        //   key: 'did'
        // },      
        {
          title: '注册时间',
          align: 'center',
          width: 100,
          key: 'time'
        },
        {
          title: '供应商',
          align: 'center',
          width: 100,
          key: 'sid'
        },
        {
          title: '渠道',
          align: 'center',
          width: 100,
          key: 'cid'
        },
        {
          title: '步骤',
          align: 'center',
          width: 100,
          key: 'step'
        },
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'username'
        },
        {
          title: '手机号',
          align: 'center',
          width: 100,
          key: 'mobile'
        },
        {
          title: '生日',
          align: 'center',
          width: 100,
          key: 'appBirthday'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let appSex = ''
            if (params.row.appSex == '1') {
              appSex = '女'
            } else if (params.row.appSex == '0') {
              appSex = '男'
            } else {
              appSex = '其它'
            }
            return h('div', [
              h('span', {
              }, appSex)
            ])
          }
        },
        {
          title: '年龄',
          align: 'center',
          width: 100,
          key: 'age'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        {
          title: 'M城市',
          align: 'center',
          width: 100,
          key: 'mobileCityCode'
        },
        {
          title: '借贷金额',
          align: 'center',
          width: 100,
          key: 'loanMoney'
        },
        {
          title: '社保',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let security = ''
            if (params.row.security == '1') {
              security = '有'
            }else {
              security = '无'
            }
            return h('div', [
              h('span', {
              }, security)
            ])
          }
        },
        {
          title: '公积金',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let fund = ''
            if (params.row.fund == '1') {
              fund = '有'
            }else {
              fund = '无'
            }
            return h('div', [
              h('span', {
              }, fund)
            ])
          }
        },
        {
          title: '房',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let house = ''
            if (params.row.house == '1') {
              house = '有'
            }else {
              house = '无'
            }
            return h('div', [
              h('span', {
              }, house)
            ])
          }
        },
        {
          title: '房贷',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let hasHouseLoan = ''
            if (params.row.hasHouseLoan == '1') {
              hasHouseLoan = '有'
            }else {
              hasHouseLoan = '无'
            }
            return h('div', [
              h('span', {
              }, hasHouseLoan)
            ])
          }
        },
        {
          title: '车',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let car = ''
            if (params.row.car == '1') {
              car = '有'
            }else {
              car = '无'
            }
            return h('div', [
              h('span', {
              }, car)
            ])
          }
        },
        {
          title: '车贷',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let hasCarLoan = ''
            if (params.row.hasCarLoan == '1') {
              hasCarLoan = '有'
            }else {
              hasCarLoan = '无'
            }
            return h('div', [
              h('span', {
              }, hasCarLoan)
            ])
          }
        },
        {
          title: '寿险保单',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let policy = ''
            if (params.row.policy == '1') {
              policy = '有'
            }else {
              policy = '无'
            }
            return h('div', [
              h('span', {
              }, policy)
            ])
          }
        },
        {
          title: '微粒贷',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let weilidai = ''
            if (params.row.weilidai == '1') {
              weilidai = '有'
            }else {
              weilidai = '无'
            }
            return h('div', [
              h('span', {
              }, weilidai)
            ])
          }
        },
        {
          title: 'IP',
          align: 'center',
          width: 100,
          key: 'ip'
        }
      ],
      data1: []
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered()
    },
    pagesizechange (page) {
      this.endRow = page
      this.registered()
    },
    // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    registered () {
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let list = {
        cid: this.model1,
        sid: this.model2,
        step: this.model3,
        beginTime: this.value1,
        endTime: this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/dwqUser/registerList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data1 = resp.data.dataList
        this.total = resp.data.total
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
      } else {

      }
    })
    .catch(() => {
    })

    },
    // 导出
    exports () {
      window.open(BASE_URL + '/loan/dwqUser/export?step='+1)
    }
  },
  mounted () {
    // 注册人数数据
    this.http.post(BASE_URL + '/loan/dwqUser/registerCount', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.numregistrations[0].onenum = resp.data.nowFirstCount
        this.numregistrations[0].twonum = resp.data.nowSecondCount
        this.numregistrations[1].onenum = resp.data.firstWeekCount
        this.numregistrations[1].twonum = resp.data.secondWeekCount
        this.numregistrations[2].onenum = resp.data.firstYearCount
        this.numregistrations[2].twonum = resp.data.secondYearCount
      } else {

      }
    })
    .catch(() => {
    })
    // 渠道
    this.http.post(BASE_URL + '/loan/promotionChannel/queryAllList', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data
      } else {

      }
    })
    .catch(() => {
    })
     // 供应商
    this.http.post(BASE_URL + '/loan/promotionSupplier/queryAllList', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList2 = resp.data
      } else {

      }
    })
    .catch(() => {
    })

    // 列表初始化
    this.registered()
  }
}
</script>
<style lang="less" scoped>
.titregist{
    overflow: hidden;
    .registrations{
        width: 300px;
        height: 100px;
        float: left;
        margin-right: 20px;
        border-radius: 5px;
        overflow: hidden;
        color: #fff;
        div:first-child{
            width: 40%;
            float: left;
            line-height: 100px;
            p{
                text-align: center;
                font-size: 16px;
            }
        }
        div:last-child{
            width: 60%;
            float: left;
            text-align: center;
            height: 100%;
            display: table-cell;
            padding-top: 10px;
            // vertical-align: middle;
            span{
                vertical-align: middle;
                display: inline-block;
                line-height: 40px;
                // font-size: 16px
            }
        }
    }
}
.blue1{
     background: -webkit-linear-gradient(left, #49C1B5 , #73C784); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #49C1B5, #73C784); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #49C1B5, #73C784); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #49C1B5 , #73C784); /* 标准的语法（必须放在最后） */
}
.yellow1{
    background: -webkit-linear-gradient(left, #F0723D , #E4C54A); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #F0723D, #E4C54A); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #F0723D, #E4C54A); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #F0723D , #E4C54A); /* 标准的语法（必须放在最后） */
}
.purple1{
    background: -webkit-linear-gradient(left, #6F60E0 , #53D3C7); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6F60E0, #53D3C7); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6F60E0, #53D3C7); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6F60E0 , #53D3C7); /* 标准的语法（必须放在最后） */
}
</style>
