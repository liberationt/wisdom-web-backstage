
import HomePage from '@/components/homePage'
// import Ciunt from '@/components/ciunt'
import mberTab from '@/components/member/admintable'
import Login from '@/components/login'
import applicationHomePage from '@/components/application/application-homePage'
import applicationMail from '@/components/application/application-mail'
import applicationNewtype from '@/components/application/application-newtype'
import applicationSendout from '@/components/application/application-sendout'
import versionManagement from '@/components/basic-configuration/version-management'
import pageConfigguration from '@/components/basic-configuration/page-configuration'
import broadcastBigimg from '@/components/basic-configuration/broadcast-bigimg'
// import mapState from '@/vuex/store'
// import digui from '@/components/digui'

// alert(mapState.state.count)
let routes = [
  {
    path: '/',
    component: Login,
    names: 'Login',
    hidden: true
  },
  // {
  //   path: '/digui',
  //   component: digui,
  //   names: 'digui',
  //   hidden: true
  // },
  {
    path: '/homePage',
    component: HomePage,
    names: '基础配置',
    iconCls: 'ios-home', // 图标样式class
    children: [
      {path: '/applicationHomePage', component: applicationHomePage, names: '应用首页', hidden: true},
      {path: '/applicationNewtype', component: applicationNewtype, names: '站内信消息类型', hidden: true},
      {path: '/applicationSendout', component: applicationSendout, names: '发送站内信', hidden: true},
      {path: '/versionManagement', component: versionManagement, names: '基础配置', hidden: true},
      {path: '/pageConfigguration', component: pageConfigguration, names: '版本页面配置', hidden: true},
      {path: '/bigimg', component: broadcastBigimg, names: 'bigimg', hidden: true},
      {path: '/mberTab', component: mberTab, names: '页面配置'},
      {path: '/mberTab1', component: mberTab, names: '信用卡中心'},
      {path: '/mberTab2', component: mberTab, names: '贷款产品配置'},
      {path: '/mberTab3', component: mberTab, names: '分销产品配置'},
      {path: '/mberTab4', component: mberTab, names: '渠道配置'}
    ]
  },
  
  {
    path: '/homePage',
    component: HomePage,
    names: '会员管理',
    iconCls: 'ios-paw',
    children: [
      {path: '/mberTab5', component: mberTab, names: '会员列表'}
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '',
    iconCls: 'social-freebsd-devil',
    leaf: true, // 只有一个节点
    children: [
      {path: '/mberTab6', component: mberTab, names: '导航三'}
    ]
  },
  {
    path: '/homePage',
    component: HomePage,
    names: '消息管理',
    iconCls: 'stats-bars',
    children: [
      {path: '/applicationMail', component: applicationMail, names: '站内信'},
      {path: '/mberTab8', component: mberTab, names: 'App Push'},
      {path: '/mberTab9', component: mberTab, names: '短信事件'}
    ]
  }
]

export default routes
