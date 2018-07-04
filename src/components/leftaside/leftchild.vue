<template>
 <li>
    <span @click="toggle($event)" >
        &nbsp;&nbsp;&nbsp;&nbsp;
        {{ model.menuName }}
        <em v-if="model.children&&model.children.length>0">
            <Icon v-if="isFolder" :type="open ? 'ios-arrow-down': 'ios-arrow-up'"></Icon>
           <Icon v-if="!isFolder" :type="ios-arrow-down"></Icon>
        </em>
    </span>
    <transition name="fade">
      <ul v-show="open" transiton="fade" v-if="isFolder" >
        <tree-menu v-for="(item, index) in model.children" :key="index" class="child_routh" @click.native="menuSelect(item.path)" :model="item"></tree-menu>
    </ul>
    </transition>
 </li>
</template>
<script>
import utils from '../../utils/utils'
export default {
  name: 'treeMenu',
  props: ['model'],
  data () {
    return {
      open: false,
      isFolder: true,
      isActive: 0
    }
  },
  computed: {
    // isFolder: function() {
    //   return this.model.children && this.model.children.length
    // }
  },
  mounted () {
    let leftspan = document.querySelectorAll('.tree-menu span')
    let leftul = document.querySelectorAll('.aceul')
    let index
    if (utils.getlocal('sideleft')) {
      index = utils.getlocal('sideleft')
    } else {
      index = 0
    }
    leftspan[index].classList.add('blue')
    leftspan[index].parentNode.parentNode.setAttribute('style', 'display: block')
    // console.log(leftspan[index].parentNode.parentNode.previousSibling.childNodes[0].firstChild.childNodes[1].firstChild)
    // leftspan[index].parentNode.parentNode.previousSibling.childNodes[0].firstChild.childNodes[1].firstChild.classList.remove('ivu-icon-ios-arrow-up')
    // leftspan[index].parentNode.parentNode.previousSibling.childNodes[0].firstChild.childNodes[1].firstChild.classList.add('ivu-icon-ios-arrow-down')
    // if (leftspan[index].parentNode.parentNode.previousSibling.tagName == 'span') {
    // }
  },
  methods: {
    toggle (e) {
      if (this.isFolder) {
        this.open = !this.open
      }
      let leftspan = document.querySelectorAll('.tree-menu span')
      for (let i = 0; i < leftspan.length; i++) {
        leftspan[i].classList.remove('blue')
        leftspan[i].setAttribute('index', i)
      }
      e.target.classList.add('blue')
      utils.putlocal('sideleft', Number(e.target.getAttribute('index')))
    },
    menuSelect: function (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.tree-menu{
  padding-left: 20px
}
.child_routh{
 border-bottom:1px solid #6C7B8B 
}
.child_routh:last-child{
  border-bottom: 0
}
  ul {
    list-style: none;
    // padding-left: 20px;
  }
  i {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
    position: absolute;
    right: 20px;
    top: 12px;
    text-align: center
  }
  .tree-menu li {
    line-height: 40px;
    cursor: pointer;
    // border-top: 1px solid #999;
    // border-bottom: 1px solid #31B1BB;
    span{
        color: #fff;
        display: inline-block;
        width: 100%;
        position: relative;
        pointer-events:auto;
        padding-left: 20px
    }
  }
  .tree-menu li span:hover{
      background: #4FC1E9
  }
  .child_routh span{
    padding-left: 40px!important
  }
</style>
