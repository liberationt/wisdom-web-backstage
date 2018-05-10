<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理</span>
      </p>
    </div>
    <div class="clearfix">
      <div class="left">
      <Select v-model="model1" placeholder="姓名" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
      <Select v-model="model2" placeholder="全部状态" style="width:200px;margin-left:50px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </div>
      <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
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
      cityList: [
        {
          value: '姓名',
          label: '姓名'
        },
        {
          value: '手机号',
          label: '手机号'
        }
      ],
      cityType: [
        {
          value: '已查看',
          label: '已查看'
        },
        {
          value: '未查看',
          label: '未查看'
        }
      ],
      model1: '',
      model2: '',
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
    }
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
</style>
