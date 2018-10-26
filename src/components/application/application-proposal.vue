<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;{{application}}&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;建议反馈</span>
      </p>
    </div>
    <div class="clearfix conditioncss">
      <div class="left">
      <Select v-model="model1" placeholder="姓名"  style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="name" placeholder="请输入关键字" style="width: 150px"></Input>
      <Select v-model="model2" placeholder="全部状态" style="width:150px;margin-left:50px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </div>
      <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="inquery">查询</Button> -->
      <Button type="info" class="right mr20 w90" :loading="loading3" @click="inquery('warning')">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
    </div>
    <div id="application_table" class="contentcss">
      <Table border :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
        <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
      </div>
    </div>   
  </div>
</template>
<script>
import untils from '../../utils/utils'
export default {
  data () {
    return {
      application:'',
      cityList: [],
      cityType: [],
      model1: '',
      model2: '',
      name: '',
      startRow: 1,
      endRow: 10,
      total: 0,
      loading3: false,
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '提交时间',
          key: 'dataCreateTime',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '内容',
          minWidth: 300,
          align: 'center',
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
							title: params.row.contents
							}
						}, params.row.contents)
						])
						}
        },
        {
          title: '用户手机号',
          key: 'userPhone',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'userName',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '状态',
          key: 'statusValue',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            let httpurl
            if(params.row.status == '0'){//未查看
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
                      untils.setCookie('code',params.row.suggestionsFeedbackCode)
                      this.$router.push({path: './applicationDetail?status='+ 0+'&&ispage='+ this.$route.query.ispage})
                    }
                  }
                }, '查看')
              ])       
            }else if(params.row.status == '1'){//已查看
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
                      untils.setCookie('code',params.row.suggestionsFeedbackCode)
                      this.$router.push({path: './applicationDetail?status='+1+'&&ispage='+ this.$route.query.ispage})
                    }
                  }
                }, '查看'),
                 h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      untils.setCookie('code',params.row.suggestionsFeedbackCode)
                      // alert(untils.getCookie('code'))
                      this.adopt()
                    }
                  }
                }, '删除')
              ])    
            }
            
          }
        }
      ],
      data6: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    pageChange (page) {
      this.params.page = page
      this.startRow = page
      this.inquery()
    },
    PageSizeChange (limit) {
      this.startRow = 1
      this.params.limit = limit
      this.endRow = limit
      this.inquery()
    },
    inquery(){
      let htturll
      if(this.$route.query.ispage == 'huazan'){
        htturll = '/loan/suggestionsFeedback/queryHuazanSuggestionsFeedbackList'
      } else if(this.$route.query.ispage = 'xindai'){
        htturll = '/loan/suggestionsFeedback/queryQiangdanxiaSuggestionsFeedbackList'
      }
      if(this.model1 == 'phone'){
        if( this.name.length < 3 && this.name != ''){
          this.phoneti('warning')
          return false
        } 
      }
      // this.loading3 = true
      this.http.post(BASE_URL+htturll,{
        pageNum : this.startRow,
        pageSize : this.endRow,
        searchOptions : this.model1,
        searchValue : this.name,
        statusOptions : this.model2 
      }).then(data=>{
        // console.log(data)
        if(data.code == 'success'){
          this.total = parseInt(data.data.total)
          this.data6 = data.data.dataList
        } else {
          this.total = 0
        }
      }).catch(err=>{
        this.total = 0
        console.log(err)
      })
    },
    // 手机号提示
    phoneti(type) {
      const title = "温馨提示";
      const content = "<p>手机号不能小于3位数</p>";
      switch (type) {
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
      }
    },
    //删除
    adopt() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认删除吗?</p>",
        onOk: () => {
          this.http.post(BASE_URL+"/loan/suggestionsFeedback/deleteSuggestionsFeedbackByCode",{data:untils.getCookie('code')}).then(data=>{
            console.log(data)
            if(data.code == 'success'){
              this.$Message.info('删除成功！');
              this.inquery()
            } else {
              this.$Message.info(data.message);
            }
          }).catch(err=>{
            this.$Message.info('删除失败！');
            console.log(err)
          })
        },
        onCancel: () => {}
      });
    },
  },
  created(){
    if (this.$route.query.ispage == 'huazan') {
      this.application = '华赞金服'
    } else {
      this.application = '抢单侠'
    }
    // 获取列表
    this.http.post(BASE_URL+"/loan/suggestionsFeedback/getSuggestionsFeedbackListSearchConfig").then(data=>{
      // console.log(data)
      if(data.code == 'success'){
        this.cityList = data.data.searchOptions
        this.cityType = data.data.statusOptions
      }
    }).catch(err=>{
      console.log(err)
    })
    this.inquery()
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
