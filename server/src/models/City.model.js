// Import mongoose
const mongoose = require('mongoose')

// Question Schaema for mongoDB
const CitySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
    collection: 'City'
  }
)
// Import model to create model
const CityModel = mongoose.model('CityModel', CitySchema)

module.exports = {
  model: CityModel,
  create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.create(args)
        resolve(city)
      } catch (err) {
        reject(err)
      }
    })
  },
  getAll: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.find(args)
        resolve(city)
      } catch (err) {
        reject(err)
      }
    })
  },
  getOne: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.findOne(args)
        resolve(city)
      } catch (err) {
        reject(err)
      }
    })
  },
  getOneById: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.findById(args)
        resolve(city)
      } catch (err) {
        reject(err)
      }
    })
  },
  update: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.updateOne(
          { _id: args._id },
          { $set: args }
        )
        resolve(City)
      } catch (err) {
        reject(err)
      }
    })
  },
  remove: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await CityModel.findOneAndRemove(args)
        resolve(city)
      } catch (err) {
        reject(err)
      }
    })
  }
}
