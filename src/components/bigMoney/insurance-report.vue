<template>
    <div>
        <div class="navigation">
            <p>
                <span>推广明细报表</span>
            </p>
        </div>
        <div class="mt50">
            <span>甲方名称:</span>
            <Select v-model="model1" placeholder="全部" style="width:200px" class="mr20">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="w100 tr displayib">批次号:</span>
            <Input v-model="model2" class="mr20" placeholder="请输入批次号" style="width: 200px"></Input>
            <span class=" tr displayib">推送状态:</span>
            <Select v-model="model3" style="width:200px" class="mr20">
                <Option  v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="margin_top">
              <span class=" tr displayib">推送时间:</span>
              <DatePicker type="date" @on-change='time1' placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" @on-change='time2' placeholder="结束时间" style="width: 200px"></DatePicker>
            </div>
            <!-- <div class="mt15">
            <span class=" tr displayib">推送时间:</span>
                <DatePicker type="date"  placeholder="开始时间" style="width: 200px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" placeholder="结束时间" style="width: 200px"></DatePicker>
            </div > -->
            <div class="clearfix mr100 mt20">
                <Button type="primary" class="right w100" :loading="loading2" @click="exports">
                  <span v-if="!loading2">导出</span>
                  <span v-else>请稍等...</span>
                </Button>
                <!-- <Button class="right mr20 w100" type="info" @click="registered">查询</Button> -->
                <Button type="info" class="right mr20 w100" :loading="loading3" @click="registered">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
            </div>
        </div>
        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
       <div class="tr mt15">
            <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      model1: '平安普惠',
      cityList: [
        {
          value: '平安普惠',
          label: '平安普惠'
        }
      ],
      model2: '',
      model3: '',
      cityList3: [
        {
          value: '全部',
          label: '全部'
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
          width: 200,
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          width: 200,
          key: 'mobile'
        },
        {
          title: '城市',
          align: 'center',
          width: 150,
          key: 'city'
        },
        {
          title: '媒体来源编号',
          align: 'center',
          width: 300,
          key: 'mediaSource'
        },
        {
          title: 'Ip',
          align: 'center',
          width: 150,
          key: 'ip'
        },
        {
          title: '创建时间',
          align: 'center',
          width: 200,
          key: 'dataCreateTime'
        },
        {
          title: 'errorMsg',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let errorMsg 
            if (params.row.errorMsg == '0') {
              errorMsg = '成功'
            } else {
              errorMsg = '失败'
            }
            return h('div', [
              h('span', {}, errorMsg)
            ])
          }
        },
        {
          title: 'resultCode',
          align: 'center',
          width: 100,
          key: 'resultCode'
        },
        {
          title: 'errorCode',
          align: 'center',
          width: 150,
          key: 'errorCode'
        }
      ],
      data1: [
      ],
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      loading2: false,
      loading3: false
    }
  },
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    // 分页registered
    pageChange (page) {
      this.startRow = page
      this.registered()
    },
    pagesizechange (page) {
      this.endRow = page
      this.registered()
    },
    post(url,list,pushname,num) {
        this.http.post(BASE_URL + url,list).then(data=>{
          if(data.code == 'success'){
            console.log(data.data.total)
            this.total = parseInt(data.data.total)
            this.startRow = Math.ceil(data.data.startRow/this.endRow)
            if(parseInt(data.data.total) == 0 ){
              this.startRow = 1
            }
            if(pushname == 'qingjian'){
              this.data1 = data.data.dkQjpuhuiList
            } else if(pushname == 'baojie'){
              this.data1 = data.data.dkBJpuhuiList
            } else if(pushname == 'benxiang'){
              this.data1 = data.data.dkBxpuhuiList
            } else if(pushname == 'kunxuan'){
              this.data1 = data.data.dkKxpuhuiList
            }
            this.loading3= false
          }
       }).catch(err=>{
         console.log(err)
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
    registered() {
      this.loading3= true
      let date1 = Date.parse(new Date(this.value1))/1000
      let date2 = Date.parse(new Date(this.value2))/1000
      if (date1 > date2) {
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
        pageNum: this.startRow,
        pageSize: this.endRow,
      }
      let pushname = this.$route.query.pushname
      if(pushname == 'qingjian'){
        this.post('/loan/dkQjpuhui/getDkQjpuhuiList',params,pushname)
      } else if(pushname == 'baojie'){
        this.post('/loan/dkBJpuhui/getDkBJpuhuiList',params,pushname)
      } else if(pushname == 'benxiang'){
        this.post('/loan/dkBxpuhui/getDkBxpuhuiList',params,pushname)
      } else if(pushname == 'kunxuan'){
        this.post('/loan/dkKxpuhui/getDkKxpuhuiList',params,pushname)
      }
    },
    // 导出
    exports () {
      this.loading2 = true;
      let pushname = this.$route.query.pushname
      let httpUrl
      if(pushname == 'qingjian'){
        httpUrl = BASE_URL+'/loan/dkQjpuhui/exportExcel'
      } else if(pushname == 'baojie'){
        httpUrl = BASE_URL+'/loan/dkBJpuhui/exportExcel'
      } else if(pushname == 'benxiang'){
        httpUrl = BASE_URL+'/loan/dkBxpuhui/exportExcel'
      } else if(pushname == 'kunxuan'){
        httpUrl = BASE_URL+'/loan/dkKxpuhui/exportExcel'
      }
      let formData = new FormData()
      formData.append("pushBatchNum",this.model2)
      formData.append("pushStatus",this.model3)
      formData.append("beginTime",this.value1)
      formData.append("endTime",this.value2)
      formData.append("methodType",1)
      utils.exporttable(httpUrl, utils.getlocal('token'),formData,   e => {
        // console.log(e)
        if(e == true ){
          this.loading2 = false;
        }
      })
    },
    
  },
  created() {
    let pushname = this.$route.query.pushname
    let list = {
      pushBatchNum: this.$route.query.id,
      pageNum: this.startRow,
      pageSize: this.endRow,
    }
    if(pushname == 'qingjian'){
      this.post('/loan/dkQjpuhui/getDkQjpuhuiList',list,pushname)
    } else if(pushname == 'baojie'){
      this.post('/loan/dkBJpuhui/getDkBJpuhuiList',list,pushname)
    } else if(pushname == 'benxiang'){
      this.post('/loan/dkBxpuhui/getDkBxpuhuiList',list,pushname)
    } else if(pushname == 'kunxuan'){
      this.post('/loan/dkKxpuhui/getDkKxpuhuiList',list,pushname)
    }
  }
}
</script>
<style lang="less" scoped>
.margin_top {
  margin-top: 20px;
}
</style>
