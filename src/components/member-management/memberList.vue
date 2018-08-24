<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞金服&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员列表</span>
      </p>
    </div>
    <div class="clearfix">
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="model1" placeholder="姓名" style="width:100px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字" style="width: 150px;margin-left:-3px"></Input>
          </li>
          <li>
            <span class="ml20">实名状态:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:150px;">
              <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">账户状态:</span>
            <Select v-model="model4" placeholder="账户状态" style="width:150px;">
              <Option v-for="item in account" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">排序:</span>
            <Select v-model="model5" placeholder="注册时间排序" style="width:150px;">
              <Option v-for="item in registerTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
        </ul>     
      <!-- <Select v-model="model2" placeholder="所有渠道" style="width:150px;margin-left:20px">
        <Option v-for="item in cityType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> --> 
      </div>
      <Button type="info" class=" ml50 w100" :loading="loading3" @click="inquire">
        <span v-if="!loading3">查询</span>
        <span v-else>查询</span>
      </Button>
      <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
    </div>
    <div id="application_table">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
    </div>
    <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading3: false,
      cityList: [],
      reaName: [],
      account: [],
      registerTime: [],
      model1: 'name',
      model3: '',
      model4: '',
      model5: '',
      name: '',
      total: 0,
      startRow: 1,
      endRow: 10,
      columns7: [
        {
          title: '手机号',
          key: 'phoneNumber',
          minWidth: 110,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'memberName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '是否实名',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
          let realStatus
            if (params.row.realStatus == 0) {
              realStatus = '未实名'
            } else if (params.row.realStatus == 1) {
              realStatus = params.row.realName
            } 
            return h('div', [
              h('span', {}, realStatus)
            ])
          }
        },
        {
          title: '注册渠道',
          key: 'loanUserChannel',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '账户状态',
          key: 'object',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
          let accountStatus
            if (params.row.accountStatus == 0) {
              accountStatus = '冻结'
            } else if (params.row.accountStatus == 1) {
              accountStatus = '正常'
            } 
            return h('div', [
              h('span', {}, accountStatus)
            ])
          }
        },
        {
          title: '已邀请人数',
          key: 'loanInviterCount',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registerTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '最后登陆时间',
          key: 'lastLoginTime',
          minWidth: 160,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            console.log(params)
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: './memberDetail?loanUserCode='+params.row.loanUserCode })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      data6: []
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        // console.log(page)
				this.startRow = page
				this.inquire()
		},
    pagesizechange(page) {
      // console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquire()
    },
    // 列表查询
    inquire (num) {
    this.loading3 = true            
    let list = {
      searchOptions : this.model1,
      searchValue : this.name,
      realStatus : this.model3,
      accountStatus : this.model4,
      userTimeStatus : this.model5, 
      pageNum: this.startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberPageList', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
        this.startRow = Math.ceil(resp.data.startRow/this.endRow)
        this.loading3 = false
      } else {
        this.loading3 = false
      }
    })
    .catch(() => {
      this.loading3 = false
    })
    }
  },
  mounted () {
    this.http.post(BASE_URL + '/loan/userInfo/queryUserMemberListFilter', {})
    .then((resp) => {
      if (resp.code == 'success') {
        this.cityList = resp.data.searchOptions
        this.reaName = resp.data.realNameStatusOptions
        this.account = resp.data.accountStatusOptions
        this.registerTime = resp.data.userTimeOptions
      } else {
      }
    })
    .catch(() => {
    })
    this.inquire ()
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 20px;
}
</style>
