<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理>&nbsp;{{sales}}</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
                <li class="mr20">
                  <span>姓名:</span>
                  <Input v-model="creditname" placeholder="请输入姓名" style="width: 150px"></Input>                 
                </li>
                <li class="mr20">
                  <span>手机号:</span>
                  <Input v-model="phone" placeholder="请输入手机号" style="width: 150px"></Input>                 
                </li>
                <li class="mr20">
                  <Select v-model="membership" @on-change="member" placeholder="会员状态" style="width:90px;">
                    <Option v-for="item in registerstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <span>注册时间：</span>
                  <DatePicker type="date" :options="options4" :value="salesTimeS" @on-change="salestime1"  placeholder="开始时间" style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options4" :value="salesTimeE" @on-change="salestime2"  placeholder="结束时间" style="width: 150px"></DatePicker>
                </li>
                <li class="mr20 timelinheight">
                    <span class="lh32 ">名单下放时间:</span>
                    <DatePicker type="date" :options="options4" :value="timeval1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
                        <span>  -  </span>
                    <DatePicker type="date" :options="options4" :value="timeval2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
                </li>
                <li class="mr20">
                  <Select v-model="registermodel3"  placeholder="审核状态" style="width:90px;">
                    <Option v-for="(item, index) in loanStatustype" @click.native="registerstate(index)" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="distributiontype" @on-change="distribution" placeholder="分配类型" style="width:90px;">
                    <Option v-for="item in allotStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="dialtype" @on-change="dial" placeholder="最后一次拨打状态" style="width:110px;">
                    <Option v-for="item in dialStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20 timelinheight">
                    <span class="lh32 ">最后拨打时间:</span>
                    <DatePicker type="date" :options="options4"  :value="timeval3" @on-change="time3" placeholder="开始时间" style="width: 150px"></DatePicker>
                        <span>  -  </span>
                    <DatePicker type="date" :options="options4"  :value="timeval4" @on-change="time4" placeholder="结束时间" style="width: 150px"></DatePicker>
                </li>
                <li class="mr20">
                  <Select v-model="recharge" @on-change="rechargestate" placeholder="是否充值过" style="width:100px;">
                    <Option v-for="item in rechargeStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="consumption" @on-change="consumptionstate" placeholder="是否消费过" style="width:100px;">
                      <Option v-for="item in consumptionStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                <li class="mr20">
                  <span>赞豆余额:</span>
                  <InputNumber :min="0" @keyup.native="changeNumber(1)" v-model="balancestartnum"></InputNumber>
                  -
                  <InputNumber :min="0" @keyup.native="changeNumber(2)" v-model="balanceendnum"></InputNumber>

                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="creditinquery('warning')">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>
              <div>
                  <Button v-for="(item,index) in quickSearch" :type="item.type" class="mr20" @click="quick(index)" shape="circle">{{item.value}}</Button>
              </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="creditinquery('warning')">查询</Button> -->           
            </div>
            <div id="application_table" class="mt15">
            <Table :row-class-name="rowClassName" @on-sort-change="handleSortChange" @on-row-dblclick="Single" border highlight-row :columns="columns" :data="data9"></Table>
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
              <FormItem v-if="engagement" label="待办时间" prop="time">
                <DatePicker type="datetime" class=" " v-model="formValidate.time" :options="options3" confirm placeholder="待办时间" style="width: 200px"></DatePicker>
              </FormItem>
              <FormItem v-if="engagement" label="待办备注" prop="remarks">
                    <Input v-model="formValidate.remarks" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
              </FormItem>
              <FormItem v-if="customtype" label="自定义备注" prop="custom">
                    <Input v-model="formValidate.custom" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
              </FormItem>
            </Form>           
          </div>
          <div slot="footer" >
            <Button type="default"  @click="modalclose(1,'formValidate')">关闭</Button>
            <!-- <Button type="primary" :loading="modal_loading" >挂断</Button> -->
            <Button type="primary" :loading="modal_loading" @click="dialsub('formValidate')">提交</Button>
          </div>
        </Modal>
        <Modal v-model="modal3" class-name="vertical-center-modal" :mask-closable="false">
          <p slot="header" style="text-align:left">    
            <span>待办提醒</span>
          </p>
          <div style="text-align:left">
            <Form ref="formValidatewith" :model="formValidatewith" :rules="ruleValidatewith" :label-width="180">        
              <FormItem label="待办时间:" prop="marketBeginTime">
                <DatePicker type="datetime" :value="formValidatewith.marketBeginTime" @on-change = "datepickerl" :options="options3" confirm placeholder="待办时间" style="width: 200px"></DatePicker>
              </FormItem>
              <FormItem label="拨打备注:" prop="bdmemo">
                <Input style="width:200px"  v-model="formValidatewith.bdmemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容" />
              </FormItem>
            </Form>
          </div>
          <div slot="footer" >
            <Button type="default"  @click="modalclose(2,'formValidatewith')">关闭</Button>
            <Button type="primary" v-if="agencyStatus == 1&&needshow" :loading="modal_loading" @click="withdial('formValidatewith',1)">确认已办</Button>
            <Button type="primary" :loading="modal_loading" @click="withdial('formValidatewith',2)">提交更新</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      dialStatus: [],
      rechargeStatus: [],
      consumptionStatus: [],
      columns: [],
      needshow: false,
      balancestartnum:'',
      balanceendnum:'',
      columns2: [
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
          render: (h, params) => {
            let realName
            if (params.row.realName==""||params.row.realName==null) {
              realName = '--'
            } else {
              realName= params.row.realName
            }        
            return h("div", [
              h("span", {}, realName)
            ]);
          }
        },
        {
          title: "区域",
          key: "gender",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let loanCityNameFirst =
              params.row.loanCityNameFirst == ""
                ? "-"
                : params.row.loanCityNameFirst;
            let loanCityNameSecond =
              params.row.loanCityNameSecond == ""
                ? "-"
                : params.row.loanCityNameSecond;
            return h("div", [
              h("span", {}, loanCityNameFirst + " " + loanCityNameSecond)
            ]);
          }
        },
        {
          title: "赞豆余额",
          key: "beanMoney",
          sortable: 'custom',
          minWidth: 150,
          align: "center"
        },
        {
          title: "注册时间",
          key: "registrationTime",
          sortable: 'custom',
          minWidth: 160,
          align: "center"
        },
        {
          title: "名单下放时间",
          key: "listDownTime",
          sortable: 'custom',
          minWidth: 180,
          align: "center"
        },
        {
          title: "最后拨打时间",
          key: "dialEndTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "最后拨打状态",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let talkStatus;
            if (params.row.talkStatus == 0) {
              talkStatus = "未接通";
            } else if (params.row.talkStatus == 1) {
              talkStatus = "已接通";
            }
            return h("div", [h("span", {}, talkStatus)]);
          }
        },
        {
          title: "最后拨打备注",
          minWidth: 150,
          key: "endRemark",
          align: "center"
        },
        {
          title: "审核状态",
          key: "loanBaseStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let loanStatus;
            if (params.row.loanStatus == 0) {
              loanStatus = "仅注册";
            } else if (params.row.loanStatus == 1) {
              loanStatus = "待审核";
            } else if (params.row.loanStatus == 2) {
              loanStatus = "已入驻";
            } else if (params.row.loanStatus == 3) {
              loanStatus = "审核失败";
            }
            return h("div", [h("span", {}, loanStatus)]);
          }
        },
        {
          title: "会员状态",
          key: "memberStatusName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "是否充值过",
          key: "loanRechargeStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let loanRechargeStatus;
            if (params.row.loanRechargeStatus == 0) {
              loanRechargeStatus = "否";
            } else if (params.row.loanRechargeStatus == 1) {
              loanRechargeStatus = "是";
            }
            return h("div", [h("span", {}, loanRechargeStatus)]);
          }
        },
        {
          title: "是否消费过",
          key: "consumptionStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let consumptionStatus;
            if (params.row.consumptionStatus == 0) {
              consumptionStatus = "否";
            } else if (params.row.consumptionStatus == 1) {
              consumptionStatus = "是";
            }
            return h("div", [h("span", {}, consumptionStatus)]);
          }
        },
        {
          title: "分配类型",
          key: "allotType",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let allotType;
            if (params.row.allotType == 0) {
              allotType = "指定分配";
            } else if (params.row.allotType == 1) {
              allotType = "自己邀请";
            }
            return h("div", [h("span", {}, allotType)]);
          }
        },
        
        {
          title: "操作",
          key: "action",
          minWidth: 220,
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
                      this.modal10 = true;
                      this.nametitle = params.row.realName;
                      this.loanOfficerCode = params.row.loanOfficerCode;
                    }
                  }
                },
                "拨打"
              ),
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
                      this.loanOfficerCode = params.row.loanOfficerCode;
                      this.agencyStatus = params.row.agencyStatus;

                      if (params.row.agencyStatus == 1) {
                        this.needshow = true;
                        this.formValidatewith.marketBeginTime =
                          params.row.agencyTime;
                        this.formValidatewith.bdmemo = params.row.agencyMemo;
                      } else {
                        this.needshow = false;
                        this.formValidatewith.marketBeginTime = "";
                        this.formValidatewith.bdmemo = "";
                      }
                      this.remind();
                    }
                  }
                },
                "待办提醒"
              )
            ]);
          }
        }
      ],
      columns3: [
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
          render: (h, params) => {
            let realName
            if (params.row.realName==""||params.row.realName==null) {
              realName = '--'
            } else {
              realName= params.row.realName
            }        
            return h("div", [
              h("span", {}, realName)
            ]);
          }
        },
        {
          title: "区域",
          key: "gender",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let loanCityNameFirst =
              params.row.loanCityNameFirst == ""
                ? "-"
                : params.row.loanCityNameFirst;
            let loanCityNameSecond =
              params.row.loanCityNameSecond == ""
                ? "-"
                : params.row.loanCityNameSecond;
            return h("div", [
              h("span", {}, loanCityNameFirst + "" + loanCityNameSecond)
            ]);
          }
        },
        {
          title: "赞豆余额",
          key: "beanMoney",
          minWidth: 150,
          align: "center"
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
          minWidth: 180,
          align: "center"
        },
        {
          title: "待办时间",
          key: "agencyTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "待办提醒",
          key: "agencyMemo",
          minWidth: 180,
          align: "center"
        },
        {
          title: "最后拨打时间",
          key: "dialEndTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "最后拨打状态",
          key: "loanBaseStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let talkStatus;
            if (params.row.talkStatus == 0) {
              talkStatus = "未接通";
            } else if (params.row.talkStatus == 1) {
              talkStatus = "已接通";
            }
            return h("div", [h("span", {}, talkStatus)]);
          }
        },
        {
          title: "最后拨打备注",
          minWidth: 150,
          key: "endRemark",
          align: "center"
        },
        {
          title: "审核状态",
          key: "loanBaseStatus",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let loanStatus;
            if (params.row.loanStatus == 0) {
              loanStatus = "仅注册";
            } else if (params.row.loanStatus == 1) {
              loanStatus = "待审核";
            } else if (params.row.loanStatus == 2) {
              loanStatus = "已入驻";
            } else if (params.row.loanStatus == 3) {
              loanStatus = "审核失败";
            }
            return h("div", [h("span", {}, loanStatus)]);
          }
        },
        {
          title: "会员状态",
          key: "memberStatusName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "是否充值过",
          key: "serviceIntroductionStatusName",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let loanRechargeStatus;
            if (params.row.loanRechargeStatus == 0) {
              loanRechargeStatus = "否";
            } else if (params.row.loanRechargeStatus == 1) {
              loanRechargeStatus = "是";
            }
            return h("div", [h("span", {}, loanRechargeStatus)]);
          }
        },
        {
          title: "是否消费过",
          key: "loanInviterCodeCount",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let consumptionStatus;
            if (params.row.consumptionStatus == 0) {
              consumptionStatus = "否";
            } else if (params.row.consumptionStatus == 1) {
              consumptionStatus = "是";
            }
            return h("div", [h("span", {}, consumptionStatus)]);
          }
        },
        {
          title: "分配类型",
          key: "dataId",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let allotType;
            if (params.row.allotType == 0) {
              allotType = "指定分配";
            } else if (params.row.allotType == 1) {
              allotType = "自己邀请";
            }
            return h("div", [h("span", {}, allotType)]);
          }
        },
        
        {
          title: "操作",
          key: "action",
          minWidth: 220,
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
                      this.modal10 = true;
                      this.nametitle = params.row.realName;
                      this.loanOfficerCode = params.row.loanOfficerCode;
                    }
                  }
                },
                "拨打"
              ),
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
                      this.loanOfficerCode = params.row.loanOfficerCode;
                      this.needshow = true;
                      this.agencyStatus = params.row.agencyStatus;
                      if (params.row.agencyStatus == 1) {
                        this.formValidatewith.marketBeginTime =
                          params.row.agencyTime;
                        this.formValidatewith.bdmemo = params.row.agencyMemo;
                      }
                      this.remind();
                    }
                  }
                },
                "确认已办"
              )
            ]);
          }
        }
      ],
      data9: [],
      sales: "销售查询",
      modal10: false,
      modal2: false,
      modal3: false,
      modal_loading: false,
      engagement: false,
      customtype: false,
      agencyStatus: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      options4: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      searchOptions: [],
      statusOptions: [],
      loading3: false,
      startRow: 1,
      endRow: 20,
      total: 0,
      numsearch: "0",
      credit1: "mobile",
      nametitle: "",
      creditname: "",
      phone: "",
      timeval1: "",
      timeval2: "",
      timeval3: "",
      timeval4: "",
      salesTimeS:'',
      salesTimeE:'',
      membership: "''",
      loanOfficerCode: "",
      dialRecordCode: "",
      selnum: "",
      formValidate: {
        memo: "",
        time: "",
        remarks: "",
        custom: ""
      },
      formValidatewith: {
        marketBeginTime: "",
        bdmemo: ""
      },
      ruleValidate: {
        memo: [
          { required: true, message: "请选择拨打备注", trigger: "change" }
        ],
        time: [
          {
            required: true,
            type: "date",
            message: "请选择待办时间",
            trigger: "change"
          }
        ],
        remarks: [
          { required: true, message: "请输入待办备注", trigger: "blur" }
        ],
        custom: [
          { required: true, message: "请输入自定义备注", trigger: "blur" }
        ]
      },
      ruleValidatewith: {
        bdmemo: [{ required: true, message: "请输入待办备注", trigger: "blur" }]
        // marketBeginTime: [
        //   { required: true,  message: '请选择待办时间', trigger: 'blur' }
        // ],
      },
      distributiontype: "''",
      dialtype: "''",
      recharge: "''",
      consumption: "''",
      cityList: [],
      registersheng: "",
      registercitys: [],
      registershi: "",
      registercityh: [],
      registerstatus: [], //所属状态
      loanStatustype: [], // 审核状态
      allotStatus: [], //分配类型
      remarkslist: [], //拨打备注
      lastarticle: {}, //上一条下一条
      registermodel3: "",
      signs: "",
      listtab: "",
      quickSearchParameters: undefined,
      quickSearch: [
        {
          type: "primary",
          value: "所有用户",
          parameters: {
            loanStatustype: "",
            agencyStatus: '',
          }
        },
        {
          type: "default",
          value: "仅注册",
          parameters: {
            loanStatustype: 0,
            agencyStatus: '',
          }
        },
        {
          type: "default",
          value: "待审核",
          parameters: {
            loanStatustype: 1,
            agencyStatus: '',
          }
        },
        {
          type: "default",
          value: "已入驻",
          parameters: {
            loanStatustype: 2,
            agencyStatus: '',
          }
        },
        {
          type: "default",
          value: "待办提醒",
          parameters: {
            agencyStatus: 1
          }
        }
      ],
      orderByBeanMoney:null,
      orderByDownTime:null,
      orderByationTime:null
    };
  },
  methods: {
    changeNumber(num) {
      let inputNumber
      if (num == 1) {
        inputNumber = this.balancestartnum
      } else {
        inputNumber = this.balanceendnum
      }
      let str = '' + inputNumber;
      if (str.indexOf('.') != -1) {      
        let arr = str.split('.');
        if (num == 1) {
          this.balancestartnum = str.split('.')[0]
        } else {
          this.balanceendnum = str.split('.')[0]
        }
      }
      
    },
    // 排序
    handleSortChange ({params ,key, order}) { // 传入的order是排序类型，升序降序默认
      if (key== 'beanMoney') {
        if (order == 'asc') {
          this.orderByBeanMoney = 1         
        } else if (order == 'desc') {
          this.orderByBeanMoney = 2
        }
        this.orderByDownTime = null
        this.orderByationTime = null
      } else if (key== 'registrationTime') {
        if (order == 'asc') {
          this.orderByationTime = 1         
        } else if (order == 'desc') {
          this.orderByationTime = 2
        }
        this.orderByBeanMoney = null
        this.orderByDownTime = null
      } else if (key== 'listDownTime') {
        if (order == 'asc') {
          this.orderByDownTime = 1         
        } else if (order == 'desc') {
          this.orderByDownTime = 2
        }
        this.orderByBeanMoney = null
        this.orderByationTime = null
      }
       this.labell1(this.numsearch); 
    },
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.labell1(this.numsearch);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.labell1(this.numsearch);
    },
    time1(value, data) {
      this.timeval1 = value;
    },
    time2(value, data) {
      this.timeval2 = value;
    },
    time3(value, data) {
      this.timeval3 = value;
    },
    time4(value, data) {
      this.timeval4 = value;
    },
    // 注册时间判断
    salestime1(value, data) {
      this.salesTimeS = value;
    },
    salestime2(value, data) {
      this.salesTimeE = value;
    },
    //审核
    registerstate(index) {
      let indexs;
      if (index == 4) {
        indexs = 0;
        this.listtab = 1;
      } else {
        indexs = index;
      }
      this.numsearch = index;
      this.quickSearch.forEach(element => {
        element.type = "default";
      });
      this.quickSearch[indexs].type = "primary";
      this.quickSearchParameters = this.quickSearch[indexs].parameters; 
    },
    //会员
    member(status) {
      this.membership = status;
    },
    //分配
    distribution(status) {
      this.distributiontype = status;
    },
    //拨打
    dial(status) {
      this.dialtype = status;
    },
    //充值
    rechargestate(status) {
      this.recharge = status;
    },
    //消费
    consumptionstate(status) {
      this.consumption = status;
    },
    // 快速搜索
    quick(num) {
      if (num == 4) {
        this.registermodel3 = "''";
      }
      this.orderByDownTime = null
      this.orderByationTime = null
      this.orderByBeanMoney = null
      this.numsearch = num;
      this.quickSearch.forEach(element => {
        element.type = "default";
      });
      this.quickSearch[num].type = "primary";
      this.quickSearchParameters = this.quickSearch[num].parameters;
      this.labell1(num);
    },
    // 拨打电话
    dialing() {
      this.http
        .post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", {
          loanOfficerCode: this.loanOfficerCode
        })
        .then(data => {
          if (data.code == "success") {
            this.modal2 = true;
            this.$Message.success(data.message);
            this.dialRecordCode = data.data.dialRecordCode;
          } else {
            this.modal2 = false;
            this.$Message.error(data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.dialRemarks();
    },
    datepickerl(v) {
      this.formValidatewith.marketBeginTime = v;
    },
    // 拨打电话提交
    dialsub(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let datetimel = Date.parse(new Date(this.formValidate.time));
          let datetimell = Date.parse(new Date());
          if (datetimel <= datetimell && this.formValidate.memo == "1005") {
            this.$Modal.warning({
              title: "指定时间",
              content: "<p>指定时间不能小于当前时间</p>",
              onOk: () => {},
              onCancel: () => {}
            });
            return false;
          }
          let list = {
            remarkCode: this.formValidate.memo,
            dialCode: this.dialRecordCode,
            loanOfficerCode: this.loanOfficerCode
          };
          if (this.selnum == 1) {
            (list.agencyTime =
              this.formValidate.time == ""
                ? ""
                : utils.formatDate(
                    this.formValidate.time,
                    "yyyy-MM-dd hh:mm:ss"
                  )),
              (list.remark = this.formValidate.remarks);
          } else if (this.selnum == 2) {
            list.remark = this.formValidate.custom;
          }

          this.http
            .post(
              BASE_URL + "/sale/saleDialRecord/saveDialRemark4Manager",
              list
            )
            .then(data => {
              if (data.code == "success") {
                this.modal2 = false;
                this.$Message.success("备注成功");
                this.$refs[name].resetFields();
              } else {
                this.$Message.error(data.message);
                this.$refs[name].resetFields();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
        }
      });
    },
    // 关闭弹框
    modalclose(model, name) {
      this.$refs[name].resetFields();
      if (model == 1) {
        this.modal2 = false;
      } else if (model == 2) {
        this.modal3 = false;
      }
    },
    // 待办提醒
    remind() {
      this.modal3 = true;
    },
    // 确认已办
    confirmbeen(list, url, content) {
      this.http
        .post(BASE_URL + url, list)
        .then(data => {
          if (data.code == "success") {
            this.modal3 = false;
            this.$Modal.success({
              title: "温馨提示",
              content: content
            });
            this.$refs["formValidatewith"].resetFields();
            this.labell1(0);
          } else {
            this.$Message.warning(data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 待办提醒提交
    withdial(name, num) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidatewith.marketBeginTime == "") {
            this.$Modal.warning({
              title: "待办时间",
              content: "请选择待办时间"
            });
            return false;
          }
          let list = {
            loanOfficerCode: this.loanOfficerCode,
            agencyTime: this.formValidatewith.marketBeginTime,
            agencyRemark: this.formValidatewith.bdmemo
          };
          let url;
          let content;
          if (num == 1) {
            url = "/sale/saleDialRecord/confirmAgencyTimeRemind4Manager";
            content = "已办成功";
          } else {
            url = "/sale/saleDialRecord/agencyTimeRemind4Manager";
            content = "更新成功";
          }
          this.confirmbeen(list, url, content);
        } else {
        }
      });
    },
    // 拨打备注下拉框
    dialRemarks() {
      this.http
        .post(BASE_URL + "/sale/saleDialRemark/getDialRemarkList", {})
        .then(data => {
          if (data.code == "success") {
            this.remarkslist = data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 拨打备注change
    selremarks(val) {
      if (val == "1005") {
        // this.$refs['formValidate'].resetFields();
        this.engagement = true;
        this.customtype = false;
        this.selnum = 1;
      } else if (val == "1006") {
        // this.$refs['formValidate'].resetFields();
        this.engagement = false;
        this.customtype = true;
        this.selnum = 2;
      } else {
        // this.$refs['formValidate'].resetFields();
        this.engagement = false;
        this.customtype = false;
        this.selnum = 0;
      }
    },
    //接口封装
    post(httpUrl, params, num) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            //  this.registerstate (this.registermodel3)
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            if (num == "4") {
              this.columns = this.columns3;
              if (this.listtab == 1) {
                if (this.$route.query.dealt) {
                  this.columns = this.columns3;
                } else {
                  if (this.registermodel3 == "''") {
                    this.columns = this.columns3;
                  } else {
                    this.columns = this.columns2;
                  }              
                }            
              }
            } else {
              if (this.$route.query.dealt) {
                this.columns = this.columns3;
              } else {
                this.columns = this.columns2;
              }
            }

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
    rowClassName(row, index) {
      if (row.pastDueStatus === 1 && this.signs == 1) {
        return "demo-table-info-rowstu";
      }
      return "";
    },
    // 查询
    labell1(numsearch, num) {
      let date5 = Date.parse(new Date(this.salesTimeS)) / 1000;
      let date6 = Date.parse(new Date(this.salesTimeE)) / 1000;
      if (date5 > date6) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "注册时间",
          content: "<p>注册开始时间不得大于结束时间</p>"
        });
        return false;
      }
      let date1 = Date.parse(new Date(this.timeval1)) / 1000;
      let date2 = Date.parse(new Date(this.timeval2)) / 1000;
      if (date1 > date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "名单下放时间",
          content: "<p>名单下放开始时间不得大于结束时间</p>"
        });
        return false;
      }
      let date3 = Date.parse(new Date(this.timeval3)) / 1000;
      let date4 = Date.parse(new Date(this.timeval4)) / 1000;
      if (date3 > date4) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "拨打时间",
          content: "<p>最后拨打开始时间不得大于结束时间</p>"
        });
        return false;
      }
      if (this.balancestartnum!=''&&this.balanceendnum!='') {
        if (this.balancestartnum>this.balanceendnum) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "温馨提示",
          content: "<p>开始余额不得大于结束余额</p>"
        });
        return false;
      }
      }
      
      if (numsearch == 1) {
        this.registermodel3 = "0";
      } else if (numsearch == 2) {
        this.registermodel3 = "1";
      } else if (numsearch == 3) {
        this.registermodel3 = "2";
      } else if (numsearch == 0) {
        this.registermodel3 = "''";
      }
      let data = Object.assign({
        realName: this.creditname, //姓名
        phoneNumber: this.phone, //手机号
        beginTime:this.salesTimeS,//注册开始时间
        endTime:this.salesTimeE,//注册结束时间
        listDownStartTime: this.timeval1, //名单下放开始时间
        listDownEndTime: this.timeval2, //名单下放开始时间
        dialBeginTime: this.timeval3, //最后拨打开始时间
        dialEndTime: this.timeval4, //最后拨打结束时间
        loanStatus: this.registermodel3 == "''" ? "" : this.registermodel3, //审核状态
        loanRechargeStatus: this.recharge == "''" ? "" : this.recharge, //是否充值过
        consumptionStatus: this.consumption == "''" ? "" : this.consumption, //是否消费过
        talkStatus: this.dialtype == "''" ? "" : this.dialtype, //最后一次拨打状态
        memberStatus: this.membership == "''" ? "" : this.membership, //会员状态
        allotType: this.distributiontype == "''" ? "" : this.distributiontype, //分配类型
        loanAdCodeFirst: this.registersheng, //省
        loanAdCodeSecond: this.registershi, //市
        startBeanMoney:this.balancestartnum,//赞豆开始
        endBeanMoney:this.balanceendnum,//结束余额
        pageSize: this.endRow,
        pageNum: this.startRow
      });
      if (this.orderByBeanMoney!=null) {
        data.orderByBeanMoney = this.orderByBeanMoney
      }
      if (this.orderByDownTime!=null) {
        data.orderByDownTime = this.orderByDownTime
      }
      if (this.orderByationTime!=null) {
        data.orderByregistrationTime = this.orderByationTime
      }
      // data.loanStatus = this.registermodel3 == "''" ? "" : this.registermodel3
      let url;
      if (numsearch == 4) {
        if (this.$route.query.dealt) {
          data.agencyStatus = 1
          data.sortType = 8
          this.signs = 1
          url = "/sale/saleLoanOfficerInfo/queryAgencySaleLists";
        } else {
          this.signs = ''
          data.sortType = 5
          data.effectStatus=1 
          data.allotStatus = 1
          data.disposeStatus = 1
          url = "/sale/saleLoanOfficerInfo/querySaleList";
        }
      } else {
        if (this.$route.query.dealt) {
          data.agencyStatus = 1
          data.sortType = 8
          this.signs = 1
          url = "/sale/saleLoanOfficerInfo/queryAgencySaleLists";
        } else {
          this.signs = ''
          data.sortType = 5
          data.effectStatus=1 
          data.allotStatus = 1
          data.disposeStatus = 1
          url = "/sale/saleLoanOfficerInfo/querySaleList";
        }
      }
      this.lastarticle = Object.assign(data, this.quickSearchParameters || {});
      this.post(BASE_URL + url, this.lastarticle, numsearch);
      return false;
    },
    // 列表查询
    creditinquery(type) {
      this.startRow = 1;
      if (this.phone != "" && this.phone.length < 3) {
        this.phoneti(type);
      }
      this.loading3 = true;
      this.labell1(this.numsearch, 999);
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
    Single(v, index) {
      this.lastarticle.pageNum = (this.startRow - 1) * this.endRow + index + 1;
      this.lastarticle.pageSize = 1;
      this.lastarticle.dialCode = v.dialCode;
      localStorage.removeItem("articlelists");
      utils.putlocal("articlelists", JSON.stringify(this.lastarticle));
      let { href } = this.$router.resolve({ path: "./dialingRecordmanager" });
      window.open(
        href,
        "_blank",
        "width=1300,height=650,menubar=no,toolbar=no,status=no,scrollbars=yes"
      );
    }
  },
  created() {
    // this.salesTimeS = utils.getNowDate(0)[1]+"-01"
    // this.salesTimeE = utils.getNowDate(0)[0]
    if (this.$route.query.dealt) {
      this.sales = "待办提醒";
      this.quickSearch.forEach(element => {
        element.type = "default";
      });
      this.quickSearch[4].type = "primary";
      this.quickSearchParameters = this.quickSearch[4].parameters;
      this.columns = this.columns3;
      this.labell1(4);
      this.numsearch = 4;
    } else {
      this.sales = "销售查询";
      this.columns = this.columns2;
      this.labell1(this.numsearch);
    }
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });
    this.http
      .post(
        BASE_URL + "/sale/saleLoanOfficerInfo/querySaleOfficerInfoScreen",
        {}
      )
      .then(data => {
        if (data.code == "success") {
          this.loanStatustype = data.data.loanStatus;
          this.allotStatus = data.data.allotType;
          this.registerstatus = data.data.memberStatus;
          this.dialStatus = data.data.talkStatus;
          this.rechargeStatus = data.data.loanRechargeStatus;
          this.consumptionStatus = data.data.consumptionStatus;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route(to, from) {
      // 数据还原
      this.registermodel3 = "''"
      this.membership= "''" //会员状态
      this.distributiontype="''" //分配类型
      this.dialtype= "''" // 拨打状态
      this.recharge= "''" // 是否充值过
      this.consumption= "''" // 消费过
      this.creditname = ""// 姓名
      this.phone = "" // 手机号
      this.timeval1 = "" //名单下放时间
      this.timeval2 = ""
      this.timeval3 = "" //最后拨打时间
      this.timeval4 = ""
      this.registersheng = ""//省
      this.salesTimeS = ''//注册开始时间
      this.salesTimeE = ''//注册结束时间
      this.balancestartnum = ''//赞豆余额开始
      this.balanceendnum = ''//赞豆余额结束
      if (this.$route.query.dealt) {
        this.sales = "待办提醒";
        this.quickSearch.forEach(element => {
          element.type = "default";
        });
        this.quickSearch[4].type = "primary";
        this.quickSearchParameters = this.quickSearch[4].parameters;
        this.columns = this.columns3;
        this.labell1(4);
        this.numsearch = 4;
      } else {
        this.sales = "销售查询";
        this.quickSearch.forEach(element => {
          element.type = "default";
        });
        this.quickSearch[0].type = "primary";
        this.quickSearchParameters = this.quickSearch[0].parameters;
        this.columns = this.columns2;
        this.labell1(0);
        this.numsearch = 0;
      }
      
    }
  }
};
</script>
<style lang="less" scoped>
.querysty>li{
  line-height: 30px
}
</style>


