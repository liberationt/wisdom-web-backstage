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
            <Select v-model="model1" placeholder="请选择" style="width:150px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:150px;">
              <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
            <span>  -  </span>
            <DatePicker type="date" :value="value2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
          </li>
        </ul>     
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquire">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button class=" ml10" type="primary" >导出</Button>
    </div>
    <div id="application_table " class="contentcss mt10">
        <Table class="monthlytotal"  :columns="columns7"></Table>
        <Table :row-class-name="rowClassName" border highlight-row :columns="columns8" :data="data7" size="small" ref="table" class="dailylist"></Table>   
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
      value2: '',
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
            "minWidth": 120
        },
        {
            "title": "--",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "111123",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "105642",
            align: 'center',
            "minWidth": 100
        },
        {
            "title": "88991(79802)",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "62%",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "70123(68554)",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "33%",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "10119(8846)",
            align: 'center',
            "minWidth": 120
        },
        {
            "title": "12%",
            align: 'center',
            "minWidth": 150
        }
      ],
      columns8: [
        {
            "title": "渠道",
            "key": "channel",
            align: 'center',
            "minWidth": 120
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
            "minWidth": 120
        },
        {
            "title": "注册转化率",
            "key": "conversion",
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
            "title": "累计激活转化率",
            "key": "day7",
            align: 'center',
            "minWidth": 150
        },
        {
            "title": "累计申请",
            "key": "tomorrow",
            align: 'center',
            "minWidth": 120
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
            "addup": '',
            "day7": '',
            "tomorrow": '',
            "week": ''
        },
        {
            "channel": "总计",
            "coefficient": 0,
            "pv": 7302,
            "uv": 5627,
            "register": 1563,
            "conversion": 4254,
            "addup": 4254,
            "day7": 274,
            "tomorrow": 1727,
            "week": 4440
        },        
        {
            "channel": "供应商名称",
            "coefficient": 0,
            "pv": 7302,
            "uv": 5627,
            "register": 1563,
            "conversion": 4254,
            "addup": 4254,
            "day7": 274,
            "tomorrow": 1727,
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
        }
        return '';
    },
    // 列表查询
    inquire (num) {
    this.loading3 = true            
    let list = {
      searchOptions : this.model1,
      searchValue : this.name,
      realStatus : this.model3,
      accountStatus : this.model4,
      userTimeStatus : this.model5, 
      pageNum: this.startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberPageList', list)
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
    }
  },
  mounted () {
    this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data.searchOptions
        this.reaName = resp.data.realNameStatusOptions
        this.account = resp.data.accountStatusOptions
        this.registerTime = resp.data.userTimeOptions
      } else {
      }
    })
    .catch(() => {
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