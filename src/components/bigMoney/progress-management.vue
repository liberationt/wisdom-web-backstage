<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;大网钱&nbsp;>&nbsp;供应商类别进度管理</span>
      </p>
    </div>
    <div class="contentcss">
      <div class="clearfix conditioncss">
        <div class="left">
          <ul class="querysty">
          <li>
            <span>主体名称:</span>
            <Select v-model="suerySubject" @on-change='subjectchange' style="width:150px">
              <Option value="">请选择</Option>
              <Option v-for="item in userList.mainList" :value="item.bodyName" :key="item.bodyName">{{ item.body }}</Option>
            </Select>
          </li>
          <li class="ml20">
            <span>供应商类别:</span>
            <Select v-model="classConditions" style="width:150px">
              <Option v-for="item in classConditionslist" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </li>         
          <li class="clearfix">
            <Button type="info" class=" ml50 left w100" :loading="loading3" @click="inquire(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            <Button class="ml20" type="primary" shape="circle" icon="plus-round" @click="adddepartment">添加</Button>
          </li>
        </ul>   
        </div>
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
        title='添加'
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        :loading="loading">
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="年份/月份"  prop="month">
            <DatePicker v-model="formValidate.month" @on-change='time2' type="month" placeholder="年份/月份" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="主体名称" prop="subjectname">
            <Select v-model.number="formValidate.subjectname" @on-change='chooseCode' placeholder="请选择">
                <Option v-for="item in userList.mainList" :value="item.bodyName" :key="item.bodyName">{{ item.body }}</Option>
            </Select>
        </FormItem>
        <FormItem label="供应商类别" prop="category">
            <Select v-model="formValidate.category"  placeholder="请选择">
                <Option v-for="item in supplierlist" :value="item" :key="item">{{ item }}</Option>
            </Select>
        </FormItem>
        <FormItem label="进度常量" prop="constant">
            <Input v-model="formValidate.constant" placeholder="请输入进度常量"></Input>
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
      userList:{},
      supplierlist:[],
      classConditionslist:[],
      userCode:'',
      classConditions:'',
      total: 0,
      startRow: 1,
      endRow: 10,
      suerySubject:'',
      formValidate: {
        month: '',
        subjectname: null,
        category: '',
        constant: ''
      },
      ruleValidate: {
        month: [
        { required: true, type:'', message: '请选择月份', trigger: 'change' },
        ],
        subjectname:[
            {required: true, type:'number', message: '请选择主体名称', trigger: 'change' },
        // { type: 'string', message: '坐席编号不能含有中文', pattern: /^[\x01-\x7f]*$/, trigger: 'blur'},
        ],
        category: [
            { required: true,  message: '请选择供应商类别', trigger: 'change' }
        ],
        constant: [
            { required: true,  message: '请输入进度常量', trigger: 'blur' },
            { type: 'string', max: 7, message: '最多输入七位', trigger: 'change' },
            { type: 'string', message: '请输入正整数', pattern: /^[1-9]\d*$/, trigger: 'blur'},
        ],
      },
      columns7: [
        {
          title: '年份/月份',
          key: 'limitTime',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '主体名称',
          key: 'seatNo',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            let bodyName
            if (params.row.bodyName == 1) {
              bodyName = '络慧'
            } else if (params.row.bodyName == 2) {
              bodyName = '坤玄'
            }
            return h('div', [
              h('span', {}, bodyName)
            ])
          }
        },
        {
          title: '供应商类别',
          key: 'supplierType',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '进度常量',
          key: 'schedule',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '数据创建时间',
          key: 'dataCreateTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '数据修改时间',
          key: 'dataModifiedTime',
          minWidth: 160,
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
                      this.deleteout (params.row.supplierFinalCode)                     
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
    time2 (value, data) {
      this.formValidate.month = value
    },
    // 分页
    pageChange(page) {
        this.startRow = page
        this.inquire(this.startRow)
	},
    pagesizechange(page) {
      this.startRow = 1
      this.endRow = page
      this.inquire(this.startRow)
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
    },
    adddepartment () {     
      this.modal2 = true     
    },
    //下拉框
    chooseCode(v){
        this.formValidate.subjectname = v
      if (v==1) {
         this.supplierlist = this.userList.lhList
      } else {
          this.supplierlist = this.userList.kxList
      }
    },
    //主体名称下拉框
    subjectchange(v){
        this.suerySubject = v
      if (v==1) {
         this.classConditionslist = this.userList.lhList
      } else if (v==2) {
          this.classConditionslist = this.userList.kxList
      } else {
        this.classConditionslist = []
      }
    },
    // 新增/编辑
    addpersonnel () {      
        let list
        let url
        list = {
            limitTime:this.formValidate.month,
            bodyName:this.formValidate.subjectname,
            supplierType:this.formValidate.category,
            schedule:this.formValidate.constant
        }
        url = '/netmoney/supplierFinal/save'
        this.http.post(BASE_URL + url, list)
        .then((resp) => {
        if (resp.code == 'success') {
            const title = '提示';
            let content = '<p>'+resp.message+'</p>'
            this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.modal2 = false
                  this.inquire (1)
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
    deleteout (supplierFinalCode) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          let list = {
            supplierFinalCode:supplierFinalCode,
          }
          this.http.post(BASE_URL + '/netmoney/supplierFinal/deleteByCode',list)
          .then((resp) => {
            if (resp.code == 'success') {
              this.startRow = 1
              this.inquire (1)
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
    inquire (startRow) { 
    let list = {
      bodyName:this.suerySubject,
      supplierType:this.classConditions,
      pageNum: startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/netmoney/supplierFinal/queryList',list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
        this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
      } else {
        this.$Message.error(resp.message);
      }
    })
    .catch(() => {
      
    })
    }
  },
  mounted () {
    this.inquire(1)
    this.http.post(BASE_URL + '/netmoney/supplierFinal/queryDownList', {})
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
