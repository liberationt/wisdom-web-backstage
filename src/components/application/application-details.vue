<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看反馈详情</h3>
        <p>
            <span>提交时间:</span>
            <span>2018-05-10 19:10:13</span>
        </p>
        <p>
            <span>用户手机号:</span>
            <span>13525710490</span>
        </p>
        <p>
            <span>姓名:</span>
            <span>哈哈</span>
        </p>
        <p>
            <span>反馈内容:</span>
            <span>这里完整显示所有提交内容</span>
        </p>
        <div>
            <Button type="primary">确认已查看</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost">返回</Button>
        </div>
    </div>
</div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
    p{
        line-height: 60px;
        padding-left: 50px
    }
    div{
        text-align: center;
        margin-top: 20px
    }
}
</style>
