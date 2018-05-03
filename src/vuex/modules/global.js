// 该模块的初始状态
const state = {
  btnLoadingStr: null,
  btnLoadingID: null,
  toolCurrent: [] // 当前选中的tool
}
// getters
const getters = {
  btnLoading: state => {
    return {
      id: state.btnLoadingID,
      str: state.btnLoadingStr
    }
  },
  toolCurrent: state => {
    return state.toolCurrent
  }
}
// 相关的 mutations
const mutations = {
  UPDATE_BTNLOADINGSTR (state, load) {
    if (load) {
      state.btnLoadingStr = load.str
      state.btnLoadingID = load.id
    } else {
      state.btnLoadingStr = null
      state.btnLoadingID = null
    }
  },
  SET_CURRENT_TOOL (state, val) {
    if (val) {
      state.toolCurrent.push(val)
    }
  }
}
const actions = {
  setCurrentTool ({ commit }, val) {
    commit('SET_CURRENT_TOOL', val)
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
