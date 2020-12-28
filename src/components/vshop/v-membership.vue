<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员列表</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
                <li class="mr20">
                  <Select v-model="memberGrade" placeholder="会员等级" style="width:150px;">
                    <Option v-for="item in memberGradeList" :value="item.code" :key="item.code">{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="realNameState" placeholder="实名状态" style="width:150px;">
                    <Option v-for="item in realNameStateList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registersheng" @on-change="registers" placeholder="省份" style="width:150px;">
                    <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registershi" @on-change="registerh" placeholder="城市" style="width:150px;">
                    <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li>
                  <Input class="mr20"  v-model="vusername" placeholder="请输入会员姓名"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Input v-model="vuserphone" placeholder="请输入会员手机号"  style="width: 150px">
                  </Input>
                </li>
                  <li>
                  <Input class="mr20"  v-model="managerName" placeholder="请输入信贷员姓名"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Input v-model="managerPhone" placeholder="请输入信贷员手机号"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <DatePicker type="date" :options="options3" v-model="vshopStart" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" v-model="vshopEnd" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <!-- <li class="mr20">
                  <Select v-model="shopState" placeholder="店铺状态" style="width:150px;">
                    <Option v-for="item in shopStateList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </li> -->
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="creditinquery(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
                
              </ul>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns10" :data="data9"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      vusername: "",
      vuserphone: "",
      managerName: "",
      managerPhone: "",
      columns10: [
        {
          title: "姓名",
          key: "userName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "userPhone",
          minWidth: 150,
          align: "center"
        },
        {
          title: "会员等级",
          key: "vipDesc",
          minWidth: 100,
          align: "center"
        },
        {
          title: "区域",
          key: "channelCode",
          minWidth: 140,
          align: "center",
          render(h, params) {
            return h("div", [
              h(
                "span",
                {},
                params.row.adNameFirst + " " + params.row.adNameSecond
              )
            ]);
          }
        },
        {
          title: "实名状态",
          key: "realInfo",
          minWidth: 110,
          align: "center",
          render(h, params) {
            return h("div", [
              h(
                "span",
                {},
                params.row.realInfo == 0?"未填写":"已填写"
              )
            ]);
          }
        },
        {
          title: "身份证",
          key: "idCard",
          minWidth: 150,
          align: "center"
        },
        {
          title: "推荐人邀请码",
          key: "inviterCode",
          minWidth: 150,
          align: "center"
        },
        {
          title: "推荐人",
          key: "managerName",
          minWidth: 100,
          align: "center",
          render(h, params) {
            let managerPhone,managerName
            if(params.row.managerPhone == null){
              managerPhone = ""
            } else {
              managerPhone = params.row.managerPhone
            }
            if(params.row.managerName == null){
              managerName = ""
            } else {
              managerName = params.row.managerName
            }
            return h("div", [
              h(
                "span",
                {},
                managerName + " " +  managerPhone
              )
            ]);
          }
        },
        {
          title: "注册时间",
          key: "dataCreateTime",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      utils.putlocal("membershipRecord",params.row.userCode)
                      this.$router.push({
                        path:
                          "vMemberdetails?userCode=" +
                          params.row.userCode 
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
      loading3: false,
      startRow: 1,
      endRow: 10,
      total: 0,
      memberGrade: "",
      memberGradeList: [],
      realNameState: "",
      realNameStateList: [
        { code: "''", name: "实名状态" },
        { code: 0, name: "未填写" },
        { code: 1, name: "已填写" }
      ],
      registersheng: "",
      registercitys: [],
      registershi: "",
      registercityh: [],
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      vshopStart: "",
      vshopEnd: ""
    };
  },
  methods: {
    registers(v) {
      let data = {
        data: v
      };
      this.httpshi(data);
      this.registersheng = v;
    },
    pageChange(page) {
      this.startRow = page;
      this.creditinquery(page);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.creditinquery(1);
    },
    // 查询
    creditinquery(startRow) {
      let date1 = Date.parse(new Date(this.vshopStart))/1000
      let date2 = Date.parse(new Date(this.vshopEnd))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '注册时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let parmise = {
        vipType: this.memberGrade == '-1' ? null : this.memberGrade, //会员等级
        realInfo: this.realNameState == "''" ? "" : this.realNameState, //实名状态：0未填写，1已填写 ,
        adCodeFirst: this.registersheng, //省
        adCodeSecond: this.registershi, //市
        userName: this.vusername, //客户名称
        userPhone: this.vuserphone, //客户手机
        managerName: this.managerName,
        managerPhone: this.managerPhone,
        beginTime:
          this.vshopStart == ""
            ? ""
            : utils.formatDate(this.vshopStart, "yyyy-MM-dd hh:mm:ss"), //开始时间
        endTime:
          this.vshopEnd == ""
            ? ""
            : utils.formatDate(this.vshopEnd, "yyyy-MM-dd 23:59:59"), //结束时间
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.request("/vshop/vshopLoanUser/queryPage", parmise, data => {
        this.data9 = data.dataList;
        this.startRow = Math.ceil(data.startRow / this.endRow) == 0 ? 1 : Math.ceil(data.startRow / this.endRow);
        this.total = Number(data.total)
        this.loading3 = false;
      },err=>{ this.loading3 = false});
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
    //zhuce sheng
    registerh(v) {
      this.registershi = v;
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
    this.http.get("../../../static/city.json").then(data => {
      this.registercitys = data;
    });

    // 查询参数
    this.request("/vshop/vshopLoanUser/queryPageFilter", {}, data => {
       this.memberGradeList = data.vipBeans 
       let obj = {
          label:'会员等级',
          code:'-1'
        }
        this.memberGradeList.splice(0,0,obj)
      },err=>{ console.log(err)});
    // 查询
    this.creditinquery();
  }
};
</script>
<style>
</style>

