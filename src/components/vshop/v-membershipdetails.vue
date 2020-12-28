<template>
<div class="contentcss">
<Row>
    <Col span="5">
    <div id="memberLeft">
        <div class="memberphoto">
            <img :src="require('../../image/moren.png')" alt="" >
            <p>{{informationlist.userPhone}}</p>
        </div>
        <ul class="member_left_ul">
          <li>
              <span class="w50 tr displayib">姓名:</span>
              <span>{{informationlist.userName}}</span>
          </li>
          <li>
              <span class="w50 tr displayib">实名:</span>
              <span v-if="informationlist.realInfo==1">{{informationlist.userName}} {{informationlist.idCard}}</span>
              <span v-if="informationlist.realInfo==0" class="member_type red1">未填写</span>
          </li>
          <li>
              <span class="w80 tr displayib">注册时间:</span>
              <span class="">{{informationlist.dataCreateTime}}</span>
          </li>
        </ul>
    </div>
    </Col>
    <Col span="18">
    <div id="memberRight">
        <Tabs :animated="false" @on-click="marketquery">
            <TabPane label="个人信息">
                <div class="informationlist clearfix" v-if="informationlist.loanPerfectInfo!=0">
                  <h3>
                    <span>{{informationlist.userName}}</span>
                    <span>{{informationlist.age}}</span>
                    <span>{{informationlist.adNameSecond}}</span>
                    <span>{{informationlist.idCard}}</span>
                  </h3>
                  <p v-if="informationlist.vshopUserSelectRes">
                    <span>贷款意向</span>
                    <span>{{informationlist2.loanAmount}}</span>
                    <span>贷款期限</span>
                    <span>{{informationlist2.loanTimeLimit}}</span>
                    <span>贷款用途</span>
                    <span>{{informationlist2.loanUse}}</span>
                    <span>申请/结算</span>
                    <span>{{informationlist.applyOrderCount}}/{{informationlist.settleCount}}</span>
                  </p>
                  <div class="left mr40" v-if="informationlist.vshopUserSelectRes">
                    <h3>基本信息</h3>
                    <ul class="essinformation">
                      <li v-for="item in EssentialList">
                        <span>{{item.educationTitle}}：</span>
                        <span>{{item.educationBackground}}</span>
                      </li>
                    </ul>
                    <h3>工作信息</h3>
                    <ul class="essinformation">
                      <li v-for="item in workList">
                        <span>{{item.educationTitle}}：</span>
                        <span>{{item.educationBackground}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="left" v-if="informationlist.vshopUserSelectRes">
                    <h3>补充信息</h3>
                    <ul class="essinformation">
                      <li v-for="item in supplementList">
                        <span>{{item.educationTitle}}：</span>
                        <span>{{item.educationBackground}}</span>
                      </li>
                    </ul>
                  </div>
                  
                </div>
                <ul class="essinformation">
                  <li>
                    <span>推荐人：{{informationlist.managerName}}</span> 
                  </li>
                  <li class="mt10">
                    <span>会员等级：</span> 
                    <Select v-model="membershipLevel" style="width:200px">
                      <Option v-for="item in membershipLevelList" :value="item.code" :key="item.code">{{ item.label }}</Option>
                    </Select>
                  </li>
                </ul>
                <p class="informationlist" v-if="informationlist.loanPerfectInfo==0">暂无数据</p>
                <div class="informationlist" >
                  <Button type="primary" class="mr20" @click="addPreservation">提交保存</Button>
                  <Button type="default" class="mr20" @click="goTolog">查看操作日志</Button>
                  <Button type="default" class="mr20" @click="ationreturn">返回</Button>
                </div>
            </TabPane>
            <TabPane label="申请记录">
              <membershipRecord></membershipRecord>
            </TabPane>
            <TabPane label="登录日志">
              <membershipLogin :managerCode = "managerCode"></membershipLogin>
            </TabPane>
        </Tabs>
    </div>
    </Col>
</Row>
</div>
</template>
<script>
import membershipRecord from './membership/membershipRecord'
import membershipLogin from './membership/membershipLogin'
import utils from '../../utils/utils';
export default {
  components: {
    membershipRecord,
    membershipLogin
  },
  data () {
    return {
      recommender:"",//推荐人
      membershipLevel:"",//会员等级
      membershipLevelList:[],//会员等级下拉
      informationlist: {},
      EssentialList:[], // 基本信息
      workList:[],//资产信息
      supplementList:[],//补充信息
      informationlist2: [],
      managerCode:""
    }
  },
  methods: {
    // 个人信息
    personalinformation () {
        this.http.post(BASE_URL + '/vshop/vshopLoanUser/getLoanUserDetail',{userCode:this.$route.query.userCode})
        .then((resp) => {
        if (resp.code == 'success') {
            let dataList = resp.data.vshopUserSelectRes
            this.informationlist = resp.data
            this.informationlist2 = resp.data.vshopUserSelectRes
            this.membershipLevelList = resp.data.vipBeans
            this.membershipLevel = resp.data.vipType
            Object.keys(dataList).forEach(v => {
              switch(v){
                case 'educationBackground':
                  this.EssentialList = [
                    {educationBackground: dataList['educationBackground'],educationTitle:'学历'},
                    {educationBackground: dataList['marriageStatus'],educationTitle:'婚姻状态'},
                  ]
                break;
                case 'jobType':
                  this.workList = [
                    {educationBackground: dataList['jobType'],educationTitle:'职业类型'},
                    {educationBackground: dataList['salaryType'],educationTitle:'工资发放形式'},
                    {educationBackground: dataList['monthlyIncome'],educationTitle:'月收入'},
                    {educationBackground: dataList['socialSecurity'],educationTitle:'公司代缴社保'},
                    {educationBackground: dataList['accumulationFund'],educationTitle:'公司代缴公积金'},
                  ]
                break;
                case 'personalCredit':
                  this.supplementList = [
                    {educationBackground: dataList['personalCredit'],educationTitle:'个人信用情况'},
                    {educationBackground: dataList['creditStatus'],educationTitle:'信用状况'},
                    {educationBackground: dataList['creditLimit'],educationTitle:'信用卡额度'},
                    {educationBackground: dataList['guaranteeSlip'],educationTitle:'寿险缴纳情况'},
                    {educationBackground: dataList['weilidaiStatus'],educationTitle:'微粒贷情况'},
                    {educationBackground: dataList['weilidaiLimit'],educationTitle:'微粒贷额度'},
                    {educationBackground: dataList['creditScore'],educationTitle:'芝麻信用分'},
                    {educationBackground: dataList['ownHouseStatus'],educationTitle:'房产情况'},
                    {educationBackground: dataList['houseAdNameSecond'],educationTitle:'所在地区'},
                    {educationBackground: dataList['ownerHouse'],educationTitle:'产权人'},
                    {educationBackground: dataList['houseStatus'],educationTitle:'房产状态'},
                    {educationBackground: dataList['houseIsPledge'],educationTitle:'是否抵押'},
                    {educationBackground: dataList['ownCarStatus'],educationTitle:'车产情况'},
                    {educationBackground: dataList['carStatus'],educationTitle:'车产状态'},
                    {educationBackground: dataList['carTime'],educationTitle:'购车时间'},
                    {educationBackground: dataList['carIsPledge'],educationTitle:'是否抵押'},
                  ]
                break;
              }
            });
        } else {
        }
        })
        .catch(() => {
        })
    },
    marketquery (name) {
    },
    // 查看操作日志
    goTolog(){
      this.$router.push({ path: './operationLog?operationType=vmembership&userCode=' + this.$route.query.userCode})
    },
    // 提交保存
    addPreservation(){
      let vipDesc
      this.membershipLevelList.forEach(v=>{
        if(v.code == this.membershipLevel){
          vipDesc = v.label
        }
      })
      console.log(vipDesc)
      this.$Modal.confirm({
          title: '温馨提示',
          content: '<p>确认提交保存吗？</p>',
          onOk: () => {
              this.http.post(BASE_URL+"/vshop/vshopLoanUser/updateLoanUser",{vipType:this.membershipLevel,vipDesc:vipDesc,userCode:this.$route.query.userCode}).then(data=>{
                if(data.code == 'success'){
                  this.$Message.info('提交成功');
                } else {
                  this.$Message.info(data.message);
                }
              }).catch(err=>{
                console.log(err)
                // this.$Message.info('删除失败！');
              })
              
          },
          onCancel: () => {
              // this.$Message.info('删除失败！');
          }
      });
      // recommender推荐人 membershipLevel 会员等级
    },
    // 返回
    ationreturn() {
      window.history.go(-1);
    },
  },
  mounted () {
    this.personalinformation()
    
  },
  created(){
    this.managerCode = this.$route.query.userCode
  }

}
</script>
<style lang="less" scoped>
#memberLeft{
    border: 1px solid #E7ECF1;
    .memberphoto{
        text-align: center;
        margin-bottom: 20px;
        img{
        width: 150px;
        margin-top: 20px;
        height: 150px;
        border-radius: 50%
        }
        p{
            line-height: 25px;
            margin: 15px 0
        }
    }
    .member_left_ul li{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        padding-left: 20px;
        span{
            margin-left: 10px
        }
    }
    .member_left_ul li:last-child{
        border-bottom: 0
    }
    .member_left_ul li:first-child{
        border-top: 1px solid #E7ECF1
    }
}
#memberRight{
    padding: 0 20px
}
.member_type{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    color: #fff;
    border-radius: 30px;
    text-align: center
}
.informationlist{
    padding: 20px 50px;
    h3{
        font-weight: 700;
        margin-bottom: 5px;
        
        span{
            margin-right: 10px
        }
    }
    .left{
        h3{
          padding-left: 70px;
        }
      }
    p{
        margin: 10px 0;
        span{
            margin-right: 10px
        }
    }
}

.essinformation{
    margin: 10px 0;
    li{
      line-height: 35px;
    }
    span{
        margin-right: 20px;
        display: inline-block;
        width: 150px;
        text-align: right
    }

}
.ivu-tabs .ivu-tabs-tabpane{
    padding-bottom:130px;
}
</style>
