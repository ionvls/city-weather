const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/cities";

// ----------------------
//   MONGODB & MONGOOSE
// ----------------------
mongoose.Promise = global.Promise
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true  })

// ----------------------
//     INITIALIZE SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MongoStore({
    url: mongoUri,
    autoReconnect: true
  })
}))

// API V.1
const routes = require('./routes.js')
server.use('/api/v1', routes)

// LISTEN PORT 3001
var app = server.listen(port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:3001')
})
