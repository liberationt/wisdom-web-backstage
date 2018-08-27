<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;账号管理</span>
      </p>
    </div>
    <div class="clearfix">
      <div class="left">    
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>
      <Button type="primary" shape="circle" icon="ios-add" @click="adddepartment(1)">添加人员</Button>
      <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
    </div>
    <div id="application_table">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    <Modal
        v-model="modal2"
        :title=credittitle
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户ID" v-if="cide">
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
                <Checkbox class="mr" v-for="item in userrole" :label="item.roleCode">{{item.roleName}}</Checkbox>
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
        { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        real: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        interest: [
        { required: true, type: 'array', min: 1, message: '最少选择一种角色', trigger: 'change' }
        ],
        phone: [
        { required: true,  message: '请输入手机号', trigger: 'blur' }
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

                      this.$router.push({ path: './memberDetail?loanUserCode='+params.row.loanUserCode })
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
          this.addpersonnel()
          this.$refs[name].resetFields()
        }
      })
    },
    handleReset2 (name) {
      this.$refs[name].resetFields()
    },
    adddepartment (num) {
        if (num == 1) {
            this.credittitle = '添加部门人员'
            this.cide = false
        } else {
            this.credittitle = '编辑部门人员'
            this.cide = true
        }
        this.modal2 = true
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

    },
    // 新增/编辑
    addpersonnel () {
        let list = {
            userName: this.formValidate.user,
            realName: this.formValidate.real,
            listRoleCode:this.formValidate.interest,
            userPhone:this.formValidate.phone,
            userState:this.formValidate.city,
        }
        this.http.post(BASE_URL + '/user/saveUserByDepartment', list)
        .then((resp) => {
        if (resp.code == 'success') {
            const title = '提示';
            const content = '<p>添加成功</p>';
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
    },
    // 编辑回显
    editecho (code) {
        this.http.post(BASE_URL + '/user/queryUserInfo?userCode='+code)
        .then((resp) => {
        if (resp.code == 'success') {
            
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        
        })
    },
    // 列表查询
    inquire (num) {           
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
  margin-top: 20px;
}
</style>
