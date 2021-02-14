const {Schema, model, Types: {ObjectId}} = require('mongoose')


const schema = new Schema({
  title: {type: String, default: ''},
  price: {type: Number, default: 0},
  img: {type: String, default: ''},
  mark: {type: Boolean, default: true},
  products: [{type: ObjectId, ref: 'Product'}],
  category: {type: ObjectId, ref: 'IngredientCategory'}
})


module.exports = model('Ingredient', schema)