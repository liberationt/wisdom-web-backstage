<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动管理>&nbsp;&nbsp;邀请好友注册</span>
          </p>
        </div>
        <div class="contentcss">
          <Form label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate">
              <FormItem label="活动标题：" prop="marketName"  :label-width="120">
                  <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入活动标题" style="width:400px;"></Input>
              </FormItem>
              <FormItem label="时间范围：" :label-width="120">
                <div class="contentRightmain">
                  <div>
                    <Select v-model="timeType" :disabled="auditing" class='mr10' placeholder="请选择状态" style='width:150px;' @on-change="timeordinaryChange">
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
              <FormItem  label="送赞豆：" :label-width="120">
                <div class="flexd flexda">
                  <div v-for="(item,i) in zdList" :key="i" class="flexd" style='margin-bottom:10px;'>
                    <FormItem>
                      <Input type="text" v-model="item.giveCount" :disabled="auditing" style="width:180px">
                        <span slot="prepend" v-if="i===0">普通用户</span>
                        <span slot="prepend" v-else>会员V{{item.vipLevel}}</span>
                        <span slot="append" class="widths">赞豆</span>
                      </Input>
                    </FormItem>
                    <FormItem>
                      <Input type="text" v-model="item.days" class="mr10" :disabled="auditing" style="width:180px">
                        <span slot="append">天有效期</span>
                      </Input>
                    </FormItem>
                  </div>
                </div>
            </FormItem>
            <FormItem  label="送会员：" :label-width="120">
              <div class="flexd flexda">
                <div class="flexd" v-for="(item,i) in giveVipBeanList" :key="i" style="margin-bottom:10px;">
                  <FormItem>
                    <Input type="text" v-model="item.giveVipDays" class="mr10" :disabled="auditing" style="width:200px;margin-bottom:10px;">
                      <span slot="prepend" v-if='i===0'>普通用户</span>
                      <span slot="prepend" v-else>会员V{{item.vipLevel}}</span>
                      <span slot="append" class="widths">天</span>
                    </Input>
                  </FormItem>
                </div>
              </div>
            </FormItem>
            <FormItem  label="送抢单券：" :label-width="120">
              <div v-for="(item,index) in giveMarketingTicketBeanList" :key='index' class="flexds flexda mb15">
                <div>
                  <FormItem>
                    <Select v-model="item.ticketList[index].ticketNo" :disabled="auditing" filterable class="mr10" style="width:200px">
                      <Option v-for="(items,key) in couponList1" :value="items" :key="key">{{ items }}</Option>
                    </Select>
                  </FormItem>
                </div>
                <div class="mr10" v-for="(items,i) in item.ticketList" :key="i">
                  <FormItem>
                    <Input type="text" :disabled="auditing" v-model="items.ticketNumber"  style="width:180px;margin-bottom:10px;">
                      <span slot="prepend" v-if="i===0">普通用户</span>
                      <span slot="prepend" v-else>会员V{{items.vipLevel}}</span>
                      <span slot="append" class="widths">张</span>
                    </Input>
                  </FormItem>
                </div>
                <Button type="primary" class="left ml10" style="height:40px;" :disabled="auditing" v-if="index==0" @click="giveCouponNumber1">+</Button>
                <Button type="primary" class="left ml10" style="height:40px;" :disabled="auditing" v-if="index!=0"  @click="giveCouponNumber2(index)">-</Button>
					  	</div>
            </FormItem>
            <FormItem  label="送充值满减券" :label-width="120">
              <div v-for="(item,index) in giveMarketingCouponBeanList" :key='index' class="flexds flexda mb15">
                <FormItem>
                  <Select v-model="item.couponList[index].couponNo" :disabled="auditing" filterable style="width:200px">
                    <Option v-for="(items,key) in couponList" :value="items" :key="key">{{ items}}</Option>
                  </Select>
                </FormItem>
                <div class="mr10" v-for="(items,i) in item.couponList" :key="i">
                  <FormItem>
                    <Input type="text" :disabled="auditing" v-model="items.couponNumber"  style="width:180px;margin-bottom:10px;">
                      <span slot="prepend" v-if="i===0">普通用户</span>
                      <span slot="prepend" v-else>会员V{{items.vipLevel}}</span>
                      <span slot="append" class="widths">张</span>
                    </Input>
                  </FormItem>
                </div>
                <Button type="primary" class="ml10" style="height:40px;" :disabled="auditing" v-if="index==0" @click="addnormal1">+</Button>
                <Button type="primary" class="ml10" style="height:40px;" :disabled="auditing" v-if="index!=0"  @click="addnormal2(index)">-</Button>
						</div>
            </FormItem>
            <FormItem :label-width="240" style="margin-top:100px;">
              <Button type="primary" :disabled="auditing" @click="handleSubmit('formValidate')">保存提交审核</Button>
              <Button type="primary" v-if="$route.query.marketCode" @click="lookJournal">操作日志</Button>
              <Button @click="handleReset()"  style="margin-left: 8px">取消</Button>
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
            //赞豆
            zdList: [
              {
                days: '',
                giveCount: '',
                vipLevel: -1
              }
            ],
            //会员
            giveVipBeanList: [
              {
                giveVipDays: '',
                vipLevel: -1
              }
            ],
            //抢单券
            giveMarketingTicketBeanList: [
              {
                ticketList: [
                  {
                    ticketNo: '',
                    ticketNumber: '',
                    vipLevel: -1
                  }
                ]
              }
            ],
            //满减券
            giveMarketingCouponBeanList: [
              {
                couponList: [
                  {
                    couponNo: "",
                    couponNumber: '',
                    vipLevel: -1
                  }
                ]
              }
            ],
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
            gradeList:[],
            couponList:[],
            couponList1:[],
            beginTime:'',
            endTime:'',
            loading:true,
            formValidate:{
              marketName:'',
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
      giveCouponNumber1(num){
        let arrList=[
          {
            ticketNo: '',
            ticketNumber: '',
            vipLevel: -1
          }
        ]
        for(var i=0;i<this.gradeList.length;i++){
          arrList.push({
            ticketNo: '',
            ticketNumber: '',
            vipLevel: this.gradeList[i].level
          })
        }
        this.giveMarketingTicketBeanList.push(
          {
              ticketList:arrList
          }
        )
      },
      giveCouponNumber2(index){
        this.giveMarketingTicketBeanList.splice(index, 1)
      },
      addnormal1(){
				let arrList=[
          {
            couponNo: '',
            couponNumber: '',
            vipLevel: -1
          }
        ]
        for(var i=0;i<this.gradeList.length;i++){
          arrList.push({
            couponNo: '',
            couponNumber: '',
            vipLevel: this.gradeList[i].level
          })
        }
        this.giveMarketingCouponBeanList.push(
          {
              couponList:arrList
          }
        )
			},
			addnormal2(index){
        this.giveMarketingCouponBeanList.splice(index, 1)
			},
      timeordinaryChange(timeType){
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
              for(var i=0;i<this.zdList.length;i++){
                if(!refs.test(this.zdList[i].giveCount)||!refs.test(this.zdList[i].days)){
                  this.$Message.error('请输入0-999999之间的整数');
                  return false
                }
              }
              for(var i=0;i<this.giveVipBeanList.length;i++){
                if(!hy.test(this.giveVipBeanList[i].giveVipDays)){
                  this.$Message.error('请输入0-365之间的整数');
                  return false
                }
              }
              for(var i=0;i<this.giveMarketingTicketBeanList.length;i++){
                for(var j=0;j<this.giveMarketingTicketBeanList[i].ticketList.length;j++){
                  if((this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo==''||this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo=='请选择')&&this.giveMarketingTicketBeanList[i].ticketList[j].ticketNumber!=''){
                    this.$Message.error('所填内容不能为空');
                    return false
                  }
                  if((this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo!=''&&this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo!='请选择')&&this.giveMarketingTicketBeanList[i].ticketList[j].ticketNumber==''){
                    this.$Message.error('所填内容不能为空');
                    return false
                  }
                  if((this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo!=''&&this.giveMarketingTicketBeanList[i].ticketList[j].ticketNo!='请选择')&&(!refs.test(this.giveMarketingTicketBeanList[i].ticketList[j].ticketNumber)&&this.giveMarketingTicketBeanList[i].ticketList[j].ticketNumber!='')){
                    this.$Message.error('请输入0-999999之间的整数');
                    return false
                  }
                }
              }
              for(var i=0;i<this.giveMarketingCouponBeanList.length;i++){
                for(var j=0;j<this.giveMarketingCouponBeanList[i].couponList.length;j++){
                  if((this.giveMarketingCouponBeanList[i].couponList[j].couponNo==''||this.giveMarketingCouponBeanList[i].couponList[j].couponNo=='请选择')&&this.giveMarketingCouponBeanList[i].couponList[j].couponNumber!=''){
                    this.$Message.error('所填内容不能为空');
                    return false
                  }
                  if((this.giveMarketingCouponBeanList[i].couponList[j].couponNo!=''&&this.giveMarketingCouponBeanList[i].couponList[j].couponNo!='请选择')&&this.giveMarketingCouponBeanList[i].couponList[j].couponNumber==''){
                    this.$Message.error('所填内容不能为空');
                    return false
                  }
                  if((this.giveMarketingCouponBeanList[i].couponList[j].couponNo!=''&&this.giveMarketingCouponBeanList[i].couponList[j].couponNo!='请选择')&&(!refs.test(this.giveMarketingCouponBeanList[i].couponList[j].couponNumber)&&this.giveMarketingCouponBeanList[i].couponList[j].couponNumber!='')){
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
      // 保存提交审核
      preserve(){
        this.$Modal.confirm({
            title: '温馨提示',
            content: '<p>确认保存提交审核？</p>',
            onOk: () => {
                let data = {
                  marketName :this.formValidate.marketName,
                  timeType:this.timeType,
                  inviteFriend:{
                    giveMarketingCouponBeanList:this.giveMarketingCouponBeanList,
                    giveMarketingTicketBeanList:this.giveMarketingTicketBeanList,
                    zdList:this.zdList,
                    giveVipBeanList:this.giveVipBeanList
                  },
                  marketType:2
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
              this.giveMarketingCouponBeanList = data.data.inviteFriend.giveMarketingCouponBeanList
              this.giveMarketingTicketBeanList=data.data.inviteFriend.giveMarketingTicketBeanList
              this.zdList = data.data.inviteFriend.zdList
              this.giveVipBeanList = data.data.inviteFriend.giveVipBeanList
            }
          })
        }
      }
    },
    created(){
      this.http.post(BASE_URL+"/loan/ticketManage/queryTicketNoList",{}).then(data=>{
        if(data.code == 'success'){
         this.couponList1 = data.data
         this.couponList1.unshift('请选择')
        } else {
          this.$Message.error(data.message);
        }
        }).catch(err=>{
          console.log(err)
      })
      this.http.post(BASE_URL+"/loan/marketing/saveViewData",{}).then(data=>{
        if(data.code == 'success'){
         this.couponList = data.data.couponKeyList
         this.couponList.unshift('请选择')
        } else {
          this.$Message.error(data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
      this.http.post(BASE_URL+'/loan/vipLevel/query',{}).then(data=>{
        if(data.code=='success'){
          if(!this.$route.query.marketCode){
            this.gradeList = data.data
            for(var i = 0;i<data.data.length;i++){
              //赞豆
              let zdList=
                {
                  days: '',
                  giveCount:'',
                  vipLevel: ''
                }
              //会员
              let giveVipBeanList =
                {
                  giveVipDays:'',
                  vipLevel: ''
                }
              // 抢单券
              let ticketList=
                {
                  ticketNo: '',
                  ticketNumber: '',
                  vipLevel: ''
                }
              //满减券
              let giveMarketingCouponBeanList ={
                couponNo: "",
                couponNumber: '',
                vipLevel:''
              }
              zdList.vipLevel=data.data[i].level
              giveVipBeanList.vipLevel = data.data[i].level
              ticketList.vipLevel = data.data[i].level
              giveMarketingCouponBeanList.vipLevel = data.data[i].level
              this.zdList.push(zdList)
              this.giveVipBeanList.push(giveVipBeanList)
              this.giveMarketingTicketBeanList[0].ticketList.push(ticketList)
              this.giveMarketingCouponBeanList[0].couponList.push(giveMarketingCouponBeanList)
            }
          }
        }
      })
    },
    mounted(){
      this.getDataList()
    }
}
</script>
<style lang="less" scoped>
  .contentRightmain,.flexd,.flexds{
    display: flex;
  }
  .flexda{
    flex-wrap: wrap;
  }
  .secenter{
    border-right: 1px solid #ccc;height:24px;line-height: 24px;
  }
  .widths{
  width:30px;display: inline-block
}
</style>
