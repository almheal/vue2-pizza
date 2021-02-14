const state = () => ({
  product: {},
  ingredientsLength: 0,
  total: 0
})

const getters = {
  getConstructorProduct:({product}) => product,
  getIngredientsLength: ({ingredientsLength}) => ingredientsLength,
  getTotal: ({total}) => total,
}

const mutations = {
  SET_PRODUCT(state,product){
    state.product = product
  },
  SET_INGREDIENTS_LENGTH(state,num){
    state.ingredientsLength = num
  },
  SET_TOTAL(state,num){
    state.total = num
  }
}

const actions = {
  setConstructorProduct({commit}, product){
    commit('SET_PRODUCT', product)
  },
  createLinkConstructor(ctx, {_id, title, size, removedIngredients}){
    let ingredientsLink = ''
    if(removedIngredients.length){
      const removedLink = removedIngredients.reduce((acc,ingredient)=>{
        acc += `&removed=${ingredient._id}`
        return acc
      }, '')
      ingredientsLink = removedLink
    }
    const link = `/constructor?id=${_id}&title=${title}&size=${size}${ingredientsLink}`
    return link
  },
  addIngredientInProduct({getters }, ingredient){
    const {getConstructorProduct, getIngredientsLength} = getters
    const searchedIngredient = getConstructorProduct.ingredients.find(item => item._id === ingredient._id)
    if(getIngredientsLength === 10 && !searchedIngredient) return
    if(getIngredientsLength === 10 && searchedIngredient.count === 2){
      searchedIngredient.count--
      return
    }else if(getIngredientsLength === 10 && searchedIngredient.count < 2) return
    if(!searchedIngredient){
      ingredient.count = 1
      getConstructorProduct.ingredients.push(ingredient)
      return
    }
    if(ingredient.count === 2){
      ingredient.count--
    }else{
      ingredient.count++
    }
  },
  calculateIngredientsLength({getters,commit}){
    const {getConstructorProduct} = getters
    const ingredientsLength = getConstructorProduct.ingredients.reduce((acc,ingredient)=>{
      acc += Number(ingredient.count)
      return acc
    },0)
    commit('SET_INGREDIENTS_LENGTH', ingredientsLength)
  },
  changeCountIngredient({getters}, {ingredient, num}){
    const {getIngredientsLength} = getters
    if(ingredient.count === num) return
    if(getIngredientsLength === 10 && num === 2) return
    ingredient.count = num
  },
  calculateTotal({getters,commit}){
    const {getConstructorProduct} = getters
    const totalIngredients = getConstructorProduct.ingredients.reduce((acc,ingredient)=>{
      if(!ingredient.owner){
        acc += ingredient.count * ingredient.price
      }else if(ingredient.owner && ingredient.count === 2){
        acc += ingredient.price
      }
      return acc
    },0)
    const total = Number(totalIngredients) + Number(getConstructorProduct.kind.price)
    commit('SET_TOTAL', total)
  },
  removeIngredient({getters, dispatch}, ingredient){
    const {getConstructorProduct} = getters
    const updatedIngredients = getConstructorProduct.ingredients.filter(item =>{
      if(item._id !== ingredient._id){
        return item
      }else{
        item.count = 0
      }
    })
    getConstructorProduct.ingredients = updatedIngredients
    dispatch('calculateTotal', getConstructorProduct)
    dispatch('calculateIngredientsLength')
  },
  removedIngredientsFromQuery({getters, dispatch}, ids){
    const {getConstructorProduct} = getters
    const removedIngredients = ids.map(id => {
      const ingredient = getConstructorProduct.ingredients.find(item => item._id === id)
      return ingredient
    })
    removedIngredients.forEach(ingredient =>{
      dispatch('removeIngredient', ingredient)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}