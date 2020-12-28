<template>
    <div>
        <div class="navigation">
             <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;充值活动审核</span>
            </p>
        </div>
        <div class="contentcss">
            <Table border highlight-row :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                data:[],
                columns:[
                    {
                        title: "活动类型",
                        key: "activityType",
                        align: "center",
                        minWidth: 150,
                        render: (h, params) => {
                            let activityType
                            if (params.row.activityType == 1) {
                                activityType = '充值送赞豆'
                            } else if (params.row.activityType == 2) {
                                activityType = '充值送抢单券'
                            } else if (params.row.activityType == 3) {
                                activityType = '充值送会员'
                            } else if (params.row.activityType == 4) {
                                activityType = '充值送优惠券'
                            } else if (params.row.activityType == 5) {
                                activityType = '充值会员送抢单券'
                            }
                            return h('div', [
                            h('span', {}, activityType)
                            ])
                        }
                    },
                    {
                        title: "活动标题",
                        key: "confName",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "省份",
                        key: "provinceName",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "活动周期",
                        key: "dataCreateTime",
                        minWidth: 160,
                        align: "center",
                        render: (h, params) => {
                            let activityTimeEnabled
                            if (params.row.activityTimeEnabled == 0) {
                                activityTimeEnabled = '不限时间范围'
                            } else if (params.row.activityTimeEnabled == 1) {
                                activityTimeEnabled = '固定时间范围'
                            }
                            return h('div', [
                            h('span', {}, activityTimeEnabled)
                            ])
                        }
                    },
                    {
                        title: "开始时间",
                        key: "activityBeginTime",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "结束时间",
                        key: "activityEndTime",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "添加时间",
                        key: "dataCreateTime",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "活动状态",
                        key: "dataCreateTime",
                        minWidth: 160,
                        align: "center",
                        render: (h, params) => {
                            let activityStatus 
                            if (params.row.activityStatus == 1) {
                                activityStatus = '未开始'
                            } else if (params.row.activityStatus == 2) {
                                activityStatus = '已开始'
                            } else if (params.row.activityStatus == 3) {
                                activityStatus = '已结束'
                            } else if (params.row.activityStatus == 4) {
                                activityStatus = '无效'
                            }
                            return h('div', [
                            h('span', {}, activityStatus)
                            ])
                        }

                    },
                    {
                        title: "审核状态",
                        key: "operator",
                        minWidth: 100,
                        align: "center",
                        render: (h, params) => {
                            let auditStatus  
                            if (params.row.auditStatus  == 1) {
                                auditStatus  = '待审核'
                            } else if (params.row.auditStatus  == 2) {
                                auditStatus  = '审核成功'
                            } else if (params.row.auditStatus  == 3) {
                                auditStatus  = '审核失败'
                            }
                            return h('div', [
                            h('span', {}, auditStatus )
                            ])
                        }
                    },
                    {
                        title: "创建人",
                        key: "createPerson",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title:'操作',
                        // key:'action',
                        minWidth:250,
                        fixed: 'right',
                        align:"center",
                        render: (h, params) => {
                        return h("div", [
                        h(
                            "Button",
                            {
                            props: {
                                type: "primary",
                                size: "small"
                            },
                            style: {
                                marginRight: "5px"
                            },
                            on: {
                                click: () => {
                                    if(params.row.activityType==1){
                                        this.$router.push({//送赞豆
                                            path:"./premiumzd?code="+params.row.code+'&num=2'
                                        })
                                    }else if(params.row.activityType==2){//充值送抢单券
                                        this.$router.push({
                                            path:"./rechargeVoucher?code="+params.row.code+'&num=2'
                                        })
                                    }else if(params.row.activityType==3){//充值送会员
                                        this.$router.push({
                                            path:"./rechargeableMembers?code="+params.row.code+'&num=2'
                                        })
                                    }else if(params.row.activityType==4){//充值送优惠券
                                        this.$router.push({
                                            path:"./sendCoupons?code="+params.row.code+'&num=2'
                                        })
                                    }else if(params.row.activityType==5){//充值会员送抢单券
                                        this.$router.push({
                                            path:"./membership?code="+params.row.code+'&num=2'
                                        })
                                    }
                                }
                            }
                            },
                            "审核"
                        )
                        ]);
                    }

                    } 
                ]
            }
        },
        created(){
            this.http.post(BASE_URL+'/loan/rechargeActivity/queryPage',{auditStatus :1}).then(data=>{
                if(data.code=='success'){
                    this.data=data.data.dataList
                }
                // this.data=data.data
                
            }).catch(err=>{
                console.log(err)
            })
        }
    }
</script>
<style lang='less' scoped>

</style>

