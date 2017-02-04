const state = {
  query: {}
}

const getters = {
}

const actions = {
}

const mutations = {
  query (state, query) {
    console.log('query exec ....');
    state.query = query
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
