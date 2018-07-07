 <template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道列表</span>
            </p>
        </div>
        <div class="mt50 clearfix">
            <div class="left ml20">
                <span>渠道名称:</span>
                <Input v-model="value" placeholder="请输入渠道名称" style="width: 200px"></Input>
                <span class="ml20">推送时间:</span>
            <DatePicker type="date" @on-change="time1" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" @on-change="time2" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            </div>
            <Button class="right mr20 w100 " type="info" @click="inquire">查询</Button>
        </div>
        <Button type="primary" shape="circle" icon="plus-round" class="ml20 mt20" @click="refuse">添加渠道</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-elevator show-sizer show-total></Page>
        </div>
        <Modal
          title="添加渠道"
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
              <FormItem label="渠道编码:" prop="productid" >
                <Input v-model="formCustom.productid" placeholder="请输入渠道名称" style="width: 300px"></Input>
              </FormItem>
            <FormItem label="渠道名称:" prop="name">
              <Input v-model="formCustom.name" placeholder="请输入渠道名称" style="width: 300px"></Input>
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
      columns7: [
        {
          title: '渠道编号',
          align: 'center',
          key: 'channelKey'
        },
        {
          title: '渠道名称',
          align: 'center',
          key: 'channelName'
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
                      this.delete (params.row.channelCode)
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
        productid: '00001',
        name: ''
      },
      ruleCustom: {
        name: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' },
          {required: true, message: '请输入正确的渠道名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, trigger: 'blur'},
          { max: 50, message: '渠道名称最多输入50个字符', trigger: 'blur' }
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
      this.endRow = page
      this.inquire()
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
          let list = {
            channelKey : this.formCustom.productid,
            channelName : this.formCustom.name
          }
          this.http.post(BASE_URL + '/loan/promotionChannel/savePromotionChannel', list)
          .then((resp) => {
            if (resp.code == 'success') {
              const title = '保存'
              let content = '<p>保存成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.inquire ()
            } else {

            }
          })
          .catch(() => {
          })
          // this.$Message.error('Success!')
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
    },
     // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    inquire () {
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let list = {
        channelName : this.value,
        beginTime : this.value1,
        endTime : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/promotionChannel/getPromotionChannelList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionChannelList
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
      this.http.post(BASE_URL + '/loan/promotionChannel/deletePromotionChannelByCode?promotionChannelCode='+code)
    .then((resp) => {
      if (resp.code == 'success') {
        const title = '删除'
        let content = '<p>删除成功</p>'
        this.$Modal.success({
          title: title,
          content: content
        })
        this.inquire ()
  
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
