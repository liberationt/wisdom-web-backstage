<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷员管理>&nbsp;退单详情</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="rejection_detail">
                <div>
                    <ul>
                        <li>
                            <span>抢单时间 ： </span>
                            <span>{{dataList.orderCreateTime}}</span>
                        </li>
                        <li>
                            <span>抢单编号 ： </span>
                            <span>{{dataList.orderNum}}</span>
                        </li>
                        <li>
                            <span>订单类型 ： </span>
                            <span>{{dataList.goodStatusName}}</span>
                        </li>
                        <li>
                            <span>支付方式 ： </span>
                            <span>{{dataList.payTypeName}}</span>
                        </li>
                        <li>
                            <span>支付明细 ： </span>
                            <span v-if="dataList.payType==1">{{dataList.ticketType}}抢单劵{{ dataList.ticketNumber}}张</span>
                            <span v-if="dataList.payType==0">
                                <em v-if="dataList.payTypeDetail==0">{{dataList.activityAmount}}赞豆</em>
                                <em v-if="dataList.payTypeDetail==1">充值赞豆{{dataList.rechargeAmount}}</em>
                                <em v-if="dataList.payTypeDetail==2">赠送赞豆{{dataList.giveAmount}}</em>
                                <em v-if="dataList.payTypeDetail==3">充值赞豆{{dataList.rechargeAmount}}&赠送赞豆{{dataList.giveAmount}}</em>
                            </span>
                        </li>
                        <li>
                            <span>抢单费用 ： </span>
                            <span>
                                <span v-if="dataList.activityAmount==dataList.robbingAmount">
                                    <span>
                                        <span v-if="dataList.payType == 0">
                                            {{dataList.robbingAmount}}赞豆
                                        </span>
                                        <span v-else>
                                            {{dataList.robbingAmount}}赞豆/{{dataList.ticketNumber}}张券
                                        </span>
                                    </span>
                                </span>
                                <span v-else>
                                    <span style="color:#BEBEBE">{{dataList.robbingAmount}}赞豆/</span>
                                    <span>
                                        <span v-if="dataList.payType == 0">
                                            {{dataList.activityAmount}}赞豆
                                        </span>
                                        <span v-else>
                                            {{dataList.activityAmount}}赞豆/{{dataList.ticketNumber}}张券
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li>
                            <span>所在区域 ： </span>
                            <span>{{ dataList.orderCityNameFirst}} {{ dataList.orderCityNameSecond}}</span>
                        </li>
                        <li>
                            <span>客户 ： </span>
                            <span>{{dataList.loanUserName}}  {{dataList.loanUserPhone}}</span>
                            <Button type="primary" style="margin-left:10px;margin-top:-5px" @click='dial(1)'>拨打</Button>
                        </li>
                        <li>
                            <span>客户来源渠道 ： </span>
                            <span>{{dataList.userSourceChannelName}}</span>
                        </li>
                        <li>
                            <span>信贷员 ： </span>
                            <span>{{dataList.officerName}} {{dataList.officerPhone}}</span>
                            <Button type="primary" style="margin-left:10px;margin-top:-5px" @click='viewdetails'>查看信贷员详情</Button>
                            <Button type="primary" style="margin-left:10px;margin-top:-5px" @click='dial(2)'>拨打</Button>
                        </li>
                        <li>
                            <span>信贷员身份 ：</span>
                            <span>{{dataList.vipStatusName}}</span>
                        </li>
                        <li>
                            <span>当年退单金额 ： </span>
                            <span >{{dataList.chargebackOrderRes.chargeBackOrderAmout }}</span>
                        </li>
                        <li>
                            <span>当年退单单数 ： </span>
                            <span >{{dataList.chargebackOrderRes.chargeBackOrderCount }}</span>
                        </li>
                        <li>
                            <span>退单权益剩余次数 ： </span>
                            <span >{{dataList.chargebackOrderRes.rightsCount }}</span>
                        </li>
                        <li>
                            <span>信贷员来源渠道 ： </span>
                            <span>{{dataList.officerRegisterChannelName }}</span>
                        </li>
                        <li>
                            <span>退单申请人 ： </span>
                            <span>{{seconddata.applyForPerson}}</span>
                        </li>
                        <li>
                            <span>退单申请时间 ： </span>
                            <span>{{seconddata.chargebackTime}}</span>
                        </li>
                        <li>
                            <span>退单方式 ： </span>
                            <span>{{dataList.chargebackOrderRes.chargebackTypeName}}</span>
                        </li>
                        <li>
                            <span>退单申请金额 ： </span>
                            <span v-if="dataList.chargebackOrderRes.chargebackType==1">{{dataList.chargebackOrderRes.realChargebackTicketType  }}抢单劵{{ dataList.chargebackOrderRes.realChargebackMoney }}张</span>
                            <span v-if="dataList.chargebackOrderRes.chargebackType==0">
                                <em v-if="dataList.chargebackOrderRes.chargebackTypeDetail ==0">{{dataList.chargebackOrderRes.chargebackMoney}}赞豆</em>
                                <em v-if="dataList.chargebackOrderRes.chargebackTypeDetail ==1">充值赞豆{{dataList.chargebackOrderRes.rechargeAmount}}</em>
                                <em v-if="dataList.chargebackOrderRes.chargebackTypeDetail ==2">赠送赞豆{{dataList.chargebackOrderRes.giveAmount}}({{dataList.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                                <em v-if="dataList.chargebackOrderRes.chargebackTypeDetail ==3">充值赞豆{{dataList.chargebackOrderRes.rechargeAmount}}&赠送赞豆{{dataList.chargebackOrderRes.giveAmount}}({{order.chargebackOrderRes.giveAmountExpir}}天有效期)</em>
                            </span>
                            <!-- <span>{{seconddata.chargebackMoney}} {{payType}}</span> -->
                        </li>
                        <li>
                            <span>退单申请备注 ： </span>
                            <span>{{seconddata.auditRemark}}</span>
                        </li>
                        <li>
                            <span>审核备注 ： </span>
                            <span>{{seconddata.chargebackRemark}}</span>
                        </li>
                        <li>
                            <span>退单申请图片 ： </span>
                            <img v-for="item in chargebackApplyPicimg" class="mr10" :src="item" @click="bigimg(item)" alt="">
                        </li>
                        <li>
                            <span>上传图片 ： </span>
                            <div class="demo-upload-list" v-for="(item,i) in uploadList">
                                        <template >
                                            <img  :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native="handleRemove(i)"></Icon>
                                            </div>
                                        </template>
                                    </div>
                                    <Upload
                                        ref="upload"
                                        :show-upload-list="false"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        type="drag"
                                        action=""
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="ios-camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="上传图片" v-model="visible">
                                        <img :src="defaultimg" v-if="visible" style="width: 100%">
                                    </Modal>
                        </li>

                        
                        <li style="margin-left:180px">
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                                <FormItem label="退单审核金额 : " prop="money">
                                   <div class="clearfix">
                                        <Select class="left" v-model="formValidate.money" style="width:80px;margin-right:10px" @on-change="modelChange">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span v-if="this.formValidate.money=='0'" class="clearfix left" style="width:430px">
                                        <em class="left">充值赞豆</em>
                                        <Input v-model="vuesss" style="width:100px" class="left">
                                            <span slot="append">赞豆</span>
                                        </Input>
                                        <em class="left ml10">赠送赞豆</em>
                                        <Input v-model="givemoney" style="width:100px" class="left">
                                            <span slot="append">赞豆</span>
                                        </Input>
                                        <Input v-model="termValidity" style="width:120px" class="left">
                                            <span slot="append">天有效期</span>
                                        </Input>
                                        </span>
                                        <span v-if="this.formValidate.money=='1'">
                                            <Select :disabled="auditing" v-model="ticketNo" class="left mb5  inputnum" style="width:150px;text-align:center">
                                                <Option v-for="item in singleTicketList" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
                                            <span class="left spandis spandisright"  >劵</span>
                                            <Input v-model="grabSheetmoney" style="width:120px" class="left">
                                                <span slot="append">张抢单劵</span>
                                            </Input>
                                        </span>
                                    </div>
                                </FormItem>
                                <FormItem label="审核备注 : " prop="desc">
                                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 10}"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">确认通过</Button>
                                    <Button type="error" @click="handleReset('formValidate')" style="margin:0 8px">拒绝</Button>
                                    <Button type="primary" @click="preservation('formValidate')">保存</Button>
                                    <Button @click="returns('formValidate')" style="margin:0 8px">返回</Button>
                                </FormItem>
                            </Form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal
        title="拨打电话"
        v-model="modal10"
        ok-text="确认"
        cancel-text="取消"
        @on-ok="dialing"
        width='300'
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p>确认拨打{{typename}} {{nametitle}} 的电话吗?</p>
        </Modal>
        <!-- 查看大图弹框 -->
        <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
            <img :src=this.imglink alt="" style="width:970px;height:890px;">
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
        modal10:false,
        modal11:false,
        imglink:'',
        nametitle:'',
        officerCode:'',
        typename:'',
        payType:'',
        dataList: {},
        seconddata:{},
        chargebackTime:'',
        applyForPerson:'',
        JournalList: false,
        model1:'',
        vuesss:'',
        givemoney:'',//充值赞豆
        termValidity:'',//有效期
        grabSheetmoney:'',//抢单劵张数
        ticketNo:'',//抢单劵编号
        singleTicketList:[],
        cityList:[
            {label:'赞豆',value:0},
            {label:'抢单券',value:1}
        ],
        chargebackApplyPicimg:[],
        formValidate: {
            desc: '',
            money:'',
        },
        ruleValidate:{
            desc: [
              { required: true, message: '请输入退单备注', trigger: 'blur' },
              {required: true, message: '退单备注最多100字',max: 100,trigger: 'change'}
            ]
        },
        // 上传图片开始---->
        defaultimg:require("../../image/moren.png"),
        visible: false,
        uploadList: []
        // <-----上传图片结束
    }
  },
  methods: {
    modelChange(model1){
        this.model1 = model1
    },
    bigimg(link) {
      this.imglink = link;
      this.modal11 = true;
      // window.location.href = link
    },
    // 查看详情
    viewdetails(){
        this.$router.push('/creditInformation?loanOfficerCode='+this.officerCode)
    },
    // 拨打
    dial(num){
        if(num=='1'){
            this.typename = '客户'
            this.nametitle = this.dataList.loanUserName
        }else{
            this.typename = '信贷员'
            this.nametitle = this.dataList.officerName
        }
        this.modal10=true
    },
    //拨打电话
    dialing () {
        let data,url;
        if(this.typename=='客户'){
            data = {
                mobile:this.dataList.encryptUserPhone
            }
            url = '/sale/saleDialRecord/callLoanCustom'
        }else{
            data = {
                loanOfficerCode:this.officerCode
            }
            url = "/sale/saleDialRecord/callLoanOfficer"
        }
        this.http.post(BASE_URL + url, data)
        .then(data => {
            if (data.code == 'success') {
                this.$Message.success(data.message)
            }else{
                this.$Message.error(data.message)
            }
        })
        .catch(err => {
            console.log(err);
        });
    },
    //通过
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
            let res = /^(0|\+?[1-9][0-9]{0,5})$/
            let rag = /^(0|\+?[1-9][0-9]{0,3})$/
            let bag = /^[1-9]([0-9]{0,3})$/
            if(this.formValidate.money===''){
                this.$Message.error('请选择退单审核金额')
                return false 
            }
            if(this.formValidate.money=='0'){
                if (this.vuesss==''&&this.givemoney=='') {
                    this.$Message.error('请输入充值赞豆或赠送赞豆')
                    return false
                } else {
                    if (this.vuesss!='') {
                        if (!res.test(this.vuesss)) {
                            this.$Message.error('充值赞豆请输入0-999999间的整数')
                            return false
                        }
                    }
                    if (this.givemoney!='') {
                        if (!res.test(this.givemoney)) {
                            this.$Message.error('赠送赞豆请输入0-999999间的整数')
                            return false
                        }
                    }
                }
                if (this.givemoney!=''&&this.termValidity=='') {
                    this.$Message.error('请输入赠送赞豆有效期')
                    return false
                }
                if (!rag.test(this.termValidity)&&this.termValidity!='') {
                    this.$Message.error('赠送赞豆有效期请输入0-999999间的整数')
                    return false
                }   
            } else {
                if (this.ticketNo=='') {
                    this.$Message.error('请选择抢单劵编号')
                    return false
                }
                if (this.grabSheetmoney=='') {
                    this.$Message.error('请输入抢单劵数量')
                    return false
                } else {
                    if (!bag.test(this.grabSheetmoney)) {
                        this.$Message.error('抢单劵数量请输入1-9999间的整数')
                        return false
                    }
                }
            }
            let content
            if(this.formValidate.money==0){
                content = this.vuesss + ' 赞豆'
            }else{
                content = '1抢单券'
            }
            this.$Modal.confirm({
                
                title: "温馨提示",
                content: '<p>退单金额 '+content+'</p>',
                onOk: () => {
                    let chargebackApplyPic 
                    if (this.uploadList.length>0) {
                        chargebackApplyPic = this.uploadList.join(';')
                    } else {
                        chargebackApplyPic = ''
                    }
                    let data = {
                        auditStatus:1,
                        orderCode:this.$route.query.orderCode,
                        chargebackRemark:this.formValidate.desc,
                        chargebackApplyPic:chargebackApplyPic,
                        chargebackType:this.formValidate.money,
                    }
                    if(this.formValidate.money=='0'){
                        data.realRechargeAmount = this.vuesss
                        data.realGiveAmount = this.givemoney
                        data.giveAmountExpir = this.termValidity
                    }else{
                        if (this.grabSheetmoney=='') {
                            data.chargebackMoney = 1
                        }else {
                        data.chargebackMoney = this.grabSheetmoney
                        }
                        data.realChargebackType  = this.ticketNo
                    }
                    this.http.post(BASE_URL+'/loan/chargebackOrder/auditChargeOrderRemark',data)
                    .then(data=>{
                        if(data.code=='success'){
                            this.$Message.success('审核通过完成')
                            this.$refs[name].resetFields();
                            this.$router.push('/returnAudited?frequency='+this.$route.query.frequency)
                        }else{
                            this.$Message.error(data.message)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            })
            }
        })
    },
    //拒绝
    handleReset (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let res = /^(0|\+?[1-9][0-9]{0,5})$/
                let rag = /^(0|\+?[1-9][0-9]{0,3})$/
                let bag = /^[1-9]([0-9]{0,3})$/
                if(this.formValidate.money===''){
                    this.$Message.error('请选择退单审核金额')
                    return false 
                }
                if(this.formValidate.money=='0'){
                    if (this.vuesss==''&&this.givemoney=='') {
                        this.$Message.error('请输入充值赞豆或赠送赞豆')
                        return false
                    } else {
                        if (this.vuesss!='') {
                            if (!res.test(this.vuesss)) {
                                this.$Message.error('充值赞豆请输入0-999999间的整数')
                                return false
                            }
                        }
                        if (this.givemoney!='') {
                            if (!res.test(this.givemoney)) {
                                this.$Message.error('赠送赞豆请输入0-999999间的整数')
                                return false
                            }
                        }
                    }
                    if (this.givemoney!=''&&this.termValidity=='') {
                        this.$Message.error('请输入赠送赞豆有效期')
                        return false
                    }
                    if (!rag.test(this.termValidity)&&this.termValidity!='') {
                        this.$Message.error('赠送赞豆有效期请输入0-999999间的整数')
                        return false
                    }   
                } else {
                    if (this.ticketNo=='') {
                        this.$Message.error('请选择抢单劵编号')
                        return false
                    }
                    if (this.grabSheetmoney=='') {
                        this.$Message.error('请输入抢单劵数量')
                        return false
                    } else {
                        if (!bag.test(this.grabSheetmoney)) {
                            this.$Message.error('抢单劵数量请输入1-9999间的整数')
                            return false
                        }
                    }
                }
            this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认拒绝退单?</p>",
            onOk: () => {   
                let data = {
                    auditStatus:2,
                    orderCode:this.$route.query.orderCode,
                    chargebackRemark:this.formValidate.desc
                }
                this.http.post(BASE_URL+'/loan/chargebackOrder/auditChargeOrderRemark',data)
                .then(data=>{
                    if(data.code=='success'){
                        this.$Message.success('操作成功')
                        this.$refs[name].resetFields();
                        this.$router.push('/returnAudited?frequency='+this.$route.query.frequency)
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            })   
            }
        })
    },
    // 返回
    returns(name){
        this.$refs[name].resetFields();    
        this.$router.push('/returnAudited?frequency='+this.$route.query.frequency)
    },
    //保存
    preservation(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let res = /^(0|\+?[1-9][0-9]{0,5})$/
                let rag = /^(0|\+?[1-9][0-9]{0,3})$/
                let bag = /^[1-9]([0-9]{0,3})$/
                if(this.formValidate.money===''){
                    this.$Message.error('请选择退单审核金额')
                    return false 
                }
                let chargebackApplyPic 
                if (this.uploadList.length>0) {
                    chargebackApplyPic = this.uploadList.join(';')
                } else {
                    chargebackApplyPic = ''
                }
                let data = {
                    auditStatus:0,
                    orderCode:this.$route.query.orderCode,
                    chargebackRemark:this.formValidate.desc,
                    chargebackApplyPic:chargebackApplyPic,
                    chargebackType:this.formValidate.money,
                }
                if(this.formValidate.money=='0'){
                    data.realRechargeAmount = this.vuesss
                    data.realGiveAmount = this.givemoney
                    data.giveAmountExpir = this.termValidity
                }else{
                    if (this.grabSheetmoney=='') {
                        data.chargebackMoney = 1
                    }else {
                       data.chargebackMoney = this.grabSheetmoney
                    }
                    data.realChargebackType  = this.ticketNo
                }
                if(this.formValidate.money=='0'){
                    if (this.vuesss==''&&this.givemoney=='') {
                        this.$Message.error('请输入充值赞豆或赠送赞豆')
                        return false
                    } else {
                        if (this.vuesss!='') {
                            if (!res.test(this.vuesss)) {
                                this.$Message.error('充值赞豆请输入0-999999间的整数')
                                return false
                            }
                        }
                        if (this.givemoney!='') {
                            if (!res.test(this.givemoney)) {
                                this.$Message.error('赠送赞豆请输入0-999999间的整数')
                                return false
                            }
                        }
                    }
                    if (this.givemoney!=''&&this.termValidity=='') {
                        this.$Message.error('请输入赠送赞豆有效期')
                        return false
                    }
                    if (!rag.test(this.termValidity)&&this.termValidity!='') {
                        this.$Message.error('赠送赞豆有效期请输入0-999999间的整数')
                        return false
                    }   
                } else {
                    if (this.ticketNo=='') {
                        this.$Message.error('请选择抢单劵编号')
                        return false
                    }
                    if (this.grabSheetmoney=='') {
                        this.$Message.error('请输入抢单劵数量')
                        return false
                    } else {
                        if (!bag.test(this.grabSheetmoney)) {
                            this.$Message.error('抢单劵数量请输入1-9999间的整数')
                            return false
                        }
                    }
                }
                this.http.post(BASE_URL+'/loan/chargebackOrder/auditChargeOrderRemark',data)
                .then(data=>{
                    if(data.code=='success'){
                        this.$Message.success('保存成功')
                        this.$refs[name].resetFields();
                        this.$router.push('/returnAudited?frequency='+this.$route.query.frequency)
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                
            }
        })
    },
    //详情
    detailList(){
        let QueryOrderDetailReq = {
            orderCode : this.$route.query.orderCode
        }
        this.http.post(BASE_URL+'/loan/baseRobOrder/getBaseRobOrderByCode',QueryOrderDetailReq)
        .then(data=>{
            if(data.code=='success'){
                this.dataList = data.data
                this.seconddata = data.data.chargebackOrderRes
                this.chargebackApplyPicimg = data.data.chargebackOrderRes.chargebackApplyPic.split(';')
                this.uploadList = data.data.chargebackOrderRes.chargebackAuditPic!=''?data.data.chargebackOrderRes.chargebackAuditPic.split(';'):[]
                this.payType = data.data.chargebackOrderRes.chargebackType=='0'?'赞豆':'张抢单券'
                this.officerCode = data.data.officerCode
                this.formValidate.money = data.data.chargebackOrderRes.realChargebackType
                if(this.formValidate.money==0){
                    this.vuesss = data.data.chargebackOrderRes.realRechargeAmount 
                    this.givemoney = data.data.chargebackOrderRes.realGiveAmount  
                    this.termValidity = data.data.chargebackOrderRes.giveAmountExpir  
                } else {
                    this.ticketNo = data.data.chargebackOrderRes.realChargebackType
                    this.grabSheetmoney = data.data.chargebackOrderRes.chargebackMoney  
                }
            }
        })
    },
    // 上传图片开始--->
    handleView (url) {//放大
        this.defaultimg = url;
        this.visible = true;
    },
    handleRemove (index) {//删除
        this.uploadList.splice(index,1)
    },
    handleFormatError () {//上传失败
        this.$Message.info("图片格式不正确,请上传正确的图片格式");
    },
    handleBeforeUpload (file) {//上传之前
    if (this.uploadList.length>7) {
        this.$Modal.warning({
            title: '温馨提示',
            content: '最多可上传8张图片'
        });
        return false
    }
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
                this.uploadList.push(resp.data)
            } else {
            }
          })
          .catch(() => {});
        return false;
      }
    },
    // <-----上传图片结束
    voucherNumber () {
        this.http.post(BASE_URL + '/loan/ticketManage/queryTicketNoList',{})
        .then((resp) => {
          if (resp.code == 'success') {
            this.singleTicketList = resp.data
            
          } else {
            this.$Message.warning(resp.message);                 
          }
        })
        .catch(() => {
        })
      },
  },
  created() {
      this.voucherNumber ()
    this.detailList()
  }
};
</script>
<style lang="less" scoped>
.rejection_detail {
  display: flex;
  li {
    display: flex;
    margin-bottom: 10px;
    span:nth-of-type(1) {
      width:300px;
      text-align: right;
    }
  }
}
.demo-upload-list{
        display: inline-block;
        width: 60px!important;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .spandisright{
    display: inline-block;
  line-height: 20px;
  padding: 5px 7px;
  width: 30px!important;
  font-size: inherit;
  font-weight: 400;
  color: #495060;
  text-align: center;
  background-color: #eee;
  border: 1px solid #dddee1;
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
