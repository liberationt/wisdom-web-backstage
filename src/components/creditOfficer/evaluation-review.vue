<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;   信贷员管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看评价详情</h3>
        <p>
            <span>评价时间:</span>
            <span>{{datatime}}</span>
        </p>
        <p>
            <span>订单时间:</span>
            <span>{{ordertime}}</span>
        </p>
        <p>
            <span>订单编号:</span>
            <span>{{ordercode}}</span>
        </p>
        <p>
            <span>服务费用:</span>
            <span>{{servicecharge}}</span>
        </p>
        <p>
            <span>所在区域:</span>
            <span>{{region}}</span>
        </p>
        <p>
            <span>客户姓名:</span>
            <span>{{username}}</span>
        </p>
        <p>
            <span>手机号:</span>
            <span>{{userphone}}</span>
        </p>
        <p>
            <span>贷款意向:</span>
            <span>{{loancontent}}</span>
        </p>
        <p>
            <span>贷款期限:</span>
            <span>{{loanterm}}</span>
        </p>
        <p>
            <span>实际贷款金额:</span>
            <span>{{loanmoney}}</span>
        </p>
        <p>
            <span>信贷员姓名:</span>
            <span>{{rilename}}</span>
        </p>
        <p>
            <span>信贷员手机:</span>
            <span>{{rilephone}}</span>
        </p>
        <p>
            <span>评价内容:</span>
            <Icon v-for="item in stars" type="ios-star" class="yellow1"></Icon>
            <p>
                <span v-for="item in pingjia" class="evaluation_grade">{{item}}</span>
                <!-- <span class="evaluation_grade ml5"></span> -->
            </p>
            <p>{{content}}</p>
        </p>
				<div v-if="!isPasssuccess" class="text">
					<p>
            <span>审核时间:</span>
            <span>{{shendate}}</span>
					</p>
					<p>
							<span>审核状态:</span>
							<span>{{isPasss}}</span>
					</p>
					<p>
							<span>审核人员:</span>
							<span>{{shnuserName}}</span>
					</p>
				</div>
        <div>
            <Button v-if="isPasssuccess" type="primary" @click="examine">确认审核通过</Button>&nbsp;&nbsp;&nbsp;&nbsp;
						<Button v-if="isPasssuccess" type="primary" @click="examineerror">审核失败</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="./evaluationManagement"><Button type="ghost">返回</Button></router-link>
        </div>
    </div>
</div>
</template>
<script>
export default {
	data(){
		return{
			isPasssuccess:true,
			datatime: '',
			ordertime: '',
			ordercode: '',
			servicecharge: '',
			region: '',
			username: '',
			userphone: '',
			loancontent: '',
			loanterm: '',
			loanmoney: '',
			rilename: '',
			rilephone: '',
			stars: '',
			content: '',
			shnuserName: '',
			isPasss: '',
			shendate: '',
			pingjia: ''
		}
	},
	methods: {
		examine(){
			this.http.post(BASE_URL + "/loan/comment/check",{commentCode : this.$route.query.commentCode,isPass:this.$route.query.isPass}).then(data=>{
				if(data.code == "success"){
						this.handleRender()
				} else {
					this.$Message.info(data.message)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		handleRender () {
      this.$Modal.success({
          title: '温馨提示',
          content: '<p>审核已通过</p>',
          onOk: () => {
						this.$router.push({ path: './evaluationManagement' })    
          },
          onCancel: () => {
              
          }
        })
		},
		// 审核失败
		examineerror(){
			this.http.post(BASE_URL + "/loan/comment/check",{commentCode : this.$route.query.commentCode,isPass:this.$route.query.isPass}).then(data=>{
				if(data.code == "success"){
					this.$Modal.error({
						title: '温馨提示',
						content: '<p>审核已失败</p>',
          onOk: () => {
						this.$router.push({ path: './evaluationManagement' })    
          },
          onCancel: () => {
              
          }
        })
				} else {
					this.$Message.info(data.message)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
	},
	created(){
		// alert(22)
		// console.log(this.$route.query.commentCode)
		this.http.post(BASE_URL + "/loan/comment/getByCommentCode", this.$route.query.commentCode).then(data=>{
			console.log(data)
			if(data.code == "success"){
				this.datatime = data.data.commentDetailBusRes.commentCreateTime 
				this.ordertime = data.data.commentDetailBusRes.orderCreateTime 
				this.ordercode = data.data.commentDetailBusRes.orderNum  
				this.servicecharge = data.data.commentDetailBusRes.serviceCost  
				this.region = data.data.commentDetailBusRes.orderArea
				this.username = data.data.commentDetailBusRes.loanUserName 
				this.userphone = data.data.commentDetailBusRes.loanUserPhone  
				this.loancontent = data.data.commentDetailBusRes.customerLoanAmount  
				this.loanterm = data.data.commentDetailBusRes.loanTimeLimit //期限
				this.loanmoney = data.data.commentDetailBusRes.customerActualLoanAmount //金额
				this.shnuserName = data.data.commentDetailBusRes.userName 
				this.rilephone = data.data.commentDetailBusRes.officerPhone  
				this.stars= data.data.commentDetailBusRes.stars 
				this.content= data.data.commentDetailBusRes.content 
				this.isPasss= data.data.commentDetailBusRes.isPass == 1? "审核成功": "审核失败"
				this.shendate = data.data.commentDetailBusRes.checkTime // 审核时间
				this.pingjia = data.data.tags
			}
		}).catch(err=>{
			console.log(err)
		})
		// 判读
		if(this.$route.query.isPass != "0"){
			this.isPasssuccess = false
		}
	}
}
</script>
<style lang="less" scoped>
#feedback_details{
    border: 1px solid #E7ECF1;
    padding: 30px 50px;
    h3{
        line-height: 50px;
        border-bottom: 1px solid #E7ECF1;
        margin-bottom: 20px;
    }
    p{
        line-height: 40px;
        padding-left: 50px
    }
    div{
        text-align: center;
        margin-top: 20px
    }
}
.evaluation_grade{
    display: inline-block;
    border: 1px solid #FF6600;
    line-height: 30px;
    padding: 0px 20px;
    color: #FF6600
}
.text {
	text-align: left !important;
}
</style>
