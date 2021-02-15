const Router = require('express')
const {user} = require('../controllers')
const router = Router()


router.get('/user/:id', user.get)
router.post('/exist-user', user.existingUser)
router.post('/register', user.register)
router.post('/login', user.login)







module.exports = router