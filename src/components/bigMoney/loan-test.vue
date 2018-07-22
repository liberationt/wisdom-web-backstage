<template>
    <div>
        <div class="navigation">
            <p>
                <span>贷款产品设置</span>
            </p>
        </div>
        <div>
            <span>产品名称:</span>
            <Input v-model="value" placeholder="请输入产品名称" style="width: 200px"></Input>
            <!-- <Button type="info" class="ml100 w100" @click="inquire">查询</Button> -->
            <Button type="info" class=" mr20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
        </div>
        <Button type="primary" shape="circle" class="mt20" icon="plus-round" @click="refuse(2)">添加贷款产品</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        <Modal
          title="贷款产品设置"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="750"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 loan_products">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:110px">
              <!-- <FormItem label="产品ID:" prop="productid" >
                <Input v-model="formCustom.productid" disabled placeholder="请输入产品ID" style="width: 300px"></Input>
              </FormItem> -->
              <!-- <FormItem label="序号:" prop="sernum" >
                <Input v-model="formCustom.sernum" placeholder="请输入序号" style="width: 300px"></Input>
              </FormItem> -->
              <FormItem label="产品LOGO:" prop="productlogo" class="productlogo">
                <img :src="formCustom.logoUrl" alt="" class="left">
                <Input v-model="formCustom.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5"></Input>
                <Upload
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError1"
                :before-upload="handleUpload"
                :show-upload-list="false"                        
                action=''>
                  <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">选择</Button>
                </Upload>
              </FormItem>
              <FormItem label="产品标签图标:" class="productlogo" >
                <img :src="formCustom.labelUrl" alt="" class="left">
                <Input v-model="formCustom.producticon" disabled style="width: 120px;margin-top:24px" class="left ml5"></Input>
                <Upload
                :before-upload="handleUploadicon"
                :show-upload-list="false"
                :format="['jpg','jpeg','png', 'gif']"
                :on-format-error="handleFormatError2"
                action=''>
                  <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">选择</Button>
                </Upload>
              </FormItem>
            <FormItem label="产品名称:" prop="name">
              <Input v-model="formCustom.name" placeholder="请输入产品名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="产品副标题:" prop="subtitle">
              <Input  v-model="formCustom.subtitle" placeholder="请输入产品副标题" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="产品说明:" prop="explain">
              <Input  v-model="formCustom.explain" placeholder="请输入产品说明" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="额度类型:" prop="types">
              <Select v-model="formCustom.types" placeholder="请选择" style="width:300px">
                <Option value="1">范围</Option>
                <Option value="2">固定</Option>
              </Select>
            </FormItem>
            <FormItem label="额度范围:" class="ranges" v-if="formCustom.types=='1'">
              <Row>
                <Col span="8">
                    <FormItem prop="range">
                        <Input  v-model="formCustom.range" placeholder="请输入起始金额" style="width: 100px"></Input>
                        <Select v-model="formCustom.object1" placeholder="请选择" style="width:60px">
                          <Option value="元">元</Option>
                          <Option value="千">千</Option>
                          <Option value="万">万</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="9">
                    <FormItem prop="rangeend">                     
                      <Input  v-model="formCustom.rangeend" placeholder="请输入结束金额" style="width: 100px"></Input>
                        <Select v-model="formCustom.object2" placeholder="请选择" style="width:60px">
                          <Option value="元">元</Option>
                          <Option value="千">千</Option>
                          <Option value="万">万</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>                       
            </FormItem>
            <FormItem label="额度:" prop="quota" v-if="formCustom.types=='2'">
              <Input  v-model="formCustom.quota" placeholder="金额" style="width: 100px"></Input>
              <Select v-model="formCustom.object3" placeholder="请选择" style="width:60px">
                <Option value="元">元</Option>
                <Option value="千">千</Option>
                <Option value="万">万</Option>
              </Select>
            </FormItem>
            <FormItem label="利率类型:" prop="ratetype" >
              <Select v-model="formCustom.ratetype" placeholder="请选择" style="width:300px" >
                <Option value="1">日利率</Option>
                <Option value="2">月利率</Option>
                <Option value="3">年利率</Option>
                <Option value="4">每期利率</Option>
              </Select>
            </FormItem>
            <FormItem label="利率:" prop="rate" >
              <Input  v-model="formCustom.rate" placeholder="请输入利率" style="width: 300px"></Input>%
            </FormItem>
            <FormItem label="产品URL:" prop="producturl" >
              <Input type="url" v-model="formCustom.producturl" placeholder="请输入产品URL" style="width: 300px"></Input>
            </FormItem>
          </Form>
          </div>
          </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      modal9: false,
      hid: 0,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      lengths: 0,
      edit: '',
      imgnum: 0,
      formCustom: {
        // productid: 'DWQ1234',
        productlogo: '',
        producticon: '',
        name: '',
        subtitle: '',
        explain: '',
        types: '1',
        range: '',
        rangeend: '',
        ratetype: '2',
        rate: '',
        producturl: '',
        object1: '元',
        object2: '万',
        object3: '万',
        quota: '',
        // sernum: '',
        logoUrl: require('../../image/moren.png'),
        labelUrl: require('../../image/moren.png'),
        // loading2: false
      },
      ruleCustom: {
        productlogo: { required: true, message: '请上传产品LOGO', trigger: 'blur' },
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { max: 50, message: '输入内容超限，请重新输入!', trigger: 'blur' },
          { min: 1, message: '输入内容过少，请重新输入!', trigger: 'blur' },
          {required: true, message: '请输入正确的产品名称', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\、\\\/;'\[\]]+$/, trigger: 'blur'}
        ],
        subtitle: [
          { max: 50, message: '输入内容超限，请重新输入!', trigger: 'blur' }
        ],
        explain: [
          { required: true, message: '请输入产品说明', trigger: 'blur' },
          { max: 50, message: '输入内容超限，请重新输入!', trigger: 'blur' },
          { min: 1, message: '输入内容过少，请重新输入!', trigger: 'blur' },
          {required: true, message: '请输入正确的产品说明', pattern: /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\、\\\/;'\[\]]+$/, trigger: 'blur'}
        ],
        types: { required: true, message: '请选择额度类型', trigger: 'blur' },
        range: [
          { required: true, message: '请输入开始金额', trigger: 'blur' },
          { type: 'string',pattern:/^[0-9]*$/, message:'请输入数字', trigger:'blur'}
        ],
        rangeend: [
          { required: true, message: '请输入结束金额', trigger: 'blur' },
          { type: 'string',pattern:/^[0-9]*$/, message:'请输入数字', trigger:'blur'}
        ],
        quota: [
          { required: true, message: '请输入贷款金额', trigger: 'blur' },
          { type: 'string',pattern:/^[0-9]*$/, message:'请输入数字', trigger:'blur'}
        ],
        ratetype: { required: true, message: '请选择利率类型', trigger: 'change' },
        rate: [
          { required: true, message: '请输入利率', trigger: 'blur' },
          { type: 'string',pattern:/^\d+(\.\d{1,4})?$|^100(\.[0]{1,4}){0,1}$/, message:'利率输入错误，请重新输入(小数点后保留四位且最大不超过100)', trigger:'blur'},
          //{required: true, message: '利率不能大于100%', pattern: /^[1-9][0-9][0]$/, trigger: 'blur'},
        ],
        producturl: { required: true, message: '请输入产品URL', trigger: 'blur' }
      },
      columns7: [      
        {
          title: '序号',
          align: 'center',
          width: 140,
          key: 'sort'
        },
        {
          title: '产品名称',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.name
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '产品logo',
          align: 'center',
           width: 140,
          key: 'logoUrl',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.logoUrl,
                  style: 'width: 40px;height:40px'
                },
                style: {

                }
              })
            ])
          }
        },
        {
          title: '产品副标题',
          align: 'center',
           width: 140,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.fname
                }
              }, params.row.fname)
            ])
          }
        },
        {
          title: '产品说明',
          align: 'center',
           width: 140,
          key: 'subtitle',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.subtitle
                }
              }, params.row.subtitle)
            ])
          }
        },
        {
          title: '贷款额度',
          align: 'center',
           width: 140,
          key: 'loanLinesUnit'
          // render: (h, params) => {
          //   let money = params.row.startMoney+'-'+params.row.endMoney
          //   return h('div', [
          //     h('span', {
          //     }, money)
          //   ])
          // }
        },
        {
          title: '利率类型',
          align: 'center',
           width: 140,
          render: (h, params) => {
            let lilv = params.row.interestType
            if(lilv == 1){lilv = '日利率'}else if(lilv == 2){lilv = '月利率'}else if(lilv == 3){lilv = '年利率'}else if(lilv == 4){lilv = '每期利率'}      
            return h('div', [
              h('span', {
              }, lilv)
            ])
          } 
        },
        {
          title: '利率',
          align: 'center',
           width: 140,
          key: '',
          render: (h, params) => {
            let baif = params.row.interest+'%'       
            return h('div', [
              h('span', {
              }, baif)
            ])
          }
        },
        {
          title: 'URL',
          align: 'center',
           width: 140,
          ellipsis: true,
          render: (h, params) => {
            console.log(params.row.labelUrl,11)
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.productUrl
                }
              }, params.row.productUrl)
            ])
          }
        },
        {
          title: '状态',
          align: 'center',
           width: 140,
          key: 'status',
          render: (h, params) => {
            let zhuangtai = params.row.status == 1 ? '上架' : '下架'
            return h('div', [
              h('span', {
              }, zhuangtai)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 280,
          render: (h, params) => {
            let type = 'success'
            let onshelf           
            if (params.row.status == 0) {
              onshelf = '上架'
              type = 'success'
            } else {
              onshelf = '下架'
              type = 'warning'
            }
            let shelf = [
              h('span', {}, onshelf)
            ]
            let listbut = [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.refuse(1, params.row.productCode)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: type,
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (params.row.status == 1) {
                      let list = {
                        status: 0,
                        productCode: params.row.productCode
                      }
                      this.http.post(BASE_URL + '/loan/loanProduct/updateLoanProductByCode', list)
                      .then((resp) => {
                        if (resp.code == 'success') {
                          onshelf = '下架'
                          this.inquire()
                          const title = '下架'
                          let content = '<p>下架成功</p>'
                          this.$Modal.success({
                            title: title,
                            content: content
                          })
                        } else {

                        }
                      })
                      .catch(() => {
                      })
                    } else {
                      let list = {
                        status: 1,
                        productCode: params.row.productCode
                      }
                      this.http.post(BASE_URL + '/loan/loanProduct/updateLoanProductByCode', list)
                      .then((resp) => {
                        if (resp.code == 'success') {
                          onshelf = '上架'
                          this.inquire()
                          const title = '上架'
                          let content = '<p>上架成功</p>'
                          this.$Modal.success({
                            title: title,
                            content: content
                          })
                        } else {

                        }
                      })
                      .catch(() => {
                      })
                    }
                  }
                }
              }, shelf),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.remove(params.index)
                    let list = {
                      dataFlag: 0,
                      productCode: params.row.productCode
                    }
                    this.http.post(BASE_URL + '/loan/loanProduct/updateLoanProductByCode', list)
                      .then((resp) => {
                        if (resp.code == 'success') {
                          this.$Modal.confirm({
                            title: '删除',
                            content: '<p>确认要删除吗?</p>',
                            onOk: () => {
                                this.inquire()
                            },
                            onCancel: () => {
                                
                            }
                          })                          
                        } else {

                        }
                      })
                      .catch(() => {
                      })
                  }
                }
              }, '删除')
            ]
            if (params.index != this.lengths) {
              listbut.push(
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.downshelf(params.index)
                      let list = {
                        type: 1,
                        productCode: params.row.productCode
                      }
                      this.http.post(BASE_URL + '/loan/loanProduct/updateOnDown', list)
                      .then((resp) => {
                        if (resp.code == 'success') {
                          this.inquire()
                        } else {

                        }
                      })
                      .catch(() => {
                      })
                    }
                  }
                }, '下移')
              )
            }
            if (params.index != 0) {
              listbut.push(
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.onshelf(params.index)
                      let list = {
                        type: 2,
                        productCode: params.row.productCode
                      }
                      this.http.post(BASE_URL + '/loan/loanProduct/updateOnDown', list)
                      .then((resp) => {
                        if (resp.code == 'success') {
                          this.inquire()
                        } else {

                        }
                      })
                      .catch(() => {
                      })
                    }
                  }
                }, '上移')
              )
            }
            return h('div', listbut)
          }
        }
      ],
      data6: [],
      loading3: false
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    downshelf (index) {
      let num = index + 1
      let objectlist = this.data6[index]
      this.data6.splice(index, 1)
      this.data6.splice(num, 0, objectlist)
    },
    onshelf (index) {
      let num = index - 1
      let objectlist = this.data6[index]
      this.data6.splice(index, 1)
      this.data6.splice(num, 0, objectlist)
    },
    refuse (num, code) {
      if (num == 1) {
        // 编辑
        this.$refs['formCustom'].resetFields()
        this.edit = code
        this.http.get(BASE_URL + '/loan/loanProduct/getLoanProductByCode?loanProductCode='+code)
        .then((resp) => {
          if (resp.code == 'success') {
            // this.formCustom.productid = resp.data.productCode
            if (resp.data.labelUrl == '') {
              this.formCustom.producticon = ''
              this.formCustom.labelUrl = require('../../image/moren.png')

            } else {
              this.formCustom.producticon = resp.data.labelUrl
              this.formCustom.labelUrl = resp.data.labelUrl
            }
            this.formCustom.productlogo = resp.data.logoUrl           
            this.formCustom.logoUrl = resp.data.logoUrl         
            this.formCustom.name = resp.data.name
            this.formCustom.subtitle = resp.data.fname
            this.formCustom.explain = resp.data.subtitle
            this.formCustom.types = resp.data.lineType
            if (resp.data.lineType == 1) {
               this.formCustom.range = resp.data.startMoney+''
               this.formCustom.rangeend = resp.data.endMoney+''
             } else {
               this.formCustom.quota = resp.data.loanLines+''
             }
            this.formCustom.object1 = resp.data.startMoneyUnit
            this.formCustom.object2 = resp.data.endMoneyUnit
            this.formCustom.object3 = resp.data.startMoneyUnit//待定
            this.formCustom.ratetype = resp.data.interestType
            this.formCustom.rate = resp.data.interest+''
            this.formCustom.producturl = resp.data.productUrl
            // this.formCustom.sernum = resp.data.sort
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(() => {
        })
        this.modal9 = true
        this.hid = 1
      } else {
        this.hid = 0
        this.modal9 = true
      }
      
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 上传文件提示
    // 上传格式校验
    handleFormatError1 (file) {
      // this.formCustom.productlogo = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
    },
    handleFormatError2 (file) {
      // this.formCustom.producticon = ''
      this.$Message.info("图片格式不正确,请上传正确的图片格式")
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {
          if (this.formCustom.types == '1') {
            let reg = /^[1-9]\d*$/
          if (!reg.test(this.formCustom.range) || !reg.test(this.formCustom.rangeend)) {
            let title = '提示'
            let content = '<p>贷款额度最小值为1且不能为小数</p>'
            this.$Modal.warning({
            title: title,
            content: content
            })
            this.changeLoading()
            return false       
          }
          if (this.formCustom.object1 == '元') {
            if (this.formCustom.range > 5000000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000000 (元)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object2 == '元') {
            if (this.formCustom.rangeend > 5000000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000000 (元)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object1 == '千') {
            if (this.formCustom.range > 5000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000 (千)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object2 == '千') {
            if (this.formCustom.rangeend > 5000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000 (千)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object1 == '万') {
            if (this.formCustom.range > 500) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于500 (万)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object2 == '万') {
            if (this.formCustom.rangeend > 500) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于500 (万)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object1 == this.formCustom.object2) {
            if (this.formCustom.range > this.formCustom.rangeend) {
            let title = '提示'
            let content = '<p>开始金额不得大于结束金额</p>'
            this.$Modal.warning({
            title: title,
            content: content
            })
            this.changeLoading()
            return false
          }          
          }       
          } else {
              let reg = /^[1-9]\d*$/
          if (!reg.test(this.formCustom.quota)) {
            let title = '提示'
            let content = '<p>贷款额度最小值为1且不能为小数</p>'
            this.$Modal.warning({
            title: title,
            content: content
            })
            this.changeLoading()
            return false       
          }
          if (this.formCustom.object3 == '元') {
            if (this.formCustom.quota > 5000000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000000 (元)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object3 == '千') {
            if (this.formCustom.quota > 5000) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于5000 (千)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          if (this.formCustom.object3 == '万') {
            if (this.formCustom.quota > 500) {
                let title = '提示'
                let content = '<p>贷款金额最大值不得大于500 (万)</p>'
                this.$Modal.warning({
                title: title,
                content: content
                })
                this.changeLoading()
                return false 
              }
          }
          
          }
          if (this.formCustom.rate <= 0) {
            let title = '提示'
            let content = '<p>利率输入不得小于0.0001</p>'
            this.$Modal.warning({
            title: title,
            content: content
            })
            this.changeLoading()
            return false

          }
            let startMoney
            if (this.formCustom.types == 1) {
              startMoney = this.formCustom.range      
             } else {
               startMoney = this.formCustom.quota
             }
             let labelUrl
             if (this.imgnum == 0) {
               labelUrl = ''
             } else {
               labelUrl = this.formCustom.labelUrl
             }
            let list = {
              logoUrl: this.formCustom.logoUrl,
              labelUrl: labelUrl,
              name: this.formCustom.name,
              fname: this.formCustom.subtitle,
              subtitle: this.formCustom.explain,
              lineType: this.formCustom.types,
              startMoney: startMoney,
              endMoney: this.formCustom.rangeend,
              interestType: this.formCustom.ratetype,
              interest: this.formCustom.rate,
              productUrl: this.formCustom.producturl,
              startMoneyUnit:  this.formCustom.object1,
              endMoneyUnit: this.formCustom.object2,
              loanLines: this.formCustom.object3
            }
            let listbj = {
              logoUrl: this.formCustom.logoUrl,
              labelUrl: labelUrl,
              name: this.formCustom.name,
              fname: this.formCustom.subtitle,
              subtitle: this.formCustom.explain,
              lineType: this.formCustom.types,
              startMoney: startMoney,
              endMoney: this.formCustom.rangeend,
              interestType: this.formCustom.ratetype,
              interest: this.formCustom.rate,
              productUrl: this.formCustom.producturl,
              startMoneyUnit:  this.formCustom.object1,
              endMoneyUnit: this.formCustom.object2,
              loanLines: this.formCustom.object3,
              productCode: this.edit
            }
            if (this.hid == 0) {
              // 新增
              this.http.post(BASE_URL + '/loan/loanProduct/saveLoanProduct', list)
              .then((resp) => {
                if (resp.code == 'success') {
                  console.log()
                  this.changeLoading()
                  const title = '贷款产品设置'
                  let content = '<p>保存成功</p>'
                  this.$Modal.success({
                    title: title,
                    content: content
                  })
                  this.modal9 = false
                  this.inquire()
                this.$refs[name].resetFields()
                this.formCustom.logoUrl = require('../../image/moren.png')
                this.formCustom.labelUrl = require('../../image/moren.png')
                this.formCustom.producticon = ''
                } else {
                  this.changeLoading()
                  this.$Message.info(resp.message)
                  this.imgnum == 0
                }
              })
              .catch(() => {
              })
            } else {
              // 编辑
              this.http.post(BASE_URL + '/loan/loanProduct/updateLoanProductByCode', listbj)
              .then((resp) => {
                if (resp.code == 'success') {
                  setTimeout(() => {
                  this.changeLoading()
                  const title = '贷款产品设置'
                  let content = '<p>保存成功</p>'
                  this.$Modal.success({
                    title: title,
                    content: content
                  })
                  this.modal9 = false
                this.$refs[name].resetFields()                  
                  this.inquire()
                }, 1000)
                } else {
                  setTimeout(() => {
                  this.changeLoading()
                }, 1000)
                  this.$Message.info(resp.message)
                }
              })
              .catch(() => {
              })
            }
        
          // this.$Message.error('Success!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.formCustom.producticon = ''
      this.formCustom.logoUrl = require('../../image/moren.png')
      this.formCustom.labelUrl = require('../../image/moren.png')
    },
    pageChange (page) {
      this.startRow = page
      this.inquire()
    },
    pagesizechange (page) {
      this.endRow = page
      this.inquire()
    },
    handleUpload (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        this.formCustom.logoUrl = resp.data
      } else {
      }
    })
    .catch(() => {
    })
      this.formCustom.productlogo = file.name
      return false
      }
      
      // return false
    },
    handleUploadicon (file) {
      let splic = file.name.split('.')
      if (splic[splic.length-1] == 'png' || splic[splic.length-1] == 'jpg' || splic[splic.length-1] == 'gif' || splic[splic.length-1] == 'jpeg') {
        let formData = new FormData();
          formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
    .then((resp) => {
      if (resp.code == 'success') {
        this.formCustom.labelUrl = resp.data
        this.imgnum = 1
      } else {
      }
    })
    .catch(() => {
    })
      this.formCustom.producticon = file.name
      return false
      }
    },
    // 列表查询
    inquire (num) {
    this.loading3 = true            
    let list = {
      name : this.value,
      pageNum: this.startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/loan/loanProduct/getLoanProductList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.loanProductList
        this.lengths = resp.data.loanProductList.length-1
        this.total = Number(resp.data.total)
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        this.loading3 = false
      } else {
        this.loading3 = false
      }
    })
    .catch(() => {
      this.loading3 = false
    })
    }
  },
  mounted () {
    // 列表初始化
    this.inquire()
  }
}
</script>
<style lang="less" scoped>
.productlogo{
  height: auto;
  img{
    width: 80px;
    height: 80px;
  }
}
.newtype_file .ivu-form-item{
  margin-bottom: 20px
}
.newtype_file .ranges{
  margin-bottom: 0
}
.loan_products{
  height: 500px;
  overflow-y: scroll
}
</style>
