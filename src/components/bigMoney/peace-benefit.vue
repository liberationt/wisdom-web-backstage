<template>
    <div>
        <div class="navigation">
            <p>
                <span>推广批次报表</span>
            </p>
        </div>
        <div class="mt50">
            <span>甲方名称:</span>
            <Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">平安普惠</Option>
            </Select>
            <span>文件名称:</span>
            <Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 200px"></Input>
            <span>推送时间:</span>
            <DatePicker type="date" @on-change='time1' placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" @on-change='time2' placeholder="结束时间" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <Button class="right w100" type="primary" @click="refuse">上传文件</Button>
                <!-- <Button class="right mr20 w100" type="info" @click="registered">查询</Button> -->
                 <Button type="info" class="right mr20 w100" :loading="loading3" @click="registered">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>
        <div class="mt20">
            <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        <Modal
          title="上传文件"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="handleReset"
          ok-text="提交"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 pl10">
           <ul>
            <li>
                <span>甲方名称:</span>
                <span>平安普惠</span>
            </li>
            <li class="mt15">
                <span>主体名称:</span>
                <span>{{zhuname}}</span>
            </li>
            <li class="mt15 clearfix">
                <span class="left lh32">上传文件:</span>
            <Input v-model="value9" disabled style="width: 225px" class="left ml5"></Input>
            <Upload
            :before-upload="handleUpload"
            :show-upload-list="false"
            :format="['xlsx', 'xls']"
            :on-format-error="handleFormatError2"
            :max-size="12800"
            action=''>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
            </li>
        </ul>
          </div>
          </Modal>
       
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '平安普惠',
      model2: '',
      model3: '',
      modal9: false,
      loading: true,
      value9: '',
      cityList: [
        {
          value: '平安普惠',
          label: '平安普惠'
        }
      ],
      columns7: [
        {
          title: '批次',
          align: 'center',
          width: 150,
          key: 'batchCode'
        },
        {
          title: '文件名称',
          align: 'center',
          width: 160,
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
                  title: params.row.fileName
                }
              }, params.row.fileName)
            ])
          }
        },
        {
          title: '推送主体',
          align: 'center',
          key: 'pushMain'
        },
        {
          title: '上传时间',
          align: 'center',
          width: 160,
          key: 'dataCreateTime'
        },
        {
          title: '上传条数',
          align: 'center',
          key: 'sendNum'
        },
        {
          title: '上传成功条数',
          align: 'center',
          key: 'succNum'
        },
        {
          title: '上传失败条数',
          align: 'center',
          key: 'failNum'
        },
        {
          title: '上传失败详情',
          align: 'center',
          key: 'uploadFailUrl',
          render: (h, params) => {
            if(params.row.uploadFailUrl != null){
              return h('div', [
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
                      this.$router.push({ path: params.row.uploadFailUrl })
                    }
                  }
                }, '下载')
              ])
            }
            
          }
        },
        {
          title: '推送成功条数',
          align: 'center',
          key: 'pull_succ_num + pullFailNum'
        },
        {
          title: '推送失败条数',
          align: 'center',
          key: 'pullFailNum'
        },
        {
          title: '转化成功条数',
          align: 'center',
          key: 'pullSuccNum'
        },
        {
          title: '推送详情',
          key: 'address',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                    this.$router.push({ path: './insuranceReport?id='+params.row.batchCode+'&&pushname='+this.pushname1 })
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      data6: [
        {
          batch: '180601001',
          pattern: '自动',
          name: '大地',
          theme: '哈哈',
          partyname: '啦啦',
          starttime: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0',
          remarks: '哈哈'
        },
        {
          batch: '180601001',
          pattern: '自动',
          name: '大地',
          theme: '哈哈',
          partyname: '啦啦',
          starttime: '2018/06/01 12:00:20',
          pushnum: '1000',
          successnum: '1000',
          errornum: '0',
          remarks: '哈哈'
        }
      ],
      value1 : '',
      value2 : '',
      zhuname:'',
      filename2: '',
      batchKey: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      pushname1: '',
      loading3: false
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered ()
    },
    pagesizechange (page) {
      this.endRow = page
      this.registered ()
    },
    rowClassName (row, index) {
      if (index === 0) {
        return 'demo-table-info-row'
      }
      return ''
    },
    refuse () {
      this.modal9 = true
    },
    upload () {
      if (this.value9 == '') {
        this.changeLoading()
        const title = '上传报表'
        let content = '<p>请先选择文件</p>'
        this.$Modal.warning({
        title: title,
        content: content
        })
        return false
      } else {
        if(this.zhuname ==  '卿见'){
          this.batchKey = 'partya-qingjian-pinganpuhui'
        }else if(this.zhuname ==  '保街'){
          this.batchKey = 'partya-baojie-pinganpuhui'
        }else if(this.zhuname ==  '本祥'){
          this.batchKey = 'partya-benxiang-pinganpuhui'
        }else if(this.zhuname ==  '坤玄'){
          this.batchKey = 'partya-kunxuan-pinganpuhui'
        }
        // let formData = new FormData();
        //   formData.append('partyaKey', this.batchKey);
        //   formData.append('filename', this.filename2);
        // let config = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }
        let list = {
						partyaKey: this.batchKey,
						url: this.filename2
					}
        this.http.post(BASE_URL + '/loan/batchLog/saveBatchLog', list).then(data=>{
          if(data.code == 'success'){
            this.changeLoading()
            const title = '上传文件'
            let content = '<p>上传成功</p>'
            this.$Modal.success({
              title: title,
              content: content
            })
            this.modal9 = false
            this.value9 = ''
            this.registered()
          } else {
             this.changeLoading()
            const title = '上传文件'
            let content = '<p>上传失败</p>'
            this.$Modal.success({
              title: title,
              content: content
            })
            this.modal9 = false
            this.value9 = ''
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    handleUpload (file) {
      let splic = file.name.split('.')
				if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
          let formData = new FormData()
          formData.append('file', file)
          formData.append('bucket', 'netmoney')
          formData.append('dirs', 'excelfile')
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.http.post(BASE_URL + '/fileUpload', formData, config)
        .then((resp) => {
          if (resp.code == 'success') {
            this.filename2 = resp.data
          } else {
          }
        })
        .catch(() => {
        })
          this.value9 = file.name
        }
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleReset (name) {
      
    },
    jname(pushname) {
      if(pushname == 'qingjian'){
        this.model1 = '卿见'
        this.zhuname = '卿见'
        this.pushname1 = 'qingjian'
        this.batchKey = 'partya-qingjian-pinganpuhui'
        this.cityList = [{
          value: '卿见',
          label: '卿见'
        }]
      } else if(pushname == 'baojie'){
        this.model1 = '保街'
        this.zhuname = '保街'
        this.pushname1 = 'baojie'
        this.batchKey = 'partya-baojie-pinganpuhui'
        this.cityList = [{
          value: '保街',
          label: '保街'
        }]
      } else if(pushname == 'benxiang'){
        this.model1 = '本祥'
        this.zhuname = '本祥'
        this.pushname1 = 'benxiang'
        this.batchKey = 'partya-benxiang-pinganpuhui'
        this.cityList = [{
          value: '本祥',
          label: '本祥'
        }]
      } else if(pushname == 'kunxuan'){
        this.model1 = '坤玄'
        this.zhuname = '坤玄'
        this.pushname1 = 'kunxuan'
        this.batchKey = 'partya-kunxuan-pinganpuhui'
        this.cityList = [{
          value: '坤玄',
          label: '坤玄'
        }]
      }
    },
    // 文件格式判断
    handleFormatError2(file) {
      this.value9 = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    registered () {
      this.loading3 = true
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      };
      let list = {
        fileName : this.model2,
        beginTime : this.value1,
        endTime : this.value2,
        partyaKey: this.batchKey,
        pageNum: this.startRow,
        pageSize: this.endRow,
      }
      this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then(data=>{
        if(data.code = 'success'){
          this.total = Number(data.data.total)
          this.startRow = Math.ceil(data.data.startRow/this.endRow)
          this.data6 = data.data.batchLogList;
          this.loading3 = false
        }
        if(parseInt(data.data.total) == '0') {
          this.startRow = 1
        }
      }).catch(err=>{
        console.log(err)
        this.loading3 = false
      })
    }
    // handleSubmit (name) {
    //   this.$refs[name].validate(valid => {
    //     if (!valid) {
    //       return this.changeLoading()
    //     } else {
    //       this.$Message.error('Success!')
    //     }
    //     setTimeout(() => {
    //       this.changeLoading()
    //       this.modal9 = false
    //       // this.formCustom.name = ''
    //       this.$Message.success('done')
    //     }, 1000)
    //   })
    // },
  },
  created() {
    let pushname = this.$route.query.pushname
    this.jname(pushname)
    let list = {
      partyaKey:this.batchKey,
    };
    this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then((resp)=>{
      if(resp.code == 'success'){
          this.data6 = resp.data.batchLogList;
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          if(parseInt(resp.data.total) == '0') {
                this.startRow = 1
          }
      }
    }).catch((err)=>{
      console.log(err)
    });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route( to , from ){
      let pushname = this.$route.query.pushname
      this.jname(pushname)
        let list = {
        partyaKey:this.batchKey,
      };
      this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then((resp)=>{
        if(resp.code == 'success'){
          this.data6 = resp.data.batchLogList;
          this.total = Number(resp.data.total)
          this.startRow = Math.ceil(resp.data.startRow/this.endRow)
          if(parseInt(resp.data.total) == '0') {
            this.startRow = 1
          }
        }
      }).catch((err)=>{
        console.log(err)
      });
      // 详情列表
    }
  }
}
</script>
<style lang="less" scoped>

</style>
