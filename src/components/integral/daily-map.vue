<template>
    <div>
      <div class="navigation">
        <p>
          <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;积分管理&nbsp;>&nbsp;日签图</span>
        </p>
      </div>
      <div class="clearfix contentcss">
        <div class="left">
          <ul class="querysty">
            <li>
              <Button type="info" class='mr20' shape="circle" icon="plus-round" @click="Interestsmodal = true">添加日签图</Button>
            </li>
            <li class="mr20">
              <span>
                <Select v-model="dateTimes" placeholder="请选择类型" style="width:100px">
                  <Option value="0" key="0">图片归属期</Option>
                  <Option value="1" key="1">添加时间</Option>
                </Select>
              </span>
              <DatePicker type="date" v-model="beginTime" placeholder="开始时间"
              style="width: 150px"></DatePicker>
              <span>  -  </span>
              <DatePicker type="date" v-model="endTime" placeholder="结束时间"
              style="width: 150px"></DatePicker>
            </li>
            <li>
              <Button type="info" class=" w100" :loading="loading3" @click="queryList(1)">
                <span v-if="!loading3">查询</span>
                <span v-else>查询</span>
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
      <!-- 添加权益 -->
      <Modal
        v-model="Interestsmodal"
        title="添加日签图"
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        :loading="loading">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
          <FormItem label="日签图名称：" prop="picName">
            <Input v-model="formValidate.picName" style="width:200px" ></Input>
          </FormItem>
          <FormItem label="日签图归属期：" prop="dailydate">
            <DatePicker type="date" :options="options3" v-model="formValidate.dailydate"></DatePicker>
          </FormItem>
          <FormItem label="上传图片" prop="productlogo">
            <img :src="formValidate.labelUrl" alt="" class="mechimg left">
            <Upload
            :show-upload-list='false'
            :format="['jpg','jpeg','png', 'gif']"
            :max-size="2048"
            :before-upload="fileMethod"
            :on-format-error="handleFormatError1"
            action=""
            >
            <Input v-model="formValidate.productlogo" disabled style="width: 50px;"  class="left ml5 hidden"></Input>
            <Button  type="ghost" icon="ios-cloud-upload-outline" style="margin-top:15px" class="left ml10 w90" >上传图片</Button>
            </Upload>
          </FormItem>
        </Form>
      </div>       
      </Modal>
      <!-- 查看大图弹框 -->
      <Modal v-model="modal11" footer-hide fullscreen title="图片详情" width="1000">
          <img :src=this.imglink alt="" style="width:970px;height:890px;">
      </Modal>
    </div>
</template>
<script>
import utils from "../../utils/utils";
export default {
  data() {
    return {
      imglink:"",
      modal11:false,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      dateTimes: "0",
      beginTime: "",
      endTime: "",
      loading: true,
      loading3: false,
      Interestsmodal: false,
      formValidate: {
        picName: "",
        dailydate: "",
        productlogo: "",
        labelUrl: require("../../image/moren.png")
      },
      ruleValidate: {
        picName: [
          { required: true, message: "请输入日签图名称", trigger: "blur" },
          {
            type: "string",
            max: 10,
            message: "日签图名称最多10个字",
            trigger: "change"
          }
        ],
        dailydate: [
          {
            required: true,
            type: "date",
            message: "请选择日签图归属期",
            trigger: "change"
          }
        ],
        productlogo: [
          { required: true, message: "请选择图片", trigger: "blur" }
        ]
      },
      columns: [
        {
          title: "日签图名称",
          key: "picName",
          align: "center",
          minWidth: 150
        },
        {
          title: "权益图片",
          key: "planPushTime",
          align: "center",
          minWidth: 120,
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
                    src: params.row.picUrl
                  },
                  on:{
                    click:()=>{
                      this.modal11=true,
                      this.imglink = params.row.picUrl
                    }
                  }
                },
                params.row.picUrl
              )
            ]);
          }
        },
        {
          title: "图片归属日期",
          key: "picDate",
          align: "center",
          minWidth: 180
        },
        {
          title: "添加时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "权益状态",
          key: "picStatus",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            let rightsStatus = params.row.picStatus;
            return h(
              "span",
              rightsStatus == "0"
                ? "已展示"
                : rightsStatus == "1"
                  ? "未展示"
                  : rightsStatus == "2"
                    ? "已过期"
                    : rightsStatus == "3" ? "已删除" : ""
            );
          }
        },
        {
          title: "创建人",
          key: "createPerson",
          align: "center",
          minWidth: 150
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: params.row.picStatus == 3 ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.dataId);
                    }
                  }
                },
                "删除" //已开始的有停止按钮，未开始的有删除按钮
              )
            ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 10
    };
  },
  methods: {
    pageChange(pageNumber) {
      this.startRow = pageNumber;
      this.queryList(pageNumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    //删除操作
    delete(pushCode) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定删除该权益图？</p>",
        onOk: () => {
          let urls = "/loan/checkInPic/deleteByCode?dataId=" + pushCode;
          this.http
            .post(BASE_URL + urls)
            .then(data => {
              if (data.code == "success") {
                this.$Message.success("删除成功");
                this.queryList(1);
              } else {
                this.$Message.error(data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 图片上传
    fileMethod(file, num) {
      let splic = file.name.split(".");
      if (
        splic[splic.length - 1] == "png" ||
        splic[splic.length - 1] == "jpg" ||
        splic[splic.length - 1] == "gif" ||
        splic[splic.length - 1] == "jpeg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", "loan");
        formData.append("dirs", "checkInPic");
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
              this.formValidate.productlogo = resp.data;
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
    // 确认添加
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.changeLoading();
        } else {
          this.http
            .post(BASE_URL + "/loan/checkInPic/save", {
              picName: this.formValidate.picName,
              picUrl: this.formValidate.productlogo,
              picDate: utils.formatDate(
                this.formValidate.dailydate,
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            .then(data => {
              this.$refs[name].resetFields();
              this.formValidate.productlogo = ""
              this.formValidate.labelUrl = require("../../image/moren.png");
              if (data.code == "success") {
                this.$Message.success("添加成功！");
                this.Interestsmodal = false;
                this.queryList(1);
              } else {
                this.$Message.error(data.message);
              }
              this.changeLoading();
            })
            .catch(err => {
              console.log(err);
              this.changeLoading();
            });
        }
      });
    },
    handleReset2(name) {
      this.formValidate.labelUrl = require("../../image/moren.png");
      this.$refs[name].resetFields();
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
      let urls = "/loan/checkInPic/queryPage";
      let beginTime =
        this.beginTime == ""
          ? ""
          : utils.formatDate(this.beginTime, "yyyy-MM-dd");
      let endTime =
        this.endTime == "" ? "" : utils.formatDate(this.endTime, "yyyy-MM-dd");
      let data = {
        pushStatus: this.statusCode == "-1" ? "" : this.statusCode,
        picDateSearchBeginTime: this.dateTimes == 0 ? beginTime : "", //查询字段:图片归属期 查询开始时间 ,
        picDateSearchEndTime: this.dateTimes == 0 ? endTime : "", //查询字段:图片归属期 查询结束时间 ,
        dataCreateSearchBeginTime:
          this.dateTimes == 1
            ? beginTime == "" ? "" : beginTime + " 00:00:00"
            : "", //结束时间 ,
        dataCreateSearchEndTime:
          this.dateTimes == 1
            ? endTime == "" ? "" : endTime + " 23:59:59"
            : "", //查询字段:数据创建 查询结束时间 ,,
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
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    }
  },
  mounted() {
    this.queryList(1);
  }
};
</script>
<style lang="less">
.mechimg {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
</style>