<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;信贷员管理</span>
      </p>
    </div>
    <div>
          <Tabs type="card" :animated="false" @on-click="marketquery">
            <TabPane label="基本设置">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="200" class="mt50">
                <FormItem label="单次咨询(留言)扣费:" prop="passwd">
                    <Input type="text" v-model="formCustom.passwd" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                </FormItem>
                <FormItem label="每客户每天最多可联系信贷员数量:" prop="passwdCheck">
                    <Input type="text" v-model="formCustom.passwdCheck" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                </FormItem>
                <FormItem label="客户咨询信贷员后有效期:" prop="age">
                    <Input type="text" v-model="formCustom.age"  style="width:300px">
                    <span slot="append">天</span>
                    </Input>
                </FormItem>
                <FormItem label="客户X分钟内不咨询进入抢单库:" prop="time">
                    <Input type="text" v-model="formCustom.time" style="width:300px">
                    <span slot="append">分</span>
                    </Input>
                </FormItem>
                <FormItem label="虚拟余额低于多少不可以拨打淘单:" prop="balance">
                    <Input type="text" v-model="formCustom.balance" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                </FormItem>
                <FormItem label="淘单拨打底价:" prop="floorprice">
                    <Input type="text" v-model="formCustom.floorprice"  style="width:300px">
                    <span slot="append">元</span>
                    </Input>
                </FormItem>
                <FormItem label="淘单拨打每分钟扣费:" prop="deductions">
                    <Input type="text" v-model="formCustom.deductions"  style="width:300px">
                    <span slot="append">元</span>
                    </Input>
                </FormItem>
                <FormItem label="活跃用户到体眠状态:" prop="dormancy" style="position:relative">
                    <Input type="text" v-model="formCustom.dormancy"  style="width:300px">
                    <span slot="append">天</span>
                    </Input>
                    <span class="signin">内不登录</span>
                </FormItem>
                <FormItem label="同一号码拨打周期:" prop="cycle">
                    <Input type="text" v-model="formCustom.cycle"  style="width:300px">
                    <span slot="append">天</span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">保存设置</Button>
                </FormItem>
            </Form>
            </TabPane>
            <TabPane label="用户身价设置">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="200" class="mt50">
                <FormItem label="底价:" >
                    <Input type="text" v-model="formCustom.price" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                </FormItem>
                <FormItem label="已实名:" >
                    <Input type="text" v-model="formCustom.balance" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="贷款金额:"  class="clearfix">
                    <div class="left">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">1万-3万</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">3万-5万</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">5万-10万</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">10万-20万</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">20万-50万</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">50万以上</span>
                        </Input>
                    </div>
                </FormItem>
                <FormItem label="月收入:" class="clearfix">
                    <div class="left">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">3k以下</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">3k-6k</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">6k-10k</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">10k-20k</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">20k以上</span>
                        </Input>
                    </div>
                </FormItem>
                <FormItem label="职业:"  class="clearfix">
                    <div class="left">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">上班族</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">公务员</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">企业法人</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">个体户</span>
                        </Input>
                    </div>
                    <div class="left ml10">
                        <Input type="text" v-model="formCustom.passwdCheck" style="width:150px">
                           <span slot="prepend">自由职业</span>
                        </Input>
                    </div>
                </FormItem>
                <FormItem label="本地户籍:" >
                    <Input type="text" v-model="formCustom.balance" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有房:" >
                    <Input type="text" v-model="formCustom.floorprice"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有车:">
                    <Input type="text" v-model="formCustom.deductions"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有公积金:">
                    <Input type="text" v-model="formCustom.dormancy"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有社保:" >
                    <Input type="text" v-model="formCustom.cycle"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有信用卡:">
                    <Input type="text" v-model="formCustom.cycle"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有微粒贷:">
                    <Input type="text" v-model="formCustom.cycle"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="有寿险保单:">
                    <Input type="text" v-model="formCustom.cycle"  style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="tc mt50">
                    <Button type="primary" @click="handleSubmit('formCustom')">保存配置</Button>
                </FormItem>
            </Form>
            </TabPane>
            <TabPane label="营销设置" >
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="200" class="mt50">
                    <FormItem label="注册送:" class="clearfix">
                        <Select v-model="model1" style="width:100px" class="left">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input type="text" v-model="formCustom.cycle" class="left ml10"  style="width:150px">
                            <span slot="append" class="left">个</span>
                        </Input>
                    </FormItem>
                    <FormItem label="首次充值送:" class="clearfix">
                        <Select v-model="model1" style="width:100px" class="left">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div class="credit_recharge">
                            <div
                             v-for="(item, index) in addmenu"
                             :class="item.hidden?'clearfix':'clearfix ml100 mt15'"
                             v-if="item.status"
                             :key="index"
                             :prop="'items.' + index + '.value1'"
                             >
                            <Input type="text" v-model="item.value1" class="left ml10"  style="width:150px">
                            <span slot="prepend">满</span>
                            <span slot="append" class="left">送</span>
                        </Input>
                        <Input type="text" v-model="item.value2" class="left "  style="width:150px">
                            <span slot="append" class="left">个</span>
                        </Input>
                        <Button type="primary" class="left ml10" v-if="item.hidden" @click="addset">增加</Button>
                        </div>
                        </div>
                    </FormItem>
                    <FormItem label="正常充值送:" class="clearfix">
                        <Select v-model="model1" style="width:100px" class="left">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div class="credit_recharge">
                            <div
                             v-for="(item, index) in addnormals"
                             :class="item.hidden?'clearfix':'clearfix ml100 mt15'"
                             v-if="item.status"
                             :key="index"
                             :prop="'items.' + index + '.value1'"
                             >
                            <Input type="text" v-model="item.value1" class="left ml10"  style="width:150px">
                            <span slot="prepend">满</span>
                            <span slot="append" class="left">送</span>
                        </Input>
                        <Input type="text" v-model="item.value2" class="left "  style="width:150px">
                            <span slot="append" class="left">个</span>
                        </Input>
                        <Button type="primary" class="left ml10" v-if="item.hidden" @click="addnormal">增加</Button>
                        </div>
                        </div>
                    </FormItem>
                    <FormItem label="邀请好友送:" class="clearfix">
                        <Select v-model="model1" style="width:100px" class="left">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input type="text" v-model="formCustom.cycle" class="left ml10"  style="width:150px">
                            <span slot="append" class="left">个/人</span>
                        </Input>
                    </FormItem>
                     <FormItem class=" mt50">
                    <Button type="primary" @click="handleSubmit('formCustom')">保存配置</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="ghost" @click="handleRender">查看操作日志</Button>
                </FormItem>
                </Form>
            </TabPane>
          </Tabs>
    </div>
</div>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入单次咨询(留言)扣费'))
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客户每天最多可联系信贷员数量'))
      }
    }
    const validateAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客户咨询信贷员后有效期'))
      }
    }
    const validateTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入时间'))
      }
    }
    const validateBalance = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入虚拟余额'))
      }
    }
    const validateFloorprice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入淘单拨打底价'))
      }
    }
    const validateDeductions = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入淘单拨打每分钟扣费费用'))
      }
    }
    const validateDormancy = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入休眠时间'))
      }
    }
    const validateCycle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入同一号码拨打周期'))
      }
    }
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: '',
        time: '',
        balance: '',
        floorprice: '',
        deductions: '',
        dormancy: '',
        cycle: '',
        price: ''
      },
      cityList: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      index: 1,
      index2: 1,
      addmenu: [
        {
          value1: '',
          value2: '',
          index: 1,
          status: 1,
          hidden: true
        }
      ],
      addnormals: [
        {
          value1: '',
          value2: '',
          index: 1,
          status: 1,
          hidden: true
        }
      ],
      model1: '',
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ],
        time: [
          { validator: validateTime, trigger: 'blur' }
        ],
        balance: [
          { validator: validateBalance, trigger: 'blur' }
        ],
        floorprice: [
          { validator: validateFloorprice, trigger: 'blur' }
        ],
        deductions: [
          { validator: validateDeductions, trigger: 'blur' }
        ],
        dormancy: [
          { validator: validateDormancy, trigger: 'blur' }
        ],
        cycle: [
          { validator: validateCycle, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleRender () {
      this.$router.push({ path: './operationLog' })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    addset () {
      this.index++
      this.addmenu.push({
        value1: '',
        value2: '',
        index: this.index,
        status: 1,
        hidden: false
      })
    },
    addnormal () {
      this.index2++
      this.addnormals.push({
        value1: '',
        value2: '',
        index: this.index,
        status: 1,
        hidden: false
      })
    },
    marketquery (name) {
      if (name == 2) {
        this.http.post(BASE_URL + '/loan/marketConfig/query', {})
          .then((resp) => {
            if (resp.code == 'success') {
              console.log(resp)
            } else {
            }
          })
          .catch(() => {
          })
      }
    }
  },
  mounted () {     
  }
}
</script>
<style lang="less" scoped>
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    padding: 5px 50px 4px;
}
.signin{
    position: absolute;
    top: 0px;
    left: 305px
}
.credit_recharge{
    width: 500px;
}
.ivu-modal .ivu-btn-primary{
    display: none!important
}
</style>
