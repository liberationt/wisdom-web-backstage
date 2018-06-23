<template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道推广管理</span>
            </p>
        </div>
        <div class="mt50 p20">
            <Select v-model="model1" style="width:100px" class="">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="value" placeholder="" style="width: 100px" class="mr20"></Input>
            <span>更新时间:</span>
            <DatePicker type="date" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            <Button class=" ml100 w100 " type="info">查询</Button>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <!-- <Button type="primary" class="mr20" shape="circle" icon="code-working" @click="labelcon">标签配置</Button>
                <Button type="primary" class="mr20" shape="circle" icon="android-options" @click="channel">渠道类别配置</Button> -->
                <Button type="primary" shape="circle" icon="plus-round" @click="refuse">新增渠道</Button>
            </div>
        </div>
        <div class="">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
        </div>
        <Modal
          title="渠道设置"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:150px">
              <FormItem label="渠道类别:" prop="types">
                <Select v-model="formCustom.types" placeholder="请选择" style="width:300px">
                  <Option v-for="item in optioncha" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="渠道编号:" prop="productid" >
                <Input v-model="formCustom.productid"  placeholder="请输入渠道编号" style="width: 300px"></Input>
              </FormItem>
            <FormItem label="渠道名称:" prop="name">
              <Input v-model="formCustom.name" placeholder="请输入渠道名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="渠道标签:" prop="ratetype" >
              <Select v-model="formCustom.ratetype" placeholder="请选择" style="width:300px" >
                <Option v-for="item in optionlab" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="推广URL:" prop="producturl" >
              <Input type="url" v-model="formCustom.producturl" disabled placeholder="请输入推广URL" style="width: 300px"></Input>
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
      formCustom: {
        productid: '',
        name: '',
        types: '',
        ratetype: '',
        producturl: 'www.baidu.com'
      },
      ruleCustom: {
        name: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' },
          { type: 'string', pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入正确的渠道名称', trigger: 'blur' }
        ],
        types: { required: true, message: '请选择渠道类别', trigger: 'blur' },
        ratetype: { required: true, message: '请选择渠道标签', trigger: 'blur' },
        productid: [
          { required: true, message: '请输入渠道编号', trigger: 'blur' },
          { type: 'string', pattern: /^[a-zA-Z0-9]+$/, message: '请输入正确的渠道标号', trigger: 'blur' }
        ]
      },
      optioncha: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ],
      optionlab: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ],
      cityList: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ],
      columns7: [
        {
          title: '渠道类别',
          align: 'center',
          key: 'batch'
        },
        {
          title: '渠道编号',
          align: 'center',
          key: 'pattern'
        },
        {
          title: '渠道名称',
          align: 'center',
          key: 'time'
        },
        {
          title: '供应商名称',
          align: 'center',
          key: 'suppliername'
        },
        {
          title: '渠道标签',
          align: 'center',
          key: 'pushnum'
        },
        {
          title: 'URL',
          align: 'center',
          key: 'successnum'
        },
        {
          title: '更新时间',
          align: 'center',
          key: 'errornum'
        },
        {
          title: '操作',
          key: 'address',
          width: 150,
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
                      this.refuse()
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
          time: '2018/06/01 12:00:20',
          suppliername: '啦啦',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0'
        },
        {
          batch: '180601001',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          suppliername: '啦啦',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0'
        }
      ]
    }
  },
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    rowClassName (row, index) {
      if (index === 0) {
        return 'demo-table-info-row'
      }
      return ''
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    labelcon () {
      this.$router.push({ path: './channelLabelsz' })
    },
    channel () {
      this.$router.push({ path: './channelCategory' })
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
      this.$refs[name].validate((valid) => {
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
