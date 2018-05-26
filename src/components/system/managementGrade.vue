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
  data () {
    return {
      columns1: [
        {
          title: '',
          align: 'center',
          key: 'name'
        },
        {
          title: '高',
          align: 'center',
          key: 'high',
          render: (h, params) => {
            if (params.index === 2) {
              return h('Select', {
                props: {
                  value: this.selects[0].name
                },
                style: {
                  width: '180px'
                },
                on: {
                  'on-change': (val) => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h('Option', {
                  props: {
                    value: this.selects[0].name
                  }
                }, this.selects[0].name),
                h('Option', {
                  props: {
                    value: this.selects[1].name
                  }
                }, this.selects[1].name)
              ])
            } else {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '150px',
                    verticalAlign: 'bottom'
                  }
                }),
                h('span', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    lineHeight: '24px',
                    display: 'inline-block',
                    padding: '0 10px',
                    background: '#ccc'
                  }
                }, this.value[params.index].name)
              ])
            }
          }
        },
        {
          title: '中',
          align: 'center',
          key: 'middle',
          render: (h, params) => {
            if (params.index === 2) {
              return h('Select', {
                props: {
                  value: this.selects[0].name
                },
                style: {
                  width: '180px'
                },
                on: {
                  'on-change': (val) => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h('Option', {
                  props: {
                    value: this.selects[0].name
                  }
                }, this.selects[0].name),
                h('Option', {
                  props: {
                    value: this.selects[1].name
                  }
                }, this.selects[1].name)
              ])
            } else {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '150px',
                    verticalAlign: 'bottom'
                  }
                }),
                h('span', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    lineHeight: '24px',
                    display: 'inline-block',
                    padding: '0 10px',
                    background: '#ccc'
                  }
                }, this.value[params.index].name)
              ])
            }
          }
        },
        {
          title: '低',
          align: 'center',
          key: 'low',
          render: (h, params) => {
            if (params.index === 2) {
              return h('Select', {
                props: {
                  value: this.selects[0].name
                },
                style: {
                  width: '180px'
                },
                on: {
                  'on-change': (val) => {
                    // this.selects[0].name = val
                  }
                }
              },
              [
                h('Option', {
                  props: {
                    value: this.selects[0].name
                  }
                }, this.selects[0].name),
                h('Option', {
                  props: {
                    value: this.selects[1].name
                  }
                }, this.selects[1].name)
              ])
            } else {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '150px',
                    verticalAlign: 'bottom'
                  }
                }),
                h('span', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    lineHeight: '24px',
                    display: 'inline-block',
                    padding: '0 10px',
                    background: '#ccc'
                  }
                }, this.value[params.index].name)
              ])
            }
          }
        }
      ],
      data1: [
        {
          name: '每隔多少秒可获取验证码:'
        },
        {
          name: '1小时内获取几次后弹出二次验证:'
        },
        {
          name: '二次验证类型:'
        }
      ],
      value: [
        {
          name: '秒'
        },
        {
          name: '次'
        }
      ],
      selects: [
        {
          name: '图中点选'
        },
        {
          name: '滑动拼图'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>

</style>
