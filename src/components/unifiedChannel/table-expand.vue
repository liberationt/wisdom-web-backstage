<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Table class="childtab" border :columns="columns7" :data="data6"></Table>
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
    export default {
        props: {
            row: Object
        },
        data () {
         return {
            modal10:false,
            loading: true,
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
            columns7: [
                {
                title: "推广业务",
                key: "name",
                minWidth: 200,
                align: "center"
                },
                {
                title: "商务负责人",
                key: "age",
                minWidth: 200,
                align: "center"
                },
                {
                title: "操作",
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
                            this.addbusiness ()
                            }
                        }
                        },
                        "编辑业务"
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
                            
                            }
                        }
                        },
                        "渠道报表"
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
                            
                            }
                        }
                        },
                        "渠道管理"
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
                            
                            }
                        }
                        },
                        "删除业务"
                    )

                    ]);
                }
                }
            ],
            data6:[]
         }   
        },
        created () {
            this.data6.push(this.row)
        },
        methods: {
            addbusiness ()  {
                this.modal10 = true
            },
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
            changeLoading () {
            this.loading = false
            this.$nextTick(() => {
                this.loading = true
            })
            },
        }
    };
</script>