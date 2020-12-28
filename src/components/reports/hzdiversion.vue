<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;华赞报表&nbsp;>&nbsp;渠道转化率报表-导流</span>
			</p>
		</div>
		<div class="clearfix contentcss">
				<ul class="querysty">
						<li>
						<DatePicker type="date" v-model="beginTime" :options="options3" placeholder="开始时间" style="width: 150px"></DatePicker>
						<span>  -  </span>
						<DatePicker type="date" v-model="endTime" :options="options3" placeholder="结束时间" style="width: 150px"></DatePicker>
					</li>
					<li>
						<Select class="ml20 mr20" v-model="supplier" placeholder="请选择供应商" style="width:150px;" @on-change="supplierChange">
							<Option v-for="item in supplierList" :value="item.suppliersCode" :key="item.suppliersCode">{{ item.suppliersName }}</Option>
						</Select>
					</li>
					<li>
						<Select v-model="channel" class="ml20" placeholder="请选择渠道" style="width:150px;">
							<Option v-for="item in channelList" :value="item.channelKey" :key="item.channelKey">{{ item.channelName }}</Option>
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
				<Table :row-class-name="rowClassName" border highlight-row :columns="columns7" :data="data6"></Table>
			</div>
			<div class="tr mt15">
				<Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
			</div>
		</div>
    </div>
</template>
<script>
import untils from '../../utils/utils'
export default {
	data(){
		return{
			beginTime:'',
			endTime:'',
			supplier:'',
			supplierList:[],
			options3: {
				disabledDate(date) {
					return date && date.valueOf() > Date.now() - 86400000*0;
				}
			},
			channel:'',
			channelList:[],
			loading3:false,
			loading2:false,
			endRow: 10,
			total: 0,
			startRow: 1,
			columns7:[
				{
					title: '日期',
					key: 'reportDate',
					minWidth: 160,
					align: 'center',
					render(h, params){
						let reportDate = params.row.reportDate
						return h("div", [h("span", {
							style: {
								fontWeight:!reportDate  ?'bold':'',
							},
						}, !reportDate  ? "汇总结果" : reportDate)]);
					}
				},
				{
					title: '供应商',
					key: 'suppliersName',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '渠道',
					key: 'channelName',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '注册量',
					key: 'registerCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: 'PV',
					key: 'pvCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: 'UV',
					key: 'uvCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '完善信息',
					key: 'perfectCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '激活量',
					key: 'activeCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '满足抢单条件人数',
					key: 'passCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '销售人数',
					key: 'saleNumber',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '销售金额',
					key: 'saleAmount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '退单人数',
					key: 'backNumber',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '退单金额',
					key: 'backAmount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '单用户销售金额',
					key: 'meanAmount',
					minWidth: 110,
					align: 'center',
				}
			],
			data6:[]
		}
	},
	methods:{
		rowClassName (row, index) {
			if (index === 0) {
					return 'demo-table-info-row';
			}
			return '';
		},
		supplierChange(supplier){
			this.supplierList.forEach(v=>{
				if(v.suppliersCode == supplier && v.suppliersCode != "''") {
					this.channelList=[...v.channelResList] 
					this.channelList.splice(0,0,{channelKey: "''",channelName: '请选择渠道'})
				}
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
		// 查询
		queryList(startRow){
			if(!this.ifDate()) return
			this.http.post(BASE_URL+"/report/reportHuaZanChannel/queryHuaZanPromotionReport",{
				beginTime: untils.formatDate(this.beginTime,'yyyy-MM-dd 00:00:00'),
				endTime: untils.formatDate(this.endTime,'yyyy-MM-dd 23:59:59'),
				channelParent : '3',
				pageSize : this.endRow,
				pageNum : startRow,
				suppliersCode : this.supplier == "''" ? '' : this.supplier,//gongyingshang
				channelKey : this.channel == "''" ? '' : this.channel,//qudao
			}).then(data=>{
				if(data.code == 'success'){
					const {dataList,collectRes}  = data.data
					this.data6 = dataList
					if(dataList.length >0){
						this.data6.splice(0,0,collectRes)
					}
					this.total = Number(data.data.total)
        	this.startRow = Math.ceil(data.data.startRow/this.endRow)== 0 ? 1 : Math.ceil(data.data.startRow / this.endRow);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 导出
		exports(){
			if(!this.ifDate()) return
			this.loading2 = true
			let formData = new FormData();
      formData.append("beginTime",untils.formatDate(this.beginTime,'yyyy-MM-dd 00:00:00'));
      formData.append("endTime", untils.formatDate(this.endTime,'yyyy-MM-dd 23:59:59'));
			formData.append("channelParent", '3' );
			formData.append("suppliersCode", this.supplier == "''" ? '' : this.supplier );
			formData.append("channelKey", this.channel == "''" ? '' : this.channel);
      untils.exporttable(BASE_URL+'/report/reportHuaZanChannel/exportHuaZanPromotionReport', untils.getlocal("token"), formData, e => {
        this.loading2 = false;
      });
		},
		// 初始化数据
		Initialization(){
			this.http.post(BASE_URL+"/report/reportHuaZanChannel/initPromotionReport",{}).then(data=>{
				console.log(data)
				if(data.code =='success'){
					this.supplierList = data.data
					this.supplierList.unshift({suppliersCode: "''",suppliersName: "请选择供应商"})
				}
			}).then(err=>{console.log(err)})
		},
		ifDate(){
			if(this.beginTime=="" || this.endTime == "" ){
				this.$Message.info("请选择起始时间！")
				return false
			}
			return true
		}									
	},
	mounted(){
		this.beginTime = new Date(this.$route.query.date) 
		this.endTime = new Date(this.$route.query.date) 
		this.queryList(1)
		// 初始化
		this.Initialization()
	}
}
</script>
<style lang="less" scoped>
	
</style>