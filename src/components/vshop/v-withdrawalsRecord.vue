<template>
<div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;分销&nbsp;>&nbsp;资金管理&nbsp;>&nbsp;提现记录</span>
      </p>
    </div>
    <div class="contentcss">
      <Tabs type="card" @on-click="labell1" :animated="false">
        <TabPane label="待审核" name="tab1" >
          <stayExamine></stayExamine>
        </TabPane>
        <TabPane label="已审核" name="tab2">
          <stayAudited></stayAudited>
        </TabPane>
      </Tabs>
    </div>
</div>
</template>
<script>
import stayExamine from './withdrawalsRecord/stay-examine';
import stayAudited from './withdrawalsRecord/stay-audited';
export default {
  components: {
    stayExamine,
    stayAudited
  },
  data () {
    return {
    }
  },
  methods: {
    //tab 栏
    labell1(name) {
      
    },
  },
  created(){
    // this.request('/user/Login',{password: "22222222",username: "www"},data=>{
    //   console.log(data)
    // })
  }
}
</script>
<style lang="less" scoped>
</style>
