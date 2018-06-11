<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3><span>添加</span>信贷员资料</h3>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem label="头像" >
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
        <FormItem label="手机" prop="phone">
            <Input v-model="formValidate.phone" style="width: 300px" disabled></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" style="width: 300px" disabled></Input>
        </FormItem>
        <FormItem label="所属区域" prop="province">
            <Select  v-model="formValidate.province" style="width:150px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
            <span class=" ">&nbsp;-&nbsp;</span>
            <Select v-model="formValidate.province" style="width:150px">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
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
        <FormItem label="身份证号" prop="identity">
            <Input v-model="formValidate.identity" style="width: 300px" disabled></Input>
        </FormItem>
        <FormItem label="" prop="identity">
            <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list='false'
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-success="handleSuccess"
            :on-error="handleError"
            >
        <Button type="ghost" class="identity_up">上传身份证正面</Button>
    </Upload>
    <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list='false'
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-success="handleSuccess"
            :on-error="handleError"
            >
        <Button type="ghost" class="identity_up">上传身份证反面</Button>
    </Upload>
    <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list='false'
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-success="handleSuccess"
            :on-error="handleError"
            >
        <Button type="ghost" class="identity_up">上传工作证明</Button>
    </Upload>
        </FormItem>
        <FormItem label="服务时间"  class="clearfix">
                    <FormItem prop="startTime" class="left">
                        <TimePicker format="HH:mm" confirm  placeholder="Select time" style="width: 112px"></TimePicker>
                    </FormItem>
                <span class="left ">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <FormItem prop="endTime" class="left">
                        <TimePicker format="HH:mm" confirm  placeholder="Select time" style="width: 112px"></TimePicker>
                    </FormItem>
        </FormItem>
        <FormItem label="扣费设置" prop="deductions">
            <Select v-model="formValidate.city" style="width: 300px" placeholder="请选择">
                <Option value="beijing">服务时间外下架不显示</Option>
                <Option value="shanghai">服务时间外客户可留言并扣费</Option>
            </Select>
        </FormItem>
        <FormItem label="上架状态" prop="city">
            <Select v-model="formValidate.city" style="width: 300px" placeholder="上架状态">
                <Option value="beijing">上架</Option>
                <Option value="shanghai">下架</Option>
            </Select>
        </FormItem>
        <FormItem label="首页推荐显示" prop="recommend">
            <Select v-model="formValidate.city" style="width: 300px" placeholder="首页推荐显示">
                <Option value="beijing">是</Option>
                <Option value="shanghai">否</Option>
            </Select>
        </FormItem>
        <FormItem label="详情介绍" prop="desc">
             <div class="editor-container mt5">
                    <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                </div>
        </FormItem>
        <FormItem class="tc">
            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
        </FormItem>
      </Form>
    </div>
</div>
</template>
<script>
import UE from '../../components/ue'
export default {
  components: {UE},
  data () {
    return {
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      formValidate: {
        phone: '13052002180',
        name: '唐哈哈',
        identity: '41272222222222222',
        mail: '',
        city: '',
        interest: [],
        date: '',
        time: '',
        desc: '',
        province: ''
      },
      cityList: [
        {
          value: '北京'
        },
        {
          value: '上海'
        },
        {
          value: '天津'
        },
        {
          value: '重庆'
        },
        {
          value: '河南'
        },
        {
          value: '安微'
        }
      ],
      cityList2: [
        {
          value: '朝阳区'
        },
        {
          value: '浦东新区'
        },
        {
          value: '滨海区'
        },
        {
          value: '解放碑'
        },
        {
          value: '中原区'
        },
        {
          value: '合肥'
        }
      ],
      img: require('../../image/head-portrait.jpg'),
      ruleValidate: {
        startTime: [
          { required: true, type: 'date', message: '请输入起始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, type: 'date', message: '请输入结束时间', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择所属地区', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择上架状态', trigger: 'change' }
        ],
        deductions: [
          { required: true, message: '请选择扣费设置', trigger: 'change' }
        ],
        recommend: [
          { required: true, message: '请选择首页推荐显示', trigger: 'change' }
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
          { required: true, message: '请输入详情介绍', trigger: 'blur' }
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
      vertical-align: middle;
      border-radius: 50%
    }
    .ivu-upload{
      display: inline-block;
      margin-left: 10px
    }
    .identity_up{
        width: 220px;
        height: 100px;
    }
}
</style>
