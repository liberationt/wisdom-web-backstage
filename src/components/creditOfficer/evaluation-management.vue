<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;评价管理</span>
      </p>
    </div>
    <div class="contentcss">
    <Tabs type="card" @on-click="labell1" :value="tabs" :animated="false">
        <TabPane :label="label" name="tab1" >
            <div class="clearfix">
            <div class="left">
            <Select v-model="model1" style="width:100px" @on-change="label_option">
              <Option v-for="item in searchOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name" placeholder="请输入关键字"  style="width: 150px">
            </Input>
            <Select v-model="models" @on-change="citys" placeholder="请选择省" style="width:150px;margin-left:20px">
                <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modelshi" @on-change="cityh" placeholder="请选择市" style="width:150px;">
                <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="label_query('warning')">
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
        <TabPane label="审核成功" name="tab2">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model12" style="width:100px" @on-change="label_option1">
              <Option v-for="item in searchOptions1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name1" placeholder="请输入关键字"  style="width: 150px">
            </Input>
             <Select v-model="models1" @on-change="citys1" placeholder="请选择省" style="width:150px;margin-left:20px">
                <Option v-for="item in cityType1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modelshi1" @on-change="cityh1" placeholder="请选择市" style="width:150px;">
                <Option v-for="item in cityTypel1" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="label_query1('warning')">
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
        <TabPane label="审核失败" name="tab3">
            <div class="clearfix">
            <div class="left">
            <Select v-model="model13" style="width:100px" @on-change="label_option2">
              <Option v-for="item in searchOptions2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="name2" placeholder="请输入关键字"  style="width: 150px">
            </Input>
            <Select v-model="models2" @on-change="citys2" placeholder="请选择省" style="width:150px;margin-left:20px">
                <Option v-for="item in cityType2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            <Select v-model="modelshi2" @on-change="cityh2" placeholder="请选择市" style="width:150px;">
                <Option v-for="item in cityTypel2" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
            </Select>
            </div>
            <!-- <Button class="right mr100" type="primary" icon="ios-search">查询</Button> -->
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="label_query2('warning')">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns9" :data="data8"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" @on-change="pageChange2" @on-page-size-change="PageSizeChange2" show-sizer show-total></Page>
            </div>
        </TabPane>
    </Tabs>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      label: h => {
        return h('div', [
          h('span', '待审核评价'),
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
      model12: 'mobile',
      model13: 'mobile',
      cityType: [],
      cityType1: [],
      cityType2: [],
      tabs: "tab1",
      model1: 'mobile',
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
          width:200,
          key: 'loanUserPhone',
          align: 'center'
        },
        {
          title: '服务费用',
          key: 'serviceCost',
          width: 100,
          align: 'center'
        },
        {
          title: '评价打分',
          key: 'stars',
          width:200,
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
          title: '评价内容',
          key: 'content',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    title: params.row.content
                  }
                },
                params.row.content
              )
            ]);
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
                      this.$router.push({ path: './evaluationReview?commentCode='+params.row.commentCode+'&isPass='+0})
                    }
                  }
                },
                '审核'
              )
            ])
          }
        }
      ],
      data6: [],
      columns9: [
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
          width:100,
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
                      this.$router.push({ path: './evaluationReview?commentCode='+params.row.commentCode+'&isPass='+ 2 })
                    }
                  }
                },
                '查看详情'
              )
            ])
          }
        }
      ],
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
      cityTypel1: [],
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
      labelcitys: "",
      labelcitys1: "",
      labelcitys2: "",
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
        if (this.name != "" && this.name.length < 3) {
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
        if (this.name1 != "" && this.name1.length < 3) {
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
        if (this.name2 != "" && this.name2.length < 3) {
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
      let httpUrl1 = "/loan/comment/getCommentDetailsList"
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
            loanAdCodeFirst: this.labelcitys, //区域 省
            loanAdcode: this.modelshi //市
          },
          parameter
        );
        this.post(
          BASE_URL + httpUrl1,
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
            searchOptions: this.model12, //手机号or 姓名
            loanAdCodeFirst: this.labelcitys1, //区域 省
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
          searchOptions: this.model13, //手机号or 姓名
          loanAdCodeFirst: this.labelcitys2, //区域 省
          loanAdcode: this.modelshi2 //市
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
              this.model13 = "mobile"
              this.name2 = ""
              this.models2 = ""
              this.modelshi1 = ""
              this.modelshi2 = ""
              this.model12 = "mobile"
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
              this.model13 = "mobile"
              this.name2 = ""
              this.models2 = ""
              this.modelshi = ""
              this.modelshi2 = ""
              this.model1 = "mobile"
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
              this.model12 = "mobile"
              this.name1 = ""
              this.models1 = ""
              this.model1 = "mobile"
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
    //省
    citys(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys = v;
    },
    citys1(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys1 = v;
    },
    citys2(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys2 = v;
    },
    //市
    cityh(v) {
      this.modelshi = v
    },
    cityh1(v) {
      this.modelshi1 = v
    },
    cityh2(v) {
      this.modelshi2 = v
    },
    // 市接口
    httpshi(data) {
      // alert(222)
      this.http
        .post(BASE_URL + "/loan/hotcity/queryCityAddressList", data)
        .then(data => {
          this.cityTypel = data.data || "";
          this.cityTypel1 = data.data || "";
          this.cityTypel2 = data.data || "";
        });
    },
    // 入住 下拉框
    label_option(v) {
      this.model1 = v
    },
    label_option1(v) {
      this.model12 = v
    },
    label_option2(v) {
      this.model13 = v
    },
  },
  created(){
    //初始化
    this.labell1("tab1");
    //省
    this.http.get("../../../static/city.json").then(data => {
      this.cityType = data;
      this.cityType1 = data;
      this.cityType2 = data;
    });
    // 
    this.http
      .post(BASE_URL + "/loan/comment/queryCommentListFilter", {})
      .then(data => {
        this.searchOptions = data.data.searchOptions
        this.searchOptions1 = data.data.searchOptions
        this.searchOptions2 = data.data.searchOptions
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>
<style lang="less" scoped>
</style>
