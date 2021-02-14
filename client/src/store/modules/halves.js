

const state = () => ({
  product:{},
  leftProduct: null,
  rightProduct: null
})

const getters = {
  getLeftProduct: ({leftProduct}) => leftProduct,
  getRightProduct: ({rightProduct}) => rightProduct,
  getHalvesProduct: ({product}) => product
}

const mutations = {
  SET_LEFT_PRODUCT(state,product){
    state.leftProduct = product
  },
  SET_RIGHT_PRODUCT(state,product){
    state.rightProduct = product
  },
  SET_HALVES_PRODUCT(state,product){
    state.product = product
  }
}

const actions = {
  setLeftProduct({commit}, product){
    commit('SET_LEFT_PRODUCT', product)
  },
  setRightProduct({commit}, product){
    commit('SET_RIGHT_PRODUCT', product)
  },
  setHalvesProduct({commit}, product){
    commit('SET_HALVES_PRODUCT', product)
  },
  compoundIngredients(ctx, {leftProduct, rightProduct}){
    const ingredients = [...leftProduct.ingredients, ...rightProduct.ingredients]
    const notRepetive = new Set()
    ingredients.forEach(ingredient => notRepetive.add(ingredient))
    const updatedIngredients = [...notRepetive]
    return updatedIngredients
  }
}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}