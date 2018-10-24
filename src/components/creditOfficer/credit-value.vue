<template>
  <div>
      <div class="navigation">
        <p>
        <span>管理首页&nbsp;>&nbsp;应用>&nbsp;抢单侠>&nbsp;信贷设置>&nbsp;用户身价设置</span>
        </p>
      </div>
      <div class=" contentcss">
          <Form  :model="pricesetting" :label-width="200" class="mt50">
            <FormItem label="底价:" >
              <Input type="text" v-model="pricesetting.userSocialResList[1].socialScore" style="width:300px">
              <span slot="append">个</span>
              </Input>
            </FormItem>
            <FormItem label="已实名:" >
              <Input type="text" v-model="pricesetting.userSocialResList[0].socialScore" style="width:150px">
              <Icon slot="prepend" class="cursorp" type="android-add"></Icon>
              </Input>
            </FormItem>
            <FormItem v-for="item in pricesetting.businessSocialResList" :label="item.infoTitleName"  class="clearfix">
              <div v-if="item.options.length>0" class="left mr10 mb5" v-for="res in item.options">
                <Input v-if="res.infoOptionName!='无' && res.infoOptionName!='非本地户籍'" type="text" v-model="res.infoOptionScore" style="width:150px">
                <span slot="prepend">{{res.infoOptionName}}</span>
                </Input>
              </div>
            </FormItem>
            <FormItem class="tc mt50">
              <Button type="primary" class="w100" :loading="loading3" @click="preservationvalue">
                <span v-if="!loading3">保存配置</span>
                <span v-else>保存配置</span>
              </Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="ghost" @click="handleRender2">查看操作日志</Button>
            </FormItem>
          </Form>        
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        loading3: false,
        pricesetting: {
          userSocialResList:[
            {
              socialScore:''
            },
            {
              socialScore:''
            }
          ],
          businessSocialResList:[
            {
              infoTitleName: '',
              options: [
                {
                  infoOptionScore: '',
                  infoOptionName: ''
                }
              ]
            }
          ]
        },

    };
  },
  created() {    
  },
  methods: {
      // 身价设置保存
      preservationvalue () {
        this.loading3 = true
        let businessSocialResList = []
        for (let i = 0; i < this.pricesetting.businessSocialResList.length; i++) {
          for (let j = 0; j < this.pricesetting.businessSocialResList[i].options.length; j++) {
            let obj = new Object ()
            obj.infoOptionKey = this.pricesetting.businessSocialResList[i].options[j].infoOptionKey
            obj.infoOptionScore = this.pricesetting.businessSocialResList[i].options[j].infoOptionScore
            businessSocialResList.push(obj)
          }
        }
        let list = {
          userSocialResList: this.pricesetting.userSocialResList,
          businessSocialResList: businessSocialResList
        }
        this.http.post(BASE_URL + '/loan/userSocial/updateUserSocialList', list)
          .then((resp) => {
            if (resp.code == 'success') {
              this.$Modal.success({
                title: '用户身价设置',
                content: '<p>配置成功</p>'
              })
              this.loading3 = false
            } else {
              this.loading3 = false
              this.$Message.error(resp.message);
            }
          })
          .catch(() => {

          })
      },
      handleRender2 () {  //用户身价配置日志
        this.$router.push({ path: './operationLog?operationType=user_social_edit' })
      },
      inquireabout () {
          this.http.post(BASE_URL + '/loan/userSocial/getUserSocialList', {})
            .then((resp) => {
              if (resp.code == 'success') {
                this.pricesetting.userSocialResList = resp.data.socialRes.userSocialResList
                this.pricesetting.businessSocialResList = resp.data.socialRes.businessSocialResList
              } else {
              }
            })
            .catch(() => {
            })

      }

  },
  mounted () {
    this.inquireabout ()       
  }
};
</script>
<style lang="less" scoped>

</style>
