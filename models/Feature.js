const {Schema, model, Types: {ObjectId}} = require('mongoose')

const schema = new Schema({
  title: {type: String, default: ''},
  img: {type: String, default: ''},
  products: [{type: ObjectId, ref: 'Product'}]
})

module.exports = model('Feature', schema)