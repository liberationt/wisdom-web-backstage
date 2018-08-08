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
          <Select v-model="formCustom.city" placeholder="请选择" @on-change="messagetype" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem label="标题:" prop="title">
          <Input type="text" v-model="formCustom.title" autocomplete="off" placeholder="请输入标题" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="推送时间:" prop="datePicker">
          <Select @on-change="datepicker" v-model="formCustom.datePicker" placeholder="请选择" style="width:200px">
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker v-if="ifdate" @on-change = "datepickerl" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="推送平台:" prop="age">
          <Select v-model="formCustom.age" placeholder="请选择" @on-change="pushplatform" style="width:200px">
             <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem label="推送对象:" prop="object">
          <Select v-model="formCustom.object" placeholder="请选择" @on-change="pushphone" style="width:200px">
            <Option v-for="item in pushduixing" :value="item.value" :key="item.value">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem label="推送手机号:" prop="phone" v-if="push">
          <Input v-model="formCustom.phone" type="textarea" style="width:400px" placeholder="请输入推送手机号"></Input>
          <p>指定手机号,以半角逗号分隔</p>
        </FormItem>
        <FormItem label="跳转类型:" prop="h5">
          <Select v-model="formCustom.h5" placeholder="H5页面" style="width:200px" @on-change="homesenh5">
            <Option v-for="item in jumpType" :value="item.value" :key="item.value">{{ item.text }}</Option>
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
          <Input type="text" v-model="formCustom.jumpurl" placeholder="请输入跳转URL" style="width: 200px"></Input>
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
import utils from '../../utils/utils'
export default {
  data () {
    return {
      formCustom: {
        title: '',
        passwdCheck: '',
        age: '',
        city: '',
        object: '',
        // value5: '',
        h5: '',
        jumpurl: '', 
        datePicker: ''
      },
      push: false,
      homeh5: false,
      ruleCustom: {
        city: { required: true, message: '请选择消息类型', trigger: 'change' },
        datePicker: { required: true, message: '请选择推送时间', trigger: 'change' },
        title: { required: true, message: '请输入标题', trigger: 'blur' },
        passwdCheck: { required: true, message: '请选择计划推送时间', trigger: 'change' },
        age: { required: true, message: '请选择推送平台', trigger: 'change' },
        object: { required: true, message: '请选择推送对象', trigger: 'change' },
        phone: { required: true, message: '请输入推送手机号', trigger: 'blur' },
        h5: { required: true, message: '请选择跳转类型', trigger: 'change' },
        jumpurl: { required: true, message: '请输入跳转URL', trigger: 'blur' }
      },
      cityList: [],
      dateList:[
        {
          value: '1',
          label: '立即推送'
        },
        {
          value: '2',
          label: '指定时间推送'
        },
      ],
      platform: [],
      pushduixing:[],
      jumpType: [],
      ifdate: false,
      pushobject: ''
    }
  },
  methods: {
    handleSubmit (name) {
      if(this.formCustom.object == '1'){
        this.pushobject = this.formCustom.phone
      } 
      this.$refs[name].validate(valid => {
          // console.log(this.pushobject)
        if (valid) {
          let list = {
            typeCode: this.formCustom.city, // 消息类型
            mailTitle: this.formCustom.title, // 标题
            planPushTime: this.formCustom.datePicker, // 推送时间
            pushPlatform: this.formCustom.age, // 推送平台
            pushTarget: this.pushobject, //推送对象
            jumpType: this.formCustom.h5, // 跳转类型
            jumpUrl: this.formCustom.jumpurl , // 跳转url
          }
          this.http.post(BASE_URL + "/loan/webMail/saveWebMail",list).then(data=>{
            console.log(data)
          }).catch(err=>{
            console.log(err)
          })
          this.$Message.success('Success!')
        } else {
          // this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    pushphone (v) {
      if (v == '1') {
        this.push = true
      } else if(v == '0') {
        this.push = false
        this.pushobject = v
      }
      this.formCustom.object = v
    },
    homesenh5 (v) {
      // alert(v)
      if (v == 1) {
        this.homeh5 = true
      } else {
        this.homeh5 = false
      }
    },
    datepicker(v){
      if(v == '2'){
        
        this.ifdate = true
      } else if(v == '1') {
        this.ifdate = false
        this.formCustom.datePicker = utils.getNowFormatDate()
      }
    },
    //当前时间
    datepickerl(v){
      this.formCustom.datePicker = v
      // console.log(v)
    },
    messagetype(v){ // 消息类型
      // alert(v) 
      this.formCustom.city = v
    },
    pushplatform(v){
      // alert(v)
      this.formCustom.age = v
    }
  },
  created(){
    // 消息类型
    // /loan/webMail/getWebMailBaseData
    this.http.post(BASE_URL+"/loan/webMail/getWebMailBaseData",{}).then(data=>{
      // console.log(data.data.pushTarget)
      this.cityList = data.data.mailType
      // this.dateList = data.data.
      this.platform = data.data.pushPlat
      this.pushduixing = data.data.pushTarget
      this.jumpType = data.data.jumpType  
    }).catch(err=>{
      console.log(err)
    })
    
  //  utils.getNowFormatDate()
  }
}
</script>
<style lang="less" scoped>

</style>
