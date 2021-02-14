import {
  requestIngredientCategory,
  requestIngredientCategories}
from '@/services/ingredientCategory.service'

const state = () => ({
  categories: [],
})

const getters = {
  getIngredientCategories: ({categories}) => categories,
}

const mutations = {
  SET_CATEGORIES(state,categories){
    state.categories = categories
  },
}

const actions = {
  async fetchAllIngredientCategories({commit}){
    try {
      const response = await requestIngredientCategories()
      commit('SET_CATEGORIES', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchIngredientCategory(ctx,id){
    try {
      const response = await requestIngredientCategory(id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}