<style lang="less" scoped>
.layoutcon {
    background: #f5f7f9;
    position: fixed;
    top: 50px;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
.layout-breadcrumb {
    padding: 10px 15px 0
}
.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: auto;
    background: #fff;
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
    background: #464c5b;
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
    text-align: center;
    color: #fff
/*  background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;*/
}
.layout-ceiling-main a {
    color: #9ba7b5;
}
.ivu-col {
    transition: width .2s ease-in-out;
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
                <Menu :mode="modeType" theme="dark" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
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
                        <template v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path" :key="item.children[0].names">
                                 <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.children[0].names}}</span>
                            </Menu-item>
                        </template>
                   </template>
                </Menu>
            </i-col>
            <i-col :span="spanRight" v-if="hidden">
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.names}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
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
import {mapState} from 'vuex'
export default {
  data () {
    return {
      openNames: [this.$route.matched[0].name],
      modeType: 'vertical',
      spanLeft: 4,
      spanRight: 20,
      modal1: false
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24
    },
    ...mapState(['hidden'])
  },
  methods: {
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
      console.log(name)
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
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
