<template>
	<div>
		<div class="navigation">
			<p>
				<span>推广明细报表</span>
			</p>
		</div>
		<div class="mt50">
			<span>甲方名称:</span>
			<Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
				<Option v-for="item in cityList" :value="item.partyaKey " :key="item.partyaKey ">{{ item.partyaName }}</Option>
			</Select>
			<span>文件名称:</span>
			<Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 200px"></Input>
			<span>推送时间:</span>
			<DatePicker type="date" @on-change="time1" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
			<span>  -  </span>
			<DatePicker type="date" @on-change="time2" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
			<div class="clearfix mr100 mt20">
				<Button class="right w100" type="primary" @click="refuse">上传报表</Button>
				<Button class="right mr20 w100" type="info" @click="inquire">查询</Button>
			</div>
		</div>
		<div class="mt20">
			<Table border :columns="columns7" :data="data6"></Table>
		</div>
		<div class="tr mt15">
			<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-elevator show-sizer show-total></Page>
		</div>
		<Modal title="上传报表" v-model="modal9" @on-ok="upload" @on-cancel="cancel" ok-text="保存" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
			<div class="newtype_file mt15 mb15 pl10">
				<Form ref="formCustom" :label-width="80">
					<FormItem label="甲方名称:">
						<Select v-model="model4" style="width:300px" class="mr20">
							<Option v-for="item in cityListmode" :value="item.partyaKey" :key="item.partyaKey">{{ item.partyaName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="上传文件:">
						<Input v-model="value9" disabled style="width: 225px" class="left ml5"></Input>
						<Upload ref="upload" :before-upload="handleUpload" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError2">
							<Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">预览</Button>
						</Upload>
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
				model1: '',
				model2: '',
				model3: '',
				model4: '',
				value1: '',
				value2: '',
				modal9: false,
				loading: true,
				value9: '',
				total: 0,
				startRow: 1,
				endRow: 10,
				cityList: [],
				cityListmode: [],
				filename: '',
				columns7: [{
						title: '批次',
						align: 'center',
						key: 'batchCode'
					},
					{
						title: '文件名称',
						align: 'center',
						key: 'fileName'
					},
					{
						title: '推送模式',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('span', {}, '手动')
							])
						}
					},
					{
						title: '甲方名称',
						align: 'center',
						key: 'mediaName'
					},
					{
						title: '推送主体',
						align: 'center',
						key: 'pushMain'
					},
					{
						title: '上传时间',
						align: 'center',
						key: 'dataCreateTime'
					},
					{
						title: '上传条数',
						align: 'center',
						key: 'sendNum'
					},
					{
						title: '上传成功条数',
						align: 'center',
						key: 'succNum'
					},
					{
						title: '上传失败条数',
						align: 'center',
						key: 'failNum'
					},
					{
						title: '上传失败详情',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											// this.$router.push({ path: './pushDetail' })
										}
									}
								}, '下载')
							])
						}
					},
					{
						title: '推送成功条数',
						align: 'center',
						key: 'pullSuccNum'
					},
					{
						title: '推送失败条数',
						align: 'center',
						key: 'pullFailNum'
					},
					{
						title: '转化成功条数',
						align: 'center',
						key: 'failNum'
					},
					{
						title: '推送详情',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
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
												path: './pushDetail?code='+params.row.partyaKey
											})
										}
									}
								}, '详情')
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
				this.startRow = page
				this.inquire()
			},
			pagesizechange(page) {
				this.endRow = page
				this.inquire()
			},
			// 弹框显示
			refuse() {
				this.modal9 = true
			},
			// 上传
			upload() {
				if(this.model4 == '') {
					this.changeLoading()
					const title = '甲方名称'
					let content = '<p>请选择甲方名称</p>'
					this.$Modal.warning({
						title: title,
						content: content
					})
					return false
				}
				if(this.value9 == '') {
					this.changeLoading()
					const title = '上传报表'
					let content = '<p>请先上传文件</p>'
					this.$Modal.warning({
						title: title,
						content: content
					})
					return false
				} else {
					// let formData = new FormData();
					// formData.append('partyaKey', this.model4)
					// formData.append('filename', this.filename)
					// let config = {
					// 	headers: {
					// 		'Content-Type': 'multipart/form-data'
					// 	}
					// }
					let list = {
						partyaKey: this.model4,
						url: this.filename
					}
					this.http.post(BASE_URL + '/loan/batchLog/saveBatchLog', list)
						.then((resp) => {
							if(resp.code == 'success') {
								setTimeout(() => {
									this.changeLoading()
									const title = '上传名单'
									let content = '<p>上传成功</p>'
									this.$Modal.success({
										title: title,
										content: content
									})
									this.modal9 = false
									this.value9 = ''
								}, 1000)
							} else {
								this.$Message.info(resp.message)
							}
						})
						.catch(() => {})
				}
			},
			// 点击取消清空已选择
			cancel() {
				this.value9 = ''
				this.model4 = ''
			},
			// 上传格式校验
			handleFormatError2(file) {
				this.value9 = ''
				this.$Message.info("文件格式不正确,请上传excel格式文件")
			},
			// 选择文件后回调
			handleUpload(file) {
				let formData = new FormData()
				formData.append('file', file)
				formData.append('bucket', 'netmoney')
				formData.append('dirs', 'excelfile')
				let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
				}
				this.http.post(BASE_URL + '/fileUpload', formData, config)
				.then((resp) => {
				if (resp.code == 'success') {
					this.filename = resp.data
				} else {
				}
				})
				.catch(() => {
				})
				this.value9 = file.name
				return false
			},
			changeLoading() {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
			},
			// 时间判断
			time1(value, data) {
				this.value1 = value
			},
			time2(value, data) {
				this.value2 = value
			},
			inquire() {
				// 列表查询
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
					})
					return false
				}
				let list = {
					partyaName: this.model1,
					fileName: this.model2,
					beginTime: this.value1,
					endTime: this.value2,
					pageNum: this.startRow,
					pageSize: this.endRow
				}
				this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list)
					.then((resp) => {
						if(resp.code == 'success') {
							this.data6 = resp.data.batchLogList
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow)
						} else {

						}
					})
					.catch(() => {})
			}
		},
		mounted() {
			// 甲方名称
			this.http.post(BASE_URL + '/loan/partya/queryCompanyPartyaList?company=luohui&partyaBusiness=0&sendTypes='+'1,3')
				.then((resp) => {
					if(resp.code == 'success') {
						this.cityList = resp.data
						this.cityListmode = resp.data
					} else {

					}
				})
				.catch(() => {})
			// 列表初始化
			this.inquire()
		}
	}
</script>
<style lang="less" scoped>

</style>