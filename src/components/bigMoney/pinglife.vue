<template>
    <div>
         <div class="navigation conheadtab">
            <p>
              <span class="navigation_batch" @click="batch">推送批次报表</span>
              <span class="navigation_detailed" @click="detailed">推送明细报表</span>
            </p>
        </div>
        <div class="conditioncss">
          <ul class="querysty">
            <li>
              <span class="w60 tr displayib">推送主体:</span>
              <Input v-model="model1" disabled class="mr20" style="width: 150px"></Input>
            </li>
            <li>
              <span class="w60 tr displayib">推送状态:</span>
              <Select v-model="model3" style="width:150px" class="mr20">
                  <Option  v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <span class="w60 tr displayib">推送时间:</span>
              <DatePicker type="date" :value="value1" @on-change='time1' placeholder="开始时间" style="width: 150px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" :value="value2" @on-change='time2' placeholder="结束时间" style="width: 150px"></DatePicker>
            </li>
            <li>
              <span class="w60 tr displayib">手机号:</span>
              <Input v-model="phones" class="mr20" placeholder="请输入手机号" style="width: 150px"></Input>
            </li>
            <li class="clearfix mr100">
              <Button type="primary" class="right w90" @click="reset">重置</Button>
              <Button type="primary" class="right w90 mr20" :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
              </Button>
              <Button type="info" class="right mr20 w90" :loading="loading3" @click="registered(1)">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
              </Button>
            </li>
          </ul>
        </div>
        <div class="mt10 contentcss">
            <Table border highlight-row :columns="columns1" :data="data1"></Table>
            <div class="tr mt15">
                <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
            </div>
        </div>
       
        <!-- 详细弹框 -->
        <Modal
        title="详细信息"
        v-model="modal10"
        class-name="vertical-center-modal">
        <p>IP：{{ip}}</p>
        <p>userAgent：{{userAgent}}</p>
        </Modal>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      model1: '络慧赠险',
      userAgent:'',
      ip:'',
      // cityList: [
      //   {
      //     value: '平安普惠',
      //     label: '平安普惠'
      //   }
      // ],
      model2: '',
      model3: '',
      phones:'',
      cityList3: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '未推送'
        },
        {
          value: '1',
          label: '成功'
        },
        {
          value: '2',
          label: '失败'
        }
      ],
      columns1: [
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          width: 140,
          // key: 'mobile',
          render: (h,params)=>{
            // console.log(params.row.mobile)
            return h('div', [
									h('Button', {
										props: {
											type: 'primary',
										},
										style: {
											marginRight: '5px'
										},
										on: {
											click: () => {
                        // console.log(params.row.kxpinganCode)
                        this.modal10 = true
                        this.userAgent = params.row.userAgent
                        this.ip = params.row.ip
											}
										}
								}, params.row.mobile)
							])
          }
        },
        {
          title: '推送方式',
          align: 'center',
          width: 125,
          render: (h, params) => {
            let Code
            if (params.row.origin == 0) {
              Code = '手动'
            } else if (params.row.origin == 1) {
              Code = '自动'
            }
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
        {
          title: '推送状态',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else if(params.row.pushStatus == '2') {
              pushStatus = '推送失败'
            } else if(!params.row.pushStatus){
              pushStatus = ''
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          minWidth: 160,
          key: 'pushTime'
        },
         {
          title: '结果代码',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let resultCode 
            if (params.row.resultCode == '0') {
              resultCode = '成功'
            } else if(params.row.resultCode == ''){
              resultCode = ''
            } else {
              resultCode = '失败'
            }
            return h('div', [
              h('span', {}, resultCode)
            ])
          }
        },
        {
          title: '城市',
          align: 'center',
          minWidth: 160,
          key: 'city'
        },
        {
          title: '性别',
          align: 'center',
          width: 80, //80, wsh
          render: (h, params) => {
            let sex 
            if (params.row.sex == 'M') {
              sex = '男'
            } else if (params.row.sex == 'F'){
              sex = '女'
            }
            return h('div', [
              h('span', {}, sex)
            ])
          }
        },
        {
          title: '生日',
          align: 'center',
          minWidth: 160,
          key: 'birthday'
        },
        {
          title: '媒体来源编号',
          align: 'center',
          width: 120,
          key: 'mediaSource'
        },
        {
          title: '投保日期',
          align: 'center',
          minWidth: 160,
          key: 'policyBeginTime'
        },
        {
          title: '备注',
          align: 'center',
          width: 100,
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
							title: params.row.memo
							}
						}, params.row.memo)
						])
						}
        },
        // {
        //   title: '保单号',
        //   align: 'center',
        //   width: 150,
        //   key: 'policyNo'
        // },
       
        {
          title: '错误代码',
          align: 'center',
          width: 100,
          key: 'errCode'
        },
        {
          title: '错误信息',
          align: 'center',
          width: 100,
          key: 'errMsg'
        },
        {
          title: '创建时间',
          align: 'center',
          minWidth: 160,
          key: 'dataCreateTime'
        },
        //wsh
        {
          title: '客户领取赠险或测保时间',
          align: 'center',
          minWidth: 180,
          key: 'caGuestTime'
        },
        {
          title: '平安人寿客户收入',
          align: 'center',
          minWidth: 160,
          key: 'caIncome'
        },
        {
          title: '平安人寿获取媒体',
          align: 'center',
          minWidth: 160,
          key: 'caServingMedia'
        },
        {
          title: '平安人寿赠险名称',
          align: 'center',
          minWidth: 160,
          key: 'caProductName'
        },
        {
          title: '平安人寿资产情况',
          align: 'center',
          minWidth: 160,
          key: 'caAsset'
        },
        {
          title: '平安人寿客户职业',
          align: 'center',
          minWidth: 180,
          key: 'caOccupation'
        },
      ],
      data1: [],
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      loading2: false,
      loading3: false,
      modal10: false
    }
  },
  methods: {
    // 重置
    reset () {
      this.model3 = ''
      this.value1 = ''
      this.value2 = ''
      this.phones = ''
      this.model2 = ''
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    // 分页
    pageChange (page) {
      this.startRow = page
      this.registered(this.startRow)
    },
    pagesizechange (page) {
      this.startRow = 1
      this.endRow = page
      this.registered(this.startRow)
    },
    post(url,list,pushname,num) {
      // console.log(this.$route.query.id)
     
       this.http.post(BASE_URL + url,list).then(data=>{
          if(data.code == 'success'){
            if(pushname == 'luohui'){
              this.data1 = data.data.zxLhpinganList
            } else if(pushname == 'kunxuan'){
              this.data1 = data.data.zxKxpinganList
            } else if(num == 1){
							this.total = parseInt(data.data.total)
							this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
						}
						this.total = parseInt(data.data.total) 
            this.loading3 = false
          }else {
            this.loading3 = false;
          }
       }).catch(err=>{
         console.log(err)
         this.loading3 = false;
       })
    },
      // 时间判断
    time1 (value, data) {
      this.value1 = value
    },
    time2 (value, data) {
      this.value2 = value
    },
    // 查询
    registered(startRow) {
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
      let params = {
        pushBatchNum :this.model2,
        pushStatus : this.model3,
        beginTime : this.value1,
        endTime : this.value2,
        mobile: this.phones,
        pageNum: startRow,
        pageSize: this.endRow,
			}
      let pushname = this.$route.query.pushname
      if(pushname == 'luohui'){
          this.post('/loan/zxLhpingan/getZxLhpinganList',params,pushname,1)
          this.model1 = '络慧赠险'
        } else if(pushname == 'kunxuan'){
          this.post('/loan/zxKxpingan/getZxKxpinganList',params,pushname,1)
          this.model1 = '坤玄赠险'
        }
    },
    // 导出
    exports () {
      this.loading2 = true;
      let pushname = this.$route.query.pushname
      let httpUrl
			if(pushname == 'luohui'){
        httpUrl = BASE_URL+'/loan/zxLhpingan/exportExcel'
      } else if(pushname == 'kunxuan'){
        httpUrl = BASE_URL+'/loan/zxKxpingan/exportExcel'
      }
      let formData = new FormData()
      formData.append("pushBatchNum",this.model2)
      formData.append("pushStatus",this.model3)
      formData.append("beginTime",this.value1)
      formData.append("endTime",this.value2)
      formData.append("mobile",this.phones)
      formData.append("methodType",1)
      utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
        if(e == true){
          this.loading2 = false;
        }
      })
    },
    batch () {
      let pushname = this.$route.query.pushname
      // this.jname(pushname)
      this.$router.push({ path: 'insuranceSetting?life='+pushname });
    },
    detailed() {

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
    this.model2 = this.$route.query.id
    let pushname = this.$route.query.pushname
    if(this.$route.query.id != ""){
      this.value2 = ''
      this.value1 = ''
    } else {
      this.value1 =  currentdate;
      this.value2 = currentdate;
    }
    let list = {
      pushBatchNum: this.$route.query.id,
      pushStatus : this.model3,
      beginTime : this.value1,
      endTime : this.value2,
      pageNum: this.startRow == 0 ? 1 : this.startRow,
      pageSize: this.endRow
    } 
    
		if(pushname == 'luohui'){
			this.post('/loan/zxLhpingan/getZxLhpinganList',list,pushname)
			} else if(pushname == 'kunxuan'){
			this.post('/loan/zxKxpingan/getZxKxpinganList',list,pushname)
		}
  }
}
</script>
<style lang="less" scoped>
.margin_top {
  margin-top: 20px;
}
.navigation_detailed {
   background-color: #2DB7F5;
}
.navigation_batch{
  background-color: #ccc;
}

.navigation_batch ,.navigation_detailed {
  display: inline-block;
  width: 140px;
  // background-color: #2DB7F5;
  text-align: center;
}
.navigation{
  background-color: #fff;
  
}
.navigation>p{
  padding-left: 0 !important;
}
</style>
