<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;渠道配置</span>
      </p>
    </div>
        <Button type="ghost" shape="circle" icon="plus-round" @click="channelAdd">添加标签</Button>
    <div id="application_table">
      <Table border :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
      <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '标签编号',
          key: 'name',
          align: 'center'
        },
        {
          title: '标签名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '标签级别',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                    this.$router.push({path: './applicationDetail'})
                  }
                }
              }, '查看'),
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
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        },
        {
          name: 'A01_1',
          title: '└KTV',
          plantime: '3级'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    channelAdd () {
      this.$router.push({path: './managementLabelAdd'})
    }
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
</style>
