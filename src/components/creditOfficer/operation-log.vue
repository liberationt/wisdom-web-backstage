<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;  {{title}}</span>
      </p>
    </div>
    <div id="feedback_details" class="contentcss">
      <!-- <h3>{{title}}</h3> -->
      <div class="">
        <!-- <span>操作时间:</span>
        <DatePicker type="datetime" :value="value1" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
        <span>  -  </span>
        <DatePicker type="datetime" :value="value2" @on-change="time2" placeholder="结束时间" style="width: 200px"></DatePicker>
            <Button type="info" class=" ml20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button> -->
        <Button class="w100 ml20" @click=" backingout" type="primary">返回</Button>
      </div>
      <Table border highlight-row class="mt20" :columns="columns1" :data="data1"></Table>
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
        modal8: false,
        loading3: false,
        title: '',
        value1: '',
        value2: '',
        total: 0,
        startRow: 1,
        endRow: 10,
        columns1: [
          {
            title: '操作时间',
            align: 'center',
            key: 'dataCreateTime'
          },
          {
            title: '操作人',
            align: 'center',
            key: 'operationMan'
          },
          {
            title: '操作内容',
            align: 'center',
            key: 'operationContent'
          },
          {
            title: '备注',
            align: 'center',
            key: 'memo'
          }
        ],
        data1: [],
        params: {
          page: 1,
          limit: 10
        }
      }
    },
    methods: {
      handleRender() {
        this.$router.push({path: './operationLog'})
      },
      pageChange(page) {
        this.startRow = page
        this.reuqest()
      },
      pagesizechange(page) {
        this.startRow = 1
        this.endRow = page
        this.reuqest()
      },
      // 返回
      backingout() {
        window.history.go(-1)
      },
      // 时间判断
      // time1 (value, data) {
      //   this.value1 = value
      // },
      // time2 (value, data) {
      //   this.value2 = value
      // },
      // 查询
      reuqest() {
        // let date1 = Date.parse(new Date(this.value1))/1000
        // let date2 = Date.parse(new Date(this.value2))/1000
        // if (date1 > date2) {
        //   this.loading3 = false
        //   this.$Modal.warning({
        //     title: '注册时间',
        //     content: '<p>开始时间不得大于结束时间</p>'
        //   })
        //   return false
        // }


        let requestUrl = null
        let requestParams = {
          // beginTime : this.value1,
          // endTime  : this.value2,
          pageNum: this.startRow,
          pageSize: this.endRow
        }
        let operationType = this.$route.query.operationType;

        if ('loanOfficerLog' == operationType) {   //  信贷员操作日志   黄帅
          this.title = '信贷员操作日志'
          requestUrl = BASE_URL + "/loan/loanOfficerLog/getLoanOfficerLogList";
          Object.assign(requestParams, {
            loanOfficerCode: this.$route.query.loanOfficerCode,
          })
        } else if ('loanUserLog' == operationType) {   // 用户操作日志   黄帅
          this.title = '用户操作日志'
          requestUrl = BASE_URL + "/loan/loanUserLog/getLoanUserLogList";
          Object.assign(requestParams, {
            loanUserCode: this.$route.query.loanUserCode,
          })
        } else if ('activityAudit' == operationType) {    //汪海根   活动管理-负责人的
          this.title = '活动管理操作日志'
          requestUrl = BASE_URL + "/loan/activityLog/getActivityLogList";
          Object.assign(requestParams, {
            activityCode: this.$route.query.activityCode,
          })
        } else if ('1' == operationType) {    //余坚恒   淘单的
          this.title = '淘单筛选操作日志'
          requestUrl = BASE_URL + "/loan/chanceTitleAndOption/getOperationLogList";
          Object.assign(requestParams, {
            type: operationType
          })
        } else if ('orderLog' == operationType) {    //毕有为   订单申诉的
          this.title = '订单操作日志'
          requestUrl = BASE_URL + "/loan/orderLog/getOrderLogApplyList";
          Object.assign(requestParams, {
            orderCode: this.$route.query.orderCode,
          })
        } else if ('risk_edit' == operationType || 'risk_product_edit' == operationType){  //毕有为   风控相关日志
          requestUrl = BASE_URL + "/risk/riskOperationLog/getRiskOperationLogList ";
          Object.assign(requestParams, {
            operationType: operationType,
          })
          switch (operationType) {
            case 'risk_edit':     //毕有为
              this.title = '修改风控等级设置'
              break
            case 'risk_product_edit':     //毕有为
              this.title = '修改产品的风控等级'
              break
          }
        } else if ('loanOfficerActive' == operationType) {   // 活动操作日志   黄帅
          this.title = '活动操作日志'
          requestUrl = BASE_URL + "/loan/activityLog/getActivityLogList";
          Object.assign(requestParams, {
            activityCode: this.$route.query.activityCode,
          })
        } else {   //统一的日志接口 通过 operationType  区分
          requestUrl = BASE_URL + "/loan/operationLog/queryPage";
          Object.assign(requestParams, {
            operationType: operationType,
          })
          switch (operationType) {
            case 'market_edit' :     //王锐锐
              this.title = '营销设置操作日志'
              break
            case 'user_social_edit':    //薛梦齐
              this.title = '用户身价设置修改日志'
              break
            case 'officer_edit':     //毕有为
              this.title = '信贷基本配置日志'
              break
            case 'loanOfficerActive':     //黄帅
              this.title = '活动操作日志'
              break
              case 'template_config_edit':     //梦琪
              this.title = '模板操作日志'
              break
          }
        }

        this.loading3 = true
        this.http.post(requestUrl, requestParams).then((resp) => {
          if (resp.code == 'success' && resp.data) {
            this.dealwithResponse(operationType, resp.data)
          }
          this.loading3 = false
        }).catch((err) => {
          this.loading3 = false
        })
      },

      dealwithResponse (operationType, data) {

        this.total = Number(data.total)
        this.startRow = Math.ceil(data.startRow / this.endRow)

        switch (operationType) {
          case 'loanOfficerLog':
          case 'loanUserLog' :
          case 'activityAudit' :
            if (data.dataList && data.dataList.length > 0) {
              this.data1 = []
              data.dataList.forEach((item) => {
                let item1 = {
                  dataCreateTime: item.dataCreateTime,
                  operationMan: item.operator,
                  operationContent: item.content,
                  memo: item.memo
                }
                this.data1.push(item1)
              })
            }
            break
          case 'orderLog':
            if (data.orderLogList && data.orderLogList.length > 0) {
              this.data1 = []
              data.orderLogList.forEach((item) => {
                let item1 = {
                  dataCreateTime: item.orderStatusTime,
                  operationMan: item.operator,
                  operationContent: item.content,
                  memo: item.memo
                }
                this.data1.push(item1)
              })
            }
            break
          case 'loanOfficerActive':
            if (data.dataList && data.dataList.length > 0) {
              this.data1 = []
              data.dataList.forEach((item) => {
                let item1 = {
                  dataCreateTime: item.dataCreateTime,
                  operationMan: item.operator,
                  operationContent: item.content,
                  memo: item.memo
                }
                this.data1.push(item1)
              })
            }
            break
            case 'activityAudit':
            if (data.dataList && data.dataList.length > 0) {
              this.data1 = []
              data.dataList.forEach((item) => {
                let item1 = {
                  dataCreateTime: item.dataCreateTime,
                  operationMan: item.operator,
                  operationContent: item.content,
                  memo: item.memo
                }
                this.data1.push(item1)
              })
            }
            break
          default :
            this.data1 = data.dataList
            break
        }
      }
    },

    mounted() {
      this.reuqest()
    }
  }
</script>
<style lang="less" scoped>
  #feedback_details {
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3 {
      line-height: 50px;
      border-bottom: 1px solid #E7ECF1;
      margin-bottom: 20px;
    }
  }
</style>
