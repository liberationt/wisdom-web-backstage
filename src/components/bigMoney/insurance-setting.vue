<template>
    <div>
        <div class="navigation">
            <p>
                <span>平安人寿</span>
            </p>
        </div>
        <div class="mt50">
            <span>推送主体:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>文件名称:</span>
            <Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 200px"></Input>
            <span>推送时间:</span>
            <DatePicker type="date" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <Button class="right w100" type="primary" @click="refuse">上传文件</Button>
                <Button class="right mr20 w100 " type="info">查询</Button>
            </div>
        </div>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
        </div>
        <Modal
          title="上传文件"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="handleReset"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 pl10">
           <ul>
            <li>
                <span>甲方名称:</span>
                <span>哈哈哈</span>
            </li>
            <li class="mt15">
                <span>主体名称:</span>
                <span>哈哈哈</span>
            </li>
            <li class="mt15 clearfix">
                <span class="left lh32">上传文件:</span>
            <Input v-model="value9" disabled style="width: 225px" class="left ml5"></Input>
            <Upload
            :before-upload="handleUpload"
            :show-upload-list="false"
            action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" icon="ios-cloud-upload-outline">预览</Button>
        </Upload>
            </li>
        </ul>
          </div>
          </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      value9: '',
      modal9: false,
      loading: true,
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
          title: '批次',
          align: 'center',
          key: 'batchCode'
        },
        {
          title: '文件名称',
          align: 'center',
          key: 'fileName'
        },
        {
          title: '推送主体',
          align: 'center',
          key: 'pushMain'
        },
        {
          title: '推送时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '推送条数',
          align: 'center',
          key: 'sendNum'
        },
        {
          title: '成功条数',
          align: 'center',
          key: 'succNum'
        },
        {
          title: '失败条数',
          align: 'center',
          key: 'failNum'
        },
        {
          title: '备注',
          align: 'center',
          key: 'remarks'
        },
        {
          title: '详情',
          key: 'address',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: './insuranceReport' })
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      data6: [
        {
          batch: '180601001',
          filename: '哈哈',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0',
          remarks: '哈哈'
        },
        {
          batch: '180601001',
          filename: '哈哈',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0',
          remarks: '哈哈'
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
    refuse () {
      this.modal9 = true
    },
    upload () {
      if (this.value9 == '') {
        this.changeLoading()
        const title = '上传报表'
        let content = '<p>请先上传文件</p>'
        this.$Modal.warning({
          title: title,
          content: content
        })
        return false
      } else {
        setTimeout(() => {
          this.changeLoading()
          const title = '上传名单'
          let content = '<p>上传成功</p>'
          this.$Modal.success({
            title: title,
            content: content
          })
          this.modal9 = false
          this.value9 = ''
        }, 1000)
      }
    },
    handleUpload (file) {
      this.value9 = file.name
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    }
  },
  created() {
    let list = {};
    this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then((resp)=>{
      console.log(resp.data.batchLogList)
      this.data6 = resp.data.batchLogList;
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>

</style>
