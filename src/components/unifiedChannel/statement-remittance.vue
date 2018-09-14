<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;报表</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <span class="ml20">应用名称:</span>
            <Select v-model="model1" placeholder="请选择" style="width:150px" @on-change="applicationsel">
              <Option v-for="item in cityList" :value="item.businessCode" :key="item.businessCode">{{ item.businessName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:150px;" @on-change="suppliersel">
              <Option v-for="item in reaName" :value="item.suppliersCode" :key="item.suppliersCode">{{ item.suppliersName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道:</span>
            <Select v-model="model4" placeholder="选择渠道" style="width:150px;">
              <Option v-for="item in account" :value="item.suppliersBusinessChannelCode" :key="item.suppliersBusinessChannelCode">{{ item.channelName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">时间:</span>
            <DatePicker type="date" :value="value1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :value="value2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
          </li>
        </ul>     
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>
      <Button type="info" class=" ml20 w100" :loading="loading3" @click="inquire">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button type="primary" class="ml10 " :loading="loading2" @click="exports">
        <span v-if="!loading2">导出</span>
        <span v-else>请稍等...</span>
      </Button>
    </div>
    <div id="application_table " class="contentcss mt10">
        <Table class="monthlytotal" :row-class-name="tabonerowClassName" border highlight-row :show-header="false" :data="data6"  :columns="columns7"></Table>
        <Table :row-class-name="rowClassName" border highlight-row :columns="columnstotal" :data="data7" size="small" ref="table" class="dailylist"></Table>   
      <!-- <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div> -->
    </div>
    
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      value1:'',
      value2: '',
      businessCode:'',
      businessKey:'',
      loading2: false,
      loading3: false,
      cityList: [],
      reaName: [],
      account: [],
      registerTime: [],
      model1: 'name',
      model3: '',
      model4: '',
      model5: '',
      name: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
            "title": "业务月度总计",
            align: 'center',
            "key": "channelName",
            "minWidth": 300
        },
        {
            "title": "--",
            align: 'center',
            "key": "discountFact",
            "minWidth": 150
        },
        {
            "title": "111123",
            align: 'center',
            "key": "pv",
            "minWidth": 100
        },
        {
            "title": "105642",
            align: 'center',
            "key": "uv",
            "minWidth": 100
        },
        {
            "title": "88991(79802)",
            align: 'center',
            "key": "registerCount",
            "minWidth": 120
        },
        {
            "title": "62%",
            align: 'center',
            "key": "registerRate",
            "minWidth": 120
        },
        {
            "title": "70123(68554)",
            align: 'center',
            "key": "activeCount",
            "minWidth": 120
        },
        {
            "title": "33%",
            align: 'center',
            "key": "activeRate",
            "minWidth": 150
        },
        {
            "title": "10119(8846)",
            align: 'center',
            "key": "applyCount",
            "minWidth": 120
        },
        {
            "title": "12%",
            align: 'center',
            "key": "allApplyCount",
            "minWidth": 150
        }
      ],
      data6:[],
      columnstotal:[],
      columns8: [
        {
            "title": "渠道",
            "key": "channelName",
            align: 'center',
            "minWidth": 300
        },
        {
            "title": "折扣系数",
            "key": "discountFact",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "PV",
            "key": "pv",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "UV",
            "key": "uv",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "注册",
            "key": "registerCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "注册转化率",
            "key": "registerRate",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计激活",
            "key": "activeCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计激活转化率",
            "key": "activeRate",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "累计申请",
            "key": "applyCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计申请转化率",
            "key": "allApplyCount",
            align: 'center',
            "minWidth": 150
        }
    ],
    columns9: [
        {
            "title": "渠道",
            "key": "channelName",
            align: 'center',
            "minWidth": 300
        },
        {
            "title": "折扣系数",
            "key": "discountFact",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "PV",
            "key": "pv",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "UV",
            "key": "uv",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "注册",
            "key": "registerCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "注册转化率",
            "key": "registerRate",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计激活",
            "key": "activeCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计激活转化率",
            "key": "activeRate",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "累计认证",
            "key": "applyCount",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计认证转化率",
            "key": "allApplyCount",
            align: 'center',
            "minWidth": 150
        }
    ],
    data7: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        // console.log(page)
        this.startRow = page
        this.inquire()
	},
    pagesizechange(page) {
      // console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
     // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    timeFormat(date,num) {
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1; //月
      let d = date.getDate(); //日
      if (num == 1) {
        d = date.getDate()-1
      }
      m=m<10?"0"+m:m;
      d=d<10?"0"+d:d;
      return y + "-" + m + "-" + d;
    },
    rowClassName (row, index) {
        if (index == 0) {
            return 'demo-table-info-row';
        }
        return '';
    },
    tabonerowClassName (row, index) {
        if (index == 0) {
            return 'demo-table-info-one-row';
        }
        return '';
    },  
    // 应用名称改变
    applicationsel (val) {      
      this.businessCode = val
      this.supplierlist (val)
      this.model3 = ''
      this.model4 = ''
      this.cityList.forEach(element => {
        if (element.businessCode == val) {
          this.businessKey = element.businessKey
        }      
      });


    },
    suppliersel (val) {
      this.channel (val)
      this.model4 = ''
    },
    channel (code) {
      let list = {
        suppliersCode:code,
        businessCode:this.businessCode
      }
      this.http.post(BASE_URL + '/promotion/suppliersBusinessChannel/queryChannelListBySupplierBusiness', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.account = resp.data
        } else {
          
        }
      })
      .catch(() => {     
      })
    },
    // 供应商列表
    supplierlist (code) {
      let list = {
        businessCode:code
      }
      this.http.post(BASE_URL + '/promotion/suppliersBusiness/queryListByBusinessCodeManager', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.reaName = resp.data
        } else {
          
        }
      })
      .catch(() => {     
      })
    },
    // 列表查询
    inquire (num) {
    this.loading3 = true
    let date1 = Date.parse(new Date(this.value1))/1000
    let date2 = Date.parse(new Date(this.value2))/1000
    if (date1 > date2) {
      this.loading3 = false
      this.$Modal.warning({
        title: '提示',
        content: '<p>开始时间不得大于结束时间</p>'
      })
      return false
    }
    if (this.businessKey == 'QDX') {
      this.columnstotal = this.columns9
    } else if (this.businessKey == 'HZ') {
      this.columnstotal = this.columns8
    }
    let list = {
      businessCode : this.model1,
      suppliersCode : this.model3,
      suppliersBusinessChannelCode : this.model4,
      startDate  : this.value1,
      endDate  : this.value2
    }
    this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersCollectReport', list)
    .then((resp) => {
      this.loading3 = false
      if (resp.code == 'success') {
        //组装数据
        this.data7 = []
        this.data6 = []
        if (JSON.stringify(resp.data) != "{}") {
          this.data6.push({
            "channelName": "业务月度总计",
            "discountFact": '',
            "pv": resp.data.pv,
            "uv": resp.data.uv,
            "registerCount": resp.data.registerCount + this.parseNum(resp.data.discountRegisterCount),
            "registerRate": resp.data.registerRate + '%',
            "activeCount": resp.data.activeCount,
            "activeRate": resp.data.activeRate +'%',
            "applyCount": resp.data.applyCount,
            "allApplyCount": resp.data.applyRate+'%'
          })  
        }
        if (resp.data.suppliersDayReportResList && resp.data.suppliersDayReportResList.length > 0) {
          resp.data.suppliersDayReportResList.forEach((item) => {
            //供应商名称
            this.data7.push({
              channelName: item.suppliersName + '     平均激活转化率：' + item.activeRate,
            })
            // item.channelReportList.forEach((item) => {

            // })
            //总计
            this.data7.push({
              "channelName": "总计",
              "discountFact": '',
              "pv": item.allPv,
              "uv": item.allUv,
              "registerCount": item.allRegisterCount + this.parseNum(item.allDisCountRegisterCount),
              "registerRate": item.allRegisterFact + '%',
              "activeCount": item.allActiveCount,
              "activeRate": item.allActiveFact+'%',
              "applyCount": item.allApplyCount,
              "allApplyCount": item.allTotalApplyFact+'%'
            })

            if (item.channelReportList && item.channelReportList.length > 0) {
              item.channelReportList.forEach((channelReport) => {
                //具体渠道数据
                this.data7.push({
                  "channelName": channelReport.channelName,
                  "discountFact": channelReport.discountFact + '%',
                  "pv": channelReport.pv + this.parseNum(channelReport.discountPv),
                  "uv": channelReport.uv + this.parseNum(channelReport.discountUv),
                  "registerCount": channelReport.registerCount + this.parseNum(channelReport.discountRegisterCount),
                  "registerRate": channelReport.registerRate + '%',
                  "activeCount": channelReport.activeCount,
                  "activeRate": channelReport.allActiveRate +'%',
                  "applyCount": channelReport.applyCount,
                  "allApplyCount": channelReport.allApplyRate+'%'
                })
              })
            }
          })
        }
      } else {
        this.loading3 = false
      }
    })
    .catch(() => {
      this.loading3 = false
    })
    },
    // 导出
    exports () {
      this.loading2 = true;
      let httpUrl = BASE_URL+'/promotion/suppliersBusinessReport/exportSuppliersCollectReport'
      let formData = new FormData()
      formData.append("businessCode",this.model1)
      formData.append("suppliersCode",this.model3)
      formData.append("suppliersBusinessChannelCode",this.model4)
      formData.append("startDate",this.value1)
      formData.append("endDate",this.value2)
      utils.exporttable(httpUrl, utils.getlocal('token'),formData, e => {
        if(e == true ){
          this.loading2 = false;
        }
      })
    },
    parseNum(num) {
      if (num == 0) {
        return '（--）'
      } else {
        return '（' + num + '）'
      }
    }
  },
  mounted () {  
    this.http.post(BASE_URL + '/promotion/business/queryListByManager', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data
        this.model1 = resp.data[0].businessCode
        this.businessKey = resp.data[0].businessKey
      } else {
      }
    })
    .catch(() => {
    })
    // 获取当前时间
    var date=new Date();
    this.value2 = this.timeFormat(date,1)
    date.setDate(1);
    this.value1 = this.timeFormat(date,0)
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
.ivu-table-cell{
    padding: 0
}


</style>