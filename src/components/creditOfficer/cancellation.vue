<template>
    <div>
        <!-- <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷员管理>&nbsp;退单详情</span>
          </p>
        </div> -->
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
                            <span>{{ dataList.goodStatusName}}</span>
                        </li>
                        <li>
                            <span>支付方式 ： </span>
                            <span >{{ dataList.payTypeName}}</span>
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
                                <!-- {{dataList.robbingAmount}} {{payType}} -->
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
                        </li>
                        <li>
                            <span>客户来源渠道 ： </span>
                            <span>{{dataList.userSourceChannelName}}</span>
                        </li>
                        <li>
                            <span>信贷员 ： </span>
                            <span>{{dataList.officerName}} {{dataList.officerPhone}}</span>
                        </li>
                        <li>
                            <span>信贷员身份 ：</span>
                            <span>{{dataList.vipStatusName}}</span>
                        </li>
                        <li>
                            <span>信贷员来源渠道 ： </span>
                            <span>{{dataList.officerRegisterChannelName }}</span>
                        </li>
                        <li v-if="dataList.chargebackOrderRes!=null">
                            <span>当年退单金额 ： </span>
                            <span >{{dataList.chargebackOrderRes.chargeBackOrderAmout }}</span>
                        </li>
                        <li v-if="dataList.chargebackOrderRes!=null">
                            <span>当年退单单数 ： </span>
                            <span >{{dataList.chargebackOrderRes.chargeBackOrderCount }}</span>
                        </li>
                        <li v-if="dataList.chargebackOrderRes!=null">
                            <span>退单权益剩余次数 ： </span>
                            <span >{{dataList.chargebackOrderRes.rightsCount }}</span>
                        </li>
                        <li style="margin-left:83px">
                            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                                <FormItem label="退单金额 : " prop="money" >
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
                                <FormItem label="退单申请备注 : " prop="desc">
                                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                </FormItem>
                                <FormItem label="上传图片 : " prop="">
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
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">确认退单</Button>
                                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
                                </FormItem>
                            </Form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        payType:'',
        dataList: {},
        JournalList: false,
        model1:'',
        vuesss:'',
        givemoney:'',//充值赞豆
        termValidity:'',//有效期
        grabSheetmoney:'',//抢单劵张数
        ticketNo:'',//抢单劵编号
        cityList:[
            {label:'赞豆',value:'0'},
            {label:'抢单券',value:'1'}
        ],
        
        singleTicketList:[],
        formValidate: {
            money:'',
            desc: '',
            vuesss:''
        },
        ruleValidate:{
            desc: [
              { required: true, message: '请输入退单备注', trigger: 'blur' },
              {required: true, message: '退单备注最多100字',max: 100,trigger: 'change'}
            ],
            money:[
              { required: true, message: '请选择退款金额', trigger: 'blur' },
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
        this.formValidate.money = model1
    },
    //退单
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let res = /^(0|\+?[1-9][0-9]{0,5})$/
                let rag = /^(0|\+?[1-9][0-9]{0,3})$/
                let bag = /^[1-9]([0-9]{0,3})$/
                let chargebackApplyPic 
                if (this.uploadList.length>0) {
                    chargebackApplyPic = this.uploadList.join(';')
                } else {
                    chargebackApplyPic = ''
                }

                let data = {
                    auditRemark:this.formValidate.desc,
                    // chargebackType:this.model1,
                    chargebackType:this.formValidate.money,
                    orderCode:this.$route.query.orderCode,
                    chargebackApplyPic:chargebackApplyPic
                }
                if(this.formValidate.money=='0'){
                    data.rechargeAmount = this.vuesss
                    data.giveAmount = this.givemoney
                    data.giveAmountExpir = this.termValidity
                    
                }else{
                    if (this.grabSheetmoney=='') {
                        data.chargebackMoney = 1
                    }else {
                       data.chargebackMoney = this.grabSheetmoney
                    }
                    data.chargebackTicketType = this.ticketNo
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
                this.http.post(BASE_URL+'/loan/chargebackOrder/applyChargeOrder',data)
                .then(data=>{
                    if(data.code=='success'){
                        this.$Message.success(data.message)
                        // 销售数据同步
                        this.http.post(BASE_URL+"/sale/saleOrder/confirmSys",{orderCode:this.$route.query.orderCode}).then(data=>{
                            console.log(data)
                        }).catch(err=>{console.log(err)})
                        if (this.$route.query.num == 1) {
                            this.$router.push({
                                path:
                                "./consultingSales?num=1"
                            });
                        } else if (this.$route.query.num == 2) {
                            this.$router.push({
                                path:
                                "./consultingSalesperson?num=1"
                            });
                        } else if (this.$route.query.num == 3) {
                            this.$router.push({
                                path:
                                "./orderList?num=3"
                            });
                        } else if (this.$route.query.num == 4) {
                            this.$router.push({
                                path:
                                "./orderList?num=4"
                            });
                        }
                        // window.history.go(-1)
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
        if (this.$route.query.num == 1) {
            this.$router.push({
                path:
                "./consultingSales?num=1"
            });
        } else if (this.$route.query.num == 2) {
            this.$router.push({
                path:
                "./consultingSalesperson?num=1"
            });
        } else if (this.$route.query.num == 3) {
            this.$router.push({
                path:
                "./orderList?num=3"
            });
        } else if (this.$route.query.num == 4) {
            this.$router.push({
                path:
                "./orderList?num=4"
            });
        }else {
            window.history.go(-1);
        }
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
                this.uploadList = data.data.chargebackOrderRes!=null?data.data.chargebackOrderRes.chargebackAuditPic:[]
                this.payType = data.data.payType=='0'?'赞豆':'抢单券'
            }
        }).catch((error) => {
        console.log(error)
    })
    },
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
    }
    // <-----上传图片结束
  },
  mounted () {
      this.voucherNumber ()
     this.detailList() 
  }
};
</script>
<style lang="less" scoped>
.rejection_detail {
  display: flex;
  div{
      width: 100%;
      li {
            display: flex;
            margin-bottom: 10px;
            span:nth-of-type(1) {
            width:200px;
            text-align: right;
            }
        }
  }
  
}

// 上传图片样式
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
