<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;渠道配置</span>
      </p>
    </div>
    <div class="clearfix">
      <Input class=" ml100" v-model="name" placeholder="请输入渠道名称或编号" style="width: 150px"></Input>
      <Button class=" " type="primary" icon="ios-search">查询</Button>
      <div class="ml100 mt15">
          <Button type="ghost" shape="circle" icon="plus-round" @click="channelAdd">添加渠道</Button>
          <Button class="ml10" type="ghost" shape="circle" icon="gear-b" @click="labelation">标签配置</Button>
      </div>
    </div>
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
          title: '序号',
          key: 'name',
          align: 'center'
        },
        {
          title: '提交时间',
          key: 'title',
          align: 'center'
        },
        {
          title: '内容',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '用户手机号',
          key: 'actualtime',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'platform',
          align: 'center'
        },
        {
          title: '状态',
          key: 'object',
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
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          object: '未查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          object: '未查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          object: '未查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
        },
        {
          name: '01',
          title: '2018-03-29 15:12:34',
          plantime: '小额短期贷，最高5000元，拿钱嗖嗖嗖！....',
          actualtime: '137****7766',
          platform: '李*',
          show: true,
          object: '已查看'
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
      this.$router.push({path: './managementChannelAdd'})
    },
    labelation () {
      this.$router.push({path: './managementLabel'})
    }
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
</style>
