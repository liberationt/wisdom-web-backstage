<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div v-if="common" id="feedback_details">
        <h3>审核详情</h3>
        <p>
          <span>信贷员:</span>
          <span>{{detailed}}</span>
        </p>
        <p>
          <span>提交时间:</span>
          <span>{{auditUpdateTime}}</span>
        </p>
        <div class="clearfix examine_con" >
          <span class="left">提交内容:</span>
          <div class="left examine_chi">
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
			<p v-if="auditMessl">
        <span>拒绝原因:</span>
        <span>{{auditMess}}</span>
      </p>
        <div class="mt50 marginauto">
          <Button v-if="examine" type="primary" @click="adopt">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button v-if="examine"  type="primary" @click="refuse">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="./creditManagement?num=1"><Button type="ghost">返回</Button></router-link>
        </div>
				<!-- model 框 -->
				<Modal
					title="资料审核拒绝"
					v-model="modal10"
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
		<div v-if="!common" class="conmmon_img">
      <h3 class="h3">审核详情</h3>
      <div class="img">
        <span class="left">头像图片：</span>
        <img :src='this.imgurl' alt="">
      </div>
			<div class="mt50 marginauto1">
        <Button v-if="examine" type="primary" @click="adopt">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button v-if="examine"  type="primary" @click="refuse">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="./creditManagement?num=1"><Button type="ghost">返回</Button></router-link>
      </div>
		</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      detailed: "",
      auditUpdateTime: "",
      serviceLoanRequire: "",
      serviceApplyRequire: "",
      serviceOtherRequire: "",
      examine: true,
      modal10: false,
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
      common: true,
      imgurl: ''
    };
  },
  mounted() {
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
        // console.log(data);
        if(data.data.auditType == 0){
          this.common = true
          this.detailed = data.data.realName;
          this.auditUpdateTime = data.data.auditUpdateTime;
          this.serviceLoanRequire = data.data.serviceLoanRequire;
          this.serviceApplyRequire = data.data.serviceApplyRequire;
          this.serviceOtherRequire = data.data.serviceOtherRequire;
          this.auditMess = data.data.auditMess;
        } else if(data.data.auditType == 1){
          this.common = false
          this.imgurl = data.data.loanPersonImg 
        }
        
      })
      .then(err => {
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
      });
    },
    //拒绝
    refuse() {
      this.modal10 = true;
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
          that.modal10 = false;
        } else {
          return this.changeLoading();
        }
      });
    },
    //取消
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
            const title = "审核";
            let content;
            if (num == 0) {
              content = "<p>审核成功</p>";
            } else {
              content = "<p>审核拒绝成功</p>";
            }
            this.$Modal.success({
              title: title,
              content: content,
              onOk: () => {
                this.$router.push({ path: "./creditManagement?num=1" });
              }
            });
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
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
  vertical-align:baseline;
}
.img > img {
  width: 500px;
  height: 500px;
}
.marginauto1 {
  margin-left: 73px;
}
</style>
