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
      activeState: "",
      examineStatus: "",
      activeType: "",
      filename: "",
      fileerror: "",
      total: 0,
      startRow: 1,
      endRow: 10,
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
            let activityType
            if (params.row.activityType == 2) {
              activityType = '邀请充值返利'
            } else if (params.row.activityType == 1) {
              activityType = '消费折扣'
            }
            return h('div', [
              h('span', {}, activityType)
            ])
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
          key: "registerTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "活动状态",
          key: "auditStatus",
          align: "center",
          minWidth: 110,
          render: (h, params) => {
            let status 
            if (params.row.status == 1) {
              status = '启用'
            } else if (params.row.status == 0) {
              status = '禁用'
            }
            return h('div', [
              h('span', {}, status)
            ])
          }
        },
        {
          title: "审核状态",
          key: "auditStatus",
          align: "center",
          minWidth: 110,
          render: (h, params) => {
            let auditStatus
            if (params.row.auditStatus == 2) {
              auditStatus = '审核成功'
            } else if (params.row.auditStatus == 1) {
              auditStatus = '审核中'
            } else if (params.row.auditStatus == 0) {
              auditStatus = '未提交审核'
            } else if (params.row.auditStatus == 3) {
              auditStatus = '审核失败'
            }
            return h('div', [
              h('span', {}, auditStatus)
            ])
          }
        },
        {
          title: "创建人",
          key: "loanBaseTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "操作",
          key: "accountVirtual",
          minWidth: 100,
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
                      alert("编辑");
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
                      alert("删除");
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      alert("删除");
                    }
                  }
                },
                "启动中"
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
        activityType: "", //活动类型
        auditStatus: "", //审核状态
        status: "", //活动状态
        pageNum: this.startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/activity/queryList", list)
        .then(resp => {
          console.log(resp);
          if (resp.code == "success") {
            console.log(resp);
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
    }
  },
  created() {
    this.inquire();
    this.http
      .post(BASE_URL + "/loan/activity/getActivitySearch", {})
      .then(resp => {
        console.log(resp)
        if (resp.code == "success") {
          this.activeStateList= resp.data.typeList,
          this.examineStatusList= resp.data.auditList,
          this.activeTypeList= resp.data.statusList,
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
  margin-top: 20px;
}
</style>
