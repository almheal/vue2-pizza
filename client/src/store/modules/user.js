import {existUser, registerUser, loginUser} from '@/services/user.service'

const state = () =>({
  registerUser: {
    name: '',
    number: '',
    email: '',
    password: '',
    repeatPassword: ''
  }
})

const getters = {
  getRegisterUser: ({registerUser}) => registerUser
}

const mutations = {

}

const actions = {
  async fetchExistingUser(ctx, data){
    try {
      const response = await existUser(data)
      console.log(response)
      return response
    } catch (e) {
      console.log(e)
    }
  },
  async register(ctx, data){
    try {
      const response = await registerUser(data)
      console.log(response)
      return response
    } catch (e) {
      console.log(e)
    }
  },
  async login(ctx, data){
    try {
      const response = await loginUser(data)
      console.log(response)
      return response
    } catch (e) {
      console.log(e)
    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}