<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;风控配置</span>
      </p>
    </div>
    <div class="contentcss">
        <Button type="primary" shape="circle" icon="ios-gear-outline" @click="gread">配置风控等级</Button>
        <Table :columns="columns1" :data="data1" class="mt15"></Table>
        <p class="tc mt50">
            <Button type="primary" class="mr20" @click="goToLog">查看操作日志</Button>
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
    // 查询
    inquire () {
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
    },
    // 保存
    preservation () {
      let list = []
      for (let i = 0; i < this.data1.length; i++) {
        if (this.data1[i].value == 0) {
          this.data1[i].ruleCode = this.data1[i].highRuleCode
        } else if (this.data1[i].value == 1) {
          this.data1[i].ruleCode = this.data1[i].middleRuleCode
        } else if (this.data1[i].value == 2) {
          this.data1[i].ruleCode = this.data1[i].lowRuleCode
        }
        let obj = new Object ()
        obj.appCode = this.data1[i].appCode
        obj.businessAlias = this.data1[i].businessAlias
        obj.businessCode = this.data1[i].businessCode
        obj.businessName = this.data1[i].businessName
        obj.highRuleCode = this.data1[i].highRuleCode
        obj.middleRuleCode = this.data1[i].middleRuleCode
        obj.lowRuleCode = this.data1[i].lowRuleCode
        obj.ruleCode = this.data1[i].ruleCode
        list.push(obj)
      }
      this.http.post(BASE_URL + '/rule/RiskBusiness/modifyBatchRiskBusinessByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
              this.$Modal.success({
            title: '提示',
            content: '<p>保存成功</p>',
            // onOk: () => {
            //   this.$router.push({ path: './managementSet' })
            // }
          })
          this.inquire ()
        } else {

        }
      })
      .catch(() => {
      })

    },
    goToLog() {
      this.$router.push({path: './operationLog?operationType=risk_product_edit'})
    }
  },
  mounted () {
    this.inquire ()
  }
}
</script>
<style lang="less" scoped>

</style>
