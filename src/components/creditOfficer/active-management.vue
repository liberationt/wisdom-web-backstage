<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;版本管理&nbsp;>&nbsp;活动聚合页管理</span>
            </p>
        </div>
        <div class="clearfix contentcss">
            <div class="addactive">
                <Button type="info" @click="addActive" shape="circle" icon="plus-round" class="mr20">添加活动</Button>
            </div>
            <div class="left">
                <ul class="querysty">
                    <li>
                        <Select v-model="state" class="mr20" placeholder="活动状态" style="width:150px">
                            <Option v-for="item in stateList" :key="item.value" :value="item.value" >{{item.label}}</Option>
                        </Select>
                    </li>
                    <li class="mr20">
                        <span class="w80 tr displayib">添加时间:</span>
                        <DatePicker type="date"  :options="options3" v-model='beginTime' placeholder="开始时间" style="width: 150px"></DatePicker>
                        <span>  -  </span>
                        <DatePicker type="date"  :options="options3" v-model='endTime' placeholder="结束时间" style="width: 150px"></DatePicker>
                    </li>
                    <li>
                        <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
                            <span v-if="!loading3">查询</span>
                            <span v-else>查询</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mt10 contentcss">
            <Table border highlight-row :columns="columns1" :data="data1"></Table>
            <div class="tr mt15">
                <Page :total="total" :current="startRow" :page-size="endRow" @on-page-size-change="pagesizechange" @on-change="pageChange" show-sizer show-total></Page>
            </div>
        </div>
        <Modal
            v-model="modal1"
            :title=tittles
            @on-ok="handleSubmit1('formValidate')"
            @on-cancel="handleReset1('formValidate')"
            :mask-closable="false"
            :loading='loading'
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动标题：" prop="activitytitle" >
                <Input type="text" v-model="formValidate.activitytitle" placeholder="请输入活动标题"></Input>
              </FormItem>
              <FormItem prop="productlogo" label="选择图片" >
                <Upload
                    action=""
                    :show-upload-list='false'
                    :format="['jpg','jpeg','png', 'gif']"
                    :before-upload="handleUploadicon"
                    :on-format-error="handleFormatError1"
                >
                    <img class="iconlabelUrl" :src="formValidate.labelUrl" alt="">
                    <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
                </Upload>
              </FormItem>
              <FormItem label="跳转类型" prop="jumpType">
                <Select v-model="formValidate.jumpType" style="width:140px" placeholder="不跳转">
                  <Option value="1">跳转</Option>
                  <Option value="0">不跳转</Option>
                </Select>
              </FormItem>
              <div v-if="formValidate.jumpType==1">
              <FormItem label="跳转页面" prop="pageType">
                <Select v-model="formValidate.pageType" placeholder="原生页面" style="width:140px">
                  <Option value="1">原生页面</Option>
                  <Option value="0">H5</Option>
                </Select>
              </FormItem>
              <FormItem label="" v-if="formValidate.pageType==1">
                <Select v-model="formValidate.jumpPage" placeholder="请选择" style="width:160px">
                  <Option v-for="(rem,i) in jumpAppParams" :key="i" :value="rem.jumpUrl">{{rem.jumpName}}</Option>
                </Select>
              </FormItem>
              <FormItem label="跳转URL" prop="jumpUrl" v-if="formValidate.pageType==0">
                <Input v-model="formValidate.jumpUrl" placeholder="请输入跳转URL"></Input>
              </FormItem>
              </div>
            </Form>
      </Modal>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
    data(){
        return{
            loading:true,
            modal1:false,
            tittles:'',
            state:'-1',
            stateList:[
                {value:'-1',label:'活动状态'},
                {value:'1',label:'上架'},
                {value:'0',label:'下架'}
            ],
            beginTime:'',
            endTime:'',
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now()
                }
            },
            loading3:false,
            columns1:[
                {
                    title: '活动标题',
                    key: 'title',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '图片',
                    key: 'name',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        return h('div', [
                        h('img', {
                            attrs: {
                                src: params.row.imgUrl,
                                style: 'width: 60px;height:60px'
                            },
                            style: {

                            }
                        })
                        ])
                    }
                },
                {
                    title: '添加时间',
                    key: 'dataCreateTime',
                    align: 'center',
                    minWidth: 160,
                },
                {
                    title: '活动状态',
                    key: 'name',
                    align: 'center',
                    minWidth: 100,
                    render:(h,params)=>{
                        return h('span',params.row.activityStatus==0?"下架":"上架")
                    }
                },
                {
                    title: '创建人',
                    key: 'creator',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '操作',
                    key: 'name',
                    align: 'center',
                    minWidth: 160,
                    render:(h,params,index)=>{
                        let arr=[]
                        if(params.row.activityStatus==0){
                            arr.push(
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    click: () => {
                                        this.upper(params.row.activityPageCode)
                                    }
                                    }
                                }, '上架'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    click: () => {
                                        this.edit(params.row.activityPageCode)
                                    }
                                    }
                                }, '编辑'),
                                
                            )
                        }
                        if(params.row.activityStatus==1){
                            arr.push(
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    click: () => {
                                       this.Lower(params.row.activityPageCode)
                                    }
                                    }
                                }, '下架'),
                                
                                
                            )
                            if(params.row.activityStatus==1&&params.index!=0){
                                arr.push(
                                     h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    click: () => {
                                        this.moveUpward(params.row.activityPageCode)
                                    }
                                    }
                                }, '上移')
                                )
                            }
                        }
                        return h('div',arr)
                    }
                },
            ],
            jumpAppParams:[],
            formValidate:{
                activitytitle:'',
                productlogo:'',
                labelUrl:require("../../image/moren.png"),
                jumpType:'0',
                pageType:'1',
                jumpPage:'',
                jumpUrl:''
            },
            ruleValidate:{
                activitytitle:[
                    { required: true, message: "请输入活动标题", trigger: "blur" },
                    {message: '活动标题最多50字',max: 50,trigger: 'change'}

                ],
                productlogo: [
                    { required: true, message: "请上传图标", trigger: "blur" }
                ],
                jumpType:[
                    { required: true, message: "请选择跳转类型", trigger: "blur" }
                ],
                pageType:[
                    { required: true, message: "请选择跳转页面类型", trigger: "blur" }
                ],
                jumpPage:[
                    { required: true, message: "请选择跳转页面", trigger: "blur" }
                ],
                jumpUrl:[
                    { required: true, message: "请输入跳转URL", trigger: "blur" }
                ]
            },
            data1:[],
            total:0,
            startRow:1,
            endRow:10,
            activityPageCode:''
        }
    },
    methods:{
        addActive(){
            this.tittles = '添加活动'
            this.modal1 = true
        },
        pagesizechange(endRow){
            this.startRow = 1;
            this.endRow = endRow
            this.queryList(1)
        },
        pageChange(startRow){
            this.startRow = 1
            this.queryList(1)
        },
        queryList(startRow){
            let date1 = Date.parse(new Date(this.beginTime))/1000
            let date2 = Date.parse(new Date(this.endTime))/1000
            if (date1 > date2) {
                this.loading3 = false
                this.$Modal.warning({
                title: '时间',
                content: '<p>开始时间不得大于结束时间</p>'
                })
                return false
            }
            let data={
                activityStatus:this.state=='-1'?"":this.state,
                beginTime :this.beginTime == "" ? "" : utils.formatDate(this.beginTime,'yyyy-MM-dd hh:mm:ss'),
                endTime :this.endTime == "" ? "" : utils.formatDate(this.endTime,'yyyy-MM-dd 23:59:59'),
                pageNum:startRow,
                pageSize :this.endRow,
            }
            this.http.post(BASE_URL+'/loan/loanActivityPage/queryPage',data)
            .then(data=>{
                if(data.code=='success'){
                    this.data1 = data.data.dataList
                    this.total = parseInt(data.data.total)
                }
            })
        },
        handleSubmit1(name){
            this.$refs[name].validate(valid => {
                if (!valid) {
                    return this.changeLoading()
                } else {
                    this.changeLoading()
                    this.Preservation ()
                }
            })
        },
        handleReset1(name){
            this.reset()
            this.$refs[name].resetFields()
        },
        Preservation(){
            let data ={
                title :this.formValidate.activitytitle,
                imgUrl:this.formValidate.productlogo,
                targetStatus:this.formValidate.jumpType,
                targetType:'',
                targetUrl:''
            }
            if(this.formValidate.jumpType==1){
                data.targetType=this.formValidate.pageType
                if(this.formValidate.pageType==1){
                    data.targetUrl=this.formValidate.jumpPage
                }else{
                    data.targetUrl=this.formValidate.jumpUrl
                }
            }
            let urls
            let tittle
            if(this.tittles=='添加活动'){
                urls='/loan/loanActivityPage/save'
                tittle='添加成功'
            }else{
                data.activityPageCode=this.activityPageCode
                urls='/loan/loanActivityPage/updateByCode'
                tittle='修改成功'
            }
            this.http.post(BASE_URL+urls,data)
            .then(data=>{
                if(data.code=='success'){
                    this.$Message.success(tittle)
                    this.modal1=false
                    this.reset()
                    this.changeLoading()
                    this.queryList(1)
                }
            })
        },
        changeLoading () {
            this.loading = false
            this.$nextTick(() => {
                this.loading = true
            })
        },
        reset(){
            this.formValidate.activitytitle=''
            this.formValidate.productlogo=require("../../image/moren.png")
            this.formValidate.labelUrl=require("../../image/moren.png")
            this.formValidate.jumpType='0'
            this.formValidate.pageType=''
            this.formValidate.jumpPage=''
            this.formValidate.jumpUrl=''
        },
        handleUploadicon(file){
            let splic = file.name.split(".");
            if (
                splic[splic.length - 1] == "png" ||
                splic[splic.length - 1] == "jpg" ||
                splic[splic.length - 1] == "gif" ||
                splic[splic.length - 1] == "jpeg"
            ) {
              let formData = new FormData();
              formData.append("file", file);
              let config = {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
            };
            this.http.post(BASE_URL + "/fileUpload", formData, config)
            .then(resp => {
                if (resp.code == "success") {
                  this.formValidate.labelUrl = resp.data;
                  this.formValidate.productlogo = resp.data;
                } else {
                }
            })
            .catch(() => {});
            return false;
          }
        },
        handleFormatError1(file) {
            this.$Message.info("图片格式不正确,请上传正确的图片格式");
        },
        //上架
        upper(activityPageCode){
            let data = {
                data:activityPageCode,
            }  
            this.http.post(BASE_URL+'/loan/loanActivityPage/putaway',data)
            .then(data=>{
                if(data.code=='success'){
                    this.$Message.success('上架成功')
                    this.queryList(1)
                }else{
                    this.$Message.error(data.message)
                }
            })
        },
        //下架
        Lower(activityPageCode){
            let data = {
               data:activityPageCode,
            }
            this.http.post(BASE_URL+'/loan/loanActivityPage/soldOut',data)
            .then(data=>{
                if(data.code=='success'){
                    this.$Message.success('下架成功')
                    this.queryList(1)
                }else{
                    this.$Message.error(data.message)
                }
            })
        }, 
        //编辑
        edit(activityPageCode){
            this.activityPageCode = activityPageCode
            this.tittles = '编辑活动'
            this.modal1=true
            let data = {
                data:activityPageCode,
            }
            this.http.post(BASE_URL+'/loan/loanActivityPage/getByCode',data)
            .then(data=>{
                if(data.code=='success'){
                    const {title,imgUrl,targetStatus,targetType,targetUrl,jumpAppParamList} = data.data
                    this.jumpAppParams = jumpAppParamList
                    this.formValidate.activitytitle=title
                    this.formValidate.productlogo=imgUrl
                    this.formValidate.labelUrl=imgUrl
                    this.formValidate.jumpType=String(targetStatus)
                    this.formValidate.pageType=String(targetType)
                    if(targetType==1){
                        this.formValidate.jumpPage=targetUrl
                    }else{
                        this.formValidate.jumpUrl=targetUrl
                    }
                }else{
                    this.$Message.error(data.message)
                }
            })
        },
        // 上移
        moveUpward(activityPageCode){
            let data = {
                activityPageCode:activityPageCode,
            }
            this.http.post(BASE_URL+'/loan/loanActivityPage/soldOut',data)
            .then(data=>{
                if(data.code=='success'){
                    this.$Message.success('上移成功')
                    this.queryList(1)
                }else{
                    this.$Message.error(data.message)
                }
            })
        }
    },
    mounted(){
        this.queryList(1)
    },
    created(){
        this.http.post(BASE_URL+"/loan/loanActivityPage/queryAppParamList",{}).then(data=>{
            this.jumpAppParams=data.data
    }).catch(err=>{
      console.log(err)
    })
    }
}
</script>
<style lang="less" scoped>
   .addactive{
       margin-bottom: 40px;
   } 
   .iconlabelUrl {
        width: 80px;
        height: 80px;
    }
</style>