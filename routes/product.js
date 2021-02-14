const Router = require('express')
const {product} = require('../controllers')
const router = Router()



router.post(`/product`, product.create)
router.get('/products', product.getAll)
router.get(`/product/:id`, product.get)
router.delete(`/product/:id`, product.delete)
router.put(`/product/:id`, product.update)

module.exports = router