<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false">
        <TabPane :label="label" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="已审核评价">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
export default {
  data () {
    return {
      label: h => {
        return h('div', [
          h('span', '待审核评价'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
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
          value: '上海',
          label: '上海'
        },
        {
          value: '北京',
          label: '北京'
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
          title: '评价时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'title',
          align: 'center'
        },
        {
          title: '订单时间',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '区域',
          key: 'actualtime',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'platform',
          align: 'center'
        },
        {
          title: '手机',
          key: 'object',
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'service',
          align: 'center'
        },
        {
          title: '评价打分',
          key: 'score',
          align: 'center'
        },
        {
          title: '评价内容',
          key: 'evaluatecon',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                      this.$router.push({ path: './evaluationReview' })
                    }
                  }
                },
                '审核'
              )
            ])
          }
        }
      ],
      data6: [
        {
          name: '2018-03-29 15:12:34',
          title: 'XD2018091099',
          plantime: '2018-03-29 15:12:34',
          actualtime: '上海',
          platform: '李*',
          object: '135****7766',
          service: '200元',
          score: '',
          evaluatecon: '非常好非常专业的服务....'
        }
      ],
      columns8: [
        {
          title: '审核时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '审核人员',
          key: 'title',
          align: 'center'
        },
        {
          title: '评价时间',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'actualtime',
          align: 'center'
        },
        {
          title: '订单时间',
          key: 'platform',
          align: 'center'
        },
        {
          title: '区域',
          key: 'object',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'service',
          align: 'center'
        },
        {
          title: '手机',
          key: 'score',
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'evaluatecon',
          align: 'center'
        },
        {
          title: '评价分数',
          key: 'evnumber',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                      this.$router.push({ path: './evaluationDetails' })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data7: [
        {
          name: '2018-03-29 15:12:34',
          title: 'XD2018091099',
          plantime: '2018-03-29 15:12:34',
          actualtime: '上海',
          platform: '李*',
          object: '135****7766',
          service: '200元',
          score: '',
          evaluatecon: '非常好非常专业的服务....',
          evnumber: ''
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
</style>
