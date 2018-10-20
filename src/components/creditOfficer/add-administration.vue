<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置</span>
        </p>
      </div>
      <div class="homePage contentcss">
        <h1 class="homePage_h1">
        添加/编辑活动
        </h1>
        <!-- form 表单 -->
        <p class="activeTitle">
          <span>活动标题：</span>
          <Input v-model="activeTitle" placeholder="活动标题" style="width:330px"></Input>
        </p>
        <Form v-show="isActiveType"  ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="100">
          <!-- <FormItem label="活动标题：" prop="activeTitle">
              <Input v-model="formItem.activeTitle" placeholder="8.8折扣抢单限时开抢" style="width:330px"></Input>
          </FormItem> -->
          <FormItem label="活动类型：" prop="activePercent" class="clearfix">
            <Row>
              <Col span="4">
                <Select v-model="activeType" style="width:160px" class="left" @on-change="yesActiveType">
                  <Option v-if="item.code != -1" v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
              </Col>
              <Col span="4">
                <Input v-model="formItem.activePercent" style="width:150px" class="left ml20">
                  <span slot="append">%</span>
                </Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="活动日期：">
            <Row>
              <Col span="4">
                <FormItem prop="startDate">
                  <DatePicker type="datetime" :options="options3" @on-change="getdayTime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="formItem.startDate"></DatePicker>
                </FormItem>
              </Col>
              <!-- <Col span="1" style="text-align: center">-</Col> -->
              <Col span="4">
                <FormItem prop="endDate">
                  <DatePicker type="datetime" :options="options3" @on-change="getdayendTime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="formItem.endDate"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="每周包含：" prop="weeklycheckbox">
            <CheckboxGroup v-model="formItem.weeklycheckbox">
              <Checkbox label="1">星期一</Checkbox>
              <Checkbox label="2">星期二</Checkbox>
              <Checkbox label="3">星期三</Checkbox>
              <Checkbox label="4">星期四</Checkbox>
              <Checkbox label="5">星期五</Checkbox>
              <Checkbox label="6">星期六</Checkbox>
              <Checkbox label="7">星期天</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="每日起止时段：">
            <Row>
              <Col span="4">
                <FormItem prop="startTime">
                  <TimePicker type="time" confirm @on-change="getstartTime" placeholder="请选择时间" v-model="formItem.startTime"></TimePicker>
                </FormItem>
              </Col>
              <!-- <Col span="1" style="text-align: center">-</Col> -->
              <Col span="4">
                <FormItem prop="endTime">
                  <TimePicker type="time" confirm @on-change="getendTime" placeholder="请选择时间" v-model="formItem.endTime"></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="产品范围：" prop="range">
            <CheckboxGroup v-model="formItem.range">
              <Checkbox label="1">抢单</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="平台每日限量：" class="clearfix">
            <Row>
              <Col span="4">
                <Select v-model="formItem.quantity" style="width:160px"  @on-change="quantityli">
                  <Option value="0">不限量</Option>
                  <Option value="1">限量</Option>
                </Select>
              </Col>
              <Col span="4">
                <FormItem prop="actitPercent" v-if="isquantity">
                  <Input v-model="formItem.actitPercent" style="width:150px" class="ml20">
                    <span slot="prepend">抢单</span>
                    <span slot="append">单</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <hr>
          <div class="homePage_center">
            <Button v-if="!baocun" type="primary" @click="preservation('formItem')">保存</Button>
            <Button disabled v-if="baocun">保存</Button>
            <Button v-if="!baocun" type="primary" @click="submitexamine('formItem')" style="margin-left: 8px">提交审核</Button>
            <Button disabled v-if="baocun" style="margin-left: 8px">提交审核</Button>
            <router-link to="./administration"> <Button style="margin-left: 8px">返回</Button> </router-link>
            <Button type="primary" v-if="yesEdit" style="margin-left: 8px" @click="journal">查看操作日志</Button>
          </div>
        </Form>
        <Form v-show="!isActiveType" ref="formactive" :model="formactive" :rules="ruleValidate" :label-width="100">
          
          <!-- <FormItem  label="活动标题：" prop="activeTitle">
              <Input v-model="formItem.activeTitle" placeholder="8.8折扣抢单限时开抢" style="width:330px"></Input>
          </FormItem> -->
          <FormItem label="活动类型：" class="clearfix">
            <Select v-model="activeType" style="width:160px" class="left" @on-change="yesActiveType">
              <Option v-if="item.code != -1" v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="活动日期：">
            <Row>
              <Col span="4">
                <FormItem prop="startDate">
                  <DatePicker type="datetime" :options="options3" @on-change="formastartTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" v-model="formactive.startDate"></DatePicker>
                </FormItem>
              </Col>
              <!-- <Col span="1" style="text-align: center">-</Col> -->
              <Col span="4">
                <FormItem prop="endDate">
                  <DatePicker type="datetime" :options="options3" @on-change="formasendTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" v-model="formactive.endDate"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="返利类型：" class="clearfix">
            <Select v-model="formactive.activeType" @on-change="yesactiveType" style="width:160px" class="left">
              <Option value="0">返固定值</Option>
              <Option value="1">按比例返</Option>
            </Select>
          </FormItem>
          <FormItem label="返利规则：" class="clearfix">
            <Row>
              <Col :md="7" :lg="12">
                <div class="credit_recharge">
                  <div v-for="(item, index) in addnormals4" :key="index" class="mb15 clearfix">
                    <Input type="text" v-model.number="item.startBean" class="left ml10 inputnum" style="width:150px">
                      <span slot="prepend">累计充值</span>
                      <span slot="append" class="left">至</span>
                    </Input>
                    <Input type="text" v-model.number="item.endBean" class="left inputnum" style="width:100px">
                      <span slot="append" class="left">赞豆</span>
                    </Input>
                    <div v-if="!isactiveType" >
                      <Input type="text" v-model.number="item.rebate" class="left ml20" style="width:100px">
                        <span slot="append" class="left">赞豆</span>
                      </Input>
                    </div>
                    <div v-if="isactiveType" >
                      <Input type="text" v-model.number="item.rebate" class="left ml20" style="width:100px">
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
          <hr>
          <div class="homePage_center">
            <Button v-if="!baocun" type="primary" @click="preservation('formactive')">保存</Button>
            <Button disabled v-if="baocun">保存</Button>
            <Button type="primary" v-if="!baocun" @click="submitexamine('formactive')" style="margin-left: 8px">提交审核</Button>
            <Button disabled v-if="baocun" style="margin-left: 8px">提交审核</Button>
            <router-link to="./administration"> <Button style="margin-left: 8px">返回</Button> </router-link>
            <Button type="primary" v-if="yesEdit" style="margin-left: 8px" @click="journal">查看操作日志</Button>
          </div>
        </Form>
      </div>
  </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      baocun: false,
      isactiveType: true,
      isActiveType: true,
      yesEdit: false,
      activeTypeList: [],
      noactiveTypeList: [],
      activeType: "1",
      ispreservation: "",
      isquantity: false,
      activeTitle: "",
      formItem: {
        activePercent: "",
        weeklycheckbox: [],
        range: [],
        quantity: "0",
        startDate: "",
        endDate: "",
        endTime: "",
        startTime: "",
        actitPercent: ""
      },
      ruleValidate: {
        // activeTitle: [
        //   {
        //     required: true,
        //     message: "活动标题不能为空",
        //     trigger: "blur"
        //   },
        //   { max: 50, message: '最多不能超过50个字', trigger: 'blur' }
        // ],
        activePercent: [
          {
            required: true,
            message: "消费折扣不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "change"
          },
          {
            type: "string",
            pattern: /^100$|^(\d|[1-9]\d)$/,
            message: "消费折扣不能大于100%",
            trigger: "blur"
          }
        ],
        actitPercent: [
          {
            required: true,
            message: "限量值不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入1-9999整数",
            trigger: "change"
          },
          { max: 4, message: "平台每日限量最大9999", trigger: "change" }
        ],
        startDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        endDate: [
          {
            required: true,
            type: "date",
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        weeklycheckbox: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择每周包含",
            trigger: "change"
          }
        ],
        range: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择产品范围",
            trigger: "change"
          }
        ],
        startTime: [
          {
            required: true,
            type: "string",
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            type: "string",
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      },
      formactive: {
        startDate: "",
        endDate: "",
        activeType: "1"
      },
      addnormals4: [
        {
          startBean: null, //充值数开始
          endBean: null, //充值数结束
          rebate: null // 返利
        }
      ],
      isedit: this.$route.query.isedit,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  created() {
    this.http
      .post(BASE_URL + "/loan/activity/getActivitySearch", {})
      .then(data => {
        this.activeTypeList = data.data.typeList;
      })
      .catch(err => {});
  },
  methods: {
    // 加
    addnormal4() {
      this.addnormals4.push({
        startBean: this.startBean, //充值数开始
        endBean: this.endBean, //充值数结束
        rebate: this.rebate // 返利
      });
    },
    // 减
    addnorma4(index) {
      this.addnormals4.splice(index, 1);
    },
    //判断活动类型
    yesActiveType(n) {
      if (n == 2) {
        this.isActiveType = false;
      } else {
        this.isActiveType = true;
      }
    },
    //限量
    quantityli(n) {
      if (n == 0) {
        this.isquantity = false;
      } else {
        this.isquantity = true;
      }
    },
    //判断返利
    yesactiveType(n) {
      if (n == 1) {
        this.isactiveType = true;
      } else {
        this.isactiveType = false;
      }
    },
    //获取时间
    getdayTime(v) {
      this.startDate = v;
    },
    getdayendTime(v) {
      this.endDate = v;
    },
    getstartTime(v) {
      this.formItem.startTime = v;
    },
    getendTime(v) {
      this.formItem.endTime = v;
    },
    formastartTime(v) {
      this.startDate = v;
    },
    formasendTime(v) {
      this.endDate = v;
    },
    //保存
    preservation(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(!this.isTrue()){
            return false
          }
          // console.log(preservationList)
          let httpUrl, contentTitle;
          if (this.isedit == "isedit") {
            httpUrl = "/loan/activity/updateByCode";
            contentTitle = "<p>编辑成功</p>";
          } else {
            httpUrl = "/loan/activity/save";
            contentTitle = "<p>添加成功</p>";
          }
          this.http
            .post(BASE_URL + httpUrl, this.canshu())
            .then(data => {
              if (data.code == "success") {
                const title = "提示";
                // const content = title;
                this.$Modal.success({
                  title: title,
                  content: contentTitle,
                  onOk: () => {
                    this.$router.push({ path: "./administration" });
                  }
                });
              } else {
                this.$Message.error(data.message);
              }
            })
            .catch(err => {});
        } else {
          // this.$Message.error(data.message);
        }
      });
    },
    //当前时间
    newDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var nowDate = year + "-" + month + "-" + day;
      return nowDate;
    },
    //自加的校验
    isTrue(){
      if (this.activeTitle == "") {
        this.$Message.error("活动标题不能为空！");
        return false;
      } else if (50 < this.activeTitle.length) {
        this.$Message.error("活动标题1-50个字！");
        return false;
      }
      let date1 = Date.parse(new Date(this.startDate)) / 1000;
      let date2 = Date.parse(new Date(this.endDate)) / 1000;
      let date5 = Date.parse(new Date(utils.getNowFormatDate())) / 1000
      if (date1 >= date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "更新时间",
          content: "<p>活动起始时间不得大于等于结束时间</p>"
        });
        return false;
      }
      if (date1 <= date5 ) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "更新时间",
          content: "<p>活动起始时间不得小于等于当前时间</p>"
        });
        return false;
      }
      let date3 = Date.parse(new Date(this.newDate()+" "+ this.formItem.startTime ))/1000
      let date4 = Date.parse(new Date(this.newDate()+" "+this.formItem.endTime ))/1000
      if (date3 >= date4 && this.activeType != 2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "更新时间",
          content: "<p>每日起始时间不得大于等于结束时间</p>"
        });
        return false;
      }
      let isValueError = false;
      if(this.addnormals4.length <= 0 && this.activeType == 2){
        this.$Message.error("返利规则不能为空！");
        return false
      } else if(this.activeType == 2){
        this.addnormals4.forEach((o, index) => {
          //startBean endBean
          if (!isValueError) {
            if (o.startBean >= o.endBean) {
              //error
              this.$Message.error("第" + (index + 1) + "行开始不能小于等于结束");
              // alert();
              isValueError = true;
            }else if (index > 0 && o.startBean <= this.addnormals4[index - 1].endBean) {
              this.$Message.error("第" + (index + 1) + "行开始不能小于等于第" + index + "行结束");
              //error
              // alert();
              isValueError = true;
            } else if(o.rebate == null){
              this.$Message.error("第" + (index + 1) + "行返利不能为空");
              //error
              // alert();
              isValueError = true;
            } else if(o.startBean == 0){
              this.$Message.error("赞豆区间开始必须大于0");
              isValueError = true;
            } else if(o.startBean > 999999 || o.endBean > 999999){
              this.$Message.error("赞豆区间不能大于999999");
              isValueError = true;
            }
          }
        });
        if (isValueError) {
          return;
        }
        // return false
      }
      return true
    },
    //参数封装
    canshu() {
      let preservationList;
      if (this.activeType != 2) {
        preservationList = {
          title: this.activeTitle, //活动标题
          activityType: this.activeType, //活动类型
          discount: this.formItem.activePercent, //消费折扣率
          dailyStartTime: this.formItem.startTime, //日开始时间
          dailyEndTime: this.formItem.endTime, //日结束时间
          effectiveWeek: this.formItem.weeklycheckbox.join(), //每周包含
          activityEndTime: this.endDate, //活动结束时间
          activityStartTime: this.startDate, //活动开始时间
          productScope: this.formItem.range.join(), //产品范围
          isLimited: this.formItem.quantity, //平台每日限量
          activityCode: this.$route.query.activityCode,
          limitedList: [
            {
              productLimited: this.formItem.actitPercent, //产品限量
              productValue: 1
            }
          ] //活动限量表-请求对象
        };
      } else {
        preservationList = {
          type: this.formactive.activeType, //返利类型
          activityType: this.activeType, //活动类型
          activityEndTime: this.endDate, //活动结束时间
          activityStartTime: this.startDate, //活动开始时间
          title: this.activeTitle, //活动标题
          activityCode: this.$route.query.activityCode,
          rebateRulesList: this.addnormals4
        };
      }
      return preservationList;
    },
    //提交审核
    submitexamine(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(!this.isTrue()){
            return false
          }
          this.http
            .post(BASE_URL + "/loan/activity/submitAuditActivity ", this.canshu())
            .then(data => {
              if (data.code == "success") {
                const title = "提示";
                // const content = title;
                this.$Modal.success({
                  title: title,
                  content: "提交成功",
                  onOk: () => {
                    this.$router.push({ path: "./administration" });
                  }
                });
              } else {
                this.$Message.error(data.message);
              }
            })
            .catch(err => {});
        } else {
          // this.$Message.error(data.message);
        }
      });
      // this.http
      //   .post(BASE_URL + "/loan/activity/auditActivityByCode", {
      //     activityCode: "string",
      //     auditStatus: 0
      //   })
      //   .then(data => {
      //     // console.log(data);
      //   })
      //   .catch(err => {});
    },
    // 查看操作日志
    journal() {
      this.$router.push({
        path:
          "./operationLog?operationType=loanOfficerActive&activityCode=" +
          this.$route.query.activityCode
      });
    }
  },
  mounted() {
    if(this.$route.query.isSee == "isSee"){
      this.baocun = true
    } else {
      this.baocun = false
    }
    if (this.isedit == "isedit" || this.$route.query.isSee == "isSee") {
      this.yesEdit = true;
      this.http
        .post(
          BASE_URL +
            "/loan/activity/getByCode?activityCode=" +
            this.$route.query.activityCode
        )
        .then(data => {
          if (data.code == "success") {
            // console.log(data.data.effectiveWeek.)
            this.activeTitle = data.data.title; //活动标题
            this.activeType = data.data.activityType + ""; //活动类型
            if (data.data.activityType == "1") {
              this.formItem.endDate = data.data.activityEndTime; //活动结束时间
              this.formItem.startDate = data.data.activityStartTime; //活动开始时间
              this.endDate = data.data.activityEndTime; //活动结束时间
              this.startDate = data.data.activityStartTime; //活动开始时间
              this.formItem.activePercent = data.data.discount + ""; //消费折扣率
              this.formItem.weeklycheckbox = data.data.effectiveWeek.split(","); //每周包含
              this.formItem.range = data.data.productScope.split(","); //产品范围
              this.formItem.quantity = data.data.isLimited + ""; //平台每日限量
              this.formItem.startTime = data.data.dailyStartTime; //日开始时间
              this.formItem.endTime = data.data.dailyEndTime; //日结束时间
              this.formItem.actitPercent =
                data.data.limitedList[0].productLimited+"";
            } else {
              this.formactive.startDate = data.data.activityStartTime; //消费折率的活动时间
              this.formactive.endDate = data.data.activityEndTime; //消费折率的活动时间
              this.startDate = data.data.activityStartTime; //消费折率的活动时间
              this.endDate = data.data.activityEndTime; //消费折率的活动时间
              this.addnormals4 = data.data.rebateRulesList;
              this.formactive.activeType = data.data.type + ""; //返利类型
            }
          }
        })
        .catch(err => {});
    }
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
