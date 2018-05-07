<template>
<div>
  <div class="navigation">
    <p>
      <span>管理首页&nbsp;>&nbsp;应用</span>
    </p>
  </div>
  <div id="application-con">
    <div id="application-clothes">
      <img src="../../image/application-hzjf.png" alt="">
      <span><em>华赞金服</em></br><em>版本数量:4</em></span>
      <p><a href="javascript:;">进入管理</a></p>
    </div>
    <div id="application-app">
      <img src="../../image/application-hzjf.png" alt="">
      <span><em>APP名称</em></br><em>版本数量:4</em></span>
      <p><a href="javascript:;">进入管理</a></p>
    </div>
  </div>
</div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
#application-con{
  overflow: hidden;
  #application-clothes, #application-app{
  width: 300px;
  height: 160px;
  border: 1px solid #E7ECF1;
  float: left;
  margin-right: 15px;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  padding: 10px;
  color: #666666;
  img{
    width: 100px;
    border-radius: 5px;
    vertical-align: middle;
    float: left;
  }
  span{
    float: left;
    display: block;
    height: 100px;
    margin-left: 10px;
    line-height: 24px;
    padding-top: 20px;
    em:first-child{
      font-size: 18px
    }
  }
  p{
    clear: both;
    background: #E1E5EC;
    line-height: 35px;
    a{
      width: 100%;
      height: 100%;
      display: inline-block
    }
  }

  }
}
</style>
