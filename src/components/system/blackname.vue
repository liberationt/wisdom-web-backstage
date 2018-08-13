<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
      </p>
    </div>
      <Tabs type="card" @on-click="labell1" :value="tabs" :animated="false">
        <TabPane :label="label" name="tab1" >
          <div class="clearfix">
            <div class="left">
              <Input v-model="name" placeholder="请输入手机号" style="width: 150px">
              </Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="left ml20 w100" :loading="loading3" @click="label_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
              <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
          </div>
        </TabPane>
        <TabPane label="枪弹侠" name="tab2">
        <div class="clearfix">
        <div class="left">
          <Input v-model="name1" placeholder="请输入手机号" style="width: 150px">
          </Input>
        </div>
        <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
        <Button type="info" class="left ml20 w100" :loading="loading3" @click="label_query1('warning')">
          <span v-if="!loading3">查询</span>
          <span v-else>查询</span>
        </Button>
        </div>
        <div id="application_table" class="mt15">
          <Table border :columns="columns8" :data="data7"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="total" @on-change="pageChange1" @on-page-size-change="PageSizeChange1" show-sizer show-total></Page>
        </div>
        </TabPane>
      </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      label: h => {
        return h("div", [h("span", "华赞金服")]);
      },
      evaluatename: [
        {
          value: "姓名",
          label: "姓名"
        },
        {
          value: "手机号",
          label: "手机号"
        }
      ],
      model12: "",
      tabs: "tab1",
      model1: "",
      searchOptions: [],
      searchOptions1: [],
      searchOptions2: [],
      model2: "",
      name: "",
      name1: "",
      name2: "",
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: "类型",
          key: "blackType",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let blackType;
            if (params.row.blackType == "1") {
              blackType = "IP";
            } else if (params.row.blackType == "2") {
              blackType = "手机";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  }
                },
                blackType
              )
            ]);
          }
        },
        {
          title: "手机号/IP",
          key: "blackValue",
          minWidth: 200,
          align: "center"
        },
        {
          title: "备注",
          key: "memo",
          minWidth: 200,
          align: "center"
        },
        {
          title: "添加时间",
          key: "orderArea",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                      // alert(params.row.blackCode)
                      this.adopt(params.row.blackCode,params.row.blackValue,params.row.businessAlias)
                    }
                  }
                },
                "移除黑名单"
              )
            ]);
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: "类型",
          key: "blackType",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let blackType;
            if (params.row.blackType == "1") {
              blackType = "IP";
            } else if (params.row.blackType == "2") {
              blackType = "手机";
            }
            return h("div", [
              h(
                "span",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  }
                },
                blackType
              )
            ]);
          }
        },
        {
          title: "手机号/IP",
          key: "blackValue",
          minWidth: 200,
          align: "center"
        },
        {
          title: "备注",
          key: "memo",
          minWidth: 200,
          align: "center"
        },
        {
          title: "添加时间",
          key: "orderArea",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                      this.adopt(params.row.blackCode,params.row.blackValue,params.row.businessAlias)
                    }
                  }
                },
                "移除黑名单"
              )
            ]);
          }
        }
      ],
      data7: [],
      data8: [],
      cityTypel: [],
      cityTypel2: [],
      startRow: 1,
      endRow: 20,
      startRow1: 1,
      endRow1: 20,
      total: 0,
      models: "",
      models1: "",
      models2: "",
      modelshi: "",
      modelshi1: "",
      modelshi2: "",
      loading3: false
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    // 待审核
    pageChange(page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1("tab1");
    },
    PageSizeChange(limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.labell1("tab1");
      this.params.limit = limit;
    },
    // 查询
    label_query(type) {
      if (this.name != "" && this.name.length < 3) {
        this.phoneti(type);
      } else {
        this.loading3 = true;
        this.labell1("tab1");
      }
    },
    // 审核成功
    pageChange1(page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1("tab2");
    },
    PageSizeChange1(limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.labell1("tab2");
      this.params.limit = limit;
    },
    // 查询
    label_query1(type) {
      if (this.model12 == "mobile") {
        if (this.name1 == "" || this.name1.length < 3) {
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
    // 查询
    label_query2(type) {
      if (this.model13 == "mobile") {
        if (this.name2 == "" || this.name2.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1("tab3");
        }
      } else {
        this.loading3 = true;
        this.labell1("tab3");
      }
    },
    //tab 栏
    labell1(name) {
      // console.log(name)
      let parameter = {
        pageSize: this.endRow,
        pageNum: this.startRow
      };
      let httpurl = "/black/riskBlackList/getRiskBlackListList";
      let data;
      //待审核评价
      if (name == "tab1") {
        data = Object.assign(
          {
            blackValue: this.name ? this.name : null, //手机号or姓名的参数
            businessAlias: "56DECD723B2151ECE39F98693F904E3E" //华赞
          },
          parameter
        );
        this.post(BASE_URL + httpurl, data, 0);
      }
      //评价成功
      if (name == "tab2") {
        // alert(33)
        data = Object.assign(
          {
            blackValue: this.name1 ? this.name1 : null, //手机号or姓名的参数
            businessAlias: "56DECD723B2151ECE39F98693F904E3E" //枪弹侠
          },
          parameter
        );
        this.post(BASE_URL + httpurl, data, 1);
      }
    },
    post(httpUrl, params, num) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          console.log(data);
          if (data.code == "success") {
            if (num == 0) {
              this.data6 = data.data.riskBlackListList;
              this.total = parseInt(data.data.total);
              // 分页初始化
              this.endRow1 = 20;
              this.startRow1 = 1;
              //数据初始化
              this.name2 = "";
              this.loading3 = false;
              return false;
            }
            if (num == 1) {
              this.data7 = data.data.riskBlackListList; //枪单侠
              this.total = parseInt(data.data.total);
              // 分页初始化
              this.endRow = 20;
              this.startRow = 1;
              // 数据初始化
              this.name = "";
              this.loading3 = false;
              return false;
            }
          } else {
            this.loading3 = false;
            this.total = 0;
          }
        })
        .catch(err => {
          this.loading3 = false;
          console.log(err);
        });
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
    //移除黑名单
    adopt(code,blackValue,businessAlias) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认移除黑名单吗?</p>",
        onOk: () => {
          this.http
            .post(
              BASE_URL +
                "/black/riskBlackList/updateRiskBlackListByCode",
              { blackCode : code,blackFlag : 1,blackValue: blackValue,businessAlias : businessAlias}
            )
            .then(data => {
              console.log(data);
              if (data.code == "success") {
                this.$Message.info("移除成功！");
                this.labell1("tab1");
              } else {
                this.$Message.info("移除失败！");
              }
            })
            .catch(err => {
              this.$Message.info("移除失败！");
              console.log(err);
            });
        },
        onCancel: () => {}
      });
    }
  },
  created() {
    //初始化
    this.labell1("tab1");
  }
};
</script>
<style lang="less" scoped>
</style>

