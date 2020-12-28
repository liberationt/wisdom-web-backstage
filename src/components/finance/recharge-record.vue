<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;财务&nbsp;>&nbsp;充值记录</span>
      </p>
    </div>
    <div class="contentcss">
          <div class="application_state">
                  <div class="clearfix">
                      <ul class="querysty clearfix">
                          <li class="mr20">
                              <span>订单编号:</span>
                              <Input v-model="ordernum" class="mr10" placeholder="请输入订单编号"  style="width: 150px;"></Input>
                          </li>
                          <li class="mr20">
                              <span>姓名:</span>
                              <Input v-model="name1" class="mr10" placeholder="请输入姓名"  style="width: 150px;"></Input>
                          </li>
                          <li class="mr20">
                              <span>手机号:</span>
                              <Input v-model="phone1" class="mr10" placeholder="请输入手机号"  style="width: 150px;"></Input>
                          </li>
                          <li class="mr20">
                              <span>订单状态:</span>
                              <Select v-model="ordertype" style="width:150px">
                                <!-- <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option> -->
                              <Option  value="2" >成功</Option>
                              <Option  value="3" >失败</Option>
                              <Option  value="1" >待支付</Option>
                              </Select>
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
                              <span>充值方式:</span>
                              <Select v-model="rechargeMode" style="width:150px">
                                <!-- <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option> -->
                              <Option  value="20000000" >益倍嘉-支付宝</Option>
                              <Option  value="20000001" >益倍嘉-银行卡支付</Option>
                              <Option  value="20000002" >现金支付</Option>
                              <Option  value="20000004" >微信APP支付</Option>
                              <Option  value="20000006" >微信H5支付</Option>
                              <Option  value="20000007" >支付宝H5支付</Option>
                              </Select>
                          </li>
                          <li class="mr20">
                              <span class="lh32 ">交易完成时间:</span>
                              <DatePicker type="date" :value="timeval1" @on-change="time1" placeholder="交易发起时间" style="width: 150px"></DatePicker>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                              <DatePicker type="date" :value="timeval2" @on-change="time2" placeholder="交易完成时间" style="width: 150px"></DatePicker>
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
                    共<strong class="red">{{total}}</strong>条记录，本页充值金额<strong class="red">{{totalAmount}}</strong>元
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
      ordertype:'2',
      orderType:'0',//订单类型
      rechargeMode:'',
      startRow: 1,
      endRow: 10,
      total: 0,
      totalAmount: 0,
      loading: true,
      ordernum:'',//订单编号
      phone1:'',
      name1:'',
      cityList: [],
      columns7: [
        {
          title: "订单类型",
          key: "orderType",
          minWidth: 120,
          align: "center"
        },
        {
          title: "订单编号",
          key: "tradeNo",
          minWidth: 200,
          align: "center"
        },
        {
          title: "姓名",
          align: "center",
          minWidth: 100,
          key: "name"
        },
        {
          title: "手机号",
          align: "center",
          minWidth: 120,
          key: "mobile"
        },
        {
          title: "充值面额",
          align: "center",
          minWidth: 90,
          key: "rechargeAmount"
        },
        {
          title: "充值支付金额",
          align: "center",
          minWidth: 110,
          key: "payAmount"
        },
        {
          title: "充值方式",
          align: "center",
          minWidth: 150,
          key: "rechargePayWay"
        },
        {
          title: "交易发起时间",
          align: "center",
          minWidth: 180,
          key: "startTime"
        },
        {
          title: "交易完成时间",
          align: "center",
          minWidth: 180,
          key: "finishTime"
        },
        {
          title: "状态",
          align: "center",
          minWidth: 100,
          key: "rechargeStatus",
          render:(h,params)=>{
            return h(
              'span',
              {
                style:{
                  color:'red'
                }
              },
              params.row.rechargeStatus
            )
          }     
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
        tradeNo :this.ordernum,
        phone: this.phone1,
        name: this.name1,
        rechargeStatus:this.ordertype,
        orderType: this.orderType,
        rechargePayWay :this.rechargeMode,
        beginTime: this.timeval1,
        endTime: this.timeval2,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http.post(BASE_URL + "/loan/rechargeOrder/queryList", audited)
        .then(resp => {
          if (resp.code == "success") {
              this.data6 = resp.data.dataList
              this.totalAmount = resp.data.totalAmount
            this.total = Number(resp.data.total);      
            this.startRow = Math.ceil(resp.data.startRow / this.endRow);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(() => {});
    },
    // 手机号提示
    phoneti(type) {
      const title = "温馨提示";
      const content = "<p>手机号不能小于3位数</p>";
      switch (type) {
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
      }
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
      let phone;
      let name;
      let recordtype;
      if (num == 1) {
        recordtype = 0;
        phone = this.phone1
        name = this.name1
      } else {
        recordtype = 1;
        phone = this.phone2
      }
      let formData = new FormData();
      formData.append("tradeNo", this.ordernum);
      formData.append("phone", this.phone1);
      formData.append("name", this.name1);
      formData.append("rechargeStatus", this.ordertype);
      formData.append("rechargePayWay", this.rechargeMode);
      formData.append("beginTime", this.timeval1);
      formData.append("endTime", this.timeval2);
      formData.append("orderType", this.orderType);
      let httpUrl = BASE_URL + "/loan/rechargeOrder/export";
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
    }
  },
  mounted() {
    this.auditedQuery(1);
    this.http
      .post(BASE_URL + "/loan/withdraw/getQueryOption", {})
      .then(resp => {
        if (resp.code == "success") {
          this.cityList = resp.data.searchOptionList;
        } else {
        }
      })
      .catch(() => {});
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
