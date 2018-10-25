<template>
   <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;信贷列表>&nbsp;资料待审核</span>
            </p>
        </div>
        <!-- 资料待审核 -->
        <div class="contentcss"> 
            <div class="clearfix">
            <div class="left">
            <Select v-model="modelmoble"  @on-change="data_option" style="width:100px">
                <Option v-for="item in datamoble" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="dataname1" placeholder="请输入关键字" style="width: 150px"></Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="label2_query('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="label2_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
    </div> 
</template>
<script>
    export default{
        data(){
            return{
                modelmoble:'',
                datamoble:[],
                dataname1:'',
                startRow:1,
                endRow:10,
                total: 0,
                loading3:false,
                dataname1:'',
                columns8: [
                    {
                    title: "ID",
                    key: "dataId",
                    width: 200,
                    align: "center"
                    },
                    {
                    title: "手机号",
                    key: "phoneMember",
                    width: 200,
                    align: "center"
                    },
                    {
                    title: "姓名",
                    key: "realName",
                    width: 200,
                    align: "center"
                    },
                    {
                    title: "修改类型",
                    key: "auditType",
                    align: "center",
                    width: 200
                    },
                    {
                    title: "审核状态",
                    // key: 'auditStatus',
                    width: 200,
                    align: "center",
                    render: (h, params) => {
                        let audstatus = params.row.auditStatus;
                        let auditStatus;
                        if (audstatus == 0) {
                        auditStatus = "待审核";
                        } else if (audstatus == 2) {
                        auditStatus = "审核失败";
                        }
                        return h("div", [
                        h(
                            "span",
                            {
                            style: {
                                marginRight: "5px"
                            }
                            },
                            auditStatus
                        )
                        ]);
                    }
                    },
                    {
                    title: "提交修改时间",
                    key: "auditUpdateTime",
                    align: "center",
                    width: 200,
                    },
                    {
                    title: "操作",
                    // key: 'action',
                    width: 200,
                    align: "center",
                    render: (h, params) => {
                        let audstatus = params.row.auditStatus;
                        let auditStatus;
                        if (audstatus == 0) {
                        auditStatus = "审核";
                        } else if (audstatus == 2) {
                        auditStatus = "查看";
                        }
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
                                if (audstatus == 0) {
                                    auditStatus = "0";
                                } else if (audstatus == 2) {
                                    auditStatus = "2";
                                }
                                this.$router.push({
                                    path:
                                    "./revisionReview?auditCode=" +
                                    params.row.auditCode +
                                    "&&auditStatus=" +
                                    auditStatus
                                }); //审核
                                }
                            }
                            },
                            auditStatus
                        )
                        ]);
                    }
                    }
                ],
                data7:[]
            }
        },
        methods:{
            pageChange(page) {
                this.startRow = page;
                // this.params.page = page;
                this.labell1();
                
            },
            PageSizeChange(page) {
                this.startRow = 1;
                this.endRow = page;
                this.labell1();
            },
            // 手机号提示
            phoneti(type) {
                const title = "温馨提示";
                const content = "<p>手机号不能小于3位数</p>";
                switch (type) {
                    case "warning":
                    this.$Modal.warning({
                        title: title,
                        content: content
                    });
                    break;
                }
            },
            //接口封装
            post(httpUrl, params) {
                this.http.post(httpUrl, params)
                .then(data => {
                    if (data.code == "success") {
                        this.total = parseInt(data.data.total);
                        this.startRow =
                        Math.ceil(data.data.startRow / this.endRow) == 0
                            ? 1
                            : Math.ceil(data.data.startRow / this.endRow);
                        this.data7 = data.data.dataList;
                        this.loading3 = false;
                        return false;
                    }else{
                        this.total = 0;
                        this.loading3 = false;
                    }
                }).catch(err=>{
                    console.log(err);
                    this.loading3 = false;
                })
            },
            label2_query(type) {
                if (this.modelmoble == "mobile") {
                    if (this.dataname1 != "" && this.dataname1.length < 3) {
                    this.phoneti(type);
                    } else {
                    this.loading3 = true;
                    this.labell1();
                    }
                } else {
                    this.loading3 = true;
                    this.labell1();
                }
            },
            data_option(v) {
                this.modelmoble = v;
            },
            labell1() {
               let data = Object.assign({
                searchValue: this.dataname1,
                searchOptions: this.modelmoble, //姓名or手机号
                pageSize: this.endRow,
                pageNum: this.startRow
                });
                this.post(
                BASE_URL + "/loan/officer/queryOfficerDataWaitCheckList",
                data
                );
            }
        },
        created(){
            this.labell1();
            this.http
            .post(BASE_URL + "/loan/officer/queryOfficerDataWaitCheckListFilter", {})
            .then(data => {
                this.datamoble = data.data.searchOptions;
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
</script>
<style>

</style>
