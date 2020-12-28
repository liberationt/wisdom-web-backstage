 <template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道链接设置</span>
            </p>
        </div>
        <div class="conditioncss clearfix">
            <div class="left ml20">
                <span>链接名称:</span>
                <Input v-model="value" placeholder="请输入类别名称" style="width: 150px"></Input>
            </div>
            <!-- <Button class=" ml50 w100 " type="info" @click="inquire">查询</Button> -->
            <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquire(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            <Button type="primary" shape="circle" icon="plus-round" class="right mr20 " @click="refuse">添加渠道链接</Button>
        </div>
        
        <div class="mt10 contentcss">
            <Table border highlight-row :columns="columns7" :data="data6"></Table>
            <div class="tr mt15">
              <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </div>
        
        <Modal
          title="添加渠道链接"
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
              <FormItem label="链接名称:" prop="productid" >
                <Input v-model="formCustom.productid" placeholder="请输入链接名称" style="width: 300px"></Input>
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
      loading3: false,
      model1: '',
      value: '',
      modal9: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
          title: '链接编号',
          align: 'center',
          key: 'urlCode'
        },
        {
          title: '链接名称',
          align: 'center',
          key: 'urlName'
        },
        {
          title: 'URL',
          align: 'center',
          render: (h, params) => {
						return h('div', [
						h('span', {
							style: {
							display: 'inline-block',
							width: '100%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
							},
							domProps: {
							title: params.row.urlUrl
							}
						}, params.row.urlUrl)
						])
						}
        },
        {
          title: '编辑',
          key: 'address',
          width: 150,
          align: 'center',
          fixed: "right",
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
      this.inquire(this.startRow)
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.inquire(this.startRow)
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
            if (resp.code == 'success') {
              const title = '保存'
              let content = '<p>保存成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.inquire (1)
              this.$refs['formCustom'].resetFields()
            } else {
              this.$Message.info(resp.message)
              this.$refs[name].resetFields()
            }
          })
          .catch(() => {
          })
        }
          this.changeLoading()
          this.modal9 = false
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 查询
    inquire (num) {
      this.loading3 = true
      let list = {
        urlName : this.value,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      if(num == 1){
        list.pageNum = 1
      }
      this.http.post(BASE_URL + '/loan/promotionUrl/getPromotionUrlList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionUrlList
          this.total = Number(resp.data.total)
          this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow); 
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
            this.inquire (1)
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
    this.inquire (1)
  }
}
</script>
<style lang="less" scoped>
</style>
