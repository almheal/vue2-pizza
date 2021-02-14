import {request} from './generic.service'

const requestFeature = (id) => request({url: `/feature/${id}`, method: 'get'})
const requestFeatures = () => request({url: `/features`, method: 'get'})


export {
  requestFeature,
  requestFeatures
}



// router.get('/feature/:id', feature.get)
// router.get('/features', feature.getAll)
// router.post('/feature', feature.create)
// router.put('/feature/:id', feature.update)
// router.delete('/feature/:id', feature.delete)
