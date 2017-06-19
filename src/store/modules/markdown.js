import Utils from '../../utils/Utils'
import rende from '../../utils/markdownParser'
const state = {
  md: ''
}

// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
// https://help.github.com/categories/writing-on-github/
const getters = {
  html: (state) => {
    return rende(state.md)
  },
  markdown: (state) => {
    return state.md
  }
}

// const actions = {}

const mutations = {
  change (state, payload) {
    state.md = payload
  }
}

export default {
  state,
  getters,
  // actions,
  mutations
}
