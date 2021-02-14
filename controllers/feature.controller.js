const {Feature} = require('../models')
const genericCrud = require('./generic.controller')

module.exports = {
  ...genericCrud(Feature)
}