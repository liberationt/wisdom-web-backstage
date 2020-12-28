<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理&nbsp;>&nbsp;上传记录</span>
        </p>
      </div>
        <div class="clearfix contentcss">
          <div class="left">
            <ul class="querysty">
              <li>
                <Select v-model="producType" placeholder="产品类型" class="mr10" style="width:150px">
                  <Option v-for="item in producTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </li>
              <li>
                <DatePicker type="date" :value="beginTime" :options="options3" @on-change="beginTimeChange" placeholder="开始时间"
                style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" :value="endTime" :options="options3" @on-change="endTimeChange" placeholder="结束时间"
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
      producType: -1,
      producTypeList: [
        {label:'请选择',value:-1},
        {label:'贷款',value:1},
        {label:'信用卡',value:2},
        {label:'工具',value:3}
      ],
      beginTime: "",
      endTime: "",
      loading3: false,
      loading: true,
      columns: [
        {
          title: "批次编号",
          key: "batchNo",
          align: "center",
          minWidth: 180
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
          minWidth: 150,
          render:(h,params)=>{
            return h('span',params.row.productType==1?'贷款':(params.row.productType==2?'信用卡':'工具'))
          }
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 180
        },
        {
          title: "上传总数",
          key: "totalNum",
          align: "center",
          minWidth: 180
        },
        {
          title: "成功数量",
          key: "successNum",
          align: "center",
          minWidth: 180
        },
        {
          title: "失败数量",
          key: "failNum",
          align: "center",
          minWidth: 180
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "操作人",
          key: "createUser",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      // 下载
                      let formData = new FormData()
                      formData.append("batchNo",params.row.batchNo)
                      let httpUrl = BASE_URL + '/vshop/commissionBatch/download'
                      utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
                        if(e == true){
                          this.$Message.info("下载成功");
                        }
                      })
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      applicationname: "",
      filePathUrl: "",
      fileName: "",
      fileerror: "",
      options3: {
          disabledDate (date) {
              return date && date.valueOf() > Date.now();
          }
      },
    };
  },
  methods: {
    beginTimeChange(begingTime) {
      this.beginTime = begingTime;
    },
    endTimeChange(endTime) {
      this.endTime = endTime;
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
      let urls = "/vshop/commissionBatch/queryPage";
      let data = {
        productType: this.producType == -1? "" : this.producType,
        beginTime: this.beginTime,
        endTime: this.endTime,
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
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    }
  },
  mounted() {
    this.applicationname = utils.getCookie("applicationname");
    this.queryList(1);
  }
};
</script>
<style lang="less">
</style>