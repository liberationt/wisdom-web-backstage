<template>
	<div class="contentcss">
		<Row>
			<Col span="5">
			<div id="memberLeft">
				<div class="memberphoto">
					<img v-if="inform.personImg!=''" :src="inform.personImg" alt="" @click="bigimg(inform.personImg)">
					<img v-if="inform.personImg==''" :src="require('../../image/moren.png')" alt="">
					<p class="stre_evaluate">
						<img v-for='(item, index) in img' v-bind:src='item' :key="index" alt=''>
					</p>
				</div>
				<ul class="member_left_ul">
					<li>
            <span style="w60 tr displayib">现金余额:</span>
            <strong>{{inform.cashAmount}}</strong>
					</li>
					<li>
						<span class="w60 tr displayib">姓名:</span>
						<span>{{inform.name}}</span>
					</li>
					<li>
						<span class="w60 tr displayib">性别:</span>
						<span>{{inform.genderName}}</span>
					</li>
          <li>
						<span class="w70 tr displayib">注册来源:</span>
						<span>{{inform.businessKey==3?'微店':'抢单侠'}}</span>
					</li>
          <li v-if="inform.businessKey==3">
						<span class="w70 tr displayib">渠道来源:</span>
						<span>{{inform.channel}}</span>
					</li>
					<li>
						<span class="w70 tr displayib" v-if="inform.businessKey!=3">首登微店:</span>
						<span class="w70 tr displayib" v-else>注册时间:</span>
						<span>{{inform.dataCreateTime}}</span>
					</li>
          <li>
						<span class="w70 tr displayib">开店时间:</span>
						<span>{{inform.storeCreateTime}}</span>
					</li>
          <li>
						<span class="w60 tr displayib">邀请码:</span>
						<span>{{inform.inviterCode }}</span>
					</li>
					<li>
						<span class="w60 tr displayib">银行卡:</span>
						<span class="">{{inform.bankName}}{{inform.bank}}</span>
					</li>
				</ul>
			</div>
			</Col>
			<Col span="19">
			<div id="memberRight">
				<Tabs :animated="false" @on-click="tabswitch">
					<TabPane label="个人信息">
						<div class="basic">
							<p>
								<span>信贷员code:</span>
								<span>{{inform.businessCode}}</span>
							</p>
							<p v-if="inform.businessKey!=3">
								<span>所属区域:</span>
								<span>{{inform.adNameFirst }} {{inform.adNameSecond }}</span>
							</p>
							<p v-if="inform.businessKey!=3">
								<span>所属公司:</span>
								<span>{{inform.company }}</span>
							</p>
              <p>
                <span>申请/结算</span>
								<span>{{inform.applyOrderCount  }}/{{inform.settleCount }}</span>
              </p>
              <p class="mt10">
                <span>会员等级：</span> 
                <Select v-model="membershipLevel" style="width:200px">
                  <Option v-for="(item,i) in membershipLevelList" :value="item.code" :key="i">{{ item.label }}</Option>
                </Select>
              </p>
							<div class="mt50 tc left">
                <Button type="primary" class="mr20" @click="submitPreservation">提交保存</Button>
								<Button type="ghost" class="mr20" @click="Journals">查看操作日志</Button>
								<Button type="ghost" @click="ationreturn">返回</Button>
							</div>
							<!-- 查看大图弹框 -->
							<Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
								<img :src=this.imglink alt="" style="width:970px;height:890px;">
							</Modal>
						</div>
					</TabPane>
					<TabPane label="申请记录">
            <membershipRecords :managerCode='managerCode'></membershipRecords>
					</TabPane>
					<TabPane label="佣金记录">
            <commissionRecord :managerCode='managerCode'></commissionRecord>
					</TabPane>
					<TabPane label="现金流水">
            <cashFlow :managerCode='managerCode'></cashFlow>
					</TabPane>
          <TabPane label="登陆日志">
            <membershipLogins :managerCode='managerCode'></membershipLogins>
					</TabPane>
				</Tabs>
			</div>
			</Col>
		</Row>
		<!-- 备注弹窗 -->
		<Modal v-model="dialMark" title="拨打标记" @on-ok="handleSubmit('formValidateli')" @on-cancel="handleReset('formValidateli')" ok-text="提交" cancel-text="关闭" :mask-closable=false :loading="loading">
			<Form ref="formValidateli" :model="formValidateli" :rules="ruleValidateli" :label-width="100">
				<FormItem label="拨打备注：" prop="remarksOption">
					<Select v-model="formValidateli.remarksOption" style="width:260px" placeholder="请选择">
						<Option v-for="item in remarksOptionList" :value="item.remarkCode">{{item.remarkDesc}}</Option>
					</Select>
				</FormItem>
				<FormItem label="待办备注：" v-if="this.formValidateli.remarksOption == '1006'">
					<FormItem prop="standbyDesc">
						<Input v-model="formValidateli.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
					</FormItem>
				</FormItem>
			</Form>
		</Modal>
    <Modal
      v-model="Journal"
      title="操作日志"
      ok-text="关闭"
      :mask-closable = false
      width=800
      @on-ok="Journalok">
      <Table border :columns="columns" :data="data1"></Table>
      <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </Modal>
	</div>
</template>
<script>
import utils from "../../utils/utils";
import membershipRecords from './membership/membershipRecords'
import membershipLogins from './membership/membershipLogins'
import cashFlow from './creaditpffice/cashFlow' // 现金流水
import commissionRecord from './creaditpffice/commissionRecord' //佣金记录
export default {
  components: {
    membershipRecords,
    membershipLogins,
    commissionRecord,
    cashFlow
  },
  data() {
    return {
      Journal:false,
      managerCode:'',
      recommender: "",//推荐人
      membershipLevel: "",//会员等级
      membershipLevelList:[],
      modifyModal: false,
      remarksOptionList: [],
      dialMark: false,
      balancebill: false,
      balanceMember: false,
      balanceFace: false,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formValidateli: {
        remarksOption: "",
        standbyDesc: ""
      },
      ruleValidateli: {
        remarksOption: [
          {
            required: true,
            type: "string",
            message: "请选择待拨打备注",
            trigger: "change"
          }
        ],
        standbyDesc: [
          {
            required: true,
            message: "请填写待办备注",
            trigger: "blur"
          }
        ]
      },
      imglink: "",
      modal11: false,
      img: [],
      loading: true,
      introduce: true,
      tabnum: 0,
      total: 0,
      startRow: 1,
      endRow: 10,
      name: "",
      inform: {},
      identity: [
        require("../../image/identity_id.jpg"),
        require("../../image/identity_id.jpg")
      ],
      columns:[
        {
          key:'operator',
          align:'center',
          title:'操作人',
          minWidth:100
        },
        {
          key:'dataCreateTime',
          align:'center',
          title:'操作时间',
          minWidth:100
        },
        {
          key:'content',
          align:'center',
          title:'操作内容',
          minWidth:100
        }
      ],
      data1:[],
    }
  },
  methods: {
    // 提交保存
    submitPreservation(){
      let vipDesc
      this.membershipLevelList.forEach(v=>{
        if(v.code == this.membershipLevel){
          vipDesc = v.label
        }
      })
      let data = {
        vipType :this.membershipLevel,
        vipDesc :vipDesc,
        managerCode :this.$route.query.managerCode 
      }
      this.http.post(BASE_URL+'/vshop/vshopStoreManager/updateStoreManager',data)
      .then(data=>{
        if(data.code=='success'){
          this.$Message.success('修改成功')
          this.information()
        }
      })
    },
    // 审核
    reviewthrough(num) {
      let list = {
        loanOfficerCode: this.inform.loanOfficerCode,
        loanStatus: loanStatus,
        loanStatusMsg: loanStatusMsg
      };
      this.http
        .post(BASE_URL + "/loan/officer/updateOfficerInfoLoanStatus", list)
        .then(resp => {
          if (resp.code == "success") {
            const title = "审核";
            let content;
            if (num != 1) {
              content = "<p>审核拒绝成功</p>";
              this.$Modal.success({
                title: title,
                content: content,
                onOk: () => {
                  this.$router.push({
                    path: "./admissionAudit"
                  });
                }
              });
            }
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 返回
    ationreturn() {
      window.history.go(-1);
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    getoption(startRow){
      let data = {
        pageNum:startRow,
        pageSize:this.endRow,
        managerCode:this.$route.query.managerCode
      }
      this.http.post(BASE_URL+'/vshop/storeManagerLog/queryPage',data)
      .then(data=>{
        if(data.code =='success'){
          this.data1 = data.data.dataList
          this.total = data.data.total
          this.startRow =
          Math.ceil(data.data.startRow / this.endRow) == 0
          ? 1
          : Math.ceil(data.data.startRow / this.endRow);
        }
      })
    },
    // 查看操作日志
    Journals() {
      this.Journal = true
      this.getoption(1)
    },
    Journalok(){
      
    },
    //会员等级
    merbercoss(){
      this.http.post(BASE_URL+'/vshop/vshopStoreManager/queryPageFilter',{})
      .then(data=>{
        if(data.code=='success'){
          this.membershipLevelList = data.data.vipBeans
        }
      })
    },
    // 基本信息
    information() {
      this.img = [];
      let list = {
        managerCode : this.$route.query.managerCode 
      };
      this.http
        .post(BASE_URL + "/vshop/vshopStoreManager/getStoreManagerDetail", list)
        .then(resp => {
          if (resp.code == "success") {
            this.inform = resp.data;
            this.membershipLevel = resp.data.vipType
            for (let i = 0; i < resp.data.loanOfficerGrade; i++) {
              this.img.push(require("../../image/pointed-star.png"));
            }
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    // 点击tab
    tabswitch(name) {
    },
    pageChange(page) {
      this.startRow = page
      this.getoption(page)
    },
    pagesizechange(page) {
      this.endRow = page
      this.getoption(1)
    },
    bigimg(link) {
      this.imglink = link;
      this.modal11 = true;
      // window.location.href = link
    },
    //调整赞豆余额
    Jurisdiction() {
      this.balanceBean = true;
    },
    // 调整抢单劵数量
    Jurisbill() {
      this.balancebill = true;
    },
    // 调整会员
    JurisMemberJurisMember() {
      this.balanceMember = true;
    },
    // 调整人脸识别次数
    JurisFace() {
      this.balanceFace = true;
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 备注确认
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.httpPost(
            "/sale/saleDialRecord/saveDialRemark4KF",
            {
              agencyTime: "",
              dialCode: this.dialCode, //拨打记录code
              loanOfficerCode: this.$route.query.loanOfficerCode, //信贷员编号
            },
            data => {
              if (data.code == "success") {
                this.dialEecord(1); //拨打记录
                this.changeLoading();
                this.$refs[name].resetFields(); //数据还原
                this.$Message.success(data.message);
                this.dialMark = false;
              } else {
                this.$refs[name].resetFields(); //数据还原
                this.dialMark = false;
                this.$Message.error(data.message);
                this.changeLoading();
              }
            },
            err => {
              this.$refs[name].resetFields(); //数据还原
              this.dialMark = false;
              this.$Message.error("服务出错啦，请稍等!");
              this.changeLoading();
            }
          );
        } else {
          this.changeLoading();
        }
      });
    },
    // 备注取消
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    // 拨打备注选项
    optionList() {
      this.httpPost(
        "/sale/saleDialRemark/getDialRemarkList",
        {},
        data => {
          this.remarksOptionList = data.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 接口封装
    httpPost(url, data, callback, errback) {
      this.http
        .post(BASE_URL + url, data)
        .then(data => {
          return callback(data);
        })
        .catch(err => {
          return errback(err);
        });
    }
  },
  mounted() {
    this.information();
  },
  created() {
    this.managerCode = this.$route.query.managerCode
    this.merbercoss()
    this.optionList(); //拨打备注选项
    this.http
      .post(BASE_URL + "/checkUriPermission", [
        "/loan/accountTicket/changeTicketNumber"
      ])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction2 = true;
            } else {
              this.isJurisdiction2 = false;
            }
          }
        }
      })
      .catch(err => {});
    this.http
      .post(BASE_URL + "/checkUriPermission", ["/loan/account/change/vip"])
      .then(data => {
        if (data.code == "success") {
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.isJurisdiction3 = true;
            } else {
              this.isJurisdiction3 = false;
            }
          }
        }
      })
      .catch(err => {});
  }
};
</script>
<style lang="less" scoped>
#memberLeft {
  border: 1px solid #e7ecf1;
  .memberphoto {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      margin-top: 20px;
      border-radius: 50%;
    }
    p {
      line-height: 25px;
      margin: 15px 0;
    }
    .stre_evaluate {
      img {
        width: 20px;
        height: 20px;
        margin-top: 0;
      }
    }
  }
  .member_left_ul li {
    line-height: 50px;
    border-bottom: 1px solid #e7ecf1;
    // padding-left: 20px;
    span {
      margin-left: 20px;
    }
    .ivu-row {
      text-align: center;
    }
  }
  .member_left_ul li:last-child {
    border-bottom: 0;
  }
  .member_left_ul li:first-child {
    border-top: 1px solid #e7ecf1;
  }
}

#memberRight {
  padding: 0 20px;
  .basic {
    p {
      padding-left: 50px;
      span:first-child {
        line-height: 40px;
      }
    }
    .credit_prove {
      strong {
        display: block;
        margin-bottom: 10px;
      }
      img {
        width: 200px;
        vertical-align: top;
        margin-right: 20px;
      }
    }
  }
  .service_introduction {
    h3 {
      padding-left: 50px;
    }
  }
}

.vertical_bar {
  border-right: 1px solid #e7ecf1;
  span {
    margin-left: 0px !important;
  }
}

.ivu-tabs:after {
  padding-bottom: 130px;
}
</style>