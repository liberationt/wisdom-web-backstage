<template>
    <div>
        <div class="navigation">
          <p>
            <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;信贷管理>&nbsp;模板详情</span>
          </p>
        </div>
        <div class="clearfix contentcss">
          <div class="maintext">
            <div>
              <ul>
                <li>
                  <span>模板名称：</span><span>{{dataList.exhibitionName}}</span>
                </li>
                <li>
                  <span>状态：</span>
                  <span>
                    <span v-if="dataList.exhibitionStatus=='0'">未发布</span>
                    <span v-else-if="dataList.exhibitionStatus=='1'">已发布</span>
                    <span v-else>下架</span>
                  </span>
                </li>
                <li>
                  <span>开放范围：</span>
                  <span>
                    <span v-if="dataList.openType=='1'">全部用户</span>
                    <span v-else>会员用户</span>
                  </span>
                </li>
                <li>
                  <span>发布时间：</span><span>{{dataList.dataCreateTime}}</span>
                </li>
              </ul>
              <p>更新记录</p>
              <ul class='list'>
                <li v-for='item in dataList.exhibitionLogRes'>
                  <p>{{item.displayName}}</p>
                  <p>{{item.dataCreateTime}}</p>
                  <p>{{item.optionName}}</p>
                </li>
              </ul>
            </div>
            <div class="poster">
              <img :src=reqimg>
            </div>
          </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
      return{
        dataList:{},
        reqimg:''
      }
    },
    methods:{

    },
    mounted(){
      let exhibitionCode = this.$route.query.exhibitionCode
      this.http.post(BASE_URL+'/loan/exhibition/getByCode',{exhibitionCode:exhibitionCode})
      .then(data=>{
        if(data.code=='success'){
          this.dataList = data.data
          this.reqimg = data.data.exhibitionPath
        }
      })
    }
}
</script>
<style lang="less" scoped>
   .maintext{
     display: flex;
     div{
       width:50%;
       li{
         margin-bottom:10px;
       };
       p{
         margin-top:20px
       }
     };
     .list li{
       display: flex;
       p{
         margin-right:20px
       }
     };
     .poster img{
       width:500px;height:650px;
     }
   } 
</style>