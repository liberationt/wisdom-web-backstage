<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>审核详情</h3>
        <p>
            <span>信贷员:</span>
            <span>王某某</span>
        </p>
        <p>
            <span>提交时间:</span>
            <span>13918280099</span>
        </p>
        <div class="clearfix examine_con">
            <span class="left">提交内容:</span>
            <div class="left examine_chi">
                <div class="">
                    <p><span>1.</span>贷款要求</p>
                    <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
                </div>
                <div class="">
                    <p><span>2.</span>申请条件</p>
                    <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
                </div>
                <div class="">
                    <p><span>3.</span>其他说明</p>
                    <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
                </div>
            </div>
        </div>
        <div class="mt50">
            <Button type="primary">资料审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary">资料审核拒绝</Button>&nbsp;&nbsp;&nbsp;&nbsp;
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
    color: #FF6600;
}
.examine_con{
    padding-left: 50px;
    margin-top: 0!important;
    span{
        width: 100px;
        text-align: right;
        line-height: 40px;
    }
  .examine_chi{
      margin-top: 0!important;
      margin-left: 5px;
    div{
        margin-top: 0!important;
        margin-bottom: 20px;
        p{
            text-align: left;
            padding-left: 0!important;
            span{
                width: auto!important;
            }
        }
    }
  }
}
</style>
