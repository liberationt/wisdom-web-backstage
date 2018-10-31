<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;淘单筛选设置</span>
        </p>
      </div>
      <div class=" contentcss">
         <Form :label-width="100" class="mt50">
             <FormItem >
              <Row>
                <Col span="24">
                    <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                    <FormItem v-for="item in chanceInfoTitleRes" :label="item.infoTitleName+':'" >
                    <CheckboxGroup v-model="screen" @on-change="checkAlltdChange">
                        <Checkbox :disabled="auditing" v-for="res in item.loanChanceConfigureDetailResList" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
                    </CheckboxGroup>
                    </FormItem>
                </Col>
            <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                    <FormItem v-for="item in updateLoanChanceConfigureRes" :label="item.infoTitleName+':'" >
                    <CheckboxGroup v-model="screen1" >
                        <Checkbox :disabled="auditing" v-for="res in item.loanChanceConfigureDetailResList" :label="res.infoOptionKey+'/'+item.infoTitleKey+'/'+res.infoOptionName">{{res.infoOptionName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>

            </Col>
            </Row>
            </FormItem>
            <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="preservationNaughty">
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
          ],
        },
    };
  },
  created() {    
  },
  methods: {
      // 淘单
      naughtyScreening () {
        this.http.post(BASE_URL + '/loan/chanceTitleAndOption/getQueryList', {})
          .then((resp) => {
            if (resp.code == 'success') {
              if (resp.data.loanChanceConfigureRes.length>0) {
                this.chanceInfoTitleRes = resp.data.loanChanceConfigureRes
                this.loop (resp.data.loanChanceConfigureRes,this.screen)         
              }
              if (resp.data.updateLoanChanceConfigureRes!=null) {
                this.loop (resp.data.updateLoanChanceConfigureRes,this.screen1)
                this.auditing = true
                this.updateLoanChanceConfigureRes = resp.data.updateLoanChanceConfigureRes
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
          for (var j = 0; j < key[i].loanChanceConfigureDetailResList.length; j++) {
            if (key[i].loanChanceConfigureDetailResList[j].flag == 1) {
              list.push(key[i].loanChanceConfigureDetailResList[j].infoOptionKey+'/'+key[i].infoTitleKey+'/'+key[i].loanChanceConfigureDetailResList[j].infoOptionName)
            }
          }                  
        }
      },
    //   保存
    preservationNaughty () {
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
              this.chanceInfoTitleRes.forEach(element => {
                if (element.infoTitleKey == infoTitleKey) {
                  obj.infoTitleName = element.infoTitleName            
                }           
              });
              let loanChanceConfigureDetailReqList  =[]
              let obj2 = {}
              obj2.infoOptionKey = element.split('/')[0]
              obj2.infoTitleKey = infoTitleKey
              obj2.infoOptionName = element.split('/')[2]

              loanChanceConfigureDetailReqList.push(obj2)
              obj.loanChanceConfigureDetailReqList = loanChanceConfigureDetailReqList
              loanChanceConfigureReqList.push(obj)                 
            });
            list.loanChanceConfigureReqList = loanChanceConfigureReqList
            this.http.post(BASE_URL + '/loan/chanceTitleAndOption/saveConfigure', list)
              .then((resp) => {
                if (resp.code == 'success') {
                  this.$Modal.success({
                    title: '提示',
                    content: '<p>保存成功</p>'
                  })
                  this.naughtyScreening ()
                  this.screen = []
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
      // 淘单保存list
      checkAllGroupChange (data) {},
      checkAlltdChange (data) {
      },
      handleRender4 () {//淘单操作日志
      this.$router.push({ path: './operationLog?operationType=naughty_edit' })
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
            this.http.post(BASE_URL + '/loan/chanceTitleAndOption/auditConfigure', data)
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

</style>
