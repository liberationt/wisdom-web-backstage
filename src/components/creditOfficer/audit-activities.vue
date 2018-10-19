<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置</span>
        </p>
      </div>
      <div class="homePage contentcss">
        <h1 class="homePage_h1">
        审核活动
        </h1>
        <!-- form 表单 -->
        <p class="activeTitle">
          <span>活动标题：</span>
          <Input disabled v-model="examinelist.title" placeholder="8.8折扣抢单限时开抢" style="width:330px"></Input>
        </p>
        <Form  :model="formItem" style="width:100%" :label-width="100">
          <FormItem label="活动类型：" class="clearfix">
            <Select disabled v-model="examinelist.activityType" style="width:160px" class="left" @on-change="yesActiveType">
              <Option v-for="item in examinelist.typeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
            <Input v-if="this.examinelist.activityType == 1" disabled v-model="examinelist.discount" style="width:150px" class="left ml20">
              <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem label="活动日期：">
            <Row>
              <Col span="4">
                <DatePicker disabled type="datetime" @on-change="getdayTime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="examinelist.activityStartTime"></DatePicker>
              </Col>
              <!-- <Col span="1" style="text-align: center">-</Col> -->
              <Col span="4">
                <DatePicker disabled type="datetime" @on-change="getdayendTime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="examinelist.activityEndTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem v-if="isActiveType" label="每周包含：">
            <CheckboxGroup v-model="examinelist.weekArr">
              <Checkbox disabled label="1">星期一</Checkbox>
              <Checkbox disabled label="2">星期二</Checkbox>
              <Checkbox disabled label="3">星期三</Checkbox>
              <Checkbox disabled label="4">星期四</Checkbox>
              <Checkbox disabled label="5">星期五</Checkbox>
              <Checkbox disabled label="6">星期六</Checkbox>
              <Checkbox disabled label="7">星期天</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem v-if="isActiveType" label="每日起止时段：">
            <Row>
              <Col span="4">
                <TimePicker disabled type="time" @on-change="getstartTime" placeholder="请选择时间" v-model="examinelist.dailyStartTime"></TimePicker>
              </Col>
              <!-- <Col span="1" style="text-align: center">-</Col> -->
              <Col span="4">
                <TimePicker disabled type="time" @on-change="getendTime" placeholder="请选择时间" v-model="examinelist.dailyEndTime"></TimePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem v-if="isActiveType" label="产品范围：">
            <CheckboxGroup v-model="examinelist.productScopeArr">
              <Checkbox disabled label="1">抢单</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem v-if="isActiveType" label="平台每日限量" class="clearfix">
            <Select disabled v-model="examinelist.isLimited" style="width:160px" class="left" @on-change="quantityli">
              <Option value="0">不限量</Option>
              <Option value="1">限量</Option>
            </Select>
            <Input disabled v-for="item in examinelist.limitedList" v-model="item.productLimited" v-if="isquantity" style="width:150px" class="left ml20">
              <span slot="prepend">{{item.productName}}</span>
              <span slot="append">单</span>
            </Input>
          </FormItem>
          <FormItem v-if="!isActiveType" label="返利类型：" class="clearfix">
            <Select disabled v-model="examinelist.type" style="width:160px" class="left">
              <Option value="0">按固定值</Option>
              <Option value="1">按比例返</Option>
            </Select>
          </FormItem>
          <FormItem v-if="!isActiveType" label="返利规则：" class="clearfix">
            <Row>
              <Col :md="15" :lg="15">
                <div class="credit_recharge">
                  <div v-for="(item, index) in examinelist.rebateRulesList" :key="index" class="mb15 clearfix">
                    <Input disabled type="text" v-model.number="item.startBean" class="left ml10 inputnum" style="width:150px">
                      <span slot="prepend">累计充值</span>
                      <span slot="append" class="left">至</span>
                    </Input>
                    <Input disabled type="text" v-model.number="item.endBean" class="left inputnum" style="width:100px">
                      <span slot="append" class="left">赞豆</span>
                    </Input>
                    <div v-if="item.type == 0">
                      <Input disabled type="text" v-model="item.rebate" class="left ml20" style="width:100px">
                        <span slot="prepend">返</span>
                        <span slot="append" class="left">赞豆</span>
                      </Input>
                    </div>
                    <div v-if="item.type == 1" >
                      <Input disabled type="text" v-model="item.rebate" class="left ml20" style="width:100px">
                        <span slot="prepend">返</span>
                        <span slot="append" class="left">%</span>
                      </Input>
                    </div>
                    <Button type="primary" class="left ml5" v-if="index==0" @click="addnormal4">+</Button>
                    <Button type="primary" class="left ml5" v-if="index!=0" @click="addnorma4(index)">-</Button>
                  </div>
                </div>
              </Col>
            </Row>  
          </FormItem>
        </Form>

        <!-- <Form v-show="!isActiveType" :model="formactive" :label-width="100">
          <FormItem label="活动类型：" class="clearfix">
            <Select v-model="examinelist.activeType" style="width:160px" class="left" @on-change="yesActiveType">
              <Option v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="活动日期：">
            <Row>
              <Col span="4">
                <DatePicker type="date" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" v-model="formactive.startDate"></DatePicker>
              </Col>
              <Col span="1" style="text-align: center">-</Col>
              <Col span="4">
                <DatePicker type="date" placeholder="请选择时间" v-model="formactive.endDate"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="返利类型：" class="clearfix">
            <Select v-model="formactive.activeType" style="width:160px" class="left">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="返利规则：" class="clearfix">
            <Row>
              <Col :md="7" :lg="12">
                <div class="credit_recharge">
                  <div v-for="(item, index) in addnormals4" :key="index" class="mb15 clearfix">
                    <Input type="text" v-model.number="item.blackTime" class="left ml10 inputnum" style="width:150px">
                      <span slot="prepend">累计充值</span>
                      <span slot="append" class="left">至</span>
                    </Input>
                    <Input type="text" v-model.number="item.blackNum" class="left inputnum" style="width:100px">
                      <span slot="append" class="left">赞豆</span>
                    </Input>
                    <div v-if="isactiveType" >
                      <Input type="text" v-model.number="item.blackNum" class="left ml20" style="width:100px">
                        <span slot="append" class="left">赞豆</span>
                      </Input>
                    </div>
                    <div v-if="!isactiveType" >
                      <Input type="text" v-model.number="item.blackNum" class="left ml20" style="width:100px">
                        <span slot="append" class="left">%</span>
                      </Input>
                    </div>
                    <Button type="primary" class="left ml5" v-if="index==0" @click="addnormal4">+</Button>
                    <Button type="primary" class="left ml5" v-if="index!=0" @click="addnorma4(index)">-</Button>
                  </div>
                </div>
              </Col>
            </Row>  
          </FormItem>
        </Form> -->
        <hr>
        <div class="homePage_center">
          <!-- <Button type="primary"  -->
          <Button type="primary" v-if="this.$route.query.issee != 'see'" @click="modal9=true" style="margin-left: 8px">提交审核</Button>
          <router-link to="./activityManagement"> <Button style="margin-left: 8px">返回</Button> </router-link>
          <Button type="primary" @click="operationlog" style="margin-left: 8px">查看操作日志</Button>
        </div>
      </div>
      <Modal
            title="审核"
            v-model="modal9"
            @on-ok="submitexamine('formCustomexa')"
            @on-cancel="handleReset('formCustomexa')"
            ok-text="确定"
            cancel-text="取消"
            class-name="vertical-center-modal"
            width="500"
            :loading="loading"
            :mask-closable="false">
            <div  class="newtype_file mt15 mb15">
              <Form ref="formCustomexa" :model="formCustomexa" :rules="ruleCustomexa" :label-width="100" style="padding-left:15px">
                <FormItem label="审核状态:" prop="activeType" >
                  <Select v-model="formCustomexa.activeType" @on-change="examinetype" style="width:160px" >
                    <Option  value="2" >审核通过</Option>
                    <Option  value="3" >审核驳回</Option>
                  </Select>    
                </FormItem>
                <FormItem v-if="exememo" label="驳回原因:" prop="remarks" >
                  <Input v-model="formCustomexa.remarks" type="textarea" :rows="4" placeholder="请输入驳回原因" />    
                </FormItem>
            </Form>
            </div>
          </Modal>
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      isActiveType: true,
      loading: true,
      modal9:false,
      exememo:false,
      examinelist:{
          title: "",
          activityType: "",
          discount: "",
          activityStartTime: "",
          activityEndTime: "",
          weekArr :[],
          dailyStartTime :'',
          dailyEndTime :'',
          productScopeArr :[],
          isLimited:'',
          limitedList:[],
          typeList:[],
          type :'',
          rebateRulesList: [
            {
            startBean : null, //加入黑名单时间
            endBean: null, //加入黑名单次数
            rebate: null,
            type:null
            }
          ]
      },
      formCustomexa: {
        activeType: '2',
        remarks:''
      },
      ruleCustomexa: {
        activeType: [
            {required: true,message: '请选择审核状态',trigger: 'blur'},    
        ],
        remarks: [
            {required: true,message: '请输入驳回原因',trigger: 'blur'},
        ],
      },
      
      activeTypeList: [],
      noactiveTypeList:[],     
      ispreservation:"",
      isquantity: false,
      formItem: {
        
        weeklycheckbox: [],
        range:[],
        quantity:"",
        
        endTime: "",
        startTime: "",
        actitPercent: "",
      },
      formactive: {
        startDate: "",
        endDate: "",
        
      },
      
    };
  },
  created() {
    this.http
      .post(BASE_URL + "/loan/activity/getActivitySearch", {})
      .then(data => {
        this.activeTypeList = data.data.typeList
      })
      .catch(err => {});
  },
  methods: {
    // 加
    addnormal4() {
      this.examinelist.rebateRulesList.push({
        startBean : null,
        endBean: null,
        rebate : null,
        type:1
      });
    },
    // 减
    addnorma4(index) {
      this.examinelist.rebateRulesList.splice(index, 1);
    },
    //判断活动类型
    yesActiveType(n){
      if(n == 2){
        this.isActiveType = false
      } else {
        this.isActiveType = true
      }
    },
    //限量
    quantityli(n){
      if(n == 0){
        this.isquantity = false
      } else {
        this.isquantity = true
      }
    },
    //获取时间
    getdayTime(v){
      this.formItem.startDate = v
    },
    getdayendTime(v){
      this.formItem.endDate = v
    },
    getstartTime(v){
      this.formItem.startTime = v
    },
    getendTime(v){
      this.formItem.endTime = v
    },
    //提交审核
    submitexamine(name){
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          let data = {
            activityCode:this.$route.query.activityCode,
            auditStatus : this.formCustomexa.activeType,
            memo:this.formCustomexa.remarks
          }
          this.http.post(BASE_URL + '/loan/activity/auditActivityByCode', data)
          .then(data=>{
            if (data.code == 'success') {
              const title = '审核'
              const content = '<p>审核成功</p>'
              this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {  
                  this.$router.push({ path: "./activityManagement" });               
                  // this.$refs[name].resetFields()
                }
              })
            } else {
              // this.modal9 = true
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
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    examinetype (val) {
      if (val == 2) {
        this.exememo = false       
      } else {
        this.exememo = true
      }
    },
    operationlog () {
      this.$router.push({
        path:
          "./operationLog?operationType=activityAudit&activityCode=" +
          this.$route.query.activityCode
      });
    }
  },
  mounted() {
      this.http.post(BASE_URL+"/loan/activity/getByCode?activityCode="+this.$route.query.activityCode).then(data=>{
        if (data.code == 'success') {
            data.data.activityType = String(data.data.activityType)
            data.data.isLimited = String(data.data.isLimited)
            data.data.type = String(data.data.type)
            if (data.data.activityType == '1') {
                this.isActiveType = true
            } else {
                this.isActiveType = false
            }
            this.examinelist = data.data
        }
      }).catch(err=>{})
  }
};
</script>
<style lang="less" scoped>
hr {
  margin-top: 25px;
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
  margin-bottom: 40px;
}
.homePage_center {
  text-align: center;
  padding-top: 20px;
}
.activeTitle {
  margin-left: 26px;
  margin-bottom: 30px;
}
</style>
