<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
      </p>
    </div>
    <div>
        <Button type="primary" shape="circle" icon="ios-gear-outline" @click="gread">配置风控等级</Button>
        <Table :columns="columns1" :data="data1" class="mt15"></Table>
        <p class="tc mt50">
            <Button type="primary">保存设置</Button>
        </p>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      columns1: [
        {
          title: '产品',
          key: 'name',
          align: 'center'
        },
        {
          title: '当前风控等级',
          key: 'age',
          align: 'center',
          render: (h, params) => {
            return h('RadioGroup', {
              props: {
                value: this.data1[params.index].value
              },
              on: {
                'on-change': (val) => {
                  this.data1[params.index].value = val
                }
              }
            },
            [
              h('Radio', {
                props: {
                  label: 0
                }
              }, '高'),
              h('Radio', {
                props: {
                  label: 1
                }
              }, '中'),
              h('Radio', {
                props: {
                  label: 2
                }
              }, '低')
            ])
          }
        }
      ],
      type: 'radio',
      value: 0,
      data1: [
        {
          name: 'John Brown',
          value: 0
        },
        {
          name: 'Jim Green',
          value: 0
        },
        {
          name: 'Joe Black',
          value: 0
        },
        {
          name: 'Jon Snow',
          value: 0
        }
      ]
    }
  },
  methods: {
    gread () {
      this.$router.push({path: './managementGrade'})
    }
  },
  mounted () {
    this.http.post(BASE_URL + '/rule/RiskBusiness/getRiskBusinessList', {})
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

</style>
