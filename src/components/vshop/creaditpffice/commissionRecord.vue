<template>
  <div>
    <div class="my-table">
      <Table border highlight-row :columns="columns4" :data="data4"></Table>
      <div class="tr mt15">
          <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      columns4: [
        {
          title: '返佣时间',
          align: 'center',
          minWidth: 180,
          key: 'settleDate'
        },
        {
          title: '返佣类型',
          align: 'center',
          minWidth: 100,
          key: 'productTypeDesc'
        },
        {
          title: '产品名称',
          align: 'center',
          minWidth: 100,
          key: 'productName'
        },
        {
          title: '交易人',
          align: 'center',
          minWidth: 100,
          key: 'userName'
        },
        {
          title: '交易人手机号',
          align: 'center',
          minWidth: 160,
          key: 'userPhone'
        },
        {
          title: '返佣金额',
          align: 'center',
          minWidth: 100,
          key: 'commission'
        }
      ],
      data4: [],
      total: 0,
      startRow: 1,
      endRow: 10,
    }
  },
  props:{
    managerCode:String
  },
  created(){
    this.getdatalist(1)
  },
  methods:{
    pageChange(startRow){
      this.startRow = startRow
      this.getdatalist(startRow)
    },
    pagesizechange(pagenum){
      this.endRow = pagenum
      this.getdatalist(1)
    },
    getdatalist(startRow){
      let data = {
        pageNum :startRow,
        pageSize :this.endRow,
        managerCode:this.managerCode
      }
      this.http.post(BASE_URL+'/vshop/productOrder/queryPageProductOrderCommission',data)
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
}
</script>
<style lang="less" scoped>
</style>
