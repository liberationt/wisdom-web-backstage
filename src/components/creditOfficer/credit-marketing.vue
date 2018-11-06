<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;营销设置</span>
        </p>
      </div>
      <div class=" contentcss">
          <Form :label-width="120" class="mt50">
            <FormItem >
              <Row>
                <Col span="24">
                  <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                  <FormItem label="注册入驻成功送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[0].status" style="width:60px"  class="left" @on-change="admissionsucc">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select :disabled="auditing" v-if="registergive" v-model="marketConfigList[0].marketTimeEnabled" style="width:100px" @on-change="admissiontime" class="left ml10">
                      <Option v-for="item in range" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div v-if="registertime">
                      <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time1" :value="marketConfigList[0].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time2" :value="marketConfigList[0].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[0].valueList[0].value1" v-if="registergive"class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">个</span>
                    </Input>
                  </FormItem>

                  <FormItem label="首次充值送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[1].status" style="width:60px" @on-change="firstgive" class="left">
                      <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select :disabled="auditing" v-if="firstdelivery" v-model="marketConfigList[1].marketTimeEnabled" style="width:100px" @on-change="firsttime" class="left ml10">
                      <Option v-for="item in ranges2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div v-if="firstdata">
                      <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time3" :value="marketConfigList[1].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time4" :value="marketConfigList[1].marketEndTime" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <div v-if="firstdelivery">
                      <Input :disabled="auditing" type="text" v-model="marketConfigList[1].valueList[0].value1" class="left ml10 inputnum"  style="width:127px">
                      <span slot="prepend">满</span>
                      <span slot="append" class="left">送</span>
                      </Input>
                      <Input :disabled="auditing" type="text" v-model="marketConfigList[1].valueList[0].value2" class="left inputnum"  style="width:100px">
                      <span slot="append" class="left">个</span>
                      </Input>
                    </div>
                  </FormItem>
                  <FormItem label="正常充值送:" class="mt15">
                    <div class="clearfix">
                      <Select :disabled="auditing" v-model="marketConfigList[2].marketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="normaldata">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time5" :value="marketConfigList[2].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time6" :value="marketConfigList[2].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                      <CheckboxGroup v-model="fruit" @on-change="normalgive" class="ml10 left">
                        <Checkbox :disabled="auditing" label="1">开启赠送</Checkbox>
                        <Checkbox :disabled="auditing" label="0">开启立减</Checkbox>
                      </CheckboxGroup>
                      <!-- <Select v-model="marketConfigList[2].status" style="width:60px" @on-change="normalgive" class="left ml10">
                        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select> -->
                    </div>
                    <div class="credit_recharge">
                      <div
                        v-for="(item, index) in addnormals"
                        :key="index"
                        class="mb15 clearfix"
                      >
                        <Input :disabled="auditing" type="text" @on-change="rechargemoney(item)" v-model="item.value1" class="left ml10 inputnum"  style="width:260px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.value3" class="left inputnum"  style="width:200px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.value2" v-if="normaldelivery" class="left ml10 inputnum"  style="width:127px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.value4" v-if="normaldreduce" class="left ml10 inputnum"  style="width:127px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="邀请好友送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[3].status" style="width:60px" @on-change="invitationgive" class="left">
                      <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select :disabled="auditing" v-if="invitasend" v-model="marketConfigList[3].marketTimeEnabled" style="width:100px" @on-change="invitationtime" class="left ml10">
                      <Option v-for="item in ranges4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div v-if="invitadata">
                      <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time7" :value="marketConfigList[3].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time8" :value="marketConfigList[3].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[3].valueList[0].value1" class="left ml10 inputnum" v-if="invitasend"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">个/人</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="24" class="mt20" v-if="auditing">
                  <FormItem  label="" style="border-bottom:1px solid #ccc" class="clearfix"><span class="blue1">提交审核后数据</span></FormItem>
                  <FormItem label="注册入驻成功送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[0].status" style="width:60px"  class="left" >
                      <Option v-for="items in cityList" :value="items.value" :key="items.value">{{ items.label }}</Option>
                    </Select>
                    <Select disabled v-if="registergive1" v-model="updateMarketConfigList[0].marketTimeEnabled" style="width:100px" @on-change="admissiontime" class="left ml10">
                      <Option v-for="items in range" :value="items.value" :key="items.value">{{ items.label }}</Option>
                    </Select>
                    <div v-if="registertime1">
                      <DatePicker disabled type="datetime" class="left ml10"  :value="updateMarketConfigList[0].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker disabled type="datetime" class="left " :value="updateMarketConfigList[0].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <Input type="text" disabled v-model="updateMarketConfigList[0].valueList[0].value1" v-if="registergive1" class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">个</span>
                    </Input>
                  </FormItem>

                  <FormItem label="首次充值送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[1].status" style="width:60px" @on-change="firstgive" class="left">
                      <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select disabled v-if="firstdelivery1" v-model="updateMarketConfigList[1].marketTimeEnabled" style="width:100px" @on-change="firsttime" class="left ml10">
                      <Option v-for="item in ranges2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div v-if="firstdata1">
                      <DatePicker disabled type="datetime" class="left ml10" @on-change="time3" :value="updateMarketConfigList[1].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker disabled type="datetime" class="left " @on-change="time4" :value="updateMarketConfigList[1].marketEndTime" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <div v-if="firstdelivery1">
                      <Input disabled type="text" v-model="updateMarketConfigList[1].valueList[0].value1" class="left ml10 inputnum"  style="width:127px">
                      <span slot="prepend">满</span>
                      <span slot="append" class="left">送</span>
                      </Input>
                      <Input disabled type="text" v-model="updateMarketConfigList[1].valueList[0].value2" class="left inputnum"  style="width:100px">
                      <span slot="append" class="left">个</span>
                      </Input>
                    </div>
                  </FormItem>
                  <FormItem label="正常充值送:" class="mt15">
                    <div class="clearfix">
                      <Select disabled v-model="updateMarketConfigList[2].marketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="normaldata1">
                        <DatePicker disabled type="datetime" class="left ml10"  :value="updateMarketConfigList[2].marketBeginTime"  confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left utmost">至</span>
                        <DatePicker disabled type="datetime" class="left " :value="updateMarketConfigList[2].marketEndTime"  confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                      <CheckboxGroup v-model="fruit2" @on-change="normalgive" class="ml10 left">
                        <Checkbox disabled label="1">开启赠送</Checkbox>
                        <Checkbox disabled label="0">开启立减</Checkbox>
                      </CheckboxGroup>
                    </div>
                    <div class="credit_recharge">
                      <div
                        v-for="(item, index) in addnormals2"
                        :key="index"
                        class="mb15 clearfix"
                      >
                        <Input disabled type="text" v-model="item.value1" class="left ml10 inputnum"  style="width:260px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.value3" class="left inputnum"  style="width:200px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Input disabled type="text" v-model="item.value2" v-if="normaldelivery2" class="left ml10 inputnum"  style="width:127px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input disabled type="text" v-model="item.value4" v-if="normaldreduce2" class="left ml10 inputnum"  style="width:127px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Button disabled type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button disabled type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="邀请好友送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[3].status" style="width:60px" @on-change="invitationgive" class="left">
                      <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select disabled v-if="invitasend1" v-model="updateMarketConfigList[3].marketTimeEnabled" style="width:100px" @on-change="invitationtime" class="left ml10">
                      <Option v-for="item in ranges4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div v-if="invitadata1">
                      <DatePicker disabled type="datetime" class="left ml10" @on-change="time7" :value="updateMarketConfigList[3].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                      <span class="left utmost">至</span>
                      <DatePicker disabled type="datetime" class="left " @on-change="time8" :value="updateMarketConfigList[3].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                    </div>
                    <Input disabled type="text" v-model="updateMarketConfigList[3].valueList[0].value1" class="left ml10 inputnum" v-if="invitasend1"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">个/人</span>
                    </Input>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            
            <FormItem class=" mt50 ml100">
              <Button type="primary" class="w100 examinetype" :loading="loading3" @click="marketingusbmit">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender3">查看操作日志</Button>
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
                  <Select @on-change="invitationgiveexa" v-model="formCustomexa.activeType" style="width:160px" >
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
        // 新增
        firstdata1: true,
        registertime1:true,
        registergive1:true,
        normaldata1:true,
        invitadata1:true,
        auditing:false,
        memos:false,
        registergive: true,
        firstdelivery: true,
        firstdelivery1:true,
        firstdata: true,
        normaldelivery: true,
        normaldelivery2: true,
        normaldreduce:true,     
        normaldreduce2:true,
        invitadata: true,
        invitasend: true,
        invitasend1: true,
        registertime: true,
        modal9:false,
        normaldata: true,
        loading3: false,
        loading: true,
        fruit: [],
        fruit2: [],
        index: 1,
        index2: 1,
        options3: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
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
        addnormals: [
          {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
          }
        ],
        addnormals2: [
          {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
          }
        ],
        marketConfigList: [
          {
            code: '',
            status: '',
            name:'注册入驻成功送',
            type:'register',
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
            name:'首次充值送',
            type:'first_recharge',
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
            status2:'',
            name:'正常充值送',
            type:'normal_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: []
          },
          {
            code: '',
            status: '',
            name:'邀请好友送',
            type:'invite_friend',
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
        updateMarketConfigList:[
          {
            code: '',
            status: '',
            name:'注册入驻成功送',
            type:'register',
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
            name:'首次充值送',
            type:'first_recharge',
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
            status2:'',
            name:'正常充值送',
            type:'normal_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: []
          },
          {
            code: '',
            status: '',
            name:'邀请好友送',
            type:'invite_friend',
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
      inquireabout () {
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
                    this.marketConfigList[2].status2 = String(resp.data.marketConfigList[i].status2)
                    this.marketConfigList[2].marketBeginTime = resp.data.marketConfigList[i].marketBeginTime
                    this.marketConfigList[2].marketEndTime = resp.data.marketConfigList[i].marketEndTime
                    this.addnormals = resp.data.marketConfigList[i].valueList
                    this.marketConfigList[2].valueList = this.addnormals
                    this.fruit = []
                    if (resp.data.marketConfigList[i].status == 1) {
                      this.fruit.push ('1')
                      this.normaldelivery = true
                    } else {
                      // this.fruit.push ('2')
                      this.normaldelivery = false
                    }
                    if (resp.data.marketConfigList[i].status2 == 1) {
                      this.fruit.push ('0')
                      this.normaldreduce = true
                    } else {
                      // this.fruit.push ('2')
                      this.normaldreduce = false
                    }
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
                if (resp.data.updateMarketConfigList.length > 0) {
                  document.getElementsByClassName('examinetype')[0].setAttribute('disabled','disabled')
                  this.auditing = true
                  for (let i = 0; i < resp.data.marketConfigList.length; i++) {
                  //   邀请好友送
                  if (resp.data.updateMarketConfigList[i].type == 'invite_friend') {
                    this.updateMarketConfigList[3].code = resp.data.updateMarketConfigList[i].code
                    this.updateMarketConfigList[3].status = String(resp.data.updateMarketConfigList[i].status)
                    this.updateMarketConfigList[3].marketTimeEnabled = String(resp.data.updateMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[3].marketBeginTime = resp.data.updateMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[3].marketEndTime = resp.data.updateMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[3].valueList[0].value1 = resp.data.updateMarketConfigList[i].valueList[0].value1
                    if(this.updateMarketConfigList[3].marketTimeEnabled=="1"){
                      this.invitadata1 = true;
                    }else{
                      this.invitadata1 = false;
                    }
                    if (resp.data.updateMarketConfigList[i].status == 1) {     
                      if (resp.data.updateMarketConfigList[i].marketTimeEnabled == 1) {
                        this.invitadata1 = true
                      }
                      this.invitasend1 = true
                    } else {
                      this.invitadata1 = false
                      this.invitasend1 = false
                    }
                  } else if (resp.data.updateMarketConfigList[i].type == 'normal_recharge') {//正常充值
                    this.updateMarketConfigList[2].code = resp.data.updateMarketConfigList[i].code
                    this.updateMarketConfigList[2].marketTimeEnabled = String(resp.data.updateMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[2].status = String(resp.data.updateMarketConfigList[i].status)
                    this.updateMarketConfigList[2].status2 = String(resp.data.updateMarketConfigList[i].status2)
                    this.updateMarketConfigList[2].marketBeginTime = resp.data.updateMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[2].marketEndTime = resp.data.updateMarketConfigList[i].marketEndTime
                    this.addnormals2 = resp.data.updateMarketConfigList[i].valueList
                    this.updateMarketConfigList[2].valueList = this.addnormals2
                    this.fruit2 = []
                    if (resp.data.updateMarketConfigList[i].status == 1) {
                      this.fruit2.push ('1')
                      this.normaldelivery2 = true
                    } else {
                      // this.fruit2.push ('2')
                      this.normaldelivery2 = false
                    }
                    if (resp.data.updateMarketConfigList[i].status2 == 1) {
                      this.fruit2.push ('0')
                      this.normaldreduce2 = true
                    } else {
                      // this.fruit2.push ('2')
                      this.normaldreduce2 = false
                    }
                    if(this.updateMarketConfigList[2].marketTimeEnabled=="1"){
                      this.normaldata1 = true;
                    }else{
                      this.normaldata1 = false;
                    }
                  } else if (resp.data.updateMarketConfigList[i].type == 'first_recharge') {//首次充值
                    this.updateMarketConfigList[1].code = resp.data.updateMarketConfigList[i].code
                    this.updateMarketConfigList[1].marketTimeEnabled = String(resp.data.updateMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[1].status = String(resp.data.updateMarketConfigList[i].status)
                    this.updateMarketConfigList[1].marketBeginTime = resp.data.updateMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[1].marketEndTime = resp.data.updateMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[1].valueList[0].value1 = resp.data.updateMarketConfigList[i].valueList[0].value1
                    this.updateMarketConfigList[1].valueList[0].value2 = resp.data.updateMarketConfigList[i].valueList[0].value2
                    if(this.updateMarketConfigList[1].marketTimeEnabled =="1"){
                      this.firstdelivery1 =true
                    }else{
                      this.firstdelivery1 =false
                    }
                    if (resp.data.updateMarketConfigList[i].status == 1) {     
                      if (resp.data.updateMarketConfigList[i].marketTimeEnabled == 1) {
                        this.firstdata1 = true
                      } else {
                        this.firstdata1 = false
                      }
                      this.firstdelivery1 = true
                    } else {
                      this.firstdelivery1 = false
                      this.firstdata1 = false
                    }

                  } else if (resp.data.updateMarketConfigList[i].type == 'register') {//注册充值
                    this.updateMarketConfigList[0].code = resp.data.updateMarketConfigList[i].code
                    this.updateMarketConfigList[0].marketTimeEnabled = String(resp.data.updateMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[0].status = String(resp.data.updateMarketConfigList[i].status)
                    this.updateMarketConfigList[0].marketBeginTime = resp.data.updateMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[0].marketEndTime = resp.data.updateMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[0].valueList[0].value1 = resp.data.updateMarketConfigList[i].valueList[0].value1
                    if(this.updateMarketConfigList[0].marketTimeEnabled =="1"){
                      this.registertime1 = true
                      this.registergive1 = true
                    }else{
                      this.registertime1 = false
                      this.registergive1 = false
                    }
                    if (resp.data.updateMarketConfigList[i].status == 1) {     
                      if (resp.data.updateMarketConfigList[i].marketTimeEnabled == 1) {
                        this.registertime1 = true
                      }
                      this.registergive1 = true
                    } else {
                      this.registertime1 = false
                      this.registergive1 = false
                    }
                  }
                }
                } else {
                  document.getElementsByClassName('examinetype')[0].removeAttribute('disabled')
                  this.auditing = false
                }
              } else {
              }
            })
            .catch(() => {
            })
      },
      // 入驻成功开启关闭
      admissionsucc (val) {
        if (val == 1) {
          this.registergive = true
          if (this.marketConfigList[0].marketTimeEnabled == 1) {
            this.registertime = true
          }
        } else {
          this.registergive = false
          this.registertime = false
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
        firstgive (val) {
        if (val == 1) {
          this.firstdelivery = true
          if (this.marketConfigList[1].marketTimeEnabled == 1) {
            this.firstdata = true
          }
        } else {
          this.firstdelivery = false
          this.firstdata = false
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
      normalgive (val) {
        console.log(val)
        if (val.length == 0) {
          this.normaldreduce = false
          this.normaldelivery = false
          this.marketConfigList[2].status = '0'
          this.marketConfigList[2].status2 = '0'
        } else if (val.length == 1) {
          if (val[0] == '1') {
            this.normaldelivery = true
            this.normaldreduce = false
            this.marketConfigList[2].status = '1'
            this.marketConfigList[2].status2 = '0'
          } else {
            this.normaldreduce = true
            this.normaldelivery = false
            this.marketConfigList[2].status = '0'
            this.marketConfigList[2].status2 = '1'
          }          
        } else {
          this.normaldelivery = true
          this.normaldreduce = true
          this.marketConfigList[2].status = '1'
          this.marketConfigList[2].status2 = '1'
        }
      },
      addnormal () {
        this.index2++
        this.addnormals.push({
          value1: '',
          value2: '0',
          value3: '',
          value4: '0',
        })
      },
      addnorma2 (index) {
        this.addnormals.splice(index, 1)
      },
      invitationgive (val) {
        if (val == 1) {
          this.invitasend = true
          if (this.marketConfigList[3].marketTimeEnabled == 1) {
            this.invitadata = true
          }
        } else {
          this.invitasend = false
          this.invitadata = false
        }
      },
      invitationtime (val) {
        if (val == 0) {
          this.invitadata = false
        } else {
          this.invitadata = true
        }
      },
       // 营销设置审核
      examineSubmit (name) {
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                auditRemark : this.formCustomexa.remarks
            }
            this.http.post(BASE_URL + '/loan/marketConfig/audit', data)
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
          this.changeLoading()
          this.modal9 = false
      })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.memos = false
      },
      handleRender3 () {   //营销设置日志
        this.$router.push({ path: './operationLog?operationType=market_edit' })
      },
    //   保存提交审核
      marketingusbmit () {
        this.loading3 = true
        let reg = /^\d+$/
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
              if (!reg.test(this.marketConfigList[i].valueList[j][x])) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>请输入整数</p>'
                })
                this.loading3 = false
                return false
              }
            }
          }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
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
                  this.inquireabout ()
                } else {
                  this.loading3 = false
                  this.$Message.warning(resp.message);                 
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
        toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/marketConfig/audit']).then(data=>{
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
      invitationgiveexa (v) {
          if (v == 'pass') {
              this.memos = false
          } else {
              this.memos = true
          }
      },
      rechargemoney (item) {
        item.value3 = item.value1
      }

  },
  mounted () {
    
    this.inquireabout ()       
  }
};
</script>
<style lang="less" scoped>
.credit_recharge{
    margin-top: 15px;
    width: 800px;
    margin-left: 100px
  }
</style>
