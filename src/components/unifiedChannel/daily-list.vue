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
              <Option v-for="item in cityList" :value="item.businessCode" :key="item.businessCode">{{ item.businessName
                }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:150px;">
              <Option v-for="item in reaName" :value="item.suppliersCode" :key="item.suppliersCode">{{
                item.suppliersName }}
              </Option>
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
            <DatePicker type="date" :value="value1" @on-change="time1" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
          </li>
        </ul>
      </div>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquire">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button class=" ml10" type="primary">导出</Button>
      <Button class=" ml10" shape="circle" icon="ios-cog-outline" @click="earlywarning">配置预警值</Button>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table :row-class-name="rowClassName" border highlight-row :columns="columns8" :data="data7" size="small"
             ref="table" class="dailylist"></Table>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: '',
        loading3: false,
        cityList: [],
        reaName: [],
        account: [
          {value: 0, label: '未预警'},
          {value: 1, label: '预警'}
        ],
        registerTime: [],
        model1: '',
        model3: '',
        model4: '',
        model5: '',
        name: '',
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
            "minWidth": 100
          },
          {
            "title": "PV",
            "key": "pv",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "UV",
            "key": "uv",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "注册",
            "key": "registerCount",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "注册转化率",
            "key": "registerRate",
            align: 'center',
            "minWidth": 100
          },
          {
            "title": "当日激活",
            "key": "activeCount",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "累计激活",
            "key": "allActiveCount",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "当日激活转化率",
            "key": "activeRate",
            align: 'center',
            "minWidth": 100
          },
          {
            "title": "累计激活转化率",
            "key": "allActiveRate",
            align: 'center',
            "minWidth": 100
          },
          {
            "title": "当日申请",
            "key": "applyCount",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "累计申请",
            "key": "allApplyCount",
            align: 'center',
            "minWidth": 150
          },
          {
            "title": "当日申请转化率",
            "key": "applyRate",
            align: 'center',
            "minWidth": 100
          },
          {
            "title": "累计申请转化率",
            "key": "allApplyRate",
            align: 'center',
            "minWidth": 100
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
      rowClassName(row, index) {
        if (index == 0) {
          return 'demo-table-info-row';
        } else if (index == 2) {
          return 'demo-table-info-cell-name';
        }
        return '';
      },
      // 时间
      time1(value, data) {
        this.value1 = value
      },
      // 列表查询
      inquire(num) {
        let params = {
          businessCode: this.model1,
          channelReportTime: this.value1,
          suppliersCode: this.model3,
          warningStatus: this.model4,
        }
        this.loading3 = true
        this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersDayReport', params).then((resp) => {
          this.loading3 = false
          if (resp.code == 'success') {
            //组装数据
            this.data7 = []
            if (resp.data && resp.data.length > 0) {
              resp.data.forEach((item) => {
                //供应商名称
                this.data7.push({
                  channelName: item.suppliersName + '     平均激活转化率：' + item.activeRate,
                })
                //总计
                this.data7.push({
                  "channelName": "总计",
                  "discountFact": '',
                  "pv": item.allPv + this.parseNum(item.allDisCountPv),
                  "uv": item.allUv + this.parseNum(item.allDisCountUv),
                  "registerCount": item.allRegisterCount + this.parseNum(item.allDisCountRegisterCount),
                  "registerRate": item.allRegisterFact + '%',
                  "activeCount": item.allActiveCount + this.parseNum(item.allDiscountActiveCount),
                  "allActiveCount": item.allTotalActiveCount + this.parseNum('待定'),
                  "activeRate": item.allActiveFact + '%',
                  "allActiveRate": '待定%',
                  "applyCount": item.allApplyCount + this.parseNum(item.allDiscountApplyCount),
                  "allApplyCount": item.allTotalApplyCount + this.parseNum('待定'),
                  "applyRate": item.allApplyFact + '%',
                  "allApplyRate": '待定%'
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
                      "activeCount": channelReport.activeCount + this.parseNum(channelReport.discountActiveCount),
                      "allActiveCount": channelReport.allActiveCount + this.parseNum(channelReport.allDiscountActiveCount),
                      "activeRate": channelReport.activeRate + '%',
                      "allActiveRate": channelReport.allActiveRate + '%',
                      "applyCount": channelReport.applyCount + this.parseNum(channelReport.discountApplyCount),
                      "allApplyCount": channelReport.allApplyCount + this.parseNum(channelReport.allDiscountApplyCount),
                      "applyRate": channelReport.applyRate + '%',
                      "allApplyRate": channelReport.allApplyRate + '%',
                    })
                  })
                }
              })
            }
          }
        }).catch(() => {
          this.loading3 = false
        })
      },
      parseNum(num) {
        if (num == 0) {
          return '（--）'
        } else {
          return '（' + num + '）'
        }
      },

      // 配置预警值
      earlywarning() {
        this.$router.push({path: '/rangeConfiguration'})
      },
      applicationAlias(e) {
        //供应商
        this.businessPost('/promotion/suppliersBusiness/queryListByBusinessCode', {businessCode: e}, e => {
          if (e.code == 'success') {
            console.log(e)
            this.reaName = e.data
          }
        })
      },
      //接口
      businessPost(httpUrl, data, callback) {
        this.http.post(BASE_URL + httpUrl, data).then(data => {
          callback && callback(data)
        }).catch(err => {
          callback && callback(err)
        })
      },
    },
    mounted() {
      //应用名称
      this.businessPost('/promotion/business/queryListByManager', {}, e => {
        if (e.code == 'success') {
          this.cityList = e.data
        }
      })
      this.inquire()
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
