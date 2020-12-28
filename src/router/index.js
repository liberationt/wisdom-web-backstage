
import HomePage from '@/components/homePage'
// import Ciunt from '@/components/ciunt'
import mberTab from '@/components/member/admintable'
import Login from '@/components/login'
import forgetpass from '@/components/forget-password'
// 站内信
import applicationHomePage from '@/components/application/application-homePage'
import applicationMail from '@/components/application/application-mail'
import applicationMailxin from '@/components/application/application-mailxin'
import applicationNewtype from '@/components/application/application-newtype'
import applicationNewtypexin from '@/components/application/application-newtypexin'
import applicationSendout from '@/components/application/application-sendout'
import applicationSendoutxin from '@/components/application/application-sendoutxin'
import applicationProposal from '@/components/application/application-proposal'
import applicationDetail from '@/components/application/application-details'
// 会员列表
import memberList from '@/components/member-management/memberList'
import memberDetail from '@/components/member-management/memberDetails'
// 基础配置
import versionManagement from '@/components/basic-configuration/version-management'
import pageConfigguration from '@/components/basic-configuration/page-configuration'
import broadcastBigimg from '@/components/basic-configuration/broadcast-bigimg'
import sharehua from '@/components/basic-configuration/share-hua' // 分享配置
import navigation from '@/components/basic-configuration/navigation'
import cardCenter from '@/components/basic-configuration/card-center'
import loansconfig from '@/components/basic-configuration/loans-configuration'
import addedit from '@/components/basic-configuration/add_edit'
import addloanproducts from '@/components/basic-configuration/add-loanproducts'
import editionh5 from '@/components/basic-configuration/addedition'
// 系统
import managementSet from '@/components/system/managementSet'
import managementGrade from '@/components/system/managementGrade'
import managementChannel from '@/components/system/managementChannel'
import paymentconfiguration from '@/components/system/paymentconfiguration'
import blackname from '@/components/system/blackname'
import managementChannelAdd from '@/components/system/managementChannel-add'
import managementLabel from '@/components/system/managementLabel'
import managementLabelAdd from '@/components/system/managementLabel-add'
import virtualData from '@/components/system/virtual-data'
import naughtyData from '@/components/system/naughty-data'
// 信贷员
import creditSetting from '@/components/creditOfficer/credit-setting'
import evaluationManagement from '@/components/creditOfficer/evaluation-management'
import evaluationReview from '@/components/creditOfficer/evaluation-review'
import evaluationDetails from '@/components/creditOfficer/evaluation-details'
import activityManagement from '@/components/creditOfficer/activity-management'// 活动管理
import auditActivities from '@/components/creditOfficer/audit-activities'// 活动审核
import creditValue from '@/components/creditOfficer/credit-value'// 用户身价设置
import valueSettingList from '@/components/creditOfficer/valueSettingList'// 用户身价设置列表
import specificStatus from '@/components/creditOfficer/specificStatus'// 特定用户身价设置
import creditMarketing from '@/components/creditOfficer/credit-marketing'// 营销设置
import creditNaughty from '@/components/creditOfficer/credit-naughty'// 淘单筛选设置
import rechargeList from '@/components/creditOfficer/recharge-list'// 充值设置列表
import foundationSetup from '@/components/creditOfficer/foundation-setup'// 充值设置(基础设置)
import specificusers from '@/components/creditOfficer/specificusers'  //新增 特定用户身价-基础身价

// 三期一批
import qualityOrder from '@/components/creditOfficer/quality-order'// quality-order 优质订单
import qualityOrders from '@/components/creditOfficer/quality-orders'// quality-order 优质订单
import channelManagementLi from '@/components/creditOfficer/channel-management'// 通道管理
import rejectionManagement from '@/components/creditOfficer/rejection-management' // 甩单管理
import rejectionAudit from '@/components/creditOfficer/rejection-audit' // 甩单审核
import messageList from '@/components/creditOfficer/message-list' // 留言列表
import rejectionDetails from '@/components/creditOfficer/rejection-details' // 甩单详情
import rejectionJournal from '@/components/creditOfficer/rejection-journal' // 操作日志
// 三期二批
import membershipInterests from '@/components/creditOfficer/membership-interests' // 会员权益
import addInterests from '@/components/creditOfficer/add-interests' // 添加权益
import exhibition from '@/components/creditOfficer/exhibition' // 展业工具
import addTemplate from '@/components/creditOfficer/add-template' // 添加模板
import thematicManagement from '@/components/creditOfficer/thematic-management' // 添加模板
import templateDetails from '@/components/creditOfficer/template-details' // 模板详情
import pushExamine from '@/components/creditOfficer/push-examine' // push审核  华赞
import push from '@/components/creditOfficer/push' // PUSH
import sendOutPush from '@/components/creditOfficer/sendOut-Push' // 发送PUSH页面
import returnAudited from '@/components/creditOfficer/return-audited' // 待审核退单
import cancellation from '@/components/creditOfficer/cancellation' // 退单详情
import cancellationDetails from '@/components/creditOfficer/cancellation-details'
// 四期 
import marketingActivities from '@/components/creditOfficer/marketing-activities' // 营销活动管理
import addRegistration from '@/components/creditOfficer/add-registration' // 添加营销活动
import auditRegistration from '@/components/creditOfficer/audit-registration' // 审核注册入驻
import marketingAudit from '@/components/creditOfficer/marketing-audit' // 营销活动审核
import addInvitation from '@/components/creditOfficer/add-invitation' // 添加邀请好友注册
import auditInvitation from '@/components/creditOfficer/audit-invitation' // 审核邀请好友注册
import addInvitationrecharge from '@/components/creditOfficer/add-invitationrecharge' // 添加邀请充值
import auditInvitationrecharge from '@/components/creditOfficer/audit-invitationrecharge' // 审核邀请充值

//七期
import activeManagement from '@/components/creditOfficer/active-management' //活动聚合页

// 五期 新增报表
import hzconversion from '@/components/reports/hzconversion'
import hzapplicationMarket from '@/components/reports/hzapplication-market'
import hzinformationDelivery from '@/components/reports/hzinformation-delivery'
import hzdiversion from '@/components/reports/hzdiversion'
import qdxconversion from '@/components/reports/qdxconversion'
import qdxapplicationMarket from '@/components/reports/qdxapplication-market'
import qdxinformationDelivery from '@/components/reports/qdxinformation-delivery'
import qdxdiversion from '@/components/reports/qdxdiversion'
import orderSpeed from '@/components/reports/order-speed'
import rechargeReport from '@/components/reports/recharge-report'
import incomeStatement from '@/components/reports/income-statement'
import marketingReport from '@/components/reports/marketing-report'
import spendReport from '@/components/reports/spend-report' 
import registrationConversion from '@/components/reports/registration-conversion' 
import zambiaTransformation from '@/components/reports/zambia-transformation' 
import memberTransformation from '@/components/reports/member-transformation' 

// 五期运营后台新增 
import customerManagement from '@/components/fiveStageDemand/customer-management'
import uploadRecord from '@/components/fiveStageDemand/upload-record'
import alreadyMemberlist from '@/components/fiveStageDemand/already-memberlist'
import seatMemberlist from '@/components/fiveStageDemand/seat-memberlist'
import customerDetails from '@/components/fiveStageDemand/customer-details'
import tweetsList from '@/components/fiveStageDemand/tweets-list'
import newTweets from '@/components/fiveStageDemand/new-tweets'
import cardManagement from '@/components/fiveStageDemand/card-management'
import couponSettings from '@/components/fiveStageDemand/coupon-settings'
import repaidCoupons from '@/components/fiveStageDemand/repaid-coupons'
import auditCoupons from '@/components/fiveStageDemand/audit-coupons'

// 订单列表
import orderList from '@/components/creditOfficer/order-list'
import detailsConsultation from '@/components/creditOfficer/details-consultation'
import operationLog from '@/components/creditOfficer/operation-log'
import detailsRobbing from '@/components/creditOfficer/details-robbing'
import detailsComplaint from '@/components/creditOfficer/details-complaint'
import orderlog from '@/components/creditOfficer/order-log'
import consultingSales from '@/components/creditOfficer/consulting-sales'
import consultingSalesperson from '@/components/creditOfficer/consulting-salesperson'
import consultSalesdetails from '@/components/creditOfficer/consult-salesdetails'
import salesDetails from '@/components/creditOfficer/sales-details'
// 信贷员管理
import operate from '@/components/creditOfficer/operate' // 运营负责人
import creditManagement from '@/components/creditOfficer/credit-management' // 信贷员管理
import addMechanism from '@/components/creditOfficer/add-mechanism'
import revisionReview from '@/components/creditOfficer/revision-review'
import toExamine from '@/components/creditOfficer/to-examine'
import addExamine from '@/components/creditOfficer/add-examine'
import creditInformation from '@/components/creditOfficer/credit-information'
import addCreditOfficer from '@/components/creditOfficer/add-creditOfficer'
import salesQuery from '@/components/creditOfficer/sales-query'
import administration from '@/components/creditOfficer/active-administration'
import addAdministration from '@/components/creditOfficer/add-administration'
import serviceIntroduction from '@/components/creditOfficer/service-introduction'
import admissionAudit from '@/components/creditOfficer/admission-audit' // 入驻待审核
import dataReview from '@/components/creditOfficer/data-review' // 资料待审核
import withoutInformation from '@/components/creditOfficer/without-information' // 注册无资料
import creditOfficer from '@/components/creditOfficer/credit-officer' // 信贷员列表
import creditInstitutions from '@/components/creditOfficer/credit-institutions' // 信贷机构
// 财务
import presentSetting from '@/components/finance/present-setting'
import presentRecord from '@/components/finance/present-record'
import refundManager from '@/components/finance/refund-manager' // 退款
import costReport from '@/components/finance/cost-report' // 运营成本报表
import rechargeRecord from '@/components/finance/recharge-record' // 充值记录
// 系统
import personnelManagement from '@/components/department/personnel-management'

// 统一渠道 
import supplierList from '@/components/unifiedChannel/supplier-list'
import channelManagementunid from '@/components/unifiedChannel/channel-management'
import channelReport from '@/components/unifiedChannel/channel-report'
import dailyList from '@/components/unifiedChannel/daily-list'
import rangeConfiguration from '@/components/unifiedChannel/range-configuration'
import monthlyReport from '@/components/unifiedChannel/monthly-report'
import statementRemittance from '@/components/unifiedChannel/statement-remittance'
import channelList from '@/components/unifiedChannel/add-management'
import managerChannelList from '@/components/unifiedChannel/manager-channelList'
// 报表
import operatingReport from '@/components/unifiedChannel/operating-report'
import superProduct from '@/components/unifiedChannel/super-Product'
import individual from '@/components/unifiedChannel/individual'

// 大网钱 
import registrationList from '@/components/bigMoney/registration-list'
import loanPush from '@/components/bigMoney/loan-push'
import pushDetail from '@/components/bigMoney/push-detail'
import uploadReports from '@/components/bigMoney/upload-reports'
import loanTest from '@/components/bigMoney/loan-test'
import peaceBenefit from '@/components/bigMoney/peace-benefit' // 平安普惠 详情
import insuranceSetting from '@/components/bigMoney/insurance-setting' // 坤玄
import insuranceReport from '@/components/bigMoney/insurance-report' // 平安普惠详情
import pinglife from '@/components/bigMoney/pinglife' // 平安人寿详情
import channelManagement from '@/components/bigMoney/channel-management' // 渠道
import channelLabelsz from '@/components/bigMoney/channel-labelsz'
import channelCategory from '@/components/bigMoney/channel-category'
import partyManagement from '@/components/bigMoney/party-management'
import editorsFarty from '@/components/bigMoney/editors-farty'
import blacklistManagement from '@/components/bigMoney/blacklist-management'
import directWarning from '@/components/bigMoney/direct-warning'
import manualPush from '@/components/bigMoney/manual-push'
import supplierManagement from '@/components/bigMoney/supplier-management'
import channelPromotion from '@/components/bigMoney/channel-promotion' // 渠道列表
import poslist from '@/components/bigMoney/poslist'
import voiceCalls from '@/components/bigMoney/voice-calls'//语音外呼列表
import outgoingStatistics from '@/components/bigMoney/outgoing-statistics'//语音外呼统计
import voiceServerManagement from '@/components/bigMoney/voice-ServerManagement'//语音服务器管理
import progressManagement from '@/components/bigMoney/progress-management'//供应商类别进度管理
import pingInsurance from '@/components/bigMoney/ping-insurance'//平安寿险
import voiceCallback from '@/components/bigMoney/voice-callback'//语音回调配置
import callbackDetails from '@/components/bigMoney/callback-details'//语音回调配置详情

// 销售设置
import salesStatistics from '@/components/sales-management/sales-statistics' // 销售统计
import salesNamelist from '@/components/sales-management/sales-namelist' // 待分配名单
import salesAllocatedname from '@/components/sales-management/sales-allocatedname' // 已分配名单
import newsalesQuery from '@/components/sales-management/sales-query'
import salesQuerymanager from '@/components/sales-management/sales-querymanager'
import dialingRecord from '@/components/sales-management/dialing-record'
import dialingRecordmanager from '@/components/sales-management/dialing-recordmanager'
import allocationProcessed from '@/components/sales-management/allocation-processed' // 分配待处理销售员
import allocationProcessedmanager from '@/components/sales-management/allocation-processedmanager'// 分配待处理销售经理
import listAudit from '@/components/sales-management/list-audit'
import auditedInvalid from '@/components/sales-management/audited-invalid'// 待确认无效名单
import confirmInvalid from '@/components/sales-management/confirm-invalid' // 已确认无效名单
import salesRepresentative from '@/components/sales-management/sales-representative' // 销售统计销售代表可见
import departmentManagement from '@/components/sales-management/departmental-management' // 部门人员管理
import addPersonnel from '@/components/sales-management/add-personnel' // 添加人员
import callFailurerecord from '@/components/sales-management/call-failurerecord' // 审核失败通话记录
import addSeats from '@/components/sales-management/add-seats'

// 枪单侠4期
import batchAdjustment from '@/components/member-management/batchAdjustment' // 批量调整
import electricityBill from '@/components/member-management/electricityBill' // 电审单子
import companyInformation from '@/components/member-management/companyInformation' // 公司信息管理
import memberRecharge from '@/components/member-management/memberRecharge' // 会员充值设置
import lookingCustomers from '@/components/creditOfficer/looking-customers' // 找客户筛选
import salesRecharge from '@/components/sales-management/sales-recharge' // 销售充值记录

// vshop 分销
import vMembership from '@/components/vshop/v-membership'
import vMembershipdetails from '@/components/vshop/v-membershipdetails'
import vCreaditofficer from '@/components/vshop/v-creaditofficer'
import vCreaditinformation from '@/components/vshop/v-creaditInformation'
import vMembergrade from '@/components/vshop/v-membergrade'
import vApplication from '@/components/vshop/v-application'
import vCapitalrecord from '@/components/vshop/v-capitalrecord'
import vCommissions from '@/components/vshop/v-commissions'
import vlookRecord from '@/components/vshop/v-lookrecord'
import vShopadministration from '@/components/vshop/v-shopadministration'
import vShodetails from '@/components/vshop/v-shopdetails'
import vWithdrawalsRecord from '@/components/vshop/v-withdrawalsRecord'
import cashSetup from '@/components/vshop/withdrawalsRecord/cash-setup'
import vProductlist from '@/components/vshop/v-productlist'
import vAddproduct from '@/components/vshop/v-addproduct'
import vDistribution from '@/components/vshop/v-distribution'
import vConfiguration from '@/components/vshop/v-configuration'
import vConfigurationList from '@/components/vshop/v-configurationList'
import vCreditmanagement from '@/components/vshop/v-creditmanagement'
import vAddtools from '@/components/vshop/v-addtools'
import vCashflow from '@/components/vshop/v-cashflow'
import vCashupload from '@/components/vshop/v-cashupload'
import vCodeaudit from '@/components/vshop/v-codeaudit'


// 积分管理
import IntegralManagement from '@/components/integral/Integral-management'
import addIntegral from '@/components/integral/add-Integral'
import dailyMap from '@/components/integral/daily-map'

// 7期新加内容
import memberSet from '@/components/member/member-set'
import membershipSettings from '@/components/member-management/membership-settings'
import vchangeManagement from '@/components/member-management/vchange-management'
import rechargeManagement from '@/components/creditOfficer/recharge-management'// 充值活动管理
import rechargeAudit from '@/components/creditOfficer/recharge-audit'// 充值活动管理-审核
import premiumzd from '@/components/creditOfficer/premiumzd'// 充值赠送赞豆
import rechargeVoucher from '@/components/creditOfficer/recharge-voucher'// 充值赠送抢单劵
import membership from '@/components/creditOfficer/membership'// 充值会员赠送抢单劵
import rechargeableMembers from '@/components/creditOfficer/rechargeable-members'// 充值赠送会员
import sendCoupons from '@/components/creditOfficer/sendCoupons'// 充值赠送优惠券
import ticketManage from '@/components/creditOfficer/ticketManage'// 抢单劵管理
import singleTicket from '@/components/creditOfficer/single-ticket'// 抢单劵设置
import returnStatement from '@/components/creditOfficer/return-statement' // 退单报表


// import mapState from '@/vuex/store'
// import digui from '@/components/digui'
// alert(mapState.state.leftlist)
// alert(mapState.state.count)

// for (let i = 0; i < leftlist.length; i++) {
//   console.log(leftlist[i].component)
//   leftlist[i].component = leftlist[i].component.replace(/\"/g, '')
// }
// console.log(leftlist)
let routes = [
  {
    path: '/',
    component: Login,
    names: 'Login',
    hidden: true
  },
  {
    path: '/homePage',
    component: HomePage,
    names: 'Login',
    hidden: true,
    meta: { auth: true }
  },
  // vshop 分销
  {
    path: '/homePage',
    component: HomePage,
    names: 'vshop',
    iconCls: 'stats-bars',
    children: [
      {path: '/vMembership', component: vMembership, names: '会员列表', meta: {auth: true}},
      {path: '/vMemberdetails', component: vMembershipdetails, names: '会员列表详情', meta: {auth: true}},
      {path: '/vCreaditofficer', component: vCreaditofficer, names: '信贷员列表', meta: {auth: true}},
      {path: '/vCreaditinformation', component: vCreaditinformation, names: '信贷员详情', meta: {auth: true}},
      {path: '/vMembergrade', component: vMembergrade, names: '会员等级', meta: {auth: true}},
      {path: '/vApplication', component: vApplication, names: '申请记录', meta: {auth: true}},
      {path: '/vShopadministration', component: vShopadministration, names: '店铺管理', meta: {auth: true}},
      {path: '/vShodetails', component: vShodetails, names: '店铺详情', meta: {auth: true}},
      {path: '/vCapitalrecord', component: vCapitalrecord, names: '资金记录', meta: {auth: true}},
      {path: '/vCommissions', component: vCommissions, names: '佣金管理', meta: {auth: true}},
      {path: '/vlookRecord', component: vlookRecord, names: '上传记录', meta: {auth: true}},
      {path: '/vWithdrawalsRecord', component: vWithdrawalsRecord, names: '提现记录', meta: {auth: true}},
      {path: '/cashSetup', component: cashSetup, names: '提现设置', meta: {auth: true}},
      {path: '/vProductlist', component: vProductlist, names: '产品列表', meta: {auth: true}},
      {path: '/vAddproduct', component: vAddproduct, names: '添加/编辑产品', meta: {auth: true}},
      {path: '/vDistribution', component: vDistribution, names: '分销设置', meta: {auth: true}},
      {path: '/vConfiguration', component: vConfiguration, names: '页面配置', meta: {auth: true}},
      {path: '/vConfigurationList', component: vConfigurationList, names: '配置列表', meta: {auth: true}},
      {path: '/vCreditmanagement', component: vCreditmanagement, names: '抢单侠信贷工具管理', meta: {auth: true}},
      {path: '/vAddtools', component: vAddtools, names: '抢单侠添加/编辑工具', meta: {auth: true}},
      {path: '/vCashflow', component: vCashflow, names: '上传现金流水', meta: {auth: true}},
      {path: '/vCashupload', component: vCashupload, names: '现金上传记录', meta: {auth: true}},
      {path: '/vCodeaudit', component: vCodeaudit, names: '二维码审核', meta: {auth: true}},
      
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '基础配置',
    iconCls: 'ios-home', // 图标样式class
    children: [
      {path: '/applicationHomePage', component: applicationHomePage, names: '应用首页', hidden: true, meta: { auth: true }},
      {path: '/forgetpass', component: forgetpass, names: '修改密码', hidden: true, meta: { auth: true }},
      {path: '/versionManagement', component: versionManagement, names: '版本管理', meta: { auth: true }},
      {path: '/cardCenter', component: cardCenter, names: '信用卡中心', meta: { auth: true }},
      {path: '/pageConfigguration', component: pageConfigguration, names: '版本页面配置', meta: { auth: true }},
      {path: '/navigation', component: navigation, names: '首页导航', hidden: true, meta: { auth: true }},
      {path: '/bigimg', component: broadcastBigimg, names: 'bigimg', hidden: true, meta: { auth: true }},
      {path: '/share', component: sharehua, names: '分享配置', hidden: true, meta: { auth: true }},
      {path: '/loansconfig', component: loansconfig, names: '贷款产品配置1', meta: { auth: true }},
      {path: '/editionh5', component: editionh5, names: 'h5页面配置', meta: { auth: true }},
      {path: '/addloanproducts', component: addloanproducts, names: '添加贷款产品配置', meta: { auth: true }},
      {path: '/addedit', component: addedit, names: '添加编辑', meta: { auth: true }},
      {path: '/mberTab1', component: mberTab, names: '信用卡中心', meta: { auth: true }},
      {path: '/mberTab2', component: mberTab, names: '贷款产品配置', meta: { auth: true }},
      {path: '/mberTab3', component: mberTab, names: '分销产品配置', meta: { auth: true }},
      {path: '/mberTab4', component: mberTab, names: '渠道配置', meta: { auth: true }},
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '会员管理',
    iconCls: 'ios-paw',
    children: [
      {
        path: '/memberList',
        component: memberList,
        names: '会员列表',
        children: [
          {path: '/applicationHomePage', component: applicationHomePage, names: '应用首页', hidden: true, meta: { auth: true }},
          {path: '/versionManagement', component: versionManagement, names: '基础配置', hidden: true, meta: { auth: true }},
          {path: '/pageConfigguration', component: pageConfigguration, names: '版本页面配置', hidden: true, meta: { auth: true }},
          {path: '/bigimg', component: broadcastBigimg, names: 'bigimg', hidden: true, meta: { auth: true }},
          {path: '/mberTab', component: mberTab, names: '页面配置', meta: { auth: true }},
          {path: '/mberTab1', component: mberTab, names: '信用卡中心', meta: { auth: true }},
          {path: '/mberTab2', component: mberTab, names: '贷款产品配置', meta: { auth: true }},
          {path: '/mberTab3', component: mberTab, names: '分销产品配置', meta: { auth: true }},
          {path: '/mberTab4', component: mberTab, names: '渠道配置', meta: { auth: true }}
        ]
      },
      {path: '/memberDetail', component: memberDetail, names: '列表详情', hidden: true, meta: { auth: true }},
      {path: '/batchAdjustment', component: batchAdjustment, names: '批量调整', hidden: true, meta: { auth: true }},
      {path: '/electricityBill', component: electricityBill, names: '电审单子', hidden: true, meta: { auth: true }},
      {path: '/companyInformation', component: companyInformation, names: '公司信息管理', hidden: true, meta: { auth: true }},
      {path: '/memberRecharge', component: memberRecharge, names: '会员充值设置', hidden: true, meta: { auth: true }},
      {path: '/lookingCustomers', component: lookingCustomers, names: '找客户筛选', meta: {auth: true}},
      {path: '/salesRecharge', component: salesRecharge, names: '销售充值记录', meta: {auth: true}},
      {path: '/memberSet', component: memberSet, names: '会员基本设置', meta: {auth: true}},
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '信贷管理',
    iconCls: 'ios-paw',
    children: [
      {path: '/mberTab6', component: mberTab, names: '信贷员列表', meta: { auth: true }},
      {path: '/mberTab6', component: mberTab, names: '信贷机构列表', meta: { auth: true }},
      {path: '/mberTab6', component: mberTab, names: '订单列表', meta: { auth: true }},
      {path: '/mberTab6', component: mberTab, names: '评价管理', meta: { auth: true }}
    ]
  },
  // 销售设置
  {
    path: '/homePage',
    component: HomePage,
    names: '销售设置',
    iconCls: 'ios-paw',
    children: [
      {path: '/salesNamelist', component: salesNamelist, names: '名单待分配', meta: { auth: true }},
      {path: '/salesAllocatedname', component: salesAllocatedname, names: '已分配名单', meta: { auth: true }},
      {path: '/newsalesQuery', component: newsalesQuery, names: '销售查询-销售员', meta: { auth: true }},
      {path: '/salesQuerymanager', component: salesQuerymanager, names: '销售查询-经理', meta: { auth: true }},
      {path: '/dialingRecord', component: dialingRecord, names: '拨打记录-拨打记录', meta: { auth: true }},
      {path: '/dialingRecordmanager', component: dialingRecordmanager, names: '拨打记录-经理', meta: { auth: true }},
      {path: '/allocationProcessed', component: allocationProcessed, names: '分配待处理', meta: { auth: true }},
      {path: '/allocationProcessedmanager', component: allocationProcessedmanager, names: '分配待处理-经理', meta: { auth: true }},
      {path: '/salesStatistics', component: salesStatistics, names: '销售统计', meta: { auth: true }},
      {path: '/auditedInvalid', component: auditedInvalid, names: '待审核无效名单', meta: { auth: true }},
      {path: '/listAudit', component: listAudit, names: '审核详情', meta: { auth: true }},
      {path: '/confirmInvalid', component: confirmInvalid, names: '已确认无效名单', meta: { auth: true }},
      {path: '/salesRepresentative', component: salesRepresentative, names: '销售代表可见', meta: {auth: true}},
      {path: '/departmentManagement', component: departmentManagement, names: '部门人员管理', meta: {auth: true}},
      {path: '/addPersonnel', component: addPersonnel, names: '添加/编辑人员', meta: {tuth: true}},
      {path: '/callFailurerecord', component: callFailurerecord, names: '审核失败通话记录', meta: {tuth: true}},
      {path: '/addSeats', component: addSeats, names: '添加坐席', meta: {tuth: true}}
    ]
  },
  // 甩单
  {
    path: '/homePage',
    component: HomePage,
    names: '甩单',
    iconCls: 'stats-bars',
    children: [
      {path: '/rejectionManagement', component: rejectionManagement, names: '甩单管理', meta: {auth: true}},
      {path: '/rejectionAudit', component: rejectionAudit, names: '甩单审核', meta: {auth: true}},
      {path: '/messageList', component: messageList, names: '留言列表', meta: {auth: true}},
      {path: '/rejectionDetails', component: rejectionDetails, names: '甩单详情', meta: {auth: true}},
      {path: '/rejectionJournal', component: rejectionJournal, names: '操作日志', meta: {auth: true}},
      {path: '/membershipInterests', component: membershipInterests, names: '会员权益', meta: {auth: true}},
      {path: '/addInterests', component: addInterests, names: '会员权益', meta: {auth: true}},
      {path: '/exhibition', component: exhibition, names: '展业工具', meta: {auth: true}},
      {path: '/addTemplate', component: addTemplate, names: '添加模板', meta: {auth: true}},
      {path: '/thematicManagement', component: thematicManagement, names: '主题管理', meta: {auth: true}},
      {path: '/templateDetails', component: templateDetails, names: '模板详情', meta: {auth: true}},
      {path: '/pushExamine', component: pushExamine, names: 'PUSH审核', meta: {auth: true}},
      {path: '/push', component: push, names: 'PUSH审核', meta: {auth: true}},
      {path: '/sendOutPush', component: sendOutPush, names: '发送push', meta: {auth: true}},
      {path: '/returnAudited', component: returnAudited, names: '待审核退单', meta: {auth: true}},
      {path: '/cancellation', component: cancellation, names: '退单详情', meta: {auth: true}},
      {path: '/cancellationDetails', component: cancellationDetails, names: '待审核退单详情', meta: {auth: true}}
    ]
  },
  // 营销活动
  {
    path: '/homePage',
    component: HomePage,
    names: '营销活动',
    iconCls: 'stats-bars',
    children: [
      {path: '/marketingActivities', component: marketingActivities, names: '营销活动审核', meta: {auth: true}},
      {path: '/addRegistration', component: addRegistration, names: '添加邀请注册', meta: {auth: true}},
      {path: '/auditRegistration', component: auditRegistration, names: '审核注册入驻', meta: {auth: true}},
      {path: '/marketingAudit', component: marketingAudit, names: '营销活动审核', meta: {auth: true}},
      {path: '/addInvitation', component: addInvitation, names: '添加邀请好友注册', meta: {auth: true}},
      {path: '/auditInvitation', component: auditInvitation, names: '审核邀请好友注册', meta: {auth: true}},
      {path: '/addInvitationrecharge', component: addInvitationrecharge, names: '添加邀请充值', meta: {auth: true}},
      {path: '/auditInvitationrecharge', component: auditInvitationrecharge, names: '审核邀请充值', meta: {auth: true}},
      {path: '/activeManagement', component: activeManagement, names: '活动聚合页', meta: {auth: true}},
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '消息管理',
    iconCls: 'stats-bars',
    children: [
      {path: '/applicationMail', component: applicationMail, names: '站内信', meta: { auth: true }},
      {path: '/applicationMailxin', component: applicationMailxin, names: '站内信', meta: { auth: true }},
      {path: '/applicationNewtype', component: applicationNewtype, names: '站内信消息类型', hidden: true, meta: { auth: true }},
      {path: '/applicationNewtypexin', component: applicationNewtypexin, names: '站内信消息类型', hidden: true, meta: { auth: true }},
      {path: '/applicationSendout', component: applicationSendout, names: '发送站内信', hidden: true, meta: { auth: true }},
      {path: '/applicationSendoutxin', component: applicationSendoutxin, names: '发送站内信', hidden: true, meta: { auth: true }},
      {path: '/applicationProposal', component: applicationProposal, names: '建议反馈', meta: { auth: true }},
      {path: '/applicationDetail', component: applicationDetail, names: '查看详情', hidden: true, meta: { auth: true }}
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '系统',
    iconCls: 'stats-bars',
    children: [
      {path: '/managementSet', component: managementSet, names: '风控配置', meta: { auth: true }}, // 风控
      {path: '/managementGrade', component: managementGrade, names: '配置风控等级', hidden: true, meta: { auth: true }},
      {path: '/paymentconfiguration', component: paymentconfiguration, names: '支付配置', meta: { auth: true }},
      {path: '/blackname', component: blackname, names: '黑名单管理', meta: { auth: true }},
      {path: '/managementChannel', component: managementChannel, names: '渠道配置', meta: { auth: true }},
      {path: '/managementChannelAdd', component: managementChannelAdd, names: '添加编辑渠道', hidden: true, meta: { auth: true }},
      {path: '/managementLabel', component: managementLabel, names: '渠道标签管理', hidden: true, meta: { auth: true }},
      {path: '/managementLabelAdd', component: managementLabelAdd, names: '添加编辑标签', hidden: true, meta: { auth: true }},
      {path: '/personnelManagement', component: personnelManagement, names: '部门人员管理', hidden: true, meta: { auth: true }},
      {path: '/virtualData', component: virtualData, names: '虚拟数据', hidden: true, meta: { auth: true }},
      {path: '/naughtyData', component: naughtyData, names: '淘单虚拟数据操作', hidden: true, meta: { auth: true }}
    ]
  },
  // 新增报表
  {
    path: '/homePage',
    component: HomePage,
    names: '报表',
    iconCls: 'stats-bars',
    children: [
      {path: '/hzconversion', component: hzconversion, names: '华赞渠道转化率报表', meta: { auth: true }},
      {path: '/hzapplicationMarket', component: hzapplicationMarket, names: '华赞应用市场', meta: { auth: true }},
      {path: '/hzinformationDelivery', component: hzinformationDelivery, names: '华赞信息流投放', meta: { auth: true }},
      {path: '/hzdiversion', component: hzdiversion, names: '华赞导流', meta: { auth: true }},
      {path: '/qdxconversion', component: qdxconversion, names: '抢单侠渠道转化率报表', meta: { auth: true }},
      {path: '/qdxapplicationMarket', component: qdxapplicationMarket, names: '抢单侠应用市场', meta: { auth: true }},
      {path: '/qdxinformationDelivery', component: qdxinformationDelivery, names: '抢单侠信息流投放', meta: { auth: true }},
      {path: '/qdxdiversion', component: qdxdiversion, names: '抢单侠导流', meta: { auth: true }},
      {path: '/registrationConversion', component: registrationConversion, names: '注册转化率报表', meta: { auth: true }},
      {path: '/orderSpeed', component: orderSpeed, names: '订单消化速度', meta: { auth: true }},
      {path: '/rechargeReport', component: rechargeReport, names: '充值报表', meta: { auth: true }},
      {path: '/zambiaTransformation', component: zambiaTransformation, names: '充值赞豆转化率报表', meta: { auth: true }},
      {path: '/memberTransformation', component: memberTransformation, names: '充值会员转化率报表', meta: { auth: true }},
      {path: '/incomeStatement', component: incomeStatement, names: '收入报表', meta: { auth: true }},
      {path: '/marketingReport', component: marketingReport, names: '抢单销售报表', meta: { auth: true }},
      {path: '/spendReport', component: spendReport, names: '成本报表', meta: { auth: true }}
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '渠道',
    iconCls: 'stats-bars',
    children: [
      {path: '/supplierList', component: supplierList, names: '供应商列表', hidden: true, meta: { auth: true }}, // 
      {path: '/channelManagementunid', component: channelManagementunid, names: '渠道管理', hidden: true, meta: { auth: true }}, // 
      {path: '/channelReport', component: channelReport, names: '渠道报表', hidden: true, meta: { auth: true }}, // 
      {path: '/dailyList', component: dailyList, names: '渠道日报表', hidden: true, meta: { auth: true }}, // 
      {path: '/rangeConfiguration', component: rangeConfiguration, names: '范围值配置', hidden: true, meta: { auth: true }}, // 
      {path: '/monthlyReport', component: monthlyReport, names: '渠道月报表', hidden: true, meta: { auth: true }}, // 
      {path: '/statementRemittance', component: statementRemittance, names: '渠道报表汇总', hidden: true, meta: { auth: true }}, // 
      {path: '/operatingReport', component: operatingReport, names: '运营报表', hidden: true, meta: {auth: true}}, //
      {path: '/superProduct', component: superProduct, names: '代超产品', hidden: true, meta: {auth: true}}, //
      {path: '/individual', component: individual, names: '个人信息页', hidden: true, meta: {auth: true}}, //
      {path: '/channelList', component: channelList, names: '渠道管理(新增)', hidden: true, meta: { auth: true }}, // 
      {path: '/managerChannelList', component: managerChannelList, names: '渠道管理(新增-管理员)', hidden: true, meta: { auth: true }}, // 
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '信贷管理',
    iconCls: 'stats-bars',
    children: [
      {path: '/creditSetting', component: creditSetting, names: '信贷设置', meta: { auth: true }},
      {path: '/evaluationManagement', component: evaluationManagement, names: '评价管理', meta: { auth: true }},
      {path: '/evaluationReview', component: evaluationReview, names: '审核', hidden: true, meta: { auth: true }},
      {path: '/evaluationDetails', component: evaluationDetails, names: '审核详情', hidden: true, meta: { auth: true }},
      {path: '/orderList', component: orderList, names: '订单列表', meta: { auth: true }},
      {path: '/detailsConsultation', component: detailsConsultation, names: '咨询详情', hidden: true, meta: { auth: true }},
      {path: '/detailsRobbing', component: detailsRobbing, names: '抢单详情', hidden: true, meta: { auth: true }},
      {path: '/detailsComplaint', component: detailsComplaint, names: '申诉详情', hidden: true, meta: { auth: true }},
      {path: '/operationLog', component: operationLog, names: '操作日志', hidden: true, meta: { auth: true }},
      {path: '/orderlog', component: orderlog, names: '订单操作日志', hidden: true, meta: { auth: true }},
      {path: '/creditManagement', component: creditManagement, names: '信贷员管理', meta: { auth: true }},
      {path: '/addMechanism', component: addMechanism, names: '添加信贷机构', hidden: true, meta: { auth: true }},
      {path: '/revisionReview', component: revisionReview, names: '资料修改待审核详情', hidden: true, meta: { auth: true }},
      {path: '/toExamine', component: toExamine, names: '管理产品', hidden: true, meta: { auth: true }},
      {path: '/addExamine', component: addExamine, names: '添加/编辑产品', hidden: true, meta: { auth: true }},
      {path: '/creditInformation', component: creditInformation, names: '信贷员信息', hidden: true, meta: { auth: true }},
      {path: '/addCreditOfficer', component: addCreditOfficer, names: '添加/编辑信贷员', hidden: true, meta: { auth: true }},
      {path: '/salesQuery', component: salesQuery, names: '销售查询', hidden: true, meta: { auth: true }},
      {path: '/administration', component: administration, names: '活动管理', hidden: true, meta: { auth: true }},
      {path: '/addAdministration', component: addAdministration, names: '活动管理', hidden: true, meta: { auth: true }},
      {path: '/activityManagement', component: activityManagement, names: '活动管理', meta: { auth: true }},
      {path: '/auditActivities', component: auditActivities, names: '审核活动', meta: { auth: true }},
      {path: '/serviceIntroduction', component: serviceIntroduction, names: '服务介绍模板', meta: { auth: true }},
      {path: '/creditValue', component: creditValue, names: '用户身价设置', meta: { auth: true }},
      {path: '/valueSettingList', component: valueSettingList, names: '用户身价设置列表', meta: { auth: true }},
      {path: '/specificStatus', component: specificStatus, names: '特定用户身价设置', meta: { auth: true }},
      {path: '/creditMarketing', component: creditMarketing, names: '营销设置', meta: { auth: true }},
      {path: '/creditNaughty', component: creditNaughty, names: '淘单筛选设置', meta: { auth: true }},
      {path: '/qualityOrder', component: qualityOrder, names: '优质订单', meta: { auth: true }},
      {path: '/qualityOrders', component: qualityOrders, names: '优质订单', meta: { auth: true }},
      {path: '/channelManagementLi', component: channelManagementLi, names: '通道管理', meta: { auth: true }},
      {path: '/admissionAudit', component: admissionAudit, names: '入驻待审核', meta: {auth: true}},
      {path: '/dataReview', component: dataReview, names: '资料待审核', meta: {auth: true}},
      {path: '/withoutInformation', component: withoutInformation, names: '注册无资料', meta: {auth: true}},
      {path: '/creditOfficer', component: creditOfficer, names: '信贷员列表', meta: {auth: true}},
      {path: '/creditInstitutions', component: creditInstitutions, names: '信贷机构', meta: {auth: true}},
      {path: '/operate', component: operate, names: '运营负责人', meta: {auth: true}},
      {path: '/consultingSales', component: consultingSales, names: '咨询订单-销售版-经理', meta: {auth: true}},
      {path: '/consultingSalesperson', component: consultingSalesperson, names: '咨询订单-销售版-销售员', meta: {auth: true}},
      {path: '/consultSalesdetails', component: consultSalesdetails, names: '咨询订单详情-销售版', meta: {auth: true}},
      {path: '/salesDetails', component: salesDetails, names: '抢单订单详情-销售版', meta: {auth: true}},
      {path: '/rejectionManagement', component: rejectionManagement, names: '甩单管理', meta: {auth: true}},
      {path: '/rejectionAudit', component: rejectionAudit, names: '甩单审核', meta: {auth: true}},
      {path: '/messageList', component: messageList, names: '留言列表', meta: {auth: true}},
      {path: '/rejectionDetails', component: rejectionDetails, names: '甩单详情', meta: {auth: true}},
      {path: '/rejectionJournal', component: rejectionJournal, names: '操作日志', meta: {auth: true}},
      {path: '/rechargeList', component: rechargeList, names: '充值设置列表', meta: {auth: true}},
      {path: '/foundationSetup', component: foundationSetup, names: '充值设置(基础设置)', meta: {auth: true}},
      {path: '/specificusers', component: specificusers, names: '特定用户-基本身价', meta: {auth: true}},
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '财务',
    iconCls: 'stats-bars',
    children: [
      {path: '/presentSetting', component: presentSetting, names: '提现设置', meta: { auth: true }},
      {path: '/presentRecord', component: presentRecord, names: '提现记录', meta: { auth: true }},
      {path: '/refundManager', component: refundManager, names: '退款管理', meta: { auth: true }},
      {path: '/applicationSendout', component: applicationSendout, names: '发送站内信', hidden: true, meta: { auth: true }},
      {path: '/applicationProposal', component: applicationProposal, names: '建议反馈', meta: { auth: true }},
      {path: '/applicationDetail', component: applicationDetail, names: '查看详情', hidden: true, meta: { auth: true }},
      {path: '/costReport', component: costReport, names: '运营成本报表', meta: {auth: true}},
      {path: '/rechargeRecord', component: rechargeRecord, names: '充值记录', meta: {auth: true}}
    ]
  },
  // 五期需求
  {
    path: '/homePage',
    component: HomePage,
    names: '五期需求新增',
    iconCls: 'stats-bars',
    children: [
      {path: '/customerManagement', component: customerManagement, names: '待分配会员列表', meta: { auth: true }},
      {path: '/uploadRecord', component: uploadRecord, names: '已初审上传记录', meta: { auth: true }},
      {path: '/alreadyMemberlist', component: alreadyMemberlist, names: '已分配会员列表-主管', meta: { auth: true }},
      {path: '/seatMemberlist', component: seatMemberlist, names: '已分配会员列表-坐席', meta: { auth: true }},
      {path: '/customerDetails', component: customerDetails, names: '客户详情', meta: { auth: true }},
      {path: '/tweetsList', component: tweetsList, names: '推文列表', meta: { auth: true }},
      {path: '/newTweets', component: newTweets, names: '新建推文', meta: { auth: true }},
      {path: '/cardManagement', component: cardManagement, names: '卡劵管理', meta: { auth: true }},
      {path: '/couponSettings', component: couponSettings, names: '卡劵设置', meta: { auth: true }},
      {path: '/repaidCoupons', component: repaidCoupons, names: '充值赠送满减券', meta: { auth: true }},
      {path: '/auditCoupons', component: auditCoupons, names: '审核充值赠送满减券', meta: { auth: true }}
    ]
  },
  // 五期需求
  {
    path: '/homePage',
    component: HomePage,
    names: '七期需求新增',
    iconCls: 'stats-bars',
    children: [
      {path: '/membershipSettings', component: membershipSettings, names: '会员等级基本设置', meta: {auth: true}},
      {path: '/vchangeManagement', component: vchangeManagement, names: '会员V值变动管理', meta: {auth: true}},
      {path: '/returnStatement', component: returnStatement, names: '退单报表', meta: {auth: true}},
      {path: '/rechargeManagement', component: rechargeManagement, names: '充值活动管理', meta: {auth: true}},
      {path: '/rechargeAudit', component: rechargeAudit, names: '充值活动管理-审核', meta: {auth: true}},
      {path: '/premiumzd', component: premiumzd, names: '充值赠送赞豆', meta: {auth: true}},
      {path: '/rechargeVoucher', component: rechargeVoucher, names: '充值赠送抢单劵', meta: {auth: true}},
      {path: '/membership', component: membership, names: '充值会员赠送抢单劵', meta: {auth: true}},
      {path: '/rechargeableMembers', component: rechargeableMembers, names: '充值赠送会员', meta: {auth: true}},
      {path: '/sendCoupons', component: sendCoupons, names: '充值赠送优惠券', meta: {auth: true}},
      {path: '/ticketManage', component: ticketManage, names: '抢单劵管理', meta: {auth: true}},
      {path: '/singleTicket', component: singleTicket, names: '抢单劵设置', meta: {auth: true}},

    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '大网钱',
    iconCls: 'stats-bars',
    children: [
      {path: '/registrationList', component: registrationList, names: '注册列表', meta: { auth: true }},
      {path: '/loanPush', component: loanPush, names: '贷款推送', meta: { auth: true }},
      {path: '/pushDetail', component: pushDetail, names: '推送明细', hidden: true, meta: { auth: true }},
      {path: '/manualPush', component: manualPush, names: '贷款手动推送', meta: { auth: true }},
      {path: '/peaceBenefit', component: peaceBenefit, names: '平安普惠', meta: { auth: true }},
      {path: '/loanTest', component: loanTest, names: '贷款产品设置', meta: { auth: true }},
      {path: '/insuranceSetting', component: insuranceSetting, names: '保险产品设置', meta: { auth: true }},
      {path: '/insuranceReport', component: insuranceReport, names: '保险产品设置明细', meta: { auth: true }},
      {path: '/pinglife', component: pinglife, names: '保险明细报表', meta: { auth: true }},
      {path: '/channelManagement', component: channelManagement, names: '渠道推广管理', meta: { auth: true }},
      {path: '/channelCategory', component: channelCategory, names: '渠道类别配置', meta: { auth: true }},
      {path: '/supplierManagement', component: supplierManagement, names: '渠道供应商管理', meta: { auth: true }},
      {path: '/channelPromotion', component: channelPromotion, names: '渠道列表', meta: { auth: true }},
      {path: '/blacklistManagement', component: blacklistManagement, names: '黑名单管理', meta: { auth: true }},
      {path: '/partyManagement', component: partyManagement, names: '甲方管理', meta: { auth: true }},
      {path: '/editorsFarty', component: editorsFarty, names: '甲方管理编辑', meta: { auth: true }},
      {path: '/uploadReports', component: uploadReports, names: '上传报表', meta: { auth: true }},
      {path: '/channelLabelsz', component: channelLabelsz, names: '渠道标签配置', meta: { auth: true }},
      {path: '/directWarning', component: directWarning, names: '坤玄直鉴', meta: { auth: true }},
      {path: '/poslist', component: poslist, names: 'pos推广管理', meta: { auth: true }},
      {path: '/voiceCalls', component: voiceCalls, names: '语音外呼列表', meta: { auth: true }},
      {path: '/outgoingStatistics', component: outgoingStatistics, names: '语音外呼统计', meta: { auth: true }},
      {path: '/voiceServerManagement', component: voiceServerManagement, names: '语音服务器管理', meta: { auth: true }},
      {path: '/progressManagement', component: progressManagement, names: '供应商类别进度管理', meta: { auth: true }},
      {path: '/pingInsurance', component: pingInsurance, names: '平安寿险', meta: { auth: true }},
      {path: '/voiceCallback', component: voiceCallback, names: '语音回调配置管理', meta: { auth: true }},
      {path: '/callbackDetails', component: callbackDetails, names: '语音回调配置管理详情', meta: { auth: true }}
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '积分管理',
    iconCls: 'stats-bars',
    children: [
      {path: '/IntegralManagement', component: IntegralManagement, names: '积分权益活动', meta: { auth: true }},
      {path: '/addIntegral', component: addIntegral, names: '添加权益活动', meta: { auth: true }},
      {path: '/dailyMap', component: dailyMap, names: '日签图', meta: { auth: true }}
    ]
  }
]
export default routes
