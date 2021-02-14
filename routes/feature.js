const {Router} = require('express')
const {feature} = require('../controllers')
const router = Router()

router.get('/feature/:id', feature.get)
router.get('/features', feature.getAll)
router.post('/feature', feature.create)
router.put('/feature/:id', feature.update)
router.delete('/feature/:id', feature.delete)


module.exports = router