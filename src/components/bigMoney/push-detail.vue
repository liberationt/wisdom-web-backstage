<template>
    <div>
        <div class="navigation">
            <p>
                <span>贷款推送明细</span>
            </p>
        </div>
        <div class="mt50">
          <ul class="querysty">
            <li>
              <span class="w60 displayib">甲方名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.partyaKey" :key="item.partyaKey">{{ item.partyaName }}</Option>
            </Select>
            </li>
            <li>
              <span class="w60 displayib">推送时间:</span>
              <DatePicker type="date" @on-change="time1" confirm placeholder="开始时间" class="" style="width: 190px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" class="mr20" @on-change="time2" confirm placeholder="结束时间" style="width: 190px"></DatePicker>
            </li>
            <li>
              <span class="w60 displayib">批次号:</span>
            <Input v-model="model5" class="mr20" placeholder="请输入批次号" style="width: 180px"></Input>
            </li>
            <li>
              <span class="w60 displayib">推送状态:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </li>
            <li v-if="fashionmod">
              <span class="w60 displayib">推送方式:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </li>
          </ul> 
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right w100" type="primary" @click="exports">导出</Button> -->
                <Button type="primary" class="right w100" :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>
                <!-- <Button class="right mr20 w100" type="info" @click="inquire">查询</Button> -->
                <Button type="info" class="right mr20 w100" :loading="loading3" @click="inquire">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>

        <div class="mt20">
            <Table :columns="party1" :data="data1"></Table>
        </div>
        <div class="tr mt15">
            <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
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
      fashionmod: false,
      model1: this.$route.query.code,
      model2: '',
      model3: '',
      model4: '',
      model5: '',
      value1: '',
      value2: '',
      total: 0,
			startRow: 1,
			endRow: 10,
      numregistrations: [
        {
          onenum: 10,
          twonum: 10,
          color: 'blue1',
          totalnum: '当日注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'yellow1',
          totalnum: '本周注册总人数'
        },
        {
          onenum: 10,
          twonum: 10,
          color: 'purple1',
          totalnum: '本月注册总人数'
        }
      ],
      cityList: [],
      cityList2: [
        {
          value: '0',
          label: '未推送'
        },
        {
          value: '1',
          label: '推送成功'
        },
        {
          value: '2',
          label: '推送失败'
        }
      ],
      cityList3: [
        {
          value: '0',
          label: '手动'
        },
        {
          value: '1',
          label: '自动'
        }
      ],
      cityList4: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        }
      ],
      party1: [],
      // 车抵贷
      columns1: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },        
        {
          title: '借款产品类型',
          align: 'center',
          render: (h, params) => {
            let borrowType 
            if (params.row.borrowType == '0') {
              borrowType = '车抵贷'
            } else if(params.row.borrowType == '1'){
              borrowType = '房抵贷'
            } else if(params.row.borrowType == '2'){
              borrowType = '秒速贷'
            } else if(params.row.borrowType == '3'){
              borrowType = '微易融'
            } else if(params.row.borrowType == '4'){
              borrowType = '车分期'
            } else if(params.row.borrowType == '5'){
              borrowType = '易起行'
            } else if(params.row.borrowType == '6'){
              borrowType = '车主信用贷'
            } else if(params.row.borrowType == '100'){
              borrowType = '其他'
            }
            return h('div', [
              h('span', {}, borrowType)
            ])
          }
        },
        {
          title: '来源',
          align: 'center',
          render: (h, params) => {
            let origin
            if (params.row.origin == '0') {
              origin = '手动'
            } else if(params.row.origin == '1'){
              origin = '官网'
            } else if(params.row.origin == '2'){
              origin = '微信'
            }
            return h('div', [
              h('span', {}, origin)
            ])
          }
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'Code',
          align: 'center',
          render: (h, params) => {
            let code 
            console.log(params.row.code)
            
            if (params.row.code == '1000') {
              code = '成功'
            } else if(params.row.code == '') {
              code = ''
            } else {
              code = '失败'
            }
            return h('div', [
              h('span', {}, code)
            ])
          }
        },
        {
          title: 'Message',
          align: 'center',
          key: 'message'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 凡普
      columns2: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '是否打卡发薪',
          align: 'center',
          render: (h, params) => {
            let salaryGetForm 
            if (params.row.salaryGetForm == '0') {
              salaryGetForm = '否'
            } else if (params.row.salaryGetForm == '1') {
              salaryGetForm = '是'
            }
							return h('div', [
								h('span', {}, salaryGetForm)
							])
						}
        },
        {
          title: '社保(有/无)',
          align: 'center',
          render: (h, params) => {
            let socialSecurity 
            if (params.row.socialSecurity == '0') {
              socialSecurity = '无'
            } else if (params.row.socialSecurity == '1') {
              socialSecurity = '有'
            }
							return h('div', [
								h('span', {}, socialSecurity)
							])
						}
        },
         {
          title: '公积金(有/无)',
          align: 'center',
          render: (h, params) => {
            let accumulationFund 
            if (params.row.accumulationFund == '0') {
              accumulationFund = '无'
            } else if (params.row.accumulationFund == '1') {
              accumulationFund = '有'
            }
							return h('div', [
								h('span', {}, accumulationFund)
							])
						}
        },
        {
          title: '渠道',
          align: 'center',
          key: 'channel'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'Code',
          align: 'center',
          render: (h, params) => {
            let Code 
            if (params.row.Code == '200') {
              Code = '成功'
            } else {
              Code = '失败'
            }
            return h('div', [
              h('span', {}, Code)
            ])
						}
        },
        {
          title: 'errorMessage',
          align: 'center',
          key: 'errorMessage'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 秒贷
      columns3: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'cellphone'
        },
        {
          title: '城市编码',
          align: 'center',
          key: 'belongCity'
        },
        {
          title: '媒体来源编号',
          align: 'center',
          key: 'sourceId'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'Code',
          align: 'center',
          render: (h, params) => {
            let Code
            if (params.row.Code == '-1') {
              Code = '成功'
            } else {
              Code = '失败'
            } 
            return h('div', [
              h('span', {}, Code)
            ])
          }
        },
        {
          title: 'validResult',
          align: 'center',
          render: (h, params) => {
            let validResult
            if (params.row.validResult == 'success') {
              validResult = '有效数据'
            } else {
              validResult = '无效数据'
            } 
            return h('div', [
              h('span', {}, validResult)
            ])
          }
        },
        {
          title: 'validFailMsg',
          align: 'center',
          key: 'validFailMsg'
        },
        {
          title: 'msg',
          align: 'center',
          key: 'msg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 厚本
      columns4: [
        {
          title: '供应商',
          align: 'center',
          key: 'sid'
        },
        {
          title: '渠道',
          align: 'center',
          key: 'cid'
        },
        {
          title: '广告位ID',
          align: 'center',
          key: 'supplierCodeSub'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '城市编码',
          align: 'center',
          key: 'cityCode'
        },
        {
          title: '生日',
          align: 'center',
          key: 'birthday'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'returnCode',
          align: 'center',
          render: (h, params) => {
            let returnCode
            if (params.row.returnCode == '0000') {
              returnCode = '成功'
            } else if(params.row.returnCode ==  ''){
              returnCode = ''
            } else {
              returnCode = '失败'
            }
            return h('div', [
              h('span', {}, returnCode)
            ])
						}
        },
        {
          title: 'returnMsg',
          align: 'center',
          key: 'returnMsg'
        },
         {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 助贷
      columns5: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'Phone'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '贷款来源',
          align: 'center',
          key: 'source'
        },
        {
          title: '媒体名称',
          align: 'center',
          key: 'meiti'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'retCode',
          align: 'center',
          render: (h, params) => {
          let retCode
          if (params.row.retCode > 7) {
            pushStatus = '成功'
          } else {
            retCode = '失败'
          }
          return h('div', [
            h('span', {}, retCode)
          ])
          }
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 速易贷
      // columns6: [
      //   {
      //     title: '名称',
      //     align: 'center',
      //     key: 'name'
      //   },
      //   {
      //     title: '手机号',
      //     align: 'center',
      //     key: 'phone'
      //   },
      //   {
      //     title: '推送批次号',
      //     align: 'center',
      //     key: 'pushBatchNum'
      //   },
      //   {
      //     title: '贷款金额(万)',
      //     align: 'center',
      //     key: 'loanAmount'
      //   },
      //   {
      //     title: '开始时间',
      //     align: 'center',
      //     key: 'beginTime'
      //   },
      //   {
      //     title: '结束时间',
      //     align: 'center',
      //     key: 'endTime'
      //   },
      //   {
      //     title: '注册时间',
      //     align: 'center',
      //     key: 'registrationTime'
      //   },
      //   {
      //     title: '推送时间',
      //     align: 'center',
      //     key: 'pushTime'
      //   },
      //   {
      //     title: '推送状态',
      //     align: 'center',
      //     render: (h, params) => {
      //       let pushStatus
      //       if (params.row.pushStatus == 0) {
      //         pushStatus = '未推送'
      //       } else if (params.row.pushStatus == 1) {
      //         pushStatus = '推送成功'
      //       } else {
      //         pushStatus = '推送失败'
      //       }
			// 				return h('div', [
			// 					h('span', {}, pushStatus)
			// 				])
			// 			}
      //   }
      // ],
      // 银谷
      columns7: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'Phone'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '渠道编号',
          align: 'center',
          key: 'channelCode'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'rspCode',
          align: 'center',
          render: (h, params) => {
            let rspCode
            if (params.row.rspCode == '200') {
              rspCode = '成功'
            } else {
              rspCode = '失败'
            }
            return h('div', [
              h('span', {}, rspCode)
            ])
						}
        },
        {
          title: 'rspMsg',
          align: 'center',
          key: 'rspMsg'
        },
        {
          title: 'showMsg',
          align: 'center',
          key: 'showMsg'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      // 宜信
      columns8: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '邮箱',
          align: 'center',
          key: 'email'
        },
        {
          title: '性别',
          align: 'center',
          render: (h, params) => {
          let gender
          if (params.row.gender == '0') {
            gender = '男'
          } else if (params.row.gender == '1') {
            gender = '女'
          } else {
            gender = '未知'
          }
          return h('div', [
            h('span', {}, gender)
          ])
          }
        },
        {
          title: '生日',
          align: 'center',
          key: 'birthDate'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'dataCreateTime'
        },
        {
          title: 'succ',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.succ == 'true') {
              succ = '推送成功'
            } else {
              succ = '推送失败'
            }
            return h('div', [
              h('span', {}, succ)
            ])
					}
        },
        {
          title: 'msg',
          align: 'center',
          render: (h, params) => {
            let msg
            if (params.row.msg == 'save') {
              msg = '转化成功'
            } else {
              msg = '转化失败'
            }
							return h('div', [
								h('span', {}, msg)
							])
						}
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == '0') {
              pushStatus = '未推送'
            } else if(params.row.pushStatus ==  '1'){
              pushStatus = '推送成功'
            } else {
              pushStatus = '推送失败'
            }
            return h('div', [
              h('span', {}, pushStatus)
            ])
						}
        },
         {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
        },
      ],
      data1: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        console.log(page)
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
      console.log(page)
      this.endRow = page
      this.inquire()
    },
    // 时间判断
			time1(value, data) {
				this.value1 = value
			},
			time2(value, data) {
				this.value2 = value
			},
			inquire () {
        // 列表查询
        this.loading3 = true
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
					})
					return false
        }
        let origin
        if (!this.$route.query.detailed) {
          origin = 0      
        } else {
          origin = this.model3
        }
        let params = {
          partyaKey: this.model1,
          beginTime: this.value1,
          endTime: this.value2,
          pushBatchNum: this.model5,
          pushStatus: this.model2,
          origin: origin,
          pageNum: this.startRow,
          pageSize: this.endRow,
        }

        // console.log(params)
				this.http.post(BASE_URL + '/common/partya/getDkBJpuhuiList',params)
					.then((resp) => {
            console.log(resp) 
						if(resp.code == 'success') {
              console.log(this.model1)
              if (this.model1 == 'partya-chedidai') {
                this.party1 = this.columns1
                this.data1 = resp.data.dkChedidaiList
              } else if (this.model1 == 'partya-fanpuwang') {
                this.party1 = this.columns2
                this.data1 = resp.data.dkFanpuList
              } else if (this.model1 == 'partya-miaodai') {
                this.party1 = this.columns3
                this.data1 = resp.data.dkMiaodaiList
              } else if (this.model1 == 'partya-houbenjinrong') {
                this.party1 = this.columns4
                this.data1 = resp.data.dkHoubenList
              } else if (this.model1 == 'partya-zhudaiwang') {
                this.party1 = this.columns5
                this.data1 = resp.data.dkZhudaiList
              } else if (this.model1 == 'partya-yingu') {
                this.party1 = this.columns7
                this.data1 = resp.data.dkYinguList
              } else if (this.model1 == 'partya-yixin') {
                this.party1 = this.columns8
                this.data1 = resp.data.dkYinxinList
              } else if (this.model1 == 'partya-dadi') {

              }
              // console.log(this.data1,111)
							this.total = Number(resp.data.total)
              this.startRow = Math.ceil(resp.data.startRow / this.endRow)
              if(parseInt(resp.data.total) == '0') {
                this.startRow = 1
              }
              this.loading3 = false
						} else {
              this.loading3 = false
						}
					})
					.catch(() => {
            this.loading3 = false
          })
      },
      // 导出
      exports () {
        // 封装form 表单
        this.loading2 = true
        let formData = new FormData()
        formData.append("partyaKey",this.model1)
        formData.append("beginTime",this.value1)
        formData.append("endTime",this.value2)
        formData.append("pushBatchNum",this.model5)
        formData.append("pushStatus",this.model2)
        formData.append("origin",0)
        formData.append("methodType",1)
        let httpUrl = BASE_URL+'/common/partya/exportExcel'
        utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
          if(e == true){
            this.loading2 = false
          }
        })                      
      }     
  },
  mounted () {
    if (!this.$route.query.detailed) {
      this.model5 = this.$route.query.batchCode
    } else {
      this.model5 = ''
      this.fashionmod = true
    }
    // 甲方名称
			this.http.post(BASE_URL + '/loan/partya/queryCompanyPartyaList?company=luohui&partyaBusiness=0&sendTypes='+'1,3')
				.then((resp) => {
					if(resp.code == 'success') {
						this.cityList = resp.data
					} else {

					}
				})
        .catch(() => {})
        // 列表
        this.inquire ()
        
  }
}
</script>
<style lang="less" scoped>
</style>
