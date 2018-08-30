<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;消息管理&nbsp;>&nbsp;站内信管理</span>
      </p>
    </div>
    <div class="conditioncss">
        <div class="application_news">
          <router-link to="/applicationSendoutxin">
            <Icon type="plus-round"></Icon>
            <span>发送站内信消息</span>
          </router-link>
        </div>
        <div class="application_news ml20">
          <router-link to="/applicationNewtypexin">
            <Icon type="ios-gear-outline"></Icon>
            <span>配置消息类型</span>
          </router-link>
        </div>

      <Select v-model="model1" @on-change="status" placeholder="全部状态" class="ml20" style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.text }}</Option>
      </Select>
      <Select v-model="model2" @on-change="type" placeholder="全部类型" class="ml20" style="width:150px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.text }}</Option>
      </Select>
      <Button type="info" class=" ml50 w90" :loading="loading3" @click="inquiry(2)">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
    </div>
    <div id="application_table" class="contentcss">
      <Table border :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
        <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../../utils/utils'
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
          minWidth: 220,
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
                    this.http.post(BASE_URL+"/loan/webMailQdx/sendWebMail",{data:params.row.mailCode}).then(data=>{
                      // console.log(data)
                      if(data.code == 'success'){
                        this.inquiry()
                      }
                    }).catch(err=>{
                      console.log(err)
                    })
                  }
                }
              }, '立即推送'),  
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
                    utils.setCookie('code',params.row.mailCode)
                    this.$router.push({path: './applicationSendoutxin?isedit='+'is'})
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
                    this.confirm(params.row.mailCode)
                    // this.remove(params.index)
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
                   this.http.post(BASE_URL+"/loan/webMailQdx/getWebMailByCode",{data: params.row.mailCode }).then(resp=>{
                      // console.log(resp.data)
                      if(resp.code == 'success'){
                        // console.log(resp.data)
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
      const platform = index.pushPlatform
      this.$Modal.info({
        title: '查看详情',
        content: `实际推送时间：${index.realPushTime}<br>标题：${index.mailTitle}<br>消息类型：${index.typeTitle}<br>推送时间：${index.planPushTime}
        <br>推送平台：${platform == 2 ? 'IOS' : platform == 1 ? '安卓' : '全部'  }
        <br>推送对象：${index.pushTarget == 0 ? '全部' : index.targetPhone}
        <br>${index.jumpType == 1 ? '原生页面' : '跳转URL'}：${index.jumpType == 1 ? index.jumpName : index.jumpUrl}
        <br>${index.urlParam != null  ? index.urlParam != '' ? 'code:'+index.urlParam: '' : ''}`
      })
    },
    // remove (index) {
    //   this.data6.splice(index, 1)
    // },
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
      this.http.post(BASE_URL + '/loan/webMailQdx/queryWebMailList', {
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
    // 删除
    confirm (code) {
      this.$Modal.confirm({
          title: '温馨提示',
          content: '<p>确认删除？</p>',
          onOk: () => {
              this.http.post(BASE_URL+"/loan/webMailQdx/delWebMail",{data:code}).then(data=>{
                // console.log(data)
                if(data.code == 'success'){
                  this.$Message.info('删除成功！');
                  this.inquiry()
                } else {
                  this.$Message.info('删除失败！');
                }
              }).catch(err=>{
                this.$Message.info('删除失败！');
              })
              
          },
          onCancel: () => {
              this.$Message.info('删除失败！');
          }
      });
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
    this.http.post(BASE_URL+"/loan/webMailQdx/getWebMailListBaseData",{}).then(data=>{
      // console.log(data)
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
