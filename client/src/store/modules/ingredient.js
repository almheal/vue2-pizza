import {requestAllIngredients, requestIngredient} from '@/services/ingredient.service'

const state = () => ({
  ingredients: [],
  filterIngredientsCount: 0,
  filterIngredients: []
})

const getters = {
  getIngredients: ({ingredients}) => ingredients,
  getFilterCount: ({filterIngredientsCount}) => filterIngredientsCount,
  getFilterIngredients: ({filterIngredients}) => filterIngredients
}

const mutations = {
  SET_INGREDIENTS(state,ingredients){
    state.ingredients = ingredients
  },
  SET_FILTER_COUNT(state,num){
    state.filterIngredientsCount = num
  },
  SET_FILTER_INGREDIENTS(state,ingredients){
    state.filterIngredients = ingredients
  }
}

const actions = {
  //request for all ingredients
  async fetchAllIngredients({commit}){
    try {
      const response = await requestAllIngredients()
      commit('SET_INGREDIENTS', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  //single ingredient request
  async fetchIngredient(ctx,id){
    try {
      const response = await requestIngredient(id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
  searchIngredientsProduct({getters}, product){
    const {getIngredients} = getters
    const ingredients = product.ingredients.map(id =>{
      const ingredient = getIngredients.find(item => item._id === id)
      return ingredient
    })
    product.ingredients = ingredients
    return ingredients
  },
  filterIngredients({commit, getters}, ingredient){
    const {getIngredients} = getters
    ingredient.active = !ingredient.active
    const activeIngredients = getIngredients.filter(item => item.active)
    commit('SET_FILTER_COUNT', activeIngredients.length)
    commit('SET_FILTER_INGREDIENTS', activeIngredients)
  },
  disableIngredients({getters}, products){
    const {getIngredients} = getters
    const notRepeatIngredients = new Set()
    products.forEach(product =>{
      for(let i = 0; i < product.ingredients.length; i++){
        notRepeatIngredients.add(product.ingredients[i])
      }
    })
    const notRepeatIngredientsArr = [...notRepeatIngredients]
    getIngredients.forEach(ingredient => ingredient.disable = true)
    notRepeatIngredientsArr.forEach(ingredient => ingredient.disable = false)
  },
  resetFilterIngredients({getters,commit}){
    const {getIngredients} = getters
    getIngredients.forEach(ingredient =>{
      ingredient.active = false
      ingredient.disable = false
    })
    commit('SET_FILTER_COUNT', 0)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}