<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;抢单劵管理</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <ul class="querysty">
                <li>
                  <Button type="info" class='' shape="circle" icon="plus-round" @click="addticket()">添加抢单劵</Button>
                </li>
                  <li class="ml20">
                      <span>状态:</span>
                      <Select v-model="statusCode" placeholder="请选择" style="width:150px" @on-change="statusChange" class="mr20">
                          <Option v-for="item in statusList" :value="item.value" :key="item.label">
                              {{ item.label }}
                          </Option>
                      </Select>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 mr20 w100" :loading="loading3" @click="queryList(1)">
                      <span v-if="!loading3">查询</span>
                      <span v-else>查询</span>
                  </Button>
                  </li>
              </ul>
          </div>
      </div>
      <div id="application_table " class="contentcss mt10">
          <Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
          <div class="tr mt15">
              <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
          </div>
      </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      statusCode: -1,
      statusList: [
        {label:'全部状态',value:-1},
        {label:'正常',value:1},
        {label:'已删除',value:2},
      ],
      loading3: false,
      columns: [
        {
          title:'劵编号',
          key:'ticketNo',
          align:'center',
          minWidth:180,
        },
        {
          title:"劵有效期",
          key: "expireDay",
          align: "center",
          minWidth: 120
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 160
        },
        {
          title: "创建人",
          key: "createUser",
          align: "center",
          minWidth: 120
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
              let status = params.row.status
              if(status==1){
                status='正常'
              } else if (status==2) {
                status='已删除'
              }
              return h("span", status);
            }
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 150,
        },   
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 80,
          fixed: "right",
          render:(h,params)=>{
            let arr =[]
            if(params.row.status==1){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'error',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.delete(params.row.code)
                      }
                    }
                  },
                  '删除'
                )
              )
            }
            return h('div',arr)
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      applicationname:''
    };
  },
  methods: {
    couponChange(couponCode){
      this.couponCode =  couponCode
    },
    statusChange(statusCode) {
      this.statusCode = statusCode;
    },
    pageChange(pageNumber) {
      this.startRow = pageNumber;
      this.queryList(pageNumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    //删除
    delete(code){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要删除?</p>",
            onOk: () => {
                this.http.post(BASE_URL+'/loan/ticketManage/deleteByCode?code='+code)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('删除成功')
                      this.queryList(1)                     
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }) 
    },
    //查询
    queryList(startRow) {
      let data ={
        status  : this.statusCode=='-1' ? "":this.statusCode,
        pageNum:startRow,
        pageSize:this.endRow
      }
      this.http.post(BASE_URL+'/loan/ticketManage/queryPage',data).
      then(data=>{
        if(data.code=='success'){
          this.data1 = data.data.dataList
          this.total = data.data.total
           Math.ceil(data.data.startRow / this.endRow1) == 0
            ? 1 : Math.ceil(data.data.startRow / this.endRow1);
          this.loading3 = false
        }else{
          this.loading3 = false
        }
      }).catch(err=>{
        this.loading3 = false
        console.log(err)
      })
    },
    //添加
    addticket() {
      this.$router.push({ path: "./singleTicket" });
    }
  },
  mounted(){
    this.queryList(1)  
  }
};
</script>
<style lang="less">
</style>