<template>
    <div>
        <div class="navigation">
             <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;待审核设置</span>
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
                        title: "设置类型",
                        key: "auditTypeName",
                        align: "center",
                        minWidth: 150,
                        render: (h, params) => {
                            let auditType
                            if (params.row.auditType == 1) {
                                auditType = '基本设置'
                            } else if (params.row.auditType == 2) {
                                auditType = '身价设置'
                            } else if (params.row.auditType == 3) {
                                auditType = '营销设置'
                            } else if (params.row.auditType == 4) {
                                auditType = '淘单筛选设置'
                            } else if (params.row.auditType == 5) {
                                auditType = '优质订单设置'
                            } else if (params.row.auditType == 6) {
                                auditType = '淘单限制设置'
                            } else if (params.row.auditType == 7) {
                                auditType = '会员充值营销设置'
                            } else if (params.row.auditType == 8) {
                                auditType = '充值设置'
                            }
                            return h('div', [
                            h('span', {}, auditType)
                            ])
                        }
                    },
                    {
                        title: "设置内容",
                        key: "auditTypeName",
                        align: "center",
                        minWidth: 150,
                        render: (h, params) => {
                        return h("div", [
                        h(
                            "span",
                            {
                            style: {
                                display: "inline-block",
                                width: "100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            },
                            domProps: {
                                title: params.row.auditTypeName
                            }
                            },
                            params.row.auditTypeName
                        )
                        ]);
                    }
                    },
                    {
                        title: "修改时间",
                        key: "dataCreateTime",
                        minWidth: 160,
                        align: "center"
                    },
                    {
                        title: "提交人",
                        key: "operator",
                        minWidth: 100,
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
                                    if(params.row.auditType==1){
                                        this.$router.push({
                                            path:"./creditSetting"
                                        })
                                    }else if(params.row.auditType==2){
                                        if (params.row.confType == 0) {
                                            if (params.row.defaultConf == 0) {
                                                this.$router.push({ path: "./creditValue?cityshow=1&socialConfigCode="+params.row.auditCode+"&operationtype=3"+"&afteraudit=1"});  
                                            } else {
                                                this.$router.push({ path: "./creditValue?cityshow=0&socialConfigCode="+params.row.auditCode+"&operationtype=3"+"&afteraudit=1"});  
                                            }                         
                                            } else {
                                            if (params.row.defaultConf == 0) {
                                                this.$router.push({ path: "./specificStatus?cityshow=1&socialConfigCode="+params.row.auditCode+"&operationtype=3"+"&afteraudit=1"});  
                                            } else {
                                                this.$router.push({ path: "./specificStatus?cityshow=0&socialConfigCode="+params.row.auditCode+"&operationtype=3"+"&afteraudit=1"});  
                                            } 
                                            }
                                    }else if(params.row.auditType==3){
                                        this.$router.push({
                                            path:"./creditMarketing"
                                        })
                                    }else if(params.row.auditType==4){
                                        this.$router.push({
                                            path:"./creditNaughty"
                                        })
                                    }else if(params.row.auditType==7){
                                        this.$router.push({
                                            path:"./memberRecharge"
                                        })
                                    }else if(params.row.auditType==8){
                                        this.$router.push({
                                            path:"./foundationSetup?configAuditCode="+params.row.configAuditCode
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
            this.http.post(BASE_URL+'/loan/configAudit/queryConfigAuditList',{}).then(data=>{
                if(data.code=='success'){
                    this.data=data.data
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

