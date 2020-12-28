<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;待审核退单列表</span>
        </p>
      </div>
      <div class="contentcss clearfix">
        <div class="left">
          <ul class="querysty">
            <li>
              <Input v-model="officerName" class="mr20" placeholder="请输入姓名" style="width: 150px"></Input>
            </li>
            <li>
              <Input v-model="officerPhone" class="mr20" placeholder="请输入手机号" style="width: 150px"></Input>
            </li>
            <li>
              <Select v-model="order" @on-change="orderChange" placeholder="订单类型" style="width:150px;" class="mr10">
                <Option v-for="item in orderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <Select v-model="sign" @on-change="signChange" placeholder="操作次数" style="width:150px;" class="mr10">
                <Option v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <DatePicker type="date" :options="options3" :value="beginTime" @on-change="beginTimeChange" placeholder="申请退单开始时间"
                        style="width: 150px"></DatePicker>
                <span>  -  </span>
              <DatePicker type="date" class='mr10' :options="options3" :value="endTime" @on-change="endTimeChange" placeholder="申请退单结束时间"
                    style="width: 150px"></DatePicker>
            </li>
            <li>
              <Select v-model="province" @on-change="provinceChange" placeholder="请选择省" style="width:150px;" class="mr10">
                <Option v-for="item in provinceList" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
              <Select v-model="city" placeholder="请选择市" @on-change="citys" style="width:150px" class="mr10">
                <Option v-for="item in cityList" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
              </Select>
            </li>
            <li>
                <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                </Button>
            </li>
          </ul>
        </div>
      </div>

      <div id="application_table " class="contentcss mt10">
          <Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
          <div class="tr mt15">
              <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
          </div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        officerName:'',
        officerPhone:'',
        order:'',
        sign:'',
        orderList:[],
        signList:[
          {label:'全部',value:""},
          {label:'0',value:'0'},
          {label:'1',value:'1'},
          {label:'2',value:'2'},
          {label:'3次及以上',value:'3'},
        ],
        beginTime:'',
        endTime:'',
        province:'',
        provinceList:[],
        city:'',
        cityList:[],
        loading3:false,
        options3: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        columns:[
          {
            title: "抢单时间",
            key: "orderCreateTime",
            align: "center",
            minWidth: 180
          },
          {
            title: "抢单编号",
            key: "orderNum",
            align: "center",
            minWidth: 200
          },
          {
            title: "订单类型",
            key: "goodStatusName",
            align: "center",
            minWidth: 120
          },
          {
            title: "区域",
            key: "",
            align: "center",
            minWidth: 120,
            render: (h, params) => {
              let orderCityNameFirst  =
                params.row.orderCityNameFirst  == ""
                  ? "-"
                  : params.row.orderCityNameFirst ;
              let orderCityNameSecond  =
                params.row.orderCityNameSecond  == ""
                  ? "-"
                  : params.row.orderCityNameSecond ;
              return h("span", orderCityNameFirst + " " + orderCityNameSecond);
            }
          },
          {
            title: "客户姓名",
            key: "loanUserName",
            align: "center",
            minWidth: 120
          },
          {
            title: "手机",
            key: "loanUserPhone",
            align: "center",
            minWidth: 150
          },
          {
            title: "信贷员姓名",
            key: "officerName",
            align: "center",
            minWidth: 120
          },
          {
            title: "信贷员手机号",
            key: "officerPhone",
            align: "center",
            minWidth: 150
          },
          {
            title: "抢单费用",
            key: "robbingAmount",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              let pushStatus = []
              let payType = params.row.payType
              let row = params.row
              if (row.activityAmount == row.robbingAmount) {
                pushStatus.push (
                  h('span', {}, payType == 0 ?  row.robbingAmount :  row.robbingAmount+'/'+ row.ticketNumber+'张券')
                )
              } else {
                pushStatus.push (
                  h('span', {style: {color: '#BEBEBE'}}, row.robbingAmount),
                  h('span', {}, '/'),
                  h('span', {}, payType == 0? row.activityAmount : row.activityAmount+'/'+ row.ticketNumber+'张券'),
                )
              }         
              return h('div', pushStatus)
            }
          },
          {
            title: "退单金额",
            key: "chargebackMoney",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style:{
                      marginRight:'5px'
                    }
                  },
                  params.row.chargebackMoney
                ),
                h(
                  "span",
                  params.row.chargebackType=='0'? '赞豆':'抢单券'
                ),
              ]);
            }
          },
          {
            title: "申请退单时间",
            key: "chargebackTime",
            align: "center",
            minWidth: 180
          },
          {
            title: "申请人",
            key: "applyForPerson",
            align: "center",
            minWidth: 120
          },
          {
            title: "订单状态",
            key: "auditStatus",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              let auditStatus = params.row.auditStatus
              if(auditStatus=='0'){
                auditStatus='待审核'
              }
              if(auditStatus=='1'){
                auditStatus='审核成功'
              }
              if(auditStatus=='2'){
                auditStatus='审核失败'
              }
              return h("span", auditStatus);
            }
          },
          // {
          //   title: "操作标记",
          //   align: "center",
          //   minWidth: 120,
          //   render: (h, params) => {
          //     let auditStatus = params.row.auditNum
          //     if(auditStatus=='0'){
          //       auditStatus='未操作'
          //     }else{
          //       auditStatus='已操作'
          //     }
          //     return h("span", auditStatus);
          //   }
          // },
          {
            title: "操作次数",
            key: "auditNum",
            align: "center",
            minWidth: 120
          },
          {
            title: "备注",
            key: "chargebackRemark",
            align: "center",
            minWidth: 200,
            render: (h, params) => {
              return h("div", 
                  {
                    style: {
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    },
                    domProps: {
                      title: params.row.chargebackRemark
                    }
                  },
                  params.row.chargebackRemark
              );
            }
          },
          {
            title: "操作",
            key: "",
            align: "center",
            minWidth: 120,
            fixed:'right',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push('/cancellationDetails?orderCode='+params.row.orderCode+'&frequency='+this.sign)
                      }
                    }
                  },
                  "审核"
                ),
              ]);
            }
          },
        ],
        data1:[],
        startRow:1,
        endRow:10,
        total:0,
      }
    },
    methods:{
      orderChange(order){
        this.order = order
      },
      signChange(sign){
        this.sign = sign
      },
      beginTimeChange(beginTime){
        this.beginTime = beginTime
        if(this.beginTime==''){
          this.beginTime = beginTime
        }else{
          this.beginTime+=' 00:00:00'
        }
      },
      endTimeChange(endTime){
        this.endTime = endTime
        if(this.endTime==''){
          this.endTime = endTime
        }else{
          this.endTime+= ' 23:59:59'
        }
        
      },
      //省
      provinceChange(province){
        // this.province = province
        let data = {
          "data": province
        }
        this.cityshi(data)
      },
      //市
      cityshi(data){
        this.http.post(BASE_URL+"/loan/hotcity/queryCityAddressList",data).then(data=>{
          this.cityList = data.data
        })
      },
      citys(city){
        this.city = city
      },
      pagesizechange(endRow){
       this.startRow=1
        this.endRow = endRow
        this.queryList(1)
      },
      pageChange(startRow){
        this.startRow = startRow
        this.queryList(startRow)
      },
      queryList(startRow){
        let date1 = Date.parse(new Date(this.beginTime)) / 1000;
        let date2 = Date.parse(new Date(this.endTime)) / 1000;
        if (date1 > date2) {
            this.$Modal.warning({
            title: "提示",
            content: "<p>开始时间不得大于结束时间</p>"
            });
            return false;
        }
        this.loading3=true;
        let data ={
          beginTime:this.beginTime,
          endTime:this.endTime,
          loanAdCodeFirst:this.province,
          loanAdcode:this.city,
          pageNum :startRow,
          optionType:this.sign=='-1'?"":this.sign,
          pageSize:this.endRow,
          orderType:this.order=='-1'?"":this.order,
          officerName:this.officerName,
          officerPhone:this.officerPhone
        }
        this.http.post(BASE_URL+'/loan/chargebackOrder/getChargeBackOrderListPage',data)
        .then(data=>{
          if(data.code=='success'){
            this.loading3=false
            this.data1 = data.data.dataList
            this.total = data.data.total;
            this.startRow =
            Math.ceil(data.data.startRow / this.endRow) == 0
              ? 1
              : Math.ceil(data.data.startRow / this.endRow);
          }else{
            this.loading3=false
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    // 省
    created () {
      this.http.get('../../../static/city.json').then(data=>{
        this.provinceList = data
      })
      if (this.$route.query.frequency) {
         this.sign = this.$route.query.frequency       
       }
      this.queryList(1)
    },
     mounted(){
       this.http.post(BASE_URL+'/loan/chargebackOrder/queryChargeBackOrderListFilter',{})
       .then(data=>{
         if(data.code=='success'){
          this.orderList = data.data.orderTypeList
          // this.orderList.unshift({label:'全部',value:'-1'})
         }
       })
     }
}
</script>
<style lang="less" scoped>

</style>