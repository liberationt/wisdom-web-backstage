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
import {mapState, mapMutations} from 'vuex'
import utils from '../../utils/utils'
export default {
  data () {
    return {
      applicationlist: []
    }

  },
  mounted () {
    let that = this
    let arrlist = []
    let list = []
    for (let i = 0; i < that.menu.menuInfo.children.length; i++) {
      arrlist = that.menu.menuInfo.children[i].children
    }
    for (let j = 0; j < arrlist.length; j++) {
      list.push(arrlist[j].menuCode)
    }
    // let code = {
    //   list
    // }
    this.http.post(BASE_URL + '/system/appManage/getAppManageByMenuCodes', list)
    .then((resp) => {
      if (resp.code == 'success') {
        this.applicationlist = resp.data.menuList
      } else {

      }
    })
    .catch(() => {
    })
  },
  methods: {
    ...mapMutations(['leftlist', 'lefthidtrue']),
    gold_clothes (num) {
      let that = this
      let arrlist = []
      let menucodes = document.getElementsByClassName("redWine")[0].getAttribute('menucode')
      for (let i = 0; i < that.menu.menuInfo.children.length; i++) {
        if (that.menu.menuInfo.children[i].menuCode == menucodes) {
          arrlist = that.menu.menuInfo.children[i].children
        }
      }
      for (let j = 0; j < arrlist.length; j++) {
        if (arrlist[j].menuCode == num) {
          for (let k = 0; k < arrlist[j].children.length; k++) {
            if (arrlist[j].children[k].component == null) {
              arrlist[j].children[k].component = 'HomePage'
            }
            if (arrlist[j].children[k].path == '') {
              arrlist[j].children[k].path = '/homePage'
            }
          }
          that.leftlist(arrlist[j].children)
          utils.putlocal('leftlist', JSON.stringify(arrlist[j].children))
          // sessionStorage.setItem('leftlist', JSON.stringify(arrlist[j].children))
        // console.log(arrlist[j].childMenu)
        } else {
          this.$Message.warning('网站建设中...')
          return false
        }
      }
      this.$router.push({ path: './registrationList' })
      utils.putlocal('lefthidden', true)
      // sessionStorage.setItem('lefthidden', true)
      that.lefthidtrue()
      utils.putlocal('sideleft', '0')
      let left = document.getElementsByClassName('layout-menu-left')
        let right = document.getElementsByClassName('contrig')
        left[0].style.display = 'block'
        right[0].style.width = '83.3%'
      // location.reload()
      // that.menu.menuInfo.childMenu
    }
  },
  computed: {
    ...mapState(['menu'])
  },
}
</script>
<style lang="less" scoped>
#application-con{
  overflow: hidden;
  .application-clothes{
  width: 300px;
  height: 180px;
  border: 1px solid #E7ECF1;
  float: left;
  margin-right: 15px;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  padding: 10px;
  color: #666666;
  background: #fff;
  img{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    vertical-align: middle;
    float: left;
  }
  span{
    float: left;
    display: block;
    height: 100px;
    margin-left: 10px;
    line-height: 24px;
    padding-top: 20px;
    em:first-child{
      font-size: 18px
    }
  }
  }
}
</style>
