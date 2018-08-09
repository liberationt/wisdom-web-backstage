<template>
<div>
<div class="navigation">
<p>
<span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置</span>
</p>
</div>
<Table border :columns="columns1" :data="data1"></Table>
<p class="mt15 tc">
<Button type="primary">提交保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
<Button type="ghost">返回</Button>
</p>
</div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "",
          align: "center",
          key: "name"
        },
        {
          title: "高",
          align: "center",
          key: "high",
          render: (h, params) => {
            if (params.index == 0) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入分钟"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟"
                )
              ]);
            } else if (params.index == 1) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 2) {
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
            } else if (params.index == 3) {
              return h(
                "Select",
                {
                  props: {
                    value: "开启"
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
                        value: "开启"
                      }
                    },
                    "开启"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "关闭"
                      }
                    },
                    "关闭"
                  )
                ]
              );
            } else if (params.index == 4) {
              return h("div", [
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "手机"
                ),
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "IP"
                )
              ]);
            } else if (params.index == 5) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 6) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 7) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 8) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟后"
                )
              ]);
            }
          }
        },
        {
          title: "中",
          align: "center",
          key: "middle",
          render: (h, params) => {
            if (params.index == 0) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入分钟"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟"
                )
              ]);
            } else if (params.index == 1) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 2) {
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
            } else if (params.index == 3) {
              return h(
                "Select",
                {
                  props: {
                    value: "开启"
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
                        value: "开启"
                      }
                    },
                    "开启"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "关闭"
                      }
                    },
                    "关闭"
                  )
                ]
              );
            } else if (params.index == 4) {
              return h("div", [
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "手机"
                ),
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "IP"
                )
              ]);
            } else if (params.index == 5) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 6) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 7) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 8) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟后"
                )
              ]);
            }
          }
        },
        {
          title: "低",
          align: "center",
          key: "low",
          render: (h, params) => {
            if (params.index == 0) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入分钟"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟"
                )
              ]);
            } else if (params.index == 1) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 2) {
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
            } else if (params.index == 3) {
              return h(
                "Select",
                {
                  props: {
                    value: "开启"
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
                        value: "开启"
                      }
                    },
                    "开启"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "关闭"
                      }
                    },
                    "关闭"
                  )
                ]
              );
            } else if (params.index == 4) {
              return h("div", [
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "手机"
                ),
                h("Checkbox", {
                  on: {
                    "on-change": val => {
                      console.log(1111);
                    }
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px"
                    }
                  },
                  "IP"
                )
              ]);
            } else if (params.index == 5) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 6) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "小时内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 7) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "60px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟内"
                ),
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "获取验证码次数"
                  },
                  style: {
                    width: "90px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "次"
                )
              ]);
            } else if (params.index == 8) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入时间"
                  },
                  style: {
                    width: "160px",
                    verticalAlign: "bottom"
                  }
                }),
                h(
                  "span",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      lineHeight: "24px",
                      display: "inline-block",
                      padding: "0 10px",
                      background: "#ccc"
                    }
                  },
                  "分钟后"
                )
              ]);
            }
          }
        }
      ],
      data1: [
        {
          name: "验证码有效时间："
        },
        {
          name: "弹二次验证的条件："
        },
        {
          name: "二次验证类型:"
        },
        {
          name: "是否开启加入黑名单："
        },
        {
          name: "风控维度："
        },
        {
          name: "手机加入黑名单条件："
        },
        {
          name: "IP加入黑名单条件："
        },
        {
          name: "密码登录冻结条件："
        },
        {
          name: "密码登录解冻条件："
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
</style>