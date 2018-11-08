<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
      </p>
    </div>
    <div v-show="this.auditType == 0" id="feedback_details" class="contentcss">
        <h3>审核详情</h3>
        <p>
          <span>信贷员:</span>
          <span>{{detailed}} &nbsp {{servicePhone}}</span>
        </p>
        <p>
          <span>提交时间:</span>
          <span>{{auditUpdateTime}}</span>
        </p>
        <div class="clearfix examine_con" >
          <span class="left">提交内容:</span>
          <div class="left examine_chi" style="width:750px">
            <div class="">
              <p><span>1.</span>贷款要求</p>
              <span>{{serviceLoanRequire}}</span>
            </div>
            <div class="">
              <p><span>2.</span>申请条件</p>
              <span>{{serviceApplyRequire}}</span>
            </div>
            <div class="">
              <p><span>3.</span>其他说明</p>
              <span>{{serviceOtherRequire}}</span>
            </div>
            </div>
        </div>
        <p v-if="this.auditMess != ''">
          <span>拒绝原因:</span>
          <span>{{auditMess}}</span>
        </p>
        <div class="mt50 marginauto">
          <Button v-if="examine" type="primary" @click="adopt">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button v-if="examine"  type="primary" @click="refuse">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="./dataReview"><Button type="ghost">返回</Button></router-link>
        </div>
				<!-- model 框 -->
				<Modal
					title="资料审核拒绝"
					v-model="modall"
					@on-ok="handleSubmit('formValidate')"
					@on-cancel="handleReset('formValidate')"
					ok-text="保存"
          cancel-text="取消"
					class-name="vertical-center-modal"
					:loading="loading"
					:mask-closable="false">
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="拒绝原因" prop="desc">
							<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审核拒绝原因"></Input>
						</FormItem>
					</Form>
    		</Modal>
    </div>
		<div v-show="this.auditType == 1" class="conmmon_img">
      <h3 class="h3">审核详情</h3>
      <div class="img">
        <span class="left">头像图片：</span>
        <img :src='this.imgurl' alt="">
      </div>
      <p v-if="this.auditMess != ''">
        <span>拒绝原因:</span>
        <span>{{auditMess}}</span>
      </p>
			<div class="mt50 marginauto1">
        <Button v-if="examine" type="primary" @click="adopt">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button v-if="examine"  type="primary" @click="refuse">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="./dataReview"><Button type="ghost">返回</Button></router-link>
      </div>

		</div>
     <!-- 所属区域审核旧 -->
    <div v-show="this.auditType == 2" id="feedback_details" class="contentcss">
        <h3>修改前详情</h3>
        <p>
          <span>信贷员:</span>
          <span>{{detailed}} &nbsp {{servicePhone}}</span>
        </p>
        <p>
          <span>提交时间:</span>
          <span>{{auditUpdateTime}}</span>
        </p>
        <p>
          <span>所属区域:</span>
          <span>{{loanCityNameFirstold}}</span>
        </p>
        <p>
          <span>所属公司:</span>
          <span>{{loanCompanyold}}</span>
        </p>
        <p class="imgProve">
          <span>工作证明:</span>
          <span> <img :src=loanJobImgold alt=""> </span>
        </p>
        <p v-if="this.auditMess != ''">
          <span>拒绝原因:</span>
          <span>{{auditMess}}</span>
        </p>
    </div>
    <!-- 所属区域 -->
    <div v-show="this.auditType == 2" id="feedback_details" class="contentcss">
        <h3>修改后详情</h3>
        <p>
          <span>信贷员:</span>
          <span>{{detailed}} &nbsp {{servicePhone}}</span>
        </p>
        <p>
          <span>提交时间:</span>
          <span>{{auditUpdateTime}}</span>
        </p>
        <p>
          <span>所属区域:</span>
          <span>{{loanCityNameFirst}}</span>
        </p>
        <p>
          <span>所属公司:</span>
          <span>{{loanCompany}}</span>
        </p>
        <p class="imgProve">
          <span>工作证明:</span>
          <span> <img :src=loanJobImg alt=""> </span>
        </p>
        <p v-if="this.auditMess != ''">
          <span>拒绝原因:</span>
          <span>{{auditMess}}</span>
        </p>
        <div class="mt50 marginauto">
          <Button v-if="examine" type="primary" @click="adopt">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button v-if="examine"  type="primary" @click="refuse">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="./dataReview"><Button type="ghost">返回</Button></router-link>
        </div>
				<!-- model 框 -->
				<Modal
					title="资料审核拒绝"
					v-model="modall"
					@on-ok="handleSubmit('formValidate')"
					@on-cancel="handleReset('formValidate')"
					ok-text="保存"
          cancel-text="取消"
					class-name="vertical-center-modal"
					:loading="loading"
					:mask-closable="false">
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="拒绝原因" prop="desc">
							<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审核拒绝原因"></Input>
						</FormItem>
					</Form>
    		</Modal>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      detailed: "",
      auditType: "",
      auditUpdateTime: "",
      serviceLoanRequire: "",
      serviceApplyRequire: "",
      serviceOtherRequire: "",
      loanCityNameFirst: "",
      loanCityNameFirstold: "",
      loanCompanyold: "",
      loanJobImgold: "",
      loanCompany: "",
      loanJobImg: "",
      servicePhone: "",
      examine: true,
      modall: false,
      formValidate: {
        desc: ""
      },
      ruleValidate: {
        desc: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" },
          {
            type: "string",
            max: 50,
            message: "拒绝原因不得多于50个字",
            trigger: "blur"
          }
        ]
      },
      loading: true,
      auditMessl: false,
      auditMess: "",
      // common: true,
      imgurl: ""
    };
  },
  created() {
    //判断是否审核通过
    if (this.$route.query.auditStatus == "0") {
      this.examine = true;
      this.auditMessl = false;
    } else {
      this.examine = false;
      this.auditMessl = true;
    }

    let data = {
      auditCode: this.$route.query.auditCode
    };
    this.http
      .post(
        BASE_URL + "/loan/officerServiceAudit/getOfficerServiceAuditDetail",
        data
      )
      .then(data => {
        this.auditType = data.data.auditType;
        this.detailed = data.data.realName;
        this.auditUpdateTime = data.data.auditUpdateTime;
        if (data.data.auditType == 0) {
          //拒绝服务介绍
          // this.common = true
          this.serviceLoanRequire = data.data.serviceLoanRequire;
          this.serviceApplyRequire = data.data.serviceApplyRequire;
          this.serviceOtherRequire = data.data.serviceOtherRequire;
          this.auditMess = data.data.auditMess;
        } else if (data.data.auditType == 1) {
          // 拒绝头像
          this.auditMess = data.data.auditMess;
          // this.common = false
          this.imgurl = data.data.loanPersonImg;
        } else if(data.data.auditType == 2){
          this.servicePhone = data.data.phoneMember
          this.loanCityNameFirst = data.data.loanCityNameFirst + data.data.loanCityNameSecond + data.data.loanCityNameThird +data.data.loanCityNameFourth//省
          this.loanCompany = data.data.loanCompany //公司信息
          this.loanJobImg = data.data.loanJobImg //工作证明
          this.loanCityNameFirstold = data.data.officerInfoCompanyRes.loanCityNameFirst + data.data.officerInfoCompanyRes.loanCityNameSecond + data.data.officerInfoCompanyRes.loanCityNameThird +data.data.officerInfoCompanyRes.loanCityNameFourth//省
          this.loanCompanyold = data.data.officerInfoCompanyRes.loanCompany //公司信息
          this.loanJobImgold = data.data.officerInfoCompanyRes.loanJobImg //工作证明
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //通过
    adopt() {
      this.$Modal.confirm({
        title: "认证审核",
        content: "<p>确认认证审核通过吗?</p>",
        onOk: () => {
          this.spost(0);
        },
        onCancel: () => {}
        // slot = 'footer'
      });
    },
    //拒绝
    refuse() {
      this.modall = true;
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spost(1);
          that.modall = false;
        } else {
          return this.changeLoading();
        }
      });
    },
    // 取消
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //审核
    spost(num) {
      let auditStatus;
      if (num == 0) {
        auditStatus = 1;
      } else {
        auditStatus = 2;
      }
      let list = {
        auditCode: this.$route.query.auditCode,
        auditMess: this.formValidate.desc,
        auditStatus: auditStatus
      };
      this.http
        .post(
          BASE_URL +
            "/loan/officerServiceAudit/updateOfficerServiceAuditCheckStatusByAuditCode",
          list
        )
        .then(resp => {
          if (resp.code == "success") {
            if (num == 0) {
              this.$router.push({ path: "./dataReview" });
            } else {
              this.tishi();
            }
          } else {
            this.$Message.info(resp.message);
            this.modall = false;
            this.$refs[name].resetFields();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tishi() {
      const title = "审核";
      let content;
      content = "<p>审核拒绝成功</p>";
      this.$Modal.success({
        title: title,
        content: content,
        onOk: () => {
          this.$router.push({ path: "./dataReview" });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.imgProve {
  vertical-align: top;
}
.imgProve span:nth-child(1){
  line-height: 0px;
}
.imgProve img {
  width: 200px;
  height: 200px;
  vertical-align: top;
}
.h3 {
  line-height: 50px;
  border-bottom: 1px solid #e7ecf1;
  margin-bottom: 20px;
}
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
    // text-align: center;
    margin-top: 20px;
  }
}
.evaluation_grade {
  display: inline-block;
  border: 1px solid #ff6600;
  line-height: 30px;
  padding: 0px 20px;
  color: #ff6600;
}
.examine_con {
  padding-left: 50px;
  margin-top: 0 !important;
  span {
    width: 100px;
    text-align: right;
    line-height: 40px;
  }
  .examine_chi {
    margin-top: 0 !important;
    margin-left: 5px;
    div {
      margin-top: 0 !important;
      margin-bottom: 20px;
      p {
        text-align: left;
        padding-left: 0 !important;
        span {
          width: auto !important;
          // text-align: left !important;
        }
      }
    }
  }
}
.marginauto {
  text-align: center;
}
.img {
  vertical-align: baseline;
}
.img > img {
  width: 500px;
  height: 500px;
}
.marginauto1 {
  margin-left: 73px;
}
</style>
