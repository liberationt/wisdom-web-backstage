<template>
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="125">
        <FormItem  >
            <Row>
                <Col span="11">
                    <FormItem label="产品LOGO:" prop="productlogo">
                        <img :src="formValidate.logoUrl" alt="" style="width:80px;height:80px" class="left">                       
                        <Upload
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError1"
                        :before-upload="handleUpload"
                        :show-upload-list="false"                        
                        action=''>
                        <Button type="ghost" icon="ios-cloud-upload-outline" class="ml20" style="margin-top:24px">浏览</Button>
                        </Upload>
                        <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center"></Col>
                <Col span="11">
                    <FormItem label="显示标签:" prop="producticon">
                        <img :src="formValidate.labelUrl" alt="" style="width:80px;height:80px" class="left">                     
                        <Upload
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError1"
                        :before-upload="handleUpload"
                        :show-upload-list="false"                        
                        action=''>
                        <Button type="ghost" icon="ios-cloud-upload-outline" class="ml20" style="margin-top:24px">浏览</Button>
                        </Upload>
                        <Input v-model="formValidate.producticon" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="产品名称:" prop="name">
                    <Input v-model="formValidate.name" style="width:250px" placeholder="请输入产品名称"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="副标题:" prop="subtitle">
                    <Input v-model="formValidate.subtitle" style="width:250px" placeholder="请输入副标题"></Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="申请人基数:" prop="basenum">
                    <Input v-model="formValidate.basenum" style="width:250px" placeholder="请输入申请人基数"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="申请人系数:" prop="coefficientnum">
                    <Input v-model="formValidate.coefficientnum" style="width:250px" placeholder="请输入申请人系数">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="产品搜索页特点:" prop="search">
                    <Input v-model="formValidate.search" style="width:250px" placeholder="请输入产品搜索页特点"></Input>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="产品详情页特点:" prop="details">
                    <Input v-model="formValidate.details" style="width:250px" placeholder="请输入产品详情页特点">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="前端显示:" prop="frontend">
                    <Select v-model="formValidate.frontend" placeholder="请选择" style="width:250px">
                        <Option value="beijing">月利率</Option>
                        <Option value="shanghai">日利率</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="参考月利率:" prop="monthrate">
                    <Input v-model="formValidate.monthrate" style="width:250px" placeholder="请输入参考月利率">
                    <span slot="append">%</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="还款方式:" prop="repayment">
                    <Select v-model="formValidate.repayment" placeholder="请选择" style="width:250px">
                        <Option value="beijing">按月还款</Option>
                        <Option value="shanghai">随借随还</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="放款时间:" prop="loantime">
                    <DatePicker type="date" placeholder="请选择" v-model="formValidate.loantime"></DatePicker>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="额度类型:" prop="quotatype">
                    <Select v-model="formValidate.quotatype" placeholder="请选择" @on-change="quotatypeset" style="width:250px">
                        <Option value="1">范围</Option>
                        <Option value="2">固定</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="期限类型:" prop="termtime">
                    <Select v-model="formValidate.termtime" placeholder="请选择" @on-change="termtypeset" style="width:250px">
                        <Option value="1">范围</Option>
                        <Option value="2">固定</Option>
                    </Select>                      
                </FormItem>
            </Col>         
        </FormItem>

        <FormItem class="toconfigure" >
            <Row>
            <Col span="11">
                <FormItem label="额度范围:" v-if="!quotashow">
                    <Row>
                        <Col span="6">
                            <FormItem prop="quotastart" class="quota">
                                <Input v-model="formValidate.quotastart" style="width:90px" placeholder="请输入起始金额"></Input>
                                <span>&nbsp;至&nbsp;</span>
                            </FormItem>                            
                        </Col>
                        <Col span="6">
                            <FormItem prop="quotaend" class="quota">
                                <Input v-model="formValidate.quotaend" style="width:90px" placeholder="请输入结束金额"></Input>
                                <span>元</span>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="额度1:" v-if="quotashow">
                    <!-- <Input v-model="formValidate.subtitle" style="width:300px" placeholder="持中国居民身份证的中国公民 20-35周岁"></Input> -->
                    <div class="credit_recharge">
                            <div
                             v-for="(item, index) in quotamoney"
                             :key="index"
                             class="mb15 clearfix"
                             >
                            <Input type="text" v-model="item.value1" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px">
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
                     <Row>
                        <Col span="6">
                            <FormItem prop="termstart" class="quota">
                                <Input v-model="formValidate.termstart" style="width:100px" placeholder="请输入起始期限值"></Input>
                                <span>&nbsp;至&nbsp;</span>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem prop="termend" class="quota">
                                <Input v-model="formValidate.termend" style="width:100px" placeholder="请输入结束期限值"></Input>
                                <span>月</span>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="期限1:" v-if="termshow">
                    <!-- <Input v-model="formValidate.subtitle" style="width:300px" placeholder="持中国居民身份证的中国公民 20-35周岁"></Input> -->
                    <div class="credit_recharge">
                            <div
                             v-for="(item, index) in termmoney"
                             :key="index"
                             class="mb15 clearfix"
                             >
                            <Input type="text" v-model="item.value1" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px">
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
                <FormItem label="默认额度:" prop="defaultquota">
                    <Input v-model="formValidate.defaultquota" style="width:250px" placeholder="请输入默认额度">
                    <span slot="append">元</span>
                    </Input>                      
                </FormItem>                
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="默认期限:" prop="defaultterm">
                    <Input v-model="formValidate.defaultterm" style="width:250px" placeholder="请输入默认期限">
                    <span slot="append">月</span>
                    </Input>                      
                </FormItem>
            </Col>
            </Row>         
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="申请流程" prop="technological">
                    <CheckboxGroup v-model="formValidate.technological">
                        <Checkbox label="提交申请"></Checkbox>
                        <Checkbox label="身份认证"></Checkbox>
                        <Checkbox label="手机认证"></Checkbox>
                        <Checkbox label="成功放款"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="申请资料" prop="datum">
                    <CheckboxGroup v-model="formValidate.datum">
                        <Checkbox label="身份证"></Checkbox>
                        <Checkbox label="银行卡"></Checkbox>
                        <Checkbox label="手机实名制"></Checkbox>
                        <Checkbox label="紧急联系人"></Checkbox>
                        <Checkbox label="芝麻授信"></Checkbox>
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
                             class="mb15 clearfix"
                             >
                            <Input type="text" v-model="item.value1" class="left  inputnum"  placeholder="请输入申请条件" style="width:210px"></Input>                        
                        <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal(2)">+</Button>
                        <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(2, index)">-</Button>
                        </div>
                        </div>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="11">
                <FormItem label="自动下架:" prop="lowerframe">
                    <Select v-model="formValidate.lowerframe" placeholder="请选择" @on-change="lowertypeset" style="width:250px">
                        <Option value="1">开启</Option>
                        <Option value="2">关闭</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="是否热门:" prop="hot">
                    <Select v-model="formValidate.hot" placeholder="请选择" style="width:250px">
                        <Option value="beijing">开启</Option>
                        <Option value="shanghai">关闭</Option>
                    </Select>                      
                </FormItem>               
            </Col>
        </FormItem>
        <FormItem v-if="!lowershow" >
            <Col span="11">
                <FormItem label="自动上架:" prop="onshelf">
                    <Select v-model="formValidate.onshelf" placeholder="请选择" style="width:250px">
                        <Option value="beijing">开启</Option>
                        <Option value="shanghai">关闭</Option>
                    </Select>                      
                </FormItem>
            </Col>
            <Col span="2" style="text-align: center"></Col>
            <Col span="11">
                <FormItem label="当天最多申请次数:" prop="applicationsnum">
                    <Input v-model="formValidate.applicationsnum" style="width:250px" placeholder="请输入当天最多申请次数">
                    <span slot="append">次</span>
                    </Input>                      
                </FormItem>
            </Col>         
        </FormItem>
        <FormItem  >
            <Col span="15">
                <FormItem label="操作系统:" prop="system">
                    <CheckboxGroup v-model="formValidate.system">
                        <Checkbox label="安卓"></Checkbox>
                        <Checkbox label="IOS"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="15">
                <FormItem label="申请H5的URL:" prop="link">
                    <Input v-model="formValidate.link" style="width:400px" placeholder="请输入申请H5的URL"></Input>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="24">
                <FormItem label="类型标签:" prop="labeltype">
                    <CheckboxGroup v-model="formValidate.labeltype">
                        <Checkbox label="小额极速贷"></Checkbox>
                        <Checkbox label="无征信也能贷"></Checkbox>
                        <Checkbox label="身份证就能贷"></Checkbox>
                        <Checkbox label="芝麻信用贷"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem  >
            <Col span="24">
                <FormItem label="额度标签:" prop="lanelquota">
                    <CheckboxGroup v-model="formValidate.lanelquota">
                        <Checkbox label="2千以下"></Checkbox>
                        <Checkbox label="2千~5千"></Checkbox>
                        <Checkbox label="5千~1万"></Checkbox>
                        <Checkbox label="1万~5万"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>        
        </FormItem>
        <FormItem>
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
      formValidate: {
        logoUrl: require('../../image/moren.png'),
        productlogo: '',
        labelUrl: require('../../image/moren.png'),
        producticon: '',
        name: '',
        subtitle: '',
        basenum: '',
        coefficientnum: '',
        search: '',
        details: '',
        frontend: '',
        monthrate: '',
        repayment: '',
        loantime: '',
        quotatype: '',
        termtime: '',
        quotastart: '',
        quotaend: '',
        defaultquota: '',
        termstart: '',
        termend: '',
        defaultterm: '',
        technological: [],
        datum: [],
        lowerframe: '',
        applicationsnum: '',
        onshelf: '',
        hot: '',
        system: [],
        link: '',
        labeltype: [],
        lanelquota: [],
      },
      addnormals: [
        {
          value1: ''
        }
      ],
      quotamoney: [
          {
          value1: ''
        }
      ],
      termmoney: [
        {
          value1: ''
        }

      ],
      ruleValidate: {
        productlogo: [
          { required: true, message: '请上传产品LOGO', trigger: 'blur' }
        ],
        producticon: [
          { required: true, message: '请上传显示标签', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入副标题', trigger: 'blur' }
        ],
        basenum: [
          { required: true, message: '请输入申请人基数', trigger: 'blur' }
        ],
        coefficientnum: [
          { required: true, message: '请输入申请人系数', trigger: 'blur' }
        ],
        search: [
          { required: true, message: '请输入产品搜索页特点', trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请输入产品详情页特点', trigger: 'blur' }
        ],
        frontend: [
          { required: true, message: '请选择前端显示', trigger: 'blur' }
        ],
        monthrate: [
          { required: true, message: '请输入参考月利率', trigger: 'blur' }
        ],
        repayment: [
          { required: true, message: '请选择还款方式', trigger: 'blur' }
        ],
        loantime: [
          { required: true, type: 'date', message: '请输入放款时间', trigger: 'blur' }
        ],
        quotatype: [
          { required: true, message: '请选择额度类型', trigger: 'blur' }
        ],
        termtime: [
          { required: true, message: '请选择期限类型', trigger: 'blur' }
        ],
        quotastart: [
          { required: true, message: '请输入起始金额', trigger: 'blur' }
        ],
        quotaend: [
          { required: true, message: '请输入结束金额', trigger: 'blur' }
        ],
        defaultquota: [
          { required: true, message: '请输入默认额度', trigger: 'blur' }
        ],
        termstart: [
          { required: true, message: '请输入起始期限值', trigger: 'blur' }
        ],
        termend: [
          { required: true, message: '请输入结束期限值', trigger: 'blur' }
        ],
        defaultterm: [
          { required: true, message: '请输入默认期限', trigger: 'blur' }
        ],
        technological: [
          { required: true, type: 'array', min: 1, message: '最少选择一种申请流程', trigger: 'change' },
        ],
        datum: [
          { required: true, type: 'array', min: 1, message: '最少选择一种申请资料', trigger: 'change' },
        ],
        lowerframe: [
          { required: true, message: '请选择下架方式', trigger: 'blur' }
        ],
        applicationsnum: [
          { required: true, message: '请输入当天最多申请次数', trigger: 'blur' }
        ],
        onshelf: [
          { required: true, message: '请选择上架方式', trigger: 'blur' }
        ],
        hot: [
          { required: true, message: '请选择是否热门', trigger: 'blur' }
        ],
        system: [
          { required: true, type: 'array', min: 1, message: '请选择操作系统', trigger: 'change' },
        ],
        link: [
          { required: true, message: '请输入申请H5的URL', trigger: 'blur' }
        ],
        labeltype: [
          { required: true, type: 'array', min: 1, message: '最少选择一种类型标签', trigger: 'change' },
        ],
        lanelquota: [
          { required: true, type: 'array', min: 1, message: '最少选择一种额度标签', trigger: 'change' },
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
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
        this.formValidate.logoUrl = resp.data
      } else {
      }
    })
    .catch(() => {
    })
      this.formValidate.productlogo = file.name
      return false
      }
      
      // return false
    },
    addnormal (num) {
        if (num == 1) {
            this.quotamoney.push({
                value1: ''
            })            
        } else if (num == 2) {
            this.addnormals.push({
                value1: ''
            })
        } else if (num == 3) {
            this.termmoney.push({
                value1: ''
            })
        }
      
    },
    addnorma2 (num, index) {
        if (num == 1) {
            this.quotamoney.splice(index, 1)
        } else if (num == 2) {
            this.addnormals.splice(index, 1)
        } else if (num == 3) {
            this.termmoney.splice(index, 1)
        }
    },
    quotatypeset (val) {
        if (val == 1) {
            this.quotashow = false
        } else {
            this.quotashow = true
        }
    },
    termtypeset (val) {
        if (val == 1) {
            this.termshow = false
        } else {
            this.termshow = true
        }
    },
    lowertypeset (val) {
        if (val == 1) {
            this.lowershow = false
        } else {
            this.lowershow = true
        }
    }

  }   
}
</script>
<style lang="less" scoped>
.credit_recharge{
    margin-left: 125px
}
</style>


