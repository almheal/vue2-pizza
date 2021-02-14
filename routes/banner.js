const Router = require('express')
const {banner} = require('../controllers')
const router = Router()

router.get('/images/banner', banner.getAll)
router.post('/images/banner', banner.create)

module.exports = router