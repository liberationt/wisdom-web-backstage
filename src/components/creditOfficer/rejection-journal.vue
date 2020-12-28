<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;操作日志</span>
          </p>
        </div>
        <div id="feedback_details" class="contentcss">
            <Button class="w90 ml20" @click=" backingout" type="primary">返回</Button>
            <Table border highlight-row class="mt20" :columns="columns1" :data="data1"></Table>
            <div class="tr mt15">
                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      data(){
        return{
          columns1:[
            {
              title:'操作时间',
              key:'',
              minwidth:150,
              align:'center'
            },
            {
              title:'操作人',
              key:'',
              minwidth:150,
              align:'center'
            },
            {
              title:'操作内容',
              key:'',
              minwidth:150,
              align:'center'
            },
          ],
          data1:[],
          total:0,
          startRow:1,
          endRow:10
        }
      },
      methods:{
        // 返回
        backingout () {
          window.history.go(-1)
        },
        pageChange(page){
          this.startRow = page
        },
        pagesizechange(page){
          this.endRow = page
        }
      }

    }
</script>
<style lang="less" scoped>
    
</style>