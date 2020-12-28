<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞&nbsp;>&nbsp;已初审上传记录</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <ul class="querysty">
                  <li>
                      <span>创建时间 :</span>
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
      beginTime: "",
      endTime: "",
      loading3: false,
      loading: true,
      options3: {
                disabledDate(date) {
                return date && date.valueOf() > Date.now();
                }
            },
      columns: [
        {
          title: "批次编号",
          key: "uploadBatchLogCode",
          align: "center",
          minWidth: 150,
        },
        {
          title: "备注",
          key: "uploadMemo",
          align: "center",
          minWidth: 180
        },
        {
          title: "上传总数",
          key: "uploadSum",
          align: "center",
          minWidth: 100
        },
        {
          title: "成功数量",
          key: "uploadSuccNum",
          align: "center",
          minWidth: 100
        },
        {
          title: "失败数量",
          key: "uploadFailNum",
          align: "center",
          minWidth: 100
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 160,
        },
        {
          title: "操作人",
          key: "operator",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 100,
          fixed: "right",
          render: (h, params) => {
            let arr = [];
            arr.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    // disabled : params.row.disposeStatus == 2 ? false : true
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                        let formData = new FormData()
                        formData.append("ossPath",params.row.uploadResultUrl)
                        utils.exporttable(BASE_URL+'/fileOssDownload', utils.getlocal('token'),formData, e => {
                          // console.log(e)
                          if(e == true ){
                            
                          }
                        })
                    }
                  }
                },
                "下载"
              )
            );
            return h("div", arr);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10
    };
  },
  methods: {
    beginTimeChange(begingTime) {
      if(begingTime==''){
					this.beginTime = begingTime
				}else{					
					this.beginTime=begingTime+' 00:00:00'					
				}
    },
    endTimeChange(endTime) {
      if(endTime==''){
					this.endTime = endTime
				}else{					
					this.endTime=endTime+' 23:59:59'					
				}
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
      let urls = "/uploadBatchLog/queryList"
      let data = {
        startTime: this.beginTime,
        lastTime: this.endTime,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http.post(BASE_URL + urls, data).then(data => {
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
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
        })
    },
  },
  mounted() {
    this.queryList(1);
  }
};
</script>
<style lang="less">
</style>