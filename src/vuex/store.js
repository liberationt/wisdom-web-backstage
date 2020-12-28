import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {// 设置初始状态
  count: 1,
  num: 0,
  hidden: false,
  headerhidden:false,
  menu: {},
  leftlist: [],
  leftheadname:'应用首页'
}

const mutations = {// 改变初始状态
  add (state, n) {
    state.count += n
  },
  showname (state, name) {
    state.leftheadname = name
  },
  redute (state) {
    state.count--
  },
  lefthidfalse (state) {
    state.hidden = false
  },
  lefthidtrue (state) {
    state.hidden = true
  },
  headerfalse (state) {
    state.headerhidden = false
  },
  headertrue (state) {
    state.headerhidden = true
  },
  menuTree (state, object) {
    state.menu = object
  },
  leftlist (state, list) {
    state.leftlist = list
  }
}

const actions = {// 异步提交状态，提交的是mutations
  addActions ({commit}) {
    commit('add', 4)
  },
  sopActions ({commit}) {
    commit('redute')
  },
  actlefthid ({commit}) {
    commit('lefthid')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
