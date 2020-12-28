<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;分销>&nbsp;管理设置>&nbsp;版本页面配置列表</span>
        </p>
      </div>
      <div class="clearfix conditioncss">
        <Button type="info" class="left  w90 ml20 toupdate" icon="plus-round" @click="bankshow()">添加</Button>
        <Button type="info" class="left  w90 ml20 toupdate" @click="bankupdate">更新</Button>
        <Button type="warning"  class="left  w90 ml20 toupdate" @click=" backingout">返回</Button>
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
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="90">
              <FormItem label="图片名称" prop="bannername" v-if="$route.query.locationType==2||$route.query.locationType==3">
                <Input v-model="formValidate1.bannername" placeholder="请输入图片名称"></Input>
              </FormItem>
              <FormItem label="是否跳转" prop="mark" v-if='$route.query.locationType==0||$route.query.locationType==1'>
                <Select v-model="formValidate1.mark" @on-change='cornermarks' style="width:120px" placeholder="不跳转">
                  <Option value="1">跳转</Option>
                  <Option value="0">不跳转</Option>
                </Select>
              </FormItem>
              <FormItem label="跳转URL" prop="desc" v-if="formValidate1.mark==1">
                <Input v-model="formValidate1.desc" placeholder="请输入跳转URL"></Input>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>
      <div class="contentcss clearfix mt10">     
      <ul class="homePage_icon left" style="padding:0 50px">
        <li v-for="(item,i) in bankdatalist" :key='i'>
          <p class="icon">
            <img :src="item.bannerUrl" alt="">
          </p>
          <p v-if='$route.query.locationType==2||$route.query.locationType==3'>{{item.bannerName}}</p>
          <p class="clearfix haomePage_edit">
            <InputNumber class="banknumint" :min="0" v-model="item.bannerNo"></InputNumber>
            <span class="onshelf">
              <Button v-if="item.status==1" @click="upper(item.bannerCode, 0)" type="primary">上架</Button>
              <Button v-if="item.status==0"  @click="lower(item.bannerCode, 1)" type="error">下架</Button>
            </span>
            <span class="edit_icon right ml5" @click="bankecho(item.bannerCode)"><Icon type="edit"></Icon></span>
            <span class="edit_icon right " v-if="item.status==0">
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
  </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      bannerCode:'',
      modal1: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      banktitle: '添加图片',
      banklogo: require('../../image/moren.png'),
      banksrc: '',
      cornersrc: '',
      markurl: true,
      formValidate1: {
        mark: '0',
        desc: '',
        bannername:'',
        jupmtype:''
      },
      jumpAppParams: [],
      ruleValidate1: {
        bannername:[
          { required: true, message: '请输入图片名称', trigger: 'blur' },
          {required: true, message: '图片名称最多20字',max: 20,trigger: 'change'}
        ],
        desc: [
          { required: true, message: '请输入跳转URL！', trigger: 'blur' },
				  {required: true, message: '跳转URL最多100字符', max:100,trigger: 'change'}
        ]
      },
      bankdatalist: []
    }
  },
  methods: {
    // 返回
    backingout () {
      window.history.go(-1);
    },
    pageChange (page) {
      this.startRow = page
        this.banklist ()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.banklist ()
    },
    bankshow () {
      this.modal1 = true
      this.banktitle = '添加图片'
    },
    // 新增银行卡
    handleSubmit1 (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.changeLoading()
          this.Preservation ()
        }
      })
		},
    Preservation () {
      if (this.banksrc == '') {
        const title = '上传文件'
        let content = '<p>请先上传图片</p>'
        this.$Modal.warning({
          title: title,
          content: content
        })
        return false
      }
      let data = {
        bannerUrl :this.banksrc,
        jumpStatus : this.formValidate1.mark,
        locationType:this.$route.query.locationType,
        jumpUrl :this.formValidate1.mark==0?'':this.formValidate1.desc,
        bannerName:this.formValidate1.bannername==''?'':this.formValidate1.bannername
      }
      let urls 
      let tittle
      if(this.banktitle=='添加图片'){
         urls ='/vshop/banner/save'
         tittle = '添加成功'
      }else{
        urls = '/vshop/banner/updateByCode'
        data.bannerCode=this.bannerCode
        tittle = '修改成功'
      }
      this.http.post(BASE_URL+urls,data)
      .then(data=>{
        if(data.code=='success'){
          this.$Message.success(tittle)
          this.modal1 =false
          this.$refs['formValidate1'].resetFields()
          this.banklogo = require('../../image/moren.png')
          this.banksrc = '',
          this.formValidate1.desc='',
          this.formValidate1.bannerName = ''
          this.banklist()
        }
      })
    },
    // 编辑回显
    bankecho (code) {
      this.modal1 = true
      this.banktitle = '编辑图片'
      this.http.post(BASE_URL+'/vshop/banner/getByCode',{data:code})
      .then(data=>{
        if(data.code=='success'){
          this.banklogo = data.data.bannerUrl
          this.banksrc = data.data.bannerUrl,
          this.formValidate1.desc=data.data.jumpUrl,
          this.formValidate1.mark = String(data.data.jumpStatus)
          this.formValidate1.bannername=data.data.bannerName
          this.bannerCode = data.data.bannerCode
        }
      })
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleReset1 (name) {
      this.formValidate1.desc=''
      this.banksrc = ''
      this.banklogo = require('../../image/moren.png')
      this.formValidate1.bannername =''
      this.$refs[name].resetFields()
    },
    // 跳转不跳转显示
    cornermarks (val) {
     this.formValidate1.mark=val
    },
    // 上架
    upper (bannerCode,num) {
      this.$Modal.confirm({
          title: '下架',
          content: '<p>确认要下架吗?</p>',
          onOk: () => {
            this.bankshelf (bannerCode,num)
          },
          onCancel: () => {
          }
        })
    },
    // 下架
    lower (bannerCode,num) {
      this.$Modal.confirm({
          title: '上架',
          content: '<p>确认要上架吗?</p>',
          onOk: () => {
            this.bankshelf (bannerCode,num)
          },
          onCancel: () => {
          }
        })
    },
    // 删除
    deleteOk (bannerCode) {
      let data = {
        data:bannerCode
      }
      this.http.post(BASE_URL+'/vshop/banner/deleteByCode',data)
      .then(data=>{
        if(data.code=='success'){
          this.$Message.success('删除成功')
          this.banklist()
        }else{
          this.$Message.error(data.message)
        }
      })
    },
    // 银行卡列表
    banklist () {
      let data = {
        pageNum: this.startRow,
        pageSize: this.endRow,
        locationType: this.$route.query.locationType
      }
      this.http.post(BASE_URL+'/vshop/banner/queryPage',data)
      .then(data=>{
        if(data.code=='success'){
          this.bankdatalist = data.data.dataList
          this.total = data.data.total
        }
      })
    },
    // 上传图片
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
    bankshelf (bannerCode,num) {
      let data ={
        bannerCode:bannerCode,
        status:num
      }
      this.http.post(BASE_URL+'/vshop/banner/updateByCode',data)
      .then(data=>{
        if(data.code=='success'){
          if(num==0){
            this.$Message.success('下架成功')
          }else{
            this.$Message.success('上架成功')
          }
          this.banklist()
        }
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
      this.http.post(BASE_URL+'/vshop/banner/batchUpdateBanner', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.$Message.success('更新成功')
          this.banklist ()
        } 
      })
      .catch(() => {
      })
    }
  },
  mounted () {
    this.banklist()
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
  // margin-top: 20px;
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
    background: #f6fafd;
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
