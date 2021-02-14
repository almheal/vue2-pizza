import {request} from './generic.service'

const requestAllProducts = () => request({url: '/products', method: 'get'})
const requestProduct = (id) => request({url: `/product/${id}`, method: 'get'})

export {
  requestAllProducts,
  requestProduct
}