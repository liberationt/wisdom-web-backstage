<template>
  <div>
    <h1>版本管理</h1>
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服</span>
        </p>
    </div>
    <div class="addButton">
        <a href="javascript:;">
            <Icon type="plus-round"></Icon>
            添加版本
        </a>
    </div>
    <div class="version clearfix">
        <div class="version_img left">
            <img src="../../image/bg.jpg" alt="">
        </div>
        <div class="version_text">
            <p class="android right">安卓</p>
            <p class="version_text_version">V1.1.2</p>
            <p class="version_text_lian">com.weimob.dkwjk-1.1.2</p>
            <p class="version_text_xin">不更新</p>
        </div>
        <div class="version_footer">
            <span class="version_date">2018-05-10</span>
            <span class="version_icon">
                <Icon type="plus"></Icon>
            </span>
            <span class="version_icon">
                <Icon type="edit"></Icon>
            </span>
            <span class="version_icon">
                <Icon type="ios-trash-outline"></Icon>
            </span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
    .version_date {
        margin-right: 80px;
    }
    .version_footer {
        margin-top: 20px;
        margin-left: 7px;
    }
    .version_icon {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        border: 1px solid #ccc;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        cursor: pointer;
    }
    .version_icon:hover {
        background-color: rgb(226, 222, 222);
    }
    .version_text_lian {
        font-size: 14px;
    }
    .version_text{
        margin-top: 32px;
        margin-left: 110px;
    }
    .android {
        width: 45px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #fff;
        border-radius: 5px;
        background-color: #3399ff;
        font-size: 12px;
        margin-top: -20px;
        margin-right: 10px;
    }
    .version_img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin-top: 18px;
        margin-left: 8px;
    }
    .version_img>img {
        width: 100%;
        height: 100%;
    }
    .version {
        width: 300px;
        height: 160px;
        border: 1px solid #ccc;
        margin-top: 20px;
    }
    h1 {
        margin: 6px 0 12px 0;
    }
    .addButton>a {
        display: block;
        width: 100px;
        text-align: center;
        border: 1px solid rgb(119, 118, 118);
        border-radius: 32px;
        height: 32px;
        line-height: 32px;
    }
</style>

