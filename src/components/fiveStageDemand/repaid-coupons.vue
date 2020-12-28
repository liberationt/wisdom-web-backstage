<template>
    <div>
			<div class="navigation">
				<p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动管理>&nbsp;&nbsp;赠送满减券</span>
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
						<FormItem :label-width="120" label="普通用户返利:">
							<div v-for="(item,index) in normalMarketingList" :key='index' class="flexds mb15">
								<div class="flexds mr20">
									<Input type="text" :disabled="auditing" v-model="item.rechargeNumber" class="mr20" style="width:180px">
										<span slot="prepend">单笔充值</span>
										<span slot="append" class="left">赞豆</span>
									</Input>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index==0" @click="addnormal1">+</Button>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index!=0" @click="addnormal2(index)">-</Button>
								</div>
								<div>
									<div v-for="(v,i) in item.couponList" :key='i' class="flexdclon">
										<span slot="prepend" class="widths">送</span>
										<Select v-model="v.couponKey" :disabled="auditing" filterable style="width:180px">
												<Option v-for="items in couponLists" :value="items" :key="items">{{ items }}</Option>
										</Select>
										<span slot="prepend" class="widths">券</span>
										<Input type="text" :disabled="auditing" v-model="v.couponNumber" style="width:80px">
											<span slot="append">张</span>
										</Input>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i==0" @click="addnormal3(index)">+</Button>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i!=0" @click="addnormal4(index,i)">-</Button>
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
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index==0" @click="addmerber1">+</Button>
									<Button type="primary" style="height:32px" :disabled="auditing" v-if="index!=0" @click="addmerber2(index)">-</Button>
								</div>
								<div>
									<div v-for="(v,i) in item.couponList" :key='i' class="flexdclon">
										<span slot="prepend" class="widths">送</span>
										<Select v-model="v.couponKey" :disabled="auditing" filterable style="width:180px">
												<Option v-for="items in couponLists" :value="items" :key="items">{{ items }}</Option>
										</Select>
										<span slot="prepend" class="widths">券</span>
										<Input type="text" :disabled="auditing" v-model="v.couponNumber" style="width:80px">
											<span slot="append">张</span>
										</Input>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i==0" @click="addmerber3(index)">+</Button>
										<Button type="primary" class="ml10" :disabled="auditing" v-if="i!=0" @click="addmerber4(index,i)">-</Button>
									</div>
								</div>
							</div>
						</FormItem>
						<FormItem :label-width="240" style="margin-top:100px;">
							<Button type="primary" :disabled="auditing" @click="handleSubmit('formValidate')">保存提交审核</Button>
							<Button @click="handleReset()" style="margin-left: 8px">取消</Button>
						</FormItem>
					</Form>
    </div>    
  </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
    data(){
			return{
				auditing:false,
				timeType:1,
				beginTime:'',
				endTime:'',
				timeList:[
					{label:'不限时间范围',value:1},
					{label:'固定时间范围',value:2}
				],
				options3: {
					disabledDate (date) {
							return date && date.valueOf() < Date.now() - 86400000;
					}
				},
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
			}
		},
		methods:{
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
							let res =/^([1-9][0-9]{0,4})$/
							let resc = /^(0|\+?[1-9][0-9]{0,3})$/
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
							for(var i=0;i<this.normalMarketingList.length;i++){
								if(this.normalMarketingList[i].rechargeNumber==''){
									this.$Message.error("请输入赞豆")
                	  return false
								}
								if(!res.test(this.normalMarketingList[i].rechargeNumber)){
									  this.$Message.error("赞豆只能输入1-99999之间的整数")
                	  return false
								}
								for(var j=0;j<this.normalMarketingList[i].couponList.length;j++){
									if((this.normalMarketingList[i].couponList[j].couponKey==''||this.normalMarketingList[i].couponList[j].couponKey=='请选择')&&this.normalMarketingList[i].couponList[j].couponNumber!=''){
										this.$Message.error("请选择券类型")
										return false
									}
									if((this.normalMarketingList[i].couponList[j].couponNumber=='')&&this.normalMarketingList[i].couponList[j].couponKey!=''&&this.normalMarketingList[i].couponList[j].couponKey!='请选择'){
										this.$Message.error("请输入券数量")
										return false
									}
									if((!resc.test(this.normalMarketingList[i].couponList[j].couponNumber))&&this.normalMarketingList[i].couponList[j].couponKey!=''&&this.normalMarketingList[i].couponList[j].couponKey!='请选择'){
										this.$Message.error("请输入0-9999的整数")
										return false
									}
								}
							}
							for(var i=0;i<this.vipMarketingList.length;i++){
								if(this.vipMarketingList[i].rechargeNumber==''){
									this.$Message.error("请输入赞豆")
                	  return false
								}
								if(!res.test(this.vipMarketingList[i].rechargeNumber)){
									  this.$Message.error("赞豆只能输入1-99999之间的整数")
                	  return false
								}
								for(var j=0;j<this.vipMarketingList[i].couponList.length;j++){
									if((this.vipMarketingList[i].couponList[j].couponKey==''||this.vipMarketingList[i].couponList[j].couponKey=='请选择')&&this.vipMarketingList[i].couponList[j].couponNumber!=''){
										this.$Message.error("请选择券类型")
										return false
									}
									if((this.vipMarketingList[i].couponList[j].couponNumber=='')&&this.vipMarketingList[i].couponList[j].couponKey!=''&&this.vipMarketingList[i].couponList[j].couponKey!='请选择'){
										this.$Message.error("请输入券数量")
										return false
									}
									if((!resc.test(this.vipMarketingList[i].couponList[j].couponNumber))&&this.vipMarketingList[i].couponList[j].couponKey!=''&&this.vipMarketingList[i].couponList[j].couponKey!='请选择'){
										this.$Message.error("请输入0-9999的整数")
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
			addnormal1(){
				this.normalMarketingList.push( 
					{
						rechargeNumber:'',
						couponList :[
							{
								couponKey :	'' ,
								couponNumber:''
							}
						]
					}
				)
			},
			addnormal2(index){
        this.normalMarketingList.splice(index, 1)
			},
			addnormal3(index){
				this.normalMarketingList[index].couponList.push(
						{
							couponKey:'',
							couponNumber:''
						},
					)
			},
			addnormal4(index,i){
				this.normalMarketingList[index].couponList.splice(i,1)
			},
			addmerber1(){
				this.vipMarketingList.push( 
					{
						rechargeNumber:'',
						couponList :[
							{
								couponKey :	'' ,
								couponNumber:''
							}
						],
					}
				)
			},
			addmerber2(index){
        this.vipMarketingList.splice(index, 1)
			},
			addmerber3(index){
				this.vipMarketingList[index].couponList.push(
						{
							couponKey:'',
							couponNumber:''
						},
					)
			},
			addmerber4(index,i){
				this.vipMarketingList[index].couponList.splice(i,1)
			},
			// 保存提交审核
      preserve(){
        this.$Modal.confirm({
            title: '温馨提示',
            content: '<p>确认保存提交审核？</p>',
            onOk: () => {
								for(var i = 0;i<this.normalMarketingList.length;i++){
									for(var j=0;j<this.normalMarketingList[i].couponList.length;j++){
										console.log(this.normalMarketingList[i].couponList[j].couponKey,1)
										if(this.normalMarketingList[i].couponList[j].couponKey=='请选择'){
											this.normalMarketingList[i].couponList[j].couponKey=""
										}
									}
								}
								for(var i = 0;i<this.vipMarketingList.length;i++){
									for(var j=0;j<this.vipMarketingList[i].couponList.length;j++){
										if(this.vipMarketingList[i].couponList[j].couponKey=='请选择'){
											this.vipMarketingList[i].couponList[j].couponKey=""
										}
									}
								}
                let data = {
                  marketName :this.formValidate.marketName,
                  timeType:this.timeType,
                  rechargeGive:{
										normalMarketingList : this.normalMarketingList,
										vipMarketingList : this.vipMarketingList
                	},
                  marketType:4
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
			},
			getDataList(){
				if(this.$route.query.marketCode){
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
			}
		},
		created(){
      this.http.post(BASE_URL+"/loan/marketing/saveViewData",{}).then(data=>{
        if(data.code == 'success'){
				 this.couponLists = data.data.couponKeyList
				 this.couponLists.unshift('请选择')
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