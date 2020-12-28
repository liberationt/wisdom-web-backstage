<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理>&nbsp;已分配名单</span>
      </p>
    </div>
    <div class="clearfix conditioncss conditioncssli">
      <ul class="querysty clearfix">
        <li class="mr20">
          <Select v-model="subSeat" placeholder="请选择坐席" style="width:150px;">
            <Option :value=item.seatNo v-for="item in subSeatNameList">{{item.seatName}}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Input v-model="salesName" placeholder="请输入姓名" style="width: 150px"></Input>                 
        </li>
        <li class="mr20">
          <Input v-model="salesPhone" placeholder="请输入手机号" style="width: 150px"></Input>                 
        </li>
        <li class="mr20">
          <span>名单下放时间：</span>
          <DatePicker type="date" :options="options3" :value="salesTimeS" @on-change="salestime1"  placeholder="开始时间" style="width: 150px"></DatePicker>
          <span>  -  </span>
          <DatePicker type="date" :options="options3" :value="salesTimeE" @on-change="salestime2"  placeholder="结束时间" style="width: 150px"></DatePicker>
        </li>
        <li class="mr20">
          <span>最后拨打时间：</span>
          <DatePicker type="date" :options="options3" :value="lastTimeS" @on-change="lasttime1"  placeholder="开始时间" style="width: 150px"></DatePicker>
          <span>  -  </span>
          <DatePicker type="date" :options="options3" :value="lastTimeE" @on-change="lasttime2"  placeholder="结束时间" style="width: 150px"></DatePicker>
        </li>
        <li class="mr20">
          <span>注册时间：</span>
          <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimechange"  placeholder="开始时间" style="width: 150px"></DatePicker>
          <span>  -  </span>
          <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimechange"  placeholder="结束时间" style="width: 150px"></DatePicker>
        </li>
        <li class="mr20">
          <Select v-model="salesExamine" placeholder="审核状态" style="width:150px;">
            <Option v-for="item in saesList" :value="item.code" :key="item.code">{{ item.value }}</Option>
          </Select>                  
        </li>
        <li class="mr20">
          <Select v-model="isRecharge" placeholder="是否充值过" style="width:150px;">
            <Option v-for="item in isRechargelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="isConsumption" placeholder="是否消费过" style="width:150px;">
            <Option v-for="item in consumptionlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="isConnect" placeholder="是否接通过" style="width:150px;">
            <Option v-for="item in isConnectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="isThaw" placeholder="是否冻结" style="width:150px;">
            <Option v-for="item in isThawList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="lastCall" placeholder="最后一次拨打状态" style="width:150px;">
            <Option v-for="item in lastCallList" :value="item.code" :key="item.code">{{ item.value }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="membershipStatus" placeholder="会员状态" style="width:150px;">
            <Option v-for="item in memberList" :value="item.code" :key="item.code">{{ item.value }}</Option>
          </Select>
        </li>
        <li class="mr20">
          <Select v-model="registersheng" @on-change="registers" placeholder="请选择省" style="width:150px;">
            <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
          </Select>
          <Select v-model="registershi" @on-change="registerh" placeholder="请选择市" style="width:150px;">
            <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
          </Select>
        </li>
        <li class="right">
          <Button type="info" class="left mr20 w90" :loading="loading3" @click="query(1)">
            <span v-if="!loading3">查询</span>
            <span v-else>查询</span>
          </Button>
          <Button v-if="exportPermissions" type="primary" class="right w90" :loading="loading2" @click="auditedExport">
            <span v-if="!loading2">导出</span>
            <span v-else>请稍等...</span>
          </Button>
        </li>
      </ul>
    </div>
    <div class="contentcss"> 
      <div class="contentcsstab">
          <Button type="primary" :disabled="this.flag == true? false: true" class="left mr20 w100" @click="flag && batchSubName()">
            修改名单
          </Button>
         <Button :type="this.salesExamine == -1 ? 'primary' : 'default'" @click="All" shape="circle">所有用户</Button>
         <Button :type="this.salesExamine == 0 ? 'primary' : 'default'" shape="circle" @click="Registration">仅注册</Button>
         <Button :type="this.salesExamine == 1 ? 'primary' : 'default'" shape="circle" @click="Audited">待审核</Button>
         <Button :type="this.salesExamine == 2 ? 'primary' : 'default'" shape="circle" @click="Settled">已入驻</Button>
      </div>
      <div id="application_table" class="mt15">
        <Table border highlight-row @on-row-dblclick = "Single" ref="selection" :columns="columns10" :data="data9" @on-selection-change="options"></Table>
      </div>
      <div class="tr mt15">
        <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
      </div>
    </div>
    <!-- 分配名单弹框 -->
    <Modal
      v-model="isSubName"
      title="修改名单"
      @on-ok="subNameOk('formValidate')"
      @on-cancel="subNAmecancel('formValidate')"
      ok-text="确定修改"
      cancel-text="关闭"
      :loading="loading"
      >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="名单人数：" prop="subName">
          <input disabled style="backgroundColor:#fff;" v-model="formValidate.subName"></input>
        </FormItem>
        <FormItem label="分配坐席：" prop="subSeat">
          <Select v-model="formValidate.subSeat" placeholder="请选择分配坐席" style="width:150px;">
            <Option :value=item.seatCode v-show="item.seatNo != '-1'" v-for="item in subSeatNameList">{{item.seatName}}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import utils from '../../utils/utils';
export default {
  data() {
    return {
      options3: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000*0;
        }
      },
      numberList:{},
      loading: true,
      loading2:false,
      flag: false,
      exportPermissions:false,
      subSeatNameList:[],
      formValidate: {
        subName: '',
        subSeat: '',
      },
      ruleValidate: {
        subSeat: [
          { required: true, message: '请选择分配坐席', trigger: 'change' }
        ],
      },
      subSeat:"-1",//坐席
      isSubName: false,
      loading: true,
      columns10: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "坐席编号",
          width: 150,
          align: "center",
          key:'seatNo',
          render(h, params) {
            let paramsl = params.row;
            let seatName = paramsl.seatName == "" || paramsl.seatName == null ?  "" : paramsl.seatName
            return h(
              "span",
              {},
              paramsl.seatNo +" "+ seatName
            );
          }
        },
        {
          title: "手机号",
          key: "phoneNumber",
          minWidth: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.realName==""?"--":paramsl.realName
            );
          }
        },
        {
          title: "区域",
          key: "loanCityNameSecond",
          minWidth: 150,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.loanCityNameFirst + "--" + paramsl.loanCityNameSecond
            );
          }
        },
        {
          title: "注册时间",
          key: "registrationTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "名单下放时间",
          key: "listDownTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "最后拨打时间",
          key: "dialEndTime",
          minWidth: 160,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.dialEndTime == null ? "--": paramsl.dialEndTime
            );
          }
        },
        {
          title: "最后拨打状态",
          key: "dialEndTime",
          minWidth: 160,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.talkStatus == 0 ? "未接通": paramsl.talkStatus == null || paramsl.talkStatus == ""? "--" : "已接通"
            );
          }
        },
        {
          title: "是否接通过",
          key: "throughStatus",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let throughStatus;
            if (params.row.throughStatus == 0) {
              throughStatus = '从未接通过'
            } else if (params.row.throughStatus == 1) {
              throughStatus = '是'
            } else {
              throughStatus = '--'
            }
            return h("span", {}, throughStatus);
          }
        },
        {
          title: "是否冻结",
          key: "accountStatus",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let accountStatus;
            if (params.row.accountStatus == 0) {
              accountStatus = '是'
            } else if (params.row.accountStatus == 1) {
              accountStatus = '否'
            } else {
              accountStatus = '--'
            }
            return h("span", {}, accountStatus);
          }
        },
        {
          title: "审核状态",
          key: "loanCityNameSecond",
          minWidth: 150,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.loanStatus == 0
                ? "注册无资料"
                : paramsl.loanStatus == 1
                  ? "信贷员待审核"
                  : paramsl.loanStatus == 2
                    ? "审核通过"
                    : paramsl.loanStatus == 3 ? "审核失败" : ""
            );
          }
        },
        {
          title: "会员状态",
          key: "memberStatusName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "基本信息",
          key: "loanPerfectInfo",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h(
              "span",
              {},
              paramsl.loanPerfectInfo == 0 ? "未完善" : "已完善"
            );
          }
        },
        {
          title: "是否充值过",
          key: "loanRechargeStatus",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h("span", {}, paramsl.loanRechargeStatus == 0 ? "否" : "是");
          }
        },
        {
          title: "是否消费过",
          key: "consumptionStatus",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let paramsl = params.row;
            return h("span", {}, paramsl.consumptionStatus == 0 ? "否" : "是");
          }
        },   
        {
          title: "赞豆余额",
          key: "beanMoney",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
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
                      this.isSubName = true;
                      this.formValidate.subName = 1
                      this.subName = [params.row.loanOfficerCode]
                    }
                  }
                },
                "修改分配"
              )
            ]);
          }
        }
      ],
      data9: [],
      searchOptions: [],
      statusOptions: [],
      loading3: false,
      startRow: 1,
      endRow: 20,
      total: 0,
      salesName: "",
      salesPhone: "",
      salesTimeS: "",
      salesTimeE: "",
      lastTimeS:"",
      lastTimeE:"",
      beginTime:'',
      endTime:'',
      registersheng: "",
      registercitys: [],
      registershi: "",
      registercityh: [],
      salesExamine: "-1",
      saesList: [],
      isConsumption: -1,
      membershipStatus: "-1",
      consumptionlist: [
        { value: -1, label: "是否消费过" },
        { value: 1, label: "是" },
        { value: 0, label: "否" }
      ],
      memberList: [],
      lastCall: '-1',
      lastCallList:[],
      isRechargelist: [
        { value: -1, label: "是否充值过" },
        { value: 1, label: "是" },
        { value: 0, label: "否" }
      ], //所属状态
      isRecharge: -1,
      subName:[],
      subNameList:[],
      isConnect:-1,
      isConnectList:[
        { value: -1, label: "是否接通过" },
        { value: 1, label: "是" },
        { value: 0, label: "从未接通过" }
      ],
      isThaw:-1,
      isThawList:[
        { value: -1, label: "是否冻结" },
        { value: 1, label: "否" },
        { value: 0, label: "是" }
      ]

    };
  },
  methods: {
    //表格里面的选项
    options(v) {
      this.subName= []
      if(v && v.length <=0){
        this.flag = false
      } else {
        this.flag = true
      }
      this.subNameList = v
      this.formValidate.subName = v.length
      v.map(v=>{
        this.subName.push(v.loanOfficerCode)
      })
    },
    //表格单行事件
    Single(v,index){
      this.numberList.pageNum = (this.startRow-1)*this.endRow+index+1;
      this.numberList.pageSize = 1
      this.numberList.sortType = 2
      this.numberList.allotType = 0
      this.numberList.dialCode = v.dialCode
      localStorage.removeItem("articlelists");
      utils.putlocal('articlelists', JSON.stringify(this.numberList))
      window.open(
        location.origin +
          "/#/dialingRecordmanager","_blank",
        "width=1300,height=650,menubar=no,toolbar=no,status=no,scrollbars=yes"
      );
    },
    pageChange(page) {
      this.startRow = page;
      this.query(this.startRow);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.query(1);
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
          this.loading3 = false;
        });
    },
    // 查询
    query(startRow) {
      if(0<this.salesPhone.length && this.salesPhone.length< 3){
        this.phoneti('warning')
        return false
      }
      let date1 = this.getDate(this.salesTimeS)
      let date2 = this.getDate(this.salesTimeE)
      let date3 = this.getDate(this.lastTimeS)
      let date4 = this.getDate(this.lastTimeE)
      let date5 = this.getDate(this.beginTime)
      let date6 = this.getDate(this.endTime)
      if(!this.isDate(date1,date2)) return
      if(!this.isDate(date3,date4)) return
      if(!this.isDate(date5,date6)) return
      this.loading3 = true;
      let data = Object.assign({
        seatNo: this.subSeat == '-1' ? "" :  this.subSeat, //坐席编号
        listDownStartTime : this.salesTimeS, // 明下开始时间
        listDownEndTime : this.salesTimeE, // 明下结束时间
        dialBeginTime: this.lastTimeS, //最后拨打开始时间
        dialEndTime: this.lastTimeE,//最后拨打结束时间
        beginTime:this.beginTime,//注册开始时间
        endTime:this.endTime,//注册结束时间
        realName: this.salesName, // 姓名
        phoneNumber: this.salesPhone, // 手机号
        loanStatus: this.salesExamine == -1 ? "" : this.salesExamine, //  审核状态（0注册无资料(仅注测) 1信贷员待审核(待审核) 2审核通过(已入驻) 3审核失败(审核失败)
        loanRechargeStatus: this.isRecharge == -1 ? "" : this.isRecharge, // 是否充值过(0:否,1:是)
        consumptionStatus: this.isConsumption == -1 ? "" : this.isConsumption, //  是否消费过（0否 1是）
        memberStatus: this.membershipStatus == -1 ? "" : this.membershipStatus, // 会员状态（0未开启 1会员中 2会员过期）
        throughStatus:this.isConnect == -1 ? "" : this.isConnect, // 是否接通过
        accountStatus:this.isThaw == -1 ? "" : this.isThaw, // 是否解冻
        loanAdCodeFirst: this.registersheng, //  省
        loanAdCodeSecond: this.registershi, //  市
        talkStatus:this.lastCall== -1 ? "": this.lastCall, //最后拨打状态(0未接通 1已接通)
        pageSize: this.endRow,
        pageNum: startRow,
        allotStatus : 1
      });
      this.numberList = data
      this.post(BASE_URL + "/sale/saleLoanOfficerInfo/queryList", data);
      return false;
    },
    //时间校验
    isDate(date1,date2){
      if (date1 > date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "温馨提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      return true
    },
    //获取时间
    getDate(dateTime){
      return Date.parse(new Date(dateTime)) / 1000;
    },
    //省
    citys(v) {
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
    },
    // 时间判断
    salestime1(value, data) {
      this.salesTimeS = value;
    },
    salestime2(value, data) {
      this.salesTimeE = value;
    },
    lasttime1(value, data) {
      this.lastTimeS = value;
    },
    lasttime2(value, data) {
      this.lastTimeE = value;
    },
    beginTimechange(value, data) {
      this.beginTime = value;
    },
    endTimechange(value, data) {
      this.endTime = value;
    },
    //tab 快速查询
    All() {
      this.salesExamine = "-1";
      this.query(1);
    },
    Registration() {
      //仅注册
      this.salesExamine = "0";
      this.query(1);
    },
    Audited() {
      //待审核
      this.salesExamine = "1";
      this.query(1);
    },
    Settled() {
      //已入驻
      this.salesExamine = "2";
      this.query(1);
    },
    //批量分配名单
    batchSubName(){
      this.formValidate.subName = this.subNameList.length
      this.isSubName = true
    },
    subNameOk(name) {//modal框确认
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.http.post(BASE_URL+'/sale/saleLoanOfficerInfo/batchAlreadyDistributionUser',{
            loanOfficerCodeList: this.subName,
            seatCode: this.formValidate.subSeat
          }).then(data=>{
            if(data.code == 'success'){
              this.isSubName = false
              this.changeLoading()
              this.$Message.success('修改成功!');
              this.query(1)
              this.flag = false //分配处理置灰
              this.$refs[name].resetFields();//数据初始化
            } else {
              this.changeLoading()
              this.isSubName = false
              this.$Message.success('修改失败!');
              this.query(1)
              this.flag = false //分配处理置灰
              this.$refs[name].resetFields();//数据初始化
            }
          }).catch(err=>{
            this.flag = false //分配处理置灰
            this.$refs[name].resetFields();//数据初始化
          })
        } else {
          this.changeLoading()
        }
      })
    },
    subNAmecancel(name) {//modal框取消
      this.$refs[name].resetFields();
    },
    //loading 关闭
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    //分配坐席名单
    subSeatName(){
      this.http.post(BASE_URL+"/sale/saleSeat/getSaleSeatInfoList",{seatType:1}).then(data=>{
        // const {data} = data.data
        this.subSeatNameList = data.data
        this.subSeatNameListli = data.data
        this.subSeatNameList.splice(0,0,{seatCode: "99999999999999222222222",seatName: "请选择坐席编号",seatNo: "-1"})
      }).catch(err=>{})
    },
    // 导出
    auditedExport() {
      if(0<this.salesPhone.length && this.salesPhone.length< 3){
        this.phoneti('warning')
        return false
      }
      let date1 = this.getDate(this.salesTimeS)
      let date2 = this.getDate(this.salesTimeE)
      let date3 = this.getDate(this.lastTimeS)
      let date4 = this.getDate(this.lastTimeE)
      let date5 = this.getDate(this.beginTime)
      let date6 = this.getDate(this.endTime)
      if(!this.isDate(date1,date2)) return
      if(!this.isDate(date3,date4)) return
      if(!this.isDate(date5,date6)) return
      this.loading2 = true;
      let formData = new FormData();
      formData.append("seatNo", this.subSeat == '-1' ? "" :  this.subSeat );//坐席编号
      formData.append("listDownStartTime", this.salesTimeS);// 明下开始时间
      formData.append("listDownEndTime", this.salesTimeE);// 明下结束时间
      formData.append("dialBeginTime", this.lastTimeS);//最后拨打开始时间
      formData.append("dialEndTime", this.lastTimeE);//最后拨打结束时间
      formData.append("beginTime", this.beginTime);//注册开始时间
      formData.append("endTime", this.endTime);//注册结束时间
      formData.append("realName", this.salesName);//姓名
      formData.append("phoneNumber", this.salesPhone);//手机号
      formData.append("loanStatus", this.salesExamine == -1 ? "" : this.salesExamine);//审核状态（0注册无资料(仅注测) 1信贷员待审核(待审核) 2审核通过(已入驻) 3审核失败(审核失败)
      formData.append("loanRechargeStatus", this.isRecharge == -1 ? "" : this.isRecharge);//是否充值过(0:否,1:是)
      formData.append("consumptionStatus", this.isConsumption == -1 ? "" : this.isConsumption);//是否消费过（0否 1是）
      formData.append("memberStatus", this.membershipStatus == -1 ? "" : this.membershipStatus);//会员状态（0未开启 1会员中 2会员过期）
      formData.append("loanAdCodeFirst", this.registersheng);//省
      formData.append("loanAdCodeSecond", this.registershi);//市
      formData.append("talkStatus", this.lastCall== -1 ? "": this.lastCall);//最后拨打状态(0未接通 1已接通)
      formData.append("allotStatus", 1);
      formData.append("pageSize", this.endRow);
      formData.append("pageNum", this.startRow);
      formData.append("throughStatus", this.isConnect == -1 ? "" : this.isConnect);//是否接通过
      formData.append("accountStatus", this.isThaw == -1 ? "" : this.isThaw);//是否解冻

      let httpUrl = BASE_URL + '/sale/saleLoanOfficerInfo/export';
      utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
        if (e == true) {
          this.loading2 = false;
        } else {
          this.loading2 = false;
          this.$Modal.warning({
            title: "导出文件",
            content: "<p>导出失败</p>"
          });
        }
      });
    },
  },
  created() {
    //获取当前时间
    this.salesTimeS = utils.getNowDate(0)[1]+"-01"
    this.salesTimeE = utils.getNowDate(0)[0]
    this.query(1);
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });
    this.http.post(
      BASE_URL + "/sale/saleLoanOfficerInfo/getNotDivideQueryCondition",
      {}
    )
    .then(data => {
      const { loanStatusList, memberStatusList,talkStatusList } = data.data;
      this.saesList = loanStatusList; //审核状态
      this.memberList = memberStatusList;
      this.lastCallList = talkStatusList
    })
    .catch(err => {
      console.log(err);
    })
    this.subSeatName()
    this.http.post(BASE_URL + "/checkUriPermission", ['/sale/saleLoanOfficerInfo/export']).then(data=>{
        if(data.code == 'success'){
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.exportPermissions = true              
            } else {
              this.exportPermissions = false
            }
          }
        }
      }).catch(err=>{});
  }
};
</script>
<style>
.contentcsstab {
  text-align: center;
}
</style>