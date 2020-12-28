<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;信贷员列表</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
                <li>
                  <Input class="mr20" v-for="item in cityList" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Input v-model="userCode" placeholder="请输入信贷员code"  style="width: 150px">
                  </Input>
                </li>
                 <li class="mr20">
                  <Input v-model="channelName" placeholder="请输入注册渠道"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Select v-model="registersheng" @on-change="registers" placeholder="请选择省" style="width:150px;">
                    <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registershi" @on-change="registerh" placeholder="请选择市" style="width:150px;">
                    <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registermodel3" @on-change="registerstate" placeholder="所属状态" style="width:150px;">
                    <Option v-for="item in registerstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="credit2" @on-change="credit2change" placeholder="上下架状态" style="width:150px;">
                    <Option v-for="item in statuslowershelves" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>                  
                </li>
                <li class="mr20">
                  <Select v-model="credit3" @on-change="credit3change" placeholder="服务介绍状态" style="width:150px;">
                    <Option v-for="item in creditstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <DatePicker type="date" :value='beginTime' :options="options3" @on-change='begintimechange' placeholder="开始时间" style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :value='endTime' :options="options3" @on-change='endtimechange' placeholder="结束时间" style="width: 150px"></DatePicker>
                </li>
                <li class="mr20">
                  <Select v-model="userMessage" placeholder="全部用户信息" style="width:150px;">
                    <Option v-for="item in userMessageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="creditinquery('warning')">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
                <li class="right" v-if="isexports">
                  <Button type="info" class="right mr20 w90" :loading="loading4" @click="exportexe()">
                    <span v-if="!loading4">导出</span>
                    <span v-else>导出</span>
                  </Button>
                </li>
              </ul>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
        <Modal
        title="拨打电话"
        v-model="modal10"
        ok-text="确认"
        cancel-text="取消"
        @on-ok="dialing"
        width='300'
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p>确认拨打信贷员 {{nametitle}} 的电话吗?</p>
        </Modal>
        <Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
            <p slot="header" style="text-align:left">
                <span>拨打标记</span>
            </p>
            <div style="text-align:left">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">        
                <FormItem label="拨打备注" prop="memo">
                    <!-- <span>拨打备注:</span> -->
                    <Select v-model="formValidate.memo" @on-change="selremarks" placeholder="请选择" style="width:200px;">
                    <Option v-for="item in remarkslist" :value="item.remarkCode" :key="item.remarkCode">{{ item.remarkDesc }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="待办备注：" prop="standbyDesc" v-if="this.formValidate.memo == '1006'">
                    <Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
                </FormItem>
                </Form>           
            </div>
            <div slot="footer" >
                <Button type="default"  @click="modalclose('formValidate')">关闭</Button>
                <Button type="primary" @click="dialsub('formValidate')">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      isexports:false,
      userCode: "",
      modal10:false,
      modal2:false,
      nametitle:'',
      remarkslist:[],
      loanOfficerCode:'',
      dialRecordCode:'',
      beginTime:'',
      endTime:'',
      loading4:false,
      options3: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      formValidate:{
          memo:'1001',
          standbyDesc:''
      },
      ruleValidate:{
          memo: [{ required: true, message: '请选择拨打备注', trigger: 'change' }],
          standbyDesc:[{required: true,message: "请填写待办备注",trigger: "blur"}]
      },
      //以上是拨打电话的
      columns10: [
        {
          title: "ID",
          key: "dataId",
          minWidth: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          minWidth: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 100,
          align: "center"
        },
        {
          title: "注册渠道",
          key: "channelCode",
          minWidth: 140,
          align: "center"
          },
        {
          title: "用户组",
          key: "vipStatusName",
          minWidth: 110,
          align: "center"
        },
        {
          title: "所属区域",
          key: "loanLocationName",
          minWidth: 150,
          align: "center"
				},
				{
          title: "基本信息",
          key: "loanBaseStatus",
          minWidth: 150,
          align: "center"
        },
        {
          title: "状态",
          key: "servicePutawayStatus",
          minWidth: 100,
          align: "center"
        },
        {
          title: "服务介绍初始状态",
          key: "serviceIntroductionStatusName",
          minWidth: 200,
          align: "center"
        },
        {
          title: "已邀请人数",
          key: "loanInviterCodeCount",
          minWidth: 100,
          align: "center"
        },
        {
          title: "注册时间",
          key: "registerTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "最后一次登录时间",
          key: "lastLoginTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          fixed: 'right',
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
                      this.$router.push({
                        path:
                          "creditInformation?loanOfficerCode=" +
                          params.row.loanOfficerCode
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                'Button',
                {
                    props: {
                        type: "primary",
                        size: "small"
                      },
                      on:{
                          click:()=>{
                            this.modal10=true
                            this.nametitle = params.row.realName
                            this.loanOfficerCode = params.row.loanOfficerCode
                          }
                      }
                },
                '拨打'
              )
            ]);
          }
        }
      ],
      data9: [],
      userMessage: "",
      userMessageList:[

      ],
      searchOptions: [],
      statusOptions: [],
      loading3: false,
      startRow: 1,
      endRow: 10,
      total: 0,
      channelName:'',
      credit1: "mobile",
      creditname: "",
      cityList: [],
      registersheng: "",
      registercitys: [],
      registershi: "",
      registercityh: [],
      credit2: "",
      statuslowershelves: [],
      credit3: "",
			creditstatus: [],
			registerstatus:[],//所属状态
			registermodel3:'',
    };
  },
  methods: {
    //导出
    exportexe(){
      this.loading4=true
      let list = []
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].value == 'mobile') {
          if (this.cityList[i].code!=null && this.cityList[i].code.length<3 && this.cityList[i].code!='') {
            this.loading3= false
            this.phoneti('warning')
            return false
          }           
        }
        let obj = new Object ()
        obj.label = this.cityList[i].value
        if (this.cityList[i].code == null) {
            obj.value = ''
        } else {
            obj.value = this.cityList[i].code
        }
        list.push(obj)
      }
      let data = Object.assign({
        // searchOptions : "",
        searchOptions: list,
        // searchValue: this.creditname,
        servicePutawayStatus: this.credit2,
        loanAdCodeFirst: this.registersheng, //省编码
        loanAdCodeSecond: this.registershi, //市编码
				serviceIntroductionStatus: this.credit3 == -1 ? null : this.credit3, //服务介绍状态
        loanBaseStatus:this.registermodel3 == -1 ? null : this.registermodel3, //所属状态
        vipStatus: this.userMessage == "''" ? null : this.userMessage, //全部用户信息
        loanOfficerCode: this.userCode,
        channelCode:this.channelName, //渠道名称
        pageSize: this.endRow,
        pageNum: this.startRow,
        beginTime:this.beginTime=="" ?"" : this.beginTime+" 00:00:00",
        endTime:this.endTime=="" ?"" : this.endTime+" 23:59:59"
      });
      let formData = new FormData()
      let httpUrl = BASE_URL+'/loan/officer/queryOfficerManagerListExport?queryData='+encodeURIComponent(JSON.stringify(data))
      utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
        if(e == true){
          this.loading4 = false
        } else {
            this.loading4 = false
            this.$Modal.warning({
						title: '导出文件',
						content: '<p>导出失败</p>'
          })
        }
      })
    },
    begintimechange(beginTime){
      this.beginTime = beginTime
    },
    endtimechange(endTime){
      this.endTime = endTime
    },
    //拨打电话
    dialing () {
        this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", {loanOfficerCode:this.loanOfficerCode})
    .then(data => {
        if (data.code == 'success') {
            this.modal2 = true
            this.$Message.success(data.message)
            this.dialRecordCode = data.data.dialRecordCode
        }else{
            this.modal2 = false
            this.$Message.error(data.message)
        }
    })
    .catch(err => {
        console.log(err);
    });
        this.dialRemarks ()
    },
    //下拉框
    dialRemarks () {
    this.http.post(BASE_URL + "/sale/saleDialRemark/getDialRemarkList", {})
    .then(data => {
        if (data.code == 'success') {
        this.remarkslist = data.data  
        }
    })
    .catch(err => {
        console.log(err);
    });
    },
     // 导出权限判断
    toexamine () {
      this.http.post(BASE_URL + "/checkUriPermission", ['/loan/officer/queryOfficerManagerListExport']).then(data=>{
        if(data.code == 'success'){
          for (const key in data.data) {
            if (data.data[key] == true) {
              // 待定。。。。。  
              this.isexports = true    
            } else {
              this.isexports = false    
              // this.$Message.warning('暂无权限')
            }
          }
        }
      }).catch(err=>{});

      },
    //关闭
    modalclose(name){
        this.modal2 = false
        this.$refs[name].resetFields();
    },
    //提交
    dialsub(name){
    this.$refs[name].validate((valid) => {
        if (valid) {
            let list = {
            remarkCode : this.formValidate.memo,
            dialCode :this.dialRecordCode,
            loanOfficerCode :this.loanOfficerCode, 
            remark:this.formValidate.standbyDesc           
            }
            this.http.post(BASE_URL + "/sale/saleDialRecord/saveDialRemark4KF", list)
            .then(data => {
            if (data.code == 'success') {
                this.modal2 = false
                this.$Message.success('备注成功')
                this.$refs[name].resetFields();
            } else {
                this.$Message.error(data.message);
                this.$refs[name].resetFields();
            }
            }).catch(err=>{
            console.log(err)
            })
        }
    })
    },
    //下拉框的选择
    selremarks(status){
        this.formValidate.memo = status
    },
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.labell1();
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.labell1();
		},
		registerstate(v) {
			this.registermodel3 = v;
		},
    //接口封装
    post(httpUrl, params) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            this.data9 = data.data.dataList;
            this.loading3 = false;
            return false;
          } else {
            this.total = 0;
            this.loading3 = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading3 = false;
        });
    },
    // 查询
    labell1() {
      let list = []
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].value == 'mobile') {
          if (this.cityList[i].code!=null && this.cityList[i].code.length<3 && this.cityList[i].code!='') {
            this.loading3= false
            this.phoneti('warning')
            return false
          }           
        }
        let obj = new Object ()
        obj.label = this.cityList[i].value
        if (this.cityList[i].code == null) {
            obj.value = ''
        } else {
            obj.value = this.cityList[i].code
        }
        list.push(obj)
        
      }
      let date1 = Date.parse(new Date(this.beginTime))/1000
      let date2 = Date.parse(new Date(this.endTime))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let data = Object.assign({
        // searchOptions : "",
        searchOptions: list,
        // searchValue: this.creditname,
        servicePutawayStatus: this.credit2,
        loanAdCodeFirst: this.registersheng, //省编码
        loanAdCodeSecond: this.registershi, //市编码
				serviceIntroductionStatus: this.credit3 == -1 ? null : this.credit3, //服务介绍状态
        loanBaseStatus:this.registermodel3 == -1 ? null : this.registermodel3, //所属状态
        vipStatus: this.userMessage == "''" ? null : this.userMessage, //全部用户信息
        loanOfficerCode: this.userCode,
        channelCode:this.channelName, //渠道名称
        pageSize: this.endRow,
        pageNum: this.startRow,
        beginTime:this.beginTime=="" ?"" : this.beginTime+" 00:00:00",
        endTime:this.endTime=="" ?"" : this.endTime+" 23:59:59"
      });
      this.post(BASE_URL + "/loan/officer/queryOfficerManagerList", data);
      return false;
    },
    // 列表查询
    creditinquery(type) {
      this.startRow = 1
      if (this.credit1 == "mobile") {
        if (this.creditname != "" && this.creditname.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1();
        }
      } else {
        this.loading3 = true;
        this.labell1();
      }
    },
    //省
    citys(v) {
      // console.log(v)
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys = v;
    },
    //市
    cityh(v) {
      this.modelshi = v;
    },
    //zhuce sheng
    registerh(v) {
      this.registershi = v;
    },
    registers(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.registersheng = v;
    },
    // 市接口
    httpshi(data) {
      this.http
        .post(BASE_URL + "/loan/hotcity/queryCityAddressList", data)
        .then(data => {
          this.cityTypel = data.data || "";
          this.registercityh = data.data || "";
        });
    },
    // 信贷员列表
    creditchange(v) {
      this.credit1 = v;
      // alert(v)
    },
    credit2change(v) {
      this.credit2 = v;
    },
    credit3change(v) {
      this.credit3 = v;
    },
    // 手机号提示
    phoneti(type) {
      const title = "温馨提示";
      const content = "<p>手机号不能小于3位数</p>";
      switch (type) {
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
      }
    }
  },
  created() {
    this.toexamine()
    this.labell1();
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerManagerListFilter", {})
      .then(data => {
        const {searchOptions,serviceStatusOptions,servicePutawayStatusOptions,baseStatusOptions,vipStatus} = data.data
        this.cityList = searchOptions;
        this.creditstatus = serviceStatusOptions;
				this.statuslowershelves = servicePutawayStatusOptions;
        this.registerstatus = baseStatusOptions; //所属状态
        this.userMessageList =  vipStatus
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
</style>

