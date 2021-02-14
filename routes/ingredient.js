const {Router} = require('express')
const {ingredient} = require('../controllers')
const router = Router()

router.get('/ingredients', ingredient.getAll)
router.get('/ingredient/:id', ingredient.get)
router.post('/ingredient', ingredient.create)
router.put('/ingredient/:id', ingredient.update)
router.delete('/ingredient/:id', ingredient.delete)



module.exports = router