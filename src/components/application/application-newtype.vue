<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;站内信</span>
      </p>
    </div>

    <div id="newtype_con">
        <div class="newtype_hed">
            <span>站内信消息类型</span>
            <Button type="ghost" shape="circle" @click="handleRender" icon="plus-round">添加</Button>
        </div>
        <div class="newtype_con">
            <div class="newtype_notice">
                <img src="../../image/application-hzjf.png" alt="">
                <p>平台公告</p>
                <p>
                    <a href="javascript:;" @click="handleRender"><Icon type="edit"></Icon></a>&nbsp;&nbsp;
                    <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="ok"
                      @on-cancel="cancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                    </Poptip>
                </p>
            </div>
            <div class="newtype_notice">
                <img src="../../image/application-hzjf.png" alt="">
                <p>精品推荐</p>
                <p>
                    <a href="javascript:;" @click="handleRender"><Icon type="edit"></Icon></a>&nbsp;&nbsp;
                    <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="ok"
                      @on-cancel="cancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                    </Poptip>
                </p>
            </div>
        </div>
    </div>
    <!-- <Newtype></Newtype> -->
    <Modal
      title="添加消息类型"
      v-model="modal8"
      @on-ok="aaa"
      @on-cancel="bbb"
      ok-text="提交保存"
      cancel-text="关闭"
      class-name="vertical-center-modal"
      width="500"
      :mask-closable="false">
      <div class="newtype_file">
          <div class="newtype_leftfi">
            <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :show-upload-list="false"
            >
            <img src="../../image/application-hzjf.png" alt="">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </div>
          <ul class="newtype_rightfi">
            <li>
                <span>消息类型名称:</span>
                <Input v-model="value" placeholder="请输入消息类型名称" style="width: 200px"></Input>
            </li>
            <li>
                <span>类型说明:</span>
                <Input v-model="value" placeholder="请输入类型说明" style="width: 200px"></Input>
            </li>
          </ul>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal8: false,
      value: ''
    }
  },
  components: {
  },
  mounted: {

  },
  methods: {
    handleRender () {
      this.modal8 = true
    },
    aaa () {
      this.$Message.info('Clicked ok')
    },
    bbb () {
      this.$Message.info('Clicked cancel')
    },
    ok () {
      this.$Message.info('You click ok')
    },
    cancel () {
      this.$Message.info('You click cancel')
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-modal-confirm-body-icon-confirm, .ivu-icon-help-circled{
    display: none
}
#newtype_con{
    border: 1px solid #E7ECF1;
    padding: 20px;
    .newtype_hed{
        width: 100%;
        border-bottom: 1px solid #E7ECF1;
        padding: 10px 0;
        overflow: hidden;
        span{
            font-size: 20px;
            float: left;
        }
        button{
            float: right;
        }
    }
    .newtype_con{
        padding: 20px 40px;
        overflow: hidden;
        .newtype_notice{
            width: 140px;
            height: 180px;
            border: 1px solid #E7ECF1;
            text-align: center;
            float: left;
            margin-right: 20px;
            img{
                width: 60px;
                margin-top: 20px
            }
            p{
                font-size: 18px;
                margin: 10px 0;
                a{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #E7ECF1;
                    border-radius: 50%;
                }
            }
        }
    }
}
.newtype_file{
    overflow: hidden;
    .newtype_leftfi{
        float: left;
        img{
            width: 80px;
        }
        button{
            display: block
        }
    }
    .newtype_rightfi{
        float: right;
        li{
            margin-top: 15px;
            span{
                width: 80px;
                display: inline-block

            }
        }
    }
}
</style>
