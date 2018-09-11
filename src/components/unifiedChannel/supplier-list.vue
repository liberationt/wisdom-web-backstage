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
        <Button type="info" class="left ml20 w90" :loading="loading3" @click="label_query('warning')">
          <span v-if="!loading3">查询</span>
          <span v-else>查询</span>
        </Button>
          <Button shape="circle" class="left ml20" @click="addsupplier">添加供应商</Button>
        
        </div>
        <div id="application_table" class="mt15 contentcss">
          <Table :columns="columns10" :data="data9" highlight-row :show-header="false"></Table>
            <!-- <ul>
                <li>
                    <div class="titletab clearfix" >
                    <div class="left">
                        <strong>S0003</strong>
                        <strong class="ml10">供应商名称</strong>
                        <span class="enterprise ml10">企业</span>
                        <span class="ml10 accountnum">账号正常</span>
                    </div>
                    <div class="right">
                        <Button type="primary" @click="tabshow(0)">查看供应商</Button>
                        <Button type="info"  @click="addbusiness">添加</Button>
                        <Button type="success" @click="addsupplier">编辑</Button>
                        <Button type="error" @click="suppremove">删除</Button>
                    </div>                
                </div>
                <Table class="hidden tabhid" border :columns="columns7" :data="data6"></Table>
                </li>
                <li>
                    <div class="titletab clearfix" >
                    <div class="left">
                        <strong>S0003</strong>
                        <strong class="ml10">供应商名称</strong>
                        <span class="enterprise ml10">企业</span>
                        <span class="ml10 accountnum">账号正常</span>
                    </div>
                    <div class="right">
                        <Button type="primary" @click="tabshow(1)">查看供应商</Button>
                        <Button type="info">添加</Button>
                        <Button type="success">编辑</Button>
                        <Button type="error">删除</Button>
                    </div>                
                </div>
                <Table class="hidden tabhid" border :columns="columns7" :data="data6"></Table>
                </li>
            </ul>           -->
          <div class="tr mt15">
            <Page :total="total" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
          </div>
        </div>
        <!-- 添加编辑供应商弹框 -->
        <Modal
          title="添加供应商"
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
                <Option value="2">暂停</Option>
              </Select>
            </FormItem> 
            <FormItem label="登录密码:"  >
              <Button type="primary">自动重置密码</Button>
            </FormItem>     
          </Form>
          </div>
          </Modal>
          <!-- 添加编辑业务 -->
          <!-- 添加编辑供应商弹框 -->
        <Modal
          title="添加业务-供应商名称"
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
            <Form ref="formCustom" :model="formCustombusi" :rules="ruleCustombusi" :label-width="100" style="padding-left:100px">
              <FormItem label="推广业务:" prop="accounttype" >
              <Select v-model="formCustom.accounttype" placeholder="请选择业务" style="width:300px" >
                <Option value="1">华赞金服</Option>
                <Option value="2">抢单侠</Option>
              </Select>
            </FormItem>
            <FormItem label="商务负责人:" prop="person" >
              <Select v-model="formCustom.person" placeholder="请选择商务对接" style="width:300px" >
                <Option value="1">哈哈</Option>
                <Option value="2">呵呵</Option>
              </Select>
            </FormItem>
            <FormItem label="对方联系人:" class="clearfix contacts" >
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
      city: "",
      modal9:false,
      modal10:false,
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
          { type: 'string', max: 10, message: '最多输入10个字符', trigger: 'blur' },
          {required: true, message: '请输入正确的供应商编号', pattern: /^[a-zA-Z0-9]+$/, trigger: 'blur'}
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
                          row: params.row
                      },
                      on: {
                      click: () => {
                        alert(1)
                      }
                    }
                  })
              }
          },
          {
              key: 'name',             
              render: (h, params) => {
              return h("div", [
                h(
                  "strong",
                  {
                    style: {
                      marginRight: "5px"
                    },
                  },
                  "供应商名称"
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
                  "企业"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    // style: {
                    //   marginRight: "5px",
                    //   display: 'inline-block',
                    //   width:'80px',
                    //   height: '25px',
                    //   lineHeight: '25px',
                    //   textAlign: 'center',
                    //   background: '#1BBC9B',
                    //   color: '#fff',
                    //   borderRadius: '5px'
                    // },
                    on: {
                      click: () => {
                        
                      }
                    }
                  },
                  "账号正常"
                )
              ]);
            }
          },
          {
              key: 'address',
              align:'right',
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
                        this.addbusiness ()
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
                        this.addsupplier ()
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
                        this.suppremove ()
                      }
                    }
                  },
                  "删除"
                )

              ]);
            }
          }
      ],
      data9: [
          {
              name: 'John Brown',
              age: 18
          },
          {
              name: 'Jim Green',
              age: 25
          }
      ],
      cityTypel: [],
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
          this.$Message.error('Success!')
        }
      })
    },
    handleReset1 (name) {
      this.$refs[name].resetFields()
    },
    addsupplier () {
      this.modal9 = true

    },
    // 删除供应商
    suppremove () {
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
              this.$Message.info('Clicked ok');
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
    addbusiness ()  {
      this.modal10 = true
    },
    // 查询
    label_query(type) {
      this.loading3 = true;
      let list =    {
            pageSize: this.endRow,
            pageNum: this.startRow,
            blackValue: this.number ? this.number : null, //手机号or姓名的参数
          }
      this.http.post(BASE_URL+"/black/riskBlackList/getRiskBlackListList", list).then(data => {
        console.log(data)
        if(data.code == 'success'){
          // this.data6 = data.data.riskBlackListList;
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
