<style lang="less" scoped>
.layoutcon {
    background: #eaedf2;
    position: absolute;
    top: 60px;
    // overflow: hidden;
    height: 100%;
    width: 100%;
    // min-width: 800px;
}
.contrig{
    background: #eaedf2;
    // min-width: 750px!important;
    position: absolute;
    right: 0;
}
.layout-breadcrumb {
    padding: 10px 15px 0
}
.layout-content {
    min-height: 200px;
    margin: 15px;
    // overflow: auto;
    background: #eaedf2;
    // background:rgba(255,255,255,0.1) url(../../image/conbeijing.png);
    // background: url(../image/bg.jpg);
        background-size:100% 100%;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
    border-radius: 4px;
    height: 80%;
}
.layout-content-main {
    padding: 10px
}
.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-menu-left {
    background: #1b294c;
    overflow-y: scroll;
    padding-bottom: 50px;
    min-width: 150px;
    position: fixed;
    left: 0;
    z-index: 1;
    overflow-x: scroll;
    min-width: 200px;
    height: 100%;
}
.layout-header {
    height: 60px;
    background: #fff;
}
.layout-logo-left {
    width: 90%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    // text-align: center;
    color: #fff
/*  background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;*/
}
.layout-ceiling-main a {
    color: #9ba7b5;
}
.layout-menu-left .ivu-col {
    transition: width .2s ease-in-out;
    height: 100%;
}
.ivu-row-flex {
    height: 100%;
}
.userinfo{
    display: inline-block;
    float: right;
}
.userinfo .ivu-dropdown{
    margin-top: 50px;
}
 .ivu-dropdown {
    margin-right: 25px;
    margin-top: 22px;
}
.ivu-menu-submenu-title{
    padding: 14px;
}
.head-img {
    width: 100%;
    height: 60px;
    line-height: 60px;
    float: right;
    margin-top: -50px;
}
.head-img img{
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    width: 40px;
    height: 40px;
    float: right;
}
</style>

<template>
    <div class="layoutcon" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <i-col :span="spanLeft" v-if="hidden" class="layout-menu-left">
                <div class="layout-logo-left tl">
                    <a href="javascript:;" class="layout-text" v-if="leftheadname=='应用首页'" @click="titleurl">{{leftheadname}}</a>
                    <a href="javascript:;" class="layout-text" v-if="leftheadname!='应用首页'" >{{leftheadname}}</a>
                    
                </div>
                <div class="tree-menu">
                  <ul v-for="(menuItem, index) in leftlist" :key="index" :mark="index" class="aceul">
                    <myTree :model="menuItem"></myTree>
                  </ul>
                </div>
                <!-- <Menu :mode="modeType" theme="dark" width="auto"  :open-names="openNames" @on-select="menuSelect" accordion>
                     <div class="layout-logo-left">
                         <Icon type="paper-airplane" ></Icon>
                         <span class="layout-text">应用首页</span>
                     </div>
                   <template v-for="item in $router.options.routes" v-if="spanLeft >= 4 && !item.hidden">
                        <Submenu :name="item.names" :key="item.names" v-if="!item.leaf">
                            <template slot="title">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.names}}</span>
                            </template>
                             <template v-for="child in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path" :key="child.names">{{child.names}}</Menu-item>
                            </template>
                            </Submenu>
                   </template>
                </Menu> -->
            </i-col>
            <i-col :span="spanRight" v-if="hidden" class="contrig">
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.names}}</Breadcrumb-item>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                     </div>
                </div>
            </i-col>
            <i-col :span="24" v-if="!hidden">
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                     </div>
                </div>
            </i-col>
        </Row>
    </div>
    <!-- 修改密码 模态框 -->
<!-- 修改密码 模态框 -->
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import myTree from './leftchild'
import utils from '../../utils/utils'
export default {
  components: {
    myTree
  },
  data () {
    return {
      openNames: [this.$route.matched[0].name],
      modeType: 'vertical',
      spanLeft: 4,
      spanRight: 20,
      modal1: false,
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24
    },
    ...mapState(['hidden', 'leftlist','leftheadname'])
  },
  methods: {
      ...mapMutations(['lefthidfalse']),
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 1
        this.spanRight = 23
      } else {
        this.spanLeft = 4
        this.spanRight = 20
      }
    },
    modifyPassWord () {
      this.modal1 = true
    },
    logout () {
      this.$router.push('/login')
    },
    menuSelect (name) {
      this.$router.push({ path: name })
    },
    dropDown (name) {
      this.$router.push({ path: name })
    //   console.log(name)
    },
    titleurl () {
        this.$router.push('/applicationHomePage')  
        this.lefthidfalse()           
    }
  },
  mounted () {
         
  }

}
</script>
<style lang="less" scoped>
.layout-text{
    color:#3d81f2;
    width: 100%;
    padding-left:40px;
    display: inline-block;
    font-size: 20px;
}
ul{
    color:#fff
}
.aceul{
    margin:2px 0;
    background:#1b294c;
    color:#becee7
}
.ivu-select-dropdown .ivu-dropdown {
     margin: 0px 12px 0px 0px;
}
._dropdownList{
   /*  width: 100%;
    text-align: center; */
}
._iconCls{
    width: 56px;
    text-align: center;
}
</style>
