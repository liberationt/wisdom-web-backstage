<template>
	<div class="contentcss">
		<Row>
			<Col span="6">
			<div id="memberLeft">
				<div class="memberphoto">
					<img v-if="inform.loanStatus!=0" :src="inform.loanPersonImg" alt="" @click="bigimg(inform.loanPersonImg)">
					<img v-if="inform.loanStatus==0||inform.loanPersonImg==''" :src="require('../../image/moren.png')" alt="">
					<p>{{inform.phoneMember}}<Button type="info" class="ml10" @click="modifyModal = true">修改手机号</Button></p>
					<p class="stre_evaluate">
						<img v-for='(item, index) in img' v-bind:src='item' :key="index" alt=''>
					</p>
					<!-- <span class="member_type green1">账户正常</span> -->
					<Button class="ml10 mb15" v-if="inform.accountStatus == 0" type="info" shape="circle" @click="thaw(0)">解冻账户</Button>
					<Button class="ml10 mb15" type="error" shape="circle" v-if="inform.accountStatus == 1" @click="thaw(1)">冻结账户</Button>
          <Button class="ml10 mb15" type="info" shape="circle" v-if="inform.loanStatus == 2" @click="offidentification=true">取消认证</Button>
					<Button class="ml10 mb15" shape="circle" disabled v-if="inform.loanStatus != 2" >已取消认证</Button>
          <Button class="" v-if="inform.blackStatus == 0" type="primary" shape="circle" @click="blacklist(1)">加入退单黑名单</Button>
					<Button class="" type="error" shape="circle" v-if="inform.blackStatus == 1" @click="blacklist(0)">解除退单黑名单</Button>
				</div>
				<ul class="member_left_ul">
					<li>
						<Row>
							<Col span="12" class="vertical_bar">
							<span>充值赞豆:</span>
							<span></span>
							<strong>{{inform.virtualBalance}}</strong>
							</Col>
							<Col span="12">
							<span style="margin-left:0">赠送赞豆:</span>
							<strong>{{inform.virtualGiveBalance}}</strong>
							</Col>
						</Row>
					</li>
          <li>
						<span class="w60 tr displayib">现金余额:</span>
						<span>{{inform.cashBalance}}</span>
					</li>
          <li>
						<span class="w60 tr displayib">等级V{{inform.vipLevel}}:</span>
						<span>({{inform.vipValue}}V值)</span>
					</li>
          <li>
						<span class="w90 tr displayib">剩余退单权益:</span>
						<span>{{inform.rightCount}}次</span>
					</li>
          <li>
						<span class="w60 tr displayib">积分:</span>
						<span>{{inform.rewardPoints}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">姓名:</span>
						<span>{{inform.realName}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">性别:</span>
						<span>{{inform.gender}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">用户组:</span>
						<span>{{inform.vipStatusName}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">会员:</span>
						<span v-if="inform.vipStatus == 0 || inform.vipStatus == 2">未开通</span>
						<span v-if="inform.vipStatus == 1">{{inform.expireTime}}到期</span>
					</li>
					<li>
						<span class="w60 tr displayib">抢单券:</span>
						<span v-for="item in inform.accountTicket">{{item.ticketNumber}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">注册渠道:</span>
						<span>{{inform.channelCode}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">邀请人:</span>
						<span class="">{{inform.loanInviterCode}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">已邀请:</span>
						<span class="">{{inform.loanInviterCount}}</span>
					</li>
					<li>
						<span class="w50 tr displayib">注册:</span>
						<span>{{inform.registerTime}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">银行卡:</span>
						<span class="">{{inform.bank}}</span>
						<!-- <span>6544 ****2210</span> -->
					</li>
					<li>
						<Button type="primary" style="marginLeft:80px" @click="callUp()">拨打</button>
					</li>
				</ul>
			</div>
			</Col>
			<Col span="18">
			<div id="memberRight">
				<Tabs :animated="false" @on-click="tabswitch">
					<TabPane label="基本信息">
						<div class="basic">
							<p>
								<span>信贷员code:</span>
								<span>{{inform.loanOfficerCode}}</span>
							</p>
							<p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
								<span>所属区域:</span>
								<span>{{inform.loanLocationName}}</span>
							</p>
							<p v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">
								<span>所属公司:</span>
								<span>{{inform.loanCompany}}</span>
							</p>
							<p v-if="inform.serviceAmount!=null">
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">贷款额度:</span>
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">{{inform.serviceAmount}}</span>
							</p>
							<p v-if="inform.serviceRate!=null">
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">贷款利率:</span>
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">{{inform.serviceRate}}</span>
							</p>
							<p v-if="inform.loanHaveType && inform.loanHaveType.length>0">
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">擅长业务:</span>
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0" v-for="item in inform.loanHaveType">{{item}} </span>
							</p>
							<p v-if="inform.serviceTime!=null">
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">服务时间:</span>
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">{{inform.serviceTime}}</span>
							</p>
							<p v-if="inform.loanDeductionSet!=null">
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">扣费设置:</span>
								<span v-if="inform.loanStatus!=0||inform.loanBaseStatus!=0">{{inform.loanDeductionSet}}</span>
							</p>
              <div v-if="inform.officerRealLogList.length>0" v-for="(item,i) in inform.officerRealLogList">
                <p  class="credit_prove">
								<strong>第{{i+1}}次审核身份证</strong>
								<img :src='item.loanIdcardFrontImg' alt='' @click="bigimg(item.loanIdcardFrontImg)">
								<img :src='item.loanIdcardBackImg' alt='' @click="bigimg(item.loanIdcardBackImg)">
								<img :src='item.loanManualOperationImg' alt='' @click="bigimg(item.loanManualOperationImg)">
							</p>
							<p  class="credit_prove mt20 ">
								<strong>第{{i+1}}次审核工作证明</strong>
								<img v-bind:src="item.loanJobImg" alt="" @click="bigimg(item.loanJobImg)">
								<img v-bind:src="item.loanJobBusinessCardImg" alt="" @click="bigimg(item.loanJobBusinessCardImg)">
								<img v-bind:src="item.loanJobContractImg" alt="" @click="bigimg(item.loanJobContractImg)">
								<img v-bind:src="item.loanJobDoorGroupImg" alt="" @click="bigimg(item.loanJobDoorGroupImg)">
							</p>

              </div>
              
							<p v-if="inform.loanStatus!=0" class="credit_prove">
								<strong>身份证</strong>
								<img :src='inform.loanIdcardFrontImg' alt='' @click="bigimg(inform.loanIdcardFrontImg)">
								<img :src='inform.loanIdcardBackImg' alt='' @click="bigimg(inform.loanIdcardBackImg)">
								<img :src='inform.loanManualOperationImg' alt='' @click="bigimg(inform.loanManualOperationImg)">
							</p>
							<p v-if="inform.loanStatus!=0" class="credit_prove mt20 ">
								<strong>工作证明</strong>
								<img v-bind:src="inform.loanJobImg" alt="" @click="bigimg(inform.loanJobImg)">
								<img v-bind:src="inform.loanJobBusinessCardImg" alt="" @click="bigimg(inform.loanJobBusinessCardImg)">
								<img v-bind:src="inform.loanJobContractImg" alt="" @click="bigimg(inform.loanJobContractImg)">
								<img v-bind:src="inform.loanJobDoorGroupImg" alt="" @click="bigimg(inform.loanJobDoorGroupImg)">
							</p>

							<p>
								<span>认证状态:</span>
								<!-- <span v-if="inform.loanStatus==0&&inform.loanBaseStatus==0">未填基本信息</span> -->
								<span v-if="inform.loanStatus==0">未填实名信息</span>
								<span v-else-if="inform.loanStatus==1">待审核</span>
								<span v-else-if="inform.loanStatus==2">已入驻</span>
								<span v-else-if="inform.loanStatus==3">审核失败</span>
							</p>
							<p v-if="inform.loanStatus!=0 && inform.loanStatusMsg!=''">
								<span>拒绝原因:</span>
								<span>{{inform.loanStatusMsg}}</span>
							</p>

							<div class="mt20 service_introduction" v-if="inform.serviceIntroductionStatus==2">
								<h3><strong>服务介绍</strong></h3>
								<p>
									<span>1.</span> 贷款要求
								</p>
								<p>
									{{inform.serviceLoanRequire}}
								</p>
								<p>
									<span>2.</span> 申请条件
								</p>
								<p>
									{{inform.serviceApplyRequire}}
								</p>
								<p>
									<span>3.</span> 其它说明
								</p>
								<p>
									{{inform.serviceOtherRequire}}
								</p>
							</div>

							<!-- v-if="inform.loanStatus==1" -->
							<div class="mt50 tc left">
								<Button v-if="inform.loanStatus==1" type="primary" @click="handleRender">认证审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
								<Button v-if="inform.loanStatus==1" type="primary" @click="refuse">认证审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
								<Button type="primary" class="mr20" @click="journal">查看操作日志</Button>
								<Button type="ghost" @click="ationreturn">返回</Button>
								<Button v-if="isJurisdiction" type="primary" class="ml20" @click="Jurisdiction">调整赞豆余额</Button>
								<Button v-if="isJurisdiction2" type="primary" class="ml20" @click="Jurisbill">调整抢单劵</Button>
								<Button v-if="isJurisdiction3" type="primary" class="ml20" @click="JurisMember">调整会员</Button>
								<Button v-if="isJurisdiction4" type="primary" class="ml20" @click="JurisFace">调整人脸识别次数</Button>
								<!-- <Button type="ghost" @click="ationreturn">返回</Button> -->
							</div>
							<Modal title="认证审核拒绝" v-model="modal9" @on-ok="deterRefuse('formValidate')" ok-text="确认拒绝" cancel-text="关闭" class-name="vertical-center-modal" width="550" :loading="loading" :mask-closable="false">
								<div class="newtype_file mt15 mb15">
									<Form ref="formValidate" :model="formValidate" :rules="ruleInline" :label-width="80">
										<FormItem label="拒绝原因:" prop="name">
											<Input v-model="formValidate.name" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写审核拒绝原因"></Input>
										</FormItem>
									</Form>
								</div>
							</Modal>

							<!-- 查看大图弹框 -->
							<Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
								<img :src=this.imglink alt="" style="width:970px;height:890px;">
							</Modal>

							<!-- 调整赞豆余额 -->
							<Modal v-model="balanceBean" title="调整赞豆" @on-ok="addOk('formadjustment')" @on-cancel="addcancel('formadjustment')" :mask-closable="false" :loading="loading">
								<Form ref="formadjustment" :model="formadjustment" :rules="ruleadjustment" :label-width="80">
									<FormItem label="" class="clearfix">
										<Row>
											<Col span="7">
											<FormItem>
												<Select v-model="addzanBean" @on-change="zanBeanschange" style="width:100px">
													<Option v-for="item in addzambiaBalanceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
												</Select>
											</FormItem>
											</Col>
											<!-- <Col span="2" style="text-align: center"></Col> -->
											<Col span="17">
                      <Row>
											<Col span="10">
											<FormItem prop="zanBean">
												<Input v-model="formadjustment.zanBean" class="" style="width:120px">
												<span slot="append">赞豆</span>
												</Input>
											</FormItem>
											</Col>
											<!-- <Col span="2" style="text-align: center"></Col> -->
											<Col v-if="addzanBean==1" span="14">
											<FormItem prop="expireDay" >
												<Input v-model="formadjustment.expireDay" class="" style="width:120px">
												<span slot="append">天有效期</span>
												</Input>
											</FormItem>
											</Col>
										</Row>
											</Col>
										</Row>
									</FormItem>
									<FormItem label="" prop="reason" class="clearfix">
										<Input v-model="formadjustment.reason" type="textarea" :rows="4" placeholder="请填写原因" />
									</FormItem>
								</Form>
							</Modal>
							<!-- 调整抢单劵 -->
							<Modal v-model="balancebill" title="调整抢单劵" @on-ok="addOk('formadjustmentbill')" @on-cancel="addcancel ('formadjustmentbill')" :mask-closable="false" :loading="loading">
								<Form ref="formadjustmentbill" :model="formadjustmentbill" :rules="ruleadjustmentbill" :label-width="80">
									<FormItem label="" class="clearfix">
										<Row>
											<Col span="6">
											<FormItem>
												<Select v-model="addticket" style="width:100px">
													<Option v-for="item in addzanBeanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
												</Select>
											</FormItem>
											</Col>
											<!-- <Col span="2" style="text-align: center"></Col> -->
											<Col span="18">
                      <Row>
											<Col span="10">
											<FormItem prop="ticketNo" >
                        <Select  v-model="formadjustmentbill.ticketNo" class="" style="width:120px">
                              <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
                          </Select>
                      </FormItem>
											</Col>
											<!-- <Col span="2" style="text-align: center"></Col> -->
											<Col span="14">
											<FormItem prop="zanBean">
												<Input v-model="formadjustmentbill.zanBean" style="width:120px">
												<span slot="prepend">抢单劵</span>
                        <span slot="append">张</span>
												</Input>
											</FormItem>
											</Col>
										</Row>
											
											</Col>
										</Row>
									</FormItem>
									<FormItem label="" prop="reason" class="clearfix">
										<Input v-model="formadjustmentbill.reason" type="textarea" :rows="4" placeholder="请填写原因" />
									</FormItem>
								</Form>
							</Modal>
							<!-- 调整会员 -->
							<Modal v-model="balanceMember" title="调整会员" @on-ok="addOk('formadjustmentMember')" @on-cancel="addcancel ('formadjustmentMember')" :mask-closable="false" :loading="loading">
								<Form ref="formadjustmentMember" :model="formadjustmentMember" :rules="ruleadjustmentMember" :label-width="80">
									<FormItem label="" class="clearfix">
										<Row>
											<Col span="11">
											<FormItem>
												<Select v-model="addMember" style="width:140px">
													<Option v-for="item in addMemberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
												</Select>
											</FormItem>
											</Col>
											<Col span="2" style="text-align: center"></Col>
											<Col span="11">
											<FormItem prop="zanBean">
												<InputNumber class="left" :max="99999" :min="1" v-model="formadjustmentMember.zanBean"></InputNumber>
												<Button class="left" disabled>天会员</Button>
												<!-- <Input v-model="formadjustmentMember.zanBean" style="width:120px">
												<span slot="append">天会员</span> -->
												</Input>
											</FormItem>
											</Col>
										</Row>
									</FormItem>
									<FormItem label="" prop="reason" class="clearfix">
										<Input v-model="formadjustmentMember.reason" type="textarea" :rows="4" placeholder="请填写原因" />
									</FormItem>
								</Form>
							</Modal>
							<!-- 调整人脸识别次数 -->
							<Modal v-model="balanceFace" title="调整人脸识别次数" @on-ok="addOk('formadjustmentFace')" @on-cancel="addcancel ('formadjustmentFace')" :mask-closable="false" :loading="loading">
								<Form ref="formadjustmentFace" :model="formadjustmentFace" :rules="ruleadjustmentFace" :label-width="80">
									<FormItem label="" class="clearfix">
										<Row>
											<Col span="9">
											<FormItem>
												<Select v-model="addFace" style="width:140px">
													<Option v-for="item in addFaceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
												</Select>
											</FormItem>
											</Col>
											<Col span="2" style="text-align: center"></Col>
											<Col span="13">
											<FormItem prop="zanBean">
												<InputNumber class="left" :max="10" :min="1" v-model="formadjustmentFace.zanBean"></InputNumber>
												<Button class="left" disabled>次人脸识别次数</Button>
												<!-- <Input v-model="formadjustmentFace.zanBean" style="width:150px">
												<span slot="append">次人脸识别次数</span> -->
												</Input>
											</FormItem>
											</Col>
										</Row>
									</FormItem>
									<FormItem label="" prop="reason" class="clearfix">
										<Input v-model="formadjustmentFace.reason" type="textarea" :rows="4" placeholder="请填写原因" />
									</FormItem>
								</Form>
							</Modal>
						</div>
					</TabPane>
					<TabPane label="咨询订单记录">
						<Table border highlight-row :columns="columns1" :data="data1"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="抢单记录">
            <div class="clearfix">
            <div class="left clearfix">
              <ul class="querysty"> 
                <li>
                  <Select v-model="orderType" placeholder="订单类型" class="mr10" style="width:150px">
                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li>
                  <Select v-model="orderStatusZ" placeholder="订单状态" class="mr10" style="width:150px">
                    <Option v-for="item in orderStatusListZ" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <span>订单时间：</span>
                  <DatePicker type="date" :options="options3" v-model="sheetTime" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" v-model="sheetEndTime" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <li>
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="robbing(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>
            </div>
            
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns2" :data="data2"></Table>
            </div>
						
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="通话记录">
						<Table border highlight-row :columns="columns3" :data="data3"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="账户流水">
						<Select v-model="flowingWater" style="width:120px" @on-change="admissiontime">
							<Option value="0">账户流水</Option>
							<Option value="1">抢单劵流水</Option>
              <Option value="2">充值流水</Option>
              <Option value="3">优惠劵流水</Option>
              <Option value="4">赠送赞豆明细</Option>
              <Option value="5">抢单劵明细</Option>
						</Select>
						<div class="mt15">
							<Table border highlight-row :columns="columns" :data="data4"></Table>

						</div>

						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="评价记录">
						<Table border highlight-row :columns="columns5" :data="data5"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="邀请记录">
						<Table border highlight-row :columns="columns7" :data="data7"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="登录日志">
						<Table border highlight-row :columns="columns6" :data="data6"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<!-- 拨打记录 -->
					<TabPane label="拨打记录">
						<Table border highlight-row :columns="columns8" :data="data8"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<!-- 三期会员记录，甩单记录 -->
					<TabPane label="会员记录">
						<Table border highlight-row :columns="member" :data="memberList"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<TabPane label="甩单记录">
						<Select v-model="rejectionJl" @on-change="rejectionRegister" style="width:150px; margin-bottom:10px;">
							<Option value="0">我的甩单</Option>
							<Option value="1">我的接单</Option>
						</Select>
						<Table border highlight-row :columns="rejection" :data="rejectionList"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
					<!-- 5期  -->
					<TabPane label="抢单无忧&定制推送">
						<Select v-model="WorriesModal" @on-change="NoWorries" style="width:150px; margin-bottom:10px;">
							<Option value="0">抢单无忧</Option>
							<Option value="1">定制推送</Option>
						</Select>
						<Table border highlight-row :columns="worriesDate" :data="worriesList"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
          <!-- 积分明细 -->
          <TabPane label="积分明细">
						<span>累计签到：{{inform.continuousCheckInCount}}天</span>
						<Table border highlight-row :columns="jifenList" :data="jifen"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
          <TabPane label="退单权益明细">
						<Table border highlight-row :columns="detailsList" :data="detailsRefund"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
          <TabPane label="V值变动明细">
            <span>当前V值：{{vipValue}}</span>
						<Table border highlight-row :columns="vdetailschangesList" :data="vdetailschanges"></Table>
						<div class="tr mt15">
							<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
						</div>
					</TabPane>
				</Tabs>
			</div>
			</Col>
		</Row>
		<!-- 备注弹窗 -->
		<Modal v-model="dialMark" title="拨打标记" @on-ok="handleSubmit('formValidateli')" @on-cancel="handleReset('formValidateli')" ok-text="提交" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateli" :model="formValidateli" :rules="ruleValidateli" :label-width="100">
				<FormItem label="拨打备注：" prop="remarksOption">
					<Select v-model="formValidateli.remarksOption" style="width:260px" placeholder="请选择">
						<Option v-for="item in remarksOptionList" :value="item.remarkCode">{{item.remarkDesc}}</Option>
					</Select>
				</FormItem>
				<FormItem label="待办备注：" v-if="this.formValidateli.remarksOption == '1006'">
					<FormItem prop="standbyDesc">
						<Input v-model="formValidateli.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 修改手机号弹窗 -->
    <Modal v-model="modifyModal" title="修改手机号" @on-ok="PhoneSubmit('formValidatePhone')" @on-cancel="handleReset('formValidatePhone')" ok-text="修改" cancel-text="取消" :mask-closable='false' :loading="loading">
			<Form ref="formValidatePhone" :model="formValidatePhone" :rules="ruleValidatePhone" :label-width="100">
				<FormItem label="修改手机号：">
					<FormItem prop="userPhone">
						<Input v-model="formValidatePhone.userPhone" placeholder="请输入手机号"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 取消认证弹框 -->
    <Modal v-model="offidentification" title="取消认证" @on-ok="identificationSubmit('formValidateIdentification')" @on-cancel="handleReset('formValidateIdentification')" ok-text="取消认证" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateIdentification" :model="formValidateIdentification" :rules="ruleValidateIdentification" :label-width="100">
				<FormItem label="取消认证原因：">
					<FormItem prop="memo">
						<Input type="textarea" v-model="formValidateIdentification.memo" placeholder="请输入取消认证原因"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 加入退单黑名单弹框 -->
    <Modal v-model="inBlacklist" title="加入退单黑名单" @on-ok="blacklistStatus('formValidateinBlacklist',0)" @on-cancel="handleReset('formValidateinBlacklist')" ok-text="加入黑名单" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateinBlacklist" :model="formValidateinBlacklist" :rules="ruleValidateinBlacklist" :label-width="100">
				<FormItem label="输入原因：">
					<FormItem prop="memo">
						<Input type="textarea" v-model="formValidateinBlacklist.memo" placeholder="请输入加入退单黑名单原因"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 解除退单黑名单弹框 -->
    <Modal v-model="unBlacklist" title="解除退单黑名单" @on-ok="blacklistStatus('formValidateunBlacklist',1)" @on-cancel="handleReset('formValidateunBlacklist')" ok-text="解除黑名单" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateunBlacklist" :model="formValidateunBlacklist" :rules="ruleValidateunBlacklist" :label-width="100">
				<FormItem label="解除原因：">
					<FormItem prop="memo">
						<Input type="textarea" v-model="formValidateunBlacklist.memo" placeholder="请输入解除退单黑名单原因"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 解冻账户弹框 -->
    <Modal v-model="inFrozen" title="解冻账户" @on-ok="frozenStatus('formValidateinFrozen',1)" @on-cancel="handleReset('formValidateinFrozen')" ok-text="解冻账户" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateinFrozen" :model="formValidateinFrozen" :rules="ruleValidateinFrozen" :label-width="100">
				<FormItem label="输入原因：">
					<FormItem prop="memo">
						<Input type="textarea" v-model="formValidateinFrozen.memo" placeholder="请输入解冻原因"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <!-- 冻结账户弹框 -->
    <Modal v-model="unFrozen" title="冻结账户" @on-ok="frozenStatus('formValidateunFrozen',0)" @on-cancel="handleReset('formValidateunFrozen')" ok-text="冻结账户" cancel-text="关闭" :mask-closable='false' :loading="loading">
			<Form ref="formValidateunFrozen" :model="formValidateunFrozen" :rules="ruleValidateunFrozen" :label-width="100">
				<FormItem label="输入原因：">
					<FormItem prop="memo">
						<Input type="textarea" v-model="formValidateunFrozen.memo" placeholder="请输入冻结原因"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      modifyModal: false,
      rejectionJl: "0",
      WorriesModal: "0",
      remarksOptionList: [],
      dialMark: false,
      balancebill: false,
      balanceMember: false,
      balanceFace: false,
      offidentification:false,
      inBlacklist:false,//加入退单黑名单弹框
      unBlacklist:false,//解除退单黑名单弹框
      inFrozen:false,//解冻账户
      unFrozen:false,//冻结账户
      loading3: false,
      flowingWater: "0",
      cityList:[],//抢单劵list
      orderType:'',
      orderTypeList:[],
      orderStatusZ:'',
      orderStatusListZ:[],
      sheetTime:'',
      sheetEndTime:'',
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formValidateli: {
        remarksOption: "",
        standbyDesc: ""
      },
      ruleValidateli: {
        remarksOption: [
          {
            required: true,
            type: "string",
            message: "请选择待拨打备注",
            trigger: "change"
          }
        ],
        standbyDesc: [
          {
            required: true,
            message: "请填写待办备注",
            trigger: "blur"
          }
        ]
      },
      formValidatePhone:{
        userPhone:""
      },
      ruleValidatePhone:{
        userPhone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        ],
      },
      formValidateIdentification:{
        memo:""
      },
      ruleValidateIdentification:{
        memo:[
          { required: true, message: '请输入取消认证原因', trigger: 'blur' },
        ],
      },
      formValidateinBlacklist:{
        memo:""
      },
      ruleValidateinBlacklist:{
        memo:[
          { required: true, message: '请输入加入退单黑名单原因', trigger: 'blur' },
        ],
      },
      formValidateunBlacklist:{
        memo:""
      },
      ruleValidateunBlacklist:{
        memo:[
          { required: true, message: '请输入解除退单黑名单原因', trigger: 'blur' },
        ],
      },
      formValidateinFrozen:{
        memo:""
      },
      ruleValidateinFrozen:{
        memo:[
          { required: true, message: '请输入解冻原因', trigger: 'blur' },
        ],
      },
      formValidateunFrozen:{
        memo:""
      },
      ruleValidateunFrozen:{
        memo:[
          { required: true, message: '请输入冻结原因', trigger: 'blur' },
        ],
      },

      imglink: "",
      modal11: false,
      img: [],
      formValidate: {
        name: ""
      },
      formadjustment: {
        zanBean: "",
        reason: "",
        expireDay:''
      },
      formadjustmentbill: {
        zanBean: "",
        reason: "",
        ticketNo:''
      },
      formadjustmentMember: {
        zanBean: 1,
        reason: ""
      },
      formadjustmentFace: {
        zanBean: 1,
        reason: ""
      },
      modal9: false,
      loading: true,
      introduce: true,
      tabnum: 0,
      total: 0,
      startRow: 1,
      endRow: 10,
      name: "",
      addticket: "0",
      addMember: "0",
      addFace: "0",
      inform: {},
      ruleInline: {
        name: [
          {
            required: true,
            message: "请输入拒绝原因",
            trigger: "blur"
          },
          {
            max: 200,
            message: "输入内容超限，请重新输入",
            trigger: "blur"
          }
        ]
      },
      ruleadjustment: {
        zanBean: [
          {
            required: true,
            message: "请输入调整赞豆数量",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入正确的赞豆数量",
            pattern: /^\+?[1-9][0-9]*$/,
            trigger: "blur"
          }
        ],
        expireDay: [
          {
            required: true,
            message: "请输入调整赞豆有效期",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入正确的有效期",
            pattern: /^(0|\+?[1-9][0-9]{0,5})$/,
            trigger: "blur"
          }
        ],
        reason: [
          {
            required: true,
            message: "请输入调整原因",
            trigger: "blur"
          }
        ]
      },
      ruleadjustmentbill: {
        zanBean: [
          {
            required: true,
            message: "请输入调整抢单劵数量",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入正确的抢单劵数量",
            pattern: /^\+?[1-9][0-9]*$/,
            trigger: "blur"
          }
        ],
        ticketNo: [
          {
            required: true,
            type: "string",
            message: "请选择抢单劵编号",
            trigger: "change"
          }
        ],
        reason: [
          {
            required: true,
            message: "请输入调整原因",
            trigger: "blur"
          }
        ]
      },
      ruleadjustmentMember: {
        reason: [
          {
            required: true,
            message: "请输入调整原因",
            trigger: "blur"
          }
        ]
      },
      ruleadjustmentFace: {
        reason: [
          {
            required: true,
            message: "请输入调整原因",
            trigger: "blur"
          }
        ]
      },
      identity: [
        require("../../image/identity_id.jpg"),
        require("../../image/identity_id.jpg")
      ],
      columns: [],
      columns1: [
        {
          title: "订单时间",
          align: "center",
          minWidth: 180,
          key: "orderCreateTime"
        },
        {
          title: "订单编号",
          align: "center",
          minWidth: 200,
          key: "orderNum"
        },
        {
          title: "客户姓名",
          align: "center",
          minWidth: 120,
          key: "loanUserName"
        },
        {
          title: "手机",
          align: "center",
          minWidth: 160,
          key: "loanUserPhone"
        },
        {
          title: "订单状态",
          align: "center",
          minWidth: 120,
          key: "orderStatusName"
        },
        {
          title: "服务费用",
          align: "center",
          minWidth: 120,
          key: "serviceCost"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            let arr = [];
            if (params.row.orderStatusName == "已咨询") {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.orderStatusName != "已咨询"
                          ? "none"
                          : "inline-block"
                    },
                    on: {
                      click: () => {
                        this.$router.push(
                          "/cancellation?orderCode=" + params.row.orderCode
                        );
                      }
                    }
                  },
                  "退单"
                )
              );
            }
            return h("div", arr);
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: "抢单时间",
          align: "center",
          minWidth: 180,
          key: "orderCreateTime"
        },
        {
          title: "抢单编号",
          align: "center",
          minWidth: 200,
          key: "orderNum"
        },
        {
          title: "客户姓名",
          align: "center",
          minWidth: 120,
          key: "loanUserName"
        },
        {
          title: "手机",
          align: "center",
          minWidth: 160,
          key: "loanUserPhone"
        },
        {
          title: "支付方式",
          align: "center",
          minWidth: 160,
          key: "payTypeName"
        },
        {
						title: '订单类型',
						key: 'goodStatusName',
						minWidth: 150,
						align: 'center'
					},
        {
          title: "抢单费用",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let pushStatus = [];
            let payType = params.row.payType;
            let row = params.row;
            if (row.activityAmount == row.robbingAmount) {
              pushStatus.push(
                h(
                  "span",
                  {},
                  payType == 0
                    ? row.robbingAmount
                    : row.robbingAmount + "/" + row.ticketNumber + "张券"
                )
              );
            } else {
              pushStatus.push(
                h(
                  "span",
                  {
                    style: {
                      color: "#BEBEBE"
                    }
                  },
                  row.robbingAmount
                ),
                h("span", {}, "/"),
                h(
                  "span",
                  {},
                  payType == 0
                    ? row.activityAmount
                    : row.activityAmount + "/" + row.ticketNumber + "张券"
                )
              );
            }
            return h("div", pushStatus);
          }
        },
        {
          title: "订单状态",
          align: "center",
          minWidth: 100,
          key: "orderStatusName"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            let arr = [];
            if (params.row.orderStatusName == "已咨询") {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.orderStatusName != "已咨询"
                          ? "none"
                          : "inline-block"
                    },
                    on: {
                      click: () => {
                        this.$router.push(
                          "/cancellation?orderCode=" + params.row.orderCode
                        );
                      }
                    }
                  },
                  "退单"
                )
              );
            }
            return h("div", arr);
          }
        }
      ],
      data2: [],
      columns3: [
        {
          title: "通话时间",
          align: "center",
          minWidth: 180,
          key: "callEndTime"
        },
        {
          title: "手机",
          align: "center",
          minWidth: 160,
          key: "calledMobileNo"
        },
        {
          title: "流水编号",
          align: "center",
          minWidth: 200,
          key: "callNum"
        },
        {
          title: "通话时长",
          align: "center",
          minWidth: 120,
          key: "duration"
        },
        {
          title: "通话扣费",
          align: "center",
          minWidth: 120,
          key: "zanbiConsumer"
        }
      ],
      data3: [],
      columns4: [
        {
          title: "账户类型",
          align: "center",
          minWidth: 100,
          key: "accountBizCode"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          key: "bizDesc"
        },
        {
          title: "赞豆类型",
          align: "center",
          minWidth: 120,
          key: "bizDesc",
          render: (h, params) => {
            let flowType;
            if (params.row.flowType == 'RECHARGE_ZD') {
              flowType = '充值赞豆'
            } else if (params.row.flowType == 'GIVE_ZD') {
              flowType = '赠送赞豆'
            } else if (params.row.flowType == 'ZHYE') {
              flowType = '账户余额'
            }else{
              flowType = '其他'
            }
            return h("div", [h("span", {}, flowType)]);
          }
        },
        {
          title: "金额 (元)",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let amountAsFormat;
            if (params.row.type == 0) {
              amountAsFormat = "+" + params.row.amountAsFormat;
            } else if (params.row.type == 1) {
              amountAsFormat = "-" + params.row.amountAsFormat;
            } else if (params.row.type == 2) {
              amountAsFormat = params.row.amountAsFormat;
            }
            return h("div", [h("span", {}, amountAsFormat)]);
          }
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "bizRemark"
        },
        {
          title: "操作时间",
          align: "center",
          minWidth: 180,
          key: "time"
        }
      ],
      data4: [],
      columnsCoupon: [
        {
          title: "账户类型",
          align: "center",
          minWidth: 100,
          key: "ticketName"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          key: "businessDesc"
        },
        {
          title: "数量 (张)",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let alterTicketNumber;
            if (params.row.alterAction == 0) {
              alterTicketNumber = "+" + params.row.alterTicketNumber;
            } else if (params.row.alterAction == 1) {
              alterTicketNumber = "-" + params.row.alterTicketNumber;
            }
            return h("div", [h("span", {}, alterTicketNumber)]);
          }
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "memo"
        },
        {
          title: "操作时间",
          align: "center",
          minWidth: 180,
          key: "dataCreateTime"
        }
      ],
      // 充值流水
      rechargeflow : [
        {
          title: "类型",
          align: "center",
          minWidth: 100,
          key: "orderType"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          key: "businessDesc"
        },
        {
          title: "支付金额",
          align: "center",
          minWidth: 120,
          key: "payAmount"
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "memo"
        },
        {
          title: "操作时间",
          align: "center",
          minWidth: 180,
          key: "dataModifiedTime"
        }
      ],
      // 优惠券流水
      couponflow : [
        {
          title: "类型",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [h("span", {}, params.row.couponName+'-'+params.row.couponNo)]);
          }
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          key: "sourceDesc"
        },
        {
          title: "数量 (张)",
          align: "center",
          minWidth: 120,
          key: "couponNumber"
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "memo"
        },
        {
          title: "操作时间",
          align: "center",
          minWidth: 180,
          key: "dataModifiedTime"
        }
      ],
      // 赠送赞豆明细
      beanDetailed : [
        {
          title: "类型",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [h("span", {}, '赠送赞豆')]);
          }
        },
        {
          title: "数量",
          align: "center",
          minWidth: 120,
          key: "giveZd"
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "businessDesc"
        },
        {
          title: "状态",
          align: "center",
          minWidth: 120,
          key: "sourceDesc",
          render: (h, params) => {
            let state
            if (params.row.state == 0) {
              state = '未使用'
            } else if (params.row.state == 1) {
              state = '部分已使用'
            }  else if (params.row.state == 2) {
              state = '全部使用完'
            } else if (params.row.state == 3) {
              state = '已过期'
            }
            return h("div", [h("span", {}, state)]);
          }
        },
        {
          title: "过期时间",
          align: "center",
          minWidth: 180,
          key: "expireDate"
        }
      ],
      // 抢单劵明细
      grabDetails : [
        {
          title: "类型",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [h("span", {}, '抢单劵')]);
          }
        },
        {
          title: "数量 (张)",
          align: "center",
          minWidth: 120,
          key: "giveTicket"
        },
        {
          title: "备注",
          align: "center",
          minWidth: 120,
          key: "businessDesc"
        },
        {
          title: "状态",
          align: "center",
          minWidth: 120,
          key: "sourceDesc",
          render: (h, params) => {
            let state
            if (params.row.state == 0) {
              state = '未使用'
            } else if (params.row.state == 1) {
              state = '部分已使用'
            }  else if (params.row.state == 2) {
              state = '全部使用完'
            } else if (params.row.state == 3) {
              state = '已过期'
            }
            return h("div", [h("span", {}, state)]);
          }
        },
        {
          title: "过期时间",
          align: "center",
          minWidth: 180,
          key: "expireDate"
        }
      ],
      columns5: [
        {
          title: "评价时间",
          align: "center",
          minWidth: 180,
          key: "commentCreateTime"
        },
        {
          title: "订单编号",
          align: "center",
          minWidth: 180,
          key: "orderNum"
        },
        {
          title: "客户姓名",
          align: "center",
          minWidth: 100,
          key: "loanUserName"
        },
        {
          title: "手机",
          align: "center",
          minWidth: 160,
          key: "loanUserPhone"
        },
        {
          title: "评分",
          align: "center",
          key: "score",
          minWidth: 150,
          render: (h, params) => {
            let listimg = [];
            for (let i = 0; i < params.row.stars; i++) {
              listimg.push(
                h("img", {
                  attrs: {
                    src: require("../../image/pointed-star.png")
                  },
                  style: {
                    width: "20px",
                    height: "20px",
                    marginRight: "5px"
                  }
                })
              );
            }
            return h("div", listimg);
          }
        },
        {
          title: "内容",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    title: params.row.content
                  }
                },
                params.row.content
              )
            ]);
          }
        },
        {
          title: "评价状态",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let isPass;
            if (params.row.isPass == 0) {
              isPass = "待审核";
            } else if (params.row.isPass == 1) {
              isPass = "通过审核";
            } else if (params.row.isPass == 2) {
              isPass = "审核失败";
            }
            return h("div", [h("span", {}, isPass)]);
          }
        }
      ],
      data5: [],
      columns6: [
        {
          title: "登录时间",
          align: "center",
          key: "loginTime"
        },
        {
          title: "登录端口",
          align: "center",
          key: "loginPort"
        },
        {
          title: "登录设备",
          align: "center",
          key: "loginDevice"
        }
      ],
      data6: [],
      columns7: [
        {
          title: "邀请用户手机号",
          align: "center",
          minWidth: 160,
          key: "phoneNumber"
        },
        {
          title: "注册时间",
          align: "center",
          minWidth: 180,
          key: "registerTime"
        },
        {
          title: "实名",
          align: "center",
          minWidth: 100,
          key: "realName"
        },
        {
          title: "审核",
          align: "center",
          minWidth: 110,
          render: (h, params) => {
            let loanStatus;
            if (params.row.loanStatus == 0) {
              loanStatus = "注册无资料";
            } else if (params.row.loanStatus == 1) {
              loanStatus = "信贷员待审核";
            } else if (params.row.loanStatus == 2) {
              loanStatus = "审核通过";
            } else if (params.row.loanStatus == 3) {
              loanStatus = "审核失败";
            }
            return h("div", [h("span", {}, loanStatus)]);
          }
        },
        {
          title: "审核时间",
          align: "center",
          key: "loanStatusSuccessTime",
          minWidth: 180
        },
        {
          title: "邀请奖励",
          align: "center",
          key: "inviterVirtualCount",
          minWidth: 150
        }
      ],
      data7: [],
      columns8: [
        {
          title: "拨打时间",
          key: "dialStartTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "挂断时间",
          key: "dialEndTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "通话时长",
          key: "talkTime",
          align: "center",
          minWidth: 120
        },
        {
          title: "通话状态",
          key: " talkStatus ",
          align: "center",
          minWidth: 120,
          render(h, params) {
            let talkStatus = params.row.talkStatus;
            return h("div", [
              h(
                "span",
                {},
                talkStatus == 0
                  ? "初始默认值 "
                  : talkStatus == 1 ? "未接通" : "已接通"
              )
            ]);
          }
        },
        {
          title: "拨打坐席",
          key: "seatNo",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let seatname = params.row.seatNo + "   " + params.row.seatName;
            return h("span", seatname);
          }
        },
        {
          title: "通话备注",
          key: "remark",
          align: "center",
          minWidth: 180
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          minWidth: 120,
          render: (h, params) => {
            let remark = params.row.remark;
            if (!remark) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.dialMark = true;
                        this.dialCode = params.row.dialCode;
                      }
                    }
                  },
                  "备注"
                )
              ]);
            }
          }
        }
      ],
      data8: [],
      // 三期 会员
      member: [
        {
          title: "会员等级",
          key: "dialStartTime",
          align: "center",
          minWidth: 180,
          render(h, params) {
            return h("span", {}, "VIP");
          }
        },
        {
          title: "获取方式",
          key: "businessDesc",
          align: "center",
          minWidth: 180
        },
        {
          title: "增加天数",
          key: "days",
          align: "center",
          minWidth: 120
        },
        {
          title: "会员到期日",
          key: "expireTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        }
      ],
      memberList: [],
      // 甩单
      rejection: [
        {
          title: "申请时间",
          key: "submitTime",
          align: "center",
          minWidth: 170
        },
        {
          title: "审核时间",
          key: "auditTime",
          align: "center",
          minWidth: 170
        },
        {
          title: "订单编号",
          key: "swingOrderNo",
          align: "center",
          minWidth: 180
        },
        {
          title: "订单类型",
          key: "swingTitleTypeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "订单状态",
          key: "swingStatusName",
          align: "center",
          minWidth: 120
        },
        {
          title: "信贷员姓名",
          key: "loanOfficerName",
          align: "center",
          minWidth: 120
        },
        {
          title: "信贷员手机号",
          key: "loanOfficerPhone",
          align: "center",
          minWidth: 120
        },
        {
          title: "甩单费用",
          key: "swingOrderSum",
          align: "center",
          minWidth: 120
        }
      ],
      rejectionList: [],
      //抢单无忧&定制推送 抢单无忧
      worriesDate: [
        {
          title: "业务类型",
          key: "confType",
          align: "center",
          minWidth: 170,
					render(h, params) {
						let confType = params.row.confType;
						return h("div", [
							h(
								"span", {},
								confType == 0 ?
								"抢单无忧 " : "定制推送"
							)
						]);
					}
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          minWidth: 170
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "抢单单数",
          key: "orderCount",
          align: "center",
          minWidth: 120
        },
        {
          title: "抢单价格上限",
          key: "orderAmount",
          align: "center",
          minWidth: 120
        },
        {
          title: "客户条件",
          key: "detailConf",
          align: "center",
          minWidth: 200,
          ellipsis:'true',
          render: (h, params) => {
            return h('div', [
            h('span', {
              style: {
                width:'100%',
                display: 'inline-block',
                cursor:'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              },
              domProps: {
                title: params.row.detailConf
              }
            }, params.row.detailConf)
            ])
          }
        }
      ],
      worriesList: [],
      isJurisdiction: true,
      isJurisdiction2: true,
      isJurisdiction3: true,
      isJurisdiction4: true,
      balanceBean: false,
      addzanBean: "0",
      addzambiaBalanceList:[
        {
          value: "0",
          label: "增加充值赞豆"
        },
        {
          value: "1",
          label: "增加赠送赞豆"
        },
        {
          value: "2",
          label: "扣除充值赞豆"
        },
        {
          value: "3",
          label: "扣除赠送赞豆"
        }

      ],
      addzanBeanList: [
        {
          value: "0",
          label: "增加"
        },
        {
          value: "1",
          label: "扣除"
        }
      ],
      loading: true,
      addMemberList: [
        {
          value: "0",
          label: "增加"
        },
        {
          value: "1",
          label: "扣除"
        }
      ],
      addFaceList: [
        {
          value: "0",
          label: "增加"
        },
        {
          value: "1",
          label: "扣除"
        }
      ],
      jifen:[],
      jifenList:[
        {
          title: "时间",
          align: "center",
          minWidth: 180,
          key: "dataCreateTime"
        },
        {
          title: "操作类型",
          align: "center",
          minWidth: 180,
          key: "businessDesc"
        },
        {
          title: "数量",
          align: "center",
          minWidth: 100,
          key: "alterPoints",
          render: (h, params) => {
            let alterAction = params.row.alterAction,
            alterPoints =params.row.alterPoints
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px'
              },
              }, alterAction == 0 ? '+'+alterPoints : '-'+alterPoints),
            ])
          }
        },
        {
          title: "备注",
          align: "center",
          minWidth: 160,
          key: "memo"
        },
      ],
      detailsRefund:[],
      detailsList:[
        {
          title: "时间",
          align: "center",
          minWidth: 180,
          key: "dataCreateTime"
        },
        {
          title: "操作类型",
          align: "center",
          minWidth: 180,
          key: "businessDesc"
        },
        {
          title: "数量",
          align: "center",
          minWidth: 100,
          key: "alterNumName"
        }
      ],
      vdetailschanges:[],
      vdetailschangesList:[
        {
          title: "时间",
          align: "center",
          minWidth: 180,
          key: "time"
        },
        {
          title: "操作类型",
          align: "center",
          minWidth: 180,
          key: "operationType"
        },
        {
          title: "数量",
          align: "center",
          minWidth: 100,
          key: "operateValue",
          render: (h, params) => {
            let changeType 
            if (params.row.changeType == 0) {
              changeType = '+'
            } else if (params.row.changeType == 1) {
              changeType = '-'
            } else if (params.row.changeType == 2) {
              changeType = ''
            }
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px'
              },
              }, changeType+params.row.operateValue),
            ])
          }
        },
        {
          title: "变动后V值",
          align: "center",
          minWidth: 180,
          key: "afterValue"
        },
      ],
      vipValue:''

    };
  },
  methods: {
    // 解冻账户
    thaw(num) {
      if (num == 0) {
        this.inFrozen = true
      } else {
        this.unFrozen = true
      }
    },
    // 解冻/冻结账户
    frozenStatus(name,num) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let title
          let url
          let memo
          let accountStatus
          if (num == 0) {
            title = '冻结账户'
            memo = this.formValidateunFrozen.memo
            url = '/loan/officerInfo/updateOfficerInfoAccountStatusByCode'
          } else {
            title = '解冻账户'
            memo = this.formValidateinFrozen.memo
            url = '/loan/officerInfo/updateOfficerInfoAccountStatusByCode'
            
          }
          this.$Modal.confirm({
        title: title,
        content: "<p>确认要"+title+"吗？</p>",
        onOk: () => {
          this.httpPost(
            url,
            {
              loanOfficerCode: this.inform.loanOfficerCode,
              memo:memo,
              accountStatus : num
            },
            data => {
              if (data.code == "success") {
                this.inFrozen = false
                this.unFrozen = false
                this.information ()
              } else {
                //待定
                this.$Message.error(data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        onCancel: () => {
          this.loading = false
        }
      });
        } else {
          this.changeLoading();
        }
      })
    },
    blacklist (num) {//加入、解除黑名单
    if (num == 1) {
      this.inBlacklist = true
    } else {
      this.unBlacklist = true
    }

    },
    // 审核
    reviewthrough(num) {
      let loanStatusMsg;
      let loanStatus;
      if (num == 1) {
        loanStatusMsg = "";
        loanStatus = 2;
      } else {
        loanStatusMsg = this.formValidate.name;
        loanStatus = 3;
      }
      let list = {
        loanOfficerCode: this.inform.loanOfficerCode,
        loanStatus: loanStatus,
        loanStatusMsg: loanStatusMsg
      };
      this.http
        .post(BASE_URL + "/loan/officer/updateOfficerInfoLoanStatus", list)
        .then(resp => {
          if (resp.code == "success") {
            const title = "审核";
            let content;
            if (num != 1) {
              content = "<p>审核拒绝成功</p>";
              this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.$router.push({
                    path: "./admissionAudit"
                  });
                }
              });
            }
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 认证审核通过
    handleRender() {
      this.$Modal.confirm({
        title: "认证审核",
        content: "<p>确认认证审核通过吗?</p>",
        onOk: () => {
          this.$router.push("./admissionAudit");
          this.reviewthrough(1);
        },
        onCancel: () => {}
      });
    },
    // 认证审核拒绝
    refuse() {
      this.modal9 = true;
    },
    // 返回
    ationreturn() {
      window.history.go(-1);
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    deterRefuse(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        }
        this.changeLoading();
        this.modal9 = false;
        this.reviewthrough(0);
        this.formValidate.name = "";
      });
    },
    // 查看操作日志
    journal() {
      this.$router.push({
        path:
          "./operationLog?operationType=loanOfficerLog&loanOfficerCode=" +
          this.inform.loanOfficerCode
      });
    },
    // 基本信息
    information() {
      this.img = [];
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode
      };
      this.http
        .post(BASE_URL + "/loan/officer/getOfficerDetailInfo", list)
        .then(resp => {
          if (resp.code == "success") {
            this.inform = resp.data;
            for (let i = 0; i < resp.data.loanOfficerGrade; i++) {
              this.img.push(require("../../image/pointed-star.png"));
            }
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 邀请记录
    invitationRecord(startRow) {
      let list = {
        officerCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/officerInfo/queryInviterListByOfficer", list)
        .then(resp => {
          if (resp.code == "success") {
            this.data7 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.error(resp.message);
          }
        })
        .catch(() => {});
    },
    // 点击tab
    tabswitch(name) {
      this.tabnum = name;
      switch (name) {
        case 1:
          this.consultation(1);
          break;
        case 2:
          this.robbing(1);
          break;
        case 3:
          this.conversation(1);
					break;
        case 4:
          this.flowingWater = "0";
          this.cashflow(this.flowingWater,1); //现金流水
					break;
        case 5:
          this.evaluationrecord(1);
					break;
        case 6:
          this.invitationRecord(1);
					break;
        case 7:
          this.logonlog(1);
					break;
        case 8:
          this.dialEecord(1); //拨打记录
					break;
        case 9:
          this.memberRecord(1); //会员
					break;
        case 10:
          this.rejectionRecord(1); //甩单
					break;
				case 11:
					this.rushOrders(1); //抢单订单
          break;
        case 12:
          this.jifenListC(1) // 积分列表
          break;
        case 13:
          this.detailsmc(1) // 退单权益明细
          break;
        case 14:
          this.detailschangevn(1) // v值变动明细
          break;
      }
    },
    pageChange(page) {
      this.startRow = page;
      if (this.tabnum == 1) {
        this.consultation(page)  
      } else if (this.tabnum == 2) {
        this.robbing(page);
      } else if (this.tabnum == 3) {
        this.conversation(page);
      } else if (this.tabnum == 4) {
        this.cashflow(this.flowingWater,page); //现金流水
      } else if (this.tabnum == 5) {
        this.evaluationrecord(page);
      } else if (this.tabnum == 6) {
        this.invitationRecord(page);
      } else if (this.tabnum == 7) {
        this.logonlog(page);
      } else if (this.tabnum == 8) {
        this.dialEecord(page);
      } else if (this.tabnum == 9) {
        this.memberRecord(page);
      } else if (this.tabnum == 10) {
        this.rejectionRecord(page);
      } else if (this.tabnum == 11) {
        this.rushOrders(page);
      } else if (this.tabnum == 12) {
        this.jifenListC(page);
      } else if (this.tabnum == 13) {
        this.detailsmc(page);
      } else if (this.tabnum == 14) {
        this.detailschangevn(page);
      }
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      if (this.tabnum == 1) {
        this.consultation(this.startRow)  
      } else if (this.tabnum == 2) {
        this.robbing(this.startRow);
      } else if (this.tabnum == 3) {
        this.conversation(this.startRow);
      } else if (this.tabnum == 4) {
        this.cashflow(this.flowingWater,this.startRow); //现金流水
      } else if (this.tabnum == 5) {
        this.evaluationrecord(this.startRow);
      } else if (this.tabnum == 6) {
        this.invitationRecord(this.startRow);
      } else if (this.tabnum == 7) {
        this.logonlog(this.startRow);
      } else if (this.tabnum == 8) {
        this.dialEecord(this.startRow);
      } else if (this.tabnum == 9) {
        this.memberRecord(this.startRow);
      } else if (this.tabnum == 10) {
        this.rejectionRecord(this.startRow);
      } else if (this.tabnum == 11) {
        this.rushOrders(this.startRow);
      } else if (this.tabnum == 12) {
        this.jifenListC(this.startRow);
      } else if (this.tabnum == 13) {
        this.detailsmc(this.startRow);
      } else if (this.tabnum == 14) {
        this.detailschangevn(this.startRow);
      }
    },
    // 咨询订单
    consultation(startRow) {
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(
          BASE_URL + "/loan/baseOrder/queryOfficerBaseOrderConsultList",
          list
        )
        .then(resp => {
          if (resp.code == "success") {
            this.data1 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 抢单
    robbing(startRow) {
      let date1 = Date.parse(new Date(this.sheetTime == "" ? "" : utils.formatDate(this.sheetTime,'yyyy-MM-dd hh:mm:ss')));
      let date2 = Date.parse(new Date(this.sheetEndTime == "" ? "" : utils.formatDate(this.sheetEndTime,'yyyy-MM-dd 23:59:59')));
      if (date1 > date2) {
        this.isDatetime()
        return false
      }
      this.loading3 = true
      let llist = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        goodStatus: this.orderType == "''" ? "" : this.orderType, //订单类型
        status: this.orderStatusZ == "''" ? "" : this.orderStatusZ, // 订单状态
        beginTime :date1,
        endTime : date2,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/baseOrder/queryOfficerBaseOrderRobList", llist)
        .then(resp => {
          if (resp.code == "success") {
            this.data2 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
                this.loading3 = false
          } else {
            this.loading3 = false
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 通话记录
    conversation(startRow) {
      let llist = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/calllog/queryCallLogList", llist)
        .then(resp => {
          if (resp.code == "success") {
            this.data3 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 现金流水
    cashflow(num,startRow) {
      let llist = {
        userCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
      };
      let url;
      if (num == "0") {
        url = "/loan/tradeFlow/qiangDanXia/list";
      } else if(num == "1") {
        url = "/loan/accountTicket/queryTicketRecordPageList";
      } else if(num == "2") {
        url = "/loan/rechargeOrder/queryRechargeFlowList";
      } else if(num == "3") {
        url = "/loan/accountCoupon/queryCouponFlowList";
      } else if(num == "4") {
        url = "/loan/tradeFlow/qiangDanXia/givezdUsed/list";
      } else if(num == "5") {
        url = "/loan/accountTicket/queryTicketUsedPageList";
      }
      this.http
        .post(BASE_URL + url, llist)
        .then(resp => {
          if (resp.code == "success") {
            if (num == "0") {
              this.columns = this.columns4;
            } else if (num == '1') {
              this.columns = this.columnsCoupon;
            } else if (num == '2') {
              this.columns = this.rechargeflow;
            } else if (num == '3') {
              this.columns = this.couponflow;
            } else if (num == '4') {
              this.columns = this.beanDetailed;
            } else if (num == '5') {
              this.columns = this.grabDetails;
            }
            this.data4 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 评价记录
    evaluationrecord(startRow) {
      let llist = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
        // searchValue: "",
        // searchOptions: ""
      };
      this.http
        .post(BASE_URL + "/loan/comment/getCommentDetailsList", llist)
        .then(resp => {
          if (resp.code == "success") {
            this.data5 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 登录日志
    logonlog(startRow) {
      let llist = {
        userCode: this.$route.query.loanOfficerCode,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/officerInfo/queryOfficerLoginLog", llist)
        .then(resp => {
          if (resp.code == "success") {
            this.data6 = resp.data.dataList;
            this.total = Number(resp.data.total);
            this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 拨打记录
    dialEecord(startRow) {
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageSize: this.endRow,
        pageNum: startRow,
        seatType: 2
      };
      this.httpPost(
        "/sale/saleDialRecord/queryPageList4Manager",
        list,
        data => {
          if (data.code == "success") {
            const { dataList, total, startRow } = data.data;
            this.data8 = dataList;
            this.total = Number(total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 三期 会员记录
    memberRecord(startRow) {
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageSize: this.endRow,
        pageNum: startRow
      };
      this.httpPost(
        "/loan/viplog/queryPage",
        list,
        data => {
          if (data.code == "success") {
            const { dataList, total, startRow } = data.data;
            this.memberList = dataList;
            this.total = Number(total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //甩单记录
    rejectionRegister(v) {
      this.rejectionRecord(1);
    },
    rejectionRecord(startRow) {
      let list = {
        loanOfficerCode: this.$route.query.loanOfficerCode,
        pageSize: this.endRow,
        pageNum: startRow,
        orderType: this.rejectionJl //订单操作类型（0，我的甩单，1，我的接单） ,
      };
      this.httpPost(
        "/loan/swingOrderBase/queryOfficerInfoSwingOrderList",
        list,
        data => {
          if (data.code == "success") {
            const { dataList, total, startRow } = data.data;
            this.rejectionList = dataList;
            this.total = Number(total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    admissiontime(val) {
      this.flowingWater = val;
      this.startRow = 1;
      this.cashflow(this.flowingWater,1); //现金流水
    },
    bigimg(link) {
      this.imglink = link;
      this.modal11 = true;
      // window.location.href = link
    },
    //调整赞豆余额
    Jurisdiction() {
      this.balanceBean = true;
    },
    // 调整抢单劵数量
    Jurisbill() {
      this.balancebill = true;
    },
    // 调整会员
    JurisMember() {
      this.balanceMember = true;
    },
    // 调整人脸识别次数
    JurisFace() {
      this.balanceFace = true;
    },
    zanBeanschange (val) {


    },
    //添加调整赞豆余额
    addOk(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          let url;
          let list;
          if (name == "formadjustment") {//调整赞豆
            url = "/loan/account/change/balance";
            let changeType
            let accountType
            if (this.addzanBean=='0'||this.addzanBean=='1') {
              changeType = 0
            } else if (this.addzanBean=='2'||this.addzanBean=='3') {
              changeType = 1
            }
            if (this.addzanBean=='0'||this.addzanBean=='2') {
              accountType = 1
            } else if (this.addzanBean=='1'||this.addzanBean=='3') {
              accountType = 2
            }
            list = {
              changeType: changeType,
              accountType:accountType,
              changeAmount: this.formadjustment.zanBean,
              // expireDay:this.formadjustment.expireDay,
              remark: this.formadjustment.reason,
              userCode: this.$route.query.loanOfficerCode
            };
            if (this.addzanBean=='1') {
              list.expireDay = this.formadjustment.expireDay
            }
          } else if (name == "formadjustmentbill") {//调整抢单劵
            url = "/loan/accountTicket/changeTicketNumber";
            list = {
              userCode: this.$route.query.loanOfficerCode,
              remark: this.formadjustmentbill.reason,
              ticketList: [
                {
                  accountTicketType: "rob_ticket",
                  alterAction: this.addticket,
                  ticketNumber: this.formadjustmentbill.zanBean,
                  ticketNo: this.formadjustmentbill.ticketNo
                }
              ]
            };
          } else if (name == "formadjustmentMember") {
            url = "/loan/account/change/vip";
            if (this.formadjustmentMember.zanBean == null) {
              this.$Modal.warning({
                title: "提示",
                content: "<p>请输入会员天数</p>"
              });
              this.changeLoading();
              return false;
            }
            list = {
              userCode: this.$route.query.loanOfficerCode,
              remark: this.formadjustmentMember.reason,
              changeDays: this.formadjustmentMember.zanBean,
              changeType: this.addMember
            };
          } else {
            url = "/loan/officerInfo/adjustRealNameMonthTotal";
            if (this.formadjustmentFace.zanBean == null) {
              this.$Modal.warning({
                title: "提示",
                content: "<p>请输入人脸识别次数</p>"
              });
              this.changeLoading();
              return false;
            }
            list = {
              loanOfficerCode: this.$route.query.loanOfficerCode,
              msg: this.formadjustmentFace.reason,
              num: this.formadjustmentFace.zanBean,
              type: this.addFace
            };
          }
          this.http
            .post(BASE_URL + url, list)
            .then(data => {
              if (data.code == "success") {
                this.$Modal.success({
                  title: "温馨提示",
                  content: "保存成功",
                  onOk: () => {
                    this.balanceBean = false;
                    this.balancebill = false;
                    this.balanceFace = false;
                    this.balanceMember = false;
                    this.changeLoading();
                    this.information();
                    this.addzanBean = '0'
                    this.formadjustment.zanBean = "";
                    this.formadjustment.expireDay = ''
                    this.formadjustment.reason = "";
                    this.formadjustmentbill.zanBean = "";
                    this.formadjustmentbill.reason = "";
                    this.formadjustmentbill.ticketNo = ''
                    this.formadjustmentFace.reason = "";
                    this.formadjustmentFace.zanBean = 1;
                    this.formadjustmentMember.reason = "";
                    this.formadjustmentMember.zanBean = 1;
                  }
                });
              } else {
                this.$Message.error(data.message);
                this.changeLoading();
              }
            })
            .catch(err => {});
        }
      });
    },
    addcancel(name) {
      this.$refs[name].resetFields();
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 时间校验提示框
    isDatetime(){
      this.$Modal.warning({
        title: "提示",
        content: "<p>开始时间不得大于结束时间</p>"
      });
    },
    // 备注确认
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.httpPost(
            "/sale/saleDialRecord/saveDialRemark4KF",
            {
              agencyTime: "",
              dialCode: this.dialCode, //拨打记录code
              loanOfficerCode: this.$route.query.loanOfficerCode, //信贷员编号
              remark: this.formValidateli.standbyDesc, //备注内容
              remarkCode: this.formValidateli.remarksOption // 拨打备注
            },
            data => {
              if (data.code == "success") {
                this.dialEecord(1); //拨打记录
                this.changeLoading();
                this.$refs[name].resetFields(); //数据还原
                this.$Message.success(data.message);
                this.dialMark = false;
              } else {
                this.$refs[name].resetFields(); //数据还原
                this.dialMark = false;
                this.$Message.error(data.message);
                this.changeLoading();
              }
            },
            err => {
              this.$refs[name].resetFields(); //数据还原
              this.dialMark = false;
              this.$Message.error("服务出错啦，请稍等!");
              this.changeLoading();
            }
          );
        } else {
          this.changeLoading();
        }
      });
    },
    
    // 修改手机号
    PhoneSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.http.post(BASE_URL+'/sale/saleLoanOfficerInfo/getOfficerExitsByPhone?phone='+this.formValidatePhone.userPhone,{}).then(data=>{
            let httpUrl = "/sale/saleLoanOfficerInfo/updateLoanOfficerPhone"
            if(data.data.exits){
              this.$Modal.confirm({
              title: "修改手机号",
              content: "<p>更改后的手机号已注册，是否替换？</p>",
              onOk: () => {
                this.httpPost(
                  httpUrl,
                  {
                    oldLoanOfficerCode: this.inform.loanOfficerCode,
                    newLoanOfficerCode: data.data.loanOfficerCode,
                    newLoanOfficerPhone:this.formValidatePhone.userPhone,
                    newPhoneHasRegister: 1
                  },
                  data => {
                    if (data.code == "success") {
                      this.modifyModal = false
                      this.$Message.success(data.message);
                      //更新数据
                      this.information()
                    } else {
                      //待定
                      this.modifyModal = false
                      this.$Message.error(data.message);
                    }
                    this.formValidatePhone.userPhone=""
                    this.changeLoading();
                  },
                  err => {
                    console.log(err);
                  }
                );
              },
              onCancel: () => {}
            }); 
            } else {
              this.httpPost(
                  httpUrl,
                  {
                    oldLoanOfficerCode: this.inform.loanOfficerCode,
                    newLoanOfficerPhone:this.formValidatePhone.userPhone,
                    newPhoneHasRegister: 0
                  },
                  data => {
                    if (data.code == "success") {
                      this.modifyModal = false
                      this.$Message.success(data.message);
                      //更新数据
                      this.information()
                    } else {
                      //待定
                      this.modifyModal = false
                      this.$Message.error(data.message);
                    }
                    this.formValidatePhone.userPhone=""
                    this.changeLoading();
                  },
                  err => {
                    console.log(err);
                  }
                );
            }
          }).catch(err=>{console.log(err)})
        } else {
          this.changeLoading();
        }
        
      })
    },
    // 备注取消
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 取消认证
    identificationSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Modal.confirm({
        title: "取消认证",
        content: "<p>确认要取消认证吗？</p>",
        onOk: () => {
          this.httpPost(
            "/loan/officerInfo/cancelAuth",
            {
              loanOfficerCode: this.inform.loanOfficerCode,
              memo:this.formValidateIdentification.memo
            },
            data => {
              if (data.code == "success") {
                this.offidentification = false
                this.information ()
              } else {
                //待定
                this.$Message.error(data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        onCancel: () => {
          this.loading = false
        }
      });

        } else {
          this.changeLoading();
        }
        
      })
    },
    
    // 黑名单
    blacklistStatus(name,num) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let title
          let url
          let memo
          if (num == 0) {
            title = '加入退单黑名单'
            memo = this.formValidateinBlacklist.memo
            url = '/loan/officerInfo/addBlack'
          } else {
            title = '解除退单黑名单'
            memo = this.formValidateunBlacklist.memo
            url = '/loan/officerInfo/removeBlack'
          }
          this.$Modal.confirm({
        title: title,
        content: "<p>确认要"+title+"吗？</p>",
        onOk: () => {
          this.httpPost(
            url,
            {
              loanOfficerCode: this.inform.loanOfficerCode,
              memo:memo
            },
            data => {
              if (data.code == "success") {
                this.inBlacklist = false
                this.unBlacklist = false
                this.information ()
              } else {
                //待定
                this.$Message.error(data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        onCancel: () => {
          this.loading = false
        }
      });
        } else {
          this.changeLoading();
        }
      })
    },

    // 拨打备注选项
    optionList() {
      this.httpPost(
        "/sale/saleDialRemark/getDialRemarkList",
        {},
        data => {
          this.remarksOptionList = data.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 拨打电话
    callUp() {
      this.$Modal.confirm({
        title: "拨打电话",
        content: "<p>确认拨打" + this.inform.realName + "电话吗？</p>",
        onOk: () => {
          this.httpPost(
            "/sale/saleDialRecord/callLoanOfficer",
            {
              loanOfficerCode: this.inform.loanOfficerCode
            },
            data => {
              if (data.code == "success") {
                this.dialCode = data.data.dialRecordCode;
                this.$Message.success(data.message);
                this.dialMark = true;
              } else {
                //待定
                this.dialMark = false;
                this.$Message.error(data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        onCancel: () => {}
      });
    },
    // 抢单无忧
    NoWorries(v) {
      this.endRow = 10
      this.startRow = 1
      if (v == 1) {
				this.worriesDate.splice(3,2,{
          title: "接受时间范围",
          key: "auditTime",
          align: "center",
          width: 170,
					render(h, params) {
            let dateTime = params.row
						return h("div", [
							h(
								"span", {},
								dateTime.pushStartTime + '至' + (dateTime.pushEndTime ?  dateTime.pushEndTime:"")
							)
						]);
					}
        })
      } else {
				this.worriesDate.splice(3,1,{
          title: "抢单单数",
          key: "orderCount",
          align: "center",
          minWidth: 120,
        },
        {
          title: "抢单价格上限",
          key: "orderAmount",
          align: "center",
          minWidth: 120
        },)
			}
			// 抢单订单
      this.rushOrders(1)
    },
		// 抢单订单数据
		rushOrders(startRow){
			this.httpPost('/loan/loanOfficerCustomizeConfLog/queryPage',{loanOfficerCode:this.inform.loanOfficerCode,confType:this.WorriesModal,pageSize: this.endRow,
        pageNum: startRow},data=>{
				if(data.code == 'success'){
					this.worriesList = data.data.dataList
					this.total = Number(data.data.total);
					this.startRow =
						Math.ceil(data.data.startRow / this.endRow) == 0
							? 1
							: Math.ceil(data.data.startRow / this.endRow);
				}
			},err=>{})
    },
    // 积分列表
    jifenListC(startRow){
      this.http.post(BASE_URL+"/loan/rewardPoints/queryPage",{
        "officerCode": this.$route.query.loanOfficerCode,
        "pageNum": startRow,
        "pageSize": this.endRow}).then(data=>{
          if(data.code == 'success'){
            this.jifen = data.data.dataList
            this.total = Number(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        }).catch(err=>{console.log(err)})
    },
    // 退单权益明细
    detailsmc (startRow) {
      this.http.post(BASE_URL+"/loan/chargebackOderRightsFlow/queryPage",{
        "loanOfficerCode": this.$route.query.loanOfficerCode,
        "pageNum": startRow,
        "pageSize": this.endRow}).then(data=>{
          if(data.code == 'success'){
            this.detailsRefund = data.data.dataList
            this.total = Number(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        }).catch(err=>{console.log(err)})

    },
    // V值变动明细
    detailschangevn (startRow) {
      this.http.post(BASE_URL+"/loan/vValueDetail/queryPage",{
        "loanOfficerCode": this.$route.query.loanOfficerCode,
        "pageNum": startRow,
        "pageSize": this.endRow}).then(data=>{
          if(data.code == 'success'){
            this.vdetailschanges = data.data.dataList
            this.vipValue = data.data.vipValue
            this.total = Number(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        }).catch(err=>{console.log(err)})

    },
    // 接口封装
    httpPost(url, data, callback, errback) {
      this.http
        .post(BASE_URL + url, data)
        .then(data => {
          return callback(data);
        })
        .catch(err => {
          return errback(err);
        });
    },
    voucherNumber () {
      this.http.post(BASE_URL + '/loan/ticketManage/queryTicketNoList',{})
      .then((resp) => {
        if (resp.code == 'success') {
          this.cityList = resp.data
          
        } else {
          this.$Message.warning(resp.message);                 
        }
      })
      .catch(() => {
      })
    }
  },
  mounted() {
    this.information();
  },
  created() {
    this.voucherNumber ()
    this.optionList(); //拨打备注选项
    this.http
      .post(BASE_URL + "/checkUriPermission", ["/loan/account/change/balance"])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction = true;
            } else {
              this.isJurisdiction = false;
            }
          }
        }
      })
      .catch(err => {});
    this.http
      .post(BASE_URL + "/checkUriPermission", [
        "/loan/accountTicket/changeTicketNumber"
      ])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction2 = true;
            } else {
              this.isJurisdiction2 = false;
            }
          }
        }
      })
      .catch(err => {});
    this.http
      .post(BASE_URL + "/checkUriPermission", ["/loan/account/change/vip"])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction3 = true;
            } else {
              this.isJurisdiction3 = false;
            }
          }
        }
      })
      .catch(err => {});
    this.http
      .post(BASE_URL + "/checkUriPermission", [
        "/loan/officerInfo/adjustRealNameMonthTotal"
      ])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction4 = true;
            } else {
              this.isJurisdiction4 = false;
            }
          }
        }
      })
      .catch(err => {});
      // 抢单订单查询条件
    this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderRobListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        const {goodSatusBeans,statusOptions } = resp.data
        this.orderTypeList = goodSatusBeans
        this.orderStatusListZ = statusOptions
      } else {
        this.$Message.info(resp.message)
      }
    })
    .catch(() => {
    })
  }
};
</script>
<style lang="less" scoped>
#memberLeft {
  border: 1px solid #e7ecf1;
  .memberphoto {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      margin-top: 20px;
      border-radius: 50%;
    }
    p {
      line-height: 25px;
      margin: 15px 0;
    }
    .stre_evaluate {
      img {
        width: 20px;
        height: 20px;
        margin-top: 0;
      }
    }
  }
  .member_left_ul li {
    line-height: 50px;
    border-bottom: 1px solid #e7ecf1;
    // padding-left: 20px;
    span {
      margin-left: 20px;
    }
    .ivu-row {
      text-align: center;
    }
  }
  .member_left_ul li:last-child {
    border-bottom: 0;
  }
  .member_left_ul li:first-child {
    border-top: 1px solid #e7ecf1;
  }
}

#memberRight {
  padding: 0 20px;
  .basic {
    p {
      padding-left: 50px;
      span:first-child {
        line-height: 40px;
      }
    }
    .credit_prove {
      strong {
        display: block;
        margin-bottom: 10px;
      }
      img {
        width: 200px;
        vertical-align: top;
        margin-right: 20px;
      }
    }
  }
  .service_introduction {
    h3 {
      padding-left: 50px;
    }
  }
}

.vertical_bar {
  border-right: 1px solid #e7ecf1;
  span {
    margin-left: 0px !important;
  }
}

.ivu-tabs:after {
  padding-bottom: 130px;
}
</style>