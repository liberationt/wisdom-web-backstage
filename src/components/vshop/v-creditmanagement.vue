<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;产品管理&nbsp;>&nbsp; 产品列表</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
          <ul class="querysty">
            <li>
                <Button type="info" shape="circle" @click="update">更新排序</Button>
            </li>
             <li>
                <Button type="info" shape="circle" class="mr50 ml20"  icon="plus-round" @click="addproduct">贷款类型配置</Button>
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
  export default {
    data(){
      return{
        data1:[],
        columns:[
            {
            title: "排序",
            key: "sort",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h('Input', {
                style:{
                  width:'60px',
                },
                props:{
                  type:'text',
                  value:this.data1[params.index].sort
                },
                on: {
                  'on-blur': (event) => {
                    this.data1[params.index].sort =event.target.value
                  }
                }
              })
            }
          },
          {
						title: "工具名称",
						key: "toolName",
            align: "center",
            minWidth: 100,
          },
          {
            title: "启用状态",
            key: "state",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h(
                'div',
                {
                  style:{
                    background:params.row.state==1?'#cc0000':'#669900',
                    color:'#ffffff',
                    padding:'5px 0'
                  },
                  on: {
                      click: () => {
                        let number=params.row.state=='0'?'1':'0'
                        this.updatestatus(number,params.row.creditToolCode)
                      }
                    }
                },
                params.row.state =='0'?'是':'否'
              )
            }
          },
          {
            title: "是否分销",
            key: "distributionState",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h(
                'span',
                params.row.distributionState=='0'?'否':'是'
              )
            }
          },
          {
            title: "创建人",
            key: "operator",
            align: "center",
            minWidth: 100,
          },
           {
            title: "添加时间",
            key: "dataCreateTime",
            align: "center",
            minWidth: 170,
          },
          {
            title: "操作",
            key: "",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({path: "/vAddtools?creditToolCode="+params.row.creditToolCode})
                      }
                    }
                  },'编辑' 
                ),
                h('Button',{
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.delete(params.row.creditToolCode)
                      }
                    }
                  },'删除'
                )
              ])
            }
          },
        ],
        total:0,
        startRow:1,
        endRow:20,
      }
    },
    methods:{
      addproduct(){
        this.$router.push({path:'/vAddtools'})
      },
      // 更新排序
      update(){
        this.$Modal.confirm({
          title: '更新排序',
          content: '<p>确认要更新排序吗?</p>',
          onOk: () => {
            let productUpdateReqList=[]
            for(var i=0;i<this.data1.length;i++){
              if(this.data1[i].sort===''){
                this.$Message.error('排列顺序不能为空')
                return false
              }
              productUpdateReqList.push(
                {creditToolCode:this.data1[i].creditToolCode,sort:this.data1[i].sort}
              )
            }
            this.http.post(BASE_URL+'/loan/creditTool/updateSortByCode',productUpdateReqList)
            .then(data=>{
              if(data.code=='success'){
               this.$Message.success('排序成功')
                this.queryList(1)
              }
            }).catch(err=>{
              console.log(err)
            })
          },
          onCancel: () => {
          }
        })
      },
      updatestatus(num,code){
        let content
        if(num==1){
          content='<p>确认要禁用吗?</p>'
        }else{
          content='<p>确认要启用吗?</p>'
        }
        this.$Modal.confirm({
          title: '修改',
          content:content ,
          onOk: () => {
            let data ={
              creditToolCode:code,
              state:num
            }
            this.http.post(BASE_URL+'/loan/creditTool/updateByCode',data)
            .then(data=>{
              if(data.code=='success'){
               this.$Message.success('修改成功')
                this.queryList(1)
              }
            }).catch(err=>{
              console.log(err)
            })
          },
          onCancel: () => {
          }
        })
      },
      //删除
      delete(creditToolCode){
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认要删除吗?</p>',
          onOk: () => {
            this.http.post(BASE_URL+'/loan/creditTool/deleteByCode',{creditToolCode:creditToolCode})
            .then(data=>{
              if(data.code=='success'){
               this.$Message.success('删除成功')
                this.queryList(1)
              }
            }).catch(err=>{
              console.log(err)
            })
          },
          onCancel: () => {
          }
        })
      },
      pageChange(startRow){
        this.startRow=startRow
        this.queryList(startRow)
      },
      pagesizechange(endRow){
        this.startRow = 1
        this.endRow = endRow
        this.queryList(1)
      },
      //查询
      queryList(startRow){
        this.loading3 = true
        let data = {
          pageNum:startRow,
          pageSize:this.endRow,
        }
        this.http.post(BASE_URL+'/loan/creditTool/queryPage',data)
        .then(data=>{
          if(data.code=='success'){
            this.data1 = data.data.dataList
            this.startRow=Math.ceil(data.data.startRow/this.endRow) == 0 ? 1 : Math.ceil(data.data.startRow / this.endRow);
            this.total = data.data.total
          }
        })
      }
    },
    mounted(){
      this.queryList(1)
    }
  };
</script>
<style lang="less" scoped>
</style>