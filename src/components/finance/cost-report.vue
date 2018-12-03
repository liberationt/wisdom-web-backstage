<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;财务管理&nbsp;>&nbsp;财务报表</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <h2 style="margin-bottom:40px">运营成本报表</h2>
             <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 200px"></DatePicker>
            <span>  - </span>
            <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 200px"></DatePicker>
            <Button type="info" class=" ml20 mr20 w100" :loading="loading3" @click="queryList">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
            <!-- <Button type="primary" class="w100 " :loading="loading2" @click="exportsList">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
            </Button>  -->
        </div>
        <div id="application_table " class="contentcss mt10">
            <div class="recharge">
                <h2>{{title1}}</h2>
                <Table border highlight-row :columns="recharge" :data="rechargeList"></Table>
            </div>
            <div class="consumption">
                <h2>{{title2}}</h2>
                <Table border highlight-row :columns="consumption" :data="consumptionList"></Table>
            </div>
        </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
    export default{
        data(){
            return{
                title1:"充值统计",
                title2:"消费统计",
                loading3: false,
                // loading2: false,
                beginTime: "",
                endTime: "",
                rechargeList:[],//充值
                consumptionList:[],//消费
                options3: {
                    disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                    }
                },
                recharge:[
                    {
                        title:"应用名称",
                        key:"appName",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"业务类型",
                        key:"businessType",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"充值金额(元)",
                        key:"rechargeAmount",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"折扣金额(元)",
                        key:"discountAmount",
                        minWidth:150,
                        align:'center'
                    },
                     {
                        title:"余额充值(元)",
                        key:"balanceRechargeAmount",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"实收金额(元)",
                        key:"realRechargeAmount",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"赠送赞豆数(个)",
                        key:"giveZDCount",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"总计赞豆数(个)",
                        key:"totalZDCount",
                        minWidth:150,
                        align:'center'
                    },

                ],
                consumption:[
                    {
                        title:"应用名称",
                        key:"appName",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"业务类型",
                        key:"businessType",
                        minWidth:150,
                        align:'center'
                    },
                    {
                        title:"总计消费赞豆(个)",
                        key:"totalConsumeZDCount",
                        minWidth:150,
                        align:'center'
                    }
                ]
            }
        },
        methods:{
            beginTimeChange(begintime){
                this.beginTime = begintime
            },
            endTimeChange(endtime){
                this.endTime = endtime
            },
            //查询
            queryList(){
                let date1 = Date.parse(new Date(this.beginTime)) / 1000;
                let date2 = Date.parse(new Date(this.endTime)) / 1000;
                if (date1 > date2) {
                    this.$Modal.warning({
                    title: "提示",
                    content: "<p>开始时间不得大于结束时间</p>"
                    });
                    return false;
                }
                this.loading3 = true;
                let data = {
                    beginTime:this.beginTime,
                    endTime:this.endTime
                }
                this.http.post(BASE_URL+"/loan/statistics/queryCostStatistics",data).then(rep=>{
                    if(rep.code=='success'){
                        this.loading3 = false       
                        this.rechargeList=rep.data.rechargeList
                        this.consumptionList=rep.data.consumeList
                    }else{
                         this.loading3 = false       
                    }
                }).catch(err=>{
                    console.log(err)
                    this.loading3 = false       
                })
            },
            //导出
            // exportsList(){
            //     this.loading2 = true;
            //         let httpUrl =
            //         BASE_URL + "";
            //         let formData = new FormData();
            //         formData.append("", );
            //         formData.append("", );
            //         formData.append("",);
            //         formData.append("",);
            //         utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
            //         this.loading2 = false;
            //      });
            // }
        },
        mounted(){
            var myDate = new Date(); 
            var befordata = myDate.getTime()-6*24*3600*1000
            function timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            return Y+M+D;
            }
            this.beginTime=(timestampToTime(befordata));
            var year = myDate.getFullYear(); 
            var month = myDate.getMonth()+1;
            var day = myDate.getDate();//获取当前日（1-31） 
            if (month<10) { month = "0" + month; } 
            if (day >= 0 && day <= 9) {
            if (day == 1) {
            month = myDate.getMonth()
            if(month==0) {
            month=12; year=year-1; 
            }
            day = new Date(year, month, 0).getDate ();
            } else {
            day = day < 10 ? "0" + day : day 
            } 
            }
            var days = day-6;
            days = days<10 ? "0"+days:days;
            this.endTime = year+"-"+month + "-" + day;
            this.queryList()
        }
    }
</script>
<style lang="less" scoped>
    .recharge{
        margin-bottom:50px;
        h2{
            margin-bottom:20px
        }
    }
    .consumption{
        h2{
            margin-bottom:20px;
        }
    }
</style>