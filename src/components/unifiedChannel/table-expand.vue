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
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:100px">
              <FormItem label="推广业务:" prop="accounttype" >
                <Input  v-model="formCustom.accounttype" disabled style="width: 300px"></Input>
            </FormItem>
            <FormItem label="商务负责人:" prop="person" >
              <Select v-model="formCustom.person" placeholder="请选择商务对接" style="width:300px" >
                <Option v-for="item in managerSelect" :value="item.value">{{item.label}}</Option>       
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
            prombusiness:[],
            managerSelect:[],
            suppliersBusinessCode:'',
            formCustom: {
                name: '',
                phone: '',
                remarks: '',
                accounttype: '',
                person:''
            },
            ruleCustom: {
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
                person: { required: true, message: '请选择商务负责人', trigger: 'blur' }
            },
            columns7: [
                {
                title: "推广业务",
                key: "businessName",
                minWidth: 200,
                align: "center"
                },
                {
                title: "商务负责人",
                key: "managerUser",
                minWidth: 200,
                align: "center"
                },
                {
                title: "操作",
                minWidth: 150,
                align: "center",
                render: (h, params) => {
                    let list = []
                    if (this.$route.query.accnum == 1) {
                        list.push(
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
                            this.addbusiness (params.row.suppliersBusinessCode)
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
                                this.$router.push({ path: '/channelReport?role=admin' })                            
                            }
                        }
                        },
                        "渠道报表"
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
                                this.busdeleting (params.row.suppliersBusinessCode)                           
                            }
                        }
                        },
                        "删除业务"
                    )
                        )
                    } else if (this.$route.query.accnum == 2) {
                        list.push(
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
                                console.log(params.row)
                                this.$router.push({ path: '/channelManagementunid?suppliersCode='+ params.row.suppliersCode+'&suppliersBusinessCode='+params.row.suppliersBusinessCode})                            
                            }
                        }
                        },
                        "渠道管理"
                    )
                        )
                    } else if (this.$route.query.accnum == 3) {
                        list.push(
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
                                        this.$router.push({ path: '/channelReport?role=ordinary' })                                    
                                    }
                                }
                                },
                                "渠道报表"
                            )
                        )
                    }
                    return h("div", list);
                }
                }
            ],
            data6:[]
         }   
        },
        created () {
            this.childlist ()
            this.http.post(BASE_URL+"/promotion/suppliersBusiness/saveViewData", {suppliersCode:this.row}).then(data => {
                if(data.code == 'success'){
                this.prombusiness = data.data.businessSelect
                this.managerSelect = data.data.managerSelect
                }
            }).catch(err=>{
                console.log(err)
            })
            // this.data6.push(this.row)
        },
        methods: {
            addbusiness (code)  {
                this.modal10 = true
                this.businessReturn (code)
            },
            businessSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (!valid) {
                return this.changeLoading()
                } else {
                    this.busition ()
                }
            })
            },
            // 子表格数据
            childlist () {
                    let list = {
                        suppliersCode:this.row
                        }
                    this.http.post(BASE_URL+"/promotion/suppliersBusiness/queryListAll", list).then(data => {
                        if(data.code == 'success'){
                            this.data6 = data.data       
                        }
                    }).catch(err=>{
                        
                    })

            },
            // 编辑回显
            businessReturn (code) {
                this.suppliersBusinessCode = code
                this.http.post(BASE_URL+'/promotion/suppliersBusiness/getByCode?suppliersBusinessCode='+code).then(data => {
                if(data.code == 'success'){
                    this.formCustom.accounttype = data.data.businessName
                    this.formCustom.person = data.data.managerUserCode
                    this.formCustom.name = data.data.contactUser
                    this.formCustom.phone = data.data.contactPhone
                    this.formCustom.remarks = data.data.memo
                }
            }).catch(err=>{
                console.log(err)
            })
            },
            // 编辑保存
            busition () {
                let list = {
                    managerUserCode:this.formCustom.person,
                    contactUser:this.formCustom.name,
                    contactPhone:this.formCustom.phone,
                    suppliersBusinessCode:this.suppliersBusinessCode,
                    memo:this.formCustom.remarks
                }
                this.http.post(BASE_URL+'/promotion/suppliersBusiness/updateByCode',list).then(data => {
                if(data.code == 'success'){
                    const title = '提示'
                    let content = '<p>保存成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                            this.modal10 = false                 
                        }
                    })

                }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 删除业务
            busdeleting (code) {
                this.$Modal.confirm({
                title: '提示',
                content: '<p>确定要删除吗?</p>',
                onOk: () => {
                    this.http.post(BASE_URL+'/promotion/suppliersBusiness/deleteByCode?suppliersBusinessCode='+code).then(data => {
                    if(data.code == 'success'){
                    const title = '提示'
                    let content = '<p>删除成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content                        
                    })
                    this.childlist ()
                    }
                }).catch(err=>{
                    console.log(err)
                })
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