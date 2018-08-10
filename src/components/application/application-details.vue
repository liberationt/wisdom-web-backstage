<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;百姓钱袋&nbsp;>&nbsp;消息管理</span>
      </p>
    </div>
    <div id="feedback_details">
        <h3>查看反馈详情</h3>
        <p>
            <span>提交时间:</span>
            <span>{{sumtime}}</span>
        </p>
        <p>
            <span>用户手机号:</span>
            <span>{{userphone}}</span>
        </p>
        <p>
            <span>姓名:</span>
            <span>{{username}}</span>
        </p>
        <p>
            <span>反馈内容:</span>
            <span>{{content}}</span>
        </p>
        <div>
            <Button v-if="confirm" type="primary" @click="confirmview">确认已查看</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link :to="{path:'./applicationProposal',query: {ispage: this.$route.query.ispage}}"><Button type="ghost">返回</Button></router-link> 
        </div>
    </div>
</div>
</template>
<script>
import untils from '../../utils/utils'
export default {
  data() {
    return {
			confirm: false,
			sumtime: '',
			userphone: '',
			username: '',
			content: ''
		};
	},
	created(){
		if(this.$route.query.status == '0'){
			this.confirm = true
		} else {
			this.confirm = false
		}
		this.http.post(BASE_URL+'/loan/suggestionsFeedback/getSuggestionsFeedbackByCode',{data : untils.getCookie('code')}).then(data=>{
			if(data.code == 'success'){
				this.sumtime = data.data.dataCreateTime 
				this.userphone = data.data.userPhone 
				this.username = data.data.userName 
				this.content = data.data.contents 
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	methods:{
		confirmview(){
			this.http.post(BASE_URL+'/loan/suggestionsFeedback/updateSuggestionsFeedbackStatusByCode',{data: untils.getCookie('code')}).then(data=>{
				// console.log(data)
				if(data.code == 'success'){
					 	const title = "温馨提示";
            this.$Modal.success({
              title: title,
              content: "<p>已查看成功</p>",
              onOk: () => {
                this.$router.push({ path: "./applicationProposal?ispage="+this.$route.query.ispage });
              }
          });
				} else {
					this.$Message.info(data.message);
				}
			}).catch(err=>{
				this.$Message.info('服务器累了，请稍等！');
				console.log(err)
			})
		}
	}
};
</script>
<style lang="less" scoped>
#feedback_details {
  border: 1px solid #e7ecf1;
  padding: 30px 50px;
  h3 {
    line-height: 50px;
    border-bottom: 1px solid #e7ecf1;
    margin-bottom: 20px;
  }
  p {
    line-height: 60px;
    padding-left: 50px;
  }
  div {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
