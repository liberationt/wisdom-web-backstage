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
            <Select v-model="model3" placeholder="请选择供应商" style="width:150px;">
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
          <li>
            <Button type="info" class=" ml20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
          <li>
            <Button type="primary" class="ml10 " :loading="loading2" @click="exports">
              <span v-if="!loading2">导出</span>
              <span v-else>请稍等...</span>
            </Button>
            <Button class=" ml10" shape="circle" icon="ios-cog-outline" @click="earlywarning">配置预警值</Button>
          </li>
        </ul>
      </div>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table :row-class-name="rowClassName" border highlight-row :columns="columnsList" :data="data7" size="small"
             ref="table" class="dailylist"></Table>
    </div>
  </div>
</template>
<script>
  import utils from '../../utils/utils'

  export default {
    data() {
      return {
        value1: '',
        loading2: false,
        loading3: false,
        businessKey: '',
        columnsList: [],
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
        curBusinessKey: '',
        name: '',

        data7: []
      }
    },
    methods: {
      // 分页
      pageChange(page) {
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
        if (row.isSupplierRow) {
          return 'demo-table-info-row'
        } else if (row.warningStatus == 1) {
          return 'demo-table-info-cell-name'
        } else {
          return ''
        }
      },

      getColumnList(businessKey) {
        let columnList = [
          this.getColumnItem('渠道', 'channelName', 150, (h, params) => {
              return this.renderColumn(h, params.row.channelName, params.row.isTotal)
            }
          ),
          this.getColumnItem('折扣系数', 'discountFact', 200, (h, params) => {
              return this.renderColumn(h, params.row.discountFact, params.row.isTotal)
            }
          ),
          this.getColumnItem('PV', 'pv', 100, (h, params) => {
              return this.renderColumn(h, params.row.pv, params.row.isTotal)
            }
          ),
          this.getColumnItem('UV', 'uv', 100, (h, params) => {
              return this.renderColumn(h, params.row.uv, params.row.isTotal)
            }
          ),
          this.getColumnItem('注册', 'registerCount', 150, (h, params) => {
              return this.renderColumn(h, params.row.registerCount, params.row.isTotal)
            }
          ),
          this.getColumnItem('注册转化率', 'registerRate', 100, (h, params) => {
              return this.renderColumn(h, params.row.registerRate, params.row.isTotal)
            }
          ),
          this.getColumnItem('当日激活', 'activeCount', 150, (h, params) => {
              return this.renderColumn(h, params.row.activeCount, params.row.isTotal)
            }
          ),
          this.getColumnItem('累计激活', 'allActiveCount', 100, (h, params) => {
              return this.renderColumn(h, params.row.allActiveCount, params.row.isTotal)
            }
          ),
          this.getColumnItem('当日激活转化率', 'activeRate', 100, (h, params) => {
              return this.renderColumn(h, params.row.activeRate, params.row.isTotal)
            }
          ),
          this.getColumnItem('累计激活转化率', 'allActiveRate', 100, (h, params) => {
              return this.renderColumn(h, params.row.allActiveRate, params.row.isTotal)
            }
          ),
          this.getColumnItem(businessKey == 'HZ' ? '当日申请' : '当日认证', 'applyCount', 100, (h, params) => {
              return this.renderColumn(h, params.row.applyCount, params.row.isTotal)
            }
          ),
          this.getColumnItem(businessKey == 'HZ' ? '累计申请' : '累计认证', 'allApplyCount', 100, (h, params) => {
              return this.renderColumn(h, params.row.allApplyCount, params.row.isTotal)
            }
          ),
          this.getColumnItem(businessKey == 'HZ' ? '当日申请转化率' : '当日认证转化率', 'applyRate', 100, (h, params) => {
              return this.renderColumn(h, params.row.applyRate, params.row.isTotal)
            }
          ),
          this.getColumnItem(businessKey == 'HZ' ? '累计申请转化率' : '累计认证转化率', 'allApplyRate', 100, (h, params) => {
              return this.renderColumn(h, params.row.allApplyRate, params.row.isTotal)
            }
          ),
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

      renderColumn(h, text, isTotal) {
        return h("div", [
          h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: isTotal ? '700' : ''
              },
              domProps: {
                title: text
              }
            },
            text
          )
        ]);
      },

      // 时间
      time1(value, data) {
        this.value1 = value
      },
      // 列表查询
      inquire(num) {
        this.columnsList = this.getColumnList(this.businessKey)

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
            if (this.cityList && this.cityList.length > 0) {
              this.cityList.forEach((business) => {
                if (business.businessCode == this.model1) {
                  this.curBusinessKey = business.businessKey
                }
              })
            }

            //组装数据
            this.data7 = []
            if (resp.data && resp.data.length > 0) {
              resp.data.forEach((item) => {
                //供应商名称
                this.data7.push({
                  'isSupplierRow': true,
                  'isTotal': true,
                  "channelName": item.suppliersName,
                  "discountFact": '平均激活转化率：' + item.activeRate + '%',
                })
                //总计
                this.data7.push({
                  'isTotal': true,
                  "channelName": "总计",
                  "discountFact": '',
                  "pv": item.allPv,
                  "uv": item.allUv,
                  "registerCount": this.parseNum(item.allRegisterCount, item.allDisCountRegisterCount),
                  "registerRate": item.allRegisterFact + '%',
                  "activeCount": this.parseNum(item.allActiveCount, item.allDiscountActiveCount),
                  "allActiveCount": item.allTotalActiveCount,
                  "activeRate": item.allActiveFact + '%',
                  "allActiveRate": item.allTotalActiveFact + '%',
                  "applyCount": this.curBusinessKey == 'HZ' ? item.allApplyCount : item.allAuthCount,
                  "allApplyCount": this.curBusinessKey == 'HZ' ? item.allTotalApplyCount : item.allTotalAuthCount,
                  "applyRate": this.curBusinessKey == 'HZ' ? item.allApplyFact + '%' : item.allAuthFact + '%',
                  "allApplyRate": this.curBusinessKey == 'HZ' ? item.allTotalApplyFact + '%' : item.allTotalAuthFact + '%',
                })

                if (item.channelReportList && item.channelReportList.length > 0) {
                  item.channelReportList.forEach((channelReport) => {
                    //具体渠道数据
                    this.data7.push({
                      "channelName": channelReport.channelName,
                      "discountFact": channelReport.discountFact + '%',
                      "pv": channelReport.pv,
                      "uv": channelReport.uv,
                      "registerCount": this.parseNum(channelReport.registerCount, channelReport.discountRegisterCount),
                      "registerRate": channelReport.registerRate + '%',
                      "activeCount": this.parseNum(channelReport.activeCount, channelReport.discountActiveCount),
                      "allActiveCount": channelReport.allActiveCount,
                      "activeRate": channelReport.activeRate + '%',
                      "allActiveRate": channelReport.allActiveRate + '%',
                      "applyCount": this.curBusinessKey == 'HZ' ? channelReport.applyCount : channelReport.authCount,
                      "allApplyCount": this.curBusinessKey == 'HZ' ? channelReport.allApplyCount : channelReport.allAuthCount,
                      "applyRate": this.curBusinessKey == 'HZ' ? channelReport.applyRate + '%' : channelReport.authRate + '%',
                      "allApplyRate": this.curBusinessKey == 'HZ' ? channelReport.applyRate + '%' : channelReport.allAuthRate + '%',
                      "warningStatus": channelReport.warningStatus,
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
      // 导出
      exports() {
        this.loading2 = true;
        let httpUrl = BASE_URL + '/promotion/suppliersBusinessReport/exportSuppliersDayReport'
        let formData = new FormData()
        formData.append("businessCode", this.model1)
        formData.append("suppliersCode", this.model3)
        formData.append("channelReportTime", this.value1)
        formData.append("warningStatus", this.model4)
        utils.exporttable(httpUrl, utils.getlocal('token'), formData, e => {
          if (e == true) {
            this.loading2 = false;
          }
        })
      },
      parseNum(num1, num2) {
        if (num1 == num2) {
          return num1 + '（--）'
        } else {
          return num1 + '（' + num2 + '）'
        }
      },

      // 配置预警值
      earlywarning() {
        this.$router.push({path: '/rangeConfiguration'})
      },
      applicationAlias(e) {
        this.cityList.forEach(element => {
          if (element.businessCode == e) {
            this.businessKey = element.businessKey
          }
        });
        //供应商
        this.reaName = []
        this.businessPost('/promotion/suppliersBusiness/queryListByBusinessCodeManager', {businessCode: e}, e => {
          if (e.code == 'success') {
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
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.value1 = currentdate;
      //应用名称
      this.businessPost('/promotion/business/queryListByManager', {}, e => {
        if (e.code == 'success') {
          this.cityList = e.data
          if (this.cityList && this.cityList.length > 0) {
            this.model1 = this.cityList[0].businessCode
            this.businessKey = this.cityList[0].businessKey
            this.inquire()
          }
        }
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
>>>>>>> dcc38473c5e782e86d6de942fd43ca6bc4cd06ae
