<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
      </p>
    </div>
    <Tabs type="card" @on-click="labell1" :value="tabs" :animated="false">
        <TabPane :label="label" name="tab1" >
            <div class="clearfix">
            <div class="left">
            <Input v-model="name" placeholder="请输入手机号"  style="width: 150px">
            </Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="left ml20 w100" :loading="loading3" @click="label_query('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </TabPane>
        <TabPane label="枪弹侠" name="tab2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model12" style="width:100px" @on-change="label_option1">
              <Option v-for="item in searchOptions1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name1" placeholder="请输入关键字"  style="width: 150px">
            </Input>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w100" :loading="loading3" @click="label_query1('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns8" :data="data7"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange1" @on-page-size-change="PageSizeChange1" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
export default {
  data () {
    return {
      label: h => {
        return h('div', [
          h('span', '华赞金服'),
        ])
      },
      evaluatename: [
        {
          value: '姓名',
          label: '姓名'
        },
        {
          value: '手机号',
          label: '手机号'
        }
      ],
      model12: '',
      tabs: "tab1",
      model1: '',
      searchOptions: [],
      searchOptions1: [],
      searchOptions2: [],
      model2: '',
      name: '',
      name1: '',
      name2: '',
      params: {
        page: 1,
        limit: 10
      },
      columns7: [
        {
          title: '类型',
          key: 'blackType',
          minWidth: 200,
          align: 'center',
           render: (h, params) => {
             let blackType
            if(params.row.blackType == '1'){
              blackType = 'IP'
            } else if(params.row.blackType == '2'){
              blackType = '手机'
            }
            return h('div', [
              h(
                'span',
                {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                },
                blackType
              )
            ])
          }
        },
        {
          title: '手机号/IP',
          key: 'blackValue ',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '备注',
          key: 'memo',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '添加时间',
          key: 'orderArea',
          minWidth: 100,
          align: 'center'
        },
  
        {
          title: '操作',
          key: 'action',
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
                      this.$router.push({ path: './evaluationReview?commentCode='+params.row.commentCode+'&isPass='+0})
                    }
                  }
                },
                '移除黑名单'
              )
            ])
          }
        }
      ],
      data6: [],
      columns8: [
        {
          title: '审核时间',
          key: 'checkTime',
          width: 200,
          align: 'center'
        },
        {
          title: '审核人员',
          width: 100,
          key: 'userName',
          align: 'center'
        },
        {
          title: '评价时间',
          key: 'commentCreateTime',
          width: 200,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderNum',
          width: 200,
          align: 'center'
        },
        {
          title: '订单时间',
          key: 'orderCreateTime',
          width: 200,
          align: 'center'
        },
        {
          title: '区域',
          key: 'orderArea',
          width: 100,
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'loanUserName',
          width: 100,
          align: 'center'
        },
        {
          title: '手机',
          key: 'loanUserPhone',
          width: 200,
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'serviceCost',
          width: 100,
          align: 'center'
        },
        {
          title: '评价分数',
          width: 200,
          align: 'center',
          render: (h, params) => {
            let listimg = []
            for (let i = 0; i < params.row.stars; i++) {
              listimg.push(
                h('img', {
                  attrs: {
                    src: require('../../image/pointed-star.png')
                  },
                  style: {
                    width: '20px',
                    height: '20px',
                    marginRight: '5px'
                  }
                })
              )
            }
            return h('div', listimg)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                      this.$router.push({ path: './evaluationReview?commentCode='+params.row.commentCode+'&isPass='+1})
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
      data7: [],
      data8: [],
      cityTypel: [],
      cityTypel2: [],
      startRow: 1,
      endRow: 10,
      total: 0,
      models: "",
      models1: "",
      models2: "",
      modelshi:"",
      modelshi1:"",
      modelshi2:"",
      loading3: false
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
    // 待审核
    pageChange (page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1("tab1");
    },
    PageSizeChange (limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.labell1("tab1");
      this.params.limit = limit
    },
    // 查询
    label_query(type) {
      if (this.model1 == "mobile") {
        if (this.name == "" || this.name.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3= true
          this.labell1("tab1");
        }
      } else {
        this.loading3= true
        this.labell1("tab1");
      }
    },
    // 审核成功
    pageChange1 (page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1("tab2");
    },
    PageSizeChange1 (limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.labell1("tab2");
      this.params.limit = limit
    },
    // 查询
    label_query1(type) {
      if (this.model12 == "mobile") {
        if (this.name1 == "" || this.name1.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3= true
          this.labell1("tab2");
        }
      } else {
        this.loading3= true
        this.labell1("tab2");
      }
    },
    // 审核失败
    pageChange2 (page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1("tab3");
    },
    PageSizeChange2 (limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.labell1("tab3");
      this.params.limit = limit
    },
    // 查询
    label_query2(type) {
      if (this.model13 == "mobile") {
        if (this.name2 == "" || this.name2.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3= true
          this.labell1("tab3");
        }
      } else {
        this.loading3= true
        this.labell1("tab3");
      }
    },
    //tab 栏
    labell1(name) {
      // console.log(name)
      let parameter = {
        pageSize: this.endRow,
        pageNum: this.startRow
      };
      let data;
      //待审核评价
      if (name == "tab1") {
        data = Object.assign(
          {
            isPass : 0,
            searchValue: this.name, //手机号or姓名的参数
            searchOptions: this.model1, //手机号or 姓名
          },
          parameter
        );
        this.post(
          BASE_URL + "/black/RiskBlackList/getRiskBlackListList",
          data,
          0
        );
      }
      //评价成功
      if (name == "tab2") {
        // alert(33)
        data = Object.assign(
          {
            isPass : 1,
            searchValue: this.name1, //手机号or姓名的参数
            searchOptions1: this.model12, //手机号or 姓名
            // loanAdCodeFirst: this.labelcitys1, //区域 省
            loanAdcode: this.modelshi1 //市
          },
          parameter
        );
        this.post(
          BASE_URL + httpUrl1,
          data,
          1
        );
      }
      //评价失败
      if (name == "tab3") {
        data = Object.assign({
          isPass : 2,
          searchValue: this.name2, //手机号or姓名的参数
          searchOptions2: this.model13, //手机号or 姓名
        }, parameter);
        this.post(BASE_URL + httpUrl1, data, 2);
      }
    },
    post(httpUrl, params, num) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            if (num == 0) {
              this.data6 = data.data.dataList;
              this.total = parseInt(data.data.total);
              // 分页初始化
              this.endRow = 10
              this.startRow = 1
              //数据初始化
              this.model13 = ""
              this.name2 = ""
              this.models2 = ""
              this.modelshi1 = ""
              this.modelshi2 = ""
              this.model12 = ""
              this.name1 = ""
              this.models1 = ""
              this.loading3= false
              return false;
            }
            if (num == 1) {
              this.data7 = data.data.dataList;
              this.total = parseInt(data.data.total);
              // 分页初始化
              this.endRow = 10
              this.startRow = 1
              // 数据初始化
              this.model13 = ""
              this.name2 = ""
              this.models2 = ""
              this.modelshi = ""
              this.modelshi2 = ""
              this.model1 = ""
              this.name = ""
              this.models = ""
              this.loading3= false
              return false;
            }
            if (num == 2) {
              this.data8 = data.data.dataList;
              this.total = parseInt(data.data.total);
              // 分页初始化
              this.endRow = 10
              this.startRow = 1
              // 数据初始化
              this.modelshi = ""
              this.modelshi1 = ""
              this.model12 = ""
              this.name1 = ""
              this.models1 = ""
              this.modelshi2 = ""
              this.model1 = ""
              this.models = ""
              this.loading3= false
              return false;
            }
          } else {
            this.loading3 = false;
            this.total = 0;
          }
        })
        .catch(err => {
          this.loading3 = false;
          console.log(err);
        });
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
  },
  created(){
    //初始化
    this.labell1("tab1");
  }
}
</script>
<style lang="less" scoped>
</style>
