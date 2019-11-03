// Import mongoose
const mongoose = require('mongoose')

// Question Schaema for mongoDB
const CheckSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
    city_name: { type: String, require: true },
    temp: { type: Number, require: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'Check'
  }
)
// Import model to create model
const CheckModel = mongoose.model('CheckModel', CheckSchema)

module.exports = {
  model: CheckModel,
  create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let check = await CheckModel.create(args)
        resolve(check)
      } catch (err) {
        reject(err)
      }
    })
  },
  getAll: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let check = await CheckModel.find(args)
        resolve(check)
      } catch (err) {
        reject(err)
      }
    })
  },
  getOne: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let check = await CheckModel.findOne(args)
        resolve(check)
      } catch (err) {
        reject(err)
      }
    })
  },
  getOneById: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let check = await CheckModel.findById(args)
        resolve(check)
      } catch (err) {
        reject(err)
      }
    })
  },
  update: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let Check = await CheckModel.updateOne(
          { _id: args._id },
          { $set: args }
        )
        resolve(Check)
      } catch (err) {
        reject(err)
      }
    })
  },
  remove: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let check = await CheckModel.findOneAndRemove(args)
        resolve(check)
      } catch (err) {
        reject(err)
      }
    })
  }
}
