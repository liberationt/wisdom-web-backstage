<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;支付配置</span>
      </p>
    </div>
    <div>
        <Table border :columns="columns1" :data="data1" class="mt15"></Table>
        <p class="tc mt50">
            <Button type="primary" @click="save">保存设置</Button>
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
                    // console.log("on-change", val, params)
                    // params.row.[]  = val
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
                    this.selects[0].name = val;
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
      data1: []
    };
  },
  methods: {
    query(){
      this.http
      .post(BASE_URL + "/loan/payment/getAppPaymentList", {})
      .then(resp => {
        console.log(resp);
        if (resp.code == "success") {
          const { appPaymentList, paymentList, appList } = resp.data;
          this.data1 = appList;
          if (paymentList && appPaymentList) {
            let columns = [];
            columns.push({
              title: "产品",
              key: "appName",
              align: "center"
            });
            console.log("asdfasdfasdf12");
            paymentList.map((o, index) => {
              columns.push({
                title: o["paymentName"],
                align: "center",
                render: (h, params) => {
                  return this.renderColumns(
                    index,
                    h,
                    params,
                    appPaymentList,
                    paymentList,
                    appList
                  );
                }
              });
            });

            this.columns1 = columns;
            this.appPaymentList = appPaymentList;
            // console.log("asdfasdfasdf");
          }
        } else {
        }
      })
      .catch(() => {});
    },
    gread() {
      this.$router.push({ path: "./managementGrade" });
    },
    save() {
      // console.log(this.appPaymentList);
      const requestBody = [];
      Object.keys(this.appPaymentList).map(key => {
        let appPayment = {};
        appPayment["appId"] = key;
        let _appPaymentList = [];
        const appPaymentList = this.appPaymentList[key];
        appPaymentList &&
          appPaymentList.map(o => {
            const s_channelCode = o["s_channelCode"];
            if (s_channelCode) {
              if (s_channelCode.startsWith("enable_")) {
                _appPaymentList.push({
                  paymentCode: o["paymentCode"],
                  enabled: s_channelCode.replace("enable_", "")
                });
              } else {
                _appPaymentList.push({
                  paymentCode: o["paymentCode"],
                  channelCode: s_channelCode,
                  enabled: 1
                });
              }
            }
          });
        appPayment["appPaymentList"] = _appPaymentList;
        requestBody.push(appPayment);
      });
      this.http
        .post(BASE_URL + "/loan/payment/setAppPayment", requestBody)
        .then(data => {
          if(data.code == 'success'){
            const title = "温馨提示";
            const content = "<p>保存成功！</p>";
            switch ('success') {
              case "success":
                this.$Modal.success({
                  title: title,
                  content: content,
                  onOk: () => {
                    this.query()
                  }
                });
              break;
            }
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      console.log("requestBody:", requestBody);
    },
    defaultSelectOption(h, params) {
      return [
        h(
          "Option",
          {
            props: {
              value: "0"
            }
          },
          "关闭"
        )
      ];
    },
    enableSelectOption(h, params) {
      return [
        h(
          "Option",
          {
            props: {
              value: "enable_1"
            }
          },
          "开启"
        ),
        h(
          "Option",
          {
            props: {
              value: "enable_0"
            }
          },
          "关闭"
        )
      ];
    },
    renderColumns(index, h, params, appPaymentList, paymentList, appList) {
      let options = [];
      const appId = params["row"]["appId"];
      const appPayment = appPaymentList[appId];
      console.log("appPaymentItem222", appPayment[index - 1]);
      const appPaymentItem =
        appPayment && appPayment.length > index && appPayment[index];
      // console.log("appPaymentItem1", appPaymentItem);
      let _options = appPaymentItem["channelList"];
        if (_options && _options.length > 0) {
          _options.map(o => {
            options.push(
              h(
                "Option",
                {
                  props: {
                    value: o["channelCode"]
                  }
                },
                o["channelDesc"]
              )
            );
          });
          return h(
            "Select",
            {
              props: {
                value: appPayment[index]["channelCode"]
              },
              style: {
                width: "160px"
              },
              on: {
                "on-change": val => {
                  // this.selects[0].name = val
                  appPayment[index]["s_channelCode"] = val;
                  console.log(appPayment[index]);
                }
              }
            },
            options
          );
        } else {
          return this.defaultSelectOption(h, params);
        }
    }
  },
  mounted() {
    this.query()
  }
};
</script>
<style lang="less" scoped>
</style>
