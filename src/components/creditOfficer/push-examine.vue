<template>
    <div>
       <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;PUSH审核</span>
            </p>
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
    data(){
      return{
        applicationname:'',
        columns:[
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
            title:'标题',
            key:'msgTitle',
            align:'center',
            minWidth:180,
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
            title:'创建时间',
            key:'dataCreateTime',
            align:'center',
            minWidth:180,
          },
          {
            title:'创建人',
            key:'createPerson',
            align:'center',
            minWidth:150,
          },
          {
            title:'操作',
            key:'',
            align:'center',
            minWidth:180,
            fixed: 'right',
            render:(h,params)=>{
              return h('div',[
                h(
                  'Button',
                  {
                    props:{
                      type: "primary",
                      size: "small"
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        if(this.applicationname=="华赞金服"){
                          this.$router.push({ path: "./sendOutPush?isapp=huazan&pushCode="+params.row.pushCode+'&examine=true'});
                        }else{
                          this.$router.push({ path: "./sendOutPush?isapp=xindai&pushCode="+params.row.pushCode+'&examine=true' });
                        }
                      }
                    }
                  },
                  '查看'
                ),
                h(
                  'Button',
                  {
                    props:{
                      type: "primary",
                      size: "small"
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        this.adopt(params.row.pushCode)
                      }
                    }
                  },
                  '通过'
                ),
                h(
                  'Button',
                  {
                    props:{
                      type: "primary",
                      size: "small"
                    },
                    on:{
                      click:()=>{
                        this.refuse(params.row.pushCode)
                      }
                    }
                  },
                  '拒绝'
                ),
              ])
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
      pageChange(pageNumber){
        this.startRow = pageNumber
        this.queryList(pageNumber)
      },
      pagesizechange(pagesize){
        this.startRow = 1
        this.endRow = pagesize
        this.queryList(1)
      },
      //通过
      adopt(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认审核通过?</p>",
            onOk: () => {   
                let data = {
                    auditStatus:1,
                    pushCode:pushCode
                }
                let urls
                if(this.applicationname=="华赞金服"){
                  urls = '/loan/push/hz/audit'
                }else{
                  urls = '/loan/push/qdx/audit'
                }
                this.http.post(BASE_URL+ urls,data)
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
      //拒绝
      refuse(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认审核拒绝?</p>",
            onOk: () => {   
                let data = {
                    auditStatus:5,
                    pushCode:pushCode
                }
                let urls
                if(this.applicationname=="华赞金服"){
                  urls = '/loan/push/hz/audit'
                }else{
                  urls = '/loan/push/qdx/audit'
                }
                this.http.post(BASE_URL+urls,data)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('拒绝成功')
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
      queryList(startRow){
        this.loading3 = true;
        let data = {
          pushStatus:0,
          pageNum:startRow,
          pageSize:this.endRow
        }
        let urls
        if(this.applicationname=="华赞金服"){
          urls = '/loan/push/hz/queryPage'
        }else{
          urls = '/loan/push/qdx/queryPage'
        }
        this.http.post(BASE_URL+urls,data)
        .then(data=>{
          if(data.code=='success'){
            this.data1=data.data.dataList
            this.total=data.data.total
            Math.ceil(data.data.startRow / this.endRow1) == 0
              ? 1
              : Math.ceil(data.data.startRow / this.endRow1);
          }
        })  
      },
    },
    mounted(){
      this.applicationname=utils.getCookie("applicationname")
      this.queryList(1)
    }
}
</script>

<style lang="less" scoped>
    
</style>