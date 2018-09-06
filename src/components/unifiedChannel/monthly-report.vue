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
            <Select v-model="model3" placeholder="请选择" style="width:150px;">
              <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道名称:</span>
            <Select v-model="model4" placeholder="请选择" style="width:150px;">
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
        <Table class="tabgrouping" border highlight-row :columns="columns7" :data="data6"></Table>
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
      value2:'',
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
          title: '日期',
          key: 'phoneNumber',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '供应商',
          key: 'memberName',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            return h('div',{style: {padding:0},}, [
                h('span', {
                    style: {
                        display: 'block',
                        width: '100%',
                        height:'40px',
                        lineHeight: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderBottom:'1px solid #e9eaec'
                    },
                    domProps: {
                        title: params.row.phoneNumber
                    }
                }, params.row.phoneNumber),
                h('span', {
                    style: {
                        display: 'block',
                        width: '100%',
                        height:'40px',
                        lineHeight: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        
                    },
                    domProps: {
                        title: params.row.phoneNumber
                    }
                }, params.row.phoneNumber)
            ])
          }

        },
        {
          title: '渠道',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
          let realStatus
            if (params.row.realStatus == 0) {
              realStatus = '未实名'
            } else if (params.row.realStatus == 1) {
              realStatus = params.row.realName
            } 
            return h('div', [
              h('span', {}, realStatus)
            ])
          }
        },
        {
          title: '折扣系数',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: 'PV',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: 'UV',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '注册',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '注册转化率',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '累计激活',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '累计激活转化率',
          key: 'object',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
          let accountStatus
            if (params.row.accountStatus == 0) {
              accountStatus = '冻结'
            } else if (params.row.accountStatus == 1) {
              accountStatus = '正常'
            } 
            return h('div', [
              h('span', {}, accountStatus)
            ])
          }
        },
        {
          title: '累计申请',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '累计申请转化率',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
    
      ],
      data6: []
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
