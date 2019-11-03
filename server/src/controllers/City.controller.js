// IMPORT MODELS
const City = require('../models/City.model')

// City model
module.exports = {
  getAll: async (req, res) => {
    // return all Cities
    let allCities
    allCities = await City.getAll()
      .then(data => data)

    if (allCities === null) {
      res.json({
        status: false,
        error: 'Failed to fetch'
      })
    } else {
      res.json({
        status: true,
        data: {
          allCities
        }
      })
    }
  },

  getById: async (req, res) => {
    // get City by id
    const City_id = req.params.id
    let City

    City = await City.getOneById(City_id)
      .then(data => data)
    
      if (City === null) {
      res.json({
        status: false,
        error: `Failed to find City`
      })
      return
    }
    res.json({
      status: true,
      data: {
        City
      }
    })
  },

  createCity: async (req, res) => {
    let result = await City.create({
      name: req.body.name
      })
      .then(data => data)
      .catch(err => err)
    if (result === null) {
      res.json({
        status: false,
        error: 'Failed to create'
      })
    } else {
      res.json({
        status: true,
        data: {
          result
        }
      })
    }
  },

  deleteCity: async (req, res) => {
    // Find City by id and delete it
    const city_id = req.body.city_id
    let city
    city = await City.getOneById(city_id)
      .then(data => data)
      .catch(err => err)

    if (city === null) {
      res.json({
        status: false,
        error: 'cannot find City'
      })
    } else {
      await City.remove({
        _id: City.city_id
      })
      .then(data => data)
      res.json({
        status: true,
        message: 'sucess'
      })
    }
  }
}
