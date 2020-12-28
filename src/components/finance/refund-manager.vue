<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;财务&nbsp;>&nbsp;退款管理</span>
      </p>
    </div>
    <div class="contentcss">
      <!-- <Tabs type="card" :animated="false" @on-click="handleReset('formValidate')"> -->
        <!-- <TabPane v-for="(tab, index) in tabs" :key="index" :label="tab" > -->
          <div class="application_state">
            <Tabs :value=this.num :animated="false" @on-click="recordType">
              <TabPane label="待审核" name="0">
                  <div class="mt50 clearfix">
                      <div class="left">
                        <Input v-model="phone1" class="mr10" placeholder="请输入手机号"  style="width: 150px;"></Input>
                        <Input v-model="name1" class="mr10" placeholder="请输入姓名"  style="width: 150px;"></Input>
                          <!-- <Select v-model="model1" style="width:90px">
                          <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                      </Select>
                      <Input v-model="value" placeholder="请输入关键字"  style="width: 150px;margin-left:-3px"></Input> -->
                      <span class="lh32 ">申请时间:</span>
                      <DatePicker type="date" :value="timeval1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
                          &nbsp;&nbsp;-&nbsp;&nbsp;
                      <DatePicker type="date" :value="timeval2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
                      </div>
                      <div class="right ml10">
                        <Button type="info" class="left mr10 w90" :loading="loading3" @click="auditedQuery(1)">
                          <span v-if="!loading3">查询</span>
                          <span v-else>查询</span>
                        </Button>
                        <Button type="primary" class=" w90" :loading="loading2" @click="auditedExport(1)">
                          <span v-if="!loading2">导出</span>
                          <span v-else>请稍等...</span>
                        </Button>
                      </div>
                  </div>
                  <p class="mt15">
                    共<strong class="red">{{total}}</strong>条记录，退款金额<strong class="red">{{totalAmount}}</strong>元
                  </p>
                  <div class="mt15">
                      <Table border highlight-row :columns="columns7" :data="data6"></Table>
                  </div>
                  <div class="tr mt15">
                      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                  </div>
              </TabPane>
              <TabPane label="退款成功" name="1">
                  <div class="mt50 clearfix">
                      <div class="left">
                        <Input v-model="phone2" class="mr10" placeholder="请输入手机号"  style="width: 150px;"></Input>
                        <Input v-model="name2" class="mr10" placeholder="请输入姓名"  style="width: 150px;"></Input>
                          <!-- <Select v-model="model2" style="width:90px">
                          <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                      </Select>
                      <Input v-model="value2" placeholder="请输入关键字"  style="width: 150px;margin-left:-3px"></Input> -->
                      <span class="lh32 ">申请时间:</span>
                      <DatePicker type="date" :value="timeval1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
                      &nbsp;&nbsp;-&nbsp;&nbsp;
                      <DatePicker type="date"  :value="timeval2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
                      </div>
                      <div class="right ml10">
                        <Button type="info" class="left mr10 w90" :loading="loading3" @click="auditedQuery(2)">
                          <span v-if="!loading3">查询</span>
                          <span v-else>查询</span>
                        </Button>
                      </div>
                  </div>
                  <p class="mt15">
                    共<strong class="red">{{total}}</strong>条记录，退款金额<strong class="red">{{totalAmountsuc}}</strong>元
                  </p>
                  <div class="mt15">
                      <Table border highlight-row :columns="columns9" :data="data7"></Table>
                  </div>
                  <div class="tr mt15">
                      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                  </div>
              </TabPane>
            </Tabs>
          </div>
        <!-- </TabPane> -->
      <!-- </Tabs> -->
    </div>
</div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      model1: "",
      model2: "",
      num : 0,
      modal8: false,
      loading2: false,
      loading3: false,
      value8: "",
      value: "",
      value1: "",
      value2: "",
      value3: 0,
      timeval1: "",
      timeval2: "",
      startRow: 1,
      endRow: 10,
      total: 0,
      totalAmount: 0,
      totalAmountsuc: 0,
      loading: true,
      rejectcode: "",
      rejectorder: "",
      phone1:'',
      name1:'',
      phone2:'',
      name2:'',
      tabs: [
        "抢单侠"
      ],
      formValidate: {
        name: ""
      },
      ruleInline: {
        name: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" },
          { max: 50, message: "输入内容超限，请重新输入", trigger: "blur" }
        ]
      },
      cityList: [],
      columns7: [
        {
          title: "订单编号",
          key: "customerOrderNo",
          minWidth: 150,
          align: "center"
        },
        {
          title: "支付流水账号",
          align: "center",
          key: "tradeNo",
          minWidth: 120
        },
        {
          title: "退款用户",
          align: "center",
          minWidth: 120,
          key: "username"
        },
        {
          title: "手机号",
          align: "center",
          minWidth: 100,
          key: "mobile"
        },
        {
          title: "退款金额",
          align: "center",
          minWidth: 100,
          key: "amountAsFormat"
        },
        {
          title: "退款方式",
          align: "center",
          minWidth: 150,
          key: "channelName"
        },
        {
          title: "申请退款时间",
          align: "center",
          minWidth: 180,
          key: "dataCreateTime"
        },
        {
          title: "状态",
          align: "center",
          minWidth: 100,
          key: "refundStatus",
          render: (h, params) => {
            let refundStatus;
            if (params.row.refundStatus == "0") {
              refundStatus = "退款中";
            } else if (params.row.refundStatus == "1") {
              refundStatus = "退款成功";
            } else if (params.row.refundStatus == "2") {
              refundStatus = "退款失败";
            } else if (params.row.refundStatus == "3") {
              refundStatus = "待退款";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }
                },
                refundStatus
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "operation",
          fixed: 'right',
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.confirmthrough(params.row.refundOrderCode);
                    }
                  }
                },
                "退款成功"
              )
            ]);
          }
        }
      ],
      data6: [],
      data7: [],
      columns9: [
        {
          title: "操作时间",
          align: "center",
          minWidth: 160,
          key: "dataModifiedTime"
        },
        {
          title: "操作人员",
          align: "center",
          minWidth: 120,
          key: "remark1"
        },
        {
          title: "订单编号",
          align: "center",
          minWidth: 100,
          key: "customerOrderNo"
        },
        {
          title: "支付流水号",
          align: "center",
          minWidth: 100,
          key: "tradeNo"
        },
        {
          title: "退款用户",
          align: "center",
          minWidth: 100,
          key: "username"
        },
        {
          title: "手机号",
          align: "center",
          minWidth: 160,
          key: "mobile"
        },
        {
          title: "退款金额(元)",
          align: "center",
          minWidth: 160,
          key: "amountAsFormat"
        },
        {
          title: "退款方式",
          align: "center",
          minWidth: 160,
          key: "channelName"
        },
        {
          title: "申请退款时间",
          align: "center",
          minWidth: 100,
          key: "dataCreateTime"
        },
        {
          title: "状态",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    color: "#669900"
                  }
                },
                "退款成功"
              )
            ]);
          }
        }
      ],
      data8: []
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].forEach((item, index) => {
        this.$refs[name][index].resetFields();
      });
    },
    pageChange(page) {
      this.startRow = page;
      if (this.num == '0') {
        this.auditedQuery(1);
      } else {
        this.auditedQuery(2);
      }     
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      if (this.num == '0') {
        this.auditedQuery(1);
      } else {
        this.auditedQuery(2);
      }
    },
    
    // 待审核查询
    auditedQuery(num) {
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
      if (this.model1 == "mobile") {
        if (this.value != "" && this.value.length < 3) {
          this.phoneti("warning");
          this.loading3 = false;
          return false;
        }
      }
      let phone
      let name
      let recordtype;
      if (num == 1) {
        if (this.phone1 != "" && this.phone1.length < 3) {
          this.phoneti("warning");
          this.loading3 = false;
          return false;
        }
        recordtype = 3; // 审核中
        phone = this.phone1
        name = this.name1
        this.num = '0'
      } else {
        if (this.phone2 != "" && this.phone2.length < 3) {
          this.phoneti("warning");
          this.loading3 = false;
          return false;
        }
        this.num = '1'
        recordtype = 1; // 退款成功
        phone = this.phone2
        name = this.name2
      }
      let audited = {
        refundStatus: recordtype,
        phone: phone,
        name: name,
        beginTime: this.timeval1,
        endTime: this.timeval2,
        pageNum: this.startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/refundOrder/query", audited)
        .then(resp => {
          if (resp.code == "success") {
            
            this.total = Number(resp.data.total);
            this.startRow = Math.ceil(resp.data.startRow / this.endRow);
            this.loading3 = false;
            if (num == 1) {
              this.data6 = resp.data.dataList;
              this.totalAmount = resp.data.totalAmountAsFormat;
            } else {
              this.data7 = resp.data.dataList;
              this.totalAmountsuc = resp.data.totalAmountAsFormat;
            }
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
    // 确认通过
    confirmthrough(code) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认退款成功吗?</p>",
        onOk: () => {
          let list = {
            refundOrderCode: code
          };
          this.http
            .post(BASE_URL + "/loan/refundOrder/update", list)
            .then(resp => {
              if (resp.code == "success") {
                this.$Message.info("退款成功");
                this.auditedQuery(1);
              } else {
                this.$Message.info(resp.message);
              }
            })
            .catch(() => {});
        },
        onCancel: () => {}
      });
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    cancelqdx(name) {
      this.$refs[name].resetFields();
      // this.formValidate.name = ''
    },
    // 待审核导出
    auditedExport(num) {
      this.loading2 = true;
      let phone;
      let name;
      // if (this.model1 == "mobile") {
      //   phone = this.value;
      //   name = "";
      // } else if (this.model1 == "name") {
      //   name = this.value;
      //   phone = "";
      // } else {
      //   name = "";
      //   phone = "";
      // }
      let recordtype;
      if (num == 1) {
        recordtype = 0;
        phone = this.phone1
        name = this.name1
      } else {
        recordtype = 1;
        phone = this.phone2
        name = this.name2
      }
      let formData = new FormData();
      formData.append("refundStatus", 3);
      formData.append("beginTime", this.timeval1);
      formData.append("endTime", this.timeval2);
      formData.append("searchValue", this.value);
      formData.append("searchKey", this.model1);
      let httpUrl = BASE_URL + "/loan/refundOrder/export";
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
    recordType(name) {
      if (name == 0) {
        this.timeval1 = "";
        this.model1 = "";
        this.value = "";
        this.timeval2 = "";
        this.auditedQuery(1);
      } else {
        this.timeval1 = "";
        this.timeval2 = "";
        this.model1 = "";
        this.value = "";
        this.auditedQuery(2);
      }
      this.value3 = name;
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
