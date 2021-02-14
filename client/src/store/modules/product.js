import {requestAllProducts, requestProduct} from '@/services/product.service'

const state = () => ({
  products: [],
  product: {},
  pizza: [],
})

const getters = {
  getProducts: ({products}) => products,
  getProduct: ({product}) => product,
  getPizza: ({pizza}) => pizza,
}

const mutations = {
  SET_PRODUCTS(state,products){
    state.products = products
  },
  SET_PRODUCT(state,product){
    state.product = product
  },
  SET_PIZZA(state,pizza){
    state.pizza = pizza
  }
}

const actions = {
  //request for all products
  async fetchAllProducts({commit}){
    try {
      const response = await requestAllProducts()
      commit('SET_PRODUCTS', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  //single product request
  async fetchProduct({commit},id){
    try {
      const response = await requestProduct(id)
      commit('SET_PRODUCT', response.data)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
  setPizzaProducts({commit}, products){
    commit('SET_PIZZA', products)
  },
  setProduct({commit}, product){
    commit('SET_PRODUCT', product)
  },
  changeVarietyProduct(ctx, {product,variety}){
    if(product.variety.title === variety.title) return
    product.variety = variety
    product.img = variety.img
    if(variety.kind){
      product.kind = variety.kind[0]
      product.price = product.kind.price
    }else{
      product.price = variety.price
    }
  },
  changeKindProduct(ctx, {product, kind}){
    if(product.kind.size === kind.size) return
    product.kind = kind
    product.price = kind.price
  },
  searchProductsByCategory({getters}, category){
    const {getProducts} = getters
    const productsCategory = getProducts.filter(product => product.category === category._id)
    return productsCategory
  },
  startingActiveProduct(ctx, product){
    const {title, _id} = product
    let img,variety,kind,price, ingredients
      if(product.variety.length){
        variety = product.variety[0]
        img = variety.img
        price = variety.price
        if(variety.kind){
          kind = variety.kind[0]
          price = kind.price
        }
      }else{
        img = product.img
        price = product.price
      }
      if(product.ingredients.length){
        ingredients = product.ingredients
      }
      const activeProduct = {
        img,variety,kind,price, title, _id, ingredients
      }
      return activeProduct
  },
  searchProductsByTitles(ctx, {products, titles}){
    const searchedProducts = products.filter(product =>{
      for(let i = 0; i < titles.length; i++){
        if(titles[i].toLowerCase() === product.title.toLowerCase()){
          return product
        }
      }
    })
    return searchedProducts
  },
  filterProductsByIngredients(ctx, { products, ingredients }){
    if(!ingredients.length){
      const filteredProducts = products.filter(product => {
        product.filter = false
        return product
      })
      return filteredProducts
    }
    const filteredProducts = products.filter(product =>{
      let matches = 0
      for (let i = 0; i < ingredients.length; i++){
        for(let j = 0; j < product.ingredients.length; j++){
          if(matches === ingredients.length){
            product.filter = false
            return product
          }
          if(ingredients[i]._id === product.ingredients[j]._id){
            matches++
            if(matches === ingredients.length){
              return product
            }
          }
        }
      }
      product.filter = true
    })
    return filteredProducts
  },
  resetFilterProducts(ctx, products){
    products.forEach(product => {
      product.filter = false
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}