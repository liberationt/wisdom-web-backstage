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
            <Select v-model="model1" placeholder="请选择" style="width:150px" @on-change="applicationsel">
              <Option v-for="item in cityList" :value="item.businessCode" :key="item.businessKey">{{ item.businessName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">供应商:</span>
            <Select v-model="model3" placeholder="请选择供应商" style="width:150px;" @on-change="suppliersel">
              <Option v-for="item in reaName" :value="item.suppliersCode" :key="item.suppliersCode">{{ item.suppliersName }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">渠道:</span>
            <Select v-model="model4" placeholder="请选择渠道" style="width:150px;">
              <Option v-for="item in account" :value="item.suppliersBusinessChannelCode" :key="item.suppliersBusinessChannelCode">{{ item.channelName }}</Option>
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
      <Button type="primary" class="ml20 " :loading="loading2" @click="exports">
        <span v-if="!loading2">导出</span>
        <span v-else>请稍等...</span>
      </Button>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table class="tabgrouping" border highlight-row :columns="columns7" :data="data6"></Table>
    </div>

  </div>
</template>
<script>
  import utils from '../../utils/utils'
  export default {
    data () {
      return {
        value1:'',
        value2:'',
        businessCode:'',
        loading2: false,
        loading3: false,
        cityList: [],
        reaName: [],
        account: [],
        registerTime: [],
        model1: '',
        model3: '',
        model4: '',
        model5: '',
        name: '',
        columns7: [
          {
            title: '日期',
            key: 'reportDate',
            minWidth: 110,
            align: 'center',
            render: (h, params)=>{
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontWeight:'bold'
                    }
                  },
                  params.row.reportDate
                )
              ]);
            }
          },
          {
            title: '供应商',
            key: 'memberName',
            minWidth: 120,
            align: 'center',
            render: (h, params) => {
              return this.reportColumns1Render(h, params.row.suppliersChannelList, (suppliers) => {
                return suppliers.suppliersName
              })
            }
          },
          {
            title: '渠道',
            align: 'center',
            minWidth: 80,
            render: (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersChannelList, (report) => {
                return report.suppliersBusinessChannelName
              });
            }
          },
          {
            title: '注册',
            minWidth: 120,
            align: 'center',
            render: (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersChannelList, (report) => {
                return report.discountRegisterCount
              });
            }
          },
          {
            title: '激活',
            align: 'center',
            minWidth: 80,
            render: (h, params) => {
              return this.reportColumns2Render(h, params.row.suppliersChannelList, (report) => {
                return report.discountActiveCount
              });
            }
          }
        ],
        data6: []
      }
    },
    methods: {

      reportColumns1Render(h, params, showTextCallback) {
        let list = []
        for (let i = 0; i < params.length; i++) {
          let text = showTextCallback ? showTextCallback(params[i]) : params[i]
          let lineNum = params[i].channelList && params[i].channelList.length > 0 ? params[i].channelList.length : 1
          //这里的lineHeight  41=40+1是要算上分割线的高度
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
          for (let j = 0; j < params[i].channelList.length; j++) {
            let text = showTextCallback ? showTextCallback(params[i].channelList[j]) : params[i].channelList[j]
            list.push(
              h('span', {
                style: {
                  display: 'block',
                  width: '100%',
                  lineHeight: '40px',
                  borderBottom: i < params.length - 1 || j < params[i].channelList.length - 1 ? '1px solid #e9eaec' : ''
                }
              }, text)
            )
          }
        }
        return h('div', list)
      },


      // 时间判断
      time1 (value, data) {
        this.value1 = value
      },
      time2 (value, data) {
        this.value2 = value
      },
      timeFormat(date,num) {
        let y = date.getFullYear(); //年
        let m = date.getMonth() + 1; //月
        let d = date.getDate(); //日
        if (num == 1) {
          d = date.getDate()-1
        }
        m=m<10?"0"+m:m;
        d=d<10?"0"+d:d;
        return y + "-" + m + "-" + d;
      },
      // 应用名称改变
      applicationsel (val) {
        this.businessCode = val
        this.supplierlist (val)
        this.reaName = []
        this.account = []
        this.model3 = ''
        this.model4 = ''
      },
      // 供应商列表
      supplierlist (code) {
        let list = {
          businessCode:code
        }
        let urls
        if (this.$route.query.role == 'ordinary') {
          urls = '/promotion/suppliersBusiness/queryListByBusinessCode'
        } else if (this.$route.query.role == 'admin') {
          urls = '/promotion/suppliersBusiness/queryListByBusinessCodeManager'
        }
        this.http.post(BASE_URL + urls, list)
          .then((resp) => {
            if (resp.code == 'success') {
              if (resp.data && resp.data.length > 0) {
                this.reaName = [{suppliersName:'请选择'}].concat(resp.data)
              }
              if (this.$route.query.suppliersCode) {
                this.model3 = this.$route.query.suppliersCode
              } else {
                this.model3 = ''
              }
            }
          })
          .catch(() => {
          })
      },
      suppliersel (val) {
        this.account = []
        this.model4 = ''
        this.channel (val)
      },
      channel (code) {
        let list = {
          suppliersCode:code,
          businessCode:this.businessCode
        }
        this.http.post(BASE_URL + '/promotion/suppliersBusinessChannel/queryChannelListBySupplierBusiness', list)
          .then((resp) => {
            if (resp.code == 'success') {
              if (resp.data && resp.data.length > 0) {
                this.account = [{channelName:'请选择'}].concat(resp.data)
              }
            }
          })
          .catch(() => {
          })
      },
      // 列表查询
      inquire () {
        this.loading3 = true
        let date1 = Date.parse(new Date(this.value1))/1000
        let date2 = Date.parse(new Date(this.value2))/1000
        if (date1 > date2) {
          this.loading3 = false
          this.$Modal.warning({
            title: '提示',
            content: '<p>开始时间不得大于结束时间</p>'
          })
          return false
        }
        let list = {
          beginTime:this.value1,
          endTime : this.value2,
          businessCode:this.model1,
          suppliersCode:this.model3,
          suppliersBusinessChannelCode:this.model4
        }
        let urls
        if (this.$route.query.role == 'ordinary') {
          urls = '/promotion/report/queryChannelReportGroupList'
        } else if (this.$route.query.role == 'admin') {
          urls = '/promotion/report/queryChannelReportGroupListByManager'
        }
        this.http.post(BASE_URL + urls, list)
          .then((resp) => {
            if (resp.code == 'success') {
              this.data6 = resp.data
              this.loading3 = false
            } else {
              this.$Message.error(resp.message);
              this.loading3 = false
            }
          })
          .catch(() => {
            this.loading3 = false
          })
      },
      // 导出
      exports () {
        this.loading2 = true;
        let httpUrl
        if (this.$route.query.role == 'ordinary') {
          httpUrl = BASE_URL+'/promotion/report/exportExcelBusinessChannelReport'
        } else if (this.$route.query.role == 'admin') {
          httpUrl = BASE_URL+'/promotion/report/exportExcelBusinessChannelReportByManager'
        }
        let formData = new FormData()
        formData.append("beginTime",this.value1)
        formData.append("endTime",this.value2)
        formData.append("businessCode",this.model1)
        formData.append("suppliersCode",this.model3)
        formData.append("suppliersBusinessChannelCode",this.model4)
        utils.exporttable(httpUrl, utils.getlocal('token'),formData, e => {
          if(e == true ){
            this.loading2 = false;
          }
        })
      },
      applylist () {
        let urls
        if (this.$route.query.role == 'ordinary') {
          urls = '/promotion/business/queryListByUserCode'
        } else if (this.$route.query.role == 'admin') {
          urls = '/promotion/business/queryListByManager'
        }
        this.http.post(BASE_URL + urls, {})
          .then((resp) => {
            if (resp.code == 'success') {
              this.cityList = resp.data
              if (this.$route.query.businessCode) {
                this.model1 = this.$route.query.businessCode
              } else {
                this.model1 = resp.data[0].businessCode
              }
              if (this.$route.query.suppliersCode) {
                this.model3 = this.$route.query.suppliersCode
              } else {
                this.model3 = ''
              }
              this.inquire ()
            }
          })
          .catch(() => {
          })
      }
    },
    mounted () {
      // 获取当前时间
      var date=new Date();
      this.value2 = this.timeFormat(date,1)
      date.setDate(1);
      this.value1 = this.timeFormat(date,0)
      this.applylist ()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route' (to, from) {
        if (this.$route.query.suppliersCode) {
          this.model3 = this.$route.query.suppliersCode
        } else {
          this.model3 = ''
        }
        this.applylist ()
      }
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
