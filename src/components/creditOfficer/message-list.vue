<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;甩单审核</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="left">
                <ul class="querysty">
                    <li>
                        <span class="ml20">订单编号 :</span>
                        <Input v-model="orderNumber" class="ml5" placeholder="请输入供应商名称" style="width: 150px"></Input>
                    </li>
                    <li>
                    
                        <span class="ml20">姓名 :</span>
                        <Input v-model="name" class="ml5" placeholder="请输入供应商名称" style="width: 150px"></Input>
                    </li>
                    <li>
                        <span class="ml20">发布时间 :</span>
                        <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
                        <span>  -  </span>
                        <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                        style="width: 150px"></DatePicker>
                    </li>
                    <li>
                      <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                          <span v-if="!loading3">查询</span>
                          <span v-else>查询</span>
                      </Button>
                    </li>
                </ul>
            </div>
        </div>
        <div id="application_table " class="contentcss mt10">
            <div class="allchiose">
                <Button type="primary" @click='examine' :disabled='disableds'>一键标记已读</Button>
            </div>
            <Table border highlight-row ref="selection" :columns="columns" :data="data1" @on-row-click ="Single" @on-selection-change="requires"></Table>
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
                orderNumber:'',
                name:'',
                beginTime:'',
                endTime:'',
                loading3:false,
                disableds:false,
                options3: {
                    disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                    }
                },
                columns:[
                     {
                        type: "selection",
                        width: 60,
                        align: "center"
                        },
                    {
                        title:'留言时间',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'订单编号',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'订单类型',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'订单状态',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'留言内容',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'留言状态',
                        key:'',
                        align:'center',
                        minWidth:150,
                    },
                    {
                        title:'操作',
                        key:'',
                        align:'center',
                        minWidth:150,
                        fixed: 'right'
                    },
                ],
                data1:[],
                total:0,
                startRow:1,
                endRow:10,
            }
        },
        methods:{
            beginTimeChange(){

            },
            endTimeChange(){

            },
            pageChange(){

            },
            pagesizechange(){

            },
            Single(){

            },
            //一键审核
            examine(){

            },
            requires(){

            },
            queryList(){

            }
        }
    }
</script>
<style lang="less">
    .allchiose{
        margin-bottom:20px
    }
</style>