<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;支付配置</span>
      </p>
    </div>
    <div class="contentcss">
        <Table border highlight-row :columns="columns1" :data="data1" class="mt15"></Table>
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
    query() {
      this.http
        .post(BASE_URL + "/loan/payment/getAppPaymentList", {})
        .then(resp => {
          //console.log(resp);
          if (resp.code == "success") {
            const { appPaymentList, paymentList, appList } = resp.data;
            this.data1 = appPaymentList;
            if (paymentList && appPaymentList) {
              let columns = [];
              columns.push(
                {
                  title: "产品",
                  key: "appName",
                  align: "center"
                },
                {
                  title: "APP类型",
                  key: "systemType",
                  align: "center"
                }
              );
              //console.log("asdfasdfasdf12");

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
                      o,
                      appList
                    );
                  }
                });
              });
              this.columns1 = columns;
              this.appPaymentList = appPaymentList;
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
      this.appPaymentList.map(v => {
        let appPayment = {};
        // appPayment["appId"] = v.appId;
        // appPayment["systemType"] = v.systemType;
        let _appPaymentList = [];
        const appPaymentList = v.dataList;
        console.log();
        appPaymentList &&
          appPaymentList.map(o => {
            const s_channelCode = o["s_channelCode"];
            if (s_channelCode) {
              if (s_channelCode.startsWith("enable_")) {
                _appPaymentList.push({
                  paymentCode: o["paymentCode"],
                  enabled: s_channelCode.replace("enable_", ""),
                  appId: v.appId,
                  systemType: v.systemType
                });
              } else {
                _appPaymentList.push({
                  paymentCode: o["paymentCode"],
                  channelCode: s_channelCode,
                  enabled: 1,
                  appId: v.appId,
                  systemType: v.systemType
                });
              }
            }
          });

        if (_appPaymentList.length > 0) {
          appPayment["appPaymentList"] = _appPaymentList;
          requestBody.push(appPayment);
        }
      });

      let isChange = false;
      requestBody.map(e => {
        // console.log(e.appPaymentList);
        if (e.appPaymentList.length > 0) {
          isChange = true;
        }
      });
      if (!isChange) {
        const title = "温馨提示";
        const content = "<p>请修改后再保存！</p>";
        switch ("warning") {
          case "warning":
            this.$Modal.warning({
              title: title,
              content: content,
              onOk: () => {
                // this.query()
              }
            });
            break;
        }
        return;
      }
      this.http
        .post(BASE_URL + "/loan/payment/setAppPayment", requestBody)
        .then(data => {
          if (data.code == "success") {
            const title = "温馨提示";
            const content = "<p>保存成功！</p>";
            switch ("success") {
              case "success":
                this.$Modal.success({
                  title: title,
                  content: content,
                  onOk: () => {
                    this.query();
                  }
                });
                break;
            }
          } else {
            this.$Message.info(data.message);
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      // console.log("requestBody:", requestBody);
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
    renderColumns(index, h, params, appPaymentList, payment, appList) {
      let options = [];
      // const appPayment = appPaymentList[index]["dataList"];
      //console.log("appPaymentItem222", appPayment[index - 1]);
      // console.log("appPaymentItem1", appPaymentItem);

      // let payObject = params.row["dataList"][index]; // 第几行第几列的数据
      let payObject
      this.appPaymentList.map(o => {
        if (
          params.row.appId == o.appId &&
          params.row.systemType == o.systemType
        ) {
          payObject = o["dataList"][index]; // 第几行第几列的数据 可以监听到自己修改后的值
        }
      });

      let paymentList = payObject["channelList"];
      if (paymentList && paymentList.length > 0) {
        paymentList.map(o => {
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
              value: payObject["channelCode"]
            },
            style: {
              width: "160px"
            },
            on: {
              "on-change": val => {
                // this.selects[0].name = val
                payObject["s_channelCode"] = val;
                console.log(payObject, this.appPaymentList);
                //console.log(appPayment[index]);
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
    this.query();
  }
};
</script>
<style lang="less" scoped>
</style>
