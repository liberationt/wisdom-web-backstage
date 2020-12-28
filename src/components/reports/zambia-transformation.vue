<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;充值赞豆转化报表</span>
			</p>
		</div>
		<div class="clearfix contentcss">
				<ul class="querysty">
                    <li>
						<Select class="mr20" v-model="lookCood" placeholder="请选择查看方式" style="width:150px;" @on-change="lookCoodChange">
							<Option v-for="item in lookCoodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</li>
                    <li>
						<Input v-if="lookCood==2" v-model="gearShift" class="mr20" placeholder="请输入挡位" clearable style="width: 150px" />
                    </li>
					<li>
						<DatePicker type="date" :value="beginTime" :options="options3" @on-change="beginTimeChange" placeholder="开始时间" style="width: 150px"></DatePicker>
						<span>  -  </span>
						<DatePicker type="date" :value="endTime" :options="options3" @on-change="endTimeChange" placeholder="结束时间" style="width: 150px"></DatePicker>
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
				<Table v-if="lookCood==1" border highlight-row :columns="columns7" :data="data6"></Table>
                <Table v-if="lookCood==2" border highlight-row :columns="columns8" :data="data7"></Table>
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
			lookCood:1,
            lookCoodList:[
				{value:1,label:'按汇总查看'},
				{value:2,label:'按充值挡位查看'}
			],
            gearShift:'',
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
				},
				{
					title: 'PV',
					key: 'pv',
					minWidth: 110,
					align: 'center',
                },
                {
					title: 'UV',
					key: 'uv',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '支付点击次数',
					key: 'clickCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值成功笔数',
					key: 'successCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值成功人数',
					key: 'successPersonCount',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '充值转化率',
					key: 'convertRate',
					minWidth: 110,
					align: 'center',
				},{
					title: '充值成功支付总金额',
					key: 'successAmountAsFormat',
					minWidth: 110,
					align: 'center',
				},{
					title: '平均充值金额(元)',
					key: 'avgAmountAsFormat',
					minWidth: 110,
					align: 'center',
				},{
					title: '失败笔数',
					key: 'failCount',
					minWidth: 110,
					align: 'center',
				},
			],
            data6:[],
            columns8:[
                {
					title: '日期',
					key: 'queryDate',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '充值档位(元)',
					key: 'position',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '支付点击次数',
					key: 'clickCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值成功笔数',
					key: 'successCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '充值成功人数',
					key: 'personCount',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '充值转化率',
					key: 'convertRate',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '充值成功支付总金额',
					key: 'rechargeAmountAsFormat',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '失败笔数',
					key: 'failCount',
					minWidth: 110,
					align: 'center',
				}
            ],
            data7:[]
		}
	},
	methods:{
		beginTimeChange(beginTime){
			this.beginTime = beginTime
		},
		endTimeChange(endTime){
			this.endTime = endTime
		},
		supplierChange(supplier){
			this.supplier = supplier
		},
		lookCoodChange(lookCood){
			this.lookCood = lookCood
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
				beginQueryDate:this.beginTime,
				endQueryDate:this.endTime,
				pageNum: startRow,
				pageSize: this.endRow,
				reportType:1,
			}
			let urls 
			if(this.lookCood==1){
				urls =  '/report/rechargeConvertReport/queryListByCollect'
				this.http.post(BASE_URL + urls, data)
				.then((data) => {
					if (data.code == 'success') {
					this.data6 = data.data.dataList
					this.total = Number(data.data.total)
					this.startRow =
						Math.ceil(data.data.startRow / this.endRow) == 0
							? 1
							: Math.ceil(data.data.startRow / this.endRow);
					this.loading3 = false
				} else {
					this.loading3 = false
				}
				}).catch(() => {
					this.loading3 = false
				})
			}else{
				urls = '/report/rechargeConvertReport/queryListByPosition'
				data.positionAmount = this.gearShift
				this.http.post(BASE_URL + urls, data)
				.then((data) => {
					if (data.code == 'success') {
					this.data7 = data.data.dataList
					this.total = Number(data.data.total)
					this.startRow =
						Math.ceil(data.data.startRow / this.endRow) == 0
							? 1
							: Math.ceil(data.data.startRow / this.endRow);
					this.loading3 = false
				} else {
					this.loading3 = false
				}
				}).catch(() => {
					this.loading3 = false
				})
			}
			
		},
		exports(){
			this.loading2 = true;
			let httpUrl 
			let formData = new FormData()
			if(this.lookCood==1){
				httpUrl = BASE_URL+'/report/rechargeConvertReport/exportListByCollect'
			}else{
				httpUrl = BASE_URL+'/report/rechargeConvertReport/exportListByPosition'
				formData.append("positionAmount",this.gearShift)
			}
			formData.append("beginQueryDate",this.beginTime)
			formData.append("endQueryDate",this.endTime)
			formData.append("pageNum",this.startRow)
			formData.append("pageSize",this.endRow)
			formData.append("reportType",1)
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