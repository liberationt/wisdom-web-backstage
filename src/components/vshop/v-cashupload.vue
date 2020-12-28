<template>
    <div>
        <div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理&nbsp;>&nbsp;现金上传记录</span>
			</p>
		</div>
        <div class="clearfix contentcss">
			<div class="left">
				<ul class="querysty">
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
				</ul>
			</div>
		</div>
		<div id="application_table " class="contentcss mt10">
			<Table border highlight-row @on-selection-change="menuSelectcancel" ref="selection" :columns="columns" :data="data1"></Table>
			<div class="tr mt15">
				<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
			</div>
		</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
    data(){
       return{
			beginTime:'',
			endTime:'',
			loading3:false,
			data1:[],
			total:0,
			startRow:1,
			endRow:10,
			columns:[
				{
					title: "批次编号",
					key: "batchNo",
					align: "center",
					minWidth: 190
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
					title: "上传总数",
					key: "totalNum",
					align: "center",
					minWidth: 120
				},
				{
					title: "成功数量",
					key: "successNum",
					align: "center",
					minWidth: 120
				},
				{
					title: "失败数量",
					key: "failNum",
					align: "center",
					minWidth: 120
				},
				{
					title: "创建时间",
					key: "dataCreateTime",
					align: "center",
					minWidth: 190
				},
				{
					title: "操作人",
					key: "createUser",
					align: "center",
					minWidth: 140
				},
				{
					title: "操作",
					key: "userName",
					align: "center",
					minWidth: 120,
					render:(h,params)=>{
						return	h('Button', {
						props: {
						type: 'primary',
						size: 'small'
						},
						on: {
							click: () => {
								let formData = new FormData()
								formData.append("batchNo",params.row.batchNo)
								let httpUrl = BASE_URL + '/vshop/cash/download'
								utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
									if(e == true){
									this.$Message.info("下载成功");
									}
								})
							}
						}
					}, '下载')
					}
				}
			],
	   }
    },
    methods:{
        beginTimeChange(beginTime){
			this.beginTime = beginTime
        },
        endTimeChange(endTime){
			this.endTime = endTime
		},
		pageChange(startRow){
			this.startRow = startRow
			this.queryList(startRow)
		},
		pagesizechange(endRow){
			this.endRow = endRow
			this.queryList(1)
		},
		downLoan(){
			let data = {
				batchNo:''
			}
			this.http.post(BASE_URL+'/vshop/cash/download',data)
			.then(data=>{

			}).catch(err=>{

			})
		},
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
				beginTime:this.beginTime,
				endTime:this.endTime,
				pageNum: startRow,
        		pageSize: this.endRow
			}
			this.http.post(BASE_URL+'/vshop/cash/queryPage',data)
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
		menuSelectcancel(){

		},
	},
	mounted(){
		this.queryList(1)
	}
}
</script>