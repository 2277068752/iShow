import types from '../constTypes.js'
import {
  getNewComp
} from '../function.js'

const BASE_COMP_SUFFIX = 'Data'
const state = {
  list: [],
  curCompId: null,
  propsPanel: {
    show: false,
    name: '',
    id: ''
  } // 组件属性面板
}
const getters = {
  // 根据页面ID取页面中所有的组件
  getComponentsBuPageId: (state) => (pageId) => {
    return state.list.finter((_x) => _x.parentId === pageId)
  },
  // 根据组件ID取当前组件
  curComp: (state) => {
    return state.list.find(_x => _x.id === state.curCompId)
  },
  // 根据组件ID取当前组件的配置信息
  getCompConfigByCompId: (state) => (compid) => {
    return state.list.find(_x => _x.id === compid)
  },
  propPanel: (state) => {
    return state.propsPanel
  }
}
const mutations = {
  // 设置当前组件id
  [types.TOGGLE_COMP] (state, id) {
    state.curCompId = id
  },
  // 编辑当前组件
  [types.EDIT_COMP] (state, {
    type,
    value,
    compId
  }) {
    // 先取当前组件
    let component = state.list.find((_x) => _x.id === compId || _x.id === state.curCompId)
    if (component) {
      let compProp = component[type]
      for (let key in value) {
        if (!compProp[key].toString()) {
          continue
        }
        if (typeof value[key] === 'object') {
          Object.assign(compProp[key], value[key])
        } else {
          compProp[key] = value[key]
        }
      }
    }
  },
  // 新增组件
  [types.ADD_COMPONENT] (state, val) {
    state.list.push(val)
  },
  [types.OPEN_PROPS_PANEL] (state, {
    id,
    name
  }) {
    state.propsPanel = {
      show: true,
      name: name,
      id: id
    }
  },
  [types.CLOSE_PROPS_PANEL] (state) {
    state.propsPanel = {
      show: false,
      id: '',
      name: ''
    }
  }
}
const actions = {
  // 添加一个新组件
  addNewComp ({
    commit,
    getters
  }, name) {
    const compData = getNewComp(name + BASE_COMP_SUFFIX)
    if (compData) {
      let newCompData = Object.assign(compData, {
        parentId: getters.curPageId
      })
      commit(types.ADD_COMP_TO_PAGES, newCompData)
      commit(types.ADD_COMPONENT, newCompData)
    }
  },
  // 激活当前组件
  toggleComp ({
    commit
  }, val) {
    commit(types.TOGGLE_COMP, val)
  },
  // 更新组件
  editComp ({
    commit
  }, {
    type,
    value,
    compId
  }) {
    commit(types.EDIT_COMP, {
      type,
      value,
      compId
    })
  },
  // 打开组件属性设置面板
  openPropsPanel ({
    commit
  }, {
    id,
    name
  }) {
    commit(types.OPEN_PROPS_PANEL, {
      id: id,
      name: name
    })
  },
  // 关闭组件属性设置面板
  closePropsPanel ({
    commit
  }) {
    commit(types.CLOSE_PROPS_PANEL)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
