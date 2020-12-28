<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;信贷员列表</span>
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
                  <Select v-model="registersheng" @on-change="registers" placeholder="省份" style="width:150px;">
                    <Option v-for="item in registercitys" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="mr20">
                  <Select v-model="registershi" @on-change="registerh" placeholder="城市" style="width:150px;">
                    <Option v-for="item in registercityh" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                  </Select>
                </li>
                 <li class="mr20">
                  <Select v-model="registration" placeholder="注册来源" style="width:150px;">
                    <Option v-for="item in registrationList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </li>
                <li>
                  <Input class="mr20"  v-model="vusername" placeholder="请输入姓名"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Input v-model="vuserphone" placeholder="请输入手机号"  style="width: 150px">
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
      registrationList:[
        {name:'注册来源',code:-1},
        {name:'抢单侠',code:1},
        {name:'微店',code:3},
      ],
      registration:-1,
      vusername: "",
      vuserphone: "",
      columns10: [
        {
          title: "姓名",
          key: "name",
          minWidth: 100,
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
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
          render(h,params){
            return h('div', [
              h('span', {}, params.row.adNameFirst +" "+params.row.adNameSecond)
            ])
          }
        },
        {
          title: "邀请码",
          key: "inviterCode",
          minWidth: 150,
          align: "center"
        },
        {
          title: "注册来源",
          key: "businessKey",
          minWidth: 100,
          align: "center",
          render(h,params){
            return h('div', [
              h('span', {}, params.row.businessKey==1?'抢单侠':'微店')
            ])
          }
        },
        {
          title: "首次注册/登录微店",
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
                      this.$router.push({
                        path:
                          "vCreaditinformation?managerCode=" +
                          params.row.managerCode
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
      memberGrade: "-1",
      memberGradeList: [],
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
        vipType: this.memberGrade=="-1"?null:this.memberGrade, //会员等级
        adCodeFirst: this.registersheng, //省
        adCodeSecond: this.registershi, //市
        businessKey:this.registration==-1?"":this.registration,
        phone: this.vuserphone,
        name: this.vusername,
        beginTime: this.vshopStart == "" ? "" : utils.formatDate(this.vshopStart,'yyyy-MM-dd hh:mm:ss'), //开始时间
        endTime: this.vshopEnd == "" ? "" : utils.formatDate(this.vshopEnd,'yyyy-MM-dd 23:59:59'), //结束时间
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.request(
        "/vshop/vshopStoreManager/queryPageStoreManager",
        parmise,
        data => {
          this.total = data.total
          this.data9 = data.dataList;
          this.startRow =
            Math.ceil(data.startRow / this.endRow) == 0
              ? 1
              : Math.ceil(data.startRow / this.endRow);
          this.loading3 = false;
        },err=>{ this.loading3 = false}
      );
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
    // 查询
    this.http.post(BASE_URL+'/vshop/vshopStoreManager/queryPageFilter',{})
    .then(data=>{
      if(data.code=='success'){
        this.memberGradeList = data.data.vipBeans
        let obj = {
          label:'会员等级',
          code:'-1'
        }
        this.memberGradeList.splice(0,0,obj)
      }
    })
    this.creditinquery(1);
  }
};
</script>
<style>
</style>

