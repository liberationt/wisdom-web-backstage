<template>
<div style="min-width:1070px">
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;充值活动管理>&nbsp;充值赠送抢单劵</span>
        </p>
      </div>
      <div class="contentcss">
        <!-- 修改前 -->
        <div >
          <div class=" firstCharge">
            <ul>
              <li class="clearfix">
                      <span class="left lh32 displayib w180 tr">活动时间范围:</span>
                      <Select :disabled="auditing" v-model="marketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ml5">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="normaldata">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time1" :value="marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left lh32 utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time2" :value="marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                  </li>
              <li  class="mt15">
                <span class=" lh32 displayib w180 tr">标题:</span>
                <Input :disabled="auditing" :maxlength='50' v-model="titles" placeholder="请输入标题" style="width: 300px" />
              </li>
              <li class="clearfix mt15" >
                <span class="left lh32 displayib w180 tr">选择省份:</span>
                <div class="left clearfix" >
                  <Button :disabled="auditing" type="primary" class="left" @click="allElection">{{election}}</Button>
                  <CheckboxGroup v-model="fruit" @on-change="checkange" class="left ml20" style="width:700px">
                    <Checkbox :disabled="auditing" v-for="item in provincelist" :label="item.label">{{item.value}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </li>
              <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">首次充值:</span>
                      <div class="left ">   
                      <div
                        v-for="(item, index) in addnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" v-model="item.rechargeCount" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">单笔充值</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input>
                        <span class="left ml10 spandis" >送</span>
                        <Select :disabled="auditing" v-model="item.ticketNo" class="left mb5  inputnum" style="width:150px">
                            <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        <span class="left spandis spandisright"  >劵</span>
                        <Input :disabled="auditing" type="text" v-model="item.count" class="left mb5  inputnum"  style="width:120px">
                        <span slot="append" class="left">张</span>
                        </Input>
                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal(1)">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index,1)">-</Button>
                      </div>
                      </div>
                </li>
                <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">复充:</span>
                      <div class="left ">   
                      <div
                        v-for="(item, index) in firstaddnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" v-model="item.rechargeCount" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">单笔充值</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input>
                        <span class="left ml10 spandis" >送</span>
                          <Select :disabled="auditing" v-model="item.ticketNo" class="left mb5  inputnum" style="width:150px">
                              <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
                          </Select>
                          <span class="left spandis spandisright"  >劵</span>
                        <div class="left ml10" v-for="(res,i) in item.list">
                            <Input :disabled="auditing" type="text" v-model="res.count" class="left mb5 inputnum"  style="width:180px">
                            <span slot="prepend" v-if="res.vipLevel==-1">普通用户</span>
                            <span slot="prepend" v-else>会员V{{res.vipLevel}}</span>
                            <span slot="append" class="left">张</span>
                            </Input>
                        </div>

                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal(2)">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index,2)">-</Button>
                      </div>
                      </div>
                  </li>
            </ul>            
          </div>
          </div>


          <div class=" mt50 tc">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="marketingusbmit">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button :disabled="this.$route.query.num==1" v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="this.$route.query.num==1" type="primary" @click="backingOut">返回</Button>             
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="this.$route.query.num" type="ghost" @click="handleRender3">查看操作日志</Button>
          </div>
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
                  <Select @on-change="invitationgiveexa" v-model="formCustomexa.activeType" style="width:160px" >
                    <Option  value="2" >审核通过</Option>
                    <Option  value="3" >审核驳回</Option>
                  </Select>    
                </FormItem>
                <FormItem label="备注:" prop="remarks" v-if="memos">
                  <Input v-model="formCustomexa.remarks" :maxlength='50' type="textarea" :rows="4" placeholder="请输入备注" />    
                </FormItem>
            </Form>
            </div>
          </Modal>
          <Modal v-model="modal2" width="360">
              <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>温馨提示</span>
              </p>
              <div style="text-align:center">
                  <p>{{messages}}</p>
                  <p>是否要忽略?</p>
              </div>
              <div slot="footer">
                  <Button type="warning" size="large" long  @click="del">确定</Button>
              </div>
          </Modal>
          <Modal v-model="modal3" width="360">
              <p slot="header" style="color:#3d81f2;text-align:left">
                  <Icon type="ios-information-circle"></Icon>
                  <span>温馨提示</span>
              </p>
              <div style="text-align:center">
                  <p>设置成功</p>
                  <!-- <p>是否要忽略?</p> -->
              </div>
              <div slot="footer">
                  <Button type="primary" size="large"   @click="backingoutlist">确定</Button>
              </div>
          </Modal>
      </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {
          modal9:false,
          modal2:false,
          modal3:false,
          messages:'',
          memos:false,
          titleTips:false,
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
          ignoreWarn:0,
          // 修改前
            titles:'',//标题
            fruit:[],//省份
            marketTimeEnabled:'0',//充值活动时间按钮
            normaldata:false,//充值时间显示隐藏
            marketBeginTime:'',//充值开始时间
            marketEndTime:'',//充值结束时间
            index2: 1,
            index3:1,
            auditing:false,
            provincelist:[],
            provincecode:[],
            election:'全选',
            loading3:false,
            loading:true,
            gradeList:[],
            cityList:[],
            ranges3: [
                {
                    value: '0',
                    label: '不限时间范围'
                },
                {
                    value: '1',
                    label: '固定时间范围'
                }
            ],
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            // 首次充值档位
            addnormals: [
                {
                  count  : '0',//单笔充值数量
                  ticketNo : '',//抢单劵编号 
                  rechargeCount : '0',//充值数量
                }
            ],
            // 复充档位
            firstaddnormals: [
              {
                list: [
                  {
                    count: 0,
                    ticketNo: '',
                    vipLevel: 0
                  }
                ],
                rechargeCount: 0,
                ticketNo:''
              }
            ],
        }
    },
    methods: {
      time1 (value, data) {
        this.marketBeginTime = value
      },
      time2 (value, data) {
        this.marketEndTime = value
      },
    //   充值活动时间
      normaltime (val) {
        if (val == 0) {
          this.normaldata = false
        } else {
          this.normaldata = true
        }
      },
    
    // 充值档位添加
    addnormal (num) {
      if (num == 1) {
        this.index2++
        this.addnormals.push({
          count  : '0',//单笔充值数量
          ticketNo : '',//抢单劵编号 
          rechargeCount : '0',//充值数量
        })
      } else {
        this.index3++
        let list = []
        let ptobj = {
          count: 0,
          ticketNo: '',
          vipLevel: -1
        }
        list.push(ptobj)
        for (let i = 0; i < this.gradeList.length; i++) {
          let obj = new Object ()
          obj.count = 0
          obj.ticketNo = ''
          obj.vipLevel = this.gradeList[i].level
          list.push(obj)
        }
        this.firstaddnormals.push({
          list: list,
          rechargeCount: 0,
          ticketNo:''
        })
      }
      },
      // 充值档位删除
      addnorma2 (index,num) {
        if (num == 1) {
          this.addnormals.splice(index, 1)
        } else {
          this.firstaddnormals.splice(index, 1)
        }
      },
      //   保存提交审核
      marketingusbmit () {
        this.loading3 = true
        let reg = /^(0|\+?[1-9][0-9]{0,5})$/
        let res = /^[\u4e00-\u9fa5_a-zA-Z]{1,50}$/
          if (this.titles == '') {
            this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请输入标题</p>'
            })
            return false
          }
          if (!res.test(this.titles)) {
            this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请输入正确的标题</p>'
            })
            return false
          }
          if (this.fruit.length<1) {
            this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请至少选择一个省份</p>'
            })
            return false
          }     
        
        let timestamp = new Date().getTime()
        let marketBeginTime = Date.parse(new Date(this.marketBeginTime))
        let marketEndTime = Date.parse(new Date(this.marketEndTime))
        let datetimell = Date.parse(new Date())
        let date1 = Date.parse(new Date(this.marketBeginTime))/1000
        let date2 = Date.parse(new Date(this.marketEndTime))/1000
        if (this.marketTimeEnabled == 1) {     
            if ((this.marketBeginTime==''||this.marketEndTime=='')||(this.marketBeginTime==null||this.marketEndTime==null)) {
            this.loading3 = false
            this.$Modal.warning({
              title: '充值活动时间',
              content: '<p>请选择充值活动时间</p>'
            })
            return false
          }
          if (date1 >= date2) {
            this.loading3 = false
            this.$Modal.warning({
              title: '充值活动时间',
              content: '<p>开始时间必须小于结束时间</p>'
            })
            return false
          }
          if ((this.marketBeginTime!=''&&this.marketEndTime!='')||(this.marketBeginTime!=null&&this.marketEndTime!=null)) {
          if (marketBeginTime <= datetimell&&this.normaldata) {
          this.loading3 = false
          this.$Modal.warning({
                title: '充值活动开始时间',
                content: '<p>充值活动开始时间不能小于当前时间</p>'
              })
              return false
        }
        if (marketEndTime <= datetimell&&this.normaldata) {
          this.loading3 = false
          this.$Modal.warning({
                title: '充值活动结束时间',
                content: '<p>充值活动结束时间不能小于当前时间</p>'
              })
              return false
        }
        }
        }
        let addnormalslist = []
        for (let i = 0; i < this.addnormals.length; i++) {
          for (let x in this.addnormals[i]) {
            if (x!='ticketNo') {
              if (!reg.test(this.addnormals[i][x])) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>首次充值请输入整数</p>'
                })
                this.loading3 = false
                return false
              }
              if (this.addnormals[i][x]>999999) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>首次充值请输入0-999999之间的正整数</p>'
                })
                this.loading3 = false
                return false
              }
            }else {
              if (this.addnormals[i][x] == '') {
                this.loading3 = false
                this.$Modal.warning({
                  title: '温馨提示',
                  content: '<p>请选择首次充值抢单劵编号</p>'
                })
                return false
              }
              
            }
            }
        }
        for (let j = 0; j < this.firstaddnormals.length; j++) {
          for (let x in this.firstaddnormals[j]) {
            if (x == 'rechargeCount') {
              if (!reg.test(this.firstaddnormals[j][x])) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>复充单笔充值赞豆请输入整数</p>'
                })
                this.loading3 = false
                return false
              }
              if (this.firstaddnormals[j][x]>999999) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>复充单笔充值赞豆请输入0-999999之间的正整数</p>'
                })
                this.loading3 = false
                return false
              }
            } else {
              if (x!='ticketNo') {
                for (let k = 0; k < this.firstaddnormals[j][x].length; k++) {
                this.firstaddnormals[j][x][k].ticketNo = this.firstaddnormals[j].ticketNo
                for (const s in this.firstaddnormals[j][x][k]) {
                  if (s!='ticketNo') {
                    if (!reg.test(this.firstaddnormals[j][x][k][s])&&s!='vipLevel') {
                    this.$Modal.warning({
                      title: '提示',
                      content: '<p>复充送赞豆活动请输入整数</p>'
                    })
                    this.loading3 = false
                    return false
                  }
                  if (this.firstaddnormals[j][x][k][s]>999999&&s!='vipLevel') {
                    this.$Modal.warning({
                      title: '提示',
                      content: '<p>复充送赞豆活动请输入0-999999之间的正整数</p>'
                    })
                    this.loading3 = false
                    return false
                  }
                  }
                }
              }
              }else {
                if (this.firstaddnormals[j][x] == '') {
                  this.loading3 = false
                  this.$Modal.warning({
                    title: '温馨提示',
                    content: '<p>请选择复充抢单劵编号</p>'
                  })
                  return false
                }
              }
              
            }
              
            }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {        
            let list = {
                areaList:this.fruit,//省份合集
                confName :this.titles,//标题
                // ignoreWarn :this.ignoreWarn,//是否忽略已配置的省
                activityTimeEnabled :this.marketTimeEnabled,//充值活动时间是否启用
                activityBeginTime :this.marketBeginTime,//充值活动开始时间
                activityEndTime :this.marketEndTime,//充值活动结束时间
                config:{
                  firstList:this.addnormals,
                  list:this.firstaddnormals
                }
            }
            let url = '/loan/rechargeActivity/save-rob'    
            this.http.post(BASE_URL + url, list)
              .then((resp) => {
                if (resp.code == 'success') {
                  this.modal3 = true
                  this.loading3 = false
                } else {
                  this.loading3 = false
                  if (resp.code == 'areaWarn') {
                    this.modal2 = true
                    this.messages = resp.message
                  } else {
                    this.$Message.warning(resp.message);     
                  }                      
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
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
        })
        },
      // 审核
      examineSubmit (name) {
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                memo : this.formCustomexa.remarks,
                code:this.$route.query.code
            }
            this.http.post(BASE_URL + '/loan/rechargeActivity/audit', data)
            .then(data=>{
                if (data.code == 'success') {
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                          this.$router.push({path:'/rechargeManagement'})
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
          this.changeLoading()
          this.modal9 = false
      })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.memos = false
      },
      toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/rechargeActivity/audit']).then(data=>{
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
      handleRender3 () {   //营销设置日志
        this.$router.push({ path: './operationLog?operationType=recharge_activity_edit'+'&code='+this.$route.query.code })
      },
      // 数据初始化
      inquireabout () {
        this.http.post(BASE_URL + '/loan/rechargeActivity/getByCode?code='+this.$route.query.code)
        .then((resp) => {
          if (resp.code == 'success') {
            this.titles = resp.data.confName//标题
            this.fruit = resp.data.areaList//省份
            this.marketTimeEnabled = String(resp.data.activityTimeEnabled)//充值活动时间开关
            this.marketBeginTime = resp.data.activityBeginTime //充值活动开始时间
            this.marketEndTime = resp.data.activityEndTime //充值活动结束时间        
            this.addnormals = resp.data.robConfig.firstList
            for (let i = 0; i < resp.data.robConfig.list.length; i++) {
              resp.data.robConfig.list[i].ticketNo = resp.data.robConfig.list[i].list[0].ticketNo
            }
            this.firstaddnormals = resp.data.robConfig.list
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      },
  
      // 省份
      province () {
        this.http.post(BASE_URL + '/loan/rechargeConf/areaList',{})
        .then((resp) => {
          if (resp.code == 'success') {
            this.provincelist = resp.data
            let listcode = []
            for (let i = 0; i < resp.data.length; i++) {
              listcode.push(resp.data[i].label)          
            }
            this.provincecode = listcode

          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      },
      // 审核状态
      invitationgiveexa (v) {
          if (v == '2') {
              this.memos = false
          } else {
              this.memos = true
          }
      },
      allElection () {       
        if (this.election == '全不选') {
          this.election = '全选'
          this.fruit = []
        } else {
          this.election = '全不选'
          this.fruit = this.provincecode
        }
      },
      checkange (val) {
        this.election = '全选'

      },
      // 返回
      backingOut () {
        window.history.go(-1);
      },
      del () {
        this.ignoreWarn = 1
        this.modal2 = false
      },
      backingoutlist () {
        this.modal3 = false
        this.$router.push({path:'/rechargeManagement'})
      },
      // 等级
      grade () {
        this.http.post(BASE_URL + '/loan/vipLevel/query',{})
        .then((resp) => {
          if (resp.code == 'success') {
            this.gradeList = resp.data
            this.firstaddnormals[0].list = []
            let ptobj = {
              count: 0,
              ticketNo: '',
              vipLevel: -1
            }
            this.firstaddnormals[0].list.push(ptobj)
            for (let i = 0; i < resp.data.length; i++) {
              let obj = {
                count: 0,
                ticketNo: '',
                vipLevel: resp.data[i].level
              }
              this.firstaddnormals[0].list.push(obj)
            }
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      },
      voucherNumber () {
        this.http.post(BASE_URL + '/loan/ticketManage/queryTicketNoList',{})
        .then((resp) => {
          if (resp.code == 'success') {
            this.cityList = resp.data
            
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      }
    },
    mounted () {
      this.voucherNumber ()//抢单劵编号
      this.province ()
      this.grade ()//等级
      if (this.$route.query.num == 1) {
        this.auditing = true
        this.inquireabout ()
      }
      if (this.$route.query.num == 2) {
        this.auditing = true
        this.inquireabout ()
      }
      if (this.$route.query.num == 3) {
        this.auditing = false
        this.inquireabout ()
      }
    }
    
}
</script>
<style lang="less" scoped>
.credit_recharge{
    margin-top: 15px;
    width: 1350px;
    // margin-left: 100px
  }
.firstCharge{
    // border-bottom: 1px solid #ccc;
    padding: 20px 0
}
.iconlabelUrl {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
}
.gearPosition{
  border-bottom: 1px solid #ccc
}
.contentcss{
  overflow-x: scroll
}
.spandis{
  display: inline-block;
  line-height: 20px;
  padding: 5px 7px;
  font-size: inherit;
  font-weight: 400;
  color: #495060;
  text-align: center;
  background-color: #eee;
  border: 1px solid #dddee1;
  border-radius: 6px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.spandisright{
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>


