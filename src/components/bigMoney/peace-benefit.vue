<template>
    <div>
        <div class="navigation">
            <p>
              <span class="navigation_batch" @click="batch">推广批次报表</span>
              <span class="navigation_detailed" @click="detailed">推广明细报表</span>
            </p>
        </div>
        <div class="mt50">
          <ul class="querysty">
            <li>
              <span>甲方名称:</span>
              <Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">平安普惠</Option>
              </Select>
            </li>
            <li>
              <span>文件名称:</span>
              <Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 200px"></Input>
            </li>
            <li>
              <span>推送时间:</span>
              <DatePicker type="date" :value='value1' @on-change='time1' placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" :value='value2' @on-change='time2' placeholder="结束时间" style="width: 200px"></DatePicker>
            </li>
          </ul>
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
            <Table border highlight-row :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
        <Modal
          title="上传文件"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="handleReset"
          ok-text="上传"
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
                <span class="left lh32">选择文件:</span>
            <Input v-model="value9" disabled style="width: 225px" class="left ml5"></Input>
            <Upload
            :before-upload="handleUpload"
            :show-upload-list="false"
            :format="['xlsx', 'xls']"
            :on-format-error="handleFormatError2"
            :max-size="12800"
            action=''>
            <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
            </Upload>
            </li>
            <li class="mt15 clearfix">
              <span class="left lh32">上传模板:</span>
              <a :href="value3" class="blue1 left lh32 ml5" >{{hrefxls}}</a>
            </li>
        </ul>
          </div>
          </Modal>
       
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      cleardate:'',
      cleardate1:'',
      model1: '平安普惠',
      model2: '',
      model3: '',
      modal9: false,
      loading: true,
      value9: '',
      hrefxls: '',
      value3: '',
      cityList: [
        {
          value: '平安普惠',
          label: '平安普惠'
        }
      ],
      columns7: [
        // {
        //   title: '批次',
        //   align: 'center',
        //   width: 150,
        //   key: 'batchCode'
        // },
        {
          title: '文件名称',
          align: 'center',
          width: 170,
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
                  title: params.row.originName
                }
              }, params.row.originName)
            ])
          }
        },
        {
          title: '推送主体',
           width: 160,
          align: 'center',
          key: 'mediaName'
        },         
         {
          title: '推送总条数',
          align: 'center',
           width: 115,
           render: (h, params) => {
            let Code = params.row.pullSuccNum+params.row.pullFailNum
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
        {
          title: '推送失败条数',
          align: 'center',
           width: 110,
          key: 'pullFailNum'
        },
       {
          title: '推送详情',
          key: 'address',
          width: 180,
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
        },
        {
          title: '上传时间',
          align: 'center',
          width: 170,
          key: 'dataCreateTime'
        },
        {
          title: '上传条数',
          align: 'center',
           width: 110,
          key: 'sendNum'
        },
        {
          title: '上传成功条数',
          align: 'center',
           width: 115,
          key: 'succNum'
        },
        {
          title: '上传失败条数',
          align: 'center',
           width: 115,
          key: 'failNum'
        },
        {
          title: '上传失败详情',
          align: 'center',
           width: 180,
          key: 'uploadFailUrl',
          render: (h, params) => {
            if(params.row.uploadFailUrl != null && params.row.uploadFailUrl != '' && params.row.failNum != 0){
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
                      let formData = new FormData()
                      formData.append("ossPath",params.row.uploadFailUrl)
                      let httpUrl = BASE_URL + '/fileOssDownload'
                      utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
                        if(e == true){
                          // alert(333)
                          // this.loading2 = false;
                        }
                      })
                    }
                  }
                }, '下载')
              ])
            }
            
          }
        },
       
        {
          title: '转化成功条数',
          align: 'center',
           width: 110,
          key: 'pullSuccNum'
        },
        
      ],
      data6: [
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
      loading3: false,
      uploadl: '',
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered ()
    },
    pagesizechange (page) {
      this.startRow = 1
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
      } else if(this.uploadl == ''){
        this.changeLoading()
        const title = '上传报表'
        let content = '<p>文件过大，请在点击一次！</p>'
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
            url: this.filename2,
            originName: this.value9,
            pushMain: this.zhuname
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
          this.modal9 = false
          this.namelist = ''
          this.changeLoading()
          const title = '上传文件'
          let content = '<p>上传失败</p>'
          this.$Modal.success({
            title: title,
            content: content
          })
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
            },
            timeout:1000*60*5
          }
          this.http.post(BASE_URL + '/fileUpload', formData, config)
        .then((resp) => {
          if (resp.code == 'success') {
            this.filename2 = resp.data
            this.uploadl = 'success'
          } else {
          }
        })
        .catch(() => {
        })
          this.value9 = file.name
          return false
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
        this.hrefxls = 'pinganpuhui_qj.xlsx'
        this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/pinganpuhui_qj.xlsx'
        this.cityList = [{
          value: '卿见',
          label: '卿见'
        }]
      } else if(pushname == 'baojie'){
        this.model1 = '保街'
        this.zhuname = '保街'
        this.pushname1 = 'baojie'
        this.batchKey = 'partya-baojie-pinganpuhui'
        this.hrefxls = 'pinganpuhui_bj.xlsx'
        this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/pinganpuhui_bj.xlsx'
        this.cityList = [{
          value: '保街',
          label: '保街'
        }]
      } else if(pushname == 'benxiang'){
        this.model1 = '本祥'
        this.zhuname = '本祥'
        this.pushname1 = 'benxiang'
        this.batchKey = 'partya-benxiang-pinganpuhui'
        this.hrefxls = 'pinganpuhui_bx.xlsx'
        this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/pinganpuhui_bx.xlsx'
        this.cityList = [{
          value: '本祥',
          label: '本祥'
        }]
      } else if(pushname == 'kunxuan'){
        this.model1 = '坤玄'
        this.zhuname = '坤玄'
        this.pushname1 = 'kunxuan'
        this.batchKey = 'partya-kunxuan-pinganpuhui'
        this.hrefxls = 'pinganpuhui_kx.xlsx'
        this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/pinganpuhui_kx.xlsx'
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
        this.loading3 = false
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      };
      let list = {
        originName : this.model2,
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
    },
    batch() {
      // alert(21)
    },
    detailed() {
      // alert(222)
      let pushname = this.$route.query.pushname
      // this.jname(pushname)
      this.$router.push({ path: 'insuranceReport?id=""&pushname='+pushname });
    }
  },
  created() {
    var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
			month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			this.value1 =  currentdate;
			this.value2 = currentdate;
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
      this.model2 = ''
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
.navigation_batch ,.navigation_detailed {
  display: inline-block;
  width: 140px;
  background-color: #2DB7F5;
  text-align: center;
}
.navigation{
  background-color: #fff;
  
}
.navigation>p{
  padding-left: 0 !important;
}
.navigation_detailed {
  background-color: #ccc;
}
</style>
