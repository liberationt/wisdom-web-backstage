<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;产品管理&nbsp;>&nbsp; 产品列表&nbsp;>&nbsp;编辑产品</span> 
      </p>
    </div>
    <div class="clearfix contentcss sales-statis">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="产品:"  prop="productname">
            <Input v-model="formValidate.productname" disabled placeholder="请输入产品名称" style="width:240px"></Input>
        </FormItem>
        <FormItem label="产品分类:"  prop="classification">
            <Select v-model="formValidate.classification" placeholder="请选择产品分类" style='width:240px;'>
                <Option value='1'>普通产品</Option>
                <Option value='2' >华赞产品</Option>
                <Option value='3' >抢单侠产品</Option>
            </Select>
        </FormItem>
        <FormItem label="产品类型" prop="productDetailType" v-if='show==0' >
            <CheckboxGroup v-model="formValidate.productDetailType">
                <Checkbox :label='item.code' v-for="(item,i) in producttypelist" :key="i">{{item.label}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="贷款参数:"  prop="productParamShow">
            <Select v-model="formValidate.productParamShow" placeholder="请选择贷款参数" style='width:240px;'>
                <Option value='1'>显示</Option>
                <Option value='0' >不显示</Option>
            </Select>
        </FormItem>
        <FormItem label="分佣模式:"  prop="commission">
            <Select v-model="formValidate.commission" placeholder="请选择分佣模式" style='width:240px;' @on-change='commissionchange'>
                <Option value='0' v-if="show==0">CPS百分比返佣（点）</Option>
                <Option value='1' >CPA固定返佣（元）</Option>
            </Select>
        </FormItem>
        <FormItem label="一级返佣:" prop="returncommission">
            <Input v-model="formValidate.returncommission" placeholder="请输入一级返佣" style="width:240px">
              <span slot="append">{{formValidate.commission==0?'%':'元'}}</span>
            </Input>
        </FormItem>
        <FormItem label="结算方式:"  prop="settlement">
            <Select v-model="formValidate.settlement" placeholder="请选择结算方式" style='width:240px;' @on-change="settlementchange">
                <Option v-for="(item,i) in settlementList" :value="item.value" :key="i">{{ item.label}}</Option>
            </Select>
        </FormItem>
        <FormItem label="结算时间:"  prop="settlingtime">
            <Select v-model="formValidate.settlingtime" placeholder="请选择结算时间" style='width:240px;' @on-change='settlingtimechange'>
              <Option v-for="(item,i) in settlingtimeList" :value="item.value" :key="i">{{item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="状态:"  prop="status">
            <Select v-model="formValidate.status" placeholder="请选择产品状态" style='width:240px;'>
                <Option v-for="(item,i) in statusList" :value="item.value" :key="i">{{item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="代理标签:"  prop="proxyLabel">
            <Input v-model="formValidate.proxyLabel"  placeholder="请输入代理标签，最多12字" style="width:240px"></Input>
        </FormItem>
        <FormItem label="产品标签:"  prop="productLabel">
            <Input v-model="formValidate.productLabel"  placeholder="请输入产品标签，最多12字" style="width:240px"></Input>
        </FormItem>
        <FormItem label="产品权益:" prop="interestsList" v-if="show==0">
          <div v-for="(item,index) in formValidate.interestsList" :key="index">
            <Input v-model='formValidate.interestsList[index]' placeholder="请输入产品权益" style="width:240px;margin-bottom:10px"></Input>
            <Button type="primary" class=" ml10" :disabled="auditing" v-if="index==0"  @click="addnormal1" style="margin-bottom:10px">+</Button>
            <Button type="primary" class="ml10" :disabled="auditing" v-if="index!=0"  @click="addnormal2(index)" style="margin-bottom:10px">-</Button>
          </div>
        </FormItem>
        <FormItem label="分享标题:" prop="sharetitle">
            <Input v-model="formValidate.sharetitle" placeholder="请输入分享标题" style="width:240px"></Input>
        </FormItem>
        <FormItem label="分享描述:" prop="description">
            <Input v-model="formValidate.description" placeholder="请输入分享标题" style="width:240px"></Input>
        </FormItem>
        <FormItem label="banner图(代理):" prop="bannerlogos">
            <Upload
            action=""
            :before-upload="handleUploadicon"
            :show-upload-list="false"
            :format="['jpg','jpeg','png', 'gif']"
            :on-format-error="handleFormatError1">
            <img class="iconlabelUrl" :src="formValidate.bannerUrl" alt="">
            <Input v-model="formValidate.bannerlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
            </Upload>
        </FormItem>
        <FormItem label="banner图(用户):" prop="bannerlogos">
            <Upload
            action=""
            :before-upload="handleUploadicon1"
            :show-upload-list="false"
            :format="['jpg','jpeg','png', 'gif']"
            :on-format-error="handleFormatError1">
            <img class="iconlabelUrl" :src="formValidate.bannerUrls" alt="">
            <Input v-model="formValidate.bannerlogos" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
            </Upload>
        </FormItem>
        <FormItem label="海报图:" prop="productlogo">
            <Upload
            action=""
            :before-upload="handleUploadicons"
            :show-upload-list="false"
            :format="['jpg','jpeg','png', 'gif']"
            :on-format-error="handleFormatError1">
            <img class="iconlabelUrl" :src="formValidate.productUrl" alt="">
            <Input v-model="formValidate.productlogo" disabled style="width: 120px;margin-top:24px" class="left ml5 hidden"></Input>
            </Upload>
        </FormItem>
         <FormItem label="工资结算说明:"  prop="wages" style="margin-bottom:30px;">
            <Input v-model="formValidate.wages"  type="textarea" :rows="6" placeholder="请输入工资结算说明" style="width:340px"></Input>
        </FormItem>
        <FormItem label="代理步骤:"  prop="agentSteps" id="tittle">
          <quill-editor style="width:750px;height:350px;margin-bottom:100px;"  v-model="formValidate.agentSteps"
              :options="editorOption" 
              @blur="onEditorBlur($event)" 
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
          </quill-editor>
        </FormItem> 
        <FormItem label="审核步骤:"  prop="auditSteps" id="tittle">
          <quill-editor style="width:750px;height:350px;margin-bottom:100px;" v-model="formValidate.auditSteps"
              :options="editorOption" 
              @blur="onEditorBlur($event)" 
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
          </quill-editor>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style='width:100px'>提交保存</Button>
            <Button @click="operate" style='width:100px;margin:0 10px'>操作日志</Button>
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
        producttypelist:[],
        JournalList:false,
        show:'',
        company:'',
        tittle:'',
        total:0,
				startRow:1,
				endRow:10,
        auditing:false,
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
        columns:[
          {
            title: "操作人",
            key: "operator",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作人code",
            key: "operatorCode",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作内容",
            key: "content",
            align: "center",
            minWidth: 100
          },
        ],
        data1:[],
        commissionList:[
          {label:'CPS百分比返佣（点）',value:'0'},
          {label:'CPA固定返佣（元）',value:'1'}
        ],
        settlementList:[
          {label:'月结',value:'2'},
          {label:'周结',value:'1'},
          {label:'日结',value:'0'}
        ],
        statusList:[
          {label:'上架',value:'0'},
          {label:'下架',value:'1'}
        ],
        settlingtimeList:[
          
        ],
        formValidate: {
            productname:'', //产品名称
            classification:'', //分类
            productDetailType:[],//产品类型
            commission: '',//分佣模式
            returncommission:'', //一级返佣
            settlement:'', //结算方式
            settlingtime:'', //时间
            status:'', //状态
            interestsList:[1], //权益
            sharetitle:'', //分享标题
            description:'', //描述
            bannerlogo:'', //bannerlogo
            bannerlogos:'',
            productParamShow:'1',
            productlogo:'',
            proxyLabel:'',
            productLabel:'',
            bannerUrls:require("../../image/moren.png"),
            bannerUrl: require("../../image/moren.png"),
            productUrl: require("../../image/moren.png"),
            wages:'',
            agentSteps:'',
            auditSteps:'',
        },
        ruleValidate: {
          productname:[
              { required: true, message: '请输入产品名称', trigger: 'change' },
            ],
          classification:[
              { required: true, message: '请选择产品分类', trigger: 'change' },
            ],
          productDetailType:[
            { required: true, type: 'array', min:1, message: '请选择产品类型', trigger: 'change' },
            // { type: 'array',min: 1  message: '最多选择一个', trigger: 'change' }
          ],
          commission:[
              {required: true, message: '请选择分佣模式', trigger: 'change' },
            ],
            returncommission:[
                { required: true,  message: '输入一级返佣', trigger: 'blur' }
            ],
            productParamShow:[
                { required: true,  message: '请选择贷款参数', trigger: 'blur' }

            ],
            settlement: [
                { required: true,  message: '请选择结算方式', trigger: 'change' },
            ],
            settlingtime:[
              { required: true,  message: '请选择结算时间', trigger: 'change' },
            ],
            status:[
                { required: true,  message: '请选择状态', trigger: 'change' },
            ],
            proxyLabel:[
              { required: true,  message: '请输入代理标签', trigger: 'change' },
              { pattern: /^.{1,12}$/, message: '代理标签最多可输12字', trigger: 'change'}
            ],
            productLabel:[
              { required: true,  message: '请输入产品标签', trigger: 'change' },
              { pattern: /^.{1,12}$/, message: '产品标签最多可输12字', trigger: 'change'}
            ],
            sharetitle:[
              { required: true,  message: '请输入分享标题', trigger: 'blur' },
              {required: true, message: '分享标题最多30字', max:30,trigger: 'change'}
            ],
            description:[
              { required: true,  message: '请输入分享描述', trigger: 'blur' },
              {required: true, message: '分享描述最多30字', max:30,trigger: 'change'}
            ],
            bannerlogos:[
               { required: true,  message: '请选择banner图', trigger: 'blur' },
            ],
            bannerlogo:[
               { required: true,  message: '请选择banner图', trigger: 'blur' },
            ],
            productlogo:[
               { required: true,  message: '请选择海报图', trigger: 'blur' },
            ],
            wages:[
              { required: true,  message: '请输入工资结算说明', trigger: 'blur' }
            ],
            agentSteps:[
              { required: true,  message: '请输入代理步骤', trigger: 'blur' }
            ],
            auditSteps:[
              { required: true,  message: '请输入审核步骤', trigger: 'blur' }
            ]
        },
      }
    },
    methods:{
      // 富文本开始
      onEditorBlur(editor){//失去焦点事件    
      },
      onEditorFocus(editor){//获得焦点事件
      },
      onEditorChange({editor,html,text}){//编辑器文本发生变化
          //this.content可以实时获取到当前编辑器内的文本内容
      },
      pageChange(startRow){
				this.startRow = startRow
				this.getdatalist(startRow)
			},
			pagesizechange(endRow){
				this.endRow = endRow
				this.getdatalist(1)
      },
      Journalok(){

      },
      getdatalist(startRow){
				let data={
					productCode :this.$route.query.productCode,
					pageNum:startRow,
          pageSize:this.endRow
				}
				this.http.post(BASE_URL+'/vshop/productLog/queryPage',data)
        .then(data=>{
          if(data.code=='success'){
            this.data1 = data.data.dataList
            this.total = Number(data.data.total)
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        }).catch(err=>{
          console.log(err)
        })
			},
      operate(){
        this.JournalList = true
        this.getdatalist(1)
      },
      //分佣模式
      commissionchange(commission){
        this.formValidate.commission =commission
      },
      //结算方式
      settlementchange(value){
        this.formValidate.settlement = value
        if(value==0){
          this.settlingtimeList=[
            {label:'0时',value:'0'},
            {label:'1时',value:'1'},
            {label:'2时',value:'2'},
            {label:'3时',value:'3'},
            {label:'4时',value:'4'},
            {label:'5时',value:'5'},
            {label:'6时',value:'6'},
            {label:'7时',value:'7'},
            {label:'8时',value:'8'},
            {label:'9时',value:'9'},
            {label:'10时',value:'10'},
            {label:'11时',value:'11'},
            {label:'12时',value:'12'},
            {label:'13时',value:'13'},
            {label:'14时',value:'14'},
            {label:'15时',value:'15'},
            {label:'16时',value:'16'},
            {label:'17时',value:'17'},
            {label:'18时',value:'18'},
            {label:'19时',value:'19'},
            {label:'20时',value:'20'},
            {label:'21时',value:'21'},
            {label:'22时',value:'22'},
            {label:'23时',value:'23'},
          ]
        }else if(value==1){
          this.settlingtimeList=[
            {label:'星期一',value:'1'},
            {label:'星期二',value:'2'},
            {label:'星期三',value:'3'},
            {label:'星期四',value:'4'},
            {label:'星期五',value:'5'},
          ]
        }else{
          this.settlingtimeList=[
          {label:'1日',value:'1'},
          {label:'2日',value:'2'},
          {label:'3日',value:'3'},
          {label:'4日',value:'4'},
          {label:'5日',value:'5'},
          {label:'6日',value:'6'},
          {label:'7日',value:'7'},
          {label:'8日',value:'8'},
          {label:'9日',value:'9'},
          {label:'10日',value:'10'},
          {label:'11日',value:'11'},
          {label:'12日',value:'12'},
          {label:'13日',value:'13'},
          {label:'14日',value:'14'},
          {label:'15日',value:'15'},
          {label:'16日',value:'16'},
          {label:'17日',value:'17'},
          {label:'18日',value:'18'},
          {label:'19日',value:'19'},
          {label:'20日',value:'20'},
          {label:'21日',value:'21'},
          {label:'22日',value:'22'},
          {label:'23日',value:'23'},
          {label:'24日',value:'24'},
          {label:'25日',value:'25'},
          {label:'26日',value:'26'},
          {label:'27日',value:'27'},
          {label:'28日',value:'28'}
          ]
        }
      },
      handleReset(){
        this.$router.go(-1)
      },
      //结算时间
      settlingtimechange(value){
        this.formValidate.settlingtime = value
      },
      addnormal1(){
        if(this.formValidate.interestsList.length<=9){
          this.formValidate.interestsList.push( 
				  	""
          )
        }
      },
      addnormal2(i){
        this.formValidate.interestsList.splice(i, 1)
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
                this.formValidate.bannerUrl = resp.data;
                this.formValidate.bannerlogo = resp.data;
              } 
            })
            .catch(() => {});
          return false;
        }
      },
      handleUploadicon1(file) {
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
                this.formValidate.bannerUrls = resp.data;
                this.formValidate.bannerlogos = resp.data;
              } 
            })
            .catch(() => {});
          return false;
        }
      },
      handleUploadicons(file) {
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
                this.formValidate.productUrl = resp.data;
                this.formValidate.productlogo = resp.data;
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
            let refs = /^.{1,30}$/
            let refm =/^([0-9]\d{0,1}|100)(\.\d{1})?$/
            let refd = /^([0-9]\d{0,2}|1000)(\.\d{1})?$/
            if(this.formValidate.commission==0){
              if(this.formValidate.returncommission>100){
                this.$Message.error('一级返佣不能超过100')
                return false
              }
              if(!refm.test(this.formValidate.returncommission)){
                this.$Message.error('一级返佣为0-100之间的一位小数')
                return false
              }
            }
            if(this.formValidate.commission==1){
              if(this.formValidate.returncommission>1000){
                this.$Message.error('一级返佣不能超过1000')
                return false
              }
              if(!refd.test(this.formValidate.returncommission)){
                this.$Message.error('一级返佣为0-1000之间的一位小数')
                return false
              }
            }
            if(this.show==0){
              for(var i=0;i<this.formValidate.interestsList.length;i++){
                if(this.formValidate.interestsList[i]==''){
                  this.$Message.error('请输入产品权益')
                  return false
                }
                if(!refs.test(this.formValidate.interestsList[i])){
                  this.$Message.error('产品权益每条最多30字')
                  return false
                }
              }
            }
            let data = {
              productCode:this.$route.query.productCode,
              productname: this.formValidate.productname, //产品
              productClassify:this.formValidate.classification, //分类
              productType :this.show,   //产品类型
              productDetailType  : this.formValidate.productDetailType, //产品类型明细
              commissionType:this.formValidate.commission, //分佣模式 
              rebate:this.formValidate.returncommission,//一级返佣
              settleType:this.formValidate.settlement, //结算方式
              settleDate:this.formValidate.settlingtime, //结算时间
              state:this.formValidate.status, //状态
              productDescribeList:this.formValidate.interestsList,//产品权益：
              shareTitle :this.formValidate.sharetitle,  //分享标题
              shareDescribe :this.formValidate.description, //分享描述
              bannerUrl:this.formValidate.bannerlogo,  //产品logo
              posterUrl:this.formValidate.productlogo,
              userBannerUrl:this.formValidate.bannerUrls,
              productParamShow:this.formValidate.productParamShow, //贷款参数
              agencyLabel:this.formValidate.proxyLabel, //代理标签
              productLabel:this.formValidate.productLabel, //产品标签
              salaryCalculateExplain:this.formValidate.wages, //说明
              agencyStep:this.formValidate.agentSteps,
              checkStep:this.formValidate.auditSteps, //审核步骤
            }
            this.http.post(BASE_URL+'/vshop/product/updateProductByCode',data)
            .then(data=>{
              if(data.code=='success'){
                  this.$Modal.success({
                    title:'编辑产品',
                    content: "<p>提交保存成功</p>",
                    onOk: () => {
                      this.$router.push({ path: "/vProductlist?productType="+this.$route.query.productType});
                    }
                });
              }else{
                let message
                if(data.message){
                  message=data.message
                }else{
                  message = '服务器累了'
                }
                this.$Message.error(message)
              }
            })
          } 
        })
      },
    },
    mounted(){
      this.http.post(BASE_URL+'/vshop/product/queryProductDetail',{productCode:this.$route.query.productCode})
      .then(resp=>{
        if(resp.code=='success'){
          let data = resp.data
          this.show =  data.productType 
          this.tittle = data.productType == 0?'贷款':( data.productType==1?'信用卡':'信贷工具')
          this.formValidate.productname = this.tittle+ "   " + data.productName
          this.producttypelist = data.productDetailTypeBean
          this.formValidate.productDetailType = data.productDetailType 
          this.formValidate.commission = (data.productType!=0?'1':String(data.commissionType))
          this.formValidate.returncommission=String(data.rebate )
          this.formValidate.settlement=String(data.settleType)
          this.formValidate.settlingtime=String(data.settleDate) 
          this.formValidate.status=String(data.state) 
          this.formValidate.interestsList = data.productDescribeList
          this.formValidate.sharetitle=data.shareTitle 
          this.formValidate.description= data.shareDescribe 
          this.formValidate.classification = String(data.productClassify)
          this.formValidate.productParamShow = String(data.productParamShow)
          this.formValidate.proxyLabel = data.agencyLabel
          this.formValidate.productLabel = data.productLabel
          this.formValidate.auditSteps = data.checkStep
          this.formValidate.agentSteps=data.agencyStep
          this.formValidate.wages = data.salaryCalculateExplain
          this.formValidate.bannerUrl = (data.bannerUrl==""?this.formValidate.bannerUrl:data.bannerUrl)
          this.formValidate.bannerlogo = data.bannerUrl
          this.formValidate.bannerUrls = (data.userBannerUrl==""?this.formValidate.bannerUrls:data.userBannerUrl)
          this.formValidate.bannerlogos = data.userBannerUrl
          this.formValidate.productlogo = data.posterUrl 
          this.formValidate.productUrl = (data.posterUrl==""?this.formValidate.productUrl:data.posterUrl)
          if(data.settleType==0){
            this.settlingtimeList=[
              {label:'0时',value:'0'},
              {label:'1时',value:'1'},
              {label:'2时',value:'2'},
              {label:'3时',value:'3'},
              {label:'4时',value:'4'},
              {label:'5时',value:'5'},
              {label:'6时',value:'6'},
              {label:'7时',value:'7'},
              {label:'8时',value:'8'},
              {label:'9时',value:'9'},
              {label:'10时',value:'10'},
              {label:'11时',value:'11'},
              {label:'12时',value:'12'},
              {label:'13时',value:'13'},
              {label:'14时',value:'14'},
              {label:'15时',value:'15'},
              {label:'16时',value:'16'},
              {label:'17时',value:'17'},
              {label:'18时',value:'18'},
              {label:'19时',value:'19'},
              {label:'20时',value:'20'},
              {label:'21时',value:'21'},
              {label:'22时',value:'22'},
              {label:'23时',value:'23'},
            ]
          }else if(data.settleType==1){
            this.settlingtimeList=[
              {label:'星期一',value:'1'},
              {label:'星期二',value:'2'},
              {label:'星期三',value:'3'},
              {label:'星期四',value:'4'},
              {label:'星期五',value:'5'},
            ]
          }else{
            this.settlingtimeList=[
            {label:'1日',value:'1'},
            {label:'2日',value:'2'},
            {label:'3日',value:'3'},
            {label:'4日',value:'4'},
            {label:'5日',value:'5'},
            {label:'6日',value:'6'},
            {label:'7日',value:'7'},
            {label:'8日',value:'8'},
            {label:'9日',value:'9'},
            {label:'10日',value:'10'},
            {label:'11日',value:'11'},
            {label:'12日',value:'12'},
            {label:'13日',value:'13'},
            {label:'14日',value:'14'},
            {label:'15日',value:'15'},
            {label:'16日',value:'16'},
            {label:'17日',value:'17'},
            {label:'18日',value:'18'},
            {label:'19日',value:'19'},
            {label:'20日',value:'20'},
            {label:'21日',value:'21'},
            {label:'22日',value:'22'},
            {label:'23日',value:'23'},
            {label:'24日',value:'24'},
            {label:'25日',value:'25'},
            {label:'26日',value:'26'},
            {label:'27日',value:'27'},
            {label:'28日',value:'28'}
            ]
          }
          this.formValidate.settlingtime=String(data.settleDate) 
        }
      })
    }
}
</script>
<style lang="less" scoped>
 .iconlabelUrl {
  width: 80px;
  height: 80px;
}
#tittle .ivu-form-item-error-tip{
  top: 430px
}
</style>