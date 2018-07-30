<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3 >操作日志</h3>
        <div class="mt50">
            <span>操作时间:</span>
            <DatePicker type="date" :value="value1" @on-change="time1" placeholder="开始时间" style="width: 200px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :value="value2" @on-change="time2" placeholder="结束时间" style="width: 200px"></DatePicker>
                <Button type="info" class=" ml20 w100" :loading="loading3" @click="inquire">
                  <span v-if="!loading3">查询</span>
                  <span v-else>查询</span>
                </Button>
                <Button class="w100 ml20" type="primary">返回</Button>
        </div>
        <Table border highlight-row class="mt20" :columns="columns1" :data="data1"></Table>
        <div class="tr mt15">
            <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      modal8: false,
      loading3: false,
      value1: '',
      value2: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      columns1: [
        {
          title: '操作时间',
          align:'center',
          key: 'name'
        },
        {
          title: '操作人',
          align:'center',
          key: 'age'
        },
        {
          title: '操作内容',
          align:'center',
          key: 'address'
        }
      ],
      data1: [],
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    handleRender () {
      this.$router.push({ path: './operationLog' })
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
        loanOfficerCode : this.$route.query.loanOfficerCode,
        beginTime : this.value1,
        endTime  : this.value2,
        pageNum: this.startRow,
        pageSize: this.endRow
      }
      this.http.post(BASE_URL + '/loan/loanOfficerLog/getLoanOfficerLogList', list)
      .then((resp) => {
        if (resp.code == 'success') {
          this.data1 = resp.data.dataList
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

  },
  mounted () {
    this.inquire()
  }
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
}
</style>
