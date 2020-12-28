<template>
   <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;资料待审核</span>
            </p>
        </div>
        <!-- 资料待审核 -->
        <div class="contentcss"> 
            <div class="clearfix">
            <div class="left">
                <Input class="mr20" v-for="item in datamoble" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
                </Input>
            <!-- <Select v-model="modelmoble"  @on-change="data_option" style="width:100px">
                <Option v-for="item in datamoble" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="dataname1" placeholder="请输入关键字" style="width: 150px"></Input> -->
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="label2_query('warning')">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="label2_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
        <Modal
        title="拨打电话"
        v-model="modal10"
        ok-text="确认"
        cancel-text="取消"
        @on-ok="dialing"
        width='300'
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p>确认拨打信贷员 {{nametitle}} 的电话吗?</p>
        </Modal>
        <Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
            <p slot="header" style="text-align:left">
                <span>拨打标记</span>
            </p>
            <div style="text-align:left">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">        
                <FormItem label="拨打备注" prop="memo">
                    <!-- <span>拨打备注:</span> -->
                    <Select v-model="formValidate.memo" @on-change="selremarks" placeholder="请选择" style="width:200px;">
                    <Option v-for="item in remarkslist" :value="item.remarkCode" :key="item.remarkCode">{{ item.remarkDesc }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="待办备注：" prop="standbyDesc" v-if="this.formValidate.memo == '1006'">
                    <Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
                </FormItem>
                </Form>           
            </div>
            <div slot="footer" >
                <Button type="default"  @click="modalclose('formValidate')">关闭</Button>
                <Button type="primary" @click="dialsub('formValidate')">提交</Button>
            </div>
        </Modal>
    </div> 
</template>
<script>
    export default{
        data(){
            return{
                modal10:false,
                modal2:false,
                nametitle:'',
                remarkslist:[],
                loanOfficerCode:'',
                dialRecordCode:'',
                formValidate:{
                    memo:'1001',
                    standbyDesc:''
                },
                ruleValidate:{
                    memo: [{ required: true, message: '请选择拨打备注', trigger: 'change' }],
                    standbyDesc:[{required: true,message: "请填写待办备注",trigger: "blur"}]
                },
                //以上是拨打电话的
                modelmoble:'mobile',
                datamoble:[],
                dataname1:'',
                startRow:1,
                endRow:10,
                total: 0,
                loading3:false,
                columns8: [
                    {
                    title: "ID",
                    key: "dataId",
                    minWidth: 200,
                    align: "center"
                    },
                    {
                    title: "手机号",
                    key: "phoneMember",
                    minWidth: 200,
                    align: "center"
                    },
                    {
                    title: "姓名",
                    key: "realName",
                    minWidth: 200,
                    align: "center"
                    },
                    {
                    title: "修改类型",
                    key: "auditType",
                    align: "center",
                    minWidth: 200
                    },
                    {
                    title: "审核状态",
                    // key: 'auditStatus',
                    minWidth: 200,
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
                    minWidth: 200,
                    },
                    {
                    title: "操作",
                    // key: 'action',
                    minWidth: 200,
                    align: "center",
                    fixed: 'right',
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
                        ),
                        h(
                            'Button',
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                 },
                                 on:{
                                     click:()=>{
                                        this.modal10=true
                                        this.nametitle = params.row.realName
                                        this.loanOfficerCode = params.row.loanOfficerCode
                                     }
                                 }
                            },
                            '拨打'
                        )
                        ]);
                    }
                    }
                ],
                data7:[]
            }
        },
        methods:{
            //拨打电话
            dialing () {
                this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", {loanOfficerCode:this.loanOfficerCode})
            .then(data => {
                if (data.code == 'success') {
                    this.modal2 = true
                    this.$Message.success(data.message)
                    this.dialRecordCode = data.data.dialRecordCode
                }else{
                    this.modal2 = false
                    this.$Message.error(data.message)
                }
            })
            .catch(err => {
                console.log(err);
            });
                this.dialRemarks ()
            },
            //下拉框
            dialRemarks () {
            this.http.post(BASE_URL + "/sale/saleDialRemark/getDialRemarkList", {})
            .then(data => {
                if (data.code == 'success') {
                this.remarkslist = data.data  
                }
            })
            .catch(err => {
                console.log(err);
            });
            },
            //关闭
            modalclose(name){
                this.modal2 = false
                this.$refs[name].resetFields();
            },
            //提交
            dialsub(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let list = {
                    remarkCode : this.formValidate.memo,
                    dialCode :this.dialRecordCode,
                    loanOfficerCode :this.loanOfficerCode, 
                    remark:this.formValidate.standbyDesc
                    }
                    this.http.post(BASE_URL + "/sale/saleDialRecord/saveDialRemark4KF", list)
                    .then(data => {
                    if (data.code == 'success') {
                        this.modal2 = false
                        this.$Message.success('备注成功')
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error(data.message);
                        this.$refs[name].resetFields();
                    }
                    }).catch(err=>{
                    console.log(err)
                    })
                }
            })
            },
            //下拉框的选择
            selremarks(status){
                this.formValidate.memo = status
            },
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
                this.startRow = '1'
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
                let list = []
                for (let i = 0; i < this.datamoble.length; i++) {
                    if (this.datamoble[i].value == 'mobile') {
                        if (this.datamoble[i].code!=null && this.datamoble[i].code.length<3 && this.datamoble[i].code!='') {
                            this.loading3= false
                            this.phoneti('warning')
                            return false
                        }           
                    }
                    let obj = new Object ()
                    obj.label = this.datamoble[i].value
                    if (this.datamoble[i].code == null) {
                        obj.value = ''
                    } else {
                        obj.value = this.datamoble[i].code
                    }
                    list.push(obj)
                    
                }
               let data = Object.assign({
                // searchValue: this.dataname1,
                searchOptions: list, //姓名or手机号
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
