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
            <Select v-model="businessCode" placeholder="请选择" style="width:150px" @on-change="businessChange">
              <Option v-for="item in businessList" :value="item.businessCode" :key="item.businessCode">
                {{ item.businessName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="suppliersCode" placeholder="请选择供应商" style="width:150px;" @on-change="supplierChange">
              <Option v-for="item in suppliersList" :value="item.suppliersCode" :key="item.suppliersCode">
                {{ item.suppliersName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道:</span>
            <Select v-model="channelCode" placeholder="选择渠道" style="width:150px;" @on-change="channelChange">
              <Option v-for="item in channelList" :value="item.suppliersBusinessChannelCode"
                      :key="item.suppliersBusinessChannelCode">
                {{ item.channelName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">时间:</span>
            <DatePicker type="date" :value="beginTime" @on-change="time1" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :value="endTime" @on-change="time2" placeholder="结束时间"
                        style="width: 150px"></DatePicker>
          </li>
        </ul>
      </div>
      <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button type="primary" class="ml10 " :loading="loading2" @click="exports">
        <span v-if="!loading2">导出</span>
        <span v-else>请稍等...</span>
      </Button>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table :row-class-name="rowClassName" border highlight-row :columns="columnList" :data="reportList" size="small"
             ref="table" class="dailylist"></Table>
    </div>

  </div>
</template>
<script>
  import utils from '../../utils/utils'

  export default {
    data() {
      return {
        loading2: false,
        loading3: false,

        beginTime: '',
        endTime: '',
        businessCode: '',
        businessKey: '',
        suppliersCode: '',
        channelCode: '',
        businessList: [],
        suppliersList: [],
        channelList: [],

        columnList: [],
        reportList: [],
      }
    },

    methods: {
      rowClassName(row, index) {
        if (row.isSingleLine && row.needWeight) {
          return 'demo-table-info-row demo-table-info-row-fontWeight'
        } else if (row.isSingleLine) {
          return 'demo-table-info-row'
        } else if (row.needWeight) {
          return 'demo-table-info-row-fontWeight'
        } else {
          return ''
        }
      },

      getColumnList(businessKey) {
        let columnList = [
          this.getColumnItem('渠道', 'channelName', 200, (h, param) => {
            return this.renderColumn(h, param.row.channelName, param.row.columnWeight)
          }),
          this.getColumnItem('折扣系数', 'discountFact', 200),
          this.getColumnItem('PV', 'pv', 100),
          this.getColumnItem('UV', 'uv', 100),
          this.getColumnItem('注册', 'registerCount', 150),
          this.getColumnItem('注册转化率', 'registerRate', 100),
          this.getColumnItem('累计激活', 'activeCount', 100),
          this.getColumnItem('累计激活转化率', 'activeRate', 100),
          this.getColumnItem(businessKey == 'HZ' ? '累计申请' : '累计认证', 'applyCount', 100),
          this.getColumnItem(businessKey == 'HZ' ? '累计申请转化率' : '累计认证转化率', 'applyRate', 100)
        ]
        return columnList
      },

      getColumnItem(title, key, width, render) {
        return {
          title: title,
          key: key,
          minWidth: width,
          align: 'center',
          render: render
        }
      },

      renderColumn(h, text, columnWeight) {
        return h("div", [
          h(
            "span",
            {
              style: {
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: columnWeight ? '20px' : ''
              }
            },
            text
          )
        ]);
      },

      // 时间判断
      time1(value, data) {
        this.beginTime = value
      },
      time2(value, data) {
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
      queryBusiness(callback) {
        this.http.post(BASE_URL + '/promotion/business/queryListByManager', {}).then((resp) => {
          if (resp.code == 'success') {
            this.businessList = resp.data
            if (resp.data && resp.data.length > 0) {
              this.businessCode = resp.data[0].businessCode
              this.businessKey = resp.data[0].businessKey
              callback && callback()
            }
          }
        }).catch(() => {
        })
      },
      // 选择业务后查询供应商
      businessChange(businessCode) {
        this.businessCode = businessCode
        this.suppliersList = []
        this.channelList = []
        this.businessList.forEach(element => {
          if (element.businessCode == businessCode) {
            this.businessKey = element.businessKey
          }
        })
        this.http.post(BASE_URL + '/promotion/suppliersBusiness/queryListByBusinessCodeManager', {
          businessCode: businessCode
        }).then((resp) => {
          if (resp.code == 'success') {
            this.suppliersList = resp.data
          }
        }).catch(() => {
        })
      },
      //查渠道
      supplierChange(suppliersCode) {
        this.suppliersCode = suppliersCode
        this.channelList = []
        this.http.post(BASE_URL + '/promotion/suppliersBusinessChannel/queryChannelListBySupplierBusiness', {
          suppliersCode: suppliersCode,
          businessCode: this.businessCode
        }).then((resp) => {
          if (resp.code == 'success') {
            this.channelList = resp.data
          }
        }).catch(() => {
        })
      },
      //选择渠道后
      channelChange(channelCode) {
        this.channelCode = channelCode;
      },
      // 列表查询
      queryReportList() {
        let date1 = Date.parse(new Date(this.beginTime)) / 1000
        let date2 = Date.parse(new Date(this.endTime)) / 1000
        if (date1 > date2) {
          this.$Modal.warning({
            title: '提示',
            content: '<p>开始时间不得大于结束时间</p>'
          })
          return false
        }

        this.columnList = this.getColumnList(this.businessKey)
        let list = {
          businessCode: this.businessCode,
          suppliersCode: this.suppliersCode,
          suppliersBusinessChannelCode: this.channelCode,
          startDate: this.beginTime,
          endDate: this.endTime
        }
        this.loading3 = true
        this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersCollectReport', list).then((resp) => {
          this.loading3 = false
          if (resp.code == 'success') {
            this.reportList = []
            if (resp.data) {
              //汇总数据
              this.reportList.push({
                "columnWeight": true,
                "needWeight": true,
                "channelName": "业务月度总计",
                "discountFact": '',
                "pv": resp.data.pv,
                "uv": resp.data.uv,
                "registerCount": this.parseNum(resp.data.registerCount, resp.data.discountRegisterCount),
                "registerRate": resp.data.registerRate + '%',
                "activeCount": resp.data.activeCount,
                "activeRate": resp.data.activeRate + '%',
                "applyCount": this.businessKey == 'HZ' ? resp.data.applyCount : resp.data.authCount,
                "applyRate": this.businessKey == 'HZ' ? resp.data.applyRate + '%' : resp.data.authRate + '%'
              })
              //分割线
              this.reportList.push({
                "needWeight": true,
                "isSingleLine": true
              })
              if (resp.data.suppliersDayReportResList && resp.data.suppliersDayReportResList.length > 0) {
                resp.data.suppliersDayReportResList.forEach((item) => {
                  //供应商名称
                  this.reportList.push({
                    "columnWeight": true,
                    "needWeight": true,
                    "isSingleLine": true,
                    "channelName": item.suppliersName,
                    "discountFact": '平均激活转化率：' + item.activeRate + '%',
                  })
                  //总计
                  this.reportList.push({
                    "needWeight": true,
                    "channelName": "总计",
                    "discountFact": '',
                    "pv": item.allPv,
                    "uv": item.allUv,
                    "registerCount": this.parseNum(item.allRegisterCount, item.allDisCountRegisterCount),
                    "registerRate": item.allRegisterFact + '%',
                    "activeCount": item.allTotalActiveCount,
                    "activeRate": item.allTotalActiveFact + '%',
                    "applyCount": this.businessKey == 'HZ' ? item.allTotalApplyCount : item.allTotalAuthCount,
                    "applyRate": this.businessKey == 'HZ' ? item.allTotalApplyFact + '%' : item.allTotalAuthFact + '%'
                  })

                  if (item.channelReportList && item.channelReportList.length > 0) {
                    item.channelReportList.forEach((channelReport) => {
                      //具体渠道数据
                      this.reportList.push({
                        "channelName": channelReport.channelName,
                        "discountFact": channelReport.discountFact + '%',
                        "pv": channelReport.pv,
                        "uv": channelReport.uv,
                        "registerCount": this.parseNum(channelReport.registerCount, channelReport.discountRegisterCount),
                        "registerRate": channelReport.registerRate + '%',
                        "activeCount": channelReport.allActiveCount,
                        "activeRate": channelReport.allActiveRate + '%',
                        "applyCount": this.businessKey == 'HZ' ? channelReport.allApplyCount : channelReport.allAuthCount,
                        "applyRate": this.businessKey == 'HZ' ? channelReport.allApplyRate + '%' : channelReport.allAuthRate + '%'
                      })
                    })
                  }
                })
              }
            }
          }
        }).catch(() => {
          this.loading3 = false
        })
      },
      // 导出
      exports() {
        this.loading2 = true;
        let httpUrl = BASE_URL + '/promotion/suppliersBusinessReport/exportSuppliersCollectReport'
        let formData = new FormData()
        formData.append("businessCode", this.businessCode)
        formData.append("suppliersCode", this.suppliersCode)
        formData.append("suppliersBusinessChannelCode", this.channelCode)
        formData.append("startDate", this.beginTime)
        formData.append("endDate", this.endTime)
        utils.exporttable(httpUrl, utils.getlocal('token'), formData, e => {
          this.loading2 = false;
        })
      },
      parseNum(num1, num2) {
        if (num1 == num2) {
          return num1 + '（--）'
        } else {
          return num1 + '（' + num2 + '）'
        }
      },
    },
    mounted() {
      // 获取当前时间
      var date = new Date();
      this.endTime = this.timeFormat(date, 1)
      date.setDate(1);
      this.beginTime = this.timeFormat(date, 0)

      this.queryBusiness(() => {
        this.queryReportList();
      })
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
