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
            <span>批次号:</span>
            <Input v-model="model5" class="mr20" placeholder="请输入批次号" style="width: 200px"></Input>
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
      model1: this.$route.query.code,
      model2: '',
      // model3: '',
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
          title: '性别',
          align: 'center',
          key: 'sex'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '借款产品类型',
          align: 'center',
          key: 'gender',
          render: (h, params) => {
            let borrowType 
            if (params.row.borrowType == '0') {
              borrowType = '车抵贷'
            }
							return h('div', [
								h('span', {}, borrowType)
							])
						}
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
          title: '上牌时间',
          align: 'center',
          key: 'licensTime'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '裸车价',
          align: 'center',
          key: 'price'
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
          title: '返回信息',
          align: 'center',
          key: 'message'
        },
        {
          title: '备注',
          align: 'center',
          key: 'memo'
        }
      ],
      // 凡普
      columns2: [
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'mobile'
        },
        {
          title: '年龄',
          align: 'center',
          key: 'age'
        },
        {
          title: '城市',
          align: 'center',
          key: 'city'
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
          title: '错误描述',
          align: 'center',
          key: 'errorMessage'
        }
      ],
      // 秒贷
      columns3: [
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '电话',
          align: 'center',
          key: 'cellphone'
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
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
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
      // 助贷
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
      // 速易贷
      columns6: [
        {
          title: '名称',
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
          title: '贷款金额(万)',
          align: 'center',
          key: 'loanAmount'
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
          title: '注册时间',
          align: 'center',
          key: 'registrationTime'
        },
        {
          title: '推送时间',
          align: 'center',
          key: 'pushTime'
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
        }
      ],
      // 银谷
      columns7: [
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '客户手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '客户所在城市',
          align: 'center',
          key: 'city'
        },
        {
          title: '身份证号',
          align: 'center',
          key: 'idcard'
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
          title: '收入',
          align: 'center',
          key: 'salary'
        },
        {
          title: '贷款',
          align: 'center',
          key: 'loan'
        },
        {
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '是否有车',
          align: 'center',
          render: (h, params) => {
            let car
            if (params.row.car == '0') {
              car = '没有'
            } else if (params.row.car == '1') {
              car = '有'
            }
            return h('div', [
              h('span', {}, car)
            ])
						}
        },
        {
          title: '是否有保单',
          align: 'center',
          render: (h, params) => {
            let warranty
            if (params.row.warranty == '0') {
              warranty = '没有'
            } else if (params.row.warranty == '1') {
              warranty = '有'
            }
            return h('div', [
              h('span', {}, warranty)
            ])
						}
        },
        {
          title: '是否有房',
          align: 'center',
          render: (h, params) => {
            let house
            if (params.row.house == '0') {
              house = '没有'
            } else if (params.row.house == '1') {
              house = '有'
            }
            return h('div', [
              h('span', {}, house)
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
          title: '备注',
          align: 'center',
          key: 'memo'
        },
      ],
      // 宜信
      columns8: [
        {
          title: '客户姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '联系方式',
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
          key: 'gender'
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
          title: '身份证',
          align: 'center',
          key: 'identityNumber'
        },
        {
          title: '推送批次号',
          align: 'center',
          key: 'pushBatchNum'
        },
        {
          title: '注册日期',
          align: 'center',
          key: 'createDate'
        },
        {
          title: '推送状态',
          align: 'center',
          render: (h, params) => {
            let succ
            if (params.row.succ == 'true') {
              succ = '成功'
            } else if (params.row.succ == 'false') {
              succ = '失败'
            }
            return h('div', [
              h('span', {}, succ)
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
          title: '备注',
          align: 'center',
          key: 'memo'
        },
        {
          title: '附加信息',
          align: 'center',
          key: 'msg'
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
        let url = '/common/partya/getDkBJpuhuiList?partyaKey='+this.model1+'&beginTime='+this.value1+'&endTime='+this.value2+'&pushBatchNum='+this.model5+'&pushStatus='+this.model2+'&origin=0'
				this.http.post(BASE_URL + url)
					.then((resp) => {
						if(resp.code == 'success') {
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
              } else if (this.model1 == 'partya-suyi') {
                this.party1 = this.columns6
                this.data1 = resp.data.dkSuyiList
              } else if (this.model1 == 'partya-yingu') {
                this.party1 = this.columns7
                this.data1 = resp.data.dkYinguList
              } else if (this.model1 == 'partya-yixin') {
                this.party1 = this.columns8
                this.data1 = resp.data.dkYinxinList
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
        let url = '/common/partya/exportExcel?partyaKey='+this.model1+'&beginTime='+this.value1+'&endTime='+this.value2+'&pushBatchNum='+this.model5+'&pushStatus='+this.model2+'&origin=0'
        window.open(BASE_URL + url)
      }     
  },
  mounted () {
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
