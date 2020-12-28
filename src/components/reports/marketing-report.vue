<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;抢单销售报表</span>
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
						<Select class="ml20 mr20" v-model="province" placeholder="请选择省份" style="width:150px;" @on-change="provinceChange">
							<Option v-for="item in provinceList" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
						</Select>
					</li>
					<li>
						<Select v-model="city" class="ml20" placeholder="请选择城市" style="width:150px;">
							<Option v-for="item in cityList" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
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
			province:'',
			provinceList:[],
			options3: {
				disabledDate(date) {
					return date && date.valueOf() > Date.now() - 86400000*0;
				}
			},
			city:'',
			cityList:[],
			loading3:false,
			loading2:false,
			endRow: 10,
			total: 0,
			startRow: 1,
			columns7:[
				{
					title: '日期',
					key: 'reportTime',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '省份',
					key: 'loanCityNameFirst',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '城市',
					key: 'loanCityNameSecond',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '信贷员数量',
					key: 'loanOfficerCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '新增贷款客户数量',
					key: 'loanUserAddCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '已售新增贷款客户数量',
					key: 'loanUserAddSoldCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '已售贷款客户数量',
					key: 'loanUserSoldCount',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '剩余贷款客户数量',
					key: 'otherLoanUserCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '销售收入',
					key: 'saleIncomeAsFormat',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '单用户销售收入',
					key: 'onceUserSaleIncomeAsFormat',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '1-2天内贷款客户数量',
					key: 'oneThreeDayLoanUserCount',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '3-5天内贷款客户数量',
					key: 'threeFiveDayLoanUserCount',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '6-10天内贷款客户数量',
					key: 'fiveTenDayLoanUserCount',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '11天以上贷款客户数量',
					key: 'greaterTenDayLoanUserCount',
					minWidth: 140,
					align: 'center',
				},
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
		provinceChange(province){
			this.province = province
			let data = {
				"data": province
			}
			this.cityshi(data)
		},
		//市
		cityshi(data){
			this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
				this.cityList = data.data
			})
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
				loanAdCodeFirst:this.province,
				loanAdCodeSecond :this.city
			}
			this.http.post(BASE_URL + '/report/loanQdxSaleReport/queryPage', data)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.dataList
          this.total = Number(resp.data.total)
          this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
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
			let httpUrl= BASE_URL+'/report/loanQdxSaleReport/export'
			let formData = new FormData()
			formData.append("beginTime",this.beginTime)
			formData.append("endTime",this.endTime)
			formData.append("loanAdCodeFirst",this.province)
			formData.append("loanAdCodeSecond",this.city)
			formData.append("pageNum",this.startRow)
			formData.append("pageSize",this.endRow)
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
	created(){
		this.http.get("../../../static/city.json").then(data => {
			this.provinceList = data;
    });
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