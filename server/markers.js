const db = require('../db').db
const Marker = require('../db').Marker
const Sequelize = require('sequelize') // testing will delete

module.exports = require('express').Router()
  .get('/', // get all marker information
    (req, res, next) =>
      Marker.findAll({})
      .then(markers => res.send(markers))
      .catch(next))
  .get('/:markerId', // get single marker information
    (req, res, next) =>
      Marker.findById(req.params.markerId)
      .then(marker => res.send(marker))
      .catch(next))
  .get('/nearby/:markerId/:radius',
  (req, res, next) => // get surrounding markers by user specified radius
  {
    Marker.findById(req.params.markerId)
    .then(marker => {
      return marker.findNearby(req.params.radius)
    })
    .then(markers => res.send(markers))
    .catch(next)
  })
   .post('/new', // create new marker
    (req, res, next) =>
        Marker.create({
            long: req.body.long,
            lat: req.body.lat,
            type: req.body.type || null,
        })
        .then(marker => res.send(marker))
        .catch(next))
        