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
              <Option v-for="item in businessList" :value="item.businessCode" :key="item.businessCode">
                {{item.businessName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="curSuppliersCode" placeholder="请选择" style="width:150px;" @on-change="suppliersChange">
              <Option v-for="item in suppliersList" :value="item.suppliersCode" :key="item.suppliersCode">
                {{item.suppliersName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道名称:</span>
            <Select v-model="curChannelCode" placeholder="请选择" style="width:150px;" @on-change="channelChange">
              <Option v-for="item in channelList" :value="item.suppliersBusinessChannelCode"
                      :key="item.suppliersBusinessChannelCode">{{ item.channelName }}
              </Option>
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
      <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList"></Table>
    </div>
  </div>
</template>
<script>
  import utils from '../../utils/utils'

  export default {
    data() {
      return {
        loading3: false,
        loading2: false,
        businessList: [],
        suppliersList: [],
        channelList: [],
        curBusinessCode: null,
        curSuppliersCode: null,
        curChannelCode: null,
        curBusinessKey: '',
        beginTime: '',
        endTime: '',
        columnList: [],
        reportList: [],
      }
    },
    methods: {
      getColumnList(businessKey) {
        let columnList = [
          this.getColumnItem('日期', 'reportDate', 130, (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontWeight: 'bold'
                  }
                },
                params.row.reportDate
              )
            ]);
          }),
          this.getColumnItem('供应商', 'suppliersName', 150, (h, params) => {
            return this.reportColumns1Render(h, params.row.suppliersDayReportResList, (suppliers) => {
              return suppliers.suppliersName
            })
          }),
          this.getColumnItem('渠道', '', 200, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.channelName
            })
          }),

          this.getColumnItem('折扣系数', '', 100, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.discountFact + '%'
            })
          }),
          this.getColumnItem('PV', '', 100, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.pv
            })
          }),
          this.getColumnItem('UV', '', 100, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.uv
            })
          }),
          this.getColumnItem('注册', '', 120, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return this.parseNum(report.registerCount, report.discountRegisterCount)
            })
          }),
          this.getColumnItem('注册转化率', '', 100, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.registerRate + "%"
            })
          }),
          this.getColumnItem('累计激活', '', 120, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.allActiveCount
            })
          }),
          this.getColumnItem('累计激活转化率', '', 100, (h, params) => {
            return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
              return report.allActiveRate + "%"
            })
          }),
          businessKey == 'HZ' ?
            this.getColumnItem('累计申请', '', 120, (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
                return report.allApplyCount
              })
            }) : this.getColumnItem('累计认证', '', 120, (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
                return report.allAuthCount
              })
            }),
          businessKey == 'HZ' ?
            this.getColumnItem('累计申请转化率', '', 100, (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
                return report.allApplyRate + '%'
              })
            }) : this.getColumnItem('累计申请转化率', '', 120, (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (report) => {
                return report.allAuthRate + '%'
              })
            }),
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

      reportColumns1Render(h, params, showTextCallback) {
        let list = []
        for (let i = 0; i < params.length; i++) {
          let text = showTextCallback ? showTextCallback(params[i]) : params[i]
          let lineNum = params[i].channelReportList && params[i].channelReportList.length > 0 ? params[i].channelReportList.length : 1
          list.push(
            h('span', {
              style: {
                display: 'block',
                width: '100%',
                lineHeight: (41 * lineNum - 1) + 'px',
                borderBottom: i < params.length - 1 ? '1px solid #e9eaec' : ''
              }
            }, text)
          )
        }
        return h('div', list)
      },

      reportColumns2Render(h, params, showTextCallback) {
        let list = []
        for (let i = 0; i < params.length; i++) {
          for (let j = 0; j < params[i].channelReportList.length; j++) {
            let text = showTextCallback ? showTextCallback(params[i].channelReportList[j]) : params[i].channelReportList[j]
            list.push(
              h('span', {
                style: {
                  display: 'block',
                  width: '100%',
                  align: 'center',
                  lineHeight: '40px',
                  borderBottom: i < params.length - 1 || j < params[i].channelReportList.length - 1 ? '1px solid #e9eaec' : ''
                }
              }, text)
            )
          }
        }
        return h('div', list)
      },
      parseNum(num1, num2) {
        if (num1 == num2) {
          return num1 + '（--）'
        } else {
          return num1 + '（' + num2 + '）'
        }
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
      queryBusiness(callback) {
        this.http.post(BASE_URL + '/promotion/business/queryListByManager', {}).then((resp) => {
          if (resp.code == 'success') {
            this.businessList = resp.data
            if (this.businessList && this.businessList.length > 0) {
              this.curBusinessCode = resp.data[0].businessCode
              this.curBusinessKey = resp.data[0].businessKey
              callback && callback()
            }
          }
        }).catch(() => {
        })
      },
      // 选择业务后查询供应商
      businessChange(businessCode) {
        this.curBusinessCode = businessCode
        this.suppliersList = []
        this.channelList = []
        this.businessList.forEach(element => {
          if (element.businessCode == businessCode) {
            this.curBusinessKey = element.businessKey
          }
        });
        this.http.post(BASE_URL + '/promotion/suppliersBusiness/queryListByBusinessCodeManager', {
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
      channelChange(channelCode) {
        this.curChannelCode = channelCode;
      },
      // 列表查询
      queryReportList() {
        let date1 = Date.parse(new Date(this.beginTime)) / 1000
        let date2 = Date.parse(new Date(this.endTime)) / 1000
        let date3 = new Date(new Date().setHours(0, 0, 0, 0)) / 1000
        if (date1 > date2) {
          this.$Modal.warning({
            title: '提示',
            content: '<p>开始时间不得大于结束时间</p>'
          })
          return false
        }
        if (date2 > date3 || date1 > date3) {
          this.loading3 = false
          this.$Modal.warning({
            title: '更新时间',
            content: '<p>请选择当前时间的前一天时间</p>'
          })
          return false
        }
        this.columnList = this.getColumnList(this.curBusinessKey)
        let params = {
          startDate: this.beginTime,
          endDate: this.endTime,
          businessCode: this.curBusinessCode,
          suppliersCode: this.curSuppliersCode,
          suppliersBusinessChannelCode: this.curChannelCode
        }
        this.loading3 = true
        this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersMonthReport', params).then((resp) => {
          this.loading3 = false
          this.reportList = resp.data
        }).catch(() => {
          this.loading3 = false
          this.reportList = []
        })
      },
      // 导出
      exports() {
        this.loading2 = true;
        let httpUrl = BASE_URL + '/promotion/suppliersBusinessReport/exportSuppliersMonthReport'
        let formData = new FormData()
        formData.append("startDate", this.beginTime)
        formData.append("endDate", this.endTime)
        formData.append("businessCode", this.curBusinessCode)
        this.curSuppliersCode && formData.append("suppliersCode", this.curSuppliersCode)
        this.curChannelCode && formData.append("suppliersBusinessChannelCode", this.curChannelCode)
        utils.exporttable(httpUrl, utils.getlocal('token'), formData, e => {
          if (e == true) {
            this.loading2 = false;
          }
        })
      }
    },
    mounted() {
      // 获取当前时间
      var date = new Date();
      this.endTime = this.timeFormat(date, 1)
      date.setDate(1);
      this.beginTime = this.timeFormat(date, 0)
      this.queryBusiness(() => {
        this.queryReportList()
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
