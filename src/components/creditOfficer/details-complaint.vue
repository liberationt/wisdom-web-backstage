<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看订单详情</h3>
        <p>
            <span>订单时间:</span>
            <span>2018-05-10 19:10:13</span>
        </p>
        <p>
            <span>订单编号:</span>
            <span>A1111111</span>
        </p>
        <p>
            <span>订单状态:</span>
            <span>2%</span>
        </p>
        <p>
            <span>所在区域:</span>
            <span>上海市</span>
        </p>
        <p>
            <span>客户姓名:</span>
            <span>王某某</span>
        </p>
        <p>
            <span>手机号:</span>
            <span>13918280099</span>
        </p>
        <p>
            <span>申请贷款金额:</span>
            <span>13918280099</span>
        </p>
        <p>
            <span>服务费:</span>
            <span>这里完整显示所有提交内容</span>
        </p>
        <p>
            <span>实际放款金额:</span>
            <span>12个月</span>
        </p>
        <p>
            <span>信贷员:</span>
            <span>李某某</span>
        </p>
        <p>
            <span>申诉人:</span>
            <span>李某某</span>
        </p>
        <p>
            <span>申诉时间:</span>
            <span>李某某</span>
        </p>
        <p>
            <span>申诉内容:</span>
            <span>信贷员压根没有提交办理我的贷款，我要退款客户明明贷款成功到账了，一直不肯确认订单</span>
        </p>
        <div>
            <Button type="primary">确认贷款成功</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary">关闭订单</Button>&nbsp;&nbsp;&nbsp;&nbsp;
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
        padding-left: 50px;
        span:first-child{
            width: 100px;
            display: inline-block;
            text-align: right
        }

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
