import axios from 'axios'

// const url = "http://localhost:3001/api/v1"
// const url = "/api/v1"
const url = process.env.NODE_ENV === 'PRODUCTION' ? "/api/v1" : "http://localhost:3001/api/v1"

let instance = axios.create({
  baseURL: url
})

export default instance
