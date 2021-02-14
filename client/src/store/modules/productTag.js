import {requestTag, requestAllTags} from '@/services/productTag.service'

const state = () => ({
  tags: []
})

const getters = {
  getTags: ({tags}) => tags
}

const mutations = {
  SET_TAGS(state,tags){
    state.tags = tags
  }
}

const actions = {
  async fetchAllTags({commit}){
    try {
      const response = await requestAllTags()
      commit('SET_TAGS', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTag(ctx,id){
    try {
      const response = await requestTag(id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
  searchProductTags({getters}, product){
    const {getTags} = getters
    const productTags = product.tags.map(id =>{
      const tag = getTags.find(tag => tag._id === id)
      return tag
    })
    product.tags = productTags
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}