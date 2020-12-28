<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动管理>&nbsp;&nbsp;邀请充值（单笔）</span>
			</p>
		</div>
		<div class="contentcss">
		<Form label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate">
			<FormItem label="活动标题：" prop="marketName"  :label-width="120">
					<Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入活动标题" style="width:400px;"></Input>
			</FormItem>
			<FormItem label="活动日期：" :label-width="120">
				<div class="contentRightmain">
					<div>
						<Select v-model="timeType" :disabled="auditing" class='mr10' placeholder="请选择状态" style='width:150px;' @on-change="timeChange">
								<Option v-for="item in timeList" :value="item.value" :key="item.typeCode">{{ item.label }}</Option>
						</Select>
					</div>
					<div v-if="timeType==2">
						<Row>
							<Col span="11">
								<FormItem prop="beginTime">
										<DatePicker type="datetime" :disabled="auditing" placeholder="开始时间" @on-change='begintimeChange' :options="options3" :value="beginTime"></DatePicker>
								</FormItem>
							</Col>
							<Col span="2" style="text-align: center">-</Col>
							<Col span="11">
								<FormItem prop="endTime">
										<DatePicker type="datetime" :disabled="auditing" placeholder="结束时间" @on-change='endtimeChange' :options="options3" :value="endTime"></DatePicker>
								</FormItem>
							</Col>
						</Row>
					</div>
				</div>
			</FormItem>
			<FormItem v-for="(item,i) in inviteRechargeBaseBeanList"  :label-width="120" label="" :key='i'>
				<span slot="label" v-if="i==0">普通用户返利:</span>
				<span slot="label" v-else>会员V{{item.vipLevel}}返利:</span>
				<div v-for="(res,index) in item.marketingList" :key='index' class="clearfix flexd mb15">
					<Input type="text" :disabled="auditing" v-model="res.rechargeNumber" class="left inputnum mr20" style="width:180px">
						<span slot="prepend">单笔充值</span>
						<span slot="append" class="left">赞豆</span>
					</Input>
					<Input type="text" :disabled="auditing" v-model="res.zd.giveCount" class="left inputnum" style="width:140px">
						<span slot="prepend">返</span>
						<span slot="append" class="left">赞豆</span>
					</Input>
					<Input type="text" :disabled="auditing" v-model="res.zd.days" class="left inputnum mr20" style="width:140px">
						<span slot="append" class="left">天有效期</span>
					</Input>
					<Input type="text" :disabled="auditing" v-model="res.giveVipDays" class="left inputnum mr20" style="width:140px">
						<span slot="prepend">送</span>
						<span slot="append" class="left">天会员</span>
					</Input>
					<Select v-model="res.marketingTicket.ticketNo" :disabled="auditing" filterable style="width:160px">
						<Option v-for="item in couponList" :value="item" :key="item">{{ item }}</Option>
					</Select>
					<Input type="text" :disabled="auditing" v-model="res.marketingTicket.ticketNumber" class="left inputnum" style="width:140px">
						<span slot="prepend">抢单券</span>
						<span slot="append" class="left">张</span>
					</Input>
					<Button type="primary" class="left ml10" :disabled="auditing" v-if="index==0" @click="addnormal1(i,item.vipLevel)">+</Button>
					<Button type="primary" class="left ml10" :disabled="auditing" v-if="index!=0" @click="addnormal2(i,index)">-</Button>
				</div>
			</FormItem>
			<FormItem :label-width="240" style="margin-top:100px;">
				<Button type="primary" :disabled="auditing" @click="handleSubmit('formValidate')">保存提交审核</Button>
             	<Button type="primary" v-if="$route.query.marketCode" @click="lookJournal">操作日志</Button>
				<Button @click="handleReset()" style="margin:0 8px">取消</Button>
			</FormItem>
		</Form>
		</div>   
		<Modal
			v-model="JournalList"
			title="操作日志"
			ok-text="关闭"
			:mask-closable = false
			width=800
			>
			<Table border :columns="columns" :data="data1"></Table>
		</Modal> 
  	</div>
</template>
<script>
import utils from "../../utils/utils";
export default {
    data(){
		return{
			JournalList:false,
			columns:[
				{
                title: "操作时间",
                key: "dataCreateTime",
                align: "center",
                minWidth: 150
              },
              {
                title: "操作人",
                key: "operationMan",
                align: "center",
                minWidth: 80
              },
              {
                title: "操作内容",
                key: "operationContent",
                align: "center",
                minWidth: 150
              },
              {
                title: "备注",
                key: "memo",
                align: "center",
                minWidth: 150
              }
			],
			data1:[],
			auditing:false,
			timeType:1,
			beginTime:'',
			endTime:'',
			couponList:[],
			momberList:[1,2],
			timeList:[
				{label:'不限时间范围',value:1},
				{label:'固定时间范围',value:2}
			],
			options3: {
				disabledDate (date) {
						return date && date.valueOf() < Date.now() - 86400000;
				}
			},
			normalMarketingList:[
				{
					rechargeNumber:'',
					giveNumber:'',
					giveVipDays:'',
					giveCouponNumber:''
				}
			],
			vipMarketingList:[
				{
					rechargeNumber:'',
					giveNumber:'',
					giveVipDays:'',
					giveCouponNumber:''
				}
				
			],
			formValidate:{
				marketName:'',

			},
			ruleValidate:{
				marketName: [
						{ required: true, message: '请输入活动标题', trigger: 'blur' },
						{ type: 'string', max: 50, message: '活动标题不能超过50个字', trigger: 'blur' }
				]
			},
			// 七期
			inviteRechargeBaseBeanList: [
				{
					marketingList: [
						{
							giveVipDays: '',
							marketingTicket: {
							ticketNo: "",
							ticketNumber: '',
							vipLevel: -1
							},
							rechargeNumber: '',
							vipLevel: '',
							zd: {
							days: '',
							giveCount: '',
							vipLevel: -1
							}
						}
					],
					vipLevel: -1
				}
			],
		}
	},
	methods:{
		lookJournal(){
			this.JournalList=true
			let data={
				operationType:'marketing_edit',
				correlationCode:this.$route.query.marketCode
			}
			this.http.post(BASE_URL+'/loan/operationLog/queryPage',data)
			.then(data=>{
				if(data.code=='success'){
					this.data1= data.data.dataList
				}
			})
		},
		timeChange(timeType){
			this.timeType = timeType
		},
		begintimeChange(beginTime){
			this.beginTime = beginTime
		},
		endtimeChange(endTime){
			this.endTime = endTime
		},
		handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              let date1 = Date.parse(new Date(this.beginTime))/1000
			  let date2 = Date.parse(new Date(this.endTime))/1000
              let date3 = Date.parse(new Date(utils.getNowFormatDate())) / 1000
              let refs = /^(0|\+?[1-9][0-9]{0,5})$/
              if(this.timeType=='2'){
                if(this.beginTime==''){
                  this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>请选择开始时间</p>'
                  })
                  return false
                }
                if(this.endTime==''){
                  this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>请选择结束时间</p>'
                  })
                  return false
                }
                if(date1>=date2){
                  this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>开始时间不得大于等于结束时间</p>'
                  })
                  return false
								}
								if(date1<date3){
                    this.$Modal.warning({
                      title: '温馨提示',
                      content: '<p>开始时间不得小于当前时间</p>'
                    })
                    return false
                  }
				}
				for(var i=0;i<this.inviteRechargeBaseBeanList.length;i++){
					for(var j=0;j<this.inviteRechargeBaseBeanList[i].marketingList.length;j++){
						if(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber==''&&(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount==''&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days==''&&(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays==''&&(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='请选择'&&this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber=='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='请选择'&&this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber=='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days==''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays=='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='请选择'&&this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo!='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber!='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days==''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays=='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='请选择'&&this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber!='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days==''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays=='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='请选择'||this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber!='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if(((this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='请选择'||this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNo=='') && this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber!='')&&(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount==''||this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days==''||this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays=='')){
							this.$Message.error('所填内容不能为空')
							return false
						}
						if((this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber!=''&&this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount!=''&&this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days!=''&&this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays!='')&&(!refs.test(this.inviteRechargeBaseBeanList[i].marketingList[j].rechargeNumber)||!refs.test(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.giveCount)||!refs.test(this.inviteRechargeBaseBeanList[i].marketingList[j].zd.days)||!refs.test(this.inviteRechargeBaseBeanList[i].marketingList[j].giveVipDays))){
                  			this.$Message.error('请输入0-999999之间的整数');
							return false
						}
						if(!refs.test(this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber)&&this.inviteRechargeBaseBeanList[i].marketingList[j].marketingTicket.ticketNumber!=''){
							this.$Message.error('请输入0-999999之间的整数');
							return false
						}
					}
				}
             	this.preserve()
            }
        })
      },
      handleReset () {
        window.history.go(-1);
      },
		addnormal1(num1,level){
			let aaa = [
				{
					giveVipDays: '',
					marketingTicket: {
					ticketNo: "",
					ticketNumber: '',
					vipLevel: level
					},
					rechargeNumber: '',
					vipLevel: level,
					zd: {
					days: '',
					giveCount: '',
					vipLevel: level
					}
				}
			]
			this.inviteRechargeBaseBeanList[num1].marketingList.push( 
				aaa[0]
			)
		},
		addnormal2(num1,num2){
			this.inviteRechargeBaseBeanList[num1].marketingList.splice(num2, 1)
		},
		// 保存提交审核
      	preserve(){
        this.$Modal.confirm({
            title: '温馨提示',
            content: '<p>确认保存提交审核？</p>',
            onOk: () => {
                let data = {
					marketName :this.formValidate.marketName,
					timeType:this.timeType,
					inviteRecharge:{
						inviteRechargeBaseBeanList:this.inviteRechargeBaseBeanList
                	},
                  	marketType:3
                }
                if(data.timeType=='2'){
                  data.marketBeginTime = this.beginTime,
                  data.marketEndTime  = this.endTime
                }
                this.http.post(BASE_URL+"/loan/marketing/save",data).then(data=>{
                  if(data.code == 'success'){
                    this.$Message.info('保存提交审核成功！');
                    this.$router.push('/marketingActivities')
                  } else {
                    this.$Message.info(data.message);
                  }
                }).catch(err=>{
                  console.log(err)
                })
                
            },
            onCancel: () => {
            }
        })
      	}
		},
		mounted(){
			if(this.$route.query.marketCode){
				this.http.post(BASE_URL+'/loan/marketing/getByCode?marketCode='+this.$route.query.marketCode)
				.then(data=>{
				if(data.code =='success'){
					this.auditing = true
					this.formValidate.marketName=data.data.marketName
					this.timeType = data.data.timeType
					this.beginTime = data.data.marketBeginTime
					this.endTime = data.data.marketEndTime
					this.inviteRechargeBaseBeanList = data.data.inviteRecharge.inviteRechargeBaseBeanList
          		}
       			})
			}
			  
		},
		created(){
			this.http.post(BASE_URL+'/loan/vipLevel/query',{}).then(data=>{
				if(data.code=='success'){
					for (let i = 0; i < data.data.length; i++) {
						let obj = new Object ()
						let aaa = [
							{
								giveVipDays: '',
								marketingTicket: {
								ticketNo: "",
								ticketNumber: '',
								vipLevel: ''
								},
								rechargeNumber: '',
								vipLevel: '',
								zd: {
								days: '',
								giveCount: '',
								vipLevel: ''
								}
							}
						]
						aaa[0].marketingTicket.vipLevel = data.data[i].level
						aaa[0].vipLevel= data.data[i].level
						aaa[0].zd.vipLevel = data.data[i].level
						obj.marketingList = aaa
						obj.vipLevel = data.data[i].level
						this.inviteRechargeBaseBeanList.push(obj)
					}
				}
			})	
			this.http.post(BASE_URL+"/loan/ticketManage/queryTicketNoList",{}).then(data=>{
				if(data.code == 'success'){
				this.couponList = data.data
				this.couponList.unshift('请选择')
				this.getDataList()
			} else {
				this.$Message.error(data.message);
			}
			}).catch(err=>{
				console.log(err)
			})
		}
}
</script>
<style lang="less" scoped>
.contentRightmain{
	display: flex;
  }
  .flexd{
	  display: flex;
  }
</style>