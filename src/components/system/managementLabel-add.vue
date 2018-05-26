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
        <h3><span>添加</span>渠道标签</h3>
        <Row>
           <Col span="20" offset="4">
           <p>
            <span>渠道标签:</span>
            <Input v-model="value" disabled placeholder="请输入渠道标签" style="width: 300px;vertical-align: inherit"></Input>
        </p>
        <p>
            <span>标签名称:</span>
            <Input v-model="value2" placeholder="请输入标签名称" style="width: 300px;vertical-align: inherit"></Input>
        </p>
        <p>
            <span>父级:</span>
            <Select v-model="model1" placeholder='选择父级菜单' style="width:300px">
              <Option v-for="item in cityList" :value="item.value"  :key="item.value">{{ item.label }}</Option>
            </Select>
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
      value4: '',
      cityList: [
        {
          value: '一级',
          label: '一级'
        },
        {
          value: '1-1-1',
          label: '1-1-1'
        },
        {
          value: '1-1-2',
          label: '1-1-2'
        },
        {
          value: '二级',
          label: '二级'
        },
        {
          value: '2-1-1',
          label: '2-1-1'
        },
        {
          value: '2-2-2',
          label: '2-2-2'
        }
      ],
      model1: ''
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
