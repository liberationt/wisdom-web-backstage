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
            <Button type="ghost" shape="circle" @click="custom" icon="plus-round">添加</Button>
        </div>
        <div class="newtype_con">
            <div class="newtype_notice">
                <img src="../../image/application-hzjf.png" alt="">
                <p>平台公告</p>
                <p>
                    <a href="javascript:;"><Icon type="edit"></Icon></a>&nbsp;&nbsp;
                    <a href="javascript:;"><Icon type="trash-b"></Icon></a>
                </p>
            </div>
            <div class="newtype_notice">
                <img src="../../image/application-hzjf.png" alt="">
                <p>精品推荐</p>
                <p>
                    <a href="javascript:;"><Icon type="edit"></Icon></a>&nbsp;&nbsp;
                    <a href="javascript:;"><Icon type="trash-b"></Icon></a>
                </p>
            </div>
        </div>
    </div>
    <!-- <Newtype></Newtype> -->
    <!-- <Modal
      title="Title"
      v-model="modal8"
      :onOk="aaa"
      :mask-closable="false">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal> -->
  </div>
</template>
<script>
import {Newtype} from '../../components'
export default {
  data () {
    return {
      modal8: false,
      AAA:document.getElementsByClassName("Newtype")
    }
  },
  components: {
    Newtype
  },
  mounted: {

  },
  methods: {
    custom () {
        let contype = this.AAA
      console.log(this.AAA)
      this.$Modal.confirm({
        title: 'Title',
        content: 'contype',
        okText: 'OK',
        cancelText: 'Cancel'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
.ivu-modal-confirm-body-icon-confirm{
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
</style>
