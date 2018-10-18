
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
// 信贷员
import creditSetting from '@/components/creditOfficer/credit-setting'
import evaluationManagement from '@/components/creditOfficer/evaluation-management'
import evaluationReview from '@/components/creditOfficer/evaluation-review'
import evaluationDetails from '@/components/creditOfficer/evaluation-details'
import activityManagement from '@/components/creditOfficer/activity-management'//活动管理
import auditActivities from '@/components/creditOfficer/audit-activities'//活动审核
// 订单列表
import orderList from '@/components/creditOfficer/order-list'
import detailsConsultation from '@/components/creditOfficer/details-consultation'
import operationLog from '@/components/creditOfficer/operation-log'
import detailsRobbing from '@/components/creditOfficer/details-robbing'
import detailsComplaint from '@/components/creditOfficer/details-complaint'
import orderlog from '@/components/creditOfficer/order-log'
// 信贷员管理
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
// 财务
import presentSetting from '@/components/finance/present-setting'
import presentRecord from '@/components/finance/present-record'
import refundManager from '@/components/finance/refund-manager' // 退款
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
      {path: '/mberTab4', component: mberTab, names: '渠道配置', meta: { auth: true }}
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
      {path: '/memberDetail', component: memberDetail, names: '列表详情', hidden: true, meta: { auth: true }}
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
      {path: '/personnelManagement', component: personnelManagement, names: '部门人员管理', hidden: true, meta: { auth: true }}
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
      {path: '/applicationDetail', component: applicationDetail, names: '查看详情', hidden: true, meta: { auth: true }}
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
      {path: '/poslist', component: poslist, names: 'pos推广管理', meta: { auth: true }}
    ]
  }
]
export default routes