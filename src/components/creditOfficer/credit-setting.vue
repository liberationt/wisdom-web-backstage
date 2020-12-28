<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;基本设置</span>
      </p>
    </div>
    <div>
      <div class="contentcss">
        <Form :label-width="210" class="mt50">
          <FormItem >
            <Row>
              <Col span="24">
                <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                <FormItem class="mt15" v-for="(item,index) in formCustom" :label="item.configName+':'" prop="fabulous">
                  <Input :disabled="auditing" v-if="item.configUnit!=7&&item.configName!='定制抢单上限'&&item.configName!='分销开放用户'" type="text" v-model="item.configValue" style="width:300px">
                  <span v-if="item.configName == '定制推送'" slot="prepend">每日推送上线</span>                 
                  <span v-if="item.configName != '定制推送'&&item.configName != '开启抢单无忧提醒弹框'&&item.configName != '开启定制推送提醒弹框'&&item.configUnitDesc != '百分比'" slot="append">{{item.configUnitDesc}}</span>
                  <span v-if="item.configName == '定制推送'" slot="append">单</span>
                  <span v-if="item.configUnitDesc == '百分比'" slot="append">%</span>
                  <span v-if="item.configName == '开启抢单无忧提醒弹框'" slot="prepend">赞豆余额大于等于</span>
                  <span v-if="item.configName == '开启定制推送提醒弹框'" slot="prepend">赞豆余额小于</span>
                  <span v-if="item.configName == '开启抢单无忧提醒弹框'||item.configName == '开启定制推送提醒弹框'" slot="append">赞豆</span>
                  </Input>
                  <InputNumber :disabled="auditing" @keyup.native="changeNumber(item.configValue,index)" v-if="item.configUnit!=7&&item.configName=='定制抢单上限'" :max="999999" :min="0" v-model.number="item.configValue"></InputNumber>
                  <Select :disabled="auditing" v-if="item.configUnit==7&&item.configName!='实名认证方式'&&item.configName!='定制推送时间间隔'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option  value="1" >开启</Option>
                    <Option  value="0" >关闭</Option>
                  </Select>
                  <Select :disabled="auditing" v-if="item.configName=='实名认证方式'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option v-for="res in officerConfigSelectList" :value="res.value" >{{res.label}}</Option>                   
                  </Select>
                  <Select :disabled="auditing" v-if="item.configName=='定制推送时间间隔'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option v-for="res in intervaltimelist" :value="res.value" >{{res.label}}</Option>               
                  </Select>
                  <CheckboxGroup v-if="item.configName=='分销开放用户'" v-model="screen" >
										<Checkbox :disabled="auditing" v-for="reg in retailuserslist" :label="reg.value">{{reg.label}}</Checkbox>
									</CheckboxGroup>
                  <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
                </FormItem>                
              </Col>

              <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                <FormItem class="mt15" v-for="item in formCustomafter" :label="item.configName+':'" prop="fabulous">
                  <Input :disabled="auditing" v-if="item.configUnit!=7&&item.configName!='定制抢单上限'&&item.configName!='分销开放用户'" type="text" v-model="item.configValue" style="width:300px">
                  <span v-if="item.configName == '定制推送'" slot="prepend">每日推送上线</span>                 
                  <span v-if="item.configName != '定制推送'&&item.configName != '开启抢单无忧提醒弹框'&&item.configName != '开启定制推送提醒弹框'&&item.configUnitDesc != '百分比'" slot="append">{{item.configUnitDesc}}</span>
                  <span v-if="item.configName == '定制推送'" slot="append">单</span>
                  <span v-if="item.configUnitDesc == '百分比'" slot="append">%</span>
                  <span v-if="item.configName == '开启抢单无忧提醒弹框'" slot="prepend">赞豆余额大于等于</span>
                  <span v-if="item.configName == '开启定制推送提醒弹框'" slot="prepend">赞豆余额小于</span>
                  <span v-if="item.configName == '开启抢单无忧提醒弹框'||item.configName == '开启定制推送提醒弹框'" slot="append">赞豆</span>
                  </Input>
                  <InputNumber :disabled="auditing" v-if="item.configUnit!=7&&item.configName=='定制抢单上限'" :max="99999" :min="0" v-model.number="item.configValue"></InputNumber>
                  <Select :disabled="auditing" v-if="item.configUnit==7&&item.configName!='实名认证方式'&&item.configName!='定制推送时间间隔'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option  value="1" >开启</Option>
                    <Option  value="0" >关闭</Option>
                  </Select>
                  <Select :disabled="auditing" v-if="item.configName=='实名认证方式'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option v-for="res in officerConfigSelectList" :value="res.value" >{{res.label}}</Option>               
                  </Select>
                  <Select :disabled="auditing" v-if="item.configName=='定制推送时间间隔'" v-model="item.configValue" style="width:200px"  class="" >
                    <Option v-for="res in intervaltimelist" :value="res.value" >{{res.label}}</Option>               
                  </Select>
                  <CheckboxGroup v-if="item.configName=='分销开放用户'" v-model="item.configValue" >
										<Checkbox :disabled="auditing" v-for="reg in retailuserslist" :label="reg.value">{{reg.label}}</Checkbox>
									</CheckboxGroup>
                  <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
                </FormItem>

              </Col>
            </Row>
          </FormItem>
          <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w200 examinetype" :loading="loading3" @click="handleSubmit">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender1">查看操作日志</Button>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true,
        loading3: false,
        auditing:false,
        modal9:false,
        memos:false,
        screen: [],
        screen1:[],
        formCustom: [],
        formCustomafter:[],
        officerConfigSelectList:[],
        intervaltimelist:[],
        retailuserslist:[],//分销用户list
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
          ],
        },
      }
    },
    methods: {
      handleSubmit () {
        this.loading3 = true
        let reg = /^([1-9]\d*|0)(\.\d{1,})?$/
        let numz = /^(0|[1-9][0-9]*)$/
        let res = /^(0|\+?[1-9][0-9]{0,5})$/
        for (let i = 0; i < this.formCustom.length; i++) {
          if (this.formCustom[i].configName!='实名认证方式'&&this.formCustom[i].configName!='分销开放用户') {
            if (!reg.test(this.formCustom[i].configValue)) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请输入正确的设置内容</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='定制推送') {
            if (!numz.test(this.formCustom[i].configValue)) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请输入正确的定制推送</p>'
              })
              this.loading3 = false
              return false
            }
            if (this.formCustom[i].configValue>999999) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>定制推送最大可输入999999</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='分销开放用户') {
            this.formCustom[i].configValue = JSON.stringify(this.screen)
            if (this.screen.length<1) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请选择分销开放用户</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='开启定制推送提醒弹框') {
            if (this.formCustom[i].configValue>this.formCustom[i-1].configValue) {
              this.$Modal.warning({
                title: '基本设置',
                width:'500px',
                content: '<p>开启定制推送提醒弹框赞豆不得大于开启抢单无忧提醒弹框赞豆</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='未完善信息进入线索单周期') {
            if (!/^([1-9][0-9]{0,3})$/.test(this.formCustom[i].configValue)) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请输入正确线索单周期</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='退单申请有效期') {
            if (!res.test(this.formCustom[i].configValue)) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请输入正确的退单申请有效期</p>'
              })
              this.loading3 = false
              return false
            }
          }
          if (this.formCustom[i].configName=='开启抢单无忧提醒弹框'||this.formCustom[i].configName=='开启定制推送提醒弹框') {
            if (!res.test(this.formCustom[i].configValue)) {
              this.$Modal.warning({
                title: '基本设置',
                content: '<p>请输入正确的赞豆余额</p>'
              })
              this.loading3 = false
              return false
            }
          }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
            this.http.post(BASE_URL + '/loan/officerConfig/updateOfficerConfigByBatchCode', this.formCustom)
            .then((resp) => {
              if (resp.code == 'success') {
                this.$Modal.success({
                  title: '基本设置',
                  content: '<p>设置成功</p>'
                })
                this.basicsetup ()
                this.loading3 = false
              } else {
                this.loading3 = false
              }
            })
            .catch(() => {
            })        
          },
          onCancel: () => {
            this.loading3 = false
          }
        })
      },
      handleRender1 () {   //信贷基本配置查看日志
        this.$router.push({ path: './operationLog?operationType=officer_edit' })
      },
      changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 数据初始化
    basicsetup () {
      this.http.post(BASE_URL + '/loan/officerConfig/getOfficerConfigAll', {})
        .then((resp) => {
          if (resp.code == 'success') {
            resp.data.officerConfigList.forEach(element => {
              if (element.configName == "分销开放用户") {
                if (element.configValue == '') {
                  this.screen = []
                } else {
                  this.screen = JSON.parse(element.configValue)
                }                  
                }         
            });
            this.formCustom = resp.data.officerConfigList
            this.officerConfigSelectList = resp.data.officerConfigSelectList[0].data
            this.intervaltimelist = resp.data.officerConfigSelectList[1].data
            this.retailuserslist = resp.data.officerConfigSelectList[2].data
            if (resp.data.updateOfficerConfigList == null) {
              this.formCustomafter = []
              this.auditing = false
            }
            if (resp.data.updateOfficerConfigList.length>0) {
              resp.data.updateOfficerConfigList.forEach(element => {
                if (element.configName == "分销开放用户") {
                  element.configValue = JSON.parse(element.configValue)
                }      
              });             
              this.formCustomafter = resp.data.updateOfficerConfigList
              this.auditing = true
            }               
          } else {
            this.$Message.error(resp.message);
          }
        })
        .catch(() => {

        })
    },
    // 审核权限判断
    toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/officerConfig/auditOfficerConfig']).then(data=>{
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

      },
      // 基本设置审核
      examineSubmit (name) {
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                auditRemark : this.formCustomexa.remarks
            }
            this.http.post(BASE_URL + '/loan/officerConfig/auditOfficerConfig', data)
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
                    this.basicsetup ()
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
      changeNumber(code,num) {
      let inputNumber  = code   
      let str = '' + inputNumber;
      if (str.indexOf('.') != -1) {      
        let arr = str.split('.');
          this.formCustom[num].configValue = str.split('.')[0]
      }      
    },
      
      

    },
    mounted () {
      this.basicsetup ()
    }
  }
</script>
<style lang="less" scoped>
  .ivu-modal-confirm-body-render {
    margin: 30px;
    padding: 0;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    padding: 5px 50px 4px;
  }
  .signin{
    position: absolute;
    top: 0px;
    left: 515px
  }
  .credit_recharge{
    margin-top: 15px;
    width: 800px;
    margin-left: 100px
  }
  .utmost{
    display: inline-block;
    padding: 4px 7px;
    font-size: inherit;
    font-weight: 400;
    line-height: 22px;
    color: #495060;
    text-align: center;
    background-color: #eee;
    border: 1px solid #dddee1;
  }
  .ivu-modal .ivu-btn-primary{
    display: none!important
  }
</style>
