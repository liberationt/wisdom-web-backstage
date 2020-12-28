<template>
	<div class="layoutconconmmon">
		<div class="headcommon">
			<div class="headtop">
				<div class="headleft">
					<img :src="headerList.headImg=='--'? logoUrl: headerList.headImg" alt="">
					<p>
						<strong>{{headerList.phoneNumber}}</strong>
						<br>
						<span>姓名:{{headerList.realName}}</span>
						<span v-if="headerList.sex==0" class="ml10">性别:女</span>
						<span v-else-if="headerList.sex==1" class="ml10">性别:男</span>
						<span v-else class="ml10">性别:--</span>
					</p>
				</div>
				<div class="headright">
					<span>区域:</span>
					<span>{{headerList.loanCityNameFirst}} {{headerList.loanCityNameSecond}} {{headerList.loanCityNameThird}}</span>
					<span class="ml20">公司:</span>
					<span>{{headerList.company}}</span>
					<span class="ml20">渠道:</span>
					<span>{{headerList.channel}}</span>
					<span class="ml20">邀请人:</span>
					<span>{{headerList.inviterName}} {{headerList.inviter}}</span>
					<span class="ml20">已邀请:</span>
					<span>{{headerList.inviterNumber}}</span> <br>
					<span>注册:</span>
					<span>{{headerList.registrationTime}}</span>
					<span class="ml20">最后登录:</span>
					<span>{{headerList.lastLogTime}}</span>
					<span class="ml20">名单下放:</span>
					<span>{{headerList.listDownTime}}</span>
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
						<div class="clearfix">
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
									<span v-for="item in creditOfficerlist.loanHaveType">{{item}}</span>
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
							未填写
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
						<div>
							<p class="titlebor mt20">
								<strong class="f20">操作日志</strong>
							</p>
							<div class="admission">
								<ul class="admissionul">
									<li v-for="item in OperationList">
										<span>操作时间：{{item.operatorDate}}</span>
										<span>操作人：{{item.operator}}</span>
										<span>操作内容：{{item.operatorContent}}</span>
									</li>
								</ul>
							</div>
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
					<span>累计签到：{{continuousCheckInCount}}天</span>
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
		<div class="footbom clearfix">
			<Button type="primary" style="margin-top:14px" class="left" shape="circle">{{headerList.loanStatus == 0 ? "仅注册" : headerList.loanStatus == 1 ? "待审核 " : headerList.loanStatus == 2 ? "已入驻" : "审核失败"}}</Button>
			<p class="left" v-if="headerList.agencyStatus!=0">
				<span>提交审核时间:{{headerList.effectTime}}</span>
				<br>
				<span>提交原因:{{headerList.effectMemo}}</span>
			</p>
			<div class="right footerButton">
				<Button style="height:40px" v-if="isinvalid == 'yes'" type="success" :disabled="flag" @click="InvalidMark()">重新分配</Button>
				<Button style="height:40px" v-if="isinvalid == 'yes'" type="success" :disabled="flag" @click="agentReminder()">确认无效</Button>
				<Button style="height:40px" v-if="isinvalid != 'yes'" type="success" :disabled="flag" @click="toNormal()">恢复正常</Button>
				<Button style="height:40px" type="success" :disabled="flag" @click="callUp()">拨打电话</Button>
				<Button style="height:40px" type="info" @click="revious">上一条</Button>
				<Button style="height:40px" type="info" @click="next">下一条</Button>
			</div>
		</div>
		<!-- 备注弹窗 -->
		<Modal v-model="dialMark" title="拨打标记" @on-ok="handleSubmit('formValidate')" @on-cancel="handleReset('formValidate')" ok-text="提交" cancel-text="关闭" :mask-closable=false :loading="loading">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="拨打备注：" prop="remarksOption">
					<Select v-model="formValidate.remarksOption" style="width:260px" placeholder="请选择">
						<Option v-for="item in remarksOptionList" :value='item.remarkCode'>{{item.remarkDesc}}</Option>
					</Select>
				</FormItem>
				<FormItem label="待办时间：" v-if="this.formValidate.remarksOption == '1005'">
					<FormItem prop="standbyTime">
						<DatePicker type="datetime" :options="options3" v-model="formValidate.standbyTime" placeholder="请选择待办时间"></DatePicker>
					</FormItem>
				</FormItem>
				<FormItem label="待办备注：" v-if="this.formValidate.remarksOption == '1005' || this.formValidate.remarksOption == '1006'">
					<FormItem prop="standbyDesc">
						<Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
		<!-- 分配名单弹框 -->
		<Modal v-model="isSubName" title="分配名单" @on-ok="subNameOk('formValidatename')" @on-cancel="subNAmecancel('formValidatename')" ok-text="确定分配" cancel-text="关闭" :loading="loading">
			<Form ref="formValidatename" :model="formValidatename" :rules="ruleValidatename" :label-width="120">
				<FormItem label="名单人数：" prop="subName">
					<input disabled style="backgroundColor:#fff;" v-model="formValidatename.subName"></input>
				</FormItem>
				<FormItem label="分配坐席：" prop="subSeat">
					<Select v-model="formValidatename.subSeat" placeholder="请选择分配坐席" style="width:150px;">
						<Option :value=item.seatNo v-for="item in subSeatNameList">{{item.seatName}}</Option>
					</Select>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
	import { mapState, mapMutations } from "vuex";
	import utils from "../../utils/utils";
	export default {
		data() {
			return {
				signs: '0',
				updateto: false,
				logoUrl: require('../../image/moren.png'),
				OperationList: [],
				formValidatename: {
					subName: 1,
					subSeat: ""
				},
				ruleValidatename: {
					subSeat: [{
						required: true,
						message: "请选择分配坐席",
						trigger: "change"
					}]
				},
				subSeatNameList: [],
				isSubName: false,
				options3: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},
				flowingWater: '0',
				flag: false,
				loading: true,
				dialMark: false,
				isinvalid: this.$route.query.isinvalid,
				dialCode: "", //拨打记录code
				headerList: {}, //头部数据
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
				}, //详情参数
				totalnum: "",
				inviter: "",
				data1: [],
				remarksOptionList: [],
				formValidate: {
					remarksOption: "",
					standbyTime: "",
					standbyDesc: ""
				},
				ruleValidate: {
					remarksOption: [{
						required: true,
						message: "请选择拨打备注",
						trigger: "change"
					}],
					standbyTime: [{
						required: true,
						type: "date",
						message: "请选择待办时间",
						trigger: "change"
					}],
					standbyDesc: [{
						required: true,
						message: "请填写待办备注",
						trigger: "blur"
					}]
				},
				columns: [],
				columns1: [{
						title: "拨打时间",
						key: "dialStartTime",
						align: "center",
						minWidth: 120
					},
					{
						title: "挂断时间",
						key: "dialEndTime",
						align: "center",
						minWidth: 120
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
						render(h, params) {
							let talkStatus = params.row.talkStatus;
							return h("div", [
								h(
									"span", {},
									talkStatus == 0 ?
									"初始默认值 " :
									talkStatus == 1 ? "未接通" : "已接通"
								)
							]);
						}
					},
					{
						title: "拨打坐席",
						key: "seatNo",
						align: "center",
						minWidth: 100,
						render(h, params) {
							let set = params.row
							return h('span', {}, set.seatNo + " " + set.seatName)
						}
					},
					{
						title: "通话备注",
						key: "remark",
						align: "center",
						minWidth: 150
					},
					{
						title: "操作",
						align: "center",
						fixed: 'right',
						render: (h, params) => {
							let remark = params.row.remark;
							if(!remark) {
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
											on: {
												click: () => {
													this.dialMark = true;
													this.dialCode = params.row.dialCode;
													// this.$router.push({
													//   path:
													//     "./creditInformation?loanOfficerCode=" +
													//     params.row.loanOfficerCode
													// });
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
							return h("div", [h("span", {}, params.row.serviceCost + ' 元')]);
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
				data5: [],
				columns5: [{
						title: "邀请用户手机号",
						key: "phoneNumber",
						align: "center",
						minWidth: 120
					},
					{
						title: "注册时间",
						key: "registerTime",
						align: "center",
						minWidth: 120
					},
					{
						title: "实名",
						key: "realStatus",
						align: "center",
						minWidth: 80,
						render(h, params) {
							let paramsl = params.row;
							return h(
								"span", {},
								paramsl.realStatus == 0 ? "未实名 " : "已实名"
							);
						}
					},
					{
						title: "审核",
						key: "loanStatus",
						align: "center",
						minWidth: 100,
						render(h, params) {
							let paramsl = params.row;
							return h(
								"span", {},
								paramsl.loanStatus == 0 ?
								"注册无资料" :
								paramsl.loanStatus == 1 ?
								"信贷员待审核" :
								paramsl.loanStatus == 2 ? "审核通过" : "审核失败"
							);
						}
					},
					{
						title: "审核时间",
						key: "loanStatusSuccessTime",
						align: "center",
						minWidth: 120
					},
					{
						title: "邀请奖励",
						key: "inviterVirtualCount",
						align: "center",
						minWidth: 120
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
				memberList: [],
				//积分明细
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
				vipValue:'',
				continuousCheckInCount:"",
				total: 0,
				startRow: 1,
				endRow: 10,
				nameval: 0,
				effectStatus: "",
				removal: true,
				isinvalid: this.$route.query.isinvalid,
				
			};
		},
		methods: {
			...mapMutations(["lefthidtrue", "lefthidfalse", 'headertrue']),
			//上一条下一条
			examine(n) {
				let code = this.$route.query;
				let list = JSON.parse(utils.getlocal("auditedInvalid"));
				// if (n == 2) {
				//   list.dialCode = ""
				//   if (list.pageNum <= 1) {
				//     this.$Modal.warning({
				//       title: "温馨提示",
				//       content: "已是第一条数据"
				//     });
				//     return false;
				//   }
				//   list.pageNum -= 1;
				//   utils.putlocal("auditedInvalid", JSON.stringify(list));
				//   code.dialCode =""
				//   code.loanOfficerCode = ""
				// } else if (n == 3) {
				//   list.dialCode = ""
				//   if (list.pageNum >= this.totalnum) {
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
				//       list.pageNum = list.pageNum+1
				//       list.pageNum-=1
				//     }
				//     utils.putlocal("auditedInvalid", JSON.stringify(list));
				//     code.loanOfficerCode = ""
				//   }
				// }
				this.flag = false
				this.httpPost(
					"/sale/saleLoanOfficerInfo/pageQueryByCode",
					Object.assign(list, {
						loanOfficerCode: code.loanOfficerCode
					}),
					e => {
						const {
							dataList
						} = e.data;
						this.effectStatus = dataList[0].effectStatus
						this.putAsh = dataList[0].putAsh
						if(this.putAsh) {
							this.flag = true;
						}
						this.pageSwitch(this.nameval)
						for(const key in dataList[0]) {
							if(
								dataList[0][key] == null ||
								dataList[0][key] === ""
							) {
								dataList[0][key] = "--";
							}
						}
						this.headerList = dataList[0];
						this.totalnum = e.data.total;
						this.dialEecord(); //拨打记录
					},
					err => {
						console.log(err);
					}
				);
			},
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
			//点击tab切换
			tabswitch(name) {
				this.total = 0;
				this.startRow = 1;
				this.endRow = 10;
				this.signs = name
				this.nameval = name;
				this.flowingWater = '0'
				this.pageSwitch(name); //分页判断
			},
			admissiontime(val) {
				this.flowingWater = val
				this.startRow = 1
				this.incomeRecord(this.flowingWater); //现金流水 
			},
			// 信贷员详情 1
			auditDetails() {
				this.httpPost(
					"/sale/saleLoanOfficerInfo/queryDetailByCode", {
						loanOfficerCode: this.headerList.loanOfficerCode
					},
					data => {
						if(data.code == "success") {
							for(const key in data.data) {
								if(data.data[key] == null || data.data[key] === '') {
									data.data[key] = '--'
								}
							}
							for(const key in data.data.loanQueryRechargeInfoRes) {
								if(data.data.loanQueryRechargeInfoRes[key] == null || data.data.loanQueryRechargeInfoRes[key] === '') {
									data.data.loanQueryRechargeInfoRes[key] = '--'
								}
							}
							this.creditOfficerlist = data.data;
						}
						// console.log(data,111);
					},
					err => {
						console.log(err);
					}
				);
				//操作日志
				this.httpPost('/saleLog/saleLog/queryList', {
					loanOfficerCode: this.headerList.loanOfficerCode
				}, data => {
					this.OperationList = data.data
				}, err => {
					console.log(err)
				})
			},
			// 拨打记录0
			dialEecord() {
				let list = {
					loanOfficerCode: this.headerList.loanOfficerCode,
					pageSize: this.endRow,
					pageNum: this.startRow,
					seatType: 1
				};
				this.httpPost(
					"/sale/saleDialRecord/queryPageList4Manager",
					list,
					data => {
						if(data.code == "success") {
							const {
								dataList,
								total,
								startRow
							} = data.data;
							this.data1 = dataList;
							this.total = Number(total);
							this.removal = false
							this.startRow =
								Math.ceil(startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(startRow / this.endRow);
						}
					},
					err => {
						console.log(err);
					}
				);
			},

			// 抢单订单、咨询订单 3，4
			grabSheet(num) {
				let list = {
					officerCode: this.headerList.loanOfficerCode,
					orderType: num,
					pageSize: this.endRow,
					pageNum: this.startRow
				};
				this.httpPost(
					"/sale/saleOrder/queryList",
					list,
					data => {
						if(data.code == "success") {
							if(num == 2) {
								this.data3 = data.data.dataList;
							} else if(num == 1) {
								this.data4 = data.data.dataList;
							}
							this.total = Number(data.data.total);
							this.startRow =
								Math.ceil(data.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(data.data.startRow / this.endRow);
						}
					},
					err => {
						console.log(err);
					}
				);
			},
			//邀请记录5
			Invitation() {
				this.httpPost(
					"/sale/saleLoanOfficerInfo/queryInviteRecord", {
						loanOfficerCode: this.headerList.loanOfficerCode, // 待定
						pageSize: this.endRow,
						pageNum: this.startRow
					},
					e => {
						if(e.code == "success") {
							const {
								dataList,
								total,
								startRow
							} = e.data;
							this.data5 = dataList;
							this.total = Number(total);
							this.startRow =
								Math.ceil(startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(startRow / this.endRow);
						}
					},
					err => {
						console.log(err);
					}
				);
			},
			// 进账记录
			incomeRecord(num) {
				let list = {
					userCode: this.headerList.loanOfficerCode,
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
			// 三期 会员记录
			memberRecord() {
				let list = {
					loanOfficerCode: this.headerList.loanOfficerCode,
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
			// 积分列表
			jifenListC(startRow){
				this.http.post(BASE_URL+"/loan/rewardPoints/queryPage",{
					"officerCode": this.$route.query.loanOfficerCode,
					"pageNum": this.startRow,
					"pageSize": this.endRow}).then(data=>{
						if(data.code == 'success'){
							this.continuousCheckInCount = data.data.continuousCheckInCount
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
			// 重新分配
			InvalidMark() {
				this.isSubName = true
			},
			// 确认无效
			agentReminder() {
				this.$Modal.confirm({
					title: "温馨提示",
					content: "<p>确认无效吗？</p>",
					onOk: () => {
						this.httpPost(
							"/sale/saleLoanOfficerInfo/batchUpdateByCode", {
								reqList: [{
									dialCode: this.headerList.dialCode,
									effectStatus: 3,
									loanOfficerCode: this.headerList.loanOfficerCode
								}]
							},
							data => {
								if(data.code == "success") {
									this.$Message.success("无效完成");
									this.flag = true;
									this.didInvalidateInfo = true;
									// this.addPage()
								} else {
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
			//恢复正常
			toNormal() {
				this.$Modal.confirm({
					title: "温馨提示",
					content: "<p>确认恢复正常吗？</p>",
					onOk: () => {
						this.httpPost(
							"/sale/saleLoanOfficerInfo/batchUpdateByCode", {
								reqList: [{
									dialCode: this.headerList.dialCode,
									effectStatus: 1,
									loanOfficerCode: this.headerList.loanOfficerCode,
									allotStatus: 0,
									disposeStatus: 0
								}]
							},
							data => {
								if(data.code == "success") {
									this.$Message.success("恢复成功！");
									this.flag = true;
									// this.addPage()
									this.didInvalidateInfo = true;
								} else {
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
			// 拨打电话
			callUp() {
				this.$Modal.confirm({
					title: "拨打电话",
					content: "<p>确认拨打" + this.headerList.realName + "电话吗？</p>",
					onOk: () => {
						this.httpPost(
							"/sale/saleDialRecord/callLoanOfficer", {
								loanOfficerCode: this.headerList.loanOfficerCode
							},
							data => {
								if(data.code == "success") {
									this.dialMark = true;
									this.dialCode = data.data.dialRecordCode;
									this.$Message.success(data.message);
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
			// 分页
			pageChange(page) {
				this.startRow = page;
				this.pageSwitch(this.nameval); //分页判断
			},
			pagesizechange(page) {
				this.startRow = 1;
				this.endRow = page;
				if(this.removal) return
				this.pageSwitch(this.nameval); //分页判断
			},
			//分页判断
			pageSwitch(nameval) {
				switch(nameval) {
					case '0':
						this.dialEecord(); //拨打记录
						break;
					case '1':
						this.auditDetails(); //信贷员详情
						break;
					case '2':
						this.incomeRecord(this.flowingWater); //进账记录
						break;
					case '3':
						this.grabSheet(2); // 抢单订单
						break;
					case '4':
						this.grabSheet(1); // 咨询订单
						break;
					case '5':
						this.Invitation(); //邀请记录
						break;
					case 6:
						this.memberRecord(); //会员记录
						break;
					case 7:
						this.jifenListC(1); //积分管理
						break;
					case 8:
						this.detailsmc(1); //退单权益明细
						break;
					case 9:
						this.detailschangevn(); //V值变动
						break;
				}
			},
			//上一条
			revious() {
				// this.examine(2);
				this.pagingSwitch(1)
			},
			//下一条
			next() {
				// this.examine(3);
				this.pagingSwitch(2)
			},
			pagingSwitch(nums) {
				let list = JSON.parse(utils.getlocal("auditedInvalid"));
				// this.flag = false
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
								this.pageSwitch(this.nameval)
								// this.totalnum = e.data.total;
								this.dialEecord(); //拨打记录
								this.effectStatus = data.data.dataList[0].effectStatus
								this.headerList = data.data.dataList[0];
								list.dialCode = data.data.dataList[0].dialCode
								utils.putlocal("auditedInvalid", JSON.stringify(list));
								this.putAsh = data.data.dataList[0].putAsh;
								if(this.putAsh) { // 标记成功置灰
									this.flag = true;
								} else {
									this.flag = false;
								}
								this.signs = '0'
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
			// 拨打备注选项
			optionList() {
				this.httpPost(
					"/sale/saleDialRemark/getDialRemarkList", {},
					data => {
						this.remarksOptionList = data.data;
					},
					err => {
						console.log(err);
					}
				);
			},
			// 备注确认
			handleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						let datetimel = Date.parse(new Date(this.formValidate.standbyTime))
						let datetimell = Date.parse(new Date())
						if(datetimel <= datetimell && this.formValidate.remarksOption == '1005') {
							this.$Modal.warning({
								title: '待办时间',
								content: '<p>指定时间不能小于当前时间</p>',
								onOk: () => {},
								onCancel: () => {}
							})
							this.changeLoading()
							return false
						}
						this.httpPost(
							"/sale/saleDialRecord/saveDialRemark4Manager", {
								agencyTime: this.formValidate.standbyTime == "" ? "" : utils.formatDate(this.formValidate.standbyTime, 'yyyy-MM-dd hh:mm:ss'), // 备注时间
								dialCode: this.dialCode, //拨打记录code
								loanOfficerCode: this.headerList.loanOfficerCode, //信贷员编号
								remark: this.formValidate.standbyDesc, //备注内容
								remarkCode: this.formValidate.remarksOption
							},
							data => {
								if(data.code == "success") {
									this.dialEecord(); //拨打记录
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
			// 备注取消
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			changeLoading() {
				this.loading = false;
				this.$nextTick(() => {
					this.loading = true;
				});
			},
			//分配坐席名单
			subSeatName() {
				this.http
					.post(BASE_URL + "/sale/saleSeat/getSaleSeatInfoList", {
						seatType: 1
					})
					.then(data => {
						// const {data} = data.data
						this.subSeatNameList = data.data;
					})
					.catch(err => {});
			},
			subNameOk(name) {
				//modal框确认
				this.$refs[name].validate(valid => {
					if(valid) {
						this.http
							.post(
								BASE_URL + "/sale/saleLoanOfficerInfo/batchUpdateByCode", {
									reqList: [{
										loanOfficerCode: this.headerList.loanOfficerCode,
										dialCode: this.headerList.dialCode,
										effectStatus: 1,
										seatCode: this.headerList.seatCode,
										seatNo: this.formValidatename.subSeat,
										allotStatus: 1,
										disposeStatus: 0
									}]
								}
							)
							.then(data => {
								if(data.code == "success") {
									this.isSubName = false;
									this.changeLoading();
									this.$Message.success("分配成功!");
									this.$refs[name].resetFields();
									this.flag = true;
									// this.addPage()
									this.didInvalidateInfo = true;
								} else {
									this.changeLoading();
									this.isSubName = false;
									this.$Message.error(data.message);
									this.query();
								}
							})
							.catch(err => {});
					} else {
						this.changeLoading();
						// this.$Message.error('Fail!');
					}
				});
			},
			subNAmecancel(name) {
				//modal框取消
				this.$refs[name].resetFields();
			},
			// 分页 -1
			addPage() {
				let list = JSON.parse(utils.getlocal("auditedInvalid"));
				list.pageNum -= 1
				this.totalnum -= 1
				utils.putlocal("auditedInvalid", JSON.stringify(list));
			}
		},
		created() {
			this.pageSwitch(0);
			this.examine();
			this.optionList(); //备注选项列表
			this.subSeatName(); //名单分配
			let that = this;
			that.lefthidfalse()
			that.headertrue()
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
	
	.headcommon {
		width: 100%;
		background-color: #eaedf2;
		position: fixed;
		z-index: 10;
		top: 0px;
		left: 0;
		height: 80px;
	}
	
	.headtop {
		overflow: hidden;
		background: #eaedf2;
		padding-right: 20px;
		width: 2000px;
		.headleft {
			overflow: hidden;
			// width: 250px;
			float: left;
			padding-left: 25px;
			font-size: 15px;
			margin-right: 20px;
			img {
				width: 60px;
				height: 60px;
				float: left;
				margin-top: 10px;
			}
			p {
				float: left;
				line-height: 25px;
				margin-left: 5px;
				padding-top: 15px;
			}
		}
		.headright {
			font-size: 15px;
			width: 760px;
			float: left;
			padding-top: 15px;
			line-height: 25px;
			margin-left: 20px;
		}
	}
	
	.titlebor {
		line-height: 35px;
		margin-bottom: 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.ivu-tabs {
		min-height: 400px;
		overflow: inherit;
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
	
	.admissionul {
		li {
			padding-top: 5px;
			span {
				margin-right: 40px;
			}
		}
	}
	
	.footbom {
		position: fixed;
		bottom: 0px;
		height: 60px;
		background: #eaedf2;
		padding-right: 50px;
		width: 100%;
		z-index: 10;
		color: #666;
		padding-left: 20px;
		p {
			padding-top: 10px;
			margin-left: 50px;
		}
		.footerButton {
			margin-top: 11px;
		}
	}
</style>