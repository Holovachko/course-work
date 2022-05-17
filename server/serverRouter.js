import serverController from './serverController'

const Router = require('express')
const router = new Router()

router.get('/setItems' , serverController.saveToDBItems)
router.get('/getItems', serverController.getPaginatedItems)
router.get('/setNewTags',serverController.setNewTags)

export default router