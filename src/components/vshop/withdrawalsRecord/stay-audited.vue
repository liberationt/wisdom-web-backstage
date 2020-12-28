<template>
  <div class="clearfix">
    <div class="clearfix">
      <div class="left mr10">
        <Select v-model="examineResult" placeholder="审核结果" style="width:150px">
          <Option v-for="item in examineResultList" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="left mr10">
        <Input class="mr10"  v-model="stayName" placeholder="请输入姓名"  style="width: 150px"></Input>
        <Input v-model="stayPhone" placeholder="请输入手机号"  style="width: 150px"></Input>
        <Input v-model="customerOrderNo" placeholder="请输入订单号"  style="width: 150px"></Input>
      </div>
      <div class="left mr10">
        <span>申请时间：</span>
        <DatePicker type="date" @on-change='beginchange' :options="options3" :value="beginTime" placeholder="开始时间"
        style="width: 150px"></DatePicker>
        <span>  -  </span>
        <DatePicker type="date" @on-change='endchange' :options="options3" :value="endTime" placeholder="结束时间"
        style="width: 150px"></DatePicker>
      </div>
      <Button type="info" class="left mr20 w90" :loading="loading3" @click="auditedQuery(1)">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <Button type="info" class="left mr20 w90" :loading="loading2" @click="stayexport" >
        <span v-if="!loading2">导出</span>
        <span v-else>导出</span>
      </Button>
    </div>
    <div class="mt20 clearfix"> 
      <p class="offerSettings">共 <span style="color: #db3f3f;">{{total}}</span> 条记录，提现金额 <span style="color: #db3f3f;">{{totalAmountAsFormat}}</span> 元</p>
    </div>
    <div id="application_table" class="mt15">
      <Table border highlight-row :columns="stayList" :data="stayData"></Table>
    </div>
    <div class="tr mt15">
      <Page :total="total" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
import utils from '../../../utils/utils'
export default {
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      examineResult:'-1',
      examineResultList: [
        { type: '-1', name: "审核结果" },
        { type: 'pass', name: "审核成功" },
        { type: 'reject', name: "审核失败" }
      ],
      stayName: "",
      stayPhone: "",
      customerOrderNo:'',
      loading3: false,
      loading2:false,
      rejectReason: "",
      stayList: [
        {
          title: "提现流水",
          key: "customerOrderNo",
          align: "center",
          minWidth: 160
        },
        {
          title: "姓名",
          key: "username",
          align: "center",
          minWidth: 150
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center",
          minWidth: 180
        },
        {
          title: "持卡人名称",
          key: "idcardName",
          align: "center",
          minWidth: 180
        },
        {
          title: "持卡人身份证",
          key: "idcardNo",
          align: "center",
          minWidth: 180
        },
        {
          title: "银行卡号",
          key: "bankcardNo",
          align: "center",
          minWidth: 180
        },
        {
          title: "提现金额",
          key: "amount",
          align: "center",
          minWidth: 180
        },
        {
          title: "到账金额",
          key: "realAmount",
          align: "center",
          minWidth: 180
        },
        {
          title: "当月提现总金额",
          key: "monthTotalAmount",
          align: "center",
          minWidth: 150
        },
        {
          title: "备注说明",
          key: "operateUserName",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    title: params.row.description
                  }
                },
                params.row.description
              )
            ]);
          }
        },
        {
          title: "申请时间",
          key: "applyTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "审核时间",
          key: "auditTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "到账时间",
          key: "tradeTime",
          align: "center",
          minWidth: 150
        }
      ],
      stayData: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      beginTime: "",
      endTime: "",
      toExamine: false,
      animal: "",
      loading: true,
      totalAmountAsFormat:0,
    };
  },
  methods: {
    beginchange(value){
      this.beginTime = value
    },
    endchange(value){
      this.endTime = value
    },
    // 查询
    auditedQuery(num) {
      this.loading3 = true;
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "申请时间",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      let audited = {
        recordType: 1,
        customerOrderNo:this.customerOrderNo,
        phone: this.stayPhone,
        name: this.stayName,
        auditResult:this.examineResult==-1?"":this.examineResult,
        beginTime:this.beginTime,
        endTime:this.endTime,
        pageNum: num,
        pageSize: this.endRow
      };
      this.request(
        "/vshop/withdraw/getCashList",
        audited,
        data => {
          this.totalAmountAsFormat = data.totalAmountAsFormat
          this.total = Number(data.total);
          this.startRow = Math.ceil(data.startRow / this.endRow) == 0
            ? 1
            : Math.ceil(data.startRow / this.endRow);
          this.stayData =data.dataList;
          this.loading3 = false
        },
        err => {
          this.loading3 = false;
        }
      );
    },
    //分页
    pageChange(page) {
      this.startRow = page;
      this.auditedQuery(page);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.auditedQuery(1);
    },
    // 导出
    stayexport() {
      this.loading2 = true;
      let formData = new FormData();
      formData.append("recordType", 1);
      formData.append("customerOrderNo", this.customerOrderNo);
      formData.append("phone", this.stayPhone);
      formData.append("auditResult", this.examineResult==-1?"":this.examineResult);
      formData.append("name", this.stayName);
      formData.append(
        "beginTime",
        this.beginTime 
      );
      formData.append(
        "endTime",
        this.endTime 
      );
      utils.exporttable(
        BASE_URL + "/vshop/withdraw/export",
        utils.getlocal("token"),
        formData,
        e => {
          if (e == true) {
            this.loading2 = false;
          } else {
            this.loading2 = false;
            this.$Modal.warning({
              title: "导出文件",
              content: "<p>导出失败</p>"
            });
          }
        }
      );
    },
    // 单个审核
    toExamineOk() {},
    toExamineCancel() {},
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    }
  },
  mounted(){
    var myDate = new Date(); 
    var befordata = myDate.getTime()-2*24*3600*1000
    function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
    return Y+M+D;
    }
    this.beginTime=(timestampToTime(befordata));
    var year = myDate.getFullYear(); 
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();//获取当前日（1-31） 
    if (month<10) { month = "0" + month; } 
    if (day >= 0 && day <= 9) {
    if (day == 1) {
    month = myDate.getMonth()
    if(month==0) {
    month=12; year=year-1; 
    }
    day = new Date(year, month, 0).getDate ();
    } else {
    day = day < 10 ? "0" + day : day 
    } 
    }
    var days = day-2;
    days = days<10 ? "0"+days:days;
    this.endTime = year+"-"+month + "-" + day;
    this.auditedQuery(1)
  }
};
</script>
<style lang="less" scoped>
.offerSettings {
  padding-top: 10px;
}
.toExaminestyle {
  p {
    line-height: 35px;
    span {
      width: 120px;

      text-align: right;
      display: inline-block;
    }
  }
}
</style>
