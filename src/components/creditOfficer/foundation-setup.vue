<template>
<div style="min-width:1070px">
    <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;充值设置</span>
        </p>
      </div>
      <div class="contentcss">
        <!-- 修改前 -->
        <div >
          <div class=" firstCharge">
            <ul>
              <li v-if="titleTips">
                <span class="blue1">审核前数据:</span>
              </li>
              <li v-if="titleshow!=1">
                <span class=" lh32 displayib w180 tr">标题:</span>
                <Input :disabled="auditing" maxlength=50 v-model="titles" placeholder="请输入标题" style="width: 300px" />
              </li>
              <li class="clearfix mt15" v-if="titleshow!=1">
                <span class="left lh32 displayib w180 tr">选择省份:</span>
                <div class="left clearfix" >
                  <Button :disabled="auditing" type="primary" class="left" @click="allElection">{{election}}</Button>
                  <CheckboxGroup v-model="fruit" @on-change="checkange" class="left ml20" style="width:700px">
                    <Checkbox :disabled="auditing" v-for="item in provincelist" :label="item.label">{{item.value}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </li>
              <li class="clearfix mt15">
                <span class="left lh32 displayib w180 tr">开启首充充值活动:</span>
                <Select :disabled="auditing" v-model="giveStatus" style="width:80px"  class="left ml5" @on-change="admissionsucc">
                  <Option  v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </li>
            </ul>            
          </div>

          <div class="gearPosition mt15">
              <h3>充值档位设置:</h3>
              <ul class="mt15">
                  <li class="clearfix">
                      <span class="left lh32 displayib w180 tr">充值活动时间:</span>
                      <Select :disabled="auditing" v-model="marketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ml5">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="normaldata">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time1" :value="marketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left lh32 utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time2" :value="marketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                  </li>
                  <li class="clearfix mt15">
                      <span class="left displayib w180 tr">充值档位推荐图标设置:</span>
                      <Upload
                      action=""
                      class="upstyle"
                      :before-upload="handleUploadicon"
                      :show-upload-list="false"
                      :disabled="auditing"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError1">
                      <img class="iconlabelUrl left" :src="labelUrl" alt="">
                      <Input v-model="productlogo" disabled style="width: 120px" class="left ml5 hidden"></Input>   
                      </Upload>
                  </li>
                  <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">充值档位:</span>
                      <div class="left ">   
                      <div
                        v-for="(item, index) in addnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" @on-change="rechargemoney(item)" v-model="item.rechargeNumber" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left mb5 inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveNumber" class="left ml10 mb5 inputnum"  style="width:120px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input> -->
                        <Input :disabled="auditing" type="text" v-model="item.reduceAmount" class="left mb5 ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveVipDays" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天会员</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">抢单劵</span>
                        </Input> -->
                        <RadioGroup class="left ml10 lh32"  @on-change="recommend(index,'addnormals')" v-model="item.recommendStatus">
                          <Radio :disabled="auditing" label="1">推荐</Radio>          
                        </RadioGroup>
                        <!-- <Radio  :disabled="auditing" class="left lh32 ml10" v-model="item.single">推荐</Radio> -->
                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal(1)">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index,1)">-</Button>
                      </div>
                      </div>
                  </li>
              </ul>
          </div>

          <div v-if="firstRecharge" class=" mt15">
              <h3>首次充值档位设置:</h3>
              <ul class="mt15">
                  <li class="clearfix">
                      <span class="left lh32 displayib w180 tr">首次充值活动时间:</span>
                      <Select :disabled="auditing" v-model="firstmarketTimeEnabled" style="width:100px;" @on-change="firstnormaltime" class="left ml5">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="firstmarketTimeEnabled== '1'">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time3" :value="firstmarketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left lh32 utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time4" :value="firstmarketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                  </li>
                  <li class="clearfix mt15">
                      <span class="left displayib w180 tr">首次充值档位推荐图标设置:</span>
                      <Upload
                      action=""
                      class="upstyle"
                      :before-upload="firsthandleUploadicon"
                      :show-upload-list="false"
                      :disabled="auditing"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError1">
                      <img  class="iconlabelUrl left" :src="firstlabelUrl" alt="">
                      <Input v-model="firstproductlogo" disabled style="width: 120px" class="left ml5 hidden"></Input>   
                      </Upload>
                  </li>
                  <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">首次充值档位:</span>
                      <div class="left ">   
                      <div
                        v-for="(item, index) in firstaddnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" @on-change="firstrechargemoney(item)" v-model="item.rechargeNumber" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left mb5 inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveNumber" class="left ml10 mb5 inputnum"  style="width:120px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input> -->
                        <Input :disabled="auditing" type="text" v-model="item.reduceAmount"  class="left mb5 ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveVipDays" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天会员</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">抢单劵</span>
                        </Input> -->
                        <RadioGroup class="left ml10 lh32"  @on-change="recommend(index,'firstaddnormals')" v-model="item.recommendStatus">
                          <Radio :disabled="auditing" label="1">推荐</Radio>          
                        </RadioGroup>
                        <!-- <Checkbox :disabled="auditing" class="left lh32 ml10" v-model="item.single">推荐</Checkbox> -->
                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal(2)">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index,2)">-</Button>
                      </div>
                      </div>
                  </li>
              </ul>
          </div>
          </div>
          <!-- 修改后 -->
          <div v-if="titleTips" class="mt20">
            <div class=" firstCharge">
            <ul>
              <li v-if="titleTips">
                <span class="blue1">审核后数据:</span>
              </li>
              <li v-if="titleshow!=1">
                <span class=" lh32 displayib w180 tr">标题:</span>
                <Input :disabled="auditing" v-model="aftertitles" placeholder="请输入标题" style="width: 300px" />
              </li>
              <li class="clearfix mt15" v-if="titleshow!=1">
                <span class="left lh32 displayib w180 tr">选择省份:</span>
                <div class="left clearfix" >
                  <Button :disabled="auditing" type="primary" class="left" @click="allElection">{{election}}</Button>
                  <CheckboxGroup v-model="afterfruit" @on-change="checkange" class="left ml20" style="width:700px">
                    <Checkbox :disabled="auditing" v-for="item in provincelist" :label="item.label">{{item.value}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </li>
              <li class="clearfix mt15">
                <span class="left lh32 displayib w180 tr">开启首充充值活动:</span>
                <Select :disabled="auditing" v-model="aftergiveStatus" style="width:80px"  class="left ml5" @on-change="admissionsucc">
                  <Option  v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </li>
            </ul>            
          </div>

          <div class="gearPosition mt15">
              <h3>充值档位设置:</h3>
              <ul class="mt15">
                  <li class="clearfix">
                      <span class="left lh32 displayib w180 tr">充值活动时间:</span>
                      <Select :disabled="auditing" v-model="aftermarketTimeEnabled" style="width:100px;" @on-change="normaltime" class="left ml5">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="aftermarketTimeEnabled=='1'">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time1" :value="aftermarketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left lh32 utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time2" :value="aftermarketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                  </li>
                  <li class="clearfix mt15">
                      <span class="left displayib w180 tr">充值档位推荐图标设置:</span>
                      <Upload
                      action=""
                      class="upstyle"
                      :before-upload="handleUploadicon"
                      :show-upload-list="false"
                      :disabled="auditing"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError1">
                      <img class="iconlabelUrl left" :src="afterlabelUrl" alt="">
                      <Input v-model="afterproductlogo" disabled style="width: 120px" class="left ml5 hidden"></Input>   
                      </Upload>
                  </li>
                  <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">充值档位:</span>
                      <div class="left">   
                      <div
                        v-for="(item, index) in afteraddnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" @on-change="rechargemoney(item)" v-model="item.rechargeNumber" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left mb5 inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveNumber" class="left ml10 mb5 inputnum"  style="width:120px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input> -->
                        <Input :disabled="auditing" type="text" v-model="item.reduceAmount" class="left mb5 ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveVipDays" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天会员</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">抢单劵</span>
                        </Input> -->
                        <RadioGroup class="left ml10 lh32"  @on-change="recommend(index,'afteraddnormals')" v-model="item.recommendStatus">
                          <Radio :disabled="auditing" label="1">推荐</Radio>          
                        </RadioGroup>
                        <!-- <Checkbox :disabled="auditing" class="left lh32 ml10" v-model="item.single">推荐</Checkbox> -->
                        <!-- 三期结束 -->
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index==0" @click="addnormal(1)">+</Button>
                        <Button :disabled="auditing" type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index,1)">-</Button>
                      </div>
                      </div>
                  </li>
              </ul>
          </div>

          <div v-if="aftergiveStatus=='1'" class=" mt15">
              <h3>首次充值档位设置:</h3>
              <ul class="mt15">
                  <li class="clearfix">
                      <span class="left lh32 displayib w180 tr">首次充值活动时间:</span>
                      <Select :disabled="auditing" v-model="afterfirstmarketTimeEnabled" style="width:100px;" @on-change="firstnormaltime" class="left ml5">
                        <Option v-for="item in ranges3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <div v-if="afterfirstmarketTimeEnabled== '1'">
                        <DatePicker :disabled="auditing" type="datetime" class="left ml10" @on-change="time3" :value="afterfirstmarketBeginTime" :options="options3" confirm placeholder="开始时间" style="width: 160px"></DatePicker>
                        <span class="left lh32 utmost">至</span>
                        <DatePicker :disabled="auditing" type="datetime" class="left " @on-change="time4" :value="afterfirstmarketEndTime" :options="options3" confirm placeholder="结束时间" style="width: 160px"></DatePicker>
                      </div>
                  </li>
                  <li class="clearfix mt15">
                      <span class="left displayib w180 tr">首次充值档位推荐图标设置:</span>
                      <Upload
                      action=""
                      class="upstyle"
                      :before-upload="firsthandleUploadicon"
                      :show-upload-list="false"
                      :disabled="auditing"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError1">
                      <img  class="iconlabelUrl left" :src="afterfirstlabelUrl" alt="">
                      <Input v-model="afterfirstproductlogo" disabled style="width: 120px" class="left ml5 hidden"></Input>   
                      </Upload>
                  </li>
                  <li class="clearfix mt15 credit_recharge">
                      <span class="left lh32 displayib w180 tr">首次充值档位:</span>
                      <div class="left">   
                      <div
                        v-for="(item, index) in afterfirstaddnormals"
                        :key="index"
                        class="mb15  clearfix"
                      >
                        <Input :disabled="auditing" type="text" @on-change="firstrechargemoney(item)" v-model="item.rechargeNumber" class="left ml10 mb5 inputnum"  style="width:160px">
                        <span slot="prepend">充</span>
                        <span slot="append" class="left">支付人民币</span>
                        </Input>
                        <Input disabled type="text" v-model="item.rechargeAmount" class="left mb5 inputnum"  style="width:80px">
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveNumber" class="left ml10 mb5 inputnum"  style="width:120px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">赞豆</span>
                        </Input> -->
                        <Input :disabled="auditing" type="text" v-model="item.reduceAmount"  class="left mb5 ml10 inputnum"  style="width:120px">
                        <span slot="prepend">立减</span>
                        <span slot="append" class="left">元</span>
                        </Input>
                        <!-- <Input :disabled="auditing" type="text" v-model="item.giveVipDays" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">天会员</span>
                        </Input>
                        <Input :disabled="auditing" type="text" v-model="item.giveCouponNumber" class="left mb5 ml10 inputnum"  style="width:130px">
                        <span slot="prepend">送</span>
                        <span slot="append" class="left">抢单劵</span>
                        </Input> -->
                        <RadioGroup class="left ml10 lh32"  @on-change="recommend(index,'afterfirstaddnormals')" v-model="item.recommendStatus">
                          <Radio :disabled="auditing" label="1">推荐</Radio>          
                        </RadioGroup>
                        <!-- <Checkbox :disabled="auditing" class="left lh32 ml10" v-model="item.single">推荐</Checkbox> -->
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
              <Button type="ghost" @click="handleRender3">查看操作日志</Button>
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
                    <Option  value="pass" >审核通过</Option>
                    <Option  value="reject" >审核驳回</Option>
                  </Select>    
                </FormItem>
                <FormItem label="备注:" prop="remarks" v-if="memos">
                  <Input v-model="formCustomexa.remarks" maxlength='50' type="textarea" :rows="4" placeholder="请输入备注" />    
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
            giveStatus:'0',//开启首充充值活动
            marketTimeEnabled:'0',//充值活动时间按钮
            firstmarketTimeEnabled:'0',//首次充值活动时间按钮
            normaldata:false,//充值时间显示隐藏
            firstnormaldata:false,//首次充值时间显示隐藏
            marketBeginTime:'',//充值开始时间
            marketEndTime:'',//充值结束时间
            firstmarketBeginTime:'',//首次充值开始时间
            firstmarketEndTime:'',//首次充值结束时间
            labelUrl:require("../../image/moren.png"),//图片默认地址
            productlogo:'',
            firstlabelUrl:require("../../image/moren.png"),//首次图片默认地址
            firstproductlogo:'',
            // 修改后
            aftertitles:'',//标题
            afterfruit:[],//省份
            aftergiveStatus:'0',//开启首充充值活动
            aftermarketTimeEnabled:'0',//充值活动时间按钮
            afterfirstmarketTimeEnabled:'0',//首次充值活动时间按钮
            afternormaldata:false,//充值时间显示隐藏
            afterfirstnormaldata:false,//首次充值时间显示隐藏
            aftermarketBeginTime:'',//充值开始时间
            aftermarketEndTime:'',//充值结束时间
            afterfirstmarketBeginTime:'',//首次充值开始时间
            afterfirstmarketEndTime:'',//首次充值结束时间
            afterlabelUrl:require("../../image/moren.png"),//图片默认地址
            afterproductlogo:'',
            afterfirstlabelUrl:require("../../image/moren.png"),//首次图片默认地址
            afterfirstproductlogo:'',
            index2: 1,
            index3:1,
            firstRecharge:false,
            auditing:false,
            titleshow:'',
            provincelist:[],
            provincecode:[],
            election:'全选',
            loading3:false,
            loading:true,
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
            // 充值档位
            addnormals: [
                {
                    rechargeNumber : '0',//充多少
                    rechargeAmount : '0',//支付多少元
                    // giveNumber : '0',//送赞豆
                    reduceAmount: '0',//立减
                    // giveVipDays:'0',//送会员
                    // giveCouponNumber:'0',//赠送优惠券
                    recommendStatus:'0',//推荐
                    valueType :1
                }
            ],
            // 充值档位
            firstaddnormals: [
                {
                    rechargeNumber : '0',//充多少
                    rechargeAmount : '0',//支付多少元
                    // giveNumber : '0',//送赞豆
                    reduceAmount: '0',//立减
                    // giveVipDays:'0',//送会员
                    // giveCouponNumber:'0',//赠送优惠券
                    recommendStatus:'0',//推荐
                    valueType :2
                }
            ],
            // 修改后充值档位
            afteraddnormals: [
                {
                    rechargeNumber : '0',//充多少
                    rechargeAmount : '0',//支付多少元
                    // giveNumber : '0',//送赞豆
                    reduceAmount: '0',//立减
                    // giveVipDays:'0',//送会员
                    // giveCouponNumber:'0',//赠送优惠券
                    recommendStatus:'0',//推荐
                    valueType :1
                }
            ],
            // 修改后首充充值档位
            afterfirstaddnormals: [
                {
                    rechargeNumber : '0',//充多少
                    rechargeAmount : '0',//支付多少元
                    // giveNumber : '0',//送赞豆
                    reduceAmount: '0',//立减
                    // giveVipDays:'0',//送会员
                    // giveCouponNumber:'0',//赠送优惠券
                    recommendStatus:'0',//推荐
                    valueType :2
                }
            ],
        }
    },
    methods: {
      // 推荐
    recommend(index,list){
      let numlist
      if (list == 'addnormals') {
        numlist = this.addnormals
      } else if(list == 'firstaddnormals') {
        numlist = this.firstaddnormals
      } else if(list == 'afteraddnormals') {
        numlist = this.afteraddnormals
      } else if(list == 'afterfirstaddnormals') {
        numlist = this.afterfirstaddnormals
      }
      numlist.forEach((v,i)=>{
        if(index == i) {
          v.recommendStatus = "1"
        } else {
          v.recommendStatus = "0"
        }
      })
    },
      time1 (value, data) {
        this.marketBeginTime = value
      },
      time2 (value, data) {
        this.marketEndTime = value
      },
      time3 (value, data) {
        this.firstmarketBeginTime = value
      },
      time4 (value, data) {
        this.firstmarketEndTime = value
      },
        // 开启首充充值活动
      admissionsucc (val) {
        if (val == 1) {
          this.firstRecharge = true
        } else {
          this.firstRecharge = false
        }
      },
    //   充值活动时间
      normaltime (val) {
        if (val == 0) {
          this.normaldata = false
        } else {
          this.normaldata = true
        }
      },
      //首次充值活动时间
      firstnormaltime (val) {
        if (val == 0) {
          this.firstnormaldata = false
        } else {
          this.firstnormaldata = true
        }
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
        // 图片上传
    firsthandleUploadicon(file) {
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
              this.firstlabelUrl = resp.data;
              this.firstproductlogo = resp.data;
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
    // 充值档位添加
    addnormal (num) {
      if (num == 1) {
        this.index2++
        this.addnormals.push({
          rechargeNumber : '',//充多少
          rechargeAmount : '',//支付多少元
          // giveNumber : '',//送赞豆
          reduceAmount: '',//立减
          // giveVipDays:'',//送会员
          // giveCouponNumber:'',//赠送优惠券
          recommendStatus:'0',//推荐
          valueType :1
        })
      } else {
        this.index3++
        this.firstaddnormals.push({
          rechargeNumber : '',//充多少
          rechargeAmount : '',//支付多少元
          // giveNumber : '',//送赞豆
          reduceAmount: '',//立减
          // giveVipDays:'',//送会员
          // giveCouponNumber:'',//赠送优惠券
          recommendStatus:'0',//推荐
          valueType :2
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
        let reg = /^\d+$/
        if (this.titleshow!=1) {
          if (this.titles == '') {
            this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请输入标题</p>'
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
        }
        let timestamp = new Date().getTime()
        let marketBeginTime = Date.parse(new Date(this.marketBeginTime))
        let marketEndTime = Date.parse(new Date(this.marketEndTime))
        let firstmarketBeginTime = Date.parse(new Date(this.firstmarketBeginTime))
        let firstmarketEndTime = Date.parse(new Date(this.firstmarketEndTime))
        let datetimell = Date.parse(new Date())
        let date1 = Date.parse(new Date(this.marketBeginTime))/1000
        let date2 = Date.parse(new Date(this.marketEndTime))/1000
        let date3 = Date.parse(new Date(this.firstmarketBeginTime))/1000
        let date4 = Date.parse(new Date(this.firstmarketEndTime))/1000
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
        if (this.giveStatus=='1'&&this.firstmarketTimeEnabled== '1') {
            if ((this.firstmarketBeginTime==''||this.firstmarketEndTime=='')||(this.firstmarketBeginTime==null||this.firstmarketEndTime==null)) {
            this.loading3 = false
            this.$Modal.warning({
              title: '首次充值活动时间',
              content: '<p>请选择首次充值活动时间</p>'
            })
            return false
          }
          if (date3 >= date4) {
            this.loading3 = false
            this.$Modal.warning({
              title: '首次充值活动时间',
              content: '<p>开始时间必须小于结束时间</p>'
            })
            return false
          }
          if ((this.firstmarketBeginTime!=''&&this.firstmarketEndTime!='')||(this.firstmarketBeginTime!=null&&this.firstmarketEndTime!=null)) {
          if (firstmarketBeginTime <= datetimell&&this.firstmarketTimeEnabled == '1'&&this.giveStatus=='1') {
          this.loading3 = false
          this.$Modal.warning({
                title: '首充充值活动开始时间',
                content: '<p>首次充值活动开始时间不能小于当前时间</p>'
              })
              return false
        }
        if (firstmarketEndTime <= datetimell&&this.firstmarketTimeEnabled == '1'&&this.giveStatus=='1') {
          this.loading3 = false
          this.$Modal.warning({
                title: '首次充值活动结束时间',
                content: '<p>首次充值活动结束时间不能小于当前时间</p>'
              })
              return false
        }
        }
        
          }
          if (this.giveStatus=='1') {
            if (this.firstproductlogo == '') {
          this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请先上传首次充值挡位推荐图标</p>'
            })
            return false
        }
          }
        if (this.productlogo == '') {
          this.loading3 = false
            this.$Modal.warning({
              title: '温馨提示',
              content: '<p>请先上传充值挡位推荐图标</p>'
            })
            return false
        }
        let addnormalslist = []
        for (let i = 0; i < this.addnormals.length; i++) {
          for (let x in this.addnormals[i]) {
              if (!reg.test(this.addnormals[i][x])) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>请输入整数</p>'
                })
                this.loading3 = false
                return false
              }
              if (this.addnormals[i][x]>99999&&x!='rechargeValueCode') {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>请输入0-99999之间的正整数</p>'
                })
                this.loading3 = false
                return false
              }
            }
            addnormalslist.push(this.addnormals[i].recommendStatus)
        }
        if (addnormalslist.indexOf('1')==-1) {
          this.$Modal.warning({
                  title: '提示',
                  content: '<p>至少推荐一个充值档位</p>'
                })
                this.loading3 = false
                return false
        }
        if (this.giveStatus == '1') {
          let firstaddnormalslist = []
          for (let i = 0; i < this.firstaddnormals.length; i++) {
          for (let x in this.firstaddnormals[i]) {
              if (!reg.test(this.firstaddnormals[i][x])) {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>请输入整数</p>'
                })
                this.loading3 = false
                return false
              }
              if (this.firstaddnormals[i][x]>99999&&x!='rechargeValueCode') {
                this.$Modal.warning({
                  title: '提示',
                  content: '<p>请输入0-99999之间的正整数</p>'
                })
                this.loading3 = false
                return false
              }             
            }
            firstaddnormalslist.push(this.firstaddnormals[i].recommendStatus)           
        }
        if (firstaddnormalslist.indexOf('1')==-1) {
              this.$Modal.warning({
                      title: '提示',
                      content: '<p>至少推荐一个充值档位</p>'
                    })
                    this.loading3 = false
                    return false
            }
          
        }
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
            let valueList
            if (this.giveStatus == '1') {
              valueList = this.addnormals.concat(this.firstaddnormals)
            } else {
              valueList = this.addnormals
            }         
            let list = {
                areaList:this.fruit,//省份合集
                confName :this.titles,//标题
                firstRechargeStatus :this.giveStatus,//首充开关
                ignoreWarn :this.ignoreWarn,//是否忽略已配置的省
                activityTimeEnabled :this.marketTimeEnabled,//充值活动时间是否启用
                activityBeginTime :this.marketBeginTime,//充值活动开始时间
                activityEndTime :this.marketEndTime,//充值活动结束时间
                recommendIcon :this.productlogo,//图标
                valueList :valueList,//充值挡位集合
                firstRecommendIcon :this.firstproductlogo,//首充图标
                firstActivityTimeEnabled:this.firstmarketTimeEnabled,//首充时间开关
                firstActivityBeginTime:this.firstmarketBeginTime,//首充开始时间
                firstActivityEndTime :this.firstmarketEndTime//首充结束时间
            }
            let url = '/loan/rechargeConf/save'
            if (this.$route.query.num == 2) {
              list.rechargeConfCode = this.$route.query.rechargeConfCode
              url = '/loan/rechargeConf/updateByCode'
            }      
            this.http.post(BASE_URL + url, list)
              .then((resp) => {
                if (resp.code == 'success') {
                  this.modal3 = true
                  // this.$Modal.success({
                  //   title: '提示',
                  //   content: '<p>设置成功</p>',
                  //   onOk: () => {
                  //       this.$router.push({path:'/rechargeList'})
                  //   },
                  // })
                  this.loading3 = false
                  // this.inquireabout ()
                } else {
                  this.loading3 = false
                  if (resp.code == 'areaWarn') {
                    this.modal2 = true
                    this.messages = resp.message
                  //   this.$Modal.warning({
                  //   title: '提示',
                  //   content: '<p>'+resp.message+'是否要忽略？</p>',
                  //   onOk: () => {
                  //       this.ignoreWarn = 1
                  //   },
                  // })
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
                auditRemark : this.formCustomexa.remarks,
                configAuditCode:this.$route.query.configAuditCode
            }
            this.http.post(BASE_URL + '/loan/rechargeConf/audit', data)
            .then(data=>{
                if (data.code == 'success') {
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                          this.$router.push({path:'/operate'})
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
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/rechargeConf/audit']).then(data=>{
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
        this.$router.push({ path: './operationLog?operationType=recharge_config_edit' })
      },
      // 数据初始化
      inquireabout () {
        this.http.post(BASE_URL + '/loan/rechargeConf/getByCode?rechargeConfCode='+this.$route.query.rechargeConfCode)
        .then((resp) => {
          if (resp.code == 'success') {
            this.titleshow = resp.data.defConfStatus//是否是基础设置
            this.titles = resp.data.confName//标题
            this.fruit = resp.data.areaList//省份
            this.giveStatus = String(resp.data.firstRechargeStatus)//是否开启首充
            this.marketTimeEnabled = String(resp.data.activityTimeEnabled)//充值活动时间开关
            this.marketBeginTime = resp.data.activityBeginTime //充值活动开始时间
            this.marketEndTime = resp.data.activityEndTime //充值活动结束时间
            if (resp.data.recommendIcon!='') {
              this.productlogo = this.labelUrl = resp.data.recommendIcon//推荐角标
            }           
            let addnormals = []
            let firstaddnormals = []
            let indexoflist = []
            for (let i = 0; i < resp.data.valueList.length; i++) {
              indexoflist.push(resp.data.valueList[i].valueType)
              resp.data.valueList[i].recommendStatus = String(resp.data.valueList[i].recommendStatus)
              if (resp.data.valueList[i].valueType == 1) {
                addnormals.push(resp.data.valueList[i])
                // firstaddnormals = this.firstaddnormals
              } else {
                // addnormals = this.addnormals
                firstaddnormals.push(resp.data.valueList[i])
              }
            }
            if (indexoflist.indexOf(1)==-1) {
              addnormals = this.addnormals
            } else if (indexoflist.indexOf(2)==-1) {
              firstaddnormals = this.firstaddnormals
            }
            if (resp.data.valueList.length>0) {
              this.addnormals = addnormals//充值档位list
              this.firstaddnormals = firstaddnormals//首充档位list
            }
            this.firstmarketTimeEnabled = String(resp.data.firstActivityTimeEnabled) //首次充值活动时间是否启用
            this.firstmarketBeginTime = resp.data.firstActivityBeginTime //首充开始时间
            this.firstmarketEndTime = resp.data.firstActivityEndTime//首充结束时间
            if (resp.data.firstRecommendIcon!=''&&resp.data.firstRechargeStatus==1) {
              this.firstproductlogo = this.firstlabelUrl = resp.data.firstRecommendIcon //首充角标
            }
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      },
      // 审核数据查询
      auditData () {
        this.http.post(BASE_URL + '/loan/rechargeConf/auditData?configAuditCode='+this.$route.query.configAuditCode)
        .then((resp) => {
          if (resp.code == 'success') {
            // 审核前
            if (resp.data.before!=null) {
              if (resp.data.before.confName == '基础充值档位') {
                this.titleshow = 1
              }
              this.titleTips = true     
            this.titles = resp.data.before.confName//标题
            this.fruit = resp.data.before.areaList//省份
            this.giveStatus = String(resp.data.before.firstRechargeStatus)//是否开启首充
            this.marketTimeEnabled = String(resp.data.before.activityTimeEnabled)//充值活动时间开关
            this.marketBeginTime = resp.data.before.activityBeginTime //充值活动开始时间
            this.marketEndTime = resp.data.before.activityEndTime //充值活动结束时间
            if (resp.data.before.recommendIcon!='') {
              this.productlogo = this.labelUrl = resp.data.before.recommendIcon//推荐角标
            }     
            let addnormals = []
            let firstaddnormals = []
            for (let i = 0; i < resp.data.before.valueList.length; i++) {
              resp.data.before.valueList[i].recommendStatus = String(resp.data.before.valueList[i].recommendStatus)
              if (resp.data.before.valueList[i].valueType == 1) {
                addnormals.push(resp.data.before.valueList[i])
              } else {
                firstaddnormals.push(resp.data.before.valueList[i])
              }
            }
            if (resp.data.before.valueList.length>0) {
              this.addnormals = addnormals//充值档位list
              this.firstaddnormals = firstaddnormals//首充档位list
            }
            
            this.firstmarketTimeEnabled = String(resp.data.before.firstActivityTimeEnabled) //首次充值活动时间是否启用
            this.firstmarketBeginTime = resp.data.before.firstActivityBeginTime //首充开始时间
            this.firstmarketEndTime = resp.data.before.firstActivityEndTime//首充结束时间
            if (resp.data.before.firstRecommendIcon!='') {
              this.firstproductlogo = this.firstlabelUrl = resp.data.before.firstRecommendIcon //首充角标
            }         
            } else {
                if (resp.data.after.confName == '基础充值档位') {
                  this.titleshow = 1
                }
                this.titles = resp.data.after.confName//标题
                this.fruit = resp.data.after.areaList//省份
                this.giveStatus = String(resp.data.after.firstRechargeStatus)//是否开启首充
                this.marketTimeEnabled = String(resp.data.after.activityTimeEnabled)//充值活动时间开关
                this.marketBeginTime = resp.data.after.activityBeginTime //充值活动开始时间
                this.marketEndTime = resp.data.after.activityEndTime //充值活动结束时间
                if (resp.data.after.recommendIcon!='') {
                  this.productlogo = this.labelUrl = resp.data.after.recommendIcon//推荐角标
                }               
                let addnormals = []
                let firstaddnormals = []
                for (let i = 0; i < resp.data.after.valueList.length; i++) {
                  resp.data.after.valueList[i].recommendStatus = String(resp.data.after.valueList[i].recommendStatus)
                  if (resp.data.after.valueList[i].valueType == 1) {
                    addnormals.push(resp.data.after.valueList[i])
                  } else {
                    firstaddnormals.push(resp.data.after.valueList[i])
                  }
                }
                if (resp.data.after.valueList.length>0) {
                  this.addnormals = addnormals//充值档位list
                  this.firstaddnormals = firstaddnormals//首充档位list
                }               
                this.firstmarketTimeEnabled = String(resp.data.after.firstActivityTimeEnabled) //首次充值活动时间是否启用
                this.firstmarketBeginTime = resp.data.after.firstActivityBeginTime //首充开始时间
                this.firstmarketEndTime = resp.data.after.firstActivityEndTime//首充结束时间
                if (resp.data.after.firstRecommendIcon!='') {
                  this.firstproductlogo = this.firstlabelUrl = resp.data.after.firstRecommendIcon //首充角标
                }               
                }
            // 审核后
            if (resp.data.after!=null) {
              // this.titleTips = true   
              if (resp.data.after.confName == '基础充值档位') {
                this.titleshow = 1
              }       
                this.aftertitles = resp.data.after.confName//标题
                this.afterfruit = resp.data.after.areaList//省份
                this.aftergiveStatus = String(resp.data.after.firstRechargeStatus)//是否开启首充
                this.aftermarketTimeEnabled = String(resp.data.after.activityTimeEnabled)//充值活动时间开关
                this.aftermarketBeginTime = resp.data.after.activityBeginTime //充值活动开始时间
                this.aftermarketEndTime = resp.data.after.activityEndTime //充值活动结束时间
                if (resp.data.after.recommendIcon!='') {
                  this.afterproductlogo = this.afterlabelUrl = resp.data.after.recommendIcon//推荐角标
                }           
                let addnormals = []
                let firstaddnormals = []
                for (let i = 0; i < resp.data.after.valueList.length; i++) {
                  resp.data.after.valueList[i].recommendStatus = String(resp.data.after.valueList[i].recommendStatus)
                  if (resp.data.after.valueList[i].valueType == 1) {
                    addnormals.push(resp.data.after.valueList[i])
                  } else {
                    firstaddnormals.push(resp.data.after.valueList[i])
                  }
                }
                if (resp.data.after.valueList.length>0) {
                  this.afteraddnormals = addnormals//充值档位list
                  this.afterfirstaddnormals = firstaddnormals//首充档位list
                }             
                this.afterfirstmarketTimeEnabled = String(resp.data.after.firstActivityTimeEnabled) //首次充值活动时间是否启用
                this.afterfirstmarketBeginTime = resp.data.after.firstActivityBeginTime //首充开始时间
                this.afterfirstmarketEndTime = resp.data.after.firstActivityEndTime//首充结束时间
                if (resp.data.after.firstRecommendIcon!='') {
                  this.afterfirstproductlogo = this.afterfirstlabelUrl = resp.data.after.firstRecommendIcon //首充角标
                }               
            }      
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })

      },
      // 修改审核保存
      revisionAudit () {


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
          if (v == 'pass') {
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
      rechargemoney (item) {
        item.rechargeAmount = item.rechargeNumber
      },
      firstrechargemoney (item) {
        item.rechargeAmount = item.rechargeNumber
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
        this.$router.push({path:'/rechargeList'})
      }


    },
    mounted () {
      this.province ()
      if (this.$route.query.num == 1) {
        this.auditing = true
        this.inquireabout ()
      }
      if (this.$route.query.num == 2) {
        this.auditing = false
        this.inquireabout ()
      }
      if (this.$route.query.configAuditCode) {
        this.auditing = true
        this.auditData ()
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
    border-bottom: 1px solid #ccc;
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
</style>


