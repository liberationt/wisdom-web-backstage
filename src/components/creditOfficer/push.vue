<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;PUSH</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <ul class="querysty">
                  <li>
                    <Button type="info" class='mr20' shape="circle" icon="plus-round" @click="send()">发送PUSH</Button>
                  </li>
                  <li>
                      <Select v-model="statusCode" placeholder="请选择状态" style="width:150px" @on-change="statusChange" class="mr20">
                          <Option v-for="item in statusList" :value="item.value" :key="item.label">
                              {{ item.label }}
                          </Option>
                      </Select>
                  </li>
                  <li>
                      <Select v-model="typeCode" placeholder="请选择类型" style="width:150px" @on-change="typeChange" class="mr20">
                          <Option v-for="item in typeList" :value="item.value" :key="item.value">
                              {{ item.label }}
                          </Option>
                      </Select>
                  </li>
                  <li>
                      <span>创建时间 :</span>
                      <DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                      style="width: 150px"></DatePicker>
                      <span>  -  </span>
                      <DatePicker type="date" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                      style="width: 150px"></DatePicker>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                      <span v-if="!loading3">查询</span>
                      <span v-else>查询</span>
                  </Button>
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
import utils from "../../utils/utils";
export default {
  data() {
    return {
      statusCode: "-1",
      statusList: [
        {label:'全部状态',value:'-1'},
        {label:'待审核',value:'0'},
        {label:'待推送',value:'1'},
        {label:'推送中',value:'2'},
        {label:'已推送',value:'3'},
        {label:'已停止',value:'4'},
        {label:'审核拒绝',value:'5'}
      ],
      typeCode: "-1",
      typeList: [
        {label:'全部类型',value:'-1'},
        {label:'常规定时推送',value:'1'},
        {label:'普通推送',value:'2'},
      ],
      beginTime: "",
      endTime: "",
      loading3: false,
      columns: [
        {
          title:'类型',
            key:'pushType',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
             return h('span',params.row.pushType =="1" ? '常规定时推送':'普通推送')
            }
        },
        {
          title:"标题",
          key: "msgTitle",
          align: "center",
          minWidth: 180
        },
        {
          title: "计划推送时间",
          key: "planPushTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "实际推送开始时间",
          key: "realPushStartTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "实际推送结束时间",
          key: "realPushEndTime",
          align: "center",
          minWidth: 180
        },
        {
           title:'推送平台',
            key:'pushPlatform',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let pushPlatform = params.row.pushPlatform
              if(pushPlatform=='0'){
                pushPlatform='全部'
              }else if(pushPlatform=='1'){
                pushPlatform='Android'
              }else{
                pushPlatform='iOS'
              }
              return h('span',pushPlatform)
            }
        },
        {
         title:'推送对象',
            key:'pushObjectType',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let pushObjectType = params.row.pushObjectType
              if(pushObjectType=='1'){
                pushObjectType='全局'
              }else if(pushObjectType=='2'){
                pushObjectType='筛选对象'
              }else{
                pushObjectType='导入对象'
              }
              return h('span',pushObjectType)
            }
        },
        {
          title: "状态",
          key: "pushStatus",
          align: "center",
          minWidth: 150,
          render:(h,params)=>{
            let pushStatus = params.row.pushStatus
            if(pushStatus=='0'){
              pushStatus='待审核'
            }else if(pushStatus=='1'){
              pushStatus='待推送'
            }else if(pushStatus=='2'){
              pushStatus='推送中'
            }else if(pushStatus=='3'){
              pushStatus='已推送'
            }else if(pushStatus=='4'){
              pushStatus='已停止'
            }else{
              pushStatus='审核拒绝'
            }
            return h('span',pushStatus)
          }
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "创建人",
          key: "createPerson",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
          render:(h,params)=>{
            let arr =[]
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
                        if(this.applicationname=="华赞金服"){
                          this.$router.push({ path: "./sendOutPush?isapp=huazan&pushCode="+params.row.pushCode});
                        }else{
                          this.$router.push({ path: "./sendOutPush?isapp=xindai&pushCode="+params.row.pushCode });
                        }
                      }
                    }
                  },
                  '查看'
                )
            )
            if(params.row.pushStatus=='0'||params.row.pushStatus=='5'){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.delete(params.row.pushCode)
                      }
                    }
                  },
                  '删除'
                )
              )
            }
            if(params.row.pushStatus=='1'){
              arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.termination(params.row.pushCode)
                      }
                    }
                  },
                  '终止'
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
      endRow: 20,
      applicationname:''
    };
  },
  methods: {
    statusChange(statusCode) {
      this.statusCode = statusCode;
    },
    typeChange(typeCode) {
      this.typeCode = typeCode;
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
    delete(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要删除?</p>",
            onOk: () => {
              let urls 
                if(this.applicationname=="华赞金服"){
                  urls = '/loan/push/hz/deleteByCode?pushCode='+pushCode
                }  else{
                  urls = '/loan/push/qdx/deleteByCode?pushCode='+pushCode
                }
                this.http.post(BASE_URL+urls)
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
    //终止
     termination(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要终止?</p>",
            onOk: () => { 
                let urls 
                if(this.applicationname=="华赞金服"){
                  urls = '/loan/push/hz/stop?pushCode='+pushCode
                }  else{
                  urls = '/loan/push/qdx/stop?pushCode='+pushCode
                }
                this.http.post(BASE_URL+urls)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('操作成功')
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
      let urls 
      if(this.applicationname=="华赞金服"){
        urls = '/loan/push/hz/queryPage'
      }else{
        urls = '/loan/push/qdx/queryPage'
      }
      let data ={
        pushStatus : this.statusCode=='-1' ? "":this.statusCode,
        pushType : this.typeCode == '-1' ? "" : this.typeCode,
        beginTime : this.beginTime,
        endTime : this.endTime,
        pageNum:startRow,
        pageSize:this.endRow
      }
      this.http.post(BASE_URL+urls,data).
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
      if(this.applicationname=="华赞金服"){
         this.$router.push({ path: "./sendOutPush?isapp=huazan" });
      }else{
         this.$router.push({ path: "./sendOutPush?isapp=xindai" });
      }
     
    }
  },
  mounted(){
    this.applicationname=utils.getCookie("applicationname")
    this.queryList(1)  
  }
};
</script>
<style lang="less">
</style>