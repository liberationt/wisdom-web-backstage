<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;店铺管理</span>
            </p>
        </div>
        <div class="contentcss"> 
            <div class="clearfix">
              <ul class="querysty clearfix">
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
                  <Select v-model="shopState" placeholder="店铺状态" style="width:150px;">
                    <Option v-for="item in shopStateList" :value="item.code" :key="item.code">{{ item.name }}</Option>
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
        <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="550">
            <img :src=this.imglink alt="" style="width:500px;height:500px;">
        </Modal>
    </div>
</template>

<script>
import utils from '../../utils/utils'
export default {
  data() {
    return {
      vusername: "",
      vuserphone: "",
      modal11:false,
      imglink:'',
      columns10: [
        {
          title: "姓名",
          key: "userName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          minWidth: 150,
          align: "center"
        },
        {
          title: "店铺状态",
          key: "storeStatus",
          minWidth: 100,
					align: "center",
					render:(h,params)=>{
						return h('span',params.row.storeStatus=='1'?'有效':'无效')
					}
        },
        {
          title: "店铺名称",
          key: "storeName",
          minWidth: 140,
          align: "center"
        },
        {
          title: "区域",
          key: "area",
          minWidth: 110,
					align: "center",
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          minWidth: 190,
          align: "center"
        },
        {
          title: "店铺介绍",
          key: "storeDesc",
          minWidth: 160,
          align: "center",
          render:(h,params)=>{
            return h('div',{
              style:{
                display: 'inline-block',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              },
              domProps: {
                title: params.row.storeDesc
              },
            },params.row.storeDesc)
          }
        },
        {
          title: "微信ID",
          key: "weixinNumber",
          minWidth: 160,
          align: "center"
        },
        {
          title: "微信二维码",
          key: "weixinNumber",
          minWidth: 160,
          align: "center",
          render:(h,params)=>{
            if(params.row.weixinImg ==null||params.row.weixinImg==""){
                return h(
                'div',
                {
                  style:{
                    width:'60px',
                    height:'60px',
                  }
                }
              )
            }else{
              return h(
                'img',
                {
                  attrs:{
                    src:params.row.weixinImg
                  },
                  style:{
                    width:'60px',
                    height:'60px'
                  },
                  on:{
                    click:()=>{
                      this.modal11 = true
                      this.imglink = params.row.weixinImg
                    }
                  }
                }
              )
            }
          }
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
                      this.$router.push('/vShodetails?storeCode='+params.row.storeCode);
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
      vshopEnd: "",
      shopState: -1,
      shopStateList: [
        { code: -1, name: "店铺状态" },
        { code: 1, name: "有效" },
        { code: 0, name: "无效" }
      ]
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
      let begintime=this.vshopStart==""?"":utils.formatDate(this.vshopStart, "yyyy-MM-dd")
      let endtime = this.vshopEnd==""?"":utils.formatDate(this.vshopEnd, "yyyy-MM-dd")
      let date1 = Date.parse(new Date(begintime))/1000
      let date2 = Date.parse(new Date(endtime))/1000
      if (date1 > date2) {
        this.loading3 = false
        this.$Modal.warning({
          title: '创建时间',
          content: '<p>开始时间不得大于结束时间</p>'
        })
        return false
      }
      let data = Object.assign({
				adCodeFirst :this.registersheng, //
				adCodeSecond: this.registershi, //市编码
				beginTime:
          this.vshopStart == ""
            ? ""
            : utils.formatDate(this.vshopStart, "yyyy-MM-dd hh:mm:ss"),
        endTime:
          this.vshopEnd == ""
            ? ""
            : utils.formatDate(this.vshopEnd, "yyyy-MM-dd 23:59:59"),
				pageSize: this.endRow,
				name :this.vusername,
				pageNum: startRow,
        phone :this.vuserphone,
        storeStatus:this.shopState==-1?'':this.shopState
      });
			this.http.post(BASE_URL + "/vshop/vshopStore/queryPage", data)
			.then(data => {
          if (data.code == "success") {
            this.total = parseInt(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            this.data9 = data.data.dataList;
            this.loading3 = false;
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
    //省
    citys(v) {
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
		this.creditinquery(1)
  }
};
</script>
<style>
</style>

