<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;注册无实名</span>
            </p>
        </div>
				<div class="conditioncss">
					<div class="clearfix">
            <div class="left">
            <label v-model="register" for="">手机号：</label>
            <Input v-model="registername" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="registerinquery('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="registerinquery('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>   
				</div>
        <div id="application_table" class="contentcss"> 
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      register: "",
      registername: "",
      endRow: 10,
      total: 0,
      startRow: 1,
      loading3: false,
      data8: [],
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
      ]
    };
  },
  methods: {
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.labell1(this.startRow);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.labell1(1);
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
    labell1(startRow) {
      let data = Object.assign({
        searchOptions: "mobile",
        searchValue: this.registername,
        pageSize: this.endRow,
        pageNum: startRow
      });
      this.post(BASE_URL + "/loan/officer/queryOfficerNoneDataList", data);
    },
    //接口封装
    post(httpUrl, params) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            this.data8 = data.data.dataList;
            this.loading3 = false;
            return false;
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

    registerinquery() {
      if (this.registername != "" && this.registername.length < 3) {
        this.phoneti(type);
      } else {
        this.loading3 = true;
        this.labell1(1);
      }
    }
  },
  created() {
    this.labell1(1);
  }
};
</script>
<style>
</style>

