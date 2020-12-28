<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;销售管理>&nbsp;销售统计</span>
            </p>
        </div>
        <div class="clearfix contentcss sales-statis">
            <Select v-model="model" style="width:200px" @on-change="choiceset">
                <Option v-for="item in modelList" :value="item.seatCode" :key="item.seatCode">{{ item.seatName }}</Option>
            </Select>
            <Select v-model="select" style="width:200px" class="mr20 ml20" @on-change="choicestyle">
                <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div v-if="choose">
                <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
                <span>  -  </span>
                <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 150px"></DatePicker>
            </div>
            <Button type="info" class="ml20 mr20 w100" :loading="loading3" @click="queryReportList(1)">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
            <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
            </Button> 
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table border highlight-row :columns="columnList" :data="reportList"></Table>
            <div class="tr mt15">
                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
    export default{
        data(){
            return{
                loading3:false,
                loading2:false,
                model:"all",
                modelList:[],
                select:1,
                selectList:[
                    {value:1,label:'常规查询'},
                    {value:2,label:'按时间范围查询'}
                ],
                choose:false,
                beginTime:"",
                endTime:"",
                nomerTime:'',
                total: 0,
                startRow: 1,
                endRow: 20,
                options3: {
                    disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                    }
                },
                reportList:[],
                columnList:[]
            }
        },
        methods:{
            //选择坐席
            choiceset(value){
                this.model=value
            },
            //选择方式
            choicestyle(value){
                if(value=='1'){
                    this.choose=false
                }else{
                    this.choose=true
                    this.beginTime = utils.getNowDate()[1]+"-01"
                    this.endTime = utils.getNowDate(0)[0]
                }
            },
            beginTimeChange(beginTime){
                this.beginTime = beginTime
            },
            endTimeChange(endTime){
                this.endTime = endTime
            },
            //分页
            pageChange(startRow){
                this.startRow = startRow
                this.queryReportList(startRow)
            },
            pagesizechange(endRow){
                this.endRow = endRow
                this.queryReportList(1)
            },
            //查询
            queryReportList(startRow){             
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
                let data
                if(this.select=='1'){
                   data ={
                        beginTime:this.nomerTime,
                        endTime:this.nomerTime,
                        pageNum:startRow,
                        pageSize :this.endRow,
                        searchType:this.select,
                        seatCode :this.model == 'all'? '':this.model
                    }
                }else{
                    if (this.beginTime == "" || this.endTime == "") {
                        this.loading3 = false;
                        this.$Modal.warning({
                        title: "温馨提示",
                        content: "<p>请选择时间</p>"
                        });
                        return false;
                    }
                   data ={
                        beginTime:this.beginTime,
                        endTime:this.endTime,
                        pageNum:startRow,
                        pageSize :this.endRow,
                        searchType:this.select,
                        seatCode :this.model == 'all'? '':this.model
                    } 
                }
                this.http.post(BASE_URL+'/sale/saleDialRecord/queryManagerSaleStatisticsList',data)
                .then(data=>{
                    if(data.code=='success'){
                        if(this.select=='1'){
                            this.columnList = this.getColumnList()
                        }
                        if(this.select=='2'){
                            this.columnList = this.getColumnList1()
                        }
                        this.reportList = data.data.dataList
                        this.startRow = Math.ceil(data.data.startRow / this.endRow);
                        this.total = data.data.total
                        this.loading3 = false
                    }else if(data.code=='100003'){
                        this.$Message.error(data.message);
                        this.loading3 = false
                    }else{
                        this.loading3 = false
                    }
                    
                }).catch(err=>{
                    console.log(err)
                    this.loading3 = false

                })
               
            },
            //导出
            exports(){
                this.loading2 = true;
                let httpUrl =
                BASE_URL + "/sale/saleDialRecord/export";
                let formData = new FormData();
                formData.append("beginTime", this.beginTime);
                formData.append("endTime", this.endTime);
                formData.append("pageNum",this.startRow,);
                formData.append("pageSize",this.endRow);
                formData.append("searchType",this.select);
                formData.append("seatCode",this.model=='all'?"":this.model);
                utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
                    this.loading2 = false;
                });
            },
            //常规查询
            getColumnList() {
                let columnList = [
                    this.getColumnItem('坐席编号', 'seatNo', 100),
                    this.getColumnItem('坐席姓名', 'seatName', 100),
                    this.getColumnItem('外呼数量', 'outerCallNum', 100),
                    this.getColumnItem('接通数量', 'throughNum', 100),
                    this.getColumnItem('外呼人数', 'outerCallPeopleNum', 100),
                    this.getColumnItem('外呼时长', 'outerCallTime', 100),
                    this.getColumnItem('平均时长', 'avgCallTime', 100),
                    this.getColumnItem('当天累计充值', 'toDayTotalTopUp', 150),
                    this.getColumnItem('当天累计充值笔数', 'toDayTotalTopUpNum', 150),
                    this.getColumnItem('本月累计充值', 'monthTotalTopUp', 150),
                    this.getColumnItem('本月累计充值笔数', 'monthTotalTopUpNum', 150)
                ]
                return columnList
            },
            // 时间范围查询
            getColumnList1() {
                let columnList = [
                    this.getColumnItem('坐席编号', 'seatNo', 100),
                    this.getColumnItem('坐席姓名', 'seatName', 100),
                    this.getColumnItem('外呼数量', 'outerCallNum', 100),
                    this.getColumnItem('接通数量', 'throughNum', 100),
                    this.getColumnItem('外呼人数', 'outerCallPeopleNum', 100),
                    this.getColumnItem('外呼时长', 'outerCallTime', 100),
                    this.getColumnItem('平均时长', 'avgCallTime', 100),
                    this.getColumnItem('累计充值', 'totalTopUp', 200),
                    this.getColumnItem('累计充值笔数', 'totalTopUpNum', 200)
                ]
                return columnList
            },
            //表头
            getColumnItem(title, key, width,render){
                return {
                    title: title,
                    key: key,
                    minWidth: width,
                    align: "center"
                };
            }
        },
        mounted(){
            this.beginTime = utils.getNowDate(0)[1]+"-01"
            this.endTime = utils.getNowDate(0)[0]
            this.nomerTime = utils.getNowDate(0)[0]
            this.http.post(BASE_URL+'/sale/saleSeat/getSaleSeatInfoList',{seatType:1})
            .then(data=>{
                if(data.code=='success'){
                    this.modelList = data.data
                    this.modelList.splice(0,0,{ seatCode: "all", seatName: "请选择坐席" })
                }
                
            }).catch(err=>{
                console.log(err)
            })
        }
    }
</script>
<style lang="less">
    .sales-statis{
        display: flex
    }
</style>