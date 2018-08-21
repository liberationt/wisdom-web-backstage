<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;百信钱袋>&nbsp;信用卡中心</span>
        </p>
      </div>
      <div class="clearfix">
        <p data-v-38176e38="" @click="bankshow(1)" class="homePage_button left"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加</p>
        <Button type="info" v-if="num != 2" class="left mt20 w60 ml20 toupdate" @click="bankupdate">更新</Button>
      </div>    
      <Modal
        v-model="modal1"
        :title=banktitle
        @on-ok="handleSubmit1('formValidate1')"
        @on-cancel="handleReset1('formValidate1')"
        :mask-closable="false"
        :loading='loading'>
        <div class="clearfix">
          <div class="upload_img left mt20" style="margin-left:80px">
            <p><img :src="banklogo" alt=""></p>
            <p>
              <Upload
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError1"
              :before-upload="handleUpload"
              :show-upload-list="false"                        
              action=''>
                <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:5px;margin-left:12px">浏览</Button>
              </Upload>
            </p>
          </div>
          <div class="upload_information left ml10">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
              <FormItem label="是否跳转" prop="mark">
                <Select v-model="formValidate1.mark" @on-change='cornermark' placeholder="不跳转">
                  <Option value="1">跳转</Option>
                  <Option value="0">不跳转</Option>
                </Select>
              </FormItem>
              <FormItem label="跳转页面" prop="layout" v-if="nojump">
                <Select v-model="formValidate1.layout" @on-change='primordial' placeholder="原生页面">
                  <Option value="1">原生页面</Option>
                  <Option value="0">H5</Option>
                </Select>
              </FormItem>
              <FormItem label="" prop="home" v-if="homelist">
                <Select v-model="formValidate1.home"  placeholder="请选择">
                  <Option v-for="rem in jumpAppParams" :value="rem.jumpUrl">{{rem.jumpName}}</Option>                  
                </Select>
              </FormItem>
              <FormItem label="跳转URL" prop="desc" v-if="moveh5">
                <Input v-model="formValidate1.desc" placeholder="请输入跳转URL"></Input>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>

      <ul class="homePage_icon left" style="padding:0 50px">
        <li v-for="item in bankdatalist">
          <p class="icon">
            <img :src="item.bannerUrl" alt="" v-if="num == 1">
            <img :src="item.photoUrl" alt="" v-if="num == 2">
          </p>
          <p class="clearfix haomePage_edit">
            <InputNumber v-if="num != 2" class="banknumint" :min="0" v-model="item.bannerNo"></InputNumber>
            <span class="onshelf" v-if="num == 1">
              <Button v-if="item.status==1"  @click="edit_icon_colorB(item.bannerCode, 0)" type="primary">上架</Button>
              <Button v-if="item.status==0"  @click="edit_icon_colorR(item.bannerCode, 1)" type="error">下架</Button>
            </span>
            <span class="onshelf" v-if="num == 2">
              <Button v-if="item.advertisementState==1" @click="edit_icon_colorB(item.advertisementCode, 0)" type="primary">上架</Button>
              <Button v-if="item.advertisementState==0" @click="edit_icon_colorR(item.advertisementCode, 1)" type="error">下架</Button>
            </span>
            <span class="onshelf" v-if="fiveh == 1">
              <Button v-if="item.bannerState==1" @click="edit_icon_colorB(item.bannerCode, 0)" type="primary">上架</Button>
              <Button v-if="item.bannerState==0" @click="edit_icon_colorR(item.bannerCode, 1)" type="error">下架</Button>
            </span>
            
            <span v-if="num == 1" class="edit_icon right ml5" @click="bankshow(2, item.bannerCode)"><Icon type="edit"></Icon></span>
            <span v-if="num == 2" class="edit_icon right ml5" @click="bankshow(2, item.advertisementCode)"><Icon type="edit"></Icon></span>
            <span v-if="item.status==0" class="edit_icon right " >      
              <Poptip
                confirm
                transfer
                title="确认删除吗?"
                @on-ok="deleteOk(item.bannerCode)"
                >
                <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
              </Poptip>           
          </span>
          <span v-if="item.advertisementState==0" class="edit_icon right " >      
              <Poptip
                confirm
                transfer
                title="确认删除吗?"
                @on-ok="deleteOk(item.advertisementCode)"
                >
                <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
              </Poptip>           
          </span>
          <span v-if="item.bannerState==0" class="edit_icon right " >      
              <Poptip
                confirm
                transfer
                title="确认删除吗?"
                @on-ok="deleteOk(item.bannerCode)"
                >
                <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
              </Poptip>           
          </span>
        </p>
      </li>
    </ul>
    <div class="mt15 w100b tr right" style="">
    <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      loading: true,
      nojump: false,
      homelist:false,
      moveh5: false,
      locationtype:this.$route.query.banner,
      num:this.$route.query.img,
      fiveh:this.$route.query.fiveh,
      total: 0,
      startRow: 1,
      endRow: 10,
      banktitle: '添加轮播图',
      banklogo: require('../../image/moren.png'),
      banksrc: '',
      cornersrc: '',
      bannerCode: '',
      markurl: true,
      formValidate1: {
        mark: '0',
        layout:'1',
        home: '',
        desc: ''
      },
      jumpAppParams: [],
      ruleValidate1: {
        // mark: [
        //   { required: true, message: '请选择是否跳转！', trigger: 'blur' }
        // ],
        // layout: [
        //   { required: true, message: '请选择跳转页面！', trigger: 'blur' }
        // ],
        // home: [
        //   { required: true, message: '请选择跳转页面！', trigger: 'blur' }
        // ],
        desc: [
          { required: true, message: '请输入跳转URL！', trigger: 'blur' }
        ]
      },
      bankdatalist: []
    }
  },
  methods: {
    pageChange (page) {
      this.startRow = page
        this.banklist () 
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.banklist ()
    },
    bankshow (num, code) {
      this.modal1 = true
      if (num == 1) {
        this.banktitle = '添加轮播图'
      } else {
        this.banktitle = '编辑轮播图'
        this.bankecho (code)
      }     
    },
    // 新增银行卡
    handleSubmit1 (name) {
      if (this.$route.query.fiveh==0) {
        this.nojump = false
        this.homelist = false
        this.moveh5 = true
      }
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.changeLoading()
          this.Preservation ()
          this.$refs[name].resetFields()
        }
      })
    },
    Preservation () {
      if (this.banksrc == '') {
        const title = '上传文件'
        let content = '<p>请先上传轮播图</p>'
        this.$Modal.warning({
          title: title,
          content: content
        })
        return false
      }
      let url
      let title
      let content
      let list
      let jumpUrl
        if (this.formValidate1.layout == 1) {
          jumpUrl = this.formValidate1.home
        } else {
          jumpUrl = this.formValidate1.desc
        }
      if (this.banktitle == '添加轮播图') {
        let urls
        if (this.$route.query.img == 1) {
          urls = '/loan/banner/saveBanner'
        } else if (this.$route.query.img == 2) {
          urls = '/loan/appAdvertisement/saveAppAdvertisement'
        }
        if (this.fiveh == 1) {
          urls = '/credit/banner/saveBanner'
        }
        url = BASE_URL + urls
        title = '添加轮播图'
        content = '<p>添加成功</p>'     
      if (this.$route.query.img == 1) {
        list = {
        bannerUrl :this.banksrc,
        jumpStatus : this.formValidate1.mark,
        jumpType : this.formValidate1.layout,
        jumpUrl : jumpUrl,
        versionCode: this.$route.query.versionCode,
        bannerAppIdentifier : this.$route.query.appIdentifier,
        bannerAppVersion: this.$route.query.appVersion,
        bannerAppType: this.$route.query.appType,
        locationType : this.locationtype
      }
      if (this.$route.query.fiveh==0) {
        list = {
          bannerUrl :this.banksrc,
          jumpStatus : this.formValidate1.mark,
          jumpUrl : this.formValidate1.desc,
          locationType:9
        }
      } else if (this.$route.query.fiveh==1) {
        list = {
          bannerUrl :this.banksrc,
          jumpStatus : this.formValidate1.mark,
          jumpUrl : this.formValidate1.desc
        }
      }
      } else if (this.$route.query.img == 2) {
        list = {
          photoUrl :this.banksrc,
          jumpStatus : this.formValidate1.mark,
          jumpType : this.formValidate1.layout,
          jumpUrl : jumpUrl,
          versionCode: this.$route.query.versionCode,
          appIdentifier : this.$route.query.appIdentifier,
          appVersion: this.$route.query.appVersion,
          appType: this.$route.query.appType
        }
      }
      } else {
        let urls
        if (this.$route.query.img == 1) {
          urls = '/loan/banner/modifyBannerByCode'
            list = {
              bannerUrl :this.banksrc,
              jumpStatus : this.formValidate1.mark,
              jumpType : this.formValidate1.layout,
              jumpUrl : jumpUrl,
              versionCode: this.$route.query.versionCode,
              appIdentifier : this.$route.query.appIdentifier,
              appVersion: this.$route.query.appVersion,
              appType: this.$route.query.appType,
              bannerCode: this.bannerCode,
              locationType:this.locationtype
            }
        } else if (this.$route.query.img == 2) {
          urls = '/loan/appAdvertisement/updateAppAdvertisementByCode'
            list = {
              photoUrl :this.banksrc,
              jumpStatus : this.formValidate1.mark,
              jumpType : this.formValidate1.layout,
              jumpUrl : jumpUrl,
              versionCode: this.$route.query.versionCode,
              appIdentifier : this.$route.query.appIdentifier,
              appVersion: this.$route.query.appVersion,
              appType: this.$route.query.appType,
              advertisementCode: this.bannerCode
            }
        }
        if (this.fiveh == 1) {
          list = {
            bannerUrl :this.banksrc,
            jumpState : this.formValidate1.mark,
            jumpUrl : this.formValidate1.desc,
            bannerCode: this.bannerCode,
          }
          urls = '/credit/banner/modifyBannerByCode'
        }
        url = BASE_URL + urls
        title = '修改轮播图'
        content = '<p>修改成功</p>'
      }
        this.http.post(url, list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.changeLoading()           
            this.$Modal.success({
              title: title,
              content: content
            })
            this.modal1 = false
            this.banklist ()
          } else {

          }
        })
        .catch(() => {
        })

    },
    // 修改银行卡回显
    bankecho (code) {
      let list
      let url
      if (this.$route.query.img == 1) {
        url = '/loan/banner/getBannerByCode'
        list = {
          bannerCode: code
        }
      } else if (this.$route.query.img == 2) {
        url = '/loan/appAdvertisement/getAppAdvertisementByCode'
        list = {
          advertisementCode: code
        }
      }
      if (this.fiveh == 1) {
        list = {
          bannerCode : code
        }
        url = '/credit/banner/getBannerByCode'

      }
      this.http.post(BASE_URL + url, list)
        .then((resp) => {
          if (resp.code == 'success') {           
            if (this.$route.query.img == 1) {
              this.banksrc = resp.data.bannerUrl
              this.banklogo = resp.data.bannerUrl
            } else if (this.$route.query.img == 2) {
              this.banksrc = resp.data.photoUrl
              this.banklogo = resp.data.photoUrl
            }
            this.formValidate1.mark = resp.data.jumpStatus+''
            this.formValidate1.layout = resp.data.jumpType+''                      
            if (resp.data.jumpStatus == 1) {//跳转
            if (resp.data.jumpType == 1) {//原生
              this.formValidate1.home = resp.data.jumpUrl
              this.moveh5 = false
              this.homelist = true
              this.formValidate1.desc = ''
            } else {//h5
              this.formValidate1.desc = resp.data.jumpUrl
              this.moveh5 = true
              this.homelist = true
              this.formValidate1.home = ''
            }
            } else {//不跳转
            this.formValidate1.home = ''
            this.formValidate1.desc = ''
            }
            if (this.num == 1) {
              this.bannerCode = resp.data.bannerCode
            } else if (this.num == 2) {
              this.bannerCode = resp.data.advertisementCode
            }
            if (this.fiveh == 1) {
              this.formValidate1.mark = resp.data.jumpState+''
              if (resp.data.jumpState == 0) {
                this.formValidate1.desc = ''
              } else {
                this.formValidate1.desc = resp.data.jumpUrl
              }             
            }
          } else {
          }
        })
        .catch(() => {
        })
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleReset1 (name) {
      this.$refs[name].resetFields()
    },
    // 跳转不跳转显示
    cornermark (val) {
      if (val == 0) {//不跳
        this.nojump = false
        this.homelist = false
        this.moveh5 = false
      } else {//跳
      if (this.$route.query.fiveh==0 || this.$route.query.fiveh==1) {
        this.nojump = false
        this.moveh5 = true
        this.homelist = false
      }
      if (!this.$route.query.fiveh) {
        this.nojump = true
        this.moveh5 = false
        this.homelist = true
      }        
      }
    },
    primordial (val) {
      if (val == 0) {//原生
        this.moveh5 = true
        this.homelist = false       
      } else {//h5
        this.moveh5 = false
        this.homelist = true
      }
    },
    // 上架
    edit_icon_colorB (code, num) {
      this.$Modal.confirm({
          title: '上架',
          content: '<p>确认要上架吗?</p>',
          onOk: () => {
            this.bankshelf (code, num)
          },
          onCancel: () => {              
          }
        })
    },
    // 下架
    edit_icon_colorR (code, num) {
      this.$Modal.confirm({
          title: '下架',
          content: '<p>确认要下架吗?</p>',
          onOk: () => {
            this.bankshelf (code, num)
          },
          onCancel: () => {            
          }
        })
    },
    // 银行卡删除
    deleteOk (code) {
      let list
      let url
      if (this.$route.query.img == 1) {
        url = '/loan/banner/deleteBannerByCode'
        list = {
          bannerCode: code
        }
      } else if (this.$route.query.img == 2) {
        url = '/loan/appAdvertisement/deleteAppAdvertisementByCode'
        list = {
          advertisementCode: code
        }
      }
      if (this.fiveh == 1) {
        list = {
          bannerCode: code
        }
        url = '/credit/banner/deleteBannerByCode'
      }
      this.http.post(BASE_URL + url, list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.banklist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    // 银行卡列表
    banklist () {
      let list = {
        pageNum: this.startRow,
        pageSize: this.endRow,
        versionCode: this.$route.query.versionCode
      }
      if (this.$route.query.img == 1) {
          list.locationType = this.locationtype
      }
      if (this.$route.query.fiveh==0) {
        list = {
          locationType:9
        }
      }
      let url
      if (this.$route.query.img == 1) {
        url = '/loan/banner/getBannerList'
      } else if (this.$route.query.img == 2) {
        url = '/loan/appAdvertisement/getAppAdvertisementList'
      }      
      if (this.$route.query.fiveh == 1) {
        list = {
          pageNum: this.startRow,
          pageSize: this.endRow,
        }
        url = '/credit/banner/getBannerList'
      }
      this.http.post(BASE_URL + url, list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.bankdatalist = resp.data.dataList
        this.total = Number(resp.data.total)
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
      } else {
      }
    })
    .catch(() => {
    })
    },
    // 上传银行卡
    handleUpload (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout:1000*60*5
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        this.banklogo = resp.data
        this.banksrc = resp.data
      } else {
      }
    })
    .catch(() => {
    })
      return false
      }
    },
    handleFormatError1 (file) {
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
    },
    // 银行卡上架
    bankshelf (code, num) {
      let list
      let url
      if (this.$route.query.img == 1) {
        url = '/loan/banner/modifyBannerByCode'
        list = {
          bannerCode: code,
          status: num
        }
      } else if (this.$route.query.img == 2) {
        url = '/loan/appAdvertisement/updateAppAdvertisementStateByCode'
        list = {
          advertisementCode: code,
          advertisementState: num
        }
      }
      if (this.fiveh == 1) {
        list = {
          bannerCode: code,
          bannerState: num
        }
        url = '/credit/banner/modifyBannerByCode'
      }
      this.http.post(BASE_URL + url, list)
      .then((resp) => {
        if (resp.code == 'success') {
          if (num == 0) {
            this.$Modal.success({
              title: '上架',
              content: '<p>上架成功</p>'         
            })
            this.banklist ()
          } else {
              const title = '下架'
              let content = '<p>下架成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.banklist ()
          }
        } else {
        }
      })
      .catch(() => {
      })
    },
    // 银行卡更新排序
    bankupdate () {
      this.$Modal.confirm({
          title: '更新排序',
          content: '<p>确认要更新排序吗?</p>',
          onOk: () => {
            this.updatelist ()
          },
          onCancel: () => {           
          }
        })
    },

    updatelist () {
      let list = []
      for (let i = 0; i < this.bankdatalist.length; i++) {
        let obj = new Object ()
        obj.bannerCode = this.bankdatalist[i].bannerCode
        obj.bannerNo = this.bankdatalist[i].bannerNo
        list.push (obj)
      }
      let url
      if (this.$route.query.img == 1) {
        url = '/loan/banner/batchModifyBanner'
      } else if (this.$route.query.img == 2) {
        url = '/loan/appAdvertisement/updateAppAdvertisementByCode'
      }
      if (this.fiveh == 1) {
        url = '/credit/banner/batchModifyBanner'
      }
      this.http.post(BASE_URL + url, list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.banklist ()
        } else {
        }
      })
      .catch(() => {
      })
    }
  },
  mounted () {
    this.banklist ()
    this.http.post(BASE_URL + '/loan/banner/jumpParam', {})
      .then((resp) => {
        if (resp.code == 'success') {
          this.jumpAppParams = resp.data
          this.formValidate1.home = resp.data[0].jumpUrl
        } else {
        }
      })
      .catch(() => {
      })
  }
};
</script>
<style lang="less" scoped>
.ivu-btn{
  padding: 2px 6px;
}
.toupdate{
  padding: 6px 15px;
}
.ivu-input-number-input {
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    width: 20px;
}
.bank_name img {
  width: 140px;
  height: 80px;
  border-radius: 5px;
  margin-right: 20px;
}
.mark_Img > img {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
}
//model
.upload_img p > img {
  width: 80px;
  height: 80px;
}
//bank
.bank_text {
  font-size: 18px;
  line-height: 46px;
  margin-bottom: 8px;
}
.bank_icon {
  width: 240px;
  height: 149px;
}
.home_bank {
  width: 240px;
  height: 260px;
}
.bank_icon > img {
  width: 100%;
  height: 100%;
}
.edit_icon_blue {
  background-color: #1bbc9b;
  color: #fff;
}
.edit_icon_red {
  background-color: #e26a6a;
  color: #fff;
}
.edit_icon_blue:hover {
  background-color: #158f76;
}
.haomePage_edit {
  padding: 0 15px;
  margin-top: 20px
}
.homePage_button[data-v-38176e38] {
  height: 35px;
  line-height: 35px;
  width: 100px;
  margin-top: 20px;
}
.homePage_icon {
  margin-left: 0px;
  margin-right: 50px;
  overflow: hidden;
  li{
    float: left;
    margin-right: 20px;
    margin-bottom: 15px;
    position: relative;
    .onshelf{
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
//tab

.layout-content {
  border-left: 1px solid #ccc;
}
.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.ivu-col-span-12 {
  width: 100%;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.demo-tabs-style2
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
