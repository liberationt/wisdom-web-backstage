<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;信贷设置>&nbsp;营销工具</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="left">
                <ul class="querysty">
                    <li>
                        <Select v-model="category" class="mr20" placeholder="请选择类别" style="width:150px" @on-change="categoryChange">
                            <Option v-for="item in categoryList" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </li>
                    <li>
                        <Select v-model="statusCode" class="mr20" placeholder="请选择状态" style="width:150px" @on-change="statusChange">
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </li>
                    <li>
                        <Select v-model="userCode" class="mr20" placeholder="请选择用户" style="width:150px" @on-change="userChange">
                            <Option v-for="item in userList" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </li>
                    <li>
                        <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
                            <span v-if="!loading3">查询</span>
                            <span v-else>查询</span>
                        </Button>
                    </li>
                    <li class="mr20">
                        <Button type="info" @click="addinterests()" shape="circle" icon="plus-round">添加模板</Button>
                    </li>
                    <li>
                       <router-link to="./thematicManagement">
                            <Button type="info" shape="circle" icon="plus-round">主题管理</Button>
                       </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
            <div class="tr mt15">
                <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
            </div>
        </div>
        <!-- 查看大图弹框 -->
        <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
            <img :src=this.imglink alt="" style="width:970px;height:890px;">
        </Modal>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                modal11: false,
                imglink:"",
                category:'-1',
                categoryList:[
                    {label:'全部类别',value:'-1'},
                    {label:'海报',value:'1'},
                    {label:'名片',value:'2'},
                ],
                statusCode:'-1',
                statusList:[
                    {label:'所有状态',value:'-1'},
                    {label:'未发布',value:'0'},
                    {label:'已发布',value:'1'},
                    {label:'下架',value:'2'}
                ],
                userCode:'-1',
                userList:[
                    {label:'开放范围',value:'-1'},
                    {label:'全部用户',value:'1'},
                    {label:'会员用户',value:'2'},
                ],
                loading3:false,
                columns:[
                    {
                        title:'模板名称',
                        key:'exhibitionName',
                        align:'center',
                        minWidth:120,
                        render:(h,params)=>{
                          let exhibitionName = params.row.exhibitionName
                            return h('span',{
                                style:{
                                    color:'#0099cd',
                                    cursor:'pointer'
                                },
                                on:{
                                  click:()=>{
                                    this.$router.push('/templateDetails?exhibitionCode='+params.row.exhibitionCode)
                                  }
                                }
                            },exhibitionName)
                        }
                    },
                    {
                        title:'类别',
                        key:'exhibitionType',
                        align:'center',
                        minWidth:120,
                        render:(h,params)=>{
                            let status = params.row.exhibitionType
                            return h('span',{},status=='1' ? '海报' : '名片')
                        }
                    },
                     {
                        title:'主题',
                        key:'exhibitionThemeCode',
                        align:'center',
                        minWidth:120
                    },
                    {
                        title:'状态',
                        key:'exhibitionStatus',
                        align:'center',
                        minWidth:120,
                        render:(h,params)=>{
                            let status = params.row.exhibitionStatus
                            if(status =='0'){
                                status='未发布'
                            }else if(status=='1'){
                                status='已发布'
                            }else{
                                status='已下架'
                            }
                            return h('span',{},status)
                        }
                    },
                    {
                        title:'用户组',
                        key:'openType',
                        align:'center',
                        minWidth:120,
                        render:(h,params)=>{
                            let status = params.row.openType
                            return h('span',{},status=='1' ? '全部用户' : '会员用户')
                        }
                    },
                    {
                        title:'图片',
                        key:'exhibitionPath',
                        align:'center',
                        minWidth:180,
                        render:(h,params)=>{
                            return h('img',{
                                attrs:{
                                    src:params.row.exhibitionPath
                                },
                                style:{
                                    width:'120px',
                                    height:'40px'
                                },
                                on:{
                                  click:()=>{
                                    this.modal11=true,
                                    this.imglink = params.row.exhibitionPath
                                  }
                                }
                            })
                        }
                    },
                    {
                        title:'创建时间',
                        key:'dataCreateTime',
                        align:'center',
                        minWidth:180,
                    },
                    {
                        title:'更新记录',
                        key:'',
                        align:'center',
                        minWidth:120,
                        render:(h,params)=>{
                            return h('span',{
                                style:{
                                    color:'#0099cd',
                                    cursor:'pointer'
                                },
                                on:{
                                  click:()=>{
                                    this.$router.push('/templateDetails?exhibitionCode='+params.row.exhibitionCode)
                                  }
                                }
                            },'点击查看')
                        }
                    },
                    {
                        title:'操作',
                        key:'',
                        align:'center',
                        minWidth:180,
                        fixed: 'right',
                        render:(h,params)=>{
                            if(params.row.exhibitionStatus=='1'){
                              return h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on:{
                                            click:()=>{
                                              this.$Modal.confirm({
                                                    title: "温馨提示",
                                                    content: "<p>确认下架该模板？</p>",
                                                    onOk: () => {
                                                      let data ={
                                                        exhibitionCode:params.row.exhibitionCode,
                                                        exhibitionStatus:2
                                                      } 
                                                      this.http.post(BASE_URL+'/loan/exhibition/updateStateByCode',data)
                                                      .then(data => {
                                                      if (data.code == "success") {
                                                          this.$Message.success("下架成功");
                                                          this.queryList(1);
                                                      }else{
                                                          this.$Message.error(data.message)
                                                      }
                                                      })
                                                      .catch(err => {
                                                          console.log(err);
                                                      });
                                                      },
                                                    onCancel: () => {}
                                                });
                                            }
                                        }
                                    },
                                    '下架'
                                )
                            }else{
                                return h('div',[
                                    h ('Button',
                                        {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on:{
                                                click:()=>{
                                                  this.$router.push('/addTemplate?exhibitionCode='+params.row.exhibitionCode)
                                                }
                                            }
                                        },
                                        '编辑'
                                    ),
                                    h ('Button',
                                        {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on:{
                                                click:()=>{
                                                  this.$Modal.confirm({
                                                    title: "温馨提示",
                                                    content: "<p>确认发布该模板？</p>",
                                                    onOk: () => {
                                                      let data ={
                                                        exhibitionCode:params.row.exhibitionCode,
                                                        exhibitionStatus:1
                                                      } 
                                                      this.http.post(BASE_URL+'/loan/exhibition/updateStateByCode',data)
                                                      .then(data => {
                                                      if (data.code == "success") {
                                                          this.$Message.success("发布成功");
                                                          this.queryList(1);
                                                      }else{
                                                          this.$Message.error(data.message)
                                                      }
                                                      })
                                                      .catch(err => {
                                                          console.log(err);
                                                      });
                                                      },
                                                    onCancel: () => {}
                                                });
                                                
                                                }
                                            }
                                        },
                                        '发布'
                                    ),
                                    h ('Button',
                                        {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on:{
                                                click:()=>{
                                                  this.$Modal.confirm({
                                                    title: "温馨提示",
                                                    content: "<p>确认删除该模板？</p>",
                                                    onOk: () => {
                                                      let data ={
                                                        exhibitionCode:params.row.exhibitionCode
                                                      } 
                                                      this.http.post(BASE_URL+'/loan/exhibition/deleteByCode',data)
                                                      .then(data => {
                                                      if (data.code == "success") {
                                                          this.$Message.success("删除成功");
                                                          this.queryList(1);
                                                      }else{
                                                          this.$Message.error(data.message)
                                                      }
                                                      })
                                                      .catch(err => {
                                                          console.log(err);
                                                      });
                                                      },
                                                    onCancel: () => {}
                                                });
                                                }
                                            }
                                        },
                                        '删除'
                                    )
                                ])
                            }
                        }
                    },
                ],
                data1:[],
                total:0,
                startRow:1,
                endRow:20
            }
        },
        methods:{
            categoryChange(statusCode){
                this.category = category
            },
            statusChange(statusCode){
                this.statusCode = statusCode
            },
            userChange(userCode){
                this.userCode = userCode
            },
            pageChange(pagenumber){
                this.startRow = pagenumber
                this.queryList(pagenumber)
            },
            pagesizechange(pagesize){
                this.startRow=1
                this.endRow = pagesize
                this.queryList(1)
            },
            queryList(startRow){
                this.loading3 = true
                let data = {
                    pageSize:this.endRow,
                    pageNum:startRow,
                    openType:this.userCode=='-1'?"":this.userCode,
                    exhibitionType:this.category=='-1'?"":this.category,
                    exhibitionStatus :this.statusCode=='-1'?"":this.statusCode
                }
                this.http.post(BASE_URL+'/loan/exhibition/queryPage',data)
                .then(data=>{
                    if(data.code=='success'){
                        this.data1 = data.data.dataList
                        this.loading3 = false
                        this.total = data.data.total
                    }else{
                        this.loading3 = false
                    }
                }).catch(err=>{
                    console.log(err)
                    this.loading3 = false
                })
            },
            addinterests(){
              this.$router.push('/addTemplate?id='+1)
            }
        },
        mounted(){
          this.queryList(1)
        }
    }
</script>
<style lang="less" scoped>
    
</style>