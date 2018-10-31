<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;信贷列表>&nbsp;信贷机构</span>
            </p>
        </div>

        <div class="clearfix contentcss">
            <div class="left">
                <Input v-model="guanname" placeholder="请输入关键字" style="width: 150px"></Input>
                <Select v-model="modell3" placeholder="上架状态" @on-change='loanstatusl' style="width:150px;margin-left:50px">
                    <Option v-for="item in loanstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="model4" @on-change='loanrecommendl' placeholder="是否首页推荐" style="width:150px;margin-left:50px">
                    <Option v-for="item in loanrecommend" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <Button type="primary" class="right mr20" shape="circle" icon="plus-round" @click="addManage">添加信贷机构</Button>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="mechanisminqury('warning')">
            <span v-if="!loading3">查询</span>
            <span v-else>查询</span>
            </Button>
            
        </div>
            
        <div id="application_table" class="mt15">
            <Table border :columns="columns11" :data="data10"></Table>
        </div>
        <div class="tr mt15">
            <Page  :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
        </div>
    </div>
</template>
<script>
import untils from "../../utils/utils";
    export default{
        data(){
            return{
                guanname:'',  
                modell3:'',
                model4:'',
                loading3:'',
                total:0,
                loanstatus:[],
                loanrecommend:[],
                columns11: [
                    {
                    title: "ID",
                    key: "dataId",
                    align: "center"
                    },
                    {
                    title: "机构名称",
                    key: "institutionsName",
                    align: "center"
                    },
                    {
                    title: "状态",
                    key: "institutionsUpStatus",
                    align: "center",
                    render: (h, params) => {
                        let institutionsUpStatus;
                        if (params.row.institutionsUpStatus == "0") {
                        institutionsUpStatus = "下架";
                        } else if (params.row.institutionsUpStatus == "1") {
                        institutionsUpStatus = "上架";
                        }
                        return h("div", [
                        h(
                            "span",
                            {
                            style: {
                                marginRight: "5px"
                            }
                            },
                            institutionsUpStatus
                        )
                        ]);
                    }
                    },
                    {
                    title: "首页推荐",
                    align: "center",
                    render: (h, params) => {
                        let institutionsRecommendStatus;
                        if (params.row.institutionsRecommendStatus == "0") {
                        institutionsRecommendStatus = "否";
                        } else if (params.row.institutionsRecommendStatus == "1") {
                        institutionsRecommendStatus = "是";
                        }
                        return h("div", [
                        h(
                            "span",
                            {
                            style: {
                                marginRight: "5px"
                            }
                            },
                            institutionsRecommendStatus
                        )
                        ]);
                    }
                    },
                    {
                    title: "产品数量",
                    key: "productNum",
                    align: "center"
                    },
                    {
                    title: "注册时间",
                    key: "dataCreateTime",
                    align: "center"
                    },
                    {
                    title: "操作",
                    key: "action",
                    minWidth: 200,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                        h(
                            "Button",
                            {
                            props: {
                                type: "error",
                                size: "small"
                            },
                            style: {
                                marginRight: "5px"
                            },
                            on: {
                                click: () => {
                                this.adopt(params.row.institutionsCode);
                                }
                            }
                            },
                            "删除"
                        ),
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
                                untils.setCookie(
                                    "institutionsCode",
                                    params.row.institutionsCode
                                );
                                this.$router.push({
                                    path: "./addMechanism?isedit=" + "is"
                                });
                                }
                            }
                            },
                            "编辑"
                        ),
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
                                untils.setCookie(
                                    "institutionsCode",
                                    params.row.institutionsCode
                                );
                                this.$router.push({ path: "./toExamine" });
                                }
                            }
                            },
                            "管理产品"
                        )
                        ]);
                    }
                    }
                ],
                data10:[],
                startRow: 1,
                endRow: 10,
                model3: "", 
                model4: "",  
                loanstatus: [
                    {
                    value: "''",
                    label: "上下架状态"
                    },
                    {
                    value: "1",
                    label: "上架"
                    },
                    {
                    value: "0",
                    label: "下架"
                    }
                ],
                sort: [
                    {
                    value: "注册时间排序",
                    label: "注册时间排序"
                    },
                    {
                    value: "登录时间排序",
                    label: "登录时间排序"
                    },
                    {
                    value: "余额排序",
                    label: "余额排序"
                    },
                    {
                    value: "咨询量排序",
                    label: "咨询量排序"
                    }
                ],
                loanrecommend: [
                    {
                    value: "''",
                    label: "是否首页推荐"
                    },
                    {
                    value: "1",
                    label: "是"
                    },
                    {
                    value: "0",
                    label: "否"
                    }
                ],         
            }
        },
        methods:{
            pageChange(page){
                this.startRow = page
                this.labell1()
            },
            pagesizechange(page){
                this.startRow = 1
                this.endRow = page
                this.labell1()
            },
            // 信贷机构
            loanstatusl(v) {
            this.model3 = v;
            },
            loanrecommendl(v) {
            this.model4 = v;
            },
             // 信贷机构 查询
            mechanisminqury(type) {
            this.loading3 = true;
            this.labell1();
            },
            // 信贷机构删除
            adopt(code) {
                this.$Modal.confirm({
                    title: "温馨提示",
                    content: "<p>确认删除吗?</p>",
                    onOk: () => {
                    this.http
                        .post(
                        BASE_URL +
                            "/loan/creditInstitutions/updateCreditInstitutionsStateByCode",
                        { institutionsCode: code }
                        )
                        .then(data => {
                        // console.log(data)
                        if (data.code == "success") {
                            this.$Message.info("删除成功！");
                            this.labell1("tab5");
                        } else {
                            this.$Message.info("删除失败！");
                        }
                        })
                        .catch(err => {
                        this.$Message.info("删除失败！");
                        console.log(err);
                        });
                    },
                    onCancel: () => {}
                });
            },
            post(httpUrl, params) {
                this.http.post(httpUrl, params)
                .then(data => {
                    if (data.code == "success") {
                        this.total = parseInt(data.data.total);
                        // this.startRow = Math.ceil(resp.data.startRow / this.endRow);  
                        this.startRow = 
                        Math.ceil(data.data.startRow / this.endRow) == 0
                            ? 1
                            : Math.ceil(data.data.startRow / this.endRow); 
                        this.data10 = data.data.creditInstitutionsList;           
                        this.guanname = "";
                        this.model4 = "";
                        this.modell3 = "";
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
            // 查询
            labell1() {
                let data = Object.assign({
                    institutionsName: this.guanname, //关键字
                    institutionsUpStatus: this.modell3  == "''" ? "" : this.modell3, // 上下架状态
                    institutionsRecommendStatus: this.model4 == "''" ? "" : this.model4, //是否首页推荐
                    pageSize: this.endRow,
                    pageNum: this.startRow
                    });
                    this.post(
                    BASE_URL + "/loan/creditInstitutions/queryCreditInstitutionsList",
                    data
                );  
            },
            addManage() {
                this.$router.push({ path: "./addMechanism" });
            }
        },
        created(){
            this.labell1();
        }
    }
</script>
<style>

</style>

