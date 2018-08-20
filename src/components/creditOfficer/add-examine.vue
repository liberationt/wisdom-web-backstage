<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看订单详情</h3>
        <ul>
            <li>
                <span class="lh32 "><em class="red">*</em>产品名称：</span>
                <Input class="" v-model="value" placeholder="请输入产品名称" style="width: 300px"></Input>
            </li>
            <li class="clearfix mt15">
                <span class="left"><em class="red">*</em>产品详情：</span>
                <!-- <div class="editor-container left mt5">
                    <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                </div> -->
                <Input class="left" style="width: 600px" v-model="value6" type="textarea" :rows="4" placeholder="请输入产品详情" />
            </li>
        </ul>
        <div class="mt50">
            <Button type="primary" @click="handleSubmit()">提交保存</Button>
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
      value: "",
      value6: '',
      // institutionsCode: '',
      productCode: ''
      // defaultMsg: "这里是UE测试",
      // config: {
      //   initialFrameWidth: null,
      //   initialFrameHeight: 350
      // }
    };
  },
  // components: { UE },
  methods: {
    handleSubmit() {
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
        productDetail : this.value6,
        productName : this.value,
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
    },
    
  },
  created(){
      // console.log(this.$route.query.isedit,111)
      if(this.$route.query.isedit == 'is'){
        this.http.post(BASE_URL+"/loan/creditInstitutionsProduct/getCreditInstitutionsProductByCode",{productCode:utils.getCookie('productCode')}).then(data=>{
          console.log(data)
          if(data.code == 'success'){
            this.value6 = data.data.productDetail
            this.value = data.data.productName 
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
  div {
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
