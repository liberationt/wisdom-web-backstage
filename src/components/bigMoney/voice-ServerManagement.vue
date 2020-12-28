<template>
	<div>
		<div class="navigation">
			<p>
				<span>语音服务器管理</span>
			</p>
		</div>
		<div class="contentcss mt10">
			<Button type="primary" shape="circle" icon="ios-add" @click="adddepartment(1)" class="ml20">添加</Button>
			<Table class="mt20" border highlight-row :columns="columns1" :data="data1"></Table>
			<div class="tr mt15">
				<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
			</div>
		</div>
		<Modal v-model="modal2" :title=credittitle @on-ok="handleSubmit2('formValidate')" @on-cancel="handleReset2('formValidate')" :mask-closable="false" width:600 :loading="loading">
			<div>
				<Form class="pl10" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
					<FormItem label="服务器名称" prop="name">
						<Input :disabled="credittitle=='编辑'" maxlength="50" v-model="formValidate.name" style="width:300px" placeholder="请输入服务器名称"></Input>
					</FormItem>
					<FormItem label="对应IP" prop="ip">
						<Input :disabled="credittitle=='编辑'" maxlength="50" v-model="formValidate.ip" style="width:300px" placeholder="请输入对应IP"></Input>
					</FormItem>
					<FormItem label="状态" prop="state">
						<Select v-model="formValidate.state" placeholder="请选择" style="width:300px">
							<Option value="0">停用</Option>
							<Option value="1">启用</Option>
						</Select>
					</FormItem>
					<FormItem label="重复数据间隔推送天数" prop="numlimit">
						<Input v-model="formValidate.numlimit" style="width:300px" placeholder="请输入重复数据间隔推送天数"></Input>
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
				loading: true,
				modal2: false,
				credittitle: "添加",
				callbackServerCode: '',
				formValidate: {
					name: '',
					ip: '',
					state: '0',
					numlimit: ''
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '请输入服务器名称',
						trigger: 'blur'
					}, ],
					ip: [{
						required: true,
						message: '请输入对应IP',
						trigger: 'blur'
					}, ],
					numlimit: [{
							required: true,
							message: '请输入每日推送数量限制',
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入正确的每日推送数量限制',
							pattern: /^(0|[1-9][0-9]*)$/,
							trigger: 'change'
						}
					],
				},
				total: 0,
				startRow: 1,
				endRow: 10,
				columns1: [{
						title: '序号',
						align: 'center',
						minWidth: 100,
						render: (h, params) => {
							return h('div', [
								h('span', {}, params.index + 1)
							])
						}
					},
					{
						title: '服务器名称',
						align: 'center',
						minWidth: 110,
						key: 'serverName'
					},
					{
						title: '对应ip',
						align: 'center',
						minWidth: 110,
						key: 'serverIp'
					},
					{
						title: '状态',
						align: 'center',
						minWidth: 110,
						key: 'mobile',
						render: (h, params) => {
							let serverStatus
							if(params.row.serverStatus == 0) {
								serverStatus = '停用'
							} else if(params.row.serverStatus == 1) {
								serverStatus = '启用'
							}
							return h('div', [
								h('span', {}, serverStatus)
							])
						}
					},
					{
						title: '重复数据间隔推送天数',
						align: 'center',
						minWidth: 160,
						key: 'repateSendDay'
					},
					{
						title: '创建时间',
						align: 'center',
						minWidth: 110,
						key: 'dataCreateTime'
					},
					{
						title: '修改时间',
						align: 'center',
						minWidth: 110,
						key: 'dataModifiedTime'
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						minWidth: 150,
						align: 'center',
						render: (h, params) => {
							let serverStatus = params.row.serverStatus;
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
												this.callbackServerCode = params.row.callbackServerCode
												this.editecho(params.row.callbackServerCode)
											}
										}
									},
									'编辑'
								),
								h(
									"Button", {
										props: {
											type: serverStatus == 0 ? "success" : "error",
											size: "small"
										},
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												let callbackServerCode = params.row.callbackServerCode
												if(serverStatus == 1) {
													this.stopStart({
														serverStatus: 0,
														callbackServerCode: callbackServerCode
													}, '确认停用该通道吗？')
												} else {
													this.stopStart({
														serverStatus: 1,
														callbackServerCode: callbackServerCode
													}, '确认启用该通道吗？')
												}
											}
										}
									},
									serverStatus == 1 ? "停用" : "启用"
								),
							])
						}
					}
				],
				data1: []
			}
		},
		methods: {
			// 分页
			pageChange(page) {
				this.startRow = page
				this.inquire(this.startRow)
			},
			pagesizechange(page) {
				this.startRow = 1
				this.endRow = page
				this.inquire(this.startRow)
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
				if(Number(this.formValidate.numlimit) > 365) {
					this.$Modal.warning({
						title: '温馨提示 ',
						content: '重复数据间隔推送天数不得大于365'
					})
					return false
				}
				let list
				let url
				if(this.credittitle == '添加') {
					list = {
						serverName: this.formValidate.name, //服务器名称
						serverIp: this.formValidate.ip, //ip
						serverStatus: this.formValidate.state, //状态
						repateSendDay: this.formValidate.numlimit //推送天数
					}
					url = '/netmoney/callbackServer/save'
				} else {
					list = {
						callbackServerCode: this.callbackServerCode,
						serverName: this.formValidate.name, //服务器名称
						serverIp: this.formValidate.ip, //ip
						serverStatus: this.formValidate.state, //状态
						repateSendDay: this.formValidate.numlimit //推送天数
					}

					url = '/netmoney/callbackServer/updateByCode'
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
									this.inquire(1)
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
				this.http.post(BASE_URL + '/netmoney/callbackServer/getByCode?callbackServerCode=' + code)
					.then((resp) => {
						if(resp.code == 'success') {
							this.formValidate.name = resp.data.serverName
							this.formValidate.ip = resp.data.serverIp
							this.formValidate.state = String(resp.data.serverStatus)
							this.formValidate.numlimit = String(resp.data.repateSendDay)
						} else {
							this.$Message.error(resp.message);
						}
					})
					.catch(() => {

					})
			},
			// 停启用确定判断
			stopStart(data, text) {
				this.$Modal.confirm({
					title: "温馨提示",
					content: "<p>" + text + "</p>",
					onOk: () => {
						this.http.post(BASE_URL + '/netmoney/callbackServer/updateByCode', data)
							.then((resp) => {
								if(resp.code == 'success') {
									this.inquire(1)
								} else {
									this.$Message.error(resp.message);
								}
							})
							.catch(() => {

							})
					},
					onCancel: () => {}
				});
			},
			// 查询
			inquire(startRow) {
				let params = {
					pageNum: startRow,
					pageSize: this.endRow,
				}
				this.http.post(BASE_URL + '/netmoney/callbackServer/queryList', params)
					.then((resp) => {
						if(resp.code == 'success') {
							this.data1 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow) == 0 ? 1 : Math.ceil(resp.data.startRow / this.endRow);
						}
					})
					.catch(() => {})
			}
		},
		mounted() {
			// 列表
			this.inquire(1)

		}
	}
</script>
<style lang="less" scoped>

</style>