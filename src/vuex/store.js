import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {// 设置初始状态
  count: 1,
  num: 0,
  hidden: false,
  menu: {},
  leftlist: []
}

const mutations = {// 改变初始状态
  add (state, n) {
    state.count += n
  },
  redute (state) {
    state.count--
  },
  lefthidfalse (state) {
    state.hidden = false
    console.log(state.hidden)
  },
  lefthidtrue (state) {
    state.hidden = true
    console.log(state.hidden)
  },
  menuTree (state, object) {
    state.menu = object
    console.log(state.menu)
  },
  leftlist (state, list) {
    state.leftlist = list
    console.log(state.leftlist)
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
