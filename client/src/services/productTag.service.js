import {request} from './generic.service'

const requestTag = (id) => request({url: `/tag-product/${id}`, method: 'get'})
const requestAllTags = () => request({url: '/tag-product', method: 'get'})

export {
  requestTag,
  requestAllTags
}