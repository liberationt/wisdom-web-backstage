<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;积分管理&nbsp;>&nbsp;添加积分权益活动</span>
			</p>
		</div>
		<div class="homePage contentcss">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" style="margin-top:40px;">
        <FormItem label="权益活动名称:" prop="rightsName">
					<Input v-model="formValidate.rightsName" :disabled = disabled placeholder="请输入权益活动名称" style="width:220px;">
          </Input>
				</FormItem>
				<FormItem label="权益活动类型:" prop="rightsType">
					<Select v-model="formValidate.rightsType" :disabled = disabled placeholder="请选择权益活动类型" style="width:220px;">
						<Option v-for="item in rightsTypeList" :key='item.type' :value='item.type'>{{item.name}}</Option>
					</Select>
				</FormItem>
        <FormItem label="权益内容:">
          <span v-if="formValidate.rightsType == ''">请先选择权益类型</span>
          <Row >
                <Col span="6">
                    <FormItem prop="zanDou" v-if="formValidate.rightsType == 1 && formValidate.rightsType != ''">
                        <Input v-model="formValidate.zanDou" :disabled = disabled placeholder="请输入赞豆" style="width:210px;">
                          <span slot="append">赞豆</span>
                        </Input>
                    </FormItem>
                    <FormItem prop="qvouchers" class="clearfix" v-if=" formValidate.rightsType == 2 ">
                      <Select :disabled = disabled v-model="formValidate.qvouchers" class=" mb5  inputnum" style="width:210px">
                            <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="choiceYvouchers" v-if="formValidate.rightsType == 3">
                      <Select v-model="formValidate.choiceYvouchers" :disabled = disabled placeholder="请选择" style="width:210px;">
                        <Option v-for="item in choiceYvouchersList" :key='item.couponNo' :value='item.couponNo'>{{item.couponNo}}</Option>
                      </Select>
                    </FormItem>
                    <FormItem prop="member" v-if="formValidate.rightsType == 4">
                      <Input v-model="formValidate.member" :disabled = disabled placeholder="请输入抢单券" style="width:220px;">
                        <span slot="append">天会员</span>
                      </Input>
                    </FormItem>
                </Col>
                <!-- <Col span="2" style="text-align: center">-</Col> -->
                <Col span="14">
                    <FormItem prop="termValidity" v-if="formValidate.rightsType == 1 && formValidate.rightsType != ''">
                        <Input v-model="formValidate.termValidity" :disabled = disabled placeholder="请输入赞豆有效期" style="width:210px;">
                          <span slot="append">天有效期</span>
                        </Input>
                    </FormItem>
                    <FormItem prop="couponNum" v-if=" formValidate.rightsType == 2 ">
                      <Input v-model="formValidate.couponNum" :disabled = disabled placeholder="请输入抢单券张数" style="width:220px;">
                        <span slot="prepend">抢单劵</span>
                        <span slot="append">张</span>
                      </Input>
                    </FormItem>
                    <FormItem v-if="formValidate.choiceYvouchers != ''&&formValidate.rightsType == 3" prop="contentCoupon">
                      <Input v-model="formValidate.contentCoupon" :disabled = disabled @input= "coupon" placeholder="请输入抢单券" style="width:220px;">
                        <span slot="prepend">优惠券</span>
                        <span slot="append">张</span>
                      </Input>
                    </FormItem>
                </Col>
            </Row>
          
				</FormItem>
        <FormItem label="权益面值:">
					<span v-if="formValidate.rightsType == 1 && formValidate.rightsType != '' && rightsWorth == ''">{{formValidate.zanDou}}赞豆</span>
					<span v-if=" formValidate.rightsType == 2 && rightsWorth == '' ">{{formValidate.couponNum}}张抢单券</span>
					<span v-if=" formValidate.rightsType == 4 && rightsWorth == '' ">{{formValidate.member}}天会员</span>
					<span v-if="formValidate.rightsType == 3 && rightsWorth == ''">{{contentCoupon}}元优惠券</span>
          <span v-if="rightsWorth != ''"> {{rightsWorth}} </span>
				</FormItem>
        <FormItem label="所需积分:" prop="rewardPoints">
					<Input v-model="formValidate.rewardPoints" :disabled = disabled placeholder="请输入使用门槛" style="width:220px;">
            <span slot="append">积分</span>
          </Input>
				</FormItem>
        <FormItem label="兑换起始时间:" class="clearfix">
					<Select class="left" v-show="false" :disabled = disabled v-model="formValidate.timeType" placeholder="请选择" style="width:120px;">
						<Option v-for="item in timeTypeList" :key='item.type' :value='item.type'>{{item.name}}</Option>
					</Select>
          <Row v-if="formValidate.timeType == 2" class="left">
            <Col span="11">
              <FormItem prop="activityBeginTime">
                <DatePicker type="datetime" :disabled = disabled :options="options3" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="formValidate.activityBeginTime"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">至</Col>
            <Col span="11">
              <FormItem prop="activityEndTime">
                <DatePicker type="datetime" :disabled = disabled :options="options3" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" v-model="formValidate.activityEndTime"></DatePicker>
              </FormItem>
            </Col>
          </Row>
				</FormItem>
        <FormItem label="兑换权益限量:" prop="rewardTotalCount">
					<Input v-model="formValidate.rewardTotalCount" :disabled = disabled placeholder="请输入兑换权益限量" style="width:220px;">
            <span slot="append">份</span>
          </Input>
				</FormItem>
        <FormItem label="单用户兑换限量:" prop="singleUserCount">
					<Input v-model="formValidate.singleUserCount" :disabled = disabled placeholder="请输入单用户兑换限量" style="width:220px;">
            <span slot="append">份</span>
          </Input>
				</FormItem>
				<FormItem label="权益图片" prop="picUrl">
            <img :src="formValidate.labelUrl" alt="" class="mechimg left">
            <Upload
            :show-upload-list='false'
            :format="['jpg','jpeg','png', 'gif']"
            :max-size="2048"
            :before-upload="handleUploadicon"
            :on-format-error="handleFormatError1"
            action=""
            >
            <Input v-model="formValidate.picUrl" disabled style="width: 50px;"  class="left ml5 hidden"></Input>
            <Button :disabled = disabled  type="ghost" icon="ios-cloud-upload-outline" style="margin-top:15px;" class="left ml10 w90" >上传图片</Button>
            </Upload>
        </FormItem>
				<FormItem label="权益概括:" prop="rightsDesc">
          <Input style="width:285px" :disabled = disabled v-model="formValidate.rightsDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入券详情信息" />
        </FormItem>
        <FormItem label="权益详细介绍:" prop="rightsDetail">
          <Input style="width:285px" :disabled = disabled v-model="formValidate.rightsDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" />
        </FormItem>
				<FormItem  style="margin-top:50px">
          <Button class="mr20" type="primary" v-if="!disabled" @click="preservation('formValidate')">保存</Button>
					<Button @click="handleReset">取消</Button>
				</FormItem>  
			</Form>
		</div>
	</div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      rightsTypeList: [
        {type:'1',name:"赞豆"},
        {type:'2',name:"抢单券"},
        {type:'3',name:"优惠券"},
        {type:'4',name:"会员"},
      ],
      contentCoupon:"",
      adjustTypeList: [],
      choiceYvouchersList:[],
      timeTypeList:[
        {type:1,name:"不限时间范围"},
        {type:2,name:"固定时间范围"},
      ],
      cityList:[],//抢单劵list
      formValidate: {
        rightsName:"",//权益活动名称
        rightsType: "", //类型
        zanDou:"",// 赞豆
        termValidity:'',//赞豆有效期
        qvouchers:"",//抢单券
        couponNum:'',//抢单劵张数
        choiceYvouchers:"",//优惠券选择
        contentCoupon: "",//优惠券
        member:"",//会员
        rewardPoints: "", //积分
        activityBeginTime:"",//兑换起始时间
        activityEndTime:"",//兑换时间结束时间
        timeType:2, // 起始时间
        rewardTotalCount: "", //权益限量
        singleUserCount: "",//单用户兑换限量
        labelUrl: require("../../image/moren.png"),// 权益图片
				picUrl: "",
        rightsDetail: "", //备注
        rightsDesc: "" //详情
      },
      ruleValidate: {
        rightsName:[
          {
            required: true,
            message: "请输入权益活动名称",
            trigger: "blur"
          },
          {
            max: 20,
            message: "权益活动名称最多输入20个字",
            trigger: "blur"
          }
        ],
        choiceYvouchers: [
          { required: true, message: '请选择权益编号！', trigger: 'change' }
        ],
        rightsType: [
          {
            required: true,
            message: "请选择权益活动类型",
            trigger: "change"
          }
        ],
        zanDou: [
          {
            required: true,
            message: "请输入赞豆",
            trigger: "blur"
          },
          { message: '赞豆可输入1-999999间整数', pattern:  /^(([1-9]\d{0,5}))?$/,trigger: 'blur'}
        ],
        termValidity: [
          {
            required: true,
            message: "请输入赞豆有效期",
            trigger: "blur"
          },
          { message: '请输入整数', pattern:  /^(0|\+?[1-9][0-9]{0,5})$/,trigger: 'blur'}
        ],
        qvouchers: [
          {
            required: true,
            message: "请选择抢单券",
            trigger: "change"
          },
        ],
        couponNum: [
          {
            required: true,
            message: "请输入抢单券张数",
            trigger: "blur"
          },
          { message: '抢单券可输入0-999999间整数', pattern:  /^(0|\+?[1-9][0-9]{0,5})$/,trigger: 'blur'}
        ],
        contentCoupon: [
          {
            required: true,
            message: "请输入优惠券",
            trigger: "blur"
          },
          { message: '抢单券可输入1-999999间整数', pattern:  /^(([1-9]\d{0,5}))?$/,trigger: 'blur'}
        ],
        member: [
          {
            required: true,
            message: "请输入会员天数",
            trigger: "blur"
          },
          {required: true, message: '请输入1-365之间的整数', pattern:  /^([1-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/,trigger: 'blur'}
        ],
        rewardPoints: [
          {
            required: true,
            message: "请输入积分",
            trigger: "blur"
          },
          { message: '积分可输入0-999999间整数', pattern:  /^(([0-9]\d{0,5}))?$/,trigger: 'change'}
        ],
        activityBeginTime: [
          { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
        ],
        activityEndTime: [
          { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
        ],
        rewardTotalCount: [
          {
            required: true,
            message: "请输入兑换权益限量",
            trigger: "blur"
          },
          { message: '兑换权益限量可输入0-999999间整数', pattern:  /^(([0-9]\d{0,5}))?$/,trigger: 'change'}
        ],
        singleUserCount: [
          {
            required: true,
            message: "请输入单用户兑换限量",
            trigger: "blur"
          },
          { message: '单用户兑换限量可输入0-999999间整数', pattern:  /^(([0-9]\d{0,5}))?$/,trigger: 'change'}
        ],
        picUrl: [
          { required: true, message: "请选择图片", trigger: "blur" }
				],
        rightsDesc: [
          {
            max: 50,
            message: "权益概括最多输入50个字",
            trigger: "blur"
          }
        ],
        rightsDetail: [
          {
            max: 500,
            message: "权益详细介绍最多输入500个字",
            trigger: "blur"
          }
        ]
      },
      rightsWorth:"",
      disabled:false,
    };
  },
  methods: {
    // 优惠券监听
    coupon(){
      let denomination
      if(this.formValidate.choiceYvouchers == ""){
        this.$Message.info("请选择权益编号")
        this.formValidate.contentCoupon.slice(0,0)
      } else {
        this.choiceYvouchersList.forEach(v=>{
          if(v.couponNo == this.formValidate.choiceYvouchers){
            denomination = v.denomination
          }
        })
        this.contentCoupon = this.formValidate.contentCoupon * denomination
      }
    },
    // 返回
    handleReset() {
      window.history.go(-1);
    },
    // 图片上传
    handleUploadicon(file) {
			let splic = file.name.split(".");
      if (
        splic[splic.length - 1] == "png" ||
        splic[splic.length - 1] == "jpg" ||
        splic[splic.length - 1] == "gif" ||
        splic[splic.length - 1] == "jpeg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("dirs", 'rights');
        formData.append("bucket", 'loan');
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.http
          .post(BASE_URL + "/fileUpload", formData, config)
          .then(resp => {
            if (resp.code == "success") {
              this.formValidate.labelUrl = resp.data;
              this.formValidate.picUrl = resp.data;
            }
          })
          .catch(() => {});
        return false;
      }
    },
    handleFormatError1(file) {
      this.$Message.error("图片格式不正确,请上传正确的图片格式");
		},
    // 保存
    preservation(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let date1 = Date.parse(new Date(this.formValidate.activityBeginTime))/1000
          let date2 = Date.parse(new Date(this.formValidate.activityEndTime))/1000
          let datetimell = Date.parse(new Date())/1000
          if (date1 >= date2) {
            this.loading3 = false
            this.$Modal.warning({
              title: '注册时间',
              content: '<p>开始时间不得大于结束时间</p>'
            })
            return false
          }
          if(date1<datetimell || date2 < datetimell){
            console.log(date1,date2,datetimell)
            this.loading3 = false
            this.$Modal.warning({
              title: '注册时间',
              content: '<p>开始时间或结束时间不得小于当前时间</p>'
            })
            return false
          }
          //单用户兑换限量不能大于兑换权益限量
          if(Number(this.formValidate.rewardTotalCount) != 0){
            if(Number(this.formValidate.singleUserCount) > Number(this.formValidate.rewardTotalCount)){
              this.$Message.error("单用户兑换限量不能大于兑换权益限量")
              return false
            }
          }
          let data = {
          activityBeginTime :  utils.formatDate(this.formValidate.activityBeginTime, 'yyyy-MM-dd hh:mm:ss'),
          activityEndTime :  utils.formatDate(this.formValidate.activityEndTime, 'yyyy-MM-dd hh:mm:ss'),
          contentCoupon:{
            count : this.formValidate.contentCoupon,
            couponNo : this.formValidate.choiceYvouchers
          },//权益内容-优惠券
          contentRob:{
            ticketNo : this.formValidate.qvouchers,
            count:this.formValidate.couponNum
          },//权益内容-抢单卷
          contentVip:{
            days : this.formValidate.member
          },//会员天数
          contentZd:{
            count : this.formValidate.zanDou,
            expireDay:this.formValidate.termValidity

          }}//赞豆数量
          this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认保存？</p>",
            onOk: () => {
              this.http
                .post(BASE_URL + "/loan/rewardPointsRights/save",   Object.assign(this.formValidate, data))
                .then(data => {
                  if (data.code == "success") {
                    this.$Message.info("保存成功！");
                    this.$router.push("/IntegralManagement");
                  } else {
                    this.$Message.info(data.message);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            },
            onCancel: () => {}
          });
        }
      });
    },
    voucherNumber () {
      this.http.post(BASE_URL + '/loan/ticketManage/queryTicketNoList',{})
      .then((resp) => {
        if (resp.code == 'success') {
          this.cityList = resp.data
          
        } else {
          this.$Message.warning(resp.message);                 
        }
      })
      .catch(() => {
      })
    }
  },
  created() {
    this.voucherNumber()
    // 初始化数据
    this.http.post(BASE_URL+"/loan/couponManage/queryList",{status: 1}).then(data=>{
      console.log(data)
      if(data.code == 'success'){
        this.choiceYvouchersList = data.data.dataList
      }
    }).catch(err=>{console.log(err)})
    if(this.$route.query.code) {
      this.http.post(BASE_URL+"/loan/rewardPointsRights/getByCode?code="+this.$route.query.code).then(data=>{
        if(data.code == 'success'){
          let list = data.data
          this.formValidate = list
          this.formValidate.rightsType = list.rightsType+""
          this.formValidate.choiceYvouchers = list.contentCoupon == null ? "" : String(list.contentCoupon.couponNo)
          this.formValidate.contentCoupon = list.contentCoupon == null ? "" : list.contentCoupon.count+""
          this.rightsWorth = list.rightsWorth
          this.formValidate.labelUrl = list.picUrl
          this.formValidate.member = list.rightsContent == null ? "" : JSON.parse(list.rightsContent).days+""
          this.formValidate.couponNum = list.contentRob == null ? "" : list.contentRob.count +"" //抢单数
          this.formValidate.qvouchers = list.contentRob == null ? "" : list.contentRob.ticketNo +"" //抢单劵编号
          this.formValidate.zanDou = list.contentZd == null ? "" : list.contentZd.count+""
          this.formValidate.termValidity = list.contentZd == null ? "" : list.contentZd.expireDay+""
          this.disabled = true
        }
      }).catch(err=>{console.log(err)})
    }
  }
};
</script>
<style scoped>
.mechimg {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.spandisright{
  display: inline-block;
  line-height: 20px;
  padding: 5px 7px;
  font-size: inherit;
  font-weight: 400;
  color: #495060;
  text-align: center;
  background-color: #eee;
  border: 1px solid #dddee1;
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>