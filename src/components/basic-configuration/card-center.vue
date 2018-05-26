<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;信用卡中心</span>
        </p>
      </div>	
			<Row :gutter="32">
        <Col span="12" class="demo-tabs-style2">
            <Tabs type="card">
                <TabPane label="银行管理">
									<p data-v-38176e38="" @click="modal1 = true" class="homePage_button"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加银行</p>
									    <Modal
												v-model="modal1"
												title="添加(编辑)银行"
												@on-ok="handleSubmit1('formValidate1')"
												@on-cancel="handleReset1('formValidate1')"
												:mask-closable="false"
												:loading='loading'>
												<div class="clearfix">
													<div class="upload_img left">
														<p><img src="../../image/bg.jpg" alt=""></p>
														<p>
															<Upload action="//jsonplaceholder.typicode.com/posts/">
																<Button type="ghost">上传文件</Button>
															</Upload>
														</p>
													</div>
													<div class="upload_information left">
														<Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
															<FormItem label="银行名称" prop="bankname">
																	<Input v-model="formValidate1.bankname" placeholder="请输入银行名称"></Input>
															</FormItem>
															<FormItem label="角标" prop="mark">
																	<Select v-model="formValidate1.mark" placeholder="有">
																			<Option value="has">有</Option>
																			<Option value="nohas">无</Option>
																	</Select>
															</FormItem>
															<FormItem label="角标图片" prop="markimg">
																<span class="mark_Img left"><img src="../../image/bg.jpg" alt=""></span>
																<Upload v-model="formValidate1.markimg" action="//jsonplaceholder.typicode.com/posts/">
																	<Button type="ghost">上传文件</Button>
																</Upload>
															</FormItem>
                              <FormItem label="银行名称" prop="desc">
																	<Input v-model="formValidate1.desc" placeholder="请输入银行名称"></Input>
															</FormItem>
														</Form>
													</div>
												</div>
											</Modal>
									 <ul class="homePage_icon left">
											<li>
												<p class="icon">
													<img src="../../image/bg.jpg" alt="">
												</p>
												<p class="homePage_text">贷款超市</p>
												<p class="clearfix haomePage_edit">
													<span @click="edit_icon_colorB" v-if="edit_icon_blue" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
													<span @click="edit_icon_colorR" v-if="edit_icon_red" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span>
													<span class="edit_icon right" @click="modal1 = true"><Icon type="edit"></Icon></span>
													<span class="edit_icon right" v-if="edit_delete">
															<Poptip
																	confirm
																	transfer
																	title="确认删除吗?"
																	@delete-ok="deleteOk"
																	@delete-cancel="deleteCancel">
																	<a href="javascript:;" ><Icon type="trash-b"></Icon></a>
															</Poptip>
													</span>
												</p>
											</li>
										</ul>
								</TabPane>
                <TabPane label="信用卡管理">
									 <p data-v-38176e38="" @click="modal2 = true" class="homePage_button"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加信用卡</p>
									  <Modal
											v-model="modal2"
											title="添加(编辑)信用卡"
											@on-ok="handleSubmit2('formValidate2')"
											@on-cancel="handleReset2('formValidate2')"
											:mask-closable="false"
											:loading="loading">
											<Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
												<FormItem label="信用卡名称：" prop="bank_name">
													<Input v-model="formValidate2.bank_name" placeholder="请输入信用卡名称"></Input>
												</FormItem>
												<FormItem label="信用卡图片：" prop="bank_img">
														<span  class="bank_name left"><img src="../../image/bg.jpg" alt=""></span>
													  <Upload action="//jsonplaceholder.typicode.com/posts/">
															<Button type="ghost">上传文件</Button>
														</Upload>
												</FormItem>
												<FormItem label="特点1：" prop="characteristic1">
													<Input v-model="formValidate2.characteristic1" placeholder="请输入特点1"></Input>
												</FormItem>
												<FormItem label="特点2：" prop="characteristic2">
													<Input v-model="formValidate2.characteristic2" placeholder="请输入特点2"></Input>
												</FormItem>
												<FormItem label="跳转URL：" prop="Jump_URL">
													<Input v-model="formValidate2.Jump_URL" placeholder="请输入URL"></Input>
												</FormItem>
											</Form>	
										</Modal>
									 <ul class="homePage_icon left">
											<li class="home_bank">
												<p class="bank_icon">
													<img src="../../image/bg.jpg" alt="">
												</p>
												<p class="bank_text">交通银行标准信用卡金卡</p>
												<p class="clearfix haomePage_edit">
													<span @click="edit_icon_colorB" v-if="edit_icon_blue" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
													<span @click="edit_icon_colorR" v-if="edit_icon_red" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span>
													<span class="edit_icon right"  @click="modal2 = true"><Icon type="edit"></Icon></span>
													<span class="edit_icon right" v-if="edit_delete">
														<Poptip
																confirm
																transfer
																title="确认删除吗?"
																@on-ok="deleteOk"
																@on-cancel="deleteCancel">
																<a href="javascript:;" ><Icon type="trash-b"></Icon></a>
														</Poptip>
													</span>
												</p>
											</li>
										</ul>
								</TabPane>
            </Tabs>
        </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      edit_delete: false,
      modal1: false,
      modal2: false,
      formValidate1: {
        bankname: "",
        mark: "",
        markimg: "",
        desc: ""
      },
      ruleValidate1: {
        bankname: [
          { required: true, message: "请输入银行名称！", trigger: "blur" }
        ],
        mark: [{ required: true, message: "请输入角标！", trigger: "change" }],
        markimg: [
          { required: true, message: "请选择上传文件！", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请输入URL！", trigger: "blur" }
        ]
      },
      formValidate2: {
     	  bank_name: "",
				characteristic1: "",
				characteristic2: "",
				Jump_URL: ""
      },
      ruleValidate2: {
        bank_name: [
          { required: true, message: "请输入银行名称！", trigger: "blur" }
        ],
				characteristic1: [
				  { required: true, message: "请输入特点1！", trigger: "blur" }
        ],
				characteristic2: [
          { required: true, message: "请输入特点2！", trigger: "blur" }
        ],
				Jump_URL: [
          { required: true, message: "请输入URL！", trigger: "blur" }
        ],
      },
      loading: true,
      edit_icon_blue: true,
      edit_icon_red: false
    };
  },
  methods: {
    ok() {
      this.$Message.info("点击了确定");
    },
    cancel() {
      this.$Message.info("点击了取消");
    },
    handleSubmit1(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.success("失败！");
          return this.changeLoading();
        } 
        setTimeout(() => {
        this.changeLoading();
        this.modal1 = false;
        this.$Message.success('done');
        }, 1000);
      });
    },
    handleReset1(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.success("失败！");
          return this.changeLoading();
        } 
        setTimeout(() => {
        this.changeLoading();
        this.modal2 = false;
        this.$Message.success('done');
        }, 1000);
      });
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
    },
    edit_icon_colorB() {
      this.edit_icon_blue = false;
      this.edit_icon_red = true;
      this.edit_delete = true;
    },
    edit_icon_colorR() {
      this.edit_icon_blue = true;
      this.edit_icon_red = false;
      this.edit_delete = false;
    },
    edit_ok() {
      this.$Message.info("Clicked ok");
    },
    edit_cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.bank_name >img {
	width: 140px;
	height: 80px;
	border-radius: 5px;
	margin-right: 20px;
}
.mark_Img > img {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
}
//model
.upload_img p > img {
  width: 80px;
  height: 80px;
}
//bank
.bank_text {
  font-size: 18px;
  line-height: 46px;
  margin-bottom: 8px;
}
.bank_icon {
  width: 240px;
  height: 149px;
}
.home_bank {
  width: 240px;
}
.bank_icon > img {
  width: 100%;
  height: 100%;
}
.edit_icon_blue {
  background-color: #1bbc9b;
  color: #fff;
}
.edit_icon_red {
  background-color: #e26a6a;
  color: #fff;
}
.edit_icon_blue:hover {
  background-color: #158f76;
}
.haomePage_edit {
  padding: 0 15px;
}
.homePage_button[data-v-38176e38] {
  height: 35px;
  line-height: 35px;
  width: 100px;
  margin-top: 20px;
}
.homePage_icon {
  margin-left: 0px;
  margin-right: 50px;
}
//tab

.layout-content {
  border-left: 1px solid #ccc;
}
.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.ivu-col-span-12 {
  width: 100%;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>


