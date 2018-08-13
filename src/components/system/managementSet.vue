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
            <Button type="primary" @click="preservation">保存设置</Button>
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
          key: 'businessName',
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
      data1: []
    }
  },
  methods: {
    gread () {
      this.$router.push({path: './managementGrade'})
    },
    preservation () {
      let appcode
      let businessalias
      let businesscode
      let rulecode
      for (let i = 0; i < this.data1.length; i++) {
            if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].highRuleCode) {
              resp.data.riskBusinessList[i].value = 0
            } else if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].middleRuleCode) {
              resp.data.riskBusinessList[i].value = 1
            } else if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].lowRuleCode) {
              resp.data.riskBusinessList[i].value = 2
            } else {
              resp.data.riskBusinessList[i].value = 0              
            }
          }
      let list = {
        appCode: appcode,
        businessAlias: businessalias,
        businesscode: businesscode,
        ruleCode: rulecode
      }
      this.http.post(BASE_URL + '/rule/RiskBusiness/modifyBatchRiskBusinessByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          
          this.data1 = resp.data.riskBusinessList
        } else {

        }
      })
      .catch(() => {               
      })

    }
  },
  mounted () {
    this.http.post(BASE_URL + '/rule/RiskBusiness/getRiskBusinessList', {})
    .then((resp) => {
      if (resp.code == 'success') {
        for (let i = 0; i < resp.data.riskBusinessList.length; i++) {
          if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].highRuleCode) {
            resp.data.riskBusinessList[i].value = 0
          } else if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].middleRuleCode) {
            resp.data.riskBusinessList[i].value = 1
          } else if (resp.data.riskBusinessList[i].ruleCode == resp.data.riskBusinessList[i].lowRuleCode) {
            resp.data.riskBusinessList[i].value = 2
          } else {
            resp.data.riskBusinessList[i].value = 0              
          }
        }
        this.data1 = resp.data.riskBusinessList
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
