<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;个人信息页</span>
          </p>
        </div>
        <div class="clearfix contentcss">
                <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                          style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                          style="width: 150px"></DatePicker>
                <Button type="info" class=" ml20 w100 mr20" :loading="loading3" @click="queryReportList">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
                <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>      
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table border highlight-row :columns="columnList" :data="reportList" size="small"
             ref="table" class="dailylist"></Table>
        </div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      loading3: false,
      loading2: false,
      beginTime: "",
      endTime: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000 * 0;
        }
      },
      columnList: [
        {
          title: "日期",
          key: "sourceTime",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
						return h("div",this.isRender(h,params,params.row.sourceTime));
					}
        },
        {
          title: "查看人数",
          key: "numberSee",
          minWidth: 100,
					align: "center",
					render: (h, params) => {
						return h("div",this.isRender(h,params,params.row.numberSee));
					}
        },
        {
          title: "提交人数",
          key: "numberSubmit",
          minWidth: 100,
					align: "center",
					render: (h, params) => {
						return h("div",this.isRender(h,params,params.row.numberSubmit));
					}
        }
      ],
      reportList: []
    };
  },
  methods: {
    //判断
    isRender(h,k,v) {
			let arrList =  [
        h(
          "span",
          {
            style: {
							fontWeight: k.row.sourceTime == "合计" ? 700 : 0,
							fontSize: k.row.sourceTime == "合计" ? '14px' : '12px'
            }
          },
          v
        )
			]
			return arrList
    },
    //查询
    queryReportList() {
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.http
        .post(BASE_URL + "/reportAcount/loanReportAcount/selectList", {
          beginDate: this.beginTime,
          endDate: this.endTime
        })
        .then(data => {
          if (data.code == "success") {
            this.reportList = data.data;
            let statisticsNumberSee = 0,
              statisticsNumberSubmit = 0;
            this.reportList.map((v, i) => {
              statisticsNumberSee += parseInt(v.numberSee);
              statisticsNumberSubmit += parseInt(v.numberSubmit);
            });
            let statistics = {
              sourceTime: "合计",
              numberSee: statisticsNumberSee,
              numberSubmit: statisticsNumberSubmit
            };
            this.reportList.splice(0, 0, statistics);
          }
        })
        .catch(err => {});
    },
    beginTimeChange(value, data) {
      this.beginTime = value;
    },
    endTimeChange(value, data) {
      this.endTime = value;
    },
    timeFormat(date, num) {
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1; //月
      let d = date.getDate(); //日
      if (num == 1) {
        d = date.getDate();
      }
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    exports() {
			this.loading2 = true;
			let formData = new FormData()
			formData.append("beginDate",this.beginTime)
			formData.append("endDate",this.endTime)
			utils.exporttable(BASE_URL+"/reportAcount/loanReportAcount/exportReportList", utils.getlocal('token'),formData, e => {
        if(e == true ){
          this.loading2 = false;
        }
      })
		}
  },
  mounted() {
    var date = new Date();
    this.endTime = this.timeFormat(date, 1);
    date.setDate(1);
    this.beginTime = this.timeFormat(date, 0);
    this.queryReportList();
  }
};
</script>
<style lang="less" scoped>
</style>

