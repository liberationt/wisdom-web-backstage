<template>
    <div>
        <div class="navigation">
            <p>
                <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷设置>&nbsp;批量调整</span>
            </p>
        </div>
        <div class="clearfix contentcss">
          <div class="left">
              <ul class="querysty">
                  <!-- 5期新加数据 -->
                  <li>
                    <span>调整类型 :</span>
                    <Select v-model="adjustType" placeholder="调整类型" class="mr10" style="width:150px">
                      <Option value="''">请选择</Option>
                      <Option v-for="item in adjustTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li>
                      <span>创建时间 :</span>
                      <DatePicker type="date" :value="beginTime" @on-change="beginTimeChange" placeholder="开始时间"
                      style="width: 150px"></DatePicker>
                      <span>  -  </span>
                      <DatePicker type="date" :value="endTime" @on-change="endTimeChange" placeholder="结束时间"
                      style="width: 150px"></DatePicker>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 w100" :loading="loading3" @click="queryList(1)">
                      <span v-if="!loading3">查询</span>
                      <span v-else>查询</span>
                  </Button>
                  </li>
                  <li>
                  <Button type="info" class=" ml20 w100" @click="refuse">
                      <span>上传文件</span>
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
      <!-- 文件上传 -->
      <Modal title="上传文件" v-model="modal9" @on-ok="upload('formValidate')" @on-cancel="cancel('formValidate')" ok-text="上传" cancel-text="取消" class-name="vertical-center-modal" width="500" :loading="loading" :mask-closable="false">
        <div class="newtype_file mt15 mb15 pl10">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="调整类型：" prop="adjustType">
              <Select  v-model="formValidate.adjustType" style="width:260px">
                  <Option v-for="item in adjustTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="选择文件:" prop="updateFile">
              <Input v-model="formValidate.updateFile" disabled style="width: 225px" class="left ml5"></Input>
              <Upload ref="upload" :before-upload="handleUpload" :show-upload-list="false" :format="['xlsx', 'xls']" action='' :on-format-error="handleFormatError2">
                <Button type="ghost" style="margin-top:-3px" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </FormItem>
            <FormItem label="备注:" prop="remarks">
              <Input v-model="formValidate.remarks"></Input>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      adjustType:"",
      adjustTypeList:[],
      beginTime: "",
      endTime: "",
      loading3: false,
      modal9: false,
      loading: true,
      formValidate: {
          adjustType: '',
          updateFile: '',
          remarks: ''
      },
      ruleValidate: {
        adjustType: [
          { required: true, message: '请选择调整类型', trigger: 'change' }
        ],
        updateFile: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请填写备注', trigger: 'blur' },
          { max: 50, message: '请输入1-50个字', trigger: 'blur' },
        ],
      },
      columns: [
        {
          title: "批次编号",
          key: "batchNo",
          align: "center",
          minWidth: 160,
        },
        {
          title: "调整类型",
          key: "adjustType",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let adjustType = params.row.adjustType
            return h("div", [h("span", {}, adjustType==0?"其他调整":adjustType==1? "赞豆": adjustType==2? "会员" :adjustType==3? "抢单券":"优惠券-充值满减券" )]);
          }
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 180
        },
        {
          title: "上传总数",
          key: "totalCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "成功数量",
          key: "successCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "失败数量",
          key: "failCount",
          align: "center",
          minWidth: 180
        },
        {
          title: "创建时间",
          key: "uploadTime",
          align: "center",
          minWidth: 180,
        },
        {
          title: "操作人",
          key: "operateUserName",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 100,
          fixed: "right",
          render: (h, params) => {
            let arr = [];
            arr.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled : params.row.disposeStatus == 2 ? false : true
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                        let formData = new FormData()
                        formData.append("batchNo",params.row.batchNo)
                        formData.append("adjustType",params.row.adjustType)
                        utils.exporttable(BASE_URL+'/loan/batchHead/downloadByBatchNo', utils.getlocal('token'),formData, e => {
                          // console.log(e)
                          if(e == true ){
                            
                          }
                        })
                    }
                  }
                },
                "下载"
              )
            );
            return h("div", arr);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10,
      applicationname: "",
      filePathUrl: '',
      fileName: '',
      fileerror:''
    };
  },
  methods: {
    beginTimeChange(begingTime) {
      this.beginTime = begingTime;
    },
    endTimeChange(endTime) {
      this.endTime = endTime;
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
    //查询
    queryList(startRow) {
      let date1 = Date.parse(new Date(this.beginTime)) / 1000;
      let date2 = Date.parse(new Date(this.endTime)) / 1000;
      if (date1 > date2) {
        this.$Modal.warning({
          title: "提示",
          content: "<p>开始时间不得大于结束时间</p>"
        });
        return false;
      }
      this.loading3 = true;
      let urls = "/loan/batchHead/queryList"
      let data = {
        adjustType: this.adjustType=="''"? "":this.adjustType,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + urls, data)
        .then(data => {
          if (data.code == "success") {
            this.data1 = data.data.dataList;
            this.total = data.data.total;
            Math.ceil(data.data.startRow / this.endRow1) == 0
              ? 1
              : Math.ceil(data.data.startRow / this.endRow1);
            this.loading3 = false;
          } else {
            this.loading3 = false;
          }
        })
        .catch(err => {
          this.loading3 = false;
          console.log(err);
        });
    },
    // 弹框显示
    refuse() {
      this.modal9 = true
    },
    // 文件上传确认
    upload(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.filePathUrl == ""){
            this.$Message.info('文件正在上传中。。。');
            this.changeLoading()
            return false
          }
          this.http.post(BASE_URL+"/loan/batchHead/upload",{remark : this.formValidate.remarks,filePathUrl :this.filePathUrl,fileName :this.formValidate.updateFile,adjustType:this.formValidate.adjustType}).then(data=>{
            if(data.code == 'success'){
              this.$Message.success('上传成功！');
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: !data.message  ? "系统有误！"  : data.message
              })
            }
            this.modal9 = false
            this.queryList()
            this.changeLoading()
            this.$refs[name].resetFields();
          }).catch(err=>{})
        } else {
          this.changeLoading()
        }
      })
    },
    cancel(name){
      this.$refs[name].resetFields();
    },
    // 上传格式校验
    handleFormatError2(file) {
      this.value9 = ''
      this.$Message.info("文件格式不正确,请上传excel格式文件")
    },
    // 调整类型数据
    adjustTypeListC(){
      this.http.post(BASE_URL+'/loan/batchHead/showAdjustType',{}).then(data=>{
        console.log()
        if(data.code == 'success'){
          this.adjustTypeList = data.data
        }
      })
    },
    // 选择文件后回调
		handleUpload(file) {
				 if(file.size > 22949339){
					this.value9 = ""
					this.$Message.info("请选择20兆以内的文件")
					return false
				}
				let splic = file.name.split('.')
				if (splic[splic.length-1] == 'xlsx' || splic[splic.length-1] == 'xls') {
          this.filePathUrl = ''
          this.formValidate.updateFile = file.name
					this.fileerror = ''
					let formData = new FormData()
					formData.append('file', file)
					formData.append('bucket', 'batchChange')
					formData.append('dirs', 'excel')
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						timeout:1000*60*5
					}
					this.http.post(BASE_URL + '/fileUpload', formData, config)
					.then((resp) => {
					if (resp.code == 'success') {
            this.filePathUrl = resp.data
					} else {
            this.$Message.error(resp.message)
					}
					})
					.catch(err => {
						this.fileerror = 'error'
					})
					this.value9 = file.name
					return false
				}
				
      },
      changeLoading() {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
			},
  },
  mounted() {
    this.applicationname = utils.getCookie("applicationname");
    this.queryList(1);
    this.adjustTypeListC()
  }
};
</script>
<style lang="less">
</style>