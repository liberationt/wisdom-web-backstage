<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;渠道报表&nbsp;>&nbsp;渠道日报表</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <span class="ml20">应用名称:</span>
            <Select v-model="curBusinessCode" placeholder="请选择" style="width:150px" @on-change="businessChange">
              <Option v-for="item in businessList" :value="item.businessCode" :key="item.businessCode">
                {{ item.businessName }}
              </Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="curSuppliersCode" placeholder="请选择供应商" filterable style="width:150px;">
              <Option v-for="item in suppliersList" :value="item.suppliersCode" :key="item.suppliersCode">{{ item.suppliersName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">预警状态:</span>
            <Select v-model="warningStatus" placeholder="选择预警状态" style="width:150px;">
              <Option v-for="item in warningStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">时间:</span>
            <DatePicker type="date" :value="beginTime" :options="options3" @on-change="time1" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
          </li>
          <li>
            <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
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
        options3: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        warningStatusList: [
          {label: '请选择'},
          {value: 0, label: '未预警'},
          {value: 1, label: '预警'}
        ],
        beginTime: '',
        businessList: [],
        suppliersList: [],
        curBusinessCode: null,
        curSuppliersCode: '',
        curBusinessKey: '',
        warningStatus: '',
        columnList: [],
        reportList: [],
      }
    },
    methods: {
      rowClassName(row, index) {
        if (row.isSupplierRow && row.isTotal) {
          return 'demo-table-info-row demo-table-info-row-fontWeight'
        } else if (row.isSupplierRow) {
          return 'demo-table-info-row'
        } else if (row.isTotal) {
          return 'demo-table-info-row-fontWeight'
        } else if (row.warningStatus == 1) {
          return 'demo-table-info-cell-name'
        } else {
          return ''
        }
      },

      getColumnList(businessKey) {
        let columnList = [
          this.getColumnItem('渠道', 'channelName', 300, (h, params) => {
              return this.renderColumn(h, params.row.channelName, params.row.isSupplierRow)
            }
          ),     
          this.getColumnItem('折扣系数', 'discountFact', 200),
          this.getColumnItem('PV', 'pv', 100),
          this.getColumnItem('UV', 'uv', 100),
          this.getColumnItem('注册', 'registerCount', 140),
          this.getColumnItem('注册转化率', 'registerRate', 100),
          this.getColumnItem('当日激活', 'activeCount', 150 ),
          this.getColumnItem('累计激活', 'allActiveCount', 140),
          this.getColumnItem('当日激活转化率', 'activeRate', 100),
          this.getColumnItem('累计激活转化率', 'allActiveRate', 100),          
          this.getColumnItem(businessKey == 'huazan' ? '当日申请' : '当日认证', 'applyCount', 90),
          this.getColumnItem(businessKey == 'huazan' ? '累计申请' : '累计认证', 'allApplyCount', 90),
          this.getColumnItem(businessKey == 'huazan' ? '当日申请转化率' : '当日认证转化率', 'applyRate', 100),
          this.getColumnItem(businessKey == 'huazan' ? '累计申请转化率' : '累计认证转化率', 'allApplyRate', 100 ),
        ]
        if (businessKey == 'huazan') {
          columnList.push(
            this.getColumnItem(businessKey == 'huazan' ? '当日完善信息人数' : '抢单侠', 'allPerfectInfoCount', 100),
            this.getColumnItem(businessKey == 'huazan' ? '累计完善信息人数' : '抢单侠', 'allTotalPerfectInfoCount', 100),
            this.getColumnItem(businessKey == 'huazan' ? '当日完善信息转化率' : '抢单侠', 'allPerfectInfoFact', 100),
            this.getColumnItem(businessKey == 'huazan' ? '累计完善信息转化率' : '抢单侠', 'allTotalPerfectInfoFact', 100),
          )
        }
        return columnList
      },

      getColumnItem(title, key, width, render) {
        if (title != '抢单侠') {
          return {
            title: title,
            key: key,
            minWidth: width,
            align: 'center',
            render: render
          }         
        } else {
          return {}
        }
      },

      renderColumn(h, text, columnWeight) {
        return h("div", [
          h(
            "span",
            {
              style: {
                width: "100%",
                display: 'inline-block',
                overflow: "hidden",
                textOverflow: 'ellipsis',
							  whiteSpace: 'nowrap',
                fontSize:columnWeight ? '15px' : ''
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
        this.beginTime = value
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
        this.businessList.forEach(element => {
          if (element.businessCode == businessCode) {
            this.curBusinessKey = element.businessKey
          }
        });
        this.http.post(BASE_URL + '/promotion/suppliersBusiness/queryListByBusinessCodeManager', {
          businessCode: businessCode
        }).then((resp) => {
          if (resp.code == 'success') {
            if (resp.data && resp.data.length > 0) {
              this.suppliersList = [{suppliersName:'请选择'}].concat(resp.data)
            }
          }
        }).catch(() => {
        })
      },

      // 列表查询
      queryReportList() {
        this.columnList = this.getColumnList(this.curBusinessKey)
        let params = {
          businessCode: this.curBusinessCode,
          suppliersCode: this.curSuppliersCode,
          channelReportTime: this.beginTime,
          warningStatus: this.warningStatus,
        }
        this.loading3 = true
        this.http.post(BASE_URL + '/promotion/suppliersBusinessReport/querySuppliersDayReport', params).then((resp) => {
          this.loading3 = false
          if (resp.code == 'success') {
            //组装数据
            this.reportList = []
            if (resp.data && resp.data.length > 0) {
              resp.data.forEach((item) => {
                //供应商名称
                this.reportList.push({
                  'isSupplierRow': true,
                  'isTotal': true,
                  "channelName": item.suppliersName,
                  "discountFact": '平均激活转化率：' + item.activeRate + '%',
                })
                //总计
                this.reportList.push({
                  'isTotal': true,
                  "channelName": "总计",
                  "discountFact": '',
                  "pv": item.allPv,
                  "uv": item.allUv,
                  "registerCount": this.parseNum(item.allRegisterCount, item.allDisCountRegisterCount),
                  "registerRate": item.allRegisterFact + '%',
                  "activeCount": this.parseNum(item.allActiveCount, item.allDiscountActiveCount),
                  "allActiveCount": this.parseNum(item.allTotalActiveCount, item.allTotalDiscountActiveCount),
                  "activeRate": item.allActiveFact + '%',
                  "allActiveRate": item.allTotalActiveFact + '%',
                  'allPerfectInfoCount':this.curBusinessKey == 'huazan' ? item.allPerfectInfoCount : '',
                  'allTotalPerfectInfoCount':this.curBusinessKey == 'huazan' ? item.allTotalPerfectInfoCount : '',
                  'allPerfectInfoFact':this.curBusinessKey == 'huazan' ? item.allPerfectInfoFact + '%' : '',
                  'allTotalPerfectInfoFact':this.curBusinessKey == 'huazan' ? item.allTotalPerfectInfoFact + '%' : '',
                  "applyCount": this.curBusinessKey == 'huazan' ? item.allApplyCount : item.allAuthCount,
                  "allApplyCount": this.curBusinessKey == 'huazan' ? item.allTotalApplyCount : item.allTotalAuthCount,
                  "applyRate": this.curBusinessKey == 'huazan' ? item.allApplyFact + '%' : item.allAuthFact + '%',
                  "allApplyRate": this.curBusinessKey == 'huazan' ? item.allTotalApplyFact + '%' : item.allTotalAuthFact + '%',
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
                      "activeCount": this.parseNum(channelReport.activeCount, channelReport.discountActiveCount),
                      "allActiveCount": this.parseNum(channelReport.allActiveCount, channelReport.allDiscountActiveCount),
                      "activeRate": channelReport.activeRate + '%',
                      "allActiveRate": channelReport.allActiveRate + '%',
                      'allPerfectInfoCount':this.curBusinessKey == 'huazan' ? channelReport.perfectInfoCount : '',
                      'allTotalPerfectInfoCount':this.curBusinessKey == 'huazan' ? channelReport.allPerfectInfoCount : '',
                      'allPerfectInfoFact':this.curBusinessKey == 'huazan' ? channelReport.perfectInfoRate + '%' : '',
                      'allTotalPerfectInfoFact':this.curBusinessKey == 'huazan' ? channelReport.allPerfectInfoRate + '%' : '',
                      "applyCount": this.curBusinessKey == 'huazan' ? channelReport.applyCount : channelReport.authCount,
                      "allApplyCount": this.curBusinessKey == 'huazan' ? channelReport.allApplyCount : channelReport.allAuthCount,
                      "applyRate": this.curBusinessKey == 'huazan' ? channelReport.applyRate + '%' : channelReport.authRate + '%',
                      "allApplyRate": this.curBusinessKey == 'huazan' ? channelReport.allApplyRate + '%' : channelReport.allAuthRate + '%',
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
        formData.append("businessCode", this.curBusinessCode)
        formData.append("suppliersCode", this.curSuppliersCode)
        formData.append("channelReportTime", this.beginTime)
        formData.append("warningStatus", this.warningStatus)
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

      // 配置预警值
      earlywarning() {
        this.$router.push({path: '/rangeConfiguration'})
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
      this.beginTime = currentdate;

      this.queryBusiness(()=>{
        this.queryReportList()
      })
    }
  }
</script>
<style lang="less" scoped>
  #application_table {
    margin-top: 10px;
  }

  .ivu-table-cell {
    padding: 0
  }
</style>
