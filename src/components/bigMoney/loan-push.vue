<template>
    <div>
        <div class="navigation">
            <p>
                <span>贷款推送</span>
            </p>
        </div>
        <div class="mt50">
            <span>媒体名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>推送模式:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>推送时间:</span>
            <DatePicker type="date" confirm placeholder="Select date" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" confirm placeholder="Select date" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <Button class="right mr20" type="info">查询</Button>
            </div>
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
      model3: '',
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
      cityList2: [
        {
          value: '1',
          label: '自动'
        },
        {
          value: '2',
          label: '手动'
        }
      ],
      columns7: [
        {
          title: '批次',
          key: 'batch'
        },
        {
          title: '推送模式',
          key: 'pattern'
        },
        {
          title: '媒体名称',
          key: 'name'
        },
        {
          title: '推送开始时间',
          key: 'starttime'
        },
        {
          title: '推送结束时间',
          key: 'endtime'
        },
        {
          title: '推送条数',
          key: 'pushnum'
        },
        {
          title: '成功条数',
          key: 'address'
        },
        {
          title: '失败条数',
          key: 'address'
        },
        {
          title: '备注',
          key: 'address'
        },
        {
          title: '详情',
          key: 'address'
        },
        {
          title: 'Action',
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
                    this.show(params.index)
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
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
    }
  }
}
</script>
<style lang="less" scoped>
</style>
