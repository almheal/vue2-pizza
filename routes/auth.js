const Router = require('express')
const uniqid = require('uniqid')
const router = Router()

router.get('/init', async(req,res)=>{
  try {
    const uniqueId = await uniqid('uq-')
    res.cookie('uq', uniqueId, {
      httpOnly: true
    })
    console.log(req.cookies.token)
    res.status(200).json(uniqueId)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так'})
  }
})


module.exports = router