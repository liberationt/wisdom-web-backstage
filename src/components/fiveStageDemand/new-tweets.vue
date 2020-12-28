<template>
	<div>
		<div class="navigation">
			<p>
				<span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;新建推文</span>
			</p>
		</div>
		<div class="homePage contentcss">
			<!-- push信息框 -->
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="margin-top:40px;">
				<!-- 文章标题 -->
				<FormItem label="文章标题：" prop="contentTitle">
					<Input :disabled='disabledshow' v-model="formValidate.contentTitle" placeholder="请输入标题" style="width:220px;"></Input>
				</FormItem>
				<FormItem label="标签：" prop='contentLabel'>
					<Input :disabled='disabledshow' v-model="formValidate.contentLabel" placeholder="请输入标签" style="width:220px;"></Input>
					<span class="reds">备注:多个标签请使用英文逗号隔开</span>
				</FormItem>
				<FormItem label="图片:" prop="photoPath">
						<Upload 
						action=""
						:before-upload="handleUploadicon"
						:show-upload-list="false"
						:format="['jpg','jpeg','png', 'gif']"
						:on-format-error="handleFormatError1">
						<img class="iconlabelUrl" :src="formValidate.labelUrl" alt="">
						<Input  v-model="formValidate.photoPath" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
						<!-- <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button> -->
						</Upload>
				</FormItem>
        <FormItem label="作者：" prop="contentAuthor">
					<Input :disabled='disabledshow' v-model="formValidate.contentAuthor" placeholder="请输入作者名称" style="width:220px;"></Input>
				</FormItem>
        <FormItem label="分享基础值：" prop="shareBaseNum">
            <Input :disabled='disabledshow' v-model="formValidate.shareBaseNum" style="width:220px;"></Input>
				</FormItem>
        <FormItem label="内容：" class="contenttw" prop="contentText">
					<quill-editor style="width:750px;height:500px" :disabled='disabledshow' v-model="formValidate.contentText"
						:options="editorOption" 
						@blur="onEditorBlur($event)" 
						@focus="onEditorFocus($event)"
						@change="onEditorChange($event)">
          </quill-editor>
				</FormItem>
        <FormItem label="热门：" style="margin-top:140px">
            <Checkbox :disabled='disabledshow' v-model="formValidate.hotState">热门</Checkbox>
				</FormItem>
				<FormItem label="备注：" prop="memo">
						<Input style='width:475px' v-model="formValidate.memo" :disabled='disabledshow' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
				</FormItem>
				<FormItem  style="margin-top:50px" class="tc">
          <Button type="primary" :disabled='disabledshow' @click="preservation('formValidate')">保存</Button>
					<Button class="ml20" @click="handleReset">取消</Button>
				</FormItem>  
			</Form>
		</div>
	</div>
</template>
<script>
    import utils from "../../utils/utils";
    // import { quillEditor } from 'vue-quill-editor'
	export default {
		data() {
			return {
				mailDetailCode:'',
				subdis:true,
				disabledshow:false,
				editorOption:{
					modules:{ 
						toolbar:[ 
							['bold', 'italic', 'underline', 'strike','blockquote','code-block'], // toggled buttons       
							['code', 'link','align','formula','image','clean'],
							[{'header': 1}, {'header': 2}],               // custom button values
							[{'list': 'ordered'}, {'list': 'bullet'}],
							[{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
							[{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
							[{'direction': 'rtl'}],                         // text direction
							[{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
							[{'color': []}, {'background': []}],          // dropdown with defaults from theme
							[{'font': []}]
						]       
					},
					placeholder:'输入图片的宽度需小于375,大小小于1M'
				},
      // 富文本结束
				formValidate: {
					contentTitle : "", //标题名称 
					contentLabel:'', //标签
					photoPath :'',  //图片
					contentAuthor: "", //作者
					shareBaseNum :'', //基础值
					contentText : "", //内容
					labelUrl: require("../../image/moren.png"),
					memo:'',
					hotState :false //热门
				},
				ruleValidate: {		
					photoPath:[
            	{ required: true, message: "请上传图片", trigger: "blur" }
            ],
					contentTitle :[
						{required: true,message: '请输入文章标题',trigger: 'blur'},
						{ type: 'string', max: 50, message: '文章标题不能超过50个字', trigger: 'blur' }
					],
					contentLabel:[
						{ message: '请输入正确格式', pattern:  /^[\u4E00-\u9FA5A-Za-z0-9,\u4e00-\u9fa5]*$/,trigger: 'change'}
					],
					contentAuthor: [
						{	required: true,message: '请输入作者',trigger: 'blur'},
						{ type: 'string', max: 10, message: '作者名称最多输入10个字', trigger: 'blur' }
					],
					contentText: [
						{required: true,message:'请输入内容',trigger: 'blur'}
					],
					shareBaseNum:[
						{ message: '输入范围0-99999', pattern:  /^(0|\+?[1-9][0-9]{0,4})$/,trigger: 'change'}
					],
					memo:[
						{ type: 'string', max: 50, message: '备注最多输入50个字', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			handleUploadicon(file) {
					let splic = file.name.split(".");
					if (
							splic[splic.length - 1] == "png" ||
							splic[splic.length - 1] == "jpg" ||
							splic[splic.length - 1] == "gif" ||
							splic[splic.length - 1] == "jpeg"
					) {
							let formData = new FormData();
							formData.append("file", file);
							let config = {
							headers: {
									"Content-Type": "multipart/form-data"
							}
							};
							this.http
							.post(BASE_URL + "/fileUpload", formData, config)
							.then(resp => {
									if (resp.code == "success") {
									this.formValidate.labelUrl = resp.data;
									this.formValidate.photoPath = resp.data;
									} else {
									}
							})
							.catch(() => {});
							return false;
					}
			},
			handleFormatError1(file) {
				this.$Message.info("图片格式不正确,请上传正确的图片格式");
			},
			// 返回
			handleReset() {
				window.history.go(-1);
			},
			// 富文本开始
			onEditorBlur(editor) { //失去焦点事件 

			},
			onEditorFocus(editor) { //获得焦点事件

			},
			onEditorChange({
				editor,
				html,
				text
			}) { //编辑器文本发生变化
				//this.content可以实时获取到当前编辑器内的文本内容
			},
			// 详情回显
			detailshowback() {
				this.http.post(BASE_URL + url).then(resp => {
						if(resp.code == "success") {
							
						} else {
							this.$Message.info(resp.message);

						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			// 保存
			preservation (name) {
				this.$refs[name].validate(valid => {
					if(valid){
						this.$Modal.confirm({
							title: '温馨提示',
							content: '<p>确认保存提交？</p>',
							onOk: () => {
									let data = {
										contentTitle : this.formValidate.contentTitle,
										contentLabel:this.formValidate.contentLabel, //标签
										photoPath :this.formValidate.photoPath,  //图片
										contentAuthor: this.formValidate.contentAuthor, //作者
										shareBaseNum :this.formValidate.shareBaseNum, //基础值
										contentText : this.formValidate.contentText, //内容
										hotState :this.formValidate.hotState===false?0:1 ,//热门
										memo:this.formValidate.memo
									}
									let urls = "/loan/exhibitionContent/save"
									let content='保存成功'
									if(this.$route.query.num =='2'){
										data.exhibitionContentCode= this.$route.query.exhibitionContentCode
										urls = "/loan/exhibitionContent/updateByCode"
										content="编辑成功"
									}
									this.http.post(BASE_URL+urls,data).then(data=>{
										if(data.code == 'success'){
											this.$Message.info(content);
											this.$router.push('/tweetsList')
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
			},
		},
		mounted() {
			if(this.$route.query.num=='1'){
				this.disabledshow = true
			}
			if(this.$route.query.num=='2'){
				this.disabledshow = false
			}
			if(this.$route.query.exhibitionContentCode){
				let data= {
					exhibitionContentCode:this.$route.query.exhibitionContentCode
				}
				this.http.post(BASE_URL+'/loan/exhibitionContent/getByCode',data)
				.then(data=>{
					if(data.code=='success'){
						let datas = data.data
						this.formValidate.contentTitle=datas.contentTitle
						this.formValidate.contentLabel=datas.contentLabel //标签
						this.formValidate.labelUrl =  datas.photoPath //图片
						this.formValidate.photoPath = datas.photoPath
						this.formValidate.contentAuthor= datas.contentAuthor //作者
						this.formValidate.shareBaseNum=datas.shareBaseNum //基础值
						this.formValidate.contentText = datas.contentText//内容
						this.formValidate.hotState = datas.hotState==1?true:false //热门
						this.formValidate.memo = datas.memo
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	};
</script>
<style scoped>
	.quill-editor {
		height: 200px;
	}
	.iconlabelUrl {
		width: 240px;
		height: 120px;
  }
	.reds{
		color:red;
	}
</style>