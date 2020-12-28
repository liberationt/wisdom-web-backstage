<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理&nbsp;>&nbsp;充值记录</span>
      </p>
    </div>
    <div class="contentcss">
          <div class="application_state">
                  <div class="clearfix">
                      <ul class="querysty clearfix">
                          
                          <li v-if="parameter=='admin'" class="mr20">
                              <span>坐席:</span>
                              <Select v-model="rechargeMode" style="width:150px">
                                  <Option  value="" >请选择</Option>
                                <Option v-for="(item, index) in cityList" :value="item.seatCode" :key="index">{{ item.seatName }}</Option>
                              
                              </Select>
                          </li>
                          <li class="mr20">
                              <Input v-model="ordernum" class="mr10" placeholder="请输入信贷员手机尾号"  style="width: 150px;"></Input>
                          </li>
                          <li class="mr20">
                              <span>订单类型:</span>
                              <Select v-model="orderType" style="width:150px">
                              <Option  value="0" >全部</Option>
                              <Option  value="2" >普通充值</Option>
                              <Option  value="3" >会员充值</Option>
                              </Select>
                          </li>
                          <li class="mr20">
                              <span>支付状态:</span>
                              <Select v-model="paymentStatus" style="width:150px">
                              <Option  value="1" >待支付</Option>
                              <Option  value="2" >支付成功</Option>
                              <Option  value="3" >支付失败</Option>
                              </Select>
                          </li>
                          <li class="mr20">
                              <span class="lh32 ">充值时间:</span>
                              <DatePicker type="date" :value="timeval1" @on-change="time1" placeholder="充值开始时间" style="width: 150px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                              <DatePicker type="date" :value="timeval2" @on-change="time2" placeholder="充值结束时间" style="width: 150px"></DatePicker>
                          </li>
                          <li class="mr20">
                              <Button type="info" class="left mr10 w90" :loading="loading3" @click="auditedQuery(1)">
                                <span v-if="!loading3">查询</span>
                                <span v-else>查询</span>
                                </Button>
                                <Button type="primary" class=" w90" :loading="loading2" @click="auditedExport(1)">
                                <span v-if="!loading2">导出</span>
                                <span v-else>请稍等...</span>
                                </Button>
                          </li>
                      </ul>
                  </div>
                  <p class="mt15">
                    查询结果:<strong class="red">{{total}}</strong>条&nbsp;&nbsp;&nbsp;&nbsp;共计:<strong class="red">{{totalAmount}}</strong>元
                  </p>
                  <div class="mt15">
                      <Table border highlight-row :columns="columns7" :data="data6"></Table>
                  </div>
                  <div class="tr mt15">
                      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                  </div>
          </div>
    </div>
</div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      num : 0,
      loading2: false,
      loading3: false,
      timeval1: "",
      timeval2: "",
      rechargeMode:'',
      startRow: 1,
      endRow: 10,
      total: 0,
      totalAmount: 0,
      loading: true,
      ordernum:'',//订单编号
      orderType: "0",//订单类型
      paymentStatus:'2',//支付状态
      cityList: [],
      parameter:this.$route.query.position,
      columns7: [
        {
          title: "坐席",
          key: "tradeNo",
          minWidth: 180,
          align: "center",
          render: (h, params) => {            
            return h("div", [h("span", {}, params.row.seatNo+params.row.seatName)]);
          }
        },
        {
          title: "信贷员",
          align: "center",
          minWidth: 100,
          key: "name",
          render: (h, params) => {            
            return h("div", [h("span", {}, params.row.phoneNumber+params.row.realName)]);
          }
        },
        {
          title: "订单类型",
          align: "center",
          minWidth: 160,
          key: "orderTypeName"
        },
        {
          title: "充值时间",
          align: "center",
          minWidth: 160,
          key: "payedTime"
        },
        {
          title: "充值赞豆",
          align: "center",
          minWidth: 90,
          key: "rechargeAmount",
          render: (h, params) => {            
            return h("div", [h("span", {}, params.row.rechargeAmount != "" ? params.row.rechargeAmount+'赞豆' : '--')]);
          }
        },
        {
          title: "支付金额",
          align: "center",
          minWidth: 110,
          key: "payAmount",
          render: (h, params) => {            
            return h("div", [h("span", {}, params.row.amount+'元')]);
          }
        },
        {
						title: "支付状态",
						key: " conversetype",
						align: "center",
						render: (h, params) => {
							let payStatus;
							if(params.row.payStatus == 1) {
								payStatus = "待支付";
							} else if(params.row.payStatus == 2) {
								payStatus = "支付成功";
							} else if(params.row.payStatus == 3) {
								payStatus = "支付失败";
							}
							return h("div", [h("span", {}, payStatus)]);
						}
					},
        {
          title: "充值方式",
          align: "center",
          minWidth: 150,
          key: "payWay"
        }
      ],
      data6: [],
    };
  },
  methods: {
    pageChange(page) {
      this.startRow = page;
      this.auditedQuery(this.startRow);     
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.auditedQuery(this.startRow);
    },
    
    // 待审核查询
    auditedQuery(startRow) {
      this.loading3 = true;
      let date1 = Date.parse(new Date(this.timeval1)) / 1000;
      let date2 = Date.parse(new Date(this.timeval2)) / 1000;
      if (date1 > date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "申请时间",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }

      let audited = {
        seatCode :this.rechargeMode,
        phoneNumber :this.ordernum,
        payStatus:this.paymentStatus,
        beginTime: this.timeval1==''?'':this.timeval1+' 00:00:00',
        endTime: this.timeval2==''?'':this.timeval2+' 23:59:59',
        pageNum: startRow,
        pageSize: this.endRow,
        orderType: this.orderType == '0' ? "" : this.orderType, 
      };
      let url
      if (this.parameter == 'admin') {
        url = "/sale/salePayOrder/queryRechargeRecordList"//经理
      } else if (this.parameter == 'staff') {
        url = "/sale/salePayOrder/queryRechargeRecordListService"//员工
      }
      this.http.post(BASE_URL + url, audited)
        .then(resp => {
          if (resp.code == "success") {
              this.data6 = resp.data.dataList
              this.totalAmount = resp.data.amountSum
            this.total = Number(resp.data.total);      
            this.startRow = Math.ceil(resp.data.startRow / this.endRow);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(() => {});
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 待审核导出
    auditedExport(num) {
      // alert(this.timeval1)
      this.loading2 = true;
      let formData = new FormData();
      formData.append("seatCode", this.rechargeMode);
      formData.append("phoneNumber", this.ordernum);
      formData.append("payStatus", this.paymentStatus);
      formData.append("beginTime", this.timeval1==''?'':this.timeval1+' 00:00:00');
      formData.append("endTime", this.timeval2==''?'':this.timeval2+' 23:59:59');
      formData.append("orderType", this.orderType == '0' ? "" : this.orderType);
      let url
      if (this.parameter == 'admin') {
        url = "/sale/salePayOrder/queryRechargeRecordListExport"//经理
      } else if (this.parameter == 'staff') {
        url = "/sale/salePayOrder/queryRechargeRecordListServiceExport"//员工
      }
      let httpUrl = BASE_URL + url;
      utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
        if (e == true) {
          this.loading2 = false;
        } else {
          this.loading2 = false;
          this.$Modal.warning({
            title: "导出文件",
            content: "<p>导出失败</p>"
          });
        }
      });
    },
    // 时间判断
    time1(value, data) {
      this.timeval1 = value;
    },
    time2(value, data) {
      this.timeval2 = value;
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
  },
  mounted() {
    // 获取当前时间
      var date=new Date();
      this.timeval1 = this.timeFormat(date,0)
      // date.setDate(1);
      this.timeval2 = this.timeFormat(date,0)
    this.auditedQuery(1);
    this.http
      .post(BASE_URL + "/sale/salePayOrder/queryRechargeRecordFilter", {})
      .then(resp => {
        if (resp.code == "success") {
          this.cityList = resp.data.saleRechargeRecordFilterRes;
        } else {
        }
      })
      .catch(() => {});
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' (to, from) {
      this.parameter = to.query.position
      this.auditedQuery(1)      //再次调起我要执行的函数
     }
  }
};
</script>
<style lang="less" scoped>
.application_state {
  // padding: 0 50px;
}
.ivu-modal {
  top: 300px !important;
}
.ivu-tabs{
  padding-bottom:130px;
}
</style>
