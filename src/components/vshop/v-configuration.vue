<template>
  <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;分销>&nbsp;管理设置>&nbsp;页面配置</span>
			</p>
		</div>
		<div class="home_configure">      
      <div class="homePage">
        <h1 class="homePage_h1">相关设置</h1>
				<ul class="homePage_icon clearfix">
					<router-link :to="{path:'/vConfigurationList', query:{locationType:0}}">
						<li>
							<Icon type="android-image"></Icon>
							<p class="homePage_text">提现成功</p>
						</li>
					</router-link>
					<router-link :to="{path:'/vConfigurationList', query:{locationType:1}}">
						<li>
							<Icon type="android-image"></Icon>
							<p class="homePage_text">有钱花</p>
						</li>
					</router-link>
					<router-link :to="{path:'/vConfigurationList', query:{locationType:2}}">
						<li>
							<Icon type="android-image"></Icon>
							<p class="homePage_text">店铺背景</p>
						</li>
					</router-link>
					<router-link :to="{path:'/vConfigurationList', query:{locationType:3}}">
						<li>
							<Icon type="android-apps"></Icon>
							<p class="homePage_text">分销贷款</p>
						</li>
					</router-link>
				</ul>
      </div>
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
