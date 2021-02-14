import {request} from './generic.service'

const requestIngredientCategory = (id) => request({url: `/ingredient-category/${id}`, method: 'get'})
const requestIngredientCategories = () => request({url: `/ingredient-categories`, method: 'get'})

export {
  requestIngredientCategory,
  requestIngredientCategories
}