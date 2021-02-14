import {request} from './generic.service'

const requestAllCategories = () => request({url: '/categories', method: 'get'})
const requestCategory = (id) => request({url: `/category/${id}`, method: 'get'})


export {
  requestAllCategories,
  requestCategory
}