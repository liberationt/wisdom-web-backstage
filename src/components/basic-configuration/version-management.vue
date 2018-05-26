<template>
  <div>
    <h1 class="h1">版本管理</h1>
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服</span>
        </p>
    </div>
    <div class="addButton">
        <a href="javascript:;" @click="handleRender">
            <Icon type="plus-round"></Icon>
            添加版本
        </a>
    </div>
    <div class="version clearfix">
        <div class="version_img left">
            <img src="../../image/bg.jpg" alt="">
        </div>
        <div class="version_text">
            <p class="android right">安卓</p>
            <p class="version_text_version">V1.1.2</p>
            <p class="version_text_lian">com.weimob.dkwjk-1.1.2</p>
            <p class="version_text_xin">不更新</p>
        </div>
        <div class="version_footer">
            <span class="version_date">2018-05-10</span>
            <span class="version_icon" @click="handleRender">
                <Icon type="ios-copy-outline"></Icon>
            </span>
            <span class="version_icon" @click="handleRender">
                <Icon type="edit"></Icon>
            </span>
            <span class="version_icon">
                <Poptip
                    confirm
                    transfer
                    title="确认删除吗?"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                </Poptip>
            </span>
        </div>
    </div>
    <!-- 添加模板 -->
   <Modal
      title="添加(编辑)版本"
      v-model="modal8"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="abolish"
      ok-text="提交保存"
      cancel-text="关闭"
      class-name="vertical-center-modal"
      width="800"
      :mask-closable="false">
      <div class="newtype_file">
          <div class="newtype_leftfi clearfix">
            <p class="left">
                <span class="red">*</span>
                <span class="text">图标: </span>
            </p>
            <img src="../../image/application-hzjf.png" alt="" class="left">
            <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :show-upload-list="false"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </div>
        <!-- 表单 -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="版本号: " prop="name">
                <Input v-model="formValidate.name" placeholder="请输入版本号"></Input>
            </FormItem>
            <FormItem label="包名: " prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入包名"></Input>
            </FormItem>
            <FormItem label="操作系统: " prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="male">安卓</Radio>
                    <Radio label="female">iOS</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="版本状态: " prop="version">
                <RadioGroup v-model="formValidate.version">
                    <Radio label="male">不更新</Radio>
                    <Radio label="female">强制更新</Radio>
                    <Radio label="prompt">提示更新</Radio>
                    <Radio label="force">半强制更新,WiFi下更新</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="下载地址: " prop="address">
                <Input v-model="formValidate.address" placeholder="请输入下载地址"></Input>
            </FormItem>
            <FormItem label="升级标题: " prop="title">
                <Input v-model="formValidate.title" placeholder="请输入升级标题"></Input>
            </FormItem>
            <FormItem label="升级内容: " prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入升级内容"></Input>
            </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
 </template>
<script>
export default {
  data () {
    return {
      modal8: false,
      loading: true,
      value: '',
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        version: [],
        address: '',
        title: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入包名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择操作系统', trigger: 'change' }
        ],
        version: [
          { required: true, type: 'string', message: '请选择版本状态', trigger: 'change' }
        ],
        address: [
          { required: true, type: 'string', message: '请输入下载地址', trigger: 'change' }
        ],
        title: [
          { required: true, type: 'string', message: '请输入升级标题', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入升级内容', trigger: 'blur' },
          { type: 'string', min: 20, message: '升级内容不能少于20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  mounted: {},
  methods: {
    handleRender () {
      this.modal8 = true
    },
    abolish () {
      this.$Message.info('取消成功')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.loading = false
          this.modal8 = true
          // this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-btn.ivu-btn-ghost {
    margin-left: 20px;
    margin-top: 26px;
}
.newtype_leftfi {
    margin-bottom: 15px;
    margin-left: 22px;
}
.newtype_leftfi img {
  width: 100px;
  height: 100px;
}
.version_date {
  margin-right: 80px;
}
.version_footer {
  margin-top: 20px;
  margin-left: 7px;
}
.version_icon {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  cursor: pointer;
}
.version_icon:hover {
  background-color: rgb(226, 222, 222);
}
.version_text_lian {
  font-size: 14px;
}
.version_text {
  margin-top: 32px;
  margin-left: 110px;
}
.android {
  width: 45px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #fff;
  border-radius: 5px;
  background-color: #3399ff;
  font-size: 12px;
  margin-top: -20px;
  margin-right: 10px;
}
.version_img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-top: 18px;
  margin-left: 8px;
}
.version_img > img {
  width: 100%;
  height: 100%;
}
.version {
  width: 300px;
  height: 160px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
.addButton > a {
  display: block;
  width: 100px;
  text-align: center;
  border: 1px solid rgb(119, 118, 118);
  border-radius: 32px;
  height: 32px;
  line-height: 32px;
}
</style>
