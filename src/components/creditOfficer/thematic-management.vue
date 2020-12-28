<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;信贷设置>&nbsp;展业工具</span>
          </p>
        </div>
        <div class="clearfix contentcss">
            <div class="left">
                <ul class="querysty">
                    <li class="mr20">
                        <Button type="info" @click="addThematic()" shape="circle" icon="plus-round">添加主题</Button>
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
        <!-- 添加主题 -->
        <Modal
          v-model="addThematicModal"
          :title=textTitle
          @on-ok="handleSubmit('formValidate')"
          @on-cancel="handleReset('formValidate')"
          :mask-closable ='false'
          :loading="loading">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="主题名称" prop="thematicName">
                  <Input v-model="formValidate.thematicName" placeholder="请输入主题名称"></Input>
              </FormItem>
          </Form>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "主题名称",
          key: "exhibitionThemeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "状态",
          key: "exhibitionThemeState",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let status = params.row.exhibitionThemeState;
            return h(
              "span",
              {},
              status == "0" ? "已下架" : "上架" 
            );
          }
        },
        {
          title: "创建时间",
          key: "dataCreateTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "操作",
          key: "",
          align: "center",
          minWidth: 180,
          fixed: "right",
          render: (h, params) => {
             let status = params.row.exhibitionThemeState;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                      display: status == "0" ? 'inline-block' : 'none'
                    },
                    on: {
                      click: () => {
                        this.addThematicModal = true
                        this.formValidate.thematicName = params.row.exhibitionThemeName
                        this.httpUrl = '/loan/exhibitionTheme/updateByCode'
                        this.exhibitionThemeCode =params.row.exhibitionThemeCode 
                        this.textTitle = '编辑主题'
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
                      size: "small",
                      type: status == "0"? "success" : "error",
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let title,exhibitionStatus
                        if(status == 1) { //
                          title = "<p>确认下架该主题吗？</p>"
                          exhibitionStatus = 0
                        } else {
                          title = "<p>确认上架该主题吗？</p>"
                          exhibitionStatus = 1
                        }
                        this.$Modal.confirm({
                          title: "温馨提示",
                          content: title,
                          onOk: () => {
                            let data = {
                              exhibitionThemeCode: params.row.exhibitionThemeCode,
                              exhibitionThemeState: exhibitionStatus
                            };
                            this.http
                              .post(
                                BASE_URL + "/loan/exhibitionTheme/updateByCode",
                                data
                              )
                              .then(data => {
                                if (data.code == "success") {
                                  this.$Message.success(data.message);
                                  this.queryList(1);
                                } else {
                                  this.$Message.error(data.message);
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                 status != "0" ? "下架" : "上架" 
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                      display: status == "0" || (params.index == 0  && this.startRow == 1) ? 'none' : 'inline-block'
                    },
                    on: {
                      click: () => {
                        this.http.post(BASE_URL+"/loan/exhibitionTheme/moveUp",{exhibitionThemeCode:params.row.exhibitionThemeCode}).then(data=>{
                          if(data.code=="success"){
                            this.queryList(1)
                          } else {
                            this.$Message.error(data.message)
                          }
                        }).catch(err=>{})
                      }
                    }
                  },
                  '上移'
                )
              ]);
          }
        }
      ],
      data1: [],
      total: 0,
      startRow: 1,
      endRow: 20,
      addThematicModal: false,
      formValidate: {
        thematicName: ""
      },
      ruleValidate: {
        thematicName: [
          {
            required: true,
            message: "请输入主题名称",
            trigger: "blur"
          },
          { max: 5, message: '主题名称最多输入5个字', trigger: 'blur' }
        ]
      },
      loading: true,
      httpUrl:"",
      exhibitionThemeCode:"",
      textTitle:'添加主题'
    };
  },
  methods: {
    pageChange(pagenumber) {
      this.startRow = pagenumber;
      this.queryList(pagenumber);
    },
    pagesizechange(pagesize) {
      this.startRow = 1;
      this.endRow = pagesize;
      this.queryList(1);
    },
    queryList(startRow) {
      let data = {
        pageSize: this.endRow,
        pageNum: startRow
      };
      this.http
        .post(BASE_URL + "/loan/exhibitionTheme/queryPage", data)
        .then(data => {
          if (data.code == "success") {
            this.data1 = data.data.dataList;
            this.total = data.data.total;
            this.startRow = Math.ceil(data.data.startRow / this.endRow) == 0
                ? 1
                : Math.ceil(data.data.startRow / this.endRow);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addThematic() {
      // 添加主题
      this.addThematicModal = true;
      this.formValidate.thematicName = ""
      this.httpUrl = '/loan/exhibitionTheme/save'
    },
    // 添加主题确认框
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let dataList = {exhibitionThemeName :this.formValidate.thematicName},TextTrack
          if(this.textTitle == '添加主题'){
            TextTrack ='添加成功！'
          } else {
            dataList.exhibitionThemeCode = this.exhibitionThemeCode
            TextTrack ='编辑成功！'
          }
          this.http.post(BASE_URL+ this.httpUrl,dataList).then(data=>{
            if(data.code == 'success'){
              this.$Message.success(TextTrack)
              this.addThematicModal = false
              this.queryList(1)
            } else {
              this.$Message.success(data.message)
            }
            this.changeLoading();
          }).catch(err=>{
            console.log(err)
            this.changeLoading();
          })
        } else {
          this.changeLoading();
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields()
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
<style lang="less" scoped>
</style>