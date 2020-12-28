<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;营销活动审核</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <ul class="querysty">
                <li>
                    <Select v-model="activityType" class="mr20" placeholder="活动类型" style="width:150px" @on-change="typeChange">
                        <Option v-for="item in activityList" :value="item.value" >{{item.label}}</Option>
                    </Select>
                </li>
                 <li>
                    <span class="mr10">添加时间:</span>
                    <DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
                    <span>  -  </span>
                    <DatePicker type="date" class='mr10' :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 150px"></DatePicker>
                </li>
                <li>
                    <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
                        <span v-if="!loading3">查询</span>
                        <span v-else>查询</span>
                    </Button>
                </li>
            </ul>
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
export default {
    data(){
        return{
        activityType:'',
        activityList:
        [
            {value:-1,label:'全部'},
            {value:1,label:'注册入驻'},
            {value:2,label:'邀请好友注册'},
            {value:3,label:'邀请充值'}
        ],
        beginTime:'',
        endTime:'',
        columns:[
          {
            title:'活动类型',
            key:'marketType',
            align:'center',
            minWidth:180,
            render:(h,params)=>{
                let marketType = params.row.marketType
                if(marketType=='1'){
                    marketType='注册入驻'
                }else if(marketType=='2'){
                    marketType='邀请好友注册'
                }else if(marketType=='3'){
                    marketType='邀请充值(单笔)'
                }
                else{
                     marketType='赠送满减券'
                }
                return h('span',marketType)
            }
          },
          {
              title:'活动标题',
              key:'marketName',
              align:'center',
              minWidth:180,
          },
          {
              title:'活动周期',
              key:'timeType',
              align:'center',
              minWidth:180,
              render:(h,params)=>{
                  return h('span',params.row.timeType=='1'?'不限时间范围':'固定时间范围')
              }
          },
          {
              title:'开始时间',
              key:'marketBeginTime',
              align:'center',
              minWidth:180,
          },
          {
              title:'结束时间',
              key:'marketEndTime',
              align:'center',
              minWidth:180,
          },
          {
              title:'添加时间',
              key:'dataCreateTime',
              align:'center',
              minWidth:180,
          },
          {
              title:'创建人',
              key:'operator',
              align:'center',
              minWidth:150,
          },
          {
            title:'操作',
            key:'',
            align:'center',
            minWidth:120,
            fixed: 'right',
            render: (h, params) => {
              return h(
                'Button',
                  {
                    props:{
                    type:'primary',
                    size:'small'
                    },
                    on:{
                      click:()=>{
                          if(params.row.marketType==1){
                              this.$router.push({ path: './auditRegistration?marketCode='+params.row.marketCode })
                          }
                          if(params.row.marketType==2){
                              this.$router.push({ path: './auditInvitation?marketCode='+params.row.marketCode })
                          }
                          if(params.row.marketType==3){
                              this.$router.push({ path: './auditInvitationrecharge?marketCode='+params.row.marketCode })
                          }
                          if(params.row.marketType==4){
                              this.$router.push({ path: './auditCoupons?marketCode='+params.row.marketCode })
                          }
                      }
                    }
                  },
                '审核'
              )
            }
          }
        ],
        loading3:false,
        data1:[],
        total:0,
        startRow:1,
        endRow:10,
      }
    },
    methods:{
        typeChange(activityType){
            this.activityType = activityType
        },
        beginTimeChange(beginTime){
            this.beginTime = beginTime
            if(this.begigTime==''){
                this.beginTime = beginTime
            }else{
                this.beginTime+=' 00:00:00'
            }
        },
        endTimeChange(endTime){
            this.endTime = endTime
            if(this.endTime==''){
                this.endTime = endTime
            }else{
                this.endTime+=' 23:59:59'
            }
        },
         pageChange(pagenumber){
            this.startRow = pagenumber
            this.queryList(pagenumber)
        },
        pagesizechange(pagesize){
            this.startRow = 1
            this.endRow = pagesize
            this.queryList(this.startRow)
        },
        //查询
        queryList(startRow){
            let date1 = Date.parse(new Date(this.beginTime)) / 1000;
            let date2 = Date.parse(new Date(this.endTime)) / 1000;
            if (date1 > date2) {
                this.$Modal.warning({
                title: "提示",
                content: "<p>开始时间不得大于结束时间</p>"
                });
                return false;
            }
            this.loading3=true;
            let data = {
                beginTime : this.beginTime,
                endTime : this.endTime,
                pageNum: startRow,
                pageSize: this.endRow1,
                marketType:this.activityType=="-1"?"":this.activityType,
                auditStatus:0
            }
            this.http.post(BASE_URL+'/loan/marketing/queryPage',data)
            .then(data=>{
                if(data.code=='success'){
                    this.loading3 = false
                    this.data1 = data.data.dataList;
                    this.total = data.data.total;
                    this.startRow1 =
                        Math.ceil(data.data.startRow / this.endRow1) == 0
                        ? 1
                        : Math.ceil(data.data.startRow / this.endRow1);
                } else {
                    this.loading3 = false;
                }
            })
            .catch(err=>{
                this.loading3 = false;
                console.log(err)
            })
        }
    },
    mounted(){
      this.queryList(1)
    }
}
</script>
<style lang="less" scoped>
    
</style>