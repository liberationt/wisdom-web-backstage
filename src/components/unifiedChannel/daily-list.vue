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
            <Select v-model="model1" @on-change="applicationAlias" placeholder="请选择" style="width:150px">
              <Option v-for="item in cityList" :value="item.businessCode" :key="item.businessCode">{{ item.businessName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:150px;">
              <Option v-for="item in reaName" :value="item.suppliersCode" :key="item.suppliersCode">{{ item.suppliersName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">预警状态:</span>
            <Select v-model="model4" placeholder="选择预警状态" style="width:150px;">
              <Option v-for="item in account" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">时间:</span>
            <DatePicker type="date" :value="value1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
          </li>
        </ul>     
      </div>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquire">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button class=" ml10" type="primary" >导出</Button>
      <Button class=" ml10" shape="circle" icon="ios-cog-outline" @click="earlywarning">配置预警值</Button>
    </div>
    <div id="application_table " class="contentcss mt10">
        <Table :row-class-name="rowClassName" border highlight-row :columns="columns8" :data="data7" size="small" ref="table" class="dailylist"></Table>
      <!-- <Table class="tabgrouping"  :columns="columns7" :data="data6"></Table> -->
      <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1:'',
      loading3: false,
      cityList: [],
      reaName: [],
      account: [
        {value:0,label:'未预警'},
        {value:1,label:'预警'}
      ],
      registerTime: [],
      model1: '',
      model3: '',
      model4: '',
      model5: '',
      name: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      columns8: [
        {
            "title": "渠道",
            "key": "channel",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "折扣系数",
            "key": "coefficient",
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
            "key": "register",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "注册转化率",
            "key": "conversion",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "当日激活",
            "key": "sameday",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计激活",
            "key": "addup",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "当日激活转化率",
            "key": "active",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "累计激活转化率",
            "key": "day7",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "当日申请",
            "key": "day30",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "累计申请",
            "key": "tomorrow",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "当日申请转化率",
            "key": "day",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "累计申请转化率",
            "key": "week",
            align: 'center',
            "minWidth": 150
        }
    ],
    data7: [
        {
            "channel": "供应商名称",
            "coefficient": '平均激活转化率:12%',
            "pv": '',
            "uv": '',
            "register": '',
            "conversion": '',
            "sameday": '',
            "addup": '',
            "active": '',
            "day7": '',
            "day30": '',
            "tomorrow": '',
            "day": '',
            "week": ''
        },
        {
            "channel": "总计",
            "coefficient": 0,
            "pv": 7302,
            "uv": 5627,
            "register": 1563,
            "conversion": 4254,
            "sameday": 4254,
            "addup": 4254,
            "active": 1438,
            "day7": 274,
            "day30": '20%',
            "tomorrow": 1727,
            "day": 558,
            "week": 4440
        },        
        {
            "channel": "供应商名称",
            "coefficient": 0,
            "pv": 7302,
            "uv": 5627,
            "register": 1563,
            "conversion": 4254,
            "sameday": 4254,
            "addup": 4254,
            "active": 1438,
            "day7": 274,
            "day30": '30%',
            "tomorrow": 1727,
            "day": 558,
            "week": 4440
        }
    ]
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
    rowClassName (row, index) {
        if (index == 0) {
            return 'demo-table-info-row';
        } else if (index == 2) {
            return 'demo-table-info-cell-name';
        }
        return '';
    },
    // 时间
    time1(){

    },
    // 列表查询
    inquire (num) {
      this.loading3 = true            
      let list = {
        businessCode : this.model1,
        channelReportTime : this.value1,
        suppliersCode : this.model3,
        warningStatus : this.model4,
      }
      this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersDayReport', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.dataList
          this.total = resp.data.total
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          this.loading3 = false
        } else {
          this.loading3 = false
        }
      })
      .catch(() => {
        this.loading3 = false
      })
    },
    // 配置预警值
    earlywarning () {
      this.$router.push({ path: '/rangeConfiguration' })
    },
    applicationAlias(e){
      //供应商
      this.businessPost('/promotion/suppliersBusiness/queryListByBusinessCode',{businessCode:e},e=>{
        if (e.code == 'success') {
          console.log(e)
          this.reaName = e.data
        }
      })
    },
    //接口
    businessPost(httpUrl,data,callback){
      this.http.post(BASE_URL+httpUrl,data).then(data=>{
        callback && callback(data)
      }).catch(err=>{
        callback && callback(err)
      })
    },
  },
  mounted () {
    //应用名称
    this.businessPost('/promotion/business/queryListByManager',{},e=>{
      if (e.code == 'success') {
         this.cityList = e.data
      }
    })
    this.inquire ()
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