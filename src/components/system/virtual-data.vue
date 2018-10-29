<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;虚拟数据</span>
      </p>
    </div>
    <div class="contentcss">
    <div class="clearfix ">
      <Button type="primary" shape="circle" icon="ios-add" @click="adddepartment(1)">添加数据</Button>
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
        width:600
        :loading="loading">
    <div>
      <Form class="pl10" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name" style="width:300px" placeholder="如：张三"></Input>
        </FormItem>
        <FormItem label="身价" prop="social">
            <Input v-model="formValidate.social" style="width:300px" placeholder="如：100万"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
            <Input v-model="formValidate.age" style="width:300px" placeholder="如：20岁"></Input>
        </FormItem>
        <FormItem label="金额" prop="amount">
            <Input v-model="formValidate.amount" style="width:300px" placeholder="如：10000元"></Input>
        </FormItem>
        <FormItem label="期限" prop="term">
            <Input v-model="formValidate.term" style="width:300px" placeholder="如：10年"></Input>
        </FormItem>
        <FormItem label="是否本地户籍" prop="household">
            <Select v-model="formValidate.household" style="width:300px" placeholder="请选择">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
            </Select>
        </FormItem>
        <FormItem label="月收入" prop="earning">
            <Input v-model="formValidate.earning" style="width:300px" placeholder="如：3500元"></Input>
        </FormItem>
        <FormItem label="附加条件信息" prop="conditions">
          <Input v-model="formValidate.conditions" type="textarea" style="width:300px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入附加条件信息" />
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
      credittitle:"添加虚拟数据",
      total: 0,
      startRow: 1,
      endRow: 10,
      code:'',
      userModelCode:'',
      formValidate: {
        name: '',
        social: '',
        age:'',
        amount: '',
        term: '',
        household: '',
        earning:'',
        conditions:''
      },
      userrole:[],
      interest:[],
      ruleValidate: {
        name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {required: true, message: '用户名最多输入四个字符', pattern: /^[\u4e00-\u9fa5]{1,4}$/, trigger: 'blur'}
        ],
        social: [
        { required: true, message: '请输入身价', trigger: 'blur' },
        {required: true, message: '身价最多输入4位数字', pattern: /^(0|[1-9][0-9]{0,2})$/, trigger: 'blur'}
        ],
        age: [
        { required: true,  message: '请输入年龄', trigger: 'blur' },
        {required: true, message: '年龄最多输入2位数字', pattern: /^(0|[1-9][0-9]{0,1})$/, trigger: 'blur'}
        ],
        amount: [
        { required: true,  message: '请输入金额', trigger: 'blur' },
        {required: true, message: '金额最多输入7位数字', pattern: /^(0|[1-9][0-9]{0,6})$/, trigger: 'blur'}
        ],
        term: [
        { required: true,  message: '请输入期限', trigger: 'blur' },
        {required: true, message: '期限最多输入10个字符', pattern: /^[\u4e00-\u9fa5_0-9_]{1,10}$/, trigger: 'blur'}
        ], 
        household: [
            { required: true, message: '请选择是否本地户籍', trigger: 'blur' }
        ],
        earning: [
        { required: true,  message: '请输入月收入', trigger: 'blur' },
        {required: true, message: '月收入最多输入10个字符', pattern: /^[\u4e00-\u9fa5_0-9_]{1,10}$/, trigger: 'blur'}
        ],
        conditions: [
        { required: true,  message: '请输入附加条件信息', trigger: 'blur' },
        {required: true, message: '附加条件信息最多输入200个字符', pattern: /^[\u4e00-\u9fa5_0-9_]{1,20}$/, trigger: 'blur'}
        ],
      },
      columns7: [
        {
          title: '用户名',
          key: 'name',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '身价',
          key: 'social',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '年龄',
          key: 'age',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '金额',
          key: 'amount',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '期限',
          key: 'term',
          minWidth: 160,
          align: 'center'          
        },
        {
          title: '是否本地户籍',
          key: 'household',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '月收入',
          key: 'earning',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '附加条件信息',
          key: 'conditions',
          minWidth: 120,
          align: 'center'
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
                      this.editecho (params.row.userModelCode)
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
                      this.deleteout (params.row.userModelCode)                     
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
            this.credittitle = '添加虚拟数据'
        } else {
            this.credittitle = '编辑虚拟数据'
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
    // 新增/编辑
    addpersonnel () {      
        let list
        if (this.credittitle == '添加虚拟数据') {
            list = {
                name : this.formValidate.name,
                social : this.formValidate.social,
                age :this.formValidate.age,
                amount :this.formValidate.amount,
                term :this.formValidate.term,
                household :this.formValidate.household,
                earning :this.formValidate.earning,
                conditions :this.formValidate.conditions
            }
        } else {
            list = {
                name : this.formValidate.name,
                social : this.formValidate.social,
                age :this.formValidate.age,
                amount :this.formValidate.amount,
                term :this.formValidate.term,
                household :this.formValidate.household,
                earning :this.formValidate.earning,
                conditions :this.formValidate.conditions,
                userModelCode:this.userModelCode
            }
        }       
        this.http.post(BASE_URL + '/loan/loanUserModel/saveOrUpdateLoanUserModel', list)
        .then((resp) => {
        if (resp.code == 'success') {
            const title = '提示';
            let content
            if (this.credittitle == '添加虚拟数据') {
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
            data:code
        }
        this.http.post(BASE_URL + '/loan/loanUserModel/getLoanUserModelByCode',list)
        .then((resp) => {
        if (resp.code == 'success') {
            this.formValidate.name = resp.data.name
            this.formValidate.social = resp.data.social
            this.formValidate.age = resp.data.age
            this.formValidate.amount = resp.data.amount
            this.formValidate.term = resp.data.term
            this.formValidate.household = resp.data.household
            this.formValidate.earning = resp.data.earning
            this.formValidate.conditions = resp.data.conditions
            this.userModelCode = resp.data.userModelCode

        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch(() => {
        
        })
    },
    // 删除
    deleteout (code) {
      let list = {
        data:code
      }
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          this.http.post(BASE_URL + '/loan/loanUserModel/deleteLoanUserModelByCode',list)
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
    this.http.post(BASE_URL + '/loan/loanUserModel/getLoanUserModelList', list)
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
