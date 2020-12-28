<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理&nbsp;>&nbsp;佣金管理</span>
        </p>
      </div>
        <div class="clearfix contentcss">
          <div class="left">
            <div class="mb20">
              <ul class="querysty querystyli">
                <li class="ml10">
                  <p>待结算佣金</p>
                  <p> <span>{{Commission.commission}}</span> 元</p>
                </li>
                <li class="ml10">
                  <p>已结算佣金</p>
                  <p><span>{{Commission.commissionSuccess}}</span>元</p>
                </li>
                <li class="ml10">
                  <p>总累计佣金</p>
                  <p><span>{{Commission.commissionTotal }}</span>元</p>
                </li>
              </ul>
            </div>
            <ul class="querysty">
              <li>
                <Select v-model="productType" placeholder="产品类型" class="mr10" style="width:150px">
                  <Option value="''">请选择</Option>
                  <Option v-for="item in productTypeList" :value="item.code" :key="item.code">{{item.label}}</Option>
                </Select>
              </li>
              <li>
                <Select v-model="releaseStatus " placeholder="结算状态" class="mr10" style="width:150px">
                  <Option value="''">请选择</Option>
                  <Option v-for="item in releaseStatusList" :value="item.type" :key="item.type">{{ item.name }}</Option>
                </Select>
              </li>
              <li>
                <Input class="mr20"  v-model="applicantName" placeholder="请输入姓名"  style="width: 150px">
                </Input>
              </li>
              <li>
                <Input class="mr20"  v-model="applicantPhone" placeholder="请输入手机号"  style="width: 150px">
                </Input>
              </li>
              <li>
                <DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                style="width: 150px"></DatePicker>
              </li>
              <li>
                <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
              </li>
               <li>
                <Button type="info" class=" ml20 w100" :loading="loading4" @click="download">
                  模版下载
                </Button>
              </li>
              <li>
                <Button type="info" class=" ml20 w100" @click="handleUpload = true">
                  <span>上传返佣记录</span>
                </Button>
              </li>
              <li>
                <Button type="info" :loading="loading2" class=" ml20 mr20 w100" @click="refuse">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>
              </li>
              <li>
                <Button type="info" class="  w100" @click="lookRecord">
                  <span>查看上传记录</span>
                </Button>
              </li>
            </ul>
          </div>
      </div>
      <div id="application_table " class="contentcss mt10">
        <Table border highlight-row @on-selection-change="menuSelectcancel" ref="selection" :columns="columns" :data="data1"></Table>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
      </div>
       <!-- 文件上传 -->
      <Modal title="上传返佣记录" v-model="handleUpload" @on-ok="uploadOk('formValidate')" @on-cancel="uploadcancel('formValidate')" ok-text="上传" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
        <div class="newtype_file mt15 mb15 pl10">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="产品类型：" prop="producType">
              <Select  v-model="formValidate.producType" style="width:260px">
                <Option v-for="item in producTypeList" :value="item.code" :key="item.code">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="选择文件:" prop="updateFile">
              <Input v-model="formValidate.updateFile" disabled style="width: 225px" class="left ml5"></Input>
              <Upload ref="upload" :before-upload="handleUpload1" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError2">
                <Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </FormItem>
            <FormItem label="备注:" prop="remarks">
              <Input v-model="formValidate.remarks"></Input>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      productType: "",
      productTypeList: [
        {type:'0',name:'贷款'},
        {type:'1',name:'信用卡'},
        {type:'2',name:'信贷工具'},
        {type:'3',name:'自营产品'},
      ],
      releaseStatus: "",
      releaseStatusList: [
        { type: '3', name: "匹配失效" },
        { type: '1', name: "未结算" },
        { type: '2', name: "已结算" },
      ],
      applicantName: "",
      applicantPhone: "",
      beginTime: "",
      endTime: "",
      handleUpload: false,
      loading3: false,
      loading: true,
      loading4:false,
      producTypeList: [
        {code:'1',label:'贷款'},
        {code:'2',label:'信用卡'},
        {code:'3',label:'工具'}
      ],
      formValidate: {
        producType: "1",
        updateFile: "",
        remarks: ""
      },
      ruleValidate: {
        producType: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        updateFile: [
          { required: true, message: "请上传文件", trigger: "blur" }
        ],
        remarks: [
          { required: true, message: "请填写备注", trigger: "blur" },
          { max: 50, message: "请输入1-50个字", trigger: "blur" }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
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
          title: "放款金额",
          key: "loanRealityAmount",
          align: "center",
          minWidth: 180
        },
        {
          title: "结算金额",
          key: "commission",
          align: "center",
          minWidth: 180
        },
        {
          title: "结算状态",
          key: "orderStatusDesc",
          align: "center",
          minWidth: 180
        },
        {
          title: "导入时间",
          key: "matchingDate",
          align: "center",
          minWidth: 180
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      loading2:false,
      Commission:[],
      fileerror:'',
      filename:'',
      uploadl:'',
      filePathUrl:'',
      productOrderCodeList:[]
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
    menuSelectcancel(v){
      this.productOrderCodeList = []
      if(v.length > 0){
        v.forEach(v=>{
          this.productOrderCodeList.push(v.productOrderCode)
        })
      } else {
        this.productOrderCodeList = []
      }
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    // 上传文件
    uploadOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.filename == "") {
            this.$Message.info("文件上传中...请稍后点击上传按钮！");
            this.changeLoading();
            return false;
          }
          this.http
            .post(BASE_URL + "/vshop/commissionBatch/upload", {
              remark: this.formValidate.remarks,
              filePathUrl: this.filename,
              productType: this.formValidate.producType
            })
            .then(data => {
              if (data.code == "success") {
                this.$Message.success("上传成功！");
                this.handleUpload = false
              } else {
                this.$Modal.warning({
                  title: "温馨提示",
                  content: !data.message ? "系统有误！" : data.message
                });
              }
              this.modal9 = false;
              this.queryList();
              this.changeLoading();
              this.$refs[name].resetFields();
            })
            .catch(err => {});
        } else {
          this.changeLoading();
        }
      });
    },
    uploadcancel(name) {
      this.$refs[name].resetFields();
    },
    // 上传格式校验
    handleFormatError2(file) {
      this.formValidate.updateFile = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 选择文件后回调
    handleUpload1(file) {
        if(file.size > 22949339){
        this.formValidate.updateFile = ""
        this.$Message.info("请选择20兆以内的文件")
        return false
      }
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
        this.filename = ''
        this.fileerror = ''
        let formData = new FormData()
        formData.append('file', file)
        formData.append('bucket', 'commisson')
        formData.append('dirs', 'excel')
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout:1000*60*5
        }
        this.http.post(BASE_URL + '/fileUpload', formData, config)
        .then((resp) => {
        if (resp.code == 'success') {
          this.filename = resp.data
          this.uploadl = 'success'
        } else {
        }
        })
        .catch(err => {
          this.fileerror = 'error'
        })
        this.formValidate.updateFile = file.name
        return false
      }
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
      let urls = "/vshop/productOrder/queryPageProductOrderCommission";
      let dataList = {
        productType: this.productType == "''" ? "" : this.productType,// 产品类型
        orderStatus :this.releaseStatus == "''" ? "" : this.releaseStatus ,//结算状态
        userName : this.applicantName,//申请人姓名
        userPhone : this.applicantPhone,//申请人手机号
        beginTime: this.beginTime==""? "" : this.beginTime+" 00:00:00",
        endTime: this.endTime==""?"":this.endTime+" 23:59:59",
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.request( urls, dataList,data=>{
        this.data1 = data.dataList;
        this.total = data.total;
        Math.ceil(data.startRow / this.endRow1) == 0
          ? 1
          : Math.ceil(data.startRow / this.endRow1);
        this.loading3 = false;
         
      },err=>{ this.loading3 = false})

      // 佣金总数
      this.queryStatistics()
    },
    // 下载
    download(){
      window.location.href = 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/vshop/%E4%BD%A3%E9%87%91%E8%AE%B0%E5%BD%95%E6%A8%A1%E6%9D%BF.xlsx' // 下载链接
    },
    // 查看上传记录
    lookRecord() {
      this.$router.push({ path: "./vlookRecord" });
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    refuse() {
      console.log(this.productOrderCodeList)
      this.loading2 = true;
      let formData = new FormData();
      formData.append("productType", this.productType == "''" ? "" : this.productType);
      formData.append("orderStatus", this.releaseStatus == "''" ? "" : this.releaseStatus);
      formData.append("userName", this.applicantName);
      formData.append("userPhone", this.applicantPhone);
      formData.append("beginTime", this.beginTime==""?"":this.beginTime+" 00:00:00");
      formData.append("endTime", this.endTime==""?"":this.endTime+" 23:59:59");
      if(this.productOrderCodeList.length <=0){
        formData.append("productOrderCodeList", '');
      } else {
        this.productOrderCodeList.forEach(v=>{
          formData.append("productOrderCodeList", v);
        })
      }
      let httpUrl = BASE_URL + "/vshop/productOrder/queryPageProductOrderCommissionExport";
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
    // 查询佣金统计
    queryStatistics(){
      this.request('/vshop/productOrder/getCommissonSum',{},data=>{
        this.Commission = data
      })
    }
  },
  mounted() {
    let arr = [100, 200, 300, 400, 100, 100, 200, 300, 400, 100];
    let com = 0;
    arr.forEach(v => {
      com += v;
    });
    // console.log(com) 测试数据
    this.queryList(1);
    // 查询统计
    this.queryStatistics()
    // 参数
    utils.publicCan(
      data=>{
        this.productTypeList = data.data.productTypeBeans
        this.producTypeList
      }
    )
  }
};
</script>
<style lang="less">
.querystyli {
  li {
    color: #fff;
    padding-top: 20px;
    font-size: 14px;
    width: 150px;
    background-color: #3399ff;
    height: 100px;
    border-radius: 20px;
    line-height: 25px;
    text-align: center;
    span{
      font-weight: bold;
      font-size: 20px;
    }
  }
  li:nth-child(1){
    background-color: #ff6600;
  }
}
</style>