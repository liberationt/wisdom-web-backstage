<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;抢单劵设置</span>
			</p>
		</div>
		<div class="homePage contentcss">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" style="margin-top:40px;">
                <FormItem label="有效期:" prop="expireDay">
					<Input :disabled='disabledshow' v-model="formValidate.expireDay" placeholder="请输入有效期" style="width:220px;">
                        <span slot="append">天</span>
                    </Input>
				</FormItem>
                <FormItem label="备注:" prop="remark">
                    <Input style="width:285px" v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" />
                </FormItem>
				<FormItem  style="margin-top:50px">
                    <Button type="primary" @click="preservation('formValidate')">保存</Button>
					<Button class="ml20" @click="handleReset">取消</Button>
				</FormItem>  
			</Form>
		</div>
	</div>
</template>
<script>
    import utils from "../../utils/utils";
	export default {
		data() {
			return {
				couponList:[],
				adjustTypeList:[],
				disabledshow: false,
				formValidate: {
					expireDay : "", //金额
					remark:'', //备注
				},
				ruleValidate: {			
					expireDay: [
						{
							required: true,
							message: '请输入有效期',
							trigger: 'blur'
						},
						{ message: '请输入正确的有效期', pattern:  /^(0|\+?[1-9][0-9]{0,5})$/,trigger: 'blur'},
					],
                    remark: [{
						max: 50, message: '备注最多输入50个字符', trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			// 返回
			handleReset() {
				window.history.go(-1);
			},
			// 保存
			preservation (name) {
				this.$refs[name].validate(valid => {
					if(valid){
						this.$Modal.confirm({
							title: '温馨提示',
							content: '<p>确认保存？</p>',
							onOk: () => {
								let data=this.formValidate
								this.http.post(BASE_URL+"/loan/ticketManage/save",data).then(data=>{
								if(data.code == 'success'){
									this.$Message.info('保存成功！');
									this.$router.push('/ticketManage')
								} else {
									this.$Message.info(data.message);
								}
								}).catch(err=>{
								console.log(err)
								})
							},
							onCancel: () => {
							}
						})
					}
				})
			}
		},
		created(){
			this.http.post(BASE_URL+'/loan/couponManage/show',{}).then(data=>{
				this.couponList=data.data.ticketTypeList
				this.adjustTypeList = data.data.adjustTypeList
			}).catch(err=>{

			})
		}
	};
</script>
<style scoped>
	.quill-editor {
		height: 200px;
	}
	
</style>