<template>
	<div>
		<div class="navigation">
			<p>
				<span>手动推送批次列表</span>
			</p>
		</div>
		<div class="conditioncss">
			<ul class="querysty">
				<li>
					<span>甲方名称:</span>
					<Select v-model="model1" placeholder="全部" style="width:150px" class="mr20">
						<Option v-for="item in cityList" :value="item.partyaKey " :key="item.partyaKey ">{{ item.partyaName }}</Option>
					</Select>
				</li>
				<li>
					<span>文件名称:</span>
					<Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 150px"></Input>
				</li>
				<li>
					<span>上传时间:</span>
					<DatePicker type="date" :value = 'value1' @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
					<span>  -  </span>
					<DatePicker type="date" :value = 'value2' @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
				</li>
			</ul>
			<div class="clearfix mr100 mt20">
				<Button class="right w90" type="primary" @click="refuse">上传文件</Button>
				<!-- <Button class="right mr20 w100" type="info" @click="inquire">查询</Button> -->
				<Button type="info" class="right mr20 w90" :loading="loading3" @click="inquire">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
			</div>
		</div>
		<div class="contentcss mt10">
			<Table border highlight-row :columns="columns7" :data="data6"></Table>
			<div class="tr mt15">
				<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
			</div>
		</div>		
		<Modal title="上传文件" v-model="modal9" @on-ok="upload" @on-cancel="cancel" ok-text="上传" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
			<div class="newtype_file mt15 mb15 pl10">
				<Form ref="formCustom" :label-width="80">
					<FormItem label="甲方名称:">
						<Select v-model="model4" style="width:300px" @on-change="selectChange" class="mr20">
							<Option v-for="item in cityListmode" :value="item.partyaKey" :key="item.partyaKey">{{ item.partyaName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="选择文件:">
						<Input v-model="value9" disabled style="width: 225px" class="left ml5"></Input>
						<Upload ref="upload" :before-upload="handleUpload" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError2">
							<Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">浏览</Button>
						</Upload>
					</FormItem>
					<FormItem label="上传模板:">
						<a :href="value3" class="blue1" >{{hrefxls}}</a>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>
<script>
import utils from '../../utils/utils'
	export default {
		data() {
			return {
				loading3: false,
				model1: '',
				model2: '',
				model3: '',
				model4: '',
				value1: '',
				value2: '',
				value3: '',
				hrefxls: '',
				timval1: '',
				timval2: '',
				modal9: false,
				loading: true,
				value9: '',
				total: 0,
				startRow: 1,
				endRow: 10,
				cityList: [],
				cityListmode: [],
				filename: '',
				columns7: [
					// {
					// 	title: '批次',
					// 	align: 'center',
					// 	width: 125,
					// 	key: 'batchCode'
					// },
					{
						title: '文件名称',
						align: 'center',
						width: 170,
						render: (h, params) => {
						return h('div', [
						h('span', {
							style: {
							display: 'inline-block',
							width: '100%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
							},
							domProps: {
							title: params.row.originName
							}
						}, params.row.originName)
						])
						}
					},
					{
						title: '甲方名称',
						align: 'center',
						width: 125,
						key: 'mediaName'
					},										
					{
						title: '推送总条数',
						align: 'center',
						width: 120,
						key: 'partyaSuccNum'
					},
					{
						title: '转化成功条数',
						align: 'center',
						width: 120,
						key: 'pullSuccNum'
					},
					{
						title: '转化失败条数',
						align: 'center',
						width: 120,
						key: 'pullFailNum'
					},
					{
						title: '推送详情',
						width: 170,
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
												path: './pushDetail?code='+params.row.partyaKey+'&batchCode='+params.row.batchCode+'&pattern=0'
											})
										}
									}
								}, '详情')
							])
						}
					},
					{
						title: '上传时间',
						align: 'center',
						width: 170,
						key: 'dataCreateTime'
					},
					{
						title: '上传条数',
						align: 'center',
						width: 120,
						key: 'sendNum'
					},
					{
						title: '上传成功条数',
						align: 'center',
						width: 120,
						key: 'succNum'
					},
					{
						title: '上传失败条数',
						align: 'center',
						width: 120,
						key: 'failNum'
					},
					{
						title: '上传失败详情',
						align: 'center',
						width: 180,
						render: (h, params) => {
							// console.log(params.row.uploadFailUrl)
							if(params.row.uploadFailUrl != null && params.row.uploadFailUrl != '' && params.row.failNum != 0){
								return h('div', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small',
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
												let formData = new FormData()
												formData.append("ossPath",params.row.uploadFailUrl)
												let httpUrl = BASE_URL + '/fileOssDownload'
												utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
													if(e == true){
														// alert(333)
														// this.loading2 = false;
													}
												})
											}
										}
								}, '下载')
							])
							}
							
						}
					}
				],
				data6: [],
				uploadl:'',
				fileerror: ''
			}
		},
		methods: {
			// 分页
			pageChange(page) {
				this.startRow = page
				this.inquire()
			},
			pagesizechange(page) {
				this.startRow = 1
				this.endRow = page
				this.inquire()
			},
			// 弹框显示
			refuse() {
				this.modal9 = true
			},
			// 模板下载
			selectChange (value) {
				if (value == 'partya-chedidai') {
					this.hrefxls = 'dk_chedidai.xls'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_chedidai.xlsx'
				} else if (value == 'partya-dadi') {
					this.hrefxls = 'dk_dadi.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_dadi.xlsx'
				} else if (value == 'partya-fangcrm') {
					this.hrefxls = 'dk_fangcrm.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_fangcrm.xlsx'
				} else if (value == 'partya-fanpuwang') {
					this.hrefxls = 'dk_fanpuwang.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_fanpuwang.xlsx'
				} else if (value == 'partya-houbenjinrong') {
					this.hrefxls = 'dk_houben.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_houben.xlsx'
				} else if (value == 'partya-miaodai') {
					this.hrefxls = 'dk_miaodai.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_miaodai.xlsx'
				} else if (value == 'partya-xinyidai') {
					this.hrefxls = 'dk_xinyidai.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_xinyidai.xlsx'
				} else if (value == 'partya-yingu') {
					this.hrefxls = 'dk_yingu.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_yingu.xlsx'
				} else if (value == 'partya-yixin') {
					this.hrefxls = 'dk_yixin.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_yixin.xlsx'
				} else if (value == 'partya-zhudaiwang') {
					this.hrefxls = 'dk_zhudai.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_zhudai.xlsx'
				} else if (value == 'partya-kunxuan-hengchang') {
					this.hrefxls = 'dk_kunxuan_hengchang.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_kunxuan_hengchang.xlsx'
				} else if (value == 'partya-benxiang-hengchang') {
					this.hrefxls = 'dk_benxiang_hengchang.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_benxiang_hengchang.xlsx'
				} else if (value == 'partya-guazi-usedcar') {
					this.hrefxls = 'dk_guaziusedcar.xlsx'
					this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/dk_guaziusedcar.xlsx'
				}

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
				} else if(this.fileerror == 'error'){
					this.changeLoading()
					const title = '上传文件'
					let content = '<p>上传失败，请稍后再试</p>'
					this.$Modal.warning({
					title: title,
					content: content
					})
					return false
				} else if(this.uploadl == ''){
					// alert(111)
					this.changeLoading()
					const title = '上传文件'
					let content = '<p>文件上传中...请稍后点击上传按钮！</p>'
					this.$Modal.warning({
					title: title,
					content: content
					})
					return false
				}  else if(this.filename == ""){
					this.changeLoading()
					const title = '上传文件'
					let content = '<p>文件上传中...请稍后点击上传按钮！</p>'
					this.$Modal.warning({
					title: title,
					content: content
					})
					return false
					this.filename == ""
				} else {
					let list = {
						partyaKey: this.model4,
						url: this.filename,
						originName: this.value9,
						pushMain: '络慧'
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
									this.inquire()
								}, 1000)
							} else {
								this.$Message.info(resp.message)
							}
						})
						.catch(err => {
							this.modal9 = false
							this.namelist = ''
							this.changeLoading()
							const title = '上传文件'
							let content = '<p>上传失败</p>'
							this.$Modal.error({
								title: title,
								content: content
							})
						})
				}
			},
			// 点击取消清空已选择
			cancel() {
				this.value9 = ''
				this.model4 = ''
				this.hrefxls = ''
			},
			// 上传格式校验
			handleFormatError2(file) {
				this.value9 = ''
				this.$Message.info("文件格式不正确,请上传excel格式文件")
			},
			// 选择文件后回调
			handleUpload(file) {
				 if(file.size > 22949339){
					this.value9 = ""
					this.$Message.info("请选择20兆以内的文件")
					return false
				}
				let splic = file.name.split('.')
				if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
					this.filename = ''
					this.fileerror = ''
					let formData = new FormData()
					formData.append('file', file)
					formData.append('bucket', 'netmoney')
					formData.append('dirs', 'excelfile')
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						timeout:1000*60*5
					}
					this.http.post(BASE_URL + '/fileUpload', formData, config)
					.then((resp) => {
					if (resp.code == 'success') {
						this.filename = resp.data
						this.uploadl = 'success'
					} else {
					}
					})
					.catch(err => {
						this.fileerror = 'error'
					})
					this.value9 = file.name
					return false
				}
				
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
				this.loading3 = true
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.loading3 = false
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
					})
					return false
				}
				let list = {
					partyaKey: this.model1,
					originName: this.model2,
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
							this.loading3 = false
						} else {
							this.loading3 = false
						}
					})
					.catch(() => {
						this.loading3 = false
					})
			}
		},
		mounted() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
			month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			this.value1 =  currentdate;
			this.value2 = currentdate;
			// 甲方名称
			this.http.post(BASE_URL + '/loan/partya/queryCompanyPartyaList?company=luohui&partyaBusiness=0&sendTypes='+'1')
				.then((resp) => {
					if(resp.code == 'success') {
						this.cityList = resp.data
						this.cityListmode = resp.data
						this.model1 = resp.data[0].partyaKey
						this.inquire()
					} else {

					}
				})
				.catch(() => {})
			// 列表初始化
			
		}
	}
</script>
<style lang="less" scoped>

</style>