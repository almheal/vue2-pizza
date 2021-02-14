const {Schema, model, Types: {ObjectId}} = require('mongoose')

const schema = new Schema({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  price: {type: Number, default: ''},
  valueProduct: {type: Array, default: []},
  ingredients: {type: Array, default: []},
  variety: {type: Array, default: []},
  img: {type: String, default: ''},
  tags: [{type: ObjectId, ref: 'ProductTag'}],
  features: [{type: ObjectId, ref: 'Feature'}],
  category: {type: ObjectId, ref: 'Category'}
})

module.exports = model('Product', schema)