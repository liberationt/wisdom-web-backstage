<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置</span>
        </p>
      </div>
      <div class="homePage contentcss">        
        <Form class="p20" :label-width="80">
          <FormItem >
              <h1 class="homePage_h1">
                {{requireTemplate.title}}
              </h1>            
          </FormItem>
          <FormItem v-for="item in requireTemplate.data" :label="item.templateConfigName">
            <Input style="width:500px" v-model="item.templateConfigValue" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入模板内容,不少于30个字符"></Input>
          </FormItem>
          <FormItem >
            <h1 class="homePage_h1">
                {{applayTemplate.title}}
            </h1>
          </FormItem>
          <FormItem v-for="item in applayTemplate.data" :label="item.templateConfigName" >
            <Input style="width:500px" v-model="item.templateConfigValue " type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入模板内容,不少于30个字符"></Input>
          </FormItem>
          <FormItem class="tc mt50"  >
            <Button type="primary" @click="handleSubmit">保存</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button @click="operationlog">查看操作日志</Button>
          </FormItem>
        </Form>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      desctwo: "",
      descthree: "",
      applytwo: "",
      applythree: "",
      loading: true,
      applayTemplate: {},
      requireTemplate: {},
      applytemone: true
    };
  },
  created() {},
  methods: {
    handleSubmit() {
      this.applytemone = true;
      let list = [];
      this.applayTemplate.data.forEach(element => {
        list.push(element);
      });
      this.requireTemplate.data.forEach(element => {
        list.push(element);
      });
      this.validate(list);
      if (this.applytemone) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "确认提交保存吗？",
          onOk: () => {
            this.http
              .post(
                BASE_URL + "/loan/templateConfig/batchUpdateTemplateConfig",
                list
              )
              .then(resp => {
                if (resp.code == "success") {
                      this.inquireabout();
                     this.$Message.success('保存成功');
                } else {
                  this.$Message.info(resp.message);
                }
              })
              .catch(() => {});
          },
          onCancel: () => {}
        });
      }
    },
    changeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        this.loading = true;
      });
    },
    validate(list) {
      list.forEach(element => {
        if (
          element.templateConfigName == "模板一" &&
          element.templateConfigValue == ""
        ) {
          this.$Modal.warning({
            title: "温馨提示",
            content: "<p>模板一不能为空</p>"
          });
          this.applytemone = false;
          return false;
        }
        if (element.templateConfigName == "模板二") {
          if (
            element.templateConfigValue != "" &&
            element.templateConfigValue.length < 30
          ) {
            this.$Modal.warning({
              title: "温馨提示",
              content:
                "<p>" +
                element.templateConfigName +
                "内容输入不得少于30个字符</p>"
            });
            this.applytemone = false;
            return false;
          }
        }
        if (element.templateConfigName == "模板三") {
          if (
            element.templateConfigValue != "" &&
            element.templateConfigValue.length < 30
          ) {
            this.$Modal.warning({
              title: "温馨提示",
              content:
                "<p>" +
                element.templateConfigName +
                "内容输入不得少于30个字符</p>"
            });
            this.applytemone = false;
            return false;
          }
        }
      });
    },
    inquireabout() {
      // 查询模板
      this.http
        .post(BASE_URL + "/loan/templateConfig/queryTemplateConfigList", {})
        .then(resp => {
          if (resp.code == "success") {
            this.applayTemplate = resp.data.applayTemplate;
            this.requireTemplate = resp.data.requireTemplate;
          } else {
            this.$Message.info(resp.message);
          }
        })
        .catch(() => {});
    },
    operationlog() {
      this.$router.push({
        path: "./operationLog?operationType=template_config_edit"
      });
    }
  },
  mounted() {
    this.inquireabout();
  }
};
</script>
<style lang="less" scoped>
.homePage_button {
  width: 80px;
  border-radius: 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
.homePage {
  margin-bottom: 25px;
  width: 100%;
  border-radius: 5px;
  // border: 1px solid #ccc;
  padding-bottom: 30px;
  padding-left: 20px;
  background: #fff;
}
.homePage_h1 {
  border-bottom: 1px solid #ccc;
  padding: 10px 0 5px 0;
  width: 800px;
}
</style>
