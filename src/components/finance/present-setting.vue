<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;财务&nbsp;>&nbsp;提现管理</span>
      </p>
    </div>
    <div >
        <Tabs type="card" :animated="false" @on-click="handleReset('formValidate')">
            <TabPane v-for="(tab, index) in tabs" :key="index" :label="tab" >
                <div class="mt50">
                    <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" :label-width="150">
                        <FormItem label="提现手续费:" prop="poundage">
                            <Input v-model="formValidate.poundage" style="width:300px" placeholder="请输入金额">
                            <span slot="append">元</span>
                            </Input>
                        </FormItem>
                        <FormItem label="单笔最小提现金额:" prop="minMoney">
                            <Input v-model="formValidate.minMoney" style="width:300px" placeholder="请输入金额">
                            <span slot="append">元</span>
                            </Input>
                        </FormItem>
                        <FormItem label="单笔最大提现金额:" prop="maxMoney">
                            <Input v-model="formValidate.maxMoney" style="width:300px" placeholder="请输入金额">
                            <span slot="append">元</span>
                            </Input>
                        </FormItem>
                        <FormItem label="当月提现上限:" prop="uplimit">
                            <Input v-model="formValidate.uplimit" style="width:300px" placeholder="请输入金额">
                            <span slot="append">元</span>
                            </Input>
                        </FormItem>
                        <FormItem >
                            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
                        </FormItem>
                    </Form>
                </div>
            </TabPane>
        </Tabs>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        '抢单侠',
        // '华赞金服'
      ],
      tabnum: 0,
      formValidate: {
        poundage: '',
        minMoney: '',
        maxMoney: '',
        uplimit: ''
      },
      ruleValidate: {
        poundage: [
          { required: true, message: '请输入提现手续费', trigger: 'blur' },
          { type: 'string', pattern: /^(0|[1-9][0-9]*)$/, message: '请输入正确的提现手续费', trigger: 'blur' }
        ],
        minMoney: [
          { required: true, message: '请输入单笔最小提现金额', trigger: 'blur' },
          { type: 'string', pattern: /^(0|[1-9][0-9]*)$/, message: '请输入单笔最小提现金额', trigger: 'blur' }
        ],
        maxMoney: [
          { required: true, message: '请输入单笔最大提现金额', trigger: 'blur' },
          { type: 'string', pattern: /^(0|[1-9][0-9]*)$/, message: '请输入单笔最大提现金额', trigger: 'blur' }
        ],
        uplimit: [
          { required: true, message: '请输入当月提现上限', trigger: 'blur' },
          { type: 'string', pattern: /^(0|[1-9][0-9]*)$/, message: '请输入正确的提现金额', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name][this.tabnum].validate((valid) => {
        if (valid) {
          let  withdraw = {
            appId: "9e97cb87578ef97c",
            fee: this.formValidate.poundage,
            monthMaxAmount: this.formValidate.uplimit,
            singleMaxAmount: this.formValidate.maxMoney,
            singleMinAmount: this.formValidate.minMoney
          }
          this.http.post(BASE_URL + '/loan/withdraw/saveOrUpdate/config',  withdraw)
          .then((resp) => {
            console.log(resp)
            if (resp.code == 'success') {
              const title = '提现设置'
              const content = '<p>设置提现配置成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
            } else {
              this.$Message.error(resp.message)

            }
          })
          .catch(() => {
          })
          // this.$Message.success('验证成功!')
        } else {
          this.$Message.error('验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].forEach((item, index) => {
        this.tabnum = index
        this.$refs[name][index].resetFields()
      })
    }
  },
  mounted () {
    this.$refs['formValidate'][this.tabnum].resetFields()
    let aa = {
      appId: '9e97cb87578ef97c'
    }
    this.http.post(BASE_URL + '/loan/withdraw/query/config',  aa)
      .then((resp) => {
        if (resp.code == 'success') {
          this.formValidate.poundage = resp.data.fee+''
          this.formValidate.minMoney = resp.data.singleMinAmount+''
          this.formValidate.maxMoney = resp.data.singleMaxAmount+''
          this.formValidate.uplimit = resp.data.monthMaxAmount+''
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
