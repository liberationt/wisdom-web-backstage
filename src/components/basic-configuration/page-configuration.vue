<template>
  <div>
      <h1 class="h1">页面配置</h1>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;版本号名称</span>
        </p>
      </div>
      <!-- 首页 -->
      <div class="homePage">
          <h1 class="homePage_h1">首页</h1>
          <ul class="homePage_icon clearfix">
              <router-link v-if="num==1" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:0}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
              <router-link v-if="num==2" :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:3}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:2}}">
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
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:4}}" v-if="num==2">
                <li>
                    <Icon type="android-apps"></Icon>
                    <p class="homePage_text">悬浮广告</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 信用卡超市 -->
      <div class="homePage" v-if="num==1">
          <h1 class="homePage_h1">贷超列表</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:7}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播大图</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 注册 -->
      <div class="homePage" v-if="num==2">
          <h1 class="homePage_h1">注册</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:6}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">头图</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 找客户-历史名单 -->
      <div class="homePage" v-if="num==2">
          <h1 class="homePage_h1">找客户-历史名单</h1>
          <ul class="homePage_icon clearfix">
              <router-link :to="{path:'bigimg/', query:{versionCode:code,appIdentifier:fier,appVersion:version,appType:type,img:1,banner:8}}">
                <li>
                    <Icon type="android-image"></Icon>
                    <p class="homePage_text">轮播图</p>
                </li>
              </router-link>
          </ul>
      </div>
      <!-- 邀请好友 -->
      <div class="homePage">
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
      </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            code: this.$route.query.versionCode,
            fier: this.$route.query.appIdentifier,
            version: this.$route.query.appVersion,
            type: this.$route.query.appType,
            num:this.$route.query.nums
        }
    }
}
</script>
<style lang="less" scoped>
.homePage {
    margin-bottom: 25px;
    width: 100%;
    border: 1px solid #ccc;
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
