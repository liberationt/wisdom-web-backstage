<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;优质订单设置</span>
        </p>
      </div>
      <div class=" contentcss">
           <Form :label-width="140" class="mt20" ref="formValidate" :model="formValidate" :rules="ruleValidate">
             <FormItem>
              <Row>
                <Col span="24">
                    <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                    <FormItem label="优质订单开发对象:" style="margin:10px 0;">
                        <Select v-model="select" :disabled="auditing" style="width:140px;" @on-change="selectChange">
                             <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="优质订单折扣系数:" >
                      <div class="choose">
                        <div>
                          <span>会员</span>
                          <span><Input v-model="member" :disabled="auditing" style="width:80px;margin:0 5px;"></Input></span>
                          <span>%</span>
                        </div>
                        <div v-if="this.select!='vip_user'">
                          <span>普通用户</span>
                          <span><Input v-model="ordinary" :disabled="auditing" style="width:80px;margin:0 5px;"></Input></span>
                          <span>%</span>
                        </div>
                        <div style="color:red">*折扣系数为原价折扣系数</div>
                      </div>
                    </FormItem>
                    <FormItem v-for="item in chanceInfoTitleRes" :label="item.infoTitleName+':'" >
                    <CheckboxGroup v-model="screen" @on-change="checkAlltdChange">
                        <Checkbox :disabled="auditing" v-for="res in item.options" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
                    </CheckboxGroup>
                    </FormItem>
                <FormItem label="上传优质订单角标:" prop="productlogo"  class="businessimg">
                    <Upload
                    action=""
                    :before-upload="handleUploadicon"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png', 'gif']"
                    :on-format-error="handleFormatError1">
                    <img class="iconlabelUrl" :src="formValidate.labelUrl" alt="">
                    <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    <!-- <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button> -->
                    </Upload>
                </FormItem>
                </Col>
            <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                    <FormItem label="优质订单开发对象:" style="margin:10px 0;">
                        <Select v-model="select1" style="width:140px" :disabled="auditing">
                             <Option v-for="item in selectList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="优质订单折扣系数:" >
                      <div class="choose">
                        <div>
                          <span>会员</span>
                          <span><Input v-model="member1" style="width:80px;margin:0 5px;" :disabled="auditing"></Input></span>
                          <span>%</span>
                        </div>
                        <div v-if="this.select1!='vip_user'">
                          <span>普通用户</span>
                          <span><Input v-model="ordinary1" style="width:80px;margin:0 5px;" :disabled="auditing"></Input></span>
                          <span>%</span>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem v-for="item in updateLoanChanceConfigureRes" :label="item.infoTitleName+':'" >
                      <CheckboxGroup v-model="screen1" >
                          <Checkbox :disabled="auditing" v-for="res in item.options" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
                      </CheckboxGroup>
                    </FormItem>
                    <FormItem label="优质订单角标:" prop="productlogo">
                      <img class="iconlabelUrl" :src="labelUrl1" alt="">
                    </FormItem>
            </Col>
            </Row>
            </FormItem>
            <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="preservationNaughty('formValidate')">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender4">查看操作日志</Button>
            </FormItem>
          </Form>
          <Modal
            title="审核"
            v-model="modal9"
            @on-ok="examineSubmit('formCustomexa')"
            @on-cancel="handleReset('formCustomexa')"
            ok-text="保存"
            cancel-text="取消"
            class-name="vertical-center-modal"
            width="500"
            :loading="loading"
            :mask-closable="false">
            <div  class="newtype_file mt15 mb15">
              <Form ref="formCustomexa" :model="formCustomexa" :rules="ruleCustomexa" :label-width="100" style="padding-left:15px">
                <FormItem label="审核状态:" prop="activeType" >
                  <Select v-model="formCustomexa.activeType" style="width:160px" @on-change="invitationgive" >
                    <Option  value="pass" >审核通过</Option>
                    <Option  value="reject" >审核驳回</Option>
                  </Select>    
                </FormItem>
                <FormItem label="备注:" prop="remarks" v-if="memos">
                  <Input v-model="formCustomexa.remarks" type="textarea" :rows="4" placeholder="请输入备注" />    
                </FormItem>
            </Form>
            </div>
          </Modal>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        selectList:[],
        select:'',
        selectList1:[],
        select1:'',
        member:'',
        ordinary:'',
        member1:'',
        ordinary1:'',
        labelUrl1:require("../../image/moren.png"),
        formValidate:{
          labelUrl:require("../../image/moren.png"),
        },
        ruleValidate:{
           productlogo:[
                { required: true, message: "请上传图片", trigger: "blur" }
            ]
        },
        chanceInfoTitleRes:[],
        updateLoanChanceConfigureRes:[],
        screen:[],
        screen1:[],
        loading: true,
        loading3: false, 
        auditing:false,
        memos:false,
        modal9:false,
        isJurisdiction:false,
        formCustomexa: {
          activeType: '',
          remarks:''
        },
        ruleCustomexa: {
          activeType: [
              {required: true,message: '请选择审核状态',trigger: 'blur'},    
          ],
          remarks: [
              {required: true,message: '请输入备注',trigger: 'blur'},
              {required: true, message: '备注最多250字',max: 250,trigger: 'change'}
          ],
        },
    };
  },
  methods: {
      //上传图片
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
              return false;
          }
      },
      handleFormatError1(file) {
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
      },
      //选择用户
      selectChange(select){
        this.select = select
        // this.member=''
        // this.ordinary=''
      },
      // 淘单
      naughtyScreening () {
        this.http.post(BASE_URL + '/loan/goodUserConfig/queryGoodUserConfigList', {})
          .then((resp) => {
            if (resp.code == 'success') {
              if (resp.data.goodUserConfigResList.length>0) {
                  this.chanceInfoTitleRes = resp.data.goodUserConfigResList
                  this.selectList = resp.data.goodUserConfigOtherRes.searchOptionBeanList
                  this.member = resp.data.goodUserConfigOtherRes.vipDiscount
                  this.ordinary =  resp.data.goodUserConfigOtherRes.commonDiscount===null? "":resp.data.goodUserConfigOtherRes.commonDiscount
                  this.formValidate.labelUrl = resp.data.goodUserConfigOtherRes.goodUserIcon == null? require("../../image/moren.png"): resp.data.goodUserConfigOtherRes.goodUserIcon
                  this.formValidate.productlogo = resp.data.goodUserConfigOtherRes.goodUserIcon == null? require("../../image/moren.png"): resp.data.goodUserConfigOtherRes.goodUserIcon
                  for(var i=0;i<this.selectList.length;i++){
                      if(this.selectList[i].default==true){
                        this.select = this.selectList[i].value
                      }
                  }
                  this.loop (resp.data.goodUserConfigResList,this.screen)         
                }
                if (resp.data.updateGoodUserConfigResList!=null) {
                  this.selectList1 = resp.data.updateGoodUserConfigOtherRes.searchOptionBeanList
                  this.member1 = resp.data.updateGoodUserConfigOtherRes.vipDiscount==null? "":resp.data.updateGoodUserConfigOtherRes.vipDiscount
                  this.ordinary1 =  resp.data.updateGoodUserConfigOtherRes.commonDiscount==null? "":resp.data.updateGoodUserConfigOtherRes.commonDiscount
                  for(var i=0;i<this.selectList1.length;i++){
                      if(this.selectList1[i].default==true){
                        this.select1 = this.selectList1[i].value
                      }
                  }
                this.labelUrl1 = resp.data.updateGoodUserConfigOtherRes.goodUserIcon == null? require("../../image/moren.png"): resp.data.updateGoodUserConfigOtherRes.goodUserIcon
                this.loop (resp.data.updateGoodUserConfigResList,this.screen1)
                this.auditing = true
                this.updateLoanChanceConfigureRes = resp.data.updateGoodUserConfigResList
              } else {
                this.auditing = false
                this.updateLoanChanceConfigureRes = []
              }
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch(() => {
          })
      },
      loop (key,list) {
        for (var i = 0; i < key.length; i++) {
          for (var j = 0; j < key[i].options.length; j++) {
            if (key[i].options[j].checked == true) {
              list.push(key[i].options[j].infoOptionKey+'/'+key[i].infoTitleKey+'/'+key[i].options[j].infoOptionName)
            }
          }                  
        }
      },
    //   保存
    preservationNaughty (name) {
       this.$refs[name].validate((valid) => {
         if(valid){
          let ref = /^(\d|[1-9]\d|100)$/
          if(this.select===''){
            this.$Message.error('请选择优质订单开发对象')
            return false
          }
          if((this.ordinary===''&&this.select=='all_user')||(this.member===''&&this.select=='all_user')){
            this.$Message.error('请输入折扣系数')
            return false
          }
         
          if(this.member===''&&this.select=='vip_user'){
            this.$Message.error('请输入折扣系数')
            return false
          }
          if(!ref.test(this.member)&&this.select=='all_user'||!ref.test(this.ordinary)&&this.select=='all_user'){
            this.$Message.error('折扣系数为0-100的正整数')
            return false
          }
          if(!ref.test(this.member)&&this.select=='vip_user'){
            this.$Message.error('折扣系数为0-100的正整数')
            return false
          }
          this.loading3 = true
          this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认保存提交审核吗?</p>",
            onOk: () => {
              let list = {}
              let loanChanceConfigureReqList = []
              this.screen.forEach(element => {
                let obj = {}
                let infoTitleKey = element.split('/')[1]
                obj.infoTitleKey = infoTitleKey   
                obj.infoOptionKey = element.split('/')[0]
                loanChanceConfigureReqList.push(obj)
              });
              let goodUserConfigOtherReq = {
                  commonDiscount:this.ordinary,
                  vipDiscount:this.member,
                  goodUserIcon:this.formValidate.labelUrl,
                  target :this.select
              }
              list.userConfigReqList  = loanChanceConfigureReqList
              list.goodUserConfigOtherReq = goodUserConfigOtherReq
              this.http.post(BASE_URL + '/loan/goodUserConfig/saveGoodUserConfig', list)
                .then((resp) => {
                  if (resp.code == 'success') {
                    this.$Modal.success({
                      title: '提示',
                      content: '<p>保存成功</p>'
                    })
                    this.naughtyScreening ()
                    this.screen = []
                    this.screen1 = []
                    this.loading3 = false
                  } else {
                    this.loading3 = false
                    this.$Message.error(resp.message);
                  }
                })
                .catch(() => {
                })
                      
            },
            onCancel: () => {
              this.loading3 = false
            }
          })
          }
       })
      },
      // 淘单保存list
      checkAllGroupChange (data) {},
      checkAlltdChange (data) {
      },
      handleRender4 () {//淘单操作日志
      this.$router.push({ path: './operationLog?operationType=good_user_edit' })
      },
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
        })
        },
      // 淘单筛选设置审核
      examineSubmit (name) {
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                auditRemark : this.formCustomexa.remarks
            }
            this.http.post(BASE_URL + '/loan/goodUserConfig/auditConfig', data)
            .then(data=>{
                if (data.code == 'success') {
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {                          
                          this.$refs[name].resetFields()
                        }
                    })
                    this.screen = []
                    this.screen1 = []
                    this.naughtyScreening ()
                } else {
                  this.modal9 = false
                  this.$Message.info(data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
          // this.changeLoading()
          this.modal9 = false
      })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.memos = false
      },
      invitationgive (v) {
          if (v == 'pass') {
              this.memos = false
          } else {
              this.memos = true
          }
      },
      toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/chanceTitleAndOption/auditConfigure']).then(data=>{
        if(data.code == 'success'){
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.memos = false
              this.modal9 = true              
            } else {
              this.$Message.warning('暂无权限')
            }
          }
        }
      }).catch(err=>{});

      }
  },
  mounted () {
    this.naughtyScreening ()       
  }
};
</script>
<style lang="less" scoped>
.iconlabelUrl{
  width:100px;height:40px;
}
.choose{
  display: flex;
  div{
    margin-right:20px;
  }
}
</style>
