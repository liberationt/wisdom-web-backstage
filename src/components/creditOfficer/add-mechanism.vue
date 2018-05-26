<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3><span>添加</span>信贷机构资料</h3>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem label="封面图片" >
            <img v-bind:src=img alt="" class="mechimg">
            <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list='false'
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-success="handleSuccess"
            :on-error="handleError"
            >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
        </FormItem>
        <FormItem label="机构名称" prop="name">
            <Input v-model="formValidate.name" style="width: 300px" disabled></Input>
        </FormItem>
        <FormItem label="贷款额度"  class="clearfix">
                    <FormItem prop="date" class="left">
                        <Input  placeholder="起始金额" style="width: 150px" ></Input>
                    </FormItem>
                <span class="left ">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <FormItem prop="time" class="left">
                        <Input  placeholder="结束金额" style="width: 150px" ></Input>
                    </FormItem>
        </FormItem>
        <FormItem label="贷款类型" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="信用贷"></Checkbox>
                <Checkbox label="车抵贷"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="上架状态" prop="city">
            <Select v-model="formValidate.city" style="width: 300px" placeholder="上架状态">
                <Option value="beijing">上架</Option>
                <Option value="shanghai">下架</Option>
            </Select>
        </FormItem>
        <FormItem label="显示多少名信贷员" prop="mail">
            <Input v-model="formValidate.mail" style="width: 300px" placeholder="200">
            <span slot="append">个</span>
            </Input>
        </FormItem>
        <FormItem label="咨询呼叫号码" prop="gender">
            <Input v-model="formValidate.gender" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="首页推荐显示" prop="city">
            <Select v-model="formValidate.city" style="width: 300px" placeholder="首页推荐显示">
                <Option value="beijing">是</Option>
                <Option value="shanghai">否</Option>
            </Select>
        </FormItem>
        <FormItem label="机构简介" prop="desc">
            <Input v-model="formValidate.desc" style="width: 500px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入机构简介内容"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
        </FormItem>
      </Form>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
        name: '上海铭星投资金融有限公司',
        mail: '',
        city: '',
        gender: '400',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      img: require('../../image/default.jpg'),
      ruleValidate: {
        name: [
          { required: true, message: '请输入显示多少名信贷员', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入显示多少名信贷员', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择上架状态', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请输入呼叫号码', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '请选择贷款类型', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: '请输入起始金额', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: '请输入结束金额', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入机构简介', trigger: 'blur' }
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
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSuccess (res, file) {
      console.log(res)
      console.log(file)
    },
    handleError (error, file) {
      console.log(error)
      console.log(file)
    }
  }
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
    .mechimg{
      width: 100PX;
      vertical-align: middle
    }
    .ivu-upload{
      display: inline-block;
      margin-left: 10px
    }
}
</style>
