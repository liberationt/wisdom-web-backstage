<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>机构名称</h3>
        <Button type="primary" shape="circle" icon="plus-round" class="mb15" @click="addproduct">添加产品</Button>
        <Table border :columns="columns1" :data="data1"></Table>
        <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
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
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  size: 'small',
                  value: params.row.queryStr
                },
                style: {
                  width: '150px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              })
            ])
          }
        },
        {
          title: '添加时间',
          align: 'center',
          key: 'address'
        },
        {
          title: '最后修改时间',
          align: 'center',
          key: 'address'
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
                    this.$router.push({ path: './addExamine' })
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
                    this.remove(params.index)
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
      }
    }
  },
  methods: {
    handleRender () {
      this.$router.push({ path: './operationLog' })
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    remove (index) {
      this.data1.splice(index, 1)
    },
    addproduct () {
      this.$router.push({ path: './addExamine' })
    },
    query(){
      this.http.post(BASE_URL+'/loan/creditInstitutionsProduct/getCreditInstitutionsProductList',{creditInstitutionsProductCode: untils.getCookie('institutionsCode')}).then(data=>{
        if(data.code == 'success'){
          this.data1 = data.data.creditInstitutionsProductList
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
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
}
</style>
