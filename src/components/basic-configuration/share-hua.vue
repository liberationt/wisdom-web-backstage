<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服>&nbsp;基础配置</span>
        </p>
      </div>
      <div class="homePage">
        <h1 class="homePage_h1">
          分享配置
        </h1>
        <Form class="paddingRight" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="分享平台" prop="interest">
              <CheckboxGroup v-model="formValidate.interest">
                  <Checkbox v-for="item in checkbox" :label=item.value>{{item.label}}</Checkbox>
              </CheckboxGroup>
          </FormItem>
          <FormItem label="分享标题" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="分享文案" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="分享链接" prop="mail">
              <Input v-model="formValidate.mail" placeholder="请输入链接URL"></Input>
          </FormItem>
          <!-- <FormItem label="短链接" >
              <Input v-model="links" placeholder="短链接系统自动生成"></Input>
          </FormItem> -->
          <FormItem label="分享图片" >
            <img :src="formValidate.logoUrl" alt="" class="left icon_img">
            <Input v-show="hidden" v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5"></Input>
            <Upload
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError1"
              :before-upload="handleUpload"
              :show-upload-list="false"                        
              action=''>
                <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">选择</Button>
            </Upload>
          </FormItem>
        </Form>
        <hr>
        <div class="homePage_center">
          <a href="javascript:;" class="homePage_submit"  @click="handleSubmit('formValidate')">提交保存</a>
          <a href="javascript:;" class="homePage_goback" @click="handleReset('formValidate')">返回</a>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
          name: '',
          mail: '',
          interest: [],
          desc: '',
          logoUrl: require('../../image/moren.png'),
          productlogo:''
      },
      ruleValidate: {
          name: [
              { required: true, message: '请输入标题', trigger: 'blur' },
              { type: 'string', max: 30, message: '标题不能超过30个字', trigger: 'blur' }
          ],
          mail: [
              { required: true, message: '请输入URL', trigger: 'blur' },
          ],
          interest: [
              { required: true, type: 'array', min: 1, message: '请选择分享平台', trigger: 'change' },
              // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          desc: [
              { required: true, message: '请输入分享内容', trigger: 'blur' },
              { type: 'string', max: 80, message: '分享内容不能超过80个字', trigger: 'blur' }
          ]
      },
      checkbox: [],
      shareCodel: '',
      hidden:false
    };
  },
  components: {},
  created() {
    //默认图片地址
    // 获取分享配置
    // console.log(this.$route.query.isapp)
    let httpUrl
    if(this.$route.query.isapp == "xindai"){
      httpUrl = '/loan/officerInfo/getOfficerInfoLinkShare'
    } else if(this.$route.query.isapp == "huazan"){
      httpUrl = '/loan/userInfo/getUserInfoLinkShare'
    }
    this.http.post(BASE_URL + httpUrl,{}).then(data=>{
    if(data.code == 'success'){
      this.formValidate.name = data.data.title 
      this.formValidate.desc = data.data.text
      this.formValidate.mail = data.data.link 
      this.checkbox = data.data.sharePlatformList
      this.formValidate.productlogo = data.data.image
      this.formValidate.logoUrl = data.data.image
      this.shareCodel = data.data.shareCode
      data.data.sharePlatformList.forEach(v=>{//v==value　为arr项，i==index　为arr索引
          this.formValidate.interest.push(v.value)
      })
    }
    }).catch(err=>{})
    
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            let httpUrll
            if(this.$route.query.isapp == "xindai"){
              httpUrll = '/loan/officerInfo/saveOfficerInfoLinkShare' // 华赞
            } else if(this.$route.query.isapp == "huazan"){
              httpUrll = '/loan/userInfo/saveUserInfoLinkShare' //枪弹
            }
            this.http.post(BASE_URL + httpUrll,{
              image : this.formValidate.logoUrl,
              link : this.formValidate.mail,
              shareCode :  this.shareCodel,
              sharePlatformList : this.formValidate.interest,
              text : this.formValidate.desc,
              title : this.formValidate.name
            }).then(data=>{
              console.log(data)
              if(data.code == "success"){
                this.$Message.success('保存成功！');
              }
              // console.log(data)
            }).then(err=>{})
            
          } else {
            // console.log(this.formValidate.interest)
              this.$Message.error('保存失败!');
          }
        })
      },
      handleReset (name) {
        // this.$route.path("./bigimg")
        this.$router.push({ path: './bigimg' })  
      },
      handleFormatError1 (file) {
      // this.formValidate.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
      },
      handleUpload (file) {
        // console.log(file.name)
        let splic = file.name.split('.')
        if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
          let formData = new FormData();
            formData.append('file', file)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout:1000*60*5
          }
        this.http.post(BASE_URL + '/fileUpload', formData, config)
        .then((resp) => {
          if (resp.code == 'success') {
            this.formValidate.logoUrl = resp.data
            console.log(this.formValidate.logoUrl)
          } else {
          }
        })
        .catch(() => {
        })
          this.formValidate.productlogo = file.name
          return false
        }
      },  
  }
};
</script>
<style lang="less" scoped>
.homePage_center {
  width: 100%;
  text-align: center;
}
.homePage_submit,
.homePage_goback {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-top: 15px;
  border-radius: 5px;
}
.homePage_goback {
  background-color: #ccc;
  width: 40px;
  margin-left: 20px;
}
.homePage_submit {
  background-color: #3598dc;
  width: 80px;
  color: #fff;
}
hr {
  margin-top: 25px;
}
.homePage_button {
  width: 80px;
  border-radius: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
.paddingRight {
  padding-right: 40%;
}
.homePage {
  margin-bottom: 25px;
  width: 100%;
  border: 1px solid #ccc;
  padding-bottom: 30px;
  padding-left: 20px;
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
}
.icon_img {
  width: 100px;
  height: 100px;
}
</style>
