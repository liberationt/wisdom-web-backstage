<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;用户身价设置</span>
        </p>
      </div>
      <div class=" contentcss">
          <Form  :label-width="100" class="mt50">
            <FormItem >
              <Row>
                <Col span="24" v-if="verifyshow">
                <div v-if="seeshow">
                  <FormItem v-if="auditing"  label="" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核前数据</span></FormItem>
                </div>
                
                  <FormItem v-if="cityshow" class="mt15" label="标题:" >
                    <Input :disabled="auditing" :maxlength='50' v-model="titles" placeholder="请输入标题" style="width: 300px" />
                  </FormItem>
                  <FormItem v-if="cityshow" class="mt15" label="选择省份:" >
                    <div class="left clearfix" >
                  <Button :disabled="auditing" type="primary"   @click="allElection">{{election}}</Button>
                  <div class="mt15" style="maxHeight:600px;overflowY:scroll">
                    <div v-if="conurbationlist.length>0" style="background:#85C2FE;color:#fff;marginBottom:10px;padding:6px">
                      <Checkbox :disabled='auditing' :value="data7.frontcitylist[0].checkAll" @click.prevent.native="handleCheckAll(0,'110000')">北京市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.frontcitylist[1].checkAll" @click.prevent.native="handleCheckAll(1,'120000')">天津市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.frontcitylist[8].checkAll" @click.prevent.native="handleCheckAll(8,'310000')">上海市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.frontcitylist[21].checkAll" @click.prevent.native="handleCheckAll(21,'500000')">重庆市</Checkbox>
                    </div>
                    <div v-for="(item,index) in conurbationlist" class="mb15">
                      <div v-if="item.name!='北京市'&&item.name!='上海市'&&item.name!='天津市'&&item.name!='重庆市'" style="background:#85C2FE;color:#fff;marginBottom:10px;padding:6px">
                        <Checkbox :disabled='auditing' :value="data7.frontcitylist[index].checkAll" @click.prevent.native="handleCheckAll(index,item.code)">{{item.name}}</Checkbox>
                      </div>
                      <CheckboxGroup v-if="item.name!='北京市'&&item.name!='上海市'&&item.name!='天津市'&&item.name!='重庆市'" class="clearfix" v-model="data7.frontcitylist[index].checkAllGroup" @on-change="checkAllGroupChange(item.code,data7.frontcitylist[index].checkAllGroup,index)">
                        <div class="left" style="width:800px;padding:6px">
                          <Checkbox :disabled='auditing' v-for="res in item.cityList" :label="res.code" :data="res.code">{{res.name}}</Checkbox>
                        </div>
                      </CheckboxGroup>
                    </div>
                  </div>
                </div>
                  </FormItem>
                  <FormItem class="mt15" label="底价:" >
                    <Input :disabled="auditing" type="text" :number="true" v-model="pricesetting.userSocialResList[0].socialScore" @on-change="valuechange" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                  </FormItem>
                  <FormItem class="mt15" label="已实名:" >
                    <Input :disabled="auditing" type="text" :number="true" v-model="pricesetting.userSocialResList[1].socialScore" @on-change="valuechange" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem v-for="item in pricesetting.businessSocialResList" :label="item.infoTitleName"  class="clearfix mt15 indentval">
                    <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                      <Input :disabled="auditing" :number="true" v-if="res.infoOptionName!='无' && res.infoOptionName!='非本地户籍'" type="text" v-model="res.infoOptionScore" @on-change="valuechange" style="width:150px">
                      <span slot="prepend">{{res.infoOptionName}}</span>
                      </Input>
                    </div>
                  </FormItem>
                  <FormItem class="mt15" label="身价范围:" >
                    <p>
                      <span>{{minbeannum}}</span> -
                      <span>{{maxbeannum}}</span>赞豆

                    </p>
                    
                  </FormItem>
                </Col>
                <div v-if="seeshow">
                <Col span="24" class="mt20" v-if="auditing">
                <FormItem label="" v-if="verifyshow" style="border-bottom:1px solid #ccc" class="clearfix "><span class="blue1">提交审核后数据</span></FormItem>
                <FormItem v-if="cityshow" class="mt15" label="标题:" >
                    <Input :disabled="auditing" :maxlength='50' v-model="verifytitles" placeholder="请输入标题" style="width: 300px" />
                  </FormItem>
                  <FormItem v-if="cityshow" class="mt15" label="选择省份:" >
                    <div class="left clearfix" >
                  <Button :disabled="auditing" type="primary" @click="allElection">{{afterelection}}</Button>
                  
                  <div class="mt15" style="maxHeight:600px;overflowY:scroll">
                    <div v-if="conurbationlist.length>0" style="background:#85C2FE;color:#fff;marginBottom:10px;padding:6px">
                      <Checkbox :disabled='auditing' :value="data7.aftercitylist[0].checkAll" @click.prevent.native="handleCheckAll(0,'110000')">北京市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.aftercitylist[1].checkAll" @click.prevent.native="handleCheckAll(1,'120000')">天津市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.aftercitylist[8].checkAll" @click.prevent.native="handleCheckAll(8,'310000')">上海市</Checkbox>
                      <Checkbox :disabled='auditing' :value="data7.aftercitylist[21].checkAll" @click.prevent.native="handleCheckAll(21,'500000')">重庆市</Checkbox>
                    </div>
                    <div v-for="(item,index) in conurbationlist" class="mb15">
                      <div v-if="item.name!='北京市'&&item.name!='上海市'&&item.name!='天津市'&&item.name!='重庆市'" style="background:#85C2FE;color:#fff;marginBottom:10px;padding:6px">
                        <Checkbox :disabled='auditing' :value="data7.aftercitylist[index].checkAll" >{{item.name}}</Checkbox>
                      </div>
                      <CheckboxGroup v-if="item.name!='北京市'&&item.name!='上海市'&&item.name!='天津市'&&item.name!='重庆市'" class="clearfix" v-model="data7.aftercitylist[index].checkAllGroup" >
                        <div class="left" style="width:800px;padding:6px">
                          <Checkbox :disabled='auditing' v-for="res in item.cityList" :label="res.code" :data="res.code">{{res.name}}</Checkbox>
                        </div>
                      </CheckboxGroup>
                    </div>       
                  </div>
                </div>
                </FormItem>
                <FormItem class="mt15" label="底价:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetafter.userSocialResList[0].socialScore" style="width:300px">
                    <span slot="append">个</span>
                    </Input>
                  </FormItem>
                  <FormItem class="mt15" label="已实名:" >
                    <Input :disabled="auditing" type="text" v-model="pricesetafter.userSocialResList[1].socialScore" style="width:150px">
                    <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem v-for="item in pricesetafter.businessSocialResList" :label="item.infoTitleName"  class="clearfix mt15 indentval">
                    <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                      <Input :disabled="auditing" v-if="res.infoOptionName!='无' && res.infoOptionName!='非本地户籍'" type="text" v-model="res.infoOptionScore"  style="width:150px">
                      <span slot="prepend">{{res.infoOptionName}}</span>
                      </Input>
                    </div>
                  </FormItem>
                  <FormItem class="mt15" label="身价范围:" >
                    <p>
                      <span>{{minafterbeannum}}</span> -
                      <span>{{maxafterbeannum}}</span>赞豆

                    </p>
                    
                  </FormItem>

                </Col>  
                </div>         
              </Row>
            </FormItem >
            <FormItem class=" mt50 ml100">
              <Button v-if="!auditing" type="primary" class="w100 examinetype" :loading="loading3" @click="preservationvalue">
                <span v-if="!loading3">保存提交审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button :disabled="this.$route.query.operationtype==1" v-if="auditing" type="primary" class="w100" :loading="loading3" @click="toexamine">
                <span v-if="!loading3">审核</span>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="this.$route.query.operationtype==1" type="primary" @click="backingOut">返回</Button>             
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender2">查看操作日志</Button>
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
          <Modal v-model="modal2" width="360">
              <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>温馨提示</span>
              </p>
              <div style="text-align:center">
                  <p style="color:red">{{messages}}</p>
                  <p>用户身价设置已存在，请重新设置！</p>
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
              <p>配置成功</p>
              <!-- <p>是否要忽略?</p> -->
            </div>
            <div slot="footer">
              <Button type="primary" size="large" @click="tagging()">确定</Button>
            </div>
          </Modal>       
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        cityshow:false,
        loading: true,
        loading3: false,
        auditing:false,
        memos:false,
        modal9:false,
        modal2:false,
        modal3:false,
        seeshow:false,
        verifyshow:false,
        messages:'',
        titles:'',
        verifytitles:'',//待审核
        election:'全选',
        afterelection:'全选',
        conurbationlist:[],//所有城市集合
        fruit:[],//省份选中
        citylist:[],//市选中list
        allprovincecodelist:[],//所有省code
        allcitycodelist:[],//所有市code
        verifyfruit:[],//待审核省份选中
        verifycitylist:[],//待审核市list
        minbeannum:'0',//最小赞豆
        maxbeannum:'0',//最大赞豆
        minafterbeannum:'0',
        maxafterbeannum:'0',
        configAuditCode:'',
        data7:{
          frontcitylist:[{
            checkAll: false,
            checkAllGroup: []
          }],
          aftercitylist:[{
            checkAll: false,
            checkAllGroup: []
          }],

        },
        // data7: [{
				// 	checkAll: false,
				// 	checkAllGroup: []
        // }],
        pricesetting: {
          userSocialResList:[
            {
              socialName:'底价',
              socialScore:'',
              socialKey:'baseInfo',
            },
            {
              socialName:'已实名',
              socialScore:'',
              socialKey:'realInfo',
            },
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
        pricesetafter: {
          userSocialResList:[
            {
              socialName:'底价',
              socialScore:'',
              socialKey:'baseInfo',
            },
            {
              socialName:'已实名',
              socialScore:'',
              socialKey:'realInfo',
            },
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
        }
    };
  },
  created() {    
  },
  methods: {
      // 身价设置保存
      preservationvalue () {
        this.loading3 = true
        let businessSocialResList = []
        let reg = /^(0|[1-9][0-9]*)$/
        if (this.titles == ''&&this.cityshow) {
          this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>请设置标题</p>",
            onOk: () => {
              this.loading3 = false
            },
            onCancel: () => {
              this.loading3 = false
            }
          })
          return false 
        }
        if ((!/^.{1,50}$/.test(this.titles))&&this.cityshow) {
          this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>请输入正确标题</p>",
            onOk: () => {
              this.loading3 = false
            },
            onCancel: () => {
              this.loading3 = false
            }
          })
          return false 
        }
        for (let k = 0; k < this.pricesetting.userSocialResList.length; k++) {
          if (this.pricesetting.userSocialResList[k].socialScore === "") {
            this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false 
          }
          if (!reg.test(this.pricesetting.userSocialResList[k].socialScore)) {
            this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置正确的用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false 
          }
          if (this.pricesetting.userSocialResList[k].socialScore>9999) {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>用户身价不得大于9999</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
          
        }
        for (let i = 0; i < this.pricesetting.businessSocialResList.length; i++) {
          for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
            let obj = new Object ()
            obj.infoOptionKey = this.pricesetting.businessSocialResList[i].options[j].infoOptionKey
            if (this.pricesetting.businessSocialResList[i].options[j].infoOptionScore === '') {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
            if (!reg.test(this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)) {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>请设置正确的用户身价</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
            if (this.pricesetting.businessSocialResList[i].options[j].infoOptionScore>9999) {   
              this.$Modal.confirm({
                title: "温馨提示",
                content: "<p>用户身价不得大于9999</p>",
                onOk: () => {
                  this.loading3 = false
                },
                onCancel: () => {
                  this.loading3 = false
                }
              })
              return false            
            }
            obj.infoOptionScore = this.pricesetting.businessSocialResList[i].options[j].infoOptionScore
            businessSocialResList.push(obj)
          }
        }
        this.$Modal.confirm({
          title: "温馨提示",
          loading: true,
          content: "<p>确认保存提交审核吗?</p>",
          onOk: () => {
            let list = {
              socialTitle :this.titles,//标题
              provinceBeans :this.fruit,//城市
              confType :0,
              socialScope :this.minbeannum+'-'+this.maxbeannum+'赞豆',
              userSocialResList: this.pricesetting.userSocialResList,//身价
              businessSocialResList: this.pricesetting.businessSocialResList,
              // specialConfigResList : this.pricesetting.businessSocialResList
            }
            if (this.$route.query.operationtype) {
              list.socialConfigCode = this.$route.query.socialConfigCode
            }
            if (this.$route.query.cityshow == 0) {
              list.defaultConf = 1
            } else if (this.$route.query.cityshow == 1){
              list.defaultConf = 0
            }
            this.http.post(BASE_URL + '/loan/loanSocialConfig/updateSocialConfigByCode', list)
              .then((resp) => {
                if (resp.code == 'success') {
                  setTimeout(() => {
                    this.$Modal.remove();
                    this.modal3 = true
                    this.loading3 = false
                  }, 500);
                } else {
                  this.loading3 = false
                  this.$Modal.remove(); 
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
      handleRender2 () {  //用户身价配置日志
        this.$router.push({ path: './operationLog?operationType=user_social_edit' })
      },
      // 初始化
      inquireabout () {
        let data = {
          confType :0
        }
        if (this.$route.query.socialConfigCode) {
          data.socialConfigCode = this.$route.query.socialConfigCode
        }
          this.http.post(BASE_URL + '/loan/loanSocialConfig/getSocialConfigDetail', data)
            .then((resp) => {
              if (resp.code == 'success') {
                let minnum = 0
                let maxnum = 0
                let minafternum = 0
                let maxafternum = 0
                if (resp.data.socialConfigDetailRes!=null) {
                  this.titles = resp.data.socialConfigDetailRes.socialTitle
                  this.pricesetting.userSocialResList = resp.data.socialConfigDetailRes.userSocialResList
                  this.pricesetting.businessSocialResList = resp.data.socialConfigDetailRes.businessSocialResList
                  if (resp.data.socialConfigDetailRes.provinceBeans!=null) {
                    let arrnum = []
                    for (let a = 0; a < this.conurbationlist.length; a++) {
                    for (let b = 0; b < resp.data.socialConfigDetailRes.provinceBeans.length; b++) {
                      if (this.conurbationlist[a].code == resp.data.socialConfigDetailRes.provinceBeans[b].code) {
                        if (resp.data.socialConfigDetailRes.provinceBeans[b].cityList.length == this.conurbationlist[a].cityList.length) {
                          this.data7.frontcitylist[a].checkAll = true
                          arrnum.push('1')
                        } else {
                          this.data7.frontcitylist[a].checkAll = false
                        }
                        let citylist = []
                        for (let k = 0; k < resp.data.socialConfigDetailRes.provinceBeans[b].cityList.length; k++) {
                          citylist.push(resp.data.socialConfigDetailRes.provinceBeans[b].cityList[k].code)
                        }
                        this.data7.frontcitylist[a].checkAllGroup = citylist
                      }
                    }
                  }
                  this.fruit = resp.data.socialConfigDetailRes.provinceBeans
                  if (arrnum.length==31) {
                    this.election = '全不选'
                  }
                  }
                  for (let i = 0; i < resp.data.socialConfigDetailRes.businessSocialResList.length; i++) {
                  if (
                    resp.data.socialConfigDetailRes.businessSocialResList[i].infoTitleName == '贷款金额'||
                    resp.data.socialConfigDetailRes.businessSocialResList[i].infoTitleName == '贷款期限'||
                    resp.data.socialConfigDetailRes.businessSocialResList[i].infoTitleName == '职业类型'||
                    resp.data.socialConfigDetailRes.businessSocialResList[i].infoTitleName == '月收入'||
                    resp.data.socialConfigDetailRes.businessSocialResList[i].infoTitleName == '工资发放形式'
                    ) {
                      let arr = []
                      for (let j = 0; j < resp.data.socialConfigDetailRes.businessSocialResList[i].options.length; j++) {
                        arr.push (resp.data.socialConfigDetailRes.businessSocialResList[i].options[j].infoOptionScore)
                      }
                      minnum += arr.sort(this.compare)[0]
                      maxnum += arr.sort(this.compare)[arr.sort(this.compare).length-1]
                  } else {
                    for (let j = 0; j < resp.data.socialConfigDetailRes.businessSocialResList[i].options.length; j++) {
                        maxnum+=resp.data.socialConfigDetailRes.businessSocialResList[i].options[j].infoOptionScore
                      }
                  }         
                }
                this.minbeannum = minnum+Number(this.pricesetting.userSocialResList[0].socialScore)
                this.maxbeannum = maxnum+Number(this.pricesetting.userSocialResList[0].socialScore)+Number(this.pricesetting.userSocialResList[1].socialScore)
                }

                if (resp.data.updateSocialConfigDetailRes!=null) {
                  this.verifytitles = resp.data.updateSocialConfigDetailRes.socialTitle
                  this.pricesetafter.userSocialResList = resp.data.updateSocialConfigDetailRes.userSocialResList
                  this.pricesetafter.businessSocialResList = resp.data.updateSocialConfigDetailRes.businessSocialResList
                  if (resp.data.updateSocialConfigDetailRes.provinceBeans.length>0) {
                    let arrnum = []
                    for (let i = 0; i < this.conurbationlist.length; i++) {
                    for (let j = 0; j < resp.data.updateSocialConfigDetailRes.provinceBeans.length; j++) {
                      if (this.conurbationlist[i].code == resp.data.updateSocialConfigDetailRes.provinceBeans[j].code) {
                        if (resp.data.updateSocialConfigDetailRes.provinceBeans[j].cityList.length == this.conurbationlist[i].cityList.length) {
                          this.data7.aftercitylist[i].checkAll = true
                          arrnum.push('1')
                        } else {
                          this.data7.aftercitylist[i].checkAll = false
                        }
                        let citylist = []
                        for (let k = 0; k < resp.data.updateSocialConfigDetailRes.provinceBeans[j].cityList.length; k++) {
                          citylist.push(resp.data.updateSocialConfigDetailRes.provinceBeans[j].cityList[k].code)
                        }
                        this.data7.aftercitylist[i].checkAllGroup = citylist
                      }
                    }
                  }
                  this.fruit = resp.data.updateSocialConfigDetailRes.provinceBeans
                  if (arrnum.length==31) {
                    this.afterelection = '全不选'
                  }
                  }
                  
                  for (let a = 0; a < resp.data.updateSocialConfigDetailRes.businessSocialResList.length; a++) {
                  if (
                    resp.data.updateSocialConfigDetailRes.businessSocialResList[a].infoTitleName == '贷款金额'||
                    resp.data.updateSocialConfigDetailRes.businessSocialResList[a].infoTitleName == '贷款期限'||
                    resp.data.updateSocialConfigDetailRes.businessSocialResList[a].infoTitleName == '职业类型'||
                    resp.data.updateSocialConfigDetailRes.businessSocialResList[a].infoTitleName == '月收入'||
                    resp.data.updateSocialConfigDetailRes.businessSocialResList[a].infoTitleName == '工资发放形式'
                    ) {
                      let arr = []
                      for (let b = 0; b < resp.data.updateSocialConfigDetailRes.businessSocialResList[a].options.length; b++) {
                        arr.push (resp.data.updateSocialConfigDetailRes.businessSocialResList[a].options[b].infoOptionScore)
                        // maxafternum+=resp.data.updateSocialConfigDetailRes.businessSocialResList[a].options[b].infoOptionScore
                      }
                      minafternum += arr.sort(this.compare)[0]
                      maxafternum += arr.sort(this.compare)[arr.sort(this.compare).length-1]
                  } else {
                    for (let c = 0; c < resp.data.updateSocialConfigDetailRes.businessSocialResList[a].options.length; c++) {
                        maxafternum+=resp.data.updateSocialConfigDetailRes.businessSocialResList[a].options[c].infoOptionScore
                      }
                  }         
                }
                this.minafterbeannum = minafternum+Number(this.pricesetafter.userSocialResList[0].socialScore)
                this.maxafterbeannum = maxafternum+Number(this.pricesetafter.userSocialResList[0].socialScore)+Number(this.pricesetafter.userSocialResList[1].socialScore)
                }
                if (!this.$route.query.afteraudit) {
                  this.verifyshow = true
                }
                
                if (this.$route.query.operationtype == 1) {
                  this.auditing = true
                  if (resp.data.updateSocialConfigDetailRes == null) {
                    this.seeshow = false
                  } else {
                    this.seeshow = true
                  }
                } else if(this.$route.query.operationtype == 2) {
                  if (resp.data.updateSocialConfigDetailRes == null) {
                    this.auditing = false
                    this.seeshow = false
                  } else {
                    this.configAuditCode = resp.data.configAuditCode
                    this.auditing = false
                    this.seeshow = false
                  }                  
                } else if(this.$route.query.operationtype == 3) {
                  if (resp.data.updateSocialConfigDetailRes == null) {
                    this.auditing = false
                    this.seeshow = false
                  } else {
                    this.configAuditCode = resp.data.configAuditCode
                    this.auditing = true
                    this.seeshow = true
                  } 
                  if (this.$route.query.afteraudit&&resp.data.socialConfigDetailRes!=null) {
                    this.verifyshow = true
                  }                 
                }
                

              } else {
              }
            })
            .catch(() => {
            })

      },
      // 审核权限判断
      toexamine () {
        this.http.post(BASE_URL + "/checkUriPermission", ['/loan/loanSocialConfig/updateSocialConfigByCode']).then(data=>{
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
      // 用户身价设置审核
      examineSubmit (name) {
        this.loading = true
        this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
            let data = {
                auditStatus : this.formCustomexa.activeType,
                auditRemark : this.formCustomexa.remarks,
                configAuditCode:this.configAuditCode
            }
            this.http.post(BASE_URL + '/loan/loanSocialConfig/auditSocialConfig', data)
            .then(data=>{
                if (data.code == 'success') {
                  this.loading = false
                  this.modal9 = false
                    const title = '审核'
                    const content = '<p>审核成功</p>'
                    this.$Modal.success({
                        title: title,
                        content: content,
                        onOk: () => {
                          this.$router.push({path:'/operate'})
                        }
                    })
                } else {
                  this.modal9 = false
                  this.loading = false
                  this.$Message.info(data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
          // this.changeLoading()
          // this.modal9 = false
      })
      },
      // 取消
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
      changeLoading () {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      },
      allElection () { //全选      
        if (this.election == '全不选') {
          this.election = '全选'
          this.fruit = []
          for (let i = 0; i < this.data7.frontcitylist.length; i++) {
            this.data7.frontcitylist[i].checkAll = false
            this.data7.frontcitylist[i].checkAllGroup = []
          }
        } else {
          this.election = '全不选'
          for (let i = 0; i < this.data7.frontcitylist.length; i++) {
            this.data7.frontcitylist[i].checkAll = true
            let citylist = []
            for (let j = 0; j < this.conurbationlist[i].cityList.length; j++) {
              citylist.push(this.conurbationlist[i].cityList[j].code)
            }
            this.data7.frontcitylist[i].checkAllGroup = citylist
          }
          this.fruit = this.conurbationlist
        }
      },
      // 选择省
			handleCheckAll(index, code) {
				this.data7.frontcitylist[index].checkAll = !this.data7.frontcitylist[index].checkAll;
        if(this.data7.frontcitylist[index].checkAll) {//选中
          if (this.fruit.length>0) {
            let arr = []
              this.fruit.forEach((v, i) => {
                arr.push(v.code)
              })
              if (arr.indexOf(code)==-1) {
                  this.fruit.push(this.conurbationlist[index])
                }else {
                  this.fruit[arr.indexOf(code)].cityList = this.conurbationlist[index].cityList
                }
            }else {
              this.fruit.push(this.conurbationlist[index])
            }
					// this.fruit.push(this.conurbationlist[index]) //省code
					let citylist = []
					for(let i = 0; i < this.conurbationlist[index].cityList.length; i++) {
						citylist.push(this.conurbationlist[index].cityList[i].code)
					}
          this.data7.frontcitylist[index].checkAllGroup = citylist;
				} else {//取消
					this.data7.frontcitylist[index].checkAllGroup = [];
					this.fruit.forEach((v, i) => {
						if(v.code == code) {
							this.fruit.splice(i, 1)
						}
          })
        }
			},
			// 选择市
			checkAllGroupChange(code,data, index) {
				if(data.length === this.conurbationlist[index].cityList.length) {
          this.data7.frontcitylist[index].checkAll = true;
          if (this.fruit.length>0) {
            this.fruit.forEach((v, i) => {
              if(v.code == code) {
                let list = []
                for (let i = 0; i < this.conurbationlist[index].cityList.length; i++) {
                  for (let j = 0; j < data.length; j++) {
                    if (this.conurbationlist[index].cityList[i].code == data[j]) {
                      list.push(this.conurbationlist[index].cityList[i])
                    }                  
                  }
                }
                v.cityList = list
              }
            })
          }else {
            this.fruit.push(this.conurbationlist[index])
          }
				} else if(data.length > 0) {
          this.data7.frontcitylist[index].checkAll = false;
          if (this.fruit.length>0) {
            let arr = []
            let list = []
            for (let i = 0; i < this.conurbationlist[index].cityList.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (this.conurbationlist[index].cityList[i].code == data[j]) {
                  list.push(this.conurbationlist[index].cityList[i])
                }                  
              }
            }
            this.fruit.forEach((v, i) => {
              arr.push(v.code)
            })
            if (arr.indexOf(code) == -1) {
              let obj = new Object ()
              obj.cityList = list
              obj.code = this.conurbationlist[index].code
              obj.name = this.conurbationlist[index].name
              this.fruit.push(obj)
            } else {
              this.fruit[arr.indexOf(code)].cityList = list
            }
          }else {
            let obj = new Object()
            let list = []
            for (let i = 0; i < this.conurbationlist[index].cityList.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (this.conurbationlist[index].cityList[i].code == data[j]) {
                  list.push(this.conurbationlist[index].cityList[i])
                }                  
              }
            }
            obj.cityList = list
            obj.code = code
            obj.name = this.conurbationlist[index].name
            this.fruit.push(obj)
          }
				} else {
					this.data7.frontcitylist[index].checkAll = false;
          this.fruit.forEach((v, i) => {
            if(v.code == code) {
              this.fruit.splice(i, 1) //
            }
          })
        }
			},
      // 排序
      compare (val1,val2) {
        return val1-val2;

      },
      valuechange (val) {
        let minnum = 0
        let maxnum = 0
        let reg = /^(0|[1-9][0-9]*)$/;
        for (let i = 0; i < this.pricesetting.businessSocialResList.length; i++) {
          if (
            this.pricesetting.businessSocialResList[i].infoTitleName == '贷款金额'||
            this.pricesetting.businessSocialResList[i].infoTitleName == '贷款期限'||
            this.pricesetting.businessSocialResList[i].infoTitleName == '职业类型'||
            this.pricesetting.businessSocialResList[i].infoTitleName == '月收入'||
            this.pricesetting.businessSocialResList[i].infoTitleName == '工资发放形式'
            ) {
              let arr = []
              for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
                if (!reg.test(this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)||
                    !reg.test(this.pricesetting.userSocialResList[0].socialScore)||
                    !reg.test(this.pricesetting.userSocialResList[1].socialScore)) {
                  this.$Modal.confirm({
                    title: "温馨提示",
                    content: "<p>请设置正确的用户身价</p>",
                  })
                  return false 
                }
                if (this.pricesetting.businessSocialResList[i].options[j].infoOptionScore>9999) {
                  this.$Modal.confirm({
                    title: "温馨提示",
                    content: "<p>用户身价不得大于9999</p>",
                  })
                  return false 
                }
                arr.push (this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)
              }
              minnum += Number(arr.sort(this.compare)[0])
              maxnum += arr.sort(this.compare)[arr.sort(this.compare).length-1]
          } else {
            for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
                if (!reg.test(this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)||
                    !reg.test(this.pricesetting.userSocialResList[0].socialScore)||
                    !reg.test(this.pricesetting.userSocialResList[1].socialScore)
                ) {
                  this.$Modal.confirm({
                    title: "温馨提示",
                    content: "<p>请设置正确的用户身价</p>",
                  })
                  return false 
                }
                maxnum+=Number(this.pricesetting.businessSocialResList[i].options[j].infoOptionScore)
              }
          }         
        }
        this.minbeannum = minnum+Number(this.pricesetting.userSocialResList[0].socialScore)
        this.maxbeannum = maxnum+Number(this.pricesetting.userSocialResList[0].socialScore)+Number(this.pricesetting.userSocialResList[1].socialScore)

      },
      // 返回
      backingOut () {
        window.history.go(-1);
      },
      tagging () {
          this.$router.push({ path: "./valueSettingList" });    
      },
      del () {
        this.modal2 = false
      },
  },
  mounted () {
    if (this.$route.query.cityshow == 1) {
      this.cityshow = true
    } else {
      this.cityshow = false
    }
    // 城市
    this.http.get("../../../static/provinces.json")
    .then(data=>{
          this.data7.frontcitylist = []
          this.data7.aftercitylist = []
        for(let i = 0; i < data.provinceBeans.length; i++) {
          let obj = new Object()
          obj.checkAll = false
          obj.checkAllGroup = []
          this.data7.frontcitylist.push(obj)
          // this.data7.aftercitylist.push(obj)
        }
        for(let j = 0; j < data.provinceBeans.length; j++) {
          let obj = new Object()
          obj.checkAll = false
          obj.checkAllGroup = []
          this.data7.aftercitylist.push(obj)
        }
          this.conurbationlist = data.provinceBeans
          this.inquireabout ()  
    })
    .catch((error) => {
        console.log(error)
    })
         
  },
  created () {
    
  }
};
</script>
<style lang="less" scoped>

</style>
