<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;贷超产品</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            
            <span class="ml20">时间:</span>
            <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                        style="width: 150px"></DatePicker>
            <span>  -  </span>
            <DatePicker type="date" :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                    style="width: 150px"></DatePicker>
        
        
            <Select v-model="AllproductsCode" placeholder="所有产品" style="width:150px" @on-change="AllproductsChange" class="mr20 ml50">
                <Option v-for="item in AllproductsList" :value="item.productCode" :key="item.productCode">
                    {{ item.productName }}
                </Option>
            </Select>
            
            <Select v-model="InquiredetailCode" placeholder="查询明细" style="width:150px;" @on-change="InquiredetailChange">
              
              <Option v-for="item in InquiredetaiList" :value="item.flag" :key="item.flag">
                {{ item.redetaiName }}
              </Option>
            </Select>

            <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryReportList">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
            </Button>
            <Button type="primary" class="w100 " :loading="loading2" @click="exports">
                <span v-if="!loading2">导出</span>
                <span v-else>请稍等...</span>
            </Button> 
        </div>
        <div id="application_table " class="contentcss mt10">
            <Table class="tabgrouping" border highlight-row :columns="columnList" :data="reportList"></Table>
        </div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      loading3: false,
      loading2: false,
      beginTime: "",
      endTime: "",
      AllproductsCode: "code", //所有产品
      AllproductsList: [],
      InquiredetailCode: "0", //查询明细
      InquiredetaiList: [
        { flag: "0", redetaiName: "查询明细" },
        { flag: "1", redetaiName: "查询汇总" }
      ],
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      columnList:[
        {
          title: '日期',
          key: 'dateTime',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '产品名称',
          key: 'productName',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'App详情页查看人数',
          key: 'pageViewuvcount',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'App立即申请点击人数',
          key: 'datesubmitUvcount',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'App点击转化率',
          key: 'conversionRate',
          minWidth: 150,
          align: 'center'
        },
        {
          title:'H5点击人数',
          key:'h5UvCount',
          minWinth:150,
          align:'center'
        }
      
      ],
      reportList: []
    };
  },
  methods: {
    // 时间选择
    beginTimeChange(value, data) {
      this.beginTime = value;
    },
    endTimeChange(value, data) {
      this.endTime = value;
    },

    AllproductsChange(productsCode) {
      this.AllproductsCode = productsCode;
    },
    InquiredetailChange(redetaiCode) {
      this.InquiredetailCode = redetaiCode;
    },
    timeFormat(date, num) {
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1; //月
      let d = date.getDate(); //日
      if (num == 1) {
        d = date.getDate();
      }
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // 查询
    queryReportList() {
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
      this.columnList = this.getColumnList();
      let params = {
        beginDate: this.beginTime,
        endDate: this.endTime,
        productCode: this.AllproductsCode == "code" ? "" : this.AllproductsCode,
        flag: this.InquiredetailCode
      };
      this.http
        .post(BASE_URL + "/superProduct/loanSuperProduct/selectList", params)
        .then(data => {
          this.reportList = data.data;
          this.loading3 = false;
        });
    },
    // 导出
    exports() {
      this.loading2 = true;
      let httpUrl =
      BASE_URL + "/superProduct/loanSuperProduct/exportProductList";
      let formData = new FormData();
      formData.append("beginDate", this.beginTime);
      formData.append("endDate", this.endTime);
      formData.append("productCode", this.AllproductsCode =="code" ? "" : this.AllproductsCode);
      formData.append("flag", this.InquiredetailCode);
      utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
        this.loading2 = false;
      });
    },
    getColumnList() {
      let columnList = [
        this.getColumnItem("日期", "dateTime", 150),
        this.getColumnItem("产品名称", "productName", 150, (h, params) => {
          return this.reportColumns2Render(
            h,
            params.row.loanProductList,
            details => {
              if(details.productName == ""){
                details.productName = ' - '; 
              }
              return details.productName;
            }
          );
        }),
        this.getColumnItem(
          "App详情页查看人数",
          "pageViewuvcount",
          150,
          (h, params) => {
            return this.reportColumns2Render(
              h,
              params.row.loanProductList,
              details => { 
                return details.pageViewuvcount;
              }
            );
          }
        ),
        this.getColumnItem(
          "App立即申请点击人数",
          "submitUvcount",
          150,
          (h, params) => {
            return this.reportColumns2Render(
              h,
              params.row.loanProductList,
              details => {
                return details.submitUvcount;
              }
            );
          }
        ),
        this.getColumnItem("App点击转化率", "conversionRate", 150, (h, params) => {
          return this.reportColumns2Render(
            h,
            params.row.loanProductList,
            details => {
              return details.conversionRate;
            }
          );
        }),
        this.getColumnItem("H5点击人数", "h5UvCount", 150, (h, params) => {
          return this.reportColumns2Render(
            h,
            params.row.loanProductList,
            details => {
              return details.h5UvCount;
            }
          );
        })
      ];
      return columnList;
    },
    getColumnItem(title, key, width, render) {
      return {
        title: title,
        key: key,
        minWidth: width,
        align: "center",
        render: render
      };
    },
    reportColumns2Render(h, params, showTextCallback) {
      let list = [];
      for (let i = 0; i < params.length; i++) {
        let text = showTextCallback ? showTextCallback(params[i]) : params[i];
        list.push(
          h(
            "span",
            {
              style: {
                display: "block",
                width: "100%",
                align: "center",
                lineHeight: "40px",
                borderBottom:
                  i < params.length - 1 || i < params[i].length - 1
                    ? "1px solid #e9eaec"
                    : ""
              }
            },
            text
          )
        );
      }
      return h("div", list);
    }
  },
  created() {
    // 所有产品
    this.http
      .post(BASE_URL + "/superProduct/loanSuperProduct/productList", {})
      .then(data => {
        if (data.code == "success") {
			 this.AllproductsList = data.data;
			 this.AllproductsList.splice(0,0,{ productCode: "code", productName: "所有产品" })
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    var date = new Date();
    this.endTime = this.timeFormat(date, 1);
    date.setDate(1);
    this.beginTime = this.timeFormat(date, 0);
  }
};
</script>
<style lang="less" scoped>
</style>

