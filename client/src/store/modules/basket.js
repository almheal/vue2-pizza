

const state = ()=>({
  basket: [],
  total: 0,
  countItems: 0
})

const getters = {
  getBasket: ({basket}) => basket,
  getTotal: ({total}) => total,
  getCountItems: ({countItems}) => countItems
}

const mutations = {
  SET_BASKET(state,products){
    state.basket = products
  },
  SET_TOTAL(state,num){
    state.total = num
  },
  SET_COUNT_ITEMS(state,num){
    state.countItems = num
  }
}

const actions = {
  changeCounterProduct({dispatch,getters}, {product, operation}){
    const {getBasket} = getters
    if(operation === '+') product.count++
    if(operation === '-' && product.count > 1){
      product.count--
    }
    dispatch('calculateTotalBasket')
    dispatch('addInLocalProducts',getBasket)
  },
  calculateCountItems({getters,commit}){
    const {getBasket} = getters
    if(!getBasket.length){
      commit('SET_COUNT_ITEMS', 0)
      return
    }
    const count = getBasket.reduce((acc,product) =>{
      acc += product.count
      return acc
    },0)
    commit('SET_COUNT_ITEMS', count)
  },
  calculateTotalBasket({getters,commit}){
    const {getBasket} = getters
    if(!getBasket.length){
      commit('SET_TOTAL', 0)
      return
    }
    const total = getBasket.reduce((acc, product)=>{
      acc += Number(product.price) * Number(product.count)
      return acc
    },0)
    commit('SET_TOTAL', total)
  },
  getProductsFromLocal({commit,dispatch}){
    const products = JSON.parse(localStorage.getItem('products'))
    if(!products){
      localStorage.setItem('products', JSON.stringify([]))
      commit('SET_BASKET', [])
    }else{
      commit('SET_BASKET', products)
    }
    dispatch('calculateCountItems')
    dispatch('calculateTotalBasket')
  },
  async removeFromBasket({commit, dispatch}, product){
    const {filteredBasket} = await dispatch('searchSameProduct', product)
    commit('SET_BASKET', filteredBasket)
    dispatch('addInLocalProducts', filteredBasket)
    dispatch('calculateTotalBasket')
    dispatch('calculateCountItems')
  },
  clearBasket({commit, dispatch}){
    commit('SET_BASKET', [])
    dispatch('addInLocalProducts', [])
    dispatch('calculateTotalBasket')
    dispatch('calculateCountItems')
  },
  async addInBasket({getters,dispatch}, product){
    const {getBasket} = getters
    if(!getBasket.length){
      product.count = 1
      getBasket.push(product)
      dispatch('addInLocalProducts', getBasket)
      dispatch('calculateCountItems')
      dispatch('calculateTotalBasket')
      return
    }
    const {searchedItem} = await dispatch('searchSameProduct', product)
    if(searchedItem){
      searchedItem.count++
    }else{
      product.count = 1
      getBasket.push(product)
    }
    await dispatch('addInLocalProducts', getBasket)
    dispatch('calculateCountItems')
    dispatch('calculateTotalBasket')
  },
  addInLocalProducts(ctx, products){
    localStorage.setItem('products', JSON.stringify(products))
  },
  async searchSameProduct({getters}, product){
    const {getBasket} = getters
    let filteredBasket = []
    let searchedItem = null
    if(!product.variety && !product.kind){
      getBasket.forEach(item => {
        if(item._id === product._id){
          searchedItem = item
        }else{
          filteredBasket.push(item)
        }
      })
    }
    if(product.variety && product.kind){
      filteredBasket = getBasket.filter(item => {
        if(item._id === product._id &&
          item.kind.size === product.kind.size &&
          item.variety.title === product.variety.title &&
          item.ingredients.length === product.ingredients.length){
            const sameIngredients = item.ingredients.filter(ingredient =>{
              const same = product.ingredients.find(item => item._id === ingredient._id)
              if(same){
                return true
              }
            })
            if(sameIngredients.length === product.ingredients.length){
              searchedItem = item
            }else{
              return item
            }
          }else{
            return item
          }
      })
    }
    if(product.variety && !product.kind){
      filteredBasket = getBasket.filter(item =>{
        if(item._id === product._id &&
          item.variety.title === product.variety.title){
            searchedItem = item
          }else{
            return item
          }
      })
    }
    return {searchedItem, filteredBasket}
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}