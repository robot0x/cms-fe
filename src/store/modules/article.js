const state = {
  title: ['冬天里的一把火', '熊熊火光照亮了我']
}

const getters = {
  handleTitle: (state, getters, rootState) => state.title.join(' ')
}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
