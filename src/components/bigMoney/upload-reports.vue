<template>
<div>
    <div class="navigation">
        <p>
            <span>上传报表</span>
        </p>
    </div>
    <div class="mt10 contentcss">
    <Row>
        <Col span="6" offset="5">
        <ul>
            <li>
                <span>媒体名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </li>
            <li class="mt20 clearfix">
                <span class="left lh32">上传文件:</span>
            <Input v-model="value9" disabled style="width: 150px" class="left ml5"></Input>
            <Upload
            :before-upload="handleUpload"
            :show-upload-list="false"
            action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" icon="ios-cloud-upload-outline">预览</Button>
        </Upload>
            </li>
            <li class="mt50 clearfix">
                <Button type="info" class="w100 left ml20">提交</Button>
                <Button class="w100 right mr40">取消</Button>
            </li>
        </ul>
        </Col>
    </Row>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      value9: '',
      cityList: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ]
    }
  },
  methods: {
    handleUpload (file) {
      this.value9 = file.name
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-upload{
    width: auto;
}
</style>
