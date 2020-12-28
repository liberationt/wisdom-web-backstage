<template>
<div>
  <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理&nbsp;>&nbsp;分配待处理</span>
      </p>
    </div>
    <div class="conditioncss">
      <div class="clearfix">
        <ul class="querysty clearfix">
          <li class="mr20">
            <span>姓名:</span>
            <Input v-model="creditname" placeholder="请输入姓名" style="width: 150px"></Input>                 
          </li>
          <li class="mr20">
            <span>手机号:</span>
            <Input v-model="phone" placeholder="请输入手机号" style="width: 150px"></Input>                 
          </li>
          <li class="mr20">
            <Select v-model="memberstatus" @on-change="member" placeholder="会员状态" style="width:150px;">
              <Option v-for="item in memberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="mr20 timelinheight">
              <span class="lh32 ">名单下放时间:</span>
              <DatePicker type="date" :value="beginTime" @on-change="time1" placeholder="开始时间" style="width: 150px" :options="options3" confirm></DatePicker>
                  <span>  -  </span>
              <DatePicker type="date" :value="endTime" @on-change="time2" placeholder="结束时间" style="width: 150px" :options="options3" confirm></DatePicker>
          </li>
          <li class="mr20">
            <Select v-model="examinestatus" @on-change="examine" placeholder="审核状态" style="width:150px;">
              <Option v-for="item in examineList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <Select v-model="distributionstatus" @on-change="distribution" placeholder="分配类型" style="width:150px;">
              <Option v-for="item in distributionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <Select v-model="recharge" placeholder="是否充值过" @on-change="rechargestatus" style="width:150px;">
              <Option v-for="item in rechargeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <Select v-model="consumption" placeholder="是否消费过" @on-change="consumptionstatus" style="width:150px;">
                <Option v-for="item in consumptionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <Select v-model="registersheng" @on-change="registers" placeholder="请选择省" style="width:150px;">
              <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="registershi" @on-change="registerh" placeholder="请选择市" style="width:150px;">
              <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
          </li>
          <li class="right">
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="inquire(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt15 contentcss">
        <Table border highlight-row @on-row-dblclick="Single" :columns="columns1" :data="data9"></Table>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
    </div>
    <Modal
      title="拨打电话"
      v-model="modal10"
      ok-text="确认"
      cancel-text="取消"
      @on-ok="dialing"
      width='300'
      :mask-closable="false"
      class-name="vertical-center-modal">
      <p>确认拨打信贷员 {{nametitle}} 的电话吗?</p>
    </Modal>
    <Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
          <p slot="header" style="text-align:left">
            <span>拨打标记</span>
          </p>
          <div style="text-align:left">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">        
              <FormItem label="拨打备注" prop="memo">
                <!-- <span>拨打备注:</span> -->
                <Select v-model="formValidate.memo" @on-change="selremarks" placeholder="请选择" style="width:200px;">
                  <Option v-for="item in remarkslist" :value="item.remarkCode" :key="item.remarkCode">{{ item.remarkDesc }}</Option>
                </Select>
              </FormItem>
              <FormItem label="待办时间" prop="appointment" v-if="this.formValidate.memo == '1005'">
                    <DatePicker type="datetime" placeholder="请选择待办时间" :options="options4" v-model="formValidate.appointment"></DatePicker>
              </FormItem>
              <FormItem label="待办备注：" prop="standbyDesc" v-if="this.formValidate.memo == '1005' || this.formValidate.memo == '1006'">
                <Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
              </FormItem>
            </Form>           
          </div>
          <div slot="footer" >
            <Button type="default"  @click="modalclose('formValidate')">关闭</Button>
            <Button type="primary" @click="dialsub('formValidate')">提交</Button>
          </div>
      </Modal>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
    data () {
        return {
          modal10:false,
          loading3:false,
          modal2:false,
          options4:{
            disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          },
          formValidate:{
            memo:'1001',
            appointment:'',
            standbyDesc:''
          },
          ruleValidate:{
            memo: [{ required: true, message: '请选择拨打备注', trigger: 'change' }],
            appointment:[{ required: true,type: "date",message: "请选择待办时间",trigger: "change"}],
            standbyDesc:[{required: true,message: "请填写待办备注",trigger: "blur"}]
          },
          dialRecordCode:'',
          loanOfficerCode:'',
          nametitle:'',
          creditname:'',
          phone:'',
          remarkslist:[],
          memberstatus:"''", //会员状态
          memberList:[],
          recharge:"''", //充值
          rechargeList:[],
          consumption:"''",//消费
          consumptionList:[],
          beginTime:'',
          endTime:'',
          examinestatus:"''", //审核
          examineList:[],
          distributionstatus:"''",//分配
          distributionList:[],
          registersheng:'', //省
          registercitys:[],
          registershi:'', //市
          registercityh:[],
          lastarticle:{},
          options3: {
            disabledDate (date) {
                return date && date.valueOf() > Date.now();
            }
          },
          columns1: [
            {
              title: "手机号",
              key: "phoneNumber",
              minWidth: 150,
              align: "center"
            },
            {
              title: "姓名",
              key: "realName",
              minWidth: 100,
              align: "center",
              render: (h, params) => {
                let realName
                if (params.row.realName==""||params.row.realName==null) {
                  realName = '--'
                } else {
                  realName= params.row.realName
                }        
                return h("div", [
                  h("span", {}, realName)
                ]);
              }
            },
            {
              title: "区域",
              // key: "gender",
              minWidth: 200,
              align: "center",
              render:(h,params)=>{
                let loanCityNameFirst = params.row.loanCityNameFirst==""?"-":params.row.loanCityNameFirst
                let loanCityNameSecond= params.row.loanCityNameSecond==""?"-":params.row.loanCityNameSecond
                return h('span', loanCityNameFirst +' ' + loanCityNameSecond)
              }
            },
            {
              title: "赞豆余额",
              key: "beanMoney",
              minWidth: 200,
              align: "center"
            },
            {
              title: "名单下放时间",
              key: "listDownTime",
              minWidth: 180,
              align: "center"
            },
            {
              title: "审核状态",
              key: "loanBaseStatus",
              minWidth: 150,
              align: "center",
              render: (h, params) => {
                let loanStatus  
                if (params.row.loanStatus   == 0) {
                  loanStatus   = '仅注册'
                } else if (params.row.loanStatus   == 1) {
                  loanStatus   = '待审核'
                } else if (params.row.loanStatus   == 2) {
                  loanStatus   = '已入驻'
                } else if (params.row.loanStatus   == 3) {
                  loanStatus   = '审核失败'
                }
                return h('div', [
                  h('span', {
                  }, loanStatus )
                ])
              }
            },
            {
              title: "会员状态",
              key: "memberStatusName",
              minWidth: 100,
              align: "center"
            },
            {
              title: "是否充值过",
              minWidth:100,
              align: "center",
              render:(h,params)=>{
                return h('span',params.row.loanRechargeStatus == '0'? '否':'是')
              }
            },
            {
              title: "是否消费过",
              minWidth: 100,
              align: "center",
              render:(h,params)=>{
                return h('span',params.row.consumptionStatus == '0'? '否':'是')
              }
            },
            {
              title: "分配类型",
              key: "dataId",
              minWidth: 100,
              align: "center",
              render:(h,params)=>{
                return h('span', params.row.allotType=='0'?'指定分配':'自己邀请')
              }
            },
            
            {
              title: "操作",
              key: "action",
              width: 150,
              align: "center",
              fixed: 'right',
              render: (h, params) => {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.modal10 = true
                          this.nametitle = params.row.realName
                          this.loanOfficerCode = params.row.loanOfficerCode
                        }
                      }
                    },
                    "拨打"
                  ),
                ]);
              }
            }
          ],
          data9: [],
          total: 0,
          startRow: 1,
          endRow: 20,
        }
    },
    methods: {
        pageChange (page) {
            this.startRow = page
            this.inquire(page)
        },
        pagesizechange (page) {
            this.startRow = 1
            this.endRow = page
            this.inquire(1)
        },
        inquire(startRow){
          let date1 = Date.parse(new Date(this.beginTime))/1000
          let date2 = Date.parse(new Date(this.endTime))/1000
          if (date1 > date2) {
            this.$Modal.warning({
              title: '名单下放时间',
              content: '<p>名单下放开始时间不得大于结束时间</p>'
            })
            return false
          }
          this.loading3 = true
          let data = Object.assign({
            realName : this.creditname,//姓名
            phoneNumber : this.phone,//手机号
            listDownStartTime :this.beginTime,//名单下放开始时间
            listDownEndTime :this.endTime,//名单下放开始时间
            loanStatus :this.examinestatus =="''" ? "" : this.examinestatus,//审核状态
            loanRechargeStatus : this.recharge =="''" ? "" : this.recharge,//是否充值过
            consumptionStatus : this.consumption =="''" ? "" : this.consumption,//是否消费过
            memberStatus : this.memberstatus =="''" ? "" : this.memberstatus,//会员状态
            allotType : this.distributionstatus =="''" ? "" : this.distributionstatus,//分配类型
            loanAdCodeFirst :this.registersheng,//省
            loanAdCodeSecond :this.registershi,//市
            disposeStatus:0,
            allotStatus:1,
            pageSize: this.endRow,
            pageNum: startRow
          })
          this.lastarticle = data
          this.http.post(BASE_URL +'/sale/saleLoanOfficerInfo/querySaleList',data)
          .then(data=>{
            if(data.code=='success'){
              this.loading3 = false
              this.data9 = data.data.dataList
              this.total = data.data.total
            }else{
               this.loading3 = false
            }
          }).catch(err=>{
            console.log(err)
            this.loading3 = false
          });
            
          
        },
        // 拨打电话
        dialing () {
          this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", {loanOfficerCode:this.loanOfficerCode})
          .then(data => {
            if (data.code == 'success') {
                this.modal2 = true
                this.$Message.success(data.message)
                this.dialRecordCode = data.data.dialRecordCode
            }else{
                this.modal2 = false
                this.$Message.error(data.message)
            }
          })
          .catch(err => {
            console.log(err);
          });
          this.dialRemarks ()
        },
        //下拉框
        dialRemarks () {
          this.http.post(BASE_URL + "/sale/saleDialRemark/getDialRemarkList", {})
          .then(data => {
            if (data.code == 'success') {
              this.remarkslist = data.data  
            }
          })
          .catch(err => {
            console.log(err);
          });
        },
        //关闭
        modalclose(name){
          this.modal2 = false
          this.$refs[name].resetFields();
        },
        //提交
        dialsub(name){
           this.$refs[name].validate((valid) => {
              if (valid) {
                let datetimel = Date.parse(new Date(this.formValidate.appointment))
                let datetimell = Date.parse(new Date())
                if(datetimel <= datetimell && this.formValidate.memo == '1005'){
                    this.$Modal.warning({
                      title: '指定时间',
                      content: '<p>指定时间不能小于当前时间</p>',
                      onOk: () => {
                      },
                      onCancel: () => {           
                      }
                    })
                    return false
                }
                let list = {
                  agencyTime:this.formValidate.appointment==''? "": utils.formatDate(this.formValidate.appointment,'yyyy-MM-dd hh:mm:ss'),
                  remarkCode:this.formValidate.memo,
                  dialCode:this.dialRecordCode,
                  remark:this.formValidate.standbyDesc,
                  loanOfficerCode :this.loanOfficerCode,           
                }
                this.http.post(BASE_URL + "/sale/saleDialRecord/saveDialRemark", list)
                .then(data => {
                  if (data.code == 'success') {
                    this.modal2 = false
                    this.$Message.success('备注成功')
                    this.$refs[name].resetFields();
                  } else {
                    this.$Message.error(data.message);
                    this.$refs[name].resetFields();
                  }
                }).catch(err=>{
                  console.log(err)
                })
              }
           })
        },
        selremarks(status){
          this.formValidate.memo = status
        },
        //会员
        member(status){
          this.memberstatus = status
        },
        time1(begin){
          this.beginTime= begin
        },
        time2(end){
          this.endTime = end
        },
        //充值
        rechargestatus(status){
          this.recharge = status
        },
        //消费
        consumptionstatus(status){
          this.consumption =status
        },
        //审核
        examine(status){
          this.examinestatus=status
        },
        //分配
        distribution(status){
          this.distributionstatus = status
        },
        //省
        registers(v){
          let data = {
              data:v
          };
          this.httpshi(data);
          this.registersheng = v;
        },
        //市
        registerh(v){
          this.registershi = v;
        },
        httpshi(data) {
          this.http
            .post(BASE_URL + "/loan/hotcity/queryCityAddressList", data)
            .then(data => {
              // this.registercityh = data.data || "";
              //  this.cityTypel = data.data || "";
               this.registercityh = data.data || "";
            });
        },
        Single (v,index) {
          this.lastarticle.pageNum = (this.startRow-1)*this.endRow+index+1
          this.lastarticle.pageSize = 1
          this.lastarticle.sortType = 6;
          this.lastarticle.dialCode = v.dialCode;
          localStorage.removeItem("articlelist");
          utils.putlocal('articlelist', JSON.stringify(this.lastarticle))
          let {href} = this.$router.resolve({path: './dialingRecord'});
          window.open(href, '_blank',"width=1300,height=650,menubar=no,toolbar=no,status=no,scrollbars=yes,left=200");
        }

    },
    created(){
      this.beginTime = utils.getNowDate()[1]+"-01"
      this.endTime = utils.getNowDate(0)[0]
      this.http.get("../../../static/city.json").then(data => {
        this.registercitys = data;
      });
      this.http
      .post(BASE_URL + "/sale/saleLoanOfficerInfo/querySaleOfficerInfoScreen", {})
      .then(data => {
        if (data.code == 'success') {
          this.memberList = data.data.memberStatus //会员
          this.consumptionList = data.data.consumptionStatus; //消费
          this.rechargeList = data.data.loanRechargeStatus; //充值
          this.examineList =data.data.loanStatus;   //审核
          this.distributionList=data.data.allotType  //分配
        }
      })
      .catch(err => {
        console.log(err);
      });  
      this.inquire(1)   
    }
    
}
</script>
<style lang="less" scoped>

</style>


