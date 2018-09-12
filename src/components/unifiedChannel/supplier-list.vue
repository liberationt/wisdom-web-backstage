<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;渠道&nbsp;>&nbsp;渠道配置</span>
      </p>
    </div>
      <div class="clearfix conditioncss">
        <div class="left">
          <span>供应商名称:</span>
          <Input v-model="number" class="ml5" placeholder="请输入供应商名称" style="width: 150px"></Input>
        </div>
        <Button type="info" class="left ml20 w90" :loading="loading3" @click="label_query()">
          <span v-if="!loading3">查询</span>
          <span v-else>查询</span>
        </Button>
          <Button v-if="nums==1" shape="circle" class="left ml20" @click="addsupplier(1)">添加供应商</Button>
        
        </div>
        <div id="application_table" class="mt10 contentcss">
          <Table :columns="columns10" :data="data9" highlight-row :show-header="false"></Table>
          <div class="tr mt15">
            <Page :total="total" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
          </div>
        </div>
        <!-- 添加编辑供应商弹框 -->
        <Modal
          :title='supptit'
          v-model="modal9"
           @on-ok="handleSubmit('formCustom')"
           @on-cancel="handleReset1('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:200px">
              <FormItem label="供应商编号:" prop="channelnum" >
                <Input v-model="formCustom.channelnum" placeholder="请输入供应商编号" style="width: 300px"></Input>
              </FormItem>
              <FormItem label="类型:" prop="channelid" >
                <Select v-model="formCustom.channeltype" placeholder="请选择" style="width:100px">
                <Option value="1">企业</Option>
                <Option value="2">个人</Option>
              </Select>
                <Input v-model="formCustom.channelid" placeholder="请输入证件号码" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="供应商名称:" prop="suppname" >
                <Input v-model="formCustom.suppname"  placeholder="请输入供应商名称" style="width: 300px"></Input>
              </FormItem>
            <FormItem label="联系人:" class="clearfix contacts" >
              <Row>
                <Col span="8">
                  <FormItem prop="name" class="nametop">
                    <Input class="left" v-model="formCustom.name" placeholder="请输入姓名" style="width: 150px">
                      <span slot="prepend">姓名</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="7">
                  <FormItem prop="phone" class="nametop">                     
                    <Input v-model="formCustom.phone" class="left " placeholder="请输入手机号" style="width: 150px;margin-top:1px">
                      <span slot="prepend">手机号</span>
                    </Input>
                  </FormItem>
                </Col>
              </Row> 
            </FormItem>
            <FormItem label="备注:" prop="remarks" >
              <Input  v-model="formCustom.remarks" placeholder="请输入备注" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="账户状态:" prop="accounttype" >
              <Select v-model="formCustom.accounttype" placeholder="请选择" style="width:300px" >
                <Option value="1">正常</Option>
                <Option value="0">停用</Option>
              </Select>
            </FormItem> 
            <FormItem label="登录密码:" v-if="suption==2" >
              <Button v-if="passshow"  type="primary" @click="resetpass">自动重置密码</Button>
              <Button v-else disabled>已生成密码</Button>
            </FormItem>     
          </Form>
          </div>
          </Modal>
          <!-- 添加编辑业务 -->
          <!-- 添加编辑供应商弹框 -->
        <Modal
          title="添加业务-供应商名称"
          v-model="modal10"
           @on-ok="businessSubmit('formCustombusi')"
           @on-cancel="businessReset('formCustombusi')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="700"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustombusi" :model="formCustombusi" :rules="ruleCustombusi" :label-width="100" style="padding-left:100px">
              <FormItem label="推广业务:" prop="accounttype" >
              <Select v-model="formCustombusi.accounttype" placeholder="请选择业务" style="width:300px" >
                <Option v-for="item in prombusiness" :value="item.value">{{item.label}}</Option>
                <!-- <Option value="2">抢单侠</Option> -->
              </Select>
            </FormItem>
            <FormItem label="商务负责人:" prop="person" >
              <Select v-model="formCustombusi.person" placeholder="请选择商务对接" style="width:300px" >
                <Option v-for="item in managerSelect" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="对方联系人:" class="clearfix contacts" >
              <Row>
                <Col span="8">
                    <FormItem prop="name" class="nametop">
                        <Input class="left" v-model="formCustombusi.name" placeholder="请输入姓名" style="width: 150px">
                        <span slot="prepend">姓名</span>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem prop="phone" class="nametop">                     
                      <Input v-model="formCustombusi.phone" class="left " placeholder="请输入手机号" style="width: 150px;margin-top:1px">
                      <span slot="prepend">手机号</span>
                      </Input>
                    </FormItem>
              </Col>
            </Row> 
            </FormItem>
            <FormItem label="备注:" prop="remarks" >
              <Input  v-model="formCustombusi.remarks" placeholder="请输入备注" style="width: 300px"></Input>
            </FormItem>  
          </Form>
          </div>
          </Modal>
        
  </div>
</template>
<script>
import expandRow from './table-expand.vue';
export default {
  components: { expandRow },
  data() {
    return {
      modal9:false,
      modal10:false,
      passshow:true,
      supptit:'添加供应商',
      prombusiness:[],
      managerSelect:[],
      suption:'',
      suppliersCode:'',
      nums:this.$route.query.accnum,
      formCustom: {
        channelnum: '',
        channeltype: '1',
        channelid: '',
        suppname:'',
        name: '',
        phone: '',
        remarks: '',
        accounttype: ''
      },
      ruleCustom: {
        channelnum: [
          { required: true, message: '请输入供应商编号', trigger: 'blur' },
          {required: true, message: '请输入正确的供应商编号', pattern: /^[a-zA-Z]{1,3}[0-9]{1,9}$/, trigger: 'blur'},
          { type: 'string', max: 10, message: '最多输入10个字符', trigger: 'blur' }       
        ],
        channelid: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
        ],
        suppname: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多输入20个字符', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多输入20个字符', trigger: 'blur' },
        ],
        accounttype: { required: true, message: '请选择账户状态', trigger: 'blur' }
      },
      // 业务
      formCustombusi: {
        accounttype: '',
        person: '',  
        name: '',
        phone: '',
        remarks: ''
      },
      ruleCustombusi: {
        accounttype: [
          { required: true, message: '请选择推广业务', trigger: 'blur' }
        ],
        person: [
          { required: true, message: '请选择商务负责人', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多输入20个字符', trigger: 'blur' },
        ]
      },     
      number: "",    
      columns10: [
          {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                console.log(params)
                  return h(expandRow, {
                      props: {
                          row: params.row.suppliersCode
                      },
                      on: {
                      click: () => {
                      }
                    }
                  })
              }
          },
          {
              key: 'name',             
              render: (h, params) => {
              let cardType
              if (params.row.cardType == 1) {
                cardType = '企业'
              } else if (params.row.cardType == 2) {
                cardType = '个人'
              }
              let suppliersStatus 
              if (params.row.suppliersStatus  == 0) {
                suppliersStatus  = '停用'
              } else if (params.row.suppliersStatus  == 1) {
                suppliersStatus  = '正常'
              }
              return h("div", [
                h(
                  "strong",
                  {
                    style: {
                      marginRight: "5px"
                    },
                  },
                  params.row.suppliersName
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "5px",
                      display: 'inline-block',
                      width:'40px',
                      height: '25px',
                      lineHeight: '25px',
                      textAlign: 'center',
                      background: '#ccc',
                      color: '#fff',
                      borderRadius: '5px'
                    },
                  },
                  cardType
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        
                      }
                    }
                  },
                  suppliersStatus
                )
              ]);
            }
          },
          {
              key: 'address',
              align:'right',
              render: (h, params) => {
                if (this.nums == 1) {               
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
                        this.addbusiness (params.row.suppliersCode)
                      }
                    }
                  },
                  "添加"
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
                        this.suppliersCode = params.row.suppliersCode
                        this.addsupplier (2)
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
                        this.suppremove (params.row.suppliersCode)
                      }
                    }
                  },
                  "删除"
                )
              ]);              
                }              
            }
          }
      ],
      data9: [],
      startRow: 1,
      endRow: 10,
      total: 0,
      loading: true,
      loading3: false
    };
  },
  methods: {
    // // 待审核
    pageChange (page) {
      this.startRow = page
      // this.label_query()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      // this.label_query()
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 添加编辑供应商
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {
          let list
          if (this.suption == 1) {
          list = {
            suppliersNo:this.formCustom.channelnum.toUpperCase(),
            cardType:this.formCustom.channeltype,
            cardNo :this.formCustom.channelid,
            suppliersName:this.formCustom.suppname,
            contactName :this.formCustom.name,
            contactPhone :this.formCustom.phone,
            memo:this.formCustom.remarks,
            suppliersStatus :this.formCustom.accounttype
          }
          } else {
            list = {
            suppliersNo:this.formCustom.channelnum.toUpperCase(),
            cardType:this.formCustom.channeltype,
            cardNo :this.formCustom.channelid,
            suppliersName:this.formCustom.suppname,
            contactName :this.formCustom.name,
            contactPhone :this.formCustom.phone,
            memo:this.formCustom.remarks,
            suppliersStatus :this.formCustom.accounttype,
            suppliersCode:this.suppliersCode
          }
            
          }
          
          this.addsupplierpre (list,this.suption)
        }
      })
    },
    handleReset1 (name) {
      this.$refs[name].resetFields()
    },
    addsupplier (num) {
      this.modal9 = true
      if (num == 1) {
        this.suption = num
        this.supptit = '添加供应商'
      } else {
        this.suption = num
        this.supptit = '编辑供应商'
        this.http.post(BASE_URL+"/promotion/suppliers/getByCode?suppliersCode="+this.suppliersCode).then(data => {
            if(data.code == 'success'){
              this.formCustom.channelnum = data.data.suppliersNo
              this.formCustom.channeltype = String(data.data.cardType)
              this.formCustom.channelid = data.data.cardNo
              this.formCustom.suppname = data.data.suppliersName
              this.formCustom.name = data.data.contactName
              this.formCustom.phone = data.data.contactPhone
              // this.formCustom.remarks = data.data.
              this.formCustom.accounttype = String(data.data.suppliersStatus)
            }
          }).catch(err=>{
            console.log(err)
          })

      }
    },
    // 重置密码
    resetpass () {
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要重置密码吗?</p>',
          onOk: () => {
            this.http.post(BASE_URL+"/promotion/suppliers/resetPassword?suppliersCode="+this.suppliersCode).then(data => {
            if(data.code == 'success'){
              const title = '重置密码'
              let content = '<p>重置成功</p>'
              this.$Modal.success({
                  title: title,
                  content: content
              })
              this.passshow = false
            }
          }).catch(err=>{
            console.log(err)
          })
          }
      });

    },
    // 新增供应商保存
    addsupplierpre (list,url) {
      let urls
      let title
      let content
      if (url == 1) {
        urls = "/promotion/suppliers/save"
        title = '添加供应商'
        content = '<p>新增成功</p>'
      } else {
        urls = "/promotion/suppliers/updateByCode"
        title = '编辑供应商'
        content = '<p>保存成功</p>'
      }
      this.http.post(BASE_URL+urls, list).then(data => {
        if(data.code == 'success'){
          this.$Modal.success({
              title: title,
              content: content,
              onOk: () => {
                  this.modal9 = false
                  this. label_query ()                   
              }
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    // 删除供应商
    suppremove (code) {
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            this.http.post(BASE_URL+'/promotion/suppliers/deleteByCode?suppliersCode='+code).then(data => {
            if(data.code == 'success'){
              const title = '提示'
              let content = '<p>删除成功</p>'
              this.$Modal.success({
                  title: title,
                  content: content,
                  onOk: () => {                 
                      this.label_query ()                   
                  }
              })
            }
          }).catch(err=>{
            console.log(err)
          })
          }
      });
    },
    // 业务
    // 添加编辑供应商
    businessSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {     
          this.$Message.error('Success!')
        }
      })
    },
    businessReset (name) {
      this.$refs[name].resetFields()
    },
    addbusiness (code)  {
      this.modal10 = true
      this.sellist (code)
    },
    // 添加供应商业务
    addsuppbusiness () {
      let list = {

      }
      this.http.post(BASE_URL+'/promotion/suppliersBusiness/save', list).then(data => {
        if(data.code == 'success'){
          this.$Modal.success({
              title: title,
              content: content,
              onOk: () => {
                  this.modal9 = false
                  this. label_query ()                   
              }
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    sellist (code) {
      this.http.post(BASE_URL+"/promotion/suppliersBusiness/saveViewData", {suppliersCode:code}).then(data => {
        if(data.code == 'success'){
          this.prombusiness = data.data.businessSelect
          this.managerSelect = data.data.managerSelect
        }
      }).catch(err=>{

        console.log(err)
      })

    },
    // 查询
    label_query() {
      this.loading3 = true;
      let list =    {
            pageSize: this.endRow,
            pageNum: this.startRow,
            suppliersName :this.number
          }
      this.http.post(BASE_URL+"/promotion/suppliers/queryListManager", list).then(data => {
        if(data.code == 'success'){
          this.data9 = data.data.dataList;
          this.total = parseInt(data.data.total);
          this.loading3 = false;
        }
      }).catch(err=>{
        this.loading3 = false;
        console.log(err)
      })
    },
    tabshow (num) {
      let table = document.querySelectorAll('.tabhid')
      table[num].classList.remove('hidden')

       
    }
  },
  created() {
    this.label_query()    
  }
};
</script>
<style lang="less" scoped>
.titletab{
    width: 100%;
    border: 1px solid #ccc;
    border-top: 0;
    padding: 10px;
    cursor: pointer;
}
.contentcss ul li:first-child .titletab{
  border-top: 1px solid #ccc;
}
.enterprise{
    display: inline-block;
    width:40px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #ccc;
    color: #fff;
    border-radius: 5px
}
.accountnum{
   display: inline-block;
   width:80px;
   height: 25px;
   line-height: 25px;
   text-align: center;
   background: #1BBC9B;
   color: #fff;
   border-radius: 5px 
}

</style>
