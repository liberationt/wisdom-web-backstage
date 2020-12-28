<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理&nbsp;>&nbsp;上传现金流水</span>
			</p>
		</div>
		<div class="clearfix contentcss">
			<div class="left">
				<ul class="querysty">
					<li>
						<Input class="mr20"  v-model="applicantName" placeholder="请输入姓名"  style="width: 150px">
						</Input>
					</li>
					<li>
						<Input class="mr20"  v-model="applicantPhone" placeholder="请输入手机号"  style="width: 150px">
						</Input>
					</li>
					<li>
						<DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
						style="width: 150px"></DatePicker>
						<span>  -  </span>
						<DatePicker type="date" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
						style="width: 150px"></DatePicker>
					</li>
					<li>
						<Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
							<span v-if="!loading3">查询</span>
							<span v-else>查询</span>
						</Button>
					</li>
					<li>
						<Button type="info" :loading="loading2" class=" ml20 w100" @click="exportdata">
							<span v-if="!loading2">导出</span>
							<span v-else>请稍等...</span>
						</Button>
					</li>
					<li>
						<Button type="info" :loading="loading2" class=" ml20 w100" @click="template">
							<span>下载模板</span>
						</Button>
					</li>
					<li>
						<Button type="info" class=" ml20 w100" @click="lookup">
							<span>上传记录</span>
						</Button>
					</li>
					<li>
						<Button type="info" class=" ml20 w120" @click="records">
							<span>查看上传记录</span>
						</Button>
					</li>
				</ul>
			</div>
		</div>
		<div id="application_table " class="contentcss mt10">
			<Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
			<div class="tr mt15">
				<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
			</div>
		</div>
		 <!-- 文件上传 -->
      <Modal title="上传现金记录" v-model="handleUpload" @on-ok="uploadOk('formValidate')" @on-cancel="uploadcancel('formValidate')" ok-text="上传" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
        <div class="newtype_file mt15 mb15 pl10">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="流水类型：" prop="flowingType">
              <Input v-model="formValidate.flowingType" style="width: 225px" placeholder="请输入流水类型"></Input>
            </FormItem>
			<FormItem label="备注:" prop="remarks">
              <Input v-model="formValidate.remarks" placeholder="请输入备注"></Input>
            </FormItem>
			<FormItem label="金额:">
				<div style="display:flex;">
					<FormItem>
						<Select  v-model="formValidate.producType" style="width:100px">
							<Option v-for="item in producTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem prop="amount">
						<Input v-model="formValidate.amount" placeholder="请输入金额"></Input>
					</FormItem>
				</div>
            </FormItem>
            <FormItem label="选择文件:" prop="updateFile">
              <Input v-model="formValidate.updateFile" disabled placeholder="请选择文件" style="width: 225px" class="left ml5"></Input>
              <Upload ref="upload" :before-upload="handleUpload1" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError2">
                <Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </FormItem>
          </Form>
        </div>
      </Modal>
	</div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data(){
		return{
			applicantName:'',
			applicantPhone:'',
			beginTime:'',
			endTime:'',
			loading3:false,
			loading2:false,
			loading:true,
			startRow:1,
			endRow:10,
			data1:[],
			total:0,
			filename:'',
			uploadl:'',
			producTypeList:[
				{
					label:'增加',
					value:'0'
				},
				{
					label:'减少',
					value:'1'
				}
			],
			columns:[
				{
					title: "姓名",
					key: "userName",
					align: "center",
					minWidth: 160
				},
				{
					title: "手机号",
					key: "userPhone",
					align: "center",
					minWidth: 160
				},
				{
					title: "金额",
					key: "alterAmount",
					align: "center",
					minWidth: 160
				},
				{
					title: "流水类型",
					key: "type",
					align: "center",
					minWidth: 160
				},
				{
					title: "备注",
					key: "remark",
					align: "center",
					minWidth: 160
				},
				{
					title: "导入时间",
					key: "dataCreateTime",
					align: "center",
					minWidth: 160
				}
			],
			handleUpload:false,
			formValidate: {
				flowingType: "",
				amount:'',
				updateFile: "",
				producType:'0',
				remarks: ""
			},
			ruleValidate:{
				flowingType:[
					{ required: true, message: "请输入流水类型", trigger: "change" },
					 {required: true, message: '流水类型最多8字',max: 8,trigger: 'change'}
				],
				updateFile:[
					{ required: true, message: "请选择文件", trigger: "change" }
				],
				amount:[
					{ required: true, message: "请输入金额", trigger: "change" },
					{ pattern: /^((0\.\d{0}[1-9]|\+?[1-9][0-9]{0,3})(\.\d{1})?|10000)$/, message: '请输入正确金额', trigger: 'change'}
				],
				remarks:[
					{ required: true, message: "请输入备注", trigger: "change" },
					 {required: true, message: '备注最多50字',max: 50,trigger: 'change'}

				],
			}
		}
	},
	methods:{
		beginTimeChange(value){
			this.beginTime = value
		},
		endTimeChange(value){
			this.endTime = value
		},
		// 查询
		queryList(startRow){
			let date1 = Date.parse(new Date(this.beginTime)) / 1000;
			let date2 = Date.parse(new Date(this.endTime)) / 1000;
			if (date1 > date2) {
				this.$Modal.warning({
				title: "提示",
				content: "<p>开始时间不得大于结束时间</p>"
				});
				return false;
			}
			this.loading3 = false
			let data = {
				userName :this.applicantName,
				userPhone :this.applicantPhone,
				beginTime:this.beginTime,
				endTime:this.endTime,
				pageNum: startRow,
        		pageSize: this.endRow
			}
			this.http.post(BASE_URL+'/vshop/cash/queryDetailPage',data)
			.then(data=>{
				if(data.code=='success'){
					this.loading3 = true
					this.data1 = data.data.dataList
					this.total = data.data.total;
					this.startRow = Math.ceil(data.data.startRow / this.endRow) == 0
					? 1
					: Math.ceil(data.data.startRow / this.endRow);
					this.loading3 = false;
				}
			})
		},
		//导出
		exportdata(){
			this.loading2 = true;
			let formData = new FormData();
			formData.append("userName", this.applicantName);
			formData.append("userPhone", this.applicantPhone)
			formData.append("beginTime", this.beginTime);
			formData.append("endTime", this.endTime);
			let httpUrl = BASE_URL + "/vshop/cash/export";
			utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
				if (e == true) {
				this.loading2 = false;
				} else {
				this.loading2 = false;
				this.$Modal.warning({
					title: "导出文件",
					content: "<p>导出失败</p>"
				});
				}
			});
		},
		//模板下载
		template(){
			window.location.href = 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/vshop/%E7%8E%B0%E9%87%91%E6%B5%81%E6%B0%B4%E6%A8%A1%E6%9D%BF.xlsx' // 下载链接
		},
		lookup(){
			this.handleUpload = true
		},
		// 查看上传记录
		records(){
			this.$router.push('/vCashupload')
		},
		pageChange(startRow){
			this.startRow = startRow
			this.queryList(startRow)
		},
		pagesizechange(endRow){
			this.endRow = endRow
			this.queryList(1)
		},
		changeLoading() {
			this.loading = false;
			this.$nextTick(() => {
				this.loading = true;
			});
		},
		 // 上传文件
		uploadOk(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					if (this.filename == "") {
						this.$Message.info("文件上传中...请稍后点击上传按钮！");
						this.changeLoading();
						return false;
					}
					this.http.post(BASE_URL + "/vshop/cash/upload", {
						remark: this.formValidate.remarks,
						alterAmount:this.formValidate.amount,
						filePathUrl: this.filename,
						alterAction :this.formValidate.producType,
						type : this.formValidate.flowingType
					})
					.then(data => {
						if (data.code == "success") {
							this.$Message.success("上传成功！");
							this.handleUpload = false
							this.queryList(1);
							this.$refs[name].resetFields();
						} else {
							this.$Modal.warning({
							title: "温馨提示",
							content: !data.message ? "系统有误！" : data.message
							});
						}
						this.changeLoading();
					}).catch(err => {});
				} else {
					this.loading = true;
					this.changeLoading();
				}
			});
		},
		uploadcancel(name) {
			this.$refs[name].resetFields();
		},
		// 上传格式校验
		handleFormatError2(file) {
			this.formValidate.updateFile = ''
			this.$Message.info("文件格式不正确,请上传excel格式文件")
		},
		// 选择文件后回调
		handleUpload1(file) {
			if(file.size > 22949339){
			this.formValidate.updateFile = ""
			this.$Message.info("请选择20兆以内的文件")
			return false
		}
		let splic = file.name.split('.')
		if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
			this.filename = ''
			this.fileerror = ''
			let formData = new FormData()
			formData.append('file', file)
			formData.append('bucket', 'commisson')
			formData.append('dirs', 'excel')
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
			this.formValidate.updateFile = file.name
			return false
		}
		},
	},
	mounted(){
		this.queryList(1)
	}
}
</script>
<style lang="less" scoped>
    
</style>