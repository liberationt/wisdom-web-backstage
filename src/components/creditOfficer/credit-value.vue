<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;用户身价设置</span>
        </p>
      </div>
      <div class=" contentcss">
          <Form  :label-width="100" class="mt50">
            <FormItem >
              <Row>
                <Col span="24">
                <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                  <FormItem class="mt15" label="底价:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetting.userSocialResList[1].socialScore" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                  </FormItem>
                  <FormItem class="mt15" label="已实名:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetting.userSocialResList[0].socialScore" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem v-for="item in pricesetting.businessSocialResList" :label="item.infoTitleName"  class="clearfix mt15 indentval">
                    <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                      <Input :disabled="auditing" v-if="res.infoOptionName!='无' && res.infoOptionName!='非本地户籍'" type="text" v-model="res.infoOptionScore" style="width:150px">
                      <span slot="prepend">{{res.infoOptionName}}</span>
                      </Input>
                    </div>
                  </FormItem>
                </Col>
                <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                <FormItem class="mt15" label="底价:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetafter.userSocialResList[1].socialScore" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                  </FormItem>
                  <FormItem class="mt15" label="已实名:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetafter.userSocialResList[0].socialScore" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem v-for="item in pricesetafter.businessSocialResList" :label="item.infoTitleName"  class="clearfix mt15 indentval">
                    <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                      <Input :disabled="auditing" v-if="res.infoOptionName!='无' && res.infoOptionName!='非本地户籍'" type="text" v-model="res.infoOptionScore" style="width:150px">
                      <span slot="prepend">{{res.infoOptionName}}</span>
                      </Input>
                    </div>
                  </FormItem>

                </Col>           
              </Row>
            </FormItem >
            <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="preservationvalue">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender2">查看操作日志</Button>
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
        loading: true,
        loading3: false,
        auditing:false,
        memos:false,
        modal9:false,
        pricesetting: {
          userSocialResList:[
            {
              socialScore:''
            },
            {
              socialScore:''
            }
          ],
          businessSocialResList:[
            {
              infoTitleName: '',
              options: [
                {
                  infoOptionScore: '',
                  infoOptionName: ''
                }
              ]
            }
          ]
        },
        pricesetafter: {
          userSocialResList:[
            {
              socialScore:''
            },
            {
              socialScore:''
            }
          ],
          businessSocialResList:[
            {
              infoTitleName: '',
              options: [
                {
                  infoOptionScore: '',
                  infoOptionName: ''
                }
              ]
            }
          ]
        },
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
        }
    };
  },
  created() {    
  },
  methods: {
      // 身价设置保存
      preservationvalue () {
        this.loading3 = true
        let businessSocialResList = []
        let reg = /^(0|[1-9][0-9]*)$/
        for (let k = 0; k < this.pricesetting.userSocialResList.length; k++) {
          if (this.pricesetting.userSocialResList[k].socialScore === "") {
            this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false 
          }
          if (!reg.test(this.pricesetting.userSocialResList[k].socialScore)) {
            this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置正确的用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false 
          }    
        }
        for (let i = 0; i < this.pricesetting.businessSocialResList.length; i++) {
          for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
            let obj = new Object ()
            obj.infoOptionKey = this.pricesetting.businessSocialResList[i].options[j].infoOptionKey
            if (this.pricesetting.businessSocialResList[i].options[j].infoOptionScore === '') {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
            if (!reg.test(this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)) {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置正确的用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
            obj.infoOptionScore = this.pricesetting.businessSocialResList[i].options[j].infoOptionScore
            businessSocialResList.push(obj)
          }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
            let list = {
              userSocialResList: this.pricesetting.userSocialResList,
              businessSocialResList: businessSocialResList
            }
            this.http.post(BASE_URL + '/loan/userSocial/updateUserSocialList', list)
              .then((resp) => {
                if (resp.code == 'success') {
                  this.$Modal.success({
                    title: '用户身价设置',
                    content: '<p>配置成功</p>'
                  })
                  this.inquireabout ()
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
        
      },
      handleRender2 () {  //用户身价配置日志
        this.$router.push({ path: './operationLog?operationType=user_social_edit' })
      },
      // 初始化
      inquireabout () {
          this.http.post(BASE_URL + '/loan/userSocial/getUserSocialList', {})
            .then((resp) => {
              if (resp.code == 'success') {
                this.pricesetting.userSocialResList = resp.data.socialRes.userSocialResList
                this.pricesetting.businessSocialResList = resp.data.socialRes.businessSocialResList
                
                if (resp.data.updateSocialRes != null) {
                  this.pricesetafter.userSocialResList = resp.data.updateSocialRes.userSocialResList
                  this.pricesetafter.businessSocialResList = resp.data.updateSocialRes.businessSocialResList
                  this.auditing = true  
                }else {
                  this.auditing = false
                }
              } else {
              }
            })
            .catch(() => {
            })

      },
      // 审核权限判断
      toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/userSocial/auditUserSocial']).then(data=>{
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
      // 用户身价设置审核
      examineSubmit (name) {
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                auditRemark : this.formCustomexa.remarks
            }
            this.http.post(BASE_URL + '/loan/userSocial/auditUserSocial', data)
            .then(data=>{
                if (data.code == 'success') {
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                          this.inquireabout ()
                          this.$refs[name].resetFields()
                        }
                    })
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
      // 取消
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
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }
  },
  mounted () {
    this.inquireabout ()       
  }
};
</script>
<style lang="less" scoped>

</style>
