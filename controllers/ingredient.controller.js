const genericCrud = require('./generic.controller')
const {Ingredient} = require('../models')

module.exports = {
  ...genericCrud(Ingredient)
}