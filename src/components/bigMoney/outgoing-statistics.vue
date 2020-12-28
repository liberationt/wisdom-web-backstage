<template>
	<div>
		<div class="navigation">
			<p>
				<span>语音外呼统计</span>
			</p>
		</div>
		<div class="conditioncss">
          <ul class="querysty">
            <li>
              <span class="w90 tr displayib">服务器名称:</span>
            <Select v-model="model2" style="width:150px" class="mr20">
				<Option  value="" >全部</Option>
                <Option v-for="item in cityList2" :value="item.serverIp" :key="item.serverIp">{{ item.serverName }}</Option>
            </Select>
            </li>
            <li>
              <span class="w60 displayib">回调时间:</span>
              <DatePicker type="date" @on-change="time1" v-model="value1" confirm placeholder="开始时间" class="" style="width: 150px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" class="mr20" @on-change="time2" v-model="value2" confirm placeholder="结束时间" style="width: 150px"></DatePicker>
            </li>
          </ul> 
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right mr20 w100" type="info" @click="inquire">查询</Button> -->
                <Button type="info" class="right mr20 w90" :loading="loading3" @click="inquire(1)">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>
		<div class="contentcss mt10">
			<Table border highlight-row :columns="columns1" :data="data1"></Table>
			<div class="tr mt15">
				<Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
			</div>
		</div>
	</div>
</template>
<script>
import utils from '../../utils/utils'
	export default {
		data() {
			return {
				model2:'',
				cityList2:[],
				value1:'',
				value2:'',
				total: 0,
				startRow: 1,
				endRow: 10,
				loading3: false,
				columns1: [
					// {
					// 	title: '日期',
					// 	align: 'center',
					// 	minWidth: 100,
					// 	key: 'dataCreateTime'
					// },
					{
						title: '服务器名称',
						align: 'center',
						minWidth: 110,
						key: 'serverName'
					},
					{
						title: '数量',
						align: 'center',
						minWidth: 110,
						key: 'num'
					},
				],
				data1: []
			}
		},
		methods: {
			// 时间判断
			time1(value, data) {
				this.value1 = value
			},
			time2(value, data) {
				this.value2 = value
			},
			// 分页
			pageChange(page) {
				this.startRow = page
				this.inquire(this.startRow)
			},
			pagesizechange(page) {
				this.startRow = 1
				this.endRow = page
				this.inquire(this.startRow)
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
			},
			inquire(startRow) {
				this.loading3 = true
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.$Modal.warning({
						title: '回调时间',
						content: '<p>开始时间不得大于结束时间</p>'
						})
						this.loading3 = false
						return false
					}
				let params = {
					ip:this.model2,
					beginTime:this.value1,
					endTime:this.value2,
					pageNum: startRow,
					pageSize: this.endRow,
				}
				this.http.post(BASE_URL + '/netmoney/callbackUser/queryListStatistics', params)
					.then((resp) => {
						if(resp.code == 'success') {
							this.loading3 = false
							this.data1 = resp.data.dataList
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow) == 0 ? 1 : Math.ceil(resp.data.startRow / this.endRow);
						} else {
							this.loading3 = false
						}
					})
					.catch(() => {})
			}
		},
		mounted() {
			// 获取当前时间
			var date=new Date();
			this.value2 = this.timeFormat(date,0)
			this.value1 = this.timeFormat(date,0)
			this.http.post(BASE_URL + '/netmoney/callbackServer/queryListDown',{})
			.then((resp) => {
			if(resp.code == 'success') {
				this.cityList2 = resp.data.dataList
			} else {
				
			}
			})
			.catch(() => {
			
			})

		}
	}
</script>
<style lang="less" scoped>

</style>