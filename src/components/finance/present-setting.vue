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
        '华赞金服'
      ],
      formValidate: {
        poundage: '',
        minMoney: '',
        maxMoney: '',
        uplimit: ''
      },
      ruleValidate: {
        poundage: [
          { required: true, message: '请输入提现手续费', trigger: 'blur' }
        ],
        minMoney: [
          { required: true, message: '请输入单笔最小提现金额', trigger: 'blur' }
        ],
        maxMoney: [
          { required: true, message: '请输入单笔最大提现金额', trigger: 'blur' }
        ],
        uplimit: [
          { required: true, message: '请输入当月提现上限', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].forEach((item, index) => {
        this.$refs[name][index].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      })
    },
    handleReset (name) {
      this.$refs[name].forEach((item, index) => {
        this.$refs[name][index].resetFields()
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>

</style>
