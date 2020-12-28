<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;&nbsp;营销活动审核>&nbsp;&nbsp;注册入驻</span>
          </p>
        </div>
        <div class="contentcss">
            <Form label-position="left" ref="formValidate" :model="formValidate">
            <FormItem label="活动标题：" prop="marketName"  :label-width="160">
                <Input v-model="formValidate.marketName" :disabled="auditing" placeholder="请输入活动标题" style="width:400px;"></Input>
            </FormItem>
            <FormItem  label="活动时间范围：" :label-width="160">
                <div class="contentRightmain">
                  <div>
                    <Select v-model="timeType" :disabled="auditing" class='mr10' placeholder="请选择状态" style='width:150px;'>
                      <Option v-for="item in timeList" :value="item.value" :key="item.typeCode">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div v-if="timeType==2" class="datatime">
                    <Row>
                      <Col span="11">
                        <FormItem>
                            <DatePicker type="datetime" :disabled="auditing" placeholder="开始时间" :value="beginTime"></DatePicker>
                        </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                        <FormItem>
                            <DatePicker type="datetime" :disabled="auditing" placeholder="结束时间" :value="endTime"></DatePicker>
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
                  <!-- <Input type="text" v-model="formValidate.giveCouponNumber" :disabled="auditing" style="width:120px">
                        <span slot="append" class="widths">张</span>
                  </Input> -->
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
					  	</div>
            </FormItem>
            <FormItem  label="送充值满减券" :label-width="160">
              <div v-for="(item,index) in formValidate.reducedList" :key='index' class="flexds mb15">
                <FormItem>
                  <Select v-model="formValidate.reducedList[index].couponNo" :disabled="auditing" filterable style="width:200px">
                    <Option v-for="items in couponList" :value="items" :key="items">{{ items }}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input type="text" :disabled="auditing" v-model="formValidate.reducedList[index].couponNumber "  style="width:160px">
                    <span slot="prepend" class="widths">券</span>
                    <span slot="append" class="widths">张</span>
                  </Input>
                </FormItem>
					  	</div>
            </FormItem>
            <FormItem :label-width="240" style="margin-top:100px;">
              <Button type="primary"  @click="toexamine()">审核</Button>
              <Button type="primary"  @click="lookJournal" style="margin-left: 8px">操作日志</Button>
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
                <Select v-model="formCustomexa.activeType" placeholder="请选择状态" style='width:150px;' @on-change="whetherpass">
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
            timeList:[
                {label:'不限时间范围',value:1},
                {label:'固定时间范围',value:2},
            ],
            beginTime:'',
            endTime:'',
            loading:true,
            memos:false,
            modal9:false,
            giveVipDays:'',
            giveCouponNumber:'',
            giveNumber:'',
            marketCode:'',
            formValidate:{
              marketName:'',
              giveVipDays:'',
              giveCouponNumber:'',
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
            couponList:[],
            formCustomexa: {
              activeType:'',
              remarks:''
            },
            reducedList:[],
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
        this.http.post(BASE_URL+'/loan/marketing/getByCode?marketCode='+this.$route.query.marketCode)
        .then(data=>{
          if(data.code =='success'){
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
    },
    created(){
      this.http.post(BASE_URL+"/loan/ticketManage/queryTicketNoList",{}).then(data=>{
        if(data.code == 'success'){
         this.couponList = data.data
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
.widths{
  width:30px;display: inline-block
}
.flexds{
  display: flex
}
</style>