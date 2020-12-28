<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理>&nbsp;店铺管理>&nbsp;店铺详情</span>
          </p>
        </div>
        <div class="clearfix contentcss sales-statis">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="信贷员:" >
                  <span>{{dataobject.userName}} {{dataobject.phone}}</span>
                </FormItem>
                <FormItem label="区域:" >
                  <span>{{dataobject.area}}</span>
                </FormItem>
                <FormItem label="店铺名称:" prop="shopname">
                  <Input v-model="formValidate.shopname" placeholder="请输入店铺名称" style="width:240px"></Input>
                </FormItem>
                <FormItem label="店铺地址:"  prop="templatetype">
                  <span id="copyLink" name='elemurl'>{{dataobject.storeurl}} </span> <Button @click="copyLink" style="margin-left: 8px;width:60px">复制</Button>
                </FormItem>
                <!-- {{dataobject.storeurl}}  -->
                <FormItem label="创建时间:"  prop="posterTheme">
                  <span>{{dataobject.createTime}}</span>
                </FormItem>
                <FormItem label="店铺状态:" prop="shopStatus">
                    <Select v-model="formValidate.shopStatus" placeholder="请选择店铺状态" style='width:240px;'>
                        <Option v-for="item in shopStatusList" :value="item.shopStatusCode" :key="item.shopStatusCode">{{ item.shopStatusName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="微信号:" prop="wxNumber">
                    <Input v-model="formValidate.wxNumber" placeholder="请输入微信号" style="width:240px"></Input>
                </FormItem>
                <FormItem label="微信二维码:" prop="productlogo" v-if='weixinImg!=null&&weixinImg!=""'>
                    <img class="iconlabelUrl" :src="formValidate.labelUrl" alt="">
                    <Input v-model="formValidate.productlogo" disabled style="width: 80px;margin-top:24px" class="left ml5 hidden"></Input>
                    <Button @click="deleteImg" style="margin-left: 8px;width:60px">删除</Button>
                </FormItem>
                <FormItem label="店铺介绍:" prop="shopIntroduce">
                    <Input type="textarea" v-model="formValidate.shopIntroduce" placeholder="请输入店铺介绍" style="width:240px"></Input>
                </FormItem>
                <FormItem label="代理产品:">
                  <div>
                    <Table border highlight-row style="width:350px;" :columns="shopList" :data="shopData"></Table>
                  </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>保存</Button>
                    <Button type="primary" @click="operation" class="ml10" style='width:120px'>查看操作日志</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 10px;width:100px">返回</Button>
                </FormItem>
            </Form>
        <Modal
					v-model="operations"
					title="操作日志"
					ok-text="确定"
					:mask-closable = false
          width=800
					@on-ok="Journalok">
					<Table border :columns="columns" :data="data1"></Table>
          <div class="tr mt15">
          	<Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      		</div>
				</Modal>
        </div>
    </div>
</template>
<script>
import utils from '../../utils/utils';
export default {
  data() {
    return {
      total:0,
      startRow:1,
      endRow:10,
      weixinImg:'',
      title: "",
      operations:false,
      dataobject:{},
      shopStatusList: [
        { shopStatusCode: "1", shopStatusName: "有效" },
        { shopStatusCode: "0", shopStatusName: "无效" }
      ],
      formValidate: {
        productlogo: "",
        shopname: "",
        wxNumber: "",
        shopIntroduce: "",
        shopStatus: "1",
        labelUrl: require("../../image/moren.png")
      },
      columns:[
        {
          title: "操作时间",
          key: "dataCreateTime",
          minWidth: 140,
          align: "center",
        },
        {
          title: "操作人",
          key: "operator",
          minWidth: 160,
          align: "center"
        },
        {
          title: "操作内容",
          key: "content",
          minWidth: 160,
          align: "center"
        },
      ],
      data1:[],
      ruleValidate: {
        wxNumber: [
          { required: true, message: "请输入微信号", trigger: "change" },
          {required: true, message: '请输入正确微信号',pattern:/^\w{1,50}$/,trigger: 'change'}
        ],
        shopIntroduce: [
          { required: true, message: "请输入店铺介绍", trigger: "change" },
          {required: true, message: '店铺介绍最多30字', max:30,trigger: 'change'}
        ],
        shopname: [
          { required: true, message: "请输入店铺名称", trigger: "change" },
          {required: true, message: '店铺名称最多20字', max:20,trigger: 'change'}
        ]
      },
      shopList:[
        {
          title: "类型",
          key: "productType",
          minWidth: 140,
          align: "center",
          render:(h,params)=>{
            return h('span',params.row.productType=='0'?'贷款':(params.row.productType=='1'?'信用卡':'信贷工具'))
          }
        },
        {
          title: "名称",
          key: "productName",
          minWidth: 160,
          align: "center"
        },
      ],
      shopData:[],
    };
  },
  methods: {
    Journalok(){
      
    },
    pageChange(startRow){
      this.startRow = startRow
      this.operation(1,startRow)
		},
    pagesizechange(endRow){
      this.endRow = endRow
      this.operation(1,1)
    },
    operation(num,startRow){
      this.operations = true
      let data ={
        storeCode:this.$route.query.storeCode,
        pageNum:startRow,
        pageSize:this.endRow
      }
      this.http.post(BASE_URL+'/vshop/storeLog/queryPage',data)
      .then(data=>{
        if(data.code=='success'){
          this.data1 = data.data.dataList
          this.total = Number(data.data.total)
          this.startRow =
            Math.ceil(data.data.startRow / this.endRow) == 0
              ? 1
              : Math.ceil(data.data.startRow / this.endRow);
        }
      })
    },
    // 复制链接
    copyLink(){
      let Url2 = document.getElementById('copyLink')
      utils.copytext(Url2)
    },
    // 删除二维码
    deleteImg(){
      this.formValidate.labelUrl = require("../../image/moren.png")
      this.formValidate.productlogo = ''
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 保存模版
          let data = {
            storeCode:this.$route.query.storeCode,
            storeDesc:this.formValidate.shopIntroduce,
            storeName:this.formValidate.shopname,
            storeStatus:this.formValidate.shopStatus,
            weixinNumber:this.formValidate.wxNumber,
            weixinImg:this.formValidate.productlogo
          }
          this.http.post(BASE_URL+'/vshop/vshopStore/updateByCode',data)
          .then(data=>{
            if(data.code=='success'){
              this.$Message.success('保存成功')
              this.getdataobj()
            }
          })
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      window.history.go(-1)
    },
    getdataobj(){
      let data = {
        data: this.$route.query.storeCode
      };
      this.http.post(BASE_URL + "/vshop/vshopStore/getByCode", data)
      .then(data => {
        if (data.code == "success") {
          this.weixinImg = data.data.checkState
          this.dataobject = data.data
          this.formValidate.shopname = data.data.storeName
          this.formValidate.shopStatus = String(data.data.storeStatus)
          this.formValidate.wxNumber = data.data.weixinNumber
          this.formValidate.labelUrl = data.data.weixinImg?data.data.weixinImg:this.formValidate.labelUrl
          this.formValidate.productlogo = data.data.weixinImg?data.data.weixinImg:this.formValidate.productlogo
          this.formValidate.shopIntroduce =data.data.storeDesc
          this.shopData = data.data.productList.concat(data.data.proprietaryList)
        }
      });
    }
  },
  mounted() {
      this.getdataobj()
    
  }
};
</script>
<style lang="less" scoped>
.title {
  height: 60px;
  line-height: 60px;
  background: #fff;
  font-size: 20px;
  text-indent: 20px;
}
.ivu-form .ivu-form-item-label {
  text-align: justify !important;
}
.iconlabelUrl {
  width: 100px;
  height: 100px;
}
</style>