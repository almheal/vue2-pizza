import {requestAllCategories, requestCategory} from '@/services/category.service'

const state = () => ({
  categories: [],
  category: {}
})

const getters = {
  getCategories: ({categories}) => categories,
  getCategory: ({category }) => category
}

const mutations = {
  SET_CATEGORIES(state,categories){
    state.categories = categories
  },
  SET_CATEGORY(state,category){
    state.category = category
  }
}

const actions = {
  async fetchCategories({commit}){
    try {
      const response = await requestAllCategories()
      commit('SET_CATEGORIES', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCategory({commit}, id){
    try {
      const response = requestCategory(id)
      commit('SET_CATEGORY', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  searchCategoryByTitle({getters}, title){
    const {getCategories} = getters
    const category = getCategories.find(category => category.title === title)
    return category
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}