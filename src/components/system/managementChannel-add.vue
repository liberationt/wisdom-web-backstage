<template>
<Row>
    <Col span="24" offset="0">
    <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;渠道配置</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3><span>添加</span>渠道</h3>
        <Row>
           <Col span="20" offset="4">
           <p>
            <span>渠道编号:</span>
            <Input v-model="value" placeholder="请输入渠道编号" style="width: 300px;vertical-align: inherit"></Input>
        </p>
        <p>
            <span>渠道名称:</span>
            <Input v-model="value2" placeholder="请输入渠道名称" style="width: 300px;vertical-align: inherit"></Input>
        </p>
        <div class="clearfix pl50 label-xz">
            <span class="left">渠道标签:</span>
            <div class="left channel-label"></div>
             <Button class="left" type="primary">选择</Button>
        </div>
        <p class="clearfix">
            <span class="left">banner图片:</span>
            <Upload class="left ml5"
            action="//jsonplaceholder.typicode.com/posts/"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :show-upload-list='false'
            >
               <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </p>
        <p>
            <span>对接商务:</span>
            <Input v-model="value3" placeholder="请输入商务人员姓名" style="width: 300px;vertical-align: inherit"></Input>
        </p>
        <p>
            <span>备注:</span>
            <Input v-model="value4" style="width: 300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
        </p>
        <div class="mt50 ml200">
            <Button type="primary">提交保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost">返回</Button>
        </div>
           </Col>
        </Row>
        </div>
</div>
    </Col>
</Row>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      value2: '',
      value3: '',
      value4: ''
    }
  }
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
        padding-left: 50px;
        span{
            width: 80px;
            display: inline-block;
            text-align: right
        }
    }
    .label-xz{
        span:first-child{
            line-height: 30px;
            width: 80px;
            text-align: right
        }
        .channel-label{
            width: 300px;
            min-height: 30px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            margin-left: 5px
        }
    }
}
</style>
