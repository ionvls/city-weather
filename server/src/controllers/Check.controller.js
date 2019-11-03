// IMPORT MODELS
const Check = require('../models/Check.model')

// Check model
module.exports = {
  getAll: async (req, res) => {
    // return all Checks
    let allChecks
    allChecks = await Check.getAll()
      .then(data => data)

    if (allChecks === null) {
      res.json({
        status: false,
        error: 'Failed to fetch'
      })
    } else {
      res.json({
        status: true,
        data: {
          allChecks
        }
      })
    }
  },

  performCheck: async (req, res) => {
    
    let result = await Check.create({
      city_name: req.body.city_name,
      temp: req.body.temp
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
  }
}
