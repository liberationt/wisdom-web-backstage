<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <Tabs type="card" :animated="false">
        <TabPane :label="label"  on-click	="labelll">
            <div class="clearfix" >
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane :label="label2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="注册无资料" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="所属状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷员列表" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" placeholder="姓名" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model2" placeholder="所属区域" style="width:200px;margin-left:50px">
                <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model3" placeholder="上架状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model4" placeholder="排序" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="信贷机构" >
            <div class="clearfix">
            <div class="left">
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
            <Select v-model="model3" placeholder="上架状态" style="width:200px;margin-left:50px">
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model4" placeholder="是否首页推荐" style="width:200px;margin-left:50px">
                <Option v-for="item in recommend" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <Button class="right mr100" type="primary" icon="ios-search">查询</Button>
            </div>
            <Button type="primary" class="mt15" shape="circle" icon="plus-round" @click="addManage">添加信贷机构</Button>
            <div id="application_table" class="mt15">
            <Table border :columns="columns11" :data="data10"></Table>
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
          h('span', '入驻待审核'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      label2: h => {
        return h('div', [
          h('span', '资料修改待审核'),
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
      sort: [
        {
          value: '注册时间排序',
          label: '注册时间排序'
        },
        {
          value: '登录时间排序',
          label: '登录时间排序'
        },
        {
          value: '余额排序',
          label: '余额排序'
        },
        {
          value: '咨询量排序',
          label: '咨询量排序'
        }
      ],
      recommend: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }
      ],
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      name: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center'
        },
        {
          title: '所属区域',
          key: 'region',
          align: 'center'
        },
        {
          title: '贷款额度',
          key: 'quota',
          align: 'center'
        },
        {
          title: '贷款类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '证件',
          key: 'certificates',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'time',
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
                      this.$router.push({ path: './creditInformation' })
                    }
                  }
                },
                '查看审核'
              )
            ])
          }
        }
      ],
      data6: [
        {
          id: '110101',
          phone: '139****5599',
          name: '李明明',
          gender: '男',
          region: '上海',
          quota: '3万-30万',
          type: '车抵贷 房抵贷 保单贷',
          certificates: '已上传',
          time: '2018-03-29 15:12:34'
        }
      ],
      columns8: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'plantime',
          align: 'center'
        },
        {
          title: '提交修改时间',
          key: 'time',
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
                      this.$router.push({ path: './revisionReview' })
                    }
                  }
                },
                '查看审核'
              )
            ])
          }
        }
      ],
      data7: [
        {
          id: 'A1111',
          phone: '135****7766',
          plantime: '唐哈哈',
          time: '2018-03-29 15:12:34'
        }
      ],
      columns9: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '状态',
          key: 'type',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'time',
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
                '查看'
              )
            ])
          }
        }
      ],
      data8: [
        {
          id: 'A11111',
          phone: '135****7766',
          type: '未填基本信息',
          time: '2018-03-29 15:12:34'
        }
      ],
      columns10: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center'
        },
        {
          title: '所属区域',
          key: 'region',
          align: 'center'
        },
        {
          title: '状态',
          key: 'type',
          align: 'center'
        },
        {
          title: '虚拟余额',
          key: 'fictitious',
          align: 'center'
        },
        {
          title: '现金余额(元)',
          key: 'cash',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'register',
          align: 'center'
        },
        {
          title: '最后登录时间',
          key: 'sign',
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
                '查看'
              )
            ])
          }
        }
      ],
      data9: [
        {
          id: 'A11111',
          phone: '135****7766',
          name: '唐哈哈',
          gender: '女',
          region: '上海',
          type: '上架',
          fictitious: '2',
          cash: '32',
          register: '2018-03-29 15:12:34',
          sign: '2018-03-29 15:12:34'
        }
      ],
      columns11: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'mechanism',
          align: 'center'
        },
        {
          title: '状态',
          key: 'type',
          align: 'center'
        },
        {
          title: '首页推荐',
          key: 'recommend',
          align: 'center'
        },
        {
          title: '产品数量',
          key: 'number',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
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
              }, '删除'),
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
                    this.$router.push({ path: './addMechanism' })
                  }
                }
              }, '编辑'),
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
                    this.$router.push({ path: './toExamine' })
                  }
                }
              }, '管理产品')
            ])
          }
        }
      ],
      data10: [
        {
          id: 'A11111',
          mechanism: '络慧科技',
          type: '上架',
          recommend: '是',
          number: '11',
          time: '2018-03-29 15:12:34'
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
    addManage () {
      this.$router.push({ path: './addMechanism' })
    },
    // 入驻待审核
    labelll() {
      console.log(111)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
