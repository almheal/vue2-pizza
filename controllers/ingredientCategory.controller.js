const genericCrud = require('./generic.controller')
const {IngredientCategory} = require('../models')

module.exports = {
  ...genericCrud(IngredientCategory)
}