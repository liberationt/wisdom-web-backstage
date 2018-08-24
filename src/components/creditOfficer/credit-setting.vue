<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷员管理&nbsp;>&nbsp;信贷设置</span>
      </p>
    </div>
    <div>
          <Tabs type="card" :animated="false" @on-click="marketquery">
            <TabPane label="基本设置">
            <Form :label-width="210" class="mt50">
                <FormItem v-for="item in formCustom" :label="item.configName+':'" prop="fabulous">
                    <Input type="text" v-model="item.configValue" style="width:300px">
                    <span slot="append">{{item.configUnitDesc}}</span>
                    </Input>
                    <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" class="w100" :loading="loading3" @click="handleSubmit">
                        <span v-if="!loading3">保存设置</span>
                        <span v-else>保存设置</span>
                    </Button>
                </FormItem>
            </Form>
            </TabPane>
            
            <TabPane label="用户身价设置">
                <Form  :model="pricesetting" :label-width="200" class="mt50">
                <FormItem label="底价:" >
                    <Input type="text" v-model="pricesetting.userSocialResList[1].socialScore" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                </FormItem>
                <FormItem label="已实名:" >
                    <Input type="text" v-model="pricesetting.userSocialResList[0].socialScore" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                </FormItem>
                <FormItem v-for="item in pricesetting.businessSocialResList" :label="item.infoTitleName"  class="clearfix">
                    <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                        <Input v-if="res.infoOptionName!='无'" type="text" v-model="res.infoOptionScore" style="width:150px">
                           <span slot="prepend">{{res.infoOptionName}}</span>
                        </Input>
                    </div>                   
                </FormItem>              
                <FormItem class="tc mt50">
                    <Button type="primary" class="w100" :loading="loading3" @click="preservationvalue">
                        <span v-if="!loading3">保存配置</span>
                        <span v-else>保存配置</span>
                    </Button>
                </FormItem>
            </Form>
            </TabPane>

            <TabPane label="营销设置" >
                <Form :label-width="200" class="mt50">
                    <FormItem label="注册入驻成功送:" class="clearfix">
                        <Select v-model="marketConfigList[0].status" style="width:60px"  class="left" @on-change="admissionsucc">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="marketConfigList[0].marketTimeEnabled" style="width:100px" @on-change="admissiontime" class="left ml10">
                            <Option v-for="item in range" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="registertime">
                            <DatePicker type="datetime" class="left ml10" @on-change="time1" :value="marketConfigList[0].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                                <span class="left utmost">至</span>
                            <DatePicker type="datetime" class="left " @on-change="time2" :value="marketConfigList[0].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                        </div>                       
                        <Input type="text" v-model="marketConfigList[0].valueList[0].value1" v-if="registergive"class="left ml10 inputnum"  style="width:100px">
                            <span slot="append" class="left">个</span>
                        </Input>
                    </FormItem>

                    <FormItem label="首次充值送:" class="clearfix">
                        <Select v-model="marketConfigList[1].status" style="width:60px" @on-change="firstgive" class="left">
                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="marketConfigList[1].marketTimeEnabled" style="width:100px" @on-change="firsttime" class="left ml10">
                            <Option v-for="item in ranges2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="firstdata">
                            <DatePicker type="datetime" class="left ml10" @on-change="time3" :value="marketConfigList[1].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                                <span class="left utmost">至</span>
                            <DatePicker type="datetime" class="left " @on-change="time4" :value="marketConfigList[1].marketEndTime" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                        </div>
                        <div v-if="firstdelivery">
                            <Input type="text" v-model="marketConfigList[1].valueList[0].value1" class="left ml10 inputnum"  style="width:127px">
                            <span slot="prepend">满</span>
                            <span slot="append" class="left">送</span>
                        </Input>
                        <Input type="text" v-model="marketConfigList[1].valueList[0].value2" class="left inputnum"  style="width:100px">
                            <span slot="append" class="left">个</span>
                        </Input>
                        </div>                            
                    </FormItem>
                    <FormItem label="正常充值送:" >
                        <div class="clearfix">                       
                        <Select v-model="marketConfigList[2].marketTimeEnabled" style="width:100px;margin-left:110px" @on-change="normaltime" class="left ">
                            <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="normaldata">
                            <DatePicker type="datetime" class="left ml10" @on-change="time5" :value="marketConfigList[2].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                                <span class="left utmost">至</span>
                            <DatePicker type="datetime" class="left " @on-change="time6" :value="marketConfigList[2].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                        </div>                        
                        <Select v-model="marketConfigList[2].status" style="width:60px" @on-change="normalgive" class="left ml10">
                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </div>                    
                        <div class="credit_recharge">
                            <div
                             v-for="(item, index) in addnormals"
                             :key="index"
                             class="mb15 clearfix"
                             >
                            <Input type="text" v-model="item.value1" class="left ml10 inputnum"  style="width:260px">
                            <span slot="prepend">充</span>
                            <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input type="text" v-model="item.value3" class="left inputnum"  style="width:200px">
                            <span slot="append" class="left">元</span>
                        </Input>
                        <Input type="text" v-model="item.value2" v-if="normaldelivery" class="left ml10 inputnum"  style="width:127px">
                            <span slot="prepend">送</span>
                            <span slot="append" class="left">个</span>
                        </Input>
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                        </div>
                        </div>
                    </FormItem>
                    <FormItem label="邀请好友送:" class="clearfix">
                        <Select v-model="marketConfigList[3].status" style="width:60px" @on-change="invitationgive" class="left">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="marketConfigList[3].marketTimeEnabled" style="width:100px" @on-change="invitationtime" class="left ml10">
                            <Option v-for="item in ranges4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="invitadata">
                            <DatePicker type="datetime" class="left ml10" @on-change="time7" :value="marketConfigList[3].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                                <span class="left utmost">至</span>
                            <DatePicker type="datetime" class="left " @on-change="time8" :value="marketConfigList[3].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                        </div>                        
                        <Input type="text" v-model="marketConfigList[3].valueList[0].value1" class="left ml10 inputnum" v-if="invitasend"  style="width:127px">
                            <span slot="prepend">送</span>
                            <span slot="append" class="left">个/人</span>
                        </Input>
                    </FormItem>
                     <FormItem class=" mt50 ml100">
                    <Button type="primary" class="w100" :loading="loading3" @click="marketingusbmit">
                        <span v-if="!loading3">保存配置</span>
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <!-- <Button type="primary" @click="marketingusbmit">保存配置</Button>&nbsp;&nbsp;&nbsp;&nbsp; -->
                    <Button type="ghost" @click="handleRender">查看操作日志</Button>
                </FormItem>
                </Form>
            </TabPane>
          </Tabs>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      registergive: true,
      registertime: true,
      firstdelivery: true,
      firstdata: true,
      normaldata: true,
      normaldelivery: true,
      invitasend: true,
      invitadata: true,
      options3: {
        disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
        }
      },
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
      formCustom: [],
      marketConfigList: [
          {
            code: '',
            status: '',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
                {
                    value1: '' 
                }              
            ]          
          },
          {
            code: '',
            status: '',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
                {
                    value1: '',
                    value2: ''
                }              
            ]          
          },
          {
            code: '',
            status: '',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: []          
          },
          {
            code: '',
            status: '',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
                {
                    value1: '' 
                }              
            ]          
          },

      ],
      cityList: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      cityList2: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      cityList3: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      cityList4: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      range: [
          {
          value: '0',
          label: '不限时间范围'
        },
        {
          value: '1',
          label: '固定时间范围'
        }
      ],
      ranges2: [
          {
          value: '0',
          label: '不限时间范围'
        },
        {
          value: '1',
          label: '固定时间范围'
        }
      ],
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
      ranges4: [
          {
          value: '0',
          label: '不限时间范围'
        },
        {
          value: '1',
          label: '固定时间范围'
        }
      ],
      index: 1,
      index2: 1,
      addnormals: [
        {
          value1: '',
          value2: '',
          value3: ''
        }
      ],
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
          this.loading3 = false
        } else {
            this.loading3 = false
        }
      })
      .catch(() => {               
      })
    },
    handleRender () {
      this.$router.push({ path: './operationLog' })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    addnormal () {
      this.index2++
      this.addnormals.push({
        value1: '',
        value2: '',
        value3: ''
      })
    },
    addnorma2 (index) {
       this.addnormals.splice(index, 1)
    },
     // 时间判断
    time1 (value, data) {
        this.marketConfigList[0].marketBeginTime = value   
    },
    time2 (value, data) {
        this.marketConfigList[0].marketEndTime = value
    },
    time3 (value, data) {
        this.marketConfigList[1].marketBeginTime = value   
    },
    time4 (value, data) {
        this.marketConfigList[1].marketEndTime = value
    },
    time5 (value, data) {
        this.marketConfigList[2].marketBeginTime = value   
    },
    time6 (value, data) {
        this.marketConfigList[2].marketEndTime = value
    },
    time7 (value, data) {
        this.marketConfigList[3].marketBeginTime = value   
    },
    time8 (value, data) {
        this.marketConfigList[3].marketEndTime = value
    },   
    // 营销设置回显
    marketquery (name) {
        if (name == 0) {
            this.basicsetup ()
        }else if (name == 1) {
            this.http.post(BASE_URL + '/loan/userSocial/getUserSocialList', {})
            .then((resp) => {
                if (resp.code == 'success') {
                    this.pricesetting.userSocialResList = resp.data.userSocialResList
                    this.pricesetting.businessSocialResList = resp.data.businessSocialResList
                } else {             
                }
            })
            .catch(() => {               
            })
        } else if (name == 2) {
        this.http.post(BASE_URL + '/loan/marketConfig/query', {})
          .then((resp) => {
            if (resp.code == 'success') {
              for (let i = 0; i < resp.data.marketConfigList.length; i++) {
                //   邀请好友送
                  if (resp.data.marketConfigList[i].type == 'invite_friend') {
                    this.marketConfigList[3].code = resp.data.marketConfigList[i].code
                    this.marketConfigList[3].status = String(resp.data.marketConfigList[i].status)
                    this.marketConfigList[3].marketTimeEnabled = String(resp.data.marketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[3].marketBeginTime = resp.data.marketConfigList[i].marketBeginTime
                    this.marketConfigList[3].marketEndTime = resp.data.marketConfigList[i].marketEndTime
                    this.marketConfigList[3].valueList[0].value1 = resp.data.marketConfigList[i].valueList[0].value1
                  } else if (resp.data.marketConfigList[i].type == 'normal_recharge') {//正常充值
                    this.marketConfigList[2].code = resp.data.marketConfigList[i].code
                    this.marketConfigList[2].marketTimeEnabled = String(resp.data.marketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[2].status = String(resp.data.marketConfigList[i].status)
                    this.marketConfigList[2].marketBeginTime = resp.data.marketConfigList[i].marketBeginTime
                    this.marketConfigList[2].marketEndTime = resp.data.marketConfigList[i].marketEndTime
                    this.addnormals = resp.data.marketConfigList[i].valueList
                    this.marketConfigList[2].valueList = this.addnormals
                  } else if (resp.data.marketConfigList[i].type == 'first_recharge') {//首次充值
                    this.marketConfigList[1].code = resp.data.marketConfigList[i].code
                    this.marketConfigList[1].marketTimeEnabled = String(resp.data.marketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[1].status = String(resp.data.marketConfigList[i].status)
                    this.marketConfigList[1].marketBeginTime = resp.data.marketConfigList[i].marketBeginTime
                    this.marketConfigList[1].marketEndTime = resp.data.marketConfigList[i].marketEndTime
                    this.marketConfigList[1].valueList[0].value1 = resp.data.marketConfigList[i].valueList[0].value1
                    this.marketConfigList[1].valueList[0].value2 = resp.data.marketConfigList[i].valueList[0].value2
                  } else if (resp.data.marketConfigList[i].type == 'register') {//注册充值
                    this.marketConfigList[0].code = resp.data.marketConfigList[i].code
                    this.marketConfigList[0].marketTimeEnabled = String(resp.data.marketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[0].status = String(resp.data.marketConfigList[i].status)
                    this.marketConfigList[0].marketBeginTime = resp.data.marketConfigList[i].marketBeginTime
                    this.marketConfigList[0].marketEndTime = resp.data.marketConfigList[i].marketEndTime
                    this.marketConfigList[0].valueList[0].value1 = resp.data.marketConfigList[i].valueList[0].value1
                  }                
              }
            } else {
            }
          })
          .catch(() => {
          })
      }
    },
    basicsetup () {
        this.http.post(BASE_URL + '/loan/officerConfig/getOfficerConfigAll', {})
      .then((resp) => {
        if (resp.code == 'success') {
            this.formCustom = resp.data      
        } else {
            this.$Message.error(resp.message);     
        }
      })
      .catch(() => {

      })
    },
    // 身价设置保存
    preservationvalue () {
        this.loading3 = true
        let businessSocialResList = []
        for (let i = 0; i < this.pricesetting.businessSocialResList.length; i++) {
            for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
                let obj = new Object ()
                obj.infoOptionKey = this.pricesetting.businessSocialResList[i].options[j].infoOptionKey
                obj.infoOptionScore = this.pricesetting.businessSocialResList[i].options[j].infoOptionScore
                businessSocialResList.push(obj)
            }          
        }
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
          this.loading3 = false 
        } else {
            this.loading3 = false 
            this.$Message.error(resp.message);     
        }
      })
      .catch(() => {

      })

    },
    marketingusbmit () {
        this.loading3 = true
        let reg = /^(0|[1-9][0-9]*)$/
        let timestamp = new Date().getTime()
        for (let i = 0; i < this.marketConfigList.length; i++) {           
            let date1 = Date.parse(new Date(this.marketConfigList[i].marketBeginTime))/1000
            let date2 = Date.parse(new Date(this.marketConfigList[i].marketEndTime))/1000
            if (date1 > date2) {
                this.loading3 = false
                this.$Modal.warning({
                title: '营销时间',
                content: '<p>开始时间不得大于结束时间</p>'
                })
                return false
            }
            for (let j = 0; j < this.marketConfigList[i].valueList.length; j++) {
                for (let x in this.marketConfigList[i].valueList[j]) {                    
                    // if (this.marketConfigList[i].valueList[j][x] == '') {
                    //   this.$Modal.warning({
                    //         title: '提示',
                    //         content: '<p>请输入赠送值</p>'
                    //     })
                    //     return false  
                    // }
                    if (!reg.test(this.marketConfigList[i].valueList[j][x])) {
                        this.$Modal.warning({
                            title: '提示',
                            content: '<p>请输入数字</p>'
                        })
                        this.loading3 = false
                        return false
                    }
                }              
            }          
        }
        let list = {
            marketConfigList: []
        }
        this.marketConfigList[2].valueList = this.addnormals
        list.marketConfigList = this.marketConfigList

        this.http.post(BASE_URL + '/loan/marketConfig/update', list)
          .then((resp) => {
            if (resp.code == 'success') {
                this.$Modal.success({
                    title: '提示',
                    content: '<p>设置成功</p>'
                })
                this.loading3 = false
            } else {
                this.loading3 = false
                this.$Modal.warning({
                    title: '提示',
                    render: (h) => {
                        return h('p', {
                            style: {
                                marginTop: '20px'
                            },
                        }, resp.message)
                    }
                })

            }
          })
          .catch(() => {
          })

    },
    // 入驻成功开启关闭
    admissionsucc (val) {
        if (val == 1) {
            this.registergive = true
        } else {
            this.registergive = false
        }
    },
    firstgive (val) {
        if (val == 1) {
            this.firstdelivery = true
        } else {
            this.firstdelivery = false
        }
    },
    normalgive (val) {
        if (val == 1) {
            this.normaldelivery = true
        } else {
            this.normaldelivery = false
        }
    },
    invitationgive (val) {
        if (val == 1) {
            this.invitasend = true
        } else {
            this.invitasend = false
        }
    },
    // 入驻时间固定放开
    admissiontime (val) {
        if (val == 0) {
            this.registertime = false
        } else {
            this.registertime = true
        }
    },
    firsttime (val) {
        if (val == 0) {
            this.firstdata = false
        } else {
            this.firstdata = true
        }
    },
    normaltime (val) {
        if (val == 0) {
            this.normaldata = false
        } else {
            this.normaldata = true
        }
    },
    invitationtime (val) {
        if (val == 0) {
            this.invitadata = false
        } else {
            this.invitadata = true
        }
    }
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
    left: 305px
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
