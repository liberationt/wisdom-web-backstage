<template>
    <div>
        <div class="navigation">
            <p>
                <span>黑名单管理</span>
            </p>
        </div>
        <Tabs type="card" :animated="false">
        <TabPane label="黑名单列表">
             <div class="mt50">
            <span>手机号:</span>
            <Input v-model="model1" placeholder="请输入手机号" class="mr20" style="width: 200px"></Input>
            <span>创建时间:</span>
            <DatePicker type="date" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <Button class="right mr20 w100 " type="info">查询</Button>
            </div>
        </div>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
        </div>
        </TabPane>
        <TabPane label="黑名单管理">
            <Row>
                <Col span="10" offset="6">
                <div class="mt50">
                <ul>
                    <li class="clearfix">
                        <span class="left lh32">上传名单:</span>
                        <Input v-model="namelist" disabled style="width: 200px" class="left ml5"></Input>
                        <Upload
                        :before-upload="handleUpload"
                        :show-upload-list="false"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline" >预览</Button>
                        </Upload>
                    </li>
                    <li class="mt50">
                        <Button class="w100 ml50 pointener " id="upload"  @click="upload">上传</Button>
                        <Button class="w100 ml50">取消</Button>
                    </li>
                </ul>
            </div>
                </Col>
            </Row>
        </TabPane>
    </Tabs>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      namelist: null,
      columns7: [
        {
          title: 'NO',
          align: 'center',
          key: 'batch'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'pattern'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'time'
        },
        {
          title: '备注',
          align: 'center',
          key: 'pushnum'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'successnum'
        },
        {
          title: '编辑',
          key: 'address',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
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
              }, '删除')
            ])
          }
        }
      ],
      data6: [
        {
          batch: '180601001',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000'
        },
        {
          batch: '180601001',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000'
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
    handleUpload (file) {
      this.namelist = file.name
      document.getElementById('upload').classList.remove('pointener')
      document.getElementById('upload').classList.add('ivu-btn-info')
      return false
    },
    // instancesuc (res, file) {
    //   const title = '上传名单'
    //   let content = '<p>上传成功</p>'
    //   this.$Modal.success({
    //     title: title,
    //     content: content
    //   })
    // },
    // instanceerr (file) {
    //   const title = '上传名单'
    //   let content = '<p>上传失败</p>'
    //   this.$Modal.error({
    //     title: title,
    //     content: content
    //   })
    // },
    upload () {
      setTimeout(() => {
        this.file = null
        const title = '上传名单'
        let content = '<p>上传成功</p>'
        this.$Modal.success({
          title: title,
          content: content
        })
      }, 1500)
    }
  }
}
</script>
<style lang="less" scoped>
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
