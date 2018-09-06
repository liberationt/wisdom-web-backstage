<template>
  <div>
    <div class="navigation">
      <p>
      <span>管理首页&nbsp;>&nbsp;系统&nbsp;>&nbsp;公共配置&nbsp;>&nbsp;黑名单管理</span>
      </p>
    </div>
      <div class="clearfix conditioncss">
        <div class="left">
          <span>应用：</span>
          <Select v-model="application" style="width:150px">
            <Option v-for="item in cityList" :value="item.businessAlias" :key="item.businessAlias">{{ item.businessName }}</Option>
          </Select>
        </div>
        <Button type="primary" @click="addchannel(1)" class="ml20">添加渠道</Button>
        <Button type="primary" class="ml10">导出</Button>
        <Button type="warning" class="ml10">批量更新</Button>
        </div>
        <div id="application_table" class="mt15 contentcss">
          <Table border :columns="columns7" :data="data6"></Table>
          <div class="tr mt15">
            <Page :total="total" :page-size="endRow" @on-change="pageChange" @on-page-size-change="PageSizeChange" show-sizer show-total></Page>
          </div>
        </div>
        <!-- 添加渠道 -->
        <Modal
          title="添加渠道"
          v-model="modal10"
           @on-ok="businessSubmit('formCustom')"
           @on-cancel="businessReset('formCustom')"
          ok-text="保存"
          cancel-text="取消"
          class-name="vertical-center-modal"
          width="700"
          :loading="loading"
          :mask-closable="false">
          <div  class="newtype_file mt15 mb15">
            <Form ref="formCustom" :model="formCustombusi" :rules="ruleCustombusi" :label-width="100" style="padding-left:100px">
                <FormItem v-if="numhid" label="渠道编号:" prop="channelnum" >
                    <Input  v-model="formCustombusi.channelnum" placeholder="请输入渠道编号" disabled style="width: 300px"></Input>
                </FormItem>
                <FormItem label="渠道名称:" prop="channelname" >
                    <Input  v-model="formCustombusi.channelname" placeholder="请输入渠道名称"  style="width: 300px"></Input>
                </FormItem>
                <FormItem label="基础折扣系数:" prop="coefficient" >
                    <Input  v-model="formCustombusi.coefficient" placeholder="请输入基础折扣系数"  style="width: 300px">
                        <span slot="append">%</span>
                    </Input>
                </FormItem>
                <FormItem label="基础注册数:" prop="register" >
                    <Input  v-model="formCustombusi.register" placeholder="请输入基础注册数"  style="width: 300px"></Input>
                </FormItem>
              <FormItem label="推广页样式:" prop="style" >
              <Select v-model="formCustombusi.style" placeholder="请选择" style="width:300px" >
                <Option value="1">华赞金服</Option>
                <Option value="2">抢单侠</Option>
              </Select>
            </FormItem>
            <FormItem label=""  >
                <img @click="modal11=true" :src="stylelogo" alt="">
            </FormItem>  
          </Form>
          </div>
          </Modal>
          <Modal v-model="modal11" fullscreen footer-hide>
            <div class="imgenlarge">
                <img :src="stylelogo" alt="" >
            </div>
          </Modal>
        
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: "",
      application: "",
      cityList: [],
      modal10:false,
      modal11: false,
      numhid:false,
      stylelogo: require('../../image/moren.png'),
      formCustombusi: {
        channelnum: '',
        channelname: '',  
        coefficient: '',
        register: '',
        style: ''
      },
      ruleCustombusi: {
        channelname: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ],
        coefficient: [
          { required: true, message: '请输入基础折扣系数', trigger: 'blur' },
        ],
        register: [
          { required: true, message: '请输入基础注册数', trigger: 'blur' }
        ],
        // phone: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   {required: true, message: '请输入正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, trigger: 'blur'}
        // ],
        style: [
          { required: true, message: '请选择推广页样式', trigger: 'blur' }
        ]
      },
      columns7: [
        {
          title: "渠道编号",
          key: "channelnum",
          minWidth: 200,
          align: "center"
        },
        {
          title: "渠道名称",
          key: "channelname",
          minWidth: 200,
          align: "center"
        },
        {
          title: "基础折扣系数(%)",
          key: "coefficient",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
          return h('div', [
            h('InputNumber', {
              props: {
                min:0,
                value:params.row.numlots,
              },
              on:{
                   input:val=>{
                      params.row.numlots=val;
                   }
               }
            },)
          ]);
        }
        },
        {
          title: "基础注册数",
          key: "registernum",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
          return h('div', [
            h('InputNumber', {
              props: {
                min:0,
                value:params.row.numlots,
              },
              on:{
                   input:val=>{
                      params.row.numlots=val;
                   }
               }
            },)
          ]);
        }
        },
        {
          title: "推广URL",
          key: "extensionurl",
          minWidth: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                        this.addchannel (2)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.channelremove ()
                    }
                  }
                },
                "删除"
              )

            ]);
          }
        }
      ],
      data6: [
        {
          channelnum:'LHHZ0002',
          channelname: '渠道名称1',
          extensionurl: 'http://m.zanfin.com/reg.html?qd=LHHZ002'
        }        
      ],
      cityTypel: [],
      startRow: 1,
      endRow: 20,
      startRow1: 1,
      endRow1: 20,
      total: 0,
      loading3: false
    };
  },
  methods: {
    messagetype() {},
    // // 待审核
    pageChange(page) {
      this.startRow = page;
      this.params.page = page;
      this.labell1();
    },
    PageSizeChange(limit) {
      this.startRow = 1;
      this.endRow = limit;
      this.params.limit = limit;
    },
    businessSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return this.changeLoading()
        } else {     
          this.$Message.error('Success!')
        }
      })
    },
    businessReset (name) {
      this.$refs[name].resetFields()
    },
    // 添加渠道 
    addchannel (num) {
        if (num == 2) {
            this.numhid = true
        }  else {
            this.numhid = false
        }
        this.modal10 = true
    },
    // 删除
    channelremove () {
       this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要删除吗?</p>',
            onOk: () => {
                this.$Message.info('Clicked ok');
            }
        }); 
    }


  },
  created() {
    this.application = "56DECD723B2151ECE39F98693F904E3E"
    this.http.post(BASE_URL + "/black/riskBlackList/geBusinessAliastList ",{}).then(data=>{
      if(data.code == 'success'){
        this.cityList = data.data
      }
    }).catch(err=>{
      console.log(err)
    })

  }
};
</script>
<style lang="less" scoped>
.imgenlarge{
    padding: 50px;
    img{
        width: 100%;
        height: 100%;

    }
}
</style>

