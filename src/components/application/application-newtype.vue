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
            <div class="newtype_notice" v-for="item in typelist">
                <img :src="item.typeIcon" alt="">
                <p>{{item.typeTitle}}</p>
                <p>
                    <Button shape="circle" icon="edit" @click="handleRender(1)"></Button>
                    &nbsp;&nbsp;
                    <Button shape="circle" icon="trash-b"></Button>
                </p>
            </div>
        </div>
    </div>

    <Modal
      :title="titlemod"
      v-model="modal8"
      @on-ok="preservationlist"
      @on-cancel="cancellist"
      ok-text="保存"
      cancel-text="关闭"
      class-name="vertical-center-modal"
      width="600"
      :mask-closable="false">
      <div class="newtype_file">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="">
            <Row>
              <Col span="4">
                <FormItem prop="formValidate.productlogo">
                    <Upload
                    action=""
                    :before-upload="handleUploadicon"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png', 'gif']"
                    :on-format-error="handleFormatError1">
                    <img src="../../image/moren.png" alt="">
                    <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </FormItem>
              </Col>
              <Col span="20">
                <FormItem label="消息类型名称:" prop="formValidate.mail">
                  <Input v-model="formValidate.mail" style="width: 150px;" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="类型说明:" prop="formValidate.city" class="mt15">
                  <Input v-model="formValidate.city" style="width: 150px;" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
            </Row>           
          </FormItem>        
        </Form>
      </div>
    </Modal>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal8: false,
      value: '',
      typelist: [],
      titlemod: '',
      formValidate: {
        productlogo: '',
        mail: '',
        city: ''
      },
      ruleValidate: {
        productlogo: [
            { required: true, message: '请上传图标', trigger: 'blur' }
        ],
        mail: [
            { required: true, message: '请输入消息类型名称', trigger: 'blur' },
            // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
            { required: true, message: '请输入类型说明', trigger: 'change' }
        ]
      }
    }
  },
  components: {
  },
  mounted () {
    this.http.post(BASE_URL + '/loan/webMail/queryWebMailTypeList', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.typelist = resp.data.dataList
      } else {

      }
    })
    .catch(() => {
    })

  },
  methods: {
    handleRender (num) {
        if (num == 1) {
            this.titlemod = '编辑消息类型'

        }
      this.modal8 = true
    },
    preservationlist (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    cancellist (name) {
        this.$refs[name].resetFields();
    },
    ok () {
      this.$Message.info('You click ok')
    },
    cancel () {
      this.$Message.info('You click cancel')
    },
    // 图片上传
    handleUploadicon (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        // this.formCustom.labelUrl = resp.data
        // this.imgnum = 1
      } else {
      }
    })
    .catch(() => {
    })
      this.formCustom.producticon = file.name
      return false
      }
    },
    handleFormatError1 (file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
    },
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
