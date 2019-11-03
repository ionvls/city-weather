const router = require('express').Router()

// Import controllers
const CityController = require('./controllers/City.controller')
const CheckController = require('./controllers/Check.controller')

router.route('/city').get(CityController.getAll)
router.route('/city/create').post(CityController.createCity)
router.route('/city/delete').post(CityController.deleteCity)
router.route('/check').post(CheckController.getAll)
router.route('/check/perform').get(CheckController.performCheck)

module.exports = router
