<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;账号管理</span>
      </p>
    </div>
    <div class="contentcss">
    <div class="clearfix ">
      <Button type="primary" shape="circle" icon="ios-add" @click="adddepartment(1)">添加人员</Button>
    </div>
    <div id="application_table">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div> 
    </div>
    <Modal
        v-model="modal2"
        :title=credittitle
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        :loading="loading">
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户ID" prop="name" v-if="cide">
            <Input v-model="formValidate.name" disabled></Input>
        </FormItem>
        <FormItem label="用户名" prop="user">
            <Input v-model="formValidate.user" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="真实姓名" prop="real">
            <Input v-model="formValidate.real" placeholder="请输入真实姓名"></Input>
        </FormItem>
        <FormItem label="角色" prop="interest">
            <CheckboxGroup v-model="interest" @on-change="limitChange">
                <Checkbox  v-for="item in userrole" :label="item.roleCode">{{item.roleName}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="账户状态" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择">
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
            </Select>
        </FormItem>
        <FormItem label="重置密码" v-if="cide">
            <Button type="primary" @click="resetpasserd">自动重置密码</Button>
        </FormItem>
    </Form>
    </div>       
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      modal2:false,
      cide:false,
      credittitle:"添加部门人员",
      total: 0,
      startRow: 1,
      endRow: 10,
      code:'',
      formValidate: {
        name: '',
        user: '',
        real: '',
        interest: [],
        phone: '',
        city: ''
      },
      userrole:[],
      interest:[],
      ruleValidate: {
        user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { type: 'string', max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        real: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        {required: true, message: '真实姓名请输入中文', pattern: /^[\u4e00-\u9fa5]*$/, trigger: 'blur'},
        { type: 'string', max: 4, message: '真实姓名最多输入4个字符', trigger: 'blur' }
        ],
        interest: [
        { required: true, type: 'array', min: 1, message: '最少选择一种角色', trigger: 'change' }
        ],
        phone: [
        { required: true,  message: '请输入手机号', trigger: 'blur' },
        {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        ],
        city: [
            { required: true, message: '请选择用户状态', trigger: 'blur' }
        ],
      },
      columns7: [
        {
          title: '用户ID',
          key: 'userCode',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'realName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'departmentName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '角色',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            let listimg = []
            for (let i = 0; i < params.row.listRoleName.length; i++) {
              listimg.push(
                h('span', {                 
                  style: {               
                    marginRight: '5px'
                  }
                }, params.row.listRoleName[i])
              )
            }
            return h('div', listimg)
          }
        },
        {
          title: '账户状态',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
          let userState
            if (params.row.userState == 0) {
              userState = '停用'
            } else if (params.row.userState == 1) {
              userState = '启用'
            } 
            return h('div', [
              h('span', {}, userState)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.adddepartment (2)
                      this.editecho (params.row.userCode)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteout (params.row.userCode)                     
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data6: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        // console.log(page)
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
      // console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleSubmit2 (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.changeLoading()
          this.addpersonnel()          
        }
      })
    },
    handleReset2 (name) {
      this.$refs[name].resetFields()
      this.interest = []
      this.formValidate.interest = []
    },
    adddepartment (num) {     
      this.modal2 = true
        if (num == 1) {
            this.credittitle = '添加部门人员'
            this.cide = false
        } else {
            this.credittitle = '编辑部门人员'
            this.cide = true
        }      
    },
    // 角色选中
    limitChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {          
            list.push(data[i])
        }
        this.formValidate.interest = list
    },
    // 重置密码
    resetpasserd () {
        // this.formValidate.name
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要重置密码吗?</p>',
            onOk: () => {
                let list = {
                    userCode:this.formValidate.name
                }
                this.http.post(BASE_URL + '/user/resetPassword',list)
                .then((resp) => {
                if (resp.code == 'success') {
                    const title = '提示';
                    const content = '<p>重置成功</p>';
                    this.$Modal.success({
                        title: title,
                        content: content
                    })
                } else {
                    this.$Message.error(resp.message);
                }
                })
                .catch(() => {
                
                })               
            }
        });

    },
    // 新增/编辑
    addpersonnel () {      
        let list
        let url
        if (this.credittitle == '添加部门人员') {
            list = {
                userName: this.formValidate.user,
                realName: this.formValidate.real,
                listRoleCode:this.formValidate.interest,
                userPhone:this.formValidate.phone,
                userState:this.formValidate.city,
            }
            url = '/user/saveUserByDepartment'
        } else {
            list = {
                userName: this.formValidate.user,
                realName: this.formValidate.real,
                listRoleCode:this.formValidate.interest,
                userPhone:this.formValidate.phone,
                userState:this.formValidate.city,
                userCode:this.formValidate.name,
            }
            url = '/user/updateUserByDepartment'
        }       
        this.http.post(BASE_URL + url, list)
        .then((resp) => {
        if (resp.code == 'success') {
            const title = '提示';
            let content
            if (this.credittitle == '添加部门人员') {
                content = '<p>添加成功</p>'
            } else {
                content = '<p>修改成功</p>'
            }
            this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.modal2 = false
                  this.inquire ()
                  this.interest = []
                  this.formValidate.interest = []
                }
            })
          this.$refs['formValidate'].resetFields()  
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        
        })
    },
    // 编辑回显
    editecho (code) {
        let list = {
            userCode:code
        }
        this.http.post(BASE_URL + '/user/queryUserInfo',list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.formValidate.name = resp.data.userCode
            this.formValidate.user = resp.data.userName
            this.formValidate.real = resp.data.realName
            this.interest = resp.data.listRoleCode
            this.formValidate.interest = resp.data.listRoleCode
            this.formValidate.phone = resp.data.userPhone
            this.formValidate.city = resp.data.userState+''
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        
        })
    },
    // 删除
    deleteout (code) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          this.http.post(BASE_URL + '/user/deleteUserByCode?userCode='+code)
          .then((resp) => {
            if (resp.code == 'success') {
              this.startRow = 1
              this.inquire ()
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch(() => {
            
          })                 
        }
    })      
    },
    // 列表查询
    inquire () {           
    let list = {
      pageNum: this.startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/user/queryUserPageList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
      } else {
        this.$Message.error(resp.message);
      }
    })
    .catch(() => {
      
    })
    }
  },
  mounted () {
    this.inquire ()
    this.http.post(BASE_URL + '/role/queryRoleListBydpCode', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.userrole = resp.data
      } else {
        
      }
    })
    .catch(() => {
      
    })
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
