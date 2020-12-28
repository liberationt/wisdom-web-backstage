<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;{{tittle}}</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            
            <span class="ml20">时间:</span>
            <DatePicker v-model="times" @on-change='time2' type="month" placeholder="年份/月份" style="width: 200px"></DatePicker>
            <!-- <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 150px"></DatePicker> -->
            <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
            <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
            </Button> 
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList.byDayChildrenResList"></Table>
        </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      tittle:'',
      loading3: false,
      loading2: false,
      beginTime: "",
      endTime: "",
      times:'',
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      columnList: [
        {
          title: "日期",
          key: "time",
          minWidth: 150,
          align: "center"
        },
        {
          title: '供应商全称',
          key: 'productName',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '供应商类别',
          key: 'pageViewuvcount',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '上海',
          key: 'datesubmitUvcount',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '接口合计',
          key: 'conversionRate',
          minWidth: 150,
          align: 'center'
        },
        {
          title:'接口总量',
          key:'h5UvCount',
          minWinth:150,
          align:'center'
        }
      ],
      reportList: [],
      headerlist: []
    };
  },
  methods: {
    time2 (value, data) {
      let month
      let year
      if (value.split('-')[1].split('')[0] == '0') {
        month = value.split('-')[1].split('')[1]-1     
      } else {
        month = value.split('-')[1]-1
      }
      year = value.split('-')[0]
      if (month == 0) {
        year = value.split('-')[0]-1
        month = 12
      }
      if (month<10) {
        month = '0'+month
      }
      this.beginTime = this.getLastDay(year+'-'+month,1)
      this.endTime = this.getLastDay(value,2)
      this.times = value
    },
    // 时间选择
    beginTimeChange(value, data) {
      this.beginTime = value;
    },
    endTimeChange(value, data) {
      this.endTime = value;
    },
    timeFormat(date) {
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1; //月
      let d = date.getDate(); //日
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return y + "-" + m;
    },
    // 查询
    queryReportList() {
      if(this.times == "") {
        this.$Message.error("时间不能为空")
        return false;
      }
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
      let params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        bodyName: this.$route.query.isLh
      };
      this.http
        .post(BASE_URL + "/netmoney/collectReport/queryStatistical", params)
        .then(data => {
          if(data.code == "success"){
            this.reportList = data.data.collectAll;
            this.columnList = this.getColumnList();
            this.loading3 = false;
          } else {
            this.$Message.error(data.message)
            this.loading3 = false;
          }
        });
    },
    // 导出
    exports() {
      if(this.times == "") {
        this.$Message.error("时间不能为空")
        return false;
      }
      this.loading2 = true;
      let httpUrl =
        BASE_URL + "/netmoney/collectReport/export";
      let formData = new FormData();
      formData.append("beginTime", this.beginTime);
      formData.append("endTime", this.endTime);
      formData.append("bodyName", this.$route.query.isLh);
      utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
        this.loading2 = false;
      });
    },
    getColumnList() {
      let columnList = [
        this.getColumnItem(this.reportList.time, "time", 150),
        this.getColumnItem(
          this.reportList.supplierName,
          "supplierName",
          250,
          (h, params) => {
            return this.reportColumns2Render(
              h,
              params.row.providerResList,
              details => {
                return details.supplierName;
              }
            );
          }
        ),
        this.getColumnItem(
          this.reportList.suppliertype,
          "supplierName",
          150,
          (h, params) => {
            return this.reportColumns2Render(
              h,
              params.row.providerResList,
              details => {
                return details.supplierType;
              }
            );
          }
        )
      ];
      for (let i = 0; i < this.reportList.cityList.length; i++) {
        columnList.push(
          this.getColumnItem(
            this.reportList.cityList[i],
            "cityName",
            150,
            (h, params) => {
              // console.log("asdfasd", params, params.row.cityCountList[i]['cityCount']);
              return this.reportColumns3Render(
                h,
                params.row.providerResList,
                details => {
                  return details.cityResList[i]['cityCount'];
                }
              );
            }
          )
        );
      }
      columnList.push(
        this.getColumnItem(
          this.reportList.interfaceCount,
          "supplierName",
          150,
          (h, params) => {
            return this.reportColumns2Render(
              h,
              params.row.providerResList,
              details => {
                return details.supplierTypeCityCount;
              }
            );
          }
        )
      );
      columnList.push(
        this.getColumnItem(this.reportList.interfaceSum, "dayCount", 150)
      );
      return columnList;
    },
    getColumnItem(title, key, width, render) {
      return {
        title: title,
        key: key,
        minWidth: width,
        align: "center",
        render: render
      };
    },
    reportColumns2Render(h, params, showTextCallback) {
      let list = [];
      for (let i = 0; i < params.length; i++) {
        let text = showTextCallback ? showTextCallback(params[i]) : params[i];
        list.push(
          h(
            "span",
            {
              style: {
                display: "block",
                width: "100%",
                align: "center",
                lineHeight: "40px",
                borderBottom:
                  i < params.length - 1 || i < params[i].length - 1
                    ? "1px solid #e9eaec"
                    : ""
              }
            },
            text
          )
        );
      }
      return h("div", list);
    },
    reportColumns3Render(h, params, showTextCallback) {
      let list = [];
      for (let i = 0; i < params.length; i++) {
        // for (let j = 0; j < params[i].cityResList.length; j++) {
          let text = showTextCallback
            ? showTextCallback(params[i])
            : '默认';
          list.push(
            h(
              "span",
              {
                style: {
                  display: "block",
                  width: "100%",
                  align: "center",
                  lineHeight: "40px",
                  borderBottom:
                    i < params.length - 1 || i < params[i].length - 1
                      ? "1px solid #e9eaec"
                      : ""
                }
              },
              text
            )
          );
        // }
      }
      return h("div", list);
    },
    getLastDay (years,num) {
      years.split('-')
      var new_year = years.split('-')[0]; //取当前的年份
      let month
      if (years.split('-')[1].split('')[0] == '0') {
        month = years.split('-')[1].split('')[1]
      } else {
        month = years.split('-')[1]
      }
      let new_month
      if (num == 1) {
        new_month = month
      } else {
        new_month = month
      } 
				// var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）   
				if(month > 12) //如果当前大于12月，则年份转到下一年   
				{
					new_month -= 12; //月份减   
					new_year++; //年份增   
        }
        let new_date =  new Date(new_year,new_month,1)
        let day
        if (num == 2) {
          day = ((new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate() - 2)
        } else {
          day = ((new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate() - 1)

        }
				var newDateTime = new_year+'-'+month+'-'+day
				return newDateTime; //获取当月最后一天日期   

    }
  },
  created() {
    // console.log(this.bodyName)
  },
  mounted() {
    // var date = new Date();
    // this.times = this.timeFormat(date);
    // date.setDate(1);
    // this.beginTime = this.timeFormat(date, 0);
    // this.queryReportList ()
    if(this.$route.query.isLh==1){
      this.tittle='络慧统计'
    }else{
      this.tittle='坤玄统计'
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' (to, from) {
      this.times = ''
      if(this.$route.query.isLh==1){
       this.tittle='络慧统计'
      }else{
        this.tittle='坤玄统计'
      }
      this.reportList.byDayChildrenResList = []
      // this.queryReportList ()
     }
  }
};
</script>
<style lang="less" scoped>
</style>

