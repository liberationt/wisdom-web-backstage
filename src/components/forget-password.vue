
<template>
<div>
  <div class="navigation">
    <p>
      <span>忘记密码</span>
    </p>
  </div>
   <Row class="mt50">
        <Col span="10" offset="9">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" style="width:400px" :label-width="80">
            <FormItem label="原密码" prop="passwd" style="width:400px">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="新密码" prop="passwdCheck" style="width:400px">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem label="确认新密码" prop="age" style="width:400px">
                <Input type="text" v-model="formCustom.age" number></Input>
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
import { mapMutations } from "vuex";
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      }
    };
    const validateAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      }
    };  
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    let that = this;
    that.lefthidfalse()
  },
  methods: {
    ...mapMutations(["lefthidfalse"]),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
        //   this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
      this.$router.push({ path: '/' });
    }
  }
}
</script>
</script>
<style lang="less" scoped>
</style>
