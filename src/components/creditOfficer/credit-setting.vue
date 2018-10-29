<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;基本设置</span>
      </p>
    </div>
    <div>
      <div class="contentcss">
        <Form :label-width="210" class="mt50">
          <FormItem >
            <Row>
              <Col span="24">
                <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                <FormItem class="mt15" v-for="item in formCustom" :label="item.configName+':'" prop="fabulous">
                  <Input :disabled="auditing" v-if="item.configUnit!=7" type="text" v-model="item.configValue" style="width:300px">
                  <span slot="append">{{item.configUnitDesc}}</span>
                  </Input>
                  <Select :disabled="auditing" v-if="item.configUnit==7" v-model="item.configValue" style="width:200px"  class="" >
                    <Option  value="1" >开启</Option>
                    <Option  value="0" >关闭</Option>
                  </Select>
                  <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
                </FormItem>
                
              </Col>
              <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                <FormItem class="mt15" v-for="item in formCustomafter" :label="item.configName+':'" prop="fabulous">
                  <Input :disabled="auditing" v-if="item.configUnit!=7" type="text" v-model="item.configValue" style="width:300px">
                  <span slot="append">{{item.configUnitDesc}}</span>
                  </Input>
                  <Select :disabled="auditing" v-if="item.configUnit==7" v-model="item.configValue" style="width:200px"  class="" >
                    <Option  value="1" >开启</Option>
                    <Option  value="0" >关闭</Option>
                  </Select>
                  <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
                </FormItem>

              </Col>
            </Row>
          </FormItem>
          <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="handleSubmit">
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
        formCustom: [],
        formCustomafter:[],
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
        for (let i = 0; i < this.formCustom.length; i++) {
          if (!reg.test(this.formCustom[i].configValue)) {
            this.$Modal.warning({
              title: '基本设置',
              content: '<p>请输入正确的设置内容</p>'
            })
            this.loading3 = false
            return false
          }
        }
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
            this.formCustom = resp.data.officerConfigList
            if (resp.data.updateOfficerConfigList == null) {
              this.formCustomafter = []
              this.auditing = false
            }
            if (resp.data.updateOfficerConfigList.length>0) {             
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
