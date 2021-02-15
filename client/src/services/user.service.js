import {request} from './generic.service'

const existUser = (data) => request({url: '/exist-user', method: 'post', data})
const registerUser = (data) => request({url:'/register', method: 'post', data})
const loginUser = (data) => request({url: '/login', method:'post', data})


export {
  existUser,
  registerUser,
  loginUser
}