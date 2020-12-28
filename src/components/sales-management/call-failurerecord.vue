<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理>&nbsp;审核失败通话记录</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
                  <li class="mr20">
                  <Select v-model="registermodel3" @on-change="registerstate" placeholder="请选择坐席" style="width:150px;">
                    <Option v-for="item in registerstatus" :value="item.seatNo" :key="item.seatNo">{{ item.seatName }}</Option>
                  </Select>
                </li>
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
                    <span class="lh32 ">审核时间:</span>
                        <DatePicker type="date" :options="options3" :value="timeval1" @on-change="time1" placeholder="开始时间" style="width: 150px"></DatePicker>
                            <span>  -  </span>
                        <DatePicker type="date" :options="options3" :value="timeval2" @on-change="time2" placeholder="结束时间" style="width: 150px"></DatePicker>
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
            <Table border highlight-row :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      columns10: [
        {
          title: "坐席",
          key: "dataId",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                params.row.seatNo + " " + params.row.seatName
              )
            ]);
          }
        },
        {
          title: "信贷员手机号",
          key: "phoneNumber",
          minWidth: 150,
          align: "center"
        },
        {
          title: "信贷员姓名",
          key: "realName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "所属区域",
          key: "loanLocationName",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                params.row.loanCityNameFirst +
                  " " +
                  params.row.loanCityNameSecond
              )
            ]);
          }
        },

        {
          title: "间隔时间",
          key: "intervalTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "审核失败时间",
          key: "loanStatusTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "通话时间",
          key: "conversationTime",
          minWidth: 180,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: "right",
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
      credit3: "",
      timeval1: "",
      timeval2: "",
      registerstatus: [], //所属状态
      registermodel3: ""
    };
  },
  methods: {
    pageChange(page) {
      this.startRow = page;
      // this.params.page = page;
      this.labell1(this.startRow);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.labell1(this.startRow);
    },
    registerstate(v) {
      this.registermodel3 = v;
    },
    // 时间判断
    time1(value, data) {
      this.timeval1 = value;
    },
    time2(value, data) {
      this.timeval2 = value;
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
    labell1(startRow) {
      let date1 = Date.parse(new Date(this.timeval1)) / 1000;
      let date2 = Date.parse(new Date(this.timeval2)) / 1000;
      if (date1 > date2) {
        this.loading3 = false;
        this.$Modal.warning({
          title: "审核时间",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      let data = Object.assign({
        seatNo: this.registermodel3,
        loanCityNameFirst: this.registersheng, //省编码
        loanCityNameSecond: this.registershi, //市编码
        loanStatusStartTime: this.timeval1,
        loanStatusEndTime: this.timeval2,
        pageSize: this.endRow,
        pageNum: startRow
      });
      this.cityList.forEach(element => {
        let value = element.value;
        if (value == "mobile") {
          value = "phoneNumber";
        } else if (value == "name") {
          value = "realName";
        }
        if (element.code == null) {
          data[value] = "";
        } else {
          data[value] = element.code;
        }
      });
      this.post(BASE_URL + "/sale/saleLoanOfficerInfo/examineRecordList", data);
      return false;
    },
    // 列表查询
    creditinquery(type) {
      this.startRow = "1";
      if (this.credit1 == "mobile") {
        if (this.creditname != "" && this.creditname.length < 3) {
          this.phoneti(type);
        } else {
          this.loading3 = true;
          this.labell1(1);
        }
      } else {
        this.loading3 = true;
        this.labell1(1);
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
    seatlist() {
      this.http
        .post(BASE_URL + "/sale/saleSeat/getSaleSeatInfoList", { seatType: 2 })
        .then(data => {
          this.registerstatus = data.data; //所属状态
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.timeval1 = utils.getNowDate(0)[1] + "-01";
    this.timeval2 = utils.getNowDate(0)[0];
    this.seatlist();
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });
    this.http
      .post(BASE_URL + "/loan/officer/queryOfficerManagerListFilter", {})
      .then(data => {
        if (data.code == "success") {
          this.cityList = data.data.searchOptions;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.labell1(1);
  }
};
</script>
<style>
</style>

