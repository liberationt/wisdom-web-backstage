<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;华赞金服>&nbsp;基础配置>&nbsp;信用卡中心</span>
        </p>
      </div>
      <Row :gutter="32">
        <Col span="12" class="demo-tabs-style2">
            <Tabs type="card" :animated="false"  @on-click="marketquery">
                <TabPane label="银行管理">
                  <div class="clearfix">
                    <p data-v-38176e38="" @click="bankshow(1)" class="homePage_button left"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加银行</p>
                    <Button type="info" class="left mt20 w60 ml20 toupdate" @click="bankupdate">更新</Button>
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
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:5px;margin-left:11px">浏览</Button>
                          </Upload>
                        </p>
                      </div>
                      <div class="upload_information left ml10">
                        <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
                          <FormItem label="银行名称" prop="bankname">
                            <Input v-model="formValidate1.bankname" placeholder="请输入银行名称"></Input>
                          </FormItem>
                          <FormItem label="角标" prop="mark">
                            <Select v-model="formValidate1.mark" @on-change='cornermark' placeholder="有">
                              <Option value="1">有</Option>
                              <Option value="0">无</Option>
                            </Select>
                          </FormItem>
                          <FormItem prop="cornermark" label="角标图片" v-if="markurl">
                            <span class="mark_Img left"><img :src="banklogomark" alt=""></span>
                            <Upload
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError1"
                            :before-upload="handleUploadmark"
                            :show-upload-list="false"                        
                            action=''>
                              <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:5px;margin-left:3px">浏览</Button>
                            </Upload>
                            <Input v-model="formValidate1.cornermark" class="hidden"></Input>
                            <!-- <Upload v-model="formValidate1.markimg" action="//jsonplaceholder.typicode.com/posts/">
                              <Button type="ghost">上传文件</Button>
                            </Upload> -->
                          </FormItem>
                          <FormItem label="跳转URL" prop="desc">
                            <Input v-model="formValidate1.desc" placeholder="请输入跳转URL"></Input>
                          </FormItem>
                        </Form>
                      </div>
                    </div>
                  </Modal>

                  <ul class="homePage_icon left" style="padding:0 50px">
                    <li v-for="item in bankdatalist">
                      <p class="icon">
                        <img :src="item.bankLogoUrl" alt="">                       
                      </p>
                      <img :src="item.cornerMarkUrl" alt="" class="cornermarkurl">
                      <p class="homePage_text">{{item.bankName}}</p>
                      <p class="clearfix haomePage_edit">
                        <InputNumber class="banknumint" :min="0" v-model="item.bankOrder"></InputNumber>
                        <Button v-if="item.bankState==1" class="onshelf" @click="edit_icon_colorB(item.bankCode, 0)" type="primary">上架</Button>
                        <Button v-if="item.bankState==0" class="onshelf" @click="edit_icon_colorR(item.bankCode, 1)" type="error">下架</Button>
                        <!-- <span v-if="item.bankState==1" @click="edit_icon_colorB(item.bankCode, 1)" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
                        <span v-if="item.bankState==0" @click="edit_icon_colorR" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span> -->
                        <span class="edit_icon right ml5" @click="bankshow(2, item.bankCode)"><Icon type="edit"></Icon></span>
                        <span v-if="item.bankState==0" class="edit_icon right " >
                          <Poptip
                            confirm
                            transfer
                            title="确认删除吗?"
                            @on-ok="deleteOk(item.bankCode)"
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
              </TabPane>

              <TabPane label="信用卡管理">
                <div class="clearfix">
                  <p data-v-38176e38="" @click="cardshow(1)" class="homePage_button left"><i data-v-38176e38="" class="ivu-icon ivu-icon-android-add"></i>添加信用卡</p>
                  <Button type="info" class="left mt20 w60 ml20 toupdate" @click="cardupdate">更新</Button>
                </div>              
                <Modal
                  v-model="modal2"
                  :title=credittitle
                  @on-ok="handleSubmit2('formValidate2')"
                  @on-cancel="handleReset2('formValidate2')"
                  :mask-closable="false"
                  :loading="loading">
                  <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                    <FormItem label="信用卡名称：" prop="bank_name">
                      <Input v-model="formValidate2.bank_name" placeholder="请输入信用卡名称"></Input>
                    </FormItem>
                    <FormItem label="信用卡图片：" prop="bank_img">
                      <span  class="bank_name left"><img :src="creditlogomark" alt=""></span>
                      <Upload
                      :format="['jpg','jpeg','png']"
                      :on-format-error="handleFormatError1"
                      :before-upload="handleUploadcredit"
                      :show-upload-list="false"                        
                      action=''>
                        <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:5px;margin-left:3px">浏览</Button>
                      </Upload>
                    </FormItem>
                    <FormItem label="特点1：" prop="characteristic1">
                      <Input v-model="formValidate2.characteristic1" placeholder="请输入特点1"></Input>
                    </FormItem>
                    <FormItem label="特点2：" prop="characteristic2">
                      <Input v-model="formValidate2.characteristic2" placeholder="请输入特点2"></Input>
                    </FormItem>
                    <FormItem label="跳转URL：" prop="Jump_URL">
                      <Input v-model="formValidate2.Jump_URL" placeholder="请输入URL"></Input>
                    </FormItem>
                  </Form>
                </Modal>
                <ul class="homePage_icon left" style="padding:0 50px">
                  <li class="home_bank" v-for="item in creditdatalist">
                    <p class="bank_icon">
                      <img :src="item.photoUrl" alt="">
                    </p>
                    <p class="bank_text">{{item.cardName}}</p>
                    <p class="clearfix haomePage_edit">
                      <InputNumber class="banknumint" :min="0" v-model="item.cardOrder"></InputNumber>
                      <span @click="edit_icon_coloro(item.cardCode, 0)" v-if="item.cardState==1" class="edit_icon edit_icon_blue left"><Icon type="arrow-up-a"></Icon></Icon></span>
                      <span @click="edit_icon_colord(item.cardCode, 1)" v-if="item.cardState==0" class="edit_icon edit_icon_red left"><Icon type="arrow-down-a"></Icon></Icon></Icon></span>
                      <span class="edit_icon right ml5"  @click="cardshow(2, item.cardCode)"><Icon type="edit"></Icon></span>
                      <span class="edit_icon right" v-if="item.cardState==0" >
                        <Poptip
                          confirm
                          transfer
                          title="确认删除吗?"
                          @on-ok="deletecardOk(item.cardCode)">
                          <a href="javascript:;" ><Icon type="trash-b"></Icon></a>
                        </Poptip>
                      </span>
                    </p>
                  </li>
                </ul>
                <div class=" mt15 w100b tr right" style="">
                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
                </div>
              </TabPane>
            </Tabs>
        </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      edit_delete: false,
      modal1: false,
      modal2: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      paging: 0,
      banktitle: '添加银行',
      credittitle: '添加信用卡',
      intnumval: 1,
      banklogo: require('../../image/moren.png'),
      banksrc: '',
      banklogomark: require('../../image/moren.png'),
      cornersrc: '',
      creditlogomark: require('../../image/moren.png'),
      creditsrc: '',
      backcode: '',
      cardcode: '',
      markurl: true,
      formValidate1: {
        bankname: '',
        mark: '1',
        markimg: '',
        desc: '',
        cornermark: ''
      },
      ruleValidate1: {
        bankname: [
          { required: true, message: '请输入银行名称！', trigger: 'blur' }
        ],
        mark: [{ required: true, message: '请选择角标！', trigger: 'blur' }],
        cornermark: [{ required: true, message: '请上传角标！', trigger: 'blur' }],
        markimg: [
          { required: true, message: '请选择上传文件！', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入URL！', trigger: 'blur' }
        ]
      },
      bankdatalist: [],
      creditdatalist: [],
      formValidate2: {
        bank_name: '',
        characteristic1: '',
        characteristic2: '',
        Jump_URL: ''
      },
      ruleValidate2: {
        bank_name: [
          { required: true, message: '请输入银行名称！', trigger: 'blur' }
        ],
        characteristic1: [
          { required: true, message: '请输入特点1！', trigger: 'blur' }
        ],
        characteristic2: [
          { required: true, message: '请输入特点2！', trigger: 'blur' }
        ],
        Jump_URL: [
          { required: true, message: '请输入URL！', trigger: 'blur' }
        ]
      },
      loading: true,
      edit_icon_blue: true,
      edit_icon_red: false
    }
  },
  methods: {
    pageChange (page) {
      this.startRow = page
      if (this.paging == 0) {
        this.banklist ()
      } else {
        this.creditlist ()
      }     
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      if (this.paging == 0) {
        this.banklist ()
      } else {
        this.creditlist ()
      }
    },
    bankshow (num, code) {
      this.modal1 = true
      if (num == 1) {
        this.banktitle = '添加银行'
      } else {
        this.banktitle = '编辑银行'
        this.bankecho (code)
      }     
    },
    // 信用卡新增修改弹框
    cardshow (num, code) {
      this.modal2 = true
      if (num == 1) {
        this.credittitle = '添加信用卡'
      } else {
        this.credittitle = '编辑信用卡'
        this.cardecho (code)
      }     
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
        let content = '<p>请先上传银行卡</p>'
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
      if (this.banktitle == '添加银行') {
        url = BASE_URL +'/credit/bank/saveBank'
        title = '添加银行卡'
        content = '<p>添加成功</p>'
        list = {
        bankLogoUrl :this.banksrc,
        bankName : this.formValidate1.bankname,
        cornerMarkState : this.formValidate1.mark,
        cornerMarkUrl : this.cornersrc,
        jumpUrl : this.formValidate1.desc
      }
      } else {
        url = BASE_URL +'/credit/bank/modifyBankByCode'
        title = '修改银行卡'
        content = '<p>修改成功</p>'
        list = {
        bankLogoUrl :this.banksrc,
        bankName : this.formValidate1.bankname,
        cornerMarkState : this.formValidate1.mark,
        cornerMarkUrl : this.cornersrc,
        jumpUrl : this.formValidate1.desc,
        bankCode: this.backcode
      }
      }
        this.http.post(url, list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.changeLoading()           
            this.$Modal.success({
              title: title,
              content: content
            })
            this.banklogo = require('../../image/moren.png')
            this.banklogomark = require('../../image/moren.png')
            this.banksrc = ''
            this.cornersrc = ''
            this.modal1 = false
            this.$refs['formValidate1'].resetFields()
            this.banklist ()
          } else {

          }
        })
        .catch(() => {
        })

    },
    // 修改银行卡回显
    bankecho (code) {
      let list = {
        bankCode: code
      }
      this.http.post(BASE_URL + '/credit/bank/getBankByCode', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.banksrc = resp.data.bankLogoUrl
            this.banklogo = resp.data.bankLogoUrl
            this.formValidate1.bankname = resp.data.bankName
            this.formValidate1.mark = resp.data.cornerMarkState+''
            this.cornersrc = resp.data.cornerMarkUrl
            this.banklogomark = resp.data.cornerMarkUrl
            this.formValidate1.cornermark = resp.data.cornerMarkUrl
            this.formValidate1.desc = resp.data.jumpUrl
            this.backcode = resp.data.bankCode
          } else {
          }
        })
        .catch(() => {
        })
    },
    // 修改信用卡回显
    cardecho (code) {
      let list = {
        cardCode: code
      }
      this.http.post(BASE_URL + '/credit/card/getCardByCode', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.formValidate2.bank_name = resp.data.cardName
            this.creditlogomark = resp.data.photoUrl
            this.creditsrc = resp.data.photoUrl
            this.formValidate2.characteristic1 = resp.data.character1
            this.formValidate2.characteristic2 = resp.data.character2
            this.formValidate2.Jump_URL = resp.data.jumpUrl
            this.cardcode = resp.data.cardCode
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
      this.banklogo = require('../../image/moren.png')
      this.banksrc = ''     
      this.banklogomark = require('../../image/moren.png')
      this.cornersrc = ''
      this.$refs[name].resetFields()
    },
    handleSubmit2 (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.changeLoading()
          this.addCredit ()
          this.$refs[name].resetFields()
        }
      })
    },
    addCredit () {
      if (this.creditsrc == '') {
        const title = '上传文件'
        let content = '<p>请先上传信用卡</p>'
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
      if (this.credittitle == '添加信用卡') {
        url = BASE_URL +'/credit/card/saveCard'
        title = '添加信用卡'
        content = '<p>添加成功</p>'
        list = {
        cardName : this.formValidate2.bank_name,
        photoUrl : this.creditsrc,
        character1 : this.formValidate2.characteristic1,
        character2 : this.formValidate2.characteristic2,
        jumpUrl : this.formValidate2.Jump_URL
      }
      } else {
        url = BASE_URL +'/credit/card/modifyCardByCode'
        title = '修改信用卡'
        content = '<p>修改成功</p>'
        list = {
        cardName : this.formValidate2.bank_name,
        photoUrl : this.creditsrc,
        character1 : this.formValidate2.characteristic1,
        character2 : this.formValidate2.characteristic2,
        jumpUrl : this.formValidate2.Jump_URL,
        cardCode: this.cardcode
      }
      }
        this.http.post(url, list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.changeLoading()
            const title = '添加信用卡卡'
            let content = '<p>添加成功</p>'
            this.$Modal.success({
              title: title,
              content: content
            })
            this.creditlogomark = require('../../image/moren.png')
            this.creditsrc = ''
            this.modal2 = false
            this.creditlist ()
          } else {
          }
        })
        .catch(() => {
        })
    },
    handleReset2 (name) {
      this.creditlogomark = require('../../image/moren.png')
      this.creditsrc = ''
      this.$refs[name].resetFields()
    },
    // 上架
    edit_icon_colorB (code, num) {
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
    // 下架
    edit_icon_colorR (code, num) {
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
    // 信用卡上架
    edit_icon_coloro (code, num) {
      this.$Modal.confirm({
          title: '下架',
          content: '<p>确认要下架吗?</p>',
          onOk: () => {
            this.creditshelf (code, num)
          },
          onCancel: () => {              
          }
        })
    },
    // 信用卡下架
    edit_icon_colord (code, num) {
      this.$Modal.confirm({
          title: '上架',
          content: '<p>确认要上架吗?</p>',
          onOk: () => {
            this.creditshelf (code, num)
          },
          onCancel: () => {            
          }
        })
    },
    // 银行卡删除
    deleteOk (code) {
      let list = {
        bankCode: code
      }
      this.http.post(BASE_URL + '/credit/bank/deleteBankByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.startRow = 1
          this.banklist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    // 信用卡删除
    deletecardOk (code) {
      let list = {
        cardCode: code
      }
      this.http.post(BASE_URL + '/credit/card/deleteCardByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.startRow = 1
          this.creditlist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    edit_ok () {
      this.$Message.info('Clicked ok')
    },
    edit_cancel () {
      this.$Message.info('Clicked cancel')
    },
    // 角标选择
    cornermark (val) {
      if (val == 0) {//无
        this.markurl = false
        this.cornersrc = ''
        this.banklogomark = require('../../image/moren.png')
        this.formValidate1.cornermark = ''
      } else {
        this.markurl = true
      }

    },
    // 银行卡列表
    banklist () {
      let list = {
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/credit/bank/getBankList', list)
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
    // 上传信用卡
    handleUploadcredit (file) {
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
        this.creditlogomark = resp.data
        this.creditsrc = resp.data
      } else {
      }
    })
    .catch(() => {
    })
      return false
      }
    },
    // 上传角标
    handleUploadmark (file) {
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
        this.banklogomark = resp.data
        this.formValidate1.cornermark = resp.data
        this.cornersrc = resp.data
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
      let list = {
        bankCode: code,
        bankState: num
      }
      this.http.post(BASE_URL + '/credit/bank/modifyBankStateByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          if (num == 0) {
            this.$Modal.success({
              title: '下架',
              content: '<p>下架成功</p>'         
            })
            this.banklist ()
          } else {
              const title = '上架'
              let content = '<p>上架成功</p>'
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
    // 信用卡上架
    creditshelf (code, num) {
      let list = {
        cardCode: code,
        cardState: num
      }
      this.http.post(BASE_URL + '/credit/card/modifyCardStateByCode', list)
      .then((resp) => {
        if (resp.code == 'success') {
          if (num == 0) {
            this.$Modal.success({
              title: '下架',
              content: '<p>下架成功</p>'         
            })
            this.creditlist ()
          } else {
              const title = '上架'
              let content = '<p>上架成功</p>'
              this.$Modal.success({
                title: title,
                content: content
              })
              this.creditlist ()
          }
        } else {
        }
      })
      .catch(() => {
      })
    },
    marketquery (name) {
      this.total = 0
      this.startRow = 1
      this.endRow = 10
      this.paging = name    
      if (name == 0) {
        this.banklist ()
      } else {
        this.creditlist ()
      }
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
    // 信用卡更新排序
    cardupdate () {
      this.$Modal.confirm({
          title: '更新排序',
          content: '<p>确认要更新排序吗?</p>',
          onOk: () => {
            this.updatecarslist ()
          },
          onCancel: () => {           
          }
        })
    },
    updatelist () {
      let list = []
      for (let i = 0; i < this.bankdatalist.length; i++) {
        let obj = new Object ()
        obj.bankCode = this.bankdatalist[i].bankCode
        obj.bankOrder = this.bankdatalist[i].bankOrder
        list.push (obj)
      }
      this.http.post(BASE_URL + '/credit/bank/batchModifyBank', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.banklist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    updatecarslist () {
      let list = []
      for (let i = 0; i < this.creditdatalist.length; i++) {
        let obj = new Object ()
        obj.cardCode = this.creditdatalist[i].cardCode
        obj.cardOrder = this.creditdatalist[i].cardOrder
        list.push (obj)
      }
      this.http.post(BASE_URL + '/credit/card/batchModifyCard', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.creditlist ()
        } else {
        }
      })
      .catch(() => {
      })
    },
    // 信用卡列表
    creditlist () {
      let list = {
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/credit/card/getCardList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.creditdatalist = resp.data.dataList
        this.total = Number(resp.data.total)
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        console.log(this.total)
        console.log(this.startRow)
      } else {
      }
    })
    .catch(() => {
    })
    },
  },
  mounted () {
    this.banklist ()

  }
}
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
.cornermarkurl{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 30px;
}
</style>
