<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;信贷设置>&nbsp;会员权益</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="left">
                <ul class="querysty">
                    <li>
                        <span>权益名称:</span>
                        <Input v-model="interests" class="mr20" placeholder="请输入权益名称" style="width: 150px"></Input>
                    </li>
                    <li>
                        <span>权益状态:</span>
                        <Select v-model="statusCode" class="mr20" placeholder="权益状态" style="width:150px" @on-change="statusChange">
                            <Option value="''" >权益状态</Option>
                            <Option v-for="item in equitytype" :value="item.value" >{{item.label}}</Option>
                        </Select>
                    </li>
                    <!-- <li>
                        <span>权益类型:</span>
                        <Select v-model="typeCode" class="mr20" placeholder="权益类型" style="width:150px" @on-change="typeChange">
                            <Option v-for="item in typeList" :value="item.memberEquityTypeCode" :key="item.memberEquityTypeCode">
                                {{ item.memberEquityTypeName }}
                            </Option>
                        </Select>
                    </li> -->
                    <li>
                        <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
                            <span v-if="!loading3">查询</span>
                            <span v-else>查询</span>
                        </Button>
                    </li>
                    <li>
                        <Button type="info" @click="addinterests(1)" shape="circle" icon="plus-round">添加会员权益</Button>
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
        <Modal
        v-model="modal2"
        :title=credittitle
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        :loading="loading">
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
        
        <FormItem label="权益名称" prop="equityname">
            <Input v-model="formValidate.equityname" style="width:200px"  placeholder="请输入最多5个字"></Input>
        </FormItem>
        <FormItem label="副标题" prop="subheading">
            <Input v-model="formValidate.subheading" style="width:200px" placeholder="请输入最多12个字"></Input>
        </FormItem>
        <!-- 抢单侠5期 -->
        <FormItem label="是否跳转" prop="doJump">
            <Select v-model="formValidate.doJump" @on-change="jumpTypeChange" style="width:200px" placeholder="请选择">
                <Option v-for="item in doJumpList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem v-if="formValidate.doJump == 1" label="跳转类型" prop="jumpType">
            <Select v-model="formValidate.jumpType" style="width:200px" placeholder="请选择">
                <Option v-for="item in jumpTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
				<!-- 原生跳转 -->
				<FormItem v-if="jumpTypeChange1 && formValidate.jumpType === '0'" prop="jumplink"> 
            <Select v-model="formValidate.jumplink" style="width:200px" placeholder="请选择">
                <Option v-for="item in jumplinkList" :value="item.data" :key="item.data">{{ item.title }}</Option>
            </Select>
        </FormItem>
				<!-- h5拼接链接 -->
				<FormItem v-if="jumpTypeChange1 && formValidate.jumpType === '1'" prop="jumpH5link">
            <Input v-model="formValidate.jumpH5link" style="width:200px"  placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="用户组" prop="userCode">
            <Select v-model="formValidate.userCode" @on-change="usergroup" style="width:200px"   placeholder="请选择">
                <Option v-for="item in userGroup" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="权益图标" prop="productlogo">
            <img :src="formValidate.labelUrl" alt="" class="mechimg left">
            <Upload
            :show-upload-list='false'
            :format="['jpg','jpeg','png', 'gif']"
            :max-size="2048"
            :before-upload="handleUploadicon"
            :on-format-error="handleFormatError1"
            action=""
            >
            <Input v-model="formValidate.productlogo" disabled style="width: 50px;"  class="left ml5 hidden"></Input>
            <Button  type="ghost" icon="ios-cloud-upload-outline" style="margin-top:15px" class="left ml10 w90" >上传图片</Button>
            </Upload>
        </FormItem>
        <FormItem label="权益示例图" prop="productlogoQ">
            <img :src="formValidate.labelUrlQ" alt="" class="mechimg left">
            <Upload
            action=""
            :show-upload-list='false'
            :format="['jpg','jpeg','png', 'gif']"
            :max-size="2048"
            :before-upload="handleUploadiconQ"
            :on-format-error="handleFormatError1Q"
            >
            <Input v-model="formValidate.productlogoQ" disabled style="width: 50px;"  class="left ml5 hidden"></Input>
            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:15px" class="left ml10 w90" >上传图片</Button>
            </Upload>
        </FormItem>
        <FormItem label="权益按钮名称" prop="memo">
            <Input v-model="formValidate.memo" style="width:200px"  placeholder="请输入权益按钮名称"></Input>
        </FormItem>
        <!-- 抢单侠5期 结束 -->
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
      interests: "",
      statusCode: "",
      // typeCode: "",
      statusList: [],
      // typeList: [],
      equitytype: [],
      memberEquityCode: "",
      userGroup: [],
      loading: true,
      loading3: false,
      modal2: false,
      credittitle: "添加权益",
      frontFlag: "",
      options4: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      memberEquityTypeDetailsName: "",
			memberEquityTypeName: "",
			doJumpList:[
				{label:'跳转',value:'1'},
				{label:'不跳转',value:'0'},
			],
			jumpTypeList:[
				{label:'H5',value:'1'},
				{label:'原生',value:'0'},
			],
			jumplinkList:[],
      formValidate: {
        equityname: "",
				subheading: "",
				doJump:"",
				jumpType:"",
				productlogo: "",
				productlogoQ:"",
				labelUrl: require("../../image/moren.png"),
				labelUrlQ: require("../../image/moren.png"),
				jumplink:"",
				jumpH5link:"",
        memo: "",
        userCode: ""
      },
      ruleValidate: {
        equityname: [
          { required: true, message: "请输入权益名称", trigger: "blur" },
          { type: 'string', max: 5, message: '权益名称最多5个字', trigger: 'change' }
        ],
        subheading: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { type: 'string', max: 12, message: '副标题最多输入12个字', trigger: 'change' }
          // {
          //   type: "string",
          //   message: "副标题最多输入12个字",
          //   pattern: /^[\u4e00-\u9fa5]{1,12}$/,
          //   trigger: "blur"
          // }
        ],
        doJump:[
        	{required: true, message: '请选择是否跳转', trigger: 'change' },
        ],
        jumpType: [
        	{ required: true,  message: '请选择跳转类型', trigger: 'change' }
				],
				jumplink:[
        	{ required: true,  message: '请选择跳转链接', trigger: 'blur' }
				],
				jumpH5link:[
        	{ required: true,  message: '请输入跳转链接', trigger: 'change' }
				],
        productlogo: [
          { required: true, message: "请选择图片", trigger: "blur" }
				],
        userCode: [
          { required: true, message: "请选择用户组", trigger: "blur" }
        ],
      },
      columns: [
        {
          title: "权益名称",
          key: "memberEquityName",
          align: "center",
          minWidth: 100
        },
        {
          title: "副标题",
          key: "memberEquitySubheading",
          align: "center",
          minWidth: 150
        },
        {
          title: "跳转",
          key: "targetViewText",
          align: "center",
          minWidth: 100,
          // render: (h, params) => {
          //   return h("div", [h("span", {}, memberEquityUserGroup== 0?"全部用户":"会员用户")])
          // }
        },
        {
          title: "图标",
          key: "",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "img",
                {
                  style: {
                    width: "30px",
                    height: "30px"
                  },
                  attrs: {
                    src: params.row.memberEquityImg
                  }
                },
                params.row.memberEquityImg
              )
            ]);
          }
        },
        {
          title: "用户组",
          key: "memberEquityUserGroup",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let memberEquityUserGroup=params.row.memberEquityUserGroup
            return h("div", [h("span", {}, memberEquityUserGroup== 0?"全部用户":"会员用户")]);
          }
        },
        {
          title: "权益按钮名称",
          key: "memberEquityButtonName",
          align: "center",
          minWidth: 160
        },
        {
          title: "添加时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 160
        },
        {
          title: "权益状态",
          key: "memberEquityFalg",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let memberEquityFalg = params.row.memberEquityFalg;
            return h("div", [h("span", {}, memberEquityFalg == 0? "未上架" :memberEquityFalg == 1? "已上架" :"已下架")]);
          }
        },
        {
          title: "创建人",
          key: "memberEquityFounder",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
          render: (h, params) => {
            let status = params.row.memberEquityFalg;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: status == 0 || status == 2 ? "success" : "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let memberEquityCode = params.row.memberEquityCode;
                      if (status == 1) {
                        this.stopStart(
                          {
                            memberEquityFalg: 2,
                            memberEquityCode: memberEquityCode
                          },
                          "确认要下架该权益吗？"
                        );
                      } else {
                        this.stopStart(
                          {
                            memberEquityFalg: 1,
                            memberEquityCode: memberEquityCode
                          },
                          "确认要上架该权益吗？"
                        );
                      }
                    }
                  }
                },
                status == 1 ? "下架" : "上架"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.memberEquityFalg == 1 ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.addinterests(params.row.memberEquityCode);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.memberEquityFalg != 1|| (params.index==0  && this.startRow == 1)? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.http.post(BASE_URL+'/loan/loanMemberEquity/moveUp',{data:params.row.memberEquityCode}).then(data=>{
                        console.log(data)
                        if(data.code=="success"){
                          this.queryList()
                        }
                      }).catch(err=>{console.log(err)})
                    }
                  }
                },
                "上移"
              )
            ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 20,
      pageUrl: "",
      jumpTypeChange1:false,
    };
  },
  methods: {
    statusChange(statusCode) {
      this.statusCode = statusCode;
    },
    usergroup(userCode) {
      this.formValidate.userCode = userCode;
    },
    // 是否跳转
    jumpTypeChange(v){
      if(v == 1){
        this.jumpTypeChange1 = true
      } else {
        this.jumpTypeChange1 = false
      }
    },
    // 分页
    pageChange(pagenumber) {
      this.startRow = pagenumber;
      this.queryList(this.startRow);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(this.startRow);
    },
    // 查询
    queryList(startRow) {
      let list = {
        memberEquityName: this.interests, //权益名称
        memberEquityFalg: this.statusCode == "''" ? "" :this.statusCode, //权益状态
        // memberEquityTypeCode: this.typeCode, //权益类型
        pageNum: startRow,
        pageSize: this.endRow
      };
      this.http
        .post(BASE_URL + "/loan/loanMemberEquity/selectQueryList", list)
        .then(data => {
          if (data.code == "success") {
            this.data1 = data.data.dataList;
            this.total = Number(data.data.total);
            this.startRow =
              Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    // 添加/编辑
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.changeLoading();
        } else {
          this.changeLoading();
          if(this.formValidate.productlogoQ != "" && this.formValidate.memo == ""){
            this.$Message.info("请输入权益按钮名称")
            return false
          } 
          if(this.formValidate.memo.length > 8){
            this.$Message.info("权益按钮名称最多8个字")
            return false
          }
          this.addEquityPreservation();
          this.$refs[name].resetFields();
        }
      });
    },
    handleReset2(name) {
			// 图片还原
			this.imgHuyuan()
      this.$refs[name].resetFields();
    },
    // 新增/编辑保存
    addEquityPreservation() {
      let list = {
        memberEquityName: this.formValidate.equityname, //权益名称
        memberEquitySubheading: this.formValidate.subheading, //副标题
				memberEquityImg: this.formValidate.productlogo, //权益图标
				memberEquityViewImg: this.formValidate.productlogoQ, //权益实例图
        memberEquityUserGroup: this.formValidate.userCode, //用户组
				memberEquityButtonName: this.formValidate.memo, //按钮名称
				memberEquityTarget: this.formValidate.doJump,//s是否跳转
        memberEquityTargetType: this.formValidate.jumpType,// 跳转类型
				memberEquityTargetUrl: this.formValidate.jumpType != '1' ? this.formValidate.jumplink : this.formValidate.jumpH5link,//跳转地址
        frontFlag: this.frontFlag,
        pageUrl: this.pageUrl,
        memberEquityTypeDetailsName: this.memberEquityTypeDetailsName,
        memberEquityTypeName: this.memberEquityTypeName
      };
      let urls;
      let content;
      if (this.credittitle == "添加权益") {
        urls = "/loan/loanMemberEquity/save";
        content = "新增成功";
      } else {
        list.memberEquityCode = this.memberEquityCode;
        urls = "/loan/loanMemberEquity/updateByCode";
        content = "编辑成功";
      }
      this.http
        .post(BASE_URL + urls, list)
        .then(data => {
          if (data.code == "success") {
            this.$Modal.success({
              title: "提示",
              content: "<p>" + content + "</p>",
              onOk: () => {
                this.modal2 = false;
                this.queryList(1);
              }
						});
						// 图片还原
            this.imgHuyuan()
          } else {
            this.$Message.error(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 弹框
    addinterests(num) {
      if (num == 1) {
        this.imgHuyuan()
        this.credittitle = "添加权益";
      } else {
        this.credittitle = "编辑权益";
        this.memberEquityCode = num;
        this.http
          .post(BASE_URL + "/loan/loanMemberEquity/getByCode", {
            memberEquityCode: num
          })
          .then(data => {
            if (data.code == "success") {
              let params =data.data
              if(params.memberEquityTargetType == 0){
                
              } else {
                
              }
              
              if ( params.memberEquityTargetType == 1) {
                this.jumpTypeChange1 = true
                this.formValidate.jumpH5link = params.memberEquityTargetUrl// 跳转地址
              } else {
                this.jumpTypeChange1 = false
                this.formValidate.jumplink = params.memberEquityTargetUrl
              }
              this.formValidate.equityname = params.memberEquityName,
              this.formValidate.subheading = params.memberEquitySubheading, //副标题
              this.formValidate.doJump = params.memberEquityTarget+'',//s是否跳转
              this.formValidate.jumpType = params.memberEquityTargetType +'',// 跳转类型
              
               // 跳转地址
              this.formValidate.productlogoQ = params.memberEquityViewImg//权益示例图
              this.formValidate.labelUrlQ = params.memberEquityViewImg ? params.memberEquityViewImg : require("../../image/moren.png") ,
              this.formValidate.labelUrl = params.memberEquityImg,
              this.formValidate.productlogo = params.memberEquityImg, //权益图标
              this.formValidate.userCode = String(
                params.memberEquityUserGroup
              ), //用户组
              this.formValidate.memo = params.memberEquityButtonName; //备注
            }
          });
      }
      this.modal2 = true;
    },
    // 上下架判断
    stopStart(data, text) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>" + text + "</p>",
        onOk: () => {
          this.post(
            "/loan/loanMemberEquity/updateByCodeTwo",
            data,
            resp => {
              if (resp.code == "success") {
                this.queryList(1);
              } else {
                this.$Message.error(data.message);
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        onCancel: () => {}
      });
    },
    post(httpUrl, params, callback, errback) {
      this.http
        .post(BASE_URL + httpUrl, params)
        .then(data => {
          return callback(data);
        })
        .catch(err => {
          errback(err);
        });
		},
    // 图片上传
    handleUploadicon(file) {
			this.fileMethod(file,1)
		},
		handleUploadiconQ(file) {
			this.fileMethod(file,2)
		},
		fileMethod(file,num){
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
							if(num == 1){
								this.formValidate.labelUrl = resp.data;
              	this.formValidate.productlogo = resp.data;
							} else if(num ==2){
								this.formValidate.labelUrlQ = resp.data;
              	this.formValidate.productlogoQ = resp.data;
							}
            }
          })
          .catch(() => {});
        // this.formValidate.productlogo = file.name;
        return false;
      }
		},
    handleFormatError1(file) {
      this.$Message.error("图片格式不正确,请上传正确的图片格式");
		},
		handleFormatError1Q(file) {
      this.$Message.error("图片格式不正确,请上传正确的图片格式");
		},
		imgHuyuan(){
			this.formValidate.labelUrl = require("../../image/moren.png");
			this.formValidate.productlogo = "";
			this.formValidate.labelUrlQ = require("../../image/moren.png");
			this.formValidate.productlogoQ = "";
			this.formValidate.jumplink = ""
      this.formValidate.jumpH5link = ""
      this.formValidate.jumpType = ""
		}
  },
  mounted() {
    // 权益状态
    this.http
      .post(BASE_URL + "/loan/loanMemberEquity/optionList", {data:utils.getCookie('appCode')})
      .then(data => {
        if (data.code == "success") {
          this.equitytype = data.data.memberEquityFalg;
          this.userGroup = data.data.memberEquityUserGroupFalg;
          this.jumplinkList = data.data.appJumpList
        }
      })
      .catch(error => {
        console.log(error);
      });
    // 权益类型
    // this.http
    //   .post(BASE_URL + "/loan/loanMemberEquityType/typeAndDetailQuery", {})
    //   .then(data => {
    //     if (data.code == "success") {
    //       // this.typeList = data.data;
    //       // this.equityList = data.data
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.queryList(1);
  }
};
</script>
<style lang="less" scoped>
.mechimg {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
</style>