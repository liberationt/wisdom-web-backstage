
<template>
<div>
  <div class="navigation">
    <p>
      <span>忘记密码</span>
    </p>
  </div>
   <Row class="mt50">
        <Col span="8" offset="8">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" style="width:400px" :label-width="80">
            <FormItem label="原密码" prop="passwd" style="width:400px">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="新密码" prop="passwdCheck" style="width:400px">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="newpwd" style="width:400px">
                <Input type="password" v-model="formCustom.newpwd"></Input>
            </FormItem>
            <FormItem class="mt50 clearfix">
                <Button type="primary" class="w100 left ml20" @click="handleSubmit('formCustom')">保存</Button>
                <Button type="ghost" class="w100 right mr20" @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>

</div>
</template>
<script>
import utils from '../utils/utils'
// import { mapMutations } from "vuex";
export default {
  data () {
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        newpwd: '',
        loading: true,
      },
      ruleCustom: {
        newpwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位数', trigger: 'blur' },
          { type: 'string', max: 18, message: '密码长度不能多于18位', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位数', trigger: 'blur' },
          { type: 'string', max: 18, message: '密码长度不能多于18位', trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位数', trigger: 'blur' },
          { type: 'string', max: 18, message: '密码长度不能多于18位', trigger: 'blur' }
        ],
      
      }
    }
  },
  mounted() {
    // let that = this;
    // that.lefthidfalse()
  },
  methods: {
    // ...mapMutations(["lefthidfalse"]),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.formCustom.passwdCheck != this.formCustom.newpwd){
            this.changeLoading()
            const title = '密码有误'
            let content = '<p>请重新输入</p>'
            this.$Modal.warning({
              title: title,
              content: content,
            })
          } else {
              let passwd = {
                newPassword: this.formCustom.passwdCheck ,
                oldPassword: this.formCustom.passwd,
                reNewPassword: this.formCustom.newpwd ,
                userCode: utils.getCookie('userCode')
              }
              // console.log(passwd)
              this.http.post(BASE_URL + '/user/updatePassword',passwd).then(data=>{
                // console.log(data)
                if(data.code = 'success'){
                  this.changeLoading()
                  const title = '密码成功!'
                  let content = '<p>恭喜你密码已修改成功！</p>'
                  this.$Modal.warning({
                    title: title,
                    content: content
                  })
                  this.$refs[name].resetFields();
                } else {
                  this.changeLoading()
                  const title = '密码有误'
                  let content = '<p>'+data.message+'</p>'
                  this.$Modal.warning({
                    title: title,
                    content: content
                  })
                  this.$refs[name].resetFields();
                }
              }).catch(err=>{
                console.log(err)
              })
          }
        } else {
          this.$Message.success('校验失败');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
      this.$router.push({ path: '/' });
    },
    changeLoading() {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
  }
}
</script>
</script>
<style lang="less" scoped>
</style>
