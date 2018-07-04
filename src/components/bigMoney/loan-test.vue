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
            <Button type="info" class="ml100 w100">查询</Button>
        </div>
        <Button type="primary" shape="circle" class="mt20" icon="plus-round" @click="refuse">添加贷款产品</Button>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
        </div>
        <Modal
          title="贷款产品设置"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:200px">
              <FormItem label="产品ID:" prop="productid" >
                <Input v-model="formCustom.productid" disabled placeholder="请输入产品ID" style="width: 300px"></Input>
              </FormItem>
              <FormItem label="产品LOGO:" prop="productlogo" class="productlogo">
                <img src="../../image/head-portrait.jpg" alt="" class="left">
                <Input v-model="formCustom.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5"></Input>
                <Upload
                :before-upload="handleUpload"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/">
                  <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">预览</Button>
                </Upload>
              </FormItem>
              <FormItem label="产品标签图标:" prop="producticon" class="productlogo" >
                <img src="../../image/head-portrait.jpg" alt="" class="left">
                <Input v-model="formCustom.producticon" disabled style="width: 120px;margin-top:24px" class="left ml5"></Input>
                <Upload
                :before-upload="handleUploadicon"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/">
                  <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:24px">预览</Button>
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
                <Option value="anzuo">范围</Option>
                <Option value="ios">固定</Option>
              </Select>
            </FormItem>
            <FormItem label="额度范围:" prop="range">
              <Input  v-model="formCustom.range" placeholder="请输入起始金额" style="width: 100px"></Input>
              <Select v-model="formCustom.object" placeholder="请选择" style="width:60px">
                <Option selected value="quanbu">元</Option>
                <Option value="zd">千元</Option>
                <Option value="zd1">万元</Option>
              </Select>
              &nbsp;至&nbsp;
              <Input  v-model="formCustom.rangeend" placeholder="请输入结束金额" style="width: 100px"></Input>
              <Select v-model="formCustom.object" placeholder="请选择" style="width:60px">
                <Option selected value="quanbu">元</Option>
                <Option value="zd">千元</Option>
                <Option value="zd1">万元</Option>
              </Select>
            </FormItem>
            <FormItem label="利率类型:" prop="ratetype" >
              <Select v-model="formCustom.ratetype" placeholder="请选择" style="width:300px" >
                <Option value="5">日利率</Option>
                <Option value="6">月利率</Option>
                <Option value="7">年利率</Option>
                <Option value="6">每期利率</Option>
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
      loading: true,
      formCustom: {
        productid: 'aaaa11',
        productlogo: '',
        producticon: '',
        name: '',
        subtitle: '',
        explain: '',
        types: '',
        range: '',
        rangeend: '',
        ratetype: '',
        rate: '',
        producturl: ''
      },
      ruleCustom: {
        productlogo: { required: true, message: '请上传产品LOGO', trigger: 'blur' },
        producticon: { required: true, message: '请上传产品标签图标', trigger: 'blur' },
        name: { required: true, message: '请输入产品名称', trigger: 'blur' },
        subtitle: { required: true, message: '请输入产品副标题', trigger: 'blur' },
        explain: { required: true, message: '请输入产品说明', trigger: 'blur' },
        types: { required: true, message: '请选择额度类型', trigger: 'blur' },
        range: { required: true, message: '请输入额度范围', trigger: 'blur' },
        ratetype: { required: true, message: '请选择利率类型', trigger: 'blur' },
        rate: { required: true, message: '请输入利率', trigger: 'blur' },
        producturl: { required: true, message: '请输入产品URL', trigger: 'blur' }
      },
      columns7: [
        {
          title: '产品ID',
          align: 'center',
          key: 'productid'
        },
        {
          title: '产品名称',
          align: 'center',
          key: 'productname'
        },
        {
          title: '产品logo',
          align: 'center',
          key: 'productlogo',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: require('../../image/pointed-star.png')
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
          key: 'productvice'
        },
        {
          title: '产品说明',
          align: 'center',
          key: 'productDescription',
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
                  title: params.row.productDescription
                }
              }, params.row.productDescription)
            ])
          }
        },
        {
          title: '贷款额度',
          align: 'center',
          key: 'loanLimit'
        },
        {
          title: '利率类型',
          align: 'center',
          key: 'interesttype'
        },
        {
          title: '利率',
          align: 'center',
          key: 'interest'
        },
        {
          title: 'URL',
          align: 'center',
          ellipsis: true,
          key: 'url',
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
                  title: params.row.url
                }
              }, params.row.url)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 220,
          render: (h, params) => {
            let type = 'success'
            let shelf = [
              h('span', {}, params.row.onshelf)
            ]
            if (params.row.onshelf == '上架') {
              type = 'success'
            } else {
              type = 'warning'
            }
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
                    this.refuse()
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
                    if (params.row.onshelf == '上架') {
                      params.row.onshelf = '下架'
                    } else {
                      params.row.onshelf = '上架'
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
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]
            if (params.index != 9) {
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
                      this.downshelf(params.index)
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
                      this.onshelf(params.index)
                    }
                  }
                }, '上移')
              )
            }
            return h('div', listbut)
          }
        }
      ],
      data6: [
        {
          productid: 'DWQ001',
          productname: '海尔金融',
          productvice: '主打低利率',
          productDescription: '1分钟申请，步骤极简，3小时快速审批',
          loanLimit: '1000-5000',
          interesttype: '日利率',
          interest: '0.35%',
          url: 'http://channel.kaixinfenqi.cn/h5/extension?invite_code=2msaio&user_from=24&appName=kxfq&channelType=2',
          onshelf: '上架'
        },
        {
          productid: 'DWQ001',
          productname: '海尔金融1',
          productvice: '主打低利率1',
          productDescription: '1分钟申请，步骤极简，3小时快速审批',
          loanLimit: '1000-5000',
          interesttype: '日利率',
          interest: '0.35%',
          url: 'http://channel.kaixinfenqi.cn/h5/extension?invite_code=2msaio&user_from=24&appName=kxfq&channelType=2',
          onshelf: '上架'
        },
        {
          productid: 'DWQ001',
          productname: '海尔金融2',
          productvice: '主打低利率2',
          productDescription: '1分钟申请，步骤极简，3小时快速审批',
          loanLimit: '1000-5000',
          interesttype: '日利率',
          interest: '0.35%',
          url: 'http://channel.kaixinfenqi.cn/h5/extension?invite_code=2msaio&user_from=24&appName=kxfq&channelType=2',
          onshelf: '上架'
        }
      ]
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
      // console.log(this.data6[index])
    },
    onshelf (index) {
      let num = index - 1
      let objectlist = this.data6[index]
      this.data6.splice(index, 1)
      this.data6.splice(num, 0, objectlist)
    },
    refuse () {
      this.modal9 = true
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {
          this.$Message.error('Success!')
        }
        setTimeout(() => {
          this.changeLoading()
          this.modal9 = false
          // this.formCustom.name = ''
          this.$Message.success('done')
        }, 1000)
      })
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    handleUpload (file) {
      this.formCustom.productlogo = file.name
    },
    handleUploadicon (file) {
      this.formCustom.producticon = file.name
    }
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
</style>
