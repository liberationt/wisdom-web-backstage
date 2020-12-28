<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动审核>&nbsp;&nbsp;邀请注册</span>
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
						</div>
            </FormItem>
            <FormItem :label-width="240" style="margin-top:100px;">
              <Button type="primary" @click="toexamine()">审核</Button>
              <Button type="primary" style="margin-left: 8px" @click="lookJournal">操作日志</Button>
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
          auditing:true,
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
            couponList1:[],
            beginTime:'',
            endTime:'',
            marketCode:'',
            loading:true,
            memos:false,
            modal9:false,
            formValidate:{
              marketName:'',
            },
            couponList:[],
            ruleValidate:{
              marketName: [
                  { required: true, message: '请输入活动标题', trigger: 'blur' },
                  { type: 'string', max: 50, message: '活动标题不能超过50个字', trigger: 'blur' }
              ],
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
       // 是否通过
        whetherpass(activeType){
          this.formCustomexa.activeType = activeType
        },
        lookJournal(){
          this.JournalList=true
          this.http.post(BASE_URL+'',{})
          .then(data=>{
            if(data.code==success){
              this.data1= data.data
            }
          })
        },
        //审核
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
  .widths{
  width:30px;display: inline-block
}
</style>
