<template>
    <div>
       <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;微信二维码审核</span>
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
                <li>
                  <Input class="mr20"  v-model="username" placeholder="请输入姓名"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <Input v-model="userphone" placeholder="请输入手机号"  style="width: 150px">
                  </Input>
                </li>
                <li class="mr20">
                  <DatePicker type="date" :options="options3" v-model="beginTime" placeholder="开始时间"
                  style="width: 150px"></DatePicker>
                  <span>  -  </span>
                  <DatePicker type="date" :options="options3" v-model="endTime" placeholder="结束时间"
                  style="width: 150px"></DatePicker>
                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading3" @click="queryList(1)">
                    <span v-if="!loading3">查询</span>
                    <span v-else>查询</span>
                  </Button>
                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading2" @click="examine(1)">
                      批量通过
                  </Button>
                </li>
                <li class="right">
                  <Button type="info" class="right mr20 w90" :loading="loading1" @click="examine(2)">
                      批量拒绝
                  </Button>
                </li>
              </ul>
            </div>
            <div id="application_table" class="mt15">
            <Table border highlight-row :columns="columns" :data="data1"  @on-selection-change="requires"></Table>
            </div>
            <div class="tr mt15">
            <Page :total="total" :page-size="endRow" :current="startRow"  @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
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
    data(){
        return{
            imglink:'',
            modal11:false,
            loading2:false,
            loading1:false,
            registersheng:'',
            registercitys:[],
            registershi:'',
            registercityh:[],
            username:'',
            userphone:'',
            options3: {
              disabledDate(date) {
                return date && date.valueOf() > Date.now();
              }
            },
            columns:[
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "",
                    align: "center",
                    minWidth: 160,
                    render:(h,params)=>{
                      return h('div',{
                        style:{
                          cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                              this.todetail(params.row.storeCode)
                            }
                          }
                      },params.row.name)
                    }
                },
                {
                    title: "手机号",
                    key: "phone",
                    align: "center",
                    minWidth: 150,
                    render:(h,params)=>{
                      return h('div',{
                        style:{
                          cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                              this.todetail(params.row.storeCode)
                            }
                          }
                      },params.row.phone)
                    }
                },
                {
                    title: "区域",
                    key: "userPhone",
                    align: "center",
                    minWidth: 150,
                    render:(h,params)=>{
                      return h('span',params.row.adNameFirst + ' ' +params.row.adNameSecond)
                    }
                },
                {
                    title: "提交时间",
                    key: "dataModifiedTime",
                    align: "center",
                    minWidth: 180
                },
                {
                    title: "微信ID",
                    key: "weixinNumber",
                    align: "center",
                    minWidth: 150
                },
                {
                    title: "微信二维码",
                    key: "userPhone",
                    align: "center",
                    minWidth: 150,
                    render:(h,params)=>{
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
                },
                {
                  title: "操作",
                  key: "userPhone",
                  align: "center",
                  minWidth: 150,
                  render:(h,params)=>{
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
                              this.queryall=[]
                              this.queryall.push({
                                storeCode:params.row.storeCode,
                                managerCode:params.row.managerCode,
                                weixinImg:params.row.weixinImg
                              })
                              this.examine(1)
                            }
                          }
                        },
                        "通过"
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
                              this.queryall=[]
                              this.queryall.push({
                                storeCode:params.row.storeCode,
                                managerCode:params.row.managerCode,
                                weixinImg:params.row.weixinImg
                              })
                              this.examine(2)
                            }
                          }
                        },
                        "拒绝"
                      )
                    ]);
                  }
                },
            ],
            data1:[],
            beginTime:'',
            queryall:[],
            endTime:'',
            loading3:false,
            total:0,
            endRow:10,
            startRow:1
        }
    },
    methods:{
        todetail(storeCode){
          this.$router.push('/vShodetails?storeCode='+storeCode)
        },
        queryList(starow){
          let date1 = Date.parse(new Date(this.beginTime))/1000
          let date2 = Date.parse(new Date(this.endTime))/1000
          if (date1 > date2) {
            this.loading3 = false
            this.$Modal.warning({
              title: '时间',
              content: '<p>开始时间不得大于结束时间</p>'
            })
            return false
          }
          this.loading3 = true
          let data= {
            adCodeFirst:this.registersheng,
            adCodeSecond:this.registershi,
            name:this.username,
            phone:this.userphone,
            pageNum:starow,
            pageSize: this.endRow,
            beginTime:this.beginTime == ""? "": utils.formatDate(this.beginTime, "yyyy-MM-dd hh:mm:ss"),
            endTime:this.endTime == ""? "": utils.formatDate(this.endTime, "yyyy-MM-dd 23:59:59")
          }
          this.http.post(BASE_URL+'/vshop/storeQrCheck/queryPage',data)
          .then(data=>{
            if(data.code=='success'){
              this.loading3 = false
              this.data1 = data.data.dataList
              this.total = Number(data.data.total)
              this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
            }else{
              this.loading3 = false
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        pageChange(starow){
          this.startRow = starow
				  this.queryList(starow)
        },
        PageSizeChange(endrow){
          this.startRow = 1
          this.endRow = endrow
          this.queryList(1)
        },
        examine(checkState){
          if(!this.queryall.length){
              this.$Message.warning('请选择要审核数据')
              return false
          }
          let data = {
            updateUserName:utils.getCookie('user'),
            updateUserCode:utils.getCookie('userCode'),
            storeQrCheckUpdateReqList:this.queryall,
            checkState:checkState,
          }
          if(checkState==1){
             this.$Modal.success({
							title:'审核通过',
							content: "<p>确认通过审核？</p>",
							onOk: () => {
                this.audit(1,data)
                this.queryall=[]
							}
            });
          }else{
            this.$Modal.success({
							title:'拒绝',
							content: "<p>确认拒绝通过？</p>",
							onOk: () => {
                this.audit(2,data)
                this.queryall=[]
							}
            })
          }
        },
        audit(checkState,data){
            this.http.post(BASE_URL+'/vshop/storeQrCheck/updateByCode',data)
              .then(data=>{
              if(data.code=='success'){
                if(checkState==1){
                  this.$Message.success('审核通过')
                  this.queryList(1)
                }else{
                  this.$Message.success('拒绝成功')
                  this.queryList(1)
                }
              }
            })
          },
        requires(item){
          this.queryall=[]
          for(var i=0;i<item.length;i++){
            this.queryall.push(
              {
                storeCode:item[i].storeCode,
                managerCode:item[i].managerCode,
                weixinImg:item[i].weixinImg
              }
            )
          }
        },
        registers(v) {
          let data = {
              data: v
          };
          this.httpshi(data);
          this.registersheng = v;
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
         //市接口
        httpshi(data) {
            this.http.post(BASE_URL + "/loan/hotcity/queryCityAddressList", data).then(data => {
                this.registercityh = data.data || "";
            });   
        }
    },
    mounted(){
        this.queryList(1)
        this.http.get("../../../static/city.json").then(data => {
            this.registercitys = data;
        });
    }
}
</script>