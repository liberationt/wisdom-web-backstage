<template>
    <div>
        <div class="navigation">
             <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;待审核设置</span>
            </p>
        </div>
        <div class="contentcss">
            <Table border :columns="columns" :data="data"></Table>
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
                        title: "修改类型",
                        key: "auditTypeName",
                        align: "center",
                        minWidth: 250
                    },
                    {
                        title: "修改时间",
                        key: "dataCreateTime",
                        minWidth: 300,
                        align: "center"
                    },
                    {
                        title: "提交人",
                        key: "operator",
                        minWidth: 250,
                        align: "center"
                    },
                    {
                        title:'操作',
                        // key:'action',
                        minWidth:250,
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
                                        this.$router.push({
                                            path:"./creditValue"
                                        })
                                    }else if(params.row.auditType==3){
                                        this.$router.push({
                                            path:"./creditMarketing"
                                        })
                                    }else if(params.row.auditType==4){
                                        this.$router.push({
                                            path:"./creditNaughty"
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
                    console.log(this.data)
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

