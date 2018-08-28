<template>
  <Row>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞金服&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;站内信编辑</span>
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
          <Input type="text" v-model="formCustom.title" autocomplete="off" placeholder="请输入标题" style="width: 400px"></Input>
        </FormItem>
        <FormItem label="推送时间:" prop="datePicker">
          <Select @on-change="datepicker" v-model="formCustom.datePicker" placeholder="请选择" style="width:200px">
            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker v-model="datevalue" v-if="ifdate" @on-change = "datepickerl" type="datetime" :options="options3" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 200px"></DatePicker>
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
        <FormItem label="跳转类型:" >
          <Row>
                <Col span="80" class="cleafix">
                    <FormItem prop="h5">
                      <Select v-model="formCustom.h5" placeholder="请选择" style="width:200px" @on-change="homesenh5">
                        <Option v-for="item in jumpType" :value="item.value" :key="item.value">{{ item.text }}</Option>
                      </Select>
                    </FormItem>
                </Col>
                <Col span="1" style="text-align: center"></Col>
                <Col span="80" class="cleafix">
                    <FormItem prop="value5" v-if="homeh5">
                      <Select v-model="formCustom.value5" @on-change='jumpurll' placeholder="请选择" style="width:200px" >
                        <Option v-for="item in jumplist" :value="item.value" :key="item.value">{{ item.text }}</Option>
                      </Select>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem v-if="detailscode" label="" prop="code" >
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formCustom.code" placeholder="请输入参数" style="width:200px"></Input>
        </FormItem>
        <FormItem label="跳转URL:" prop="jumpurl" v-if="!homeh5">
          <Input type="text" v-model="formCustom.jumpurl" placeholder="请输入跳转URL" style="width: 400px"></Input>
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
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formCustom: {
        title: '',
        passwdCheck: '',
        age: '',
        city: '',
        object: '',
        // value5: '',
        h5: '',
        jumpurl: '', 
        datePicker: '',
        code: ''
      },
      detailscode:false,
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
        phone: [
          { required: true, message: '请输入推送手机号', trigger: 'blur' },
          // { required: true, message: '请输入正确的推送手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
          ],
        h5: { required: true, message: '请选择跳转类型', trigger: 'change' },
        value5: { required: true, message: '请选择跳转页面', trigger: 'change' },
        jumpurl: { required: true, message: '请输入跳转URL', trigger: 'blur' },
        code: [
          { required: true, message: '请输入参数！', trigger: 'blur' }
        ]
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
      mailCode: ''
    }
  },
  methods: {
    handleSubmit (name) {
      let datetimel = Date.parse(new Date(this.datevalue))
      let datetimell = Date.parse(new Date())
      this.$refs[name].validate(valid => {
          if(this.datevalue == "" && this.ifdate == true){
              this.$Modal.warning({
                title: '指定时间',
                content: '<p>请选择指定时间</p>',
                onOk: () => {
                },
                onCancel: () => {           
                }
              })
              return false
          }
          if(datetimel <= datetimell && this.ifdate == true){
              this.$Modal.warning({
                title: '指定时间',
                content: '<p>指定时间不能小于当前时间</p>',
                onOk: () => {
                },
                onCancel: () => {           
                }
              })
              return false
          }
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
            jumpUrl: this.formCustom.jumpurl  == '' ? this.formCustom.value5 : this.formCustom.jumpurl + this.formCustom.code, // 跳转url
            targetPhone : this.formCustom.phone,
            mailCode : this.mailCode
          } 
          console.log(list)
          this.http.post(BASE_URL + tiurl,list).then(data=>{
            if(data.code == 'success'){
              this.phoneti('success')
            } else if(data.code == 100001){
              this.$Message.error(data.message)
            } else {
              this.$Message.error('提交失败!')
            }
          }).catch(err=>{
            this.$Message.error('提交失败!')
            // console.log(err)
          })
          // this.$Message.success('Success!')
        } else {
          // this.$Message.error('提交失败!')
        }
      })
    },
    handleReset (name) {
      this.$router.push({path: './applicationMail'})
      this.$refs[name].resetFields()
    },
    jumpurll(v){
      this.formCustom.jumpurl = v
      for (let i=0;i<this.jumplist.length;i++) {  
        if (v == this.jumplist[i].value) {         
          if (this.jumplist[i].isParam==1) {
            this.detailscode = true
            this.formCustom.code = ''
            return false
          }
        } else {
          this.detailscode = false
          this.formCustom.code = ''
        }
      }
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
        this.detailscode = false
        this.formCustom.code = ''
        this.homeh5 = false
        this.formCustom.jumpurl = ''
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
          this.mailCode = data.data.mailCode,
          this.formCustom.jumpurl = data.data.jumpType == 1 ? data.data.revertUrl : data.data.jumpurl
          
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
