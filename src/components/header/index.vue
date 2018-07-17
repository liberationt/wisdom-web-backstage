<template>
  <div class="layout">
    <Row>
      <Col span="4" class="headleft"><div ><img src="../../image/logo.png" alt="" ></div></Col>
      <Col span="20">
        <Col span="20" class="headrigui">
          <ul >
            <a href=""></a>
            <li v-for="(item, index) in headerdata" :key="index">
              <a href="javascript:;" :class="{redWine:index==isActive}" :menucode="item.menuCode"  @click="routerlink(index, item.path, item.menuName)">{{item.menuName}}</a>
            </li>
            <!-- <li><router-link to="/homePage">公众号</router-link></li>
            <li><router-link to="/homePage">小程序</router-link></li>
            <li><router-link to="/applicationHomePage">应用</router-link></li>
            <li><router-link to="/homePage">报表</router-link></li>
            <li><router-link to="/homePage">财务</router-link></li>
            <li><router-link to="/homePage">系统</router-link></li> -->
          </ul>
        </Col>
        <Col span="4" class="headright">
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
            <li class="adminhead">
              <img src="../../image/poptx.jpeg" alt="">
              <span class="ml5">{{username}}</span>
              <a href="javascript:;" @click="introduction">退出</a>
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
import {mapState, mapMutations} from 'vuex'
import utils from '../../utils/utils'
export default {
  name: 'headerpt',
  data () {
    return {
      modal8: false,
      username: '',
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model2: '',
      model3: '',
      model4: '',
      headerdata: [],
      isActive: utils.getlocal('headace')
    }
  },
  methods: {
    ...mapMutations(['lefthidfalse', 'lefthidtrue']),
    routerlink: function (index, path, name) {
      // console.log(name)
      utils.putlocal('headace', index)
      this.isActive = index
      if (name == '应用管理') {
        let left = document.getElementsByClassName('layout-menu-left')
        let right = document.getElementsByClassName('contrig')
        left[0].style.display = 'none'
        right[0].style.width = '100%'
      }
      this.$router.push({ path: path })
    },
    introduction () {
      this.modal8 = true
    },
    determine () {
      localStorage.removeItem('lefthidden')
      localStorage.removeItem('leftlist')
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('headace')
      localStorage.removeItem('sideleft')
      utils.delCookie('user')
      // let left = document.getElementsByClassName('layout-menu-left')
      // let right = document.getElementsByClassName('contrig')
      // left[0].style.display = 'none'
      // right[0].style.width = '100%'
      this.$router.push({ path: './' })
    }
  },
  computed: {
    ...mapState(['menu'])
  },
  mounted () {
    let that = this
    that.username = JSON.parse(utils.getCookie('user'))
    that.headerdata = JSON.parse(utils.getlocal('userInfo')).menuInfo.children
    // that.headerdata = JSON.parse(sessionStorage.getItem('userInfo')).menuInfo.children
    // alert(JSON.parse(sessionStorage.getItem('userInfo')))
    // if (that.headerdata.length>0) {
    //   console.log(that.headerdata)
    //   let headacc = document.querySelectorAll('.headrigui ul li')
    //   console.log(headacc)
    // }
    // for (let i = 0; i < headacc.length; i++) {
    //   headacc[i].onclick = function () {
    //     alert('s')
    //     for (let j = 0; j < headacc.length; j++) {
    //       headacc[j].style.backgroundColor = ''
    //     }
    //     this.style.backgroundColor = '#D64635'
    //     if (this.innerText === '应用') {
    //       that.lefthidfalse()
    //     } else {
    //       that.lefthidtrue()
    //     }
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.layout{
  height: 50px;
  width: 100%;
  background: #3e81f2;
  //overflow: hidden;
  // position: fixed;
  //   top: 0
}
.headleft{
  height: 100%;
  img{
    // width: 120px;
    height: 42px;
    margin: 4px auto;
    display: block;
  }
}
.headrigui{
  ul{
    overflow: hidden;
    float: left;
    li {
     float: left;
      width: 100px;
      line-height: 50px;
      text-align: center;
      a{
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #fff
      }
    }
  }
}

.headright{
  height: 100%;
  float: right;
  ul{
    overflow: hidden;
    li{
      float: left;
      line-height: 50px;
      width: 50px;
    }
    .adminhead{
      overflow: hidden;
      width: 200px;
      margin-left: 10px;
      color: #fff;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: left;
        margin-top: 10px;
        margin-right: 5px
      }
      a{
        color: #fff;
        margin-left: 5px
      }
      .ivu-select-selection{
        float: left;
      }
      .ivu-select-dropdown ul li{
        width: 85px;
        line-height: 20px
      }
    }
  }
}
</style>
