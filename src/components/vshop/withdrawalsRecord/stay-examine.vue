<template>
  <div class="clearfix">
    <div class="clearfix">
      <div class="left">
        
        <Input class="mr10"  v-model="stayName" placeholder="请输入姓名"  style="width: 150px">
        </Input>
        <Input class="mr10"  v-model="stayPhone" placeholder="请输入手机号"  style="width: 150px">
        </Input>
        <Input class="mr10" v-model="customerOrderNo" placeholder="请输入订单号"  style="width: 150px"></Input>
      </div>
      <div class="left mr10">
        <span>申请时间：</span>
        <DatePicker type="date" @on-change='beginchange' :options="options3" :value="beginTime" placeholder="开始时间"
        style="width: 150px"></DatePicker>
        <span>  -  </span>
        <DatePicker type="date"  @on-change='endchange' :options="options3" :value="endTime" placeholder="结束时间"
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
      <Button type="info" class="left mr20 w90" @click="offerSettings" >
        提现设置
      </Button>
    </div>
    <div class="mt20 clearfix"> 
      <Button type="info" class="left mr10 w90" @click="batch" >批量审核</Button>
      <p class="offerSettings">共 <span style="color: #db3f3f;">{{total}}</span> 条记录，提现金额 <span style="color: #db3f3f;">{{totalAmountAsFormat}}</span> 元</p>
    </div>
    <div id="application_table" class="mt15">
      <Table border highlight-row :columns="stayList" :data="stayData" @on-selection-change="requires"></Table>
    </div>
    <div class="tr mt15">
      <Page :total="total" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
    </div>
    <!-- 批量审核modal -->
    <Modal
      v-model="batchAudit"
      class="toExaminestyle"
      title="批量审核"
      ok-text="确认审核通过"
      @on-ok="batchAuditOk"
      @on-cancel="batchAuditCancel">
      <p><span>批量审核：</span> {{amounttittle}} 条</p>
      <p><span>提现总金额：</span> {{amountMoney}}元</p>
      <p><span>到账总金额：</span> {{amountcatch}} 元</p>
    </Modal>
    <!-- 确认审核 -->
    <Modal
      v-model="toExamine"
      title="确认审核"
      ok-text="确认"
      class="toExaminestyle"
     >
      <p><span>提现编号：</span>{{examineobject.customerOrderNo }}</p>
      <p><span>申请人：</span>{{examineobject.idcardName}} {{examineobject.mobile}}</p>
      <p><span>当月提现总额：</span>{{examineobject.monthTotalAmount}} 元</p>
      <p><span>提现金额 ：</span>{{examineobject.amount}} 元</p>
      <p><span>到账金额：</span>{{examineobject.realAmount}} 元</p>
      <p><span>提现账户：</span>{{examineobject.bankName}}{{examineobject.bankcardNo}}</p>
      <p><span>备注：</span> <i style="color:red">{{examineobject.description}}</i></p>
      <p><span>申请时间：</span>{{examineobject.applyTime}} </p>
      <p><span>申请审核结果：</span> 
        <RadioGroup v-model="animal">
          <Radio label="审核通过"></Radio>
          <Radio label="驳回"></Radio>
        </RadioGroup>
      </p>
      <p v-if="animal=='驳回'"><span>驳回原因：</span> 
        <Input v-model="rejectReason" placeholder="请填写驳回原因" style="width: 300px" />
      </p>
      <div slot="footer">
   	<Button type="text" size="large" @click="toExamineCancel">取消</Button>
   	<Button type="primary" size="large" :loading="loading4" @click="toExamineOk">确定</Button>
   </div>
    </Modal>
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
      stayName: "",
      stayPhone: "",
      loading3: false,
      loading2 : false,
      rejectReason: "",
      examineobject:{},
      totalAmountAsFormat:'',
      customerOrderNo:'',
      stayList: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          minWidth: 160
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center",
          minWidth: 150
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
          title: "状态",
          key: "withdrawStatus",
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
                    whiteSpace: "nowrap",
                    color:params.row.description=='当月累计提现已超额'?'red':'black'
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
          title: "操作",
          key: "operateUserName",
          align: "center",
          minWidth: 150,
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
                      this.toExamine = true;
                      this.examineobject={
                        accountCode:params.row.accountCode,
                        customerOrderNo:params.row.customerOrderNo,
                        idcardName:params.row.idcardName,
                        mobile:params.row.mobile,
                        monthTotalAmount:params.row.monthTotalAmount,
                        amount:params.row.amount,
                        realAmount:params.row.realAmount,
                        bankName:params.row.bankName,
                        bankcardNo:params.row.bankcardNo,
                        description:params.row.description,
                        applyTime:params.row.applyTime
                      }
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        }
      ],
      stayData: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      beginTime: "",
      endTime: "",
      batchAudit: false,
      toExamine: false,
      animal: '审核通过',
      loading4: false,
      batchAuditList:[],
      amountMoney:0,
      amountcatch:0,
      amounttittle:0
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
        recordType: 0,
        phone: this.stayPhone,
        name: this.stayName,
        customerOrderNo:this.customerOrderNo,
        beginTime:this.beginTime,
        endTime:this.endTime,
        pageNum: num,
        pageSize: this.endRow
      };
      this.request("/vshop/withdraw/getCashList", audited,data=>{
        this.loading3=false
        this.total = Number(data.total);
        this.totalAmountAsFormat = data.totalAmountAsFormat
        this.startRow = Math.ceil(data.startRow / this.endRow) == 0
            ? 1
            : Math.ceil(data.startRow / this.endRow);
        this.stayData = data.dataList;
      },err=>{this.loading3 = false})
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
      this.loading2 = true
      let formData = new FormData();
      formData.append("recordType", 0);
      formData.append("phone", this.stayPhone);
      formData.append("name", this.stayName);
      formData.append("withdrawOrderCodeList", this.batchAuditList);
      formData.append("customerOrderNo", this.customerOrderNo);
      formData.append(
        "beginTime",
        this.beginTime
      );
      formData.append(
        "endTime",this.endTime
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
    // 提现设置
    offerSettings() {
      this.$router.push({ path: "./cashSetup" });
    },
    //批量
    batch(){
      if(!this.batchAuditList.length){
        this.$Message.warning('请选择要审核数据')
      }else{
        this.batchAudit = true
      }
    },
    // 批量审核
    batchAuditOk() {
      let data = {
        withdrawCodeList :this.batchAuditList
      }
      this.http.post(BASE_URL+'/vshop/withdraw/batchAudit',data)
      .then(data=>{
        if(data.code=='success'){
          this.$Message.success('批量审核成功')
          this.auditedQuery(1)
        }else{
          this.$Message.error(data.message)
        }
      })
    },
    batchAuditCancel() {
       this.batchAudit = false
    },
    toExamineCancel(){
      this.toExamine =false
        this.animal='审核通过'
        this.rejectReason=''
    },
    // 单个审核
    toExamineOk() {
      this.loading4 = true
      let data ={
        accountCode:this.examineobject.accountCode,
        customerOrderNo :this.examineobject.customerOrderNo
      }
      let urls
      if(this.animal=='审核通过'){
        urls = '/vshop/withdraw/auditPass'
      }else{
        data.reason = this.rejectReason
        urls = '/vshop/withdraw/auditReject'
        if(!this.rejectReason){
          this.$Message.error('请填写驳回原因')
          this.loading4 = false
          return false
        }
        if(!/^.{1,50}$/.test(this.rejectReason)){
          this.loading4 = false
          this.$Message.error('请填写正确格式')
          return false
        }
      }
      this.http.post(BASE_URL+urls,data)
      .then(data=>{
        if(data.code=='success'){
          this.loading4 = false
          this.toExamine = false
          this.$Message.success('审核成功')
          this.rejectReason=''
          this.auditedQuery(1)
        }else{
          this.loading4 = false
          this.$Message.error(data.message)
          this.auditedQuery(1)
        }
      }).catch(err=>{
        this.loading4 = false;
        console.log(err)
      })
    },
    //多选
    requires(value){
      let batchAuditList=[]
      this.amountMoney=0
      this.amountcatch =0
      for(var i=0;i<value.length;i++){
        batchAuditList.push(
          value[i].withdrawOrderCode 
        )
        this.amountMoney+=value[i].amount 
        this.amountcatch+=value[i].realAmount 
      }
        this.amountcatch=this.amountcatch.toFixed(2)

        this.batchAuditList = batchAuditList
        this.amounttittle = this.batchAuditList.length
      
    },
    changeLoading() {
      this.loading4 = false;
      this.$nextTick(() => {
        this.loading4 = true;
      });
    }
  },
  mounted(){
    // 查询
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
