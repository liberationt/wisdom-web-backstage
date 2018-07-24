 <template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道供应商管理</span>
            </p>
        </div>
        <div class="mt50 clearfix">
            <div class="left ml20">
              <ul class="querysty">
                <li>
                  <span>供应商名称:</span>
                  <Input v-model="value" placeholder="请输入标签名称" style="width: 200px"></Input>
                </li>
                <li>
                  <span class="ml20">创建时间:</span>
                  <DatePicker type="date" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" @on-change="time2" placeholder="结束时间" style="width: 200px"></DatePicker>
                </li>
                <li class="ml10">
                  <Button type="info" class="right mr20 w100" :loading="loading3" @click="inquire">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>       
            </div>
            <!-- <Button class="right mr20 w100 " type="info" @click="inquire">查询</Button> -->       
        </div>
        <Button type="primary" shape="circle" icon="plus-round" class="ml20 mt20" @click="refuse">添加供应商</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        <Modal
          title="添加供应商"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:15px">
              <FormItem label="供应商编码:" prop="productid" v-show='isshow'>
                <Input disabled v-model="formCustom.productid" placeholder="请输入类别名称" style="width: 300px"></Input>
              </FormItem>
            <FormItem label="供应商名称:" prop="name">
              <Input v-model="formCustom.name" placeholder="请输入供应商名称" style="width: 300px"></Input>
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
      model1: '',
      value: '',
      value1: '',
      value2: '',
      modal9: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      isshow: false,
      loading3: false,
      columns7: [
        {
          title: '供应商编号',
          align: 'center',
          key: 'supplierKey'
        },
        {
          title: '供应商名称',
          align: 'center',
          key: 'supplierName'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '编辑',
          key: 'address',
          width: 150,
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
                      this.delete (params.row.supplierCode)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data6: [],
      formCustom: {
        productid: '',
        name: ''
      },
      ruleCustom: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
         // {required: true, message: '请输入正确的供应商名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, trigger: 'blur'},
          { max: 25, message: '供应商名称最多输入25个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.inquire()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    refuse () {
      this.http.post(BASE_URL + '/loan/promotionSupplier/getSupplierKey').then(data=>{
        // console.log(data)
        if(data.code == 'success'){
          this.formCustom.productid = data.data
        }
      }).catch(err=>{
        console.log(err) 
      })
      this.modal9 = true
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          let list = {
            supplierKey : this.formCustom.productid,
            supplierName : this.formCustom.name
          }
          this.http.post(BASE_URL + '/loan/promotionSupplier/savePromotionSupplier', list)
          .then((resp) => {
            if (resp.code == 'success') {
              const title = '保存'
              let content = '<p>保存成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.modal9 = false
              this.inquire (1)
              this.$refs[name].resetFields()
            } else {
              this.$Message.info(resp.message)
              this.$refs[name].resetFields()
              this.modal9 = false
            }
          })
          .catch(() => {
          })
          // this.$Message.error('Success!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
     // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    inquire (num) {
      this.loading3 = true
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let list = {
        supplierName : this.value,
        beginTime : this.value1,
        endTime : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      if(num == 1){
        list.pageNum = 1
      }
      this.http.post(BASE_URL + '/loan/promotionSupplier/getPromotionSupplierList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionSupplierList
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)   
          this.loading3 = false          
        } else {
          this.loading3 = false  
        }
      })
      .catch(() => {
        this.loading3 = false
      })
    },
    // 删除
    delete (code) {
      let list = {
        supplierCode: code,
        dataFlag: 0
      }
      this.http.post(BASE_URL + '/loan/promotionSupplier/updatePromotionSupplierByCode', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认要删除吗?</p>',
          onOk: () => {
            this.inquire ()
          },
          onCancel: () => {
              
          }
        })
      } else {

      }
    })
    .catch(() => {
    })
    }
  },
  mounted () {
    this.inquire ()
  }
}
</script>
<style lang="less" scoped>
</style>
