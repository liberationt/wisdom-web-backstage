<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;   信贷管理</span>
      </p>
    </div>
    <div id="feedback_details" class="contentcss">
        <h3>机构名称</h3>
        <Button type="primary" shape="circle" icon="plus-round" class="mb15" @click="addproduct">添加产品</Button>
        <Button type="success" shape="circle" class="mb15" @click="update">更新排序</Button>
        <Button type="warning" shape="circle" class="mb15" @click="$router.go(-1)">返回</Button>
        <Table class="inputvalue" border :columns="columns1" :data="data1">
        </Table>
        <div class="tr mt15">
            <Page :total="total" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
        </div>
    </div>
</div>
</template>
<script>
import untils from '../../utils/utils'
export default {
  data () {
    return {
      modal8: false,
      creditInstitutionsProductReqs:[],
      productCode: [],
      columns1: [
        {
          title: '产品名称',
          align: 'center',
          key: 'productName',
          minWidth: 100
        },
        {
          title: '排序',
          align: 'center',
          key: 'age',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  // type: 'number',
                  value: params.row.productSort,
                  code : params.row.productCode
                },
                style: {
                  width: '150px'
                },
                on: {
//                   input:e => {
//                     params.row.productSort = e
//                     console.log(params.row.productCode)
//                     this.updatec.productCode = params.row.productCode
//                     this.updatec.productSort = params.row.productSort
//                     console.log(this.updatec.productSort)
// 　　　　　　　　　　},
//                   'on-blur': val=>{
//                     this.creditInstitutionsProductReqs.push(this.updatec)
//                     console.log(this.creditInstitutionsProductReqs)
//                   }
                }
              }),
            ])
          }
        },
        {
          title: '添加时间',
          align: 'center',
          key: 'dataCreateTime',
          minWidth: 200
        },
        {
          title: '最后修改时间',
          align: 'center',
          key: 'dataModifiedTime',
          minWidth: 200
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                    untils.setCookie('productCode',params.row.productCode)
                    this.$router.push({ path: './addExamine?isedit='+'is' })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.adopt(params.row.productCode)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [],
      params: {
        page: 1,
        limit: 10
      },
      endRow: 10,
      total: 0,
      startRow: 1,
    }
  },
  methods: {
    adopt(code) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认删除吗?</p>",
        onOk: () => {
          this.http.post(BASE_URL+"/loan/creditInstitutionsProduct/updateCreditInstitutionsProductStateByCode",{productCode:code}).then(data=>{
            // console.log(data)
            if(data.code == 'success'){
              this.$Message.info('删除成功！');
              this.query()
            } else {
              this.$Message.info('删除失败！');
            }
          }).catch(err=>{
            this.$Message.info('删除失败！');
            console.log(err)
          })
        },
        onCancel: () => {}
      });
    },
    // handleRender () {
    //   this.$router.push({ path: './operationLog' }) //操作日志
    // },
    update(){
      let ivuvalue = document.getElementsByClassName('ivu-input')
      console.log(ivuvalue)
      console.log(this.productCode)
      // console.log(document.getElementsByClassName('ivu-input')[0].value)
      for(let i = 0; i< this.productCode.length; i++){
        console.log( ivuvalue[i].value)
        this.creditInstitutionsProductReqs.push(
          {
            productCode: this.productCode[i],
            productSort: ivuvalue[i].value
          }
        )
      }
      // 更新
      let list = {
        creditInstitutionsProductReqs: this.creditInstitutionsProductReqs
      }
      // console.log(list)
      this.http.post(BASE_URL+"/loan/creditInstitutionsProduct/updateProductSortByCode",list).then(data=>{
        console.log(data)
        if(data.code == 'success'){
          this.$Modal.success({
            title: '更新',
            content: '<p>更新成功</p>',
            onOk: () => {
              this.query()
              this.productCode = []
            }
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange (page) {
      this.startRow = page;
      this.params.page = page;
      this.query()
    },
    PageSizeChange (limit) {
      this.startRow = 1
      this.endRow = limit;
      this.params.limit = limit;
      this.query()
    },
    remove (index) {
      this.data1.splice(index, 1)
    },
    addproduct () {
      this.$router.push({ path: './addExamine' })
    },
    query(){
      this.productCode=[]
      this.http.post(BASE_URL+'/loan/creditInstitutionsProduct/getCreditInstitutionsProductList',{institutionsCode: untils.getCookie('institutionsCode'), pageSize: this.endRow,
        pageNum: this.startRow}).then(data=>{
        if(data.code == 'success'){
          this.data1 = data.data.creditInstitutionsProductList
          this.total = parseInt(data.data.total);
          this.startRow = Math.ceil(data.data.startRow/this.endRow) == 0? 1 : Math.ceil(data.data.startRow/this.endRow)
          this.data1.map((o,i)=>{
            this.productCode.push(o.productCode)
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.query()
  }
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    // padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
}
.inputvalue{
  color: red;
}
</style>
