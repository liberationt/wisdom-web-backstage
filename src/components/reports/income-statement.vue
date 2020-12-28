<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;收入报表</span>
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
						<Select class="ml20 mr20" v-model="income" placeholder="请选择收入类型" style="width:150px;" @on-change="supplierChange">
							<Option v-for="item in incomeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</li>
					<li>
						<Select class="mr20" v-model="paystyle" placeholder="请选择支付方式" style="width:150px;" @on-change="paystyleChange">
							<Option v-for="item in paystyleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</li>
					<li>
						<Button type="info" class="w100" :loading="loading3" @click="queryList(1)">
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
				<Table border highlight-row :columns="columnsNum" :data="data6"></Table>
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
			income:0,
			incomeList:[
				{value:0,label:'请选择收入类型'},
				{value:1,label:'抢单支付'},
				{value:2,label:'会员充值'},
				{value:3,label:'淘单支付'},
				{value:4,label:'手工调整扣除'},
				{value:5,label:'咨询扣费'},
				{value:6,label:'赞豆过期扣除'}
			],
			paystyle:0,
			paystyleList:[
				{value:0,label:'请选择支付方式'},
				{value:1,label:'抢单券'},
				{value:2,label:'赞豆'},
				{value:3,label:'现金'}
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
			columnsNum:[
				{
					title: '日期',
					key: 'reportTime',
					minWidth: 140,
					align: 'center',
					render(h, params){
						let queryDate = params.row.reportTime
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
					title: '收入类型',
					key: 'incomeType',
					minWidth: 110,
					align: 'center',
					render:(h,params)=>{
						let incomeType = params.row.incomeType
						if(incomeType=='1'){
							incomeType='抢单支付'
						}
						if(incomeType=='2'){
							incomeType='会员充值'
						}
						if(incomeType=='3'){
							incomeType='淘单支付'
						}
						if(incomeType=='4'){
							incomeType='手工调整扣除'
						}
						if(incomeType=='5'){
							incomeType='咨询扣费'
						}
						if(incomeType=='6'){
							incomeType='赞豆过期扣除'
						}
						return h('span',incomeType)
					}
				},
				{
					title: '支付方式',
					key: 'payType',
					minWidth: 110,
					align: 'center',
					render:(h,params)=>{
						let payType = params.row.payType
						if(payType=='1'){
							payType='抢单券'
						}
						if(payType =='2'){
							payType='赞豆'
						}
						if(payType =='3'){
							payType='现金'
						}
						return h('span',payType)
					}
				},
				{
					title: '人数',
					key: 'peopleSize',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '笔数',
					key: 'transSize',
					minWidth: 110,
					align: 'center',
                },
                {
					title: '金额',
					key: 'amountAsFormat',
					minWidth: 110,
					align: 'center',
				}
			],
			data6:[]
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
		paystyleChange(paystyle){
			this.paystyle = paystyle
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
				beginTime:this.beginTime,
				endTime:this.endTime,
        pageNum: startRow,
				pageSize: this.endRow,
				incomeType:this.income ==0? '' : this.income,
				payType: this.paystyle ==0?'' : this.paystyle
			}
			this.http.post(BASE_URL + '/report/payIncomeReport/queryPage', data)
      .then((data) => {
        if (data.code == 'success') {
					this.data6 = data.data.dataList
					const obj = {
							reportTime:'汇总结果',
							peopleSize:data.data.totalRes.peopleSize,
							transSize:data.data.totalRes.transSize,
							amountAsFormat:data.data.totalRes.amountAsFormat
					}
				this.data6.splice(0,0,obj)
          this.total = Number(data.data.total)
          this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          this.loading3 = false
        } else {
          this.loading3 = false
        }
      })
      .catch(() => {
        this.loading3 = false
      })
		},
		exports(){
			this.loading2 = true;
			let httpUrl = BASE_URL+'/report/payIncomeReport/export'
			let formData = new FormData()
			formData.append("beginTime",this.beginTime)
			formData.append("endTime",this.endTime)
			formData.append("pageNum",this.startRow)
			formData.append("pageSize",this.endRow)
			formData.append("incomeType",this.income==0?'':this.income)
			formData.append("payType",this.paystyle==0?'':this.paystyle)
			utils.exporttable(httpUrl, utils.getlocal('token'),formData, e => {
				if(e == true ){
					this.loading2 = false;
				}
			})
		},
		timeFormat(date,num) {
			let y = date.getFullYear(); //年
			let m = date.getMonth() + 1; //月
			let d = date.getDate()-1; //日
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