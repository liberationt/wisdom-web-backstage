<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;积分管理&nbsp;>&nbsp;积分权益</span>
        </p>
      </div>
      <div class="clearfix contentcss">
        <div class="left">
          <ul class="querysty">
            <li>
              <Button type="info" class='mr20' shape="circle" icon="plus-round" @click="addIntegral()">添加积分权益活动</Button>
            </li>
            <li class="mr20">
              <span>权益活动名称：</span>
              <Input v-model="InterestsName" placeholder="请输入权益活动名称" style="width: 150px" />
            </li>
            <li>
              <span>权益类型：</span>
              <Select v-model="InterestsType" placeholder="请选择类型" style="width:150px" class="mr20">
                <Option v-for="item in InterestsTypeList" :value="item.value" :key="item.label">
                  {{ item.label }}
                </Option>
              </Select>
            </li>
            <li>
              <span>权益状态：</span>
              <Select v-model="InterestsStatus" placeholder="请选择状态" style="width:150px" class="mr20">
                <Option v-for="item in InterestsStatusList" :value="item.value" :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </li>
            <li class="mr20">
              <span>
                <Select v-model="dateTimes" placeholder="请选择类型" style="width:100px">
                  <Option value="0" key="0">开始时间</Option>
                  <Option value="1" key="1">创建时间</Option>
                </Select>
              </span>
              <DatePicker type="date" v-model="beginTime" placeholder="开始时间"
              style="width: 150px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" v-model="endTime" placeholder="结束时间"
              style="width: 150px"></DatePicker>
            </li>
            <li>
              <Button type="info" class=" w100" :loading="loading3" @click="queryList(1)">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div id="application_table " class="contentcss mt10">
        <Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
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
      InterestsName: "",//权益名称
      InterestsType: "-1",
      InterestsTypeList: [
        { label: "权益类型", value: "-1" },
        { label: "赞豆", value: "1" },
        { label: "抢单券", value: "2" },
        { label: "优惠券", value: "3" },
        { label: "会员", value: "4" },
      ],
      InterestsStatus: "-1",
      InterestsStatusList: [
        { label: "权益状态", value: "-1" },
        { label: "已开始", value: "1" },
        { label: "未开始", value: "2" },
        { label: "已停止", value: "3" },
        { label: "已结束", value: "4" },
        { label: "已删除", value: "5" },
      ],
      dateTimes:'0',
      beginTime: "",
      endTime: "",
      loading3: false,
      columns: [
        {
          title: "权益活动名称",
          key: "rightsName",
          align: "center",
          minWidth: 150,
        },
        {
          title: "权益类型",
          key: "rightsType",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            let rightsType = params.row.rightsType
            return h(
              "span",
              rightsType == "1" ? "赞豆" : 
              rightsType == "2" ? "抢单券" :
              rightsType == "3" ? "优惠券" :
              rightsType == "4" ? "会员" : 
              ""
            );
          }
        },
        {
          title: "权益图片",
          key: "planPushTime",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "img",
                {
                  style: {
                    width: "30px",
                    height: "30px"
                  },
                  attrs: {
                    src: params.row.picUrl
                  },
                  
                },
                params.row.picUrl
              )
            ]);
          }
        },
        {
          title: "权益面值",
          key: "rightsWorth",
          align: "center",
          minWidth: 180
        },
        {
          title: "限量",
          key: "rewardTotalCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "实际已兑换",
          key: "rewardUsedCount",
          align: "center",
          minWidth: 150
        },
        {
          title: "开始时间",
          key: "activityBeginTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "结束时间",
          key: "activityEndTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "权益状态",
          key: "rightsStatus",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let rightsStatus = params.row.rightsStatus
            return h(
              "span",
              rightsStatus == "1" ? "已开始" : 
              rightsStatus == "2" ? "未开始" :
              rightsStatus == "3" ? "已停止" :
              rightsStatus == "4" ? "已结束" : 
              rightsStatus == "5" ? "已删除" : 
              ""
            );
          }
        },
        {
          title: "创建人",
          key: "createPerson",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
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
                    marginRight: "5px",
                    display: params.row.rightsStatus == 1 ? "inline-block" : "none" 
                  },
                  on: {
                    click: () => {
                      this.stopStart(params.row.code);
                    }
                  }
                },
                "停止"//已开始的有停止按钮，未开始的有删除按钮
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
                    display:
                      params.row.rightsStatus  == 2 ? "inline-block" : "none" 
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.code);
                    }
                  }
                },
                "删除"//已开始的有停止按钮，未开始的有删除按钮
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
                    display: params.row.rightsStatus  != 1 || (params.index==0  && this.startRow == 1)? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.http.post(BASE_URL+'/loan/rewardPointsRights/moveUp',{code:params.row.code}).then(data=>{
                        console.log(data)
                        if(data.code=="success"){
                          this.queryList(1)
                        } else {
                          this.$Message.error(data.message)
                        }
                      }).catch(err=>{console.log(err)})
                    }
                  }
                },
                "上移"//只有上架的才有上移按钮，点上移，该权益上移。第一页的第一个已开始的活动没有上移按钮
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'./addIntegral?code='+params.row.code})
                      }
                  }
                },
                "查看"//已开始的有停止按钮，未开始的有删除按钮
              ),
            ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 20,
    };
  },
  methods: {
    // 停止操作
    stopStart(code) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定停止该活动？",
        onOk: () => {
          let urls = "/loan/rewardPointsRights/stop?code=" + code;
          this.http
            .post(BASE_URL + urls)
            .then(data => {
              if (data.code == "success") {
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
    },
    pageChange(pageNumber) {
      this.startRow = pageNumber;
      this.queryList(pageNumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    //删除操作
    delete(code) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定删除该活动？</p>",
        onOk: () => {
          let urls = "/loan/rewardPointsRights/deleteByCode?code=" + code;
          this.http
            .post(BASE_URL + urls)
            .then(data => {
              if (data.code == "success") {
                this.$Message.success("删除成功");
                this.queryList(1);
              } else {
                this.$Message.error(data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //查询
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
      let urls = "/loan/rewardPointsRights/queryPage";
      let beginTime = this.beginTime == "" ? "" : utils.formatDate(this.beginTime,'yyyy-MM-dd hh:mm:ss')
      let endTime = this.endTime == "" ? "" : utils.formatDate(this.endTime,'yyyy-MM-dd 23:59:59')
      let data = {
        rightsName : this.InterestsName,
        rightsType : this.InterestsType == "-1" ? "" : this.InterestsType,
        rightsStatus : this.InterestsStatus == "-1" ? "" : this.InterestsStatus,
        dataCreateSearchEndTime : this.dateTimes == 1  ? endTime : "",
        dataCreateSearchBeginTime : this.dateTimes == 1 ? beginTime : "", //创建时间 1
        activityEndSearchTime : this.dateTimes == 0 ? endTime : "",
        activityBeginSearchTime : this.dateTimes == 0 ? beginTime : "", // 开始时间 0 
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + urls, data)
        .then(data => {
          if (data.code == "success") {
            this.data1 = data.data.dataList;
            this.total = data.data.total;
            Math.ceil(data.data.startRow / this.endRow1) == 0
              ? 1
              : Math.ceil(data.data.startRow / this.endRow1);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(err => {
          this.loading3 = false;
          console.log(err);
        });
    },
    //添加
    addIntegral() {
      this.$router.push({ path: "./addIntegral" });
    }
  },
  mounted() {
    this.queryList(1);
  }
};
</script>
<style lang="less">
</style>