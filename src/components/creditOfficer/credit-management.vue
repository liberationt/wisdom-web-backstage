<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false" @on-click="labellli" :value="tabs">
        <!-- 入驻待审核 -->
        <TabPane :label="label" name="tab1">
            <div class="clearfix" >
            <div class="left">
            <Select v-model="model1" style="width:100px" @on-change="label_option">
              <Option v-for="item in searchOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字"  style="width: 150px">
            </Input>
            <Select v-model="model3" @on-change="label_state" placeholder="所属状态" style="width:200px;margin-left:20px">
                <Option v-for="item in statusOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="models" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:20px">
                <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modelshi" @on-change="cityh" placeholder="请选择市" style="width:200px;">
                <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="label_query('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="label_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="tableli == 'tab1'" :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <!-- 资料待审核 -->
        <TabPane :label="label2" name="tab2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="modelmoble"  @on-change="data_option" style="width:100px">
                <Option v-for="item in datamoble" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="dataname1" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="label2_query('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="label2_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page  v-if="tableli == 'tab2'" :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="注册无资料" name="tab3">
            <div class="clearfix">
            <div class="left">
            <label v-model="register" for="">手机号：</label>
            <Input v-model="registername" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="registermodel3" @on-change="registerstate" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in registerstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="registerinquery('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="registerinquery('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="tableli == 'tab3'" :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷员列表" name="tab4">
            <div class="clearfix">
            <div class="left">
            <Select v-model="credit1" @on-change="creditchange" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="creditname" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="registersheng" @on-change="registers" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="registershi" @on-change="registerh" placeholder="请选择市" style="width:200px;">
                <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="credit2" @on-change="credit2change" placeholder="上下架状态" style="width:200px;margin-left:50px">
                <Option v-for="item in statuslowershelves" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="credit3" @on-change="credit3change" placeholder="服务介绍状态" style="width:200px;margin-left:50px">
                <Option v-for="item in creditstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="creditinquery('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="creditinquery('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="tableli == 'tab4'" :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷机构" name="tab5">
            <div class="clearfix">
            <div class="left">
            <Input v-model="guanname" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="modell3" placeholder="上架状态" @on-change='loanstatusl' style="width:200px;margin-left:50px">
                <Option v-for="item in loanstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model4" @on-change='loanrecommendl' placeholder="是否首页推荐" style="width:200px;margin-left:50px">
                <Option v-for="item in loanrecommend" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="mechanisminqury('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <Button type="primary" class="mt15" shape="circle" icon="plus-round" @click="addManage">添加信贷机构</Button>
            <div id="application_table" class="mt15">
            <Table border :columns="columns11" :data="data10"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="tableli == 'tab5'" :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
import untils from "../../utils/utils";
export default {
  data() {
    return {
      label: h => {
        return h("div", [h("span", "入驻待审核")]);
      },
      label2: h => {
        return h("div", [h("span", "资料待审核")]);
      },
      cityList: [],
      tabs: "tab1",
      cityType: [],
      cityTypel: [],
      cityType1: [],
      cityType2: [],
      registerstatus: [],
      registercitys: [], //zhuce shi
      registercityh: [],
      registersheng: "",
      registershi: "",
      registermodel3: "",
      registername: "",
      credit1: "",
      credit2: "",
      credit3: "",
      register: "mobile",
      creditname: "",
      guanname: "",
      // registerselect: [],
      statuslowershelves: [],
      creditstatus: [],
      loanstatus: [
        {
          value: "''",
          label: "上下架状态"
        },
        {
          value: "1",
          label: "上架"
        },
        {
          value: "0",
          label: "下架"
        }
      ],
      sort: [
        {
          value: "注册时间排序",
          label: "注册时间排序"
        },
        {
          value: "登录时间排序",
          label: "登录时间排序"
        },
        {
          value: "余额排序",
          label: "余额排序"
        },
        {
          value: "咨询量排序",
          label: "咨询量排序"
        }
      ],
      loanrecommend: [
        {
          value: "''",
          label: "是否首页推荐"
        },
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      model: "",
      model1: "",
      searchOptions: [],
      statusOptions: [],
      datamoble: [],
      modelmoble: "",
      dataname1: "",
      model2: "",
      model3: "",
      modell3: "",
      model4: "",
      name: "",
      name1: "",
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: "ID",
          key: "dataId",
          width: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          width: 140,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          width: 100,
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          width: 100,
          align: "center"
        },
        {
          title: "所属区域",
          key: "loanLocationName",
          width: 150,
          align: "center"
        },
        {
          title: "贷款额度",
          key: "serviceAmount",
          width: 150,
          align: "center"
        },
        {
          title: "贷款类型",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    title: params.row.loanHaveType.join("，")
                  }
                },
                params.row.loanHaveType.join("，")
              )
            ]);
          }
        },
        {
          title: "证件",
          key: "status",
          width: 120,
          align: "center"
        },
        {
          title: "审核状态",
          width: 128,
          align: "center",
          render: (h, params) => {
            let loanStatus = params.row.loanStatus;
            let status;
            if (loanStatus == 1) {
              status = "待审核";
            } else if (loanStatus == 3) {
              status = "审核失败";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                status
              )
            ]);
          }
        },
        {
          title: "注册时间",
          key: "registerTime",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            // console.log(params)
            let status = params.row.loanStatus;
            let statusn;
            if (status == 1) {
              statusn = "审核";
            } else if (status == 3) {
              statusn = "详情";
            }
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
                      if (status == 1) {
                        this.$router.push({
                          path:
                            "./creditInformation?loanOfficerCode=" +
                            params.row.loanOfficerCode
                        });
                      } else if (status == 3) {
                        statusn = "详情";
                        this.$router.push({
                          path:
                            "./creditInformation?loanOfficerCode=" +
                            params.row.loanOfficerCode
                        });
                      }
                    }
                  }
                },
                statusn
              )
            ]);
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: "ID",
          key: "dataId",
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          align: "center"
        },
        {
          title: "修改类型",
          key: "auditType",
          align: "center"
        },
        {
          title: "审核状态",
          // key: 'auditStatus',
          align: "center",
          render: (h, params) => {
            let audstatus = params.row.auditStatus;
            let auditStatus;
            if (audstatus == 0) {
              auditStatus = "待审核";
            } else if (audstatus == 2) {
              auditStatus = "审核失败";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                auditStatus
              )
            ]);
          }
        },
        {
          title: "提交修改时间",
          key: "auditUpdateTime",
          align: "center"
        },
        {
          title: "操作",
          // key: 'action',
          width: 150,
          align: "center",
          render: (h, params) => {
            let audstatus = params.row.auditStatus;
            let auditStatus;
            if (audstatus == 0) {
              auditStatus = "审核";
            } else if (audstatus == 2) {
              auditStatus = "查看";
            }
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
                      if (audstatus == 0) {
                        auditStatus = "0";
                      } else if (audstatus == 2) {
                        auditStatus = "2";
                      }
                      this.$router.push({
                        path:
                          "./revisionReview?auditCode=" +
                          params.row.auditCode +
                          "&&auditStatus=" +
                          auditStatus
                      }); //审核
                    }
                  }
                },
                auditStatus
              )
            ]);
          }
        }
      ],
      data7: [],
      columns9: [
        {
          title: "ID",
          key: "dataId",
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          align: "center"
        },
        {
          title: "状态",
          key: "loanBaseStatus",
          align: "center"
        },
        {
          title: "注册时间",
          key: "registerTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
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
                      this.$router.push({
                        path:
                          "./creditInformation?loanOfficerCode=" +
                          params.row.loanOfficerCode
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data8: [],
      columns10: [
        {
          title: "ID",
          key: "dataId",
          minWidth: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          minWidth: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 100,
          align: "center"
        },
        {
          title: "所属区域",
          key: "loanLocationName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "状态",
          key: "servicePutawayStatus",
          minWidth: 100,
          align: "center"
        },
        {
          title: "服务介绍初始状态",
          key: "serviceIntroductionStatusName",
          minWidth: 200,
          align: "center"
        },
        {
          title: "已邀请人数",
          key: "loanInviterCodeCount",
          minWidth: 100,
          align: "center"
        },
        {
          title: "注册时间",
          key: "registerTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "最后一次登录时间",
          key: "lastLoginTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
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
                      this.$router.push({
                        path:
                          "creditInformation?loanOfficerCode=" +
                          params.row.loanOfficerCode
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data9: [],
      columns11: [
        {
          title: "ID",
          key: "dataId",
          align: "center"
        },
        {
          title: "机构名称",
          key: "institutionsName",
          align: "center"
        },
        {
          title: "状态",
          key: "institutionsUpStatus",
          align: "center",
          render: (h, params) => {
            let institutionsUpStatus;
            if (params.row.institutionsUpStatus == "0") {
              institutionsUpStatus = "下架";
            } else if (params.row.institutionsUpStatus == "1") {
              institutionsUpStatus = "上架";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                institutionsUpStatus
              )
            ]);
          }
        },
        {
          title: "首页推荐",
          align: "center",
          render: (h, params) => {
            let institutionsRecommendStatus;
            if (params.row.institutionsRecommendStatus == "0") {
              institutionsRecommendStatus = "否";
            } else if (params.row.institutionsRecommendStatus == "1") {
              institutionsRecommendStatus = "是";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                institutionsRecommendStatus
              )
            ]);
          }
        },
        {
          title: "产品数量",
          key: "productNum",
          align: "center"
        },
        {
          title: "注册时间",
          key: "dataCreateTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.adopt(params.row.institutionsCode);
                    }
                  }
                },
                "删除"
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
                      untils.setCookie(
                        "institutionsCode",
                        params.row.institutionsCode
                      );
                      this.$router.push({
                        path: "./addMechanism?isedit=" + "is"
                      });
                    }
                  }
                },
                "编辑"
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
                      untils.setCookie(
                        "institutionsCode",
                        params.row.institutionsCode
                      );
                      this.$router.push({ path: "./toExamine" });
                    }
                  }
                },
                "管理产品"
              )
            ]);
          }
        }
      ],
      data10: [],
      startRow: 1,
      endRow: 10,
      total: 0,
      modell: "",
      labelstate: "",
      labelcitys: "",
      modelshi: "", // 市
      models: "", //省
      loading3: false,
      tableli: ""
    };
  },
  methods: {
    // 信贷机构
    loanstatusl(v) {
      this.model3 = v;
    },
    loanrecommendl(v) {
      this.model4 = v;
    },
    pageChange(page) {
      this.startRow = page;
      this.params.page = page;
      if (this.tableli == "tab1") {
        this.labell1("tab1");
      } else if (this.tableli == "tab2") {
        this.labell1("tab2");
      } else if (this.tableli == "tab3") {
        this.labell1("tab3");
      } else if (this.tableli == "tab4") {
        this.labell1("tab4");
      } else if (this.tableli == "tab5") {
        this.labell1("tab5");
      }
    },
    PageSizeChange(page) {
      console.log(page);

      this.startRow = 1;
      this.endRow = page;
      if (this.tableli == "tab1") {
        this.labell1("tab1");
      } else if (this.tableli == "tab2") {
        this.labell1("tab2");
      } else if (this.tableli == "tab3") {
        this.labell1("tab3");
      } else if (this.tableli == "tab4") {
        this.labell1("tab4");
      } else if (this.tableli == "tab5") {
        this.labell1("tab5");
      }
    },
    // 信贷机构删除
    adopt(code) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认删除吗?</p>",
        onOk: () => {
          this.http
            .post(
              BASE_URL +
                "/loan/creditInstitutions/updateCreditInstitutionsStateByCode",
              { institutionsCode: code }
            )
            .then(data => {
              // console.log(data)
              if (data.code == "success") {
                this.$Message.info("删除成功！");
                this.labell1("tab5");
              } else {
                this.$Message.info("删除失败！");
              }
            })
            .catch(err => {
              this.$Message.info("删除失败！");
              console.log(err);
            });
        },
        onCancel: () => {}
      });
    },
    addManage() {
      this.$router.push({ path: "./addMechanism" });
    },
    // 接口请求封装
    post(httpUrl, params, num) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            if (num == 0) {
              this.data6 = data.data.dataList;
              //查询条件初始化
              this.modelmoble = "";
              this.dataname1 = "";
              this.registername = "";
              this.registermodel3 = "";
              this.credit1 = "";
              this.credit2 = "";
              this.credit3 = "";
              this.creditname = "";
              this.registershi = "";
              this.registersheng = "";
              this.guanname = "";
              // this.model3 = ""
              this.model4 = "";
              this.modell3 = "";
              this.loading3 = false;
              return false;
            }
            if (num == 1) {
              this.data7 = data.data.dataList;
              //查询条件初始化
              this.model1 = "";
              this.name = "";
              this.model3 = "";
              this.models = "";
              this.modelshi = "";
              this.registername = "";
              this.registermodel3 = "";
              this.credit1 = "";
              this.credit2 = "";
              this.credit3 = "";
              this.creditname = "";
              this.registershi = "";
              this.registersheng = "";
              this.guanname = "";
              this.model3 = "";
              this.model4 = "";
              this.modell3 = "";
              this.loading3 = false;
              return false;
            }
            if (num == 2) {
              // this.total = parseInt(data.data.total);
              this.data8 = data.data.dataList;
              //查询条件初始化
              this.model1 = "";
              this.name = "";
              this.model3 = "";
              this.models = "";
              this.modelshi = "";
              this.modelmoble = "";
              this.dataname1 = "";
              this.credit1 = "";
              this.credit2 = "";
              this.credit3 = "";
              this.creditname = "";
              this.registershi = "";
              this.registersheng = "";
              this.guanname = "";
              this.model3 = "";
              this.model4 = "";
              this.modell3 = "";
              this.loading3 = false;
              return false;
            }
            if (num == 3) {
              // this.total = parseInt(data.data.total);
              this.data9 = data.data.dataList;
              //查询条件初始化
              this.model1 = "";
              this.name = "";
              this.model3 = "";
              this.models = "";
              this.modelshi = "";
              this.modelmoble = "";
              this.dataname1 = "";
              this.registername = "";
              this.registermodel3 = "";
              this.guanname = "";
              this.model3 = "";
              this.model4 = "";
              this.modell3 = "";
              this.loading3 = false;
              return false;
            }
            if (num == 4) {
              // this.total = parseInt(data.data.total);
              this.data10 = data.data.creditInstitutionsList;
              this.name = "";
              this.model1 = "";
              this.labelstate = "";
              this.labelcitys = "";
              this.modelshi = "";
              this.modelmoble = "";
              this.dataname1 = "";
              this.registername = "";
              this.registermodel3 = "";
              this.credit1 = "";
              this.credit2 = "";
              this.credit3 = "";
              this.creditname = "";
              this.registershi = "";
              this.registersheng = "";
              this.loading3 = false;
              return false;
            }
          } else {
            this.total = 0;
            this.loading3 = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading3 = false;
        });
    },
    //tab 栏
    labellli(name) {
      this.tableli = name;
      this.total = 0;
      this.startRow = 1;
      this.endRow = 10;
      this.labell1(name);
    },
    //查询
    labell1(name) {
      let data;
      //入驻待审核
      if (name == "tab1") {
        data = Object.assign({
          searchValue: this.name, //手机号or姓名的参数
          searchOptions: this.model1, //手机号or 姓名
          loanStatus: this.labelstate == -1 ? null : this.labelstate, //选择状态
          loanAdCodeFirst: this.labelcitys, //区域 省
          loanAdCodeSecond: this.modelshi, //市
          pageSize: this.endRow,
          pageNum: this.startRow
        });
        this.post(
          BASE_URL + "/loan/officer/queryOfficerAdmissionList",
          data,
          0
        );
      }
      //资料带审核
      if (name == "tab2") {
        // alert(33)
        data = Object.assign({
          searchValue: this.dataname1,
          searchOptions: this.modelmoble, //姓名or手机号
          pageSize: this.endRow,
          pageNum: this.startRow
        });
        this.post(
          BASE_URL + "/loan/officer/queryOfficerDataWaitCheckList",
          data,
          1
        );
      }
      //注册无资料
      if (name == "tab3") {
        data = Object.assign({
          searchOptions: this.register,
          searchValue: this.registername,
          loanBaseStatus:
            this.registermodel3 == -1 ? null : this.registermodel3,
          pageSize: this.endRow,
          pageNum: this.startRow
        });
        this.post(BASE_URL + "/loan/officer/queryOfficerNoneDataList", data, 2);
      }
      //信贷员列表
      if (name == "tab4") {
        data = Object.assign({
          // searchOptions : "",
          searchOptions: this.credit1,
          searchValue: this.creditname,
          servicePutawayStatus: this.credit2,
          loanAdCodeFirst: this.registersheng, //省编码
          loanAdCodeSecond: this.registershi, //市编码
          serviceIntroductionStatus: this.credit3 == -1 ? null : this.credit3, //服务介绍状态
          pageSize: this.endRow,
          pageNum: this.startRow
        });
        console.log(data);
        this.post(BASE_URL + "/loan/officer/queryOfficerManagerList", data, 3);
        return false;
      }
      //信贷机构
      if (name == "tab5") {
        data = Object.assign({
          institutionsName: this.guanname, //关键字
          institutionsUpStatus: this.modell3, // 上下架状态
          institutionsRecommendStatus: this.model4, //是否首页推荐
          pageSize: this.endRow,
          pageNum: this.startRow
        });
        this.post(
          BASE_URL + "/loan/creditInstitutions/queryCreditInstitutionsList",
          data,
          4
        );
      }
    },
    //省
    citys(v) {
      // console.log(v)
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys = v;
    },
    //市
    cityh(v) {
      this.modelshi = v;
    },
    //zhuce sheng
    registerh(v) {
      this.registershi = v;
    },
    registers(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.registersheng = v;
    },
    // 市接口
    httpshi(data) {
      this.http
        .post(BASE_URL + "/loan/hotcity/queryCityAddressList", data)
        .then(data => {
          this.cityTypel = data.data || "";
          this.registercityh = data.data || "";
        });
    },
    // 入住待审核查询
    label_query(type) {
      if (this.model1 == "mobile") {
        if (this.name != "" && this.name.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1("tab1");
        }
      } else {
        this.loading3 = true;
        this.labell1("tab1");
      }
    },
    // 注册无资料查询
    registerinquery(type) {
      if (this.registername != "" && this.registername.length < 3) {
        this.phoneti(type);
      } else {
        this.loading3 = true;
        this.labell1("tab3");
      }
    },
    //信贷员列表 查询
    creditinquery(type) {
      if (this.credit1 == "mobile") {
        if (this.creditname != "" && this.creditname.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1("tab4");
        }
      } else {
        this.loading3 = true;
        this.labell1("tab4");
      }
    },
    // 信贷机构 查询
    mechanisminqury(type) {
      this.loading3 = true;
      this.labell1("tab5");
    },
    // 入住 下拉框
    label_option(v) {
      this.model1 = v;
    },
    label_state(v) {
      this.labelstate = v;
    },
    //资料待审核
    label2_query(type) {
      if (this.modelmoble == "mobile") {
        if (this.dataname1 != "" && this.dataname1.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1("tab2");
        }
      } else {
        this.loading3 = true;
        this.labell1("tab2");
      }
    },
    data_option(v) {
      this.modelmoble = v;
    },
    //注册无资料
    // registerselectl(v){
    //   this.register = v
    // },
    registerstate(v) {
      this.registermodel3 = v;
      // alert(v)
    },
    // 信贷员列表
    creditchange(v) {
      this.credit1 = v;
      // alert(v)
    },
    credit2change(v) {
      this.credit2 = v;
    },
    credit3change(v) {
      this.credit3 = v;
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
    }
  },
  created() {
    if (this.$route.query.num == 1) {
      this.tabs = "tab2";
      this.labell1("tab2");
    }
    if (this.$route.query.num == 2) {
      this.tabs = "tab5";
      this.labell1("tab5");
    }
    this.http.get("../../../static/city.json").then(data => {
      this.cityType = data;
      this.cityType1 = data;
      this.cityType2 = data;
      this.registercitys = data;
    });
    this.tableli = 'tab1'
    // 入住待审核
    this.labell1("tab1");
    // 信贷员列表 过滤条件
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerAdmissionListFilter", {})
      .then(data => {
        this.searchOptions = data.data.searchOptions;
        this.statusOptions = data.data.statusOptions;
      })
      .catch(err => {
        console.log(err);
      });
    // 资料待审核过滤条件
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerDataWaitCheckListFilter", {})
      .then(data => {
        this.datamoble = data.data.searchOptions;
      })
      .catch(err => {
        console.log(err);
      });
    // 注册无资料过滤条件
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerNoneDataListFilter", {})
      .then(data => {
        // this.registerselect = data.data.searchOptions
        this.registerstatus = data.data.statusOptions;
      })
      .catch(err => {
        console.log(err);
      });
    // 信贷员列表 过滤条件
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerManagerListFilter", {})
      .then(data => {
        this.cityList = data.data.searchOptions;
        this.creditstatus = data.data.serviceStatusOptions;
        this.statuslowershelves = data.data.servicePutawayStatusOptions;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.ivu-select-selection {
  margin-top: 10px;
}
.ivu-select-dropdown {
  height: 400px;
}
</style>
