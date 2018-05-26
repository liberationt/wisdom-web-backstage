<template>
  <div>
     <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;页面配置>&nbsp;首页导航H5</span>
        </p>
      </div>
      <div class="homePage clearfix">
          <h1 class="homePage_h1">首页导航APP
             <p data-v-38176e38="" class="homePage_button right"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加</p>
          </h1>
          <!-- 贷款超市 -->
         <ul class="homePage_icon left">
           <li>
             <p class="icon">
               <img src="../../image/bg.jpg" alt="">
             </p>
             <p class="homePage_text">贷款超市</p>
             <p>
               <span class="edit_icon" @click="modal1 = true"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
         <!-- POS申领 -->
         <ul class="homePage_icon left">
           <li>
             <p class="icon">
               <img src="../../image/bg.jpg" alt="">
             </p>
             <p class="homePage_text">POS申领</p>
             <p>
               <span class="edit_icon" @click="modal1 = true"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
         <!-- 办信用卡 -->
         <ul class="homePage_icon left">
           <li>
             <p class="icon">
               <img src="../../image/bg.jpg" alt="">
             </p>
             <p class="homePage_text">办信用卡</p>
             <p>
               <span class="edit_icon" @click="modal1 = true"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
         <!-- 无卡支付 -->
         <ul class="homePage_icon left">
           <li>
             <p class="icon">
               <img src="../../image/bg.jpg" alt="">
             </p>
             <p class="homePage_text">无卡支付</p>
             <p>
               <span class="edit_icon" @click="modal1 = true"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
         <!-- 金粉论坛 -->
         <ul class="homePage_icon left">
           <li>
             <p class="icon">
               <img src="../../image/bg.jpg" alt="">
             </p>
             <p class="homePage_text">金粉论坛</p>
             <p>
               <span class="edit_icon" @click="modal1 = true"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
      </div>
      <!-- 提示框 -->
        <Modal
        v-model="modal1"
        title="添加（编辑首页）导航"
        @on-ok="ok"
        @on-cancel="cancel"
        width="500">
        <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
        <Input v-model="value" placeholder="请输入导航标题" style="width: 300px" class="input"></Input>
        <!-- select 菜单 -->
        <Row>
        <Col span="12" style="padding-right:10px">
            <Select v-model="model1" filterable @on-change="model11">
                <Option v-for="item1 in pageList" :value="item1.value1" :key="item1.value1">{{ item1.label1 }}</Option>
            </Select>
        </Col>
        <Col span="12" v-if="col">
            <Select v-model="model2" filterable>
                <Option v-for="item2 in cpageList" :value="item2.value2" :key="item2.value2">{{ item2 .label2 }}</Option>
            </Select>
        </Col>
        </Row>
        <Input v-model="value1" placeholder="" style="width: 300px" class="input" v-if="link"></Input>
      </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      defaultList: [
        {
          name: "bc7521e033abdd1e92222d733590f104",
          url:
            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ],
      imgName: "",
      visible: false,
      uploadList: [],
      value: "",
      value1: "",
      pageList: [
        {
            value1: '原生页面',
            label1: '原生页面'
        },
        {
            value1: 'H5页面',
            label1: 'H5页面'
        }
      ],
      model1: '原生页面',
      cpageList: [
        {
            value2: '贷款列表',
            label2: '贷款列表'
        },
        {
            value2: 'H5页面',
            label2: 'H5页面'
        }
      ],
      model2: '贷款列表',
      link: false,
      col: true
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    deleteOk() {
      this.$Message.info("删除成功！");
    },
    deleteCancel() {
      this.$Message.info("删除失败！");
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    model11 (){
      if(this.model1 == 'H5页面'){
        this.link = true,
        this.col = false
      } else {
        this.link = false,
        this.col = true 
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less" scoped>
.input {
  height: 60px;
  display: block;
  margin-top: 15px;
}
.homePage_text {
  font-size: 19px;
  margin-bottom: 5px;
}
.homePage_icon .icon {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin: 10px auto;
  background-color: #f2f2f2;
}
.homePage_icon .icon > img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
}
.homePage_icon {
  margin-top: 20px;
  margin-left: 50px;
}
.homePage_icon li {
  border: 1px solid #ccc;
  width: 150px;
  text-align: center;
}
.homePage {
  margin-bottom: 25px;
  width: 100%;
  border: 1px solid #ccc;
  padding-bottom: 40px;
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
  margin-left: 20px;
}
.homePage_button[data-v-38176e38] {
  width: 80px;
  border-radius: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
// 上传图片 style
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

