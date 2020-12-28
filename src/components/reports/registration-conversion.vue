<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;注册转化率报表</span>
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
					key: 'reportTime',
					minWidth: 140,
					align: 'center'
				},
				{
					title: '新增注册',
					key: 'registerCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '当日注册提交实名',
					key: 'registerAudit',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '当日注册实名成功',
					key: 'registerAuditSuccess',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '当日提交实名',
					key: 'realAudit',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '当日实名成功人数',
					key: 'realAuditSuccess',
					minWidth: 140,
					align: 'center',
				},
				{
					title: '当天注册实名转化速度',
					key: 'registerAuditRateStr',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '当天注册实名成功转化速度',
					key: 'registerAuditSuccessRateStr',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '平均实名转化速度',
					key: 'realAuditRateStr',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '平均实名成功转化速度',
					key: 'realAuditSuccessRateStr',
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
			this.beginTime+=' 00:00:00'
		},
		endTimeChange(endTime){
			this.endTime = endTime
			this.endTime += ' 23:59:59'
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
			if(!date1 || !date2){
				this.$Message.info('请选择起始时间！')
				return false
			}
			this.loading3 = true
			let data = {
				beginTime:this.beginTime,
				endTime:this.endTime,
        pageNum:startRow,
				pageSize: this.endRow,
			}
			this.http.post(BASE_URL + '/report/reportRegisterConvert/queryPage', data)
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
			let date1 = Date.parse(new Date(this.beginTime))/1000
      let date2 = Date.parse(new Date(this.endTime))/1000
			if(!date1 || !date2){
				this.$Message.info('请选择起始时间！')
				return false
			}
			this.loading2 = true;
			let httpUrl=BASE_URL+'/report/reportRegisterConvert/export'
			let formData = new FormData()
			formData.append("beginTime",this.beginTime)
			formData.append("endTime",this.endTime)
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
		this.beginTime+=' 00:00:00'
		this.endTime = this.timeFormat(date,0)
		this.endTime+=" 23:59:59"
		this.queryList(1)
	}
}
</script>
<style lang="less" scoped>
	
</style>