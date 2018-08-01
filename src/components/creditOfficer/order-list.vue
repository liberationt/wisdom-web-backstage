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
            <Select v-model="model1" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>           
            <Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model3" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
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
        <TabPane label="抢单订单">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>           
            <Select v-model="model2" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model3" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
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
        <TabPane :label="label3" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="全部" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model2" placeholder="请选择省" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="model3" placeholder="请选择市" style="width:200px;margin-left:10px">
                <Option v-for="item in status" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
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
          h('span', '咨询订单'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      label3: h => {
        return h('div', [
          h('span', '申诉订单'),
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
      cityType1: [],
      cityType2: [],
      cityType3: [],
      status: [
        {
          value: '已咨询',
          label: '已咨询'
        },
        {
          value: '待付款',
          label: '待付款'
        },
        {
          value: '待确认',
          label: '待确认'
        }
      ],
      model1: '',
      model2: '',
      model3: '',
      name: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '订单时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'title',
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
          title: '订单状态',
          key: 'service',
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'score',
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
                      this.$router.push({ path: './detailsConsultation' })
                    }
                  }
                },
                '查看详情'
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
          object: '135****7766',
          service: '200元',
          score: ''
        }
      ],
      columns8: [
        {
          title: '抢单时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '抢单编号',
          key: 'title',
          align: 'center'
        },
        {
          title: '区域',
          key: 'plantime',
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
          title: '信贷员姓名',
          key: 'evaluatecon',
          align: 'center'
        },
        {
          title: '信贷员手机号',
          key: 'evnumber',
          align: 'center'
        },
        {
          title: '抢单费用',
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
                      this.$router.push({ path: './detailsRobbing' })
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
          object: '135****7766',
          service: '200元',
          score: '',
          evaluatecon: '非常好非常专业的服务....',
          evnumber: ''
        }
      ],
      columns9: [
        {
          title: '订单时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'title',
          align: 'center'
        },
        {
          title: '区域',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '信贷员',
          key: 'service',
          align: 'center'
        },
        {
          title: '信贷员手机',
          key: 'score',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'evaluatecon',
          align: 'center'
        },
        {
          title: '手机',
          key: 'evnumber',
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'object',
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'money',
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
                      this.$router.push({ path: './detailsComplaint' })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data8: [
        {
          name: '2018-03-29 15:12:34',
          title: 'XD2018091099',
          plantime: '2018-03-29 15:12:34',
          object: '135****7766',
          service: '200元',
          score: '',
          evaluatecon: '非常好非常专业的服务....',
          evnumber: '',
          money: '222'
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
    created () {
    this.http.get('../../../static/city.json').then(data=>{
      this.cityType1 = data
      this.cityType2 = data
      this.cityType3 = data
    })
  },
  //省 
    citys(v){
      let data = {
        "data": v
      }
      this.httpshi(data)
      // this.model2 = v
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
        this.status = data.data
      })
    },
  },
  mounted () {
    this.created ()
  }
}
</script>
<style lang="less" scoped>
</style>
