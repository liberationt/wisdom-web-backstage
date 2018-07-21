<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;渠道配置</span>
      </p>
    </div>
    <div class="clearfix">
      <Input class=" ml100" v-model="name" placeholder="请输入渠道名称或编号" style="width:200px"></Input>
      <Button class="w100 ml50" type="info" icon="ios-search" >查询</Button>
      <div class="ml100 mt15">
          <Button type="primary" shape="circle" icon="plus-round" @click="channelAdd">添加渠道</Button>
          <!-- <Button class="ml10" type="ghost" shape="circle" icon="gear-b" @click="labelation">标签配置</Button> -->
      </div>
    </div>
    <div id="application_table">
      <Table border :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
      <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
    </div>
    <!-- 添加渠道 -->
    <Modal
          title="渠道设置"
          v-model="modal9"
           @on-ok="handleSubmit('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:200px">
              <FormItem label="渠道编号:" prop="channelnum" >
                <Input v-model="formCustom.channelnum" disabled placeholder="请输入渠道编号" style="width: 300px"></Input>
              </FormItem>
              <FormItem label="渠道商类型:" prop="channelid" >
                <Select v-model="formCustom.channeltype" placeholder="请选择" style="width:100px">
                <Option value="1">企业</Option>
                <Option value="2">个人</Option>
              </Select>
                <Input v-model="formCustom.channelid" placeholder="请输入企业证件号码" style="width: 200px"></Input>
              </FormItem>
            <FormItem label="联系人:" class="clearfix contacts" >
              <Row>
                <Col span="8">
                    <FormItem prop="name">
                        <Input class="left" v-model="formCustom.name" placeholder="请输入姓名" style="width: 150px">
                        <span slot="prepend">姓名</span>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem prop="phone">                     
                      <Input v-model="formCustom.phone" class="left " placeholder="请输入手机号" style="width: 150px;margin-top:1px">
                      <span slot="prepend">手机号</span>
                      </Input>
                    </FormItem>
                </Col>
            </Row> 
            </FormItem>
            <FormItem label="渠道标签:" prop="subtitle">
              <div class="clearfix  label-xz">
            <div class="left channel-label"></div>
             <Button class="left" type="primary" @click="choice">选择</Button>
            </div>
            </FormItem>
            <FormItem label="推广业务:" prop="fruit">
              <CheckboxGroup v-model="formCustom.fruit">
                <Checkbox label="华赞金服"></Checkbox>
                <Checkbox label="抢单侠"></Checkbox>
                <Checkbox label="大网钱"></Checkbox>
                <Checkbox label="POS机"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="对接商务:" prop="affairs">
              <Select v-model="formCustom.affairs" placeholder="请选择商务人员" style="width:300px">
                <Option value="1">范围</Option>
              </Select>
            </FormItem>
            <FormItem label="对接运营:" prop="operate" >
              <Select v-model="formCustom.operate" placeholder="请选择运营人员" style="width:300px">
                <Option value="1">范围</Option>
              </Select>
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
            <FormItem label="登录密码:" prop="password" >
              <Input type="url" v-model="formCustom.password" placeholder="如不重置修改请勿填写" style="width: 300px"></Input>
            </FormItem>
          </Form>
          </div>
          </Modal>
          <!-- 渠道标签选择 -->
          <!-- 添加渠道 -->
    <Modal
          title="渠道设置"
          v-model="modal10"
           @on-ok="canlable"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
              <Tree :data="data4" show-checkbox multiple ref="tree"></Tree>
          </div>
          </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      modal9: false,
      modal10: false,
      loading: true,
      formCustom: {
        channelnum: '',
        channeltype: '',
        channelid: '',
        name: '',
        phone: '',
        fruit: [],
        affairs: '',
        operate: '',
        remarks: '',
        accounttype: '',
        password: ''
      },
      ruleCustom: {
        channelnum: { required: true, message: '请输入渠道编号', trigger: 'blur' },
        channelid: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          // { max: 100, message: '产品名称最多输入100个字符', trigger: 'blur' },
          // { min: 2, message: '产品名称最少输入2个字符', trigger: 'blur' },
          // {required: true, message: '请输入正确的产品名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          // { max: 100, message: '产品副标题最多输入100个字符', trigger: 'blur' },
          // { min: 2, message: '产品副标题最少输入2个字符', trigger: 'blur' },
          // {required: true, message: '请输入正确的产品名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, trigger: 'blur'}
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { max: 100, message: '产品副标题最多输入100个字符', trigger: 'blur' },
          // { min: 2, message: '产品副标题最少输入2个字符', trigger: 'blur' },
          // {required: true, message: '请输入正确的产品名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, trigger: 'blur'}
        ],
        fruit: [
          { required: true, type: 'array', min: 1, message: '请选择推广业务', trigger: 'change' }
        ],
        affairs: [
          { required: true, message: '请选择对接商务人员', trigger: 'blur' }
        ],
        operate: { required: true, message: '请选择对接运营人员', trigger: 'blur' },
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        accounttype: { required: true, message: '请选择账户状态', trigger: 'blur' },
        password: { required: true, message: '请输入登录密码', trigger: 'blur' }
      },
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '渠道编号',
          key: 'channelnum',
          align: 'center'
        },
        {
          title: '渠道类型',
          key: 'channeltype',
          align: 'center'
        },
        {
          title: '渠道名称',
          key: 'channelname',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'contacts',
          align: 'center'
        },
        {
          title: '推广业务',
          key: 'business',
          align: 'center'
        },
        {
          title: '对接商务',
          key: 'affairs',
          align: 'center'
        },
        {
          title: '对接运营',
          key: 'operate',
          align: 'center'
        },
        {
          title: '账号状态',
          key: 'accounttype',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'founder',
          align: 'center'
        },
        {
          title: '操作',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                   this.channelAdd ()
                  }
                }
              }, '编辑'),
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.$router.push({path: './applicationDetail'})
              //     }
              //   }
              // }, '渠道链接'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({path: './applicationDetail'})
                  }
                }
              }, '查看报表'),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data6: [
        {
          channelnum: 'S0002',
          channeltype: '企业',
          channelname: '渠道名称1',
          contacts: '王小明',
          business: '华赞金服、抢单侠',
          affairs: '陈定双',
          operate: '张静',
          accounttype: '正常',
          founder: '刘冬冬'
        },
        {
          channelnum: 'S0002',
          channeltype: '企业',
          channelname: '渠道名称1',
          contacts: '王小明',
          business: '华赞金服、抢单侠',
          affairs: '陈定双',
          operate: '张静',
          accounttype: '正常',
          founder: '刘冬冬'
        }
      ],
      data4: [
        {
          title: '使用卡类',
          expand: true,
          children: [
            {
              title: '娱乐',
              expand: true,
              disableCheckbox: false,              
              children: [
                {
                  title: 'KTV'
                },
                {
                  title: '电影院'
                }
              ]
            },
            {
              title: '运动',
              expand: true,
              children: [
                {
                  title: '篮球'
                },
                {
                  title: '足球'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    channelAdd () {
      this.modal9 = true
      // this.$router.push({path: './managementChannelAdd'})
    },
    choice () {
      this.modal10 = true
    },
    labelation () {
      this.$router.push({path: './managementLabel'})
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 保存
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {     
          this.$Message.error('Success!')
        }
      })
    },
    canlable () {
      console.log(this.$refs.tree.getCheckedNodes())
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
.label-xz{
        span:first-child{
            line-height: 32px;
            width: 80px;
            text-align: right
        }
        .channel-label{
            width: 300px;
            min-height: 32px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            margin-left: 5px
        }
    }
</style>
