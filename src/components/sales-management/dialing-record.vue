<template>
	<div class="layoutconconmmon">
		<div class="headtop">
			<div class="headstyle">
				<div class="headleft">
					<img v-if="datatitle.headImg=='--'" :src="logoUrl" alt="">
					<img v-else :src="datatitle.headImg" alt="">
					<p>
						<strong>{{datatitle.phoneNumber}}</strong>
						<br>
						<span>姓名:{{datatitle.realName}}</span>
						<span v-if="datatitle.sex==0" class="ml10">性别:女</span>
						<span v-else-if="datatitle.sex==1" class="ml10">性别:男</span>
						<span v-else class="ml10">性别:--</span>
					</p>
				</div>
				<div class="headright">
					<span v-if="datatitle.loanStatus==2">区域:{{datatitle.loanCityNameFirst}}&nbsp;{{datatitle.loanCityNameSecond}}</span>
					<span v-if="datatitle.loanStatus==2" class="ml10">公司:{{datatitle.company}}</span>
					<span class="ml20">渠道:{{datatitle.channel}}</span>
					<span class="ml20">邀请人:{{datatitle.inviterName}} {{datatitle.inviter}}</span>
					<span class="ml20">已邀请:{{datatitle.inviterNumber}}人</span>
					<br>
					<span class="">注册:{{datatitle.registrationTime}}</span>
					<span class="ml20">最后登录:{{datatitle.lastLogTime}}</span>
					<span class="ml20">名单下放:{{datatitle.listDownTime}}</span>
				</div>
			</div>
		</div>
		<div class="contentcss">
			<Tabs :animated="false" :value="signs" @on-click="tabswitch">
				<TabPane label="拨打记录" name="0">
					<div class="mt15">
						<Table border highlight-row :columns="columns1" :data="data1"></Table>
					</div>
					<div class="tr mt15">
						<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
					<Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
						<p slot="header" style="text-align:left">
							<span>拨打备注</span>
						</p>
						<div style="text-align:left">
							<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
								<FormItem label="拨打备注" prop="memo">
									<!-- <span>拨打备注:</span> -->
									<Select v-model="formValidate.memo" @on-change="selremarks" placeholder="请选择" style="width:200px;">
										<Option v-for="item in remarkslist" :value="item.remarkCode" :key="item.remarkCode">{{ item.remarkDesc }}</Option>
									</Select>
								</FormItem>
								<FormItem v-if="engagement" label="待办时间" prop="time">
									<DatePicker type="datetime" :value="formValidate.time" @on-change="datepickerl" :options="options3" confirm placeholder="待办时间" style="width: 200px"></DatePicker>
								</FormItem>
								<FormItem v-if="engagement" label="待办备注" prop="remarks">
									<Input v-model="formValidate.remarks" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
								</FormItem>
								<FormItem v-if="customtype" label="自定义备注" prop="custom">
									<Input v-model="formValidate.custom" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
								</FormItem>
							</Form>
						</div>
						<div slot="footer">
							<Button type="default" @click="modalclose(1,'formValidate')">关闭</Button>
							<Button type="primary" :loading="modal_loading" @click="dialsub('formValidate')">提交</Button>
						</div>
					</Modal>
				</TabPane>
				<TabPane label="信贷员详情" name="1">
					<div class="mt15">
						<p class="titlebor">
							<strong class="f20">消费统计</strong>
							<span class="ml10">当前余额:</span>
							<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.balanceZd}}</strong>
							<span class="ml10">可用抢单券:</span>
							<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.reduceTicketNumber}}</strong>
						</p>
						<div>
							<ul class="datadisplay">
								<li>
									<span>累计充值笔数:</span>
									<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.totalRechargeCount}}</strong>
								</li>
								<li>
									<span class="ml10">累计充值赞豆:</span>
									<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.totalZdRecharge}}</strong>
								</li>
								<li>
									<span class="ml10">首充时间:</span>
									<span>{{creditOfficerlist.loanQueryRechargeInfoRes.firstRechargeTime}}</span>
								</li>
								<li>
									<span class="ml10">最后一次充值:</span>
									<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.lastZdRecharge}}</strong>
								</li>
								<li>
									<span class="ml10">最后一次充值时间:</span>
									<span>{{creditOfficerlist.loanQueryRechargeInfoRes.lastRechargeTime}}</span>
								</li>
								<br>
								<li>
									<span>累计消费笔数:</span>
									<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.totalConsumeCount}}</strong>
								</li>
								<li>
									<span class="ml10">累计消费:</span>
									<strong>{{creditOfficerlist.loanQueryRechargeInfoRes.totalConsumeZd}}</strong>
								</li>
								<li>
									<span class="ml10">最后一次消费时间:</span>
									<span>{{creditOfficerlist.loanQueryRechargeInfoRes.lastConsumeTime}}</span>
								</li>
							</ul>
						</div>
						<p class="titlebor mt20">
							<strong class="f20">基本信息</strong>
							<span class="ml10" v-if="creditOfficerlist.serviceAmount!='--'&&creditOfficerlist.serviceRate!='--'&&creditOfficerlist.loanHaveType.length>0&&creditOfficerlist.serviceTime!='--'&&creditOfficerlist.loanDeductionSet!='--'">最后一次更新时间：{{creditOfficerlist.loanLastUpdateTime}}</span>
						</p>
						<div v-if="creditOfficerlist.serviceAmount!='--'&&creditOfficerlist.serviceRate!='--'&&creditOfficerlist.loanHaveType.length>0&&creditOfficerlist.serviceTime!='--'&&creditOfficerlist.loanDeductionSet!='--'">
							<ul class="datadisplay">
								<li>
									<span>贷款额度:</span>
									<span>{{creditOfficerlist.serviceAmount}}</span>
								</li>
								<li>
									<span class="ml10">贷款利率:</span>
									<span>{{creditOfficerlist.serviceRate}}</span>
								</li>
								<li>
									<span class="ml10">擅长业务:</span>
									<span v-for="item in creditOfficerlist.loanHaveType">{{item}}&nbsp;</span>
								</li>
								<li>
									<span class="ml10">服务时间:</span>
									<span>{{creditOfficerlist.serviceTime}}</span>
								</li>
								<li>
									<span class="ml10">扣费设置:</span>
									<span>{{creditOfficerlist.loanDeductionSet}}</span>
								</li>
							</ul>
						</div>
						<div v-else>
							<p>未填写</p>
						</div>
						<p class="titlebor mt20">
							<strong class="f20">入驻信息</strong>
						</p>
						<div class="admission">
							<p v-if="creditOfficerlist.loanStatus==0">仅注册</p>
							<p v-if="creditOfficerlist.loanStatus==1">待审核</p>
							<p v-if="creditOfficerlist.loanStatus==2">已入驻<span class="ml20">审核完成时间:{{creditOfficerlist.loanStatusSuccessTime}}</span></p>
							<p v-if="creditOfficerlist.loanStatus==3">审核失败<span class="ml20">原因:{{creditOfficerlist.loanStatusMsg}} </span><span class="ml20">审核失败时间:{{creditOfficerlist.loanStatusFailureTime}}</span></p>
							<p><span>会员状态:{{creditOfficerlist.vipStatusName}}</span><span v-if="creditOfficerlist.vipStatus==1" class="ml20">会员到期日期:{{creditOfficerlist.expireTime}}</span></p>
						</div>
					</div>
				</TabPane>
				<TabPane label="进账记录" name="2">
					<Select v-model="flowingWater" style="width:100px" @on-change="admissiontime">
						<Option value="0">账户流水</Option>
						<Option value="1">抢单劵流水</Option>
						<Option value="2">充值流水</Option>
              			<Option value="3">优惠劵流水</Option>
						<Option value="4">赠送赞豆明细</Option>
              			<Option value="5">抢单劵明细</Option>
					</Select>
					<div class="mt15">
						<Table border highlight-row :columns="columns" :data="data2"></Table>
					</div>
					<div class="tr mt15">
						<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
				<TabPane label="抢单订单" name="3">
					<div class="mt15">
						<Table border highlight-row :columns="columns3" :data="data3"></Table>
					</div>
					<div class="tr mt15">
						<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
				<TabPane label="咨询订单" name="4">
					<div class="mt15">
						<Table border highlight-row :columns="columns4" :data="data4"></Table>
					</div>
					<div class="tr mt15">
						<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
				<TabPane label="邀请记录" name="5">
					<div class="mt15">
						<Table border highlight-row :columns="columns5" :data="data5"></Table>
					</div>
					<div class="tr mt15">
						<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
				<TabPane label="会员记录">
					<Table border highlight-row :columns="member" :data="memberList"></Table>
					<div class="tr mt15">
						<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
				<TabPane label="积分明细">
					<p class="mb15 mt15">累计签到:<span>{{checkinDays}}</span>天</p>
					<Table border highlight-row :columns="integral" :data="integralList"></Table>
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
		<Modal v-model="modal3" @on-visible-change="signchange" class-name="vertical-center-modal" :mask-closable="false">
			<p slot="header" style="text-align:left">
				<span>标记无效</span>
			</p>
			<div style="text-align:left">
				<Form ref="formValidateinvalid" :model="formValidateinvalid" :rules="ruleValidateinvalid" :label-width="180">
					<FormItem label="无效原因:" prop="custom">
						<Input v-model="formValidateinvalid.custom" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入无效原因" />
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="default" @click="modalclose(2,'formValidateinvalid')">关闭</Button>
				<Button type="primary" :loading="modal_loading" @click="invalidMark('formValidateinvalid')">提交审核</Button>
			</div>
		</Modal>
		<Modal v-model="modal4" @on-visible-change="remindchange" class-name="vertical-center-modal" :mask-closable="false">
			<p slot="header" style="text-align:left">
				<span>待办提醒</span>
			</p>
			<div style="text-align:left">
				<Form ref="formValidatewith" :model="formValidatewith" :rules="ruleValidatewith" :label-width="180">
					<FormItem label="待办时间:" prop="marketBeginTime">
						<DatePicker type="datetime" :value="formValidatewith.marketBeginTime" @on-change="datepickdial" :options="options3" confirm placeholder="待办时间" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="待办备注:" prop="bdmemo">
						<Input style="width:200px" v-model="formValidatewith.bdmemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办内容" />
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="default" @click="modalclose(3,'formValidatewith')">关闭</Button>
				<Button type="primary" v-if="datatitle.agencyStatus == 1" :loading="modal_loading" @click="withdial('formValidatewith',1)">确认已办</Button>
				<Button type="primary" :loading="modal_loading" @click="withdial('formValidatewith',2)">提交更新</Button>
			</div>
		</Modal>
		<Modal title="拨打电话" v-model="modal5" ok-text="确认" cancel-text="取消" @on-ok="dialings" width='300' :mask-closable="false" class-name="vertical-center-modal">
			<p>确认拨打信贷员 {{datatitle.realName}} 的电话吗?</p>
		</Modal>
		<Modal v-model="modal6" class-name="vertical-center-modal" :mask-closable="false">
			<p slot="header" style="text-align:left">
				<span>拨打标记</span>
			</p>
			<div style="text-align:left">
				<Form ref="formValidatecall" :model="formValidatecall" :rules="ruleValidatecall" :label-width="180">
					<FormItem label="拨打备注" prop="memo">
						<!-- <span>拨打备注:</span> -->
						<Select v-model="formValidatecall.memo" @on-change="selremarks" placeholder="请选择" style="width:200px;">
							<Option v-for="item in remarkslist" :value="item.remarkCode" :key="item.remarkCode">{{ item.remarkDesc }}</Option>
						</Select>
					</FormItem>
					<FormItem v-if="engagement" label="待办时间" prop="time">
						<DatePicker type="datetime" class=" " :value="formValidatecall.time" @on-change="datepickcall" :options="options3" confirm placeholder="待办时间" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem v-if="engagement" label="待办备注" prop="remarks">
						<Input v-model="formValidatecall.remarks" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
					</FormItem>
					<FormItem v-if="customtype" label="自定义备注" prop="custom">
						<Input v-model="formValidatecall.custom" style="width:200px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入待办备注" />
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="default" @click="modalclose(4,'formValidatecall')">关闭</Button>
				<!-- <Button type="primary" :loading="modal_loading" >挂断</Button> -->
				<Button type="primary" :loading="modal_loading" @click="dialsub('formValidatecall')">提交</Button>
			</div>
		</Modal>
		<div class="footbom clearfix">
			<Button v-if="datatitle.loanStatus==0" type="primary" style="margin-top:14px" class="left" shape="circle">仅注册</Button>
			<Button v-if="datatitle.loanStatus==1" type="primary" style="margin-top:14px" class="left" shape="circle">待审核</Button>
			<Button v-if="datatitle.loanStatus==2" type="primary" style="margin-top:14px" class="left" shape="circle">已入驻</Button>
			<Button v-if="datatitle.loanStatus==3" type="primary" style="margin-top:14px" class="left" shape="circle">审核失败</Button>
			<p v-if="datatitle.agencyStatus!=0" class="left">
				<!-- v-if="updateto" -->
				<span>待办时间:{{datatitle.agencyTime}}</span>
				<br>
				<span>待办备注:{{datatitle.agencyMemo}}</span>
			</p>
			<div class="right">
				<Button style="height:45px" :disabled="dissign" type="success" @click="modal3=true">标记无效</Button>
				<Button style="height:45px" :disabled="dissign" type="success" @click="modal4=true">待办提醒</Button>
				<Button style="height:45px" :disabled="dissign" type="success" @click="modal5=true">拨打电话</Button>
				<Button style="height:45px" type="info" @click='previous'>上一条</Button>
				<Button style="height:45px" type="info" @click='next'>下一条</Button>
			</div>
		</div>
	</div>

</template>
<script>
	import { mapState, mapMutations } from "vuex";
	import utils from "../../utils/utils";
	export default {
		data() {
			return {
				data1: [],
				columns: [],
				columns1: [{
						title: "拨打时间",
						key: "dialStartTime",
						align: "center"
					},
					{
						title: "挂断时间",
						key: "dialEndTime",
						align: "center"
					},
					{
						title: "通话时长",
						key: "talkTime",
						align: "center"
					},
					{
						title: "通话状态",
						key: " talkStatus",
						align: "center",
						render: (h, params) => {
							let talkStatus;
							if(params.row.talkStatus == 0) {
								talkStatus = "初始默认值";
							} else if(params.row.talkStatus == 1) {
								talkStatus = "未接通";
							} else if(params.row.talkStatus == 2) {
								talkStatus = "已接通";
							}
							return h("div", [h("span", {}, talkStatus)]);
						}
					},
					{
						title: "拨打坐席",
						key: "seatNo",
						align: "center",
						render: (h, params) => {
							return h("div", [
								h("span", {}, params.row.seatNo + " " + params.row.seatName)
							]);
						}
					},
					{
						title: "通话备注",
						key: "remark",
						align: "center"
					},
					{
						title: "操作",
						align: "center",
						fixed: 'right',
						render: (h, params) => {
							return h("div", [
								h(
									"Button", {
										props: {
											type: "primary",
											size: "small"
										},
										style: {
											marginRight: "5px"
										},
										attrs: {
											disabled: params.row.remark == "" ? false : true
										},
										on: {
											click: () => {
												this.dialCode = params.row.dialCode;
												this.modal2 = true;
												this.dialRemarks();
											}
										}
									},
									"备注"
								)
							]);
						}
					}
				],
				data2: [],
				columns2: [{
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
						title: "金额 (元)",
						align: "center",
						minWidth: 120,
						render: (h, params) => {
							let amountAsFormat;
							if(params.row.type == 0) {
								amountAsFormat = "+" + params.row.amountAsFormat;
							} else if(params.row.type == 1) {
								amountAsFormat = "-" + params.row.amountAsFormat;
							} else if(params.row.type == 2) {
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
				columnsCoupon: [{
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
							if(params.row.alterAction == 0) {
								alterTicketNumber = "+" + params.row.alterTicketNumber;
							} else if(params.row.alterAction == 1) {
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
				data3: [],
				columns3: [{
						title: "抢单时间",
						key: "orderCreateTime",
						align: "center"
					},
					{
						title: "抢单编号",
						key: "orderNum",
						align: "center"
					},
					{
						title: "客户姓名",
						key: "loanUserName",
						align: "center"
					},
					{
						title: "手机",
						key: "loanUserPhone",
						align: "center"
					},
					{
						title: '订单类型',
						key: 'goodStatusName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: "抢单费用",
						key: "robbingAmount",
						align: "center",
						render: (h, params) => {
							let pushStatus = [];
							let payType = params.row.payType
							let row = params.row
							if(row.activityAmount == row.robbingAmount) {
								pushStatus.push(h("span", {}, payType == 0 ? row.robbingAmount + '赞豆' : row.robbingAmount + '赞豆' + '/' + row.ticketNumber + '张券'));
							} else {
								pushStatus.push(
									h(
										"span", {
											style: {
												color: "#BEBEBE"
											}
										},
										row.robbingAmount + '赞豆'
									),
									h("span", {}, "/"),
									h("span", {}, payType == 0 ? row.activityAmount + '赞豆' : row.activityAmount + '赞豆' + '/' + row.ticketNumber + '张券')
								);
							}
							return h("div", pushStatus);
						}
					},
					{
						title: "订单状态",
						key: "orderStatusName",
						align: "center"
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let arr = []
							if(params.row.orderStatusName == '已咨询') {
								arr.push(
									h(
										'Button', {
											props: {
												type: 'primary',
												size: 'small'
											},
											style: {
												marginRight: '5px',
												display: params.row.orderStatusName != "已咨询" ? "none" : "inline-block"
											},
											on: {
												click: () => {
													this.$router.push('/cancellation?orderCode=' + params.row.orderCode)
												}
											}
										},
										'退单'
									)
								)
							}
							return h('div', arr)
						}
					}
				],
				data4: [],
				columns4: [{
						title: "订单时间",
						key: "orderCreateTime",
						align: "center"
					},
					{
						title: "订单编号",
						key: "orderNum",
						align: "center"
					},
					{
						title: "客户姓名",
						key: "loanUserName",
						align: "center"
					},
					{
						title: "手机",
						key: "loanUserPhone",
						align: "center"
					},
					{
						title: "订单状态",
						key: "orderStatusName",
						align: "center"
					},
					{
						title: "服务费用",
						key: "serviceCost",
						align: "center",
						render: (h, params) => {
							let serviceCost;
							if(params.row.serviceCost == null) {
								serviceCost = "--";
							} else {
								serviceCost = params.row.serviceCost + " 元";
							}
							return h("div", [h("span", {}, serviceCost)]);
						}
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let arr = []
							if(params.row.orderStatusName == '已咨询') {
								arr.push(h(
									'Button', {
										props: {
											type: 'primary',
											size: 'small',
										},
										style: {
											marginRight: '5px',
											display: params.row.orderStatusName != "已咨询" ? "none" : "inline-block"
										},
										on: {
											click: () => {
												this.$router.push('/cancellation?orderCode=' + params.row.orderCode)
											}
										}
									},
									'退单'
								))
							}
							return h('div', arr)
						}
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
				data5: [],
				columns5: [{
						title: "邀请用户手机号",
						key: "phoneNumber",
						align: "center"
					},
					{
						title: "注册时间",
						key: "registerTime",
						align: "center"
					},
					{
						title: "实名",
						key: "realName",
						align: "center"
					},
					{
						title: "审核",
						key: " conversetype",
						align: "center",
						render: (h, params) => {
							let loanStatus;
							if(params.row.loanStatus == 0) {
								loanStatus = "注册无资料";
							} else if(params.row.loanStatus == 1) {
								loanStatus = "信贷员待审核";
							} else if(params.row.loanStatus == 2) {
								loanStatus = "审核通过";
							} else if(params.row.loanStatus == 3) {
								loanStatus = "审核失败";
							}
							return h("div", [h("span", {}, loanStatus)]);
						}
					},
					{
						title: "审核时间",
						key: "loanStatusSuccessTime",
						align: "center"
					},
					{
						title: "邀请奖励",
						key: "inviterVirtualCount",
						align: "center"
					}
				],
				// 三期 会员
				member: [{
						title: "会员等级",
						key: "dialStartTime",
						align: "center",
						minWidth: 180,
						render(h, params) {
							return h("span", {}, "VIP")
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
					},
				],
				// 积分明细
				integralList:[],
				integral: [
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
					key: "alterPoints",
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
				vipValue:'',
				checkinDays:'',//签到天数
				memberList: [],
				datatitle: {}, //头部数据
				total: 0,
				startRow: 1,
				endRow: 10,
				nameval: 0,
				totalnum: 0,
				signs: '0',
				logoUrl: require("../../image/moren.png"),
				modal2: false,
				modal3: false,
				modal4: false,
				modal5: false,
				modal6: false,
				engagement: false,
				customtype: false,
				modal_loading: false,
				dissign: false, //标记无效置灰
				updateto: false,
				tips: false,
				flowingWater: '0',
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},
				dialRecordCode: "",
				selnum: "",
				remarkslist: [], //拨打备注
				creditOfficerlist: {
					loanQueryRechargeInfoRes: {
						balanceZd: "",
						totalRechargeCount: "",
						totalZdRecharge: "",
						firstRechargeTime: "",
						lastZdRecharge: "",
						lastRechargeTime: "",
						totalConsumeCount: "",
						totalConsumeZd: "",
						lastConsumeTime: ""
					},
					loanLastUpdateTime: "",
					serviceAmount: "",
					serviceRate: "",
					loanHaveType: [],
					serviceTime: "",
					loanDeductionSet: "",
					loanStatus: null,
					loanStatusSuccessTime: "",
					loanStatusMsg: "",
					loanStatusFailureTime: ""
				}, //信贷员详情list
				dialCode: "",
				formValidate: {
					memo: "",
					time: "",
					remarks: "",
					custom: ""
				},
				formValidateinvalid: {
					custom: ""
				},
				formValidatewith: {
					marketBeginTime: "",
					bdmemo: ""
				},
				formValidatecall: {
					memo: "",
					time: "",
					remarks: "",
					custom: ""
				},
				ruleValidate: {
					memo: [{
						required: true,
						message: "请选择拨打备注",
						trigger: "change"
					}],
					remarks: [{
						required: true,
						message: "请输入待办备注",
						trigger: "blur"
					}],
					custom: [{
						required: true,
						message: "请输入自定义备注",
						trigger: "blur"
					}]
				},
				ruleValidateinvalid: {
					custom: [{
						required: true,
						message: "请输入无效原因",
						trigger: "blur"
					}]
				},
				ruleValidatewith: {
					bdmemo: [{
						required: true,
						message: "请输入待办备注",
						trigger: "blur"
					}]
					// marketBeginTime: [
					//   { required: true,  message: '请选择待办时间', trigger: 'blur' }
					// ],
				},
				ruleValidatecall: {
					memo: [{
						required: true,
						message: "请选择拨打备注",
						trigger: "change"
					}],
					// time: [
					// { required: true, type: 'date', message: '请选择待办时间', trigger: 'change' }
					// ],
					remarks: [{
						required: true,
						message: "请输入待办备注",
						trigger: "blur"
					}],
					custom: [{
						required: true,
						message: "请输入自定义备注",
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			...mapMutations(["lefthidtrue", "lefthidfalse", "headertrue"]),
			//上一条
			previous() {
				this.pagingSwitch(1);
			},
			//下一条
			next() {
				this.pagingSwitch(2);
			},
			pagingSwitch(nums) {
				let list = JSON.parse(utils.getlocal("articlelist"));
				list.downUp = nums
				this.http.post(
						BASE_URL + "/sale/saleLoanOfficerInfo/downUp",
						list
					)
					.then(data => {
						if(data.code == "success") {
							if(data.data.dataList.length > 0) {
								for(const key in data.data.dataList[0]) {
									if(
										data.data.dataList[0][key] == null ||
										data.data.dataList[0][key] === ""
									) {
										data.data.dataList[0][key] = "--";
									}
								}
								if(data.data.dataList[0].agencyStatus == 1) {
									this.tips = true
									this.formValidatewith.marketBeginTime =
										data.data.dataList[0].agencyTime;
									this.formValidatewith.bdmemo = data.data.dataList[0].agencyMemo;
								} else {
									this.tips = false
									this.formValidatewith.marketBeginTime = ''
									this.formValidatewith.bdmemo = '';
								}
								this.datatitle = data.data.dataList[0];
								list.dialCode = data.data.dataList[0].dialCode
								utils.putlocal("articlelist", JSON.stringify(list));
								this.putAsh = data.data.dataList[0].putAsh;
								if(this.putAsh) { // 标记成功置灰
									this.dissign = true;
									this.formValidateinvalid.custom = "";
								} else {
									this.dissign = false;
								}
								this.signs = '0'
								this.dialEecord();
							} else {
								if(nums == 1) {
									this.$Modal.warning({
										title: "温馨提示",
										content: "已是第一条数据"
									});
									return false;
								} else {
									this.$Modal.warning({
										title: "温馨提示",
										content: "已是最后一条数据"
									});
									return false;
								}
								// this.datatitle = [];
							}
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 分页
			pageChange(page) {
				this.startRow = page;
				if(this.nameval == 0) {
					this.dialEecord();
				} else if(this.nameval == 1) {
					this.officerdetails();
				} else if(this.nameval == 2) {
					this.incomeRecord(this.flowingWater);
				} else if(this.nameval == 3) {
					this.grabSheet(2);
				} else if(this.nameval == 4) {
					this.grabSheet(1);
				} else if(this.nameval == 5) {
					this.invitationRecord();
				} else if(this.nameval == 6) {
					this.memberRecord();
				}else if(this.nameval == 7) {
					this.integralDetails();
				} else if (this.nameval == 8) {
					this.detailsmc(page);
				} else if (this.nameval == 9) {
					this.detailschangevn(page);
				}
			},
			pagesizechange(page) {
				this.startRow = 1;
				this.endRow = page;
				if(this.nameval == 0) {
					this.dialEecord();
				} else if(this.nameval == 1) {
					this.officerdetails();
				} else if(this.nameval == 2) {
					this.incomeRecord(this.flowingWater);
				} else if(this.nameval == 3) {
					this.grabSheet(2);
				} else if(this.nameval == 4) {
					this.grabSheet(1);
				} else if(this.nameval == 5) {
					this.invitationRecord();
				} else if(this.nameval == 6) {
					this.memberRecord();
				} else if(this.nameval == 7) {
					this.integralDetails();
				} else if (this.nameval == 8) {
					this.detailsmc(this.startRow);
				} else if (this.nameval == 9) {
					this.detailschangevn(this.startRow);
				}
			},
			// 关闭弹框
			modalclose(model, name) {
				if(model == 1) {
					this.modal2 = false;
					this.$refs[name].resetFields();
				} else if(model == 2) {
					this.modal3 = false;
					this.$refs[name].resetFields();
				} else if(model == 3) {
					this.modal4 = false;
					if(this.datatitle.agencyStatus != 1) {
						this.$refs[name].resetFields();
					}
				} else if(model == 4) {
					this.modal6 = false;
					this.$refs[name].resetFields();
				}
			},
			datepickdial(v) {
				this.formValidatewith.marketBeginTime = v;
			},
			datepickerl(v) {
				this.formValidate.time = v;
			},
			datepickcall(v) {
				this.formValidatecall.time = v;
			},
			// 拨打备注change
			selremarks(val) {
				this.formValidate.memo = val;
				this.formValidatecall.memo = val;
				if(val == "1005") {
					// this.$refs['formValidate'].resetFields();
					this.engagement = true;
					this.customtype = false;
					this.selnum = 1;
				} else if(val == "1006") {
					// this.$refs['formValidate'].resetFields();
					this.engagement = false;
					this.customtype = true;
					this.selnum = 2;
				} else {
					// this.$refs['formValidate'].resetFields();
					this.engagement = false;
					this.customtype = false;
					this.selnum = 0;
				}
			},
			// 拨打备注下拉框
			dialRemarks() {
				this.http
					.post(BASE_URL + "/sale/saleDialRemark/getDialRemarkList", {})
					.then(data => {
						if(data.code == "success") {
							this.remarkslist = data.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 标记无效
			invalidMark(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						let list = {
							reqList: [{
								dialCode: this.datatitle.dialCode,
								loanOfficerCode: this.datatitle.loanOfficerCode,
								effectMemo: this.formValidateinvalid.custom,
								effectStatus: 2
							}]
						};
						this.http
							.post(
								BASE_URL + "/sale/saleLoanOfficerInfo/batchUpdateByCode",
								list
							)
							.then(data => {
								if(data.code == "success") {
									this.modal3 = false;
									this.$Modal.success({
										title: "温馨提示",
										content: "标记成功",
										onOk: () => {
											this.formValidateinvalid.custom = "";
											// this.headerdata (1)
											this.dissign = true;
										}
									});
									this.didInvalidateInfo = true;
									// this.addPage(); //标记无效时分页减一
								} else {
									this.$Message.error(data.message);
								}
							})
							.catch(err => {
								console.log(err);
							});
					}
				});
			},
			// 分页 -1
			addPage() {
				let list = JSON.parse(utils.getlocal("articlelists"));
				list.pageNum -= 1;
				this.totalnum -= 1;
				utils.putlocal("articlelists", JSON.stringify(list));
			},
			// 拨打电话提交
			dialsub(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						if(this.formValidate.time == "" && this.selnum == 1 && this.modal2) {
							this.$Modal.warning({
								title: "待办时间",
								content: "请选择待办时间"
							});
							return false;
						}
						if(
							this.formValidatecall.time == "" &&
							this.selnum == 1 &&
							this.modal6
						) {
							this.$Modal.warning({
								title: "待办时间",
								content: "请选择待办时间"
							});
							return false;
						}
						let datetimel = Date.parse(new Date(this.formValidate.time))
						let datetimell = Date.parse(new Date())
						if(datetimel <= datetimell && this.selnum == 1 && this.modal2) {
							this.$Modal.warning({
								title: '待办时间',
								content: '<p>指定时间不能小于当前时间</p>'
							})
							return false
						}
						let datetime2 = Date.parse(new Date(this.formValidatecall.time))
						let datetimel2 = Date.parse(new Date())
						if(datetime2 <= datetimel2 && this.selnum == 1 && this.modal6) {
							this.$Modal.warning({
								title: '待办时间',
								content: '<p>指定时间不能小于当前时间</p>'
							})
							return false
						}
						let list = {
							remarkCode: this.formValidate.memo,
							dialCode: this.dialCode,
							loanOfficerCode: this.datatitle.loanOfficerCode
						};
						if(this.selnum == 1 && this.modal2) {
							list.agencyTime = this.formValidate.time;
							list.remark = this.formValidate.remarks;
						}
						if(this.selnum == 2 && this.modal2) {
							list.remark = this.formValidate.custom;
						}
						if(this.selnum == 1 && this.modal6) {
							list.agencyTime = this.formValidatecall.time;
							list.remark = this.formValidatecall.remarks;
						}
						if(this.selnum == 2 && this.modal6) {
							list.remark = this.formValidatecall.custom;
						}
						this.http
							.post(BASE_URL + "/sale/saleDialRecord/saveDialRemark", list)
							.then(data => {
								if(data.code == "success") {
									this.modal2 = false;
									this.modal6 = false;
									this.$refs['formValidatecall'].resetFields();
									this.$Modal.success({
										title: "温馨提示",
										content: "备注成功"
									});
									this.headerdata(1);
								} else {
									this.$Message.error(data.message);
								}
							})
							.catch(err => {
								console.log(err);
							});
					} else {}
				});
			},
			// 待办提醒提交
			withdial(name, num) {
				this.$refs[name].validate(valid => {
					if(valid) {
						if(this.formValidatewith.marketBeginTime == "") {
							this.$Modal.warning({
								title: "待办时间",
								content: "请选择待办时间"
							});
							return false;
						}
						let list = {
							loanOfficerCode: this.datatitle.loanOfficerCode,
							agencyTime: this.formValidatewith.marketBeginTime,
							agencyRemark: this.formValidatewith.bdmemo
						};
						let url;
						let content;
						if(num == 1) {
							url = "/sale/saleDialRecord/confirmAgencyTimeRemind";
							content = "已办成功";
						} else {
							url = "/sale/saleDialRecord/agencyTimeRemind";
							content = "更新成功";
						}
						this.confirmbeen(list, url, content);
					} else {}
				});
			},
			// 确认已办
			confirmbeen(list, url, content) {
				this.http
					.post(BASE_URL + url, list)
					.then(data => {
						if(data.code == "success") {
							this.modal3 = false;
							this.$Modal.success({
								title: "温馨提示",
								content: content
							});
							this.modal4 = false;
							this.headerdata(1);
							if(content == "更新成功") {
								this.updateto = false;
								this.tips = true
								this.formValidatewith.marketBeginTime =
									data.data.dataList[0].agencyTime;
								this.formValidatewith.bdmemo = data.data.dataList[0].agencyMemo;
							} else {
								this.tips = false
								this.updateto = true;
								this.formValidatewith.marketBeginTime = "";
								this.formValidatewith.bdmemo = "";
							}
						} else {
							this.$Message.warning(data.message);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 弹框点击x
			remindchange(bol) {
				if(bol == false && !this.tips) {
					this.formValidatewith.marketBeginTime = "";
					this.formValidatewith.bdmemo = "";
				}
			},
			signchange(bol) {
				if(bol == false) {
					this.formValidateinvalid.custom = ''
				}
			},
			// 拨打电话
			dialings() {
				this.http
					.post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", {
						loanOfficerCode: this.datatitle.loanOfficerCode
					})
					.then(data => {
						if(data.code == "success") {
							this.$Message.success(data.message);
							//   this.dialRecordCode = data.data.dialRecordCode
							this.dialCode = data.data.dialRecordCode;
							this.modal6 = true;
							// this.allotStatus = data.data.allotStatus
						} else {
							this.$Message.error(data.message);
						}
					})
					.catch(err => {
						console.log(err);
					});
				this.dialRemarks();
			},
			// 点击tab切换
			tabswitch(name) {
				this.total = 0;
				this.startRow = 1;
				this.endRow = 10;
				this.nameval = name;
				this.signs = name
				if(name == 0) {
					this.dialEecord();
				} else if(name == 1) {
					this.officerdetails();
				} else if(name == 2) {
					this.flowingWater = '0'
					this.incomeRecord(this.flowingWater); //现金流水
				} else if(name == 3) {
					this.grabSheet(2);
				} else if(name == 4) {
					this.grabSheet(1);
				} else if(name == 5) {
					this.invitationRecord();
				} else if(name == 6) {
					this.memberRecord();
				} else if(name == 7) {
					this.integralDetails();
				} else if (name == 8) {
					this.detailsmc(1);
				} else if (name == 9) {
					this.detailschangevn(1);
				}
			},
			admissiontime(val) {
				this.flowingWater = val
				this.startRow = 1
				this.incomeRecord(this.flowingWater); //现金流水 
			},
			// 拨打记录
			dialEecord() {
				let list = {
					loanOfficerCode: this.datatitle.loanOfficerCode,
					managerFlag: false,
					pageSize: this.endRow,
					pageNum: this.startRow,
					seatType: 1,
				};
				this.http
					.post(BASE_URL + "/sale/saleDialRecord/queryPageList", list)
					.then(data => {
						if(data.code == "success") {
							this.data1 = data.data.dataList;
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 信贷员详情
			officerdetails() {
				let list = {
					loanOfficerCode: this.datatitle.loanOfficerCode
				};
				this.http
					.post(BASE_URL + "/sale/saleLoanOfficerInfo/queryDetailByCode", list)
					.then(data => {
						if(data.code == "success") {
							for(const key in data.data) {
								if(data.data[key] == null || data.data[key] === "") {
									data.data[key] = "--";
								}
							}
							for(const key in data.data.loanQueryRechargeInfoRes) {
								if(
									data.data.loanQueryRechargeInfoRes[key] == null ||
									data.data.loanQueryRechargeInfoRes[key] === ""
								) {
									data.data.loanQueryRechargeInfoRes[key] = "--";
								}
							}
							this.creditOfficerlist = data.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 进账记录
			incomeRecord(num) {
				let list = {
					userCode: this.datatitle.loanOfficerCode,
					pageSize: this.endRow,
					pageNum: this.startRow
				};
				let url
				if(num == '0') {
					url = "/loan/tradeFlow/qiangDanXia/list"
				} else if (num == '1') {
					url = "/loan/accountTicket/queryTicketRecordPageList"
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
					.post(BASE_URL + url, list)
					.then(data => {
						if(data.code == "success") {
							if(num == '0') {
								this.columns = this.columns2
							} else if (num == '1') {
								this.columns = this.columnsCoupon
							} else if (num == '2') {
								this.columns = this.rechargeflow;
							} else if (num == '3') {
								this.columns = this.couponflow;
							} else if (num == '4') {
								this.columns = this.beanDetailed;
							} else if (num == '5') {
								this.columns = this.grabDetails;
							}
							this.data2 = data.data.dataList;
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 抢单订单、咨询订单
			grabSheet(num) {
				let list = {
					officerCode: this.datatitle.loanOfficerCode,
					orderType: num,
					pageSize: this.endRow,
					pageNum: this.startRow
				};
				this.http
					.post(BASE_URL + "/sale/saleOrder/queryList", list)
					.then(data => {
						if(data.code == "success") {
							if(num == 2) {
								this.data3 = data.data.dataList;
							} else {
								this.data4 = data.data.dataList;
							}
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 邀请记录
			invitationRecord() {
				let list = {
					accountCode: this.datatitle.accountCode,
					loanOfficerCode: this.datatitle.loanOfficerCode,
					pageSize: this.endRow,
					pageNum: this.startRow
				};
				this.http
					.post(BASE_URL + "/sale/saleLoanOfficerInfo/queryInviteRecord", list)
					.then(data => {
						if(data.code == "success") {
							this.data5 = data.data.dataList;
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 三期 会员记录
			memberRecord() {
				let list = {
					loanOfficerCode: this.datatitle.loanOfficerCode,
					pageSize: this.endRow,
					pageNum: this.startRow,
				};
				this.http
					.post(BASE_URL + "/loan/viplog/queryPage", list)
					.then(data => {
						if(data.code == "success") {
							this.memberList = data.data.dataList;
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					})
					.catch(err => {
						console.log(err);
					});

			},
			// 积分明细
			integralDetails () {
				let list = {
					officerCode: this.datatitle.loanOfficerCode,
					pageSize: this.endRow,
					pageNum: this.startRow,
				};
				this.http.post(BASE_URL + "/loan/rewardPoints/queryPage", list)
				.then(data => {
					if(data.code == "success") {
						this.integralList = data.data.dataList;
						this.checkinDays = data.data.continuousCheckInCount
						this.total = Number(data.data.total);
						this.startRow =
							Math.ceil(data.data.startRow / this.endRow) == 0 ?
							1 :
							Math.ceil(data.data.startRow / this.endRow);
					}
				})
				.catch(err => {
					console.log(err);
				});

			},
			// 退单权益明细
			detailsmc (startRow) {
			this.http.post(BASE_URL+"/loan/chargebackOderRightsFlow/queryPage",{
				"loanOfficerCode": this.datatitle.loanOfficerCode,
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
				"loanOfficerCode": this.datatitle.loanOfficerCode,
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
			// 上一条下一条
			headerdata(num) {
				//    头部数据
				let list = JSON.parse(utils.getlocal("articlelist"));
				// if (num == 2) {
				//   list.dialCode = ""
				//   if (list.pageNum <= 1) {
				//     this.$Modal.warning({
				//       title: "温馨提示",
				//       content: "已是第一条数据"
				//     });
				//     return false;
				//   }
				//   list.pageNum -= 1;
				//   utils.putlocal("articlelist", JSON.stringify(list));
				// } else if (num == 3) {
				//   list.dialCode = ""
				//   if (list.pageNum == this.totalnum) {
				//     this.$Modal.warning({
				//       title: "温馨提示",
				//       content: "已是最后一条数据"
				//     });
				//     return false;
				//   } else {
				//     if (!this.putAsh) {
				//       if (!this.didInvalidateInfo) {
				//         list.pageNum += 1;
				//       }
				//       this.didInvalidateInfo = false;
				//     } else {
				//       list.pageNum = list.pageNum + 1;
				//       list.pageNum -= 1;
				//     } // 判断是否标记无效
				//     // list.pageNum += 1;
				//     utils.putlocal("articlelist", JSON.stringify(list));
				//   }
				// }
				this.http
					.post(BASE_URL + "/sale/saleLoanOfficerInfo/pageQueryByCodeCharge", list)
					.then(data => {
						if(data.code == "success") {
							this.dissign = false;
							if(data.data.dataList.length > 0) {
								for(const key in data.data.dataList[0]) {
									if(
										data.data.dataList[0][key] == null ||
										data.data.dataList[0][key] === ""
									) {
										data.data.dataList[0][key] = "--";
									}
								}
								if(data.data.dataList[0].agencyStatus == 1) {
									this.tips = true
									this.formValidatewith.marketBeginTime =
										data.data.dataList[0].agencyTime;
									this.formValidatewith.bdmemo = data.data.dataList[0].agencyMemo;
								} else {
									this.tips = false
								}
								this.datatitle = data.data.dataList[0];
								this.disposeStatus = data.data.dataList[0].disposeStatus;
								this.putAsh = data.data.dataList[0].putAsh;
								if(this.putAsh) { // ==1 的时候置灰
									this.dissign = true;
									this.formValidateinvalid.custom = "";
								}
							} else {
								this.datatitle = [];
							}
							this.totalnum = data.data.total;
							this.signs = '0'
							this.dialEecord();
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},

		created() {
			let that = this;
			that.lefthidfalse();
			that.headertrue();
			this.headerdata(1);

		}
	};
</script>
<style lang="less" scoped>
	.layoutconconmmon {
		background: #eaedf2;
	}
	
	.contentcss {
		// margin-top: 55px;
		padding-bottom: 55px;
	}
	
	.headstyle {
		overflow: hidden;
		background: #eaedf2;
		padding-right: 20px;
		width: 2000px;
	}
	
	.headtop {
		width: 100%;
		background-color: #eaedf2;
		position: fixed;
		z-index: 10;
		top: 0px;
		left: 0;
		height: 80px;
		.headleft {
			overflow: hidden;
			// width: 250px;
			float: left;
			padding-left: 25px;
			margin-right: 20px;
			img {
				width: 60px;
				height: 60px;
				float: left;
				margin-top: 10px;
			}
			p {
				font-size: 15px;
				float: left;
				line-height: 25px;
				margin-left: 5px;
				padding-top: 15px;
			}
		}
		.headright {
			width: 60%;
			float: left;
			padding-top: 15px;
			line-height: 25px;
			span,
			strong {
				font-size: 15px;
				display: inline-block;
			}
		}
	}
	
	.titlebor {
		line-height: 35px;
		margin-bottom: 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.datadisplay {
		overflow: hidden;
		li {
			float: left;
			margin-right: 20px;
		}
	}
	
	.admission p {
		line-height: 30px;
	}
	
	.footbom {
		position: fixed;
		bottom: 0;
		height: 60px;
		background: #eaedf2;
		padding-right: 20px;
		width: 98%;
		z-index: 10;
		color: #666;
		padding-left: 20px;
		margin-top: 16px;
		p {
			padding-top: 10px;
			margin-left: 50px;
		}
	}
	
	.contentcss {
		margin-bottom: 20px;
	}
</style>