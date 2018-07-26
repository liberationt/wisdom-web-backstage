<template>
    <div>
        <div class="navigation">
            <p>
                <span>黑名单管理</span>
            </p>
        </div>
        <!-- <Tabs type="card" :animated="false"> -->
          <div class="mt50">
            <span>手机号:</span>
            <Input v-model="model1" placeholder="请输入手机号" class="mr20" style="width: 200px"></Input>
            <span>创建时间:</span>
            <DatePicker type="date" :value="value1" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :value="value2" @on-change="time2" placeholder="结束时间" style="width: 200px"></DatePicker>
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right" type="primary">导出</Button> -->
                <Button class="left mr20 w200 " type="info" @click="updatelist">上传黑名单列表</Button>
                <!-- <Button class="left mr20 w100 " type="info" @click="inquire">查询</Button> -->
                <Button type="info" class="left mr20 w100" :loading="loading3" @click="inquire">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>
        <div class="mt20">
            <Table border highlight-row :columns="columns7" :data="data6"></Table>
        </div>
        <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
         <Modal
          title="上传黑名单"
          v-model="modal9"
          @on-ok="handleSubmit('formCustom')"
          @on-cancel="handleReset('formCustom')"
          ok-text="上传"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <Row>
            <Col span="10" offset="6">
              <div class="mt50">
                <ul>
                  <li class="clearfix updatel">
                    <span class="left lh32">选择文件:</span>
                    <Input v-model="namelist" disabled style="width: 200px" class="left ml5"></Input>
                    <Upload
                      :before-upload="handleUpload"
                      :show-upload-list="false"
                      :format="['xlsx', 'xls']"
                      :on-format-error="handleFormatError2"
                      action=''>
                      <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
                    </Upload>
                  </li>
                    <li class="mt15 clearfix">
                      <span class="left lh32">上传模板:</span>
                      <a :href="value3" class="blue1 left lh32 ml5" >{{hrefxls}}</a>
                    </li>
                  <!-- <li class="mt50">
                      <Button class="w100 ml50  " type="info" id="upload"  @click="upload">上传</Button>
                      <Button class="w100 ml50" @click="cancel">取消</Button>
                  </li> -->
                  </ul>
              </div>
            </Col>
          </Row>
        </Modal>
    <!-- </Tabs> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      model1: '',
      value1: '',
      value2: '',
      value3: '',
      hrefxls: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      filename: '',
      namelist: '',
      loading: true,
      columns7: [
        {
          title: 'NO',
          align: 'center',
          render: (h, params) => {          
            return h('div', [
              h('span', {
              }, params.index+1)
            ])
          }
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '备注',
          align: 'center',
          key: 'memo'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: '编辑',
          key: 'address',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                    this.delete (params.row.blackCode)
                    // this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data6: [],
      modal9: false,
      uploadl: '',
    }
  },
  methods: {
    // 上传弹框
    handleReset (name) {
      this.namelist = ''
    },
    // 分页
    updatelist(){
      this.modal9 = true
    },
    pageChange (page) {
      this.startRow = page
      this.inquire()
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    handleUpload(file) {
      let splic = file.name.split('.')
			if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
      let formData = new FormData()
				formData.append('file', file)
				formData.append('bucket', 'netmoney')
				formData.append('dirs', 'blacklist')
				let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout:1000*60*5
				}
				this.http.post(BASE_URL + '/fileUpload', formData, config)
				.then((resp) => {
				if (resp.code == 'success') {
          this.filename = resp.data
          this.uploadl = 'success'
				} else {
				}
				})
				.catch(() => {
        })
          this.namelist = file.name
          return false
        }
    },
    // 上传格式校验
    handleFormatError2(file) {
      this.namelist = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 上传文件
    // 上传
    handleSubmit () {
      if (this.namelist == '') {
        this.changeLoading()
        const title = '上传文件'
        let content = '<p>请先上传文件</p>'
        this.$Modal.warning({
          title: title,
          content: content
        })
        return false
      } else if(this.uploadl == ''){
        this.changeLoading()
        const title = '上传报表'
        let content = '<p>文件过大，请再点击一次！</p>'
        this.$Modal.warning({
        title: title,
        content: content
        })
        return false
      } else {
        let	url = this.filename
        this.http.get(BASE_URL + '/loan/pushBlack/uploadFileExcel?url='+url)
        .then((resp) => {
          if (resp.code == 'success') {
            this.changeLoading()
            const title = '上传名单'
            let content = '<p>上传成功</p>'
            this.$Modal.success({
              title: title,
              content: content
            })
            this.modal9 = false
            this.namelist = ''
            this.inquire()
          } else {
            this.$Message.info(resp.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.modal9 = false
          this.namelist = ''
          this.changeLoading()
          const title = '上传名单'
          let content = '<p>上传失败</p>'
          this.$Modal.success({
            title: title,
            content: content
          })
          })  
        }
    },
     // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    inquire () {
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
      }
      let list = {
        phone : this.model1,
        beginTime : this.value1,
        endTime  : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/pushBlack/getPushBlackListBy', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data6 = resp.data.pushBlackReqList
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
    },
    // 删除
    delete (code) {
      let list = {
        blackCode : code,
        dataFlag :0
      }
      this.http.post(BASE_URL + '/loan/pushBlack/updatePushBlackByCode', list)
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
    },

  },
  mounted () {
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
    this.inquire ()
    this.hrefxls = 'shangchuanheimingdan.xlsx'
    this.value3 = 'https://wisdom-netmoney.oss-cn-shanghai.aliyuncs.com/exceltemplate/black_list.xlsx'
  }
}
</script>
<style lang="less" scoped>
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
.updatel {
  width: 400px;

}
.ivu-col-offset-6 {
  margin-left: 10px !important;
}
.ivu-row{
  padding-bottom: 25px !important;
}
</style>
