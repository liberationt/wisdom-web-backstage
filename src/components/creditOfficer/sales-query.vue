<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="model1" placeholder="坐席编号" style="width:100px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px;margin-left:-3px"></Input>
          </li>
          <li>
            <span class="ml20">基本信息状态:</span>
            <Select v-model="model4" placeholder="账户状态" style="width:150px;">
              <Option v-for="item in account" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">实名状态:</span>
            <Select v-model="model5" placeholder="实名状态" style="width:150px;">
              <Option v-for="item in registerTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">审核状态:</span>
            <Select v-model="model6" placeholder="审核状态" style="width:150px;">
              <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">是否充值过:</span>
            <Select v-model="model7" placeholder="请选择" style="width:150px;">
              <Option v-for="item in userIsRechargeableList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">是否消费过:</span>
            <Select v-model="model8" placeholder="请选择" style="width:150px;">
              <Option v-for="item in userIsConsumeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li class="clearfix">
            <Button type="info" class=" ml50 left w100" :loading="loading3" @click="inquire">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            <Upload
              :before-upload="handleUpload"
              :show-upload-list="false"
              :format="['xlsx', 'xls']"
              :on-format-error="handleFormatError2"
              action=''
              class="left ml20"
              >
              <Button type="info" icon="ios-cloud-upload-outline">导入</Button>
            </Upload>
            <Button type="primary" class="ml20 w90 left" :loading="loading2" @click="exports">
              <span v-if="!loading2">导出</span>
              <span v-else>请稍等...</span>
            </Button>
          </li>
        </ul>     
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>      
      <!-- <Button class=" ml20 w100 " type="info" @click="updatelist">导入</Button> -->    
      <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    </div>
    
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      loading2: false,
      loading3: false,
      cityList: [],
      reaName: [],
      account: [],
      registerTime: [],
      userIsRechargeableList: [],
      userIsConsumeList:[],
      model1: '',
      model3: '',
      model4: '',
      model5: '',
      model6: '',
      model7: '',
      model8: '',
      name: '',
      filename:'',
      fileerror:'',
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
          title: '名单编号',
          key: 'nameNum',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '坐席编号',
          key: 'sitNum',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registerTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '基本信息状态',
          key: 'loanBaseStatus',
          align: 'center',
          minWidth: 110
        },       
        {
          title: '基本信息完成时间',
          key: 'loanBaseTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '实名状态',
          key: 'realStatus',
          align: 'center',
          minWidth: 100
        },
        {
          title: '审核状态',
          key: 'loanStatus',
          align: 'center',
          minWidth: 100
        },
        {
          title: '审核完成时间',
          key: 'auditTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '拒绝原因',
          key: 'refuseReason',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '是否充值过',
          key: 'loanRechargeStatus',
          align: 'center',
          minWidth: 100
        },
        {
          title: '首次充值时间',
          key: 'loanRechargeTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '累计充值赞豆',
          key: 'accountRechargeVirtual',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '是否消费过',
          key: 'userIsConsume',
          align: 'center',
          minWidth: 100
        },       
        {
          title: '最后一次消费赞豆',
          key: 'lastAccountConsumeVirtual',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '最后一次消费时间',
          key: 'lastAccountConsumeTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '累计消费赞豆',
          key: 'accountConsumeVirtual',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '赞豆余额',
          key: 'accountVirtual',
          minWidth: 100,
          align: 'center'
        }
      ],
      data6: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    // 列表查询
    inquire (num) {
    this.loading3 = true     
    let list = {
      loanBaseStatus : this.model4,
      realStatus : this.model5,
      loanStatus : this.model6,
      loanRechargeStatus: this.model7,
      userIsConsume : this.model8,
      pageNum: this.startRow,
      pageSize: this.endRow
    }
    list[this.model1] = this.name
    this.http.post(BASE_URL + '/loan/sale/querySaleList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
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
    // 上传
    handleUpload(file) {
       if(file.size > 22949339){
        this.value9 = ""
        this.$Message.info("请选择20兆以内的文件")
        return false
      }
      let splic = file.name.split('.')
			if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
        this.filename = ''
        this.fileerror = ''
      let formData = new FormData()
				formData.append('file', file)
				let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout:1000*60*5
				}
				this.http.post(BASE_URL + '/loan/sale/uploadFile', formData, config)
				.then((resp) => {
				if (resp.code == 'success') {
          this.filename = resp.data
          const title = '提示'
          let content = '<p>导入成功</p>'
          this.$Modal.success({
              title: title,
              content: content
          })
          
				} else {
          this.$Message.error(resp.message);
				}
				})
				.catch(err => {
          this.fileerror = 'error'
        })
          // this.namelist = file.name
          return false
        }
    },
    // 上传格式校验
    handleFormatError2(file) {
      this.namelist = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 导出
    exports () {
      this.loading2 = true;
      let urls = BASE_URL+'/loan/sale/csvDownload'
      let formData = new FormData()
      formData.append("loanBaseStatus",this.model4)
      formData.append("realStatus",this.model5)
      formData.append("loanStatus",this.model6)
      formData.append("loanRechargeStatus",this.model7)
      formData.append("userIsConsume",this.model8)
      formData.append(this.model1,this.name)
      utils.exporttable(urls, utils.getlocal('token'),formData, e => {
        if(e == true ){
          this.loading2 = false;
        }
      })
    },
  },
  
  created () {
    this.http.post(BASE_URL + '/loan/sale/getFilterConfig', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data.searchList
        this.model1 = resp.data.searchList[0].value
        this.reaName = resp.data.auditStatusList//审核状态
        this.account = resp.data.baseInfoStatusList//基本信息
        this.registerTime = resp.data.realNameStatusList//实名状态
        this.userIsRechargeableList = resp.data.userIsRechargeableList//是否充值过
        this.userIsConsumeList = resp.data.userIsConsumeList//是否消费过
        this.inquire ()

      } else {
      }
    })
    .catch(() => {
    })
    
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
