<template>
    <div>
        <div class="navigation">
          <p>
              <span>管理首页&nbsp;>&nbsp;应用&nbsp;>基础配置&nbsp;>通道管理</span>
          </p>
        </div>
        <div class="clearfix contentcss">
          <div class="clearfix">
        <ul class="querysty clearfix">
          <li class="mr20">
            <span>通道名称：</span>
            <Input v-model="passagewayName" placeholder="请输入通道名称" style="width: 150px"></Input>               
          </li>
          <li class="mr20">
            <span>通道类型：</span>
            <Select v-model="passagewayType" placeholder="请选择通道类型" style="width:150px">
                <Option v-for="item in loanstatus" :value="item.data" :key="item.data">{{ item.title }}</Option>
            </Select>
          </li>
          <li class="mr20">
            <!--  :value="beginTime" :value="endTime"-->
            <span class="lh32 ml10">调用时间：</span>
            <DatePicker type="date" :value="beginTime" @on-change="Stime" placeholder="请选择开始时间" :options="options3" style="width: 150px"></DatePicker>
                <span>  -  </span>
            <DatePicker type="date" :value="endTime"  @on-change="Etime" placeholder="请选择结束时间" :options="options3" style="width: 150px"></DatePicker>
          </li>
          <li class="mr20">
            <span>最近调用次数：</span>
            <Select v-model="callFrequency" placeholder="最近调用次数" style="width:150px;">
                <Option v-for="item in loanrecommend" :value="item.data" :key="item.data">{{ item.title }}</Option>
            </Select>
          </li>
          <li class="right">
            <Button type="info" class="right mr20 w90" :loading="loading3" @click="mechanisminqury()">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
        </ul>
      </div>
      </div>
      <div id="application_table" class="mt15">
          <Table border highlight-row :columns="columns11" :data="data10"></Table>
      </div>
      <div class="chakan"><Button type="primary" class="mt20" @click="lookJournal">查看操作日志</Button></div>
      <!-- 调整modal -->
      <Modal
        v-model="adjustment"
        title="调整通道信息"
        :mask-closable=false
        @on-ok="adjustmentOk"
        @on-cancel="adjustmentCancel"
        :loading="loading">
        <Table border :columns="adjustmentTbale" :data="adjustmentList" style="margin-bottom:10px;" ></Table>
        <Input v-model="adjustmentYy" placeholder="请填写调整原因" style="width: 485px" />
      </Modal>
    </div>
</template>
<script>
import untils from "../../utils/utils";
export default {
  data() {
    return {
      options3: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000*0;
        }
      },
      // journalList : [],
      // journal: false,
      adjustment: false,
      loading: true,
      passagewayName: "", //通道名称
      passagewayType: "''",
      beginTime: "", //调用时间 开始
      endTime: "", //结束
      callFrequency: -1, //调用次数
      loading3: "",
      loanstatus: [],
      loanrecommend: [],
      columns11: [
        {
          title: "通道名称",
          key: "channelName",
          align: "center",
          minWidth: 100
        },
        {
          title: "通道类型",
          key: "channelTypeName",
          align: "center",
          minWidth: 100
        },
        {
          title: "调用次数",
          key: "allCount",
          align: "center",
          minWidth: 100
        },
        {
          title: "成功次数",
          key: "successCount",
          align: "center",
          minWidth: 100
        },
        {
          title: "失败次数",
          key: "failCount",
          align: "center",
          minWidth: 100
        },
        {
          title: "其他",
          key: "otherCount",
          align: "center",
          minWidth: 80
        },
        {
          title: "正确率",
          key: "successRate",
          align: "center",
          minWidth: 80
        },
        {
          title: "优先级",
          key: "grade",
          align: "center",
          minWidth: 80,
          render(h, params) {
            let grade = params.row.grade;
            return h("span", {}, grade == 1 ? "高" : "低");
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let status = params.row.status;
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px"
                  }
                },
                status == 0 ? "停用" : "启用"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          fixed: 'right',
          render: (h, params) => {
            let status = params.row.status;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: status == 0 ? "success" : "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let channelConfigCode = params.row.channelConfigCode 
                      if(status == 1) {
                        this.stopStart({status: 0,channelConfigCode: channelConfigCode },'确认停用该通道吗？')
                      } else {
                        this.stopStart({status: 1,channelConfigCode: channelConfigCode },'确认启用该通道吗？')
                      }
                    }
                  }
                },
                status == 1 ? "停用" : "启用"
              ),
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
                      this.adjustment = true
                      let channelTypeKey  = params.row.channelTypeKey  
                      this.adjustmentC({channelTypeKey :channelTypeKey,grade : ""})
                    }
                  }
                },
                "调整"
              )
            ]);
          }
        }
      ],
      data10: [],
      adjustmentTbale: [
        {
          title: "通道名称",
          key: "channelName",
          align: "center",
          minWidth: 100
        },
        {
          title: "通道类型",
          key: "channelTypeName",
          align: "center",
          minWidth: 100
        },
        {
          title: "优先级",
          key: "grade",
          align: "center",
          minWidth: 80,
          render(h, params) {
            let grade = params.row.grade;
            return h("span", {}, grade == 1 ? "高" : "低");
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 120,
          align: "center",
          fixed: 'right',
          render: (h, params) => {
            let grade = params.row.grade;
            let adjustmentListL = {}
            if (grade == 1) return
            return h("div", [
              h(
                "img",
                {
                  attrs:{
                    src: require("../../image/up@2x.png"),
                  },
                  style: {
                    width: "35px",
                    height: "35px"
                  },
                  on: {
                    click: () => {
                      // 1高 2低 this.adjustmentList(当前表格数据list)
                      let list =  params.row //高低判断
                      this.adjustmentList.forEach(v => {
                        if(v.channelConfigCode == list.channelConfigCode) {
                          v.grade = 1
                        } else {
                          v.grade = 2
                        }
                      });
                    }
                  }
                },
                "hh"
              )
            ]);
          }
        }
      ],
      adjustmentList:[],
      loanstatus: [],
      adjustmentYy:""
    };
  },
  methods: {
    Stime(v){
      this.beginTime = v
    },
    Etime(v){
      this.endTime = v
    },
    // 信贷机构 查询
    mechanisminqury() {
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
          this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
          });
          return false;
      }
      if(this.beginTime == " " || this.endTime == ""){
        this.sameMonth()
      }
      this.loading3 = true;
      let data = Object.assign({
        channelName: this.passagewayName, //通道名称
        channelTypeKey: this.passagewayType == "''" ? "" : this.passagewayType, // 通道类型
        beginTime: this.beginTime+" "+"00:00:00", //开始时间
        endTime: this.endTime+" "+"23:59:59", // 结束时间
        callCount: this.callFrequency, //调用次数
        filter: true
      });
      this.post("/loan/channelConfig/queryChannelConfigList",
        data,
        resp => {
          if (resp.code == "success") {
            const {channelConfigList,keyValueBeanList} = resp.data
            this.data10 = channelConfigList
            this.loanstatus = keyValueBeanList[0].data
            this.loanrecommend = keyValueBeanList[1].data
            this.loading3 = false;
            return false;
          } else {
            this.loading3 = false;
          }
        },
        err => {
          console.log(err);
          this.loading3 = false;
        }
      );
    },
    // 停启用确定判断
    stopStart(data, text) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>" + text + "</p>",
        onOk: () => {
          this.post('/loan/channelConfig/updateChannelConfigByCode',data,resp=>{
            if(resp.code == "success"){
              this.mechanisminqury()
            } else {
              this.$Message.error(data.message)
            }
          },err=>{console.log(err)})
        },
        onCancel: () => {}
      });
    },
    // 调整确认
    adjustmentOk() {
      if(this.adjustmentYy == ""){
         this.$Message.error("请填写调整原因")
         this.changeLoading()
      } else if(this.adjustmentYy.length > 200){
         this.$Message.error("调整原因不能大于200个字")
         this.changeLoading()
      } else {
        this.post("/loan/channelConfig/batchUpdateChannelGrade",{reason  : this.adjustmentYy ,channelExchangeReqList : this.adjustmentList},data=>{
          if(data.code == "success"){
            this.$Message.success("调整成功")
            this.adjustment = false
            this.changeLoading()
            this.adjustmentYy = ""
            this.mechanisminqury()
          } else {
            this.adjustmentYy = ""
            this.$Message.error(data.message)
            this.adjustment = false
            this.changeLoading()
          }
        },err=>{
          this.$Message.error(data.message)
          this.adjustment = false
          this.changeLoading()})
      }
    },
    adjustmentCancel() {this.adjustmentYy = ""},
    // 查看日志
    lookJournal(){
      this.$router.push({
        path:
          "./operationLog?operationType=real_name_channel_config_edit&activityCode=" +
          this.$route.query.activityCode
      });
    },
    // journalOk(){},
    // journalCancel(){},
    // 调整列表
    adjustmentC(list){
      this.post("/loan/channelConfig/queryChannelListByType",list,data=>{
        if(data.code == "success"){
          this.adjustmentList = []
          data.data.map((v,i)=>{
            if( v.grade == 1){
              this.adjustmentList.unshift(v)
            } else  {
              this.adjustmentList.push(v)
            }
          })
        } else {
          this.$Message.error(data.message)
        }
      },err=>{console.log(err)})
    },
    post(httpUrl, params, callback, errback) {
      this.http
        .post(BASE_URL+ httpUrl, params)
        .then(data => {
          return callback(data);
        })
        .catch(err => {
          errback(err);
        });
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 默认当月时间
    sameMonth(){
      this.beginTime = untils.getNowDate(0)[1]+"-01"
      this.endTime = untils.getNowDate(0)[0]
    }
  },
  created() {
    // 当前时间
    this.sameMonth()
    this.mechanisminqury();
  }
};
</script>
<style>
.chakan {
  text-align: center;
}
</style>

