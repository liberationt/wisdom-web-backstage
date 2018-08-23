<template>
  <div>
    <h1 class="h1">版本管理</h1>
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服</span>
        </p>
    </div>
    <div class="addButton">
        <a href="javascript:;" @click="handleRender">
            <Icon type="plus-round"></Icon>
            添加版本
        </a>
    </div>
    <ul class="version_list clearfix">
      <li class="version left mr20" v-for="item in versionnumber">
        <div class="version_img left" @click="routerlink(item.versionCode, item.appIdentifier, item.appVersion, item.appType, item)">
            <img :src=item.logoUrl alt="">
        </div>
        <div class="version_text">
            <p class="android right">{{item.appType}}</p>
            <p class="version_text_version">{{item.appVersion}}</p>
            <p class="version_text_lian">{{item.appIdentifier}}</p>
            <p class="version_text_xin" v-if="item.updateType == 1">不更新</p>
            <p class="version_text_xin" v-if="item.updateType == 2">强制更新</p>
            <p class="version_text_xin" v-if="item.updateType == 3">提示更新</p>
            <p class="version_text_xin" v-if="item.updateType == 4">半强制更新,WiFi下更新</p>
        </div>
        <div class="version_footer">
            <span class="version_date">{{item.dataCreateTime}}</span>
            <span class="version_icon" @click="handleRender(1,item.versionCode)">
                <Icon type="ios-copy-outline"></Icon>
            </span>
            <span class="version_icon" @click="handleRender(1,item.versionCode,2)">
                <Icon type="edit"></Icon>
            </span>
            <span class="version_icon">
                <Poptip
                    confirm
                    transfer
                    title="确认删除吗?"
                    @on-ok="ok(item.versionCode)"
                    @on-cancel="cancel">
                    <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                </Poptip>
            </span>
        </div>
      </li>
    </ul>
    <!-- 添加模板 -->
    <Modal
        title="添加(编辑)版本"
        v-model="modal8"
        @on-ok="handleSubmit('formValidate')"
        @on-cancel="handleReset('formValidate')"
        ok-text="提交保存"
        cancel-text="关闭"
        class-name="vertical-center-modal"
        width="800"
        :loading="loading"
        :mask-closable="false">
        <div class="newtype_file">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem  label="图标:" prop="productlogo" class="newtype_leftfi clearfix">
                <img :src="formValidate.logoUrl1" alt="" class="left">
                <Input v-model="formValidate.productlogo" style="display:none" class="ml25"></Input><Upload
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError1"
                :before-upload="handleUpload"
                :show-upload-list="false"                        
                action=''>
                  <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">选择</Button>
                </Upload>
              </FormItem>
              <FormItem label="版本号: " prop="edition">
                  <Input v-model="formValidate.edition" placeholder="请输入版本号"></Input>
              </FormItem>
              <FormItem label="包名: " prop="packageName">
                  <Input v-model="formValidate.packageName" placeholder="请输入包名"></Input>
              </FormItem>
              <FormItem label="操作系统: " prop="gender">
                  <RadioGroup v-model="formValidate.gender">
                      <Radio label="Android">安卓</Radio>
                      <Radio label="iOS">iOS</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="版本状态: " prop="version">
                  <RadioGroup v-model="formValidate.version">
                      <Radio label="1">不更新</Radio>
                      <Radio label="2">强制更新</Radio>
                      <Radio label="3">提示更新</Radio>
                      <Radio label="4">半强制更新,WiFi下更新</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="下载地址: " prop="address">
                  <Input v-model="formValidate.address" placeholder="请输入下载地址"></Input>
              </FormItem>
              <FormItem label="升级标题: " prop="title">
                  <Input v-model="formValidate.title" placeholder="请输入升级标题"></Input>
              </FormItem>
              <FormItem label="升级内容: " prop="desc">
                  <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入升级内容"></Input>
              </FormItem>
          </Form>
        </div>
    </Modal>
    <div class="tr mt15">
      <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
  </div>
 </template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      loading: true,
      powerful: '',
      versionnumber: [], // 版本号
      modal8: false,
      total: 0,
      startRow: 1,
      endRow: 10,
      versionCode: "",
      formValidate: {
        logoUrl1: require("../../image/moren.png"),
        productlogo: "",
        edition: "",
        packageName: "",
        gender: "",
        version: "",
        address: "",
        title: "",
        desc: ""
      },
      ruleValidate: {
        edition: [{ required: true, message: "请输入版本号", trigger: "blur" }],
        productlogo: [
          { required: true, message: "请输选择图标", trigger: "blur" }
        ],
        packageName: [
          { required: true, message: "请输入包名", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请选择操作系统", trigger: "change" }
        ],
        version: [
          {
            required: true,
            type: "string",
            message: "请选择版本状态",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            type: "string",
            message: "请输入下载地址",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            type: "string",
            message: "请输入升级标题",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入升级内容", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "升级内容不能少于20个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  created() {
    this.query();
  },
  methods: {
    pageConfigguration(versionnumber){
      // console.log()
      utils.putlocal('versionnumber',versionnumber)
      this.$router.push({path:'pageConfigguration'})
    },
    query() {
      this.http
        .post(BASE_URL + "/system/appVersion/getAppVersionList", {
          appCode: utils.getCookie("appCode"),
          pageNum: this.startRow == 0 ? 1 : this.startRow,
          pageSize: this.endRow
        })
        .then(data => {
          // console.log(data)
          if (data.code == "success") {
            this.versionnumber = data.data.dataList;
            this.total = Number(data.data.total);
            this.startRow = Math.ceil(data.data.startRow / this.endRow);
            if (Number(data.data.total) == 0) {
              this.startRow = 1;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pageChange(page) {
      this.startRow = page;
      this.query();
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.query();
    },
    handleRender(num, versionCode,number) {
      this.powerful = ""
      if (num == 1) {
        this.versionCode = ""
        if(number == 2){
          this.versionCode = versionCode
          this.powerful = 'compiler'
        } else {
          this.versionCode = versionCode
          this.powerful = 'copy'
        }
        this.http
          .post(BASE_URL + "/system/appVersion/getAppVersionByCode", {
            versionCode: versionCode
          })
          .then(data => {
            if (data.code == "success") {
              this.formValidate.productlogo = data.data.logoUrl; // 图标路径
              this.formValidate.logoUrl1 = data.data.logoUrl;
              this.formValidate.edition = data.data.appVersion; // 版本号
              this.formValidate.packageName = data.data.appIdentifier; // 包名
              this.formValidate.gender = data.data.appType; // app类型
              this.formValidate.version = data.data.updateType + ""; // 版本类型
              this.formValidate.address = data.data.appUrl; // 下载地址
              this.formValidate.title = data.data.updateTitle; // 更新标题
              this.formValidate.desc = data.data.updateDetails; // 更新内容
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.modal8 = true;
    },
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    handleUpload(file) {
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
          },
          timeout: 1000 * 60 * 5
        };
        this.http
          .post(BASE_URL + "/fileUpload", formData, config)
          .then(resp => {
            if (resp.code == "success") {
              this.formValidate.productlogo = resp.data;
              this.formValidate.logoUrl1 = resp.data;
            } else {
            }
          })
          .catch(() => {});
        this.formValidate.productlogo = file.name;
        return false;
      }
      // return false
    },
    handleSubmit(name) {
      // console.log(this.powerful)
      let httpurl
      if(this.powerful == 'copy'){
        httpurl = "/loan/versioncopy/copyVersion"// 复制
      } else if(this.powerful == 'compiler'){
        httpurl = "/loan/versioncopy/versionModify"// 编辑
      } else {
        httpurl = "/system/appVersion/saveAppVersion" // 保存
      }
      // console.log(httpurl)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.http
            .post(BASE_URL + httpurl, {
              logoUrl: this.formValidate.productlogo, // 图标路径
              appVersion: this.formValidate.edition, // 版本号
              appIdentifier: this.formValidate.packageName, // 包名
              appType: this.formValidate.gender, // app类型
              updateType: this.formValidate.version, // 版本类型
              appUrl: this.formValidate.address, // 下载地址
              updateTitle: this.formValidate.title, // 更新标题
              updateDetails: this.formValidate.desc, // 更新内容
              appCode: utils.getCookie("appCode"),
              versionCode: this.versionCode
            })
            .then(data => {
              console.log(data);
              if (data.code == "success") {
                this.$Message.success("提交成功!");
                this.modal8 = false;
                this.query();
                this.formValidate.logoUrl1 = require("../../image/moren.png");
                this.formValidate.productlogo = "";
                this.$refs[name].resetFields();
              } else {
                this.$Message.success(data.message);
              }
            })
            .catch(err => {
              this.$Message.success("提交失败!");
            });
        } else {
          return this.changeLoading();
        }
      });
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    handleReset(name) {
      this.formValidate.logoUrl1 = require("../../image/moren.png");
      this.formValidate.productlogo = "";
      this.$refs[name].resetFields();
    },
    ok(versionCode) {
      this.http.post(BASE_URL+"/loan/versioncopy/versionDelete",{versionCode:versionCode}).then(data=>{
        console.log(data)
        if(data.code == 'success'){
          this.$Message.info("删除成功！");
          this.query()
        }else {
          this.$Message.info("删除失败！");
        }
      }).catch(err=>{
        this.$Message.info("删除失败！");
        console.log(err)
      })
    },
    cancel() {
      this.$Message.info("删除失败！");
    },
    routerlink (code, fier, version, type, item) {
      let classification = this.$route.query.num
      utils.putlocal('versionnumber',item)
      this.$router.push({ path: './pageConfigguration?versionCode='+code +'&appIdentifier='+ fier +'&appVersion='+version +'&appType='+type+'&nums='+classification })
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-btn.ivu-btn-ghost {
  margin-left: 20px;
  margin-top: 26px;
}
.newtype_leftfi {
  margin-bottom: 15px;
  margin-left: 22px;
}
.newtype_leftfi img {
  width: 100px;
  height: 100px;
}
.version_date {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 80px;
}
.version_footer {
  margin-top: 20px;
  margin-left: 7px;
}
.version_text_version,
.version_text_lian {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.version_icon {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  cursor: pointer;
}
.version_icon:hover {
  background-color: rgb(226, 222, 222);
}
.version_text_lian {
  font-size: 14px;
}
.version_text {
  margin-top: 32px;
  margin-left: 110px;
}
.android {
  width: 50px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #fff;
  border-radius: 5px;
  background-color: #3399ff;
  font-size: 12px;
  margin-top: -20px;
  margin-right: 10px;
}
.version_img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-top: 18px;
  margin-left: 8px;
  cursor: pointer;
}
.version_img > img {
  width: 100%;
  height: 100%;
}
.version_list {
  width: 100%;
}
.version {
  width: 330px;
  // height: 160px;
  padding: 10px 10px;
  padding-top: 0px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
.addButton > a {
  display: block;
  width: 100px;
  text-align: center;
  border: 1px solid rgb(119, 118, 118);
  border-radius: 32px;
  height: 32px;
  line-height: 32px;
}
</style>
