const Router = require('express')
const {user} = require('../controllers')
const {auth} = require('../middlewares')
const router = Router()


router.get('/user/:id', user.get)
router.post('/exist-user', user.existingUser)
router.post('/register', user.register)
router.post('/login', user.login)
router.get('/auth', auth, user.auth)
router.put('/user', auth, user.update)







module.exports = router