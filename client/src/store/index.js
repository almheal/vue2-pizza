import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import product from './modules/product'
import productTag from './modules/productTag'
import feature from './modules/feature'
import ingredient from './modules/ingredient'
import ingredientCategory from './modules/ingredientCategory'
import productConstructor from './modules/constructor'
import basket from './modules/basket'
import halves from './modules/halves'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: ''
  },
  getters:{
    getLanguage: ({language}) => language
  },
  mutations: {
    SET_LANGUAGE(state,value){
      state.language = value
    }
  },
  actions: {
    changeLanguage({commit}, language){
      commit('SET_LANGUAGE', language)
      localStorage.setItem('language', JSON.stringify(language))
    }
  },
  modules: {
    category,
    product,
    productTag,
    feature,
    ingredient,
    ingredientCategory,
    productConstructor,
    basket,
    localStorage,
    halves
  }
})
