<template>
  <div>
    <Table border highlight-row :columns="columns4" :data="data4"></Table>
    <div  id="application_table" class="contentcss tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
import utils from '../../../utils/utils';
export default {
  data(){
    return {
      columns4: [
        {
          title: '申请时间',
          align: 'cener',
          minWidth: 180,
          key: 'dataCreateTime'
        },
        {
          title: '产品类型',
          align: 'center',
          minWidth: 150,
          key: 'productTypeDesc'
        },
        {
          title: '产品名称',
          align: 'center',
          minWidth: 100,
          key: 'productName'
        },
        {
          title: '结算状态',
          align: 'center ',
          minWidth: 100,
          key:'orderStatusDesc'
        },
        {
          title: '申请金额',
          align: 'center ',
          minWidth: 150,
          key: 'loanApplyAmount'
        },
        {
          title: '实际放款金额',
          align: 'center',
          minWidth: 100,
          key: 'loanRealityAmount'
        },
        {
          title: '结算时间',
          align: 'center',
          minWidth: 180,
          key: 'settleDate'
        },
      ],
      data4: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      // managerCode:utils.gutlocal("membershipRecord")
    }
  },
  methods:{
    getdataList(startRow){
      let data = {
        pageNum :startRow,
        pageSize :this.endRow,
        userCode:utils.getlocal("membershipRecord")
      }
      this.http.post(BASE_URL+'/vshop/productOrder/queryPageProductOrder',data)
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
    },
    pageChange(page){
      this.startRow = page
      this.getdataList(page)
    },
    pagesizechange(pagenum){
      this.endRow = pagenum
      this.getdataList(1)
    },
  },
  mounted(){
    this.getdataList(1)
  }
}
</script>
<style lang="less" scoped>
</style>
