<template>
    <div>
        <div class="navigation">
            <p>
                <span>平安人寿</span>
            </p>
        </div>
        <div class="mt50">
          <ul class="querysty">
            <li>
              <span>推送主体:</span>
              <Select v-model="model1" style="width:200px" class="mr20">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <span>文件名称:</span>
              <Input v-model="model2" class="mr20" placeholder="请输入文件名称" style="width: 200px"></Input>
            </li>
            <li>
              <span>推送时间:</span>
              <DatePicker type="date" @on-change='time1' placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" @on-change='time2' placeholder="结束时间" style="width: 200px"></DatePicker>
            </li>
          </ul>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <Button class="right w100" type="primary" @click="refuse">上传文件</Button>
                <!-- <Button class="right mr20 w100 " type="info" @click="registered">查询</Button> -->
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
          <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
        </div>
        <Modal
          title="上传文件"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="handleReset"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 pl10">
           <ul>
            <li>
                <span>甲方名称:</span>
                <span>{{jianame}}</span>
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
            action="">
            <Button type="ghost" icon="ios-cloud-upload-outline">预览</Button>
        </Upload>
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
      model1: '坤玄',
      model2: '',
      value9: '',
      modal9: false,
      loading: true,
      cityList: [
        {
          value: '坤玄',
          label: '坤玄'
        }
      ],
      columns7: [
        {
          title: '批次',
          align: 'center',
          width: 140,
          key: 'batchCode'
        },
        {
          title: '文件名称',
          align: 'center',
          width: 150,
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
          align: 'center',
          width: 160,
          // key: 'pushMain', //{{ this.$route.query.name }}
          render: (h, params) => {
						return h('div', [
              h('span', {}, this.$route.query.name)
            ])
          }  
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
          width: 160,
          key: 'sendNum'
        },
        {
          title: '上传成功条数',
          align: 'center',
           width: 160,
          key: 'succNum'
        },
        {
          title: '上传失败条数',
          align: 'center',
           width: 160,
          key: 'failNum'
        },
        {
          title: '上传失败详情',
          align: 'center',
           width: 160,
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
                    console.log(params.row.uploadFailUrl)
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
          title: '推送总条数',
          align: 'center',
           width: 160,
          key: 'partyaSuccNum'
        },
        {
          title: '推送失败条数',
          align: 'center',
           width: 160,
          key: 'pullFailNum'
        },
        {
          title: '转化成功条数',
          align: 'center',
           width: 160,
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
                    this.$router.push({ path: './pinglife?id='+params.row.batchCode+'&&pushname='+this.pushname1 })
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      data6: [
      ],
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      jiakey: '',
      jianame: '',
      zhuname: '',
      filename2: '',
      pushname1: '',
      loading3: false
    }
  },
  methods: {
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered()
    },
    pagesizechange (page) {
      this.endRow = page
      this.registered()
    },
    handleReset() {},
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
        const title = '上传文件'
        let content = '<p>请先上传文件</p>'
        this.$Modal.warning({
          title: title,
          content: content
        })
        return false
      } else {
        let list = {
						partyaKey: this.jiakey,
            url: this.filename2,
            originName: this.value9
          }
          		// formData.append('file', file)
        this.http.post(BASE_URL + '/loan/batchLog/saveBatchLog', list).then(data=>{
          if(data.code == 'success'){
            this.changeLoading()
            const title = '上传名单'
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
        }).catch(err=> {
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
    //文件格式判断
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
    registered() {
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
        originName : this.model2,
        beginTime : this.value1,
        endTime : this.value2,
        partyaKey:this.jiakey,
        pageNum: this.startRow == 0 ? 1: this.startRow,
        pageSize: this.endRow,
      }
      this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then(data=>{
        if(data.code = 'success'){
          this.total = parseInt(data.data.total)
          this.startRow = Math.ceil(data.data.startRow/this.endRow)
          this.data6 = data.data.batchLogList;
          this.loading3 = false;
        }
        if(parseInt(data.data.total) == '0') {
          this.startRow = 1
        }
      }).catch(err=>{
        console.log(err)
        this.loading3 = false;
      })
    },
    jname(pushname) {
      if(pushname == 'luohui'){
        this.pushname1 = 'luohui'
        this.model1 = '络慧'
        this.jiakey = 'partya-luohui-pinganzx'
        this.jianame = '平安人寿'
        this.zhuname = '络慧'
        this.cityList = [{
          value: '络慧',
          label: '络慧'
        }]
      } else if(pushname == 'kunxuan'){
        this.pushname1 = 'kunxuan'
        this.model1 = '坤玄'
        this.jiakey = 'partya-kunxuan-pinganzx'
        this.jianame = '平安人寿'
        this.zhuname = '坤玄'
        this.cityList = [
          {
            value: '坤玄',
            label: '坤玄'
          }
        ]
      }
    } 
  },
  created() {
    let pushname = this.$route.query.life
    this.jname(pushname)
    let list = {
        partyaKey:this.jiakey,
        pageNum: this.startRow,
        pageSize: this.endRow,
    };
    this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then((resp)=>{
      if(resp.code == 'success'){
        this.data6 = resp.data.batchLogList;
        this.total = parseInt(resp.data.total) 
        if(parseInt(resp.data.total) == '0') {
          this.startRow = 1
        }
      }
    }).catch((err)=>{
      console.log(err)
    })
    // 列表初始化
    // this.registered()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route( to , from ){     
      let pushname = this.$route.query.life
      this.jname(pushname)
      let list = {
        partyaKey:this.jiakey,
        pageNum: this.startRow,
        pageSize: this.endRow,
      };
      this.http.post(BASE_URL + '/loan/batchLog/getBatchLogList', list).then((resp)=>{
        if(resp.code == 'success'){
          this.data6 = resp.data.batchLogList;
          this.total = parseInt(resp.data.total) 
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
