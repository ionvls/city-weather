const fetch = require('node-fetch')
// IMPORT MODELS
const Check = require('../models/Check.model')
const City = require('../models/City.model')

// handle requests for weather api
async function get_data(url) {
  try {
    const response = await fetch(url)
    const json = await response.json()
    return json
  } catch (error) {
  }
}

//custom async foreach
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

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
    let cities = await City.getAll()
      .then(data => data)
      .catch(err => err)
    if (cities === null) {
      res.json({
        status: false,
        error: 'No cities available'
      })
    } else {
      await asyncForEach(cities, async c => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${c.name}&units=metric&appid=691b967bdbbe5ee9121bcd8667a4618a`
        let temp = await get_data(url) 
        if(temp && temp.main.temp){
          // save data
          let check = await Check.create({
            city_name: c.name,
            temp: temp.main.temp
            })
            .then(data => data)
            .catch(err => console.log(err))
        }
      })

      // get all checks
      let allChecks
      allChecks = await Check.getAll()
        .then(data => data)

      if (allChecks === null) {
        res.json({
          status: false,
          error: 'Failed to fetch checks'
        })
      } else {

        let available_cities = cities.map(c => c.name)
        let results = await Check.getAvgMinMax(available_cities)

        if (results){
          res.json({
            status: true,
            data: {
              results
            }
          })
        }
        else{
          res.json({
            status: false,
            error: 'Failed to fetch results'
          })
        }
        

      }
    }
  }
}
