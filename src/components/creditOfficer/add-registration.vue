<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动管理>&nbsp;&nbsp;注册入驻</span>
          </p>
        </div>
        <div class="contentcss">
            <Form label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem label="活动标题：" prop="marketName"  :label-width="160">
                <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入活动标题" style="width:400px;"></Input>
            </FormItem>
            <FormItem  label="活动时间范围：" :label-width="160">
                <div class="contentRightmain">
                  <div>
                    <Select v-model="timeType" :disabled="auditing" class='mr10' placeholder="请选择状态" style='width:150px;' @on-change="timeChange">
                      <Option v-for="item in timeList" :value="item.value" :key="item.typeCode">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div v-if="timeType==2" class="datatime">
                    <Row>
                      <Col span="11">
                        <FormItem>
                            <DatePicker type="datetime" :disabled="auditing" placeholder="开始时间" @on-change='begintimeChange' :options="options3" :value="beginTime"></DatePicker>
                        </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                        <FormItem>
                            <DatePicker type="datetime" :disabled="auditing" placeholder="结束时间" @on-change='endtimeChange' :options="options3" :value="endTime"></DatePicker>
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                </div>
            </FormItem>
             <FormItem  label="送赞豆：" :label-width="160">
               <div style="display:flex">
                <FormItem prop='giveNumber'>
                  <Input type="text" v-model="formValidate.giveNumber" :disabled="auditing" style="width:120px">
                    <span slot="append" class="widths">赞豆</span>
                  </Input>
                </FormItem>
                <FormItem prop='validity'>
                  <Input type="text" v-model="formValidate.validity" :disabled="auditing" style="width:160px">
                    <span slot="append">天有效期</span>
                  </Input>
                </FormItem>
               </div>
            </FormItem>
            <FormItem  label="送会员：" :label-width="160" prop='giveVipDays'>
                <Input type="text" v-model="formValidate.giveVipDays" :disabled="auditing" style="width:120px">
                    <span slot="append" class="widths">天</span>
                </Input>
            </FormItem>
            <FormItem  label="送抢单券：" :label-width="160">
              <div v-for="(item,index) in formValidate.snatchList" :key='index' class="flexds mb15">
                <FormItem>
                  <Select v-model="formValidate.snatchList[index].ticketNo" :disabled="auditing" filterable style="width:200px">
                    <Option v-for="items in couponList" :value="items" :key="items">{{ items }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input type="text" :disabled="auditing" v-model="formValidate.snatchList[index].ticketNumber" style="width:160px">
                    <span slot="prepend" class="widths">券</span>
                    <span slot="append" class="widths">张</span>
                  </Input>
                </FormItem>
                <Button type="primary" class="left ml10" :disabled="auditing" v-if="index==0" @click="giveCoupon1">+</Button>
                <Button type="primary" class="left ml10" :disabled="auditing" v-if="index!=0"  @click="giveCoupon2(index)">-</Button>
					  	</div>
            </FormItem>
            <FormItem  label="送充值满减券" :label-width="160">
              <div v-for="(item,index) in formValidate.reducedList" :key='index' class="flexds mb15">
                <FormItem>
                  <Select v-model="formValidate.reducedList[index].couponNo" :disabled="auditing" filterable style="width:200px">
                    <Option v-for="items in couponList1" :value="items" :key="items">{{ items }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input type="text" :disabled="auditing" v-model="formValidate.reducedList[index].couponNumber "  style="width:160px">
                    <span slot="prepend" class="widths">券</span>
                    <span slot="append" class="widths">张</span>
                  </Input>
                </FormItem>
                <Button type="primary" class="left ml10" :disabled="auditing" v-if="index==0" @click="addnormal1">+</Button>
                <Button type="primary" class="left ml10" :disabled="auditing" v-if="index!=0"  @click="addnormal2(index)">-</Button>
					  	</div>
            </FormItem>
            <FormItem :label-width="240" style="margin-top:100px;">
              <Button type="primary" :disabled="auditing" @click="handleSubmit('formValidate')">保存提交审核</Button>
              <Button type="primary" v-if="$route.query.marketCode" @click="lookJournal" style="margin-left: 8px">操作日志</Button>
              <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
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
            //操作日志
            JournalList:false,
            couponList1:[],
            columns: [
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
            timeList:[
                {label:'不限时间范围',value:1},
                {label:'固定时间范围',value:2},
            ],
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            loading3:false,
            loading:true,
            memos:false,
            modal9:false,
            beginTime:'',
            endTime:'',
            formValidate:{
              marketName:'',
              giveVipDays:'',
              giveNumber:'',
              validity:'',
              reducedList:[
                {
                  couponNo :'',
                  couponNumber :''
                }
              ],
              snatchList:[
                {
                  ticketNo:'',
                  ticketNumber:''
                }
              ] 
            },
            ruleValidate:{
              beginTime:[
                  { required: true, message: '请选择开始时间', trigger: 'blur' },
              ],
              endTime:[
                  { required: true, message: '请选择结束时间', trigger: 'blur' },
              ],
              marketName: [
                  { required: true, message: '请输入活动标题', trigger: 'blur' },
                  { type: 'string', max: 50, message: '活动标题不能超过50个字', trigger: 'blur' }
              ]
            },
            formCustomexa: {
              activeType: '',
              remarks:''
            },
            couponList:[],
            ruleCustomexa: {
              activeType: [
                  {required: true,message: '请选择审核状态',trigger: 'blur'},    
              ],
              remarks: [
                  {required: true,message: '请输入备注',trigger: 'blur'},
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
                let hy =  /^([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/
                if(this.timeType=='2'){
                  if(this.beginTime==''){
                    this.$Modal.warning({
                      title: '温馨提示',
                      content: '<p>请选择开始时间</p>'
                    })
                    return false
                  }
                  if(this.endTime == ''){
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
                if(this.formValidate.giveNumber!=''&&this.formValidate.validity==''){
                  this.$Message.error('所填内容不能位空')
                  return false
                }
                if(this.formValidate.giveNumber==''&&this.formValidate.validity!=''){
                  this.$Message.error('所填内容不能位空')
                  return false
                }
                if((!refs.test(this.formValidate.giveNumber)&&this.formValidate.giveNumber!='')||(!refs.test(this.formValidate.validity)&&this.formValidate.validity!='')){
                  this.$Message.error('请输入0-999999之间的整数')
                  return false
                }
                if(!hy.test(this.formValidate.giveVipDays)&&this.formValidate.giveVipDays!=''){
                  this.$Message.error('请输入0-365之间的整数')
                  return false
                }
                for(var i =0;i<this.formValidate.snatchList.length;i++){
                  if((this.formValidate.snatchList[i].ticketNo =='请选择'||this.formValidate.snatchList[i].ticketNo =='')&&this.formValidate.snatchList[i].ticketNumber!=''){
                    this.$Message.error('请选择券类型');
                    return false
                  }
                  if(this.formValidate.snatchList[i].ticketNo !='请选择'&&this.formValidate.snatchList[i].ticketNumber==''&&this.formValidate.snatchList[i].ticketNo !=''){
                    this.$Message.error('请输入券数量');
                    return false
                  }
                  if((!refs.test(this.formValidate.snatchList[i].ticketNumber))&&this.formValidate.snatchList[i].ticketNo !='请选择'&&this.formValidate.snatchList[i].ticketNo!=''){
                    this.$Message.error('券数量只可输入0-999999间整数');
                    return false
                  }
                }
                for(var i =0;i<this.formValidate.reducedList.length;i++){
                  if((this.formValidate.reducedList[i].couponNo =='请选择'||this.formValidate.reducedList[i].couponNo =='')&&this.formValidate.reducedList[i].couponNumber!=''){
                    this.$Message.error('请选择券类型');
                    return false
                  }
                  if(this.formValidate.reducedList[i].couponNo !='请选择'&&this.formValidate.reducedList[i].couponNumber==''&&this.formValidate.reducedList[i].couponNo !=''){
                    this.$Message.error('请输入券数量');
                    return false
                  }
                  if((!refs.test(this.formValidate.reducedList[i].couponNumber))&&this.formValidate.reducedList[i].couponNo !='请选择'&&this.formValidate.reducedList[i].couponNo!=''){
                    this.$Message.error('券数量只可输入0-999999间整数');
                    return false
                  }
                }
                this.preserve()
              }
          })
        },
        handleReset () {
          window.history.go(-1);
        },
        giveCoupon1(){
          this.formValidate.snatchList.push( 
            {
              ticketNo :'',
              ticketNumber :''
            }
          )
        },
        giveCoupon2(index){
          this.formValidate.snatchList.splice(index, 1)
        },
        addnormal1(){
				this.formValidate.reducedList.push( 
					{
						couponNo :'',
            couponNumber :''
					}
				)
			},
			addnormal2(index){
        this.formValidate.reducedList.splice(index, 1)
			},
        // 保存提交审核
      preserve(){
        this.$Modal.confirm({
            title: '温馨提示',
            content: '<p>确认保存提交审核？</p>',
            onOk: () => {
                let couponList = []
                for(var i = 0; i<this.formValidate.reducedList.length; i ++){
                  if(this.formValidate.reducedList[i].couponNo=='请选择'){
                     this.formValidate.reducedList[i].couponNo=""
                  }
                }
                let data = {
                  marketName :this.formValidate.marketName,
                  timeType:this.timeType,
                  registerWithIn:{
                    giveVipDays:this.formValidate.giveVipDays,
                    zd:{
                      giveCount:this.formValidate.giveNumber,
                      days:this.formValidate.validity
                    },
                    couponList:this.formValidate.reducedList,
                    ticketList:this.formValidate.snatchList
                  },
                  marketType:1
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
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
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
              this.formValidate.giveNumber = data.data.registerWithIn.zd.giveCount
              this.formValidate.validity= data.data.registerWithIn.zd.days
              this.formValidate.giveVipDays=data.data.registerWithIn.giveVipDays
              this.formValidate.reducedList = data.data.registerWithIn.couponList
              this.formValidate.snatchList = data.data.registerWithIn.ticketList
            }
          })
        }
      }
    },
    created(){
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
      this.http.post(BASE_URL+"/loan/marketing/saveViewData",{}).then(data=>{
        if(data.code == 'success'){
         this.couponList1 = data.data.couponKeyList
         this.couponList1.unshift('请选择')
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
.widths{
  width:30px;display: inline-block
}
.flexds{
  display: flex
}
.button{
  margin:50px 0 0 200px;
}
</style>