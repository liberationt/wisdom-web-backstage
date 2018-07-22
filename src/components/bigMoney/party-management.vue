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
                <Input v-model="model1" class="mr20" placeholder="请输入甲方名称" style="width: 200px"></Input>
                <span class="ml20">状态:</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <!-- <Button class="right mr20 w100 " type="info" @click="inquire">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
        </div>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-show="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      model1: '',
      model2: '',
      modal9: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      cityList2: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '禁用'
        }
      ],
      columns7: [
        {
          title: '甲方名称',
          align: 'center',
          key: 'partyaName'
        },
        {
          title: '推送类型',
          align: 'center',
          render: (h, params) => {
            let type
            if (params.row.sendType == '1') {
              type = '手动'
            } else if (params.row.sendType == '2') {
              type = '自动'
            } else {
              type = '自动和手动都可以'
            }
            return h('div', [
              h('span', {
              }, type)
            ])
          }
        },
        {
          title: '暂停推送日期',
          align: 'center',
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
                  title: params.row.pausePush
                }
              }, params.row.pausePush)
            ])
          }
        },
        {
          title: '日推送限制条数',
          align: 'center',
          key: 'limitDay'
        },
        {
          title: '推送周期设置',
          align: 'center',
          render: (h, params) => {
            let type
            //手动隐藏推送周期
            if (params.row.sendType == '1') {
              type = ''
            } else if (params.row.cycleUnint == '1') {
              type = params.row.cycle + '分钟'
            } else if (params.row.cycleUnint == '2') {
              type = params.row.cycle +'小时'
            } else {
              type = params.row.cycle +'天'
            }
            return h('div', [
              h('span', {
              }, type)
            ])
          }
        },
        {
          title: '状态',
          align: 'center',
          key: 'type',
          render: (h, params) => {
            let type
            if (params.row.status  == '1') {

              type = '启用'
            } else {
              type = '禁用'
            }
            return h('div', [
              h('span', {
              }, type)
            ])
          }
        },
        {
          title: '操作',
          key: 'address',
          width: 150,
          align: 'center',
          render: (h, params) => {
            let type = 'success'
            let status
            if (params.row.status == '1') {
              status = '禁用'
            } else {
              status = '启用'
            }
            let shelf = [
              h('span', {}, status)
            ]
            if (params.row.status == '1') {
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
                    this.$router.push({ path: './editorsFarty?code='+params.row.partyaCode })
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
                    if (params.row.status == '1') {
                      this.stopoperation (params.row.partyaCode, 2)                      
                    } else {
                      this.stopoperation (params.row.partyaCode, 1)
                      // params.row.status = '启用'
                    }
                  }
                }
              }, shelf),
              // h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'error',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.delete (params.row.partyaCode)
              //         // this.remove(params.index)
              //       }
              //     }
              //   },
              //   '删除'
              // )
            ])
          }
        }
      ],
      data6: []
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.inquire()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 查询
    inquire () {
      this.loading3 = true
      let list = {
        partyaName : this.model1,
        status : this.model2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
    this.http.post(BASE_URL + '/loan/partya/getPartyaList', list)
    .then((resp) => {
      console.log(resp)
      if (resp.code == 'success') {
        this.data6 = resp.data.partyaList
        this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)   
          this.loading3 = false
      } else {
          this.loading3 = false
      }
    })
    .catch(() => {
      this.loading3 = false
    })
    },
    // 删除
    delete (code) {
      this.http.post(BASE_URL + '/loan/partya/deletePartyaByCode?partyaCode='+code)
    .then((resp) => {
      if (resp.code == 'success') {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认要删除吗?</p>',
          onOk: () => {
             this.inquire ()
          },
          onCancel: () => {
              
          }
        })
      } else {

      }
    })
    .catch(() => {
    })
    },
    // 停启用
    stopoperation (code, stop) {
      let list = {
        partyaCode :code,
        status: stop
      }
      this.http.post(BASE_URL + '/loan/partya/updatePartyaByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          let title
          let content
          if (stop == 2) {
            title = '启用'
            content = '<p>启用成功</p>'
          } else {
            title = '禁用'
            content = '<p>禁用成功</p>'
          }
          this.$Modal.success({
            title: title,
            content: content
          })
          this.inquire ()
        } else {

        }
      })
      .catch(() => {
      })
    }
  },
  mounted () {
    this.inquire ()
  }
}
</script>
<style lang="less" scoped>
</style>
