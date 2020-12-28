<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;充值设置</span>
      </p>
    </div>
    <div class="contentcss">
    <div class="clearfix ">
      <!-- <Button type="primary" shape="circle"  @click="adddepartment">设置基础充值档位</Button> -->
      <Button icon="plus-round" shape="circle" class="ml20" @click="setuprecharge">设置充值</Button>
    </div>
    <div id="application_table">
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
      columns7: [
        {
          title: '标题',
          key: 'confName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '省份',
          key: 'areasName',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
              return h("div", 
                  {
                    style: {
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    },
                    domProps: {
                      title: params.row.areasName
                    }
                  },
                  params.row.areasName
              );
            }
          
        },
        {
          title: '省份数量',
          key: 'areasNum',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '活动时长',
          key: 'seatPhone',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let activityTimeEnabled
            if (params.row.activityTimeEnabled == 0) {
                activityTimeEnabled = '不启用营销时间限制'
            } else {
                activityTimeEnabled = params.row.activityBeginTime +'-'+params.row.activityEndTime
            }
            return h('div', [
            h('span', {}, activityTimeEnabled)
            ])
          }
        },
        {
          title: '是否开启首充',
          key: 'seatPhone',
          minWidth: 110,
          align: 'center',
          render: (h, params) => {
            let firstRechargeStatus
            if (params.row.firstRechargeStatus == 0) {
                firstRechargeStatus = '关闭'
            } else {
                firstRechargeStatus = '开启'
            }
            return h('div', [
            h('span', {}, firstRechargeStatus)
            ])
          }
        },
        {
          title: '首充活动时长',
          key: 'seatPhone',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let firstActivityTimeEnabled
            if (params.row.firstActivityTimeEnabled == 0) {
                firstActivityTimeEnabled = '不启用营销时间限制'
            } else {
                firstActivityTimeEnabled = params.row.firstActivityBeginTime +'-'+params.row.firstActivityEndTime
            }
            return h('div', [
            h('span', {}, firstActivityTimeEnabled)
            ])
          }
        },
        {
          title: '更新时间',
          key: 'dataModifiedTime',
          minWidth: 160,
          align: 'center'
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
                      this.$router.push({path:'/foundationSetup?rechargeConfCode='+params.row.rechargeConfCode+'&num=1'})                    
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
                      this.$router.push('./foundationSetup?rechargeConfCode='+params.row.rechargeConfCode+'&num=2')
                    }
                  }
                },
                '修改'
              ),
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
                      this.deleteout (params.row.rechargeConfCode)                     
                    }
                  }
                },
                '删除'
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
    adddepartment () {     
      
              
    },
    // 设置充值
    setuprecharge () {
      this.$router.push({path:'/foundationSetup'})
    },
    // 删除
    deleteout (seatcode) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          // let list = {
          //   seatCode:seatcode,
          // }
          this.http.post(BASE_URL + '/loan/rechargeConf/deleteByCode?rechargeConfCode='+seatcode)
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
    let list = {
      pageNum: startRow,
      pageSize: this.endRow
    }
    this.http.post(BASE_URL + '/loan/rechargeConf/queryPage',list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.data6 = resp.data.dataList
        this.total = resp.data.total
        this.startRow =
              Math.ceil(resp.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(resp.data.startRow / this.endRow);
      } else {
        this.$Message.error(resp.message);
      }
    })
    .catch(() => {
      
    })
    }
  },
  mounted () {
    this.inquire(1)
  }
}
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
