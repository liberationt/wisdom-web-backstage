<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;卡劵设置</span>
			</p>
		</div>
		<div class="homePage contentcss">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" style="margin-top:40px;">
				<FormItem label="劵类型:" prop="couponType">
					<Select :disabled='disabledshow' v-model="formValidate.couponType" placeholder="请选择" style="width:220px;">
						<Option v-for="item in couponList" :key='item.type' :value='item.type'>{{item.name}}</Option>
					</Select>
				</FormItem>
                <FormItem label="劵面金额:" prop="denomination">
					<Input :disabled='disabledshow' v-model="formValidate.denomination" placeholder="请输入劵面金额" style="width:220px;">
                        <span slot="append">元</span>
                    </Input>
				</FormItem>
                <FormItem label="使用门槛:" prop="threshold">
					<Input :disabled='disabledshow' v-model="formValidate.threshold " placeholder="请输入使用门槛" style="width:220px;">
                        <span slot="append">元</span>
                    </Input>
				</FormItem>
                <FormItem label="有效期:" prop="expireDay">
					<Input :disabled='disabledshow' v-model="formValidate.expireDay" placeholder="请输入劵有效期" style="width:220px;">
                        <span slot="append">天</span>
                    </Input>
				</FormItem>
				<FormItem label="互斥类型:" prop="excludeType">
					<CheckboxGroup v-model="formValidate.excludeTypes">
						<Checkbox v-for="item in adjustTypeList" :label = 'item.type' :key="item.type">{{item.name}}</Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="券详情信息:" prop="couponDetail">
                        <Input style="width:285px" v-model="formValidate.couponDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入券详情信息" />
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
					couponType :'',//类型
					denomination : "", //金额
					threshold : "", //门槛
					expireDay : "", //有效期
					excludeTypes :[], //互斥
					remark:'', //备注
					couponDetail :'', //详情
					
				},
				ruleValidate: {			
					couponType: [{
						required: true,
						message: '请选择劵类型',
						trigger: 'change'
					}],
					denomination: [
						{
							required: true,
							message: '请输入券面金额',
							trigger: 'blur'
						},
						{ message: '券面金额只能输入0.01-99999间的数值', pattern:  /^(0\.\d{0,1}[1-9]|\+?[1-9][0-9]{0,4})(\.\d{1,2})?$/,trigger: 'change'}
																				

					],
					threshold: [{
						required: true,
						message: '请输入使用门槛',
						trigger: 'blur'
					},
					{ message: '使用门槛只能输入0-99999间的数值', pattern: /^(0|\+?[1-9][0-9]{0,4})(\.\d{1,2})?$/,trigger: 'change'}
					],
                    expireDay: [{
						required: true,
						message: '请输入有效期',
						trigger: 'blur'
					},
					{ message: '有效期只能输入0-365之间的正整数', pattern: /^([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|[3][0-5][0-9]|(360|361|363|362|364|365))$/,trigger: 'change'}
					],
					couponDetail:[{
						max: 50, message: '券详情信息最多输入50个字符', trigger: 'blur'
					}],
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
						let denomination = Number(this.formValidate.denomination)
						let threshold = Number(this.formValidate.threshold)
						if(threshold!=0&&denomination>threshold){
            				this.$Message.error('券面金额大于使用门槛');
							return false
						}
						this.$Modal.confirm({
							title: '温馨提示',
							content: '<p>确认保存？</p>',
							onOk: () => {
								let data=this.formValidate
								this.http.post(BASE_URL+"/loan/couponManage/save",data).then(data=>{
								if(data.code == 'success'){
									this.$Message.info('保存成功！');
									this.$router.push('/cardManagement')
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