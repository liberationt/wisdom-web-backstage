<template>
  <div>
      <!-- <h1 class="h1">页面配置</h1> -->
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;{{application}}>&nbsp;版本页面配置</span>
        </p>
      </div>
      <div class="home_configure">      
      <!-- 首页 -->
      <div class="homePage">
          <h1 class="homePage_h1">首页</h1>
          <ul class="homePage_icon clearfix">
              <router-link v-if="num==1" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:0,num:num}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
              <router-link v-if="num==2" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:3,num:num}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:2,num:num}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">开屏广告</p>
                </li>
              </router-link>
              <router-link to="navigation" v-if="num==1">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">首页导航</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:4,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">首页悬浮广告</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:11,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">我要抢单悬浮广告</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:12,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">抢单无忧-抢单</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:13,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">定制推送</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:14,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">抢单支付成功banner</p>
                </li>
              </router-link>
               <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:15,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">活动弹框页</p>
                </li>
              </router-link>
               <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:16,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">海报页banner</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:19,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">线索单</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:17,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">首页导航设置</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:18,num:num,rolling:1}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">首页滚动文案配置</p>
                </li>
              </router-link>
               <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:20,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">退单权益</p>
                </li>
              </router-link>
               <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:21,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">抢单券</p>
                </li>
              </router-link>
               <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:22,num:num}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">赠送赞豆</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 信用卡超市 -->
      <div class="homePage" v-if="num==1">
          <h1 class="homePage_h1">贷超列表</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:7,num:num}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 注册 -->
      <!-- <div class="homePage" v-if="num==2">
          <h1 class="homePage_h1">注册</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:6}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">头图</p>
                </li>
              </router-link>
          </ul>
      </div> -->
      <!-- 找客户-历史名单 -->
      <div class="homePage" v-if="num==2">
          <h1 class="homePage_h1">找客户-历史名单</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:8,num:num}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播图</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 邀请好友 -->
      <!-- <div class="homePage">
          <h1 class="homePage_h1">邀请好友</h1>
          <ul class="homePage_icon clearfix">
              <router-link v-if="num==1" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:9}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
              <router-link v-if="num==2" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:10}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
          </ul>
      </div> -->
      </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            application:'',
            code: this.$route.query.versionCode,
            fier: this.$route.query.appIdentifier,
            version: this.$route.query.appVersion,
            type: this.$route.query.appType,
            num:this.$route.query.nums
        }
    },
    mounted () {
        if (this.$route.query.nums == 1) {
            this.application = '华赞金服'
        } else {
            this.application = '抢单侠'
            
        }
    }
}
</script>
<style lang="less" scoped>
.home_configure{
    background: #fff;
    border-radius: 5px;
    padding: 20px 0
}
.homePage {
    margin-bottom: 25px;
    width: 100%;
    // border: 1px solid #ccc;
    padding-bottom: 40px;  
}
.homePage_h1 {
    border-bottom: 1px solid #ccc;
    padding: 10px 0 5px 0;
    margin-left: 20px;
}
.homePage_icon li {
    float: left;
    width: 150px;
    height: 77px;
    border: 1px solid #ccc;
    background-color: #fafafa;
    margin-left: 20px;
    margin-top: 18px;
    cursor: pointer;
    text-align: center;
    font-size: 35px;
}
.homePage_text {
    font-size: 14px;
}
</style>
