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
          <FormItem prop="productlogo" label="封面图片" >
            <img :src="formValidate.labelUrl" alt="" class="mechimg">
            <Upload
            action=""
            :show-upload-list='false'
            :format="['jpg','jpeg','png', 'gif']"
            :max-size="2048"
            :before-upload="handleUploadicon"
            :on-format-error="handleFormatError1"
            >
        <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
        </FormItem>
        <FormItem label="机构名称" prop="name">
            <Input v-model="formValidate.name" style="width: 300px" disabled></Input>
        </FormItem>
        <FormItem label="贷款利率" prop="name"  class="clearfix">
          <FormItem prop="startinterest" class="left">
              <Input v-model="formValidate.startinterest"  placeholder="起始利率" style="width: 150px" ></Input>
          </FormItem>
          <span class="left ">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <FormItem prop="endinterest" class="left">
              <Input v-model='formValidate.endinterest'  placeholder="结束利率" style="width: 150px" ></Input>%
          </FormItem>
        </FormItem>
        <FormItem label="贷款额度" prop="name"  class="clearfix">
          <FormItem prop="startmoney" class="left">
              <Input v-model="formValidate.startmoney"  placeholder="起始金额" style="width: 150px" ></Input>
          </FormItem>
          <span class="left ">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <FormItem prop="endmoney" class="left">
              <Input v-model="formValidate.endmoney" placeholder="结束金额" style="width: 150px" ></Input>万元
          </FormItem>
        </FormItem>
        <FormItem label="贷款类型" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="信用贷"></Checkbox>
              <Checkbox label="车抵贷"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="上架状态" prop="lowerframe">
          <Select @on-change = 'lowerstatus' v-model="formValidate.lowerframe" style="width: 300px" placeholder="上架状态">
              <Option value="1">上架</Option>
              <Option value="0">下架</Option>
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
        <FormItem label="首页推荐显示" prop="ishomepage">
          <Select v-model="formValidate.ishomepage" style="width: 300px" placeholder="首页推荐显示">
              <Option value="1">是</Option>
              <Option value="0">否</Option>
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
  data() {
    return {
      formValidate: {
        name: "上海铭星投资金融有限公司",
        mail: "",
        ishomepage: "",
        lowerframe: "",
        gender: "400",
        interest: [],
        date: "",
        endmoney: "",
        startmoney: "",
        productlogo: "",
        labelUrl: require("../../image/moren.png"),
        startinterest:'',
        endinterest:''
      },
      img: require("../../image/default.jpg"),
      ruleValidate: {
        name: [
          { required: true, message: "请输入显示多少名信贷员", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入显示多少名信贷员", trigger: "blur" }
        ],
        ishomepage: [
          { required: true, message: "请选择上架状态", trigger: "change" }
        ],
        lowerframe: [
          { required: true, message: "请选择上下架状态", trigger: "change" }
        ],
        gender: [
          { required: true, message: "请输入呼叫号码", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择贷款类型",
            trigger: "change"
          }
        ],
        startmoney: [
          { required: true, message: '请输入起始金额', trigger: 'blur' },
          // { max: 5, message: '起始金额最多为4位数!', trigger: 'blur' },
          {required: true, message: '小数点后最多1位', pattern: /^[\d{1,8}(\.\d{1,2})?]+$/, trigger: 'blur'}
        ],
        endmoney: [
          { required: true, message: '请输入结束金额', trigger: 'blur' },
          { max: 4, message: '结束金额最多为4位数!', trigger: 'blur' },
        ],
        desc: [{ required: true, message: "请输入机构简介", trigger: "blur" }],
        productlogo: [{ required: true, message: "请选择图片", trigger: "blur" }],
        startinterest : [{ required: true, message: "请输入起始利率", trigger: "blur" }],
        endinterest : [{ required: true, message: "请输入结束利率", trigger: "blur" }],
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.http.post(BASE_URL+"/loan/creditInstitutions/saveCreditInstitutions",{
            institutionsPicture : this.formValidate.productlogo,
            institutionsName : this.name,
            loanStartRate : this.formValidate.startinterest,
            loanEndRate : this.formValidate.endinterest,
          }).then(data=>{
            console.log(data)
          }).then(er=>{
            console.log(err)
          })
          this.$Message.success("Success!");
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
   // 图片上传
    handleUploadicon(file) {
      let splic = file.name.split(".");
      if (
        splic[splic.length - 1] == "png" ||
        splic[splic.length - 1] == "jpg" ||
        splic[splic.length - 1] == "gif" ||
        splic[splic.length - 1] == "jpeg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.http
          .post(BASE_URL + "/fileUpload", formData, config)
          .then(resp => {
            if (resp.code == "success") {
              this.formValidate.labelUrl = resp.data;
              this.formValidate.productlogo = resp.data;
            } else {
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        return false;
      }
    },
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    lowerstatus(v){
      this.formValidate.lowerframe = v
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
  .mechimg {
    width: 150px;
    height: 150px;
    vertical-align: middle;
  }
  .ivu-upload {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
