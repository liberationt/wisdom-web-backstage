<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;充值活动管理</span>
      </p>
    </div>
    <div class="">
    <div class="clearfix contentcss">
      <!-- <Button type="primary" shape="circle"  @click="adddepartment">设置基础充值档位</Button> -->
      
      <div class="left">
        <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge(1)">充值赠送赞豆</Button>
        <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge(2)">充值赠送抢单劵</Button>
        <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge(3)">充值赠送优惠券</Button>
        <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge(4)">充值会员赠送抢单劵</Button>
        <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge(5)">充值赠送会员</Button>
          <ul class="querysty mt10">
              <li>
                <Select v-model="activityType" placeholder="活动类型" class="mr10" style="width:150px">
                  <Option v-for="item in activityTypeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
              </li>
              <li>
                <Select v-model="activeState" placeholder="活动状态" class="mr10" style="width:150px">
                  <Option v-for="item in activeStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </li>
              <li>
                <Select v-model="auditStatus" placeholder="审核状态" class="mr10" style="width:150px">
                  <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </li>
              <li>
                  <span class="ml20">添加时间 :</span>
                  <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
              </li>
              <li>
                <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                </Button>
              </li>
          </ul>
      </div>
    </div>
    <div id="application_table" class="contentcss mt10">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div> 
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      choose:false,
      disableds:true,
      loading: true,
      loading3: false,
      modal2:false,
      seatCode:'',
      userCode:'',
      credittitle:"添加部门人员",
      total: 0,
      startRow: 1,
      endRow: 10,
      code:'',
      departmentCode:'',
      userrole:[],
      interest:[],
      activityType:'',//活动类型model
      activityTypeList:[],//活动类型
      activeState:'',//活动状态model
      beginTime:'',
      endTime :'',
      activeStateList:[
        {
          value:'1',
          label:'未开始'
        },
        {
          value:'2',
          label:'已开始'
        },
        {
          value:'3',
          label:'已结束'
        },
        {
          value:'4',
          label:'无效'
        }
      ],//活动状态
      auditStatus:'',//审核状态model
      auditStatusList:[
        {
          value:'1',
          label:'待审核'
        },
        {
          value:'2',
          label:'审核成功'
        },
        {
          value:'3',
          label:'审核失败'
        }

      ],//审核状态

      columns7: [
        {
          title: "活动类型",
          key: "activityType",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
              let activityType
              if (params.row.activityType == 1) {
                  activityType = '充值送赞豆'
              } else if (params.row.activityType == 2) {
                  activityType = '充值送抢单券'
              } else if (params.row.activityType == 3) {
                  activityType = '充值送会员'
              } else if (params.row.activityType == 4) {
                  activityType = '充值送优惠券'
              } else if (params.row.activityType == 5) {
                  activityType = '充值会员送抢单券'
              }
              return h('div', [
              h('span', {}, activityType)
              ])
          }
        },
        {
            title: "活动标题",
            key: "confName",
            minWidth: 160,
            align: "center"
        },
        {
            title: "省份",
            key: "provinceName",
            minWidth: 160,
            align: "center"
        },
        {
            title: "活动周期",
            key: "dataCreateTime",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
                let activityTimeEnabled
                if (params.row.activityTimeEnabled == 0) {
                    activityTimeEnabled = '不限时间范围'
                } else if (params.row.activityTimeEnabled == 1) {
                    activityTimeEnabled = '固定时间范围'
                }
                return h('div', [
                h('span', {}, activityTimeEnabled)
                ])
            }
        },
        {
            title: "开始时间",
            key: "activityBeginTime",
            minWidth: 160,
            align: "center"
        },
        {
            title: "结束时间",
            key: "activityEndTime",
            minWidth: 160,
            align: "center"
        },
        {
            title: "添加时间",
            key: "dataCreateTime",
            minWidth: 160,
            align: "center"
        },
        {
            title: "活动状态",
            key: "dataCreateTime",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
                let activityStatus 
                if (params.row.activityStatus == 1) {
                    activityStatus = '未开始'
                } else if (params.row.activityStatus == 2) {
                    activityStatus = '已开始'
                } else if (params.row.activityStatus == 3) {
                    activityStatus = '已结束'
                } else if (params.row.activityStatus == 4) {
                    activityStatus = '无效'
                }
                return h('div', [
                h('span', {}, activityStatus)
                ])
            }

        },
        {
            title: "审核状态",
            key: "operator",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
                let auditStatus  
                if (params.row.auditStatus  == 1) {
                    auditStatus  = '待审核'
                } else if (params.row.auditStatus  == 2) {
                    auditStatus  = '审核成功'
                } else if (params.row.auditStatus  == 3) {
                    auditStatus  = '审核失败'
                }
                return h('div', [
                h('span', {}, auditStatus )
                ])
            }
        },
        {
            title: "创建人",
            key: "createPerson",
            minWidth: 160,
            align: "center"
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 200,
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
                      if(params.row.activityType==1){
                        this.$router.push({//送赞豆
                            path:"./premiumzd?code="+params.row.code+'&num=1'
                          })
                        }else if(params.row.activityType==2){//充值送抢单券
                          this.$router.push({
                            path:"./rechargeVoucher?code="+params.row.code+'&num=1'
                          })
                        }else if(params.row.activityType==3){//充值送会员
                          this.$router.push({
                            path:"./rechargeableMembers?code="+params.row.code+'&num=1'
                          })
                        }else if(params.row.activityType==4){//充值送优惠券
                          this.$router.push({
                            path:"./sendCoupons?code="+params.row.code+'&num=1'
                          })
                        }else if(params.row.activityType==5){//充值会员送抢单券
                          this.$router.push({
                            path:"./membership?code="+params.row.code+'&num=1'
                          })
                        }
                      
                    }
                  }
                },
                '查看'
              ),
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
                      if(params.row.activityType==1){
                        this.$router.push({//送赞豆
                            path:"./premiumzd?code="+params.row.code+'&num=3'
                          })
                        }else if(params.row.activityType==2){//充值送抢单券
                          this.$router.push({
                            path:"./rechargeVoucher?code="+params.row.code+'&num=3'
                          })
                        }else if(params.row.activityType==3){//充值送会员
                          this.$router.push({
                            path:"./rechargeableMembers?code="+params.row.code+'&num=3'
                          })
                        }else if(params.row.activityType==4){//充值送优惠券
                          this.$router.push({
                            path:"./sendCoupons?code="+params.row.code+'&num=3'
                          })
                        }else if(params.row.activityType==5){//充值会员送抢单券
                          this.$router.push({
                            path:"./membership?code="+params.row.code+'&num=3'
                          })
                        }
                    }
                  }
                },
                '复制'
              ),
              params.row.activityStatus==2?
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  attrs: {
											disabled: params.row.confName != "基础充值档位" ? false : true
										},
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteout (params.row.code)                     
                    }
                  }
                },
                '停止'
              ):null
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
				this.startRow = page
				this.inquire(this.startRow)
		},
    pagesizechange(page) {
      this.startRow = 1
      this.endRow = page
      this.inquire(this.startRow)
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 时间选择
    beginTimeChange(value, data) {
      this.beginTime = value;
    },
    endTimeChange(value, data) {
      this.endTime = value;
    },
    // 设置充值
    setuprecharge (num) {
      if (num == 1) {//充值赠送赞豆
        this.$router.push({path:'/premiumzd'})
      } else if (num == 2) {//充值赠送抢单劵
        this.$router.push({path:'/rechargeVoucher'})
      } else if (num == 3) {//充值赠送优惠劵
        this.$router.push({path:'/sendCoupons'})
      } else if (num == 4) {//充值会员赠送抢单劵
        this.$router.push({path:'/membership'})
      } else if (num == 5) {//充值赠送会员
        this.$router.push({path:'/rechargeableMembers'})
      }

      
    },
    // 停止
    deleteout (code) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要停止吗?</p>',
        onOk: () => {
          // let list = {
          //   seatCode:seatcode,
          // }
          this.http.post(BASE_URL + '/loan/rechargeActivity/stop?code='+code)
          .then((resp) => {
            if (resp.code == 'success') {
              this.startRow = 1
              this.inquire (1)
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch((err) => {
            console.log(err)
          })                 
        }
    })      
    },
    // 列表查询
    inquire (startRow) { 
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.loading3 = true;
    let list = {
      pageNum: startRow,
      pageSize: this.endRow,
      activityType :this.activityType,
      activityStatus :this.activeState,
      auditStatus :this.auditStatus,
      beginTime : this.beginTime,
      endTime: this.endTime,
    }
    this.http.post(BASE_URL + '/loan/rechargeActivity/queryPage',list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
        this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
                this.loading3 = false;
      } else {
        this.$Message.error(resp.message);
        this.loading3 = false;
      }
    })
    .catch(() => {
      
    })
    }
  },
  mounted () {
    this.http.post(BASE_URL + '/loan/rechargeActivity/getActivitySearch',{})
          .then((resp) => {
            if (resp.code == 'success') {
              this.activityTypeList = resp.data.typeList
              this.inquire (1)
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch((err) => {
            console.log(err)
          })
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
