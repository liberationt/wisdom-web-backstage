<template>
    <div>
		<div class="navigation">
			<p>
          		<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动审核>&nbsp;&nbsp;邀请充值（单笔）</span>
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
						<Select v-model="timeType" :disabled="auditing" class='mr10' placeholder="请选择状态" style='width:150px;'>
								<Option v-for="item in timeList" :value="item.value" :key="item.typeCode">{{ item.label }}</Option>
						</Select>
					</div>
					<div v-if="timeType==2">
						<Row>
							<Col span="11">
								<FormItem prop="beginTime">
										<DatePicker type="datetime" :disabled="auditing" placeholder="开始时间" :value="beginTime"></DatePicker>
								</FormItem>
							</Col>
							<Col span="2" style="text-align: center">-</Col>
							<Col span="11">
								<FormItem prop="endTime">
										<DatePicker type="datetime" :disabled="auditing" placeholder="结束时间" :value="endTime"></DatePicker>
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
				</div>
			</FormItem>
			<FormItem :label-width="240" style="margin-top:100px;">
				<Button type="primary" @click="toexamine()">审核</Button>
				<Button type="primary" style="margin-left: 8px" @click="lookJournal">查看操作日志</Button>
				<Button @click="returns" style="margin-left: 8px">取消</Button>
			</FormItem>
		</Form>
		</div> 
		<Modal
			title="审核"
			v-model="modal9"
			@on-ok="examineSubmit('formCustomexa')"
			@on-cancel="handleReset('formCustomexa')"
			ok-text="保存"
			cancel-text="取消"
			class-name="vertical-center-modal"
			width="500"
			:loading="loading"
			:mask-closable="false">
			<div  class="newtype_file mt15 mb15">
				<Form ref="formCustomexa" :model="formCustomexa" :rules="ruleCustomexa" :label-width="100" style="padding-left:15px">
					<FormItem label="审核状态:" prop="activeType" >
						<Select @on-change="whetherpass" v-model="formCustomexa.activeType" style="width:160px" >
							<Option  value="1" >审核通过</Option>
							<Option  value="2" >审核驳回</Option>
						</Select>    
					</FormItem>
					<FormItem label="备注:" prop="remarks" v-if="formCustomexa.activeType=='2'">
						<Input v-model="formCustomexa.remarks" type="textarea" :rows="4" placeholder="请输入备注" />    
					</FormItem>
				</Form> 
			</div>
		</Modal>  
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
			auditing:true,
			timeType:1,
			beginTime:'',
			endTime:'',
			marketCode:'',
			modal9:false,
			loading:true,
			couponList:[],
			timeList:[
				{label:'不限时间范围',value:1},
				{label:'固定时间范围',value:2}
			],
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
			formValidate:{
				marketName:''
			},
			ruleValidate:{
				marketName: [
					{ required: true, message: '请输入活动标题', trigger: 'blur' },
					{ type: 'string', max: 50, message: '活动标题不能超过50个字', trigger: 'blur' }
				]
			},
			formCustomexa: {
				activeType:'',
				remarks:''
			},
			ruleCustomexa: {
				activeType: [
					{required: true,message: '请选择审核状态',trigger: 'blur'},    
				],
				remarks: [
					{required: true,message: '请输入备注',trigger: 'blur'},
					{ type: 'string', max: 50, message: '审核备注不能超过50个字', trigger: 'blur' }
				],
			}
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
			whetherpass(activeType){
				this.formCustomexa.activeType = activeType
			},
			toexamine(){
				this.modal9 = true
			},
			returns(){
				this.$router.go(-1)
			},
			examineSubmit (name) {
			this.$refs[name].validate(valid => {
			if (!valid) {
				return this.changeLoading()
			} else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                memo : this.formCustomexa.remarks,
                marketCode:this.marketCode
            }
            this.http.post(BASE_URL + '/loan/marketing/audit', data)
            .then(data=>{
                if (data.code == 'success') {
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                          this.$refs[name].resetFields()
                          this.$router.push("/marketingAudit")
                        }
                    })
                } else {
                  this.modal9 = false
                  this.$refs[name].resetFields()
                  this.$Message.info(data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
          this.changeLoading()
          this.modal9 = false
      })
      },
      handleReset (name) {
		this.$refs[name].resetFields()
        this.formCustomexa.remarks=""
        this.memos = false
      },
      //返回
      returns(){
        window.history.go(-1);
      },
        changeLoading () {
			this.loading = false
			this.$nextTick(() => {
				this.loading = true
        	})
		  },
			getDataList(){
				this.marketCode =this.$route.query.marketCode
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
		mounted(){
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