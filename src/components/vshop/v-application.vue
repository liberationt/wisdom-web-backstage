<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;申请记录</span>
        </p>
      </div>
        <div class="clearfix contentcss">
          <div class="left">
            <ul class="querysty">
              <li>
                <Select v-model="applicationType" placeholder="类型" class="mr10" style="width:150px">
                  <Option value="''">请选择</Option>
                  <Option v-for="item in applicationTypeList" :value="item.code" :key="item.code">{{ item.label }}</Option>
                </Select>
              </li>
              <li>
                <Input class="mr20"  v-model="applicantName" placeholder="请输入申请人姓名"  style="width: 150px">
                </Input>
              </li>
              <li>
                <Input class="mr20"  v-model="applicantPhone" placeholder="请输入申请人手机号"  style="width: 150px">
                </Input>
              </li>
              <li>
                <Input class="mr20"  v-model="recommenderName" placeholder="请输入推荐人姓名"  style="width: 150px">
                </Input>
              </li>
              <li>
                <Input class="mr20"  v-model="recommenderPhone" placeholder="请输入推荐人手机号"  style="width: 150px">
                </Input>
              </li>
              <li>
                <DatePicker type="date" v-model="beginTime" placeholder="开始时间"
                style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" v-model="endTime" placeholder="结束时间"
                style="width: 150px"></DatePicker>
              </li>
              <li>
                <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
              </li>
              <li>
                <Button type="info" :loading="loading2" class=" ml20 w100" @click="refuse">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
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
      applicationType: "",
      applicationTypeList: [],
      applicantName: "",
      recommenderName: "",
      applicantPhone: "",
      recommenderPhone: "",
      beginTime: "",
      endTime: "",
      loading3: false,
      loading: true,
      columns: [
        {
          title: "申请人姓名",
          key: "userName",
          align: "center",
          minWidth: 160
        },
        {
          title: "手机号",
          key: "userPhone",
          align: "center",
          minWidth: 150
        },
        {
          title: "身份证",
          key: "userIdCard",
          align: "center",
          minWidth: 180
        },
        {
          title: "推荐人",
          key: "managerName",
          align: "center",
          minWidth: 180
        },
        {
          title: "推荐人手机号",
          key: "managerPhone",
          align: "center",
          minWidth: 180
        },
        {
          title: "产品类型",
          key: "productTypeDesc",
          align: "center",
          minWidth: 180
        },
        {
          title: "产品名称",
          key: "productName",
          align: "center",
          minWidth: 180
        },
        {
          title: "申请时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 160
        },
        {
          title: "申请系统",
          key: "appType",
          align: "center",
          minWidth: 150
        },
        {
          title: "匹配状态",
          key: "orderStatusDesc",
          align: "center",
          minWidth: 150
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
      loading2:false
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
      let urls = "/loan/batchHead/queryList";
      let dataList = {
        productType: this.applicationType == "''" ? "" : this.applicationType, // 类型
        managerName: this.recommenderName, //推荐人姓名 ,
        managerPhone: this.recommenderPhone, //推荐人手机号 ,
        userName: this.applicantName, //申请人姓名
        userPhone: this.applicantPhone, //申请人手机号
        beginTime: this.beginTime == "" ? "" : utils.formatDate(this.beginTime, 'yyyy-MM-dd 00:00:00'),
        endTime: this.endTime == "" ? "" : utils.formatDate(this.endTime, 'yyyy-MM-dd 23:59:59'),
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.request(
        "/vshop/productOrder/queryPageProductOrder",
        dataList,
        data => {
          this.data1 = data.dataList;
          this.total = data.total;
          this.startRow = Math.ceil(data.startRow / this.endRow)
          this.loading3 = false;
        },err=>{ this.loading3 = false}
      );
    },
    // 导出
    refuse() {
      this.loading2 = true;
      let formData = new FormData();
      formData.append("productType", this.applicationType == "''" ? "" : this.applicationType);
      formData.append("managerName", this.recommenderName);
      formData.append("managerPhone", this.recommenderPhone);
      formData.append("userName", this.applicantName);
      formData.append("userPhone", this.applicantPhone);
      formData.append("beginTime", this.beginTime == "" ? "" : utils.formatDate(this.beginTime, 'yyyy-MM-dd 00:00:00'));
      formData.append("endTime", this.endTime == "" ? "" : utils.formatDate(this.endTime, 'yyyy-MM-dd 23:59:59'));
      let httpUrl = BASE_URL + "/vshop/productOrder/queryPageProductOrderExport";
      utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
        this.loading2 = false;
        if (e == false) {
          this.loading2 = false;
          this.$Modal.warning({
            title: "导出文件",
            content: "<p>导出失败</p>"
          });
        }
      });
    },
    // canshu
    canshu(){
      //参数
      this.request('/vshop/productOrder/queryPageFilter',{},data=>{
        console.log(data)
        this.applicationTypeList = data.productTypeBeans
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
    this.queryList(1);
    this.canshu()
  }
};
</script>
<style lang="less">
</style>