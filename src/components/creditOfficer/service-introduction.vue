<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置</span>
        </p>
      </div>
      <div class="homePage contentcss">        
        <Form class="p20" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem >
            <h1 class="homePage_h1">
                贷款要求模板内容
            </h1>
          </FormItem>
          <FormItem label="模板一" prop="descone">
            <Input style="width:500px" v-model="formValidate.descone" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem class="mt15" label="模板二" >
            <Input style="width:500px" v-model="desctwo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem class="mt15" label="模板三" >
            <Input style="width:500px" v-model="descthree" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>

          <FormItem >
              <h1 class="homePage_h1">
                贷款要求模板内容
              </h1>            
          </FormItem>
          <FormItem label="模板一" prop="applyone">
            <Input style="width:500px" v-model="formValidate.applyone" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem class="mt15" label="模板二" >
            <Input style="width:500px" v-model="applytwo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem class="mt15" label="模板三" >
            <Input style="width:500px" v-model="applythree" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
          </FormItem>

        </Form>
        <div class="homePage_center">
          <a href="javascript:;" class="homePage_submit"  @click="handleSubmit('formValidate')">提交保存</a>
          <!-- <a href="javascript:;" class="homePage_goback" @click="handleReset('formValidate')">返回</a> -->
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        desctwo:'',
        descthree:'',
        applytwo:'',
        applythree:'',
        loading:true,
      formValidate: {
          descone: '',
          applyone:''
      },
      ruleValidate: {
          descone: [
            { required: true, message: '请输入模板内容', trigger: 'blur' },
            { type: 'string', min: 30, message: '模板内容不少于30字符', trigger: 'blur' }
          ],
          applyone: [
            { required: true, message: '请输入模板内容', trigger: 'blur' },
            { type: 'string', min: 30, message: '模板内容不少于30字符', trigger: 'blur' }
          ]
      },
      checkbox: [],
      shareCodel: '',
      hidden:false
    };
  },
  components: {},
  created() {

    
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            
            
          } else {
              return this.changeLoading()

          }
        })
      },
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
        })
        },
  },
  mounted () {
    
  }
};
</script>
<style lang="less" scoped>
.homePage_button {
  width: 80px;
  border-radius: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
.homePage {
  margin-bottom: 25px;
  width: 100%;
  border-radius: 5px;
  // border: 1px solid #ccc;
  padding-bottom: 30px;
  padding-left: 20px;
  background: #fff
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
}

</style>
