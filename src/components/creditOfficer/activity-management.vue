<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;活动管理</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="activeState" placeholder="活动状态" style="width:150px;">
              <Option v-for="item in activeStateList"  :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="ml10">
            <Select v-model="examineStatus" placeholder="审核状态" style="width:150px;">
              <Option v-for="item in examineStatusList" v-if="item.code != 0" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="ml10">
            <Select v-model="activeType" placeholder="活动类型" style="width:150px;">
              <Option v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </li>
          <li class="clearfix">
            <Button type="info" class=" ml50 left w100" :loading="loading3" @click="inquire(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
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
            let status 
            if (params.row.activityStatus == 1) {
              status = '已开始'
            } else if (params.row.activityStatus == 0) {
              status = '未开始'
            } else if (params.row.activityStatus == 2) {
              status = '已结束'
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
          key: "creator",
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
                    marginRight: "5px",
                    display:  params.row.auditStatus == "1" ? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "./auditActivities?activityCode="+params.row.activityCode });
                    }
                  }
                },
                "审核"
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
                    display: params.row.auditStatus != "1" ? "display-inline" : "none"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "./auditActivities?activityCode="+params.row.activityCode+"&issee="+"see" });
                    }
                  }
                },
                "查看"
              ),
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
      this.inquire(this.startRow);
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.inquire(1);
    },
    // 列表查询
    inquire(startRow) {
      this.loading3 = true;
      let list = {
        activityType: this.activeState == -1 ? "" : this.activeState, //活动类型
        auditStatus: this.examineStatus == -1 ? "" : this.examineStatus, //审核状态
        activityStatus: this.activeType == -1 ? "" : this.activeType, //活动状态
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/activity/operateQueryList", list)
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
    this.inquire(1);
    this.http
      .post(BASE_URL + "/loan/activity/getActivitySearch", {})
      .then(resp => {
        console.log(resp)
        if (resp.code == "success") {
          this.activeStateList= resp.data.typeList,
          this.examineStatusList= resp.data.auditList,
          this.activeTypeList= resp.data.statusList,
          this.inquire(1);
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
