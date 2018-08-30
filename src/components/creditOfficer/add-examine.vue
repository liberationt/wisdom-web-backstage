<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
      </p>
    </div>
    <div id="feedback_details" class="contentcss">
        <h3>查看订单详情</h3>
        <ul>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                <FormItem label="产品名称：" prop="value">
                  <Input v-model="formValidate.value" placeholder="请输入产品名称" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="产品详情：" prop="value6">
                  <Input v-model="formValidate.value6" style="width: 600px" type="textarea" placeholder="请输入产品详情"></Input>
                </FormItem>
            </Form>
        </ul>
        <div class="mt50 buttom_center">
            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
           	<router-link to="./toExamine"><Button type="ghost">返回</Button></router-link> 
        </div>
    </div>
</div>
</template>
<script>
// import UE from "../../components/ue";
import utils from "../../utils/utils"
export default {
  data() {
    return {
      formValidate :{
        value: "",
        value6: '',
      },
      productCode: '',
      ruleValidate: {
        value: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        value6: [
          { required: true, message: '请输入产品详情', trigger: 'blur' },
        ],
      },
    };
  },
  // components: { UE },
  methods: {
    handleSubmit(name) {
       this.$refs[name].validate((valid) => {
          if (valid) {
            let httpurl
            if(this.$route.query.isedit == 'is'){
              this.productCode = utils.getCookie('productCode')
              httpurl = "/loan/creditInstitutionsProduct/updateCreditInstitutionsProductByCode" //编辑保存
            } else {
              this.productCode = ""
              httpurl = "/loan/creditInstitutionsProduct/saveCreditInstitutionsProduct" // 添加保存
            }
            this.http.post(BASE_URL+httpurl,{
              institutionsCode : utils.getCookie('institutionsCode'),
              productDetail : this.formValidate.value6,
              productName : this.formValidate.value,
              productCode :  this.productCode
            }).then(data=>{
              console.log(data)
              if(data.code == 'success'){
                const title = "温馨提示";
                this.$Modal.success({
                  title: title,
                  content: "<p>保存成功</p>",
                  onOk: () => {
                    this.$router.push({ path: "././toExamine"});
                  }
                });
              } else {
                this.$Message.info('保存失败！');
              }
            }).catch(err=>{
              this.$Message.info('保存失败！');
            })     
          } else {
              // this.$Message.error('Fail!');
          }
        })
      
    },
    
  },
  created(){
      // console.log(this.$route.query.isedit,111)
      if(this.$route.query.isedit == 'is'){
        this.http.post(BASE_URL+"/loan/creditInstitutionsProduct/getCreditInstitutionsProductByCode",{productCode:utils.getCookie('productCode')}).then(data=>{
          console.log(data)
          if(data.code == 'success'){
            this.formValidate.value6 = data.data.productDetail
            this.formValidate.value = data.data.productName 
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
};
</script>
<style lang="less" scoped>
#feedback_details {
  border: 1px solid #e7ecf1;
  padding: 30px 50px;
  h3 {
    line-height: 50px;
    border-bottom: 1px solid #e7ecf1;
    margin-bottom: 20px;
  }
  p {
    line-height: 40px;
    padding-left: 50px;
    span:first-child {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
  }
  .buttom_center {
    text-align: center;
    // margin-top: 20px
  }
}
.evaluation_grade {
  display: inline-block;
  border: 1px solid #ff6600;
  line-height: 30px;
  padding: 0px 20px;
  color: #ff6600;
}
</style>
