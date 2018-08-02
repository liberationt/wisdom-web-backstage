
<template>
<div>
  <div class="navigation">
    <p>
      <span>管理首页&nbsp;>&nbsp;应用</span>
    </p>
  </div>
  <div id="application-con">
    <div class="application-clothes" v-for="(item, index) in applicationlist" :key="index">
      <img :src="item.logoUrl" alt="">
      <span><em>{{item.appName}}</em></br><em>版本数量:1</em></span>
      <Button type="primary" class="mt15" long @click="gold_clothes(item.menuCode)">进入管理</Button>
    </div>
    <!-- <div id="application-app">
      <img src="../../image/application-hzjf.png" alt="">
      <span><em>APP名称</em></br><em>版本数量:1</em></span>
      <Button type="primary" long >进入管理</Button>
    </div> -->
  </div>
</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import utils from "../../utils/utils";
export default {
  data() {
    return {
      applicationlist: []
    };
  },
  mounted() {
    let that = this;
    that.lefthidfalse()
    let arrlist = [];
    let list = [];
    for (let i = 0; i < that.menu.menuInfo.children.length; i++) {
      if (that.menu.menuInfo.children[i].menuName == '应用管理') {
        arrlist = that.menu.menuInfo.children[i].children;
      }     
    }
    for (let j = 0; j < arrlist.length; j++) {
      list.push(arrlist[j].menuCode);
    }
    this.http
      .post(BASE_URL + "/system/appManage/getAppManageByMenuCodes", list)
      .then(resp => {
        if (resp.code == "success") {
          this.applicationlist = resp.data.menuList;
        } else {
        }
      })
      .catch(() => {});
  },
  methods: {
    gold_clothes(num) {
      let that = this;
      let arrlist = [];
      let menucodes = document.getElementsByClassName("redWine")[0].getAttribute("menucode");
      for (let i = 0; i < that.menu.menuInfo.children.length; i++) {
        if (that.menu.menuInfo.children[i].menuCode == menucodes) {
          arrlist = that.menu.menuInfo.children[i].children;
        }
      }
      let menuList = null
      for (let j = 0; j < arrlist.length; j++) {
        console.log(arrlist[j].menuCode)
        console.log(num)
        if (arrlist[j].menuCode == num) {
          that.leftlist(arrlist[j].children);
          utils.putlocal("leftlist", JSON.stringify(arrlist[j].children));
          menuList = arrlist[j].children;
          const firstGroupMenu = menuList[0]
        if (firstGroupMenu.path && firstGroupMenu.path.length > 0) {
          this.$router.push({ path: firstGroupMenu.path });
          utils.putlocal("sideleft", "0");
        } else {
          const firstChildrenMenu = firstGroupMenu.children && firstGroupMenu.children[0]
          if (firstChildrenMenu && firstChildrenMenu.path && firstChildrenMenu.path.length > 0) {
            this.$router.push({ path: firstChildrenMenu.path });
            utils.putlocal("sideleft", "1");
          }
        }
        that.lefthidtrue();
        // return false
        }
        //  else {
        //   this.$Message.warning("网站建设中...");
        //   return false;
        // }
      }

      utils.putlocal("lefthidden", "0");

      // if (menuList && menuList.length > 0) {
      //   alert(1)
      //   const firstGroupMenu = menuList[0]
      //   if (firstGroupMenu.path && firstGroupMenu.path.length > 0) {
      //     this.$router.push({ path: firstGroupMenu.path });
      //     utils.putlocal("sideleft", "0");
      //   } else {
      //     const firstChildrenMenu = firstGroupMenu.children && firstGroupMenu.children[0]
      //     if (firstChildrenMenu && firstChildrenMenu.path && firstChildrenMenu.path.length > 0) {
      //       this.$router.push({ path: firstChildrenMenu.path });
      //       utils.putlocal("sideleft", "1");
      //     }
      //   }
      // }
      
    },
    ...mapMutations(["leftlist", "lefthidtrue", "lefthidfalse"])
  },
  computed: {
    ...mapState(["menu"])
  }
};
</script>
<style lang="less" scoped>
#application-con {
  overflow: hidden;
  .application-clothes {
    width: 300px;
    height: 180px;
    border: 1px solid #e7ecf1;
    float: left;
    margin-right: 15px;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    color: #666666;
    background: #fff;
    img {
      width: 90px;
      height: 90px;
      border-radius: 5px;
      vertical-align: middle;
      float: left;
    }
    span {
      float: left;
      display: block;
      height: 100px;
      margin-left: 10px;
      line-height: 24px;
      padding-top: 20px;
      em:first-child {
        font-size: 18px;
      }
    }
  }
}
</style>
