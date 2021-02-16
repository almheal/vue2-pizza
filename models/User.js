const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  number: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  gender: {type: String, default: 'Мужской'},
  dateOfBirth: {type: String, default: ''},
  img: {type: String, default: ''}
})

module.exports = model('User', schema)