<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;甩单详情</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="rejection_detail">
                <div class="colorH">
                    <div>
                        <span>甩单时间： </span>
                        <span>{{dataList.submitTime}}</span>
                    </div>
										 <div v-if="dataList.swingStatus == 2 ||dataList.swingStatus == 3||dataList.swingStatus == 6||dataList.swingStatus == 4">
                        <span>审核时间： </span>
                        <span>{{dataList.auditTime}}</span>
                    </div>
										 <div v-if="dataList.swingStatus == 4">
                        <span>完成时间： </span>
                        <span>{{dataList.finishTime}}</span>
                    </div>
										 <div v-if="dataList.swingStatus == 5">
                        <span>废弃时间： </span>
                        <span>{{dataList.outTime}}</span>
                    </div>
                </div>
                <div class="divright">
                    <ul>
                        <li>
                            <span>订单编号 ： </span>
                            <span>{{dataList.swingOrderNo}}</span>
                        </li>
                        <li>
                            <span>订单状态 ： </span>
                            <span>{{dataList.swingStatusName}}</span>
                        </li>
                        <li>
                            <span>订单类型 ： </span>
                            <span>{{dataList.swingTitleTypeName }}</span>
                        </li>
                        <li>
                            <span>接单金额 ： </span>
                            <span>{{dataList.swingOrderSum}}</span>
                        </li>
                        <li>
                            <span>信贷员姓名 ： </span>
                            <span>{{dataList.loanOfficerName}}</span>
                        </li>
                        <li>
                            <span>信贷员手机号 ： </span>
                            <span>{{dataList.loanOfficerPhone}}</span>
                        </li>
                        <li>
                            <span>甩单详情 ： </span>
                            <span>{{dataList.swingDetail}}</span>
                        </li>
                        <li>
                            <span>贷款类型 ： </span>
                            <span>{{dataList.swingLoanTypeName}}</span>
                        </li>
                        <li>
                            <span>申请贷款金额 ： </span>
                            <span>{{dataList.loanAmount}}万</span>
                        </li>
                        <li>
                            <span>贷款期限 ： </span>
                            <span>{{dataList.loanTimeLimit}}个月</span>
                        </li>
                        <li>
                            <span>贷款地点 ： </span>
                            <span>{{dataList.loanCityNameFirst}}&nbsp&nbsp{{dataList.loanCityNameSecond}}</span>
                        </li>
                        <li v-if="dataList.swingStatus != 1">
                            <span>锁定信贷员 ： </span>
                            <span>{{dataList.lockOfficerName}} &nbsp&nbsp {{dataList.lockOfficerPhone}}</span>
                        </li>
                        <li v-if="dataList.swingStatus != 1">
                            <span>审核人 ： </span>
                            <span>{{dataList.auditName}}</span>
                        </li>
                        <li v-if="dataList.swingStatus != 1">
                            <span>审核备注 ： </span>
                            <span>{{dataList.failureMessage}}</span>
                        </li>
                        <li>
                            <span>接单人数 ： </span>
                            <span>{{dataList.orderReceivingCount}}</span>
                        </li>
												<li v-for="item in dataList.baseInfoDetailResList">
                            <span>{{item.titleName}} ： </span>
                            <span>{{item.optionName}}</span>
                        </li>
												 
												<li v-for="item in dataList.propertyInfoDetailResList">
                            <span>{{item.titleName}} ： </span>
                            <span>{{item.optionName}}</span>
                        </li>
                    </ul>
                    <div style="margin-top:60px;">
                      <Button type="info" v-if="dataList.swingStatus == 1" @click="confirmTips('确认通过吗？',1)" class=" ml20 w100">通过</Button>
                      <Button type="info" v-if="dataList.swingStatus == 1" @click="confirmTips('确认拒绝吗？',2)" class=" ml20 w100">拒绝</Button>
                      <Button type="info" v-if="dataList.showFinish == 1" @click="confirmTips('确认标记完成？',3)" class=" ml20 w100">标记订单完成</Button>
                      <Button type="info" v-if="dataList.showOut == 1" @click="confirmTips('确认废弃该订单？',4)" class=" ml20 w100">废弃订单</Button>
                      <Button type="info" class=" ml20 w100" @click="lookJournal">查看操作日志</Button>
                      <Button type="default" class=" ml20 w90" @click="backingout">返回</Button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 拒绝 -->
        <Modal v-model="modal2" class-name="vertical-center-modal" :mask-closable="false">
          <p slot="header" style="text-align:left; padding-left:10px;">
            <span>确认拒绝吗？</span>
          </p>
          <div style="text-align:left">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">        
              <FormItem label="拒绝理由：" prop="standbyDesc">
                <Input v-model="formValidate.standbyDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入拒绝理由"></Input>
              </FormItem>
            </Form>           
          </div>
          <div slot="footer" >
            <Button type="default"  @click="modalclose('formValidate')">关闭</Button>
            <Button type="primary" @click="dialsub('formValidate')">确认拒绝</Button>
          </div>
        </Modal>
				<!-- 查看操作日志 -->
				<Modal
					v-model="JournalList"
					title="操作日志"
					ok-text="关闭"
					:mask-closable = false
          width=800
					@on-ok="Journalok">
					<Table border :columns="columns" :data="data1"></Table>
				</Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: {},
      JournalList: false,
      modal2:false,
      formValidate: {
        standbyDesc: ""
      },
      ruleValidate: {
      standbyDesc: [
        {
          required: true,
          message: "请填写拒绝理由，最多200字",
          trigger: "blur"
        },
        {
          type: "string",
          max: 200,
          message: "拒绝理由最多200字",
          trigger: "blur"
        }
        ]
      },
      columns: [
				{
          title: "操作时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作人",
          key: "operator",
          align: "center",
          minWidth: 80
        },
        {
          title: "操作内容",
          key: "viewText",
          align: "center",
          minWidth: 150
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          minWidth: 150
        },
      ],
      data1: []
    };
  },
  methods: {
    //确认框提示
    confirmTips(content, num) {
      if(num =='2'){
        this.modal2 = true
      }else{
      this.$Modal.confirm({
        title: "温馨提示",
        content: content,
        onOk: () => {
          switch (num) {
            case 1:
              this.confirm(num);
              break;
            case 4:
              this.discard();
              break;
            case 3:
              this.markCompletion();
              break;
          }
        },
        onCancel: () => {}
      });
    }
    },
    // 标记完成
    markCompletion() {
      this.httpUrl(
        "/loan/swingOrderBase/swingOrderBaseFinish",
        { swingOrderBaseCode: [this.$route.query.swingOrderBaseCode] },
        data => {
          if (data.code == "success") {
            this.$Message.success(data.message);
            this.details();
          } else {
            this.$Message.error(data.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 废弃订单
    discard() {
      this.httpUrl(
        "/loan/swingOrderBase/swingOrderBaseOver",
        { swingOrderBaseCode: [this.$route.query.swingOrderBaseCode] },
        data => {
          if (data.code == "success") {
            this.$Message.success("废弃成功");
            this.details();
          } else {
            this.$Message.error(data.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //关闭
    modalclose(name) {
      this.$refs[name].resetFields();
      this.modal2 = false;
      
    },
    //拒绝
    dialsub(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let data = {
            failureMessage: this.formValidate.standbyDesc,
            swingOrderBaseCode: [this.$route.query.swingOrderBaseCode],
            swingStatus: 6
          };
          this.http
            .post(BASE_URL + "/loan/swingOrderBase/auditSwingBaseOrder", data)
            .then(data => {
              if (data.code == "success") {
                this.modal2 = false
                this.$Message.success("拒绝通过完成");
                this.$refs[name].resetFields();
                this.details();
              } else {
                this.$Message.error(data.message);
                this.$refs[name].resetFields();
              }
            })
            .catch(err => {
              this.$refs[name].resetFields();
              console.log(err);
             
            });
        }
      });
    },
    // 确认通过
    confirm(num) {
      let list = {
        swingOrderBaseCode: [this.$route.query.swingOrderBaseCode],
        swingStatus: num == 1 ? 2 : 6
      };
      this.httpUrl(
        "/loan/swingOrderBase/auditSwingBaseOrder",
        list,
        data => {
          if (data.code == "success") {
            this.$Message.success("已通过");
            this.details();
          } else {
            this.$Message.error(data.message);
            this.details();
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //详情
    details() {
      this.http
        .post(BASE_URL + "/loan/swingOrderBase/getSwingOrderDetail", {
          data: this.$route.query.swingOrderBaseCode
        })
        .then(data => {
          console.log(data);
          if (data.code == "success") {
            this.dataList = data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看操作日志
    lookJournal() {
			this.JournalList = true
			this.httpUrl("/loan/swingOrderBase/queryLogPage",{loanSwingBusinessCode :this.$route.query.swingOrderBaseCode},data=>{
				if(data.code == "success"){
					this.data1 = data.data.dataList
				}
			},err=>{console.log(err)})
		},
    Journalok() {},
    // 返回
    backingout() {
      window.history.go(-1);
    },
    httpUrl(url, data, callback, errback) {
      this.http
        .post(BASE_URL + url, data)
        .then(data => {
          return callback(data);
        })
        .then(err => {
          return errback(err);
        });
    }
  },
  created() {
    this.details();
  }
};
</script>
<style lang="less" scoped>
.colorH {
  color: rgb(126, 124, 124);
  width:260px;
}
.rejection_detail {
  display: flex;
  .divright{
    flex:1
  };
  li {
    display: flex;
    margin-bottom: 10px;
    span:nth-of-type(1) {
      display: block;
      width: 120px;
      text-align: right;
    };
    span:nth-of-type(2){
      flex:1
    }
  }
}
</style>
