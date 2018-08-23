<template>
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="125" class="addloan">
        <FormItem class="logoerr" >
            <Row>
                <Col span="11">
                    <FormItem label="产品LOGO:" prop="productLogo">
                        <img :src="logoUrl" alt="" style="width:80px;height:80px" class="left">                       
                        <Upload
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError1"
                        :before-upload="handleUpload"
                        :show-upload-list="false"                        
                        action=''>
                        <Button type="ghost" icon="ios-cloud-upload-outline" class="ml20" style="margin-top:24px">浏览</Button>
                        </Upload>
                        <Input v-model="formValidate.productLogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="显示标签:" prop="displayLabel">
                        <img :src="labelUrl" alt="" style="width:80px;height:80px" class="left">                     
                        <Upload
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError1"
                        :before-upload="handleUpload1"
                        :show-upload-list="false"                        
                        action=''>
                        <Button type="ghost" icon="ios-cloud-upload-outline" class="ml20" style="margin-top:24px">浏览</Button>
                        </Upload>
                        <Input v-model="formValidate.displayLabel" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="产品名称:" prop="productName">
                    <Input v-model="formValidate.productName" style="width:250px" placeholder="请输入产品名称"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="副标题:" prop="productSubhead">
                    <Input v-model="formValidate.productSubhead" style="width:250px" placeholder="请输入副标题"></Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="申请人基数:" prop="applyCounts">
                    <Input v-model.number="formValidate.applyCounts" style="width:250px" placeholder="请输入申请人基数"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="申请人系数:" prop="applyCountsRatio">
                    <Input v-model.number="formValidate.applyCountsRatio" style="width:250px" placeholder="请输入申请人系数">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="产品搜索页特点:" prop="productSearchFeature">
                    <Input v-model="formValidate.productSearchFeature" style="width:250px" placeholder="请输入产品搜索页特点"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="产品详情页特点:" prop="productDetailFeature">
                    <Input v-model="formValidate.productDetailFeature" style="width:250px" placeholder="请输入产品详情页特点"></Input>                      
                </FormItem>
            </Col>
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="前端显示:" prop="rateType">
                    <Select v-model.number="formValidate.rateType" placeholder="请选择" @on-change="ratetypepeset" style="width:250px">
                        <Option value="0">月利率</Option>
                        <Option value="1">日利率</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="参考月利率:" prop="rateMouth" v-if="!ratetypeshow">
                    <Input v-model.number="formValidate.rateMouth" style="width:250px" placeholder="请输入参考月利率">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
                <FormItem label="参考日利率:" prop="rateDay" v-if="ratetypeshow">
                    <Input v-model.number="formValidate.rateDay" style="width:250px" placeholder="请输入参考日利率">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="还款方式:" prop="repaymentMode">
                    <Select v-model.number="formValidate.repaymentMode" placeholder="请选择" style="width:250px">
                        <Option value="0">按月还款</Option>
                        <Option value="1">随借随还</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="放款时间:" prop="loanTime">
                    <Input v-model="formValidate.loanTime" style="width:250px" placeholder="请输入放款时间"></Input>                     
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="额度类型:" prop="limitType">
                    <Select v-model.number="formValidate.limitType" placeholder="请选择" @on-change="quotatypeset" style="width:250px">
                        <Option value="0">范围</Option>
                        <Option value="1">固定</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="期限类型:" prop="termType">
                    <Select v-model.number="formValidate.termType" placeholder="请选择" @on-change="termtypeset" style="width:250px">
                        <Option value="0">范围</Option>
                        <Option value="1">固定</Option>
                    </Select>                      
                </FormItem>
            </Col>         
        </FormItem>

        <FormItem class="toconfigure" >
            <Row>
            <Col span="11">
                <FormItem label="额度范围:" v-if="!quotashow">
                    <Input v-model.number="formValidate.limitMin" style="width:90px" placeholder="请输入起始金额"></Input>
                    <span>&nbsp;至&nbsp;</span>
                    <Input v-model.number="formValidate.limitMax" style="width:90px" placeholder="请输入结束金额"></Input>
                    <span>元</span>
                </FormItem>
                <FormItem label="额度1:" v-if="quotashow">
                    <!-- <Input v-model="formValidate.subtitle" style="width:300px" placeholder="持中国居民身份证的中国公民 20-35周岁"></Input> -->
                    <div class="credit_recharge">
                            <div
                             v-for="(item, index) in quotamoney"
                             :key="index"
                             :class="index==0 ? 'mb15 clearfix' : 'mb15 clearfix ml125' "
                             >
                            <Input type="text" v-model="item.detailValue" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px">
                            <span slot="append">元</span>
                            </Input>                        
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal(1)">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(1,index)">-</Button>
                        </div>
                        </div>
                </FormItem>

            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="期限范围:" v-if="!termshow">
                    <Input v-model.number="formValidate.termMin" style="width:100px" placeholder="请输入起始期限值"></Input>
                    <span>&nbsp;至&nbsp;</span>
                    <Input v-model.number="formValidate.termMax" style="width:100px" placeholder="请输入结束期限值"></Input>
                    <span>月</span>
                </FormItem>
                <FormItem label="期限1:" v-if="termshow">
                    <!-- <Input v-model="formValidate.subtitle" style="width:300px" placeholder="持中国居民身份证的中国公民 20-35周岁"></Input> -->
                    <div class="credit_recharge">
                            <div
                             v-for="(item, index) in termmoney"
                             :key="index"
                             :class="index==0 ? 'mb15 clearfix' : 'mb15 clearfix ml125' "
                             >
                            <Input type="text" v-model="item.detailValue" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px">
                            <span slot="append">月</span>
                            </Input>                        
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal(3)">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(3,index)">-</Button>
                        </div>
                        </div>
                </FormItem>
            </Col>
            </Row>
        </FormItem>

        <FormItem  >
            <Row>
            <Col span="11">
                <FormItem label="默认额度:" prop="limitDefault">
                    <Input v-model.number="formValidate.limitDefault" style="width:250px" placeholder="请输入默认额度">
                    <span slot="append">元</span>
                    </Input>                      
                </FormItem>                
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="默认期限:" prop="termDefault">
                    <Input v-model.number="formValidate.termDefault" style="width:250px" placeholder="请输入默认期限">
                    <span slot="append">月</span>
                    </Input>                      
                </FormItem>
            </Col>
            </Row>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="申请流程:" prop="applyFlow">
                    <CheckboxGroup v-model="applyFlowlc" @on-change="applyFlowChange">
                        <Checkbox v-for="item in applyFlow" :label="item.productParamCode">{{item.productParamName}}</Checkbox>
                        
                    </CheckboxGroup>
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="申请资料:" prop="applyInformation">
                    <CheckboxGroup v-model="applyInformation" @on-change="applyConditionChange">
                        <Checkbox v-for="item in applyCondition" :label="item.productParamCode">{{item.productParamName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="15">
                <FormItem label="申请条件1:" >
                    <!-- <Input v-model="formValidate.subtitle" style="width:300px" placeholder="持中国居民身份证的中国公民 20-35周岁"></Input> -->
                    <div class="credit_recharge">
                            <div
                             v-for="(item, index) in addnormals"
                             :key="index"
                             :class="index==0 ? 'mb15 clearfix' : 'mb15 clearfix ml125' "
                             >
                            <Input type="text" v-model="item.detailValue" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px"></Input>                        
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal(2)">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(2, index)">-</Button>
                        </div>
                        </div>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="自动下架:" prop="autoOff">
                    <Select v-model.number="formValidate.autoOff" placeholder="请选择" @on-change="lowertypeset" style="width:250px">
                        <Option value="0">开启</Option>
                        <Option value="1">关闭</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="是否热门:" prop="isHot">
                    <Select v-model.number="formValidate.isHot" placeholder="请选择" style="width:250px">
                        <Option value="0">开启</Option>
                        <Option value="1">关闭</Option>
                    </Select>                      
                </FormItem>               
            </Col>
        </FormItem>
        <FormItem v-if="!lowershow" >
            <Col span="11">
                <FormItem label="自动上架:" prop="autoOn">
                    <Select v-model.number="formValidate.autoOn" placeholder="请选择" style="width:250px">
                        <Option value="0">开启</Option>
                        <Option value="1">关闭</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="当天最多申请次数:" prop="dayApplyMax">
                    <Input v-model.number="formValidate.dayApplyMax" style="width:250px" placeholder="请输入当天最多申请次数">
                    <span slot="append">次</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="15">
                <FormItem label="操作系统:" prop="operatingSystem">
                    <CheckboxGroup v-model="operatingSystem" @on-change="optionSystemChange">
                        <Checkbox v-for="item in optionSystem" :label="item.productParamCode">{{item.productParamName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="15">
                <FormItem label="申请H5的URL:" prop="applyH5Url">
                    <Input v-model="formValidate.applyH5Url" style="width:400px" placeholder="请输入申请H5的URL"></Input>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="24">
                <FormItem label="类型标签:" prop="typeLabel">
                    <CheckboxGroup v-model="typeLabel" @on-change="productTypeChange">
                        <Checkbox v-for="item in productType" :label="item.productParamCode">{{item.productParamName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="24">
                <FormItem label="额度标签:" prop="amountLabel">
                    <CheckboxGroup v-model="amountLabel" @on-change="limitChange">
                        <Checkbox v-for="item in limit" :label="item.productParamCode">{{item.productParamName}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem class="tc">
            <Button type="primary" @click="handleSubmit('formValidate')">提交保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
        </FormItem>
    </Form>  
</template>
<script>
export default {
  data () {
    return {
      quotashow: false,
      termshow: false,
      lowershow: false,
      ratetypeshow:false,
      applyCondition: [],//申请资料
      applyFlow: [],//申请流程
      optionSystem: [],//操作系统
      productType: [],//类型标签
      limit: [],
      amountLabel: [],
      typeLabel: [],
      operatingSystem: [],
      applyInformation: [],
      applyFlowlc: [],
      logoUrl: require('../../image/moren.png'),
      labelUrl: require('../../image/moren.png'),
      formValidate: {       
        productLogo: '',       
        displayLabel: '',
        productName: '',
        productSubhead: '',
        applyCounts: null,
        applyCountsRatio: null,
        productSearchFeature: '',
        productDetailFeature: '',
        rateType: null,
        rateMouth: null,
        rateDay:  null,
        repaymentMode: null,
        loanTime: '',
        limitType: null,
        termType: null,
        limitMin: null,
        limitMax: null,
        limitValue :[],
        limitDefault: null,
        termMin: null,
        termMax: null,
        termValue: [],
        termDefault: null,
        applyFlow: [],
        applyInformation: [],
        autoOff: null,
        dayApplyMax: null,
        autoOn: null,
        isHot: null,
        operatingSystem: [],
        applyH5Url: '',
        typeLabel: [],
        amountLabel: [],
        applyCondition:[],
        state :1
      },
      addnormals: [
        {
          detailValue: ''
        }
      ],
      quotamoney: [
          {
          detailValue: ''
        }
      ],
      termmoney: [
        {
          detailValue: ''
        }

      ],
      ruleValidate: {
        productLogo: [
          { required: true, message: '请上传产品LOGO', trigger: 'blur' }
        ],
        displayLabel: [
          { required: true, message: '请上传显示标签', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        productSubhead: [
          { required: true, message: '请输入副标题', trigger: 'blur' }
        ],
        applyCounts: [
          { required: true, type: 'number', message: '请输入正确的申请人基数', trigger: 'blur' },
        //   { type: 'number', pattern:/^\+?[1-9]\d*$/, message:'请输入正确的申请人基数', trigger:'blur'},
        ],
        applyCountsRatio: [
          { required: true, type: 'number', message: '请输入正确的申请人系数', trigger: 'blur' }
        ],
        productSearchFeature: [
          { required: true, message: '请输入产品搜索页特点', trigger: 'blur' }
        ],
        productDetailFeature: [
          { required: true, message: '请输入产品详情页特点', trigger: 'blur' }
        ],
        rateType: [
          { required: true, type: 'number', message: '请选择前端显示', trigger: 'blur' }
        ],
        rateMouth: [
          { required: true, type: 'number', message: '请输入参考月利率', trigger: 'blur' }
        ],
        rateDay: [
          { required: true, type: 'number', message: '请输入参考日利率', trigger: 'blur' }
        ],
        repaymentMode: [
          { required: true, type: 'number', message: '请选择还款方式', trigger: 'blur' }
        ],
        loanTime: [
          { required: true, message: '请输入放款时间', trigger: 'blur' }
        ],
        limitType: [
          { required: true, type: 'number', message: '请选择额度类型', trigger: 'blur' }
        ],
        termType: [
          { required: true, type: 'number', message: '请选择期限类型', trigger: 'blur' }
        ],
        // quotastart: [
        //   { required: true, message: '请输入起始金额', trigger: 'blur' }
        // ],
        // quotaend: [
        //   { required: true, message: '请输入结束金额', trigger: 'blur' }
        // ],
        limitDefault: [
          { required: true, type: 'number', message: '请输入默认额度', trigger: 'blur' }
        ],
        // termstart: [
        //   { required: true, message: '请输入起始期限值', trigger: 'blur' }
        // ],
        // termend: [
        //   { required: true, message: '请输入结束期限值', trigger: 'blur' }
        // ],
        termDefault: [
          { required: true, type: 'number', message: '请输入默认期限', trigger: 'blur' }
        ],
        applyFlow: [
          { required: true, type: 'array', min: 1, message: '最少选择一种申请流程', trigger: 'change' },
        ],
        applyInformation: [
          { required: true, type: 'array', min: 1, message: '最少选择一种申请资料', trigger: 'change' },
        ],
        autoOff: [
          { required: true, type: 'number', message: '请选择下架方式', trigger: 'blur' }
        ],
        dayApplyMax: [
          { required: true, type: 'number', message: '请输入当天最多申请次数', trigger: 'blur' }
        ],
        autoOn: [
          { required: true, type: 'number', message: '请选择上架方式', trigger: 'blur' }
        ],
        isHot: [
          { required: true, type: 'number', message: '请选择是否热门', trigger: 'blur' }
        ],
        operatingSystem: [
          { required: true, type: 'array', min: 1, message: '请选择操作系统', trigger: 'change' },
        ],
        applyH5Url: [
          { required: true, message: '请输入申请H5的URL', trigger: 'blur' }
        ],
        typeLabel: [
          { required: true, type: 'array', min: 1, message: '最少选择一种类型标签', trigger: 'change' },
        ],
        amountLabel: [
          { required: true, type: 'array', min: 1, message: '最少选择一种额度标签', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    //   保存
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            let reg = /^\+?[1-9]\d*$/
            let cart = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
            if (!reg.test(this.formValidate.applyCounts)) {
                const title = '提示'
                let content = '<p>请输入正确的申请人基数</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
            }
            if (!reg.test(this.formValidate.applyCountsRatio)) {
                const title = '提示'
                let content = '<p>请输入正确的申请人系数</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
            }
            if (this.formValidate.rateType == 0) {
                if (!cart.test(this.formValidate.rateMouth)) {
                    const title = '提示'
                    let content = '<p>请输入正确的参考月利率</p>'
                    this.$Modal.warning({
                        title: title,
                        content: content                    
                    })
                    return false               
                }               
            } else {
                if (!cart.test(this.formValidate.rateDay)) {
                    const title = '提示'
                    let content = '<p>请输入正确的参考日利率</p>'
                    this.$Modal.warning({
                        title: title,
                        content: content                    
                    })
                    return false               
                }
            }

            if (this.formValidate.limitType == 0) {
                if (!reg.test(this.formValidate.limitMin)) {
                const title = '提示'
                let content = '<p>请输入正确的额度范围起始值</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
                }
                if (!reg.test(this.formValidate.limitMax)) {
                    const title = '提示'
                    let content = '<p>请输入正确的额度范围结束值</p>'
                    this.$Modal.warning({
                        title: title,
                        content: content                    
                    })
                    return false               
                }
                if (this.formValidate.limitMin>this.formValidate.limitMax) {
                    const title = '提示'
                    let content = '<p>开始金额不得大于结束金额</p>'
                    this.$Modal.warning({
                        title: title,
                        content: content                    
                    })
                    return false               
                }
            } else {
                for (let i = 0; i < this.quotamoney.length; i++) {
                    if (this.quotamoney[i].detailValue == '') {
                        const title = '提示'
                        let content = '<p>请输入贷款额度</p>'
                        this.$Modal.warning({
                            title: title,
                            content: content                    
                        })
                        return false                  
                    }
                    if (!reg.test(this.quotamoney[i].detailValue)) {
                        const title = '提示'
                        let content = '<p>请输入正确的贷款额度</p>'
                        this.$Modal.warning({
                            title: title,
                            content: content                    
                        })
                        return false                  
                    }
                }
            }

            if (this.formValidate.termType == 0) {
                if (!reg.test(this.formValidate.termMin)) {
                const title = '提示'
                let content = '<p>请输入正确的期限范围起始值</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
            }
            if (!reg.test(this.formValidate.termMax)) {
                const title = '提示'
                let content = '<p>请输入正确的期限范围结束值</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
            }
            if (this.formValidate.termMin>this.formValidate.termMax) {
                const title = '提示'
                let content = '<p>开始金额不得大于结束金额</p>'
                this.$Modal.warning({
                    title: title,
                    content: content                    
                })
                return false               
            }              
            } else {
                for (let i = 0; i < this.termmoney.length; i++) {
                    if (this.termmoney[i].detailValue == '') {
                        const title = '提示'
                        let content = '<p>请输入贷款期限</p>'
                        this.$Modal.warning({
                            title: title,
                            content: content                    
                        })
                        return false                  
                    }
                    if (!reg.test(this.termmoney[i].detailValue)) {
                        const title = '提示'
                        let content = '<p>请输入正确的贷款期限</p>'
                        this.$Modal.warning({
                            title: title,
                            content: content                    
                        })
                        return false                  
                    }
                }
            }

            if (this.formValidate.autoOff == 1) {
                this.formValidate.autoOn = null
            }
          this.formValidate.limitValue = this.quotamoney
          this.formValidate.termValue = this.termmoney
          this.formValidate.applyCondition = this.addnormals
          let url
          if (this.$route.query.code) {
              url = '/loan/product/modifyProductByCode'
              this.formValidate.productCode = this.$route.query.code
          } else {
              url = '/loan/product/saveProduct'
          }
          this.http.post(BASE_URL + url, this.formValidate)
          .then((resp) => {
            if (resp.code == 'success') {
                const title = '贷款产品'
                let content = '<p>保存成功</p>'
                this.$Modal.success({
                    title: title,
                    content: content,
                    onOk: () => {
                       this.$router.push({ path: './loansconfig' })
                    },
                })
            
            } else {         
            this.$Message.info(resp.message)
            }
          })
          .catch(() => {
          })
        } else {

        }
      })
    },
    // 返回
    handleReset (name) {
    this.$router.push({ path: './loansconfig' })
    },
    // 上传格式校验
    handleFormatError1 (file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
    },
    // 上传图片
    handleUpload (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout:1000*60*5
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        this.logoUrl = resp.data
        this.formValidate.productLogo = resp.data
      } else {
      }
    })
    .catch(() => {
    })     
      return false
      }
    },
    // 上传标签图片
    handleUpload1 (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout:1000*60*5
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        this.labelUrl = resp.data
        this.formValidate.displayLabel = resp.data
      } else {
      }
    })
    .catch(() => {
    })      
      return false
      }
    },
    // 加
    addnormal (num) {
        if (num == 1) {
            this.quotamoney.push({
                detailValue: ''
            })            
        } else if (num == 2) {
            this.addnormals.push({
                detailValue: ''
            })
        } else if (num == 3) {
            this.termmoney.push({
                detailValue: ''
            })
        }
      
    },
    // 减
    addnorma2 (num, index) {
        if (num == 1) {
            this.quotamoney.splice(index, 1)
        } else if (num == 2) {
            this.addnormals.splice(index, 1)
        } else if (num == 3) {
            this.termmoney.splice(index, 1)
        }
    },
    // 额度类型
    quotatypeset (val) {
        if (val == 0) {
            this.quotashow = false
        } else {
            this.quotashow = true
        }
    },
    // 期限类型
    termtypeset (val) {
        if (val == 0) {
            this.termshow = false
        } else {
            this.termshow = true
        }
    },
    // 自动下架
    lowertypeset (val) {
        if (val == 0) {
            this.lowershow = false
        } else {
            this.lowershow = true
        }
    },
    ratetypepeset (val) {
        if (val == 0) {
            this.ratetypeshow = false
        } else {
            this.ratetypeshow = true
        }
    },
    // 额度标签选中
    limitChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {
            let obj = new Object ()            
            obj.productParamCode = data[i]
            list.push(obj)
        }
        this.formValidate.amountLabel = list
    },
    // 类型标签选中
    productTypeChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {
            let obj = new Object ()            
            obj.productParamCode = data[i]
            list.push(obj)
        }
        this.formValidate.typeLabel = list
    },
    // 操作系统选中
    optionSystemChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {
            let obj = new Object ()            
            obj.productParamCode = data[i]
            list.push(obj)
        }
        this.formValidate.operatingSystem = list
    },
    // 申请资料选中
    applyConditionChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {
            let obj = new Object ()            
            obj.productParamCode = data[i]
            list.push(obj)
        }
        this.formValidate.applyInformation = list
    },
    applyFlowChange (data) {
        let list = []
        for (let i = 0; i < data.length; i++) {
            let obj = new Object ()            
            obj.productParamCode = data[i]
            list.push(obj)
        }
        this.formValidate.applyFlow = list
    }

  },
  mounted () {
      this.http.post(BASE_URL + '/loan/product/getProductParam', {})
      .then((resp) => {
        if (resp.code == 'success') {
          this.applyCondition = resp.data.applyCondition
          this.applyFlow = resp.data.applyFlow
          this.optionSystem = resp.data.optionSystem
          this.productType = resp.data.productType
          this.limit = resp.data.limit
        } else {         
          this.$Message.info(resp.message)
        }
      })
      .catch(() => {
      })
      if (this.$route.query.code) {
          this.http.post(BASE_URL + '/loan/product/getProductByCode', {productCode:this.$route.query.code})
          .then((resp) => {
            if (resp.code == 'success') {
            resp.data.rateType +=''
            resp.data.repaymentMode += ''
            resp.data.limitType+=''
            resp.data.termType+=''
            resp.data.autoOff +=''
            resp.data.isHot+=''
            resp.data.autoOn+=''
            this.formValidate = resp.data
            for (let i = 0; i < resp.data.applyFlow.length; i++) {
                this.applyFlowlc.push(resp.data.applyFlow[i].productParamCode)                
            }
            for (let i = 0; i < resp.data.applyInformation.length; i++) {
                this.applyInformation.push(resp.data.applyInformation[i].productParamCode)                
            }
            for (let i = 0; i < resp.data.operatingSystem.length; i++) {
                this.operatingSystem.push(resp.data.operatingSystem[i].productParamCode)                
            }
            for (let i = 0; i < resp.data.typeLabel.length; i++) {
                this.typeLabel.push(resp.data.typeLabel[i].productParamCode)
                
            }
            for (let i = 0; i < resp.data.amountLabel.length; i++) {
                this.amountLabel.push(resp.data.amountLabel[i].productParamCode)
            }
                         
            if (resp.data.applyCondition!=null) {
                this.addnormals =resp.data.applyCondition             
            }           
            if (resp.data.limitValue!=null) {
                this.quotamoney = resp.data.limitValue
            }
            if (resp.data.termValue!=null) {
                this.termmoney = resp.data.termValue
            }       
            this.logoUrl = resp.data.productLogo
            this.labelUrl = resp.data.displayLabel
            } else {         
            this.$Message.info(resp.message)
            }
          })
          .catch(() => {
          })       
      }      
  }
}
</script>
<style lang="less" scoped>

</style>


