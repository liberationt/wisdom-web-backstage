<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看评价详情</h3>
        <p>
            <span>审核时间:</span>
            <span>2018-05-10 19:10:13</span>
        </p>
        <p>
            <span>审核人员:</span>
            <span>唐哈哈</span>
        </p>
        <p>
            <span>评价时间:</span>
            <span>2018-05-10 19:10:13</span>
        </p>
        <p>
            <span>订单时间:</span>
            <span>2018-05-10 19:10:13</span>
        </p>
        <p>
            <span>订单编号:</span>
            <span>Q11111</span>
        </p>
        <p>
            <span>服务费用:</span>
            <span>10</span>
        </p>
        <p>
            <span>所在区域:</span>
            <span>上海</span>
        </p>
        <p>
            <span>客户姓名:</span>
            <span>李哈哈</span>
        </p>
        <p>
            <span>手机号:</span>
            <span>13053002378</span>
        </p>
        <p>
            <span>贷款意向:</span>
            <span>40万</span>
        </p>
        <p>
            <span>贷款期限:</span>
            <span>12个月</span>
        </p>
        <p>
            <span>实际贷款金额:</span>
            <span>40万</span>
        </p>
        <p>
            <span>信贷员姓名:</span>
            <span>王哈哈</span>
        </p>
        <p>
            <span>信贷员手机:</span>
            <span>13918280099</span>
        </p>
        <p>
            <span>评价内容:</span>
            <Icon type="ios-star" class="yellow1"></Icon>
            <Icon type="ios-star" class="yellow1"></Icon>
            <Icon type="ios-star" class="yellow1"></Icon>
            <Icon type="ios-star" class="yellow1"></Icon>
            <Icon type="ios-star" class="yellow1"></Icon>
            <p>
                <span class="evaluation_grade">专业</span>
                <span class="evaluation_grade ml5">发货快</span>
            </p>
            <p>这里完整显示所有提交内容</p>
        </p>
        <div>
            <Button type="primary">确认审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
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
        line-height: 40px;
        padding-left: 50px
    }
    div{
        text-align: center;
        margin-top: 20px
    }
}
.evaluation_grade{
    display: inline-block;
    border: 1px solid #FF6600;
    line-height: 30px;
    padding: 0px 20px;
    color: #FF6600
}
</style>
