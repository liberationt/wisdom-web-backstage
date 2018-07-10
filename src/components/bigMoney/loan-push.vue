<template>
    <div>
        <div class="navigation">
            <p>
                <span>推广批次报表</span>
            </p>
        </div>
        <div class="mt50">
            <span>甲方名称:</span>
            <Select v-model="model1" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.partyaKey" :key="item.partyaKey">{{ item.partyaName }}</Option>
            </Select>
            <span>推送时间:</span>
              <DatePicker type="date" @on-change="time1" confirm placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" class="mr20" @on-change="time2" confirm placeholder="结束时间" style="width: 200px"></DatePicker>
            <span>推送状态:</span>
            <Select v-model="model2" style="width:200px" class="mr20">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- <span>推送类型:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
            
            <div class="clearfix mr100 mt20">
                <Button class="right w100" type="primary" @click="exports">导出</Button>
                <Button class="right mr20 w100" type="info" @click="inquire">查询</Button>
            </div>
        </div>

        <div class="mt20">
            <Table :columns="party1" :data="data1"></Table>
        </div>
        <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-elevator show-sizer show-total></Page>
            </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: 'partya-dadi',
      model2: '',
      // model3: '',
      model4: '',
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
      // 大地
      columns1: [
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'customerName'
        },
        {
          title: '年龄',
          align: 'center',
          width: 100,
          key: 'age'
        },
        {
          title: '手机号',
          align: 'center',
          width: 100,
          key: 'mobile'
        },
        {
          title: '职业',
          align: 'center',
          width: 100,
          key: 'occupation'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          key: 'gender'
        },
        {
          title: '生日',
          align: 'center',
          width: 100,
          key: 'birthDate'
        },
        {
          title: '推送批次号',
          align: 'center',
          width: 100,
          key: 'pushBatchNum'
        },
        {
          title: '渠道名称',
          align: 'center',
          width: 100,
          key: 'channelName'
        },
        {
          title: '供应商名称',
          align: 'center',
          width: 100,
          key: 'supplierName'
        },
        {
          title: '终端类型',
          align: 'center',
          width: 100,
          key: 'terminal'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'cityId'
        },
        {
          title: '居住地址',
          align: 'center',
          width: 100,
          key: 'address'
        },
        {
          title: '省',
          align: 'center',
          width: 100,
          key: 'provinceId'
        },
        {
          title: '借款金额',
          align: 'center',
          width: 100,
          key: 'loan'
        },
        {
          title: '借款期限',
          align: 'center',
          width: 100,
          key: 'timeLimit'
        },
        {
          title: '推广来源',
          align: 'center',
          width: 100,
          key: 'medieCode'
        },
        {
          title: '媒体来源',
          align: 'center',
          width: 100,
          key: 'businessChannel'
        },
        {
          title: '推送状态',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == 0) {
              pushStatus = '未推送'
            } else if (params.row.pushStatus == 1) {
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
          title: '车抵贷款code',
          align: 'center',
          width: 100,
          key: 'dadiCode'
        },
        {
          title: '创建时间',
          align: 'center',
          width: 100,
          key: 'dataCreateTime'
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushTime'
        },
        {
          title: '待推送时间',
          align: 'center',
          width: 100,
          key: 'loadPushTime'
        },
        {
          title: '月薪',
          align: 'center',
          width: 100,
          key: 'salary'
        },
        {
          title: '发薪方式',
          align: 'center',
          width: 100,
          key: 'salaryType'
        },
        {
          title: '自有资产',
          align: 'center',
          width: 100,
          key: 'assets'
        },
        {
          title: '是否有车',
          align: 'center',
          width: 100,
          key: 'autoTab'
        },
        {
          title: '有无车贷',
          align: 'center',
          width: 100,
          key: 'autoLoanTab'
        },
        {
          title: '是否有贷款',
          align: 'center',
          width: 100,
          key: 'creditTab'
        },
        {
          title: '有无借贷记录',
          align: 'center',
          width: 100,
          key: 'borrowTab'
        },
        {
          title: '是否有房',
          align: 'center',
          width: 100,
          key: 'houseTab'
        },
        {
          title: '有无房贷',
          align: 'center',
          width: 100,
          key: 'mortgageTab'
        },
        {
          title: '有无社保',
          align: 'center',
          width: 100,
          key: 'socialSecurityTab'
        },
        {
          title: '有无保险',
          align: 'center',
          width: 100,
          key: 'insuranceTab'
        },
        {
          title: '有无公积金',
          align: 'center',
          width: 100,
          key: 'houseFundTab'
        },
        {
          title: '是否是优质订单',
          align: 'center',
          width: 100,
          key: 'highQualityOrder'
        }
      ],
      // 新一贷
      columns2: [
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '出生日期',
          align: 'center',
          width: 100,
          key: 'birthDate'
        },
        {
          title: '学历',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let education
            if (params.row.education == '01') {
              education = '小学'
            } else if (params.row.education == '02') {
              education = '初中'
            } else if (params.row.education == '03') {
              education = '高中'
            } else if (params.row.education == '04') {
              education = '中专'
            } else if (params.row.education == '05') {
              education = '大专'
            } else if (params.row.education == '06') {
              education = '本科'
            } else if (params.row.education == '07') {
              education = '硕士'
            } else if (params.row.education == '08') {
              education = '博士'
            }
							return h('div', [
								h('span', {}, education)
							])
						}

        },
        {
          title: '邮件',
          align: 'center',
          width: 100,
          key: 'email'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          key: 'sex'
        },
        {
          title: '手机号',
          align: 'center',
          width: 100,
          key: 'teleNum'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        {
          title: '推荐人姓名',
          align: 'center',
          width: 100,
          key: 'recommenderName'
        },
        {
          title: '推荐人手机',
          align: 'center',
          width: 100,
          key: 'recommenderMobile'
        },
        {
          title: '推荐人账号',
          align: 'center',
          width: 100,
          key: 'recommenderAccount'
        },
        {
          title: '渠道名称',
          align: 'center',
          width: 100,
          key: 'channelName'
        },
        {
          title: '供应商名称',
          align: 'center',
          width: 100,
          key: 'supplierName'
        },
        {
          title: '职业类型',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let profession
            if (params.row.profession == '0') {
              profession = '公司职员'
            } else if (params.row.profession == '2') {
              profession = '私营业主'
            } else if (params.row.profession == '4') {
              profession = '公务员'
            }
							return h('div', [
								h('span', {}, profession)
							])
						}
        },
        {
          title: '发薪方式',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let payoffType
            if (params.row.payoffType == '0') {
              payoffType = '银行转账发薪'
            } else if (params.row.payoffType == '1') {
              payoffType = '通过现金发薪'
            }
							return h('div', [
								h('span', {}, payoffType)
							])
						}
        },
        {
          title: '推送批次号',
          align: 'center',
          width: 100,
          key: 'pushBatchNum'
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushTime'
        },
        {
          title: '数据来源',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let custSrc
            if (params.row.custSrc == '1') {
              custSrc = 'PA18网销'
            } else if (params.row.custSrc == '2') {
              custSrc = '第三方数据'
            } else {
              custSrc = 'WAP获客'
            }
							return h('div', [
								h('span', {}, custSrc)
							])
						}
        },
        {
          title: '推送状态',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == 0) {
              pushStatus = '未推送'
            } else if (params.row.pushStatus == 1) {
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
          title: '创建时间',
          align: 'center',
          width: 100,
          key: 'dataCreateTime'
        },
        {
          title: '有无车贷',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let hasCarLoan
            if (params.row.hasCarLoan == 'Y') {
              hasCarLoan = '有'
            } else if (params.row.hasCarLoan == 'N') {
              hasCarLoan = '否'
            }
            return h('div', [
              h('span', {}, hasCarLoan)
            ])
						}
        },
        {
          title: '贷款经历',
          align: 'center',
          width: 100,
          key: 'loanExperience'
        },
        {
          title: '税后月收入',
          align: 'center',
          width: 100,
          key: 'income'
        },
        {
          title: '是否有信用卡',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let hasCreditCard
            if (params.row.hasCreditCard == 'Y') {
              hasCreditCard = '有'
            } else if (params.row.hasCreditCard == 'N') {
              hasCreditCard = '否'
            }
            return h('div', [
              h('span', {}, hasCreditCard)
            ])
						}
        },
        {
          title: '有无房贷',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let mortgage
            if (params.row.mortgage == 'Y') {
              mortgage = '有'
            } else if (params.row.mortgage == 'N') {
              mortgage = '否'
            }
            return h('div', [
              h('span', {}, mortgage)
            ])
						}
        }
      ],
      // fangcrm
      columns3: [
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'telephonenumber'
        },
        {
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '开始时间',
          align: 'center',
          key: 'beginTime'
        },
        {
          title: '结束时间',
          align: 'center',
          key: 'endTime'
        },
        {
          title: '贷款期限(月)',
          align: 'center',
          key: 'duration'
        },
        {
          title: '借款金额(元)',
          align: 'center',
          key: 'loanAmount'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == 0) {
              pushStatus = '未推送'
            } else if (params.row.pushStatus == 1) {
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
          title: '备注',
          align: 'center',
          key: 'memo'
        }
      ],
      // 厚本
      columns4: [
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
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '开始时间',
          align: 'center',
          key: 'beginTime'
        },
        {
          title: '结束时间',
          align: 'center',
          key: 'endTime'
        },
        {
          title: '出生年月',
          align: 'center',
          key: 'birthday'
        },
        {
          title: '证件号码',
          align: 'center',
          key: 'cardNo'
        },
        {
          title: '证件类型',
          align: 'center',
          render: (h, params) => {
            let cardType
            if (params.row.cardType == '01') {
              cardType = '身份证'
            } else if (params.row.cardType == '02') {
              cardType = '驾驶证'
            } else if (params.row.cardType == '03') {
              cardType = '护照'
            } else if (params.row.cardType == '04') {
              cardType = '军人证'
            } else if (params.row.cardType == '05') {
              cardType = '其它'
            }
							return h('div', [
								h('span', {}, cardType)
							])
						}
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == 0) {
              pushStatus = '未推送'
            } else if (params.row.pushStatus == 1) {
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
          title: '处理返回码',
          align: 'center',
          key: 'returnCode'
        },
        {
          title: '失败返回的错误信息',
          align: 'center',
          key: 'returnMsg'
        },
        {
          title: '备注',
          align: 'center',
          key: 'memo'
        }
      ],
      // 厚本
      columns5: [
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '客户手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex'
        },
        {
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '开始时间',
          align: 'center',
          key: 'beginTime'
        },
        {
          title: '结束时间',
          align: 'center',
          key: 'endTime'
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
          title: '省',
          align: 'center',
          key: 'province'
        },
        {
          title: '市',
          align: 'center',
          key: 'city'
        },
        {
          title: '贷款额度',
          align: 'center',
          key: 'money'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let pushStatus
            if (params.row.pushStatus == 0) {
              pushStatus = '未推送'
            } else if (params.row.pushStatus == 1) {
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
          title: '备注',
          align: 'center',
          key: 'memo'
        }
      ],
      data1: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
				this.startRow = page
				this.inquire()
			},
			pagesizechange(page) {
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
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
					})
					return false
        }
        let url = '/common/partya/getDkBJpuhuiList?partyaKey='+this.model1+'&beginTime='+this.value1+'&endTime='+this.value2+'&pushStatus='+this.model2+'&origin=1'
				this.http.post(BASE_URL + url)
					.then((resp) => {
						if(resp.code == 'success') {
              if (this.model1 == 'partya-dadi') {
                this.party1 = this.columns1
                this.data1 = resp.data.dkDadiList
              } else if (this.model1 == 'partya-xinyidai') {
                this.party1 = this.columns2
                this.data1 = resp.data.dkXinyidaiList
              } else if (this.model1 == 'partya-fangcrm') {
                this.party1 = this.columns3
                this.data1 = resp.data.dkFangcrmList
              } else if (this.model1 == 'partya-houbenjinrong') {
                this.party1 = this.columns4
                this.data1 = resp.data.dkHoubenList
              } else if (this.model1 == 'partya-zhudaiwang') {
                this.party1 = this.columns5
                this.data1 = resp.data.dkZhudaiList
              }
							this.total = Number(resp.data.total)
							this.startRow = Math.ceil(resp.data.startRow / this.endRow)
						} else {
						}
					})
					.catch(() => {})
      },
      // 导出
      exports () {
        let url = '/common/partya/exportExcel?partyaKey='+this.model1+'&beginTime='+this.value1+'&endTime='+this.value2+'&pushStatus='+this.model2+'&origin=1'
        window.open(BASE_URL + url)
      }     
  },
  mounted () {
    // 甲方名称
			this.http.post(BASE_URL + '/loan/partya/queryCompanyPartyaList?company=luohui&partyaBusiness=0&sendTypes='+'2,3')
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
