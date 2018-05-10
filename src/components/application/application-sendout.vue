<template>
  <Row>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;站内信</span>
      </p>
    </div>
    <Col span="12" offset="4">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="消息类型:" prop="city">
        <Select v-model="formCustom.city" placeholder="请选择" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>
        <FormItem label="标题:" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" placeholder="请输入标题" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="计划推送时间:" prop="passwdCheck">
          <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="推送平台:" prop="age">
          <Select v-model="formCustom.age" placeholder="请选择" style="width:200px">
            <Option value="anzuo">安卓</Option>
            <Option value="ios">iOS</Option>
          </Select>
        </FormItem>
        <FormItem label="推送对象:" prop="object">
          <Select v-model="formCustom.object" placeholder="请选择" @on-change="pushphone" style="width:200px">
            <Option value="quanbu">全部</Option>
            <Option value="zd">指定手机</Option>
          </Select>
        </FormItem>
        <FormItem label="推送手机号:" prop="phone" v-if="push">
          <Input v-model="formCustom.phone" type="textarea" style="width:400px" placeholder="请输入推送手机号"></Input>
          <p>指定手机号,以半角逗号分隔</p>
        </FormItem>
        <FormItem label="跳转类型:" prop="h5">
          <Select v-model="formCustom.h5" placeholder="请选择" style="width:200px" @on-change="homesenh5">
            <Option value="5">原生页面</Option>
            <Option value="6">H5</Option>
          </Select>
          <Select v-model="formCustom.value5" placeholder="请选择" style="width:200px" v-if="homeh5">
            <Option value="0">首页</Option>
            <Option value="1">贷款列表</Option>
            <Option value="2">产品详情</Option>
            <Option value="3">实名认证</Option>
            <Option value="4">精准推荐</Option>
          </Select>
        </FormItem>
        <FormItem label="跳转URL:" prop="jumpurl" v-if="!homeh5">
          <Input type="password" v-model="formCustom.passwd" placeholder="请输入跳转URL" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">提交保存</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">返回</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: '',
        city: '',
        object: '',
        value5: '',
        h5: '',
        jumpurl: ''
      },
      push: false,
      homeh5: false,
      ruleCustom: {
        city: { required: true, message: '请选择消息类型', trigger: 'blur' },
        passwd: { required: true, message: '请输入标题', trigger: 'blur' },
        passwdCheck: { required: true, message: '请选择计划推送时间', trigger: 'blur' },
        age: { required: true, message: '请选择推送平台', trigger: 'blur' },
        object: { required: true, message: '请选择推送对象', trigger: 'blur' },
        phone: { required: true, message: '请输入推送手机号', trigger: 'blur' },
        h5: { required: true, message: '请选择跳转类型', trigger: 'blur' },
        jumpurl: { required: true, message: '请输入跳转URL', trigger: 'blur' }
      },
      cityList: [
        {
          value: '平台公告',
          label: '平台公告'
        },
        {
          value: '精品推荐',
          label: '精品推荐'
        },
        {
          value: '新品速递',
          label: '新品速递'
        }
      ]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    pushphone () {
      if (this.formCustom.object === 'zd') {
        this.push = true
      } else {
        this.push = false
      }
    },
    homesenh5 () {
      if (this.formCustom.h5 == 5) {
        this.homeh5 = true
      } else {
        this.homeh5 = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
