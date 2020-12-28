<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;充值报表</span>
			</p>
		</div>
		<div class="clearfix contentcss">
			<ul class="querysty">
				<li>
					<DatePicker type="date" :value="beginTime" :options="options3" @on-change="beginTimeChange" placeholder="开始时间" style="width: 150px"></DatePicker>
					<span>  -  </span>
					<DatePicker type="date" :value="endTime" :options="options3" @on-change="endTimeChange" placeholder="结束时间" style="width: 150px"></DatePicker>
				</li>
				<li>
					<Select class="mr20" v-model="rechargeType" placeholder="请选择查看方式" style="width:150px;" @on-change="rechargeTypeChange">
						<Option v-for="item in rechargeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</li>
				<li>
					<Button type="info" class="ml20 w100" :loading="loading3" @click="queryList(1)">
						<span v-if="!loading3">查询</span>
						<span v-else>查询</span>
					</Button>
					<Button type="primary" class="ml20 w100 " :loading="loading2" @click="exports">
						<span v-if="!loading2">导出</span>
						<span v-else>请稍等...</span>
					</Button>
				</li>
			</ul>
		</div>
		<div id="application_table " class="contentcss mt10">
			<div id="application_table" class="mt15">
				<Table border highlight-row :columns="columns7" :data="data6"></Table>
			</div>
			<div class="tr mt15">
				<Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
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
			rechargeType:0,
            rechargeTypeList:[
				{value:0,label:'请选择充值方式'},
				{value:1,label:'现金充值赞豆'},
				{value:2,label:'现金充值会员'}
			],
			options3: {
				disabledDate(date) {
					return date && date.valueOf() > Date.now() - 86400000*0;
				}
			},
			loading3:false,
			loading2:false,
			endRow: 10,
			total: 0,
			startRow: 1,
			columns7:[
				{
					title: '日期',
					key: 'queryDate',
					minWidth: 140,
					align: 'center',
					render(h, params){
						let queryDate = params.row.queryDate
						let arr = []
						if(queryDate =='汇总结果'){
							arr.push(
								h("span", 
									{
										style: {
											fontWeight:'bold',
										}
									},
									'汇总结果'
								)
							)
						}else{
							arr  = queryDate
						}
						return h('div',arr);
					}
				},
				{
					title: '充值类型',
					key: 'rechargeType',
					minWidth: 110,
					align: 'center',
					render:(h,params)=>{
						let rechargeType = params.row.rechargeType
						if(rechargeType==1){
							rechargeType='现金充值赞豆'
						}
						if(rechargeType==2){
							rechargeType = '现金充值会员'
						}
						return h('span',rechargeType)
					}
                },
                {
					title: '支付方式',
					key: 'payWay',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值人数',
					key: 'rechargePersonCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值笔数',
					key: 'rechargeCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '实际支付金额',
					key: 'rechargeAmountAsFormat',
					minWidth: 110,
					align: 'center',
				}
			],
            data6:[],
		}
	},
	methods:{
		beginTimeChange(beginTime){
			this.beginTime = beginTime
		},
		endTimeChange(endTime){
			this.endTime = endTime
		},
		rechargeTypeChange(rechargeType){
			this.rechargeType = rechargeType
		},
		pageChange(page) {
			this.startRow = page;
			this.queryList(this.startRow);
		},
		PageSizeChange(page) {
			this.startRow = 1;
			this.endRow = page;
			this.queryList(1);
		},
		queryList(startRow){
			let date1 = Date.parse(new Date(this.beginTime))/1000
			let date2 = Date.parse(new Date(this.endTime))/1000
			if (date1 > date2) {
				this.loading3 = false
				this.$Modal.warning({
				title: '提示',
				content: '<p>开始时间不得大于结束时间</p>'
				})
				return false
			}
			this.loading3 = true
			let data = {
				queryBeginDate:this.beginTime,
				queryEndDate:this.endTime,
				pageNum: startRow,
				pageSize: this.endRow,
				rechargeType:this.rechargeType ==0?'':this.rechargeType,
			}
			this.http.post(BASE_URL + '/report/rechargeReport/queryList', data)
			.then((data) => {
				if (data.code == 'success') {
				this.data6 = data.data.pageData.dataList
				const obj = {
					queryDate:'汇总结果',
					rechargePersonCount:data.data.totalRechargePeopleCount,
					rechargeCount:data.data.totalRechargeCount,
					rechargeAmountAsFormat:data.data.totalRechargeAmountAsFormat
				}
				this.data6.splice(0,0,obj)
				this.total = Number(data.data.pageData.total)
				this.startRow =
					Math.ceil(data.data.pageData.startRow / this.endRow) == 0
						? 1
						: Math.ceil(data.data.pageData.startRow / this.endRow);
				this.loading3 = false
			} else {
				this.loading3 = false
			}
			}).catch(() => {
				this.loading3 = false
			})
		},
		exports(){
			this.loading2 = true;
			let httpUrl = BASE_URL+'/report/rechargeReport/export'
			let formData = new FormData()
			formData.append("queryBeginDate",this.beginTime)
			formData.append("queryEndDate",this.endTime)
			formData.append("pageNum",this.startRow)
			formData.append("pageSize",this.endRow)
			formData.append("rechargeType",this.rechargeType==0?'':this.rechargeType)
			utils.exporttable(httpUrl, utils.getlocal('token'),formData, e => {
				if(e == true ){
					this.loading2 = false;
				}
			})
		},
		timeFormat(date,num) {
			let y = date.getFullYear(); //年
			let m = date.getMonth() + 1; //月
			let d = date.getDate(); //日
			if (num == 1) {
				d = date.getDate()-1
			}
			m=m<10?"0"+m:m;
			d=d<10?"0"+d:d;
			return y + "-" + m + "-" + d;
		}
	},
	mounted(){
		var date=new Date();
		this.beginTime = this.timeFormat(date,0)
		this.endTime = this.timeFormat(date,0)
		this.queryList(1)
	}
}
</script>
<style lang="less" scoped>
	
</style>