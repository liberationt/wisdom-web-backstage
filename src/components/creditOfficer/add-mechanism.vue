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
        <FormItem label="贷款额度"  class="clearfix">
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
              <Checkbox v-for="item in checkbox" :label=item.typeCode>{{item.typeName}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="一句话简介" prop="introduction">
            <Input v-model="formValidate.introduction" style="width: 300px" placeholder="请输入一句话简介"></Input>
        </FormItem>
        <FormItem label="上架状态" prop="lowerframe">
          <Select @on-change = 'lowerstatus' v-model="formValidate.lowerframe" style="width: 300px" placeholder="上架状态">
              <Option value="1">上架</Option>
              <Option value="0">下架</Option>
          </Select>
        </FormItem>
        <FormItem label="显示多少名信贷员" prop="introductionl">
          <Input v-model="formValidate.introductionl" style="width: 300px" placeholder="200">
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
import untils from "../../utils/utils";
export default {
  data() {
    return {
      code: '',
      formValidate: {
        name: "上海铭星投资金融有限公司",
        introductionl: "",
        ishomepage: "",
        lowerframe: "",
        gender: "400",
        interest: [],
        date: "",
        endmoney: "",
        startmoney: "",
        productlogo: "",
        labelUrl: require("../../image/moren.png"),
        startinterest: "",
        endinterest: "",
        introduction: ""
      },
      img: require("../../image/default.jpg"),
      ruleValidate: {
        name: [
          { required: true, message: "请输入信贷名称", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入一句话简介", trigger: "blur" }
        ],
        introductionl: [
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
        startinterest: [
          { required: true, message: "请输入起始利率", trigger: "blur" }
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
          { required: true, message: "请输入起始金额", trigger: "blur" },
        ],
        endmoney: [
          { required: true, message: "请输入结束金额", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入机构简介", trigger: "blur" }],
        productlogo: [
          { required: true, message: "请选择图片", trigger: "blur" }
        ],
        endinterest: [
          { required: true, message: "请输入结束利率", trigger: "blur" }
        ]
      },
      checkbox: []
    };
  },
  methods: {
    handleSubmit(name) {
      let postUrl;
      if (this.$route.query.isedit == "is") {
        postUrl = "/loan/creditInstitutions/updateCreditInstitutionsByCode"; //编辑保存
        this.code = untils.getCookie('institutionsCode')
      } else {
        postUrl = "/loan/creditInstitutions/saveCreditInstitutions"; //添加保存
        this.code = ''
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.http
            .post(BASE_URL + postUrl, {
              institutionsPicture: this.formValidate.productlogo, //图片
              institutionsName: this.formValidate.name, //信贷机构名称
              loanStartRate: this.formValidate.startinterest, //上限利率
              loanEndRate: this.formValidate.endinterest, //起始利率
              institutionsLoanQuotasStart: this.formValidate.startmoney, // 贷款额度起始值
              institutionsLoanQuotasEnd: this.formValidate.endmoney, // 贷款额度上限值
              institutionsHaveType: this.formValidate.interest.join(";"), //贷款的类型
              institutionsUpStatus: this.formValidate.lowerframe, //上架状态
              institutionsLoanOfficer: this.formValidate.mail, //显示多名信贷员
              institutionsPhone: this.formValidate.gender, //咨询呼叫号码
              institutionsRecommendStatus: this.formValidate.ishomepage, //首页推荐显示
              institutionsShortMechanism:this.formValidate.introduction, // 一句话简介
              institutionsMechanism: this.formValidate.desc,
              institutionsCode: this.code
            })
            .then(data => {
              if (data.code == "success") {
                this.phoneti("success");
              }
            })
            .then(err => {
              console.log(err);
            });
        } else {
          // this.$Message.error("提交失败!");
        }
      });
    },
    // 提示
    phoneti(type) {
      // alert(type)
      const title = "温馨提示";
      const content = "<p>保存成功！</p>";
      switch (type) {
        case "success":
          this.$Modal.success({
            title: title,
            content: content,
            onOk: () => {
              this.$router.push({ path: "./creditManagement?num=" + 2 });
            }
          });
          break;
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$router.push({ path: "./creditManagement?num=" + 2 });
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
    lowerstatus(v) {
      this.formValidate.lowerframe = v;
    }
  },
  created() {
    this.http
      .post(BASE_URL + "/loan/creditInstitutions/getLoanTypeList", {})
      .then(data => {
        // console.log(data)
        if (data.code == "success") {
          this.checkbox = data.data.officerLoanTypeList;
          // data.data.officerLoanTypeList.forEach(v=>{//v==value　为arr项，i==index　为arr索引
          //   this.formValidate.typeName.push(v.label)
          // })
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (this.$route.query.isedit == "is") {
      this.http
        .post(
          BASE_URL + "/loan/creditInstitutions/getCreditInstitutionsByCode",
          { institutionsCode: untils.getCookie("institutionsCode") }
        )
        .then(data => {
          // console.log(data.data.institutionsLoanQuotasEnd)
          if (data.code == "success") {
            this.formValidate.labelUrl = data.data.institutionsPicture;
            this.formValidate.productlogo = data.data.institutionsPicture; //图片
            this.name = data.data.institutionsName; //信贷机构名称
            this.formValidate.startinterest = data.data.loanEndRate+''; //上限利率
            this.formValidate.endinterest = data.data.loanStartRate+''; //起始利率
            this.formValidate.startmoney =
              data.data.institutionsLoanQuotasStart+''; // 贷款额度起始值
            this.formValidate.endmoney = data.data.institutionsLoanQuotasEnd+''; // 贷款额度上限值
            this.formValidate.interest = data.data.institutionsHaveType.split(
              ";"
            ); //贷款的类型
            this.formValidate.lowerframe = data.data.institutionsUpStatus + ""; //上架状态
            this.formValidate.introductionl = data.data.institutionsLoanOfficer+''; //显示多名信贷员
            this.formValidate.gender = data.data.institutionsPhone; //咨询呼叫号码
            this.formValidate.ishomepage =
              data.data.institutionsRecommendStatus + ""; //首页推荐显示
            this.formValidate.desc = data.data.institutionsMechanism;
            this.formValidate.introduction = data.data.institutionsShortMechanism
          }
        })
        .catch(err => {
          console.log(err);
        });
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
