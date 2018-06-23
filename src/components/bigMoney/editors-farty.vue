<template>
    <div>
        <Row>
        <Col span="16" offset="4">
        <div class="mt50">
            <ul>
                <li>
                    <span class="">甲方名称:</span>
                    <Select v-model="model1" style="width:200px" class="mr20 ml5">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="mt15">
                    <span >推送方式:</span>
                    <RadioGroup v-model="animal" class="ml5">
                        <Radio label="手动"></Radio>
                        <Radio label="自动"></Radio>
                    </RadioGroup>
                </li>
                <li class="mt15">
                    <span >推送字段:</span>
                    <span class="ml5">hahah</span>

                </li>
                <li class="mt15">
                    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                </li>
                <li class="mt15">
                   <span class="w150 displayib">重复数据间隔推送天数:</span>
                   <Input v-model="value" class="ml5 numday" style="width: 200px"></Input>
                   <span>天</span>
                   <p class="red hidden correctnum" style="margin-left:152px">请输入正确的推送天数</p>
                </li>
                <li class="mt15">
                   <span class="w150 displayib">每日推送总条数限制:</span>
                   <Input v-model="value" class="ml5 numday" style="width: 200px"></Input>
                   <span>条</span>
                   <p class="red hidden correctnum" style="margin-left:152px">请输入正确的推送天数</p>
                </li>
                <li class="mt15">
                    <span >状态:</span>
                    <RadioGroup v-model="enable" class="ml5">
                        <Radio label="启用"></Radio>
                        <Radio label="停用"></Radio>
                    </RadioGroup>
                </li>
                <li class="mt15 tc mb50">
                    <Button class="w100">取消</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="w100" type="primary" @click="preservation">保存</Button>
                </li>
            </ul>
        </div>
        </Col>
    </Row>
    <Modal
          title="已选城市"
          v-model="modal9"
          @on-ok="upload"
          @on-cancel="handleReset"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="500"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15 pl10">
           <ul>
            <li >
            <CheckboxGroup v-for="(item, index) in city" :key="index" v-model="list">
              <Checkbox v-for="tion in item.garden" :label="tion.town"></Checkbox>
            </CheckboxGroup>
            </li>
 
        </ul>
          </div>
          </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      animal: '手动',
      enable: '启用',
      value: '',
      modal9: false,
      cityList: [
        {
          value: '供应商1',
          label: '供应商1'
        },
        {
          value: '供应商2',
          label: '供应商2'
        },
        {
          value: '供应商3',
          label: '供应商3'
        },
        {
          value: '供应商4',
          label: '供应商4'
        }
      ],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标签',
          align: 'center',
          key: 'name',
          render: (h, params) => {
            let name
            if (params.row.must == 1) {
              name = '*'
            } else {
              name = ''
            }
            return h('div', [
              h('span', {
                style: {
                  color: 'red'
                }
              }, name),
              h('span', params.row.name)
            ])
          }
        },
        {
          title: '标签值',
          align: 'center',
          key: 'age',
          render: (h, params) => {
            let name
            if (params.row.name == '性别') {
              return h('RadioGroup', {
                props: {
                  value: this.data1[params.index].value
                },
                on: {
                  'on-change': (val) => {
                    this.data1[params.index].value = val
                  }
                }
              },
              [
                h('Radio', {
                  props: {
                    label: 0
                  }
                }, '高'),
                h('Radio', {
                  props: {
                    label: 1
                  }
                }, '中')
              ])
            } else if (params.row.name == '信用卡' || params.row.name == '有无社保' || params.row.name == '有无公积金' || params.row.name == '名下有房' || params.row.name == '有无房贷' || params.row.name == '名下有车' || params.row.name == '有无车贷' || params.row.name == '寿险保单' || params.row.name == '微粒贷') {
              return h('RadioGroup', {
                props: {
                  value: this.data1[params.index].value
                },
                on: {
                  'on-change': (val) => {
                    this.data1[params.index].value = val
                  }
                }
              },
              [
                h('Radio', {
                  props: {
                    label: 0
                  }
                }, '有'),
                h('Radio', {
                  props: {
                    label: 1
                  }
                }, '无')
              ])
            } else if (params.row.name == '借贷金额') {

              return h('CheckboxGroup', {
              },
              [
                h('Checkbox', {
                }, '3千元以下'),
                h('Checkbox', {
                }, '3千元-1万元'),
                h('Checkbox', {
                }, '1万元-2万元'),
                h('Checkbox', {
                }, '2万元-5万元'),
                h('Checkbox', {
                }, '5万元-10万元'),
                h('Checkbox', {
                }, '10万元以上')
              ])
            } else if (params.row.name == '居住城市') {
              let citylist = []
              for (let i = 0; i < this.list.length; i++) {
                citylist.push(
                  h('span', {
                    style: {
                    marginRight: '5px',
                    lineHeight: '25px'
                  },
                }, this.list[i])
                )    
              }
              return h('div', {

              }, [
                citylist,
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.refuse()
                    }
                  }
                }, '选择城市')
              ])
            } else {
              return h('span', params.row.age)
            }
          }
        }
      ],
      data1: [
        {
          name: '姓名',
          age: '唐哈哈',
          must: 1
        },
        {
          name: '性别',
          must: 1,
          value: 0
        },
        {
          name: '手机号码',
          age: '13054132234',
          must: 1,
          value: 0
        },
        {
          name: '信用卡',
          age: 26,
          must: 1,
          value: 0
        },
        {
          name: '居住城市',
          age: '上海市',
          must: 1,
          value: 0
        },
        {
          name: '出生年月',
          age: '1990-07-01',
          must: 1
        },
        {
          name: '年龄',
          age: 30,
          must: 1
        },
        {
          name: '借贷金额',
          age: 26,
          must: 1,
          value: 0
        },
        {
          name: '有无社保',
          age: 18,
          must: 0,
          value: 0
        },
        {
          name: '有无公积金',
          age: 24,
          must: 0,
          value: 0
        },
        {
          name: '名下有房',
          age: 30,
          must: 0,
          value: 0
        },
        {
          name: '有无房贷',
          age: 26,
          must: 0,
          value: 0
        },
        {
          name: '名下有车',
          age: 18,
          must: 0,
          value: 0
        },
        {
          name: '有无车贷',
          age: 24,
          must: 0,
          value: 0
        },
        {
          name: '寿险保单',
          age: 30,
          must: 0,
          value: 0
        },
        {
          name: '微粒贷',
          age: 26,
          must: 0,
          value: 0
        }
      ],
      list: [
        '上海市',
        '北京市'
      ],
      city: [
        {
          garden: [
            {
              check: 1,
              town: '上海市'
            },
            {
              check: 1,
              town: '北京市'
            },
            {
              check: 1,
              town: '重庆市'
            }
          ]         
        },
        {
          garden: [
            {
              check: 1,
              town: '苏州市'
            },
            {
              check: 1,
              town: '杭州市'
            },
            {
              check: 1,
              town: '西安市'
            }
          ]         
        }
      ]
    }
  },
  methods: {
    preservation () {
      let integer = /^[0-9]\d*$/
      let correctnum = document.getElementsByClassName('correctnum')
      if (this.value == '') {
        correctnum.className('hidden')
      }
    },
    refuse () {
      this.modal9 = true
    },
    upload () {
      setTimeout(() => {
        this.changeLoading()
        const title = '选择城市'
        let content = '<p>保存成功</p>'
        this.$Modal.success({
          title: title,
          content: content
        })
        this.modal9 = false          
      }, 1000)
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
  }
}
}
</script>
<style lang="less" scoped>
</style>
