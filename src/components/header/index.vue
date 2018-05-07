<template>
  <div class="layout">
    <Row>
      <Col span="4" class="headleft"><div ><img src="../../image/logo.png" alt="" ></div></Col>
      <Col span="20">
        <Col span="16" class="headrigui">
          <ul >
            <li><router-link to="/homePage">管理首页</router-link></li>
            <li><router-link to="/homePage">公众号</router-link></li>
            <li><router-link to="/homePage">小程序</router-link></li>
            <li><router-link to="/applicationHomePage">应用</router-link></li>
            <li><router-link to="/homePage">报表</router-link></li>
            <li><router-link to="/homePage">财务</router-link></li>
            <li><router-link to="/homePage">系统</router-link></li>
          </ul>
        </Col>
        <Col span="8" class="headright">
          <ul>
            <li>
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
            </li>
            <li class="adminhead">
              <img src="../../image/poptx.jpeg" alt="">
                <Select v-model="model3" style="width:100px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </li>
          </ul>
        </Col>
      </Col>
   </Row>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'headerpt',
  data () {
    return {
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
      model4: ''
    }
  },
  methods: {
    ...mapMutations(['lefthidfalse', 'lefthidtrue']),
    Active: function () {
      // $('.headleft ul li a').removeClass('redWine')
      // thiss.addClass('redWine')
    }
  },
  mounted () {
    var that = this
    var headacc = document.querySelectorAll('.headrigui ul li a')
    for (var i = 0; i < headacc.length; i++) {
      headacc[i].onclick = function () {
        for (var j = 0; j < headacc.length; j++) {
          headacc[j].style.backgroundColor = ''
        }
        this.style.backgroundColor = '#D64635'
        if (this.innerText === '应用') {
          that.lefthidfalse()
        } else {
          that.lefthidtrue()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout{
  height: 50px;
  width: 100%;
  background: #495060;
  //overflow: hidden;
  // position: fixed;
  //   top: 0
}
.headleft{
  height: 100%;
  img{
    width: 120px;
    height: 50px;
    margin: 0 auto;
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
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: left;
        margin-top: 10px;
        margin-right: 5px
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
