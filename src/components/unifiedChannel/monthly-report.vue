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
            <Select v-model="curBusinessCode" placeholder="请选择" style="width:150px" @on-change="businessChange">
              <Option v-for="item in businessList" :value="item.businessCode" :key="item.businessCode">{{item.businessName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="curSuppliersCode" placeholder="请选择" style="width:150px;" @on-change="suppliersChange">
              <Option v-for="item in suppliersList" :value="item.suppliersCode" :key="item.suppliersCode">{{item.suppliersName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道名称:</span>
            <Select v-model="curChannelCode" placeholder="请选择" style="width:150px;" @on-change="channelChange">
              <Option v-for="item in channelList" :value="item.suppliersBusinessChannelCode" :key="item.suppliersBusinessChannelCode">{{ item.channelName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">时间:</span>
            <DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                        style="width: 150px"></DatePicker>
          </li>
        </ul>
      </div>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="queryReportList">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button class=" ml10" type="primary">导出</Button>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table class="tabgrouping" border highlight-row :columns="columns7" :data="data6"></Table>
      <!-- <Table class="tabgrouping"  :columns="columns7" :data="data6"></Table> -->
      <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange"
              @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading3: false,
        businessList: [],
        suppliersList: [],
        channelList: [],
        curBusinessCode: null,
        curSuppliersCode: null,
        curChannelCode: null,
        curBusinessKey:'',
        beginTime: '',
        endTime: '',
        account: [],
        total: 0,
        startRow: 1,
        endRow: 10,

        columns7: [
          {
            title: '日期',
            key: 'reportDate',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '供应商',
            key: 'memberName',
            minWidth: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', {style: {padding: 0},}, [
                h('span', {
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid #e9eaec'
                  },
                  domProps: {
                    title: params.row.phoneNumber
                  }
                }, params.row.phoneNumber),
                h('span', {
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '40px',
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
        reportList: []
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
      rowClassName(row, index) {
        if (index == 0) {
          return 'demo-table-info-row';
        } else if (index == 2) {
          return 'demo-table-info-cell-name';
        }
        return ''
      },

      // 时间选择
      beginTimeChange(value, data) {
        this.beginTime = value
      },
      endTimeChange(value, data) {
        this.endTime = value
      },
      timeFormat(date, num) {
        let y = date.getFullYear(); //年
        let m = date.getMonth() + 1; //月
        let d = date.getDate(); //日
        if (num == 1) {
          d = date.getDate() - 1
        }
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      },
      //查询业务列表
      queryBusiness() {
        this.http.post(BASE_URL + '/promotion/business/queryListByUserCode', {}).then((resp) => {
          if (resp.code == 'success') {
            this.businessList = resp.data
            if(this.businessList && this.businessList.length > 0){
              this.curBusinessCode = resp.data[0].businessCode
            }
            this.queryReportList();
          }
        }).catch(() => {
        })
      },
      // 选择业务后查询供应商
      businessChange(businessCode) {
        this.curBusinessCode = businessCode
        this.suppliersList= []
        this.channelList = []
        this.http.post(BASE_URL + '/promotion/suppliersBusiness/queryListByBusinessCode', {
          businessCode: businessCode
        }).then((resp) => {
          if (resp.code == 'success') {
            this.suppliersList = resp.data
          }
        }).catch(() => {
        })
      },
      //选择供应商后查询渠道
      suppliersChange(suppliersCode) {
        this.curSuppliersCode = suppliersCode
        this.channelList = []
        this.http.post(BASE_URL + '/promotion/suppliersBusinessChannel/queryChannelListBySupplierBusiness', {
          suppliersCode: suppliersCode,
          businessCode: this.curBusinessCode
        }).then((resp) => {
          if (resp.code == 'success') {
            this.channelList = resp.data
          }
        }).catch(() => {
        })
      },
      //选择渠道后
      channelChange(channelCode){
        this.curChannelCode = channelCode;
      },
      // 列表查询
      queryReportList() {
        this.loading3 = true
        let date1 = Date.parse(new Date(this.beginTime)) / 1000
        let date2 = Date.parse(new Date(this.endTime)) / 1000
        if (date1 > date2) {
          this.loading3 = false
          this.$Modal.warning({
            title: '提示',
            content: '<p>开始时间不得大于结束时间</p>'
          })
          return false
        }
        let params = {
          startDate: this.beginTime,
          endDate: this.endTime,
          businessCode: this.curBusinessCode,
          suppliersCode: this.curSuppliersCode,
          suppliersBusinessChannelCode: this.curChannelCode
        }
        this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersMonthReport', params).then((resp) => {
          this.loading3 = false
            if (resp.code == 'success') {
              this.reportList = resp.data
            }
          }).catch(() => {
            this.loading3 = false
          })
      },
      // 导出
      exports() {
        this.loading2 = true;
        let httpUrl = BASE_URL + '/promotion/suppliersBusinessReport/exportSuppliersMonthReport'
        let formData = new FormData()
        formData.append("beginTime", this.value1)
        formData.append("endTime", this.value2)
        formData.append("businessCode", this.model1)
        formData.append("suppliersCode", this.model3)
        formData.append("suppliersBusinessChannelCode", this.model4)
        utils.exporttable(httpUrl, utils.getlocal('token'), formData, e => {
          if (e == true) {
            this.loading2 = false;
          }
        })
      }
    },
    mounted() {
      // 获取当前时间
      var date=new Date();
      this.endTime = this.timeFormat(date,1)
      date.setDate(1);
      this.beginTime = this.timeFormat(date,0)
      this.queryBusiness()
    }
  }
</script>
<style lang="less" scoped>
  #application_table {
    margin-top: 20px;
  }

  .ivu-table-cell {
    padding: 0
  }


</style>
