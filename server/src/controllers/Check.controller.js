const request = require('request');
// IMPORT MODELS
const Check = require('../models/Check.model')
const City = require('../models/City.model')

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
    //https://samples.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=b6907d289e10d714a6e88b30761fae22
    //"https://api.openweathermap.org/data/2.5/weather?q=Athens&units=metric&appid=691b967bdbbe5ee9121bcd8667a4618a"
    
    let cities = await City.getAll()
      .then(data => data)
      .catch(err => err)
    if (cities === null) {
      res.json({
        status: false,
        error: 'No cities available'
      })
    } else {
      let result={}
      cities.forEach(c => {
        let temp = request('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22', { json: true }, (err, res, body) => {
          if (err) { 
            console.log(err) 
            return false
          }
          console.log(body.main.temp)
          // console.log(res)
          return body.main.temp
        })
        if(temp)
          result[c]=temp
      })
      console.log(result)
      res.json({
        status: true,
        data: {
          result
        }
      })
    }
  }
}
