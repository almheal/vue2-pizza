const {Router} = require('express')
const {tagProduct} = require('../controllers')
const router = Router()


router.post('/tag-product', tagProduct.create)
router.get('/tag-product/:id', tagProduct.get)
router.get('/tag-product', tagProduct.getAll)
router.put('/tag-product/:id', tagProduct.update)
router.delete('/tag-product/:id', tagProduct.delete)



module.exports = router