<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="activeState" placeholder="请选择" style="width:150px;">
              <Option v-for="item in activeStateList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="ml10">
            <Select v-model="examineStatus" placeholder="请选择" style="width:150px;">
              <Option v-for="item in examineStatusList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="ml10">
            <Select v-model="activeType" placeholder="请选择" style="width:150px;">
              <Option v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="clearfix">
            <Button type="info" class=" ml50 left w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
          <li>
            <router-link to="./addAdministration"> 
              <Button type="success" class=" ml50 left w100">
                <span>添加</span>
              </Button> 
            </router-link>
          </li>
        </ul>
      </div>      
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    </div>
  </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      loading2: false,
      loading3: false,
      activeStateList: [],
      examineStatusList: [],
      activeTypeList: [],
      model3: "",
      activeState: "-1",
      examineStatus: "-1",
      activeType: "-1",
      filename: "",
      fileerror: "",
      total: 0,
      startRow: 1,
      endRow: 20,
      columns7: [
        {
          title: "活动标题",
          key: "title",
          minWidth: 120,
          align: "center"
        },
        {
          title: "活动类型",
          key: "activityType",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            let activityType;
            if (params.row.activityType == 2) {
              activityType = "邀请充值返利";
            } else if (params.row.activityType == 1) {
              activityType = "消费折扣";
            }
            return h("div", [h("span", {}, activityType)]);
          }
        },
        {
          title: "开始时间",
          key: "activityStartTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "结束时间",
          key: "activityEndTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "添加时间",
          key: "dataCreateTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "活动状态",
          key: "activityStatus",
          align: "center",
          minWidth: 110,
          render: (h, params) => {
            let status;
            if (params.row.activityStatus == 1) {
              status = "已开始";
            } else if (params.row.activityStatus == 2) {
              status = "已结束";
            } else if (params.row.activityStatus == 0) {
              status = "未开始";
            }
            return h("div", [h("span", {}, status)]);
          }
        },
        {
          title: "审核状态",
          key: "auditStatus",
          align: "center",
          minWidth: 110,
          render: (h, params) => {
            let auditStatus;
            if (params.row.auditStatus == 2) {
              auditStatus = "审核成功";
            } else if (params.row.auditStatus == 1) {
              auditStatus = "审核中";
            } else if (params.row.auditStatus == 0) {
              auditStatus = "未提交";
            } else if (params.row.auditStatus == 3) {
              auditStatus = "审核失败";
            }
            return h("div", [h("span", {}, auditStatus)]);
          }
        },
        {
          title: "创建人",
          key: "creator",
          minWidth: 160,
          align: "center"
        },
        {
          title: "操作",
          key: "accountVirtual",
          minWidth: 260,
          align: "center",
          render: (h, params) => {
            let activityStatus,auditStatus,status ;
            activityStatus = params.row.activityStatus //活动状态
            auditStatus = params.row.auditStatus //审核状态
            status = params.row.status
            // 活动按钮判断显示
            // if ( activityStatus == "1") {
            //   display = "inline-block";
            // } else {
            //   display = "none";
            // }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: activityStatus == "0" && auditStatus != "1"? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'./addAdministration?isedit='+'isedit'+'&activityCode='+params.row.activityCode})
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
                    marginRight: "5px",
                    display: auditStatus == "1" ||  activityStatus != "0" && auditStatus == "2"? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'./addAdministration?isSee='+'isSee'+'&activityCode='+params.row.activityCode})
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
                  style: {
                    marginRight: "5px",
                    display: activityStatus == "0" && auditStatus != "1"? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.tips("确认删除吗？", e => {
                        if (e) {
                          this.http
                            .post(
                              BASE_URL +
                                "/loan/activity/deleteByCode?activityCode=" +
                                params.row.activityCode
                            )
                            .then(data => {
                              if(data.code == "success"){
                                this.inquire();
                                this.$Message.success("删除成功！");
                              } else {
                                this.$Message.success(data.message);
                              }
                              
                            })
                            .catch(err => {});
                        }
                      });
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: activityStatus == "1" && auditStatus == "2" && status == "1" ? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.tips("确认活动下架吗？", e => {
                        if (e) {
                          this.tipsHttp(
                            {
                              activityCode: params.row.activityCode,
                              status: 0
                            },
                            e => {
                              this.inquire();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "活动下架"
              )
            ]);
          }
        }
      ],
      data6: []
    };
  },
  methods: {
    // 分页
    pageChange(page) {
      this.startRow = page;
      this.inquire();
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.inquire();
    },
    // 列表查询
    inquire() {
      this.loading3 = true;
      let list = {
        activityType: this.activeState == -1? "" : this.activeState, //活动类型
        auditStatus: this.examineStatus == -1? "" : this.examineStatus, //审核状态
        activityStatus: this.activeType == -1? "" : this.activeType, //活动状态
        pageNum: this.startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/activity/queryList", list)
        .then(resp => {
          if (resp.code == "success") {
            this.data6 = resp.data.dataList;
            this.total = resp.data.total;
            this.startRow = Math.ceil(resp.data.startRow / this.endRow);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(() => {
          this.loading3 = false;
        });
    },
    //提示
    tips(content, callback) {
      const title = "提示";
      this.$Modal.confirm({
        title: title,
        content: "<p>" + content + "</p>",
        onOk: () => {
          callback && callback(true);
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    tipsHttp(p, callback) {
      this.http
        .post(BASE_URL + "/loan/activity/ableStatusActivityByCode", p)
        .then(data=>{
          callback && callback(data)
        })
        .catch(err => {});
    }
  },
  created() {
    this.inquire();
    this.http
      .post(BASE_URL + "/loan/activity/getActivitySearch", {})
      .then(resp => {
        if (resp.code == "success") {
          (this.activeStateList = resp.data.typeList),
            (this.examineStatusList = resp.data.auditList),
            (this.activeTypeList = resp.data.statusList),
            this.inquire();
        } else {
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
