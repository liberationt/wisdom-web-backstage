<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;华赞金服&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员列表</span>
      </p>
    </div>
    <div class="clearfix contentcss">
      <div class="left">
        <ul class="querysty">
          <li>
            <Input class="mr20" v-for="item in cityList" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
            </Input>
          </li>
          <li>
            <span class="">实名状态:</span>
            <Select v-model="model3" placeholder="实名状态" style="width:90px;">
              <Option v-for="item in reaName" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">账户状态:</span>
            <Select v-model="model4" placeholder="账户状态" style="width:90px;">
              <Option v-for="item in account" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">排序:</span>
            <Select v-model="model5" placeholder="注册时间排序" style="width:110px;">
              <Option v-for="item in registerTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span class="ml20">是否已入库:</span>
            <Select v-model="whether" placeholder="是否已入库" style="width:100px;">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </li>
          <li v-if="whether == 1">
            <span class="ml20">入库多少天:</span>
            <InputNumber v-model="dateR" placeholder="请输入天数" class="mr20" style="width: 150px"></InputNumber>
            </Input>
          </li>
          <li>
            <span class="ml20">是否被抢单:</span>
            <Select v-model="snatchbills" placeholder="是否被抢单" style="width:100px;">
              <Option value="" >全部</Option>
              <Option value="1" >已被抢</Option>
              <Option value="0" >未被抢</Option>
            </Select>
          </li>
          <li>
            <span class="w60 displayib tr ml20">注册时间:</span>
            <DatePicker type="date" v-model= 'value1' class="" :options="options3" placeholder="开始时间" style="width: 150px"></DatePicker>
            <span class="mb15">  -  </span>
            <DatePicker type="date" v-model= 'value2' class="mr20 " :options="options3" placeholder="结束时间" style="width: 150px"></DatePicker>
          </li>
          <li>
            <Select v-model="cityname" @on-change="citys" placeholder="请选择省" style="width:150px;">
              <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <Select v-model="municipality" placeholder="请选择市" style="width:150px;margin-left:10px">
              <Option v-for="item in status1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <Button type="info" class="w100" :loading="loading3" @click="inquire(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
          <li v-if="isexports">
             <Button type="primary" class="right ml20 w90" :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
              </Button>
          </li>
        </ul>     
      </div>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
      <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
    </div>
    </div>
    
  </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
  data () {
    return {
      loading2: false,
      loading3: false,
      cityList: [],
      reaName: [],
      account: [],
      registerTime: [],
      model1: 'mobile',
      snatchbills:'',
      model3: '',
      model4: '',
      model5: '',
      whether: '',
      isexports: false,
      dateR: null,
      whetherList:[
        {value:-1,label: "全部"},
        {value:1,label: "是"},
        {value:0,label: "否"}
      ],
      value1:'',
      value2:'',
      status1: [],
      cityType1:[],
      cityname:'',
      municipality:'',
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
          minWidth: 100,
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
          title: '是否被抢单',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
          let loanIsRob
            if (params.row.loanIsRob == 0) {
              loanIsRob = '未被抢'
            } else if (params.row.loanIsRob == 1) {
              loanIsRob = '已被抢'
            } 
            return h('div', [
              h('span', {}, loanIsRob)
            ])
          }
        },
        {
          title: '注册渠道',
          key: 'channelCode',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '账户状态',
          key: 'object',
          align: 'center',
          minWidth: 100,
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
          title: '城市',
          key: 'loanCityNameFirst',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.loanCityNameFirst+""+params.row.loanCityNameSecond)
            ])
          }
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
          fixed: 'right',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
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
      data6: [],
      options3: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000*0;
        }
      },
    }
  },
  methods: {
    // 分页
    pageChange(page) {
        // console.log(page)
				this.startRow = page
				this.inquire(this.startRow)
		},
    pagesizechange(page) {
      // console.log(page)
      this.startRow = 1
      this.endRow = page
      this.inquire(1)
    },
    // 列表查询
    inquire (startRow) {
      this.loading3 = true
      if(!this.isJiao()) return
      let time1 = this.value1 == "" ? "" : utils.formatDate(this.value1,'yyyy-MM-dd hh:mm:ss')
      let time2 = this.value2 == "" ? "" : utils.formatDate(this.value2,'yyyy-MM-dd 23:59:59')
      let cityListL = this.cityList.length
      let list = {
        name: cityListL > 0 ? this.cityList[1].code == null ? "" : this.cityList[1].code : " ",
        mobile: cityListL > 0 ? this.cityList[0].code == null ? "" : this.cityList[0].code : " ",
        memberName: cityListL > 0 ? this.cityList[2].code == null ? "" : this.cityList[2].code : " ",
        realStatus : this.model3 == -1 ? "" : this.model3,
        accountStatus : this.model4 == -1 ? "" : this.model4,
        userTimeStatus : this.model5, 
        pageNum: startRow,
        pageSize: this.endRow,
        beginTime:time1,
        endTime:time2,
        day:this.dateR,
        loanRob:this.whether == -1 ? null : this.whether,
        loanAdCodeFirst:this.cityname,
        loanAdCodeSecond:this.municipality,
        loanIsRob:this.snatchbills
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
    },
    // 导出
    exports () {
      this.loading2 = true
      if(!this.isJiao()) return
      let cityListL = this.cityList.length
      let formData = new FormData()
      formData.append("name",cityListL > 0 ? this.cityList[1].code == null ? "" : this.cityList[1].code : " ")
      formData.append("mobile",cityListL > 0 ?this.cityList[0].code == null ? "" : this.cityList[0].code : " ")
      formData.append("memberName",cityListL > 0 ?this.cityList[2].code == null ? "" : this.cityList[2].code : " ")
      formData.append("realStatus",this.model3 == -1 ? "" : this.model3)
      formData.append("accountStatus",this.model4 == -1 ? "" : this.model4)
      formData.append("userTimeStatus",this.model5)
      formData.append("loanRob",this.whether == -1 ? "" : this.whether)
      formData.append("loanAdCodeFirst",this.cityname)
      formData.append("loanAdCodeSecond",this.municipality)
      formData.append("loanIsRob",this.snatchbills)
      formData.append("day",this.dateR == null ? "" : this.dateR)
      formData.append("beginTime", this.value1 == "" ? "" : utils.formatDate(this.value1,'yyyy-MM-dd hh:mm:ss'))
      formData.append("endTime", this.value2 == "" ? "" : utils.formatDate(this.value2,'yyyy-MM-dd 23:59:59'))
      let httpUrl = BASE_URL+'/loan/userInfo/queryUserMemberPageListDownLoad'
      utils.exporttable(httpUrl, utils.getlocal('token'),formData,e=>{
        if(e == true){
          this.loading2 = false
        } else {
            this.loading2 = false
            this.$Modal.warning({
						title: '导出文件',
						content: '<p>导出失败</p>'
          })
        }
      })
    },
    // 校验
    isJiao(){
      let date1 = Date.parse(new Date(this.value1 == "" ? "" : utils.formatDate(this.value1,'yyyy-MM-dd hh:mm:ss')));
      let date2 = Date.parse(new Date(this.value2 == "" ? "" : utils.formatDate(this.value2,'yyyy-MM-dd 23:59:59')));
      if (date1 > date2) {
        this.loading3 = false   
        this.loading2 = false     
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      if(this.whether == 1 && this.model4 == '0'){
        this.loading3 = false  
        this.loading2 = false      
        this.$Modal.warning({
          title: '温馨提示',
          content: '<p>账户冻结状态下无入库数据</p>'
        })
        return false
      }
      console.log(this.dateR)
      if(this.whether == 1 && !/^[1-9]\d*$/.test(this.dateR) && this.dateR != null ){
         this.loading3 = false  
         this.loading2 = false      
          this.$Modal.warning({
            title: '温馨提示',
            content: '<p>入库天数是0以上得整数</p>'
          })
          return false
      }
      return true
    },
    // 导出权限判断
    toexamine () {
      this.http.post(BASE_URL + "/checkUriPermission", ['/loan/userInfo/queryUserMemberPageListDownLoad']).then(data=>{
        if(data.code == 'success'){
          for (const key in data.data) {
            if (data.data[key] == true) {
              // 待定。。。。。  
              this.isexports = true    
            } else {
              this.isexports = false    
              // this.$Message.warning('暂无权限')
            }
          }
        }
      }).catch(err=>{});

      },
    //省 
    citys(v){
      let data = {
        "data": v
      }
      this.httpshi(data)
      // this.model2 = v
    },
    // 市接口
    httpshi(data) {
      this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
          this.status1 = data.data
      })
    },
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
    this.inquire (1)
  },
  created(){
    this.http.get('../../../static/city.json').then(data=>{
      this.cityType1 = data
    })
    this.toexamine()
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
