const express = require('express')
const bodyParser = require('body-parser')
const db = require('../db').db
const sequelize = require('sequelize')
const app = express()

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/markers', require('./markers'))
  const server = db.sync({force:false}) 
  .then(() => {
      app.listen(8008, () => console.log('listening on 8008!'))
})
