<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;运营报表</span>
          </p>
        </div> 

        <div class="clearfix contentcss">
            <div class="data_flex">
              <div>
                <span class="ml20">时间:</span>
                <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                          style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                          style="width: 150px"></DatePicker>
                <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
              </div>
              <div>
                <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button> 
              </div>        
            </div>
        </div>
        <!-- 华赞 -->
        <div id="application_table " class="contentcss mt10">
          <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList"></Table>
        </div>
    </div>
</template>
<script>
    export default{
      data(){
        return{
          loading3: false,
          loading2: false,
          beginTime:"",
          endTime:"",
          options3: {
            disabledDate(date) {
              return date && date.valueOf() > Date.now() - 86400000;
          }
        },
        }
      },
      methods:{
        // 时间选择
        beginTimeChange(value, data) {
          this.beginTime = value
        },
        endTimeChange(value, data) {
          this.endTime = value
        },
        timeFormat(date, num) {
          let y = date.getFullYear(); //年
          let m = date.getMonth() + 1; //月
          let d = date.getDate(); //日
          if (num == 1) {
            d = date.getDate() - 1
          }
          m = m < 10 ? "0" + m : m;
          d = d < 10 ? "0" + d : d;
          return y + "-" + m + "-" + d;
        },
        queryReportList() {
          let date1 = Date.parse(new Date(this.beginTime)) / 1000
          let date2 = Date.parse(new Date(this.endTime)) / 1000
          if (date1 > date2) {
            this.$Modal.warning({
              title: '提示',
              content: '<p>开始时间不得大于结束时间</p>'
            })
          return false
          }
        }
      },
      mounted(){
        var date = new Date();
        this.endTime = this.timeFormat(date, 1)
        date.setDate(1);
        this.beginTime = this.timeFormat(date, 0)
        this.queryBusiness(() => {
          this.queryReportList()
        })
      }
    }
</script>
<style lang="less" scoped>
.data_flex{
  display: flex;justify-content: space-between
}
</style>

