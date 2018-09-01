<template>
  <div class="layout">
    <Row>
      <Col span="4" class="headleft"><div ><img src="../../image/logo.png" alt="" ></div></Col>
      <Col span="20">
        <Col span="18" class="headrigui">
          <ul >
            <a href=""></a>
            <li v-for="(item, index) in headerdata" :key="index">
              <a href="javascript:;" :class="{redWine:index==isActive}" :menucode="item.menuCode"  @click="routerlink(index, item.path, item.menuName, item.menuCode)">{{item.menuName}}</a>
            </li>
            <!-- <li><router-link to="/homePage">公众号</router-link></li>
            <li><router-link to="/homePage">小程序</router-link></li>
            <li><router-link to="/applicationHomePage">应用</router-link></li>
            <li><router-link to="/homePage">报表</router-link></li>
            <li><router-link to="/homePage">财务</router-link></li>
            <li><router-link to="/homePage">系统</router-link></li> -->
          </ul>
        </Col>
        <Col span="6" class="headright">
          <ul>
            <!-- <li>
              <Badge count="100">
                <img src="../../image/small.png" alt="">
              </Badge>
            </li>
            <li>
              <Badge count="100">
                <img src="../../image/small.png" alt="">
              </Badge>
            </li>
            <li>
              <Badge count="100">
                <img src="../../image/small.png" alt="">
              </Badge>
            </li> -->
            <li v-if="users" class="adminhead">
              <img src="../../image/poptx.jpeg" alt="">
              <span class="ml5">{{username}}</span>
              <a href="javascript:;" @click="introduction">退出</a>
              <a href="javascript:;"  @click="modifypassword">修改密码</a>
                <!-- <Select v-model="model3" style="width:100px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
            </li>
          </ul>
        </Col>
      </Col>
   </Row>
    <Modal
      title="退出"
      v-model="modal8"
      width=300
      @on-ok="determine"
      class-name="vertical-center-modal"
      :mask-closable="false">
      <p class="tc">确定要退出吗?</p>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import utils from "../../utils/utils";
export default {
  name: "headerpt",
  data() {
    return {
      modal8: false,
      users: false,
      username: "",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model2: "",
      model3: "",
      model4: "",
      headerdata: [],
      isActive: utils.getlocal("headace")
    };
  },
  methods: {
    ...mapMutations(["lefthidfalse", 'leftlist', 'lefthidtrue','showname']),
    routerlink: function(index, path, name, code) {
      let that = this
      let arrlist = []
      let menuList = null
      let leftspan = document.querySelectorAll('.tree-menu span')
      for (var i = 0; i < leftspan.length; i++) {
        leftspan[i].classList.remove('blue')       
      }
      utils.putlocal("headace", String(index));
      if (name == '应用管理') {
        name = '应用首页'
      }
      that.showname(name);
      utils.putlocal("showname", name);
      this.isActive = index;
      this.$router.push({ path: path });
      if (name == "应用管理") {
        that.lefthidfalse();
      } else if (name == '财务管理' || name == '系统管理') {
        for (let i = 0; i < that.menu.menuInfo.children.length; i++) {
        if (that.menu.menuInfo.children[i].menuCode == code) {
          arrlist = that.menu.menuInfo.children[i].children;
          that.leftlist(arrlist);
          utils.putlocal("leftlist", JSON.stringify(arrlist));
          menuList = arrlist;
          const firstGroupMenu = menuList[0]
          if (firstGroupMenu.path && firstGroupMenu.path.length > 0) {
            this.$router.push({ path: firstGroupMenu.path });
            utils.putlocal("sideleft", "0");
             leftspan[0].classList.add('blue')
          } else {
            const firstChildrenMenu = firstGroupMenu.children && firstGroupMenu.children[0]
            if (firstChildrenMenu && firstChildrenMenu.path && firstChildrenMenu.path.length > 0) {
              this.$router.push({ path: firstChildrenMenu.path });
              utils.putlocal("sideleft", "1");
               leftspan[1].classList.add('blue')
            }
          }
          that.lefthidtrue();
        }
      }
      }
    },
    introduction() {
      this.modal8 = true;
    },
    determine() {
      localStorage.removeItem("lefthidden");
      localStorage.removeItem("leftlist");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("headace");
      localStorage.removeItem("sideleft");
      utils.delCookie("user");
      utils.delCookie("userCode");
      this.lefthidfalse();
      this.$router.push({ path: "./" });
    },
    modifypassword () {
      this.$router.push({ path: "./forgetpass" });
    }
  },
  computed: {
    ...mapState(["menu"])
  },
  mounted() {
    let that = this;
    if (utils.getCookie("user")) {
      that.username = JSON.parse(utils.getCookie("user"));
      this.users = true
    } else {
      that.username = ''
      this.users = false
    }
    if (utils.getlocal("userInfo")) {
      that.headerdata = JSON.parse(utils.getlocal("userInfo")).menuInfo.children;
      this.users = true
    } else {
      that.headerdata = ''
      this.users = false
    }
    
    
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 80px;
  width: 100%;
  background: #3d81f2;
  position: fixed;
  top: 0;
  z-index: 100;
}
.headleft {
  height: 100%;
  img {
    // width: 120px;
    height: 40px;
    margin: 20px auto;
    display: block;
  }
}
.headrigui {
  ul {
    overflow: hidden;
    float: left;
    li {
      float: left;
      // width: 100px;
      line-height: 60px;
      text-align: center;
      margin-top: 10px;
      margin-left: 60px;
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #fff;
        font-size: 16px
      }
    }
  }
}

.headright {
  height: 100%;
  float: right;
  ul {
    overflow: hidden;
    li {
      float: left;
      line-height: 80px;
      width: 50px;
    }
    .adminhead {
      overflow: hidden;
      width: 280px;
      margin-left: 10px;
      color: #fff;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: left;
        margin-top: 25px;
        margin-right: 5px;
      }
      span{
        font-size: 16px
      }
      a {
        color: #fff;
        margin-left: 5px;
        font-size: 16px
      }
      .ivu-select-selection {
        float: left;
      }
      .ivu-select-dropdown ul li {
        width: 85px;
        line-height: 20px;
      }
    }
  }
}
</style>
