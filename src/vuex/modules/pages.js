import types from '../constTypes.js'
import { getNewPageId, getNewPage } from '../function.js'
import { deepCopy } from '../../assets/utils/util.js'

const state = {
  list: [],
  curPageId: null
}
const getters = {
  // 取页面列表
  pages: (state) => state.list,
  // 取当前页面ID
  curPageId: (state) => {
    if (state.curPageId) {
      return state.curPageId
    }
    if (state.list[0]) {
      return state.list[0]['id']
    }
  },
  // 取当前页面
  curPage: (state) => {
    return state.list
      .find(
        (_x) => _x.id === state.curPageId
      ) || state.list[0]
  },
  getPageConfigByPageId: (state) => (pageId) => {
    return state.list.find(_x => _x.id === pageId)
  }
}
const mutations = {
  // 切换页面
  [types.TOGGLE_PAGE] (state, pageId) {
    state.curPageId = pageId
  },
  // 添加页面
  [types.ADD_PAGE] (state, pageData) {
    state.list.push(pageData)
  },
  // 插入页面
  [types.INSERT_PAGE] (state, { page, pageId }) {
    let index = state.list
      .findIndex(
        _x => _x.id === pageId
      )
    if (index > -1) {
      state.list.splice(index + 1, 0, page)
    }
  },
  // 拷贝页面
  [types.COPY_PAGE] (state, { pageData, pageId }) {
    let list = state.list
    let index = list.findIndex(_x => _x.id === pageId)
    if (index > -1) {
      // 复制一个新的页面JSON对象
      let pageData = deepCopy(list[index])
      pageData.id = pageId
      list.splice(index + 1, 0, pageData)
      state.curPageId = pageId
    }
  },
  // 删除页面
  [types.REMOVE_PAGE] (state, pageId) {
    let list = state.list
    let index = list.findIndex(_x => _x.id === pageId)
    if (index > -1) {
      list.splice(index, 1)
      let nextActivePage = list[index] || list[index - 1]
      state.curPageId = nextActivePage['id']
    }
  },
  // 编辑当前页面
  [types.EDIT_COMP] (state, { type, value, pageId }) {
    let page = state.list
      .find(
        (_x) => _x.id === pageId || _x.id === state.curPageId
      )
    if (page) {
      let pageProp = page[type]
      for (let key in value) {
        if (!pageProp[key]) {
          continue
        }
        if (typeof value[key] === 'object') {
          Object.assign(pageProp[key], value[key])
        } else {
          pageProp[key] = value[key]
        }
      }
    }
  },
  // 往页面中添加组件
  [types.ADD_COMP_TO_PAGES] (state, compData) {
    let curPage = state.list
      .find((_x) => _x.id === state.curPageId)
    if (curPage) {
      curPage.comps.push(compData)
    }
  }
}
const actions = {
  // 添加新的页面
  addNewPages ({ commit }) {
    const page = getNewPage()
    if (page) {
      commit(types.ADD_PAGE, page)
    }
    return page.id
  },
  /**
   * 插入新页面
   * @param commit
   * @param prePageId 前一个页面的ID
   */
  insertPage ({ commit }, prePageId) {
    let page = getNewPage()
    if (page) {
      commit(types.INSERT_PAGE, {
        page,
        pageId: prePageId
      })
    }
    return page.id
  },
  // 拷贝指定页面
  copyPage ({ commit }, pageId) {
    let id = getNewPageId()
    if (id) {
      commit(types.COPY_PAGE, {
        prePageId: pageId,
        pageId: id
      })
    }
    return id
  },
  // 删除指定页面
  removePage ({ commit }, pageId) {
    commit(types.REMOVE_PAGE, pageId)
    return pageId
  },
  /**
   * 初始化Editor 编辑器
   * 同时新建一个页面
   **/
  initPageEditor ({ dispatch, commit }) {
    dispatch('addNewPages')
      .then((id) => {
        commit(types.TOGGLE_PAGE, id)
      })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
