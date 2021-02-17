const genericCrud = require('./generic.controller')
const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {
  ...genericCrud(User),
  async existingUser({body: {number, email}},res){
    try {
      const existNumber = await User.findOne({number})

      if(existNumber){
        return res.status(400).json({message: 'Пользователь с таким номером зарегистрирован'})
      }

      const existEmail = await User.findOne({email})

      if(existEmail){
        return res.status(400).json({message: 'Пользователь с таким email зарегистрирован'})
      }

      return res.status(200).json()
    } catch (e) {
      console.log(e)
    }
  },
  async register({body}, res){
    try {
      const {name, number, email, password, repeatPassword} = body

      if(password !== repeatPassword){
        return res.status(400).json({message:'Пароли не совпадают'})
      }
      const hashPassword = await bcrypt.hash(password,12)

      const user = new User({password: hashPassword, name, number, email})
      await user.save()

      return res.status(201).json({message: 'Регистрация прошла успешно'})
    } catch (e) {
      console.log(e)
    }
  },
  async login({body}, res){
    try {
      const {password, number} = body

      const user = await User.findOne({number})
      if(!user){
        return res.status(400).json({message: 'Не корректные данные'})
      }

      const somePasswords = await bcrypt.compare(password, user.password)
      if(!somePasswords){
        return res.status(400).json({message: 'Не корректные данные'})
      }

      const token = await jwt.sign({id: user._id}, config.get('secretToken'), {expiresIn: '24h'})
      const {name, email, gender, dateOfBirth, img} = user
      return res.status(200).json({token, name, email, number: user.number, gender, dateOfBirth, img})
    } catch (e) {
      console.log(e)
    }
  },
  async auth({id},res){
    try {
      const user = await User.findById(id)
      if(!user){
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const {name, email, number, gender, dateOfBirth, img} = user

      res.status(200).json({name, email, number, gender, dateOfBirth, img})
      return res.status(200).json()
    } catch (e) {
      console.log(e)
    }
  },
  async update({id, body}, res){
    try {
      const user = await User.findByIdAndUpdate(id, body, {new: true})
      const {name, email, number, gender, dateOfBirth, img} = user
      res.status(200).json({name,email,number,gender,dateOfBirth, img})
    } catch (e) {
      console.log(e)
    }
  }
}