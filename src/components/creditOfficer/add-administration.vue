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
          <Input v-model="activeTitle" placeholder="8.8折扣抢单限时开抢" style="width:330px"></Input>
        </p>
        <Form v-show="isActiveType"  ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="100">
          <FormItem label="活动类型：" prop="activePercent" class="clearfix">
            <Row>
              <Col span="4">
                <Select v-model="activeType" style="width:160px" class="left" @on-change="yesActiveType">
                  <Option v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
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
              <Col span="1" style="text-align: center">-</Col>
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
              <Col span="1" style="text-align: center">-</Col>
              <Col span="4">
                <FormItem prop="endTime">
                  <TimePicker type="time" confirm @on-change="getendTime" placeholder="请选择时间" v-model="formItem.endTime"></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="产品范围：">
            <CheckboxGroup v-model="formItem.range">
              <Checkbox label="1">抢单</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="平台每日限量：" class="clearfix">
            <Select v-model="formItem.quantity" style="width:160px" class="left" @on-change="quantityli">
              <Option value="0">不限量</Option>
              <Option value="1">限量</Option>
            </Select>
            <Input v-model="formItem.actitPercent" v-if="isquantity" style="width:150px" class="left ml20">
              <span slot="prepend">抢单</span>
              <span slot="append">单</span>
            </Input>
          </FormItem>
          <hr>
          <div class="homePage_center">
            <Button type="primary" @click="preservation('formItem')">保存</Button>
            <Button type="primary" @click="submitexamine" style="margin-left: 8px">提交审核</Button>
            <router-link to="./administration"> <Button style="margin-left: 8px">返回</Button> </router-link>
            <Button type="primary" style="margin-left: 8px">查看操作日志</Button>
          </div>
        </Form>
        <Form v-show="!isActiveType" :model="formactive" :label-width="100">
          <FormItem label="活动类型：" class="clearfix">
            <Select v-model="activeType" style="width:160px" class="left" @on-change="yesActiveType">
              <Option v-for="item in activeTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="活动日期：">
            <Row>
              <Col span="4">
                <FormItem prop="startDate">
                  <DatePicker type="datetime" @on-change="formastartTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" v-model="formactive.startDate"></DatePicker>
                </FormItem>
              </Col>
              <Col span="1" style="text-align: center">-</Col>
              <Col span="4">
                <FormItem prop="endDate">
                  <DatePicker type="datetime" @on-change="formasendTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" v-model="formactive.endDate"></DatePicker>
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
            <Button type="primary" @click="preservation('formItem')">保存</Button>
            <Button type="primary" @click="submitexamine" style="margin-left: 8px">提交审核</Button>
            <router-link to="./administration"> <Button style="margin-left: 8px">返回</Button> </router-link>
            <Button type="primary" style="margin-left: 8px">查看操作日志</Button>
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
      isactiveType: true,
      isActiveType: true,
      activeTitle: "",
      activeTypeList: [],
      noactiveTypeList: [],
      activeType: "1",
      ispreservation: "",
      isquantity: false,
      formItem: {
        activePercent: "",
        weeklycheckbox: [],
        range: [],
        quantity: "",
        startDate: "",
        endDate: "",
        endTime: "",
        startTime: "",
        actitPercent: ""
      },
      ruleValidate: {
        activePercent: [
          {
            required: true,
            message: "消费折扣不能为空",
            trigger: "blur"
          }
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
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
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
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
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
      this.formItem.startDate = v;
    },
    getdayendTime(v) {
      this.formItem.endDate = v;
    },
    getstartTime(v) {
      this.formItem.startTime = v;
    },
    getendTime(v) {
      this.formItem.endTime = v;
    },
    formastartTime(v) {
      this.formactive.startDate = v;
    },
    formasendTime(v) {
      this.formactive.endDate = v;
    },
    //保存
    preservation(name) {
      // console.log(this.addnormals4)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          // this.$Message.error("Fail!");
        }
      });
      let preservationList;
      if (this.activeType != 2) {
        preservationList = {
          title: this.activeTitle, //活动标题
          activityType: this.activeType, //活动类型
          discount: this.formItem.activePercent, //消费折扣率
          dailyStartTime: this.formItem.startTime, //日开始时间
          dailyEndTime: this.formItem.endTime, //日结束时间
          effectiveWeek: this.formItem.weeklycheckbox.join(), //每周包含
          activityEndTime: this.formItem.endDate, //活动结束时间
          activityStartTime: this.formItem.startDate, //活动开始时间
          productScope: this.formItem.range.join(), //产品范围
          isLimited: this.formItem.quantity, //平台每日限量
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
          activityEndTime: this.formactive.endDate, //活动结束时间
          activityStartTime: this.formactive.startDate, //活动开始时间
          title: this.activeTitle, //活动标题
          rebateRulesList: this.addnormals4
        };
      }
      // console.log(preservationList)
      this.http
        .post(BASE_URL + "/loan/activity/save", preservationList)
        .then(data => {
          console.log(data);
          if (data.code == "success") {
            const title = "提示";
            const content = "<p>添加成功</p>";
            this.$Modal.success({
              title: title,
              content: content
            });
          }
        })
        .catch(err => {});
    },
    //提交审核
    submitexamine() {
      this.http
        .post(BASE_URL + "/loan/activity/auditActivityByCode", {
          activityCode: "string",
          auditStatus: 0
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (this.isedit == "isedit") {
      this.http
        .post(
          BASE_URL +
            "/loan/activity/getByCode?activityCode=" +
            this.$route.query.activityCode
        )
        .then(data => {
          if (data.code == "success") {
            this.activeTitle = data.data.title; //活动标题
            if (data.data.activityType == "1") {
              console.log(data.data.dailyEndTime);
              this.activeType = data.data.activityType + ""; //活动类型
              this.formItem.activePercent = data.data.discount; //消费折扣率
              this.formItem.startTime = data.data.dailyStartTime; //日开始时间
              this.formItem.endTime = data.data.dailyEndTime; //日结束时间
              this.formItem.weeklycheckbox = data.data.effectiveWeek; //每周包含
              this.formItem.endDate = data.data.activityEndTime; //活动结束时间
              this.formItem.startDate = data.data.activityStartTime; //活动开始时间
              this.formItem.range = data.data.productScope; //产品范围
              this.formItem.quantity = data.data.isLimited + ""; //平台每日限量
              this.formItem.actitPercent =
                data.data.limitedList[0].productLimited;
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
