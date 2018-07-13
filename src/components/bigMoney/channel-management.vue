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
            <Button class=" ml100 w100 " type="info" @click="inquire">查询</Button>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <!-- <Button type="primary" class="mr20" shape="circle" icon="code-working" @click="labelcon">标签配置</Button>
                <Button type="primary" class="mr20" shape="circle" icon="android-options" @click="channel">渠道类别配置</Button> -->
                <Button type="primary" shape="circle" icon="plus-round" @click="refuse">新增</Button>
            </div>
        </div>
        <div class="">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-elevator show-sizer show-total></Page>
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
              <FormItem label="名称:" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入名称" class="inputl" style="width: 300px"></Input>
              </FormItem>
              <FormItem label="渠道:" prop="productid" >
                <Select v-model="formCustom.productid" placeholder="请选择渠道"  :class="" style="width:300px">
                  <Option v-for="item in optioncha" :value="String(item.supplierCode)" :key="item.supplierCode">{{ item.supplierName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="供应商:" prop="types">
                <Select v-model="formCustom.types" placeholder="请选择供应商"  :class="" style="width:300px">
                  <Option v-for="item in optionlab" :value="String(item.channelCode)" :key="item.channelCode">{{ item.channelName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="推广链接:" prop="links">
                <Select v-model="formCustom.links" placeholder="请选择推广链接"  :class="" style="width:300px">
                  <Option v-for="item in optionlac" :value="String(item.urlCode)" :key="item.urlCode">{{ item.urlName }}</Option>
                </Select>
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
      formCustom: {
        name: '',
        types: '',
        productid: '',
        links: ''
      },
      ruleCustom: {
        types: [
          { required: true, message: '请选择供应商', trigger: 'blur', }, 
          // { type: 'string', message: '请选择供应商', trigger: 'blur' } //  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        ], 
        name: [{ required: true, message: '请输入正确的名称', trigger: 'blur', }],
        productid: [
          { required: true, message: '请选择渠道', trigger: 'blur',},
          // { type: 'string', message: '请选择渠道', trigger: 'blur' } // pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        ],
        links: [
          { required: true, message: '请选择推广链接', trigger: 'blur',},
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
          value: 'manageName',
          label: '名称'
        },
        {
          value: 'urlName',
          label: '推广链接名称'
        },
        {
          value: 'channelName',
          label: '渠道名称'
        },
        {
          value: 'supplierName',
          label: '供应商名称'
        }
      ],
      columns7: [
        {
          title: '名称',
          align: 'center',
          key: 'channelName'
        },
        {
          title: '推广链接名称',
          align: 'center',
          key: 'urlName'
        },
        {
          title: '渠道名称',
          align: 'center',
          key: 'channelName'
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
          title: '修改时间',
          align: 'center',
          key: 'dataModifiedTime'
        },
        {
          title: '操作',
          key: 'address',
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
                      this.refusel(params.row.channelName, params.row.supplierCode, params.row.channelName, params.row.urlName)
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
      data6: [
        {
          batch: '180601001',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          suppliername: '啦啦',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0'
        },
        {
          batch: '180601001',
          pattern: '自动',
          time: '2018/06/01 12:00:20',
          suppliername: '啦啦',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0'
        }
      ],
      queryli: '',
      supplierCode1: '',
      channelCode1: '',
      judge: 0,
      codel:''
    }
  },
  methods: {
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
    },
    refusel (name, supplierCode, channell, urll) {
      // document.getElementsByClassName('.inputl').attr('disabled')
      this.formCustom.name = name,
      this.formCustom.types = channell,
      this.formCustom.links = urll,
      this.formCustom.productid = supplierCode,
      this.modal9 = true
      this.judge = 1    
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
              manageName : this.formCustom.name,
              channelCode : this.formCustom.types,
              supplierCode : this.formCustom.productid,
              urlCode: this.formCustom.links
            }
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
                this.$Message.success('保存失败')
                this.$refs[name].resetFields()
              }
            })
            .catch(() => {
            })  
          }
          if(this.judge == 1){
            let list = {
              // manageName : this.formCustom.name,
              channelCode : this.formCustom.types,
              supplierCode : this.formCustom.productid,
              urlCode: this.formCustom.links,
              manageCode : this.codel,
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
        manageName : '',
        urlName : '',
        beginTime : this.value1,
        endTime : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow,
        channelName: '',
        channelName: ''
      }
      if(this.queryli == 'manageName'){
        list.manageName = this.value
      } else if(this.queryli == 'urlName'){
        list.urlName = this.value
      } else if(this.queryli == 'channelName'){
        list.channelName = this.value
      } else if(this.queryli == 'supplierName'){
        list.supplierName = this.value
      }
      this.http.post(BASE_URL + '/loan/promotionManage/getPromotionManageList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.promotionManageList
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)   
        } else {

        }
      })
      .catch(() => {
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
        const title = '删除'
        let content = '<p>删除成功</p>'
        this.$Modal.success({
          title: title,
          content: content
        })
        this.inquire ()
  
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
