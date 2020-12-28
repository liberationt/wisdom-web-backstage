<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;用户身价设置列表</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <Button type="info" class='mr20 ' shape="circle" icon="plus-round" @click="send(1)">设置用户身价</Button>
              <Button type="info" class='mr20 ' shape="circle" icon="plus-round" @click="send(2)">设置特定用户身价</Button>
              <ul class="querysty mt15">
                  <li>
                      <Select v-model="typeCode" placeholder="请选择身价类型" style="width:150px" @on-change="typeChange" class="mr20">
                          <Option value="">身价类型</Option>
                          <Option v-for="item in typeList" :value="item.confType" :key="item.confType">
                              {{ item.confTypeName }}
                          </Option>
                      </Select>
                  </li>
                  <li>
                    <Select v-model="models" @on-change="citys" class="mr20" placeholder="请选择省" style="width:150px;margin-left:20px">
                        <Option v-for="item in cityType" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li>
                    <Select v-model="modelshi" @on-change="cityh" class="mr20" placeholder="请选择市" style="width:150px;">
                        <Option v-for="item in cityTypel" :value="item.adcode" :key="item.adcode">{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
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
import utils from "../../utils/utils";
export default {
  data() {
    return {
      typeCode: "",
      typeList: [],
      loading3: false,
      columns: [
          {
          title:"标题",
          key: "socialTitle",
          align: "center",
          minWidth: 200
        },
        {
          title:'身价类型',
            key:'confTypeName',
            align:'center',
            minWidth:150
        },
        {
          title: "城市",
          key: "cityName",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
						return h('div', [
						h('span', {
							style: {
							display: 'inline-block',
							width: '100%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
							},
							domProps: {
							title: params.row.cityName+(params.row.cityName.length>=402?'...':'')
							}
						}, params.row.cityName)
						])
						}
        },
        {
          title: "城市数量",
          key: "cityCount",
          align: "center",
          minWidth: 100
        },
        {
          title: "身价范围",
          key: "socialScope",
          align: "center",
          minWidth: 180
        },
        {
          title: "更新时间",
          key: "dataModifiedTime",
          align: "center",
          minWidth: 160
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
          render:(h,params)=>{
            let arr =[]
            arr.push(
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        if (params.row.confType == 0) {
                          if (params.row.defaultConf == 0) {
                            this.$router.push({ path: "./creditValue?cityshow=1&socialConfigCode="+params.row.socialConfigCode+"&operationtype=1"});  
                          } else {
                            this.$router.push({ path: "./creditValue?cityshow=0&socialConfigCode="+params.row.socialConfigCode+"&operationtype=1"});  
                          }                         
                        } else {
                          if (params.row.defaultConf == 0) {
                            this.$router.push({ path: "./specificStatus?cityshow=1&socialConfigCode="+params.row.socialConfigCode+"&operationtype=1"});  
                          } else {
                            this.$router.push({ path: "./specificStatus?cityshow=0&socialConfigCode="+params.row.socialConfigCode+"&operationtype=1"});  
                          } 
                        }
                          
                      }
                    }
                  },
                  '查看'
                ),
                h(
                  'Button',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on:{
                      click:()=>{
                        if (params.row.confType == 0) {
                          if (params.row.defaultConf == 0) {
                            this.$router.push({ path: "./creditValue?cityshow=1&socialConfigCode="+params.row.socialConfigCode+"&operationtype=2"});  
                          } else {
                            this.$router.push({ path: "./creditValue?cityshow=0&socialConfigCode="+params.row.socialConfigCode+"&operationtype=2"});  
                          }                         
                        } else {
                          if (params.row.defaultConf == 0) {
                            this.$router.push({ path: "./specificStatus?cityshow=1&socialConfigCode="+params.row.socialConfigCode+"&operationtype=2"});  
                          } else {
                            this.$router.push({ path: "./specificStatus?cityshow=0&socialConfigCode="+params.row.socialConfigCode+"&operationtype=2"});  
                          } 
                        }
                          
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  attrs: {
											disabled: params.row.defaultConf == 0&&params.row.cityCount == 0 ? false : true
										},
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.delete (params.row.socialConfigCode)                     
                    }
                  }
                },
                '删除'
              )
            )
            return h('div',arr)
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 20,
      models:"",//省
      modelshi:"",//市
      cityType:[],
      cityTypel:[],
    };
  },
  methods: {
    typeChange(typeCode) {
      this.typeCode = typeCode;
    },
    pageChange(pageNumber) {
      this.startRow = pageNumber;
      this.queryList(pageNumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
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
    //市接口
    httpshi(data) {
        this.http.post(BASE_URL + "/loan/hotcity/queryCityAddressList", data).then(data => {
            this.cityTypel = data.data || "";
        });   
    },
    //删除
    delete(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要删除?</p>",
            onOk: () => {
              let data = {
                socialConfigCode:pushCode
              }
                this.http.post(BASE_URL+'/loan/loanSocialConfig/deleteByCode',data)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('删除成功')
                      this.queryList(1)                     
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }) 
    },
    //终止
     termination(pushCode){
        this.$Modal.confirm({
            title: "温馨提示",
            content: "<p>确认要终止?</p>",
            onOk: () => { 
                let urls 
                urls = '/loan/push/hz/stop?pushCode='+pushCode
                this.http.post(BASE_URL+urls)
                .then(data=>{
                    if(data.code=='success'){
                      this.$Message.success('操作成功')
                      this.queryList(1)                     
                    }else{
                        this.$Message.error(data.message)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }) 
    },
    //查询
    queryList(startRow) {
      this.loading3 = true;
      let data ={
        confType : this.typeCode,//身价类型
        provinceCode:this.models,//省code
        cityCode:this.modelshi,//市code
        pageNum:startRow,
        pageSize:this.endRow
      }
      this.http.post(BASE_URL+'/loan/loanSocialConfig/queryPage',data).
      then(data=>{
        if(data.code=='success'){
          this.data1 = data.data.dataList
          this.total = data.data.total
           Math.ceil(data.data.startRow / this.endRow1) == 0
            ? 1 : Math.ceil(data.data.startRow / this.endRow1);
          this.loading3 = false
        }else{
          this.loading3 = false
        }
      }).catch(err=>{
        this.loading3 = false
        console.log(err)
      })
    },
    //添加
    send(num) {
      if (num == 1) {
        this.$router.push({ path: "./creditValue?cityshow=1" });  
      } else {
        this.$router.push({ path: "./specificStatus?cityshow=1" });  
      }
      
    }
  },
  mounted(){
    
    this.http.post(BASE_URL+'/loan/loanSocialConfig/getSocialConfigBase')
    .then(data=>{
      if(data.code=='success'){
        this.typeList = data.data.list
      }else{
        this.$Message.error(data.message)
      }
    }).catch(err=>{
      console.log(err)
    })
    this.http.get("../../../static/city.json").then(data => {
        this.cityType = data;
        this.cityType1 = data;
        this.queryList(1)  
    });

    
  }
};
</script>
<style lang="less">
</style>