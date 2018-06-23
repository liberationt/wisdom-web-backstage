 <template>
    <div>
        <div class="navigation">
            <p>
                <span>甲方管理</span>
            </p>
        </div>
        <div class="mt50 clearfix">
            <div class="left ml20">
                <span>甲方名称:</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="ml20">状态:</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <Button class="right mr20 w100 " type="info">查询</Button>
        </div>
        <div class="mt20">
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
      model1: '',
      model2: '',
      modal9: false,
      loading: true,
      cityList: [
        {
          value: '大地',
          label: '大地'
        },
        {
          value: '厚本金融',
          label: '厚本金融'
        },
        {
          value: '新一贷',
          label: '新一贷'
        },
        {
          value: '平安普惠',
          label: '平安普惠'
        },
        {
          value: '秒贷',
          label: '秒贷'
        },
        {
          value: '银谷',
          label: '银谷'
        }
      ],
      cityList2: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      columns7: [
        {
          title: '甲方名称',
          align: 'center',
          key: 'partyname'
        },
        {
          title: '推送类型',
          align: 'center',
          key: 'pushtype'
        },
        {
          title: '暂停推送日期',
          align: 'center',
          key: 'pushstadata',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.pushstadata
                }
              }, params.row.pushstadata)
            ])
          }
        },
        {
          title: '日推送限制条数',
          align: 'center',
          key: 'pushenddata'
        },
        {
          title: '推送周期设置',
          align: 'center',
          key: 'pushcycle'
        },
        {
          title: '状态',
          align: 'center',
          key: 'type'
        },
        {
          title: '操作',
          key: 'address',
          width: 200,
          align: 'center',
          render: (h, params) => {
            let type = 'success'
            let shelf = [
              h('span', {}, params.row.onshelf)
            ]
            if (params.row.type == '启用') {
              type = 'success'
            } else {
              type = 'warning'
            }
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
                    this.$router.push({ path: './editorsFarty' })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: type,
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (params.row.onshelf == '启用') {
                      params.row.type = '启用'
                      params.row.onshelf = '禁用'
                    } else {
                      params.row.type = '禁用'
                      params.row.onshelf = '启用'
                    }
                  }
                }
              }, shelf),
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
          partyname: '唐哈哈',
          pushtype: '自动',
          pushstadata: '2018-05-12, 2018-05-12, 2018-05-12',
          pushenddata: '50',
          pushcycle: '一周',
          type: '启用',
          onshelf: '禁用'
        },
        {
          partyname: '唐哈哈',
          pushtype: '自动',
          pushstadata: '2018-05-12',
          pushenddata: '50',
          pushcycle: '一周',
          type: '启用',
          onshelf: '禁用'
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
    remove (index) {
      this.data6.splice(index, 1)
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
