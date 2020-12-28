<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;渠道管理</span>
      </p>
    </div>
      <div class="clearfix conditioncss">
        <div class="left">
            <ul class="querysty">
                <li>
                    <span>业务:</span>
                    <Select v-model="service" style="width:150px" >
                        <Option v-for="item in cityList" :value="item.businessCode" :key="item.businessCode">{{ item.businessName }}</Option>
                    </Select>
                </li>
                <li class="ml20">
                    <Select v-model="model1" style="width:100px"  @on-change="label_option">
                        <Option v-for="item in searchOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input v-model="name" placeholder="请输入关键字"  style="width: 150px">
                    </Input>
                </li>
                <li>
                    <span class="ml20">渠道开通方式:</span>
                    <Select v-model="model3" placeholder="全部" style="width:150px;margin-left:20px">
                        <Option v-for="item in statusOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="ml20">
                    <span >渠道开通时间:</span>
                    <DatePicker type="date" :value="value1" :options="options3" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
                    <span>  -  </span>
                    <DatePicker type="date" :value="value2" :options="options3" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
                </li>
                <li>
                    <Button type="info" class="left ml20 w90" :loading="loading3" @click="label_query(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                    </Button>
                    <Button type="primary" @click="addchannel(1)" class="ml20">添加渠道</Button>
                    <Button type="primary" class="ml10 " :loading="loading2" @click="exports">
                        <span v-if="!loading2">导出</span>
                        <span v-else>请稍等...</span>
                    </Button>
                    <Button type="warning" class="ml10" @click="batchUpdate">批量更新</Button>
                </li>
            </ul>
        </div>
        
        </div>
        <div id="application_table" class="mt15 contentcss">
          <Table border highlight-row :columns="columns7" :data="data6"></Table>
          <div class="tr mt15">
            <Page :total="total" :page-size="endRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
          </div>
        </div>
        <!-- 添加渠道 -->
        <Modal
          :title=titles
          v-model="modal10"
           @on-ok="businessSubmit('formCustom')"
           @on-cancel="businessReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="950"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" class="nametop clearfix" :model="formCustombusi" :rules="ruleCustombusi" :label-width="120" style="padding-left:50px">
                <FormItem label="供应商编号:" class="left" prop="number" style="width:400px">
                    <AutoComplete
                    v-model="formCustombusi.number"
                    :data="suplist"
                    :filter-method="filterMethod"
                    @on-select="supname"                   
                    :disabled="supdis"
                    placeholder="请输入供应商编号"
                    style="width:200px">
                    <!-- <div class="demo-auto-complete-item" >                        
                        <Option v-for="option in numlist" :value="option.suppliersNo" @click.native="supname(option.suppliersNo)"></Option>
                    </div> -->
                    </AutoComplete>
                </FormItem>
                <FormItem v-if="supdis"  class="left" label="渠道编号:" prop="channelnum" style="width:400px">
                    <Input  v-model="formCustombusi.channelnum" placeholder="请输入渠道编号" disabled style="width: 200px"></Input>
                </FormItem>
                <FormItem  label="供应商名称:" class="left" prop="suppliername" style="width:400px">
                    <Input  v-model="formCustombusi.suppliername" placeholder="请输入供应商名称" disabled style="width: 200px"></Input>
                </FormItem>
                <FormItem label="业务类型:" class="left" prop="businesstype" style="width:400px">
                    <Select :disabled="supdis" v-model="formCustombusi.businesstype" placeholder="请选择" style="width:200px" @on-change="bustypechange">
                        <Option v-for="items in businesstypelist" :value="items.suppliersBusinessCode">{{items.businessName}}</Option>
                    </Select>
                </FormItem>

                <!-- <FormItem v-if="numhid" class="left" label="渠道编号:" prop="channelnum" >
                    <Input  v-model="formCustombusi.channelnum" placeholder="请输入渠道编号" disabled style="width: 200px"></Input>
                </FormItem> -->
                <FormItem label="渠道名称:" class="left" prop="channelname" style="width:400px">
                    <Input  v-model="formCustombusi.channelname" placeholder="请输入渠道名称"  style="width: 200px"></Input>
                </FormItem>
                <FormItem label="基础折扣系数:" prop="coefficient" class="clearfix left" style="width:400px">
                    <Input class="left" v-model="formCustombusi.coefficient" placeholder="请输入基础折扣系数"  style="width: 200px;height:34px">
                        <span slot="append">%</span>
                    </Input>
                    <span v-if="tipsshow1&&numhid" class="red left ml10">次日生效{{snapshopcount}}%</span>
                </FormItem>
                <FormItem label="基础注册数:" prop="register" class="clearfix left" style="width:400px">
                    <Input class="left" v-model="formCustombusi.register" placeholder="请输入基础注册数"  style="width: 200px;height:34px"></Input>
                    <span v-if="tipsshow2&&numhid" class="red left ml10">次日生效{{snapshopsize}}</span>
                </FormItem>
                <FormItem label="基础激活数:" prop="activation" class="clearfix left " style="width:400px">
                    <Input class="left" v-model="formCustombusi.activation" placeholder="请输入基础激活数"  style="width: 200px;height:34px"></Input>
                    <span v-if="tipsshow3&&numhid" class="red left ml10">次日生效{{snapshopactive}}</span>
                </FormItem>
                <FormItem label="渠道使用人:" class="left" prop="user" style="width:400px">
                    <Input  v-model="formCustombusi.user" placeholder="请输入渠道使用人"  style="width: 200px;height:34px"></Input>
                </FormItem>
                <FormItem label="渠道使用人电话:" class="left" style="width:400px">
                    <Input  v-model="formCustombusi.userphone" placeholder="请输入渠道使用人电话"  style="width: 200px"></Input>
                </FormItem>
              <FormItem label="推广页样式:" class="left" prop="style" style="width:400px">
                <Select :disabled="numhid" v-model="formCustombusi.style" placeholder="请选择" style="width:200px" @on-change="applicationsel">
                    <Option v-for="items in promotionPageSelect" :value="items.businessPromotionPageCode">{{items.pageName}}&nbsp;&nbsp;{{items.promotionPageUrl}}</Option>
                </Select>
              </FormItem>
            <FormItem label=""  class="right" style="width:400px">
                <img @click="modal11=true" v-bind:src="stylelogo" alt="" style="width:80px;margin-right:150px">
            </FormItem>  
          </Form>
          </div>
          </Modal>
          <Modal v-model="modal11" fullscreen footer-hide class-name="vertical-center-modal">
            <div class="imgenlarge">
                <img v-bind:src="stylelogo" alt="" >
            </div>
          </Modal>      
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      value1:'',
      value2:'',
      city: "",
      code :'',
      suppliersBusinessCode:'',
      nums:'',
      model1:'',
      model3:'',
      name:'',
      service:'',
      application: "",
      titles:'添加渠道',
      supdis:false,
      suppliersBusinessChannelCode:'',
      cityList: [],
      searchOptions:[],
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000*0;
        }
      },
      statusOptions:[
        {
          value:'',
          label:'全部'
        },
        {
          value:'2',
          label:'供应商开通'
        },
        {
          value:'1',
          label:'平台开通'
        }
      ],
      promotionPageSelect:[],
      businesstypelist:[],
      inputlist:[],
      modal10:false,
      modal11: false,
      numhid:false,
      loading: true,
      loading2: false,
      tipsshow1:false,
      tipsshow2:false,
      tipsshow3:false,
      snapshopcount:'',
      snapshopsize:'',
      snapshopactive:'',
      stylelogo: require('../../image/moren.png'),
      formCustombusi: {
        activation:'',
        number:'',
        suppliername:'',
        businesstype:'',
        channelnum: '',
        channelname: '',  
        coefficient: '',
        register: '',
        style: '',
        user:'',
        userphone:''
      },
      numlist:[],
      suplist:[],
      ruleCustombusi: {       
        suppliername: [
          { required: true, message: '请输入供应商编号', trigger: 'blur' }
        ],
        channelname: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多输入20个字', trigger: 'blur' },
        ],
        businesstype: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        coefficient: [
          { required: true, message: '请输入基础折扣系数', trigger: 'blur' },
          {required: true, message: '请输入正确的基础折扣系数(1-100间的整数)', pattern: /^([1-9][0-9]{0,1}|100)$/, trigger: 'blur'}
        ],
        register: [
          { required: true, message: '请输入基础注册数', trigger: 'blur' },
          {required: true, message: '请输入正确的基础注册数(1-1000间的整数)', pattern: /^([1-9][0-9]{0,2}|1000)$/ , trigger: 'blur'}
        ],
        activation: [
          { required: true, message: '请输入基础激活数', trigger: 'blur' },
          {required: true, message: '请输入正确的基础激活数(1-1000间的整数)', pattern: /^([1-9][0-9]{0,2}|1000)$/ , trigger: 'blur'}
        ],
        user: [
          { type: 'string', max: 50, message: '最多输入50个字', trigger: 'blur' },
        ],
        // userphone: [
        //   {required: true, message: '电话最多输入11位数字', pattern: /^(0|[1-9][0-9]{10})$/, trigger: 'blur'}
        // //   {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        // ],
        style: [
          { required: true, message: '请选择推广页样式', trigger: 'blur' }
        ]
      },
      columns7: [
          {
          title: "供应商编号",
          key: "suppliersNo",
          minWidth: 140,
          align: "center"
        },
        {
          title: "供应商名称",
          key: "suppliersName",
          minWidth: 160,
          align: "center"
        },
        {
          title: "业务类型",
          key: "businessName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "渠道编号",
          key: "channelKey",
          minWidth: 140,
          align: "center"
        },
        {
          title: "渠道名称",
          key: "channelName",
          minWidth: 160,
          align: "center"
        },
        {
          title: "渠道开通方式",
          key: "channelType",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let channelType
            if (params.row.channelType == 1) {
              channelType = '平台开通'
            } else {
              channelType = '供应商开通'
            }
            return h("div", [h("span", {}, channelType)]);
          }
        },
        {
          title: "基础折扣系数(%)",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let list = [
              h('InputNumber', {
              props: {
                min:1,
                max:100,
                value:params.row.channelBaseDiscount,
              },
              on:{
                'on-change':(e)=>{
                  this.inputlist[params.index].channelBaseDiscount = e               
                }
               }
            })
            ]
            if (params.row.snapshot != null) {
              if (params.row.channelBaseDiscount != params.row.snapshot.channelBaseDiscount&&params.row.snapshot.channelBaseDiscount!=null) {
                list.push(
                  h('span', {
                  style: {
                    display: 'block',
                    width: '100%',
                    color:'red'
                  }
                }, '次日生效'+params.row.snapshot.channelBaseDiscount+'%')
                )
              } else {
                list.push(
                  h('span', {
                  style: {
                    display: 'none',
                    height: '18px',
                  }
                })
                )
              }        
            }           
          return h('div', list);
        }
        },
        {
          title: "基础注册数",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let list = [
              h('InputNumber', {
                props: {
                  min:1,
                  max:1000,
                  value:params.row.channelDiscountSize,
                },
                on:{
                  'on-change':(e)=>{
                    this.inputlist[params.index].channelDiscountSize = e               
                  }
                }
              })
            ]
            if (params.row.snapshot != null) {
              if (params.row.channelDiscountSize != params.row.snapshot.channelDiscountSize) {
                list.push(
                  h('span', {
                  style: {
                    display: 'block',
                    width: '100%',
                    color:'red'
                  }
                }, '次日生效'+params.row.snapshot.channelDiscountSize)
                )
              } else {
                list.push(
                  h('span', {
                  style: {
                    display: 'none',
                    height: '18px',
                  }
                })
                )
              }
            }
          return h('div', list);
        }
        },
        {
          title: "基础激活数",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let list = [
              h('InputNumber', {
                props: {
                  min:1,
                  max:1000,
                  value:params.row.channelBaseActive,
                },
                on:{
                  'on-change':(e)=>{
                    this.inputlist[params.index].channelBaseActive = e               
                  }
                }
              })
            ]
            if (params.row.snapshot != null) {
              if (params.row.channelBaseActive != params.row.snapshot.channelBaseActive) {
                list.push(
                  h('span', {
                  style: {
                    display: 'block',
                    width: '100%',
                    color:'red'
                  }
                }, '次日生效'+params.row.snapshot.channelBaseActive)
                )
              } else {
                list.push(
                  h('span', {
                  style: {
                    display: 'none',
                    height: '18px',
                  }
                })
                )
              }
            }
          return h('div', list);
        }
        },
        {
          title: "开通时间",
          key: "dataCreateTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: "推广URL",
          key: "channelUrl",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px',
              },
              attrs: {
                name: 'elemurl'
              },
              },params.row.channelUrl),
              // h('Input', {
              // style: {
              //   marginRight: '5px',
              //   width:'10px'
              // },
              // attrs: {
              //   name: 'elemurl'
              // },
              // props: {
              //     // type: 'number',
              //     value: params.row.channelUrl
              //   },
              // }),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      let Url2=document.querySelectorAll('[name="elemurl"]');
                      if (document.body.createTextRange) {
                        var range = document.body.createTextRange();
                        range.moveToElementText(Url2[params.index]);
                        range.select();
                    } else if (window.getSelection) {
                        var selection = window.getSelection();
                        var range = document.createRange();
                        range.selectNodeContents(Url2[params.index]);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    document.execCommand('Copy');
                    this.$Message.info('复制成功');
                      // let Url2=document.querySelectorAll('[name="elemurl"]');
                      // Url2[params.index].select(); // 选择对象
                      // document.execCommand("Copy");
                      // this.$Message.info('复制成功');
                    }
                  }
                },
                "复制"
              ),
            ])
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                      this.code = params.row.suppliersBusinessChannelCode
                      this.suppliersBusinessCode = params.row.suppliersBusinessCode
                      // this.bustypechange (params.row.suppliersBusinessCode)
                      this.addchannel (2)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.channelremove (params.row.suppliersBusinessChannelCode)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: [],
      cityTypel: [],
      startRow: 1,
      endRow: 20,
      startRow1: 1,
      endRow1: 20,
      total: 0,
      loading3: false
    };
  },
  methods: {
    messagetype() {},
    // // 待审核
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.label_query(this.startRow);
    },
    PageSizeChange(limit) {
      this.startRow = 1;
      this.endRow = limit;
      // this.params.limit = limit;
      this.label_query(this.startRow);
    },
    businessSubmit (name) {
      for (let i = 0; i < this.suplist.length; i++) {
        this.suplist[i].toUpperCase()      
      }
      if (this.suplist.indexOf(this.formCustombusi.number.toUpperCase()) == -1) {         
          this.formCustombusi.number = ''
          this.formCustombusi.suppliername = ''
          this.$Modal.confirm({
            title: '提示',
            content: '<p>未匹配到供应商编号,请输入正确的供应商编号</p>'
        });
        this.changeLoading()
          return false
      }
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {     
          this.channelpre ()
        }
      })
    },
    businessReset (name) {
      this.$refs[name].resetFields()
      this.suplist = []
      this.stylelogo = require('../../image/moren.png')
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    label_option(v) {
        this.model1 = v;
    },
    // 时间判断
      time1 (value, data) {
        this.value1 = value
      },
      time2 (value, data) {
        this.value2 = value
      },
      // 业务类型change
      bustypechange (val) {
        if (val == '') {
          return false
        }
        let list = {
          suppliersBusinessCode:val
        }    
        this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/saveViewData", list).then(data => {
          if(data.code == 'success'){
            if (this.nums==2) {
              this.promotionPageSelect = data.data.promotionPageSelect
              return false
            } else {
              this.formCustombusi.coefficient = String(data.data.channelBaseDiscount)
              this.formCustombusi.register = String(data.data.channelDiscountSize)
              this.formCustombusi.activation = String(data.data.channelBaseActive)
              this.promotionPageSelect = data.data.promotionPageSelect
            }                      
          }
        }).catch(err=>{
          console.log(err)
        })

      },
    // 推广url改变
    applicationsel (val) {
      this.promotionPageSelect.forEach(element => {
        if (element.businessPromotionPageCode == val) {
          this.stylelogo = element.promotionPagePreview
        }
      });

    },
    // 添加渠道 
    addchannel (num) {
      this.nums = num
        if (num == 2) {
          this.titles = '编辑渠道'       
          this.numhid = true
          this.supdis = true
          this.bustypechange (this.suppliersBusinessCode)
          this.editors ()        
        }  else {
          this.supdis = false
          this.formCustombusi.channelname = ""
          this.formCustombusi.style = ""
          this.numhid = false
          this.titles = '添加渠道'
          // this.addecho (num)
        }
        this.handleSearch1 ()       
        this.modal10 = true
    },
    // 编辑回显
    editors () {
      this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/getByCode?suppliersBusinessChannelCode="+this.code).then(data => {
        if(data.code == 'success'){
          this.formCustombusi.number = data.data.suppliersNo
          this.formCustombusi.suppliername = data.data.suppliersName
          this.addbustype (data.data.suppliersCode)
          this.formCustombusi.businesstype = data.data.suppliersBusinessCode        
          this.formCustombusi.channelname = data.data.channelName
          this.formCustombusi.channelnum = data.data.channelKey
          this.formCustombusi.activation = String(data.data.channelBaseActive)
          this.formCustombusi.coefficient = String(data.data.channelBaseDiscount)
          this.formCustombusi.register = String(data.data.channelDiscountSize)
          this.formCustombusi.style = data.data.businessPromotionPageCode
          this.formCustombusi.user = data.data.contactName
          this.formCustombusi.userphone = data.data.contactPhone
          this.promotionPageSelect.forEach(element => {
            if (element.businessPromotionPageCode == data.data.businessPromotionPageCode) {
              this.stylelogo = element.promotionPagePreview
            }
          })
          this.suppliersBusinessChannelCode = data.data.suppliersBusinessChannelCode
          if (data.data.snapshot != null) {
            if (data.data.channelBaseDiscount != data.data.snapshot.channelBaseDiscount &&data.data.snapshot.channelBaseDiscount!=null ) {
              this.tipsshow1 = true
              this.snapshopcount = data.data.snapshot.channelBaseDiscount
            } else {
              this.tipsshow1 = false
            }
            if (data.data.channelDiscountSize != data.data.snapshot.channelDiscountSize) {
              this.tipsshow2 = true
              this.snapshopsize = data.data.snapshot.channelDiscountSize 
            } else {
              this.tipsshow2 = false
            }
            if (data.data.channelBaseActive != data.data.snapshot.channelBaseActive) {
              this.tipsshow3 = true
              this.snapshopactive = data.data.snapshot.channelBaseActive
            } else {
              this.tipsshow3 = false
            }
          } else {
            this.tipsshow1 = false
            this.tipsshow2 = false
            this.tipsshow3 = false           
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    // 添加
    channelpre () {
      if (this.formCustombusi.number == '') {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>请输入供应商编号</p>'
        });
        this.changeLoading()
        return false
      }
      let reg = /^(0|[1-9][0-9]{10})$/
      if (!reg.test(this.formCustombusi.userphone)&&this.formCustombusi.userphone!='') {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>电话最多输入11位数字</p>'
        });
        this.changeLoading()
        return false
      }
      let list
      let urls
      let content
      if (this.nums == 1) {

        list = {
          suppliersBusinessCode : this.formCustombusi.businesstype,//供应商业务code
          channelName : this.formCustombusi.channelname,//渠道名称
          channelBaseDiscount: this.formCustombusi.coefficient,
          channelDiscountSize :this.formCustombusi.register,
          channelBaseActive :this.formCustombusi.activation,
          contactName : this.formCustombusi.user,
          contactPhone : this.formCustombusi.userphone,
          businessPromotionPageCode:this.formCustombusi.style
        }
        urls = "/promotion/suppliersBusinessChannel/save" 
        content = '<p>新增成功</p>'     
      } else {
        list = {
          suppliersBusinessCode : this.formCustombusi.businesstype,//供应商业务code
          channelName : this.formCustombusi.channelname,//渠道名称
          channelBaseDiscount: this.formCustombusi.coefficient,
          channelDiscountSize :this.formCustombusi.register,
          channelBaseActive :this.formCustombusi.activation,
          contactName : this.formCustombusi.user,
          contactPhone : this.formCustombusi.userphone,
          // businessPromotionPageCode:this.formCustombusi.style,
          suppliersBusinessChannelCode:this.suppliersBusinessChannelCode,
          fastUpdate:'0'
        }
        urls = "/promotion/suppliersBusinessChannel/updateByCode" 
        content = '<p>保存成功</p>'
      }

      this.http.post(BASE_URL+urls, list).then(data => {
        if(data.code == 'success'){
          let title = '提示'
          this.$Modal.success({
              title: title,
              content: content,
              onOk: () => {
                  this.modal10 = false
                  this. label_query (1)
                  this.formCustombusi.userphone = ''
                  this.suplist = []
                  this.stylelogo = require('../../image/moren.png')
              }
          })
          this.$refs['formCustom'].resetFields()
          this.loading3 = false;
        } else {
          this.changeLoading ()
          this.$Message.error(data.message);
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    // addecho (number) {
    //   let list = {
    //     suppliersBusinessCode  : this.application
    //   }
    //   this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/saveViewData", list).then(data => {
    //     if(data.code == 'success'){
    //       this.formCustombusi.coefficient = String(data.data.channelBaseDiscount)
    //       this.formCustombusi.register = String(data.data.channelDiscountSize)
    //       this.promotionPageSelect = data.data.promotionPageSelect
    //       if (number == 2) {
    //         this.editors ()
    //       }

    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })

    // },
    // 供应商编号模糊搜索
    handleSearch1 () {
      this.http.post(BASE_URL+"/promotion/suppliers/queryListManager",{pageSize:'1000'}).then(data => {
      if(data.code == 'success'){
        this.numlist = data.data.dataList
        data.data.dataList.forEach(element => {
          this.suplist.push(element.suppliersNo)
        });
        
      }
      }).catch(err=>{
      console.log(err)
      })
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;     
    },
    supname (value) {
      this.numlist.forEach(element => {
        if (value == element.suppliersNo) {
          this.formCustombusi.suppliername = element.suppliersName
          this.addbustype (element.suppliersCode)
        }
      });
    },
    // 新增业务类型
    addbustype (code) {
      let list = {
        suppliersCode:code
      }
      this.http.post(BASE_URL+"/promotion/suppliersBusiness/queryListManager",list).then(data => {
      if(data.code == 'success'){
        this.businesstypelist = data.data
      }
      }).catch(err=>{
      console.log(err)
      })

    },
       // 导出
    exports () {
      this.loading2 = true;
      let httpUrl = BASE_URL+'/promotion/suppliersBusinessChannel/export'
      let formData = new FormData()
      formData.append("pageSize",this.endRow)
      formData.append("pageNum",this.startRow)
      formData.append("businessCode",this.service)
      formData.append("searchKey",this.model1)
      formData.append("searchValue",this.name)
      formData.append("channelType",this.model3)
      formData.append("beginTime",this.value1)
      formData.append("endTime",this.value2)
      utils.exporttable(httpUrl, utils.getlocal('token'),formData, e => {
        if(e == true ){
          this.loading2 = false;
        }
      })
    },
    // 删除
    channelremove (code) {
       this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要删除吗?</p>',
            onOk: () => {
                this.channeldel (code)
            }
        }); 
    },
    channeldel (code) {
      this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/deleteByCode?suppliersBusinessChannelCode="+code).then(data => {
        if(data.code == 'success'){
          const title = '提示'
          let content = '<p>删除成功</p>'
          this.$Modal.success({
              title: title,
              content: content
          })
          this.startRow = 1
          this.label_query (1) 
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    // 批量更新
    batchUpdate () {
      let tir = /^[0-9]+$/
      for (let i = 0; i < this.inputlist.length; i++) {
        if (this.inputlist[i].channelBaseDiscount == null) {
          this.inputlist[i].channelBaseDiscount = 1
        }
        if (this.inputlist[i].channelDiscountSize == null) {          
          this.inputlist[i].channelDiscountSize = 1
        }
        if (this.inputlist[i].channelBaseActive == null) {
          this.inputlist[i].channelBaseActive = 1
        }
        if (!tir.test(String(this.inputlist[i].channelBaseDiscount))) {
          const title = '提示'
          let content = '<p>基础折扣系数请输入整数</p>'
          this.$Modal.error({
              title: title,
              content: content
          })
          return false      
        }
        if (!tir.test(String(this.inputlist[i].channelDiscountSize))) {
          const title = '提示'
          let content = '<p>基础注册数请输入整数</p>'
          this.$Modal.error({
              title: title,
              content: content
          })
          return false      
        }
        if (!tir.test(String(this.inputlist[i].channelBaseActive))) {
          const title = '提示'
          let content = '<p>基础激活数请输入整数</p>'
          this.$Modal.error({
              title: title,
              content: content
          })
          return false      
        }
      }
      this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要更新吗?</p>',
            onOk: () => {         
              this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/batchUpdate", {updateBeanList:this.inputlist,fastUpdate:'0'}).then(data => {
                if(data.code == 'success'){
                  const title = '提示'
                  let content = '<p>更新成功</p>'
                  this.$Modal.success({
                      title: title,
                      content: content
                  })
                  this.label_query (1)
                  this.inputlist = []                 
                }
              }).catch(err=>{
                console.log(err)
              })
                
            }
        });    
    },
    // 查询
    label_query (startRow) {
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '提示',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      this.inputlist = []
      let list = {
        pageSize: this.endRow,
        pageNum: startRow,
        businessCode :this.service,//业务code
        searchKey : this.model1,
        searchValue : this.name,
        channelType : this.model3,//开通方式
        beginTime : this.value1,//开始时间
        endTime : this.value2,//结束时间
      }
      this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/queryPage", list).then(data => {
        if(data.code == 'success'){
          this.data6 = data.data.dataList;
          data.data.dataList.forEach(element => {
            let obj = new Object ()
            obj.channelBaseDiscount = element.channelBaseDiscount
            obj.channelDiscountSize = element.channelDiscountSize
            obj.channelBaseActive = element.channelBaseActive
            obj.suppliersBusinessChannelCode = element.suppliersBusinessChannelCode
            this.inputlist.push(obj)
          });
          this.total = parseInt(data.data.total);
          this.loading3 = false;
        } else {
          this.$Message.error(data.message);
        }
      }).catch(err=>{
        this.loading3 = false;
        console.log(err)
      })
    },
    
  },
  created() {
    this.http.post(BASE_URL + "//promotion/business/queryListByManager",{}).then(data=>{
      if(data.code == 'success'){
        this.cityList = data.data          
        this.label_query (1)
      }
    }).catch(err=>{
      console.log(err)
    })
    this.http.post(BASE_URL + "/promotion/suppliersBusinessChannel/searchOption",{}).then(data=>{
      if(data.code == 'success'){
        this.searchOptions = data.data
      }
    }).catch(err=>{
      console.log(err)
    })
    

  }
};
</script>
<style lang="less" scoped>
.imgenlarge{
    padding: 50px;
    img{
        width: 100%;
        height: 100%;

    }
}
.demo-auto-complete-item{
  max-height: 200px;
  overflow-y: scroll
}
</style>
