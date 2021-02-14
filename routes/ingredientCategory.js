const {Router} = require('express')
const {ingredientCategory} = require('../controllers')
const router = Router()


router.get('/ingredient-categories',  ingredientCategory.getAll)
router.get('/ingredient-category/:id',  ingredientCategory.get)
router.post('/ingredient-category',  ingredientCategory.create)
router.put('/ingredient-category/:id',  ingredientCategory.update)
router.delete('/ingredient-category/:id',  ingredientCategory.delete)



module.exports = router