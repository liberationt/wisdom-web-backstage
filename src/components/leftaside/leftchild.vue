<template>
 <li>
    <span @click="toggle" >
        &nbsp;&nbsp;&nbsp;&nbsp;
        {{ model.menuName }}
        <em v-if="model.children&&model.children.length>0">
            <Icon v-if="isFolder" :type="open ? 'ios-arrow-down': 'ios-arrow-up'"></Icon>
           <Icon v-if="!isFolder" :type="ios-arrow-down"></Icon>
        </em>
    </span>
    <ul v-show="open" v-if="isFolder" >
        <tree-menu v-for="(item, index) in model.children" :key="index" class="child_routh" @click.native="menuSelect(item.path)" :model="item"></tree-menu>
    </ul>
 </li>
</template>
<script>
export default {
  name: 'treeMenu',
  props: ['model'],
  data () {
    return {
      open: false,
      isFolder: true
    }
  },
  computed: {
    // isFolder: function() {
    //   return this.model.children && this.model.children.length
    // }
  },
  mounted () {

  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    menuSelect: function (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
<style lang="less" scoped>
  ul {
    list-style: none;
    padding-left: 20px;
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
    span{
        color: #fff;
        display: inline-block;
        width: 100%;
        position: relative;
        pointer-events:auto;
    }
  }
  .tree-menu li span:hover{
      background: #3889D4
  }
</style>
