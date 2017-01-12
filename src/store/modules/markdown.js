import marked from 'marked'

const state = {
  md: ''
}

const getters = {
  html: (state, getters, rootState) => marked(state.md)
}

const actions = {
  
}

const mutations = {
  change (state, payload){
    state.md = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
