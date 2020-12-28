<template>
  <div class="" >
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;会员充值设置</span>
      </p>
    </div>
    <div class="contentcss">
      <!-- 修改前 -->
      <div class="clearfix ">
        <div v-if="auditing" style="border-bottom:1px solid #ccc;color:#7cc8ff;padding-bottom:10px;margin-bottom:10px;">提交审核前数据</div>
        <ul class="memberUl clearfix">
          <li> <h3 class="memberTitle">会员充值档位设置: </h3> </li>
          <!-- <li>
            <span class="memberTitle">充值活动时间: </span>
            <span>
              <Select v-model="activityStatus" :disabled="auditing" style="width:120px;text-align:center">
                <Option value="0">不限时间范围</Option>
              </Select>
            </span>
          </li> -->
          <li class="clearfix"> 
            <span class="left memberTitle">充值档位推荐图标设置: </span> 
            <span>
              <img class="iconlabelUrl left" :src="labelUrlS == '' ? labelUrl : labelUrlS " alt="">
              <Upload
                v-if="!auditing"
                action=""
                class="upstyle "
                :disabled="auditing"
                :before-upload="handleUploadicon"
                :show-upload-list="false"
                :format="['jpg','jpeg','png', 'gif']"
                :on-format-error="handleFormatError1">
                <Button class="uploadButton ml10" :disabled="auditing" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </span>
            <!-- <span class="ml80" v-if="!auditing">{{imgName}}</span> -->
          </li>
          <li>
            <div class="memberTitle">充值档位: </div> 
            <div
              v-for="(item, index) in addnormalList"
              :key="index"
              class="mb15 clearfix member_input"
            >
              <Input type="text" :disabled="auditing" v-model="item.vipDay" class="left ml10 mb5 inputnum"  style="width:170px">
              <span slot="prepend">会员充值天数</span>
              <span slot="append" class="left">天</span>
              </Input>
              <Input type="text" :disabled="auditing" v-model="item.originAmount" class="left ml10 mb5 inputnum"  style="width:150px">
              <span slot="prepend">原价</span>
              <span slot="append" class="left">元</span>
              </Input>
              <Input type="text" :disabled="auditing" v-model="item.realPayAmount" class="left mb5 ml10 inputnum"  style="width:200px">
              <span slot="prepend">实际支付金额</span>
              <span slot="append" class="left">元</span>
              </Input>
              <Input type="text" :disabled="auditing" v-model="item.realVirtualAmount" class="left mb5 ml10 inputnum"  style="width:200px">
              <span slot="prepend">实际支付赞豆</span>
              <span slot="append" class="left">赞豆</span>
              </Input>
              <!-- <Input type="text" :disabled="auditing" v-model="item.giveTicketNumber" class="left mb5 ml10 inputnum"  style="width:160px">
              <span slot="prepend">送</span>
              <span slot="append" class="left">抢单券</span>
              </Input>    -->
              <RadioGroup class="left ml10" :disabled="auditing" @on-change="recommend(index)" v-model="item.recommendStatus">
                <Radio :disabled="auditing" label="1">推荐</Radio>          
              </RadioGroup>
              <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
              <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
            </div>
          </li>
        </ul> 
      </div>  
      <!-- 修改后 -->
      <div class="clearfix contentcss" style="padding:20px 0" v-if="auditing">
        <div style="border-bottom:1px solid #ccc;color:#7cc8ff;padding-bottom:10px;margin-bottom:10px;">提交审核后数据</div>
        <ul class="memberUl clearfix">
          <li> <h3 class="memberTitle">会员充值档位设置: </h3> </li>
          <!-- <li>
            <span class="memberTitle">充值活动时间: </span>
            <span>
              <Select v-model="activityStatus" disabled style="width:120px;text-align:center">
                <Option value="0">不限时间范围</Option>
              </Select>
            </span>
          </li> -->
          <li class="clearfix"> 
            <span class="left memberTitle">充值档位推荐图标设置: </span> 
            <span>
              <img class="iconlabelUrl left" :src="beforeVipConfig.recommendIconUrl == ''? labelUrlM : beforeVipConfig.recommendIconUrl"  alt="">
            </span>
          </li>
          <li>
            <div class="memberTitle1">充值档位: </div> 
            <div
              v-for="(item, index) in addnormalListAfter"
              :key="index"
              class="mb15 clearfix member_input"
            >
              <Input type="text" disabled v-model="item.vipDay" class="left ml10 mb5 inputnum"  style="width:170px">
              <span slot="prepend">会员充值天数</span>
              <span slot="append" class="left">天</span>
              </Input>
              <Input type="text" disabled v-model="item.originAmount" class="left ml10 mb5 inputnum"  style="width:150px">
              <span slot="prepend">原价</span>
              <span slot="append" class="left">元</span>
              </Input>
              <Input type="text" disabled v-model="item.realPayAmount" class="left mb5 ml10 inputnum"  style="width:200px">
              <span slot="prepend">实际支付金额</span>
              <span slot="append" class="left">元</span>
              </Input>
              <Input type="text" disabled v-model="item.realVirtualAmount" class="left mb5 ml10 inputnum"  style="width:200px">
              <span slot="prepend">实际支付赞豆</span>
              <span slot="append" class="left">赞豆</span>
              </Input>
              <!-- <Input type="text" disabled v-model="item.giveTicketNumber" class="left mb5 ml10 inputnum"  style="width:160px">
              <span slot="prepend">送</span>
              <span slot="append" class="left">抢单券</span>
              </Input>    -->
              <RadioGroup class="left ml10"  v-model="item.recommendStatus">
                <Radio disabled label="1">推荐</Radio>          
              </RadioGroup>
              <!-- 三期结束 -->
              <Button type="primary" disabled class="left ml10" v-if="index==0" @click="addnormal">+</Button>
              <Button type="primary" disabled class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
            </div>
          </li>
        </ul> 
      </div>  
  ·    <div class="" style="text-align:center;">
        <Button type="primary" class="w100 examinetype" :disabled="auditing" :loading="loading3" @click="marketingusbmit">
          <span v-if="!loading3">保存提交审核</span>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
          <span v-if="!loading3">审核</span>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="ghost" @click="handleRender3">查看操作日志</Button>  
      </div> 
      <Modal
        title="审核"
        v-model="toExamine"
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
              <Select v-model="formCustomexa.activeType" style="width:160px" >
                <Option  value="1" >审核通过</Option>
                <Option  value="2" >审核驳回</Option>
              </Select>    
            </FormItem>
            <FormItem label="备注:" prop="remarks" v-if="this.formCustomexa.activeType == '2'">
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
  data(){
    return {
      toExamine:false,
      auditing:false,
      loading3: false,
      loading:true,
      labelUrl: require('../../image/moren.png'),
      labelUrlS:"",
      labelUrlM: require('../../image/moren.png'),
      activityStatus:"0",
      imgName: "未选择任何文件",
      beforeVipConfig: [],
      addnormalListBefore :[],
      addnormalList:[
        {
          vipDay: '', // vip天
          originAmount: '', // 原价
          realPayAmount: '', // 实际支付金额
          realVirtualAmount: '', // 实际支付赞豆
          // giveTicketNumber:'',// 送抢单券
          recommendStatus: "0"
        }
      ],
      formCustomexa: {
        activeType: '',
        remarks:''
      },
      ruleCustomexa: {
        activeType: [
            {required: true,message: '请选择审核状态',trigger: 'change'},    
        ],
        remarks: [
            {required: true,message: '请输入备注',trigger: 'blur'},
        ],
      },
    }
  },
  methods: {
    // 推荐
    recommend(index){
      this.addnormalList.forEach((v,i)=>{
        if(index == i) {
          v.recommendStatus = "1"
        } else {
          v.recommendStatus = "0"
        }
      })
    },
    // 图片上传校验
    handleFormatError1(file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式");
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
              this.imgName = file.name
              this.labelUrl = resp.data;
              this.labelUrlS = resp.data;
            } else {
            }
          })
          .catch(() => {});
        return false;
      }
    },
    // 保存提交审核
    marketingusbmit () {
      
      let regZ = /^(0|\+?[1-9][0-9]{0,4})$/
      let regX = /^(0|\+?[1-9][0-9]{0,4})(\.\d{1,2})?$/

      if(this.addnormalList.length >= '7'){
        this.promptBox('最多设置6个充值档位！请检查！')
        return false  
      }
      let recommendStatusArr = []
      for (let i = 0; i < this.addnormalList.length; i++) {
        if(!regZ.test(this.addnormalList[i].vipDay)) {
          this.promptBox('第'+(i+1) +'行天数仅可输入整数')
          return false  
        }
        if(this.addnormalList[i].vipDay <1 || this.addnormalList[i].vipDay >365) {
          this.promptBox('第'+(i+1) +'行天数仅可输入1-365天')
          return false  
        }
        
        if(!regX.test(this.addnormalList[i].originAmount) || Number(this.addnormalList[i].originAmount) == 0){
          this.promptBox('第'+(i+1) +'行原价仅可输入0.01-99999间数字')
          return false   
        } 
        if(!regX.test(this.addnormalList[i].realPayAmount)|| Number(this.addnormalList[i].realPayAmount ) == 0){
          this.promptBox('第'+(i+1) +'行实际支付金额仅可输入0.01-99999间数字' )
          return false   
        } 
        if(!regX.test(this.addnormalList[i].realVirtualAmount) || Number(this.addnormalList[i].realVirtualAmount) == 0){
          this.promptBox('第'+(i+1) +'行实际支付赞豆数仅可输入0.01-99999间的数字')
          return false   
        } 
        if(!regZ.test(this.addnormalList[i].giveTicketNumber)) {
          this.promptBox('第'+(i+1) +'行送抢单券数仅可输入0-99999之间的整数')
          return false  
        }
        if(Number(this.addnormalList[i].originAmount)<  Number(this.addnormalList[i].realPayAmount)) {
          this.promptBox('第'+(i+1) +'行原价必须大于实际支付金额')
          return false  
        }
        recommendStatusArr.push(this.addnormalList[i].recommendStatus)
        for(let j=i+1; j<this.addnormalList.length; j++){
          if(this.addnormalList[i].vipDay == this.addnormalList[j].vipDay ) {
            this.promptBox('充值档位重复，请重新设置')
            return false 
          }
        }
      }
      if(recommendStatusArr.indexOf('1') == -1) {
        this.promptBox('请选择一个推荐值')
        return false  
      }
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认保存提交审核吗?</p>",
        onOk: () => {
          let list = {
              // activityStatus : this.activityStatus,
              recommendIconUrl : this.labelUrlS,
              vipConfigList :this.addnormalList
          }
          this.http.post(BASE_URL + '/loan/vipConfig/save2Audit', list)
            .then((resp) => {
              if (resp.code == 'success') {
                this.$Message.success('保存成功')
                this.loading3 = false
                this.examineQuery()
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
    // 查看操作日志
    handleRender3 () {
      this.$router.push({ path: './operationLog?operationType=vip_config' })
    },
    // 会员充值设置审核
    examineSubmit (name) {
      this.$refs[name].validate(valid => {
      if (!valid) {
        return this.changeLoading()
      } else {
          let data = {
              auditStatus : this.formCustomexa.activeType,
              remark  : this.formCustomexa.remarks
          }
          this.http.post(BASE_URL + '/loan/vipConfig/audit', data)
          .then(data=>{
              if (data.code == 'success') {
                  this.changeLoading()
                  this.toExamine = false
                  const title = '审核'
                  const content = '<p>审核成功</p>'
                  this.$Modal.success({
                      title: title,
                      content: content,
                      onOk: () => {
                        this.examineQuery()
                        this.$refs[name].resetFields()
                      }
                  })
              } else {
                this.toExamine = false
                this.$Message.info(data.message)
              }
          })
          .catch((error) => {
              console.log(error)
          })
       }
      })
    },
    // 判断审核前后的数据展示
    examineQuery(){
      this.http.post(BASE_URL+"/loan/vipConfig/queryAuditData",{}).then(data=>{
        if(data.code == "success"){
          let beforeVipConfig = data.data.beforeVipConfig
          let afterVipConfig = data.data.afterVipConfig // 审核后的数据
          if(beforeVipConfig){
            const {recommendIconUrl,activityStatus,vipConfigList} = data.data.beforeVipConfig // 审核前的数据
            // this.activityStatus = activityStatus+"" //审核前的数据
            this.labelUrlS = recommendIconUrl //审核前的数据
            this.addnormalList = vipConfigList //审核前的数据
            vipConfigList.forEach((v,i)=>{ //审核前数据
              this.addnormalList[i].recommendStatus = String(v.recommendStatus)
            })
          }
          if(afterVipConfig != null){
            this.beforeVipConfig = afterVipConfig // 审核后数据
            this.addnormalListAfter = afterVipConfig.vipConfigList //审核后数据
            afterVipConfig.vipConfigList.forEach((v,i)=>{ //审核前数据
              this.addnormalListAfter[i].recommendStatus = String(v.recommendStatus)
            })
            this.auditing = true
          } else {
            this.auditing = false
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    // 审核
    toexamine () {
      this.http.post(BASE_URL + "/checkUriPermission", ['/loan/vipConfig/audit']).then(data=>{
        if(data.code == 'success'){
          for (const key in data.data) {
            if (data.data[key] == true) {
              this.toExamine = true
            } else {
              this.$Message.warning('暂无权限')
            }
          }
        }
      }).catch(err=>{});
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.memos = false
    },
    addnormal () {
      this.addnormalList.push({
        vipDay: '', // vip天
        originAmount: '', // 原价
        realPayAmount: '', // 实际支付金额
        realVirtualAmount: '', // 实际支付赞豆
        // giveTicketNumber:'',// 送抢单券
        recommendStatus: "0"
      })
    },
    addnorma2 (index) {
      this.addnormalList.splice(index, 1)
    },
    // 提示框
    promptBox(text){
      this.$Modal.warning({
        title: '温馨提示',
        content: text
      })
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
  },
  created(){
    this.examineQuery()
  }
}
</script>
<style lang="less" scoped>

.memberUl {
  li {
    margin-bottom: 25px;
    span {
      text-align: right;
      img {
        width: 45px;
        height: 45px;
        margin-top: -10px;
      }
      .uploadButton {
        margin-top: -3px;
      }
    }
    .ml80 {
      margin-left: 70px;
    }
    .memberTitle{
      display: inline-block;
      width: 150px;
      text-align: right;
      margin-right: 20px;
    }
    .memberTitle1{
      width: 150px;
      text-align: right;
      margin-right: 20px;
    }
    .member_input {
      margin-left: 150px;
    }
  }
}
.contentcss{
  overflow-x: scroll
}
.ivu-radio-wrapper{
  line-height: 30px
}
</style>
