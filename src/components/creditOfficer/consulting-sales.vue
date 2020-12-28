<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理&nbsp;>&nbsp;订单管理</span>
			</p>
		</div>
		<div class="contentcss">
			<Tabs type="card" :animated="false" :value='value1' @on-click="tabswitch">
				<TabPane label="咨询订单" name="0">
					<div class="clearfix">
						<div class="left clearfix">
							<ul class="querysty">
								<li>
									<Input class="mr20" v-for="item in cityList1" v-model="item.code" :placeholder="'请输入信贷员'+item.label" style="width: 150px">
									</Input>
								</li>
								<li>
									<Input class="mr20"  v-model="consultloanUserPhone" placeholder="请输入客户手机号码" style="width: 150px">
									</Input>
								</li>
								<li>
									<Input class="mr20"  v-model="consultloanUserName" placeholder="请输入客户姓名" style="width: 150px">
									</Input>
								</li>							
								<li>
									<Select v-model="orderStatus" placeholder="订单状态" class="mr10" style="width:150px">
										<Option value="">请选择</Option>
										<Option v-for="item in orderStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</li>
								<li>
									<Select v-model="model2" @on-change="citys" placeholder="请选择信贷员省" style="width:150px;">
										<Option value="">请选择</Option>
										<Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li>
									<Select v-model="model3" placeholder="请选择信贷员市" style="width:150px;margin-left:10px">
										<Option value="">请选择</Option>
										<Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr20 ml20">
									<span>订单时间：</span>
									<DatePicker type="date" :options="options3" v-model="ConsultationTime" placeholder="开始时间" style="width: 150px"></DatePicker>
									<span>  -  </span>
									<DatePicker type="date" :options="options3" v-model="ConsultationEndTime" placeholder="结束时间" style="width: 150px"></DatePicker>
								</li>
								<li>
									<Button type="info" class="right mr20 w90" :loading="loading3" @click="consultingorders(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
								</li>
							</ul>
						</div>
					</div>
					<div id="application_table" class="mt15">
						<Table border highlight-row :columns="columns7" :data="data6"></Table>
					</div>
					<div class="tr mt15">
						<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>

				<TabPane label="抢单订单" name="1">
					<div class="clearfix">
						<div class="left clearfix">
							<div class="left">
								<ul class="querysty">
									<li>
										<Input class="mr20" v-for="item in cityList2" v-model="item.code" :placeholder="'请输入信贷员'+item.label" style="width: 150px">
										</Input>
									</li>
									<li>
									<Input class="mr20"  v-model="robloanUserPhone" placeholder="请输入客户手机号码" style="width: 150px">
									</Input>
								</li>
									<li>
									<Input class="mr20"  v-model="robloanUserName" placeholder="请输入客户姓名" style="width: 150px">
									</Input>
								</li>							
									<li>
										<Select v-model="orderType" placeholder="订单类型" class="mr10" style="width:150px">
											<!-- <Option value="">请选择</Option> -->
											<Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</li>
									<li>
										<Select v-model="orderStatusZ" placeholder="订单状态" class="mr10" style="width:150px">
											<Option value="">请选择</Option>
											<Option v-for="item in orderStatusListZ" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</li>
									<li>
										<Select v-model="model5" @on-change="citys" placeholder="请选择信贷员省" style="width:150px;">
											<Option value="">请选择</Option>
											<Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
										</Select>
									</li>
									<li>
										<Select v-model="model6" placeholder="请选择信贷员市" style="width:150px;margin-left:10px">
											<Option value="">请选择</Option>
											<Option v-for="item in status2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
										</Select>
									</li>
									<li class="mr20 ml20">
										<span>订单时间：</span>
										<DatePicker type="date" :options="options3" v-model="sheetTime" placeholder="开始时间" style="width: 150px"></DatePicker>
										<span>  -  </span>
										<DatePicker type="date" :options="options3" v-model="sheetEndTime" placeholder="结束时间" style="width: 150px"></DatePicker>
									</li>
									<li>
										<Button type="info" class="right mr20 w90" :loading="loading3" @click="Orderrobbing(1)">
                      <span v-if="!loading3">查询</span>
                      <span v-else>查询</span>
                    </Button>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div id="application_table" class="mt15">
						<Table border highlight-row :columns="columns8" :data="data7"></Table>
					</div>
					<div class="tr mt15">
						<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>
			</Tabs>
		</div>
	</div>
</template>
<script>
	import utils from '../../utils/utils';
	export default {
		data() {
			return {
				options3: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
				ConsultationTime: "",
				ConsultationEndTime: "",
				consultloanUserName:'',
				consultloanUserPhone:'',
				robloanUserName:'',
				robloanUserPhone:'',
				total: 0,
				startRow: 1,
				endRow: 10,
				value1: '0',
				loading3: false,
				cityList: [],
				cityList1: [],
				cityList2: [{
						code: '',
						value: "mobile"
					},
					{
						code: '',
						value: "name"
					},
				],
				cityType1: [],
				cityType2: [],
				cityType3: [],
				status1: [],
				status2: [],
				status3: [],
				model1: 'mobile',
				model2: '',
				model3: '',
				model4: 'mobile',
				model5: '',
				model6: '',
				model7: 'mobile',
				model8: '',
				model9: '',
				name1: '',
				name2: '',
				name3: '',
				orderStatus: "",
				orderStatusList: [],
				orderType: "",
				orderTypeList: [],
				orderStatusZ: "",
				orderStatusListZ: [],
				sheetTime: "",
				sheetEndTime: "",
				params: {
					page: 1,
					limit: 10
				},
				columns7: [{
						title: '订单时间',
						key: 'orderCreateTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '订单编号',
						key: 'orderNum',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '客户区域',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.orderCityNameFirst + ' ' + params.row.orderCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '信贷员区域',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.orderQdCityNameFirst + ' ' + params.row.orderQdCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '客户姓名',
						key: 'loanUserName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '手机',
						key: 'loanUserPhone',
						minWidth: 110,
						align: 'center'
					},
					{
						title: '信贷员姓名',
						key: 'officerName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '信贷员手机号',
						key: 'officerPhone',
						minWidth: 110,
						align: 'center'
					},
					{
						title: '订单状态',
						key: 'orderStatusName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '服务费用',
						key: 'serviceCost',
						minWidth: 100,
						align: 'center',
						render(h, params) {
							return h('div', [
								h('span', {}, params.row.serviceCost + "元")
							])
						}
					},
					{
						title: '操作',
						key: 'action',
						minWidth: 160,
						fixed: 'right',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h(
									'Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
												this.$router.push({
													path: './consultSalesdetails?saleOrderCode=' + params.row.saleOrderCode + '&num=1'
												})
											}
										}
									},
									'查看详情'
								),
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
												this.$router.push('/cancellation?orderCode=' + params.row.orderCode + '&num=1')
											}
										}
									},
									'退单'
								)
							])
						}
					}
				],
				data6: [],
				columns8: [{
						title: '抢单时间',
						key: 'orderCreateTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '抢单编号',
						key: 'orderNum',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '订单类型',
						key: 'goodStatusName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '客户区域',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.orderCityNameFirst + ' ' + params.row.orderCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '信贷员区域',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.orderQdCityNameFirst + ' ' + params.row.orderQdCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '客户姓名',
						key: 'loanUserName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '手机',
						key: 'loanUserPhone',
						minWidth: 110,
						align: 'center'
					},
					{
						title: '信贷员姓名',
						key: 'officerName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '信贷员手机号',
						key: 'officerPhone',
						minWidth: 110,
						align: 'center'
					},
					{
						title: '抢单费用',
						minWidth: 120,
						align: 'center',
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
						// render: (h, params) => {
						//   let pushStatus = []
						//   if (params.row.activityAmount == params.row.robbingAmount) {
						//     pushStatus.push (
						//       h('span', {}, params.row.robbingAmount),
						//       h('span', {}, ' 赞豆')
						//     )
						//   } else {
						//     pushStatus.push (
						//       h('span', {style: {color: '#BEBEBE'}}, params.row.robbingAmount),
						//       h('span', {}, '/'),
						//       h('span', {}, params.row.activityAmount),
						//       h('span', {}, ' 赞豆')
						//     )
						//   }         
						//   return h('div', pushStatus)
						// }
					},
					{
						title: '订单状态',
						key: 'orderStatusName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						minWidth: 160,
						fixed: 'right',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h(
									'Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
												this.$router.push({
													path: './salesDetails?saleOrderCode=' + params.row.saleOrderCode + '&num=1'
												})
											}
										}
									},
									'查看详情'
								),
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
												this.$router.push('/cancellation?orderCode=' + params.row.orderCode + '&num=1')
											}
										}
									},
									'退单'
								)
							])
						}
					}
				],
				data7: []
			}
		},
		methods: {
			pageChange(page) {
				this.startRow = page
				if(this.value1 == '0') {
					this.consultingorders(this.startRow)
				} else if(this.value1 == '1') {
					this.Orderrobbing(this.startRow)
				}
				let OrderType = utils.getlocal("OrderType")
				OrderType.pageNum = page
				utils.putlocal('OrderType', OrderType)
			},
			pagesizechange(page) {
				this.startRow = 1
				this.endRow = page
				if(this.value1 == '0') {
					this.consultingorders(1)
				} else if(this.value1 == '1') {
					this.Orderrobbing(1)
				}
				let OrderType = utils.getlocal("OrderType")
				OrderType.pageNum = 1
				OrderType.pageSize = page
				utils.putlocal('OrderType', OrderType)
			},
			// 省
			created() {
				this.http.get('../../../static/city.json').then(data => {
					this.cityType1 = data
					this.cityType2 = data
					this.cityType3 = data
				})
			},
			//省 
			citys(v) {
				let data = {
					"data": v
				}
				this.httpshi(data)
				// this.model2 = v
			},
			// 市接口
			httpshi(data) {
				this.http.post(BASE_URL + "/loan/hotcity/queryCityAddressList", data).then(data => {
					if(this.value1 == '0') {
						this.status1 = data.data
					} else if(this.value1 == '1') {
						this.status2 = data.data
					}
				})
			},
			// 咨询订单
			consultingorders(startRow) {
				if(this.$route.query.num == 1) {
					if(this.ConsultationTime != '') {
						this.ConsultationTime = new Date(this.ConsultationTime)
					}
					if(this.ConsultationEndTime != '') {
						this.ConsultationEndTime = new Date(this.ConsultationEndTime)
					}
				}
				let date1 = Date.parse(new Date(this.ConsultationTime == "" ? "" : utils.formatDate(this.ConsultationTime, 'yyyy-MM-dd hh:mm:ss')));
				let date2 = Date.parse(new Date(this.ConsultationEndTime == "" ? "" : utils.formatDate(this.ConsultationEndTime, 'yyyy-MM-dd 23:59:59')));
				if(date1 > date2) {
					this.isDatetime()
					return false
				}
				let list = {
					orderType: 1,
					// searchValue :this.name1,
					loanUserName:this.consultloanUserName,
					loanUserPhone:this.consultloanUserPhone,
					orderStatusDetail: this.orderStatus == "''" ? "" : this.orderStatus,
					orderAdCodeFirst: this.model2,
					orderAdCodeSecond: this.model3,
					pageNum: startRow,
					pageSize: this.endRow,
					beginTime: date1,
					endTime: date2
				}
				this.cityList1.forEach(element => {
					let value = element.value
					if(value == 'mobile') {
						value = 'officerPhone'
					} else if(value == 'name') {
						value = 'officerName'
					}

					if(element.code == '' || element.code == null) {
						list[value] = ''
					} else {
						list[value] = element.code
					}
				});
				this.http.post(BASE_URL + '/sale/saleOrder/queryList', list)
					.then((resp) => {
						if(resp.code == 'success') {
							let OrderType = list
							OrderType.num = this.value1
							utils.putlocal('OrderType', OrderType)
							this.data6 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow)
						} else {
							this.$Message.info(resp.message)
						}
					})
					.catch(() => {})
			},
			// 抢单列表
			Orderrobbing(startRow) {
				if(this.$route.query.num == 1) {
					if(this.sheetTime != '') {
						this.sheetTime = new Date(this.sheetTime)
					}
					if(this.sheetEndTime != '') {
						this.sheetEndTime = new Date(this.sheetEndTime)
					}
				}
				let date1 = Date.parse(new Date(this.sheetTime == "" ? "" : utils.formatDate(this.sheetTime, 'yyyy-MM-dd hh:mm:ss')));
				let date2 = Date.parse(new Date(this.sheetEndTime == "" ? "" : utils.formatDate(this.sheetEndTime, 'yyyy-MM-dd 23:59:59')));
				if(date1 > date2) {
					this.isDatetime()
					return false
				}
				let list = {
					orderType: 2,
					// searchValue :this.name2,
					loanUserName:this.robloanUserName,
					loanUserPhone:this.robloanUserPhone,
					goodStatus: this.orderType == "''" ? "" : this.orderType, //订单类型
					orderStatusDetail: this.orderStatusZ == "''" ? "" : this.orderStatusZ, // 订单状态
					orderAdCodeFirst: this.model5,
					orderAdCodeSecond: this.model6,
					pageNum: startRow,
					pageSize: this.endRow,
					beginTime: date1,
					endTime: date2
				}
				this.cityList2.forEach(element => {
					let value = element.value
					if(value == 'mobile') {
						value = 'officerPhone'
					} else if(value == 'name') {
						value = 'officerName'
					}
					if(element.code == null || element.code == '') {
						list[value] = ''
					} else {
						list[value] = element.code
					}
				});
				this.http.post(BASE_URL + '/sale/saleOrder/queryList', list)
					.then((resp) => {
						if(resp.code == 'success') {
							let OrderType = list
							OrderType.num = this.value1
							utils.putlocal('OrderType', OrderType)
							this.data7 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow)
						} else {
							this.$Message.info(resp.message)
						}
					})
					.catch(() => {})

			},
			// 点击tab切换
			tabswitch(name) {
				this.total = 0
				this.startRow = 1
				this.endRow = 10
				this.value1 = name
				if(name == '0') {
					this.cityList1[0].code = ''
					this.cityList1[1].code = ''
					this.orderStatus = ''
					this.model2 = ''
					this.model3 = ''
					this.consultloanUserName = ''
					this.consultloanUserPhone = ''
					this.ConsultationTime = ''
					this.ConsultationEndTime = ''
					this.consultingorders(1)
				} else if(name == '1') {
					this.cityList2[0].code = ''
					this.cityList2[1].code = ''
					this.orderType = ''
					this.orderStatusZ = ''
					this.model5 = ''
					this.model6 = ''
					this.robloanUserName = ''
					this.robloanUserPhone = ''
					this.sheetTime = ''
					this.sheetEndTime = ''
					this.Orderrobbing(1)
				}

			},
			// 时间校验提示框
			isDatetime() {
				this.$Modal.warning({
					title: "提示",
					content: "<p>开始时间不得大于结束时间</p>"
				});
			},
			format(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var Y = time.getFullYear() + '-';
				var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
				var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
				return Y + M + D;
			}
		},
		mounted() {
			// 咨询订单查询条件
			this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderConsultListFilter', {})
				.then((resp) => {
					if(resp.code == 'success') {
						this.orderStatusListZ = resp.data.statusOptions
						this.cityList1 = resp.data.searchOptions
						this.orderStatusList = resp.data.statusOptions
						if(this.$route.query.num == 1) {
							let OrderType = utils.getlocal("OrderType")
							this.value1 = OrderType.num
							if(OrderType.num == '0') {
								this.orderStatus = OrderType.orderStatusDetail
								this.model2 = OrderType.orderAdCodeFirst
								this.model3 = OrderType.orderAdCodeSecond
								this.endRow = OrderType.pageSize
								if(OrderType.beginTime == null) {
									this.ConsultationTime = ''
								} else {
									this.ConsultationTime = this.format(OrderType.beginTime)
								}
								if(OrderType.endTime == null) {
									this.ConsultationEndTime = ''
								} else {
									this.ConsultationEndTime = this.format(OrderType.endTime)
								}
								this.consultloanUserName = OrderType.loanUserName
								this.consultloanUserPhone = OrderType.loanUserPhone
								this.cityList1[0].code = OrderType.officerPhone
								this.cityList1[1].code = OrderType.officerName
								this.consultingorders(OrderType.pageNum)
							} else {
								this.orderType = OrderType.goodStatus
								this.orderStatusZ = OrderType.orderStatusDetail
								this.model5 = OrderType.orderAdCodeFirst
								this.model6 = OrderType.orderAdCodeSecond
								this.endRow = OrderType.pageSize
								this.robloanUserName = OrderType.loanUserName
								this.robloanUserPhone = OrderType.loanUserPhone
								if(OrderType.beginTime == null) {
									this.sheetTime = ''
								} else {
									this.sheetTime = this.format(OrderType.beginTime)
								}

								if(OrderType.endTime == null) {
									this.sheetEndTime = ''
								} else {
									this.sheetEndTime = this.format(OrderType.endTime)
								}
								this.cityList2[0].code = OrderType.officerPhone
								this.cityList2[1].code = OrderType.officerName
								this.Orderrobbing(OrderType.pageNum)
							}
						}
						if(!this.$route.query.num) {
							this.consultingorders(1)
						}
					} else {
						this.$Message.info(resp.message)
					}
				})
				.catch(() => {})
			// 抢单订单查询条件
			this.http.post(BASE_URL + '/loan/baseOrder/queryBaseOrderRobListFilter', {})
				.then((resp) => {
					if(resp.code == 'success') {
						this.orderTypeList = resp.data.goodSatusBeans
						this.cityList2 = resp.data.searchOptions
						if(this.$route.query.num == 1) {
							let OrderType = utils.getlocal("OrderType")
							if(!OrderType.officerPhone) {
								this.cityList2[0].code = ''
							} else {
								this.cityList2[0].code = OrderType.officerPhone
							}
							if(!OrderType.officerName) {
								this.cityList2[1].code = ''
							} else {
								this.cityList2[1].code = OrderType.officerName
							}
						}
					} else {
						this.$Message.info(resp.message)
					}
				})
				.catch(() => {})
			this.created()

		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route' (to, from) {
				this.value1 = '0'
				this.consultingorders(1)
			}
		}
	}
</script>
<style lang="less" scoped>

</style>