<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;代超产品</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            
            <span class="ml20">时间:</span>
            <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 150px"></DatePicker>
        
        
            <Select v-model="AllproductsCode" placeholder="所有产品" style="width:150px" @on-change="AllproductsChange" class="mr20 ml50">
                <Option v-for="item in AllproductsList" :value="item.AllproductsCode" :key="item.AllproductsCode">
                    {{ item.AllproductsName }}
                </Option>
            </Select>
            
            <Select v-model="InquiredetailCode" placeholder="查询明细" style="width:150px;" @on-change="InquiredetailChange">
              <Option v-for="item in InquiredetaiList" :value="item.InquiredetaiCode" :key="item.InquiredetaiCode">
                {{ item.InquiredetaiName }}
              </Option>
            </Select>

            <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
            <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
            </Button> 
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList" v-if='currentStatus == 0'></Table>
            <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList" v-if='currentStatus == 1'></Table>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                currentStatus:0,
                loading3: false,
                loading2: false,
                beginTime:"",
                endTime:"",
                AllproductsCode:"",//所有产品
                AllproductsList:[],
                InquiredetailCode:"",//查询明细
                InquiredetaiList:[],
                options3: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                columnList:[],
                reportList:[]
            }
        },
        methods:{
        // 时间选择
            beginTimeChange(value, data) {
                this.beginTime = value
            },
            endTimeChange(value, data) {
                this.endTime = value
            },
            
            AllproductsChange(){

            },
            InquiredetailChange(){

            },
            timeFormat(date, num) {
                let y = date.getFullYear(); //年
                let m = date.getMonth() + 1; //月
                let d = date.getDate(); //日
                if (num == 1) {
                d = date.getDate() - 1
                }
                m = m < 10 ? "0" + m : m;
                d = d < 10 ? "0" + d : d;
                return y + "-" + m + "-" + d;
            },
            // 查询
            queryReportList() {
                let date1 = Date.parse(new Date(this.beginTime)) / 1000
                let date2 = Date.parse(new Date(this.endTime)) / 1000
                if (date1 > date2) {
                this.$Modal.warning({
                    title: '提示',
                    content: '<p>开始时间不得大于结束时间</p>'
                })
                return false
                }
                // this.loading3 = true;
                this.columnList = this.getColumnList()
                let params = {
                    beginTime:this.beginTime,
                    endTime : this.endTime,
                    AllproductsCode : this.AllproductsCode,
                    InquiredetailCode : this.InquiredetailCode                   
                }
                this.http.post(BASE_URL+'',params).then(data=>{

                    this.reportList = data.data
                })
            },
            // queryBusiness(callback) {
            //     this.http.post(BASE_URL + '/', {}).then((resp) => {
            //         if(resp.code=='success'){
                        
            //         }
            //     })
            // },
            // 导出
            exports(){

            },
            getColumnList(){
                let columnList = [
                    this.getColumnItem('日期', '', 150, (h, params) => {
                        // return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (date) => {
                        // // return date.
                        // })
                    }),
                    this.getColumnItem('产品名称', '', 150, (h, params) => {
                        // return this.reportColumns1Render(h, params.row.suppliersDayReportResList, (suppliers) => {
                        // // return suppliers.suppliersName
                        // })
                    }),
                    this.getColumnItem('详情页查看人数', '', 150, (h, params) => {
                        // return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (details) => {
                        // // return details.
                        // })
                    }),
                    this.getColumnItem('立即申请点击人数', '', 150, (h, params) => {
                        // return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (number) => {
                        // // return number.
                        // })
                    }),
                    this.getColumnItem('点击转化率', '', 150, (h, params) => {
                        // return this.reportColumns2Render(h, params.row.suppliersDayReportResList, (click) => {
                        // // return click.
                        // })
                    }),
                ]
                return columnList
            },
            getColumnItem(title, key, width, render) {
                return {
                title: title,
                key: key,
                minWidth: width,
                align: 'center',
                render: render
                }
            },
            reportColumns2Render(h, params, showTextCallback) {
                let list = []
                for (let i = 0; i < params.length; i++) {
                    for (let j = 0; j < params[i].channelReportList.length; j++) {
                        let text = showTextCallback ? showTextCallback(params[i].channelReportList[j]) : params[i].channelReportList[j]
                        list.push(
                            h('span', {
                                style: {
                                display: 'block',
                                width: '100%',
                                align: 'center',
                                lineHeight: '40px',
                                borderBottom: i < params.length - 1 || j < params[i].channelReportList.length - 1 ? '1px solid #e9eaec' : ''
                                }
                            }, text)
                        )
                    }
                }
                return h('div', list)
            },
        },
        created(){
            //所有产品
            this.http.post(BASE_URL+"",{}).then(data=>{
                if(data.code=="success"){
                    this.AllproductsList=data.data
                } 
            }).catch(err=>{
                    console.log(err)
            });
            //查询明细
            this.http.post(BASE_URL+'',{}).then(data=>{
                if(data.code=='success'){
                    this.InquiredetailCode=data.data
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        mounted(){
            var date = new Date();
            this.endTime = this.timeFormat(date, 1)
            date.setDate(1);
            this.beginTime = this.timeFormat(date, 0)
            this.queryReportList()      
        }
    }
</script>
<style lang="less" scoped>

</style>

