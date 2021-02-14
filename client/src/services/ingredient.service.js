import {request} from './generic.service'

const requestIngredient = (id) => request({url:`/ingredient/${id}`, method: 'get'})
const requestAllIngredients = () => request({url:`/ingredients`, method: 'get'})

export {
  requestIngredient,
  requestAllIngredients
}