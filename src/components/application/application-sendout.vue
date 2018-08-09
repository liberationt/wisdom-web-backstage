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
          <DatePicker v-model="datevalue" v-if="ifdate" @on-change = "datepickerl" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 200px"></DatePicker>
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
          <Select v-model="formCustom.value5" @on-change='jumpurl' placeholder="请选择" style="width:200px" v-if="homeh5">
            <Option v-for="item in jumplist" :value="item.value" :key="item.value">{{ item.text }}</Option>
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
      datevalue:'',
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
      pushobject: '',
      jumplist: [],
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
          console.log(this.datevalue)
          let tiurl 
          if(this.$route.query.isedit == 'is') {
            tiurl = '/loan/webMail/modifyMessageMailByCode'
          } else {
            tiurl = '/loan/webMail/saveWebMail'
          }
        if (valid) {
          let list = {
            // bunsinessKey: '0', //huazan 0 qiang 1
            typeCode: this.formCustom.city, // 消息类型
            mailTitle: this.formCustom.title, // 标题
            planPushTime: this.formCustom.datePicker == 2 ? utils.formatDate(this.datevalue,'yyyy-MM-dd hh:mm:ss') : this.formCustom.datePicker, // 推送时间
            pushPlatform: this.formCustom.age, // 推送平台
            pushTarget: this.formCustom.object, //推送对象
            jumpType: this.formCustom.h5, // 跳转类型
            jumpUrl: this.formCustom.jumpurl  == '' ? this.formCustom.value5 : this.formCustom.jumpurl, // 跳转url
            targetPhone : this.formCustom.phone
          } 
          console.log(list)
          this.http.post(BASE_URL + tiurl,list).then(data=>{
            if(data.code == 'success'){
              this.phoneti('success')
            } else {
              this.$Message.error('提交失败!')
            }
          }).catch(err=>{
            this.$Message.error('提交失败!')
            // console.log(err)
          })
          // this.$Message.success('Success!')
        } else {
          this.$Message.error('提交失败!')
        }
      })
    },
    handleReset (name) {
      this.$router.push({path: './applicationMail'})
      this.$refs[name].resetFields()
    },
    jumpurl(v){
      this.formCustom.jumpurl = v
    },
    // 提示
    phoneti(type) {
      // alert(type)
      const title = "温馨提示";
      const content = "<p>保存成功！</p>";
      switch (type) {
        case "success":
          this.$Modal.success({
            title: title,
            content: content,
            onOk: () => {
              this.$router.push({path: './applicationMail'})
            }
          });
        break;
      }
    },
    pushphone (v) {
      if (v == '1') {
        this.push = true
      } else if(v == '0') {
        this.push = false
        // this.pushobject = v
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
      this.datevalue = v
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
      this.jumplist = data.data.appJump  
    }).catch(err=>{
      console.log(err)
    })
    if(this.$route.query.isedit == 'is'){
      this.http.post(BASE_URL+"/loan/webMail/getWebMailByCode",{data:utils.getCookie('code')}).then(data=>{
        if(data.code == 'success'){
          this.formCustom.city  = data.data.typeCode
          this.formCustom.title = data.data.mailTitle 
          this.formCustom.datePicker = '2'
          this.datevalue = data.data.planPushTime
          this.formCustom.age = data.data.pushPlatform + '' 
          this.formCustom.object = data.data.pushTarget + ''
          this.formCustom.h5 = data.data.jumpType + ''
          this.formCustom.value5 = data.data.jumpUrl
          this.formCustom.phone = data.data.targetPhone
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  //  utils.getNowFormatDate()
  }
}
</script>
<style lang="less" scoped>

</style>
