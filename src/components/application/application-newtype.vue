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
                    <Button class="circleb" shape="circle" icon="edit" @click="handleRender(1,item.typeCode)"></Button>
                    &nbsp;&nbsp;
                    <!-- <Button shape="circle" icon="trash-b"></Button> -->
                    <span class="edit_icon icondelect right">
                        <Poptip
                          confirm
                          transfer
                          title="确认删除吗?"
                          @on-ok="deleteOk(item.typeCode)"
                          @on-cancel="deleteCancel">
                          <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                        </Poptip>
                    </span>
                </p>
            </div>
        </div>
    </div>
    <Modal
      :title="titlemod"
      v-model="modal8"
      @on-ok="preservationlist('formValidate')"
      @on-cancel="cancellist('formValidate')"
      ok-text="保存"
      cancel-text="关闭"
      class-name="vertical-center-modal"
      width="600"
      :loading="loading"
      :mask-closable="false">
      <div class="newtype_file">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="">
            <Row>
              <Col span="4">
                <FormItem prop="productlogo">
                    <Upload
                    action=""
                    :before-upload="handleUploadicon"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png', 'gif']"
                    :on-format-error="handleFormatError1">
                    <img class="iconlabelUrl" :src="formValidate.labelUrl" alt="">
                    <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </FormItem>
              </Col>
              <Col span="20">
                <FormItem label="消息类型名称:" prop="mail">
                  <Input v-model="formValidate.mail" style="width: 150px;" placeholder="请输入类型名称"></Input>
                </FormItem>
                <FormItem label="类型说明:" prop="city" class="mt15">
                  <Input v-model="formValidate.city" style="width: 150px;" placeholder="请输入类型说明"></Input>
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
  data() {
    return {
      modal8: false,
      value: "",
      loading: true,
      typelist: [],
      titlemod: "添加消息类型",
      typecode: '',
      formValidate: {
        productlogo: "",
        mail: "",
        city: "",
        labelUrl: require("../../image/moren.png")
      },
      ruleValidate: {
        productlogo: [
          { required: true, message: "请上传图标", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入消息类型名称", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入类型说明", trigger: "change" }]
      }
    };
  },
  created() {
    this.listxuan()
  },
  methods: {
    handleRender(num,code) {
      this.typecode = code
      if (num == 1) {
        this.titlemod = "编辑消息类型";
        this.http.post(BASE_URL+"/loan/webMail/getWebMailTypeByCode",{data:code}).then(data=>{
          console.log(data)
          if(data.code == "success"){
            this.formValidate.mail = data.data.typeTitle 
            this.formValidate.city = data.data.typeDescription 
            this.formValidate.labelUrl = data.data.typeIcon 
            this.formValidate.productlogo = data.data.typeIcon
          }
        }).catch(err=>{
          console.log(err)
        })
      } else {
        this.titlemod = "添加消息类型";
        this.formValidate.mail = ""
        this.formValidate.city = ""
        this.formValidate.labelUrl = require("../../image/moren.png")
        this.formValidate.productlogo = ""
      }
      this.modal8 = true;
    },
    preservationlist(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let postUrl
          let list
          if (this.titlemod == "添加消息类型") {
            postUrl = "/loan/webMail/saveWebMailType"
            list = {
              typeTitle: this.formValidate.mail, //名称
              typeDescription: this.formValidate.city, // 内容,
              typeIcon: this.formValidate.labelUrl
            };
          } else if(this.titlemod == "编辑消息类型"){
            // console.log(this.typecode,111)
            postUrl = "/loan/webMail/updateWebMailType"
            list = {
              typeTitle: this.formValidate.mail, //名称
              typeDescription: this.formValidate.city, // 内容,
              typeIcon: this.formValidate.labelUrl,
              typeCode : this.typecode
            };
          }
          this.httpUrl(postUrl, list, e => {
            if(e){
              this.$Message.success("保存成功");
              this.modal8 = false;
              this.listxuan();
              this.$refs[name].resetFields();
              this.formValidate.labelUrl = require("../../image/moren.png");
              this.formValidate.productlogo = "";
            } else {
              this.$Message.success("保存失败");
              this.modal8 = false;
            }
          });
        } else {
          return this.changeLoading()
          // this.$Message.error("Fail!");
        }
      });
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    cancellist(name) {
      this.$refs[name].resetFields();
      this.formValidate.labelUrl = require("../../image/moren.png");
      this.formValidate.productlogo = "";
    },
    // 图片上传
    handleUploadicon(file) {
      let splic = file.name.split(".");
      if (
        splic[splic.length - 1] == "png" ||
        splic[splic.length - 1] == "jpg" ||
        splic[splic.length - 1] == "gif" ||
        splic[splic.length - 1] == "jpeg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.http
          .post(BASE_URL + "/fileUpload", formData, config)
          .then(resp => {
            if (resp.code == "success") {
              this.formValidate.labelUrl = resp.data;
              this.formValidate.productlogo = resp.data;
            } else {
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        return false;
      }
    },
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    listxuan(){
      this.http
      .post(BASE_URL + "/loan/webMail/queryWebMailTypeList", {})
      .then(resp => {
        console.log(resp);
        if (resp.code == "success") {
          this.typelist = resp.data.dataList;
        } else {
        }
      })
      .catch(() => {});
    },
    // 保存编辑产品
    httpUrl(httpurl, list, callback) {
      this.http
        .post(BASE_URL + httpurl, list)
        .then(data => {
          if (data.code == "success") {
            callback && callback(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    deleteOk(code){
      // alert(code)
      this.http.post(BASE_URL+"/loan/webMail/delWebMailType",{data:code}).then(data=>{
        console.log(data)
        if(data.code == "success"){
          this.$Message.success("删除成功");
          this.listxuan();
        } else {
          this.$Message.success("删除失败");
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    deleteCancel(){
      //取消
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-modal-confirm-body-icon-confirm,
.ivu-icon-help-circled {
  display: none;
}
.circleb {
  width: 30px;
  height: 30px;
  margin-bottom: 3px;
}
#newtype_con {
  border: 1px solid #e7ecf1;
  padding: 20px;
  .newtype_hed {
    width: 100%;
    border-bottom: 1px solid #e7ecf1;
    padding: 10px 0;
    overflow: hidden;
    span {
      font-size: 20px;
      float: left;
    }
    button {
      float: right;
    }
  }
  .newtype_con {
    padding: 20px 40px;
    overflow: hidden;
    .newtype_notice {
      width: 140px;
      height: 180px;
      border: 1px solid #e7ecf1;
      text-align: center;
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      img {
        width: 60px;
        height: 60px;
        margin-top: 20px;
      }
      p {
        font-size: 16px;
        margin: 6px 0;
        overflow: hidden;
        height: 32px;
        line-height: 32px;
        a {
          display: inline-block;
          width: 30px;
          height: 30px;
          border: 1px solid #e7ecf1;
          border-radius: 50%;
        }
      }
    }
  }
}
.iconlabelUrl {
  width: 80px;
  height: 80px;
}
.icondelect {
  margin-right: 20px;
}
.newtype_file {
  overflow: hidden;
  .newtype_leftfi {
    float: left;
    img {
      width: 80px;
    }
    button {
      display: block;
    }
  }
  .newtype_rightfi {
    float: right;
    li {
      margin-top: 15px;
      span {
        width: 80px;
        display: inline-block;
      }
    }
  }
}
</style>
