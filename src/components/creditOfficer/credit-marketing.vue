<template>
  <div style="min-width:1070px">
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;营销设置</span>
        </p>
      </div>
      <div class=" contentcss">
          <Form :label-width="100" class="mt50">
            <FormItem >
              <Row>
                <Col span="24">
                  <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                  <FormItem label="注册入驻成功送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[0].giveStatus" style="width:60px"  class="left" @on-change="admissionsucc">
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
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[0].valueList[0].rechargeNumber" v-if="registergive"class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">个</span>
                    </Input>
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[0].valueList[0].giveCouponNumber" v-if="registergive"class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">张</span>
                    </Input>
                  </FormItem>

                  <FormItem label="首次充值送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[1].giveStatus" style="width:60px" @on-change="firstgive" class="left">
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
                      <Input :disabled="auditing" type="text" v-model="marketConfigList[1].valueList[0].rechargeNumber" class="left ml10 inputnum"  style="width:127px">
                      <span slot="prepend">满</span>
                      <span slot="append" class="left">送</span>
                      </Input>
                      <Input :disabled="auditing" type="text" v-model="marketConfigList[1].valueList[0].giveNumber" class="left inputnum"  style="width:100px">
                      <span slot="append" class="left">个</span>
                      </Input>
                    </div>
                  </FormItem>
                  <FormItem label="正常充值送:"  class="mt15">
                    <div class="clearfix">
                      <Select :disabled="auditing" v-model="marketConfigList[2].marketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="normaldata">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time5" :value="marketConfigList[2].marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time6" :value="marketConfigList[2].marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                      <Upload
                      action=""
                      class="upstyle"
                      :disabled="auditing"
                      :before-upload="handleUploadicon"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError1">
                      <img class="iconlabelUrl left" :src="labelUrl" alt="">
                      <Input v-model="productlogo" disabled style="width: 120px" class="left ml5 hidden"></Input>   
                      </Upload>
                      <CheckboxGroup v-model="fruit" @on-change="normalgive" class="ml10 left">
                        <Checkbox :disabled="auditing" label="1">开启赠送</Checkbox>
                        <Checkbox :disabled="auditing" label="0">开启立减</Checkbox>
                        <Checkbox :disabled="auditing" label="2">开启赠送会员</Checkbox>
                        <Checkbox :disabled="auditing" label="3">开启首充</Checkbox>
                        <Checkbox :disabled="auditing" label="4">开启送抢单券</Checkbox>
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
                        <Input :disabled="auditing" type="text" @on-change="rechargemoney(item)" v-model="item.rechargeNumber" class="left ml10 mb5 inputnum"  style="width:150px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left mb5 inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.giveNumber" v-if="normaldelivery" class="left ml10 mb5 inputnum"  style="width:100px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.reduceAmount" v-if="normaldreduce" class="left mb5 ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- 三期开始 -->
                        <Select :disabled="auditing"  v-model="item.recommendStatus" style="width:90px" class="left mb5">
                          <Option  value='1' >设为推荐</Option>
                          <Option  value='0' >一般</Option>
                        </Select>                 
                        <Input :disabled="auditing" type="text" v-model="item.firstGiveNumber" v-if="firstGive" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">首充送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.firstReduceAmount" v-if="firstGive" class="left mb5 ml10 inputnum"  style="width:140px">
                        <span slot="prepend">首充立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Select :disabled="auditing" v-model="item.firstRecommendStatus" style="width:110px"  class="left mb5">
                          <Option  value="1" >设为首充推荐</Option>
                          <Option  value="0" >一般</Option>
                        </Select>                  
                        <Input :disabled="auditing" type="text" v-model="item.giveVipDays" v-if="senmembers" class="left mb5 ml10 inputnum"  style="width:110px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天</span>
                        </Input>             
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" v-if="deliverySsecurities" class="left mb5 ml10 inputnum"  style="width:110px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">张</span>
                        </Input>
                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="邀请好友送:" class="clearfix mt15">
                    <Select :disabled="auditing" v-model="marketConfigList[3].giveStatus" style="width:60px" @on-change="invitationgive" class="left">
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
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[3].valueList[0].rechargeNumber" class="left ml10 inputnum" v-if="invitasend"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">个/人</span>
                    </Input>
                    <Input :disabled="auditing" type="text" v-model="marketConfigList[3].valueList[0].giveCouponNumber" class="left ml10 inputnum" v-if="invitasend"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">张</span>
                    </Input>
                  </FormItem>
                </Col>
                <!-- 修改后 -->
                <Col span="24" class="mt20" v-if="auditing">
                  <FormItem  label="" style="border-bottom:1px solid #ccc" class="clearfix"><span class="blue1">提交审核后数据</span></FormItem>
                  <FormItem label="注册入驻成功送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[0].giveStatus" style="width:60px"  class="left" >
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
                    <Input type="text" disabled v-model="updateMarketConfigList[0].valueList[0].rechargeNumber" v-if="registergive1" class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">个</span>
                    </Input>
                    <Input :disabled="auditing" type="text" v-model="updateMarketConfigList[0].valueList[0].giveCouponNumber" v-if="registergive"class="left ml10 inputnum"  style="width:100px">
                    <span slot="append" class="left">张</span>
                    </Input>
                  </FormItem>

                  <FormItem label="首次充值送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[1].giveStatus" style="width:60px" @on-change="firstgive" class="left">
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
                      <Input disabled type="text" v-model="updateMarketConfigList[1].valueList[0].rechargeNumber" class="left ml10 inputnum"  style="width:127px">
                      <span slot="prepend">满</span>
                      <span slot="append" class="left">送</span>
                      </Input>
                      <Input disabled type="text" v-model="updateMarketConfigList[1].valueList[0].giveNumber" class="left inputnum"  style="width:100px">
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
                      <Upload
                      action=""
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png', 'gif']"
                      <img class="iconlabelUrl2 left" :src="labelUrl2" alt="">
                      <Input v-model="productlogo2" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>   
                      </Upload>
                      <CheckboxGroup v-model="fruit2" @on-change="normalgive" class="ml10 left">
                        <Checkbox :disabled="auditing" label="1">开启赠送</Checkbox>
                        <Checkbox :disabled="auditing" label="0">开启立减</Checkbox>
                        <Checkbox :disabled="auditing" label="2">开启赠送会员</Checkbox>
                        <Checkbox :disabled="auditing" label="3">开启首充</Checkbox>
                        <Checkbox :disabled="auditing" label="4">开启送抢单券</Checkbox>
                      </CheckboxGroup>
                    </div>
                    <div class="credit_recharge">
                      <div
                        v-for="(item, index) in addnormals2"
                        :key="index"
                        class="mb15 clearfix"
                      >
                        <Input disabled type="text" v-model="item.rechargeNumber" class="left ml10 inputnum"  style="width:150px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Input disabled type="text" v-model="item.giveNumber" v-if="normaldelivery2" class="left ml10 inputnum"  style="width:100px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input disabled type="text" v-model="item.reduceAmount" v-if="normaldreduce2" class="left ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- 三期开始 -->
                        <Select :disabled="auditing"  v-model="item.recommendStatus" style="width:90px" class="left mb5">
                          <Option  value='1' >设为推荐</Option>
                          <Option  value='0' >一般</Option>
                        </Select>                      
                        <Input :disabled="auditing" type="text" v-model="item.firstGiveNumber" v-if="firstGive2" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">首充送</span>
                        <span slot="append" class="left">个</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.firstReduceAmount" v-if="firstGive2" class="left mb5 ml10 inputnum"  style="width:140px">
                        <span slot="prepend">首充立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <Select :disabled="auditing"  v-model="item.firstRecommendStatus" style="width:110px"  class="left mb5">
                          <Option  value="1" >设为首充推荐</Option>
                          <Option  value="0" >一般</Option>
                        </Select>                
                        <Input :disabled="auditing" type="text" v-model="item.giveVipDays" v-if="senmembers2" class="left mb5 ml10 inputnum"  style="width:110px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天</span>
                        </Input>                     
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" v-if="deliverySsecurities2" class="left mb5 ml10 inputnum"  style="width:110px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">张</span>
                        </Input>
                        <!-- 三期结束 -->

                        <Button disabled type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
                        <Button disabled type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem label="邀请好友送:" class="clearfix mt15">
                    <Select disabled v-model="updateMarketConfigList[3].giveStatus" style="width:60px" @on-change="invitationgive" class="left">
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
                    <Input disabled type="text" v-model="updateMarketConfigList[3].valueList[0].rechargeNumber" class="left ml10 inputnum" v-if="invitasend1"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">个/人</span>
                    </Input>
                    <Input :disabled="auditing" type="text" v-model="updateMarketConfigList[3].valueList[0].giveCouponNumber" class="left ml10 inputnum" v-if="invitasend"  style="width:127px">
                    <span slot="prepend">送</span>
                    <span slot="append" class="left">张</span>
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
        normaldelivery: false,
        normaldelivery2: false,
        normaldreduce:false,     
        normaldreduce2:false,
        invitadata: true,
        invitasend: true,
        invitasend1: true,
        registertime: true,
        modal9:false,
        normaldata: true,
        loading3: false,
        loading: true,
        // firstRecommendation:false,//首充推荐显示隐藏
        firstGive:false,//开启首充控制
        senmembers:false,//赠送会员
        deliverySsecurities:false,//送抢单劵控制
        // firstRecommendation2:false,//首充推荐显示隐藏
        firstGive2:false,//开启首充控制
        senmembers2:false,//赠送会员
        deliverySsecurities2:false,//送抢单劵控制
        labelUrl:require("../../image/moren.png"),
        productlogo:'',
        iconlabelUrl2:require("../../image/moren.png"),
        productlogo2:'',
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
            rechargeNumber: '',
            giveNumber: '',
            rechargeAmount: '',
            reduceAmount: '',
            firstRecommendStatus:'',//首充推荐
            firstGiveNumber:'',//首充送
            firstReduceAmount:'',//首充立减
            recommendStatus:'',//复充推荐
            giveVipDays:'',//赠送天数
            giveCouponNumber:'',//赠送优惠券
          }
        ],
        addnormals2: [
          {
            rechargeNumber: '',
            giveNumber: '',
            rechargeAmount: '',
            reduceAmount: '',
            firstRecommendStatus:'',//首充推荐
            firstGiveNumber:'',//首充送
            firstReduceAmount:'',//首充立减
            recommendStatus:'',//复充推荐
            giveVipDays:'',//赠送天数
            giveCouponNumber:'',//赠送优惠券
          }
        ],
        marketConfigList: [
          {
            code: '',
            giveStatus: '',       
            name:'注册入驻成功送',
            type:'register',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveCouponNumber:''
              }
            ]
          },
          {
            code: '',
            giveStatus: '',
            name:'首次充值送',
            type:'first_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveNumber: ''
              }
            ]
          },
          {
            code: '',
            giveStatus: '',//开启赠送
            reduceStatus:'',//开启立减
            giveCouponStatus :'',//劵赠送状态
            giveFirstRechargeStatus :'',//首充状态
            giveVipStatus :'',//赠送会员状态            
            name:'正常充值送',
            type:'normal_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: []
          },
          {
            code: '',
            giveStatus: '',
            name:'邀请好友送',
            type:'invite_friend',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveCouponNumber:''
              }
            ]
          },

        ],
        updateMarketConfigList:[
          {
            code: '',
            giveStatus: '',
            name:'注册入驻成功送',
            type:'register',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveCouponNumber:''
              }
            ]
          },
          {
            code: '',
            giveStatus: '',
            name:'首次充值送',
            type:'first_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveNumber: ''
              }
            ]
          },
          {
            code: '',
            giveStatus: '',
            reduceStatus:'',
            name:'正常充值送',
            type:'normal_recharge',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: []
          },
          {
            code: '',
            giveStatus: '',
            name:'邀请好友送',
            type:'invite_friend',
            marketTimeEnabled: '',
            marketBeginTime: '',
            marketEndTime: '',
            valueList: [
              {
                rechargeNumber: '',
                giveCouponNumber:''
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
                // 修改前
                if (resp.data.before.recommendPicUrl!=null) {
                  this.labelUrl = this.productlogo = resp.data.before.recommendPicUrl
                } else {
                  this.labelUrl = require("../../image/moren.png")
                  this.productlogo = ''
                }
                
                for (let i = 0; i < resp.data.before.marketConfigList.length; i++) {
                  let beforeMarketConfigList = resp.data.before.marketConfigList
                  //   邀请好友送
                  if (beforeMarketConfigList[i].type == 'invite_friend') {
                    this.marketConfigList[3].code = beforeMarketConfigList[i].code
                    this.marketConfigList[3].giveStatus = String(beforeMarketConfigList[i].giveStatus)
                    this.marketConfigList[3].marketTimeEnabled = String(beforeMarketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[3].marketBeginTime = beforeMarketConfigList[i].marketBeginTime
                    this.marketConfigList[3].marketEndTime = beforeMarketConfigList[i].marketEndTime
                    this.marketConfigList[3].valueList[0].rechargeNumber = beforeMarketConfigList[i].valueList[0].rechargeNumber
                    this.marketConfigList[3].valueList[0].giveCouponNumber = beforeMarketConfigList[i].valueList[0].giveCouponNumber
                    if(this.marketConfigList[3].marketTimeEnabled=="1"){
                      this.invitadata = true;
                    }else{
                      this.invitadata = false;
                    }
                    if (beforeMarketConfigList[i].giveStatus == 1) {     
                      if (beforeMarketConfigList[i].marketTimeEnabled == 1) {
                        this.invitadata = true
                      }
                      this.invitasend = true
                    } else {
                      this.invitadata = false
                      this.invitasend = false
                    }
                  } else if (beforeMarketConfigList[i].type == 'normal_recharge') {//正常充值 
                    this.marketConfigList[2].code = beforeMarketConfigList[i].code
                    this.marketConfigList[2].marketTimeEnabled = String(beforeMarketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[2].giveStatus = String(beforeMarketConfigList[i].giveStatus)
                    this.marketConfigList[2].reduceStatus  = String(beforeMarketConfigList[i].reduceStatus )
                    this.marketConfigList[2].marketBeginTime = beforeMarketConfigList[i].marketBeginTime
                    this.marketConfigList[2].marketEndTime = beforeMarketConfigList[i].marketEndTime
                    for (let j = 0; j < beforeMarketConfigList[i].valueList.length; j++) {
                      beforeMarketConfigList[i].valueList[j].firstRecommendStatus = String(beforeMarketConfigList[i].valueList[j].firstRecommendStatus)
                      beforeMarketConfigList[i].valueList[j].recommendStatus = String(beforeMarketConfigList[i].valueList[j].recommendStatus)             
                    }

                    this.addnormals = beforeMarketConfigList[i].valueList
                    this.marketConfigList[2].valueList = this.addnormals
                    this.fruit = []
                    if (beforeMarketConfigList[i].giveStatus == 1) {
                      this.fruit.push ('1')
                      this.normaldelivery = true
                      // this.firstRecommendation = true
                      this.marketConfigList[2].giveStatus = '1'
                    } else {
                      this.normaldelivery = false
                      this.marketConfigList[2].giveStatus = '0'
                    }
                    if (beforeMarketConfigList[i].reduceStatus == 1) {
                      this.fruit.push ('0')
                      this.normaldreduce = true
                      // this.firstRecommendation = true
                      this.marketConfigList[2].reduceStatus = '1'
                    } else {
                      this.normaldreduce = false
                      this.marketConfigList[2].reduceStatus = '0'
                    }
                    if (beforeMarketConfigList[i].giveStatus == 1&&beforeMarketConfigList[i].reduceStatus == 1) {
                      this.normaldelivery = true
                      this.normaldreduce = true
                      // this.firstRecommendation = true
                      this.marketConfigList[2].reduceStatus = '1'
                      this.marketConfigList[2].giveStatus = '1'
                    }
                    if (beforeMarketConfigList[i].giveStatus != 1&&beforeMarketConfigList[i].reduceStatus != 1) {
                      this.normaldelivery = false
                      this.normaldreduce = false
                      // this.firstRecommendation = false
                      this.marketConfigList[2].reduceStatus = '0'
                      this.marketConfigList[2].giveStatus = '0'
                    }
                    if (beforeMarketConfigList[i].giveVipStatus == 1) {
                      this.fruit.push ('2')
                      this.senmembers = true
                      this.marketConfigList[2].giveVipStatus = '1'
                    } else {
                      this.senmembers = false
                      this.marketConfigList[2].giveVipStatus = '0'
                    }
                    if (beforeMarketConfigList[i].giveFirstRechargeStatus == 1) {
                      this.fruit.push ('3')
                      this.firstGive = true
                      this.marketConfigList[2].giveFirstRechargeStatus = '1'
                    } else {
                      this.firstGive = false
                      this.marketConfigList[2].giveFirstRechargeStatus = '0'
                    }
                    if (beforeMarketConfigList[i].giveCouponStatus == 1) {
                      this.fruit.push ('4')
                      this.deliverySsecurities = true
                      this.marketConfigList[2].giveCouponStatus = '1'
                    } else {
                      this.deliverySsecurities = false
                      this.marketConfigList[2].giveCouponStatus = '0'
                    }
                  } else if (beforeMarketConfigList[i].type == 'first_recharge') {//首次充值
                    this.marketConfigList[1].code = beforeMarketConfigList[i].code
                    this.marketConfigList[1].marketTimeEnabled = String(beforeMarketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[1].giveStatus = String(beforeMarketConfigList[i].giveStatus)
                    this.marketConfigList[1].marketBeginTime = beforeMarketConfigList[i].marketBeginTime
                    this.marketConfigList[1].marketEndTime = beforeMarketConfigList[i].marketEndTime
                    this.marketConfigList[1].valueList[0].rechargeNumber = beforeMarketConfigList[i].valueList[0].rechargeNumber
                    this.marketConfigList[1].valueList[0].giveNumber = beforeMarketConfigList[i].valueList[0].giveNumber
                  } else if (beforeMarketConfigList[i].type == 'register') {//注册充值
                    this.marketConfigList[0].code = beforeMarketConfigList[i].code
                    this.marketConfigList[0].marketTimeEnabled = String(beforeMarketConfigList[i].marketTimeEnabled)
                    this.marketConfigList[0].giveStatus = String(beforeMarketConfigList[i].giveStatus)
                    this.marketConfigList[0].marketBeginTime = beforeMarketConfigList[i].marketBeginTime
                    this.marketConfigList[0].marketEndTime = beforeMarketConfigList[i].marketEndTime
                    this.marketConfigList[0].valueList[0].rechargeNumber = beforeMarketConfigList[i].valueList[0].rechargeNumber
                    this.marketConfigList[0].valueList[0].giveCouponNumber = beforeMarketConfigList[i].valueList[0].giveCouponNumber
                  }
                }
                if (resp.data.after!=null) {
                // 修改后
                if (resp.data.after.marketConfigList.length > 0) {     
                  document.getElementsByClassName('examinetype')[0].setAttribute('disabled','disabled')
                  this.auditing = true
                  if (resp.data.after.recommendPicUrl != null) {
                    this.labelUrl2 = this.productlogo2 = resp.data.after.recommendPicUrl
                  } else {
                    this.labelUrl2 = require("../../image/moren.png")
                    this.productlogo2 = ''
                  }       
                  for (let i = 0; i < resp.data.after.marketConfigList.length; i++) {
                    let afterMarketConfigList = resp.data.after.marketConfigList
                  //   邀请好友送
                  if (afterMarketConfigList[i].type == 'invite_friend') {
                    this.updateMarketConfigList[3].code = afterMarketConfigList[i].code
                    this.updateMarketConfigList[3].giveStatus = String(afterMarketConfigList[i].giveStatus)
                    this.updateMarketConfigList[3].marketTimeEnabled = String(afterMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[3].marketBeginTime = afterMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[3].marketEndTime = afterMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[3].valueList[0].rechargeNumber = afterMarketConfigList[i].valueList[0].rechargeNumber
                    this.updateMarketConfigList[3].valueList[0].giveCouponNumber = afterMarketConfigList[i].valueList[0].giveCouponNumber
                    if(this.updateMarketConfigList[3].marketTimeEnabled=="1"){
                      this.invitadata1 = true;
                    }else{
                      this.invitadata1 = false;
                    }
                    if (afterMarketConfigList[i].giveStatus == 1) {     
                      if (afterMarketConfigList[i].marketTimeEnabled == 1) {
                        this.invitadata1 = true
                      }
                      this.invitasend1 = true
                    } else {
                      this.invitadata1 = false
                      this.invitasend1 = false
                    }
                  } else if (afterMarketConfigList[i].type == 'normal_recharge') {//正常充值
                    this.updateMarketConfigList[2].code = afterMarketConfigList[i].code
                    this.updateMarketConfigList[2].marketTimeEnabled = String(afterMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[2].giveStatus = String(afterMarketConfigList[i].giveStatus)
                    this.updateMarketConfigList[2].reduceStatus = String(afterMarketConfigList[i].reduceStatus)
                    this.updateMarketConfigList[2].marketBeginTime = afterMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[2].marketEndTime = afterMarketConfigList[i].marketEndTime
                    for (let j = 0; j < afterMarketConfigList[i].valueList.length; j++) {
                      afterMarketConfigList[i].valueList[j].firstRecommendStatus = String(afterMarketConfigList[i].valueList[j].firstRecommendStatus)
                      afterMarketConfigList[i].valueList[j].recommendStatus = String(afterMarketConfigList[i].valueList[j].recommendStatus)             
                    }
                    this.addnormals2 = afterMarketConfigList[i].valueList
                    this.updateMarketConfigList[2].valueList = this.addnormals2
                    this.fruit2 = []
                    if (afterMarketConfigList[i].giveStatus == 1) {
                      this.fruit2.push ('1')
                      this.normaldelivery2 = true
                      // this.firstRecommendation2 = true
                      this.marketConfigList[2].giveStatus = '1'
                    } else {
                      this.normaldelivery2 = false
                      this.marketConfigList[2].giveStatus = '0'
                    }
                    if (afterMarketConfigList[i].reduceStatus == 1) {
                      this.fruit2.push ('0')
                      this.normaldreduce2 = true
                      this.marketConfigList[2].reduceStatus = '1'
                      // this.firstRecommendation2 = true
                    } else {
                      this.normaldreduce2 = false
                      this.marketConfigList[2].reduceStatus = '0'
                    }
                    if (afterMarketConfigList[i].giveStatus == 1&&afterMarketConfigList[i].reduceStatus == 1) {
                      this.normaldelivery2 = true
                      this.normaldreduce2 = true
                      this.marketConfigList[2].reduceStatus = '1'
                      this.marketConfigList[2].giveStatus = '1'
                      // this.firstRecommendation2 = true
                    }
                    if (afterMarketConfigList[i].giveStatus != 1&&afterMarketConfigList[i].reduceStatus != 1) {
                      this.normaldelivery2 = false
                      this.normaldreduce2 = false
                      this.marketConfigList[2].reduceStatus = '0'
                      this.marketConfigList[2].giveStatus = '0'
                      // this.firstRecommendation2 = false
                    }
                    if (afterMarketConfigList[i].giveVipStatus == 1) {
                      this.fruit2.push ('2')
                      this.senmembers2 = true
                      this.marketConfigList[2].giveVipStatus = '1'
                    } else {
                      this.senmembers2 = false
                      this.marketConfigList[2].giveVipStatus = '0'
                    }
                    if (afterMarketConfigList[i].giveFirstRechargeStatus == 1) {
                      this.fruit2.push ('3')
                      this.firstGive2 = true
                      this.marketConfigList[2].giveFirstRechargeStatus = '1'
                    } else {
                      this.firstGive2 = false
                      this.marketConfigList[2].giveFirstRechargeStatus = '0'
                    }
                    if (afterMarketConfigList[i].giveCouponStatus == 1) {
                      this.fruit2.push ('4')
                      this.deliverySsecurities2 = true
                      this.marketConfigList[2].giveCouponStatus = '1'
                    } else {
                      this.deliverySsecurities2 = false
                      this.marketConfigList[2].giveCouponStatus = '0'
                    }
                    if(this.updateMarketConfigList[2].marketTimeEnabled=="1"){
                      this.normaldata1 = true;
                    }else{
                      this.normaldata1 = false;
                    }
                  } else if (afterMarketConfigList[i].type == 'first_recharge') {//首次充值
                    this.updateMarketConfigList[1].code = afterMarketConfigList[i].code
                    this.updateMarketConfigList[1].marketTimeEnabled = String(afterMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[1].giveStatus = String(afterMarketConfigList[i].giveStatus)
                    this.updateMarketConfigList[1].marketBeginTime = afterMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[1].marketEndTime = afterMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[1].valueList[0].rechargeNumber = afterMarketConfigList[i].valueList[0].rechargeNumber
                    this.updateMarketConfigList[1].valueList[0].giveNumber = afterMarketConfigList[i].valueList[0].giveNumber
                    if(this.updateMarketConfigList[1].marketTimeEnabled =="1"){
                      this.firstdelivery1 =true
                    }else{
                      this.firstdelivery1 =false
                    }
                    if (afterMarketConfigList[i].giveStatus == 1) {     
                      if (afterMarketConfigList[i].marketTimeEnabled == 1) {
                        this.firstdata1 = true
                      } else {
                        this.firstdata1 = false
                      }
                      this.firstdelivery1 = true
                    } else {
                      this.firstdelivery1 = false
                      this.firstdata1 = false
                    }

                  } else if (afterMarketConfigList[i].type == 'register') {//注册充值
                    this.updateMarketConfigList[0].code = afterMarketConfigList[i].code
                    this.updateMarketConfigList[0].marketTimeEnabled = String(afterMarketConfigList[i].marketTimeEnabled)
                    this.updateMarketConfigList[0].giveStatus = String(afterMarketConfigList[i].giveStatus)
                    this.updateMarketConfigList[0].marketBeginTime = afterMarketConfigList[i].marketBeginTime
                    this.updateMarketConfigList[0].marketEndTime = afterMarketConfigList[i].marketEndTime
                    this.updateMarketConfigList[0].valueList[0].rechargeNumber = afterMarketConfigList[i].valueList[0].rechargeNumber
                    this.updateMarketConfigList[0].valueList[0].giveCouponNumber = afterMarketConfigList[i].valueList[0].giveCouponNumber
                    if(this.updateMarketConfigList[0].marketTimeEnabled =="1"){
                      this.registertime1 = true
                      this.registergive1 = true
                    }else{
                      this.registertime1 = false
                      this.registergive1 = false
                    }
                    if (afterMarketConfigList[i].giveStatus == 1) {     
                      if (afterMarketConfigList[i].marketTimeEnabled == 1) {
                        this.registertime1 = true
                      }
                      this.registergive1 = true
                    } else {
                      this.registertime1 = false
                      this.registergive1 = false
                    }
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
      // 正常充值控制
      normalgive (val) {
        if (val.indexOf('0') !=-1) {//立减normaldreduce
          this.normaldreduce = true
          // this.firstRecommendation = true
          this.marketConfigList[2].reduceStatus = '1'
        } else {
          this.normaldreduce = false
          this.marketConfigList[2].reduceStatus = '0'
          for (let i = 0; i < this.addnormals.length; i++) {
            if (this.addnormals[i].reduceAmount == '') {
              this.addnormals[i].reduceAmount = '0'
            }            
          }
        }
        
        if (val.indexOf('1') !=-1) {//赠送
          this.normaldelivery = true
          // this.firstRecommendation = true
          this.marketConfigList[2].giveStatus = '1'
        }else {
          this.normaldelivery = false
          this.marketConfigList[2].giveStatus = '0'
          for (let i = 0; i < this.addnormals.length; i++) {
            if (this.addnormals[i].giveNumber == '') {
              this.addnormals[i].giveNumber = '0'
            }            
          }
        }
        if (val.indexOf('1') !=-1&&val.indexOf('0') !=-1) {
          this.normaldreduce = true
          this.normaldelivery = true
          // this.firstRecommendation = true
          this.marketConfigList[2].giveStatus = '1'
          this.marketConfigList[2].reduceStatus = '1'
        }
        if (val.indexOf('1') ==-1&&val.indexOf('0') ==-1) {
          this.normaldreduce = false
          this.normaldelivery = false
          // this.firstRecommendation = false
          this.marketConfigList[2].giveStatus = '0'
          this.marketConfigList[2].reduceStatus = '0'
        }
        if (val.indexOf('2') !=-1) {//送会员
          this.senmembers = true
          this.marketConfigList[2].giveVipStatus = '1'
        } else {
          this.senmembers = false
          this.marketConfigList[2].giveVipStatus = '0'
          for (let i = 0; i < this.addnormals.length; i++) {
            if (this.addnormals[i].giveVipDays == '') {
              this.addnormals[i].giveVipDays = '0'
            }            
          }
        }

        if (val.indexOf('3') !=-1) {//首充
          this.firstGive = true
          this.marketConfigList[2].giveFirstRechargeStatus = '1'
        } else {
          this.firstGive = false
          this.marketConfigList[2].giveFirstRechargeStatus = '0'
          for (let i = 0; i < this.addnormals.length; i++) {
            if (this.addnormals[i].firstGiveNumber == '') {
              this.addnormals[i].firstGiveNumber = '0'
            }
            if (this.addnormals[i].firstReduceAmount == '') {
              this.addnormals[i].firstReduceAmount = '0'
            } 
          }
        }

        if (val.indexOf('4') !=-1) {//抢单劵
          this.deliverySsecurities = true
          this.marketConfigList[2].giveCouponStatus = '1'
        } else {
          this.deliverySsecurities = false
          this.marketConfigList[2].giveCouponStatus = '0'
          for (let i = 0; i < this.addnormals.length; i++) {
            if (this.addnormals[i].giveCouponNumber == '') {
              this.addnormals[i].giveCouponNumber = '0'
            } 
          }
        }


        // if (val.length == 0) {
        //   this.normaldreduce = false
        //   this.normaldelivery = false
        //   this.marketConfigList[2].status = '0'
        //   this.marketConfigList[2].status2 = '0'
        // } else if (val.length == 1) {
        //   if (val[0] == '1') {
        //     this.normaldelivery = true
        //     this.normaldreduce = false
        //     this.marketConfigList[2].status = '1'
        //     this.marketConfigList[2].status2 = '0'
        //   } else {
        //     this.normaldreduce = true
        //     this.normaldelivery = false
        //     this.marketConfigList[2].status = '0'
        //     this.marketConfigList[2].status2 = '1'
        //   }          
        // } else {
        //   this.normaldelivery = true
        //   this.normaldreduce = true
        //   this.marketConfigList[2].status = '1'
        //   this.marketConfigList[2].status2 = '1'
        // }
      },
      // 图片上传
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
              this.labelUrl = resp.data;
              this.productlogo = resp.data;
            } else {
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        return false;
      }
    },
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
      addnormal () {
        this.index2++
        this.addnormals.push({
          rechargeNumber: '',
          giveNumber: '0',
          rechargeAmount: '',
          reduceAmount: '0',
          firstRecommendStatus:'0',//首充推荐
          firstGiveNumber:'0',//首充送
          firstReduceAmount:'0',//首充立减
          recommendStatus:'0',//复充推荐
          giveVipDays:'0',//赠送天数
          giveCouponNumber:'0',//赠送优惠券
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
          if (this.productlogo == '') {
            this.$Modal.warning({
                  title: '提示',
                  content: '<p>请上传图片</p>'
                })
                this.loading3 = false
                return false
          }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
            let list = {
                marketConfigList: [],
                recommendPicUrl :this.productlogo
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
        item.rechargeAmount = item.rechargeNumber
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
    width: 1350px;
    // margin-left: 100px
  }
  .iconlabelUrl,.iconlabelUrl2 {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
}
.contentcss{
  overflow-x: scroll
}
</style>
