<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;坐席管理</span>
      </p>
    </div>
    <div class="contentcss">
    <div class="clearfix ">
      <Button type="primary" shape="circle" icon="plus-round" @click="adddepartment(1)">添加坐席</Button>
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
        <FormItem label="用户名" prop="userCode">
            <Select v-model="formValidate.userCode" @on-change='chooseCode' :disabled='choose' placeholder="请选择">
                <Option v-for="item in userList" :value="item.userCode" :key="item.userCode">{{ item.userName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="真实姓名" prop="realname">
            <Input v-model="formValidate.realname" :disabled='disableds' placeholder="请输入真实姓名"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" :disabled='disableds' placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="坐席编号" prop="seatNo">
            <Input v-model="formValidate.seatNo" placeholder="请输入坐席编号"></Input>
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
      choose:false,
      disableds:true,
      loading: true,
      modal2:false,
      userList:[],
      seatCode:'',
      userCode:'',
      credittitle:"添加部门人员",
      total: 0,
      startRow: 1,
      endRow: 10,
      code:'',
      departmentCode:'',
      formValidate: {
        userCode: '',
        realname: '',
        phone: '',
        seatNo:''
      },
      userrole:[],
      interest:[],
      ruleValidate: {
        userCode: [
        { required: true, message: '请输入用户名', trigger: 'blur' }, 
        ],
        realname: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        seatNo:[
        {required: true, message: '请输入坐席编号', trigger: 'blur' },
        { type: 'string', message: '坐席编号不能含有中文', pattern: /^[\x01-\x7f]*$/, trigger: 'blur'},
        ],
        phone: [
        { required: true,  message: '请输入手机号', trigger: 'blur' },
        {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        ],
      },
      columns7: [
        {
          title: '用户名',
          key: 'seatLoginUserName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '坐席编号',
          key: 'seatNo',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'seatName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'seatPhone',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                      this.deleteout (params.row.seatCode)                     
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
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
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
            this.choose = false;
            this.credittitle = '添加部门人员'
        } else {
            this.credittitle = '编辑部门人员'
            this.choose = true
        }      
    },
    //下拉框
    chooseCode(v){
      this.userList.map((n,i)=>{
        if(v == n.userCode){
          this.formValidate.realname = n.realName
          this.formValidate.phone = n.userPhone
          this.formValidate.userCode = v
          this.userCode = n.userName
        }
      })
    },
    // 新增/编辑
    addpersonnel () {      
        let list
        let url
        list = {
            userCode:this.formValidate.userCode,
            realName:this.formValidate.realname,
            seatNo:this.formValidate.seatNo,
            userName:this.userCode,
            userPhone:this.formValidate.phone
        }
        url = '/sale/saleSeat/saveSaleSeatInfo'
        this.http.post(BASE_URL + url, list)
        .then((resp) => {
        if (resp.code == 'success') {
            const title = '提示';
            let content = '<p>添加成功</p>'
            this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.modal2 = false
                  this.inquire ()
                }
            })
          this.$refs['formValidate'].resetFields()  
        } else {
            this.$Message.error(resp.message);
        }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除
    deleteout (seatcode) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          let list = {
            seatCode:seatcode,
          }
          this.http.post(BASE_URL + '/sale/saleSeat/deleteSaleSeat',list)
          .then((resp) => {
            if (resp.code == 'success') {
              this.startRow = 1
              this.inquire ()
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch((err) => {
            console.log(err)
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
    this.http.post(BASE_URL + '/sale/saleSeat/queryPageList',list)
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
    this.inquire()
    this.http.post(BASE_URL + '/sale/saleSeat/queryUserListByDepartmentcode', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.userList = resp.data
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
