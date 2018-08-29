<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;黑名单管理</span>
      </p>
    </div>
      <div class="clearfix">
        <div class="left">
          <span>应用：</span>
          <Select v-model="application" style="width:200px">
            <Option v-for="item in cityList" :value="item.businessAlias" :key="item.businessAlias">{{ item.businessName }}</Option>
          </Select>
          <Input v-model="number" class="ml5" placeholder="请输入手机号" style="width: 150px"></Input>
        </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: "",
      application: "",
      cityList: [],
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
          key: "dataCreateTime",
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
                      this.adopt(
                        params.row.blackCode,
                        params.row.blackValue,
                        params.row.businessAlias
                      );
                    }
                  }
                },
                "移除黑名单"
              )
            ]);
          }
        }
      ],
      number: "",
      data6: [],
      cityTypel: [],
      startRow: 1,
      endRow: 20,
      startRow1: 1,
      endRow1: 20,
      total: 0,
      loading3: false
    };
  },
  methods: {
    messagetype() {},
    // // 待审核
    pageChange(page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1();
    },
    PageSizeChange(limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.label_query();
      this.params.limit = limit;
    },
    // 查询
    label_query(type) {
      this.loading3 = true;
      if (this.number != "" && this.number.length < 3) {
        this.phoneti(type);
      } else {
        this.loading3 = true;
      }
      let list =    {
            pageSize: this.endRow,
            pageNum: this.startRow,
            blackValue: this.name ? this.name : null, //手机号or姓名的参数
            businessAlias: this.application //华赞
          }
      this.http.post(BASE_URL+"/black/riskBlackList/getRiskBlackListList", list).then(data => {
        console.log(data)
        if(data.code == 'success'){
          this.data6 = data.data.riskBlackListList;
          this.total = parseInt(data.data.total);
          this.loading3 = false;
        }
      }).catch(err=>{
        this.loading3 = false;
        console.log(err)
      })
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
    // 移除黑名单
    adopt(code, blackValue, businessAlias,num) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认移除黑名单吗?</p>",
        onOk: () => {
          this.http
            .post(BASE_URL + "/black/riskBlackList/updateRiskBlackListByCode", {
              blackCode: code,
              blackFlag: 1,
              blackValue: blackValue,
              businessAlias: businessAlias
            })
            .then(data => {
              console.log(data);
              if (data.code == "success") {
                this.$Message.info("移除成功！");
                this.label_query()
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
    this.application = "56DECD723B2151ECE39F98693F904E3E"
    this.http.post(BASE_URL + "/black/riskBlackList/geBusinessAliastList ",{}).then(data=>{
      if(data.code == 'success'){
        this.cityList = data.data
      }
    }).catch(err=>{
      console.log(err)
    })
    this.label_query()
  }
};
</script>
<style lang="less" scoped>
</style>

