<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;会员管理</span>
      </p>
    </div>
    <div class="clearfix">
      <div class="left">
      <Select v-model="model1" placeholder="姓名" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
      <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model3" placeholder="实名状态" style="width:150px;margin-left:20px">
        <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model4" placeholder="账户状态" style="width:150px;margin-left:20px">
        <Option v-for="item in account" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model5" placeholder="注册时间排序" style="width:150px;margin-left:20px">
        <Option v-for="item in registerTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
          value: '官方APP',
          label: '官方APP'
        },
        {
          value: 'H5官网',
          label: 'H5官网'
        },
        {
          value: '官方微信',
          label: '官方微信'
        },
        {
          value: '渠道1',
          label: '渠道1'
        },
        {
          value: '渠道2',
          label: '渠道2'
        }
      ],
      reaName: [
        {
          value: '未实名',
          label: '未实名'
        },
        {
          value: '已实名',
          label: '已实名'
        }
      ],
      account: [
        {
          value: '正常',
          label: '正常'
        },
        {
          value: '冻结',
          label: '冻结'
        }
      ],
      registerTime: [
        {
          value: '登陆时间排序',
          label: '登陆时间排序'
        },
        {
          value: '金币数量排序',
          label: '金币数量排序'
        },
        {
          value: '余额大小排序',
          label: '余额大小排序'
        }
      ],
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      model5: '',
      name: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '手机号',
          key: 'name',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'title',
          align: 'center'
        },
        {
          title: '是否实名',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '余额',
          key: 'actualtime',
          align: 'center'
        },
        {
          title: '注册渠道',
          key: 'platform',
          align: 'center'
        },
        {
          title: '账户状态',
          key: 'object',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registertime',
          align: 'center'
        },
        {
          title: '最后登陆时间',
          key: 'listtime',
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
                      this.$router.push({ path: './memberDetail' })
                    }
                  }
                },
                '查看'
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
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
        },
        {
          name: '139****5599',
          title: 'Ann',
          plantime: '否',
          actualtime: '0',
          platform: '官方APP',
          object: '正常',
          registertime: '2018-03-29 15:12:34',
          listtime: '2018-03-29 15:12:34'
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
