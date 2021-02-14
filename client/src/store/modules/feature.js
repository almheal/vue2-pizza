import {requestFeature, requestFeatures} from '@/services/feature.service'


const state = () => ({
  feature: {},
  features: []
})

const getters = {
  getFeature: ({feature}) => feature,
  getFeatures: ({features}) => features
}

const mutations = {
  SET_FEATURE(state,feature){
    state.feature = feature
  },
  SET_FEATURES(state,features){
    state.features = features
  }
}

const actions = {
  async fetchFeature(ctx,id){
    try {
      const response = await requestFeature(id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
  async fetchFeatures({commit}){
    try {
      const response = await requestFeatures()
      commit('SET_FEATURES', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  searchProductFeatures({getters}, product){
    const {getFeatures} = getters
    const productFeatures = product.features.map(id =>{
      const feature = getFeatures.find(item => item._id === id)
      return feature
    })
    product.features = productFeatures
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}