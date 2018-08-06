<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理</span>
      </p>
    </div>
    <div class="mt50">
        <div class="application_news">
          <router-link to="/applicationSendout">
            <Icon type="plus-round"></Icon>
            <span>发送站内信消息</span>
          </router-link>
        </div>
        <div class="application_news ml20">
          <router-link to="/applicationNewtype">
            <Icon type="ios-gear-outline"></Icon>
            <span>配置消息类型</span>
          </router-link>
        </div>

      <Select v-model="model1" placeholder="全部状态" class="ml20" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model2" placeholder="全部类型" class="ml20" style="width:200px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
    </div>
    <div id="application_table" >
      <Table border :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      total: 0,
			startRow: 1,
			endRow: 10,
      cityList: [
        {
          value: '未推送',
          label: '未推送'
        },
        {
          value: '已推送',
          label: '已推送'
        }
      ],
      cityType: [
        {
          value: '平台公告',
          label: '平台公告'
        },
        {
          value: '精品推荐',
          label: '精品推荐'
        }
      ],
      model1: '',
      model2: '',
      columns7: [
        {
          title: '类型',
          key: 'name',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '计划推送时间',
          key: 'plantime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '实际推送时间',
          key: 'actualtime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '推送平台',
          key: 'platform',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '推送对象',
          key: 'object',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '状态',
          key: 'pushtype',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '创建人',
          key: 'Pushman',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
              }, '查看'),
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
                    this.show(params.index)
                  }
                }
              }, '编辑'),           
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
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
          name: '平台公告',
          title: '小额短期贷，最高5000元，拿钱嗖嗖嗖！',
          plantime: '2018-03-29 15:12:34',
          actualtime: '2018-03-29 15:12:34',
          platform: '全部',
          object: '全部',
          pushtype: '未推送',
          Pushman: 'admin'
        },
        {
          name: '平台公告',
          title: '小额短期贷，最高5000元，拿钱嗖嗖嗖！',
          plantime: '2018-03-29 15:12:34',
          actualtime: '2018-03-29 15:12:34',
          platform: '全部',
          object: '全部',
          pushtype: '未推送',
          Pushman: 'admin'
        },
        {
          name: '平台公告',
          title: '小额短期贷，最高5000元，拿钱嗖嗖嗖！',
          plantime: '2018-03-29 15:12:34',
          actualtime: '2018-03-29 15:12:34',
          platform: '全部',
          object: '全部',
          pushtype: '未推送',
          Pushman: 'admin'
        },
        {
          name: '平台公告',
          title: '小额短期贷，最高5000元，拿钱嗖嗖嗖！',
          plantime: '2018-03-29 15:12:34',
          actualtime: '2018-03-29 15:12:34',
          platform: '全部',
          object: '全部',
          pushtype: '未推送',
          Pushman: 'admin'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    // 分页
    pageChange(page) {
				this.startRow = page
				// this.inquire()
		},
    pagesizechange(page) {
      this.startRow = 1
      this.endRow = page
      // this.inquire()
    },
  },
  mounted () {
     this.http.post(BASE_URL + '/loan/webMail/getWebMailListBaseData', {})
    .then((resp) => {
      if (resp.code == 'success') {
        
      } else {

      }
    })
    .catch(() => {
    })
  }
}
</script>
<style lang="less" scoped>
.application_news{
  display: inline-block;
  height: 32px;
  border: 1px solid #dddee1;
  line-height: 32px;
  padding: 0 10px;
  border-radius: 20px;
  vertical-align: middle
}
#application_table{
  margin-top: 30px
}
</style>
