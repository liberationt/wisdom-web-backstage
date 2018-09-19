<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;供应商列表&nbsp;>&nbsp;渠道管理</span>
      </p>
    </div>
      <div class="clearfix conditioncss">
        <div class="left">
          <span>应用：</span>
          <Select v-model="application" style="width:150px" >
            <Option v-for="item in cityList" :value="item.suppliersBusinessCode" :key="item.suppliersBusinessCode">{{ item.businessName }}</Option>
          </Select>
        </div>
        <Button type="info" class="left ml20 w90" :loading="loading3" @click="label_query()">
          <span v-if="!loading3">查询</span>
          <span v-else>查询</span>
        </Button>
        <Button type="primary" @click="addchannel(1)" class="ml20">添加渠道</Button>
        <Button type="primary" class="ml10 " :loading="loading2" @click="exports">
        <span v-if="!loading2">导出</span>
        <span v-else>请稍等...</span>
      </Button>
        <Button type="warning" class="ml10" @click="batchUpdate">批量更新</Button>
        </div>
        <div id="application_table" class="mt15 contentcss">
          <Table border :columns="columns7" :data="data6"></Table>
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
          width="700"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" class="nametop" :model="formCustombusi" :rules="ruleCustombusi" :label-width="100" style="padding-left:100px">
                <FormItem v-if="numhid" label="渠道编号:" prop="channelnum" >
                    <Input  v-model="formCustombusi.channelnum" placeholder="请输入渠道编号" disabled style="width: 300px"></Input>
                </FormItem>
                <FormItem label="渠道名称:" prop="channelname" >
                    <Input  v-model="formCustombusi.channelname" placeholder="请输入渠道名称"  style="width: 300px"></Input>
                </FormItem>
                <FormItem label="基础折扣系数:" prop="coefficient" class="clearfix">
                    <Input class="left" v-model="formCustombusi.coefficient" placeholder="请输入基础折扣系数"  style="width: 300px">
                        <span slot="append">%</span>
                    </Input>
                    <span v-if="tipsshow1&&numhid" class="red left ml10">次日生效{{snapshopcount}}%</span>
                </FormItem>
                <FormItem label="基础注册数:" prop="register" class="clearfix">
                    <Input class="left" v-model="formCustombusi.register" placeholder="请输入基础注册数"  style="width: 300px"></Input>
                    <span v-if="tipsshow2&&numhid" class="red left ml10">次日生效{{snapshopsize}}</span>
                </FormItem>
                <FormItem label="基础激活数:" prop="activation" class="clearfix">
                    <Input class="left" v-model="formCustombusi.activation" placeholder="请输入基础激活数"  style="width: 300px"></Input>
                    <span v-if="tipsshow3&&numhid" class="red left ml10">次日生效{{snapshopactive}}</span>
                </FormItem>
              <FormItem label="推广页样式:" prop="style" >
              <Select v-model="formCustombusi.style" placeholder="请选择" style="width:300px" @on-change="applicationsel">
                <Option v-for="items in promotionPageSelect" :value="items.businessPromotionPageCode">{{items.pageName}}&nbsp;&nbsp;{{items.promotionPageUrl}}</Option>
              </Select>
            </FormItem>
            <FormItem label=""  >
                <img @click="modal11=true" v-bind:src="stylelogo" alt="" style="width:80px">
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
      city: "",
      code :'',
      nums:'',
      application: "",
      titles:'添加渠道',
      suppliersBusinessChannelCode:'',
      cityList: [],
      promotionPageSelect:[],
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
        channelnum: '',
        channelname: '',  
        coefficient: '',
        register: '',
        activation:'',
        style: ''
      },
      ruleCustombusi: {
        channelname: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多输入20个字符', trigger: 'blur' },
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
        // phone: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        // ],
        style: [
          { required: true, message: '请选择推广页样式', trigger: 'blur' }
        ]
      },
      columns7: [
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
              if (params.row.channelBaseDiscount != params.row.snapshot.channelBaseDiscount) {
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
                    display: 'block',
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
          minWidth: 100,
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
                    display: 'block',
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
          minWidth: 100,
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
                    display: 'block',
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
          title: "推广URL",
          key: "channelUrl",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
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
      this.label_query();
    },
    PageSizeChange(limit) {
      this.startRow = 1;
      this.endRow = limit;
      // this.params.limit = limit;
      this.label_query();
    },
    businessSubmit (name) {
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
      this.stylelogo = require('../../image/moren.png')
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
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
          this.addecho (num)        
        }  else {
            this.formCustombusi.channelname = ""
            this.formCustombusi.style = ""
            this.numhid = false
            this.titles = '添加渠道'
            this.addecho (num)
        }
        this.modal10 = true
    },
    // 编辑回显
    editors () {
      this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/getByCode?suppliersBusinessChannelCode="+this.code).then(data => {
        if(data.code == 'success'){
          this.formCustombusi.channelname = data.data.channelName
          this.formCustombusi.channelnum = data.data.channelKey 
          this.formCustombusi.activation = String(data.data.channelBaseActive)
          this.formCustombusi.coefficient = String(data.data.channelBaseDiscount)
          this.formCustombusi.register = String(data.data.channelDiscountSize)
          this.formCustombusi.style = data.data.businessPromotionPageCode
          this.promotionPageSelect.forEach(element => {
            if (element.businessPromotionPageCode == data.data.businessPromotionPageCode) {
              this.stylelogo = element.promotionPagePreview
            }
          })
          this.suppliersBusinessChannelCode = data.data.suppliersBusinessChannelCode
          if (data.data.snapshot != null) {
            if (data.data.channelBaseDiscount != data.data.snapshot.channelBaseDiscount) {
              this.tipsshow1 = true
              this.snapshopcount = data.data.snapshot.channelBaseDiscount
            }
            if (data.data.channelDiscountSize != data.data.snapshot.channelDiscountSize) {
              this.tipsshow2 = true
              this.snapshopsize = data.data.snapshot.channelDiscountSize 
            }
            if (data.data.channelBaseActive != data.data.snapshot.channelBaseActive) {
              this.tipsshow3 = true
              this.snapshopactive = data.data.snapshot.channelBaseActive
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
      let list
      let urls
      let content
      if (this.nums == 1) {
        list = {
          channelName : this.formCustombusi.channelname,
          channelBaseDiscount: this.formCustombusi.coefficient,
          suppliersBusinessCode :this.application,
          channelDiscountSize :this.formCustombusi.register,
          channelBaseActive :this.formCustombusi.activation,
          businessPromotionPageCode:this.formCustombusi.style        
        }
        urls = "/promotion/suppliersBusinessChannel/save" 
        content = '<p>新增成功</p>'     
      } else {
        list = {
          channelName : this.formCustombusi.channelname,
          channelBaseDiscount: this.formCustombusi.coefficient,
          suppliersBusinessCode :this.application,
          channelDiscountSize :this.formCustombusi.register,
          channelBaseActive :this.formCustombusi.activation,
          businessPromotionPageCode:this.formCustombusi.style,
          suppliersBusinessChannelCode:this.suppliersBusinessChannelCode   
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
                  this. label_query ()
                  this.stylelogo = require('../../image/moren.png')
              }
          })
        } else {
          this.changeLoading ()
          this.$Message.error(data.message);
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    addecho (number) {
      let list = {
        suppliersBusinessCode  : this.application
      }
      this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/saveViewData", list).then(data => {
        if(data.code == 'success'){
          this.formCustombusi.activation = String(data.data.channelBaseActive)
          this.formCustombusi.coefficient = String(data.data.channelBaseDiscount)
          this.formCustombusi.register = String(data.data.channelDiscountSize)
          this.promotionPageSelect = data.data.promotionPageSelect
          if (number == 2) {
            this.editors ()
          }

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
      formData.append("suppliersBusinessCode",this.application)
      // formData.append("suppliersCode",this.model3)
      // formData.append("suppliersBusinessChannelCode",this.model4)
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
          this.label_query () 
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
          element.channelBaseDiscount = 1
        }
        if (this.inputlist[i].channelDiscountSize == null) {          
          element.channelDiscountSize = 1
        }
        if (this.inputlist[i].channelBaseActive == null) {
          element.channelBaseActive = 1
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
              this.http.post(BASE_URL+"/promotion/suppliersBusinessChannel/batchUpdate", {updateBeanList:this.inputlist}).then(data => {
                if(data.code == 'success'){
                  const title = '提示'
                  let content = '<p>更新成功</p>'
                  this.$Modal.success({
                      title: title,
                      content: content
                  })
                  this.label_query ()
                  this.inputlist = []                 
                }
              }).catch(err=>{
                console.log(err)
              })
                
            }
        });    
    },
    // 查询
    label_query () {
      this.inputlist = []
      let list = {
        pageSize: this.endRow,
        pageNum: this.startRow,
        suppliersBusinessCode :this.application
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
        }
      }).catch(err=>{
        this.loading3 = false;
        console.log(err)
      })
    },
    
  },
  created() {
    this.http.post(BASE_URL + "/promotion/suppliersBusiness/queryListManager",{suppliersCode:this.$route.query.suppliersCode}).then(data=>{
      if(data.code == 'success'){
        this.cityList = data.data
        this.application = this.$route.query.suppliersBusinessCode      
        this.label_query ()
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
</style>
