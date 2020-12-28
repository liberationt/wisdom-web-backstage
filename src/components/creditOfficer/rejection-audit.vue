<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;甩单审核</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="left">
                <ul class="querysty">
                    <li>
                        <Input class="mr20" v-for="item in searchOptions" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px"></Input>
                    </li>
                    <li>
                        <span class="ml20">发布时间 :</span>
                        <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
                        <span>  -  </span>
                        <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                        style="width: 150px"></DatePicker>
                    </li>
                    <li>
                      <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                          <span v-if="!loading3">查询</span>
                          <span v-else>查询</span>
                      </Button>
                    </li>
                </ul>
            </div>
        </div>
        <div id="application_table " class="contentcss mt10">
            <div class="allchiose">
                <Button type="primary" @click='examine'>一键审核</Button>
            </div>
            <Table highlight-row border ref="selection" :columns="columns" :data="data1" @on-selection-change="requires"></Table>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        </div>
        <Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
          <p slot="header" style="text-align:left; padding-left:10px;">
            <span>确认拒绝吗？</span>
          </p>
          <div style="text-align:left">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">        
              <FormItem label="拒绝理由：" prop="standbyDesc">
                <Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入拒绝理由"></Input>
              </FormItem>
            </Form>           
          </div>
          <div slot="footer" >
            <Button type="default"  @click="modalclose('formValidate')">关闭</Button>
            <Button type="primary" @click="dialsub('formValidate')">确认拒绝</Button>
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      orderNumber: "",
      name: "",
      beginTime: "",
      endTime: "",
      phoneNumber: "",
      loading3: false,
      modal2: false,
      failureMessageCode: "",
      dataList: [],
      searchOptions: [],
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      formValidate: {
        standbyDesc: ""
      },
      ruleValidate: {
        standbyDesc: [
          {
            required: true,
            message: "请填写拒绝理由，最多200字",
            trigger: "blur"
          },
          {
            type: "string",
            max: 200,
            message: "拒绝理由最多200字",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单时间",
          key: "submitTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "订单编号",
          key: "swingOrderNo",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#2cbaff"
                },
                on: {
                  click: () => {
                    this.$router.push("/rejectionDetails?swingOrderBaseCode="+params.row.swingOrderBaseCode);
                  }
                }
              },
              params.row.swingOrderNo
            );
          }
        },
        {
          title: "订单类型",
          key: "swingTitleTypeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "区域",
          key: "",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let loanCityNameFirst =
              params.row.loanCityNameFirst == ""
                ? "-"
                : params.row.loanCityNameFirst;
            let loanCityNameSecond =
              params.row.loanCityNameSecond == ""
                ? "-"
                : params.row.loanCityNameSecond;
            return h("span", loanCityNameFirst + " " + loanCityNameSecond);
          }
        },
        {
          title: "信贷员姓名",
          key: "loanOfficerName",
          align: "center",
          minWidth: 120
        },
        {
          title: "信贷员手机",
          key: "loanOfficerPhone",
          align: "center",
          minWidth: 150
        },
        {
          title: "接单人数",
          key: "orderReceivingCount",
          align: "center",
          minWidth: 120
        },
        {
          title: "订单状态",
          key: "swingStatusName",
          align: "center",
          minWidth: 120
        },
        {
          title: "锁定时间",
          key: "lockTimeNum",
          align: "center",
          minWidth: 120
        },
        {
          title: "接单费用",
          key: "swingOrderSumAsString",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 150,
          fixed: "right",
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
                      this.$Modal.confirm({
                        title: "温馨提示",
                        content: "<p>确认审核通过？</p>",
                        onOk: () => {
                          let swingOrderBaseCode = [];
                          swingOrderBaseCode.push(
                            params.row.swingOrderBaseCode
                          );
                          let data = {
                            swingOrderBaseCode: swingOrderBaseCode,
                            swingStatus: 2
                          };
                          this.http
                            .post(
                              BASE_URL +
                                "/loan/swingOrderBase/auditSwingBaseOrder",
                              data
                            )
                            .then(data => {
                              if (data.code == "success") {
                                this.$Message.success("审核通过完成");
                                this.dataList=''
                                this.queryList(1);
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
                "通过"
              ),
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
                      this.failureMessageCode = params.row.swingOrderBaseCode;
                      this.modal2 = true;
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 20
    };
  },
  methods: {
    beginTimeChange(beginTime) {
      this.beginTime = beginTime;
      this.beginTime += " 00:00:00";
    },
    endTimeChange(endTime) {
      this.endTime = endTime;
      this.endTime += " 23:59:59";
    },
    pageChange(pagesize) {
      this.startRow = pagesize;
      this.queryList(pagesize);
    },
    pagesizechange(pagenum) {
      this.endRow = pagenum;
      this.queryList(1);
    },
    // 关闭
    modalclose(name) {
      this.$refs[name].resetFields();
      this.modal2 = false;
      
    },
    // 拒绝
    dialsub(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let swingOrderBaseCode = [];
          swingOrderBaseCode.push(this.failureMessageCode);
          let data = {
            failureMessage: this.formValidate.standbyDesc,
            swingOrderBaseCode: swingOrderBaseCode,
            swingStatus: 6
          };
          this.http
            .post(BASE_URL + "/loan/swingOrderBase/auditSwingBaseOrder", data)
            .then(data => {
              if (data.code == "success") {
                this.modal2 = false
                this.$Message.success("拒绝通过完成");
                this.$refs[name].resetFields();
                this.dataList=''
                this.queryList(1);
              } else {
                this.$Message.error(data.message);
                this.dataList=''
                this.$refs[name].resetFields();
              }
            })
            .catch(err => {
              this.dataList=''
              this.$refs[name].resetFields();
              console.log(err);
             
            });
        }
      });
    },
    //一键审核
    examine() {
      if(this.dataList<=0){
        this.$Modal.warning({
          title: "温馨提示",
          content: "<p>请选择要审核订单!</p>",
          onOk: () => {},
          onCancel: () => {}
        })
      }else{
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认要审核通过？</p>",
          onOk: () => {
            let dataList = this.dataList;
            let reqLists = [];
            for (var index in dataList) {
              reqLists.push(dataList[index].swingOrderBaseCode);
            }
            let data = {
              swingOrderBaseCode: reqLists,
              swingStatus: 2
            };
            this.http
              .post(BASE_URL + "/loan/swingOrderBase/auditSwingBaseOrder", data)
              .then(data => {
                if (data.code == "success") {
                  this.dataList = ''
                  this.$Message.success("审核通过完成");
                  this.queryList(1);
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
    //表格选中
    requires(value) {
      this.dataList = value;
    },
    queryList(startRow) {
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.loading3 = true;
      let array = [];
      this.searchOptions.forEach(element => {
        let obj = new Object();
        obj.label = element.value;
        if (element.code == null) {
          obj.value = "";
        } else {
          obj.value = element.code;
        }
        array.push(obj);
      });
      let data = {
        searchOptions: array,
        beginTime: new Date(this.beginTime).valueOf(),
        endTime: new Date(this.endTime).valueOf(),
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/swingOrderBase/querySwingOrderAuditList", data)
        .then(data => {
          if (data.code == "success") {
            this.loading3 = false;
            this.data1 = data.data.dataList;
            this.total = data.data.total;
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          } else {
            this.loading3 = false;
          }
        })
        .catch(err => {
          this.loading3 = false;
          console.log(err);
        });
    }
  },
  mounted() {
    this.http
      .post(BASE_URL + "/loan/swingOrderBase/querySwingOrdePageListFilter", {})
      .then(resp => {
        if (resp.code == "success") {
          this.searchOptions = resp.data.searchOptions;
        } else {
        }
      })
      .catch(() => {});
    this.queryList(1);
  }
};
</script>
<style lang="less">
.allchiose {
  margin-bottom: 20px;
}
</style>