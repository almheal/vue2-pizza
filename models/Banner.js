const {Schema, model} = require('mongoose')

const schema = new Schema({
  url: {type: String, default: ''}
})

module.exports = model('Banner', schema)