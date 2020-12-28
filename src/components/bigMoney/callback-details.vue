<template>
	<div>
		<div class="navigation">
			<p>
				<span>语音回调配置管理详情</span>
			</p>
		</div>
		<div class="conditioncss clearfix">
			<div class="left ml20">
				<span>甲方名称:</span>
				<Input v-model="firstpartyname" disabled placeholder="请输入甲方名称" style="width: 200px"></Input>
				<Button type="primary" shape="circle" icon="ios-add" @click="adddepartment(1)" class="ml20">添加</Button>
			</div>
		</div>
		<div class="contentcss mt10">
			<div id="application_table">
				<Table border highlight-row :columns="columns7" :data="data6"></Table>
				<!-- <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div> -->
			</div>
		</div>
		<Modal v-model="modal2" :title=credittitle @on-ok="handleSubmit2('formValidate')" @on-cancel="handleReset2('formValidate')" :mask-closable="false" width:600 :loading="loading">
			<div>
				<Form class="pl10" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
					<FormItem label="媒体编号" prop="name">
						<Input :disabled="credittitle=='编辑'" maxlength="40" v-model="formValidate.name" style="width:300px" placeholder="请输入媒体编号"></Input>
					</FormItem>
					<FormItem label="是否指定媒体编号来源" prop="source">
						<Select v-model="formValidate.source" placeholder="请选择" style="width:300px">
							<Option value="1">指定</Option>
							<Option value="2">随机</Option>
						</Select>
					</FormItem>
					<FormItem v-if="formValidate.source=='1'" label="服务器" prop="theServer">
						<CheckboxGroup v-model="formValidate.theServer">
							<Checkbox v-for="item in serverlist" :label="item.serverIp">
								<Tooltip :content="item.serverIp" placement="top-start">
									{{item.serverName}}
								</Tooltip>
							</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem v-if="formValidate.source=='1'" label="每日推送数量限制" prop="numlimit">
						<Input v-model="formValidate.numlimit" style="width:300px" placeholder="请输入每日推送数量限制"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				firstpartyname: '',
				loading: true,
				modal2: false,
				credittitle: "添加",
				total: 0,
				startRow: 1,
				endRow: 10,
				callbackConfigureCode: '',
				serverlist: [],
				formValidate: {
					name: '',
					source: '1',
					theServer: [],
					numlimit: ''
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '请输入媒体编号',
						trigger: 'blur'
					}, ],
					theServer: [{
						required: true,
						type: 'array',
						min: 1,
						message: '最少选择一个服务器',
						trigger: 'change'
					}, ],
					numlimit: [{
							required: true,
							message: '请输入每日推送数量限制',
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入正确的每日推送数量限制 (0-999999)',
							pattern: /^(0|\+?[1-9][0-9]{0,5})$/,
							trigger: 'change'
						}
					],

				},
				columns7: [{
						title: '媒体编号',
						key: 'mediaNumber',
						minWidth: 200,
						align: 'center'
					},
					{
						title: '服务器',
						key: 'ip',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '每日推送数量限制',
						key: 'limitDay',
						minWidth: 160,
						align: 'center'
					},
					{
						title: '是否指定媒体编号的来源',
						key: 'term',
						minWidth: 160,
						align: 'center',
						render: (h, params) => {
							let mediaIpSource
							if(params.row.mediaIpSource == 1) {
								mediaIpSource = '指定'
							} else if(params.row.mediaIpSource == 2) {
								mediaIpSource = '随机'
							}
							return h('div', [
								h('span', {}, mediaIpSource)
							])
						}
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 150,
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
												this.adddepartment(2)
												this.callbackConfigureCode = params.row.callbackConfigureCode
												this.editecho(params.row.callbackConfigureCode)
											}
										}
									},
									'编辑'
								),
								h(
									'Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
												this.deleteout(params.row.callbackConfigureCode)
											}
										}
									},
									'删除'
								)
							])
						}
					}
				],
				data6: []
			}
		},
		methods: {
			// 分页
			pageChange(page) {
				// console.log(page)
				this.startRow = page
				this.inquire()
			},
			pagesizechange(page) {
				// console.log(page)
				this.startRow = 1
				this.endRow = page
				this.inquire()
			},
			changeLoading() {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
			},
			handleSubmit2(name) {
				this.$refs[name].validate(valid => {
					if(!valid) {
						return this.changeLoading()
					} else {
						this.changeLoading()
						this.addpersonnel()
					}
				})
			},
			handleReset2(name) {
				this.$refs[name].resetFields()
				// this.serverlist = []
				this.formValidate.numlimit = ''
				this.formValidate.theServer = []
			},
			adddepartment(num) {
				this.modal2 = true
				if(num == 1) {
					this.credittitle = '添加'
				} else {
					this.credittitle = '编辑'
				}
			},
			// 新增/编辑
			addpersonnel() {
				let list
				let url
				if(this.formValidate.source == 2) {
					this.formValidate.theServer = []
					this.formValidate.numlimit = ''
				}
				if(this.credittitle == '添加') {
					list = {
						partyaKey: this.$route.query.partyaKey,
						mediaNumber: this.formValidate.name, //编号
						mediaIpSource: this.formValidate.source, //来源
						ip: this.formValidate.theServer.join(','),
						limitDay: this.formValidate.numlimit
					}
					url = '/netmoney/callbackConfigure/save'
				} else {					
					list = {
						callbackConfigureCode: this.callbackConfigureCode,
						partyaKey: this.$route.query.partyaKey,
						mediaNumber: this.formValidate.name, //编号
						mediaIpSource: this.formValidate.source, //来源
						ip: this.formValidate.theServer.join(','),
						limitDay: this.formValidate.numlimit
					}
					url = '/netmoney/callbackConfigure/updateByCode'
				}
				this.http.post(BASE_URL + url, list)
					.then((resp) => {
						if(resp.code == 'success') {
							const title = '提示';
							let content
							if(this.credittitle == '添加') {
								content = '<p>添加成功</p>'
							} else {
								content = '<p>修改成功</p>'
							}
							this.modal2 = false
							this.$Modal.success({
								title: title,
								content: content,
								onOk: () => {
									this.inquire()
									// this.serverlist = []
									this.formValidate.numlimit = ''
									this.formValidate.theServer = []
								}
							})
							this.$refs['formValidate'].resetFields()
						} else {
							this.$Message.error(resp.message);
						}
					})
					.catch(() => {

					})
			},
			// 编辑回显
			editecho(code) {
				this.http.post(BASE_URL + '/netmoney/callbackConfigure/getByCode?callbackConfigureCode=' + code)
					.then((resp) => {
						if(resp.code == 'success') {
							this.formValidate.name = resp.data.mediaNumber
							this.formValidate.source = String(resp.data.mediaIpSource)
							if(resp.data.ip != null && resp.data.ip != '') {
								this.formValidate.theServer = resp.data.ip.split(',')
							} else {
								this.formValidate.theServer = []
							}

							this.formValidate.numlimit = String(resp.data.limitDay)

						} else {
							this.$Message.error(resp.message);
						}
					})
					.catch(() => {

					})
			},
			// 删除
			deleteout(code) {
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						this.http.post(BASE_URL + '/netmoney/callbackConfigure/deleteByCode?callbackConfigureCode=' + code)
							.then((resp) => {
								if(resp.code == 'success') {
									this.inquire()
								} else {
									this.$Message.error(resp.message);
								}
							})
							.catch(() => {

							})
					}
				})
			},
			// 列表查询
			inquire() {
				let list = {
					partyaKey: this.$route.query.partyaKey
				}
				this.http.post(BASE_URL + '/netmoney/callbackConfigure/queryList', list)
					.then((resp) => {
						if(resp.code == 'success') {
							if (resp.data.dataList.length>0) {
								this.data6 = resp.data.dataList[0].dataList								
							} else {
								this.data6 = []
							}
							// this.total = resp.data.total
							// this.startRow = Math.ceil(resp.data.startRow/this.endRow)
						} else {
							this.$Message.error(resp.message);
						}
					})
					.catch(() => {

					})
			}
		},
		mounted() {
			this.firstpartyname = this.$route.query.name
			this.inquire()
			this.http.post(BASE_URL + '/netmoney/callbackServer/queryListDown', {})
				.then((resp) => {
					if(resp.code == 'success') {
						this.serverlist = resp.data.dataList
					} else {
						this.$Message.error(resp.message);
					}
				})
				.catch(() => {

				})
		}
	}
</script>
<style lang="less" scoped>
	#application_table {
		margin-top: 10px;
	}
</style>