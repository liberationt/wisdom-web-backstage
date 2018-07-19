<template>
    <div>
        <div class="navigation">
            <p>
                <span>渠道推广链接管理</span>
            </p>
        </div>
        <div class="mt50 p20">
            <Select v-model="model1" @on-change='queryl' style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="value" placeholder="" style="width: 100px" class="mr20"></Input>
            <span>更新时间:</span>
            <DatePicker type="date" @on-change="time1"  placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" @on-change="time2"  placeholder="结束时间" style="width: 200px"></DatePicker>
            <!-- <Button class=" ml100 w100 " type="info" @click="inquire">查询</Button> -->
            <Button type="info" class=" mr20 w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            <div class="clearfix mr100 mt20">
                <Button type="primary" shape="circle" icon="plus-round" @click="refuse">添加渠道</Button>
            </div>
        </div>
        <div class="">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        <Modal
          title="渠道设置"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text='保存'
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="800"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 ">            
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100" style="padding-left:150px">
             <FormItem label="渠道链接:" prop="category" >
              <Select v-model="formCustom.category" placeholder="请选择渠道链接" :disabled="judge=='1'" style="width:300px">
                  <Option v-for="item in optionlac" @click.native='hqurl(item.urlUrl)' :value="String(item.urlCode)" :key="item.urlCode">{{ item.urlName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="渠道编号:" prop="serialnum">
                <Input  v-on:input ="myfamily" v-model="formCustom.serialnum" :disabled="judge=='1'" placeholder="请输入渠道编号" class="inputl" style="width: 300px"></Input>
            </FormItem>
              <FormItem label="渠道供应商:" prop="productid" >
                <Select v-model="formCustom.productid" :disabled="judge=='1'" placeholder="请选择渠道供应商"  :class="" style="width:300px">
                  <Option v-for="item in optioncha"  @click.native='hqurli(item.supplierKey)' :value="String(item.supplierCode)" :key="item.supplierCode">{{ item.supplierName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="渠道名称:" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入渠道名称" class="inputl" style="width: 300px"></Input>
              </FormItem>             
              <FormItem label="渠道标签:" prop="types">
                <Input v-model="formCustom.types" placeholder="请输入渠道标签" class="inputl" style="width: 300px"></Input>
              </FormItem>
              <FormItem label="推广URL:">
                <Input v-model="formCustom.links" disabled  class="inputl" style="width: 300px"></Input>
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
      model1: '全部',
      value: '',
      value1: '',
      value2: '',
      modal9: false,
      loading: true,
      total: 0,
      startRow: 1,
      endRow: 10,
      code: '',
      formCustom: {
        name: '',
        types: '',
        productid: '',
        links: '',
        category: '',
        serialnum: ''
      },
      ruleCustom: {
        category: [
          { required: true, message: '请选择渠道类别', trigger: 'change', }, 
          // { type: 'string', message: '请选择供应商', trigger: 'blur' } //  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        ],
        serialnum: [{ required: true, message: '请输入渠道编号', trigger: 'blur', },
          { max: 20, message: '输入内容超限，请重新输入!', trigger: 'blur' },
          {required: true, message: '请输入正确的渠道编号', pattern: /^[a-zA-Z0-9]+$/, trigger: 'blur'}
        ],
        types: [
          { required: true, message: '请输入渠道标签', trigger: 'blur', }, 
          // { type: 'string', message: '请选择供应商', trigger: 'blur' } //  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        ],
        name: [{ required: true, message: '请输入渠道名称', trigger: 'blur', },
        { max: 25, message: '输入内容超限，请重新输入!', trigger: 'blur' },],
        productid: [
          { required: true, message: '请选择渠道供应商', trigger: 'change',},
          // { type: 'string', message: '请选择渠道', trigger: 'blur' } // pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        ]
      },
      optioncha: [],
      optionlab: [],
      optionlac: [],
      cityList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'channelNum',
          label: '渠道编号'
        },
        {
          value: 'manageName',
          label: '渠道名称'
        },
        {
          value: 'channelTag',
          label: '渠道标签'
        },
        {
          value: 'urlName',
          label: '渠道链接'
        },
        {
          value: 'supplierName',
          label: '供应商名称'
        }
      ],
      columns7: [
        {
          title: '渠道链接',
          align: 'center',
          key: 'urlName'
        },
        {
          title: '渠道编号',
          align: 'center',
          key: 'channelNum'
        },
        {
          title: '渠道名称',
          align: 'center',
          key: 'manageName'
        },
        {
          title: '供应商名称',
          align: 'center',
          key: 'supplierName'
        },
        {
          title: '渠道标签',
          align: 'center',
          key: 'channelTag'
        },
        {
          title: 'URL',
          align: 'center',
          key: 'manageUrl'
        },
        {
          title: '更新时间',
          align: 'center',
          key: 'dataModifiedTime'
        },
        {
          title: '操作',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                      this.codel = params.row.manageCode
                      this.refusel(params.row.manageCode)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
                      this.delete (params.row.manageCode)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data6: [],
      queryli: '',
      supplierCode1: '',
      channelCode1: '',
      judge: 0,
      codel:'',
      turl:'',
      turli:'',
      loading3: false
    }
  },
  methods: {
    hqurl(url){
      this.turl = url
      this.formCustom.links = url + '?c=' +this.formCustom.serialnum + '&s='+ this.turli
    },
    myfamily(value){
      this.formCustom.links = this.turl + '?c=' + value + '&s='+ this.turli
    },
    hqurli(urll){
      this.turli = urll
      // console.log(urll)
      this.formCustom.links = this.turl + '?c=' +this.formCustom.serialnum + '&s='+ urll
    },
    // 分页
    pageChange (page) {
      this.startRow = page
      this.inquire()
    },
    pagesizechange (page) {
      this.endRow = page
      this.inquire()
    },
    // 查询 select
    queryl(value) {
      console.log(value)
      this.queryli = value
    },
    rowClassName (row, index) {
      if (index === 0) {
        return 'demo-table-info-row'
      }
      return ''
    },
    labelcon () {
      this.$router.push({ path: './channelLabelsz' })
    },
    channel () {
      this.$router.push({ path: './channelCategory' })
    },
    post(url,num){
      this.http.post(BASE_URL + url,num).then(data=>{
        if(data.code == 'success'){
          if(num == 1){
            this.optioncha = data.data
          }
          if(num == 2){
            this.optionlab = data.data
          }
          if(num == 3){
            this.optionlac = data.data
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    refuse () {
      this.modal9 = true
      this.judge = 0
      this.formCustom.links = ''
    },
    refusel (code) {
      this.http.post(BASE_URL + '/loan/promotionManage/getPromotionManageByCode?promotionManageCode='+code)
            .then((resp) => {
              if (resp.code == 'success') {
                this.formCustom.category = resp.data.urlCode
                this.formCustom.serialnum = resp.data.channelNum
                this.formCustom.productid = resp.data.supplierCode
                this.formCustom.name = resp.data.manageName
                this.formCustom.types = resp.data.channelTag
                this.formCustom.links = resp.data.manageUrl
              } else {

              }
            })
            .catch(() => {
            })  
      // document.getElementsByClassName('.inputl').attr('disabled')
      this.modal9 = true
      this.judge = 1
      this.code = code
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
          if (this.judge == 0){
            let list = {
              urlCode : this.formCustom.category,
              channelNum : this.formCustom.serialnum,//渠道编号
              manageName : this.formCustom.name,//渠道名称
              channelTag : this.formCustom.types,//渠道标签
              supplierCode : this.formCustom.productid,//渠道供应商
              // manageUrl: this.formCustom.links//推广url
            }
            console.log(list)
            this.http.post(BASE_URL + '/loan/promotionManage/savePromotionManage', list)
            .then((resp) => {
              if (resp.code == 'success') {
                const title = '保存'
                let content = '<p>保存成功</p>'
                this.$Modal.success({
                  title: title,
                  content: content
                })
                this.$refs[name].resetFields()
                this.modal9 = false
                this.inquire ()
              } else {
                this.changeLoading()
                this.modal9 = false
                // this.formCustom.name = ''
                this.$Message.success(resp.message)
                this.$refs[name].resetFields()
              }
            })
            .catch(() => {
            })  
          }
          // 新增
          if(this.judge == 1){
            let list = {
              manageCode : this.code,
              urlCode : this.formCustom.category,
              channelNum : this.formCustom.serialnum,//渠道编号
              manageName : this.formCustom.name,//渠道名称
              channelTag : this.formCustom.types,//渠道标签
              supplierCode : this.formCustom.productid,//渠道供应商
              // manageUrl: this.formCustom.links//推广url
            }
            this.http.post(BASE_URL + '/loan/promotionManage/updatePromotionManageByCode', list).then(data=>{
              if(data.code == 'success'){
                const title = '保存'
                let content = '<p>编辑成功</p>'
                this.$Modal.success({
                  title: title,
                  content: content
                })
                this.$refs[name].resetFields()
                this.modal9 = false
                this.inquire ()
              } else {
                this.changeLoading()
                this.modal9 = false
                // this.formCustom.name = ''
                this.$Message.success('编辑失败')
                this.$refs[name].resetFields()
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.formCustom.links = ''
    },
     // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    inquire() {
      this.loading3 = true
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.$Modal.warning({
          title: '更新时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let list = {
        channelNum : '',
        urlName : '',
        beginTime : this.value1,
        endTime : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow,
        manageName: '',
        supplierName: '',
        channelTag: ''
      }
      if(this.queryli == 'channelNum'){
        list.channelNum = this.value
      } else if(this.queryli == 'urlName'){
        list.urlName = this.value
      } else if(this.queryli == 'manageName'){
        list.manageName = this.value
      } else if(this.queryli == 'supplierName'){
        list.supplierName = this.value
      } else if(this.queryli == 'channelTag'){
        list.channelTag = this.value
      }
      this.http.post(BASE_URL + '/loan/promotionManage/getPromotionManageList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionManageList
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)   
          this.loading3 = false
        } else {

        }
      })
      .catch(() => {
        this.loading3 = false
      })
    },
    // 删除
    delete (code) {
      let list = {
        manageCode : code,
        dataFlag : 0
      }
      this.http.post(BASE_URL + '/loan/promotionManage/updatePromotionManageStateByCode',list)
      .then((resp) => {
      if (resp.code == 'success') {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认要删除吗?</p>',
          onOk: () => {
            this.inquire ()
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
  },
  mounted () {
    this.post('/loan/promotionSupplier/queryAllList',1)
    this.post('/loan/promotionChannel/queryAllList',2)
    this.post('/loan/promotionUrl/queryAllList',3)
    this.inquire ()
  }
}
</script>
<style lang="less" scoped>
</style>
