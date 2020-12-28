<template>
    <div>
        <div class="navigation">
            <p>
                <span>语音外呼列表</span>
            </p>
        </div>
        <div class="conditioncss">
          <ul class="querysty">
            <li>
              <span class="w90 tr displayib">服务器名称:</span>
            <Select v-model="model2" style="width:150px" class="mr20">
              <Option  value="" >全部</Option>
                <Option v-for="item in cityList2" :value="item.serverIp" :key="item.serverIp">{{ item.serverName }}</Option>
            </Select>
            </li>
            <li>
              <span class="w60 displayib">回调时间:</span>
              <DatePicker type="date" @on-change="time1" v-model="value1" confirm placeholder="开始时间" class="" style="width: 150px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" class="mr20" @on-change="time2" v-model="value2" confirm placeholder="结束时间" style="width: 150px"></DatePicker>
            </li>
            <li>
              <span class="w60 displayib">手机号:</span>
              <Input v-model="phones" class="mr20" placeholder="请输入手机号" style="width: 180px"></Input>
            </li>
          </ul> 
            <div class="clearfix mr100 mt20">
                <!-- <Button class="right w100" type="primary" @click="exports">导出</Button> -->
                <Button type="primary" class="right w90" :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>
                <!-- <Button class="right mr20 w100" type="info" @click="inquire">查询</Button> -->
                <Button type="info" class="right mr20 w90" :loading="loading3" @click="inquire(1)">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>

        <div class="contentcss mt10">
            <Table border highlight-row :columns="columns1" :data="data1"></Table>
            <div class="tr mt15">
                <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
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
      model2: '',
      model4: '',
      model5: '',
      value1: '',
      value2: '',
      phones:'',
      total: 0,
			startRow: 1,
			endRow: 10,
      cityList2: [],
      columns1: [
        {
          title: '序号',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.index+1)
            ])
						}
        },
        {
          title: '手机号',
          align: 'center',
          minWidth: 110,
          key: 'mobile'
        },
        {
          title: '服务器名称',
          align: 'center',
          minWidth: 110,
          key: 'serverName'
        },
        {
          title: '解析状态',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let analyzeStatus
            if (params.row.analyzeStatus == 0) {
              analyzeStatus = '未解析'
            } else if(params.row.analyzeStatus ==  1){
              analyzeStatus = '已解析'
            }
            return h('div', [
              h('span', {}, analyzeStatus)
            ])
						}
        },
         {
          title: '回调时间',
          align: 'center',
          minWidth: 160,
          key: 'dataCreateTime'
        } 
      ],
      data1: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
				this.startRow = page
				this.inquire(this.startRow)
		},
    pagesizechange(page) {
      this.startRow = 1
      this.endRow = page
      this.inquire(this.startRow)
    },
    // 时间判断
			time1(value, data) {
				this.value1 = value
			},
			time2(value, data) {
				this.value2 = value
			},
			inquire (startRow) {
        // 列表查询
        this.loading3 = true
				let date1 = Date.parse(new Date(this.value1)) / 1000
				let date2 = Date.parse(new Date(this.value2)) / 1000
				if(date1 > date2) {
					this.$Modal.warning({
						title: '注册时间',
						content: '<p>开始时间不得大于结束时间</p>'
          })
          this.loading3 = false
					return false
       }
        let params = {
          ip:this.model2,
          mobile:this.phones,
          beginTime:this.value1,
          endTime:this.value2,
          pageNum: startRow,
          pageSize: this.endRow,
        }
				this.http.post(BASE_URL + '/netmoney/callbackUser/queryList',params)
					.then((resp) => {
						if(resp.code == 'success') {
              this.data1 = resp.data.dataList
							this.total = Number(resp.data.total)
              this.startRow = Math.ceil(resp.data.startRow / this.endRow) == 0 ? 1 : Math.ceil(resp.data.startRow / this.endRow);
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
        formData.append("ip",this.model2)
        formData.append("mobile",this.phones)
        formData.append("beginTime",this.value1)
        formData.append("endTime",this.value2)
        formData.append("methodType",1)
        let httpUrl = BASE_URL+'/netmoney/callbackUser/exportExcel'
        utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
          if(e == true){
            this.loading2 = false
          }
        })                      
      }     
  },
  mounted () {
    this.http.post(BASE_URL + '/netmoney/callbackServer/queryListDown',{})
    .then((resp) => {
      if(resp.code == 'success') {
        this.cityList2 = resp.data.dataList
        this.inquire (1)
      } else {
        
      }
    })
    .catch(() => {
      
    })     
  }
}
</script>
<style lang="less" scoped>
</style>
