<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看订单详情</h3>
        <ul>
            <li>
                <span class="lh32 "><em class="red">*</em>产品名称:</span>
                <Input class="" v-model="value" placeholder="请输入产品名称" style="width: 300px"></Input>
            </li>
            <li class="clearfix mt15">
                <span class="left"><em class="red">*</em>产品详情:</span>
                <div class="editor-container left mt5">
                    <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
                </div>
            </li>
        </ul>
        <div class="mt50">
            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
            <Button type="ghost">返回</Button>
        </div>
    </div>
</div>
</template>
<script>
import UE from '../../components/ue'
export default {
  data () {
    return {
      value: '',
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      }
    }
  },
  components: {UE}
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
        // margin-top: 20px
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
