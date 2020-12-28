<template>
    <div>
			<div class="navigation">
				<p>
          <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动审核>&nbsp;&nbsp;充值赠送满减券</span>
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
					<FormItem :label-width="120" label="普通用户返利:">
							<div v-for="(item,index) in normalMarketingList" :key='index' class="flexds mb15">
								<div class="flexds mr20">
									<Input type="text" :disabled="auditing" v-model="item.rechargeNumber" class="mr20" style="width:180px">
										<span slot="prepend">单笔充值</span>
										<span slot="append" class="left">赞豆</span>
									</Input>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index==0">+</Button>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index!=0">-</Button>
								</div>
								<div>
									<div v-for="(v,i) in item.couponList" :key='i' class="flexdclon">
										<span slot="prepend" class="widths">送</span>
										<Select v-model="v.couponKey" :disabled="auditing" filterable style="width:180px">
												<Option v-for="items in couponLists" :value="items" :key="items">{{ items }}券</Option>
										</Select>
										<span slot="prepend" class="widths">券</span>
										<Input type="text" :disabled="auditing" v-model="v.couponNumber" style="width:80px">
											<span slot="append">张</span>
										</Input>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i==0">+</Button>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i!=0">-</Button>
									</div>
								</div>
							</div>
						</FormItem>
						<FormItem :label-width="120" label="会员返利:" class="mt50">
							<div v-for="(item,index) in vipMarketingList" :key='index' class="flexds mb15">
								<div class="flexds mr20">
									<Input type="text" :disabled="auditing" v-model="item.rechargeNumber" class="mr20" style="width:180px">
										<span slot="prepend">单笔充值</span>
										<span slot="append" class="left">赞豆</span>
									</Input>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index==0">+</Button>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index!=0">-</Button>
								</div>
								<div>
									<div v-for="(v,i) in item.couponList" :key='i' class="flexdclon">
										<span slot="prepend" class="widths">送</span>
										<Select v-model="v.couponKey" :disabled="auditing" filterable style="width:180px">
												<Option v-for="items in couponLists" :value="items" :key="items">{{ items }}券</Option>
										</Select>
										<span slot="prepend" class="widths">券</span>
										<Input type="text" :disabled="auditing" v-model="v.couponNumber" style="width:80px">
											<span slot="append">张</span>
										</Input>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i==0">+</Button>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i!=0">-</Button>
									</div>
								</div>
							</div>
						</FormItem>
					<FormItem :label-width="240" style="margin-top:100px;">
						<Button type="primary" @click="toexamine()">审核</Button>
						<Button @click="returns()" style="margin-left: 8px">返回</Button>
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
    </div>
</template>
<script>
export default {
    data(){
			return{
					auditing:true,
					timeType:1,
					beginTime:'',
					endTime:'',
					marketCode:'',
					modal9:false,
					loading:true,
					timeList:[
						{label:'不限时间范围',value:1},
						{label:'固定时间范围',value:2}
					],
					couponLists:[],
					normalMarketingList:[
						{
							rechargeNumber:'',
							couponList :[
								{
									couponKey :	'' ,
									couponNumber:''
								}
							]
						}
						
					],
				vipMarketingList:[
					{
						rechargeNumber:'',
						couponList :[
							{
								couponKey :	'' ,
								couponNumber:''
							}
						],
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
			whetherpass(activeType){
				this.formCustomexa.activeType = activeType
			},
			toexamine(){
				  this.modal9 = true
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
							this.normalMarketingList = data.data.rechargeGive.normalMarketingList
							this.vipMarketingList = data.data.rechargeGive.vipMarketingList
					}
				})
			}
		},
		created(){
      this.http.post(BASE_URL+"/loan/marketing/saveViewData",{}).then(data=>{
        if(data.code == 'success'){
				 this.couponLists = data.data.couponKeyList
				 this.getDataList()
        } else {
          this.$Message.error(data.message);
        }
        }).catch(err=>{
          console.log(err)
        })
    },
		mounted(){
			
		}
}
</script>
<style lang="less" scoped>
.contentRightmain{
	display: flex;
}
	.flexds{
		display: flex;
		.widths{
			width:50px;display: inline-block;
			text-align: center;
			background:#efefef;
		}
		.flexdclon{
			display: flex;
			margin-bottom:10px;
		}
	}
</style>