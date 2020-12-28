<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;退单报表</span>
        </p>
      </div>
        <div class="clearfix contentcss">
          <div class="left">
            <ul class="querysty">
                <li>
                  <span>统计年份:</span>
                <DatePicker type="date" v-model="beginTime" placeholder="开始时间"
                style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" class="mr20" v-model="endTime" placeholder="结束时间"
                style="width: 150px"></DatePicker>
              </li>
              <li>
                  <span>销售坐席编号:</span>
                <Select v-model="applicationType" placeholder="类型" class="mr20" style="width:150px">
                  <Option value="''">请选择</Option>
                  <Option v-for="item in applicationTypeList" :value="item.seatNo" :key="item.seatNo">{{ item.seatName }}</Option>
                </Select>
              </li>
              <li>
                  <span>信贷员姓名:</span>
                <Input class="mr20"  v-model="applicantName" placeholder="请输入申请人姓名"  style="width: 150px">
                </Input>
              </li>
              <li>
                  <span>信贷员手机号:</span>
                <Input class="mr20"  v-model="applicantPhone" placeholder="请输入申请人手机号"  style="width: 150px">
                </Input>
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
          <p class="mb15">合计:<span>{{loanOfficerUserCount}}信贷员,</span><span class="ml10">{{origRobOrderCount}}笔订单,</span><span class="ml10">{{origRefundOrderCount}}退单</span></p>
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
      applicationType: "",
      applicationTypeList: [],
      applicantName: "",
      applicantPhone: "",
      beginTime: "",
      endTime: "",
      loading3: false,
      loading: true,
      columns: [
        {
          title: "销售坐席编号",
          key: "seatNo",
          align: "center",
          minWidth: 160
        },
        {
          title: "信贷员姓名",
          key: "realName",
          align: "center",
          minWidth: 150
        },
        {
          title: "信贷员手机号",
          key: "phoneNumber",
          align: "center",
          minWidth: 180
        },
        {
          title: "原价单抢单单数",
          key: "origRobOrderCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "原价单退单单数",
          key: "origRefundOrderCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "原价单抢单金额",
          key: "origRobOrderAmount",
          align: "center",
          minWidth: 180
        },
        {
          title: "原价单退单金额",
          key: "origRefundOrderAmount",
          align: "center",
          minWidth: 180
        },
        {
          title: "当年金额退单率",
          key: "refundOrderAmountRate",
          align: "center",
          minWidth: 160
        },
        {
          title: "单数退单率",
          key: "refundOrderCountRate",
          align: "center",
          minWidth: 150
        },
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      applicationname: "",
      filePathUrl: "",
      fileName: "",
      fileerror: "",
      loading2:false,
      loanOfficerUserCount:0,
      origRobOrderCount:0,
      origRefundOrderCount:0
    };
  },
  methods: {
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
      if (this.beginTime==''||this.endTime=='') {
        this.$Modal.warning({
          title: "提示",
          content: "<p>请选择统计年份</p>"
        });
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
      let dataList = {
        seatNo: this.applicationType == "''" ? "" : this.applicationType, // 编号
        realName: this.applicantName, //申请人姓名
        phoneNumber: this.applicantPhone, //申请人手机号
        beginTime: this.beginTime == "" ? "" : utils.formatDate(this.beginTime, 'yyyy-MM-dd 00:00:00'),
        endTime: this.endTime == "" ? "" : utils.formatDate(this.endTime, 'yyyy-MM-dd 23:59:59'),
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.request(
        "/sale/refundOrderReport/queryPage",
        dataList,
        data => {
          this.data1 = data.dataList;
          this.total = data.total;
          this. loanOfficerUserCount = data.loanOfficerUserCount
          this.origRobOrderCount = data.origRobOrderCount
          this.origRefundOrderCount = data.origRefundOrderCount
          this.startRow = Math.ceil(data.startRow / this.endRow)
          this.loading3 = false;
        },err=>{ this.loading3 = false}
      );
    },
    // canshu
    canshu(){
      //参数
      this.request('/sale/saleSeat/getSaleSeatInfoList',{seatType:1},data=>{
        this.applicationTypeList = data
        // this.queryList(1);
      },err=>{})
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
    
    this.canshu()
  }
};
</script>
<style lang="less">
</style>