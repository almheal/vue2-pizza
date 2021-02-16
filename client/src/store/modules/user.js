import {existUser, registerUser, loginUser, authUser, updateUser} from '@/services/user.service'

const state = () =>({
  user: null,
  registerUser: {
    name: '',
    number: '',
    email: '',
    password: '',
    repeatPassword: ''
  },
  message: ''
})

const getters = {
  getRegisterUser: ({registerUser}) => registerUser,
  getUserMessage: ({message}) => message,
  getUser: ({user}) => user
}

const mutations = {
  SET_MESSAGE(state,msg){
    state.message = msg
  },
  SET_USER(state,user){
    state.user = user
  }
}

const actions = {
  async fetchExistingUser({commit}, data){
    try {
      const response = await existUser(data)
      return response
    } catch (e) {
      commit('SET_MESSAGE', e.response.data.message)
      return e.response
    }
  },
  async fetchUpdateUser({commit}, data){
    try {
      const response = await updateUser(data)
      console.log(response)
      commit('SET_USER', response.data)
    } catch (e) {
      console.log(e)
    }
  },
  async register({commit, getters}, data){
    const {getRegisterUser} = getters
    try {
      const response = await registerUser(data)
      commit('SET_MESSAGE', response.data.message)

      Object.keys(getRegisterUser).forEach(key => getRegisterUser[key] = '')

      setTimeout(()=>{
        commit('SET_MESSAGE', '')
      },3000)

      return response
    } catch (e) {
      commit('SET_MESSAGE', e.response.data.message)
      return e.response
    }
  },
  async login({commit}, data){
    try {
      const response = await loginUser(data)
      commit('SET_USER', response.data)
      return response
    } catch (e) {
      commit('SET_MESSAGE', e.response.data.message)
      return e.response
    }
  },
  async auth({commit}){
    const token = localStorage.getItem('my_app_token')
    if(!token) return
    try {
      const response = await authUser()
      commit('SET_USER', response.data)
      return response
    } catch (e) {
      return e.response
    }
  },
  logout({commit}){
    localStorage.setItem('my_app_token', '')
    commit('SET_USER', null)
  },
  changeMessage({commit}, msg){
    commit('SET_MESSAGE', msg)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}