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
      number: 1,
      number1: 1,
      number2: 1,
      number3: 1,
      number61: 1,
      number62: 1,
      number63: 1,      
      columns1: [
        {
          title: "",
          width: 200,
          align: "center",
          key: "name"
        },
        {
          title: "高",
          align: "center",
          minWidth: 300,
          key: "high",
          render: (h, params) => {
            if (params.row.ruleLevel == 3) {
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
              let inputarr = [];
              for (let i = 0; i < this.number1; i++) {
                if (i < this.number1-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number1 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number1-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number1 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
            } else if (params.index == 6) {
              let inputarr = [];
              for (let i = 0; i < this.number61; i++) {
                if (i < this.number61-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number61 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number61-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number61 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "100px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
            }else if (params.index == 7) {
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
        },
        {
          title: "中",
          align: "center",
          minWidth: 300,
          key: "middle",
          render: (h, params) => {
            if (params.row.ruleLevel == 2) {
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
              let inputarr = [];
              for (let i = 0; i < this.number3; i++) {
                if (i < this.number3-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number3 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number3-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number3 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
            } else if (params.index == 6) {
              let inputarr = [];
              for (let i = 0; i < this.number63; i++) {
                if (i < this.number63-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number63 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number63-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number63 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
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
        },
        {
          title: "低",
          align: "center",
          minWidth: 300,
          key: "low",
          render: (h, params) => {
            console.log(params.row)
            if (params.row.ruleLevel == 1) {                         
            if (params.index == 0) {
              return h("div", [
                h("Input", {
                  props: {
                    // type: "primary",
                    size: "small",
                    placeholder: "请输入分钟",
                    value: '111'
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
              let inputarr = [];
              for (let i = 0; i < this.number2; i++) {
                if (i < this.number2-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number2 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number2-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number2 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
            } else if (params.index == 6) {
              let inputarr = [];
              for (let i = 0; i < this.number62; i++) {
                if (i < this.number62-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number62 -= 1;
                          }
                        }
                      },
                      "-"
                    ),
                    h("br")
                  );
                } else if (i == this.number62-1) {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
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
                          background: "#ccc",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.number62 += 1;
                          }
                        }
                      },
                      "+"
                    ),
                    h("br")
                  );
                } else {
                  inputarr.push(
                    h("Input", {
                      props: {
                        // type: "primary",
                        size: "small",
                        placeholder: "请输入时间"
                      },
                      style: {
                        width: "60px",
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
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
                        verticalAlign: "bottom",
                        marginBottom: "10px"
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
                          background: "#ccc",
                          marginBottom: "10px"
                        }
                      },
                      "次"
                    ),
                    h("br")
                  );
                }
              }
              return h("div", inputarr);
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
        }
      ],
      data1: []
    };
  },
  created() {
    // 获取数据
    this.http.post(BASE_URL+"/rule/RiskRule/getRiskRuleList ",{ pageNum: 1,pageSize: 10}).then(data=>{
      console.log(data)
      this.data1 = data.data.riskRuleList
      console.log(this.data1)
    }).catch(err=>{
      console.log(err)
    })
  }
};
</script>
<style lang="less" scoped>
</style>