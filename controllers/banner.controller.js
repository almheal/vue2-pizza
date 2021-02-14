const genericCrud = require('./generic.controller')
const {Banner} = require('../models')

module.exports = {
  ...genericCrud(Banner)
}