<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;信贷管理&nbsp;>&nbsp;信贷设置</span>
      </p>
    </div>
    <div>
      <div class="contentcss">
        <Form :label-width="210" class="mt50">
          <FormItem v-for="item in formCustom" :label="item.configName+':'" prop="fabulous">
            <Input v-if="item.configUnit!=7" type="text" v-model="item.configValue" style="width:300px">
            <span slot="append">{{item.configUnitDesc}}</span>
            </Input>
            <Select v-if="item.configUnit==7" v-model="item.configValue" style="width:200px"  class="" >
              <Option  value="1" >开启</Option>
              <Option  value="0" >关闭</Option>
            </Select>
            <span v-if="item.officerConfigCode=='8'" class="signin">内不登录   (休眠周期的时间要大于登录有效周期的时间)</span>
          </FormItem>
          <FormItem>
            <Button type="primary" class="w100" :loading="loading3" @click="handleSubmit">
              <span v-if="!loading3">保存设置</span>
              <span v-else>保存设置</span>
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" @click="handleRender1">查看操作日志</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true,
        loading3: false,       
        formCustom: []       
      }
    },
    methods: {
      handleSubmit () {
        this.loading3 = true
        let reg = /^([1-9]\d*|0)(\.\d{1,})?$/
        for (let i = 0; i < this.formCustom.length; i++) {
          if (!reg.test(this.formCustom[i].configValue)) {
            this.$Modal.warning({
              title: '基本设置',
              content: '<p>请输入正确的设置内容</p>'
            })
            this.loading3 = false
            return false
          }
        }
        this.http.post(BASE_URL + '/loan/officerConfig/updateOfficerConfigByBatchCode', this.formCustom)
          .then((resp) => {
            if (resp.code == 'success') {
              this.$Modal.success({
                title: '基本设置',
                content: '<p>设置成功</p>'
              })
              this.loading3 = false
            } else {
              this.loading3 = false
            }
          })
          .catch(() => {
          })
      },
      handleRender1 () {   //信贷基本配置查看日志
        this.$router.push({ path: './operationLog?operationType=officer_edit' })
      },
      
        
      
      changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
     
      
      basicsetup () {
        this.http.post(BASE_URL + '/loan/officerConfig/getOfficerConfigAll', {})
          .then((resp) => {
            if (resp.code == 'success') {
              this.formCustom = resp.data.officerConfigList
            } else {
              this.$Message.error(resp.message);
            }
          })
          .catch(() => {

          })
      },
      
      

    },
    mounted () {
      this.basicsetup ()
    }
  }
</script>
<style lang="less" scoped>
  .ivu-modal-confirm-body-render {
    margin: 30px;
    padding: 0;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    padding: 5px 50px 4px;
  }
  .signin{
    position: absolute;
    top: 0px;
    left: 305px
  }
  .credit_recharge{
    margin-top: 15px;
    width: 800px;
    margin-left: 100px
  }
  .utmost{
    display: inline-block;
    padding: 4px 7px;
    font-size: inherit;
    font-weight: 400;
    line-height: 22px;
    color: #495060;
    text-align: center;
    background-color: #eee;
    border: 1px solid #dddee1;
  }
  .ivu-modal .ivu-btn-primary{
    display: none!important
  }
</style>
