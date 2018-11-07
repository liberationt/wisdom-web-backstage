
<template>
  <div id="logobj">
      <!-- 用户信息输入 -->
     <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
    <Form-item class="formLogin-title">
        <h3>后台系统登录</h3>
    </Form-item>
        <Form-item prop="username">
            <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </Form-item>
        <Form-item prop="password" class="errorhome">
            <i-input size="large"  type="password" v-model="formLogin.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
            <span class="red" v-if="hid">{{errcon}}</span>
        </Form-item>
          <Form-item class="login-no-bottom clearfix">           
            <Checkbox-group class="w150 left" v-model="formLogin.remember">
                <Checkbox label="记住密码" name="remember"></Checkbox>
            </Checkbox-group>
            <!-- <router-link to="/forgetpass" class="right forgetpas">修改密码</router-link> -->
            <!-- <a href="/forgetpass" >忘记密码</a> -->
        </Form-item>
        <Form-item class="login-no-bottom">
            <Row >
                <i-col  >
                    <Button type="primary" size="large" long @click="handleSubmit('formLogin')" :loading="loading">登录</Button >
                </i-col>
                <!-- <i-col :xs="{ span: 4, offset: 6 }">
                    <i-button  type="primary" @click="formLoginReset('formLogin')">重置</i-button>
                </i-col> -->
            </Row>
        </Form-item>
    </i-form>
  </div>
</template>

<script>
import utils from '../utils/utils'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      loading: false,
      hid: false,
      errcon: '',
      formLogin: {
        username: '',
        password: '',
        remember: []
      },
      formLoginRules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { type: 'string', max: 50, message: '密码长度不能多于50位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
          { type: 'string', max: 18, message: '密码长度不能多于18位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['menuTree','leftlist','lefthidtrue','showname']),
    handleSubmit (name) {
      let that = this
      that.$refs[name].validate((valid) => {        
        // sessionStorage.setItem('user', JSON.stringify(this.formLogin.username))
        if (valid) {
          that.changeLoading()
          let params = {
            'username': this.formLogin.username,
            'password': this.formLogin.password
          }
          // let BASE_URL
          this.http.post(BASE_URL + '/user/Login', params)
            .then((resp) => {
              if (resp.code == 'success') {
                this.hid = false
                that.menuTree(resp.data.userInfo)
                utils.putlocal('userInfo', JSON.stringify(resp.data.userInfo))
                utils.setCookie('user', JSON.stringify(this.formLogin.username), 1)
                utils.setCookie('userCode',resp.data.userInfo.userCode)
                utils.putlocal('headace', '0')
                // sessionStorage.setItem('userInfo', JSON.stringify(resp.data.userInfo))
                // sessionStorage.setItem('browse', 1)
                utils.putlocal('token', resp.data.token)
                // Vue.http.headers.common['Authentication'] = resp.data
                this.$Message.success('登录成功!')
                // for (var i = 0; i < resp.data.userInfo.menuInfo.children[0].path.length; i++) {
                //   var element = array[i];
                  
                // }
                if (resp.data.userInfo.menuInfo.children[0].path != '') {
                  this.$router.push({ path: resp.data.userInfo.menuInfo.children[0].path })
                  utils.putlocal("sideleft", "0");
                } else {
                  utils.putlocal("sideleft", "1");
                  this.$router.push({ path: resp.data.userInfo.menuInfo.children[0].children[0].children[0].path })          
                  let arrlist = resp.data.userInfo.menuInfo.children[0].children
                  that.leftlist(arrlist);
                  utils.putlocal("leftlist", JSON.stringify(arrlist));
                  that.lefthidtrue();                  
                }
                let menuname = resp.data.userInfo.menuInfo.children[0].menuName
                if (menuname == '应用管理') {
                  menuname = '应用首页'
                }
                that.showname(menuname);
                utils.putlocal("showname", menuname);
                
                utils.putlocal('lefthidden', '0')
                // location.reload()
              } else {
                this.errcon = resp.message
                this.hid = true
                // this.$Message.error(resp.message)
                // this.loading = false
                setTimeout(() => {
                    this.loading = false
                }, 1000)
                return false
              }
            })
            .catch(() => {
            })
        } else {
          this.hid = false
          return false      
        }
        if (this.formLogin.remember[0] == '记住密码') {
          utils.setCookie('username', JSON.stringify(this.formLogin.username), 7)
          utils.setCookie('password', JSON.stringify(this.formLogin.password), 7)
          // sessionStorage.setItem('username', JSON.stringify(this.formLogin.username))
          // sessionStorage.setItem('password', JSON.stringify(this.formLogin.password))
        } else {
          utils.delCookie('username')
          utils.delCookie('password')
        }
      })
    },
    formLoginReset (name) {
      this.$refs[name].resetFields()
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    }
  },
  mounted () {
    if (utils.getCookie('username')) {
      this.formLogin.username = JSON.parse(utils.getCookie('username'))
    }
    if (utils.getCookie('password')) {
      this.formLogin.password = JSON.parse(utils.getCookie('password'))
    }
  },
  created:function(){
    let _this = this;
    document.onkeydown = function(e){
      let _key = window.event.keyCode
      if(_key === 13){
        _this.handleSubmit('formLogin')
      }
    }
}
}
</script>

<style lang="less" scoped>
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
    #logobj{
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
        background: url(../image/bg.jpg);
        background-size:100% 120%;
        background-position: center 0;
        background-repeat: no-repeat;
        // background-size: cover;
    }
  .card-box {
    padding: 20px 40px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, .2);
    margin: 237px auto;
    width: 400px;
    color: #fff;
    /* border: 2px solid #8492A6;*/
    }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .formLogin-title {
    text-align: center;
    font-seze: 28px;
  }
  .formLogin-title h3{
    font-size: 18px;
  }
  .login-no-bottom {
    margin-bottom: 10px;
  }
  .ivu-btn-primary{
    background-color: rgb(4, 0, 255) !important;
  }
  .ivu-form-item .errorhome{
  margin-bottom: 0!important
}
.forgetpas{
  color: #fff;
}
.forgetpas:hover{
  color: #fff
}
</style>
