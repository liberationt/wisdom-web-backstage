<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>操作日志</h3>
        <Table border :columns="columns1" :data="data1"></Table>
        <div class="tr mt15">
            <Page :total="100" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-elevator show-sizer show-total></Page>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      modal8: false,
      columns1: [
        {
          title: '操作时间',
          key: 'name'
        },
        {
          title: '操作人',
          key: 'age'
        },
        {
          title: '操作内容',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '2018-03-20 10:22:11',
          age: 'admin',
          address: '哈哈'
        },
        {
          name: '2018-03-20 10:22:11',
          age: 'admin',
          address: '哈哈'
        },
        {
          name: '2018-03-20 10:22:11',
          age: 'admin',
          address: '哈哈'
        },
        {
          name: '2018-03-20 10:22:11',
          age: 'admin',
          address: '哈哈'
        }
      ],
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
    }
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
