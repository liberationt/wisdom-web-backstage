<template>
  <div class="my-table">
    <Table border highlight-row :columns="columns4" :data="data4"></Table>
    <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns4: [
        {
          title: "账户类型",
          align: "center",
          minWidth: 160,
          key: "accountBizCode"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 100,
          key: "bizDesc"
        },
        {
          title: "金额",
          align: "center",
          minWidth: 100,
          key: "amount",
          render(h,params){
            return h('div', [
              h('span', {}, params.row.type==0?'+'+params.row.amount:-params.row.amount)
            ])
          }
        },
        {
          title: "备注",
          align: "center",
          minWidth: 100,
          key: "bizRemark"
        },
        {
          title: "操作时间",
          align: "center",
          minWidth: 100,
          key: "time"
        }
      ],
      data4: [],
      total: 0,
      startRow: 1,
      endRow: 10
    };
  },
  created() {
    this.cashflow(1)
  },
  props:{
    managerCode:String
  },
  methods: {
    pageChange(page) {
      this.startRow = page;
      this.cashflow(page)
    },
    pagesizechange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.cashflow(1)
    },
    // 现金流水
    cashflow(startRow) {
      let data = {
        pageNum :startRow,
        pageSize :this.endRow,
        userCode:this.managerCode
      }
      this.http.post(BASE_URL+'/vshop/account/accountFlowList',data)
      .then(data=>{
        if(data.code=='success'){
          this.data4 = data.data.dataList
          this.total = data.data.total
          this.startRow =
            Math.ceil(data.data.startRow / this.endRow) == 0
            ? 1
            : Math.ceil(data.data.startRow / this.endRow);
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>
