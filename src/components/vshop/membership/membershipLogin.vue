<template>
  <div class="my-table">
    <Table border highlight-row :columns="columns4" :data="data4"></Table>
    <div class="tr mt15">
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
          title: '登录时间',
          align: 'center',
          minWidth: 160,
          key: 'loginTime'
        },
        {
          title: '登录设备',
          align: 'center',
          minWidth: 100,
          key: 'loginDevice'
        }
      ],
      data4: [],
      total: 0,
      startRow: 1,
      endRow: 10,
    }
  },
  created(){
    this.getdatalist(1)
  },
  props:{
    managerCode:String
  },
  methods:{
    pageChange(page){
      this.startRow = page
      this.getdatalist(page)
    },
    pagesizechange(page){
      this.endRow = page
      this.getdatalist(1)
    },
    getdatalist(startRow){
      let data={
        pageNum:startRow,
        pageSize:this.endRow,
        userCode:this.managerCode
      }
      this.http.post(BASE_URL+'/vshop/vshopLoanUser/queryUserLoginLog',data)
      .then(data=>{
        if(data.code=='success'){
          this.data4 = data.data.dataList
          this.startRow =
          Math.ceil(data.data.startRow / this.endRow) == 0
          ? 1
          : Math.ceil(data.data.startRow / this.endRow);
          this.total = Number(data.data.total)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>
<style lang="less" scoped>
</style>
