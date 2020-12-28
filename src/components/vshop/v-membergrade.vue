<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员等级</span>
      </p>
    </div>
    <div class="contentcss">
    <div id="application_table">
      <Table border highlight-row :columns="columns7" :data="data6"></Table>
      <!-- <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div> -->
    </div> 
    </div>
    <Modal
        v-model="modal2"
        title="编辑等级信息"
        @on-ok="handleSubmit2('formValidate')"
        @on-cancel="handleReset2('formValidate')"
        :mask-closable="false"
        width:600
        :loading="loading">
    <div>
      <Form class="pl10" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="等级名称" prop="gradeName">
            <Input v-model="formValidate.gradeName" disabled style="width:300px" placeholder="如：张先生"></Input>
        </FormItem>
        <FormItem label="显示序号" prop="displayNumber">
            <Input v-model="formValidate.displayNumber" disabled style="width:300px" placeholder="如：20岁"></Input>
        </FormItem>
        <FormItem label="说明" prop="explain">
            <Input v-model="formValidate.explain" style="width:300px" placeholder="如：100万"></Input>
        </FormItem>
        <FormItem label="获得徒弟奖励" prop="disciple">
            <Input v-model="formValidate.disciple" style="width:300px" placeholder="如：10个月"></Input>
        </FormItem>
        <FormItem label="获得徒孙奖励" prop="disciples">
          <Input v-model="formValidate.disciples" style="width:300px" placeholder="如：本地户籍"></Input>
        </FormItem>
    </Form>
    </div>       
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      modal2: false,
      credittitle: "添加虚拟数据",
      // total: 0,
      // startRow: 1,
      // endRow: 10,
      code: "",
      userModelCode: "",
      formValidate: {
        gradeName: "",
        displayNumber: "",
        explain: "",
        disciple: "",
        disciples: ""
      },
      userrole: [],
      interest: [],
      ruleValidate: {
        disciple: [
          { required: true, message: "请输入获得徒弟奖励", trigger: "blur" },
          // {
          //   required: true,
          //   message: "金额最多输入7位数字(单位)",
          //   pattern: /^(0|[1-9][0-9]{0,6}[\u4e00-\u9fa5]+)$/,
          //   trigger: "blur"
          // }
        ],
        disciples: [
          { required: true, message: "请输入获得徒孙奖励", trigger: "blur" },
          // {
          //   required: true,
          //   message: "期限最多输入10个字符",
          //   pattern: /^[\u4e00-\u9fa5_0-9_]{1,10}$/,
          //   trigger: "blur"
          // }
        ]
      },
      columns7: [
        {
          title: "会员等级名称",
          key: "vipDesc",
          minWidth: 100,
          align: "center"
        },
        {
          title: "显示序号",
          key: "vipOrder",
          minWidth: 160,
          align: "center"
        },
        {
          title: "原价",
          key: "originalPrice",
          minWidth: 160,
          align: "center"
        },
        {
          title: "现价",
          key: "currentPrice",
          minWidth: 120,
          align: "center"
        },
        {
          title: "说明",
          key: "vipExplain",
          minWidth: 120,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let params1 = params.row
                      // 编辑回显
                      this.formValidate.gradeName = params1.vipDesc;
                      this.formValidate.displayNumber = params1.vipOrder;
                      this.formValidate.explain = params1.vipExplain+''
                      this.formValidate.disciple = params1.firstLevel+''
                      this.formValidate.disciples = params1.secondLevel+''
                      this.vipCode = params1.vipCode
                      console.log(params1.describe)
                      this.modal2 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data6: [],
      vipCode:""
    };
  },
  methods: {
    // 分页
    // pageChange(page) {
    //   this.startRow = page;
    //   this.inquire();
    // },
    // pagesizechange(page) {
    //   this.startRow = 1;
    //   this.endRow = page;
    //   this.inquire();
    // },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          this.changeLoading();
          this.addpersonnel();
        }
      });
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
      this.interest = [];
      this.formValidate.interest = [];
    },
    // 新增/编辑
    addpersonnel() {
      let list = {
        vipExplain: this.formValidate.explain,
        firstLevel:this.formValidate.disciple,
        secondLevel:this.formValidate.disciples,
        vipCode:this.vipCode
      };
      this.request("/vshop/vshopVip/updateByCode", list, data => {
        const title = "提示";
        let content = "<p>编辑成功</p>";
        this.$Modal.success({
          title: title,
          content: content,
          onOk: () => {
            this.modal2 = false;
            this.inquire();
            this.interest = [];
            this.formValidate.interest = [];
          }
        });
        this.$refs["formValidate"].resetFields();
      },err=>{ this.loading3 = false})
    },
    // 列表查询
    inquire() {
      let list = {
        pageNum: this.startRow,
        pageSize: this.endRow
      };
      this.request("/vshop/vshopVip/queryListAll", list, data => {
        this.data6 = data.dataList;
        // this.total = data.total;
        // this.startRow = Math.ceil(data.startRow / this.endRow);
      });
    }
  },
  mounted() {
    this.inquire();
  }
};
</script>
<style lang="less" scoped>
#application_table {
  margin-top: 10px;
}
</style>
