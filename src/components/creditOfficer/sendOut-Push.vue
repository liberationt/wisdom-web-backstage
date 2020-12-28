<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;PUSH</span>
			</p>
		</div>
		<div class="homePage contentcss">
			<h1 class="homePage_h1">
          发送PUSH
        </h1>
			<hr>
			<!-- push信息框 -->
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" style="margin-top:40px;">
				<FormItem label="push类型：" prop="pushType">
					<Select :disabled='disabledshow' v-model="formValidate.pushType" @on-change="pushTypeClick" placeholder="请选择" style="width:220px;">
						<Option v-for="item in pushTypeList" :value='item.value'>{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="推送时间：" prop="pushDate" class="pushtime">
					<Row>
						<Col span="7">
						<Select :disabled='disabledshow' v-model="formValidate.pushDate" @on-change="pushtimetype" placeholder="请选择" style="width:220px;" class="mr10">
							<Option v-for="item in pushDateList" :value='item.value'>{{item.label}}</Option>
						</Select>
						</Col>
						<Col span="12">
						<FormItem prop="date" v-if="designatedpush">
							<DatePicker :disabled='disabledshow' type="datetime" format="yyyy-MM-dd HH:mm:ss"  :options="options4" placeholder="请选择时间" v-model="formValidate.date"></DatePicker>
						</FormItem>
						<FormItem v-if="regularPush" prop="cyclell" style="height:50px">
							<CheckboxGroup v-model="formValidate.cyclell">
								<Checkbox :disabled='disabledshow' v-for="item in this.conmmonList.pushCycleTypeList" :label='item.value'>{{item.label}}</Checkbox>
							</CheckboxGroup>
						</FormItem>
						<!-- 时间范围 -->
						<Row v-if="regularPush">
							<Col span="8">
							<FormItem prop="cycleDateS">
								<DatePicker :disabled='disabledshow' type="date" format="yyyy-MM-dd" @on-change="datepickerl2" placeholder="开始时间" :options="options4" v-model="formValidate.cycleDateS"></DatePicker>
							</FormItem>
							</Col>
							<Col span="8">
							<FormItem prop="cycleDateE">
								<DatePicker :disabled='disabledshow' type="date" format="yyyy-MM-dd" @on-change="datepickerl3" placeholder="结束时间" :options="options4" v-model="formValidate.cycleDateE"></DatePicker>
							</FormItem>
							</Col>
							<Col span="8">
							<FormItem prop="cycleTime">
								<TimePicker :disabled='disabledshow' type="time" format="HH:mm:ss" placeholder="时分秒" v-model="formValidate.cycleTime" style="width:120px;"></TimePicker>
							</FormItem>
							</Col>
						</Row>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="PUSH推送平台：" prop="pushPlatform">
					<Select :disabled='disabledshow' v-model="formValidate.pushPlatform" placeholder="请选择" style="width:220px;">
						<Option v-for="item in this.conmmonList.pushPlatformList" :value='item.value'>{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="PUSH发送对象：" prop="pushObject">
					<Select :disabled='disabledshow' v-model="formValidate.pushObject" placeholder="请选择" style="width:220px;">
						<Option v-for="item in this.conmmonList.pushObjectTypeList" :value='item.value'>{{item.label}}</Option>
					</Select>
				</FormItem>
				<!-- push 发送条件 -->
				<FormItem label="PUSH发送对象条件：" v-if="this.formValidate.pushObject == 2">
					<FormItem prop="RealName">
						<ul class="clearfix">
							<li class="left mb5 mr20">
								<span>是否实名：</span>
								<Select :disabled='disabledshow' v-model="formValidate.RealName" placeholder="不限" style="width:80px;">
									<Option v-for="item in realStatusList" :value='item.value'>{{item.label}}</Option>
								</Select>
							</li>
							<li v-if="isApp=='xindai'" class="left mb5 mr20">
								<span class="">服务介绍状态：</span>
								<Select :disabled='disabledshow' v-model="formValidate.serviceState" placeholder="不限" style="width:90px;">
									<Option v-for="item in serviceStatusList" :value='item.value'>{{item.label}}</Option>
								</Select>
							</li>
							<li v-if="isApp=='xindai'" class="left mb5 mr20">
								<span class="">是否上架：</span>
								<Select :disabled='disabledshow' v-model="formValidate.isShelf" placeholder="不限" style="width:80px;">
									<Option v-for="item in servicePutawayStatusList" :value='item.value'>{{item.label}}</Option>
								</Select>
							</li>
							<li v-if="isApp=='xindai'" class="left mb5 mr20">
								<span class="">是否会员：</span>
								<Select :disabled='disabledshow' v-model="formValidate.isMember" placeholder="不限" style="width:100px;">
									<Option v-for="item in vipStatusList" :value='item.value'>{{item.label}}</Option>
								</Select>
							</li>
							<li v-if="isApp=='xindai'" class="left mb5 mr20">
								<span class="">赞豆余额：</span>
								<InputNumber :disabled='disabledshow' :max="9999999" :min="0" v-model="formValidate.ZambiaBalance"></InputNumber><span>赞豆</span>
								<span> -- </span>
								<InputNumber :disabled='disabledshow' :max="9999999" :min="0" v-model="formValidate.ZambiaBalanceE"></InputNumber><span>赞豆</span>
							</li>
						</ul>
					</FormItem>
					<FormItem class="mt10">
						<ul class="clearfix">
							<li class="left">
								<span>上次登录时间：</span>
								<InputNumber :disabled='disabledshow' :max="9999999" :min="0" v-model="formValidate.lastTime"></InputNumber>
								<Select :disabled='disabledshow' v-model="formValidate.lastTimeValue" placeholder="请选择" style="width:80px;">
									<Option v-for="item in prevLoginTimeUnitList" :value='item.value'>{{item.label}}</Option>
								</Select>
								<span>前</span>
							</li>
							<li v-if="isApp=='xindai'" class="left">
								<span class="ml20">上次抢单时间：</span>
								<InputNumber :disabled='disabledshow' :max="9999999" :min="0" v-model="formValidate.lastSheetTime"></InputNumber>
								<Select :disabled='disabledshow' v-model="formValidate.lastSheetTimeValue" placeholder="请选择" style="width:80px;">
									<Option v-for="item in prevOrderTimeUnitList" :value='item.value'>{{item.label}}</Option>
								</Select>
								<span>前</span>

							</li>
						</ul>
					</FormItem>
					<FormItem class="mt10">
						<span>所属城市：</span>
						<Button type="primary" @click="choiceCity">选择城市</Button>
					</FormItem>
				</FormItem>
				<!-- 导入发送对象 -->
				<FormItem label="导入发送对象：" prop="uploadFile" v-if="this.formValidate.pushObject == 3">
					<div class="clearfix">
						<Upload :before-upload="handleUpload" :show-upload-list="true" :format="['xlsx', 'xls']" :on-format-error="handleFormatError2" action='' class="left">
							<Button :disabled='disabledshow' type="info" icon="ios-cloud-upload-outline">上传文件</Button>
						</Upload>
					</div>
					<div>
						<ul v-if="filetag.length>0">
							<li v-for="(item,index) in filetag">
								<Tag :closable='!disabledshow' @on-close="handleClose(index)">{{item}}</Tag>
							</li>
						</ul>
					</div>
					<!-- <Upload 
					multiple		
					action="//jsonplaceholder.typicode.com/posts/">
						<Button icon="ios-cloud-upload-outline">上传文件</Button>
						<Input v-model="formValidate.uploadFile" placeholder="选择文件" disabled v-show="false" style="width: 70px;" />
					</Upload> -->
				</FormItem>
				<!-- 标题 -->
				<FormItem label="标题：" prop="titleName">
					<Input :disabled='disabledshow' v-model="formValidate.titleName" placeholder="请输入标题" style="width:220px;"></Input>
				</FormItem>
				<FormItem label="副标题：" prop="viceContent" class=" cleafix">
					<Input :disabled='disabledshow' type="textarea" :autosize="{minRows: 4,maxRows: 5}" v-model="formValidate.viceContent" placeholder="请输入副标题" style="width:220px;"></Input>
				</FormItem>
				<!-- 跳转类型 -->
				<FormItem label="跳转类型：" prop="jumpType">
					<Select :disabled='disabledshow' v-model="formValidate.jumpType" placeholder="请选择" style="width:220px;">
						<Option :value='item.value' v-for="item in this.conmmonList.msgTypeList">{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem prop="nativePage" v-if="this.formValidate.jumpType == 1">
					<Select :disabled='disabledshow' v-model="formValidate.nativePage" @on-change='jumpurll' placeholder="请选择" style="width:220px;">
						<Option v-for="(item,index) in this.conmmonList.nativeAppRouteList" :value='item.jumpUrl' :data='item.isParam' @click.native="clickFn(index)">{{item.jumpName}}</Option>
					</Select>
				</FormItem>
				<FormItem v-if="detailscode" label="" prop="isParam">
					<Input :disabled='disabledshow' type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formValidate.isParam" placeholder="请输入参数" style="width:200px"></Input>
				</FormItem>
				<FormItem label="跳转url：" prop="jumpUrl" v-if="this.formValidate.jumpType == 2">
					<Input :disabled='disabledshow' v-model="formValidate.jumpUrl" placeholder="请输入url" style="width:220px;"></Input>
				</FormItem>
				<FormItem>
					<Button v-if="!this.$route.query.pushCode" type="primary" @click="handleSubmit('formValidate')">提交</Button>
					<Button v-if="this.$route.query.examine=='true'" class="ml10" type="primary" @click="auditpass(1)">审核通过</Button>
					<Button v-if="this.$route.query.examine=='true'" class="ml10" type="primary" @click="auditpass(2)">审核拒绝</Button>
					<Button @click="handleReset" style="margin-left: 10px">返回</Button>
				</FormItem>
			</Form>
		</div>
		<!-- 城市model框展示 -->
		<Modal v-model="cityModal" draggable scrollable title="选择城市" class="cityModal" width="900" @on-ok="cityOk" @on-cancel="cityCancel" :mask-closable="false">
			<div style="max-height:450px;overflow-y: scroll;">
				<div v-for="(item,index) in data6" class="mb15">
					<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
						<strong class="mr10">省份:</strong>
						<Checkbox :disabled='disabledshow' :value="data7[index].checkAll" @click.prevent.native="handleCheckAll(index,item.code)">{{item.name}}</Checkbox>
					</div>
					<CheckboxGroup class="clearfix" v-model="data7[index].checkAllGroup" @on-change="checkAllGroupChange(data7[index].checkAllGroup,index)">
						<strong v-if="item.cityList.length>0" class="left mr10">城市:</strong>
						<div class="left" style="width:800px">
							<Checkbox :disabled='disabledshow' v-for="res in item.cityList" :label="res.code" :data="res.code">{{res.name}}</Checkbox>
						</div>
					</CheckboxGroup>
				</div>
			</div>
		</Modal>

		<!-- 审核通过 -->

	</div>
</template>
<script>
	import utils from "../../utils/utils";
	export default {
		data() {
			return {
				cityModal: false,
				disabledshow: false,
				detailscode: false,
				designatedpush: false,
				regularPush: false,
				// filename:'',
				fileerror: '',
				filetag: [],
				fileList: [],
				isParam: '',
				options4: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},
				isApp: this.$route.query.isapp,
				conmmonList: [], //总数据
				pushTypeList: [],
				pushDateList: [{
					value: '',
					label: ''
				}],
				realStatusList: [{
					value: '',
					label: ''
				}], //实名状态
				serviceStatusList: [], //服务介绍状态
				servicePutawayStatusList: [], // 是否上架
				vipStatusList: [], //是否会员
				prevLoginTimeUnitList: [{
					value: '',
					label: ''
				}], //上次登录时间
				prevOrderTimeUnitList: [], //上次抢单时间
				formValidate: {
					pushType: "",
					pushDate: "",
					date: '',
					cyclell: [], //周期
					cycleDateS: "", //开始时间
					cycleDateE: "", //结束时间
					cycleTime: "", // 时分秒
					pushPlatform: "", //推送平台
					pushObject: "", //推送对象
					titleName: "", //标题名称 
					jumpType: "", //跳转类型
					jumpUrl: "", //跳转url
					nativePage: "", //原生页面
					RealName: '', //是否实名
					serviceState: '', //服务状态
					isShelf: '', // 是否上架
					isMember: '', //是否会员
					isParam: '',
					ZambiaBalance: "", //赞豆余额
					ZambiaBalanceE: "", //赞豆余额
					lastTime: "", //上次登录时间
					lastSheetTime: "", //上次抢单时间
					lastTimeValue: 3,
					lastSheetTimeValue: 1,
					uploadFile: "", //上传文件
					viceContent: "", //副文本内容
				},
				ruleValidate: {
					pushType: [{
						required: true,
						type: 'number',
						message: "请选择push类型",
						trigger: "change"
					}],
					pushDate: [{
						required: true,
						type: 'number',
						message: "请选择推送时间",
						trigger: "change"
					}],
					cyclell: [{
						required: true,
						type: 'array',
						min: 1,
						message: '请选择周期',
						trigger: 'change'
					}, ],
					// date: [{
					// 	required: true,
					// 	type: 'string',
					// 	message: '请选择指定推送时间',
					// 	trigger: 'blur'
					// }],
					cycleDateS: [{
						required: true,
						type: 'string',
						message: '请选择开始时间',
						trigger: 'change'
					}],
					cycleDateE: [{
						required: true,
						type: 'string',
						message: '请选择结束时间',
						trigger: 'change'
					}],
					cycleTime: [{
						required: true,
						type: 'string',
						message: '请选择时分秒',
						trigger: 'change'
					}],
					pushPlatform: [{
						required: true,
						type: 'number',
						message: "请选择推送平台",
						trigger: "change"
					}],
					pushObject: [{
						required: true,
						type: 'number',
						message: "请选择推送对象",
						trigger: "change"
					}],
					titleName: [{
						required: true,
						message: '请输入标题名称',
						trigger: 'blur'
					}],
					jumpType: [{
						required: true,
						type: 'number',
						message: "请选择跳转类型",
						trigger: "change"
					}],
					jumpUrl: [{
						required: true,
						message: '请输入跳转url',
						trigger: 'blur'
					}],
					nativePage: [{
						required: true,
						message: "请选择原生页面",
						trigger: "change"
					}],
					// uploadFile: [{
					// 	required: true,
					// 	message: '请输上传文件',
					// 	trigger: 'blur'
					// }],
					viceContent: [{
						required: true,
						message: '请输入副标题',
						trigger: 'blur'
					}],
					isParam: [{
						required: true,
						message: '请输入参数',
						trigger: 'blur'
					}],
				},
				checkboxValue: [], //市
				data6: [],
				data7: [{
					checkAll: false,
					checkAllGroup: []
				}],
				provinceCodeList: []
			};
		},
		methods: {
			// 选择省
			handleCheckAll(index, code) {
				this.data7[index].checkAll = !this.data7[index].checkAll;
				if(this.data7[index].checkAll) {
					this.provinceCodeList.push(code) //省code
					let citylist = []
					for(let i = 0; i < this.data6[index].cityList.length; i++) {
						citylist.push(this.data6[index].cityList[i].code)
					}
					this.data7[index].checkAllGroup = citylist;

				} else {
					this.data7[index].checkAllGroup = [];
					this.provinceCodeList.forEach((v, i) => {
						if(v == code) {
							this.provinceCodeList.splice(i, 1)
						}
					})
				}
			},
			// 选择市
			checkAllGroupChange(data, index) {
				if(data.length === this.data6[index].cityList.length) {
					this.data7[index].checkAll = true;
					this.provinceCodeList.push(this.data6[index].code) //城市
				} else if(data.length > 0) {
					this.data7[index].checkAll = false;
					this.provinceCodeList.forEach((v, i) => {
						if(v == this.data6[index].code) {
							this.provinceCodeList.splice(i, 1) //
						}
					})
				} else {
					this.data7[index].checkAll = false;
					this.provinceCodeList.forEach((v, i) => {
						if(v == this.data6[index].code) {
							this.provinceCodeList.splice(i, 1) //
						}
					})
				}
			},
			// 选择城市
			choiceCity() {
				this.cityModal = true
			},
			// 指定推送时间
			// datepickerl(v) {
			// 	this.formValidate.date = v
			// },
			datepickerl2(v) {
				this.formValidate.cycleDateS = v
			},
			datepickerl3(v) {
				this.formValidate.cycleDateE = v
			},
			// 原生页面跳转
			clickFn(index) {
				this.isParam = this.conmmonList.nativeAppRouteList[index].isParam
			},
			jumpurll(v) {
				this.formValidate.isParam = v
				for(let i = 0; i < this.conmmonList.nativeAppRouteList.length; i++) {
					if(v == this.conmmonList.nativeAppRouteList[i].jumpUrl) {
						if(this.conmmonList.nativeAppRouteList[i].isParam == 1) {
							this.detailscode = true
							this.formValidate.isParam = ''
							return false
						}
					} else {
						this.detailscode = false
						this.formValidate.isParam = ''
					}
				}
			},
			// 导入文件
			// 上传
			handleUpload(file) {
				if(file.size > 2097152) {
					this.$Message.info("请选择2兆以内的文件")
					return false
				}
				let splic = file.name.split('.')
				if(splic[splic.length - 1] == 'xlsx' || splic[splic.length - 1] == 'xls') {
					// this.filename = ''
					this.fileerror = ''
					let formData = new FormData()
					formData.append('file', file)
					formData.append('bucket', 'push')
					formData.append('dirs', 'excel')
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						timeout: 1000 * 60 * 5
					}
					this.http.post(BASE_URL + '/fileUpload', formData, config)
						.then((resp) => {
							if(resp.code == 'success') {
								// this.filename = resp.data
								this.fileList.push(resp.data)
								const title = '提示'
								let content = '<p>上传成功</p>'
								this.$Modal.success({
									title: title,
									content: content
								})
								// let obj = new Object()
								// obj.name = file.name,
								// 	obj.show = true
								this.filetag.push(resp.data)

							} else {
								this.$Message.error(resp.message);
							}
						})
						.catch(err => {
							this.fileerror = 'error'
						})
					// this.namelist = file.name
					return false
				}
			},
			// 上传格式校验
			handleFormatError2(file) {
				this.namelist = ''
				this.$Message.info("文件格式不正确,请上传excel格式文件")
			},
			// 上传文件列表操作
			handleClose(index) {
				this.http.post(BASE_URL + "/ossDeleteFile?ossPath=" + this.fileList[index]).then(resp => {
						if(resp.code == "success") {
							// this.filetag[index].show = false;
							this.fileList.splice(index, 1)
							this.filetag.splice(index, 1)
						} else {
							this.$Message.info(resp.message);

						}
					})
					.catch(error => {
						console.log(error);
					});

			},
			//push类型所有数据
			pushTypeoption() {
				let url;
				if(this.isApp == "xindai") {
					url = "/loan/push/qdx/saveViewData";
				} else if(this.isApp == "huazan") {
					url = "/loan/push/hz/saveViewData";
				}
				this.httpUrl(
					url, {
						appCode: utils.getCookie("appCode")
					},
					data => {
						if(data.code == "success") {
							this.data7 = []
							for(let i = 0; i < data.data.pushSelect.provinceList.length; i++) {
								let obj = new Object()
								obj.checkAll = false
								obj.checkAllGroup = []
								this.data7.push(obj)
							}
							const {
								pushTypeList
							} = data.data;
							this.conmmonList = data.data
							this.pushTypeList = pushTypeList;
							if(this.isApp == "xindai") {
								this.serviceStatusList = data.data.pushSelect.serviceStatusList
								this.serviceStatusList.unshift({
									label: "不限",
									value: ''
								})
							}
							this.realStatusList = data.data.pushSelect.realStatusList
							this.realStatusList.unshift({
								label: "不限",
								value: ''
							})
							if(this.isApp == "xindai") {
								this.servicePutawayStatusList = data.data.pushSelect.servicePutawayStatusList
								this.servicePutawayStatusList.unshift({
									label: "不限",
									value: ''
								})
							}
							if(this.isApp == "xindai") {
								this.vipStatusList = data.data.pushSelect.vipStatusList
								this.vipStatusList.unshift({
									label: "不限",
									value: ''
								})
							}
							this.prevLoginTimeUnitList = data.data.pushSelect.prevLoginTimeUnitList
							this.prevOrderTimeUnitList = data.data.pushSelect.prevOrderTimeUnitList
							this.data6 = data.data.pushSelect.provinceList
							if(this.$route.query.pushCode) {
								this.detailshowback()
							}
						} else {
							this.$Message.info(data.message)
						}
					},
					err => {
						console.log(err);
					}
				);
			},
			// 数据保存
			handleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						let datetimel = Date.parse(new Date(this.formValidate.date))
						let regulardatetime = Date.parse(new Date(this.formValidate.cycleDateS+' '+this.formValidate.cycleTime))
						let datetimell = Date.parse(new Date())
						if(this.formValidate.date == '' && this.formValidate.pushDate == 2) {
							this.$Modal.confirm({
								title: '温馨提示',
								content: '请选择指定推送时间'
							});
							return false
						}
						if(this.filetag.length < 1 && this.formValidate.pushObject == 3) {
							this.$Modal.confirm({
								title: '温馨提示',
								content: '请上传文件'
							});
							return false
						}
						if (this.formValidate.ZambiaBalance!=''&&this.formValidate.ZambiaBalanceE!='') {
							if (this.formValidate.pushObject == 2&&this.formValidate.ZambiaBalance>=this.formValidate.ZambiaBalanceE) {
								this.$Modal.confirm({
									title: '温馨提示',
									content: '赞豆最小余额不得大于等于最大余额'
								});
								return false
							}
						}

						if(datetimel <= datetimell && this.designatedpush == true){
							this.$Modal.warning({
								title: '指定时间',
								content: '<p>指定时间不能小于当前时间</p>',
								onOk: () => {
								},
								onCancel: () => {           
								}
							})
							return false
						}

						// if(regulardatetime <= datetimell && this.regularPush == true){
						// 	this.$Modal.warning({
						// 		title: '指定时间',
						// 		content: '<p>定期推送时间不能小于当前时间</p>',
						// 		onOk: () => {
						// 		},
						// 		onCancel: () => {           
						// 		}
						// 	})
						// 	return false
						// }

						let date1 = Date.parse(new Date(this.formValidate.cycleDateS+' '+this.formValidate.cycleTime)) / 1000;
						let date2 = Date.parse(new Date(this.formValidate.cycleDateE+' '+this.formValidate.cycleTime)) / 1000;
						if (date1 >= date2) {
							this.$Modal.warning({
							title: "提示",
							content: "<p>定期推送开始时间不得大于等于结束时间</p>"
							});
							return false;
						}
						if (this.regularPush||this.formValidate.pushDate == 1) {
							this.formValidate.date = ''
						}
						let list
						if(this.isApp == "xindai") {
							list = {
								pushType: this.formValidate.pushType, //push类型
								pushTimeType: this.formValidate.pushDate, //推送时间类型
								pushTimeConfig: {	
									pointDate: this.formValidate.pushDate==2?utils.formatDate(this.formValidate.date,'yyyy-MM-dd hh:mm:ss'):'', //指定推送具体时间
									cycleTime: { //定期推送
										beginDate: this.formValidate.cycleDateS, //开始时间
										endDate: this.formValidate.cycleDateE, //结束时间
										pointTime: this.formValidate.cycleTime, //指定时间
										pushCycleTypeList: this.formValidate.cyclell, //定期推送周期类型
									}
								},
								pushPlatform: this.formValidate.pushPlatform, //推送平台
								pushObjectType: this.formValidate.pushObject, //发送对象
								pushObjectConfig: {
									realStatus: this.formValidate.RealName, //是否实名
									serviceStatus: this.formValidate.serviceState, //服务介绍状态
									servicePutawayStatus: this.formValidate.isShelf, //上架状态
									vipStatus: this.formValidate.isMember, //是否会员
									betweenNumber: this.formValidate.ZambiaBalance, //最小赞豆
									andNumber: this.formValidate.ZambiaBalanceE, //最大赞豆
									prevLoginTime: this.formValidate.lastTime, //上次登录时间
									prevLoginTimeUnit: this.formValidate.lastTimeValue, //上次登录时间单位
									prevOrderTime: this.formValidate.lastSheetTime, //上次抢单时间
									prevOrderTimeUnit: this.formValidate.lastSheetTimeValue, //上次抢单时间单位
									provinceCodeList: this.provinceCodeList, //省code
									cityCodeList: this.checkboxValue, //市code
									fileList: this.fileList, //导入文件列表
								},
								msgTitle: this.formValidate.titleName, //消息标题
								msgType: this.formValidate.jumpType, //跳转类型
								msgConfig: {
									content: this.formValidate.viceContent, //自定义内容
									jumpUrl: this.formValidate.nativePage, //跳转ur
									isParam: this.isParam, //是否存在参数
									h5Url: this.formValidate.jumpUrl, //h5页面地址
									paramValue: this.formValidate.isParam //自定义参数
								}
							}
						} else if(this.isApp == "huazan") {
							list = {
								pushType: this.formValidate.pushType, //push类型
								pushTimeType: this.formValidate.pushDate, //推送时间类型
								pushTimeConfig: {
									pointDate: this.formValidate.pushDate==2?utils.formatDate(this.formValidate.date,'yyyy-MM-dd hh:mm:ss'):'', //指定推送具体时间
									cycleTime: { //定期推送
										beginDate: this.formValidate.cycleDateS, //开始时间
										endDate: this.formValidate.cycleDateE, //结束时间
										pointTime: this.formValidate.cycleTime, //指定时间
										pushCycleTypeList: this.formValidate.cyclell, //定期推送周期类型
									}
								},
								pushPlatform: this.formValidate.pushPlatform, //推送平台
								pushObjectType: this.formValidate.pushObject, //发送对象
								pushObjectConfig: {
									realStatus: this.formValidate.RealName, //是否实名			
									prevLoginTime: this.formValidate.lastTime, //上次登录时间
									prevLoginTimeUnit: this.formValidate.lastTimeValue, //上次登录时间单位		
									provinceCodeList: this.provinceCodeList, //省code
									cityCodeList: this.checkboxValue, //市code
									fileList: this.fileList, //导入文件列表
								},
								msgTitle: this.formValidate.titleName, //消息标题
								msgType: this.formValidate.jumpType, //跳转类型
								msgConfig: {
									content: this.formValidate.viceContent, //自定义内容
									jumpUrl: this.formValidate.nativePage, //跳转ur
									isParam: this.isParam, //是否存在参数
									h5Url: this.formValidate.jumpUrl, //h5页面地址
									paramValue: this.formValidate.isParam //自定义参数
								}
							}
						}
						let url
						if(this.isApp == "xindai") {
							url = '/loan/push/qdx/save'
						} else {
							url = '/loan/push/hz/save'
						}
						this.http.post(BASE_URL + url, list).then(data => {
								if(data.code == 'success') {
									this.$Modal.success({
										title: '提示',
										content: data.message,
										onOk: () => {
											this.$router.push({
												path: "./push"
											});
										}
									});

								} else {
									this.$Message.info(data.message)
								}
							})
							.catch((error) => {
								console.log(error)
							})
					} else {

					}
				});
			},
			// 返回
			handleReset() {
				window.history.go(-1);
			},
			// 判断选择哪个时间展示哪个
			pushTypeClick(v) {
				if(v == 1) {
					if(!this.$route.query.pushCode) {
						this.formValidate.pushDate = 2
					}
					this.pushDateList = this.conmmonList.pushTypeList[0].pushTimeTypeList
				} else if(v == 2) {
					if(!this.$route.query.pushCode) {
						this.formValidate.pushDate = 1
						this.designatedpush = true
						this.regularPush = true
					}
					this.pushDateList = this.conmmonList.pushTypeList[1].pushTimeTypeList
				}
			},
			pushtimetype(v) {
				if(v == 2) {
					this.designatedpush = true
					this.regularPush = false
				} else if (v == 3) {
					this.regularPush = true
					this.designatedpush = false
				} else {
					this.regularPush = false
					this.designatedpush = false
				}
			},
			// 富文本开始
			onEditorBlur(editor) { //失去焦点事件    
			},
			onEditorFocus(editor) { //获得焦点事件
			},
			onEditorChange({
				editor,
				html,
				text
			}) { //编辑器文本发生变化
				//this.content可以实时获取到当前编辑器内的文本内容
			},
			// 城市数据保存
			cityOk() {
				this.checkboxValue = []
				let citylist = document.querySelectorAll('.ivu-checkbox-group-item.ivu-checkbox-wrapper-checked')
				for(let i = 0; i < citylist.length; i++) {
					this.checkboxValue.push(citylist[i].getAttribute('data'))
				}
			},
			cityCancel() {},
			httpUrl(url, data, successBack, errorBack) {
				this.http
					.post(BASE_URL + url, data)
					.then(data => {
						return successBack(data);
					})
					.catch(err => {
						return errorBack(err);
					});
			},
			// 审核通过
			auditpass(num) {
				let content
				if(num == 1) {
					content = '审核通过'
				} else {
					content = '审核拒绝'
				}
				this.$Modal.confirm({
					title: "认证审核",
					content: "<p>确认要" + content + "吗?</p>",
					onOk: () => {
						let url
						let list
						if(this.isApp == "xindai") {
							url = "/loan/push/qdx/audit"							
						} else {
							url = "/loan/push/hz/audit"						
						}
						if (num == 1) {
							list = {
								pushCode: this.$route.query.pushCode,
								auditStatus: 1
							}
						} else {
							list = {
								pushCode: this.$route.query.pushCode,
								auditStatus: 5
							}
						}
						this.http.post(BASE_URL + url, list)
							.then(resp => {
								if(resp.code == "success") {
									let tips
									if(num == 1) {
										tips = '审核成功'
									} else {
										tips = '拒绝成功'
									}
									this.$Modal.success({
										title: '提示',
										content: tips
									});
									this.$router.push({
										path: "./pushExamine"
									});
								} else {
									this.$Message.info(resp.message);
								}
							})
							.catch(error => {
								console.log(error);
							});

					},
					onCancel: () => {}
					// slot = 'footer'
				});

			},
			// 详情回显
			detailshowback() {
				let url
				if(this.isApp == "xindai" && this.$route.query.pushCode) {
					this.disabledshow = true
					url = "/loan/push/qdx/getByCode?pushCode=" + this.$route.query.pushCode
				}
				if(this.isApp == "huazan" && this.$route.query.pushCode) {
					this.disabledshow = true
					url = "/loan/push/hz/getByCode?pushCode=" + this.$route.query.pushCode
				}
				this.http.post(BASE_URL + url).then(resp => {
						if(resp.code == "success") {
							this.formValidate.pushType = resp.data.pushType
							this.formValidate.date = resp.data.pushTimeConfig.pointDate
							this.formValidate.cycleDateS = resp.data.pushTimeConfig.cycleTime.beginDate
							this.formValidate.cycleDateE = resp.data.pushTimeConfig.cycleTime.endDate
							this.formValidate.cycleTime = resp.data.pushTimeConfig.cycleTime.pointTime
							this.formValidate.cyclell = resp.data.pushTimeConfig.cycleTime.pushCycleTypeList
							this.formValidate.pushPlatform = resp.data.pushPlatform
							this.formValidate.pushObject = resp.data.pushObjectType
							this.formValidate.RealName = resp.data.pushObjectConfig.realStatus
							this.formValidate.serviceState = resp.data.pushObjectConfig.serviceStatus
							this.formValidate.isShelf = resp.data.pushObjectConfig.servicePutawayStatus
							this.formValidate.isMember = resp.data.pushObjectConfig.vipStatus
							this.formValidate.ZambiaBalance = resp.data.pushObjectConfig.betweenNumber
							this.formValidate.ZambiaBalanceE = resp.data.pushObjectConfig.andNumber
							this.formValidate.lastTime = resp.data.pushObjectConfig.prevLoginTime
							this.formValidate.lastTimeValue = resp.data.pushObjectConfig.prevLoginTimeUnit
							this.formValidate.lastSheetTime = resp.data.pushObjectConfig.prevOrderTime
							this.formValidate.lastSheetTimeValue = resp.data.pushObjectConfig.prevOrderTimeUnit
							this.fileList = resp.data.pushObjectConfig.fileList
							this.formValidate.titleName = resp.data.msgTitle
							this.formValidate.jumpType = resp.data.msgType
							this.formValidate.viceContent = resp.data.msgConfig.content
							this.formValidate.nativePage = resp.data.msgConfig.jumpUrl
							this.isParam = resp.data.msgConfig.isParam
							this.formValidate.jumpUrl = resp.data.msgConfig.h5Url
							this.filetag = resp.data.pushObjectConfig.fileList
							this.formValidate.pushDate = resp.data.pushTimeType
							this.formValidate.isParam = resp.data.msgConfig.paramValue
							for(let i = 0; i < this.data6.length; i++) {
								for(let j = 0; j < resp.data.pushObjectConfig.provinceCodeList.length; j++) {
									if(resp.data.pushObjectConfig.provinceCodeList[j] == this.data6[i].code) {
										this.data7[i].checkAll = !this.data7[i].checkAll;
									}
								}
								this.data7[i].checkAllGroup = resp.data.pushObjectConfig.cityCodeList
							}
							if(resp.data.msgConfig.isParam == 1) {
								this.detailscode = true
							} else {
								this.detailscode = false
							}
						} else {
							this.$Message.info(resp.message);

						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		mounted() {
			//push 获取数据
			this.pushTypeoption();
		}
	};
</script>
<style scoped>
	.quill-editor {
		height: 200px;
	}
</style>