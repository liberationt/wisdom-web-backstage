<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理</span>
      </p>
    </div>
    <div class="mt50">
        <div class="application_news">
          <router-link to="/applicationSendout">
            <Icon type="plus-round"></Icon>
            <span>发送站内信消息</span>
          </router-link>
        </div>
        <div class="application_news ml20">
          <router-link to="/applicationNewtype">
            <Icon type="ios-gear-outline"></Icon>
            <span>配置消息类型</span>
          </router-link>
        </div>

      <Select v-model="model1" @on-change="status" placeholder="全部状态" class="ml20" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.text }}</Option>
      </Select>
      <Select v-model="model2" @on-change="type" placeholder="全部类型" class="ml20" style="width:200px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.text }}</Option>
      </Select>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquiry(2)">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
    </div>
    <div id="application_table" >
      <Table border :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
      <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      total: 0,
			startRow: 1,
			endRow: 10,
      cityList: [],
      cityType: [],
      model1: '',
      model2: '',
      columns7: [
        {
          title: '类型',
          key: 'typeTitle',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '标题',
          key: 'mailTitle',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '计划推送时间',
          key: 'planPushTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '实际推送时间',
          key: 'realPushTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '推送平台',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let pushPlatform
            if(params.row.pushPlatform == '0'){
              pushPlatform = '全部'
            } else if(params.row.pushPlatform == '1'){
              pushPlatform = '安卓'
            } else {
              pushPlatform = 'IOS'
            }
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px'
              },
              }, pushPlatform),
            ])
          }
        },
        {
          title: '推送对象',
          key: 'pushTarget',
          minWidth: 100,
          align: 'center',
           render: (h, params) => {
            let pushTarget
            if(params.row.pushTarget == '0'){
              pushTarget = '全部'
            } else {
              pushTarget = '指定手机'
            }
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px'
              },
              }, pushTarget),
            ])
          }
        },
        {
          title: '状态',
          // key: 'mailState',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let mailState
            if(params.row.mailState == '0'){
              mailState = '未推送'
            } else {
              mailState = '已推送'
            }
            return h('div', [
              h('span', {
              style: {
                marginRight: '5px'
              },
              }, mailState),
            ])
          }
        },
        {
          title: '创建人',
          key: 'createUserName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 180,
          align: 'center',
          render: (h, params) => {
            if(params.row.mailState == '0'){
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
                    this.show(params.index)
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
            }else{
              return h('div', [
              h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  // this.show(params.index)
                   this.http.post(BASE_URL+"/loan/webMail/getWebMailByCode",{data: params.row.mailCode }).then(resp=>{
                      // console.log(resp.data)
                      if(resp.code == 'success'){
                        this.show(resp.data)
                      }
                    }).catch(err=>{
                      console.log(err)
                    })
                }
              }
              }, '查看'),
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
        title: '查看反馈详情',
        content: `实际推送时间：${index.realPushTime}<br>消息类型：${index.typeTitle}<br>标题：${index.mailTitle}<br>推送时间：${index.planPushTime}
        <br>推送平台：${index.pushPlatform == 0 ? '全部' : 1 ? '安卓': 'IOS'  }<br>推送对象：${index.pushTarget == 0 ? '全部' : '指定手机'}<br>跳转URL：${index.address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    // 分页
    pageChange(page) {
				this.startRow = page
				this.inquiry()
		},
    pagesizechange(page) {
      console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquiry()
    },
    // 查询
    inquiry(num){
      if(num == '2'){
        this.startRow = 1
        this.endRow = 10
      }
      this.loading3 = true
      this.http.post(BASE_URL + '/loan/webMail/queryWebMailList', {
        pageSize: this.endRow,
        pageNum: this.startRow,
        mailState: this.model1, // 状态
        typeCode : this.model2, // 类型  
      })
      .then((resp) => {
        // console.log(resp)
        if (resp.code == 'success') {
          this.loading3 = false
          this.total = parseInt(resp.data.total)
          this.data6 = resp.data.dataList
        } else {
          this.total = 0;
          this.loading3= false
        }
      })
      .catch(() => {
        this.loading3= false
      })
    },
    // 状态
    status(v){
      // alert(v)
      this.model1 = v
    },
    // 类型
    type(v){
      this.model2 = v
    }
  },
  created() {
    // 初始化
    this.http.post(BASE_URL+"/loan/webMail/getWebMailListBaseData",{}).then(data=>{
      console.log(data)
      this.cityList = data.data.pushState
      this.cityType = data.data.mailType
    }).catch(err=>{
      console.log(err)
    })
    // 列表
     this.inquiry()
  }
}
</script>
<style lang="less" scoped>
.application_news{
  display: inline-block;
  height: 32px;
  border: 1px solid #dddee1;
  line-height: 32px;
  padding: 0 10px;
  border-radius: 20px;
  vertical-align: middle
}
#application_table{
  margin-top: 30px
}
</style>
