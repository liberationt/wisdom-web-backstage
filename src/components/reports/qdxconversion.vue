<template>
    <div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;报表&nbsp;>&nbsp;抢单侠报表&nbsp;>&nbsp;渠道转化率报表</span>
			</p>
		</div>
		<div class="clearfix contentcss">
				<ul class="querysty">
						<li>
						<DatePicker type="date" v-model="beginTime" :options="options3" placeholder="开始时间" style="width: 150px"></DatePicker>
						<span>  -  </span>
						<DatePicker type="date" v-model="endTime" :options="options3" placeholder="结束时间" style="width: 150px"></DatePicker>
					</li>
					<li>
						<Select v-model="channel" class="ml20" placeholder="请选择渠道大类" style="width:150px;">
							<Option value="''" >请选择渠道大类</Option>
							<Option value="0" >邀请</Option>
							<Option value="1" >应用市场</Option>
							<Option value="2" >信息流投放</Option>
							<Option value="3" >导流</Option>
						</Select>
					</li>
					<li>
						<Button type="info" class="ml20 w100" :loading="loading3" @click="queryList(1)">
							<span v-if="!loading3">查询</span>
							<span v-else>查询</span>
						</Button>
						<Button type="primary" class="ml20 w100 " :loading="loading2" @click="exports">
							<span v-if="!loading2">导出</span>
							<span v-else>请稍等...</span>
						</Button>
					</li>
				</ul>
		</div>
		<div id="application_table " class="contentcss mt10">
			<Table :row-class-name="rowClassName" border :columns="columns7" :data="data6"></Table>
			<div class="tr mt15">
				<Page :total="total" :page-size="endRow" :current="startRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
			</div>
		</div>
    </div>
</template>
<script>
import untils from "../../utils/utils";
export default {
  data() {
    return {
      beginTime: "",
      endTime: "",
      supplier: "",
      supplierList: [],
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000 * 0;
        }
      },
      channel: "",
      loading3: false,
      loading2: false,
      endRow: 10,
      total: 0,
      startRow: 1,
      columns7: [
        {
          title: "日期",
          key: "reportDate",
          minWidth: 160,
          align: "center",
          render(h, params) {
            let reportDate = params.row.reportDate;
            return h("div", [
              h(
                "span",
                {
                  style: {
                    fontWeight: !reportDate ? "bold" : ""
                  }
                },
                !reportDate ? "汇总结果" : reportDate
              )
            ]);
          }
        },
        {
          title: "渠道大类",
          key: "channelParent",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let channelParent = params.row.channelParent;
            let reportDate = params.row.reportDate;
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: !reportDate ? "none" : "inline-block",
                    color: channelParent == "0" ? "" : "blue",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      switch (channelParent) {
                        case 1:
                          this.$router.push({
                            path: "./qdxapplicationMarket?date=" + reportDate
                          });
                          break;
                        case 2:
                          this.$router.push({
                            path: "./qdxinformationDelivery?date=" + reportDate
                          }); //信息流投放
                          break;
                        case 3:
                          this.$router.push({
                            path: "./qdxdiversion?date=" + reportDate
                          }); //导流
                          break;
                      }
                    }
                  }
                },
                channelParent == "0"
                  ? "邀请"
                  : channelParent == "1"
                    ? "应用市场"
                    : channelParent == "2" ? "信息流投放" : "导流"
              )
            ]);
          }
        },
        {
          title: "注册量",
          key: "registerCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "PV",
          key: "pvCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "UV",
          key: "uvCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "激活",
          key: "activeCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "认证",
          key: "authCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "充值人数",
          key: "rechargeCount",
          minWidth: 110,
          align: "center"
        },
        {
          title: "首充人数",
          key: "firstRechargeCount",
          minWidth: 110,
          align: "center"
        },
				{
					title: '充值总人数',
					key: 'allRechargeCount',
					minWidth: 110,
					align: 'center',
				},
				{
					title: '复充人数',
					key: 'pluralRechargeCount',
					minWidth: 110,
					align: 'center',
				}
      ],
      data6: []
    };
  },
  methods: {
    rowClassName(row, index) {
      if (index === 0) {
        return "demo-table-info-row";
      }
      return "";
    },
    supplierChange(supplier) {
      this.supplier = supplier;
    },
    pageChange(page) {
      this.startRow = page;
      this.queryList(this.startRow);
    },
    PageSizeChange(page) {
      this.startRow = 1;
      this.endRow = page;
      this.queryList(1);
    },
    queryList(startRow) {
      if(!this.ifDate()) return
      this.http
        .post(
          BASE_URL + "/report/reportQiangDanXiaChannel/queryQiangDanXiaCollectReport",
          {
            beginTime:
              this.beginTime == ""
                ? ""
                : untils.formatDate(this.beginTime, "yyyy-MM-dd 00:00:00"),
            endTime:
              this.endTime == ""
                ? ""
                : untils.formatDate(this.endTime, "yyyy-MM-dd 23:59:59"),
            pageSize: this.endRow,
            pageNum: startRow,
            channelParent: this.channel == "''" ? "" : this.channel 
          }
        )
        .then(data => {
          if (data.code == "success") {
            const { dataList, collectRes } = data.data;
            this.data6 = dataList;
            if(dataList.length >0){
              this.data6.splice(0,0,collectRes)
            }
            this.total = Number(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exports() {
      if(!this.ifDate()) return
      this.loading2 = true;
      let formData = new FormData();
      formData.append(
        "beginTime",
        this.beginTime == ""
          ? ""
          : untils.formatDate(this.beginTime, "yyyy-MM-dd 00:00:00")
      );
      formData.append(
        "endTime",
        this.endTime == ""
          ? ""
          : untils.formatDate(this.endTime, "yyyy-MM-dd 23:59:59")
      );
      formData.append("channelParent", this.channel == "''" ? "" : this.channel );
      untils.exporttable(BASE_URL+'/report/reportQiangDanXiaChannel/exportQiangDanXiaCollectReport', untils.getlocal("token"), formData, e => {
        this.loading2 = false;
      });
    },
		ifDate(){
			if(this.beginTime=="" || this.endTime == "" ){
				this.$Message.info("请选择起始时间！")
				return false
			}
				return true
		}
  },
  mounted() {
    let curDate = new Date();
		this.beginTime = new Date(curDate.getTime() - 24*60*60*1000);
		this.endTime = new Date(curDate.getTime() - 24*60*60*1000);
    this.queryList(1);
  }
};
</script>
<style lang="less" scoped>
</style>