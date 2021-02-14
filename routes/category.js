const Router = require('express')
const {category} = require('../controllers')
const router = Router()


router.post(`/category`, category.create)
router.get('/categories', category.getAll)
router.get(`/category/:id`, category.get)
router.delete(`/category/:id`, category.delete)
router.put(`/category/:id`, category.update)

module.exports = router