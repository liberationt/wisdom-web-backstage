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
                <Button class="right w100" type="primary" @click="exports">导出</Button>
                <Button class="right mr20 w100" type="info" @click="registered">查询</Button>
            </div>
        </div>
        <div class="mt20">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
       <div class="tr mt15">
            <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-elevator show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
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
        // {
        //   title: 'NO',
        //   align: 'center',
        //   width: 100,
        //   key: 'adsId'
        // },
        // {
        //   title: 'UID',
        //   align: 'center',
        //   width: 100,
        //   key: 'uid'
        // },
        // {
        //   title: '推送主体',
        //   align: 'center',
        //   width: 100,
        //   key: 'media'
        // },
        {
          title: '渠道',
          align: 'center',
          width: 200,
          key: 'channelName'
        },
        // {
        //   title: 'step',
        //   align: 'center',
        //   width: 100,
        //   key: 'step'
        // },
        {
          title: '姓名',
          align: 'center',
          width: 100,
          key: 'name'
        },
        {
          title: '手机号',
          align: 'center',
          width: 200,
          key: 'mobile'
        },
        // {
        //   title: '生日',
        //   align: 'center',
        //   width: 100,
        //   key: 'birthday'
        // },
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
          key: 'ageGroup'
        },
        {
          title: '城市',
          align: 'center',
          width: 100,
          key: 'city'
        },
        // {
        //   title: 'M城市',
        //   align: 'center',
        //   width: 100,
        //   key: 'mcity'
        // },
        // {
        //   title: '借贷金额',
        //   align: 'center',
        //   width: 100,
        //   key: 'toloan'
        // },
        // {
        //   title: '社保',
        //   align: 'center',
        //   width: 100,
        //   key: 'social'
        // },
        // {
        //   title: '公积金',
        //   align: 'center',
        //   width: 100,
        //   key: 'accumulation'
        // },
        // {
        //   title: '房',
        //   align: 'center',
        //   width: 100,
        //   key: 'room'
        // },
        {
          title: '房贷',
          align: 'center',
          width: 100,
          key: 'hasHouseLoan'
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
          width: 150,
          key: 'hasCarLoan'
        },
        // {
        //   title: '寿险保单',
        //   align: 'center',
        //   width: 100,
        //   key: 'insurance'
        // },
        // {
        //   title: '微粒贷',
        //   align: 'center',
        //   width: 100,
        //   key: 'tiny'
        // },
        {
          title: '推送时间',
          align: 'center',
          width: 200,
          key: 'pushTime'
        },
        {
          title: '推送状态',
          align: 'center',
          width: 200,
          key: 'pushStatus'
        },
        // {
        //   title: 'IP',
        //   align: 'center',
        //   width: 100,
        //   key: 'ip'
        // }
      ],
      data1: [
      ],
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
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
            if(num == 1){
              this.total = parseInt(data.data.total)
              this.startRow = Math.ceil(data.data.startRow/this.endRow)
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
        this.post('/loan/dkQjpuhui/getDkQjpuhuiList',params,pushname,1)
      } else if(pushname == 'baojie'){
        this.post('/loan/dkBJpuhui/getDkBJpuhuiList',params,pushname,1)
      } else if(pushname == 'benxiang'){
        this.post('/loan/dkBxpuhui/getDkBxpuhuiList',params,pushname,1)
      } else if(pushname == 'kunxuan'){
        this.post('/loan/dkKxpuhui/getDkKxpuhuiList',params,pushname,1)
      }
    },
    // 导出
    exports () {
      window.open(BASE_URL + '/loan/dwqUser/export?step='+1)
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
