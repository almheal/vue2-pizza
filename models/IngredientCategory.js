const {Schema, model, Types: {ObjectId}} = require('mongoose')

const schema = new Schema({
  title: {type: String, default: ''},
  ingredients: [{type: ObjectId, ref: 'Ingredient'}]
})


module.exports = model('IngredientCategory', schema)