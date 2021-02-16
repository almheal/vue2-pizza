import {request} from './generic.service'

const existUser = (data) => request({url: '/exist-user', method: 'post', data})
const registerUser = (data) => request({url:'/register', method: 'post', data})
const loginUser = (data) => request({url: '/login', method:'post', data})
const authUser = () => request({url: '/auth', method: 'get'})
const updateUser = (data) => request({url: '/user', method: 'put', data})


export {
  existUser,
  registerUser,
  loginUser,
  authUser,
  updateUser
}