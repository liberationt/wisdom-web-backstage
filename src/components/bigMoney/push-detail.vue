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
                <Button class="right w100" type="primary">导出</Button>
                <Button class="right mr20 w100" type="info" @click="inquire">查询</Button>
            </div>
        </div>

        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
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
      // cityList3: [
      //   {
      //     value: '1',
      //     label: '自动'
      //   },
      //   {
      //     value: '2',
      //     label: '手动'
      //   }
      // ],
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
      columns1: [
        {
          title: 'NO',
          align: 'center',
          width: 100,
          key: 'no'
        },
        {
          title: 'UID',
          align: 'center',
          width: 100,
          key: 'did'
        },
        {
          title: '甲方',
          align: 'center',
          width: 100,
          key: 'media'
        },
        {
          title: '推送主体',
          align: 'center',
          width: 100,
          key: 'type'
        },
        {
          title: '注册时间',
          align: 'center',
          width: 100,
          key: 'time'
        },
        {
          title: '渠道',
          align: 'center',
          width: 100,
          key: 'channel'
        },
        {
          title: 'step',
          align: 'center',
          width: 100,
          key: 'step'
        },
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          width: 100,
          key: 'phone'
        },
        {
          title: '生日',
          align: 'center',
          width: 100,
          key: 'birthday'
        },
        {
          title: '性别',
          align: 'center',
          width: 100,
          key: 'sex'
        },
        {
          title: '年龄',
          align: 'center',
          width: 100,
          key: 'age'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        {
          title: 'M城市',
          align: 'center',
          width: 100,
          key: 'mcity'
        },
        {
          title: '借贷金额',
          align: 'center',
          width: 100,
          key: 'toloan'
        },
        {
          title: '社保',
          align: 'center',
          width: 100,
          key: 'social'
        },
        {
          title: '公积金',
          align: 'center',
          width: 100,
          key: 'accumulation'
        },
        {
          title: '房',
          align: 'center',
          width: 100,
          key: 'room'
        },
        {
          title: '房贷',
          align: 'center',
          width: 100,
          key: 'roomloan'
        },
        {
          title: '车',
          align: 'center',
          width: 100,
          key: 'car'
        },
        {
          title: '车贷',
          align: 'center',
          width: 100,
          key: 'carloan'
        },
        {
          title: '寿险保单',
          align: 'center',
          width: 100,
          key: 'insurance'
        },
        {
          title: '微粒贷',
          align: 'center',
          width: 100,
          key: 'tiny'
        },
        {
          title: 'IP',
          align: 'center',
          width: 100,
          key: 'ip'
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushtime'
        },
        {
          title: '推送时间',
          align: 'center',
          width: 100,
          key: 'pushtype'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 100,
          key: 'errreason'
        }
      ],
      data1: [
        {
          no: '1',
          did: '1',
          media: '1',
          type: '1',
          time: '1',
          channel: '1',
          step: '1',
          name: '1',
          phone: '1',
          birthday: '1',
          city: '1',
          sex: '1',
          age: '1',
          mcity: '1',
          toloan: '1',
          social: '1',
          accumulation: '1',
          roomloan: '1',
          room: '1',
          car: '1',
          carloan: '1',
          insurance: '1',
          tiny: '1',
          ip: '1',
          pushtime: '1',
          pushtype: '1',
          errreason: '哈哈哈'

        },
        {
          no: '11',
          did: '11',
          media: '11',
          type: '11',
          time: '11',
          channel: '11',
          step: '11',
          name: '11',
          phone: '11',
          birthday: '11',
          city: '11',
          sex: '11',
          age: '11',
          mcity: '11',
          toloan: '11',
          social: '11',
          accumulation: '11',
          roomloan: '11',
          room: '11',
          car: '11',
          carloan: '11',
          insurance: '11',
          tiny: '11',
          ip: '11',
          pushtime: '1',
          pushtype: '1',
          errreason: '哈哈哈'
        }
      ]
    }
  },
  methods: {
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
        let url = '/common/partya/getDkBJpuhuiList?partyaKey='+this.model1+'&beginTime='+this.value1+'&endTime='+this.value2+'&pushBatchNum='+this.model5+'&pushStatus='+this.model2
        console.log(BASE_URL+url)
				this.http.post(BASE_URL + url)
					.then((resp) => {
						if(resp.code == 'success') {
							// this.data6 = resp.data.batchLogList
							// this.total = Number(resp.data.total)
							// this.startRow = Math.ceil(resp.data.startRow / this.endRow)
						} else {

						}
					})
					.catch(() => {})
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
