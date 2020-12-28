<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞&nbsp;>&nbsp;待分配会员列表</span>
			</p>
		</div>
		<div class="contentcss">
			<Tabs type="card" :animated="false" class="allocated" :value="value1" @on-click="tabswitch">
				<TabPane label="待分配会员列表" name="0">
					<div class="clearfix">
						<div class="left clearfix">
							<ul class="querysty">
								<li class="mr10">
									<Select v-model="queryCriteria" placeholder="请选择查询条件" class="" style="width:130px">
										<Option v-for="item in queryCriterialist" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<Input class="mr10" v-model="queryCriteriavalue" placeholder="请输入" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="perfect" placeholder="是否完善信息" class="mr10" style="width:110px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="warehousing" placeholder="是否入库" class="mr10" style="width:90px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:150px;">
										<Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model3" placeholder="请选择市" style="width:150px;margin-left:10px">
										<Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="registrationtime" placeholder="注册时间" class="" style="width:90px">
										<Option v-for="item in orderStatusList"  :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<DatePicker type="date" :options="options3" @on-change="Stime" :value="ConsultationTime" placeholder="开始时间" style="width: 150px"></DatePicker>
									<span>  -  </span>
									<DatePicker type="date" :options="options3" @on-change="Etime" :value="ConsultationEndTime" placeholder="结束时间" style="width: 150px"></DatePicker>
								</li>
								<li class="mr10 ml10">
									<span>注册渠道:</span>
									<Input class="mr10" v-model="channel" placeholder="请输入注册渠道" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="timesequencing" placeholder="注册时间排序" class="" style="width:120px">
										<Option v-for="item in timesequencingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</li>
								<li class="mr10 ml10">
									<span>查询数量:</span>
									<InputNumber :max="20000" :min="1" v-model="num1"></InputNumber>
								</li>
								<li>
									<Button type="info" class=" mr10 w90" :loading="loading3" @click="consultingorders(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
									<Button type="primary" class="mr10 " :loading="loading2" @click="exports">
                    <span v-if="!loading2">导出</span>
                    <span v-else>请稍等...</span>
                  </Button>
									<Button type="primary" class="mr10 " @click="batchAllocation">批量分配</Button>
								</li>
							</ul>
							<Modal title="分配名单" v-model="modal1" class-name="vertical-center-modal" @on-ok="handleSubmit2('formValidate')" @on-cancel="handleReset2('formValidate')" :loading="loading" :mask-closable="false">
								<div>
									<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
										<FormItem label="名单人数">
											<span>{{formValidate.numpeop}}</span>
										</FormItem>
										<FormItem label="坐席编号" prop="seatNumber">
											<Select v-model="formValidate.seatNumber" style="width:200px" placeholder="请选择">
												<Option v-for="item in equityList" :value="item.seatCode" :key="item.seatCode">{{ item.seatName }}</Option>
											</Select>
										</FormItem>
									</Form>
								</div>
							</Modal>
						</div>
					</div>
					<div id="application_table" class="mt15">
						<Table border highlight-row @on-select-all="allcheckouttrue"  @on-selection-change='selectionChange' :columns="columns7" :data="data6"></Table>
					</div>
					<div class="tr mt15">
						<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>

				<TabPane label="待分配会员列表-待初审" name="1">
					<div class="clearfix">
						<div class="left clearfix">
							<ul class="querysty">
								<li class="mr10">
									<Select v-model="queryCriteriaStay" placeholder="请选择查询条件" class="" style="width:130px">
										<Option v-for="item in queryCriterialist" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<Input class="mr10" v-model="queryCriteriavalueStay" placeholder="请输入" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="perfectStay" placeholder="是否完善信息" class="mr10" style="width:110px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="warehousingStay" placeholder="是否入库" class="mr10" style="width:90px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model4" @on-change="citys" placeholder="请选择省" style="width:150px;">
										<Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model5" placeholder="请选择市" style="width:150px;margin-left:10px">
										<Option v-for="item in status2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="registrationtimeStay" placeholder="注册时间" class="" style="width:90px">
										<Option v-for="item in orderStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<DatePicker type="date" :options="options3"  @on-change="Stime1" :value="ConsultationTimeStay" placeholder="开始时间" style="width: 150px"></DatePicker>
									<span>  -  </span>
									<DatePicker type="date" :options="options3" @on-change="Etime1" :value="ConsultationEndTimeStay" placeholder="结束时间" style="width: 150px"></DatePicker>
								</li>
								<li class="mr10 ml10">
									<span>注册渠道:</span>
									<Input class="mr10" v-model="channelStay" placeholder="请输入注册渠道" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="timesequencingStay" placeholder="注册时间排序" class="" style="width:120px">
										<Option v-for="item in timesequencingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</li>
								<li class="mr10 ml10">
									<span>查询数量:</span>
									<InputNumber :max="20000" :min="1" v-model="num2"></InputNumber>
								</li>
								<li>
									<Button type="info" class=" mr10 w90" :loading="loading3" @click="Orderrobbing(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
									<Button type="primary" class="mr10 " :loading="loading2" @click="exports">
                    <span v-if="!loading2">导出</span>
                    <span v-else>请稍等...</span>
                  </Button>
									<Button type="primary" class="mr10 " @click="batchAllocation">批量分配</Button>
								</li>
							</ul>
						</div>
					</div>
					<div id="application_table" class="mt15">
						<Table border highlight-row @on-select-all="allcheckouttrue"  @on-selection-change='selectionChange' :columns="columns8" :data="data7"></Table>
					</div>
					<div class="tr mt15">
						<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
					</div>
				</TabPane>

				<TabPane label="待分配会员列表-已初审" name="2">
					<div class="clearfix">
						<div class="left clearfix">
							<ul class="querysty">
								<li class="mr10">
									<Select v-model="queryCriteriaready" placeholder="请选择查询条件" class="" style="width:130px">
										<Option v-for="item in queryCriterialist" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<Input class="mr10" v-model="queryCriteriavalueready" placeholder="请输入" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="perfectalready" placeholder="是否完善信息" class="mr10" style="width:110px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="warehousingalready" placeholder="是否入库" class="mr10" style="width:90px">
										<Option value="">全部</Option>
										<Option value="1">是</Option>
										<Option value="0">否</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model6" @on-change="citys" placeholder="请选择省" style="width:150px;">
										<Option v-for="item in cityType3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="model7" placeholder="请选择市" style="width:150px;margin-left:10px">
										<Option v-for="item in status3" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="mr10">
									<Select v-model="registrationtimealready" placeholder="注册时间" class="" style="width:90px">
										<Option v-for="item in orderStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<DatePicker type="date" :options="options3" @on-change="Stime2" :value="ConsultationTimealready" placeholder="开始时间" style="width: 150px"></DatePicker>
									<span>  -  </span>
									<DatePicker type="date" :options="options3" @on-change="Etime2" :value="ConsultationEndTimealready" placeholder="结束时间" style="width: 150px"></DatePicker>
								</li>
								<li class="mr10 ml10">
									<span>注册渠道:</span>
									<Input class="mr10" v-model="channelalready" placeholder="请输入注册渠道" style="width: 150px">
									</Input>
								</li>
								<li class="mr10">
									<Select v-model="timesequencingalready" placeholder="注册时间排序" class="" style="width:120px">
										<Option v-for="item in timesequencingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</li>
								<li class="mr10 ml10">
									<span>查询数量:</span>
									<InputNumber :max="20000" :min="1" v-model="num3"></InputNumber>
								</li>
								<li>
									<Button type="info" class=" mr10 w90" :loading="loading3" @click="bidorder(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
									<Button type="primary" class="mr10 " :loading="loading2" @click="exports">
                    <span v-if="!loading2">导出</span>
                    <span v-else>请稍等...</span>
                  </Button>
									<Button type="primary" class="mr10 " @click="batchAllocation">批量分配</Button>
									<Button class=" mr10" type="info" @click="modal2=true">上传初审名单</Button>
									<Button class=" mr10" type="info" @click="viewRecord">查看上传记录</Button>
								</li>
							</ul>
							<Modal title="上传文件" v-model="modal2" class-name="vertical-center-modal" @on-ok="uploadsubmit('formValidateupload')" @on-cancel="uploadreset('formValidateupload')" :loading="loading" :mask-closable="false">
								<div>
									<Form ref="formValidateupload" :model="formValidateupload" :rules="ruleValidateupload" :label-width="160">
										<FormItem label="上传文件" class="fileerrortop" prop="filecontent">
											<Input class="left companyname" v-model="formValidateupload.filecontent" disabled placeholder="请上传文件" style="width: 200px" />
											<Upload ref="upload" :before-upload="handleUpload" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError1">
												<Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">选择文件</Button>
											</Upload>
										</FormItem>
										<FormItem label="备注" prop="remarks">
											<Input style="width:285px" v-model="formValidateupload.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" />
										</FormItem>
									</Form>
								</div>
							</Modal>
						</div>

					</div>
					<div id="application_table" class="mt15">
						<Table border highlight-row @on-select-all="allcheckouttrue"  @on-selection-change='selectionChange' :columns="columns9" :data="data8"></Table>
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
				queryCriteria: '1', //查询条件下拉框
				queryCriteriavalue: '', //查询条件value值
				queryCriteriaStay: '1', //待分配会员列表-查询条件下拉框
				queryCriteriavalueStay: '', //待分配会员列表-查询条件value值
				queryCriteriaready: '1', //已分配会员列表-查询条件下拉框
				queryCriteriavalueready: '', //已分配会员列表-查询条件value值
				ConsultationTime: "", //待分配会员列表-开始时间
				ConsultationEndTime: "", //待分配会员列表-结束时间
				ConsultationTimeStay: "", //待分配会员列表~待初审-开始时间
				ConsultationEndTimeStay: "", //待分配会员列表~待初审-结束时间
				ConsultationTimealready: "", //待分配会员列表~已初审-开始时间
				ConsultationEndTimealready: "", //待分配会员列表~已初审-结束时间
				channel: '', //待分配会员列表-注册渠道
				channelStay: '', //待分配会员列表~待初审-注册渠道
				channelalready: '', //待分配会员列表~已初审-注册渠道
				num1: null, //待分配会员列表-查询数量
				num2: null, //待分配会员列表~待初审-查询数量
				num3: null, //待分配会员列表~已初审-查询数量
				perfect: '', //完善信息
				perfectStay: '', //待初审-完善信息
				perfectalready: '', //已初审-完善信息
				warehousing: '', //入库
				warehousingStay: '', //待初审-入库
				warehousingalready: '', //已初审-入库
				registrationtime: '1', //时间下拉框
				registrationtimeStay: '1', //待初审-时间下拉框
				registrationtimealready: '1', //已初审-时间下拉框
				timesequencing: '1', //注册时间排序
				timesequencingStay: '1', //待初审-注册时间排序
				timesequencingalready: '1', //已初审-注册时间排序
				model2: '',
				model3: '',
				model4: '',
				model5: '',
				model6: '',
				model7: '',
				queryCriterialist: [], //查询条件list
				orderStatusList: [], //注册时间list
				timesequencingList: [], //时间排序list
				file: '', //要上传的文件
				equityList: [], //坐席编号list
				loanUserCodeList: [], //分配code
				selectionChangecodelist:[],
				loading: true,
				loading2: false,
				modal1: false,
				modal2: false,
				allcheck:false,
				total: 0,
				startRow: 1,
				endRow: 10,
				nameval: '0',
				value1: '0',
				numpeop:'',
				formValidate: {
					numpeop: '1人',
					seatNumber: ''
				},
				ruleValidate: {
					seatNumber: [{
						required: true,
						message: '请选择坐席编号',
						trigger: 'change'
					}]
				},
				formValidateupload: {
					filecontent: '',
					remarks: ''
				},
				ruleValidateupload: {
					filecontent: [{
						required: true,
						message: '请上传文件',
						trigger: 'blur'
					}],
					remarks: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}]
				},
				loading3: false,
				cityType1: [],
				cityType2: [],
				cityType3: [],
				status1: [],
				status2: [],
				status3: [],
				params: {
					page: 1,
					limit: 10
				},
				columns7: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '手机号',
						key: 'phoneNumber',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '昵称',
						key: 'memberName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '城市',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.loanCityNameFirst + ' ' + params.row.loanCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '是否进入抢单库',
						key: 'loanUserName',
						minWidth: 130,
						align: 'center',
						render: (h, params) => {
							let isInfoPass
							if(params.row.isInfoPass == 0) {
								isInfoPass = '否'
							} else if(params.row.isInfoPass == 1) {
								isInfoPass = '是'
							}
							return h('div', [
								h('span', {}, isInfoPass)
							])
						}
					},
					{
						title: '是否完善信息',
						key: 'loanUserPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let loanPerfectInfo
							if(params.row.loanPerfectInfo == 0) {
								loanPerfectInfo = '未完善'
							} else if(params.row.loanPerfectInfo == 1) {
								loanPerfectInfo = '已完善'
							}
							return h('div', [
								h('span', {}, loanPerfectInfo)
							])
						}
					},
					{
						title: '注册渠道',
						key: 'channelCode',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '分配状态',
						key: 'officerPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let allotStatus
							if(params.row.allotStatus == 0) {
								allotStatus = '待分配'
							} else if(params.row.allotStatus == 1) {
								allotStatus = '已分配'
							}
							return h('div', [
								h('span', {}, allotStatus)
							])
						}
					},
					{
						title: 'AI标记',
						key: 'orderStatusName',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							let aiSign
							if(params.row.aiSign == 0) {
								aiSign = '无操作'
							} else if(params.row.aiSign == 1) {
								aiSign = '已导出'
							} else if(params.row.aiSign == 2) {
								aiSign = '已审核'
							}
							return h('div', [
								h('span', {}, aiSign)
							])
						}
					},
					{
						title: '注册时间',
						key: 'registerTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '完善信息时间',
						key: 'loanInfoTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '更新资料时间',
						key: 'loanInfoUpdateTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let arr = []
							arr.push(
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
													path: './customerDetails?loanUserCode=' + params.row.loanUserCode + '&displayhid=false'
												})
											}
										}
									},
									'查看'
								),
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
												this.formValidate.numpeop = '1人'
												this.modal1 = true
												if(this.formValidate.numpeop == '1人') {
													this.loanUserCodeList.push(params.row.loanUserCode)
												}
											}
										}
									},
									'分配'
								)
							)

							return h('div', arr)
						}
					}
				],
				data6: [],
				columns8: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '手机号',
						key: 'phoneNumber',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '昵称',
						key: 'memberName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '城市',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.loanCityNameFirst + ' ' + params.row.loanCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '是否进入抢单库',
						key: 'loanUserName',
						minWidth: 130,
						align: 'center',
						render: (h, params) => {
							let isInfoPass
							if(params.row.isInfoPass == 0) {
								isInfoPass = '否'
							} else if(params.row.isInfoPass == 1) {
								isInfoPass = '是'
							}
							return h('div', [
								h('span', {}, isInfoPass)
							])
						}
					},
					{
						title: '是否完善信息',
						key: 'loanUserPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let loanPerfectInfo
							if(params.row.loanPerfectInfo == 0) {
								loanPerfectInfo = '未完善'
							} else if(params.row.loanPerfectInfo == 1) {
								loanPerfectInfo = '已完善'
							}
							return h('div', [
								h('span', {}, loanPerfectInfo)
							])
						}
					},
					{
						title: '注册渠道',
						key: 'channelCode',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '分配状态',
						key: 'officerPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let allotStatus
							if(params.row.allotStatus == 0) {
								allotStatus = '待分配'
							} else if(params.row.allotStatus == 1) {
								allotStatus = '已分配'
							}
							return h('div', [
								h('span', {}, allotStatus)
							])
						}
					},
					{
						title: 'AI标记',
						key: 'orderStatusName',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							let aiSign
							if(params.row.aiSign == 0) {
								aiSign = '无操作'
							} else if(params.row.aiSign == 1) {
								aiSign = '已导出'
							} else if(params.row.aiSign == 2) {
								aiSign = '已审核'
							}
							return h('div', [
								h('span', {}, aiSign)
							])
						}
					},
					{
						title: '注册时间',
						key: 'registerTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '完善信息时间',
						key: 'loanInfoTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '更新资料时间',
						key: 'loanInfoUpdateTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '导出时间',
						key: 'exportTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let arr = []
							arr.push(
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
													path: './customerDetails?loanUserCode=' + params.row.loanUserCode + '&displayhid=false'
												})
											}
										}
									},
									'查看'
								),
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
												this.formValidate.numpeop = '1人'
												this.modal1 = true
												if(this.formValidate.numpeop == '1人') {
													this.loanUserCodeList.push(params.row.loanUserCode)
												}
											}
										}
									},
									'分配'
								)
							)
							return h('div', arr)
						}
					}
				],
				data7: [],
				columns9: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '手机号',
						key: 'phoneNumber',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '昵称',
						key: 'memberName',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '城市',
						align: 'center',
						minWidth: 120,
						render: (h, params) => {
							let pushStatus = params.row.loanCityNameFirst + ' ' + params.row.loanCityNameSecond
							return h('div', [
								h('span', {}, pushStatus)
							])
						}
					},
					{
						title: '是否进入抢单库',
						key: 'loanUserName',
						minWidth: 130,
						align: 'center',
						render: (h, params) => {
							let isInfoPass
							if(params.row.isInfoPass == 0) {
								isInfoPass = '否'
							} else if(params.row.isInfoPass == 1) {
								isInfoPass = '是'
							}
							return h('div', [
								h('span', {}, isInfoPass)
							])
						}
					},
					{
						title: '是否完善信息',
						key: 'loanUserPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let loanPerfectInfo
							if(params.row.loanPerfectInfo == 0) {
								loanPerfectInfo = '未完善'
							} else if(params.row.loanPerfectInfo == 1) {
								loanPerfectInfo = '已完善'
							}
							return h('div', [
								h('span', {}, loanPerfectInfo)
							])
						}
					},
					{
						title: '注册渠道',
						key: 'channelCode',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '分配状态',
						key: 'officerPhone',
						minWidth: 110,
						align: 'center',
						render: (h, params) => {
							let allotStatus
							if(params.row.allotStatus == 0) {
								allotStatus = '待分配'
							} else if(params.row.allotStatus == 1) {
								allotStatus = '已分配'
							}
							return h('div', [
								h('span', {}, allotStatus)
							])
						}
					},
					{
						title: 'AI标记',
						key: 'orderStatusName',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							let aiSign
							if(params.row.aiSign == 0) {
								aiSign = '无操作'
							} else if(params.row.aiSign == 1) {
								aiSign = '已导出'
							} else if(params.row.aiSign == 2) {
								aiSign = '已审核'
							}
							return h('div', [
								h('span', {}, aiSign)
							])
						}
					},
					{
						title: '注册时间',
						key: 'registerTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '完善信息时间',
						key: 'loanInfoTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '更新资料时间',
						key: 'loanInfoUpdateTime',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let arr = []
							arr.push(
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
													path: './customerDetails?loanUserCode=' + params.row.loanUserCode + '&displayhid=false'
												})
											}
										}
									},
									'查看'
								),
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
												this.formValidate.numpeop = '1人'
												this.modal1 = true
												if(this.formValidate.numpeop == '1人') {
													this.loanUserCodeList.push(params.row.loanUserCode)
												}
											}
										}
									},
									'分配'
								)
							)
							return h('div', arr)
						}
					}
				],
				data8: []
			}
		},
		methods: {
			pageChange(page) {
				this.startRow = page
				if(this.nameval == '0') {
					this.consultingorders(this.startRow)
				} else if(this.nameval == '1') {
					this.Orderrobbing(this.startRow)
				} else if(this.nameval == '2') {
					this.bidorder(this.startRow)
				}
			},
			pagesizechange(page) {
				this.startRow = 1
				this.endRow = page
				if(this.nameval == '0') {
					this.consultingorders(1)
				} else if(this.nameval == '1') {
					this.Orderrobbing(1)
				} else if(this.nameval == '2') {
					this.bidorder(1)
				}
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
					if(this.nameval == '0') {
						this.status1 = data.data
					} else if(this.nameval == '1') {
						this.status2 = data.data
					} else if(this.nameval == '2') {
						this.status3 = data.data
					}

				})
			},
			changeLoading() {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
			},
			// 添加/编辑
			handleSubmit2(name) {
				this.$refs[name].validate(valid => {
					if(!valid) {
						this.changeLoading()
					} else {
						this.changeLoading()
						let list
						
						if(this.nameval == '0') {
							list = {
							aiSign: 0,
							allotStatus:0,
							loanPerfectInfo: this.perfect,
							isInfoPass: this.warehousing,
							loanAdCodeFirst: this.model2,
							loanAdCodeSecond: this.model3,
							channelCode: this.channel,
							limitNum: this.num1,
							startTime: this.ConsultationTime,
							lastTime: this.ConsultationEndTime,
							queryTime: this.registrationtime,
							queryTimeOrder: this.timesequencing,
							key: this.queryCriteria,
							value: this.queryCriteriavalue,

							loanUserCodeList: this.loanUserCodeList,
							seatCode: this.formValidate.seatNumber
						}
						} else if(this.nameval == '1') {
							list = {
								aiSign : 1,
								allotStatus:0,
								loanPerfectInfo: this.perfectStay,
								isInfoPass: this.warehousingStay,
								loanAdCodeFirst: this.model4,
								loanAdCodeSecond: this.model5,
								channelCode: this.channelStay,
								limitNum: this.num2,
								startTime: this.ConsultationTimeStay,
								lastTime: this.ConsultationEndTimeStay,
								queryTime: this.registrationtimeStay,
								queryTimeOrder: this.timesequencingStay,
								key: this.queryCriteriaStay,
								value: this.queryCriteriavalueStay,
								loanUserCodeList: this.loanUserCodeList,
								seatCode: this.formValidate.seatNumber
							}
							
						} else if(this.nameval == '2') {
							list = {
								aiSign : 2,
								allotStatus:0,
								loanUserCodes: this.loanUserCodeList,
								loanPerfectInfo: this.perfectalready,
								isInfoPass: this.warehousingalready,
								loanAdCodeFirst: this.model6,
								loanAdCodeSecond: this.model7,
								channelCode: this.channelalready,
								limitNum: this.num3,
								startTime: this.ConsultationTimealready,
								lastTime: this.ConsultationEndTimealready,
								queryTime: this.registrationtimealready,
								queryTimeOrder: this.timesequencingalready,
								key: this.queryCriteriaready,
								value: this.queryCriteriavalueready,
								loanUserCodeList: this.loanUserCodeList,
								seatCode: this.formValidate.seatNumber
							}
						}
						if (this.allcheck) {		
							list.loanUserCodeList = []							
						}
						this.http.post(BASE_URL + '/sale/userinfo/batchDistributionLoanUser', list)
							.then((resp) => {
								if(resp.code == 'success') {
									this.modal1 = false
									this.$Modal.success({
										title: '温馨提示',
										content: '<p>分配成功</p>',
										onOk: () => {
											this.value1 = this.nameval
											if(this.nameval == '0') {
												this.consultingorders(1)
											} else if(this.nameval == '1') {
												this.Orderrobbing(1)
											} else if(this.nameval == '2') {
												this.bidorder(1)
											}
											// this.formValidate.seatNumber = ''
											this.loanUserCodeList = []
										}
									})
									this.$refs[name].resetFields()

								} else {
									this.$Message.info(resp.message)
								}
							})
							.catch(() => {})
						// this.$refs[name].resetFields()  
					}
				})
			},
			handleReset2(name) {
				this.loanUserCodeList = []
				this.$refs[name].resetFields()
			},
			// 待分配会员列表
			consultingorders(startRow) {
				this.selectionChangecodelist = []
				this.loading3 = true			
				let date1 = Date.parse(new Date(this.ConsultationTime)) / 1000;			
				let date2 = Date.parse(new Date(this.ConsultationEndTime)) / 1000
				if(date1 > date2) {
					this.loading3 = false
					this.isDatetime()
					return false
				}			
				let list = {
					aiSign: 0,
					loanPerfectInfo: this.perfect, //是否完善信息
					isInfoPass: this.warehousing, //是否入库
					loanAdCodeFirst: this.model2, //省
					loanAdCodeSecond: this.model3, //市      
					channelCode: this.channel, //注册渠道      
					limitNum: this.num1, //查询数量
					startTime: this.ConsultationTime,
					lastTime: this.ConsultationEndTime,
					queryTime: this.registrationtime, //查询时间
					queryTimeOrder: this.timesequencing, //时间排序
					key: this.queryCriteria,
					value: this.queryCriteriavalue,
					pageNum: startRow,
					pageSize: this.endRow,
				}
				this.http.post(BASE_URL + '/sale/userinfo/queryNotAllotUserInfoPage', list)
					.then((resp) => {
						if(resp.code == 'success') {
							this.loading3 = false
							this.data6 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow =
								Math.ceil(resp.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(resp.data.startRow / this.endRow);
						} else {
							this.loading3 = false
							this.$Message.info(resp.message)
						}
					})
					.catch(() => {})
			},
			// 待分配会员列表-待初审
			Orderrobbing(startRow) {
				this.selectionChangecodelist = []
				this.loading3 = true
				let date1 = Date.parse(new Date(this.ConsultationTimeStay)) / 1000;			
				let date2 = Date.parse(new Date(this.ConsultationEndTimeStay)) / 1000	
				if(date1 > date2) {
					this.loading3 = false
					this.isDatetime()
					return false
				}
				let list = {
					aiSign: 1,
					loanPerfectInfo: this.perfectStay, //是否完善信息
					isInfoPass: this.warehousingStay, //是否入库
					loanAdCodeFirst: this.model4, //省
					loanAdCodeSecond: this.model5, //市      
					channelCode: this.channelStay, //注册渠道      
					limitNum: this.num2, //查询数量
					startTime: this.ConsultationTimeStay,
					lastTime: this.ConsultationEndTimeStay,
					queryTime: this.registrationtimeStay, //查询时间
					queryTimeOrder: this.timesequencingStay, //时间排序
					key: this.queryCriteriaStay,
					value: this.queryCriteriavalueStay,
					pageNum: startRow,
					pageSize: this.endRow,
				}
				this.http.post(BASE_URL + '/sale/userinfo/queryNotAllotUserInfoPage', list)
					.then((resp) => {
						if(resp.code == 'success') {
							this.loading3 = false
							this.data7 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow =
								Math.ceil(resp.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(resp.data.startRow / this.endRow);
						} else {
							this.loading3 = false
							this.$Message.info(resp.message)
						}
					})
					.catch(() => {})

			},
			// 点击tab切换
			tabswitch(name) {
				// 时间还原
				this.loanUserCodeList = []
				this.ConsultationTime = ""
				this.ConsultationTimeStay = ""
				this.ConsultationEndTime = ""
				this.ConsultationEndTimeStay = ""
				this.total = 0
				this.startRow = 1
				this.endRow = 10
				this.nameval = name
				if(name == '2') {
					this.bidorder(1)
				} else if(name == '0') {
					this.consultingorders(1)
				} else if(name == '1') {
					this.Orderrobbing(1)
				}

			},
			// 已初审
			bidorder(startRow) {
				this.selectionChangecodelist = []
				this.loading3 = true
				let date1 = Date.parse(new Date(this.ConsultationTimealready)) / 1000;			
				let date2 = Date.parse(new Date(this.ConsultationEndTimealready)) / 1000	
				if(date1 > date2) {
					this.loading3 = false
					this.isDatetime()
					return false
				}
				let list = {
					aiSign: 2,
					loanPerfectInfo: this.perfectalready, //是否完善信息
					isInfoPass: this.warehousingalready, //是否入库
					loanAdCodeFirst: this.model6, //省
					loanAdCodeSecond: this.model7, //市      
					channelCode: this.channelalready, //注册渠道      
					limitNum: this.num3, //查询数量
					startTime: this.ConsultationTimealready,
					lastTime: this.ConsultationEndTimealready,
					queryTime: this.registrationtimealready, //查询时间
					queryTimeOrder: this.timesequencingalready, //时间排序
					key: this.queryCriteriaready,
					value: this.queryCriteriavalueready,
					pageNum: startRow,
					pageSize: this.endRow,
				}
				this.http.post(BASE_URL + '/sale/userinfo/queryNotAllotUserInfoPage', list)
					.then((resp) => {
						if(resp.code == 'success') {
							this.loading3 = false
							this.data8 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow =
								Math.ceil(resp.data.startRow / this.endRow) == 0 ?
								1 :
								Math.ceil(resp.data.startRow / this.endRow);

						} else {
							this.$Message.info(resp.message)
							this.loading3 = false
						}
					})
					.catch(() => {})

			},
			// 时间校验提示框
			isDatetime() {
				this.$Modal.warning({
					title: "提示",
					content: "<p>开始时间不得大于结束时间</p>"
				});
			},
			// 预览
			handleUpload(file) {
				//  if(file.size > 22949339){
				//   this.value9 = ""
				//   this.$Message.info("请选择20兆以内的文件")
				//   return false
				// }
				let splic = file.name.split('.')
				// if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
				//   this.formValidateupload.filecontent = file.name
				//   this.file = file
				//     return false
				//   }
				if(splic[splic.length - 1] == 'xlsx' || splic[splic.length - 1] == 'xls') {
					let formData = new FormData()
					formData.append('file', file)
					formData.append('bucket', 'sale')
					formData.append('dirs', 'errorFile')
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						timeout: 1000 * 60 * 5
					}
					this.http.post(BASE_URL + '/fileUpload', formData, config)
						.then((resp) => {
							if(resp.code == 'success') {
								this.formValidateupload.filecontent = file.name
								this.file = resp.data
							} else {
								this.$Message.info(resp.message)
							}
						})
						.catch(err => {
							this.fileerror = 'error'
						})
					return false
				}
			},
			// 上传文件
			uploadsubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.loading = true
						let data = {
							url: this.file,
							uploadMemo: this.formValidateupload.remarks

						}
						this.http.post(BASE_URL + '/sale/userinfo/uploadFileExcel', data)
							.then(data => {
								if(data.code == "success") {
									this.modal2 = false
									this.$Modal.success({
										title: "温馨提示",
										content: "<p>上传成功</p>",
										onOk: () => {
											this.$refs['formValidateupload'].resetFields();
											this.bidorder(1)
										},
									});
									this.loading = false;
								} else {
									this.$Message.error(data.message)
									this.$refs['formValidateupload'].resetFields();
									this.loading = false;
								}
							})
							.catch(err => {
								this.loading3 = false;
								console.log(err);
							});

					} else {
						// this.$Message.error('Fail!');
						this.changeLoading()
					}
				})
			},
			uploadreset(name) {
				this.$refs[name].resetFields()
			},
			// 上传格式校验
			handleFormatError1(file) {
				this.$Message.info("文件格式不正确,请上传excel格式文件")
			},
			//导出
			exports() {		
				this.loanUserCodeList = this.selectionChangecodelist
				this.loading2 = true;
				let httpUrl =
					BASE_URL + "/sale/userinfo/export";
				let formData = new FormData();
				if(this.num1 == null) {
					this.num1 = ''
				}
				if(this.nameval == '0') {
					let date1 = Date.parse(new Date(this.ConsultationTime)) / 1000;			
					let date2 = Date.parse(new Date(this.ConsultationEndTime)) / 1000
					if(date1 > date2) {
						this.isDatetime()
						return false
					}
					if(date1 == undefined) {
						date1 = ''
					}
					if(date2 == undefined) {
						date2 = ''
					}
					if(this.num1 == null) {
						this.num1 = ''
					}
					formData.append("aiSign", 0);
					formData.append("loanUserCodes", this.loanUserCodeList);
					formData.append("loanPerfectInfo", this.perfect);
					formData.append("pageNum", this.startRow, );
					formData.append("pageSize", this.endRow);
					formData.append("isInfoPass", this.warehousing);
					formData.append("loanAdCodeFirst", this.model2);
					formData.append("loanAdCodeSecond", this.model3);
					formData.append("channelCode", this.channel);
					formData.append("limitNum", this.num1);
					formData.append("startTime", this.ConsultationTime);
					formData.append("lastTime", this.ConsultationEndTime);
					formData.append("queryTime", this.registrationtime);
					formData.append("queryTimeOrder", this.timesequencing);
					formData.append("key", this.queryCriteria);
					formData.append("value", this.queryCriteriavalue);					
				} else if(this.nameval == '1') {
					let date1 = Date.parse(new Date(this.ConsultationTimeStay)) / 1000;			
					let date2 = Date.parse(new Date(this.ConsultationEndTimeStay)) / 1000
					if(date1 > date2) {
						this.isDatetime()
						return false
					}
					if(date1 == undefined) {
						date1 = ''
					}
					if(date2 == undefined) {
						date2 = ''
					}
					if(this.num2 == null) {
						this.num2 = ''
					}
					formData.append("aiSign", 1);
					formData.append("loanUserCodes", this.loanUserCodeList);
					formData.append("loanPerfectInfo", this.perfectStay);
					formData.append("pageNum", this.startRow, );
					formData.append("pageSize", this.endRow);
					formData.append("isInfoPass", this.warehousingStay);
					formData.append("loanAdCodeFirst", this.model4);
					formData.append("loanAdCodeSecond", this.model5);
					formData.append("channelCode", this.channelStay);
					formData.append("limitNum", this.num2);
					formData.append("startTime", this.ConsultationTimeStay);
					formData.append("lastTime", this.ConsultationEndTimeStay);
					formData.append("queryTime", this.registrationtimeStay);
					formData.append("queryTimeOrder", this.timesequencingStay);
					formData.append("key", this.queryCriteriaStay);
					formData.append("value", this.queryCriteriavalueStay);
				} else if(this.nameval == '2') {
					let date1 = Date.parse(new Date(this.ConsultationTimealready)) / 1000;			
					let date2 = Date.parse(new Date(this.ConsultationEndTimealready)) / 1000
					if(date1 > date2) {
						this.isDatetime()
						return false
					}
					if(date1 == undefined) {
						date1 = ''
					}
					if(date2 == undefined) {
						date2 = ''
					}
					if(this.num3 == null) {
						this.num3 = ''
					}
					formData.append("aiSign", 2);
					formData.append("loanUserCodes", this.loanUserCodeList);
					formData.append("loanPerfectInfo", this.perfectalready);
					formData.append("pageNum", this.startRow, );
					formData.append("pageSize", this.endRow);
					formData.append("isInfoPass", this.warehousingalready);
					formData.append("loanAdCodeFirst", this.model6);
					formData.append("loanAdCodeSecond", this.model7);
					formData.append("channelCode", this.channelalready);
					formData.append("limitNum", this.num3);
					formData.append("startTime", this.ConsultationTimealready);
					formData.append("lastTime", this.ConsultationEndTimealready);
					formData.append("queryTime", this.registrationtimealready);
					formData.append("queryTimeOrder", this.timesequencingalready);
					formData.append("key", this.queryCriteriaready);
					formData.append("value", this.queryCriteriavalueready);
				}
				if (this.allcheck) {
					formData.set('loanUserCodes','')
				}
				utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
					this.loading2 = false;
				});
			},
			// 查看记录
			viewRecord() {
				this.$router.push({
					path: '/uploadRecord'
				})
			},
			// 分配code
			selectionChange(params) {
				this.loanUserCodeList = []
				if(params.length < 1) {
					this.allcheck = false
					this.selectionChangecodelist = []
					this.formValidate.numpeop = '1人'
				} else {
					this.selectionChangecodelist = []
					this.numpeop = params.length + '人'
					if (this.allcheck) {
						this.numpeop = this.total + '人'
						if (params.length<this.endRow&&params.length<this.total) {				
							this.allcheck = false
							this.numpeop = params.length + '人'
						}
					}			
					for(let i = 0; i < params.length; i++) {
						this.selectionChangecodelist.push(params[i].loanUserCode)
					}
				}
			},
			// 点击全选
			allcheckouttrue (selection) {
				this.allcheck = true
			},
			// allcheckoutfalse (selection) {
			// 	alert(1)
			// 	this.allcheck = false
				
			// 	console.log(this.loanUserCodeList)
			// },
			batchAllocation() {
				this.loanUserCodeList = this.selectionChangecodelist
				this.formValidate.numpeop = this.numpeop
				if(this.loanUserCodeList.length < 1) {
					this.$Modal.warning({
						title: "提示",
						content: "<p>请先选择分配名单</p>"
					});
					return false
				} else {
					this.$Modal.confirm({
						title: "温馨提示",
						content: "<p>确认要批量分配吗？</p>",
						onOk: () => {
							this.modal1 = true
						},
						onCancel: () => {}
					});
				}
			},
			Stime(v){
				if(v==''){
					this.ConsultationTime = v
				}else{					
					this.ConsultationTime=v+' 00:00:00'					
				}
			},
			Etime(v){
				if(v==''){
					this.ConsultationEndTime = v
				}else{
					this.ConsultationEndTime=v+' 23:59:59'
				}
			},
			Stime1(v){
				if(v==''){
					this.ConsultationTimeStay = v
				}else{					
					this.ConsultationTimeStay=v+' 00:00:00'					
				}
			},
			Etime1(v){
				if(v==''){
					this.ConsultationEndTimeStay = v
				}else{
					this.ConsultationEndTimeStay=v+' 23:59:59'
				}
			},
			Stime2(v){
				if(v==''){
					this.ConsultationTimealready = v
				}else{					
					this.ConsultationTimealready=v+' 00:00:00'					
				}
			},
			Etime2(v){
				if(v==''){
					this.ConsultationEndTimealready = v
				}else{
					this.ConsultationEndTimealready=v+' 23:59:59'
				}
			},
		},
		mounted() {

			this.created()
			this.consultingorders(1)
			this.http.post(BASE_URL + '/sale/userinfo/queryUserInfoPageFilter', {})
				.then((resp) => {
					if(resp.code == 'success') {
						this.queryCriterialist = resp.data.conditionStr
						this.queryCriteria = this.queryCriteriaStay = this.queryCriteriaready = resp.data.conditionStr[0].value
						this.timesequencingList = resp.data.order
						this.timesequencing = this.timesequencingStay = this.timesequencingalready = resp.data.order[0].value
						this.orderStatusList = resp.data.time
						this.registrationtime = this.registrationtimeStay = this.registrationtimealready = resp.data.time[0].value
						this.queryCriteriaStay

					} else {
						this.$Message.info(resp.message)
					}
				})
				.catch(() => {})
			// 坐席编号
			this.http.post(BASE_URL + '/sale/saleSeat/getSaleSeatInfoList', {
					seatType: 2
				})
				.then((resp) => {
					if(resp.code == 'success') {
						this.equityList = resp.data

					} else {
						this.$Message.info(resp.message)
					}
				})
				.catch(() => {})

		}
	}
</script>
<style lang="less" scoped>

</style>