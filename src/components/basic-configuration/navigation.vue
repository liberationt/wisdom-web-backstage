<template>
  <div>
     <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;页面配置>&nbsp;首页导航H5</span>
        </p>
      </div>
      <div class="homePage clearfix">
          <div class="clearfix">
            <p data-v-38176e38="" @click="addapp" class="left homePage_button mr20"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加</p>
            <!-- <Button type="info" class="left w60 ml20" @click="bankupdate">更新</Button> -->
          </div>
          <!-- 贷款超市 -->
         <ul class="homePage_icon clearfix">
           <li class="left mr20 dataList" v-for="item in dataList">
             <p class="icon">
               <img :src=item.guideLogoUrl alt="">
             </p>
             <p class="homePage_text">{{item.guideName}}</p>
             <p>
               <!-- <InputNumber class="banknumint left ml10" :min="0" v-model="item.bannerNo"></InputNumber> -->
               <span class="edit_icon" @click="edit_icon(item.guideCode)"><Icon type="android-create"></Icon></span>
               <span class="edit_icon">
                  <Poptip
                      confirm
                      transfer
                      title="确认删除吗?"
                      @on-ok="deleteOk(item.guideCode)"
                      @on-cancel="deleteCancel">
                      <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                  </Poptip>
               </span>
             </p>
           </li>
         </ul>
      </div>
      <!-- <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" class="right" show-sizer show-total></Page> -->
      <!-- 提示框 -->
        <Modal
        v-model="modal1"
        title="添加（编辑首页）导航"
        @on-ok="ok"
        @on-cancel="cancel"
        :mask-closable="false"
        width="500"
        :loading="loading">
        <Upload
          :format="['jpg','jpeg','png']"
          :on-format-error="handleFormatError1"
          :before-upload="handleUpload"
          :show-upload-list="false"                        
          action=''
          class="homePage_img_img left">
          <div>
            <span class="homePage_img_img left">
                <img :src="banklogo" alt="">
            </span>
          </div>
          <p style="color:red" v-show="isurl">请选择图片</p>
        </Upload>
        <Input v-model="value2" placeholder="请输入导航标题" style="width: 300px" class="input minput"></Input>
        <p class="jiaoyan" v-show="iskong">导航标题不能为空</p>
        <!-- select 菜单 -->
        <Row>
        <Col span="12" class="left ml10" style="padding-right:10px;width:150px;">
            <Select v-model="modell" filterable @on-change="model11">
                <Option v-for="item1 in pageList" :value="item1.value1" :key="item1.value1">{{ item1.label1 }}</Option>
            </Select>
        </Col>
        <Col span="12" class="left ml4" v-if="col" style="width:150px;">
            <Select v-model="value1" filterable>
                <Option v-for="item2 in cpageList" :value="item2.jumpUrl" :key="item2.jumpUrl">{{ item2 .jumpName }}</Option>
            </Select>
        </Col>
        </Row>
        <Input v-model="value3" placeholder="请输入地址" style="width: 300px" class="input minput" v-if="link"></Input>
      </Modal>
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      iskong: false,
      banklogo: require('../../image/moren.png'),
      modal1: false,
      defaultList: [
        {
          name: 'bc7521e033abdd1e92222d733590f104',
          url:
            'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      isedit:'',
      isurl: false,
      imgurl:'',
      dataList:[2,2],
      imgName: '',
      visible: false,
      uploadList: [],
      value2: '',
      value1: '',
      value3:'',
      loading: true,
      guideCode:'',
      pageList: [
        {
          value1: '0',
          label1: '原生页面'
        },
        {
          value1: '1',
          label1: 'H5页面'
        }
      ],
      modell: '0',
      cpageList: [],
      // model2: '贷款列表',
      link: false,
      col: true,
      total: 0,
      startRow: 1,
      endRow: 10,
    }
  },
  methods: {
    // pageChange (page) {
    //   this.startRow = page
    //   this.query () 
    // },
    // pagesizechange (page) {
    //   this.startRow = 1
    //   this.endRow = page
    //   this.query ()
    // },
    query(){
      let versionnumber = utils.getlocal('versionnumber')
      this.http.post(BASE_URL+"/loan/guide/getGuideList",{
          versionCode : versionnumber.versionCode,
          pageSize : this.endRow,
          pageNum : this.startRow
        }).then(data=>{
        console.log(data)
        if(data.code == 'success'){
          this.dataList = data.data.dataList
        }
      }).catch(err=>{

      })
    },
    addapp(){
      this.guideCode = ''
      this.edit = ''
      this.modal1 = true
    },
    ok () {
      if(this.value2 == ''){
        this.changeLoading()
        this.iskong = true
        return false
      }
      if(this.imgurl == ''){
        this.changeLoading()
        this.isurl = true
        return false
      }
      let httpurl
      if(this.edit == 'is'){
        httpurl = "/loan/guide/updateGuideByCode"
      } else {
        httpurl = "/loan/guide/saveGuide"
      }
      let versionnumber = utils.getlocal('versionnumber')
      this.http.post(BASE_URL+httpurl,{
          guideAppType : versionnumber.appType,
          guideAppVersion : versionnumber.appVersion,
          guideAppIdentifier : versionnumber.appIdentifier,
          versionCode : versionnumber.versionCode,
          guideName : this.value2,
          jumpUrl : this.value1 ? this.value1:this.value3,
          jumpType : this.modell,
          guideLogoUrl : this.imgurl,
          guideCode : this.guideCode
        }).then(data=>{
        console.log(data)
        if(data.code == 'success'){
          this.modal1 = false;
          this.iskong = false;
          this.isurl = false;
          this.$Message.info('添加成功！')
          this.value2 = ''
          this.value1 = ''
          this.modell = '0'
          this.value3 = ''
          this.imgurl = ''
          this.link = false
          this.col = true
          this.banklogo = require('../../image/moren.png')
          this.query()
        } else {
          this.$Message.info('添加失败！')
          this.modal1 = false;
        }
      }).catch(err=>{
        console.log(err)  
        this.$Message.info('添加失败！')
        this.modal1 = false;
      })
    },
    cancel () {
      this.value2 = ''
      this.value1 = ''
      this.modell = '0'
      this.value3 = ''
      this.imgurl = ''
      this.model11()
      this.banklogo = require('../../image/moren.png')
      //this.$Message.info('Clicked cancel')
    },
    // 编辑
    edit_icon(guideCode){
      this.edit = 'is'
      this.guideCode = guideCode
      this.http.post(BASE_URL+"/loan/guide/getGuideByCode",{ guideCode : guideCode}).then(data=>{
        console.log(data)
        if(data.code == 'success'){
          this.value2 = data.data.guideName
          this.modell = data.data.jumpType+''
          this.model11()
          this.value1 = data.data.jumpUrl 
          this.value3 = data.data.jumpUrl
          this.banklogo = data.data.guideLogoUrl
          this.imgurl = data.data.guideLogoUrl
        }
      }).catch(err=>{
        console.log(err)
      })
      this.modal1 = true
    },
    deleteOk (guideCode) {
      this.http.post(BASE_URL+"/loan/guide/deleteGuideByCode",{guideCode:guideCode}).then(data=>{
        if(data.code == 'success'){
          this.$Message.info('删除成功')
          this.query()
        } else {
          this.$Message.info('删除失败')
        }
      }).catch(err=>{
        this.$Message.info('删除失败')
      })
      
    },
    deleteCancel () {
      this.$Message.info('删除失败！')
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // handleView (name) {
    //   this.imgName = name
    //   this.visible = true
    // },
    model11 () {
      if (this.modell === '1') {
        this.link = true
        this.col = false
        this.value1 = ''
      } else {
        this.link = false
        this.col = true
      }
    },  
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    handleUpload(file) {
      console.log(file)
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
              this.banklogo = resp.data
              this.imgurl = resp.data
              // this.formValidate.productlogo = resp.data;
              // this.formValidate.logoUrl1 = resp.data;
            } else {
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        // return false;
      }
      return false
    },
  },
  mounted () {
    this.http.post(BASE_URL+"/loan/guide/jumpParam",{}).then(data=>{
      console.log(data)
      // if(data.code == 'success'){
        this.cpageList = data.data
      // }
    }).catch(err=>{
      console.log(err)
    })
    this.query()
  }
}
</script>
<style lang="less" scoped>
.input {
  height: 36px;
  display: block;
}
.minput {
  margin-left: 90px;
}
.jiaoyan{
  color: red;
  margin-left: 90px;
}
.homePage_text {
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
  font-size: 19px;
  margin-bottom: 5px;
}
.dataList {
  margin-bottom: 20px;
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
  // border: 1px solid #ccc;
  padding-bottom: 40px;
}
// .homePage_h1 {
//   border-bottom: 1px solid #ccc;
//   padding: 10px 0 5px 0;
//   margin-left: 20px;
// }
.homePage_button {
  width: 80px;
  height: 30px;
  line-height: 30px;
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
.homePage_img_img {
  display: inline-block;
  width: 80px;
  height: 80px;
  z-index: 999;
}
.homePage_img_img > img {
  width: 100%;
  height: 100%;
}
.ivu-row {
  position: static !important;
}
</style>
