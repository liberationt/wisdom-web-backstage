<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;入驻待审核</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix" >
              <ul class="querysty clearfix">
                  <li>
                    <Input class="mr20" v-for="item in searchOptions" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px"></Input>
                  </li>
                    <!-- <Select v-model="model1" style="width:100px" @on-change="label_option">
                    <Option v-for="item in searchOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input v-model="name" placeholder="请输入关键字"  style="width: 150px">
                    </Input> -->
                  <li>
                    <Input v-model="userCode" placeholder="请输入信贷员code" class="mr20" style="width: 150px"></Input>
                  </li>
                  <li>
                    <Input v-model="channelName" placeholder="请输入注册渠道" class="mr20" style="width: 150px"></Input>
                  </li>
                  <li>
                    <Select v-model="model3" @on-change="label_state" placeholder="所属状态" style="width:150px;">
                        <Option v-for="item in statusOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </li>
                  <li>
                    <Select v-model="models" @on-change="citys" class="mr20" placeholder="请选择省" style="width:150px;margin-left:20px">
                        <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li>
                    <Select v-model="modelshi" @on-change="cityh" class="mr20" placeholder="请选择市" style="width:150px;">
                        <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                    </Select>
                  </li>
                 
                  <li>
                <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="label_query('warning')">查询</Button> -->
                    <Button type="info" class="w90" :loading="loading3" @click="label_query('warning')">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                    </Button>
                  </li>
            </ul>
            </div>
            <div id="application_table" class="mt15">
                <Table border highlight-row :columns="columns7" :data="data6"></Table>
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
                userCode: "",
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
                model1:'mobile',
                channelName:'', //渠道名称
                name:"",
                model3:"1",
                models:"",//省
                modelshi:"",//市
                labelstate:"1",
                loading3:false,
                startRow:1,
                endRow:10,
                total: 0,
                data6:[],
                statusOptions:[],
                cityType:[],
                searchOptions:[],
                cityTypel:[],
                columns7: [
                    {
                    title: "ID",
                    key: "dataId",
                    minWidth: 100,
                    align: "center"
                    },
                    {
                    title: "手机号",
                    key: "phoneMember",
                    minWidth: 140,
                    align: "center"
                    },
                    {
                    title: "注册渠道",
                    key: "channelCode",
                    minWidth: 140,
                    align: "center"
                    },
                    {
                    title: "姓名",
                    key: "realName",
                    minWidth: 100,
                    align: "center"
                    },
                    {
                    title: "性别",
                    key: "gender",
                    minWidth: 100,
                    align: "center"
                    },
                    {
                    title: "所属区域",
                    key: "loanLocationName",
                    minWidth: 150,
                    align: "center"
                    },
                    // {
                    // title: "贷款额度",
                    // key: "serviceAmount",
                    // width: 150,
                    // align: "center"
                    // },
                    // {
                    // title: "贷款类型",
                    // width: 200,
                    // align: "center",
                    // render: (h, params) => {
                    //     return h("div", [
                    //     h(
                    //         "span",
                    //         {
                    //         style: {
                    //             display: "inline-block",
                    //             width: "100%",
                    //             overflow: "hidden",
                    //             textOverflow: "ellipsis",
                    //             whiteSpace: "nowrap"
                    //         },
                    //         domProps: {
                    //             title: params.row.loanHaveType.join("，")
                    //         }
                    //         },
                    //         params.row.loanHaveType.join("，")
                    //     )
                    //     ]);
                    // }
                    // },
                    {
                    title: "证件",
                    key: "status",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    title: "审核状态",
                    minWidth: 128,
                    align: "center",
                    render: (h, params) => {
                        let loanStatus = params.row.loanStatus;
                        let status;
                        if (loanStatus == 1) {
                        status = "待审核";
                        } else if (loanStatus == 3) {
                        status = "审核失败";
                        }
                        return h("div", [
                        h(
                            "span",
                            {
                            style: {
                                marginRight: "5px"
                            }
                            },
                            status
                        )
                        ]);
                    }
                    },
                    {
                    title: "注册时间",
                    key: "registerTime",
                    minWidth: 200,
                    align: "center"
                    },
                    {
                    title: "操作",
                    key: "action",
                    minWidth: 150,
                    align: "center",
                    fixed: 'right',
                    render: (h, params) => {
                        // console.log(params)
                        let status = params.row.loanStatus;
                        let statusn;
                        if (status == 1) {
                        statusn = "审核";
                        } else if (status == 3) {
                        statusn = "详情";
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
                                if (status == 1) {
                                    this.$router.push({
                                    path:
                                        "./creditInformation?loanOfficerCode=" +
                                        params.row.loanOfficerCode
                                    });
                                } else if (status == 3) {
                                    statusn = "详情";
                                    this.$router.push({
                                    path:
                                        "./creditInformation?loanOfficerCode=" +
                                        params.row.loanOfficerCode
                                    });
                                }
                                }
                            }
                            },
                            statusn
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
                                        // this.loanOfficerphone = params.row.phoneMember
                                     }
                                 }
                            },
                            '拨打'
                        )
                        ]);
                    }
                    }
                ]   
            }
        },
        methods:{
            //拨打电话
            dialing () {
                let data = {
                    loanOfficerCode:this.loanOfficerCode
                }
                this.http.post(BASE_URL + "/sale/saleDialRecord/callLoanOfficer", data)
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
                        this.$refs[name].resetFields()
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
            // 接口封装
            post(httpUrl, params) {
                this.http.post(httpUrl, params)
                .then(data => {
                    if (data.code == "success") {
                        this.total = parseInt(data.data.total);
                        this.startRow =
                        Math.ceil(data.data.startRow / this.endRow) == 0
                            ? 1
                            : Math.ceil(data.data.startRow / this.endRow);
                        this.data6 = data.data.dataList;
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
            // 入住待审核查询
            label_query(type) {
                this.startRow = '1'
                if (this.model1 == "mobile") {
                    if (this.name != "" && this.name.length < 3) {
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
            // 查询
            labell1() {
                let list = []
                for (let i = 0; i < this.searchOptions.length; i++) {
                   if (this.searchOptions[i].value == 'mobile') {
                        if (this.searchOptions[i].code!=null && this.searchOptions[i].code.length<3 && this.searchOptions[i].code!='') {
                            this.loading3= false
                            this.phoneti('warning')
                            return false
                        }           
                    }
                    let obj = new Object ()
                    obj.label = this.searchOptions[i].value
                    if (this.searchOptions[i].code == null) {
                        obj.value = ''
                    } else {
                        obj.value = this.searchOptions[i].code
                    }
                    list.push(obj)                   
                }
               let data = Object.assign({
                    // searchValue: this.name, //手机号or姓名的参数
                    searchOptions: list, //手机号or 姓名
                    loanStatus: this.labelstate == -1 ? null : this.labelstate, //选择状态
                    loanAdCodeFirst: this.labelcitys, //区域 省
                    loanAdCodeSecond: this.modelshi, //市
                    loanOfficerCode:this.userCode,
                    channelCode:this.channelName, //渠道名称
                    pageSize: this.endRow,
                    pageNum: this.startRow
                });
                this.post(
                    BASE_URL + "/loan/officer/queryOfficerAdmissionList",
                    data
                );
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
            citys(v) {
                // console.log(v)
                let data = {
                    data: v
                };
                this.httpshi(data);
                this.labelcitys = v;
            },
                //市
            cityh(v) {
                this.modelshi = v;
            },

            label_option(v) {
                this.model1 = v;
            },
            label_state(v) {
            this.labelstate = v;
            },
            //市接口
            httpshi(data) {
                this.http.post(BASE_URL + "/loan/hotcity/queryCityAddressList", data).then(data => {
                    this.cityTypel = data.data || "";
                });   
            }
        },
        created(){
            this.http.get("../../../static/city.json").then(data => {
                this.cityType = data;
                this.cityType1 = data;
                this.labell1();
            });
            this.http
            .post(BASE_URL + "/loan/officer/queryOfficerAdmissionListFilter", {})
            .then(data => {
                this.searchOptions = data.data.searchOptions;
                this.statusOptions = data.data.statusOptions;
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
</script>
<style lang='less' scoped>

</style>

