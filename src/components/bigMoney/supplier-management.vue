 <template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道供应商管理</span>
            </p>
        </div>
        <div class="mt50 clearfix">
            <div class="left ml20">
                <span>供应商名称:</span>
                <Input v-model="value" placeholder="请输入标签名称" style="width: 200px"></Input>
                <span class="ml20">推送时间:</span>
            <DatePicker type="date" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            </div>
            <Button class="right mr20 w100 " type="info">查询</Button>
        </div>
        <Button type="primary" shape="circle" icon="plus-round" class="ml20 mt20" @click="refuse">添加供应商</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
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
              <FormItem label="供应商编码:" prop="productid" >
                <Input v-model="formCustom.productid" disabled placeholder="请输入类别名称" style="width: 300px"></Input>
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
      modal9: false,
      loading: true,
      columns7: [
        {
          title: '供应商编号',
          align: 'center',
          key: 'batch'
        },
        {
          title: '供应商名称',
          align: 'center',
          key: 'pattern'
        },
        {
          title: '更新时间',
          align: 'center',
          key: 'url'
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
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data6: [
        {
          batch: '180601001',
          pattern: '自动',
          url: '2018/06/11 12:00:00'
        },
        {
          batch: '180601001',
          pattern: '自动',
          url: '2018/06/11 12:00:00'
        }
      ],
      formCustom: {
        productid: '00001',
        name: ''
      },
      ruleCustom: {
        name: { required: true, message: '请输入供应商名称', trigger: 'blur' }
      }
    }
  },
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    remove (index) {
      this.data6.splice(index, 1)
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
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.$Message.error('Success!')
        }
        setTimeout(() => {
          this.changeLoading()
          this.modal9 = false
          // this.formCustom.name = ''
          this.$Message.success('done')
        }, 1000)
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
