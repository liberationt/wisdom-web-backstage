<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;推文列表</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <ul class="querysty">
                  <li>
                      <span>创建时间 :</span>
                      <DatePicker type="date" :value="beginTime" :options="options3" @on-change="beginTimeChange" placeholder="开始时间"
                      style="width: 150px"></DatePicker>
                      <span>  -  </span>
                      <DatePicker type="date" :value="endTime" :options="options3" @on-change="endTimeChange" placeholder="结束时间"
                      style="width: 150px"></DatePicker>
                  </li>
                  <li class="ml20">
                      <span>状态:</span>
                      <Select v-model="statusCode" placeholder="请选择状态" style="width:150px" @on-change="statusChange" class="mr20">
                          <Option v-for="item in statusList" :value="item.value" :key="item.label">
                              {{ item.label }}
                          </Option>
                      </Select>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 mr20 w100" :loading="loading3" @click="queryList(1)">
                      <span v-if="!loading3">查询</span>
                      <span v-else>查询</span>
                  </Button>
                  <Button type="info" class='' shape="circle" icon="plus-round" @click="send()">新建推文</Button>
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
    </div>
</template>
<script>
// import utils from "../../utils/utils";
export default {
  data() {
    return {
      statusCode: "-1",
      statusList: [
        {label:'全部',value:'-1'},
        {label:'未发布',value:'0'},
        {label:'已发布',value:'1'},
        {label:'已下架',value:'2'},
        {label:'已删除',value:'3'},
      ],
      beginTime: "",
      endTime: "",
      options3: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      loading3: false,
      columns: [
        {
          title:'文章标题',
            key:'contentTitle',
            align:'center',
            minWidth:150,
            render: (h, params) => {
						return h('div', [
						h('span', {
							style: {
							display: 'inline-block',
							width: '100%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
							},
							domProps: {
							title: params.row.contentTitle
							}
						}, params.row.contentTitle)
						])
					}
        },
        {
          title:'标签',
          key:'contentLabel',
          align:'center',
          minWidth:150,
        },
        {
          title:"作者",
          key: "contentAuthor",
          align: "center",
          minWidth: 180
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "创建人",
          key: "createName",
          align: "center",
          minWidth: 180
        },
        {
           title:'状态',
            key:'contentState',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let contentState  = params.row.contentState
              if(contentState =='0'){
                contentState='未发布'
              }else if(contentState=='1'){
                contentState='已发布'
              }else if(contentState=='2'){
                contentState='已下架'
              }else{
                contentState='已删除'
              }
              return h('span',contentState)
            }
        },
        {
         title:'是否热门',
            key:'hotState',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let hotState  = params.row.hotState 
              if(hotState =='1'){
                hotState ='热门'
              }else{
                hotState='非热门'
              }
              return h('span',hotState)
            }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          minWidth: 150,
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 260,
          fixed: "right",
          render:(h,params)=>{
            let arr =[
              h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.$router.push('./newtweets?exhibitionContentCode='+params.row.exhibitionContentCode+'&num='+'1')
                      }
                    }
                  },
                  '查看'
                ),
            ]
            if(params.row.contentState=='0'){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.uppershelf(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '发布'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.$router.push('./newtweets?exhibitionContentCode='+params.row.exhibitionContentCode+'&num='+'2')
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.delete(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '删除'
                )
              )
            }
            if(params.row.contentState=='1'){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.lowershelf(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '下架'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.delete(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '删除'
                )
              )
            }
            if(params.row.contentState=='2'){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.uppershelf(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '发布'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.$router.push('./newtweets?exhibitionContentCode='+params.row.exhibitionContentCode+'&num='+'2')
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.delete(params.row.exhibitionContentCode)
                      }
                    }
                  },
                  '删除'
                )
              )
            }
            return h('div',arr)
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      applicationname:''
    };
  },
  methods: {
    statusChange(statusCode) {
      this.statusCode = statusCode;
    },
    beginTimeChange(begingTime) {
      this.beginTime = begingTime;
      if(this.beginTime==''){
        this.beginTime = begingTime;
      }else{
        this.beginTime+=' 00:00:00'
      }
    },
    endTimeChange(endTime) {
      this.endTime = endTime;
      if(this.endTime==''){
        this.endTime = endTime;
      }else{
          this.endTime+=' 23:59:59'
      }
    },
    pageChange(pageNumber) {
      this.startRow = pageNumber;
      this.queryList(pageNumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    //删除
    delete(exhibitionContentCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要删除?</p>",
            onOk: () => {
                let data = {
                contentState:3,
                exhibitionContentCode:exhibitionContentCode
              }
                this.http.post(BASE_URL+'/loan/exhibitionContent/updateByCode',data)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('删除成功')
                      this.queryList(1)                     
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }) 
    },
    //发布
    uppershelf(exhibitionContentCode){
      this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认要发布?</p>",
          onOk: () => { 
              let data = {
                contentState:1,
                exhibitionContentCode:exhibitionContentCode
              }
              this.http.post(BASE_URL+'/loan/exhibitionContent/updateByCode',data)
              .then(data=>{
                  if(data.code=='success'){
                    this.$Message.success('发布成功')
                    this.queryList(1)  
                    this.startRow =1                   
                  }else{
                      this.$Message.error(data.message)
                  }
              }).catch(err=>{
                  console.log(err)
              })
          }
      }) 
    },
    //下架
    lowershelf(exhibitionContentCode){
      this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确认要下架?</p>",
          onOk: () => { 
              let data = {
                contentState:2,
                exhibitionContentCode:exhibitionContentCode
              }
              this.http.post(BASE_URL+'/loan/exhibitionContent/updateByCode',data)
              .then(data=>{
                  if(data.code=='success'){
                    this.$Message.success('下架成功')
                    this.queryList(1)  
                    this.startRow =1                   
                  }else{
                      this.$Message.error(data.message)
                  }
              }).catch(err=>{
                  console.log(err)
              })
          }
      }) 
    },
    //查询
    queryList(startRow) {
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.loading3 = true;
      let data ={
        contentState  : this.statusCode=='-1' ? "":this.statusCode,
        beginTime : this.beginTime,
        endTime : this.endTime,
        pageNum:startRow,
        pageSize:this.endRow
      }
      this.http.post(BASE_URL+'/loan/exhibitionContent/queryPage',data).
      then(data=>{
        if(data.code=='success'){
          this.data1 = data.data.dataList
          this.total = data.data.total
           Math.ceil(data.data.startRow / this.endRow1) == 0
            ? 1 : Math.ceil(data.data.startRow / this.endRow1);
          this.loading3 = false
        }else{
          this.loading3 = false
        }
      }).catch(err=>{
        this.loading3 = false
        console.log(err)
      })
    },
    //添加
    send() {
      this.$router.push({ path: "./newtweets" });
    }
  },
  mounted(){
    
    this.queryList(1)  
  }
};
</script>
<style lang="less">
</style>