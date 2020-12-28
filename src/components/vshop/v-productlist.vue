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
                <Button type="info" shape="circle" class="mr20" @click='update'>更新排序</Button>
            </li>
            <li>
                <Select v-model="producttypeCode" class="mr20" style="width:150px" @on-change="producttypeChange">
                    <Option v-for="item in producttypeList" :value="item.value" :key='item.value'>{{item.label}}</Option>
                </Select>
            </li>
             <li>
                <Select v-model="stateCode" class="mr20" style="width:150px" @on-change="statusChange">
                    <Option v-for="item in stateList" :value="item.value" :key="item.value" >{{item.label}}</Option>
                </Select>
            </li>
            <li>
                <Input v-model="productname" class="mr20" placeholder="按产品名称模糊查询" style="width: 150px"></Input>
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
        stateCode:"-1",
        stateList:[
          {label:"状态",value:"-1"},
          {label:"上架",value:"0"},
          {label:"下架",value:"1"}
        ],
        producttypeCode:"-1",
        producttypeList:[
          {label:"所有产品",value:"-1"},
          {label:"贷款",value:"0"},
          {label:"信贷工具",value:"2"},
        ],
        productname:'',
        data1:[],
        columns:[
          {
            title: "产品缩略图",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h('div', [
                  h('img', {
                      attrs: {
                          src: params.row.productLogo
                      },
                      style: {
                          width: '100px',
                          height: '60px'
                      }
                  }),
              ])
            }
          },
          {
            title: "产品名称",
            key: "productName",
            align: "center",
            minWidth: 100
          },
          {
            title: "产品类型",
            key: "productType",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h(
                'div',
                params.row.productType==0?'贷款':(params.row.productType==1?'信用卡':'信贷工具')
              )
            }
          },
          {
            title: "状态",
            key: "statu",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              let _this = this
              return h('i-switch', {  //按钮的话是：button自行替换
                props: {  //这里可以设置它的属性
                  value: params.row.state===0,     //设置它的值比如：true或false
                  disabled:params.row.productStatus===0||params.row.productPerfect===0
                },
                on: { //操作事件
                  input(event) {  //这里会起到监听的作用
                    _this.upper(event,params.row.productCode)
                  }
                }
              })
            }
          },
          {
            title: "排序",
            key: "productOrder",
            align: "center",
            minWidth: 100,
            render:(h,params)=>{
              return h('Input', {
                  style:{
                    width:'60px',
                  },
                  props:{
                    type:'text',
                    value:this.data1[params.index].productOrder
                  },
                  on: {
                    'on-blur': (event) => {
                      this.data1[params.index].productOrder =event.target.value
                    }
                  }
              })
            }
          },
          {
            title: "分销状态",
            key: "productStatusName",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作",
            key: "",
            align: "center",
            minWidth: 50,
            render:(h,params)=>{
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({path:'/vAddproduct?productCode='+params.row.productCode+'&'+'productType='+this.producttypeCode})
                  }
                }
              }, '编辑')
            }
          },
        ],
        total:0,
        startRow:1,
        endRow:20,
        loading3:false,
        updatelist:[]
      }
    },
    methods:{
      producttypeChange(producttypeCode){
        this.producttypeCode = producttypeCode
      },
      statusChange(stateCode){
        this.stateCode = stateCode
      },
      pageChange(startRow){
        this.startRow = startRow
        this.queryList(startRow)
      },
      pagesizechange(endRow){
        this.startRow = 1
        this.endRow = endRow
        this.queryList(1)
      },
      update(){
        this.$Modal.confirm({
          title: '更新排序',
          content: '<p>确认要更新排序吗?</p>',
          onOk: () => {
            let productUpdateReqList=[]
            for(var i=0;i<this.data1.length;i++){
              if(this.data1[i].productOrder===''){
                this.$Message.error('排列顺序不能为空')
                return false
              }
              productUpdateReqList.push(
                {productCode:this.data1[i].productCode,productOrder:Number(this.data1[i].productOrder)}
              )
            }
            this.http.post(BASE_URL+'/vshop/product/updateProductOrder',{productUpdateReqList:productUpdateReqList})
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
      // 上下架
      upper(event,productCode,productType){
        let data ={}
        if(!event){
          data={
            productUpdateReqList:[{
              productCode:productCode,
              state:1,
            }]
           
          }
          this.http.post(BASE_URL+'/vshop/product/updateProductOrder',data)
          .then(data=>{
            if(data.code=='success'){
              this.$Message.success('下架成功')
            }else{
              let message
              if(data.message){
                message=data.message
              }else{
                message = '服务器累了'
              }
              this.$Message.error(message)
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          data={
            productUpdateReqList:[{
              productCode:productCode,
              state:0,
            }]
          }
          this.http.post(BASE_URL+'/vshop/product/updateProductOrder',data)
          .then(data=>{
            if(data.code=='success'){
              this.$Message.success('上架成功')
            }else{
              let message
              if(data.message){
                message=data.message
              }else{
                message = '服务器累了'
              }
              this.$Message.error(message)
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      //查询
      queryList(startRow){
        this.loading3 = true
        let data = {
          pageNum:startRow,
          pageSize:this.endRow,
          productName:this.productname,
          productType :this.producttypeCode=='-1'?"":this.producttypeCode,
          state : this.stateCode =='-1'?"":this.stateCode
        }
        this.http.post(BASE_URL+'/vshop/product/queryProductListPage',data)
        .then(data=>{
          if(data.code=='success'){
            this.data1 = data.data.dataList
            this.startRow=Math.ceil(data.data.startRow/this.endRow) == 0 ? 1 : Math.ceil(data.data.startRow / this.endRow);
            this.total = data.data.total
            this.loading3 = false
          }else{
            this.loading3 = false
          }
        })
      }
    },
    mounted(){
      if(this.$route.query.productType){
        this.producttypeCode=String(this.$route.query.productType)
      }
      this.queryList(1)
    }
  };
</script>
<style lang="less" scoped>
</style>