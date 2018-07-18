 <template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道类别设置</span>
            </p>
        </div>
        <div class="mt50 clearfix">
            <div class="left ml20">
                <span>类别名称:</span>
                <Input v-model="value" placeholder="请输入类别名称" style="width: 200px"></Input>
            </div>
            <Button class="right mr20 w100 " type="info" @click="inquire">查询</Button>
        </div>
        <Button type="primary" shape="circle" icon="plus-round" class="ml20 mt20" @click="refuse">添加渠道类别</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-elevator show-sizer show-total></Page>
        </div>
        <Modal
          title="贷款产品设置"
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
              <FormItem label="类别名称:" prop="productid" >
                <Input v-model="formCustom.productid" placeholder="请输入类别名称" style="width: 300px"></Input>
              </FormItem>
            <FormItem label="URL:" prop="name">
              <Input v-model="formCustom.name" placeholder="请输入URL" style="width: 300px"></Input>
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
      modal9: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
          title: '类别编号',
          align: 'center',
          key: 'urlCode'
        },
        {
          title: '类别名称',
          align: 'center',
          key: 'urlName'
        },
        {
          title: 'URL',
          align: 'center',
          key: 'urlUrl'
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
                      this.delete(params.row.urlCode)
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
        productid: [{required: true,message: '请输入类别名称',trigger: 'blur'},
        { max: 50, message: '输入内容超限，请重新输入', trigger: 'blur' }],
        name: { required: true, message: '请输入URL', trigger: 'blur' }
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
      this.endRow = page
      this.inquire()
    },
    refuse () {
      this.modal9 = true
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 新增
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          let list = {
            urlName : this.formCustom.productid,
            urlUrl : this.formCustom.name
          }
          this.http.post(BASE_URL + '/loan/promotionUrl/savePromotionUrl', list)
          .then((resp) => {
            console.log(resp);
            if (resp.code == 'success') {
              const title = '保存'
              let content = '<p>保存成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.inquire ()
              this.$refs['formCustom'].resetFields()
            } else {

            }
          })
          .catch(() => {
          })
        }
        setTimeout(() => {
          this.changeLoading()
          this.modal9 = false
          // this.formCustom.name = ''
          // this.$Message.success('done')
        }, 1000)
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 查询
    inquire () {
      let list = {
        urlName : this.value,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/promotionUrl/getPromotionUrlList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionUrlList
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)   
        } else {

        }
      })
      .catch(() => {
      })
    },
    // 删除
    delete (code) {
      let list = {
        urlCode: code,
        dataFlag: 0
      }
      this.http.post(BASE_URL + '/loan/promotionUrl/updatePromotionUrlByCode', list)
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
