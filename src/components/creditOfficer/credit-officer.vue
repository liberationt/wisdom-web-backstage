<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;信贷员列表</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
                <li >
                  <Input class="mr20" v-for="item in cityList" v-model="item.code" :placeholder="'请输入'+item.label"  style="width: 150px">
                  </Input>
                  <!-- <Select v-model="credit1" @on-change="creditchange" style="width:100px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Input v-model="creditname" placeholder="请输入关键字" style="width: 150px"></Input>                  -->
                </li>
                <li class="mr20">
                  <Select v-model="registersheng" @on-change="registers" placeholder="请选择省" style="width:150px;">
                    <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                  <Select v-model="registershi" @on-change="registerh" placeholder="请选择市" style="width:150px;">
                    <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registermodel3" @on-change="registerstate" placeholder="所属状态" style="width:150px;">
                    <Option v-for="item in registerstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="credit2" @on-change="credit2change" placeholder="上下架状态" style="width:150px;">
                    <Option v-for="item in statuslowershelves" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>                  
                </li>
                <li class="mr20">
                  <Select v-model="credit3" @on-change="credit3change" placeholder="服务介绍状态" style="width:150px;">
                    <Option v-for="item in creditstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="creditinquery('warning')">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
              </ul>
            <!-- <Button class="right mr100" type="primary" icon="ios-search" @click="creditinquery('warning')">查询</Button> -->
            
            </div>
            <div id="application_table" class="mt15">
            <Table border :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      columns10: [
        {
          title: "ID",
          key: "dataId",
          minWidth: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneMember",
          minWidth: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 100,
          align: "center"
        },
        {
          title: "所属区域",
          key: "loanLocationName",
          minWidth: 150,
          align: "center"
				},
				{
          title: "基本信息",
          key: "loanBaseStatus",
          minWidth: 150,
          align: "center"
        },
        {
          title: "状态",
          key: "servicePutawayStatus",
          minWidth: 100,
          align: "center"
        },
        {
          title: "服务介绍初始状态",
          key: "serviceIntroductionStatusName",
          minWidth: 200,
          align: "center"
        },
        {
          title: "已邀请人数",
          key: "loanInviterCodeCount",
          minWidth: 100,
          align: "center"
        },
        {
          title: "注册时间",
          key: "registerTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "最后一次登录时间",
          key: "lastLoginTime",
          minWidth: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: 'right',
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:
                          "creditInformation?loanOfficerCode=" +
                          params.row.loanOfficerCode
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data9: [],
      searchOptions: [],
      statusOptions: [],
      loading3: false,
      startRow: 1,
      endRow: 10,
      total: 0,
      credit1: "mobile",
      creditname: "",
      cityList: [],
      registersheng: "",
      registercitys: [],
      registershi: "",
      registercityh: [],
      credit2: "",
      statuslowershelves: [],
      credit3: "",
			creditstatus: [],
			registerstatus:[],//所属状态
			registermodel3:'',
    };
  },
  methods: {
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.labell1();
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.labell1();
		},
		registerstate(v) {
			this.registermodel3 = v;
		},
    //接口封装
    post(httpUrl, params) {
      this.http
        .post(httpUrl, params)
        .then(data => {
          if (data.code == "success") {
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            this.data9 = data.data.dataList;
            this.loading3 = false;
            // this.credit1 = "";
            // this.credit2 = "";
            // this.credit3 = "";
            // this.creditname = "";
            // this.registershi = "";
            // this.registersheng = "";
            return false;
          } else {
            this.total = 0;
            this.loading3 = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading3 = false;
        });
    },
    // 查询
    labell1() {
      let list = []
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].value == 'mobile') {
          if (this.cityList[i].code!='' && this.cityList[i].code.length<3) {
            this.loading3= false
            this.phoneti('warning')
            return false
          }           
        }
        let obj = new Object ()
        obj.label = this.cityList[i].value
        if (this.cityList[i].code == null) {
            obj.value = ''
        } else {
            obj.value = this.cityList[i].code
        }
        list.push(obj)
        
      }
      let data = Object.assign({
        // searchOptions : "",
        searchOptions: list,
        // searchValue: this.creditname,
        servicePutawayStatus: this.credit2,
        loanAdCodeFirst: this.registersheng, //省编码
        loanAdCodeSecond: this.registershi, //市编码
				serviceIntroductionStatus: this.credit3 == -1 ? null : this.credit3, //服务介绍状态
				loanBaseStatus:this.registermodel3 == -1 ? null : this.registermodel3, //所属状态
        pageSize: this.endRow,
        pageNum: this.startRow
      });
      this.post(BASE_URL + "/loan/officer/queryOfficerManagerList", data);
      return false;
    },
    // 列表查询
    creditinquery(type) {
      this.startRow = '1'
      if (this.credit1 == "mobile") {
        if (this.creditname != "" && this.creditname.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1();
        }
      } else {
        this.loading3 = true;
        this.labell1();
      }
    },
    //省
    citys(v) {
      // console.log(v)
      let data = {
        data: v
      };
      this.httpshi(data);
      this.labelcitys = v;
    },
    //市
    cityh(v) {
      this.modelshi = v;
    },
    //zhuce sheng
    registerh(v) {
      this.registershi = v;
    },
    registers(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.registersheng = v;
    },
    // 市接口
    httpshi(data) {
      this.http
        .post(BASE_URL + "/loan/hotcity/queryCityAddressList", data)
        .then(data => {
          this.cityTypel = data.data || "";
          this.registercityh = data.data || "";
        });
    },
    // 信贷员列表
    creditchange(v) {
      this.credit1 = v;
      // alert(v)
    },
    credit2change(v) {
      this.credit2 = v;
    },
    credit3change(v) {
      this.credit3 = v;
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
    }
  },
  created() {
    this.labell1();
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerManagerListFilter", {})
      .then(data => {
        this.cityList = data.data.searchOptions;
        this.creditstatus = data.data.serviceStatusOptions;
				this.statuslowershelves = data.data.servicePutawayStatusOptions;
				this.registerstatus = data.data.baseStatusOptions; //所属状态
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
</style>

