<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理>&nbsp;待审核无效名单</span>
            </p>
        </div>
        <div class="clearfix contentcss sales-statis">
            <Select v-model="model" style="width:200px" @on-change="choiceset">
                <Option v-for="item in modelList" :value="item.seatNo" :key="item.seatNo">{{item.seatName}}</Option>
            </Select>
            <Input v-model="name" class="mr20 ml20" placeholder="请输入姓名" clearable style="width: 200px" />
            <Input v-model="phone" placeholder="请输入手机号" clearable style="width: 200px" />
            <Button type="info" class="ml20 mr20 w100" :loading="loading3" @click="queryReportList(1)">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
        </div>
         <div id="application_table " class="contentcss mt10">
             <div class="allchiose">
                <Button type="primary" @click='effect' :disabled='disableds'>确认无效</Button>
            </div>
            <Table border highlight-row ref="selection" :columns="columns" :data="data1" @on-row-dblclick ="Single" @on-selection-change="requires"></Table>
            <div class="tr mt15">
                <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      numberList: {},
      disableds: true,
      single: false,
      model: "all",
      modelList: [],
      reqList: [],
      name: "",
      phone: "",
      loading3: false,
      total: 0,
      startRow: 1,
      endRow: 20,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "坐席编号",
          key: "seatNo",
          minWidth: 150,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            paramsl.seatName==null?"":paramsl.seatName
            return h(
              "span",
              {},
              paramsl.seatNo +" "+paramsl.seatName
            );
          }
        },
        {
          title: "手机号",
          key: "phoneNumber",
          minWidth: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let realName = params.row.realName==""?'--':params.row.realName
            return h(
                "span",
                realName
                )
          }
        },
        {
          title: "区域",
          // key:"loanCityNameFirst",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                params.row.loanCityNameFirst
              ),
              h("span", params.row.loanCityNameSecond)
            ]);
          }
        },
        {
          title: "审核状态",
          // key:"loanStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.loanStatus == "0"
                ? "仅注册"
                : params.row.loanStatus == "1"
                  ? "待审核"
                  : params.row.loanStatus == "2" ? "已入驻" : "审核失败"
            );
          }
        },
        {
          title: "会员状态",
          key:"memberStatusName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "赞豆余额",
          key: "beanMoney",
          minWidth: 150,
          align: "center"
        },
        {
          title: "提交无效时间",
          key: "effectTime",
          minWidth: 250,
          align: "center"
        },
        {
          title: "无效原因",
          key: "effectMemo",
          minWidth: 250,
          align: "center"
        },
        {
          title: "操作",
          minWidth: 150,
          fixed: 'right',
          align: "center",
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
                      this.numberList.pageNum = (this.startRow-1)*this.endRow+params.index+1
                      this.numberList.pageSize = 1
                      this.numberList.sortType = 3
                      this.numberList.dialCode = params.row.dialCode
                      utils.putlocal('auditedInvalid', JSON.stringify(this.numberList))
                      window.open(
                        location.origin + "/#/listAudit?audited=" + 'yesAudited' + "&loanOfficerCode=" + params.row.loanOfficerCode + "&isinvalid="+ 'yes',
                        "_blank",
                        "width=1300,height=650,menubar=no,toolbar=no,status=no,scrollbars=yes"
                      );
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "<p>确认无效吗</p>",
                        onOk: () => {
                          let reqLists = [];
                          reqLists.push({
                            dialCode: params.row.dialCode,
                            effectStatus: 3,
                            loanOfficerCode: params.row.loanOfficerCode
                          });
                          let reqList = {
                            reqList: reqLists
                          };
                          this.http
                            .post(
                              BASE_URL +
                                "/sale/saleLoanOfficerInfo/batchUpdateByCode",
                              reqList
                            )
                            .then(data => {
                              if (data.code == "success") {
                                this.queryReportList(1);
                                this.$Message.success("无效完成");
                              } else {
                                this.$Message.error(data.message);
                              }
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "确认无效"
              )
            ]);
          }
        }
      ],
      data1: [],
    };
  },
  methods: {
    //选择席座。
    choiceset(model) {
      this.model = model;
    },
    //表格单行事件
    Single(v, index) {
      this.numberList.pageNum = (this.startRow-1)*this.endRow+index+1;
      this.numberList.pageSize = 1
      this.numberList.sortType = 3
      this.numberList.dialCode = v.dialCode
      utils.putlocal('auditedInvalid', JSON.stringify(this.numberList))
      window.open(
        location.origin +
          "/#/listAudit?loanOfficerCode="+ v.loanOfficerCode +"&isinvalid="+ 'yes',
        "_blank",
        "width=1300,height=650,menubar=no,toolbar=no,status=no,scrollbars=yes"
      );
    },
    //查询
    queryReportList(startRow) {
      localStorage.removeItem("auditedInvalid");
      let data = {
        phoneNumber: this.phone,
        realName: this.name,
        seatNo: this.model == 'all'?"":this.model,
        effectStatus: 2,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.numberList = data
      this.loading3 = true;
      this.http
        .post(BASE_URL + "/sale/saleLoanOfficerInfo/examineQueryList", data)
        .then(data => {
          if (data.code == "success") {
            this.loading3 = false;
            this.data1 = data.data.dataList;
            this.total = data.data.total;
          } else {
            this.loading3 = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading3 = false;
        });
    },
    requires(value) {
      this.reqList = value;
      if (this.reqList.length <= 0) {
        this.disableds = true;
      } else {
        this.disableds = false;
      }
    },
    //分页
    pageChange(pagenum) {
      this.startRow = pagenum;
      this.queryReportList(this.startRow);
    },
    pagesizechange(pagesize) {
      this.endRow = pagesize;
      this.queryReportList(1);
    },
    effect() {
      this.$Modal.confirm({
        title: "警告",
        content: "<p>选中的确认无效吗？</p>",
        onOk: () => {
          let reqArr = this.reqList;
          let reqLists = [];
          for (var index in reqArr) {
            reqLists.push({
              dialCode: reqArr[index].dialCode,
              effectStatus: 3,
              loanOfficerCode: reqArr[index].loanOfficerCode
            });
          }
          let reqList = {
            reqList: reqLists
          };
          this.http
            .post(
              BASE_URL + "/sale/saleLoanOfficerInfo/batchUpdateByCode",
              reqList
            )
            .then(data => {
              if (data.code == "success") {
                this.$Message.success("无效完成");
                this.queryReportList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: () => {}
      });
    }
  },
  mounted() {
    this.queryReportList();
    this.http
      .post(BASE_URL + "/sale/saleSeat/getSaleSeatInfoList", {seatType:1})
      .then(data => {
        this.modelList = data.data;
        this.modelList.splice(0,0,{ seatNo: "all", seatName: "请选择坐席" })
      });
  }
};
</script>
<style lang="less" scoped>
.allchiose {
  margin-bottom: 20px;
}
</style>