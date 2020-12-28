<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理>&nbsp;提现记录>&nbsp;提现设置</span>
          </p>
        </div>
        <div class="clearfix contentcss sales-statis">
          <Form ref='formValidate' :model="formValidate" :rules="ruleValidate" :label-width="150">
              <FormItem label="提现手续费:" prop="poundage">
                  <Select class="left" v-model="fixation" style="width:100px">
                    <Option value="rate">百分比</Option>
                    <Option value="fee">固定金额</Option>
                  </Select>
                  <Input v-model="formValidate.poundage" style="width:300px" placeholder="请输入金额">
                  <span slot="append">{{fixation == 'rate' ? '%' : '元'}}</span>
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
                  <Button type="ghost" @click="goBack" style="margin-left: 8px">返回</Button>
              </FormItem>
          </Form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        poundage: "",
        minMoney: "",
        maxMoney: "",
        uplimit: ""
      },
      ruleValidate: {
        poundage: [
          { required: true, message: "请输入提现手续费", trigger: "blur" },
          // {
          //   type: "string",
          //   pattern: /^(0|[1-9][0-9]*)$/,
          //   message: "请输入正确的提现手续费",
          //   trigger: "blur"
          // }
        ],
        minMoney: [
          {
            required: true,
            message: "请输入单笔最小提现金额",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^(1|[1-9][0-9]*)$/,
            message: "请输入单笔最小提现金额",
            trigger: "blur"
          }
        ],
        maxMoney: [
          {
            required: true,
            message: "请输入单笔最大提现金额",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^(1|[1-9][0-9]*)$/,
            message: "请输入单笔最大提现金额",
            trigger: "blur"
          }
        ],
        uplimit: [
          { required: true, message: "请输入当月提现上限", trigger: "blur" },
          {
            type: "string",
            pattern: /^(1|[1-9][0-9]*)$/,
            message: "请输入正确的提现金额",
            trigger: "blur"
          }
        ]
      },
      fixation:"fee"
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(Number(this.formValidate.poundage) > 100 || Number(this.formValidate.poundage) < 0){
              this.$Message.error("提现手续费为1-100");
              return false
            }
          if(Number(this.formValidate.uplimit) > 100000 || Number(this.formValidate.maxMoney) > 100000 || Number(this.formValidate.minMoney) > 100000){
            this.$Message.error("最大或最小，当月提现最大为100000");
            return false
          }
          if( Number(this.formValidate.maxMoney) < Number(this.formValidate.minMoney)){
            this.$Message.error("单笔最小提现金额不能大于单笔最大提现金额");
            return false
          }
          let withdraw = {
            appId: "9e97cb87578ef97c",
            feeType: this.fixation,
            rate: this.fixation == 'rate'? this.formValidate.poundage: 0,
            fee: this.fixation != 'rate'? this.formValidate.poundage: 0,
            monthMaxAmount: this.formValidate.uplimit,
            singleMaxAmount: this.formValidate.maxMoney,
            singleMinAmount: this.formValidate.minMoney
          };
          this.http
            .post(BASE_URL + "/vshop/withdraw/saveOrUpdateWithdrawConfig", withdraw)
            .then(resp => {
              console.log(resp);
              if (resp.code == "success") {
                const title = "提现设置";
                const content = "<p>设置提现配置成功</p>";
                this.$Modal.success({
                  title: title,
                  content: content
                });
              } else {
                this.$Message.error(resp.message);
              }
            })
            .catch(() => {});
          // this.$Message.success('验证成功!')
        } else {
          // this.$Message.error("验证失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].forEach((item, index) => {
      });
    },
    //返回
    goBack(){
      window.history.go(-1);
    }
  },
  mounted() {
    let aa = {
      appId: "9e97cb87578ef97c"
    };
    this.http
      .post(BASE_URL + "/vshop/withdraw/queryWithdrawConfig", aa)
      .then(resp => {
        if (resp.code == "success") {
          this.fixation = resp.data.feeType
          this.formValidate.poundage = resp.data.feeType == "fee" ? resp.data.fee + "" : resp.data.rate + "";
          this.formValidate.minMoney = resp.data.singleMinAmount + "";
          this.formValidate.maxMoney = resp.data.singleMaxAmount + "";
          this.formValidate.uplimit = resp.data.monthMaxAmount + "";
        } else {
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="less" scoped>

</style>