<template>
  <div class="memberCommon">
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠&nbsp;>&nbsp;会员管理&nbsp;>&nbsp;会员基本设置</span>
      </p>
    </div>
    <div class="contentcss">
      <!-- 修改前 -->
      <div class="clearfix contentcss">
        <ul class="memberUl clearfix">
          <li> <h3 class="memberTitle">会员等级设置: </h3> </li>
          <li>
            <div class="memberTitle">会员等级梯度: </div> 
            <div
              v-for="(item, index) in addnormalList"
              :key="index"
              class="mb15 clearfix member_input"
            >
              <Input type="text" v-model="item.grade" class="left ml10 mb5 inputnum"  style="width:170px">
              <span slot="prepend">等级</span>
              </Input>
              <Input type="text" v-model="item.integralMin" class="left ml10 mb5 inputnum"  style="width:150px">
              <span slot="prepend">积分</span>
              <span slot="append" class="left">至</span>
              </Input>
              <Input type="text" v-model="item.integralMax" class="left mb5 inputnum"  style="width:100px">
              </Input>
              <img :src="item.logoUrl" alt="" class="left ml10 icon_img">
              <a href="javascript:;"  class="file left">
                <input type="file" @change="fileimg(index)" :data="item.activityCode" accept="image/gif, image/jpeg, image/png, image/jpg" name="img" class="inputfil">
              </a>
              <Button type="primary" class="left ml10" v-if="index==0" @click="addnormal">+</Button>
              <Button type="primary" class="left ml10" v-if="index!=0" @click="addnorma2(index)">-</Button>
            </div>
          </li>
        </ul> 
      </div>  
  ·   <div class="contentcss" style="text-align:center;">
        <Button type="primary" class="w100 examinetype" :loading="loading3" @click="marketingusbmit">
          <span v-if="!loading3">保存</span>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="ghost" @click="handleRender3">查看操作日志</Button>  
      </div> 
    </div>
   
  </div>  
</template>
<script>
export default {
  data(){
    return {
      loading:true,
      loading3:false,
      addnormalList:[
        {
          grade: '', // vip天
          iintegralMin: '', // 原价
          integralMax: '', // 实际支付金额
          logoUrl:require('../../image/moren.png'),//图片
        }
      ],
    }
  },
  methods: {
    // 提交审核
    marketingusbmit(){},
    // 查看操作日志
    handleRender3(){},
    // 推荐
    addnormal () {
      this.addnormalList.push({
        grade: '', // 等级
        integralMin: '', // 原价
        integralMax: '', // 实际支付金额
        logoUrl:require('../../image/moren.png'),//图片
      })
    },
    // 上传图片
    fileimg (index) {
      console.log(document.querySelectorAll('.inputfil')[index].files[0])
      if (document.querySelectorAll('.inputfil')[index].files[0].type == '') {
        // this.addnormals[index].activityCode = ''
        this.addnormalList[index].logoUrl = require('../../image/moren.png')
        this.$Modal.warning({
          title: '温馨提示',
          content: '请上传正确格式的图片'
        });
        return false
      }
      let formData = new FormData();
      // this.addnormals[index].activityCode = '1'
      formData.append('file', document.querySelectorAll('.inputfil')[index].files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout:1000*60*5
      }
      this.http.post(BASE_URL + '/fileUpload', formData, config)
      .then((resp) => {
        if (resp.code == 'success') {
          this.addnormalList[index].logoUrl = resp.data

        } else {
        }
      })
      .catch(() => {
      })
    },
    addnorma2 (index) {
      this.addnormalList.splice(index, 1)
    },
    // 提示框
    promptBox(text){
      this.$Modal.warning({
        title: '温馨提示',
        content: text
      })
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
  },
  created(){
  }
}
</script>
<style lang="less" scoped>

.memberUl {
  .ivu-input-group-append, .ivu-input-group-prepend {
    border-radius: 0px !important;
  }
  .icon_img{
    width: 50px;
    height: 35px;
    margin-right: 10px;
  }
  .inputfil{
    width: 200px;
  }
  li {
    margin-bottom: 25px;
    span {
      text-align: right;
      img {
        width: 45px;
        height: 45px;
        margin-top: -10px;
      }
      .uploadButton {
        margin-top: -3px;
      }
    }
    .inputnum{
      span{
        border-radius: 0px;
      }
    }
    .memberTitle{
      display: inline-block;
      width: 200px;
      text-align: right;
      margin-right: 20px;
    }
    .memberTitle1{
      width: 200px;
      text-align: right;
      margin-right: 20px;
    }
    .member_input {
      margin-left: 200px;
    }
  }
}
</style>
