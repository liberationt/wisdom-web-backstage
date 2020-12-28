<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞&nbsp;>&nbsp;客户管理&nbsp;>&nbsp;已分配会员列表</span>
      </p>
    </div>
    <div class="contentcss">
        <div class=" clearfix">
              <ul class="querysty">
                  <li class="mr10">
                    <Select v-model="seatnum" placeholder="坐席编号" class="" style="width:120px">
                        <Option v-for="item in seatnumlist" :value="item.seatCode" :key="item.seatCode">{{ item.seatNo }} {{item.seatName}}</Option>
                    </Select>
                  </li>
                  <li class="mr10">
                  <Select v-model="queryCriteria" placeholder="请选择查询条件" class="" style="width:130px">
                    <Option v-for="item in queryCriterialist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Input class="mr10" v-model="queryCriteriavalue" placeholder="请输入"  style="width: 150px">
                  </Input>
                </li>
                
                <li class="mr10">
                  <Select v-model="perfect" placeholder="是否完善信息" class="mr10" style="width:110px">
                    <Option  value="">全部</Option>
                    <Option  value="1">是</Option>
                    <Option  value="0">否</Option>
                  </Select>
                </li>
                <li class="mr10">
                  <Select v-model="warehousing" placeholder="是否入库" class="mr10" style="width:90px">
                    <Option  value="">全部</Option>
                    <Option  value="1">是</Option>
                    <Option  value="0">否</Option>
                  </Select>
                </li>              
                <li class="mr10">
                  <Select v-model="model2" @on-change="citys" placeholder="请选择省" style="width:150px;">
                    <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr10">
                  <Select v-model="model3" placeholder="请选择市" style="width:150px;margin-left:10px">
                    <Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr10">
                    <Select v-model="robs" placeholder="是否被抢" class="" style="width:90px">
                      <Option  value="">全部</Option>
                      <Option  value="1">是</Option>
                      <Option  value="0">否</Option>
                    </Select>
                  </li>
                  <li class="mr10">
                    <Select v-model="aisigntype" placeholder="AI标记状态" class="" style="width:90px">
                      <Option  value="">全部</Option>
                      <Option  value="0">无操作</Option>
                      <Option  value="1">已导出</Option>
                      <Option  value="2">已审核</Option>
                    </Select>
                  </li>
                  <li class="mr10">
                    <Select v-model="nametype" placeholder="名单状态" class="" style="width:90px">
                      <Option  value="">全部</Option>
                      <Option  value="0">未标记</Option>
                      <Option  value="1">有效名单</Option>
                      <Option  value="2">无效名单</Option>
                    </Select>
                  </li>
                  <li class="mr10">
                    <Select v-model="dialtype" placeholder="拨打状态" class="" style="width:90px">
                        <Option  value="">全部</Option>
                      <Option  value="0">未拨打</Option>
                      <Option  value="1">已拨打</Option>
                    </Select>
                  </li>
                <li class="mr10">
                  <Select v-model="registrationtime" placeholder="注册时间" class="" style="width:90px">
                    <Option v-for="item in orderStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <DatePicker type="date" :options="options3" @on-change="Stime" :value="ConsultationTime" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" @on-change="Etime" :value="ConsultationEndTime" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <li class="mr10">
                    <Select v-model="timesequencing" placeholder="请选择" class="" style="width:120px">
                      <Option  value="" >请选择</Option>
                    <Option v-for="item in timesequencingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>               
                </li>
                <li class="mr10">
                    <span>查询数量:</span>
                    <InputNumber :max="300000" :min="1" v-model="num1"></InputNumber>               
                </li>
                <li>
                  <Button type="info" class=" mr10 w90" :loading="loading3" @click="consultingorders(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                  <Button type="primary" class="mr10 " @click="batchAllocation"  >批量修改分配</Button>
                </li>              
              </ul>
              <Modal
                title="修改分配"
                v-model="modal1"
                class-name="vertical-center-modal"
                @on-ok="handleSubmit2('formValidate')"
                @on-cancel="handleReset2('formValidate')"
                :loading="loading"
                :mask-closable="false">
                <div>
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">     
                        <FormItem label="名单人数" >
                            <span>{{formValidate.numpeop}}</span>
                        </FormItem>
                        <FormItem label="原坐席" v-if="primarys">
                            <span>{{formValidate.primaryseat}}</span>
                        </FormItem>
                        <FormItem label="新坐席" prop="seatNumber">
                            <Select v-model="formValidate.seatNumber" style="width:200px" placeholder="请选择">
                                <Option v-for="item in seatnumlist" :value="item.seatCode" :key="item.seatCode">{{ item.seatNo }} {{item.seatName}}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>
              </Modal>
              <Modal
              title="拨打电话"
                v-model="modal2"
                ok-text="确认"
                cancel-text="取消"
                @on-ok="dialing"
                width='300'
                :mask-closable="false"
                class-name="vertical-center-modal">
                <p>确认拨打客户 {{nametitle}} 的电话吗?</p>
              </Modal>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row @on-select-all="allcheckouttrue"  @on-selection-change='selectionChange' :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>

    </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {
            options3: {
                disabledDate(date) {
                return date && date.valueOf() > Date.now();
                }
            },
            queryCriteria:'',//查询条件下拉框
            queryCriteriavalue:'',//查询条件value
            queryCriterialist:[],//查询条件下拉框list
            loanUserCodeList:[],//分配code
            selectionChangecodelist:[],
            loanUserCode:'',
            nametitle:'',
            status1:[],
            cityType1:[],
            orderStatusList:[],
            timesequencingList:[],
            equityList:[],
            seatnumlist:[],
            roblist:[],
            aisigntypelist:[],
            nametypelist:[],
            dialtypelist:[],
            seatnum:'',
            perfect:'',
            warehousing:'',
            model2:'',
            model3:'',
            registrationtime:'',
            ConsultationTime:'',
            ConsultationEndTime:'',
            timesequencing:'',
            robs:'',
            aisigntype:'',
            nametype:'',
            dialtype:'',
            num1:null,
            primarys:true,
            loading: true,
            loading3: false,
            loading2: false,
            modal1:false,
            modal2:false,
            allcheck:false,
            total: 0,
            startRow: 1,
            endRow: 10,
            numpeop:'',
            formValidate: {
                numpeop: '1人',
                primaryseat:'1001haha',
                seatNumber:''
            },
            ruleValidate: {
                seatNumber: [
                { required: true,  message: '请选择坐席编号', trigger: 'change' }
                ]
            },

            columns7: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
          title: '坐席',
          key: 'orderCreateTime',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.seatNo +params.row.seatName )
            ])
          }
        },
        {
          title: '手机号',
          key: 'phoneNumber',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'memberName',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '城市',
          align: 'center',
          minWidth: 160,
          render: (h, params) => {
            let pushStatus = params.row.loanCityNameFirst +' '+params.row.loanCityNameSecond            
            return h('div', [
              h('span', {}, pushStatus)
            ])
          }
        },
        {
          title: '是否被抢',
          key: 'loanUserName',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            let loanIsRob 
            if (params.row.loanIsRob == 0) {
              loanIsRob = '否'
            } else if (params.row.loanIsRob == 1) {
              loanIsRob = '是'
            }
            return h('div', [
              h('span', {}, loanIsRob)
            ])
          }
        },
        {
          title: '是否入库',
          key: 'loanUserName',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            let isInfoPass  
            if (params.row.isInfoPass == 0) {
              isInfoPass = '否'
            } else if (params.row.isInfoPass == 1) {
              isInfoPass = '是'
            }
            return h('div', [
              h('span', {}, isInfoPass)
            ])
          }
        },
        {
          title: '是否完善信息',
          key: 'loanUserPhone',
          minWidth: 110,
          align: 'center',
          render: (h, params) => {
            let loanPerfectInfo   
            if (params.row.loanPerfectInfo == 0) {
              loanPerfectInfo = '未完善'
            } else if (params.row.loanPerfectInfo == 1) {
              loanPerfectInfo = '已完善'
            }
            return h('div', [
              h('span', {}, loanPerfectInfo)
            ])
          }
        },
        {
          title: '注册渠道',
          key: 'channelCode',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '名单状态',
          key: 'officerPhone',
          minWidth: 110,
          align: 'center',
          render: (h, params) => {
            let listStatus    
            if (params.row.listStatus == 0) {
              listStatus = '未标记'
            } else if (params.row.listStatus == 1) {
              listStatus = '有效名单'
            } else if (params.row.listStatus == 2) {
              listStatus = '无效名单'
            }
            return h('div', [
              h('span', {}, listStatus)
            ])
          }
        },
        {
          title: 'AI标记',
          key: 'orderStatusName',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let aiSign     
            if (params.row.aiSign == 0) {
              aiSign = '无操作'
            } else if (params.row.aiSign == 1) {
              aiSign = '已导出'
            } else if (params.row.aiSign == 2) {
              aiSign = '已审核'
            }
            return h('div', [
              h('span', {}, aiSign)
            ])
          }
        },
        {
          title: '注册时间',
          key: 'registerTime',
          minWidth: 160,
          align: 'center'
        },        
        {
          title: '更新资料时间',
          key: 'loanInfoUpdateTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '分配时间',
          key: 'allotTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '最后通话时间',
          key: 'lastDialTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '拨打状态',
          key: 'serviceCost',
          minWidth: 110,
          align: 'center',
          render: (h, params) => {
            let talkStatus     
            if (params.row.talkStatus == 0) {
              talkStatus = '未拨打'
            } else if (params.row.talkStatus == 1) {
              talkStatus = '已拨打'
            }
            return h('div', [
              h('span', {}, talkStatus)
            ])
          }
        },
        {
          title: '最后拨打备注',
          key: 'lastDialRemark',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let arr = []
            arr.push(
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: './customerDetails?loanUserCode='+params.row.loanUserCode+"&num=1"+'&dialRecordCode=' })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.formValidate.numpeop = '1人'
                      this.modal1 = true
                      this.primarys = true
                      this.formValidate.primaryseat = params.row.seatNo+params.row.seatName
                      if (this.formValidate.numpeop == '1人') {
                        this.loanUserCodeList.push(params.row.loanUserCode)
                      }
                    }
                  }
                },
                '修改分配'
              ),
              h(
                'Button',
                {
                    props: {
                        type: "primary",
                        size: "small"
                      },
                      on:{
                          click:()=>{
                            this.nametitle = params.row.realName
                            this.loanUserCode = params.row.loanUserCode
                            this.berobbed ()
                            
                          }
                      }
                },
                '拨打'
              )
            )
            return h('div', arr)
          }
        }
      ],
      data6: [],
            
        }
    },
    methods: {
    //省 
    citys(v){
      let data = {
        "data": v
      }
      this.httpshi(data)
      // this.model2 = v
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
          this.status1 = data.data   
      })
    },
    pageChange (page) {
      this.startRow = page
      this.consultingorders (this.startRow)

    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.consultingorders (1)
    },
    // 查询
    consultingorders (startRow) {
      this.selectionChangecodelist = []
      this.loading3 = true
      let date1 = Date.parse(new Date(this.ConsultationTime)) / 1000;			
			let date2 = Date.parse(new Date(this.ConsultationEndTime)) / 1000
      if (date1 > date2) {
        this.loading3 = false
        this.isDatetime()
        return false
      }
      let list = {
        seatCode :this.seatnum,//坐席编号
        key:this.queryCriteria,//查询key
        value:this.queryCriteriavalue,//查询value
        loanPerfectInfo :this.perfect,//完善信息
        isInfoPass :this.warehousing,//是否入库
        loanAdCodeFirst :this.model2,//省
        loanAdCodeSecond :this.model3,//市
        loanIsRob :this.robs,//是否被抢
        aiSign :this.aisigntype,//AI标记
        listStatus :this.nametype,//名单状态
        talkStatus :this.dialtype,//拨打状态
        queryTime  :this.registrationtime,//时间
        startTime :this.ConsultationTime,//开始时间
        lastTime :this.ConsultationEndTime,//结束时间
        queryTimeOrder :this.timesequencing,//时间排序
        limitNum:this.num1,//查询数量
        pageNum: startRow,
        pageSize: this.endRow,    
      }
      this.http.post(BASE_URL + '/sale/userinfo/queryAllotUserInfoPage', list)
        .then((resp) => {
          if (resp.code == 'success') {
            this.loading3 = false
            this.data6 = resp.data.dataList
            this.total = Number(resp.data.total)
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          } else {
            this.loading3 = false
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
    },
    // 时间校验提示框
    isDatetime(){
      this.$Modal.warning({
        title: "提示",
        content: "<p>开始时间不得大于结束时间</p>"
      });
    },
    // 添加/编辑
    handleSubmit2 (name) {
    this.$refs[name].validate(valid => {
        if (!valid) {
            this.changeLoading()
        } else {
            this.changeLoading()
            let list = {
              allotStatus:1,
              code :this.seatnum,//坐席编号
              key:this.queryCriteria,//查询key
              value:this.queryCriteriavalue,//查询value
              loanPerfectInfo :this.perfect,//完善信息
              isInfoPass :this.warehousing,//是否入库
              loanAdCodeFirst :this.model2,//省
              loanAdCodeSecond :this.model3,//市
              loanIsRob :this.robs,//是否被抢
              aiSign :this.aisigntype,//AI标记
              listStatus :this.nametype,//名单状态
              talkStatus :this.dialtype,//拨打状态
              queryTime  :this.registrationtime,//时间
              startTime :this.ConsultationTime,//开始时间
              lastTime :this.ConsultationEndTime,//结束时间
              queryTimeOrder :this.timesequencing,//时间排序
              limitNum:this.num1,//查询数量    
              loanUserCodeList:this.loanUserCodeList,
              seatCode:this.formValidate.seatNumber
            }
            if (this.allcheck) {
							list.loanUserCodeList = []
            }
            
            this.http.post(BASE_URL + '/sale/userinfo/batchDistributionLoanUser', list)
            .then((resp) => {
              if (resp.code == 'success') {
                this.modal1 = false
                this.$Modal.success({
                  title: '温馨提示',
                  content: '<p>分配成功</p>',
                  onOk: () => {
                    this.loanUserCodeList = []
                    this.consultingorders (1)
                  }
                })
                this.$refs[name].resetFields()
                
              } else {
                
              }
            })
            .catch(() => {
            })
            // this.$refs[name].resetFields()  
        }
    })
    },
    handleReset2 (name) {
      this.loanUserCodeList = []
        this.$refs[name].resetFields()         
    },
    changeLoading () {
        this.loading = false
        this.$nextTick(() => {
            this.loading = true
        })
    },
    // 点击全选
			allcheckouttrue (selection) {
				this.allcheck = true
			},
			// allcheckoutfalse (selection) {

			// 	this.allcheck = false
			// },
    // 分配code
    selectionChange (params) {    
      if (params.length<1) {
        this.allcheck = false
        this.selectionChangecodelist = []
        this.formValidate.numpeop = '1人'
      } else {
        this.selectionChangecodelist = []
        this.numpeop = params.length+'人'
        if (this.allcheck) {
						this.numpeop = this.total + '人'
						if (params.length<this.endRow&&params.length<this.total) {				
							this.allcheck = false
							this.numpeop = params.length + '人'
						}
					}
        for (let i = 0; i < params.length; i++) {
          this.selectionChangecodelist.push(params[i].loanUserCode)     
        }
      }
    },
    // 批量分配
    batchAllocation () {
      this.loanUserCodeList = this.selectionChangecodelist
      this.formValidate.numpeop = this.numpeop
      if (this.loanUserCodeList.length<1) {
        this.$Modal.warning({
        title: "提示",
        content: "<p>请先选择分配名单</p>"
      });
      return false
      } else {
        this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认要批量分配吗？</p>",
        onOk: () => {
          this.modal1 = true
          this.primarys = false
        },
        onCancel: () => {}
      });
      }     
    },
    //拨打电话
    dialing () {
        this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanUser", {loanUserCode:this.loanUserCode})
    .then(data => {
        if (data.code == 'success') {
          this.$Message.success(data.message)
          this.$router.push({ path: './customerDetails?loanUserCode='+this.loanUserCode+"&num=1"+'&dialRecordCode='+data.data.dialRecordCode })
        }else{
          this.$Message.error(data.message)
        }
    })
    .catch(err => {
        console.log(err);
    });
    },
    // 是否被抢
    berobbed () {
      this.http.post(BASE_URL + "/sale/userinfo/LoanUserIsRob", {loanUserCode:this.loanUserCode})
      .then(data => {
          if (data.code == 'success') {
            this.modal2=true
          }else{
            this.$Modal.error({
              title: '温馨提示',
              content: '<p>'+data.message+'</p>'
            })
          }
      })
      .catch(err => {
          console.log(err);
      });

    },
    Stime(v){
				if(v==''){
					this.ConsultationTime = v
				}else{					
					this.ConsultationTime=v+' 00:00:00'					
				}
			},
			Etime(v){
				if(v==''){
					this.ConsultationEndTime = v
				}else{
					this.ConsultationEndTime=v+' 23:59:59'
				}
			},
        
    },
    mounted () {
    this.http.post(BASE_URL + '/sale/userinfo/queryUserInfoPageFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.queryCriterialist = resp.data.conditionStr
        this.queryCriteria = resp.data.conditionStr[0].value
        this.timesequencingList = resp.data.order
        // this.timesequencing = resp.data.order[0].value
        this.registrationtime = resp.data.time[0].value
        this.queryCriteriaStay

      } else {
        this.$Message.info(resp.message)
      }
    })    
    .catch(() => {
    })
    this.http.post(BASE_URL + '/sale/userinfo/queryUserInfoPageAllotFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.orderStatusList = resp.data.time
      } else {
        this.$Message.info(resp.message)
      }
    })    
    .catch(() => {
    })
    this.http.post(BASE_URL + '/sale/userinfo/querySeatServiceFilter', {seatType: 2})
    .then((resp) => {
      if (resp.code == 'success') {
        this.seatnumlist = resp.data.saleRechargeRecordFilterRes
        this.consultingorders (1)

      } else {
        this.$Message.info(resp.message)
      }
    })    
    .catch(() => {
    })
    
    },
        // 省
    created () {
      this.http.get('../../../static/city.json').then(data=>{
        this.cityType1 = data
      })
    },

    
}
</script>
<style lang="less" scoped>

</style>


