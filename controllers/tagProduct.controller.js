const genericCrud = require('./generic.controller')
const {TagProduct} = require('../models')

module.exports = {
  ...genericCrud(TagProduct)
}