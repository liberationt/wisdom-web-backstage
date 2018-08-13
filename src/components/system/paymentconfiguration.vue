<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
      </p>
    </div>
    <div>
        <Table border :columns="columns1" :data="data1" class="mt15"></Table>
        <p class="tc mt50">
            <Button type="primary">保存设置</Button>
        </p>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      vaue1: "njgre",
      columns1: [
        {
          title: "产品",
          key: "appName",
          align: "center"
        },
        {
          title: "余额支付",
          key: "age",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: "图中点选"
                },
                style: {
                  width: "160px"
                },
                on: {
                  "on-change": val => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h("Option", {
                  props: {
                    value: this.vaue1
                  }
                }),
                h(
                  "Option",
                  {
                    props: {
                      value: "滑动拼图"
                    }
                  },
                  "滑动拼图"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "智能无感知"
                    }
                  },
                  "智能无感知"
                )
              ]
            );
          }
        },
        {
          title: "支付宝",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: "图中点选"
                },
                style: {
                  width: "160px"
                },
                on: {
                  "on-change": val => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "图中点选"
                    }
                  },
                  "图中点选"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "滑动拼图"
                    }
                  },
                  "滑动拼图"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "智能无感知"
                    }
                  },
                  "智能无感知"
                )
              ]
            );
          }
        },
        {
          title: "微信",
          key: "age",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: "图中点选"
                },
                style: {
                  width: "160px"
                },
                on: {
                  "on-change": val => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "图中点选"
                    }
                  },
                  "图中点选"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "滑动拼图"
                    }
                  },
                  "滑动拼图"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "智能无感知"
                    }
                  },
                  "智能无感知"
                )
              ]
            );
          }
        },
        {
          title: "银联",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: "图中点选"
                },
                style: {
                  width: "160px"
                },
                on: {
                  "on-change": val => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "图中点选"
                    }
                  },
                  "图中点选"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "滑动拼图"
                    }
                  },
                  "滑动拼图"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "智能无感知"
                    }
                  },
                  "智能无感知"
                )
              ]
            );
          }
        },
        {
          title: "百度钱包",
          key: "age",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: "图中点选"
                },
                style: {
                  width: "160px"
                },
                on: {
                  "on-change": val => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "图中点选"
                    }
                  },
                  "图中点选"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "滑动拼图"
                    }
                  },
                  "滑动拼图"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "智能无感知"
                    }
                  },
                  "智能无感知"
                )
              ]
            );
          }
        }
      ],
      type: "radio",
      value: 0,
      data1: [
        {
          name: "John Brown",
          value: 0
        },
        {
          name: "Jim Green",
          value: 0
        },
        {
          name: "Joe Black",
          value: 0
        },
        {
          name: "Jon Snow",
          value: 0
        }
      ]
    };
  },
  methods: {
    gread() {
      this.$router.push({ path: "./managementGrade" });
    }
  },
  mounted() {
    this.http
      .post(BASE_URL + "/loan/payment/getAppPaymentList", {})
      .then(resp => {
        console.log(resp);
        if (resp.code == "success") {
          const { appPaymentList, paymentList, appList } = resp.data;
          if (appList && appPaymentList) {
            let apendAppList = [];
            appList.map(o => {
              const defaultValues = appPaymentList[o["appId"]];

              let defaultValuesObject = {};
              if (defaultValues && defaultValues.length > 0) {
                defaultValues.map(item => {
                  defaultValuesObject[item["paymentCode"]] =
                    item["channelName"];
                });

                apendAppList.push(Object.assign(o, defaultValuesObject));
              }
            });
            console.log(apendAppList);
            this.data1 = apendAppList;
          } else {
            this.data1 = appList;
          }
          if (paymentList && appPaymentList) {
            let columns = [];
            columns.push({
              title: "产品",
              key: "appName",
              align: "center"
            });
            console.log("asdfasdfasdf12");
            paymentList.map(o => {
              console.log("asdfasdfasdf11");

              columns.push({
                title: o["paymentName"],
                align: "center",
                render: (h, params) => {
                  let options = [];
                  const _options = appPaymentList[o["paymentCode"]];
                  if (_options && _options.length > 0) {
                    _options.map(o => {
                      options.push(
                        h(
                        "Option",
                        {
                          props: {
                            value: o["paymentCode"]
                          }
                        },
                        o["paymentName"]
                      )
                      );
                    });
                  } else {
                    options.push(
                      h(
                        "Option",
                        {
                          props: {
                            value: o["paymentCode"]
                          }
                        },
                        "默认值"
                      )
                    );
                  }
                  return h(
                    "Select",
                    {
                      props: {
                        value: o["paymentCode"]
                      },
                      style: {
                        width: "160px"
                      },
                      on: {
                        "on-change": val => {
                          // this.selects[0].name = val
                        }
                      }
                    },
                    options
                  );
                }
              });
            });

            this.columns1 = columns;
            console.log("asdfasdfasdf");
          }
        } else {
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="less" scoped>
</style>
