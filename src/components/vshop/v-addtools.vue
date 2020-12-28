<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置&nbsp;>&nbsp;{{tittle}}</span> 
      </p>
    </div>
    <div class="clearfix contentcss sales-statis">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="工具名称:"  prop="toolName">
          <Input v-model="formValidate.toolName" :disabled='disabled' placeholder="请输入工具名称" style="width:240px"></Input>
        </FormItem>
				<FormItem label="工具简介:"  prop="toolIntroduction">
          <Input v-model="formValidate.toolIntroduction" :disabled='disabled' placeholder="请输入工具名称" style="width:240px"></Input>
        </FormItem>
				<FormItem label="工具图标:" prop="toolIcon">
            <Upload
            action=""
            :before-upload="handleUploadicon"
            :show-upload-list="false"
            :format="['jpg','jpeg','png', 'gif']"
            :on-format-error="handleFormatError1">
            <img class="iconlabelUrl" :src="formValidate.toolUrl" alt="">
            <Input v-model="formValidate.toolIcon" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
            </Upload>
        </FormItem>
        <FormItem label="跳转方式:">
		<div class="flexds">
			<FormItem prop="jumpType">
				<Select v-model="formValidate.jumpType" placeholder="请选择跳转方式" style='width:120px;margin-right:10px' @on-change='jumpTypechange'>
					<Option v-for="(item,i) in jumpTypeList" :value="item.value" :key="i">{{item.text}}</Option>
				</Select>
			</FormItem>
			<FormItem prop="jumpUrl" v-if='formValidate.jumpType==1'>
				<Select v-model="formValidate.jumpUrl" placeholder="请选择跳转URL" style='width:120px;' @on-change='jumpUrlchange'>
					<Option v-for="(item,i) in jumpUrlList" :value="item.value" :key="i">{{item.text}}</Option>
				</Select>
			</FormItem>
			<FormItem prop="h5Url" v-if='formValidate.jumpType==2'>
		<Input v-model="formValidate.h5Url" :disabled='disabled' placeholder="请输入URL地址" style="width:240px"></Input>
	</FormItem>
		</div>
        </FormItem>
        <FormItem label="启用状态:"  prop="state">
					<Select v-model="formValidate.state" placeholder="请选择启用状态" style='width:120px;' @on-change="statechange">
						<Option v-for="(item,i) in stateList" :value="item.value" :key="i">{{ item.text}}</Option>
					</Select>
        </FormItem>
        <FormItem label="是否分销:"  prop="distributionState">
            <Select v-model="formValidate.distributionState" placeholder="请选择是否分销" style='width:120px;' @on-change='distributionStatechange'>
              <Option v-for="(item,i) in distributionStateList" :value="item.value" :key="i">{{item.text }}</Option>
            </Select>
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>{{text}}</Button>
            <Button @click="operate" style='width:100px;margin:0 10px' v-show="this.tittle=='编辑产品'">操作日志</Button>
            <Button @click="handleReset" style="margin-left: 8px;width:100px">返回</Button>
        </FormItem>
      </Form>
      <Modal
		v-model="JournalList"
		title="操作日志"
		ok-text="关闭"
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
export default {
    data(){
      	return{
			jumpTypeList:[],
			jumpUrlList:[],
			stateList:[],
			distributionStateList:[],
			JournalList:false,
			disabled:false,
			tittle:'添加产品',
			text:'保存',
			total:0,
			startRow:1,
			endRow:10,
        columns:[
          {
            title: "操作时间",
            key: "dataCreateTime",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作人",
            key: "operationMan",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作内容",
            key: "operationContent",
            align: "center",
            minWidth: 100
          }
        ],
        data1:[],
        formValidate: {
			toolName:'',
			toolIntroduction :'',
			toolUrl: require("../../image/moren.png"),
			toolIcon:'',
			jumpType :'',
			h5Url:'',
			jumpUrl:'',
			state :'',
			distributionState :''
        },
        ruleValidate: {
			toolName:[
				{ required: true, message: '请输入工具名称', trigger: 'change' },
				{required: true, message: '工具名称最多20字符', max:20,trigger: 'change'}
			],
			toolIntroduction:[
				{ required: true, message: '请输入工具简介', trigger: 'change' },
				{required: true, message: '工具简介最多40字符', max:40,trigger: 'change'}
            ],
			toolIcon:[
				{ required: true,  message: '请选择工具图标', trigger: 'blur' },
			],
			jumpUrl:[
				{required: true, message: '请选择跳转URL', trigger: 'change' },
				// {required: true, message: '跳转URL最多150字', max:150,trigger: 'change'}
			],
      		jumpType:[
				{required: true, message: '请选择跳转方式', trigger: 'change' },
			],
			h5Url:[
				{required: true, message: '请输入URL地址', trigger: 'change' },
				{required: true, message: 'URL最多150字符', max:150,trigger: 'change'}
			],
			state: [
				{ required: true,  message: '请选择状态', trigger: 'change' },
			],
			distributionState:[
				{ required: true,  message: '请选择是否分销', trigger: 'change' },
			]
        },
      }
    },
    methods:{
		pageChange(startRow){
			this.startRow = startRow
			this.getdatalist(startRow)
		},
		pagesizechange(endRow){
			this.endRow = endRow
			this.getdatalist(1)
		},
		//跳转方式
		jumpTypechange(value){
			this.jumpType = value
		},
		//跳转url
		jumpUrlchange(value){
			this.jumpUrl = value
		},
		statechange(value){
			this.state = value
		},
		distributionStatechange(value){
			this.distributionState = value
		},
      //操作日志
      Journalok(){
        
		},
		getdatalist(startRow){
			let data={
				memo :this.$route.query.creditToolCode,
				operationType:'credit_tool',
				pageNum:startRow,
				pageSize:this.endRow
			}
			this.http.post(BASE_URL+'/loan/operationLog/getCreditToolLogList',data)
			.then(data=>{
			if(data.code=='success'){
				this.data1 = data.data.dataList
				this.total = data.data.total
			}
			}).catch(err=>{
			console.log(err)
			})
		},
      	operate(){
			this.JournalList = true
			this.getdatalist(1)
      	},
		handleReset(){
			this.$router.go(-1)
		},
     
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
					this.formValidate.toolUrl = resp.data;
					this.formValidate.toolIcon = resp.data;
              	} 
            })
            .catch(() => {});
          return false;
        }
      },
      handleFormatError1(file) {
        this.$Message.info("图片格式不正确,请上传正确的图片格式");
      },
      handleSubmit (name) {
        this.$refs[name].validate(valid => {
          if (valid) {
			if(this.tittle=='添加产品'){
				let data = {
					toolName:this.formValidate.toolName,
					toolIntroduction:this.formValidate.toolIntroduction,
					toolIcon:this.formValidate.toolIcon,
					jumpType:this.formValidate.jumpType,
					jumpUrl:this.formValidate.jumpUrl,
					h5Url:this.formValidate.h5Url,
					state:this.formValidate.state,
					distributionState:this.formValidate.distributionState,
				}
				this.http.post(BASE_URL+'/loan/creditTool/save',data)
				.then(data=>{
					if(data.code=='success'){
						this.$Modal.success({
							title:'添加产品',
							content: "<p>添加成功</p>",
							onOk: () => {
								this.$router.push({ path: "/vCreditmanagement"});
							}
						});
					}
				})
			}else{
				let data = {
					creditToolCode:this.$route.query.creditToolCode,
					toolName:this.formValidate.toolName,
					toolIntroduction:this.formValidate.toolIntroduction,
					toolIcon:this.formValidate.toolIcon,
					jumpType:this.formValidate.jumpType,
					jumpUrl:this.formValidate.jumpUrl,
					h5Url:this.formValidate.h5Url,
					state:this.formValidate.state,
					distributionState:this.formValidate.distributionState,
				}
				this.http.post(BASE_URL+'/loan/creditTool/updateByCode',data)
				.then(data=>{
					if(data.code=='success'){
							this.$Modal.success({
								title:'编辑产品',
								content: "<p>修改成功</p>",
								onOk: () => {
									this.$router.push({ path: "/vCreditmanagement"});
								}
						});
					}
				})
			}
          } 
        })
      },
		},
		created(){
			this.http.post(BASE_URL+'/loan/creditTool/getCreditToolBaseData',{creditToolCode:this.$route.query.creditToolCode})
      .then(data=>{
        if(data.code=='success'){
          this.jumpTypeList=data.data.jumpType,
					this.jumpUrlList=data.data.appJump,
					this.stateList=data.data.state,
					this.distributionStateList=data.data.distributionState
        }
      })
		},
    mounted(){
     	 if(this.$route.query.creditToolCode){
			this.tittle='编辑产品'
			this.text = '提交保存'
			this.http.post(BASE_URL+'/loan/creditTool/getByCode?creditToolCode='+this.$route.query.creditToolCode)
			.then(data=>{
				if(data.code=='success'){
					this.formValidate.toolName = data.data.toolName
					this.formValidate.toolIntroduction=data.data.toolIntroduction
					this.formValidate.toolIcon=data.data.toolIcon
					this.formValidate.toolUrl = data.data.toolIcon
					this.formValidate.toolIcon = data.data.toolIcon
					this.formValidate.jumpType = String(data.data.jumpType)
					this.formValidate.h5Url = data.data.h5Url
					this.formValidate.jumpUrl =String (data.data.jumpUrl)
					this.formValidate.state = String(data.data.state)
					this.formValidate.distributionState = String(data.data.distributionState)
				}
			})
		}
    }
}
</script>
<style lang="less" scoped>
 .iconlabelUrl {
  width: 80px;
  height: 80px;
}
.flexds{
	display: flex;
}
</style>